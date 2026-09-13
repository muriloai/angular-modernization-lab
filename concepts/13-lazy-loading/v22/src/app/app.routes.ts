import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'operacoes', pathMatch: 'full' },
  {
    path: 'operacoes',
    loadComponent: () =>
      import('./pages/operations').then(m => m.Operations)
  },
  {
    path: 'telemetria',
    loadComponent: () =>
      import('./pages/telemetry').then(m => m.Telemetry)
  },
  { path: '**', redirectTo: 'operacoes' }
];
