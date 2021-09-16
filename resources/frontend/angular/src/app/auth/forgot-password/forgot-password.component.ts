import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('');
  message: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  presentSwall(title, html, icon, timer) {
    Swal.fire({ title, html, icon, timer, timerProgressBar: true });
  }

  forgotPassword() {
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
    this.authService.forgotPassword({ email: this.email.value }).subscribe({
      next: () => (this.message = true),
      error: (error) => {
        console.log(error);
        this.presentSwall('¡Error!', 'Intente de nuevo', 'error', 3000);
      },
      complete: () => Swal.close(),
    });
  }
}
