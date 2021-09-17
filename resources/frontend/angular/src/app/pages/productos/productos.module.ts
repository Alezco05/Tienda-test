import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductoCardComponent } from './producto-card/producto-card.component';
import { ProductosRoutingModule } from './productos-routing.module';

@NgModule({
  declarations: [ProductosComponent, ProductoCardComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProductosModule { }
