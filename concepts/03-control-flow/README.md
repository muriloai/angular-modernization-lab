# Conceito 03: Control Flow

Comparativo prático da evolução das estruturas de controle de fluxo (condicionais, repetições e seleções múltiplas) entre o **Angular 15** e o **Angular 22**.

---

## Cenário de Negócio

Para demonstrar as estruturas de controle em tela, ambos os projetos implementam o painel de **Monitoramento de Sensores de Solo e Telemetria Agrícola (Fazenda Santa Maria)**:

- Controle de ativação do sistema de telemetria (exibição condicional de status operacional).
- Seleção de modo de operação da irrigação (padrão, econômico ou turbina) com tratamentos específicos para cada caso.
- Renderização de lista dinâmica de sensores de campo (umidade, pH, condutividade e temperatura).
- Tratamento de lista vazia quando nenhum sensor for encontrado ou quando filtros forem aplicados.
- Otimização de renderização através de identificador único de item.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Sintaxe Condicional** | Diretiva estrutural `*ngIf="condicao; else blocoElse"` | Sintaxe nativa de bloco `@if (condicao) { } @else { }` |
| **Sintaxe de Repetição** | Diretiva estrutural `*ngFor="let item of lista; trackBy: fn"` | Sintaxe nativa de bloco `@for (item of lista; track item.id)` |
| **Lista Vazia (Empty State)** | Requer `*ngIf` adicional ou template auxiliar separado | Bloco nativo `@empty { }` acoplado diretamente ao `@for` |
| **Seleção Múltipla** | Conjunto de diretivas `[ngSwitch]`, `*ngSwitchCase`, `*ngSwitchDefault` | Bloco nativo `@switch (valor) { @case (x) { } @default { } }` |
| **Importação de Módulos** | Obrigatório importar `CommonModule` em cada módulo ou componente | Integrado ao compilador do Angular, sem necessidade de imports |
| **Estratégia de Tracking** | Opcional, exigindo método `trackById(index, item)` no TypeScript | Obrigatório pelo compilador, aceitando expressão direta como `track item.id` |
| **Desempenho de Renderização** | Criação de views aninhadas via microsintaxe e diretivas | Otimizado diretamente na árvore de nós sem overhead de diretivas |

---

## Análise Comparativa Detalhada

### Condicionais: `*ngIf` vs `@if`

#### No Angular 15 (`v15/src/app/app.component.html`)

No modelo clássico, a renderização condicional utiliza a diretiva `*ngIf`. Para exibir um bloco alternativo, é necessário declarar uma tag `<ng-template>` com variável de referência:

```html
<!-- Exibicao condicional com bloco alternativo via template ref -->
<div *ngIf="sistemaAtivo; else painelDesligado" class="status-box ativo">
  <p>Sistema de telemetria em operacao normal.</p>
</div>

<ng-template #painelDesligado>
  <div class="status-box desligado">
    <p>Atencao: O sistema esta desligado.</p>
  </div>
</ng-template>
```

#### No Angular 22 (`v22/src/app/app.html`)

No Angular moderno, a sintaxe Built-in Control Flow é inspirada em linguagens estruturadas, dispensando referências de template e diretivas auxiliares:

```html
<!-- Sintaxe intuitiva integrada ao compilador -->
@if (sistemaAtivo()) {
  <div class="status-box ativo">
    <p>Sistema de telemetria em operacao normal.</p>
  </div>
} @else {
  <div class="status-box desligado">
    <p>Atencao: O sistema esta desligado.</p>
  </div>
}
```

---

### Seleção Múltipla: `[ngSwitch]` vs `@switch`

#### No Angular 15 (`v15/src/app/app.component.html`)

O Angular 15 exige três diretivas distintas (`ngSwitch`, `ngSwitchCase` e `ngSwitchDefault`):

```html
<div [ngSwitch]="modoOperacao">
  <div *ngSwitchCase="'padrao'">
    <p>Modo Padrao: monitoramento continuo a cada 15 minutos.</p>
  </div>
  <div *ngSwitchCase="'economico'">
    <p>Modo Economico: transmissao reduzida para preservacao de bateria.</p>
  </div>
  <div *ngSwitchCase="'turbina'">
    <p>Modo Turbina: telemetria em tempo real a cada 10 segundos.</p>
  </div>
  <div *ngSwitchDefault>
    <p>Modo Desconhecido.</p>
  </div>
</div>
```

#### No Angular 22 (`v22/src/app/app.html`)

O bloco `@switch` moderno é compilado de forma limpa, com checagem de tipos estrita e sem microsintaxe:

```html
@switch (modoOperacao()) {
  @case ('padrao') {
    <p>Modo Padrao: monitoramento continuo a cada 15 minutos.</p>
  }
  @case ('economico') {
    <p>Modo Economico: transmissao reduzida para preservacao de bateria.</p>
  }
  @case ('turbina') {
    <p>Modo Turbina: telemetria em tempo real a cada 10 segundos.</p>
  }
  @default {
    <p>Modo Desconhecido.</p>
  }
}
```

---

### Listas e Empty State: `*ngFor` vs `@for` e `@empty`

#### No Angular 15 (`v15/src/app/app.component.html`)

O `*ngFor` não possui tratamento nativo para coleções vazias. É necessário envolver a lista em um `*ngIf` adicional ou verificar o tamanho da lista manualmente. Além disso, a função de rastreamento exige boilerplate na classe TypeScript:

```typescript
// Necessario declarar metodo especifico na classe do componente
trackById(index: number, sensor: Sensor): string {
  return sensor.id;
}
```

```html
<!-- Lista de itens com funcao de tracking -->
<div *ngFor="let s of sensores; trackBy: trackById" class="sensor-card">
  <span>{{ s.tipo }}</span>
  <strong>{{ s.valor }} {{ s.unidade }}</strong>
</div>

<!-- Tratamento de lista vazia feito separadamente -->
<div *ngIf="sensores.length === 0" class="empty-box">
  <p>Nenhum sensor encontrado para o filtro selecionado.</p>
</div>
```

#### No Angular 22 (`v22/src/app/app.html`)

O bloco `@for` torna o tracking obrigatório para evitar renderizações desnecessárias e introduz o bloco `@empty` nativo, executado automaticamente quando a coleção tiver tamanho zero:

```html
@for (s of sensores(); track s.id; let idx = $index) {
  <div class="sensor-card">
    <span>#{{ idx + 1 }} - {{ s.tipo }}</span>
    <strong>{{ s.valor }} {{ s.unidade }}</strong>
  </div>
} @empty {
  <div class="empty-box">
    <p>Nenhum sensor encontrado para o filtro selecionado.</p>
  </div>
}
```

_Note que a expressão `track s.id` aponta diretamente para a propriedade do objeto, eliminando a necessidade de criar métodos utilitários na classe TypeScript._

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/03-control-flow/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/03-control-flow/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
