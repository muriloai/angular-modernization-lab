import { Component } from '@angular/core';
import { SatelliteMap } from '../widgets/satellite-map';

@Component({
  selector: 'app-telemetry',
  imports: [SatelliteMap],
  templateUrl: './telemetry.html',
  styleUrl: './telemetry.css'
})
export class Telemetry {}
