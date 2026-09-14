# Conceito 28: Animacoes e Transicoes

Este modulo compara a construcao e configuracao de animacoes de interface entre o **Angular 15** e o **Angular 22**, abordando a DSL de animacoes (`@angular/animations`), as diferencas no carregamento de modulos de animacao e o suporte moderno a animacoes assincronas e transicoes de visao.

No contexto da **Fazenda Santa Maria**, a aplicacao monitora alertas agronomicos criticos (geadas, estiagens, pragas e janelas ideais de colheita). Quando novos alertas sao disparados ou descartados pelos operadores de campo, a interface aplica animacoes fluidas de entrada e saida dos cards informativos.

---

## 1. Visao Comparativa Geral

| Aspecto | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Habilitacao de Animacoes** | `BrowserAnimationsModule` obrigatorio no `AppModule` (aumenta o bundle inicial) | `provideAnimationsAsync()` no `app.config.ts` (carrega o motor de animacoes sob demanda) |
| **Impacto no Tempo de Carga Inicial** | O codigo completo do compilador de animacoes e baixado no carregamento inicial | Carregamento assincrono e tardio, mantendo o primeiro render rapido e leve |
| **Integracao com Deteccao de Mudancas** | Vinculado a `zone.js` para sincronizar os ciclos de renderizacao | Totalmente compativel com Deteccao Zoneless orientada a Signals |
| **Transicoes de Rota e Estado** | Restrito a triggers da DSL ou manipulacoes manuais de CSS | Suporte nativo a View Transitions API e integracao com `withViewTransitions()` |
| **Sintaxe de Template** | Diretivas estruturais classicas `*ngFor` com `[@trigger]` | Sintaxe moderna `@for` com rastreamento `track` integrado a triggers da DSL |

---

## 2. O Modelo Legado: Angular 15

No Angular 15, habilitar animacoes exigia a inclusao sincrona do `BrowserAnimationsModule` na raiz da aplicacao:

```typescript
// app.module.ts (Angular 15)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule // Carrega o motor de animacao no bundle principal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Limitacoes do modelo legado:
- **Sobrecarga no bundle principal**: Todo o codigo do runtime de animacoes ficava no bundle inicial, mesmo quando as telas iniciais nao possuiam animacoes.
- **Acoplamento com NgModules**: Cada componente de teste necessitava importar `NoopAnimationsModule` ou `BrowserAnimationsModule` no `TestBed`.

---

## 3. O Modelo Moderno: Angular 22

No Angular 22, o suporte a animacoes foi reformulado para se alinhar a arquitetura Standalone e ao modo Zoneless:

```typescript
// app.config.ts (Angular 22)
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideAnimationsAsync() // Carrega o motor de animacoes de forma assincrona sob demanda
  ]
};
```

### Vantagens do modelo moderno:
- **Zero impacto no primeiro render**: O provider `provideAnimationsAsync()` divide o runtime de animacao em um chunk separado, baixado somente quando a primeira animacao precisa ser executada.
- **Perfeita harmonia com Signals**: As adicoes e remocoes em arrays reativos disparados via `.update()` acionam transicoes suaves sem depender de intervencoes de monkey-patching da Zone.
- **Sintaxe declarativa elegante**: Utiliza `@for (alerta of alertas(); track alerta.id)` combinada diretamente com a animacao `[@cardAnimation]`.

---

## 4. Estrutura dos Projetos

```text
concepts/28-animations/
|-- README.md
|-- v15/
|   |-- package.json                     (porta 4200)
|   `-- src/app/
|       |-- animations/card.animations.ts(trigger, transition, style, animate)
|       |-- models/crop-alert.model.ts   (Interface do alerta agricola)
|       |-- app.module.ts                (BrowserAnimationsModule)
|       `-- app.component.ts             (Componente com lista reativa RxJS)
`-- v22/
    |-- package.json                     (porta 4201)
    `-- src/app/
        |-- animations/card.animations.ts(DSL de animacao compativel)
        |-- models/crop-alert.model.ts   (Interface tipada)
        |-- app.config.ts                (provideAnimationsAsync + Zoneless)
        `-- app.ts                       (Componente standalone com Signals e @for)
```

---

## 5. Roteiro de Migracao

1. **Substituir o modulo no bootstrap**: Troque `BrowserAnimationsModule` por `provideAnimationsAsync()` no array de providers da sua aplicacao.
2. **Reutilizar a DSL**: As definicoes de `trigger`, `transition`, `style` e `animate` sao compativeis entre as versoes, permitindo reaproveitamento direto de codigo.
3. **Migrar o template para a nova sintaxe**: Substitua `*ngFor="let item of items; trackBy: ..."` por `@for (item of items(); track item.id)`.
