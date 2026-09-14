# Angular Modernization Lab

Laboratório prático de modernização de código comparando, lado a lado, o ecossistema legado **Angular 15** e o ecossistema moderno do **Angular 22**.

O objetivo deste repositório é demonstrar como funcionalidades equivalentes eram construídas no modelo clássico (com `NgModule`, Zone.js, RxJS obrigatório e Webpack) e como são implementadas com os recursos atuais da plataforma Angular (com arquitetura Standalone nativa, Signals, Zoneless, Vite/esbuild e Resource API).

---

## Arquitetura do Repositório: Conceitos Isolados

Cada conceito técnico possui sua própria pasta independente dentro do diretório `concepts/`, contendo dois mini-projetos funcionais:

```text
concepts/
├── 01-project-structure/
│   ├── README.md               # Explicação técnica e comparativo do conceito
│   ├── v15/                    # Projeto clássico em Angular 15 (NgModule, Zone.js, Webpack)
│   └── v22/                    # Projeto moderno em Angular 22 (Standalone, Signals, Zoneless, Vite)
├── 02-templates-binding/
│   ├── README.md
│   ├── v15/
│   └── v22/
└── ...
```

Desta forma, cada laboratório pode ser compilado, executado e inspecionado individualmente, sem interferência de outros módulos e sem acoplamento de rotas globais.

---

## Módulos e Conceitos do Laboratório

### Fundamentos do Framework

| Conceito | Nome | Tecnologias no Legado (Angular 15) | Tecnologias no Moderno (Angular 22) |
| :--- | :--- | :--- | :--- |
| [01](concepts/01-project-structure/README.md) | Estrutura de Projeto e Inicialização | `AppModule`, `platformBrowserDynamic`, Webpack e `angular.json` clássico | `bootstrapApplication`, `appConfig`, Vite/esbuild e setup minimalista |
| [02](concepts/02-templates-binding/README.md) | Templates e Data Binding | Interpolação `{{ valor }}`, property `[prop]`, event `(click)` e `[(ngModel)]` | Interpolação com signals `{{ valor() }}`, two-way binding com `model()` |
| [03](concepts/03-control-flow/README.md) | Controle de Fluxo | Diretivas estruturais: `*ngIf`, `*ngFor` com `trackBy` e `[ngSwitch]` | Built-in Control Flow nativo: `@if`, `@for` com `track` e `@empty`, `@switch` |
| [04](concepts/04-directives/README.md) | Diretivas de Atributo e Composição | `@Directive`, `@HostListener`, `@HostBinding` e declaração em módulo | Diretivas Standalone e Directive Composition API (`hostDirectives`) |
| [05](concepts/05-pipes/README.md) | Pipes e Transformação de Dados | Pipes built-in clássicos, customizados puros/impuros e dependência do pipe `async` | Pipes standalone, leitura síncrona direta de Signals sem pipe `async` |
| [06](concepts/06-dependency-injection/README.md) | Injeção de Dependências | Injeção obrigatória no construtor `constructor(private svc: Svc)` e tokens legados | Injeção funcional idiomática com `inject()`, providers locais e hierarquia limpa |
| [07](concepts/07-lifecycle-hooks/README.md) | Ciclo de Vida de Componentes | Interfaces `ngOnInit`, `ngOnChanges` com `SimpleChanges`, `ngOnDestroy` com `takeUntil` | `DestroyRef`, `takeUntilDestroyed()`, `afterRender` e `afterNextRender` |

### Reatividade e Gerenciamento de Estado

| Conceito | Nome | Tecnologias no Legado (Angular 15) | Tecnologias no Moderno (Angular 22) |
| :--- | :--- | :--- | :--- |
| [08](concepts/08-change-detection/README.md) | Detecção de Mudanças (Change Detection) | `Zone.js` varrendo a árvore, estratégias `Default` vs `OnPush` e `ChangeDetectorRef` | Arquitetura Zoneless nativa (`provideZonelessChangeDetection`) e atualizações finas |
| [09](concepts/09-signals-vs-rxjs/README.md) | Signals vs RxJS | Reatividade baseada em fluxos: `BehaviorSubject`, `combineLatest` e operadores `map` | Primitivos reativos síncronos: `signal`, `computed`, `effect` e `linkedSignal` |
| [10](concepts/10-state-services/README.md) | Gerenciamento de Estado em Serviços | Observable Store manual com `BehaviorSubject` privado e observables expostos | Signal Store pattern com `.update()`, `.set()` imutável e `.asReadonly()` |

### Roteamento e Navegação

| Conceito | Nome | Tecnologias no Legado (Angular 15) | Tecnologias no Moderno (Angular 22) |
| :--- | :--- | :--- | :--- |
| [11](concepts/11-router-basics/README.md) | Fundamentos de Roteamento | `RouterModule.forRoot()`, `RouterModule.forChild()`, `RouterLink` e módulos de rota | `provideRouter()`, routes array exportado diretamente e `RouterLink` standalone |
| [12](concepts/12-route-params/README.md) | Parâmetros de Rota e Resolvers | Subscrição em `ActivatedRoute.params` / `queryParams` e class resolvers | `withComponentInputBinding()`, parâmetros recebidos via `input()` e functional resolvers |
| [13](concepts/13-lazy-loading/README.md) | Carregamento Sob Demanda (Lazy Loading) | `loadChildren: () => import('./mod').then(m => m.Mod)` baseado em módulos | `loadComponent: () => import('./comp')` e carregamento fino no template com `@defer` |
| [14](concepts/14-route-guards/README.md) | Proteção de Rotas (Route Guards) | Guards baseados em classes (`implements CanActivate`, `CanDeactivate`) | Functional Guards puros (`CanActivateFn`, `CanDeactivateFn`) com `inject()` |
| [15](concepts/15-nested-routes/README.md) | Rotas Filhas e Aninhadas | Rotas filhas com `<router-outlet>` aninhado e layouts acoplados a módulos | Rotas aninhadas standalone, layout components desacoplados e named outlets |

### Formulários e Validação

| Conceito | Nome | Tecnologias no Legado (Angular 15) | Tecnologias no Moderno (Angular 22) |
| :--- | :--- | :--- | :--- |
| [16](concepts/16-template-forms/README.md) | Formulários Baseados em Template | `FormsModule`, `[(ngModel)]`, referências `#form="ngForm"` e validações HTML | `FormsModule` standalone, two-way binding moderno integrado com `model()` |
| [17](concepts/17-reactive-forms/README.md) | Formulários Reativos | `FormGroup`, `FormControl`, `FormBuilder`, Typed Forms e `valueChanges$` | Reactive Forms fortemente tipados integrados a Signals e validações reativas |
| [18](concepts/18-dynamic-forms/README.md) | Formulários Dinâmicos | Geração dinâmica de formulários a partir de esquemas JSON com `FormArray` | Dynamic Forms dinâmicos com Signal Forms, validações condicionais reativas |

### Comunicação HTTP e Resiliência

| Conceito | Nome | Tecnologias no Legado (Angular 15) | Tecnologias no Moderno (Angular 22) |
| :--- | :--- | :--- | :--- |
| [19](concepts/19-http-basics/README.md) | Comunicação HTTP Básica e CRUD | `HttpClientModule`, chamadas imperativas retornando `Observable<T>` | `provideHttpClient()`, chamadas RxJS vs data fetching declarativo com `resource()` |
| [20](concepts/20-interceptors/README.md) | Interceptadores de Requisições (Interceptors) | Class-based `implements HttpInterceptor`, registro com `HTTP_INTERCEPTORS` | Functional Interceptors `HttpInterceptorFn` encadeados com `withInterceptors([])` |
| [21](concepts/21-error-handling/README.md) | Tratamento de Erros e Resiliência | Operadores RxJS `catchError`, `retry` e `ErrorHandler` global baseado em classe | Error Handling moderno com `resource().error()`, fallback UI e Signals em Zoneless |

### Arquitetura de Componentes Avançada

| Conceito | Nome | Tecnologias no Legado (Angular 15) | Tecnologias no Moderno (Angular 22) |
| :--- | :--- | :--- | :--- |
| [22](concepts/22-component-communication/README.md) | Comunicação entre Componentes | Decorators `@Input()`, `@Output()` com `EventEmitter` e banana-in-a-box | Signal inputs `input()`, `input.required()`, `output()` e Signal `model()` |
| [23](concepts/23-content-projection/README.md) | Projeção de Conteúdo e Fallback | Multi-slot `<ng-content>`, falta de fallback nativo e inspeção com `@ContentChild` | Multi-slot `<ng-content>`, suporte nativo a Fallback Content e template limpo |
| [24](concepts/24-view-queries/README.md) | Consultas de Visão (View Queries) | `@ViewChild`, `@ViewChildren(QueryList)` e dependência do `AfterViewInit` | Funções utilitárias `viewChild()`, `viewChildren()` reativas em Signals |
| [25](concepts/25-dynamic-components/README.md) | Componentes Dinâmicos | `ViewContainerRef.createComponent()`, passagem manual de inputs e detecção | Diretiva declarativa `*ngComponentOutlet` com suporte a `inputs` em Signals |
| [26](concepts/26-host-interaction/README.md) | Interação com o Hospedeiro | Decorators `@HostBinding` e `@HostListener` dispersos na classe | Propriedade declarativa `host` nos metadados do `@Component` com Signals |

---

## Pré-requisitos para Execução

### Para os projetos em Angular 22 (`v22`):

- [Node.js](https://nodejs.org/) versão 20.x, 22.x ou superior.
- Gerenciador de pacotes `npm` (incluso no Node.js).
- Terminal compatível (PowerShell, Bash ou Prompt de Comando).
- Editor de código recomendado: Visual Studio Code com extensão Angular Language Service.

### Para os projetos em Angular 15 (`v15`):

- [Node.js](https://nodejs.org/) versão 18.x (recomenda-se o uso de `nvm` ou `fnm` para alternância de versão).
- Gerenciador de pacotes `npm` compatível com Node.js 18.

---

## Como Executar os Laboratórios

Cada conceito possui seus próprios mini-projetos independentes.

### Executando o lado moderno (Angular 22)

Abra o terminal na pasta `v22` do conceito desejado e utilize os comandos da CLI:

```bash
cd concepts/01-project-structure/v22
npm install
npm start
```

Acesse a aplicação no navegador em: `http://localhost:4201`

### Executando o lado clássico (Angular 15)

Certifique-se de ativar o Node.js 18 em seu terminal e execute:

```bash
cd concepts/01-project-structure/v15
npm install
npm start
```

Acesse a aplicação no navegador em: `http://localhost:4200`

Para detalhes específicos de cada laboratório, consulte o arquivo `README.md` localizado na pasta de cada conceito.
