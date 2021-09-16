import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        if(error.status === 401 && this.router.url !== 'auth/login') {
          Swal.fire({
            title: 'El token de autenticación expiró',
            html: 'Cerrando sesión...',
            timer: 3000,
            timerProgressBar: true,
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.isDismissed || result.isConfirmed) {
              localStorage.clear();
              location.reload();
            }
          });
        }
        throw error;
      })
    );
  }
}
