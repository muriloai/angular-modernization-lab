# Conceito 11: Roteamento Básico

Comparativo técnico entre a configuração de roteamento clássica baseada em módulo dedicado (`RouterModule.forRoot()`) e a moderna configuração funcional baseada em funções de provedor (`provideRouter()`), cobrindo rotas padrão, redirecionamentos, rotas coringa e navegação programática.

---

## Cenário de Negócio

Para demonstrar a estrutura de navegação entre módulos agrícolas, ambos os projetos implementam o **Portal de Operações da Fazenda Santa Maria**:

- **Rota `/fazendas`**: Visão geral das propriedades rurais, talhões cultivados e culturas ativas (Soja, Milho e Algodão).
- **Rota `/sensores`**: Painel de telemetria dos sensores agrícolas instalados no campo (umidade de solo profundo, estações meteorológicas e pivôs centrais).
- **Rota `/`**: Redirecionamento automático configurado para a rota inicial de fazendas (`redirectTo: 'fazendas', pathMatch: 'full'`).
- **Rota `**`**: Captura de rotas inexistentes (Página 404) com botão de navegação programática para retorno seguro.
- **Barra de Navegação**: Links com realce visual da rota ativa utilizando `routerLinkActive`.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Configuração de Rotas** | Módulo dedicado `AppRoutingModule` | Arquivo limpo de rotas `app.routes.ts` |
| **Provedor do Router** | `RouterModule.forRoot(routes)` no módulo | `provideRouter(routes)` no `app.config.ts` |
| **Importação de Diretivas** | `RouterModule` reexportado e declarado no módulo | `RouterOutlet`, `RouterLink` e `RouterLinkActive` importados diretamente |
| **Divisão de Bundles** | Acoplamento a módulos de roteamento | Desacoplamento funcional nativo e árvores de dependência otimizadas |
| **Injeção do Router** | Injeção via construtor da classe (`constructor(private router: Router)`) | Injeção com a função utilitária `inject(Router)` |

---

## Análise Comparativa Detalhada

### Configuração de Rotas

#### No Angular 15 (`v15/src/app/app-routing.module.ts`)

No Angular clássico, o roteamento exige a criação de uma classe decorada com `@NgModule` que importa o `RouterModule` e o reexporta para a aplicação:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmsComponent } from './pages/farms.component';
import { SensorsComponent } from './pages/sensors.component';
import { NotFoundComponent } from './pages/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'fazendas', pathMatch: 'full' },
  { path: 'fazendas', component: FarmsComponent },
  { path: 'sensores', component: SensorsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

#### No Angular 22 (`v22/src/app/app.routes.ts` e `v22/src/app/app.config.ts`)

No Angular moderno, as rotas são um simples array exportado tipado como `Routes`, registrado diretamente no `app.config.ts` através da função `provideRouter()`:

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { Farms } from './pages/farms';
import { Sensors } from './pages/sensors';
import { NotFound } from './pages/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'fazendas', pathMatch: 'full' },
  { path: 'fazendas', component: Farms },
  { path: 'sensores', component: Sensors },
  { path: '**', component: NotFound }
];

// app.config.ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
```

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/11-router-basics/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/11-router-basics/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
