import { Component, signal } from '@angular/core';
import { Sensor } from './sensor.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Sinais de estado (Signals) para controle reativo
  readonly sistemaAtivo = signal(true);
  readonly modoOperacao = signal<'padrao' | 'economico' | 'turbina'>('padrao');

  private readonly listaInicial: Sensor[] = [
    { id: 'sns-101', talhao: 'Talhão Norte 01', tipo: 'Umidade do Solo', valor: 42.5, unidade: '%', status: 'normal', bateria: 88 },
    { id: 'sns-102', talhao: 'Talhão Sul 02', tipo: 'pH da Terra', valor: 5.8, unidade: 'pH', status: 'alerta', bateria: 45 },
    { id: 'sns-103', talhao: 'Pivô Central 03', tipo: 'Temperatura Foliar', valor: 31.2, unidade: '°C', status: 'normal', bateria: 92 },
    { id: 'sns-104', talhao: 'Talhão Leste 04', tipo: 'Condutividade Elétrica', valor: 2.9, unidade: 'dS/m', status: 'critico', bateria: 18 }
  ];

  readonly sensores = signal<Sensor[]>([...this.listaInicial]);

  alternarSistema(): void {
    this.sistemaAtivo.update(ativo => !ativo);
  }

  definirModo(modo: 'padrao' | 'economico' | 'turbina'): void {
    this.modoOperacao.set(modo);
  }

  filtrarApenasAlertas(): void {
    this.sensores.set(this.listaInicial.filter(s => s.status !== 'normal'));
  }

  restaurarLista(): void {
    this.sensores.set([...this.listaInicial]);
  }

  limparLista(): void {
    this.sensores.set([]);
  }

  // Nota didática:
  // No Angular 22, não é necessário declarar nenhuma função trackById nesta classe.
  // A expressão "track s.id" é avaliada de forma direta pelo compilador no template.
}
