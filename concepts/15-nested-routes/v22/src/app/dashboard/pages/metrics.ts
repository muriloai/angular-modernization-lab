import { Component, signal } from '@angular/core';

interface MetricCard {
  sensor: string;
  talhao: string;
  valor: string;
  status: string;
  variacao: string;
}

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.html',
  styleUrls: ['./metrics.css']
})
export class Metrics {
  readonly metricas = signal<MetricCard[]>([
    {
      sensor: 'Umidade do Solo (FDR)',
      talhao: 'Talhão 04 - Soja Safra',
      valor: '68%',
      status: 'Ideal',
      variacao: '+2.4% nas últimas 4 horas'
    },
    {
      sensor: 'Evapotranspiração da Cultura',
      talhao: 'Talhão 07 - Milho Safrinha',
      valor: '4.8 mm/dia',
      status: 'Atenção',
      variacao: '+0.9 mm vs média histórica'
    },
    {
      sensor: 'Índice de Clorofila (SPAD)',
      talhao: 'Talhão 12 - Algodão',
      valor: '45.2 SPAD',
      status: 'Vigor Alto',
      variacao: 'Estável'
    }
  ]);
}
