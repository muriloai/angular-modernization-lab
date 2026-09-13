import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmsComponent } from './pages/farms.component';
import { SensorsComponent } from './pages/sensors.component';
import { NotFoundComponent } from './pages/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'fazendas', pathMatch: 'full' },
  { path: 'fazendas', component: FarmsComponent },
  { path: 'sensores', component: SensorsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
