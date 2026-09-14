# Conceito 18: Formulários Dinâmicos Orientados a Esquema JSON (Dynamic Forms)

Comparativo técnico entre a construção de motores de formulários dinâmicos com manipulação imperativa de `FormGroup` no Angular 15 e a arquitetura reativa moderna orientada a Signals e componentes Standalone no Angular 22.

---

## Cenário de Negócio

Na **Fazenda Santa Maria**, existem dezenas de modelos e fabricantes de sensores de campo espalhados pelas áreas de plantio. Cada categoria de sensor exige campos de calibração específicos que não devem ser codificados de forma estática no template:

1. **Sensor de Umidade do Solo (FDR/TDR)**:
   - Campos: Profundidade de Inserção (cm), Constante Dielétrica de Calibração, Frequência de Amostragem (minutos).
2. **Sensor de pH e Condutividade Elétrica**:
   - Campos: Solução Tampão de Referência, Compensação Automática de Temperatura (°C), Faixa de Tolerância de Acidez.
3. **Estação Meteorológica Compacta**:
   - Campos: Altura da Torre Anemométrica (metros), Pressão Atmosférica Barométrica Local, Orientação Solar do Piranômetro.

Ao selecionar o tipo de sensor em uma lista suspensa, o motor de formulário dinâmico lê o esquema de metadados em JSON e renderiza os campos apropriados instantaneamente, com seus respectivos tipos (`text`, `number`, `select`, `checkbox`), valores padrão e validadores.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Arquitetura de Módulo** | Exige `ReactiveFormsModule` e `CommonModule` em `@NgModule` | Componente Standalone importando pontualmente `ReactiveFormsModule` |
| **Reatividade ao Mudar Esquema** | Inscrições imperativas em `valueChanges` com reconstrução manual do `FormGroup` | Atualização reativa de schema orientada a Signals (`signal()`, `computed()`) |
| **Renderização dos Campos** | Switch clássico com diretivas estruturais (`*ngFor`, `[ngSwitch]`, `*ngSwitchCase`) | Novo Built-in Control Flow nativo (`@for`, `@switch`, `@case`) sem overhead |
| **Change Detection** | Dependente do ciclo de verificação global do `zone.js` | Modo Zoneless eficiente (`provideZonelessChangeDetection()`) |
| **Tipagem e Manutenibilidade** | Mapeamento genérico com `any` ou interfaces parciais | Tipagem estrita de metadados de campo (`DynamicFieldConfig`) |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, a montagem dinâmica dos controles é feita percorrendo a lista de metadados no TypeScript e vinculando ao template através de `[ngSwitch]`:

```typescript
// dynamic-form.component.ts
montarFormulario(fields: DynamicFieldConfig[]): void {
  const group: Record<string, FormControl> = {};
  fields.forEach(field => {
    const validadores = [];
    if (field.required) validadores.push(Validators.required);
    if (field.min !== undefined) validadores.push(Validators.min(field.min));
    if (field.max !== undefined) validadores.push(Validators.max(field.max));
    group[field.key] = new FormControl(field.defaultValue ?? '', validadores);
  });
  this.form = new FormGroup(group);
}
```

No template:

```html
<form [formGroup]="form" (ngSubmit)="salvar()">
  <div *ngFor="let f of currentFields" class="form-group">
    <label [for]="f.key">{{ f.label }}</label>
    <div [ngSwitch]="f.controlType">
      <input *ngSwitchCase="'textbox'" [id]="f.key" [type]="f.type" [formControlName]="f.key" class="form-control" />
      <select *ngSwitchCase="'dropdown'" [id]="f.key" [formControlName]="f.key" class="form-control">
        <option *ngFor="let opt of f.options" [value]="opt.value">{{ opt.label }}</option>
      </select>
    </div>
  </div>
</form>
```

---

### No Angular 22 (`v22`)

No Angular 22, o catálogo de esquemas e o esquema ativo são mantidos em Signals (`selectedType = signal('umidade')`, `activeSchema = computed(...)`). A renderização no template adota o Built-in Control Flow:

```html
<form [formGroup]="form" (ngSubmit)="salvar()">
  @for (f of activeFields(); track f.key) {
    <div class="form-group">
      <label [for]="f.key">{{ f.label }}</label>
      @switch (f.controlType) {
        @case ('textbox') {
          <input [id]="f.key" [type]="f.type" [formControlName]="f.key" class="form-control" />
        }
        @case ('dropdown') {
          <select [id]="f.key" [formControlName]="f.key" class="form-control">
            @for (opt of f.options; track opt.value) {
              <option [value]="opt.value">{{ opt.label }}</option>
            }
          </select>
        }
      }
    </div>
  }
</form>
```

---

## Vantagens dos Formulários Dinâmicos

1. **Flexibilidade Operacional**: Permite que sistemas de backend ou arquivos de configuração JSON definam o layout, validações e tipos de campos sem a necessidade de novos deploys de frontend.
2. **Reutilização Extrema**: Um único componente de formulário é capaz de atender dezenas de cenários de cadastro variados.
3. **Isolamento de Regras de Interface**: O template foca apenas no design e na disposição dos elementos, enquanto as regras de negócio residem no esquema de dados.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/18-dynamic-forms/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/18-dynamic-forms/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
