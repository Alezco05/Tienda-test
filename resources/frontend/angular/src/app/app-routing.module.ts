import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacionGuard } from './auth/autenticacion.guard';
import { LoginGuard } from './auth/login.guard';
const routes: Routes = [
  // Routes
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    //canLoad: [LoginGuard],
  },
    // Empty Route Penultimate Route
   {
     path: '',
     loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    // canLoad: [AutenticacionGuard],
  },
  // Final Route
  {
    path: '**',
    loadChildren: () => import('./shared/components/not-found/not-found.module').then(m => m.NotFoundModule),
    // canLoad: [AutenticacionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
