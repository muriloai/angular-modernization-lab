import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SiloVisualizerComponent } from './components/silo-visualizer.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SiloVisualizerComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
