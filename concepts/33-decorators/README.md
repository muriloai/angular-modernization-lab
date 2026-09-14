# Conceito 33: Migracao de Decorators para APIs Funcionais

Este modulo apresenta o guia definitivo de transicao dos decorators classicos de propriedade do Angular para as modernas **APIs Funcionais** e reativas consolidadas no Angular 22.

No cenario da **Fazenda Santa Maria**, o componente gerencia um **Pivo Central de Irrigacao** (`IrrigationPivot`), controlando vazao de agua, pressao barometrica, estado do motor e telemetria de seguranca. O laboratorio demonstra lado a lado o mesmo componente implementado com 8 decorators classicos no Angular 15 e sua versao equivalente 100% funcional e reativa no Angular 22.

---

## 1. Tabela Definitiva de Correspondencia

| Decorator Classico (Angular 15) | API Funcional Moderna (Angular 22) | Beneficio Principal na Modernizacao |
| :--- | :--- | :--- |
| `@Input() nome: string` | `readonly nome = input<string>()` | Retorna um Signal imutavel com inferencia de tipo rigorosa |
| `@Input({ required: true }) id` | `readonly id = input.required<string>()` | Tipagem segura sem necessidade de operador de assercao `!` |
| `@Output() alterou = new EventEmitter()` | `readonly alterou = output<string>()` | Sem dependencia de RxJS na emissao de eventos do template |
| `@HostBinding('class.ativo') ativo` | Objeto `host: { '[class.ativo]': 'ativo()' }` | Configuracao declarativa centralizada nos metadados do `@Component` |
| `@HostListener('click') aoClicar()` | Objeto `host: { '(click)': 'aoClicar()' }` | Sintaxe declarativa limpa sem espalhar metodos decorados |
| `@ViewChild('alvo') alvo!: ElementRef` | `readonly alvo = viewChild<ElementRef>('alvo')` | Query reativa baseada em Signal disponivel sem depender de `AfterViewInit` |
| `@ViewChildren(Item) itens!: QueryList` | `readonly itens = viewChildren(Item)` | Retorna Signal de array reativo eliminando a classe legada `QueryList` |
| `@ContentChild('slot') slot` | `readonly slot = contentChild('slot')` | Inspecao reativa de conteudo projetado via Signal |
| `@Inject(TOKEN) private servico` | `private readonly servico = inject(TOKEN)` | Injecao declarativa de escopo sem poluir a assinatura do construtor |

---

## 2. O Modelo Legado: Angular 15

No Angular 15, a classe do componente acumulava diversos decorators de propriedade e metodos:

```typescript
// pivot-panel.component.ts (Angular 15)
import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pivot-panel',
  templateUrl: './pivot-panel.component.html'
})
export class PivotPanelComponent {
  @Input() pivotId!: string;
  @Input() pressureBar: number = 2.5;
  @Output() pressureAdjusted = new EventEmitter<number>();

  @HostBinding('class.pivot-card') hostClass = true;
  @HostBinding('class.active-pivot') isActive = false;

  @HostListener('click')
  onCardClick() {
    this.isActive = !this.isActive;
  }

  @ViewChild('gauge') gauge!: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document) {}
}
```

---

## 3. O Modelo Moderno: Angular 22

No Angular 22, todos os decorators de propriedades e metodos foram substituidos por funcoes e configuracoes de metadados:

```typescript
// pivot-panel.ts (Angular 22)
import { Component, input, output, viewChild, ElementRef, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pivot-panel',
  templateUrl: './pivot-panel.html',
  host: {
    'class': 'pivot-card',
    '[class.active-pivot]': 'isActive()',
    '(click)': 'onCardClick()'
  }
})
export class PivotPanel {
  private readonly document = inject(DOCUMENT);

  readonly pivotId = input.required<string>();
  readonly pressureBar = input<number>(2.5);
  readonly pressureAdjusted = output<number>();

  readonly gauge = viewChild<ElementRef>('gauge');
  readonly isActive = signal(false);

  onCardClick(): void {
    this.isActive.update(v => !v);
  }
}
```

---

## 4. Estrutura dos Projetos

```text
concepts/33-decorators/
|-- README.md
|-- v15/
|   |-- package.json                     (porta 4200)
|   `-- src/app/
|       |-- models/pivot.model.ts        (Modelo de dados do pivo)
|       |-- components/pivot-panel.*     (Componente decorado extensivamente)
|       |-- app.module.ts
|       `-- app.component.*
`-- v22/
    |-- package.json                     (porta 4201)
    `-- src/app/
        |-- models/pivot.model.ts
        |-- components/pivot-panel.*     (Componente funcional livre de decorators)
        |-- app.config.ts
        `-- app.*
```

---

## 5. Roteiro de Migracao

1. **Substituir `@Input` e `@Output`**: Migre para `input()`, `input.required()` e `output()`.
2. **Centralizar `@HostBinding` e `@HostListener`**: Transfira classes, atributos e eventos do hospedeiro para o objeto `host: {}` do `@Component`.
3. **Substituir consultas de visao**: Troque `@ViewChild` e `@ViewChildren` pelas funcoes `viewChild()` e `viewChildren()`.
4. **Eliminar `@Inject`**: Adote `inject()` diretamente na inicializacao dos atributos da classe.
