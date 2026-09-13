import { Component, signal } from '@angular/core';
import { SensorMonitor } from './sensor-monitor';

@Component({
  selector: 'app-root',
  imports: [SensorMonitor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly sensorMontado = signal(true);
  readonly frequenciaSegundos = signal(3);
  readonly sensorId = signal('SNS-AGRO-701');

  alternarMontagem(): void {
    this.sensorMontado.update(ativo => !ativo);
  }

  alterarFrequencia(novaFreq: number): void {
    this.frequenciaSegundos.set(novaFreq);
  }
}
