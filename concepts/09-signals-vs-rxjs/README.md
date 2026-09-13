# Conceito 09: Signals vs RxJS

Comparativo aprofundado entre o modelo reativo assíncrono baseado em fluxos (**RxJS**) e o modelo síncrono por dependências finas (**Signals**), analisando `BehaviorSubject`, `combineLatest` e operadores vs `signal()`, `computed()`, `effect()` e `linkedSignal()`.

---

## Cenário de Negócio

Para ilustrar o impacto das duas abordagens na composição de cálculos reativos em cascata, ambos os projetos implementam a **Calculadora de Demanda Hídrica e Custo de Irrigação (Fazenda Santa Maria)**:

- Seleção de cultura agrícola (Soja, Milho ou Algodão), cada qual com coeficiente hídrico próprio.
- Ajuste interativo da área irrigada em hectares e da lâmina de irrigação desejada em milímetros.
- Cálculo de valores derivados em tempo real: volume total de água (m³), horas estimadas de bombeamento e custo elétrico total.
- Sincronização de valores sugeridos com sobrescrita manual: quando a cultura muda, a lâmina de irrigação recomendada deve ser redefinida, permitindo ajustes manuais do operador.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (RxJS) | Angular 22 (Signals) |
| :--- | :--- | :--- |
| **Primitiva de Estado** | `BehaviorSubject<T>` | `signal<T>(valor)` |
| **Composição de Cálculos** | `combineLatest([...]).pipe(map(...))` | `computed(() => expressao)` síncrono |
| **Estado Resetável/Derivado** | Múltiplos subjects ou efeitos colaterais com `tap()` | `linkedSignal()` nativo que sincroniza com a origem |
| **Efeitos Colaterais** | `subscribe()` manual no TypeScript ou operador `tap` | Função declarativa `effect(() => { })` |
| **Consumo no Template** | Pipe `async` obrigatório em múltiplos pontos | Chamada direta da função de sinal `{{ valor() }}` |
| **Glicth-Free (Consistência)** | Risco de emissões intermediárias inconsistentes | Sem glitches: o grafo de dependências resolve em ordem topológica |
| **Gerenciamento de Memória** | Risco constante de vazamentos se faltar `unsubscribe` | Totalmente gerenciado pelo framework sem necessidade de desinscrição |

---

## Análise Comparativa Detalhada

### Composição de Cálculos em Cascata

#### No Angular 15 (`v15/src/app/irrigation-calculator.component.ts`)

No Angular clássico, para calcular o custo total baseado em 4 entradas (cultura, área, lâmina e tarifa), é necessário coordenar múltiplos `BehaviorSubject` com `combineLatest`:

```typescript
// Necessário instanciar e expor Observables para cada propriedade
cultura$ = new BehaviorSubject<string>('soja');
area$ = new BehaviorSubject<number>(50);
lamina$ = new BehaviorSubject<number>(8);
tarifa$ = new BehaviorSubject<number>(0.72);

// Composição de cálculos dependentes via pipe e map
dadosCalculados$ = combineLatest([
  this.cultura$,
  this.area$,
  this.lamina$,
  this.tarifa$
]).pipe(
  map(([cultura, area, lamina, tarifa]) => {
    const volumeM3 = area * lamina * 10;
    const horas = volumeM3 / 180;
    const custo = horas * 75 * tarifa;
    return { volumeM3, horas, custo };
  })
);
```

_No template, cada dado precisa do pipe `async`, ou é necessário desestruturar o objeto com `*ngIf="dadosCalculados$ | async as dados"`._

#### No Angular 22 (`v22/src/app/irrigation-calculator.ts`)

No Angular moderno, os cálculos derivados são declarados com `computed()`. A leitura é direta, síncrona e memoizada:

```typescript
// Sinais de entrada primitivos
readonly cultura = signal<'soja' | 'milho' | 'algodao'>('soja');
readonly areaHectares = signal(50);
readonly tarifaKwh = signal(0.72);

// linkedSignal sincroniza a lâmina recomendada quando a cultura muda,
// permitindo ainda que o usuário a sobrescreva livremente
readonly laminaMm = linkedSignal({
  source: this.cultura,
  computation: c => this.obterLaminaRecomendada(c)
});

// Cálculos derivados limpos e sem operadores
readonly volumeM3 = computed(() => this.areaHectares() * this.laminaMm() * 10);
readonly horasOperacao = computed(() => Number((this.volumeM3() / 180).toFixed(1)));
readonly custoTotal = computed(() => Number((this.horasOperacao() * 75 * this.tarifaKwh()).toFixed(2)));
```

---

### Onde Usar RxJS vs Signals no Angular Moderno?

O advento dos Signals não significa a morte do RxJS, mas redefine suas fronteiras com clareza:

1. **Use Signals para:**
   - Estado síncrono de componentes e serviços.
   - Dados derivados com `computed()`.
   - Vinculação em templates e inputs/outputs de componentes.
   - Reset de estado com `linkedSignal()`.

2. **Use RxJS para:**
   - Eventos assíncronos contínuos no tempo (WebSockets, Server-Sent Events).
   - Operadores de cancelamento e concorrência (`switchMap`, `exhaustMap`, `concatMap`).
   - Debounce e throttle em fluxos de digitação (`debounceTime`, `distinctUntilChanged`).

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/09-signals-vs-rxjs/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/09-signals-vs-rxjs/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
