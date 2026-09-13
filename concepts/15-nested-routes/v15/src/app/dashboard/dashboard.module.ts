import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { MetricsComponent } from './pages/metrics.component';
import { AlertsComponent } from './pages/alerts.component';
import { PivotsComponent } from './pages/pivots.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'metricas', pathMatch: 'full' },
      { path: 'metricas', component: MetricsComponent },
      { path: 'alertas', component: AlertsComponent },
      { path: 'pivos', component: PivotsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    MetricsComponent,
    AlertsComponent,
    PivotsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule {}
