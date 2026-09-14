import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HarvestListComponent } from './harvest-list.component';

@NgModule({
  declarations: [
    HarvestListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HarvestListComponent
  ]
})
export class HarvestModule {}
