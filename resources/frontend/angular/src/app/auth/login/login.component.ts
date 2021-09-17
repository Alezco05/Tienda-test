import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  error: number = 0;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dataService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  presentSwall(title, html, icon, timer) {
    Swal.fire({ title, html, icon, timer, timerProgressBar: true });
  }
  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmitForm() {
    Swal.fire({
      toast: true,
      title: 'Autenticando Usuario...',
      html: '<h3>Esto puede tardar varios segundos</h3>',
      showConfirmButton: false,
      willOpen() {
        Swal.showLoading();
      },
      didClose() {
        Swal.hideLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
    this.dataService
      .login(this.form.value)
      .pipe(
        map((x: any) =>
          x.user.role ? { ...x, role: parseInt(x.user.role) } : x
        )
      )
      .subscribe({
        next: (resp) => {
          localStorage.setItem('usuario', JSON.stringify(resp));
          this.dataService.getToken();
        },
        error: () =>
          this.presentSwall(
            '¡Error!',
            'Usuario o contraseña incorrectos.',
            'error',
            3000
          ),
        complete: () => {
          const url = this.route.snapshot.queryParams['urlRespuesta'];
          if (url === '/' || url === '' || url === undefined)
            this.router.navigate(['/perfil']);
          else this.router.navigate([url]);
          Swal.close();
        },
      });
  }
}
