import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Producto } from 'src/app/shared/models/productos';
import { Usuario } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styles: [],
})
export class ProductoCardComponent implements OnInit {
  @Input() productos: Producto[] = [];
  unsubscribeSignal: Subject<void> = new Subject();
  usuario: Usuario;
  constructor(private router: Router, private dataService: DataService, private authService: AuthService) {
    this.usuario = this.authService.usuario;
  }
  ngOnInit(): void {}
  seeDetail(p) {
    this.router.navigate([`productos/detalle/${p.id}`]);
  }
  deleteProduct(p: Producto) {
    Swal.fire({
      title: 'Se desactivara el siguiente producto',
      text: `${p.nombreProducto} - ${p.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService
          .deleteData('producto', p.id)
          .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
          .subscribe({
            next: () =>
              Swal.fire('¡Listo!', 'Se desactivo de la BD', 'success').then(
                () => {
                  const i = this.productos.indexOf(p);
                  this.productos.splice(i, 1);
                }
              ),
            error: () =>
              Swal.fire('ERROR!', 'Algo ha fallado intente mas tarde', 'error'),
          });
      }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
