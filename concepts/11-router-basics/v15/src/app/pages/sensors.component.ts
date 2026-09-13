import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface SensorAgro {
  id: string;
  tipo: string;
  talhao: string;
  leitura: string;
  bateria: number;
  status: 'normal' | 'alerta';
}

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent {
  readonly sensores: SensorAgro[] = [
    {
      id: 'sns-101',
      tipo: 'Umidade do Solo Profundo (60cm)',
      talhao: 'Talhão Norte 01 (Soja)',
      leitura: '32.4 %',
      bateria: 92,
      status: 'normal'
    },
    {
      id: 'sns-102',
      tipo: 'Estação Meteorológica Compacta',
      talhao: 'Sede Administrativa',
      leitura: '28.1 °C / 64% UR',
      bateria: 98,
      status: 'normal'
    },
    {
      id: 'sns-103',
      tipo: 'Pressão da Linha de Pivô',
      talhao: 'Talhão Sul 02 (Milho)',
      leitura: '2.8 bar',
      bateria: 74,
      status: 'alerta'
    },
    {
      id: 'sns-104',
      tipo: 'Anemômetro de Vento Superficial',
      talhao: 'Talhão Leste 03 (Algodão)',
      leitura: '14.2 km/h',
      bateria: 85,
      status: 'normal'
    }
  ];

  constructor(private router: Router) {}

  voltarParaFazendas(): void {
    this.router.navigate(['/fazendas']);
  }
}
