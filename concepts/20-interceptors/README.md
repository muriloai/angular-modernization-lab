# Conceito 20: Interceptadores HTTP (HTTP Interceptors)

Comparativo técnico entre o padrão tradicional de interceptadores baseados em classes injetáveis (`HttpInterceptor` com `multi: true`) no Angular 15 e os modernos interceptadores funcionais (`HttpInterceptorFn` com `withInterceptors`) no Angular 22.

---

## Cenário de Negócio

Em um ambiente distribuído como a **Fazenda Santa Maria**, as requisições enviadas para a nuvem agropecuária precisam transitar com segurança e rastreabilidade:

1. **Interceptador de Autenticação (`AuthInterceptor`)**:
   - Injeta automaticamente nos cabeçalhos de cada requisição HTTP o token de segurança do agrônomo autenticado:
     `Authorization: Bearer AGRO-TOKEN-SANTA-MARIA-2026`.
   - Adiciona também metadados de identificação do terminal (`X-Farm-Terminal: Estacao-Campo-MT`).
2. **Interceptador de Telemetria e Diagnóstico (`LoggingInterceptor`)**:
   - Captura o instante de disparo da requisição e calcula o tempo total de resposta em milissegundos (`Date.now()`).
   - Registra no console do navegador e em um painel visual de diagnóstico o método (`GET`, `POST`), a URL e o tempo de latência de rede.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Abordagem do Interceptador** | Classe com `@Injectable()` implementando `HttpInterceptor` | Função pura tipada `HttpInterceptorFn` |
| **Registro de Providers** | Multi-providers prolixos: `{ provide: HTTP_INTERCEPTORS, useClass: ..., multi: true }` | Array funcional direto: `provideHttpClient(withInterceptors([...]))` |
| **Injeção de Dependências** | Exclusivamente via construtor da classe | Via função `inject()` no corpo do próprio interceptador |
| **Ordem de Execução** | Dependente da ordem dos providers no array do `@NgModule` | Declarativa e estrita na sequência informada no `withInterceptors` |
| **Otimização de Pacote (Tree-Shaking)** | Classes com metadados dificultam tree-shaking | Funções puras são facilmente eliminadas se não utilizadas |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, cada interceptador exige a implementação do método `intercept(req, next)`. No módulo raiz, é indispensável configurar o token `HTTP_INTERCEPTORS` com `multi: true`:

```typescript
// auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer AGRO-TOKEN-SANTA-MARIA-2026',
        'X-Farm-Terminal': 'Estacao-Campo-MT'
      }
    });
    return next.handle(authReq);
  }
}

// app.module.ts
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
]
```

---

### No Angular 22 (`v22`)

No Angular 22, eliminamos totalmente as classes de serviço intermediárias e a chave `multi: true`. O interceptador é uma função declarativa concisa:

```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer AGRO-TOKEN-SANTA-MARIA-2026',
      'X-Farm-Terminal': 'Estacao-Campo-MT'
    }
  });
  return next(authReq);
};

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([authInterceptor, loggingInterceptor])
    )
  ]
};
```

---

## Vantagens dos Interceptadores Funcionais

1. **Legibilidade e Concisão**: Menos arquivos auxiliares e zero cerimônia com tokens `HTTP_INTERCEPTORS` ou flags `multi: true`.
2. **Acesso Dinâmico a Serviços com `inject()`**: Facilidade para ler serviços de configuração, tokens de autenticação ou roteadores sob demanda dentro da própria função interceptadora.
3. **Composição em Pipeline**: Permite compor e testar interceptadores como funções puras isoladas de maneira extremamente previsível.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/20-interceptors/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/20-interceptors/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
