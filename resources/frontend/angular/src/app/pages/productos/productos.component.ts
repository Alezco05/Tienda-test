import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Producto } from 'src/app/shared/models/productos';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [''],
})
export class ProductosComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  unsubscribeSignal: Subject<void> = new Subject();
  constructor(private dataService: DataService) {
    this.dataService.getAllData('getProductos')
    .pipe(takeUntil(this.unsubscribeSignal))
    .subscribe({
      next: (resp: Producto[]) => this.productos = resp
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
