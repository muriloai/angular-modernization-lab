# Conceito 10: Gerenciamento de Estado com Serviços

Comparativo técnico entre o padrão **Observable Store** (baseado em `BehaviorSubject`, seletores com operadores RxJS e pipe `async`) e o moderno **Signal Store** nativo (baseado em `signal()`, `computed()`, mutações atômicas com `.update()` e exposição segura com `.asReadonly()`).

---

## Cenário de Negócio

Para demonstrar a arquitetura de estado previsível sem bibliotecas externas pesadas, ambos os projetos implementam o **Quadro de Tarefas Operacionais da Fazenda Santa Maria**:

- Gestão de atividades agrícolas críticas: pulverização de defensivos, manutenção de pivôs centrais, calibração de sensores de solo e adubação foliar.
- Estado global do módulo: lista de tarefas, filtro de status (todas, pendentes ou concluídas) e filtro por talhão agrícola.
- Métricas derivadas em tempo real: contagem de tarefas pendentes, tarefas concluídas e taxa percentual de execução da safra.
- Operações de estado: inclusão de nova tarefa, alternância de conclusão, exclusão e alteração de filtros de visualização.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Observable Store) | Angular 22 (Signal Store) |
| :--- | :--- | :--- |
| **Primitiva Central** | `BehaviorSubject<T>` privado | `signal<T>` privado |
| **Encapsulamento de Leitura** | Exposição via `.asObservable()` | Exposição via `.asReadonly()` |
| **Seletores Derivados** | `.pipe(map(...), distinctUntilChanged())` | `computed(() => ...)` memoizado |
| **Mutação de Estado** | `this.subject.next({ ...this.subject.value, ... })` | `this.state.update(s => ({ ...s, ... }))` |
| **Consumo no Template** | Múltiplos pipes `async` ou ViewModel combinada | Leitura direta de sinais `store.tarefasFiltradas()` |
| **Prevenção de Renderizações** | Depende de `distinctUntilChanged` para evitar re-emissões | Avaliação síncrona com igualdade por referência nativa |
| **Desalocação de Recursos** | Risco de vazamento se houver subscrição em serviços | Sem necessidade de gerenciamento manual de subscrições |

---

## Análise Comparativa Detalhada

### Arquitetura do Serviço de Estado

#### No Angular 15 (`v15/src/app/services/farm-tasks-observable.store.ts`)

No Angular clássico, construir uma store previsível requer orquestrar `BehaviorSubject` e encadear operadores RxJS para cada propriedade derivada:

```typescript
// Estado imutável inicial
const initialState: FarmTasksState = {
  tarefas: [],
  filtro: 'todas',
  talhaoFiltro: 'todos'
};

@Injectable({ providedIn: 'root' })
export class FarmTasksObservableStore {
  private readonly state$ = new BehaviorSubject<FarmTasksState>(initialState);

  // Seletores derivados precisam de distinctUntilChanged para evitar ciclos desnecessários
  readonly tarefas$ = this.state$.pipe(
    map(s => s.tarefas),
    distinctUntilChanged()
  );

  readonly tarefasFiltradas$ = this.state$.pipe(
    map(s => this.filtrarTarefas(s.tarefas, s.filtro, s.talhaoFiltro)),
    distinctUntilChanged()
  );

  readonly percentualConclusao$ = this.state$.pipe(
    map(s => {
      if (s.tarefas.length === 0) return 0;
      const concluidas = s.tarefas.filter(t => t.concluida).length;
      return Math.round((concluidas / s.tarefas.length) * 100);
    }),
    distinctUntilChanged()
  );

  adicionarTarefa(titulo: string, talhao: string, prioridade: Prioridade): void {
    const novaTarefa: Tarefa = {
      id: 'task-' + Date.now(),
      titulo,
      talhao,
      prioridade,
      concluida: false
    };

    const estadoAtual = this.state$.getValue();
    this.state$.next({
      ...estadoAtual,
      tarefas: [...estadoAtual.tarefas, novaTarefa]
    });
  }
}
```

_No template, cada seletor requer o pipe `async` ou a criação de uma stream combinada do tipo ViewModel (`vm$`)._

#### No Angular 22 (`v22/src/app/services/farm-tasks-signal.store.ts`)

No Angular moderno, os seletores são sinais derivados declarados com `computed()`. Não há operadores RxJS nem risco de vazamentos de memória:

```typescript
@Injectable({ providedIn: 'root' })
export class FarmTasksSignalStore {
  // Sinal privado de estado com leitura pública protegida
  private readonly _state = signal<FarmTasksState>(initialState);
  readonly state = this._state.asReadonly();

  // Seletores computados síncronos e memoizados
  readonly tarefas = computed(() => this._state().tarefas);
  readonly filtro = computed(() => this._state().filtro);
  readonly talhaoFiltro = computed(() => this._state().talhaoFiltro);

  readonly tarefasFiltradas = computed(() => {
    const s = this._state();
    return this.filtrarTarefas(s.tarefas, s.filtro, s.talhaoFiltro);
  });

  readonly percentualConclusao = computed(() => {
    const total = this.tarefas().length;
    if (total === 0) return 0;
    const concluidas = this.tarefas().filter(t => t.concluida).length;
    return Math.round((concluidas / total) * 100);
  });

  adicionarTarefa(titulo: string, talhao: string, prioridade: Prioridade): void {
    const novaTarefa: Tarefa = {
      id: 'task-' + Date.now(),
      titulo,
      talhao,
      prioridade,
      concluida: false
    };

    this._state.update(s => ({
      ...s,
      tarefas: [...s.tarefas, novaTarefa]
    }));
  }
}
```

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/10-state-services/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/10-state-services/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
