import { Component, signal } from '@angular/core';
import { PivoCard } from './pivo-card';

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
  imports: [PivoCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Sinais de estado (Signals) para controle direto e granular
  readonly contadorNeutro = signal(0);

  readonly pivos = signal<PivoItem[]>([
    { id: 'piv-01', nome: 'Pivô Central 01', setor: 'Talhão Norte (Soja)', angulo: 120, vazao: 1200, ativo: true },
    { id: 'piv-02', nome: 'Pivô Central 02', setor: 'Talhão Sul (Milho)', angulo: 245, vazao: 950, ativo: false },
    { id: 'piv-03', nome: 'Pivô Central 03', setor: 'Talhão Leste (Algodão)', angulo: 310, vazao: 1500, ativo: true }
  ]);

  dispararEventoNeutro(): void {
    this.contadorNeutro.update(c => c + 1);
  }

  avancarAnguloGiro(): void {
    this.pivos.update(lista =>
      lista.map(p => ({
        ...p,
        angulo: (p.angulo + 30) % 360
      }))
    );
  }

  alternarPivo(id: string): void {
    this.pivos.update(lista =>
      lista.map(p => {
        if (p.id !== id) return p;
        return { ...p, ativo: !p.ativo };
      })
    );
  }
}
