import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { SensorItem } from './sensor.model';
import { SensorStatusPipe } from './pipes/sensor-status.pipe';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    SensorStatusPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly termoFiltro = signal('');
  readonly contadorCliques = signal(0);

  private readonly dadosIniciais: SensorItem[] = [
    {
      id: 'sns-01',
      tipo: 'Umidade do Solo Profundo',
      talhao: 'Talhão Norte 01',
      leitura: 14.8,
      unidade: '%',
      status: 'critico',
      dataLeitura: new Date(2026, 8, 13, 10, 30),
      custoManutencao: 350.50
    },
    {
      id: 'sns-02',
      tipo: 'Temperatura Foliar',
      talhao: 'Talhão Sul 02',
      leitura: 34.2,
      unidade: '°C',
      status: 'alerta',
      dataLeitura: new Date(2026, 8, 13, 11, 15),
      custoManutencao: 120.00
    },
    {
      id: 'sns-03',
      tipo: 'pH da Terra e Condutividade',
      talhao: 'Pivô Central 03',
      leitura: 6.5,
      unidade: 'pH',
      status: 'normal',
      dataLeitura: new Date(2026, 8, 13, 9, 45),
      custoManutencao: 85.75
    },
    {
      id: 'sns-04',
      tipo: 'Pressão da Rede de Irrigação',
      talhao: 'Talhão Leste 04',
      leitura: 1.1,
      unidade: 'bar',
      status: 'critico',
      dataLeitura: new Date(2026, 8, 13, 12, 0),
      custoManutencao: 540.00
    }
  ];

  readonly sensores = signal<SensorItem[]>(this.dadosIniciais);

  private chamadasCalculo = 0;

  // No Angular 22, filtros de coleções são feitos com computed memoizado.
  // O cálculo só é reavaliado quando termoFiltro ou sensores realmente mudarem.
  readonly sensoresFiltrados = computed(() => {
    this.chamadasCalculo++;
    console.log(`[computed] Execução número ${this.chamadasCalculo}`);

    const termo = this.termoFiltro().toLowerCase().trim();
    const lista = this.sensores();

    if (!termo) {
      return lista;
    }

    return lista.filter(item =>
      item.tipo.toLowerCase().includes(termo) ||
      item.talhao.toLowerCase().includes(termo)
    );
  });

  get totalExecucoesComputed(): number {
    return this.chamadasCalculo;
  }

  dispararCiclo(): void {
    this.contadorCliques.update(c => c + 1);
  }
}
