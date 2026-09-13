# Conceito 05: Pipes e Transformação de Dados

Comparativo prático da evolução dos **Pipes** (puros e impuros), do pipe `async` e da moderna abordagem com **Signals** e `computed()` entre o **Angular 15** e o **Angular 22**.

---

## Cenário de Negócio

Para demonstrar a transformação e formatação de dados em tempo real, ambos os projetos implementam a interface de **Auditoria e Monitoramento de Telemetria de Solo (Fazenda Santa Maria)**:

- Formatação monetária de custos de manutenção e datas de leitura com pipes nativos (`currency`, `date`).
- Criação de pipe customizado puro (`sensorStatus`) para converter códigos de status em descrições amigáveis.
- Comparação do consumo de streams assíncronas no template: `Observable` com pipe `async` no Angular 15 vs leitura síncrona de `Signal` no Angular 22.
- Demonstração do alto custo de desempenho de pipes impuros (`pure: false`) e como o Angular moderno resolve filtragens com `computed()` memoizado.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Declaração de Pipes** | Obrigatório registrar no array `declarations` de um `NgModule` | Standalone por padrão, importado diretamente no componente |
| **Consumo de Streams Assíncronas** | Uso obrigatório do pipe `async` (`sensores$ \| async`) | Leitura direta do sinal `sensores()` sem gerenciar subscrições |
| **Pipes de Filtragem e Busca** | Costumavam ser feitos com `pure: false`, degradando a CPU | Substituídos de forma eficiente por funções derivadas `computed()` |
| **Gerenciamento de Subscrição** | `AsyncPipe` subscreve no init e cancela no destroy via Zone.js | Desnecessário com Signals, pois os valores são acessados de forma síncrona |
| **Detecção de Mudanças em Pipes Puros** | Compara referências primitivas ou de objetos a cada tick do Zone | Avaliado apenas quando o sinal dependente dispara uma notificação |

---

## Análise Comparativa Detalhada

### Consumo Assíncrono: Pipe `async` vs Leitura Direta de Signal

#### No Angular 15 (`v15/src/app/app.component.html`)

No modelo clássico baseado em RxJS, os dados chegam como uma stream assíncrona (`Observable`). Para consumir essa stream no template sem causar vazamentos de memória, o desenvolvedor precisa utilizar o pipe `async`:

```html
<!-- O pipe async subscreve no Observable e forca verificacoes via Zone.js -->
<div *ngFor="let s of sensores$ | async; trackBy: trackById">
  <span>{{ s.tipo }}</span>
  <span>{{ s.custoManutencao | currency:'BRL':'symbol':'1.2-2' }}</span>
</div>
```

#### No Angular 22 (`v22/src/app/app.html`)

No Angular moderno, o estado vive em Signals. Como um Signal expõe seu valor de maneira síncrona, não há necessidade de pipes assíncronos para exibir os dados no template:

```html
<!-- Leitura limpa e sincrona sem necessidade de pipe async -->
@for (s of sensores(); track s.id) {
  <div>
    <span>{{ s.tipo }}</span>
    <span>{{ s.custoManutencao | currency:'BRL':'symbol':'1.2-2' }}</span>
  </div>
}
```

---

### O Problema do Pipe Impuro vs `computed()`

#### A Armadilha Clássica do Pipe Impuro (`v15/src/app/pipes/filter-impure.pipe.ts`)

No Angular 15, muitos tutoriais antigos ensinavam a criar pipes com `pure: false` para filtrar listas na tela:

```typescript
@Pipe({
  name: 'filterImpure',
  pure: false // Executa a cada ciclo de deteccao de mudancas do Zone.js!
})
export class FilterImpurePipe implements PipeTransform {
  private chamadas = 0;

  transform(itens: SensorItem[], termo: string): SensorItem[] {
    this.chamadas++;
    console.log(`FilterImpure executado ${this.chamadas} vezes`);
    return itens.filter(i => i.tipo.toLowerCase().includes(termo.toLowerCase()));
  }
}
```

_Como o Zone.js monitora qualquer evento do DOM (clique, digitação, mouseover, timers), esse pipe executa dezenas ou centenas de vezes sem que a lista tenha mudado, gerando alto desperdício de processamento._

#### A Solução Moderna com `computed()` (`v22/src/app/app.ts`)

No Angular 22, não se criam pipes impuros para filtragem. Utiliza-se um sinal computado com memoização automática:

```typescript
// Recalcula exclusivamente quando sensores ou termoFiltro forem alterados
readonly sensoresFiltrados = computed(() => {
  const termo = this.termoFiltro().toLowerCase();
  return this.sensores().filter(s => s.tipo.toLowerCase().includes(termo));
});
```

_O resultado fica em cache. Qualquer outro evento na tela (como cliques ou animações) não reexecuta o filtro, economizando ciclos de processamento._

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/05-pipes/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/05-pipes/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
