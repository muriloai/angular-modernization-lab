import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsComponent } from './pages/operations.component';

export const routes: Routes = [
  { path: '', redirectTo: 'operacoes', pathMatch: 'full' },
  { path: 'operacoes', component: OperationsComponent },
  {
    path: 'telemetria',
    loadChildren: () =>
      import('./telemetry/telemetry.module').then(m => m.TelemetryModule)
  },
  { path: '**', redirectTo: 'operacoes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
