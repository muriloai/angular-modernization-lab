# Conceito 37: Resource API e Data Fetching com Signals

Demonstracao da evolucao no padrao de carregamento e sincronizacao de dados assincronos, comparando o gerenciamento manual de observables e estados no Angular 15 com a introducao da `resource()` API orientada a Signals no Angular 22.

---

## Contexto do Negocio (AgroTech)

Na **Fazenda Santa Maria**, a equipe de pos-colheita opera o modulo de rastreabilidade de silos e armazenagem de graos. Os operadores selecionam diferentes safras (ex: Soja Convencional, Milho Safrinha, Algodao Pluma) para consultar a distribuicao volumetrica, teor de umidade, temperatura media dos silos e laudos fitossanitarios.

* No **Angular 15**, cada requisicao assincrona exige a criacao de pipelines RxJS complexos (`switchMap`, `catchError`, `finalize`), alem de multiplas variaveis de controle de estado (`loading`, `error`, `data`) e subscricoes manuais ou via pipe `async`.
* No **Angular 22**, a primitiva nativa `resource()` conecta diretamente uma fonte reativa de parametros (`request`) a um carregador assincrono (`loader`), expondo sinais com estado de leitura (`value()`), carregamento (`isLoading()`), erro (`error()`) e controle de cancelamento com `AbortSignal`.

---

## Comparativo Tecnico

| Aspecto | Legado (Angular 15) | Moderno (Angular 22) |
| :--- | :--- | :--- |
| **Abordagem de Fetching** | `HttpClient` acoplado a `BehaviorSubject` e `switchMap` | Primitiva declarativa `resource()` orientada a Signals |
| **Estados de Carregamento** | Variaveis booleanas manuais (`isLoading`, `hasError`) | Signals nativos expostos (`isLoading()`, `status()`, `error()`) |
| **Reatividade a Parametros** | Encadeamento manual de streams ou `ngOnChanges` | Funcao reativa `request: () => ({ ... })` recalculada automaticamente |
| **Cancelamento de Requisicoes** | Operador `switchMap` do RxJS | Integracao nativa com `AbortSignal` do navegador |
| **Recarregamento Imperativo** | Disparo de novo valor em Subject interno | Chamada direta ao metodo `resource.reload()` |

---

## Estrutura do Exemplo

```text
37-resource-api/
├── v15/                         # Aplicacao Angular 15
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/grain-batch.model.ts
│   │   │   ├── services/silo.service.ts
│   │   │   ├── app.component.ts # Gerenciamento manual com RxJS
│   │   │   ├── app.component.html
│   │   │   ├── app.component.css
│   │   │   └── app.module.ts
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
└── v22/                         # Aplicacao Angular 22
    ├── src/
    │   ├── app/
    │   │   ├── models/grain-batch.ts
    │   │   ├── services/silo-api.ts
    │   │   ├── app.ts           # Declaracao com resource() e signals
    │   │   ├── app.html
    │   │   ├── app.css
    │   │   └── app.config.ts
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    └── package.json
```

---

## Como Executar

### Versao Angular 15 (`v15`)
Porta padrao: `4200`
```bash
cd concepts/37-resource-api/v15
npm install
npm start
```

### Versao Angular 22 (`v22`)
Porta configurada: `4201`
```bash
cd concepts/37-resource-api/v22
npm install
npm start
```
