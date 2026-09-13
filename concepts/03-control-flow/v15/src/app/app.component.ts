import { Component } from '@angular/core';
import { Sensor } from './sensor.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sistemaAtivo = true;
  modoOperacao: 'padrao' | 'economico' | 'turbina' = 'padrao';

  private readonly listaInicial: Sensor[] = [
    { id: 'sns-101', talhao: 'Talhão Norte 01', tipo: 'Umidade do Solo', valor: 42.5, unidade: '%', status: 'normal', bateria: 88 },
    { id: 'sns-102', talhao: 'Talhão Sul 02', tipo: 'pH da Terra', valor: 5.8, unidade: 'pH', status: 'alerta', bateria: 45 },
    { id: 'sns-103', talhao: 'Pivô Central 03', tipo: 'Temperatura Foliar', valor: 31.2, unidade: '°C', status: 'normal', bateria: 92 },
    { id: 'sns-104', talhao: 'Talhão Leste 04', tipo: 'Condutividade Elétrica', valor: 2.9, unidade: 'dS/m', status: 'critico', bateria: 18 }
  ];

  sensores: Sensor[] = [...this.listaInicial];

  alternarSistema(): void {
    this.sistemaAtivo = !this.sistemaAtivo;
  }

  definirModo(modo: 'padrao' | 'economico' | 'turbina'): void {
    this.modoOperacao = modo;
  }

  filtrarApenasAlertas(): void {
    this.sensores = this.listaInicial.filter(s => s.status !== 'normal');
  }

  restaurarLista(): void {
    this.sensores = [...this.listaInicial];
  }

  limparLista(): void {
    this.sensores = [];
  }

  // No Angular 15, o *ngFor exige a declaração manual de um método de rastreamento na classe
  // para evitar recriação desnecessária de nós do DOM a cada ciclo de renderização
  trackById(index: number, item: Sensor): string {
    return item.id;
  }
}
