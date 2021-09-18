import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductoDetailComponent } from './producto-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes= [
    {
        path: '',
        component: ProductoDetailComponent
    }
]

@NgModule({
  declarations: [ProductoDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductosDetailModule { }
