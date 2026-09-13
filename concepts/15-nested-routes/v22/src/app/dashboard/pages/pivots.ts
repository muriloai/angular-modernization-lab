import { Component, signal } from '@angular/core';

interface PivotItem {
  id: string;
  nome: string;
  area: string;
  vazao: string;
  pressao: string;
  ligado: boolean;
}

@Component({
  selector: 'app-pivots',
  templateUrl: './pivots.html',
  styleUrls: ['./pivots.css']
})
export class Pivots {
  readonly pivos = signal<PivotItem[]>([
    {
      id: 'PIVO-01',
      nome: 'Pivô Central Norte',
      area: '85 hectares',
      vazao: '320 m³/h',
      pressao: '3.5 bar',
      ligado: true
    },
    {
      id: 'PIVO-02',
      nome: 'Pivô Central Sul',
      area: '110 hectares',
      vazao: '410 m³/h',
      pressao: '3.8 bar',
      ligado: false
    },
    {
      id: 'PIVO-03',
      nome: 'Pivô Setor Sementeira',
      area: '45 hectares',
      vazao: '180 m³/h',
      pressao: '3.2 bar',
      ligado: true
    }
  ]);

  togglePivo(pivoId: string): void {
    this.pivos.update(lista =>
      lista.map(p => (p.id === pivoId ? { ...p, ligado: !p.ligado } : p))
    );
  }
}
