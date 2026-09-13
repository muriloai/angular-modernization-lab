# Conceito 07: Ciclo de Vida de Componentes

Comparativo prático da evolução dos **Ciclos de Vida (Lifecycle Hooks)** entre o **Angular 15** e o **Angular 22**, contrastando o modelo clássico de interfaces (`ngOnInit`, `ngOnChanges`, `ngOnDestroy`) com os recursos modernos `DestroyRef`, `takeUntilDestroyed()`, `afterNextRender()` e `effect()`.

---

## Cenário de Negócio

Para demonstrar o ciclo de vida e a liberação de recursos em tempo de execução, ambos os projetos implementam a interface de **Monitoramento Contínuo de Sensor de Umidade (Fazenda Santa Maria)**:

- Inicialização de rotina de telemetria periódica (intervalo de tempo que gera leituras simuladas).
- Monitoramento de alterações em propriedades de entrada (taxa de amostragem e identificador do sensor).
- Acesso e manipulação segura de nós do DOM após renderização na tela.
- Montagem e desmontagem dinâmica do componente para evidenciar a liberação de memória e encerramento de timers.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Implementação de Ciclo** | Implementação explícita de interfaces (`OnInit`, `OnDestroy`, etc.) | Funções declarativas invocadas no contexto de injeção |
| **Limpeza de Subscrições** | Criação manual de `destroy$ = new Subject<void>()` e `takeUntil` | Operador `takeUntilDestroyed()` automático via `DestroyRef` |
| **Registro de Destruição** | Método obrigatório `ngOnDestroy()` na classe | Callback declarativo `inject(DestroyRef).onDestroy()` |
| **Reação a Mudanças de Inputs** | Método `ngOnChanges(changes: SimpleChanges)` | Primitiva reativa `effect()` acoplada a inputs baseados em Signals |
| **Acesso ao DOM após Render** | Método `ngAfterViewInit()` sujeito a erros de SSR | Funções `afterRender()` e `afterNextRender()` seguras para o navegador |

---

## Análise Comparativa Detalhada

### Limpeza e Destruição: `ngOnDestroy` vs `takeUntilDestroyed()`

#### No Angular 15 (`v15/src/app/sensor-monitor.component.ts`)

No modelo clássico, cancelar timers e subscrições do RxJS exige muito código repetitivo:

```typescript
export class SensorMonitorComponent implements OnInit, OnDestroy {
  // Boilerplate obrigatorio para evitar vazamento de memoria
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    interval(3000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.coletarLeitura());
  }

  ngOnDestroy(): void {
    // Se o desenvolvedor esquecer estas linhas, ocorrera vazamento de memoria
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

#### No Angular 22 (`v22/src/app/sensor-monitor.ts`)

No Angular 22, o operador `takeUntilDestroyed()` descobre automaticamente o ciclo de vida do componente através do `DestroyRef`:

```typescript
export class SensorMonitor {
  constructor() {
    // O operador takeUntilDestroyed cancela a subscricao automaticamente quando o componente e destruido
    interval(3000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.coletarLeitura());
  }
}
```

---

### Reação a Alterações: `ngOnChanges` vs `effect()`

#### No Angular 15 (`v15/src/app/sensor-monitor.component.ts`)

O `ngOnChanges` recebe um objeto `SimpleChanges` que precisa ser verificado por chaves de string, sem tipagem direta:

```typescript
ngOnChanges(changes: SimpleChanges): void {
  if (changes['frequenciaSegundos'] && !changes['frequenciaSegundos'].firstChange) {
    this.reconfigurarTaxa(this.frequenciaSegundos);
  }
}
```

#### No Angular 22 (`v22/src/app/sensor-monitor.ts`)

Com Signals, o `effect()` rastreia a dependência de forma limpa:

```typescript
readonly frequenciaSegundos = input(3);

constructor() {
  effect(() => {
    // Executa automaticamente quando o signal frequenciaSegundos sofrer alteracao
    const novaFreq = this.frequenciaSegundos();
    this.reconfigurarTaxa(novaFreq);
  });
}
```

---

### Acesso ao DOM: `ngAfterViewInit` vs `afterNextRender()`

O `ngAfterViewInit` do Angular clássico costuma gerar o erro clássico `ExpressionChangedAfterItHasBeenCheckedError` se algum valor for alterado logo após o render. Além disso, ele executa no servidor durante Server-Side Rendering (SSR), onde o DOM não existe.

A função moderna `afterNextRender()` executa apenas no navegador e garante que a árvore do DOM já foi completamente construída e calculada.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/07-lifecycle-hooks/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/07-lifecycle-hooks/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
