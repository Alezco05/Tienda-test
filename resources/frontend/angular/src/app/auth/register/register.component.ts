import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  unsubscribeSignal: Subject<void> = new Subject();
  constructor(
    private fb: FormBuilder,
    private dataService: AuthService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.createForm();
  }

  presentSwall(title, html, icon, timer) {
    Swal.fire({ title, html, icon, timer, timerProgressBar: true });
  }
  createForm() {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: [ '',
          [Validators.required, Validators.email],
        ],
        password: ['', [Validators.required]],
        confirmedPassword: ['', [Validators.required]],
      }, {validator: this.passwordConfirming}
    );   
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmedPassword').value) {
        return {invalid: true};
    }
    return null;
}

  setPass() {
    this.form.get('password').setValue('Usuario365@');
    this.form.get('confirmedPassword').setValue('Usuario365@');
  }

  onSubmitForm() {
    Swal.fire({
      title: 'Creando Usuario...',
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
      .signup(this.form.value)
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe({
        next: () => {
          this.presentSwall(
            '¡Exito!',
            'Usuario Creado Exitosamente',
            'error',
            3000
          );
        },
        error: () =>
          this.presentSwall('¡Error!', 'EROR INTERNO.', 'error', 3000),
        complete: () => {
          this.router.navigate(['/auth/login']);
          Swal.close();
        },
      });
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
