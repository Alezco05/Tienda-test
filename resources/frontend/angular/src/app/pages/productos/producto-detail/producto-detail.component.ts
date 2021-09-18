import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, Subject, takeUntil } from 'rxjs';
import { Producto } from 'src/app/shared/models/productos';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styles: [],
})
export class ProductoDetailComponent implements OnInit, OnDestroy {
  unsubscribeSignal: Subject<void> = new Subject();
  producto: Producto;
  constructor(private route: ActivatedRoute, private dataService: DataService) {
    const id: number = this.route.snapshot.params.id;
    this.dataService
      .getData('producto', id)
      .pipe(pluck('producto'), takeUntil(this.unsubscribeSignal))
      .subscribe({
        next : (resp: Producto) => this.producto = resp
      });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
