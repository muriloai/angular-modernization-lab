# Conceito 38: Arquitetura Smart vs Dumb Components

Demonstracao do padrao arquitetural de separacao de responsabilidades entre componentes de orquestracao/estado (Smart/Container) e componentes puramente apresentacionais (Dumb/Presentational), comparando a abordagem clássica com decorators no Angular 15 com as primitivas funcionais `input()` e `output()` no Angular 22.

---

## Contexto do Negocio (AgroTech)

Na **Fazenda Santa Maria**, a coordenacao de mecanizacao agricola gerencia uma frota com dezenas de tratores autonomos, colheitadeiras e pulverizadores autopropelidos. O sistema precisa permitir aos engenheiros visualizar os indicadores operacionais de cada maquina (nivel de diesel/bateria, pressao do oleo, velocidade e horas de motor) e despachar ordens de servico (solicitar manutencao preventiva, alternar modo autonomo ou pausar atividade).

* No **Angular 15**, a comunicacao entre o componente container (`MachineryDashboardComponent`) e o apresentacional (`MachineryCardComponent`) depende de decorators legados `@Input()`, `@Output()` e instancias de `EventEmitter`, associados a modulos NgModule e `ChangeDetectionStrategy.OnPush`.
* No **Angular 22**, o componente apresentacional utiliza `input.required<Machinery>()` e a funcao nativa `output<MachineryAction>()`. O componente Smart orquestra o estado atraves de Signals e servicos injetados com `inject()`, mantendo total separacao de interesses em ambiente puramente Zoneless.

---

## Comparativo Tecnico

| Responsabilidade | Legado (Angular 15) | Moderno (Angular 22) |
| :--- | :--- | :--- |
| **Entradas do Componente Dumb** | Decorator `@Input()` com getters/setters ou ngOnChanges | Funcao `input.required<T>()` reativa baseada em Signal |
| **Saidas do Componente Dumb** | `@Output() event = new EventEmitter<T>()` | Funcao nativa `output<T>()` sem instanciar EventEmitters |
| **Gerenciamento de Estado no Smart** | Observables, BehaviorSubjects ou propriedades mutaveis | Estado centralizado com `signal()` e `computed()` |
| **Injecao de Dependencia no Smart** | Construtor tradicional | Funcao `inject()` |
| **Estrategia de Renderizacao** | `ChangeDetectionStrategy.OnPush` com zone.js | Puramente Zoneless com deteccao granular por Signals |

---

## Estrutura do Exemplo

```text
38-smart-dumb/
├── v15/                         # Aplicacao Angular 15
│   ├── src/
│   │   ├── app/
│   │   │   ├── models/machinery.model.ts
│   │   │   ├── services/machinery.service.ts
│   │   │   ├── components/
│   │   │   │   ├── machinery-card.component.ts   # Dumb (Decorator @Input/@Output)
│   │   │   │   ├── machinery-card.component.html
│   │   │   │   └── machinery-card.component.css
│   │   │   ├── app.component.ts                 # Smart (Container)
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
    │   │   ├── models/machinery.ts
    │   │   ├── services/fleet-manager.ts
    │   │   ├── components/
    │   │   │   ├── machinery-card.ts                # Dumb (input() e output())
    │   │   │   ├── machinery-card.html
    │   │   │   └── machinery-card.css
    │   │   ├── app.ts                               # Smart (Container com Signals)
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
cd concepts/38-smart-dumb/v15
npm install
npm start
```

### Versao Angular 22 (`v22`)
Porta configurada: `4201`
```bash
cd concepts/38-smart-dumb/v22
npm install
npm start
```
