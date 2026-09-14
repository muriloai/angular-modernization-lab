# Conceito 40: Parametrizacao de Ambientes e Runtime Feature Flags

Demonstracao das tecnicas de gerenciamento de configuracoes de ambiente e controle de recursos em tempo de execucao (Feature Flags) na Fazenda Santa Maria, contrastando o modelo estatico de `fileReplacements` no Angular 15 com o padrao moderno baseado em `InjectionToken` e Signals reativos no Angular 22.

---

## Contexto do Negocio (AgroTech)

Na **Fazenda Santa Maria**, a plataforma central de gestao opera em diferentes perfis de infraestrutura (Desenvolvimento, Homologacao e Producao). Alem de parametros basicos (URLs de gateways de telemetria e chaves de API agrometeorologica), o sistema controla funcionalidades experimentais atraves de Feature Flags:
* **IA de Previsao de Produtividade** (algoritmo preditivo de sacas por hectare).
* **Piloto Autonomo Noturno** (permissao de operacao de tratores sem supervisao visual direta).
* **Integracao com Mercado Futuro da B3** (cotacao de commodities e hedging automatico).

As diferencas entre os modelos de engenharia sao:
* No **Angular 15**, a parametrizacao baseia-se historicamente na substituicao estatica de arquivos (`fileReplacements`) definida no `angular.json`. Os valores sao congelados no momento do build em `environment.ts` e importados diretamente, dificultando a injecao de configuracoes externas em runtime e a alternancia dinamica de flags.
* No **Angular 22**, a arquitetura adota tipagem estrita com `InjectionToken<AppEnvironment>`, permitindo injecao desacoplada e o gerenciamento de **Feature Flags Reativas** orientadas a Signals (`featureFlags.update()`), permitindo ativar ou suspender recursos do campo em tempo real e sem recarregar a aplicacao.

---

## Comparativo Tecnico

| Aspecto | Legado (Angular 15) | Moderno (Angular 22) |
| :--- | :--- | :--- |
| **Mecanismo de Troca** | `fileReplacements` no `angular.json` | `InjectionToken` com providers configuraveis |
| **Tempo de Definicao** | Build-time estatico (`environment.ts`) | Runtime-friendly com tipagem estrita |
| **Acoplamento** | Import direto de caminho relativo (`../../environments`) | Injetado funcionalmente com `inject(ENVIRONMENT_CONFIG)` |
| **Feature Flags** | Constantes booleanas estaticas congeladas | Signals mutaveis reativos (`signal()`, `computed()`) |
| **Alternancia em Tempo Real** | Exige novo build e deploy do artefato | Alternavel em runtime sem refresh de pagina |

---

## Estrutura do Exemplo

```text
40-environment-config/
├── v15/                         # Aplicacao Angular 15
│   ├── src/
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.prod.ts
│   │   ├── app/
│   │   │   ├── app.component.ts # Leitura estatica do environment
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
    │   │   ├── config/
    │   │   │   ├── app-environment.ts # InjectionToken e interface tipada
    │   │   │   └── feature-flags.service.ts # Gerenciador de flags com Signals
    │   │   ├── app.ts                 # Injeção funcional e reatividade
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
cd concepts/40-environment-config/v15
npm install
npm start
```

### Versao Angular 22 (`v22`)
Porta configurada: `4201`
```bash
cd concepts/40-environment-config/v22
npm install
npm start
```
