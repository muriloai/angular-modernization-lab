import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgroCard } from './components/agro-card';

@Component({
  selector: 'app-root',
  imports: [CommonModule, AgroCard],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 23: Projeção de Conteúdo e Fallback no Angular 22';

  readonly safraStatus = signal('Em Progresso');
  readonly sacasColhidas = signal(48500);
  readonly ultimaExportacao = signal('');

  exportarRelatorio(): void {
    this.ultimaExportacao.set(new Date().toLocaleTimeString('pt-BR'));
  }
}
