import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  @Input() filterPost: string = '';
  unsubscribeSignal: Subject<void> = new Subject();
  usuario: Usuario;
  p: number = 1;
  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
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
  async openModal() {
    const { FormProductoComponent } = await import(
      '../form-producto/form-producto.component'
    );
    const dialogRef = this.dialog.open(FormProductoComponent, {
      width: '900px',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe(() => {
        this.dataService
          .getAllData('getProductos')
          .pipe(takeUntil(this.unsubscribeSignal))
          .subscribe({
            next: (resp: Producto[]) => (this.productos = resp),
          });
      });
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
