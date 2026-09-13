import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalhaoListComponent } from './talhao-list.component';
import { TalhaoDetailComponent } from './talhao-detail.component';
import { TalhaoResolver } from './resolvers/talhao.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'talhoes', pathMatch: 'full' },
  { path: 'talhoes', component: TalhaoListComponent },
  {
    path: 'talhoes/:id',
    component: TalhaoDetailComponent,
    resolve: {
      talhao: TalhaoResolver
    }
  },
  { path: '**', redirectTo: 'talhoes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
