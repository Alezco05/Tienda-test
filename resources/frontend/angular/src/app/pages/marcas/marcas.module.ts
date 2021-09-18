import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasComponent } from './marcas.component';
import { FormMarcaComponent } from './form-marca/form-marca.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { MyPipesModule } from 'src/app/shared/pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: MarcasComponent
  }
]

@NgModule({
  declarations: [
    MarcasComponent,
    FormMarcaComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgxPaginationModule,
    MyPipesModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MarcasModule { }
