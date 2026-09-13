# Conceito 02: Templates & Data Binding

Comparativo prático da evolução das técnicas de interpolação, vinculação de propriedades, escuta de eventos e vinculação bidirecional entre o **Angular 15** e o **Angular 22**.

---

## Cenário de Negócio

Para demonstrar a comunicação entre componentes e templates, ambos os projetos implementam a interface de **Controle de Vazão de Irrigação (Pivô Central de Soja)**:

- Exibição de dados do pivô (nome, cultura, pressão calculada e operador responsável).
- Controle de vazão através de um componente filho regulador (`FlowRegulator`).
- Sincronização em duas vias (two-way binding) entre o componente pai e o componente filho.
- Habilitação e desabilitação condicional de botões através de property binding.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Interpolação de Dados** | Leitura de propriedades comuns: `{{ vazao }}` | Leitura de Signals como funções: `{{ vazao() }}` |
| **Property Binding** | Vinculação direta em propriedades: `[disabled]="!ativo"` | Vinculação com leitura de sinal: `[disabled]="!ativo()"` |
| **Two-Way Binding em Formulários** | Exige importação de `FormsModule` e diretiva `[(ngModel)]` | Suporta `[(ngModel)]` ou integração direta com Signals |
| **Two-Way Binding em Componentes** | Exige par `@Input() x` + `@Output() xChange = new EventEmitter()` | Substituído pela primitiva `model()` em apenas uma linha |
| **Atualização de Estado Derivado** | Requer métodos manuais ou getters chamados a cada ciclo | `computed()` memoizado que recalcula apenas quando o sinal muda |
| **Encapsulamento de Componente** | Declaração obrigatória em módulo `AppModule` | Standalone por padrão, importado onde for utilizado |

---

## Análise Comparativa Detalhada

### Interpolação e Property Binding

#### No Angular 15 (`v15/src/app/app.component.html`)

```html
<!-- Leitura direta de propriedades do componente -->
<h2>{{ titulo }}</h2>

<!-- Vinculacao de propriedade do elemento HTML -->
<button [disabled]="!modoManual" (click)="redefinirVazao()">
  Redefinir Vazão
</button>
```

_O template lê variáveis de instância normais. A detecção de mudanças (Zone.js) precisa checar a árvore periodicamente para verificar se houve alteração nos valores._

#### No Angular 22 (`v22/src/app/app.html`)

```html
<!-- Leitura de Signals invocados como funcoes reativas -->
<h2>{{ titulo() }}</h2>

<!-- O property binding reage diretamente a alteracoes no signal -->
<button [disabled]="!modoManual()" (click)="redefinirVazao()">
  Redefinir Vazão
</button>
```

_Os valores são lidos através de chamadas a Signals. O Angular sabe com precisão quais nós do DOM dependem de cada sinal, atualizando a tela sem varreduras pesadas._

---

### Componente Filho e Two-Way Data Binding

A grande diferença prática deste conceito está na criação de componentes com vinculação bidirecional (two-way binding customizado).

#### No Angular 15 (`v15/src/app/flow-regulator.component.ts`)

No Angular clássico, criar um binding `[(vazao)]` exige declarar duas propriedades coordenadas: um `@Input()` para receber o valor e um `@Output()` com sufixo `Change` disparando `EventEmitter`:

```typescript
@Component({
  selector: 'app-flow-regulator',
  templateUrl: './flow-regulator.component.html'
})
export class FlowRegulatorComponent {
  // Entrada vinda do componente pai
  @Input() vazao = 0;

  // Emissor obrigatoriamente nomeado com o sufixo Change
  @Output() vazaoChange = new EventEmitter<number>();

  incrementar(): void {
    this.vazao += 50;
    this.vazaoChange.emit(this.vazao);
  }

  decrementar(): void {
    if (this.vazao >= 50) {
      this.vazao -= 50;
      this.vazaoChange.emit(this.vazao);
    }
  }
}
```

No template do pai:
```html
<!-- Sintaxe banana-in-a-box ligando Input e Output -->
<app-flow-regulator [(vazao)]="vazaoLitrosHora"></app-flow-regulator>
```

#### No Angular 22 (`v22/src/app/flow-regulator.ts`)

No Angular moderno, a função `model()` elimina toda essa cerimônia. Ela cria automaticamente um signal gravável que aceita entrada e emite alterações:

```typescript
@Component({
  selector: 'app-flow-regulator',
  templateUrl: './flow-regulator.html'
})
export class FlowRegulator {
  // Cria um signal bidirecional em apenas 1 linha
  readonly vazao = model(0);

  incrementar(): void {
    this.vazao.update(valor => valor + 50);
  }

  decrementar(): void {
    this.vazao.update(valor => Math.max(0, valor - 50));
  }
}
```

No template do pai:
```html
<!-- Funciona com Signals comuns, Signals gravaveis ou propriedades comuns -->
<app-flow-regulator [(vazao)]="vazaoLitrosHora" />
```

_Com `model()`, não é necessário criar `EventEmitter`, nem criar sufixos manuais `Change`, nem importar bibliotecas externas._

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/02-templates-binding/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/02-templates-binding/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
