import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export type Prioridade = 'baixa' | 'media' | 'alta';
export type FiltroStatus = 'todas' | 'pendentes' | 'concluidas';

export interface TarefaAgricola {
  id: string;
  titulo: string;
  talhao: string;
  prioridade: Prioridade;
  concluida: boolean;
}

export interface FarmTasksState {
  tarefas: TarefaAgricola[];
  filtro: FiltroStatus;
  talhaoFiltro: string;
}

const initialState: FarmTasksState = {
  tarefas: [
    {
      id: 'task-1',
      titulo: 'Pulverização preventiva contra ferrugem asiática',
      talhao: 'Talhão Norte 01 (Soja)',
      prioridade: 'alta',
      concluida: false
    },
    {
      id: 'task-2',
      titulo: 'Manutenção preventiva dos bicos do pivô central',
      talhao: 'Talhão Sul 02 (Milho)',
      prioridade: 'media',
      concluida: true
    },
    {
      id: 'task-3',
      titulo: 'Calibração dos sensores de umidade de solo profundo',
      talhao: 'Talhão Leste 03 (Algodão)',
      prioridade: 'alta',
      concluida: false
    },
    {
      id: 'task-4',
      titulo: 'Adubação de cobertura nitrogenada',
      talhao: 'Talhão Norte 01 (Soja)',
      prioridade: 'baixa',
      concluida: true
    }
  ],
  filtro: 'todas',
  talhaoFiltro: 'todos'
};

@Injectable({ providedIn: 'root' })
export class FarmTasksObservableStore {
  // Primitiva de estado central baseado em BehaviorSubject
  private readonly state$ = new BehaviorSubject<FarmTasksState>(initialState);

  // Seletores derivados reativos usando operadores RxJS
  readonly tarefas$: Observable<TarefaAgricola[]> = this.state$.pipe(
    map(s => s.tarefas),
    distinctUntilChanged()
  );

  readonly filtro$: Observable<FiltroStatus> = this.state$.pipe(
    map(s => s.filtro),
    distinctUntilChanged()
  );

  readonly talhaoFiltro$: Observable<string> = this.state$.pipe(
    map(s => s.talhaoFiltro),
    distinctUntilChanged()
  );

  readonly tarefasFiltradas$: Observable<TarefaAgricola[]> = this.state$.pipe(
    map(s => this.filtrarTarefas(s.tarefas, s.filtro, s.talhaoFiltro)),
    distinctUntilChanged()
  );

  readonly totalTarefas$: Observable<number> = this.tarefas$.pipe(
    map(t => t.length),
    distinctUntilChanged()
  );

  readonly totalPendentes$: Observable<number> = this.tarefas$.pipe(
    map(t => t.filter(item => !item.concluida).length),
    distinctUntilChanged()
  );

  readonly totalConcluidas$: Observable<number> = this.tarefas$.pipe(
    map(t => t.filter(item => item.concluida).length),
    distinctUntilChanged()
  );

  readonly percentualConclusao$: Observable<number> = this.tarefas$.pipe(
    map(t => {
      if (t.length === 0) return 0;
      const concluidas = t.filter(item => item.concluida).length;
      return Math.round((concluidas / t.length) * 100);
    }),
    distinctUntilChanged()
  );

  adicionarTarefa(titulo: string, talhao: string, prioridade: Prioridade): void {
    const novaTarefa: TarefaAgricola = {
      id: 'task-' + Date.now(),
      titulo,
      talhao,
      prioridade,
      concluida: false
    };

    const estadoAtual = this.state$.getValue();
    this.state$.next({
      ...estadoAtual,
      tarefas: [novaTarefa, ...estadoAtual.tarefas]
    });
  }

  alternarConclusao(id: string): void {
    const estadoAtual = this.state$.getValue();
    this.state$.next({
      ...estadoAtual,
      tarefas: estadoAtual.tarefas.map(t => {
        if (t.id !== id) return t;
        return { ...t, concluida: !t.concluida };
      })
    });
  }

  removerTarefa(id: string): void {
    const estadoAtual = this.state$.getValue();
    this.state$.next({
      ...estadoAtual,
      tarefas: estadoAtual.tarefas.filter(t => t.id !== id)
    });
  }

  definirFiltroStatus(filtro: FiltroStatus): void {
    const estadoAtual = this.state$.getValue();
    this.state$.next({
      ...estadoAtual,
      filtro
    });
  }

  definirFiltroTalhao(talhaoFiltro: string): void {
    const estadoAtual = this.state$.getValue();
    this.state$.next({
      ...estadoAtual,
      talhaoFiltro
    });
  }

  private filtrarTarefas(
    tarefas: TarefaAgricola[],
    filtro: FiltroStatus,
    talhao: string
  ): TarefaAgricola[] {
    return tarefas.filter(t => {
      const matchStatus =
        filtro === 'todas' ? true : filtro === 'pendentes' ? !t.concluida : t.concluida;
      const matchTalhao = talhao === 'todos' ? true : t.talhao.includes(talhao);
      return matchStatus && matchTalhao;
    });
  }
}
