# Conceito 01: Project Structure & Bootstrap

Comparativo prático da evolução da estrutura de arquivos e inicialização (_bootstrapping_) entre o **Angular 15** e o **Angular 22**.

---

## Cenário de Negócio

Para ilustrar este conceito, ambos os projetos inicializam o módulo central da **Estação Meteorológica e Telemetria de Solo de Rondonópolis/MT**, exibindo:

- Metadados do framework e versão ativa.
- Modo de bootstrapping utilizado pelo motor do Angular.
- Status de inicialização do sistema de telemetria agrícola.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão                          | Angular 15 (Clássico)                                        | Angular 22 (Moderno)                                          |
| :-------------------------------- | :----------------------------------------------------------- | :------------------------------------------------------------ |
| **Ponto de Entrada (`main.ts`)**  | `platformBrowserDynamic().bootstrapModule(AppModule)`        | `bootstrapApplication(AppComponent, appConfig)`               |
| **Orquestrador de Dependências**  | `app.module.ts` com decorator `@NgModule`                    | `app.config.ts` exportando `ApplicationConfig`                |
| **Declaração do Componente**      | Obrigatório declarar no array `declarations: [AppComponent]` | Standalone por padrão (dispensa `standalone: true`)           |
| **Motor de Compilação & Build**   | Webpack (`@angular-devkit/build-angular:browser`)            | esbuild + Vite (`@angular/build:application`)                 |
| **Tempo de Inicialização em Dev** | Cold start lento com empacotamento completo                  | Inicialização quase instantânea com Vite HMR                  |
| **Zone.js & Polyfills**           | Obrigatório ter `zone.js` nos polyfills                      | Flexível: suporta Zone.js ou `provideZonelessChangeDetection` |

---

## Análise Comparativa Detalhada

### Ponto de Entrada (`main.ts`)

#### No Angular 15 (`v15/src/main.ts`)

```typescript
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

// O compilador precisa carregar a plataforma do browser dinamicamente e compilar o AppModule
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
```

_A aplicação não inicia pelo componente raiz, mas sim por uma classe intermediária (`AppModule`), que por sua vez define quem é o componente inicial (`bootstrap: [AppComponent]`)._

#### No Angular 22 (`v22/src/main.ts`)

```typescript
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { App } from "./app/app";

// O componente raiz é inicializado diretamente com sua configuração funcional
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
```

_Zero intermediários. O componente raiz `App` é bootstrapped diretamente, recebendo provedores funcionais configurados em `appConfig`._

---

### Configuração da Aplicação: `AppModule` vs `appConfig`

#### No Angular 15 (`v15/src/app/app.module.ts`)

```typescript
@NgModule({
  declarations: [AppComponent], // Componentes que pertencem a este módulo
  imports: [BrowserModule], // Módulos externos que exportam diretivas/pipes
  providers: [], // Injeção de serviços
  bootstrap: [AppComponent], // Componente que deve ser inserido no index.html
})
export class AppModule {}
```

_O módulo atua como uma barreira de visibilidade. Se um componente não estiver declarado em um módulo, o Angular não o reconhece._

#### No Angular 22 (`v22/src/app/app.config.ts`)

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })],
};
```

_Configuração limpa e declarativa baseada em um objeto TypeScript simples e funções auxiliares `provide_`.\*

---

### Configuração do `angular.json`

- **v15**: Usa o builder `@angular-devkit/build-angular:browser`. Requer apontamento separado para `main`, `polyfills: ["zone.js"]` e configurações extensas de otimização no Webpack.
- **v22**: Usa o builder `@angular/build:application`. Unifica a saída moderna de navegadores com suporte nativo a ESM, esbuild e Vite para o servidor local de desenvolvimento.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/01-project-structure/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/01-project-structure/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
