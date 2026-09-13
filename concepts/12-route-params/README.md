# Conceito 12: Parâmetros de Rota e Injeção com withComponentInputBinding

Comparativo técnico entre a extração tradicional de parâmetros de rota via subscrições em `ActivatedRoute` (`paramMap`, `queryParamMap`, `data`) e a abordagem moderna com a funcionalidade `withComponentInputBinding()`, onde parâmetros de caminho, parâmetros de consulta (*query params*) e dados de resolvedores (*resolvers*) são injetados diretamente como `input()` do componente.

---

## Cenário de Negócio

Para ilustrar a transição entre as duas arquiteturas, ambos os projetos implementam a **Ficha Cadastral e Telemetria de Talhões Agrícolas da Fazenda Santa Maria**:

- **Rota de Catálogo (`/talhoes`)**: Listagem dos talhões monitorados com atalhos para a tela de detalhes contendo parâmetros de caminho e parâmetros de consulta (`/talhoes/TAL-101?safra=2026&modo=detalhado`).
- **Rota de Detalhes (`/talhoes/:id`)**: Exibição da ficha técnica do talhão (cultura agrícola, área em hectares, tipo de solo, umidade média e histórico de intervenções).
- **Resolver de Dados (`talhaoResolver`)**: Pré-carregamento dos dados do talhão antes da ativação da rota.
- **Parâmetros de Consulta**: Parâmetros opcionais `safra` e `modo` que alteram o nível de detalhe e a safra de referência exibida.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Extração de `:id`** | Subscrição manual em `this.route.paramMap` | Injeção declarativa direta via `readonly id = input.required<string>()` |
| **Extração de Query Params** | Subscrição manual em `this.route.queryParamMap` | Injeção declarativa direta via `readonly safra = input<string>()` |
| **Acesso a Resolvers** | Subscrição manual em `this.route.data` | Injeção direta no input via `readonly talhao = input<Talhao>()` |
| **Configuração de Roteamento** | `RouterModule.forRoot(routes)` padrão | `provideRouter(routes, withComponentInputBinding())` |
| **Definição de Resolvers** | Classe com interface legada `implements Resolve<T>` | Função pura reutilizável tipada como `ResolveFn<T>` |
| **Ciclo de Vida e Memória** | Risco de vazamento de memória se faltar `unsubscribe` | Totalmente síncrono e integrado à reatividade de Signals |

---

## Análise Comparativa Detalhada

### Leitura de Parâmetros e Resolvedores

#### No Angular 15 (`v15/src/app/talhao-detail.component.ts`)

No modelo clássico, o componente precisa injetar `ActivatedRoute` e manipular subscrições em múltiplos Observables para extrair os dados da navegação:

```typescript
@Component({
  selector: 'app-talhao-detail',
  templateUrl: './talhao-detail.component.html'
})
export class TalhaoDetailComponent implements OnInit, OnDestroy {
  id: string = '';
  safra: string = '2026';
  modo: string = 'resumido';
  talhao?: Talhao;

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscrição nos parâmetros da URL
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.id = params.get('id') ?? '';
    });

    // Subscrição nos query parameters
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(qp => {
      this.safra = qp.get('safra') ?? '2026';
      this.modo = qp.get('modo') ?? 'resumido';
    });

    // Subscrição nos dados resolvidos pelo Resolver
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.talhao = data['talhao'];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

#### No Angular 22 (`v22/src/app/talhao-detail.ts`)

Ao ativar `withComponentInputBinding()` no `app.config.ts`, os parâmetros e resolvers são passados diretamente como entradas (`input()`):

```typescript
@Component({
  selector: 'app-talhao-detail',
  templateUrl: './talhao-detail.html'
})
export class TalhaoDetail {
  // O Angular conecta automaticamente o parâmetro :id da URL neste input
  readonly id = input.required<string>();

  // Os query params (?safra=... e ?modo=...) são vinculados automaticamente
  readonly safra = input<string>('2026');
  readonly modo = input<string>('resumido');

  // Os dados retornados pelo Resolver são atribuídos diretamente a este input
  readonly talhao = input<Talhao>();
}
```

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/12-route-params/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/12-route-params/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
