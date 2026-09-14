# Conceito 31: Boas Praticas de Seguranca e DomSanitizer

Este modulo explora o modelo de seguranca integrado do Angular, a prevencao automatica contra ataques de **Cross-Site Scripting (XSS)**, a sanitizacao de contextos de seguranca e o uso controlado da API `DomSanitizer`.

No contexto da **Fazenda Santa Maria**, consultores agronomicos e fiscais sanitarios emitem laudos tecnicos e recomendacoes de aplicacao de defensivos. Como esses relatorios podem conter marcacoes HTML fornecidas por terceiros, a aplicacao deve neutralizar automaticamente scripts e atributos maliciosos, permitindo que administradores aprovem a renderizacao confiavel apenas quando estritamente auditada.

---

## 1. Visao Comparativa Geral

| Aspecto | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Sanitizacao Automatica** | Ativa por padrao no binding `[innerHTML]` e atributos de URL | Ativa por padrao e reforcada pelo compilador moderno |
| **Injecao de DomSanitizer** | Construtor com `private sanitizer: DomSanitizer` | Injecao funcional limpa com `inject(DomSanitizer)` |
| **Integracao com Estado** | Variaveis de classe com transformacao sincrona | Signals e `computed()` reativos para sanitizacao sob demanda |
| **Contextos de Seguranca** | HTML, Estilo, Script, URL e ResourceURL | Mesmos contextos com verificacoes estritas de compilacao e tipos |
| **Tratamento de Ataques XSS** | Tags `<script>` sao descartadas silenciosamente no console | Tags perigosas continuam neutralizadas com alertas precisos em dev |

---

## 2. O Modelo Legado: Angular 15

No Angular 15, qualquer valor interpolado via `[innerHTML]` passa automaticamente pelo mecanismo interno de sanitizacao. Para permitir elementos confiaveis mas potencialmente perigosos (como iframes ou estilos em linha complexos), utiliza-se o servico `DomSanitizer`:

```typescript
// report-viewer.component.ts (Angular 15)
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html'
})
export class ReportViewerComponent {
  @Input() rawReport: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  get trustedHtml(): SafeHtml {
    // ATENCAO: Ignora as camadas de seguranca do Angular
    return this.sanitizer.bypassSecurityTrustHtml(this.rawReport);
  }
}
```

### Principais riscos de contornar a seguranca:
- `bypassSecurityTrustHtml` nunca deve ser executado sobre entradas de usuario sem higienizacao prévia no servidor.
- `bypassSecurityTrustResourceUrl` pode carregar scripts externos arbitrarios se a URL nao for estritamente validada contra uma whitelist.

---

## 3. O Modelo Moderno: Angular 22

No Angular 22, o `DomSanitizer` continua sendo uma peca central de seguranca, integrando-se nativamente com a reatividade orientada a Signals e a injecao funcional:

```typescript
// report-viewer.ts (Angular 22)
import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.html'
})
export class ReportViewer {
  private readonly sanitizer = inject(DomSanitizer);

  readonly rawHtml = input.required<string>();
  readonly bypassSecurity = input<boolean>(false);

  readonly contentToRender = computed<SafeHtml | string>(() => {
    if (this.bypassSecurity()) {
      return this.sanitizer.bypassSecurityTrustHtml(this.rawHtml());
    }
    return this.rawHtml(); // Deixa o compilador sanitizar automaticamente
  });
}
```

---

## 4. Estrutura dos Projetos

```text
concepts/31-security/
|-- README.md
|-- v15/
|   |-- package.json                     (porta 4200)
|   `-- src/app/
|       |-- models/inspection-report.model.ts
|       |-- components/report-viewer.*   (DomSanitizer no construtor)
|       |-- app.module.ts
|       `-- app.component.*
`-- v22/
    |-- package.json                     (porta 4201)
    `-- src/app/
        |-- models/inspection-report.model.ts
        |-- components/report-viewer.*   (inject(DomSanitizer) + computed signals)
        |-- app.config.ts
        `-- app.*
```

---

## 5. Roteiro de Migracao

1. **Adotar injecao funcional**: Substitua o construtor por `inject(DomSanitizer)`.
2. **Reatividade orientada a Signals**: Utilize funcoes `computed()` para sanitizar valores sob condicoes auditadas, evitando recomputacoes em cada ciclo de deteccao de mudancas.
3. **Auditoria de bypass**: Identifique todos os locais que utilizam `bypassSecurityTrust*` no projeto e substitua-os pelo binding padrao do Angular sempre que possivel.
