import { Component } from '@angular/core';

export interface SensorAlertaItem {
  id: string;
  nome: string;
  tipo: string;
  valor: string;
  nivel: 'baixo' | 'medio' | 'critico';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sensores: SensorAlertaItem[] = [
    { id: 'sns-01', nome: 'Sensor de Umidade 01', tipo: 'Umidade do Solo', valor: '14%', nivel: 'critico' },
    { id: 'sns-02', nome: 'Sensor de Temperatura 02', tipo: 'Temperatura Foliar', valor: '34°C', nivel: 'medio' },
    { id: 'sns-03', nome: 'Sensor de Condutividade 03', tipo: 'Salinidade', valor: '1.2 dS/m', nivel: 'baixo' },
    { id: 'sns-04', nome: 'Sensor de Pressão Pivô 04', tipo: 'Pressão Hidráulica', valor: '1.1 bar', nivel: 'critico' }
  ];

  alternarNivel(sensor: SensorAlertaItem): void {
    if (sensor.nivel === 'baixo') {
      sensor.nivel = 'medio';
    } else if (sensor.nivel === 'medio') {
      sensor.nivel = 'critico';
    } else {
      sensor.nivel = 'baixo';
    }
  }
}
