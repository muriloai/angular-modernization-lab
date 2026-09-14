import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusBadgeComponent } from './components/status-badge.component';

@NgModule({
  declarations: [
    StatusBadgeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    StatusBadgeComponent
  ]
})
export class SharedModule {}
