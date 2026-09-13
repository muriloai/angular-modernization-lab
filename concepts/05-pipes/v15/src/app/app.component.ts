import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SensorItem } from './sensor.model';
import { FilterImpurePipe } from './pipes/filter-impure.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  termoFiltro = '';
  contadorCliques = 0;

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

  // Stream assíncrona gerenciada via BehaviorSubject
  private readonly sensoresSubject = new BehaviorSubject<SensorItem[]>(this.dadosIniciais);
  readonly sensores$: Observable<SensorItem[]> = this.sensoresSubject.asObservable();

  // Getter para expor o total de execuções do pipe impuro
  get totalChamadasImpuro(): number {
    return FilterImpurePipe.totalChamadas;
  }

  // Ação qualquer para disparar o ciclo de detecção de mudanças do Zone.js
  dispararCicloZone(): void {
    this.contadorCliques++;
  }

  trackById(index: number, item: SensorItem): string {
    return item.id;
  }
}
