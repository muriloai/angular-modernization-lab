# Conceito 06: Injeção de Dependência

Comparativo prático da evolução do sistema de **Injeção de Dependência (DI)** entre o **Angular 15** e o **Angular 22**, abordando a transição do construtor tradicional para a moderna função `inject()`, o uso de `InjectionToken` e a hierarquia de injetores.

---

## Cenário de Negócio

Para demonstrar a resolução e hierarquia de dependências, ambos os projetos implementam o painel de **Configuração e Telemetria de Estações Meteorológicas (Fazenda Santa Maria)**:

- Um serviço central de dados (`TelemetryService`) registrado no injetor raiz (`providedIn: 'root'`).
- Um token de injeção tipado (`ESTACAO_CONFIG`) que define parâmetros de conexão e frequência de amostragem.
- O componente pai (`App`) consome a configuração padrão do injetor raiz.
- O componente filho (`StationDetail`) redefine o token via `providers` locais, demonstrando a hierarquia de resolução do injetor de elementos (Element Injector).

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Mecanismo de Injeção** | Parâmetros no construtor da classe com decorators | Invocação direta da função utilitária `inject()` |
| **Injeção de Tokens** | Exige o decorator `@Inject(TOKEN)` nos parâmetros | Chamada limpa e fortemente tipada `inject(TOKEN)` |
| **Injeção Opcional** | Exige o decorator `@Optional()` no construtor | Configuração por parâmetro `inject(TOKEN, { optional: true })` |
| **Herança de Classes** | Subclasses são obrigadas a repassar serviços via `super()` | Não há impacto na subclasse, pois `inject()` atua no inicializador |
| **Funções Auxiliares** | Injeção limitada a classes gerenciadas pelo Angular | Funções e utilitários reutilizáveis podem invocar `inject()` |

---

## Análise Comparativa Detalhada

### Injeção no Construtor vs Função `inject()`

#### No Angular 15 (`v15/src/app/app.component.ts`)

No Angular 15, toda dependência precisa ser declarada na lista de parâmetros do construtor:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // O construtor acumula muitos parametros e decorators
  constructor(
    @Inject(ESTACAO_CONFIG) public config: EstacaoConfig,
    public telemetryService: TelemetryService
  ) {}
}
```

_Desvantagem:_ Ao estender classes base ou compor comportamentos, todo novo serviço precisa ser adicionado no construtor e repassado manualmente pelo `super()`.

#### No Angular 22 (`v22/src/app/app.ts`)

No Angular 22, a função `inject()` resolve a dependência diretamente na inicialização do campo:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {
  // Declaracao limpa e tipada sem necessidade de construtor
  readonly config = inject(ESTACAO_CONFIG);
  readonly telemetryService = inject(TelemetryService);
}
```

_Vantagem:_ Permite criar funções reutilizáveis que encapsulam injeções (como um utilitário `injectConfig()`), dispensando cerimônias repetitivas de construtores.

---

### Hierarquia de Injetores (Root vs Element)

Ambos os projetos demonstram como o Angular resolve dependências em cascata:

1. **Root Injector (`providedIn: 'root'`)**: Fornece a instância singleton de `TelemetryService` e o valor padrão de `ESTACAO_CONFIG` para toda a aplicação.
2. **Element Injector (Component Level)**: O componente filho `StationDetail` declara seu próprio array `providers: [{ provide: ESTACAO_CONFIG, useValue: ... }]`. O Angular busca a dependência primeiramente no elemento atual antes de subir para o injetor pai.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/06-dependency-injection/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/06-dependency-injection/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
