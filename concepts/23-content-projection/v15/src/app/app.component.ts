import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conceito 23: Projeção de Conteúdo e Fallback no Angular 15';

  safraStatus = 'Em Progresso';
  sacasColhidas = 48500;
  ultimaExportacao = '';

  exportarRelatorio(): void {
    this.ultimaExportacao = new Date().toLocaleTimeString('pt-BR');
  }
}
