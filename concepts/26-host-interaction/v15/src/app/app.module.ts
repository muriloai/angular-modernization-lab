import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MachineActionCardComponent } from './components/machine-action-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MachineActionCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
