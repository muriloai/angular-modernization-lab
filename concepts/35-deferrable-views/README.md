# Conceito 35: Vistas Adiantadas e Carregamento Granular (@defer)

Este modulo aborda o recurso revolucionario de **Deferrable Views (`@defer`)** introduzido a partir do Angular 17 e consolidado no Angular 22, comparando-o com a complexa abordagem imperativa de lazy loading de componentes utilizada no Angular 15.

No contexto da **Fazenda Santa Maria**, o dashboard de controle agroclimatico exibe mapas meteorologicos pesados, radares de precipitacao por satelite e graficos analiticos de condutividade eletrica do solo. Carregar todos esses componentes no carregamento inicial aumentaria drasticamente o tamanho do bundle e o tempo de interatividade (TTI). Com o `@defer`, esses componentes pesados sao baixados sob demanda apenas quando entram no viewport, sao solicitados por clique do usuario ou disparados por timer.

---

## 1. Visao Comparativa Geral

| Aspecto | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Lazy Loading de Blocos** | Exigia manipulacao manual com `ViewContainerRef.createComponent()`, `import()` dinamico e gerenciamento de estado | Sintaxe nativa e declarativa de template com o bloco `@defer` |
| **Gatilhos de Carregamento** | Listeners manuais de `IntersectionObserver`, eventos de clique e `setTimeout` na classe | Gatilhos nativos e declarativos (`on viewport`, `on interaction`, `on hover`, `on timer`, `on idle`) |
| **Pre-carregamento (Prefetch)** | Exigia logica customizada complexa para baixar o script antes do clique | Clausula nativa `prefetch` combinavel (ex: `@defer (on viewport; prefetch on idle)`) |
| **Estados de Transicao** | Criação manual de spinners, placeholders e tratamentos de erro via booleanos | Blocos declarativos de suporte: `@placeholder`, `@loading` e `@error` |
| **Granularidade do Bundler** | O compilador exigia configuracoes manuais ou gerava bundles maiores | O compilador divide automaticamente qualquer componente dentro de `@defer` em um chunk isolado |

---

## 2. O Modelo Legado: Angular 15

No Angular 15, fazer o carregamento preguicoso de um widget pesado exigia injecao de `ViewContainerRef`, chamada imperativa de `import()` e controle manual de variaveis de carregamento:

```typescript
// app.component.ts (Angular 15)
@Component({
  selector: 'app-root',
  template: `
    <button (click)="loadRadar()">Carregar Radar Meteorológico</button>
    <div *ngIf="isLoading">Baixando módulo do satélite...</div>
    <ng-container #radarContainer></ng-container>
  `
})
export class AppComponent {
  @ViewChild('radarContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  isLoading = false;

  async loadRadar() {
    this.isLoading = true;
    const { WeatherRadarComponent } = await import('./components/weather-radar.component');
    this.container.createComponent(WeatherRadarComponent);
    this.isLoading = false;
  }
}
```

---

## 3. O Modelo Moderno: Angular 22

No Angular 22, o compilador e o framework cuidam de toda a separacao em chunks e do ciclo de vida assincrono diretamente na sintaxe do template:

```html
<!-- app.html (Angular 22) -->
@defer (on viewport; prefetch on idle) {
  <app-weather-radar />
} @placeholder (minimum 500ms) {
  <div class="placeholder-box">
    <span>Role a página para carregar o radar meteorológico...</span>
  </div>
} @loading (after 100ms; minimum 400ms) {
  <div class="loading-box">
    <span>Baixando telemetria de radar por satélite...</span>
  </div>
} @error {
  <div class="error-box">
    <span>Falha ao carregar o widget climático.</span>
  </div>
}
```

### Principais Gatilhos Suportados:
- **`on viewport`**: Dispara quando o placeholder entra na area visivel da tela (Intersection Observer automatico).
- **`on interaction`**: Dispara quando o usuario clica ou foca no elemento.
- **`on hover`**: Dispara quando o ponteiro do mouse sobrepoe o placeholder.
- **`on timer(2s)`**: Dispara apos o tempo estipulado.
- **`on idle`**: Dispara quando a thread principal do navegador esta livre (`requestIdleCallback`).

---

## 4. Estrutura dos Projetos

```text
concepts/35-deferrable-views/
|-- README.md
|-- v15/
|   |-- package.json                     (porta 4200)
|   `-- src/app/
|       |-- components/weather-radar.*   (Widget pesado com mapa)
|       |-- components/soil-analysis.*   (Widget de analise de solo)
|       |-- app.module.ts
|       `-- app.component.*              (Carregamento imperativo manual)
`-- v22/
    |-- package.json                     (porta 4201)
    `-- src/app/
        |-- components/weather-radar.*   (Componente chunked automaticamente)
        |-- components/soil-analysis.*   (Componente chunked automaticamente)
        |-- app.config.ts
        `-- app.*                        (Demonstracao de @defer com multiplos gatilhos)
```

---

## 5. Roteiro de Migracao

1. **Eliminar ViewContainerRef para lazy loading de UI**: Remova codigos com `container.createComponent()` e `await import()`.
2. **Envelopar componentes em @defer**: Aplique `@defer (on viewport)` ou `@defer (on interaction)`.
3. **Adicionar @placeholder e @loading**: Garanta estabilidade visual e prevencao de Cumulative Layout Shift (CLS) com dimensoes reservadas no `@placeholder`.
