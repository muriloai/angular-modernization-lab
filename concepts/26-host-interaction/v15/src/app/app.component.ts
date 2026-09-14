import { Component } from '@angular/core';
import { Machine } from './models/machine.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conceito 26: Interação com o Hospedeiro no Angular 15';

  selecionadas: string[] = [];

  maquinas: Machine[] = [
    {
      id: 'TRAT-01',
      nome: 'Trator John Deere 8R 370',
      tipo: 'Preparo de Solo e Plantio',
      operador: 'Carlos Eduardo Santos',
      status: 'Em Operação',
      horasTrabalhadas: 1420
    },
    {
      id: 'COLH-02',
      nome: 'Colheitadeira S790 Rotor',
      tipo: 'Colheita e Trilha de Grãos',
      operador: 'Marcos Vinícius Silva',
      status: 'Em Operação',
      horasTrabalhadas: 890
    },
    {
      id: 'PULV-03',
      nome: 'Pulverizador Autopropelido Patriot',
      tipo: 'Aplicação Terrestre de Defensivos',
      operador: 'Renato Oliveira',
      status: 'Standby',
      horasTrabalhadas: 2150
    }
  ];

  alternarSelecao(m: Machine): void {
    const idx = this.selecionadas.indexOf(m.id);
    if (idx >= 0) {
      this.selecionadas.splice(idx, 1);
    } else {
      this.selecionadas.push(m.id);
    }
  }
}
