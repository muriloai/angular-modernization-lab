import { Routes } from '@angular/router';
import { Farms } from './pages/farms';
import { Sensors } from './pages/sensors';
import { NotFound } from './pages/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'fazendas', pathMatch: 'full' },
  { path: 'fazendas', component: Farms },
  { path: 'sensores', component: Sensors },
  { path: '**', component: NotFound }
];
