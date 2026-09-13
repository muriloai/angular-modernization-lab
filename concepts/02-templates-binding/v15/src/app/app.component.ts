import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Propriedades expostas para interpolação clássica no template
  pivoNome = 'Pivô Central 03 (Setor Norte)';
  cultura = 'Soja Safra 2026';
  vazaoLitrosHora = 1200;
  operador = 'Mariana Souza';
  modoManual = true;
  observacao = '';

  // Getter clássico do Angular 15 para valor calculado
  // No modelo clássico, este getter é reavaliado a cada ciclo de detecção de mudanças do Zone.js
  get pressaoBar(): number {
    return Number((this.vazaoLitrosHora * 0.00267).toFixed(2));
  }

  get statusAlerta(): boolean {
    return this.vazaoLitrosHora > 2000;
  }

  alternarModo(): void {
    this.modoManual = !this.modoManual;
  }

  redefinirVazao(): void {
    this.vazaoLitrosHora = 1000;
  }

  atualizarObservacao(texto: string): void {
    this.observacao = texto;
  }
}
