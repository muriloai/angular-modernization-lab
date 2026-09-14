import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SensorsBoardComponent } from './components/sensors-board.component';
import { SensorTagComponent } from './components/sensor-tag.component';

@NgModule({
  declarations: [
    AppComponent,
    SensorsBoardComponent,
    SensorTagComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
