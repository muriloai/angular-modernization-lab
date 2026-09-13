import { Component, signal } from '@angular/core';
import { SensorBadge } from './sensor-badge';
import { SensorAlertDirective } from './directives/sensor-alert.directive';

export interface SensorAlertaItem {
  id: string;
  nome: string;
  tipo: string;
  valor: string;
  nivel: 'baixo' | 'medio' | 'critico';
  pulsar: boolean;
}

@Component({
  selector: 'app-root',
  imports: [SensorBadge, SensorAlertDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Sinais de estado (Signals) para a coleção de sensores
  readonly sensores = signal<SensorAlertaItem[]>([
    { id: 'sns-01', nome: 'Sensor de Umidade 01', tipo: 'Umidade do Solo', valor: '14%', nivel: 'critico', pulsar: true },
    { id: 'sns-02', nome: 'Sensor de Temperatura 02', tipo: 'Temperatura Foliar', valor: '34°C', nivel: 'medio', pulsar: false },
    { id: 'sns-03', nome: 'Sensor de Condutividade 03', tipo: 'Salinidade', valor: '1.2 dS/m', nivel: 'baixo', pulsar: false },
    { id: 'sns-04', nome: 'Sensor de Pressão Pivô 04', tipo: 'Pressão Hidráulica', valor: '1.1 bar', nivel: 'critico', pulsar: true }
  ]);

  alternarNivel(sensorId: string): void {
    this.sensores.update(lista =>
      lista.map(s => {
        if (s.id !== sensorId) return s;
        const proxNivel = s.nivel === 'baixo' ? 'medio' : s.nivel === 'medio' ? 'critico' : 'baixo';
        return {
          ...s,
          nivel: proxNivel,
          pulsar: proxNivel === 'critico'
        };
      })
    );
  }
}
