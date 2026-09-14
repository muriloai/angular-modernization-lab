# Conceito 25: Componentes Dinâmicos (Dynamic Components)

Comparativo técnico entre a instanciação imperativa de componentes em tempo de execução via `ViewContainerRef.createComponent()` no Angular 15 e a abordagem moderna e declarativa com `NgComponentOutlet` e passagem direta de `inputs` no Angular 22.

---

## Cenário de Negócio

No centro meteorológico da **Fazenda Santa Maria**, os operadores personalizam o painel de instrumentos em tempo real selecionando qual widget de telemetria de campo desejam monitorar:

1. **Pluviômetro Digital**:
   - Apresenta o índice pluviométrico acumulado nas últimas 24 horas (milímetros de chuva) e alerta de solo encharcado.
2. **Termohigrômetro de Dossel**:
   - Mede temperatura ambiente e umidade relativa do ar para cálculo de evapotranspiração da cultura.
3. **Anemômetro Ultrassônico**:
   - Monitora rajadas e velocidade média do vento (km/h) para autorizar ou suspender voos de drones de pulverização.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Mecanismo de Instanciação** | Imperativo via `ViewContainerRef.createComponent(TipoComponente)` | Declarativo via diretiva `*ngComponentOutlet="tipoComponente"` no template |
| **Passagem de Entradas (Inputs)** | Atribuição manual nas propriedades da instância (`componentRef.instance.prop = valor`) | Atributo declarativo `inputs: { prop: valor }` suportado nativamente no `NgComponentOutlet` |
| **Limpeza e Destruição** | Chamada imperativa a `vcr.clear()` ou `componentRef.destroy()` | O Angular gerencia a destruição e limpeza do ciclo de vida automaticamente na troca do tipo |
| **Change Detection** | Exigia invocar `componentRef.changeDetectorRef.detectChanges()` manualmente | Atualização reativa limpa e integrada ao modo Zoneless |
| **Boilerplate no TypeScript** | Código extenso para manipular contêineres e referências | TypeScript limpo com Signals definindo o tipo e o mapa de inputs |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, a criação dinâmica de componentes exigia manipular o contêiner de visão (`ViewContainerRef`) diretamente pelo código da classe:

```typescript
// widgets-host.component.ts (Angular 15)
export class WidgetsHostComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true }) vcr!: ViewContainerRef;

  carregarWidget(tipo: Type<any>, dados: any): void {
    // Limpeza imperativa do contêiner anterior
    this.vcr.clear();

    // Instanciação manual do componente filho
    const componentRef = this.vcr.createComponent(tipo);

    // Passagem manual e frágil de inputs via instância
    componentRef.instance.dados = dados;

    // Forçar ciclo de detecção caso necessário
    componentRef.changeDetectorRef.detectChanges();
  }
}
```

---

### No Angular 22 (`v22`)

No Angular 22, a renderização dinâmica é totalmente declarativa no template utilizando `*ngComponentOutlet` com a propriedade `inputs`:

```typescript
// widgets-host.ts (Angular 22)
export class WidgetsHost {
  readonly widgetSelecionado = signal<Type<any>>(PluviometroWidget);

  readonly widgetInputs = computed(() => ({
    dados: this.dadosMeteorologicos()
  }));

  selecionarTipo(novoTipo: Type<any>): void {
    this.widgetSelecionado.set(novoTipo);
  }
}
```

E no template HTML:

```html
<!-- widgets-host.html (Angular 22) -->
<div class="widget-slot">
  <ng-container
    *ngComponentOutlet="widgetSelecionado(); inputs: widgetInputs()">
  </ng-container>
</div>
```

---

## Vantagens da Abordagem Moderna

1. **Separação de Responsabilidades**: A visão permanece declarada no HTML em vez de ser construída por manipulações procedurais no TypeScript.
2. **Passagem de Inputs Reativa**: A alteração dos valores no mapa de `inputs` atualiza os `@Input()` e `input()` do componente instanciado automaticamente.
3. **Gerenciamento de Ciclo de Vida**: O Angular lida com a montagem, execução de hooks e destruição do componente anterior sem vazamentos de memória.

---

## Como Executar

### Angular 15 (`v15`)

```bash
cd concepts/25-dynamic-components/v15
npm install
npm start
```
Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

```bash
cd concepts/25-dynamic-components/v22
npm install
npm start
```
Acesse em: `http://localhost:4201`
