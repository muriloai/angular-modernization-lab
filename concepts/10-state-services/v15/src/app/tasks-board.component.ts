import { Component } from '@angular/core';
import { FarmTasksObservableStore, FiltroStatus, Prioridade } from './services/farm-tasks-observable.store';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.css']
})
export class TasksBoardComponent {
  novoTitulo = '';
  novoTalhao = 'Talhão Norte 01 (Soja)';
  novaPrioridade: Prioridade = 'media';

  readonly talhoesDisponiveis = [
    'Talhão Norte 01 (Soja)',
    'Talhão Sul 02 (Milho)',
    'Talhão Leste 03 (Algodão)',
    'Talhão Oeste 04 (Café)'
  ];

  constructor(readonly store: FarmTasksObservableStore) {}

  adicionarTarefa(): void {
    if (!this.novoTitulo.trim()) return;

    this.store.adicionarTarefa(
      this.novoTitulo.trim(),
      this.novoTalhao,
      this.novaPrioridade
    );

    this.novoTitulo = '';
  }

  alternarConclusao(id: string): void {
    this.store.alternarConclusao(id);
  }

  removerTarefa(id: string): void {
    this.store.removerTarefa(id);
  }

  definirFiltroStatus(filtro: FiltroStatus): void {
    this.store.definirFiltroStatus(filtro);
  }

  definirFiltroTalhao(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.store.definirFiltroTalhao(target.value);
  }
}
