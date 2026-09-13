# Conceito 15: Rotas Aninhadas e Padrões de Layout (Nested Routes)

Comparativo técnico entre a estruturação de rotas em múltiplos níveis com módulos acoplados (`children` com `NgModule`) no Angular 15 e a arquitetura moderna com rotas filhas declarativas Standalone no Angular 22.

---

## Cenário de Negócio

Para ilustrar rotas aninhadas e layouts persistentes na **Fazenda Santa Maria**, ambos os projetos implementam a **Central de Monitoramento Operacional do Agronegócio**:

- **Layout Raiz**: Cabeçalho global do sistema da fazenda, status geral da safra e navegação primária.
- **Layout de Dashboard (`/dashboard`)**: Estrutura secundária com cabeçalho de seção dedicado, barra de navegação entre áreas de monitoramento e um ponto de injeção filho (`<router-outlet>`).
- **Rotas Filhas (`children`)**:
  - `/dashboard/metricas`: Métricas agroclimáticas em tempo real (umidade do solo, evapotranspiração, índice pluviométrico).
  - `/dashboard/alertas`: Alertas fitossanitários e incidentes operacionais (lagarta-do-cartucho, ferrugem-asiática, baixa pressão em pivôs).
  - `/dashboard/pivos`: Painel de controle e agendamento de pivôs centrais de irrigação.

O benefício arquitetural essencial demonstrado é a **persistência de estado do layout**: ao alternar entre as abas de métricas, alertas e pivôs, a barra lateral e o cabeçalho do painel permanecem montados, evitando re-renderizações desnecessárias da interface pai.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Organização Arquitetural** | Submódulo dedicado (`DashboardModule`) com `RouterModule.forChild(routes)` | Arquivo de rotas isolado (`dashboard.routes.ts`) exportando um array tipado `Routes` |
| **Componentes de Layout** | Declarados em módulo clássico com `@NgModule` | Componentes Standalone por padrão, sem módulos |
| **Carregamento das Filhas** | Via `loadChildren` referenciando classe de módulo | Via `loadChildren` referenciando diretamente arquivo de rotas ou `children` em linha |
| **Roteamento Interno** | Tag `<router-outlet></router-outlet>` | Tag autocontida `<router-outlet />` com imports pontuais |
| **Deteção de Mudanças** | Baseada em `zone.js` global | Pura e desacoplada em modo Zoneless (`provideZonelessChangeDetection()`) |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, a abordagem idiomática envolve a criação de um módulo de funcionalidade (`DashboardModule`) com seu roteamento próprio (`RouterModule.forChild()`):

```typescript
// dashboard-routing.module.ts
const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'metricas', pathMatch: 'full' },
      { path: 'metricas', component: MetricsComponent },
      { path: 'alertas', component: AlertsComponent },
      { path: 'pivos', component: PivotsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
```

O `DashboardLayoutComponent` disponibiliza um `<router-outlet></router-outlet>` interno onde as telas filhas são montadas.

---

### No Angular 22 (`v22`)

No Angular 22, eliminamos totalmente módulos auxiliares. As rotas filhas são expostas como um array de rotas simples e tipado:

```typescript
// dashboard.routes.ts
import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard-layout').then(m => m.DashboardLayout),
    children: [
      { path: '', redirectTo: 'metricas', pathMatch: 'full' },
      {
        path: 'metricas',
        loadComponent: () => import('./pages/metrics').then(m => m.Metrics)
      },
      {
        path: 'alertas',
        loadComponent: () => import('./pages/alerts').then(m => m.Alerts)
      },
      {
        path: 'pivos',
        loadComponent: () => import('./pages/pivots').then(m => m.Pivots)
      }
    ]
  }
];
```

No roteador principal da aplicação (`app.routes.ts`):

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  }
];
```

---

## Vantagens das Rotas Aninhadas Modernas

1. **Desacoplamento Visual e Estrutural**: Cada sub-seção é dona de sua hierarquia sem poluir a raiz.
2. **Eficiência de Renderização**: O container pai mantém seu ciclo de vida intacto enquanto apenas o conteúdo de rota filha é atualizado.
3. **Lazy Loading Granular**: Tanto o layout do painel quanto cada rota interna podem ser divididos em chunks JavaScript isolados.
4. **Sem Módulos Prolixos**: Redução substantiva de arquivos boilerplate como `module.ts` e `routing.module.ts`.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/15-nested-routes/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/15-nested-routes/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
