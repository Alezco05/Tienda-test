import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductoCardComponent } from './producto-card/producto-card.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { FormProductoComponent } from './form-producto/form-producto.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductosComponent, ProductoCardComponent, FormProductoComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MaterialFileInputModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule
  
  ]
})
export class ProductosModule { }
