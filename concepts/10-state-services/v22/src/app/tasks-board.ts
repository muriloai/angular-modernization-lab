import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { FarmTasksSignalStore, FiltroStatus, Prioridade } from './services/farm-tasks-signal.store';

@Component({
  selector: 'app-tasks-board',
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './tasks-board.html',
  styleUrl: './tasks-board.css'
})
export class TasksBoard {
  readonly store = inject(FarmTasksSignalStore);

  // Sinais de estado local para o formulário de inclusão
  readonly novoTitulo = signal('');
  readonly novoTalhao = signal('Talhão Norte 01 (Soja)');
  readonly novaPrioridade = signal<Prioridade>('media');

  readonly talhoesDisponiveis = [
    'Talhão Norte 01 (Soja)',
    'Talhão Sul 02 (Milho)',
    'Talhão Leste 03 (Algodão)',
    'Talhão Oeste 04 (Café)'
  ];

  adicionarTarefa(): void {
    const titulo = this.novoTitulo().trim();
    if (!titulo) return;

    this.store.adicionarTarefa(
      titulo,
      this.novoTalhao(),
      this.novaPrioridade()
    );

    this.novoTitulo.set('');
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
