import { Routes } from '@angular/router';
import { TalhaoList } from './talhao-list';
import { TalhaoDetail } from './talhao-detail';
import { talhaoResolver } from './resolvers/talhao.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'talhoes', pathMatch: 'full' },
  { path: 'talhoes', component: TalhaoList },
  {
    path: 'talhoes/:id',
    component: TalhaoDetail,
    resolve: {
      talhao: talhaoResolver
    }
  },
  { path: '**', redirectTo: 'talhoes' }
];
