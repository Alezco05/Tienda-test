import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/shared/models/productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: ['']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [
    {
      nombreProducto: 'Camisa',
      marca_id: 1,
      id: 1,
    },
    {
      nombreProducto: 'Zapatos',
      marca_id: 1,
      id: 2,
    },
    {
      nombreProducto: 'Camisa',
      marca_id: 1,
      id: 3,
    },
    {
      nombreProducto: 'Camisa',
      marca_id: 1,
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
