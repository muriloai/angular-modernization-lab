# Guia Rápido de Referência: De Angular 15 Para Angular 22

Este guia prático serve como um dicionário de tradução rápida ("De -> Para") para engenheiros de software migrando bases de código do Angular 15 para o Angular 22.

---

## 1. Sistema e Inicialização (Bootstrap)

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Inicializar aplicação** | `platformBrowserDynamic().bootstrapModule(AppModule)` | `bootstrapApplication(AppComponent, appConfig)` |
| **Registrar roteamento global** | `imports: [RouterModule.forRoot(routes)]` no `AppModule` | `provideRouter(routes)` no array `providers` de `appConfig` |
| **Registrar cliente HTTP** | `imports: [HttpClientModule]` no `AppModule` | `provideHttpClient()` no array `providers` de `appConfig` |
| **Habilitar animações** | `imports: [BrowserAnimationsModule]` | `provideAnimationsAsync()` no `appConfig` |
| **Ativar modo Zoneless** | Inexistente (dependência estrita de `zone.js`) | `provideZonelessChangeDetection()` no `appConfig` |

---

## 2. Definição e Metadados de Componentes

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Declarar componente** | Declarar em `declarations: [MeuComponent]` de um `@NgModule` | Componente é Standalone por padrão; dispensado `standalone: true` |
| **Importar componentes no template**| Importar o `@NgModule` que contém o componente | Adicionar direto em `imports: [CardComponent]` do `@Component` |
| **Importar diretivas comuns** | Importar `CommonModule` no `@NgModule` | Não necessário para control flow; ou importar diretivas específicas |
| **Configurar escuta no host** | `@HostListener('click') onClick() { ... }` | `host: { '(click)': 'onClick()' }` nos metadados |
| **Configurar classes no host** | `@HostBinding('class.ativo') isAtivo = true;` | `host: { '[class.ativo]': 'isAtivo()' }` nos metadados |

---

## 3. Templates e Data Binding

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Exibir valor de estado** | `<span>{{ valor }}</span>` | `<span>{{ valor() }}</span>` *(chamada de Signal)* |
| **Property Binding simples** | `<button [disabled]="isPending">` | `<button [disabled]="isPending()">` |
| **Event Binding simples** | `<button (click)="salvar($event)">` | `<button (click)="salvar($event)">` *(idêntico)* |
| **Two-Way Data Binding** | `<input [(ngModel)]="nome">` *(depende de FormsModule)* | `<app-input [(value)]="nome" />` *(usando primitiva `model()`)* |
| **Referência local de template** | `<input #campoRef>` | `<input #campoRef>` *(idêntico)* |

---

## 4. Estruturas de Controle de Fluxo (Control Flow)

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Condicional simples** | `<div *ngIf="ativo">Conteúdo</div>` | `@if (ativo()) { <div>Conteúdo</div> }` |
| **Condicional com Else** | `<div *ngIf="ativo; else inativoTmpl">...</div>`<br>`<ng-template #inativoTmpl>...</ng-template>` | `@if (ativo()) { ... } @else { ... }` |
| **Condicional composta (Else If)** | Múltiplos `*ngIf` encadeados manualmente | `@if (a()) { ... } @else if (b()) { ... } @else { ... }` |
| **Iteração de coleção** | `<li *ngFor="let item of items; trackBy: trackFn">{{ item }}</li>` | `@for (item of items(); track item.id) { <li>{{ item }}</li> }` |
| **Lista com estado vazio** | `<div *ngIf="items.length === 0">Sem itens</div>` adicional | `@for (...) { ... } @empty { <p>Nenhum item.</p> }` |
| **Múltipla escolha (Switch)** | `<div [ngSwitch]="status"><p *ngSwitchCase="'A'">...</p></div>` | `@switch (status()) { @case ('A') { ... } @default { ... } }` |
| **Carregamento sob demanda** | Inexistente no template (requer criação dinâmica no `.ts`) | `@defer (on viewport) { <app-pesado /> } @placeholder { ... }` |

---

## 5. Reatividade e Gerenciamento de Estado

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Criar estado reativo** | `state$ = new BehaviorSubject<number>(0);` | `state = signal<number>(0);` |
| **Ler valor atual** | `this.state$.getValue();` ou `this.state$.value;` | `this.state();` |
| **Definir novo valor** | `this.state$.next(10);` | `this.state.set(10);` |
| **Atualizar baseado no anterior** | `this.state$.next(this.state$.value + 1);` | `this.state.update(v => v + 1);` |
| **Estado derivado / computado** | `total$ = combineLatest([a$, b$]).pipe(map(([a, b]) => a + b));` | `total = computed(() => this.a() + this.b());` |
| **Efeito colateral reativo** | Subscrição manual em `ngOnInit` com `.subscribe()` | `effect(() => { console.log('Novo:', this.state()); });` |
| **Sinal dependente resetável** | Fluxo RxJS complexo com `switchMap` e `startWith` | `selecionado = linkedSignal(() => this.lista()[0]?.id);` |
| **Consumir stream no template** | `<div *ngIf="dados$ | async as dados">{{ dados }}</div>` | `dados = toSignal(dados$);` -> `<div>{{ dados() }}</div>` |

---

## 6. Comunicação entre Componentes (Inputs e Outputs)

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Input opcional** | `@Input() titulo: string = 'Padrão';` | `titulo = input<string>('Padrão');` |
| **Input obrigatório** | `@Input({ required: true }) id!: string;` | `id = input.required<string>();` |
| **Input com transformação** | `@Input({ transform: booleanAttribute }) disabled = false;` | `disabled = input(false, { transform: booleanAttribute });` |
| **Emitir evento / Output** | `@Output() salvo = new EventEmitter<Item>();` | `salvo = output<Item>();` |
| **Disparar evento** | `this.salvo.emit(item);` | `this.salvo.emit(item);` *(idêntico)* |
| **Entrada e saída sincronizada**| `@Input() valor;` + `@Output() valorChange;` | `valor = model<string>('');` |

---

## 7. Injeção de Dependências e Ciclo de Vida

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Injetar serviço** | `constructor(private api: ApiService) {}` | `private api = inject(ApiService);` |
| **Injetar token tipado** | `constructor(@Inject(MEU_TOKEN) private conf: Config) {}` | `private conf = inject(MEU_TOKEN);` |
| **Injetar elemento do DOM** | `constructor(private el: ElementRef) {}` | `private el = inject(ElementRef);` |
| **Cancelar subscrições** | `pipe(takeUntil(this.destroy$))` manual em `ngOnDestroy` | `pipe(takeUntilDestroyed())` sem precisar de `ngOnDestroy` |
| **Ação no descarte do componente**| Implementar interface `OnDestroy` com `ngOnDestroy()` | `inject(DestroyRef).onDestroy(() => { ... });` |
| **Executar após render do DOM** | Método de ciclo de vida `ngAfterViewInit()` | `afterNextRender(() => { ... });` |

---

## 8. Roteamento e Navegação

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Registrar rotas** | `RouterModule.forRoot([...])` | `provideRouter([...])` |
| **Ler parâmetro de rota** | `this.route.paramMap.subscribe(p => this.id = p.get('id'));` | `id = input<string>();` *(com withComponentInputBinding)* |
| **Guard de autenticação** | Criar classe `implements CanActivate` | `export const authGuard: CanActivateFn = () => inject(Auth).check();` |
| **Lazy loading de tela** | `loadChildren: () => import('./mod').then(m => m.Mod)` | `loadComponent: () => import('./comp').then(c => c.Comp)` |
| **Link de navegação no HTML** | `<a [routerLink]="['/detalhe', id]">` | `<a [routerLink]="['/detalhe', id()]">` |

---

## 9. Comunicação HTTP e Data Fetching

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Requisição GET básica** | `this.http.get<User[]>(url)` retornando `Observable` | `usersResource = resource({ loader: () => fetch(url)... })` |
| **Requisição reativa a parâmetros**| `id$.pipe(switchMap(id => this.http.get(url + id)))` | `user = resource({ request: () => ({ id: this.id() }), loader: ... })` |
| **Obter estado de carregamento** | Gerenciar variável booleana `loading = true/false` | Ler sinal `user.isLoading()` diretamente no template |
| **Obter mensagem de erro** | Tratar no operador `catchError` e salvar em variável | Ler sinal `user.error()` diretamente no template |
| **Recarregar dados** | Disparar novo valor em um Subject de trigger | `user.reload();` |
| **Criar interceptor** | Classe `implements HttpInterceptor` registrada em providers | Função pura `const auth: HttpInterceptorFn = (req, next) => ...` |

---

## 10. Formulários e Validação

| Tarefa | No Angular 15 | No Angular 22 |
| :--- | :--- | :--- |
| **Formulário tipado** | `new FormGroup<{ nome: FormControl<string> }>({ ... })` | Idem no TypeScript, integrado a signals no template |
| **Ouvir mudanças de campo** | `this.form.controls.nome.valueChanges.subscribe(...)` | `toSignal(this.form.controls.nome.valueChanges)` |
| **Desabilitar / Habilitar campo**| `this.form.controls.nome.disable()` / `.enable()` | `this.form.controls.nome.disable()` / `.enable()` |
| **Validadores síncronos** | `[Validators.required, Validators.minLength(3)]` | `[Validators.required, Validators.minLength(3)]` *(idêntico)* |
| **Template-driven form** | `<form #f="ngForm" (ngSubmit)="salvar(f)">` | `<form #f="ngForm" (ngSubmit)="salvar(f)">` *(idêntico)* |
