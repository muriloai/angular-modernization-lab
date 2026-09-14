# Conceito 19: Comunicação HTTP e Gerenciamento de Recursos Assíncronos (HttpClient vs Resource API)

Comparativo técnico entre o padrão tradicional de consumo assíncrono via `HttpClient` com streams de `Observable` no Angular 15 e a moderna `Resource API` (`resource()`, `rxResource()`) orientada a Signals no Angular 22.

---

## Cenário de Negócio

Para ilustrar operações de leitura, criação e atualização na **Fazenda Santa Maria**, ambos os projetos implementam a **Central de Telemetria e Gestão de Sensores Agrícolas**:

- **Operação de Consulta (GET / Leitura)**:
  - Recuperação da listagem de sensores de solo e telemetria (umidade do solo, pH, índice de clorofila, estações meteorológicas).
  - Controle de estado visual de carregamento (*loading*), tratamento de erros de rede e exibição da lista formatada.
- **Operação de Adição (POST / Criação)**:
  - Inclusão de um novo sensor telemétrico na rede da fazenda com identificador, cultura atendida e localização de talhão.
- **Operação de Calibração / Atualização (PUT/PATCH)**:
  - Atualização do status operacional e calibração de leitura de um sensor existente.
- **Operação de Descomissionamento (DELETE)**:
  - Remoção lógica de um sensor danificado ou retirado de campo.

O foco central deste comparativo reside em **como os estados de dados, carregamento e erro são geridos**:
- No Angular 15: Variáveis manuais (`isLoading = true/false`, `errorMessage = null`) ou múltiplos operadores RxJS encadeados (`catchError`, `finalize`, `startWith`).
- No Angular 22: A `Resource API` fornece sinais nativos e reativos (`.value()`, `.isLoading()`, `.status()`, `.error()`) e a função declarativa `.reload()`, eliminando boilerplate e orquestração manual.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Configuração de Providers** | `HttpClientModule` registrado no `@NgModule` (`app.module.ts`) | `provideHttpClient()` registrado no `ApplicationConfig` (`app.config.ts`) |
| **Primitiva de Consumo** | Métodos do `HttpClient` retornando `Observable<T>` | Primitiva `resource()` ou `rxResource()` integrada ao grafo de Signals |
| **Estado de Carregamento** | Variável booleana manual (`isLoading = true`) | Sinal nativo integrado `.isLoading()` que reage automaticamente |
| **Recarregamento de Dados** | Reexecução imperativa de métodos de busca ou `Subject` acoplado | Chamada declarativa e direta ao método `.reload()` |
| **Manipulação no Template** | Pipe `async` (`sensores$ | async`) com `<ng-container>` e `*ngIf` | Leitura direta do sinal `sensorsResource.value()` com Built-in Control Flow `@for` |
| **Change Detection** | Vinculada ao ciclo de zonas do `zone.js` | Modo Zoneless eficiente (`provideZonelessChangeDetection()`) |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, o serviço utiliza o `HttpClient` e retorna Observables. O componente precisa gerenciar o ciclo de vida da subscrição ou depender de pipes assíncronos combinados com variáveis de controle:

```typescript
// sensors-list.component.ts
export class SensorsListComponent implements OnInit {
  sensores: Sensor[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private sensorsService: SensorsApiService) {}

  ngOnInit(): void {
    this.carregarSensores();
  }

  carregarSensores(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.sensorsService.getSensores().subscribe({
      next: (dados) => {
        this.sensores = dados;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Falha ao sincronizar sensores de campo.';
        this.isLoading = false;
      }
    });
  }
}
```

No template:

```html
<div *ngIf="isLoading" class="loading-state">
  Carregando telemetria da fazenda...
</div>

<div *ngIf="errorMessage" class="error-alert">
  {{ errorMessage }}
</div>

<div *ngIf="!isLoading && !errorMessage">
  <div *ngFor="let s of sensores" class="sensor-card">
    <span>{{ s.nome }}</span>
  </div>
</div>
```

---

### No Angular 22 (`v22`)

No Angular 22, a nova `Resource API` encapsula tanto a busca assíncrona quanto os sinais de estado de forma unificada:

```typescript
// sensors-list.ts
export class SensorsList {
  private readonly sensorsService = inject(SensorsApiService);

  // Recurso reativo alimentado por Signal
  readonly sensorsResource = resource({
    loader: async () => {
      return await this.sensorsService.getSensoresAsync();
    }
  });

  recarregar(): void {
    this.sensorsResource.reload();
  }
}
```

No template com Built-in Control Flow:

```html
@if (sensorsResource.isLoading()) {
  <div class="loading-state">
    Carregando telemetria da fazenda...
  </div>
} @else if (sensorsResource.error()) {
  <div class="error-alert">
    Falha ao sincronizar sensores de campo.
  </div>
} @else {
  @for (s of sensorsResource.value(); track s.id) {
    <div class="sensor-card">
      <span>{{ s.nome }}</span>
    </div>
  } @empty {
    <p>Nenhum sensor registrado.</p>
  }
}
```

---

## Vantagens da Resource API no Angular Moderno

1. **Eliminação de Variáveis Manuais de Estado**: Elimina o padrão repetitivo de alternar `loading = true/false` e capturar `error` manualmente.
2. **Integração Perfeita com Signals**: Os dados retornados são sinais reativos limpos, permitindo que sinais derivados (`computed`) operem diretamente sobre o resultado da requisição.
3. **Controle Declarativo de Recarga**: O método `.reload()` invalida a leitura e dispara um novo carregamento sem a necessidade de reatribuir Observables ou emitir em Subjects auxiliares.
4. **Alinhamento com Zoneless**: Perfeito para aplicações sem `zone.js`, onde as notificações de atualização do DOM são propagadas diretamente pela leitura do sinal.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/19-http-basics/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/19-http-basics/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
