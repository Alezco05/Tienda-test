import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'productos',
        loadChildren: () =>
          import('./productos/productos.module').then((m) => m.ProductosModule),
      },
      {
        path: 'marcas',
        loadChildren: () =>
          import('./marcas/marcas.module').then((m) => m.MarcasModule),
      },
      {
        path: '',
        redirectTo: '/productos',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
