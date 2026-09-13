import { Routes } from '@angular/router';
import { agroAuthGuard } from './guards/agro-auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login').then(m => m.Login)
  },
  {
    path: 'maquinario',
    loadComponent: () => import('./pages/machinery').then(m => m.Machinery),
    canActivate: [agroAuthGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  { path: '**', redirectTo: 'login' }
];
