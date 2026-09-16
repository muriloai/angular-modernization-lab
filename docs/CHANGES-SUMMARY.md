# Resumo Consolidado das Mudanças de Modernização (Angular 15 para Angular 22)

Este documento sintetiza os saltos tecnológicos e arquiteturais que ocorreram entre o **Angular 15** (a versão clássica com NgModules, Zone.js e Webpack) e o **Angular 22** (a versão moderna baseada em Standalone nativo, Signals, arquitetura Zoneless e Vite).

---

## 1. Sistema de Projetos, Ferramentas de Build e Inicialização

| Dimensão | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Inicialização da Aplicação** | `platformBrowserDynamic().bootstrapModule(AppModule)` com arquivo `app.module.ts` obrigatório. | `bootstrapApplication(AppComponent, appConfig)` direto, limpo e declarativo sem necessidade de módulo. |
| **Motor de Build e Bundler** | Webpack (`@angular-devkit/build-angular:browser`) com build lento e recarregamento pesado. | Vite + esbuild (`@angular/build:application`) com HMR ultrarrápido e empacotamento otimizado. |
| **Arquitetura de Componentes** | Obrigação de declaração em `@NgModule` (`declarations: [...]`) e importação de módulos intermediários. | Standalone por padrão nativamente, importando dependências diretamente no `@Component({ imports: [...] })`. |
| **Provedores Globais** | Configuração de serviços via `providers` de `NgModule` ou módulos de terceiros (`forRoot()`). | Provedores funcionais limpos e encadeáveis através de funções `provide*()` (`provideRouter`, `provideHttpClient`). |
| **Polyfills e Carga Inicial** | Dependência obrigatória de `zone.js` nos polyfills do bundle inicial, aumentando o peso da aplicação. | Setup minimalista sem necessidade de `zone.js`, gerando bundles muito mais enxutos. |

---

## 2. Detecção de Mudanças e Renderização (Change Detection)

| Dimensão | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Mecanismo de Detecção** | `zone.js` realizando monkey-patching em todas as APIs assíncronas do navegador (`setTimeout`, eventos do DOM, `fetch`). | Arquitetura **Zoneless** nativa via `provideZonelessChangeDetection()`, eliminando interceptações globais. |
| **Granularidade de Atualização** | Varredura completa da árvore de componentes (*top-down dirty checking*) a cada evento disparado. | Notificação e renderização cirúrgica focada apenas nos componentes e expressões dependentes de Signals alterados. |
| **Otimização Manual** | Uso obrigatório de `ChangeDetectionStrategy.OnPush` com chamadas manuais a `ChangeDetectorRef.markForCheck()`. | Reatividade precisa automática e dispensabilidade de dirty checking manual em toda a árvore. |
| **Consumo de CPU e Memória** | Sobrecarga contínua em aplicações ricas em eventos em tempo real, loops de animação ou streaming. | Consumo mínimo de CPU e zero verificações desnecessárias fora dos dados que sofreram mutação. |

---

## 3. Primitivos de Reatividade e Gerenciamento de Estado

| Dimensão | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Estado Reativo Primário** | `BehaviorSubject<T>` ou `Subject<T>` do RxJS, exigindo manipulação assíncrona de fluxos para estado local. | Primitivo síncrono nativo `signal(valor)` com leitura por chamada de função (`meuSignal()`) e escrita via `.set()` e `.update()`. |
| **Estado Derivado** | Encadeamento manual de `combineLatest`, `map`, `distinctUntilChanged` e subscrições adicionais. | `computed(() => ...)` síncrono, com memoização automática e recalculado apenas quando suas dependências mudam. |
| **Efeitos Colaterais** | Subscrições manuais com `.subscribe()` propensas a vazamento de memória se não canceladas no destroy. | `effect(() => ...)` com rastreamento automático de dependências e limpeza de ciclo de vida gerenciada pelo framework. |
| **Sincronização de Estado Dependente**| Lógica imperativa complexa para sincronizar seleções ou filtros com listas pai. | Primitiva `linkedSignal()` que recalcula ou redefine seu estado automaticamente quando o sinal pai é atualizado. |
| **Interoperabilidade** | Dependência integral de operadores RxJS até mesmo para exibições estáticas de valores. | Utilitários `toSignal()` e `toObservable()` conectando o melhor de Signals síncronos com fluxos assíncronos RxJS. |

---

## 4. Templates e Sintaxe de Controle de Fluxo

| Dimensão | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Renderização Condicional** | Diretivas estruturais `*ngIf="condicao; else tmpl"` exigindo tags `<ng-template>` auxiliares. | Built-in Control Flow nativo e declarativo com `@if (condicao()) { ... } @else if { ... } @else { ... }`. |
| **Iteração de Coleções** | Diretiva estrutural `*ngFor="let item of items; trackBy: fn"` com facilidade de esquecer o `trackBy`. | Bloco `@for (item of items(); track item.id)` nativo com cláusula de tracking obrigatória para alta performance. |
| **Tratamento de Coleções Vazias** | Exigia criar uma verificação condicional separada manual com `*ngIf="items.length === 0"`. | Cláusula nativa `@empty` integrada diretamente dentro da estrutura do `@for`. |
| **Seleção Múltipla (Switch)** | Diretiva estrutural verbosa `[ngSwitch]` com elementos de marcação `<container *ngSwitchCase>`. | Bloco compacto nativo `@switch (valor()) { @case ('A') { ... } @default { ... } }`. |
| **Ligação Bidirecional (Two-Way)**| `[(ngModel)]` dependente da importação do `FormsModule` em módulo. | Primitiva `model()` tipada, permitindo two-way binding direto em componentes com sintaxe `[(value)]="meuValor"`. |

---

## 5. Injeção de Dependências e APIs Funcionais

| Dimensão | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Injeção de Serviços** | Obrigatória dentro do construtor da classe (`constructor(private svc: Servico) {}`). | Função utilitária funcional `inject(Servico)` declarada diretamente como inicializador de propriedade de campo. |
| **Entradas de Componentes** | Decorator mutável `@Input() propriedade: tipo` sujeito a valores indefinidos no momento da criação. | Função reativa `input<tipo>()` e `input.required<tipo>()`, gerando signals somente leitura e fortemente tipados. |
| **Saídas e Eventos** | Decorator `@Output() evento = new EventEmitter<tipo>()`. | Função limpa e declarativa `output<tipo>()` com despacho direto através de `.emit()`. |
| **Consultas ao DOM e Filhos** | Decorators `@ViewChild()` e `@ContentChild()` com resolução diferida dependente de `ngAfterViewInit`. | Funções reativas `viewChild()`, `viewChildren()`, `contentChild()` retornando signals sincronizados com o DOM. |
| **Interação com o Hospedeiro** | Decorators dispersos pela classe (`@HostBinding('class.ativo')`, `@HostListener('click')`). | Propriedade declarativa unificada `host: { ... }` dentro dos metadados do `@Component`. |
| **Composição de Comportamentos** | Herança de classes base ou uso de decorators complexos para reutilizar lógica de componentes. | Directive Composition API (`hostDirectives`) para aplicar comportamentos modulares sem herança. |

---

## 6. Roteamento e Navegação

| Dimensão | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Definição de Rotas** | Módulos dedicados (`AppRoutingModule`) usando `RouterModule.forRoot()` e `RouterModule.forChild()`. | Provedor funcional `provideRouter(routes)` com array puro de rotas exportado diretamente em arquivo TypeScript. |
| **Leitura de Parâmetros** | Injetar `ActivatedRoute` no construtor e criar subscrições em observables como `paramMap.subscribe(...)`. | Configuração `withComponentInputBinding()` que entrega parâmetros de rota e query diretamente em `input()`. |
| **Carregamento Sob Demanda** | `loadChildren: () => import('./modulo').then(m => m.MeuModulo)` amarrado a módulos inteiros. | `loadComponent: () => import('./component').then(c => c.MeuComp)` direto no nível do componente. |
| **Carregamento Adiantado no Template**| Inexistente; exigia carregamento dinâmico manual complexo via `ViewContainerRef.createComponent()`. | Blocos declarativos `@defer (on viewport; on interaction)` no template com suporte a `@placeholder` e `@loading`. |
| **Guards e Proteção de Rotas** | Classes implementando interfaces `CanActivate` ou `CanDeactivate` com injeção no construtor. | Funções puras `CanActivateFn` e `CanDeactivateFn` de linha única utilizando `inject()`. |

---

## 7. Comunicação HTTP e Resiliência

| Dimensão | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Módulo de Cliente HTTP** | `HttpClientModule` importado no `AppModule`. | Provedor funcional `provideHttpClient()` configurado no `appConfig`. |
| **Busca de Dados (Data Fetching)** | Chamadas imperativas no serviço com `httpClient.get<T>()` retornando `Observable<T>` e desembrulhadas com `async`. | Primitiva declarativa reativa `resource()` e `rxResource()`, gerenciando busca sob demanda e revalidação automática. |
| **Interceptação de Requisições** | Classes implementando `HttpInterceptor` e registradas através de token multi-provider no módulo. | Interceptors funcionais `HttpInterceptorFn` encadeados diretamente via `provideHttpClient(withInterceptors([...]))`. |
| **Estado de Carregamento e Erros**| Variáveis manuais (`isLoading = true`, `hasError = false`) gerenciadas manualmente em blocos `subscribe` ou `tap`. | Sinais reativos embutidos no próprio `resource` (`.isLoading()`, `.status()`, `.error()`) consumíveis diretamente na interface. |

---

## 8. Ciclo de Vida e Gerenciamento de Memória

| Dimensão | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Descarte de Subscrições** | Implementar `OnDestroy`, criar `Subject` privado (`destroy$`) e encadear operador `pipe(takeUntil(this.destroy$))`. | Operador nativo `takeUntilDestroyed()` ou registro direto de callbacks via `inject(DestroyRef).onDestroy(...)`. |
| **Ganchos de Renderização** | `ngAfterViewInit` e `ngAfterViewChecked` executados indiscriminadamente a cada ciclo de detecção de mudanças. | Funções idiomáticas `afterRender` e `afterNextRender` executadas pontualmente após fases específicas de layout do DOM. |
| **Inicialização de Propriedades** | `ngOnInit` obrigatório para capturar valores iniciais de inputs e serviços dependentes. | Propriedades computadas e inicializadores diretos baseados em signals dispensam a maioria dos usos de `ngOnInit`. |
