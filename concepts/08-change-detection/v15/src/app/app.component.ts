import { Component } from '@angular/core';

export interface PivoItem {
  id: string;
  nome: string;
  setor: string;
  angulo: number;
  vazao: number;
  ativo: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contadorNeutro = 0;
  private contagemPai = 0;

  pivos: PivoItem[] = [
    { id: 'piv-01', nome: 'Pivô Central 01', setor: 'Talhão Norte (Soja)', angulo: 120, vazao: 1200, ativo: true },
    { id: 'piv-02', nome: 'Pivô Central 02', setor: 'Talhão Sul (Milho)', angulo: 245, vazao: 950, ativo: false },
    { id: 'piv-03', nome: 'Pivô Central 03', setor: 'Talhão Leste (Algodão)', angulo: 310, vazao: 1500, ativo: true }
  ];

  get ciclosPai(): number {
    this.contagemPai++;
    return this.contagemPai;
  }

  // Dispara um evento no componente pai sem alterar propriedades dos filhos
  dispararEventoNeutro(): void {
    this.contadorNeutro++;
  }

  // Altera os dados criando novos objetos para acionar a verificação do OnPush
  avancarAnguloGiro(): void {
    this.pivos = this.pivos.map(p => ({
      ...p,
      angulo: (p.angulo + 30) % 360
    }));
  }
}
