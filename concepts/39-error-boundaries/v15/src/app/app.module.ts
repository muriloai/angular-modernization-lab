import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { WeatherWidgetComponent } from './components/weather-widget.component';
import { DroneWidgetComponent } from './components/drone-widget.component';
import { MultispectralWidgetComponent } from './components/multispectral-widget.component';
import { GlobalErrorHandler } from './services/global-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    WeatherWidgetComponent,
    DroneWidgetComponent,
    MultispectralWidgetComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
