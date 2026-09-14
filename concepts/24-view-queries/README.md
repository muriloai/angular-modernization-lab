# Conceito 24: Consultas de Visão e Elementos Filhos (View Queries)

Comparativo técnico entre consultas de visão clássicas baseadas em decorators (`@ViewChild`, `@ViewChildren`, `QueryList`) no Angular 15 e as funções reativas baseadas em Signals (`viewChild`, `viewChildren`, `contentChild`) no Angular 22.

---

## Cenário de Negócio

No centro de controle agronômico da **Fazenda Santa Maria**, o painel de monitoramento da malha de sensores de solo e microclima (`SensorsBoard`) gerencia dezenas de estações espalhadas pelos talhões de safra:

1. **Acesso Direto ao Elemento de Busca do DOM**:
   - O operador precisa de atalhos de teclado e botões para focar instantaneamente o campo de digitação de filtros (`<input #filtroInput>`).
2. **Manipulação em Lote de Instâncias Filhas**:
   - Ao emitir um comando de verificação geral da malha, o painel consulta todas as instâncias renderizadas de etiquetas de sensores (`SensorTag`), invocando rotinas de auto-teste e destaque visual.
3. **Cálculo Reativo de Sensores Conectados**:
   - O sumário do painel calcula dinamicamente o número de sensores operacionais e calibrados a partir das próprias instâncias em tela.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Sintaxe de Consulta** | Decorators `@ViewChild('ref')` e `@ViewChildren(Type)` | Funções `viewChild('ref')` e `viewChildren(Type)` |
| **Tipo de Retorno** | Objeto direto ou estrutura proprietária `QueryList<T>` | Sinal reativo `Signal<T>` ou `Signal<readonly T[]>` |
| **Disponibilidade no Ciclo de Vida** | Indisponível no construtor e `ngOnInit`; acessível apenas em `ngAfterViewInit` | Sinal reativo acessível em qualquer momento (com valor atualizado após a visão renderizar) |
| **Consultas Obrigatórias** | Sem validação em tempo de compilação; exige asserção não-nula (`!`) | Suporte a `viewChild.required<T>()`, lançando erro caso o elemento não exista |
| **Reatividade a Mudanças** | Subscrição manual a `tags.changes.subscribe(...)` do `QueryList` | Integração direta com `computed()` e `effect()` sem subscrições |
| **Desalocação de Memória** | Risco de vazamento caso subscrições em `QueryList.changes` não fossem limpas | Sem subscrições; Signals são coletados automaticamente |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, o acesso a elementos e componentes dependia de decorators de propriedades e hooks de ciclo de vida:

```typescript
// sensors-board.component.ts (Angular 15)
@Component({
  selector: 'app-sensors-board',
  templateUrl: './sensors-board.component.html'
})
export class SensorsBoardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('filtroInput', { static: false }) inputRef!: ElementRef<HTMLInputElement>;
  @ViewChildren(SensorTagComponent) tags!: QueryList<SensorTagComponent>;

  private sub?: Subscription;
  totalAtivos = 0;

  ngAfterViewInit(): void {
    // Só é seguro acessar a query após o hook ngAfterViewInit
    this.atualizarContador();

    // Ouvir adições e remoções dinâmicas de tags filhas
    this.sub = this.tags.changes.subscribe(() => {
      this.atualizarContador();
    });
  }

  focarCampo(): void {
    this.inputRef.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
```

---

### No Angular 22 (`v22`)

No Angular 22, `viewChild()` e `viewChildren()` retornam Signals limpos e declarativos:

```typescript
// sensors-board.ts (Angular 22)
@Component({
  selector: 'app-sensors-board',
  templateUrl: './sensors-board.html'
})
export class SensorsBoard {
  // Consulta a elemento do DOM com validação estrita
  readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('filtroInput');

  // Consulta a múltiplos componentes filhos retornando um Signal de array imutável
  readonly tags = viewChildren(SensorTag);

  // Derivação reativa instantânea sem subscrição e sem lifecycle hook
  readonly totalAtivos = computed(() => {
    return this.tags().filter(t => t.sensor().ativo).length;
  });

  focarCampo(): void {
    this.inputRef().nativeElement.focus();
  }

  destacarTodos(): void {
    for (const tag of this.tags()) {
      tag.ativarDestaqueVisual();
    }
  }
}
```

---

## Vantagens da Abordagem com Signals

1. **Zero Gerenciamento de Subscrições**: Elimina completamente o uso de `QueryList.changes.subscribe()` e a necessidade de desinscrição em `ngOnDestroy`.
2. **Tipagem e Segurança em Tempo de Compilação**: `viewChild.required()` assegura que referências críticas do DOM existam no template.
3. **Composição Natural**: A lista de filhos é um sinal comum, facilitando derivações com `computed()` para contadores, filtros ou validações globais.
4. **Alinhamento com Zoneless**: Não dispara ciclos de verificação desnecessários em toda a árvore de componentes.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/24-view-queries/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/24-view-queries/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
