import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sensorMontado = true;
  frequenciaSegundos = 3;
  sensorId = 'SNS-AGRO-701';

  alternarMontagem(): void {
    this.sensorMontado = !this.sensorMontado;
  }

  alterarFrequencia(novaFreq: number): void {
    this.frequenciaSegundos = novaFreq;
  }
}
