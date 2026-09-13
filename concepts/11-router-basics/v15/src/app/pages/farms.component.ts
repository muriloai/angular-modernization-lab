import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Fazenda {
  id: string;
  nome: string;
  localizacao: string;
  areaHectares: number;
  culturas: string[];
  status: 'operacional' | 'manutencao';
}

@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css']
})
export class FarmsComponent {
  readonly fazendas: Fazenda[] = [
    {
      id: 'faz-01',
      nome: 'Fazenda Santa Maria - Sede',
      localizacao: 'Rio Verde, GO',
      areaHectares: 850,
      culturas: ['Soja', 'Milho Safrinha'],
      status: 'operacional'
    },
    {
      id: 'faz-02',
      nome: 'Fazenda Boa Esperança',
      localizacao: 'Jataí, GO',
      areaHectares: 420,
      culturas: ['Algodão'],
      status: 'operacional'
    },
    {
      id: 'faz-03',
      nome: 'Fazenda Rio Claro',
      localizacao: 'Montividiu, GO',
      areaHectares: 610,
      culturas: ['Soja', 'Trigo'],
      status: 'manutencao'
    }
  ];

  constructor(private router: Router) {}

  irParaSensores(): void {
    this.router.navigate(['/sensores']);
  }
}
