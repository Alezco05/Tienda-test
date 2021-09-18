import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  // Routes
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
    // Empty Route Penultimate Route
   {
     path: '',
     loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  // Final Route
  {
    path: '**',
    loadChildren: () => import('./shared/components/not-found/not-found.module').then(m => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
