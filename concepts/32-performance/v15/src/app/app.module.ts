import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { VirtualSensorsComponent } from './components/virtual-sensors.component';

@NgModule({
  declarations: [
    AppComponent,
    VirtualSensorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ScrollingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
