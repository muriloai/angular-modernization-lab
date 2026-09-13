import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelemetryRoutingModule } from './telemetry-routing.module';
import { TelemetryComponent } from './telemetry.component';
import { SatelliteMapComponent } from './satellite-map.component';

@NgModule({
  declarations: [
    TelemetryComponent,
    SatelliteMapComponent
  ],
  imports: [
    CommonModule,
    TelemetryRoutingModule
  ]
})
export class TelemetryModule {}
