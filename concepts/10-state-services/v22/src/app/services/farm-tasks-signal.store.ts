import { computed, Injectable, signal } from '@angular/core';

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
export class FarmTasksSignalStore {
  // Primitiva de estado central baseado em signal privado
  private readonly _state = signal<FarmTasksState>(initialState);

  // Leitura pública segura e encapsulada com asReadonly()
  readonly state = this._state.asReadonly();

  // Seletores derivados computados de forma síncrona e memoizada
  readonly tarefas = computed(() => this._state().tarefas);
  readonly filtro = computed(() => this._state().filtro);
  readonly talhaoFiltro = computed(() => this._state().talhaoFiltro);

  readonly tarefasFiltradas = computed(() => {
    const { tarefas, filtro, talhaoFiltro } = this._state();
    return this.filtrarTarefas(tarefas, filtro, talhaoFiltro);
  });

  readonly totalTarefas = computed(() => this.tarefas().length);

  readonly totalPendentes = computed(() =>
    this.tarefas().filter(t => !t.concluida).length
  );

  readonly totalConcluidas = computed(() =>
    this.tarefas().filter(t => t.concluida).length
  );

  readonly percentualConclusao = computed(() => {
    const total = this.totalTarefas();
    if (total === 0) return 0;
    return Math.round((this.totalConcluidas() / total) * 100);
  });

  adicionarTarefa(titulo: string, talhao: string, prioridade: Prioridade): void {
    const novaTarefa: TarefaAgricola = {
      id: 'task-' + Date.now(),
      titulo,
      talhao,
      prioridade,
      concluida: false
    };

    this._state.update(s => ({
      ...s,
      tarefas: [novaTarefa, ...s.tarefas]
    }));
  }

  alternarConclusao(id: string): void {
    this._state.update(s => ({
      ...s,
      tarefas: s.tarefas.map(t => {
        if (t.id !== id) return t;
        return { ...t, concluida: !t.concluida };
      })
    }));
  }

  removerTarefa(id: string): void {
    this._state.update(s => ({
      ...s,
      tarefas: s.tarefas.filter(t => t.id !== id)
    }));
  }

  definirFiltroStatus(filtro: FiltroStatus): void {
    this._state.update(s => ({
      ...s,
      filtro
    }));
  }

  definirFiltroTalhao(talhaoFiltro: string): void {
    this._state.update(s => ({
      ...s,
      talhaoFiltro
    }));
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
