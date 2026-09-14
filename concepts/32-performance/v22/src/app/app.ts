import { Component, signal } from '@angular/core';
import { VirtualSensors } from './components/virtual-sensors';

@Component({
  selector: 'app-root',
  imports: [VirtualSensors],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('Fazenda Santa Maria - Telemetria IoT de Alta Escala (v22)');
}
