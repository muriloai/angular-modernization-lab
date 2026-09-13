# Conceito 13: Carregamento Sob Demanda (Lazy Loading) e Deferrable Views

Comparativo técnico entre a divisão de código tradicional baseada em módulos tardios (`loadChildren` com `NgModule`) e o moderno modelo baseado em componentes Standalone sob demanda (`loadComponent`) combinado a blocos de template diferíveis (`@defer`).

---

## Cenário de Negócio

Para ilustrar o impacto no desempenho e na transferência de pacotes (*bundles*), ambos os projetos implementam a **Central de Telemetria e Imagens de Satélite da Fazenda Santa Maria**:

- **Navegação com Divisão de Rota**:
  - Rota principal rápida (`/` e `/operacoes`): Painel operacional leve com status dos talhões.
  - Rota de telemetria pesada (`/telemetria`): Carregada estritamente sob demanda apenas quando o operador solicita a visualização analítica.
- **Carregamento Diferido no Template (Widget Pesado)**:
  - Mapa de reflectância espectral e índice de vegetação por satélite (NDVI da Fazenda Santa Maria).
  - No Angular 15, carregar um componente pesado sob demanda dentro de uma página requer código imperativo e complexo com fábricas dinâmicas.
  - No Angular 22, o bloco nativo `@defer (on interaction)` gerencia automaticamente o carregamento do chunk JavaScript, com blocos declarativos de `@placeholder`, `@loading` e `@error`.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Lazy Loading de Rotas** | `loadChildren: () => import(...).then(m => m.Module)` | `loadComponent: () => import(...).then(m => m.Component)` |
| **Granularidade da Divisão** | Limitada ao nível de rotas e acoplada a módulos | Granularidade mista: rotas (`loadComponent`) e templates (`@defer`) |
| **Widgets Pesados no Template** | Exige criação manual via `ViewContainerRef` | Gerenciado pelo compilador através da sintaxe `@defer` |
| **Estados de Carregamento** | Variáveis booleanas manuais (`isLoading`, `hasError`) | Blocos integrados `@placeholder`, `@loading` e `@error` |
| **Gatilhos de Carregamento** | Listeners imperativos no TypeScript | Gatilhos declarativos nativos (`on interaction`, `on viewport`, `on idle`) |

---

## Análise Comparativa Detalhada

### Divisão de Rotas

#### No Angular 15 (`v15/src/app/app-routing.module.ts`)

No Angular clássico, o lazy loading exige a criação de um módulo filho com suas próprias rotas:

```typescript
const routes: Routes = [
  { path: '', redirectTo: 'operacoes', pathMatch: 'full' },
  { path: 'operacoes', component: OperationsComponent },
  {
    path: 'telemetria',
    loadChildren: () =>
      import('./telemetry/telemetry.module').then(m => m.TelemetryModule)
  }
];
```

#### No Angular 22 (`v22/src/app/app.routes.ts`)

No Angular moderno, a rota referencia diretamente o componente Standalone:

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'operacoes', pathMatch: 'full' },
  {
    path: 'operacoes',
    loadComponent: () =>
      import('./pages/operations').then(m => m.Operations)
  },
  {
    path: 'telemetria',
    loadComponent: () =>
      import('./pages/telemetry').then(m => m.Telemetry)
  }
];
```

---

### Carregamento de Componentes Pesados no Template

#### No Angular 22 com `@defer` (`v22/src/app/pages/telemetry.html`)

O Angular 22 introduz a sintaxe `@defer`, transferindo o chunk JavaScript do mapa satelital apenas quando o usuário clica no gatilho de interação:

```html
@defer (on interaction(triggerBtn)) {
  <app-satellite-map />
} @placeholder {
  <div class="placeholder-box">
    <button #triggerBtn type="button" class="btn btn-primary">
      Carregar Mapa de Satélite NDVI (Download sob Demanda)
    </button>
  </div>
} @loading (minimum 400ms) {
  <div class="loading-box">
    Baixando pacote do mapa de satélite...
  </div>
} @error {
  <div class="error-box">
    Falha ao carregar o módulo de imagens de satélite.
  </div>
}
```

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/13-lazy-loading/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/13-lazy-loading/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
