# Conceito 14: Proteção e Confirmação de Rotas (Route Guards)

Comparativo técnico entre a implementação tradicional de guardas de rota baseadas em classes e interfaces (`CanActivate`, `CanDeactivate`) no Angular 15 e a abordagem moderna e declarativa baseada em funções (`CanActivateFn`, `CanDeactivateFn`) com a função `inject()` no Angular 22.

---

## Cenário de Negócio

Para demonstrar a utilidade real de guardas de rota na **Fazenda Santa Maria**, os projetos implementam dois fluxos críticos da operação agrícola:

1. **Proteção de Acesso (CanActivate)**:
   - O painel de **Comando de Maquinário e Silos** (`/maquinario`) controla pivôs de irrigação, esteiras de secagem e telemetria de colheitadeiras autônomas.
   - O acesso a essa área exige credenciais ativas de Engenheiro Agrônomo ou Operador de Campo. Caso o operador não esteja autenticado, a rota bloqueia a entrada e redireciona automaticamente para a tela de autenticação (`/login`).
2. **Prevenção de Perda de Dados (CanDeactivate)**:
   - Na tela de maquinário, o operador pode preencher um diário de campo ou ordem de serviço de manutenção preventiva.
   - Se houver modificações pendentes no formulário e o operador tentar sair da página (navegando para outra rota), a guarda intercepta a navegação e solicita confirmação expressa antes de permitir o descarte das informações.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Abordagem da Guarda** | Classes de serviço com `@Injectable()` implementando interfaces (`CanActivate`, `CanDeactivate`) | Funções puras tipadas (`CanActivateFn`, `CanDeactivateFn`) |
| **Injeção de Dependências** | Exclusivamente via construtor da classe da guarda | Via função `inject()` no corpo da própria função ou utilitário |
| **Registro em Módulo** | Exige declaração em `providers` do `@NgModule` ou marcação de `@Injectable({ providedIn: 'root' })` | Não requer registro de provider, basta importar e associar à rota |
| **Redirecionamento** | `UrlTree` retornado pelo `Router.parseUrl()` ou `Router.createUrlTree()` | `UrlTree` simplificado com `inject(Router).parseUrl('/login')` |
| **Composição e Reutilização** | Requer herança ou injeção de múltiplos serviços auxiliares | Composição direta de funções em pipelines leves |
| **Boilerplate de Código** | Alto: classes com anotações, construtores e assinaturas de métodos longas | Mínimo: funções arrow sucintas de poucas linhas |

---

## Análise Comparativa Detalhada

### 1. Guarda de Ativação (`CanActivate`)

#### No Angular 15 (`v15/src/app/guards/agro-auth.guard.ts`)

No Angular 15, a guarda é uma classe tipada que implementa a interface `CanActivate`. Suas dependências (`AgroAuthService` e `Router`) precisam ser injetadas explicitamente no construtor:

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AgroAuthService } from '../services/agro-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AgroAuthGuard implements CanActivate {
  constructor(
    private authService: AgroAuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
```

Na configuração de rotas (`app-routing.module.ts`):

```typescript
{
  path: 'maquinario',
  component: MachineryComponent,
  canActivate: [AgroAuthGuard]
}
```

#### No Angular 22 (`v22/src/app/guards/agro-auth.guard.ts`)

No Angular 22, a guarda é simplesmente uma constante tipada com `CanActivateFn`. As dependências são resolvidas via `inject()` no contexto de execução da rota:

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AgroAuthService } from '../services/agro-auth.service';

export const agroAuthGuard: CanActivateFn = () => {
  const authService = inject(AgroAuthService);
  const router = inject(Router);

  return authService.isAuthenticated() ? true : router.parseUrl('/login');
};
```

Na configuração de rotas (`app.routes.ts`):

```typescript
{
  path: 'maquinario',
  loadComponent: () => import('./pages/machinery').then(m => m.Machinery),
  canActivate: [agroAuthGuard]
}
```

---

### 2. Guarda de Desativação (`CanDeactivate`)

#### No Angular 15 (`v15/src/app/guards/unsaved-changes.guard.ts`)

Para checar formulários pendentes, criamos uma interface `HasPendingChanges` e uma classe `UnsavedChangesGuard`:

```typescript
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface HasPendingChanges {
  hasUnsavedChanges(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<HasPendingChanges> {
  canDeactivate(component: HasPendingChanges): boolean {
    if (component.hasUnsavedChanges && component.hasUnsavedChanges()) {
      return confirm('Existem dados não salvos na ordem de manutenção. Deseja realmente sair?');
    }
    return true;
  }
}
```

#### No Angular 22 (`v22/src/app/guards/unsaved-changes.guard.ts`)

No Angular 22, a mesma lógica é expressa de forma concisa através de `CanDeactivateFn<T>`:

```typescript
import { CanDeactivateFn } from '@angular/router';

export interface HasPendingChanges {
  hasUnsavedChanges: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasPendingChanges> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('Existem dados não salvos na ordem de manutenção. Deseja realmente sair?');
  }
  return true;
};
```

---

## Vantagens dos Functional Guards

1. **Menos Código Boilerplate**: Elimina a necessidade de classes de serviço dedicadas, construtores e anotações `@Injectable()`.
2. **Melhor Integração com Tree-Shaking**: Como são funções puras, o empacotador consegue descartar código não utilizado com maior eficiência.
3. **Composição em Linha**: Funções utilitárias como `inject()` facilitam a criação de fábricas de guardas parametrizadas (por exemplo, checagem de permissões granulares de campo).
4. **Sem Registro em Módulos**: Evita conflitos de escopo de injeção em módulos carregados sob demanda.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/14-route-guards/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/14-route-guards/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
