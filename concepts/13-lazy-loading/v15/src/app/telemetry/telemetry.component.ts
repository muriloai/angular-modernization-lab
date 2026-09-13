import { Component } from '@angular/core';

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.css']
})
export class TelemetryComponent {
  mostrarMapa = false;

  alternarMapa(): void {
    this.mostrarMapa = !this.mostrarMapa;
  }
}
