# Conceito 17: Formulários Reativos e Tipagem Estrita (Reactive Forms e Typed Forms)

Comparativo técnico entre a implementação de formulários orientados a modelo com `ReactiveFormsModule`, `FormGroup`, `FormControl`, `FormArray`, validações customizadas no Angular 15 e a integração moderna de Typed Forms com Signals e listeners de eventos no Angular 22.

---

## Cenário de Negócio

Para demonstrar a complexidade de estruturas aninhadas e coleções dinâmicas na **Fazenda Santa Maria**, ambos os projetos implementam o formulário de **Planejamento de Safra e Alocação de Talhões**:

- **Informações Gerais da Safra**:
  - `safraAno`: Identificação da safra (ex.: `2025/2026`), obrigatório.
  - `culturaPrincipal`: Seleção da cultura agrícola (`Soja`, `Milho`, `Algodão`, `Café`).
  - `responsavelAgronomo`: Nome do responsável técnico, mínimo de 5 caracteres.
- **Coleção Dinâmica de Talhões (`FormArray`)**:
  - Cada talhão contém: `nomeTalhao`, `areaHectares` e `tipoSolo` (`Argiloso`, `Arenoso`, `Misto`).
  - O operador pode **adicionar** e **remover** talhões dinamicamente da lista.
- **Validação Cruzada / Customizada**:
  - Validador síncrono que assegura que a soma total das áreas dos talhões não ultrapasse o limite total da fazenda (ex.: 2.500 hectares) e que exista ao menos 1 talhão cadastrado.
- **Sincronização de Estado**:
  - No Angular 15, monitoramento reativo com Observables via `form.valueChanges` e `form.statusChanges`.
  - No Angular 22, integração direta e declarativa do valor e status do formulário com primitivas reativas de Signals.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Tipagem Estrita (Typed Forms)** | Introduzida como evolução das classes não tipadas do v14 | Tipagem padrão, refinada e estrita em todo o modelo reativo |
| **Módulos vs Standalone** | Registro obrigatório de `ReactiveFormsModule` no `@NgModule` | `ReactiveFormsModule` importado pontualmente no componente Standalone |
| **Fluxo Reativo** | Exclusivamente via streams de RxJS (`valueChanges`, `statusChanges`) | Reatividade mista ou nativa com integração a Signals (`toSignal`) |
| **Renderização do FormArray** | `*ngFor="let t of talhoes.controls; let i = index"` | `@for (t of talhoes.controls; track $index)` nativo e performático |
| **Change Detection** | Vinculada ao `zone.js` global | Totalmente desacoplada em modo Zoneless (`provideZonelessChangeDetection()`) |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, os Typed Forms garantem tipagem forte nos controles, mas a reatividade de valores em tempo real depende de subscrições em `valueChanges`:

```typescript
// safra-form.component.ts
export class SafraFormComponent implements OnInit {
  safraForm = this.fb.group({
    safraAno: ['2025/2026', [Validators.required]],
    culturaPrincipal: ['Soja', [Validators.required]],
    responsavelAgronomo: ['Mariana Silva', [Validators.required, Validators.minLength(5)]],
    talhoes: this.fb.array<FormGroup>([])
  });

  get talhoes(): FormArray {
    return this.safraForm.get('talhoes') as FormArray;
  }
}
```

No template do Angular 15, a iteração da coleção dinâmica depende do `CommonModule`:

```html
<div formArrayName="talhoes">
  <div *ngFor="let talhao of talhoes.controls; let i = index" [formGroupName]="i">
    <input formControlName="nomeTalhao" class="form-control" />
    <input formControlName="areaHectares" type="number" class="form-control" />
    <button type="button" (click)="removerTalhao(i)">Remover</button>
  </div>
</div>
```

---

### No Angular 22 (`v22`)

No Angular 22, o componente Standalone importa `ReactiveFormsModule` diretamente. O estado computado da área total e a contagem de talhões podem ser derivados via Signals para alimentar o template sem sobrecarga de renderização:

```typescript
// safra-form.ts
@Component({
  selector: 'app-safra-form',
  imports: [ReactiveFormsModule],
  templateUrl: './safra-form.html',
  styleUrls: ['./safra-form.css']
})
export class SafraForm {
  private readonly fb = inject(FormBuilder);

  readonly safraForm = this.fb.group({
    safraAno: ['2025/2026', [Validators.required]],
    culturaPrincipal: ['Soja', [Validators.required]],
    responsavelAgronomo: ['Mariana Silva', [Validators.required, Validators.minLength(5)]],
    talhoes: this.fb.array<FormGroup>([])
  });

  get talhoes(): FormArray {
    return this.safraForm.get('talhoes') as FormArray;
  }
}
```

No template do Angular 22, utilizamos o Built-in Control Flow com tracking nativo:

```html
<div formArrayName="talhoes">
  @for (talhao of talhoes.controls; track $index; let i = $index) {
    <div [formGroupName]="i" class="talhao-item">
      <input formControlName="nomeTalhao" class="form-control" />
      <input formControlName="areaHectares" type="number" class="form-control" />
      <button type="button" (click)="removerTalhao(i)">Remover</button>
    </div>
  } @empty {
    <p>Nenhum talhão cadastrado para esta safra.</p>
  }
</div>
```

---

## Vantagens do Reactive Forms com Typed Forms

1. **Robustez e Tipagem Estrita**: Erros de digitação nos nomes dos controles ou atribuição de tipos incompatíveis são capturados em tempo de compilação pelo TypeScript.
2. **Facilidade em Formulários Dinâmicos**: O `FormArray` permite adicionar, remover e reordenar blocos de campos programaticamente de maneira determinística.
3. **Validações Complexas Desacopladas**: Regras de negócio assíncronas ou entre múltiplos campos podem ser isoladas em funções puras de validação e testadas unitariamente sem a necessidade de instanciar o DOM.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/17-reactive-forms/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/17-reactive-forms/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
