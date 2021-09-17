import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/shared/models/productos';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styles: [],
})
export class ProductoCardComponent implements OnInit {
  @Input() productos: Producto[] = [];
  constructor(private router: Router) {}
  ngOnInit(): void {}
  seeDetail(p) {
    this.router.navigate([`productos/detalle/${p.id}`]);
  }
}
