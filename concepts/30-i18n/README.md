# Conceito 30: Internacionalizacao (i18n) e Pipes de Localizacao

Este modulo aborda a configuracao de internacionalizacao (i18n) e pipes de localizacao no Angular, comparando a abordagem classica com `AppModule` e `registerLocaleData` com a arquitetura moderna Standalone e orientada a Signals do Angular 22.

No cenario da **Fazenda Santa Maria**, a cooperativa comercializa safras para o mercado domestico e internacional (exportacao para Asia, Europa e America do Norte). Os contratos de venda exigem exibicao dinamica de valores em Reais (BRL) e Dolares (USD), formatacao de datas padrao brasileiro (`dd/MM/yyyy`) e internacional (`yyyy-MM-dd`), e conversoes de unidades de medida (sacas de 60kg vs bushels).

---

## 1. Visao Comparativa Geral

| Aspecto | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Registro de Locales** | Executado no `AppModule` ou no arquivo de bootstrap imperativo | Registrado no `main.ts` ou via provider de aplicacao em `app.config.ts` |
| **Token LOCALE_ID** | Configurado no array `providers` do `@NgModule` | Configurado diretamente no `ApplicationConfig` com `{ provide: LOCALE_ID, useValue: 'pt-BR' }` |
| **Pipes de Formatacao** | Importados em bloco via `CommonModule` no `AppModule` | Importados individualmente (`DatePipe`, `CurrencyPipe`, `DecimalPipe`) em cada componente |
| **Alternancia Dinamica** | Exigia recarregar a aplicacao ou reescrever pipes customizados | Integra-se de forma reativa com Signals e funcoes computadas (`computed()`) |
| **Deteccao de Mudancas** | Dependentes da Zone para reavaliar formatos em eventos de tela | Deteccao Zoneless pura atualizando templates instantaneamente |

---

## 2. O Modelo Legado: Angular 15

No Angular 15, configurar o locale brasileiro exigia importar os dados de locale do pacote `@angular/common/locales/pt` e registra-los antes da inicializacao:

```typescript
// app.module.ts (Angular 15)
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

---

## 3. O Modelo Moderno: Angular 22

No Angular 22, o registro do locale e configurado de forma declarativa e modular no arquivo `app.config.ts` e `main.ts`, enquanto os componentes standalone importam exclusivamente os pipes de formatacao necessarios:

```typescript
// app.config.ts (Angular 22)
import { ApplicationConfig, LOCALE_ID, provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};
```

Nos componentes, a alternancia entre visualizacao nacional e internacional e realizada com Signals de alta performance:

```typescript
// contract-card.ts (Angular 22)
@Component({
  selector: 'app-contract-card',
  imports: [CurrencyPipe, DatePipe, DecimalPipe],
  templateUrl: './contract-card.html'
})
export class ContractCard {
  readonly isExport = input<boolean>(false);
  readonly contract = input.required<ExportContract>();

  readonly displayCurrency = computed(() => this.isExport() ? 'USD' : 'BRL');
  readonly displayLocale = computed(() => this.isExport() ? 'en-US' : 'pt-BR');
}
```

---

## 4. Estrutura dos Projetos

```text
concepts/30-i18n/
|-- README.md
|-- v15/
|   |-- package.json                     (porta 4200)
|   `-- src/app/
|       |-- models/export-contract.model.ts
|       |-- components/contract-card.*   (Componente declarado no AppModule)
|       |-- app.module.ts                (registerLocaleData e LOCALE_ID)
|       `-- app.component.*
`-- v22/
    |-- package.json                     (porta 4201)
    `-- src/app/
        |-- models/export-contract.model.ts
        |-- components/contract-card.*   (Pipes standalone e Signals)
        |-- app.config.ts                (ApplicationConfig com LOCALE_ID)
        `-- app.*
```

---

## 5. Roteiro de Migracao

1. **Transferir providers para app.config.ts**: Mova o objeto `{ provide: LOCALE_ID, useValue: 'pt-BR' }` de `AppModule` para `app.config.ts`.
2. **Importar apenas os pipes necessarios**: Em vez de importar `CommonModule` em massa, adicione apenas `DatePipe`, `CurrencyPipe` ou `DecimalPipe` no array `imports` do componente.
3. **Reatividade com Signals**: Utilize `computed()` para chavear codigos de moeda e formatos de data dinamicamente sem necessidade de recarregar a pagina.
