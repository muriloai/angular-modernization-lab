# Conceito 21: Tratamento Resiliente de Falhas e Políticas de Retry (Error Handling & Resilience)

Comparativo técnico entre o tratamento reativo clássico com operadores RxJS (`retry`, `catchError`) acoplados ao `ErrorHandler` no Angular 15 e a gestão moderna de falhas com Signals nativos, interceptadores de erro e fallbacks visuais na `Resource API` do Angular 22.

---

## Cenário de Negócio

Em fazendas de grande extensão como a **Fazenda Santa Maria**, as conexões de telemetria operam sobre redes sem fio de longo alcance (LoRaWAN, 4G rural ou satélite de baixa órbita). Oscilações e quedas temporárias de sinal são comuns durante tempestades ou movimentação de maquinário pesado:

1. **Tentativas Automáticas de Reconexão (*Retry Strategy*)**:
   - Ao requisitar o status dos **Silos de Armazenamento e Secagem de Grãos**, falhas transitórias de conexão (HTTP 500 ou 503) disparam até **3 tentativas automáticas** de reconexão antes de considerar a requisição perdida.
2. **Capturador Global de Falhas (`ErrorHandler`)**:
   - Falhas críticas não tratadas são capturadas por um serviço central de auditoria agronômica, prevenindo travamentos de tela e gerando logs operacionais padronizados.
3. **Degradação Suave e Dados em Cache (*Graceful Degradation*)**:
   - Caso todas as tentativas de rede se esgotem, a interface não colapsa: um banner de contingência é exibido com a última telemetria válida registrada no cache local, permitindo ao operador continuar o monitoramento de temperatura e aeração dos silos.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Política de Retry** | Operadores RxJS `retry({ count: 3, delay: ... })` dentro de pipes | Políticas integradas na função `loader` do `resource()` ou via RxJS |
| **Captura de Erro Local** | Operador `catchError` emitindo valor alternativo ou relançando erro | Tratamento declarativo com sinal `.error()` da `Resource API` |
| **Tratamento Global** | `{ provide: ErrorHandler, useClass: AgroErrorHandler }` no `@NgModule` | `provideErrorHandler()` ou provider direto no `ApplicationConfig` |
| **Estado Visual de Erro** | Variável booleana `hasError` alternada manualmente no componente | Sinal reativo `resource.error()` consumido diretamente no `@if` |
| **Change Detection sob Falha** | Disparo de ciclo de verificação global via `zone.js` | Atualização cirúrgica em modo Zoneless (`provideZonelessChangeDetection()`) |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, a política de repetição de chamadas instáveis é expressa encadeando operadores no fluxo do `HttpClient`:

```typescript
// api-resilient.component.ts
carregarDadosSilo(): void {
  this.isLoading = true;
  this.errorMessage = null;

  this.silosService.getSilosTelemetry().pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => {
        this.tentativasRealizadas = retryCount;
        return timer(800);
      }
    }),
    catchError((err) => {
      this.errorMessage = 'Sinal telemétrico dos silos indisponível no momento.';
      this.isLoading = false;
      return of(this.silosService.obterDadosOffline());
    })
  ).subscribe(dados => {
    this.silos = dados;
    this.isLoading = false;
  });
}
```

---

### No Angular 22 (`v22`)

No Angular 22, a `Resource API` unifica a execução da política assíncrona de resiliência e expõe o erro diretamente como um Signal reativo:

```typescript
// api-resilient.ts
export class ApiResilient {
  private readonly silosService = inject(SilosApiService);
  readonly tentativasRealizadas = signal(0);

  readonly silosResource = resource({
    loader: async () => {
      this.tentativasRealizadas.set(0);
      return await this.silosService.getSilosTelemetryComRetry(3, (tentativa) => {
        this.tentativasRealizadas.set(tentativa);
      });
    }
  });

  recarregar(): void {
    this.silosResource.reload();
  }
}
```

No template do Angular 22, o estado de erro e contingência é exibido com clareza declarativa:

```html
@if (silosResource.isLoading()) {
  <div class="loading-state">
    Tentativa {{ tentativasRealizadas() }} de 3: Conectando aos silos...
  </div>
} @else if (silosResource.error()) {
  <div class="contingency-card">
    <p>Rede indisponível. Exibindo última telemetria registrada em cache.</p>
  </div>
}
```

---

## Vantagens de Estratégias de Resiliência

1. **Tolerância a Instabilidades de Campo**: Conexões agrícolas flutuantes são tratadas de forma transparente sem frustrar o operador com erros instantâneos.
2. **Continuidade Operacional**: O uso de dados de contingência (*fallback cache*) evita interrupção das decisões de aeração e secagem de grãos.
3. **Auditoria Centralizada**: Erros críticos são catalogados pelo `ErrorHandler` para análise posterior de confiabilidade de sensores.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/21-error-handling/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/21-error-handling/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
