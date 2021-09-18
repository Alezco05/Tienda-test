import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { pluck, Subject, takeUntil } from 'rxjs';
import { Producto } from 'src/app/shared/models/productos';
import { User, Usuario } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css'],
})
export class ProductoDetailComponent implements OnDestroy {
  unsubscribeSignal: Subject<void> = new Subject();
  url: string = environment.url.split('api')[0];
  producto: Producto;
  usuario: Usuario;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.usuario = this.authService.usuario;
    this.getProduct();
  }
  getProduct(){
    const id: number = this.route.snapshot.params.id;
    this.dataService
    .getData('getProducto', id)
    .pipe(pluck('producto'), takeUntil(this.unsubscribeSignal))
    .subscribe({
      next: (resp: Producto) => (this.producto = resp),
    });
  }
  async openModal(data) {
    const { FormProductoComponent } = await import(
      '../form-producto/form-producto.component'
    );
    const dialogRef = this.dialog.open(FormProductoComponent, {
      width: '900px',
      data,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe(() => {
        this.getProduct();
      });
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
