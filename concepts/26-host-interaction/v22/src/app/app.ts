import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Machine } from './models/machine.model';
import { MachineActionCard } from './components/machine-action-card';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MachineActionCard],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 26: Interação com o Hospedeiro no Angular 22';

  readonly selecionadas = signal<string[]>([]);

  readonly maquinas = signal<Machine[]>([
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
  ]);

  alternarSelecao(m: Machine): void {
    this.selecionadas.update(atuais => {
      const idx = atuais.indexOf(m.id);
      if (idx >= 0) {
        return atuais.filter(id => id !== m.id);
      } else {
        return [...atuais, m.id];
      }
    });
  }
}
