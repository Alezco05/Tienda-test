import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  error: number = 0;
  form: FormGroup;
  token: string;
  constructor(
    private fb: FormBuilder,
    private dataService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    !this.route.snapshot.params.token
      ? this.router.navigate(['/login'])
      : (this.token = this.route.snapshot.params.token);
  }

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
      password_confirmation: ['', [Validators.required]],
    });
  }
  onSubmitForm() {
    Swal.fire({
      toast: true,
      title: 'Validando datos',
      html: '<h3>Espere un momento</h3>',
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
    const data = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      password_confirmation: this.form.controls.password_confirmation.value,
      token: this.token,
    };
    this.dataService.resetPassword(data).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: () => {
        this.error = 1;
        this.presentSwall('¡Error!', 'Intente de nuevo', 'error', 3000),
          setTimeout(() => (this.error = 0), 3000);
      },
      complete: () => {
        Swal.close();
      },
    });
  }
}
