import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherRadarComponent } from './components/weather-radar.component';
import { SoilAnalysisComponent } from './components/soil-analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherRadarComponent,
    SoilAnalysisComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
