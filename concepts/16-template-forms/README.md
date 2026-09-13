# Conceito 16: Formulários Declarativos (Template-Driven Forms)

Comparativo técnico entre formulários dirigidos a template tradicionais com `FormsModule`, referências de template (`#form="ngForm"`, `#campo="ngModel"`) no Angular 15 e a abordagem moderna e simplificada no Angular 22 com componentes Standalone e estado reativo.

---

## Cenário de Negócio

Para demonstrar o ciclo de vida, validações e manipulação de estado em formulários declarativos na **Fazenda Santa Maria**, ambos os projetos implementam o formulário de **Cadastramento e Calibração de Pivô Central de Irrigação**:

- **Identificador do Pivô**: Código operacional (ex.: `PIVO-04`), obrigatório, tamanho mínimo de 4 caracteres.
- **Nome do Setor / Talhão**: Descrição da gleba irrigada, obrigatório, mínimo de 5 caracteres.
- **Área Coberta (Hectares)**: Valor numérico positivo entre 10 e 500 hectares.
- **Vazão Hidráulica Estimada (m³/h)**: Valor numérico positivo entre 50 e 1000 m³/h.
- **E-mail do Agrônomo Responsável**: Validação de formato de e-mail corporativo (`@agrosantamaria.com.br` ou formato válido de e-mail).
- **Modo de Operação Noturno**: Checkbox booleano para irrigação em horários de tarifa reduzida.

O fluxo ilustra o controle de estados de validação (`valid`, `invalid`, `dirty`, `touched`, `pristine`), exibição contextual de mensagens de erro e desabilitação condicional do botão de envio.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Importação de Módulo** | `FormsModule` registrado no `@NgModule` (`app.module.ts`) | `FormsModule` importado pontualmente no array `imports` do componente Standalone |
| **Sintaxe de Binding** | `[(ngModel)]="pivo.prop"` acoplado a propriedades mutáveis de classe | `[(ngModel)]` com suporte a propriedades clássicas ou signals bidirecionais |
| **Renderização Condicional** | `*ngIf="campo.invalid && (campo.dirty || campo.touched)"` | `@if (campo.invalid && (campo.dirty || campo.touched))` nativo |
| **Detecção de Mudanças** | Baseada em `zone.js` global | Execução Zoneless eficiente com disparos sob demanda |
| **Estrutura de Componente** | 4 arquivos obrigatórios com metadados extensos | Componente Standalone simplificado sem declaração em módulos |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, o `FormsModule` é importado no `AppModule`. No template, capturamos o formulário via variável de referência `#pivoForm="ngForm"` e cada campo via `#campo="ngModel"`:

```html
<form #pivoForm="ngForm" (ngSubmit)="cadastrar(pivoForm)">
  <div class="form-group">
    <label for="codigo">Código do Pivô:</label>
    <input
      id="codigo"
      name="codigo"
      type="text"
      required
      minlength="4"
      [(ngModel)]="modelo.codigo"
      #codigo="ngModel"
      class="form-control"
    />
    <div *ngIf="codigo.invalid && (codigo.dirty || codigo.touched)" class="error-msg">
      <span *ngIf="codigo.errors?.['required']">O código é obrigatório.</span>
      <span *ngIf="codigo.errors?.['minlength']">Mínimo de 4 caracteres.</span>
    </div>
  </div>

  <button type="submit" [disabled]="pivoForm.invalid" class="btn btn-primary">
    Cadastrar Pivô
  </button>
</form>
```

---

### No Angular 22 (`v22`)

No Angular 22, o componente importa diretamente o `FormsModule` e expressa a renderização condicional por meio dos novos blocos nativos de fluxo de controle `@if`:

```typescript
@Component({
  selector: 'app-pivo-form',
  imports: [FormsModule],
  templateUrl: './pivo-form.html',
  styleUrls: ['./pivo-form.css']
})
export class PivoForm { ... }
```

No template:

```html
<form #pivoForm="ngForm" (ngSubmit)="cadastrar(pivoForm)">
  <div class="form-group">
    <label for="codigo">Código do Pivô:</label>
    <input
      id="codigo"
      name="codigo"
      type="text"
      required
      minlength="4"
      [(ngModel)]="modelo.codigo"
      #codigo="ngModel"
      class="form-control"
    />
    @if (codigo.invalid && (codigo.dirty || codigo.touched)) {
      <div class="error-msg">
        @if (codigo.errors?.['required']) {
          <span>O código é obrigatório.</span>
        }
        @if (codigo.errors?.['minlength']) {
          <span>Mínimo de 4 caracteres.</span>
        }
      </div>
    }
  </div>

  <button type="submit" [disabled]="pivoForm.invalid" class="btn btn-primary">
    Cadastrar Pivô
  </button>
</form>
```

---

## Vantagens e Casos de Uso dos Template-Driven Forms

1. **Simplicidade Declarativa**: Ideal para formulários simples a médios, cadastros diretos e filtros onde as validações são declaradas diretamente nas tags HTML.
2. **Curva de Aprendizado Suave**: Utiliza atributos HTML padronizados (`required`, `minlength`, `maxlength`, `pattern`, `email`).
3. **Redução de Boilerplate no TypeScript**: Toda a estrutura de controles é sintetizada pelo Angular em tempo de execução sem a necessidade de instanciar instâncias manuais de `FormGroup` e `FormControl`.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/16-template-forms/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/16-template-forms/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
