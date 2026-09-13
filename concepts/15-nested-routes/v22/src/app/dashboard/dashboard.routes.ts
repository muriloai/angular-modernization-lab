import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard-layout').then(m => m.DashboardLayout),
    children: [
      { path: '', redirectTo: 'metricas', pathMatch: 'full' },
      {
        path: 'metricas',
        loadComponent: () =>
          import('./pages/metrics').then(m => m.Metrics)
      },
      {
        path: 'alertas',
        loadComponent: () =>
          import('./pages/alerts').then(m => m.Alerts)
      },
      {
        path: 'pivos',
        loadComponent: () =>
          import('./pages/pivots').then(m => m.Pivots)
      }
    ]
  }
];
