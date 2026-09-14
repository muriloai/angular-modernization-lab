# Conceito 26: Interação com o Elemento Hospedeiro (Host Interaction)

Comparativo técnico entre a vinculação clássica ao elemento hospedeiro com decorators `@HostBinding` e `@HostListener` no Angular 15 e a abordagem moderna e declarativa com a propriedade `host` nos metadados do `@Component` integrada a Signals no Angular 22.

---

## Cenário de Negócio

No sistema de telemetria e comando de maquinário agrícola da **Fazenda Santa Maria**, os operadores utilizam cartões de ação rápida de equipamentos (`MachineActionCard`):

1. **Reação a Interações do Usuário**:
   - O elemento hospedeiro precisa reagir a eventos de mouse (`mouseenter`, `mouseleave`) e teclado (`click`, `keydown.enter`) para fornecer retorno tátil e visual ao operador.
2. **Vinculação Dinâmica de Classes e Estilos**:
   - Classes CSS de destaque (`is-hovered`, `is-active`, `is-running`) e cores de borda temáticas são aplicadas diretamente no elemento hospedeiro sem necessidade de wrappers extras no DOM.
3. **Acessibilidade e Atributos Semânticos**:
   - Atributos como `role="button"`, `tabindex="0"` e `aria-pressed` são gerenciados no próprio componente.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Vinculação de Propriedades/Classes** | Decorators `@HostBinding('class.nome')` em membros da classe | Objeto declarativo `host: { '[class.nome]': 'sinal()' }` no decorator `@Component` |
| **Escuta de Eventos** | Decorators `@HostListener('evento')` anotando métodos | Objeto declarativo `host: { '(evento)': 'metodo()' }` no decorator `@Component` |
| **Organização do Código** | Metadados dispersos ao longo de toda a classe TypeScript | Todas as propriedades e listeners do host centralizados em um único local |
| **Integração com Signals** | Requer variáveis mutáveis clássicas com detecção via `zone.js` | Suporta sinais reativos síncronos lidos diretamente nas expressões |
| **Boilerplate e Decorators** | Múltiplos decorators de propriedade poluindo a classe | Zero decorators de host, reduzindo o tamanho do bundle |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, decorators individuais são distribuídos pelos membros e métodos da classe:

```typescript
// machine-action-card.component.ts (Angular 15)
@Component({
  selector: 'app-machine-action-card',
  templateUrl: './machine-action-card.component.html',
  styleUrls: ['./machine-action-card.component.css']
})
export class MachineActionCardComponent {
  @HostBinding('attr.role') role = 'button';
  @HostBinding('attr.tabindex') tabindex = 0;

  @HostBinding('class.is-hovered') isHovered = false;
  @HostBinding('class.is-active') isActive = false;
  @HostBinding('style.borderColor') borderColor = '#cbd5e1';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
    this.borderColor = '#2563eb';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
    this.borderColor = this.isActive ? '#16a34a' : '#cbd5e1';
  }

  @HostListener('click')
  @HostListener('keydown.enter')
  toggleActive(): void {
    this.isActive = !this.isActive;
    this.borderColor = this.isActive ? '#16a34a' : '#2563eb';
  }
}
```

---

### No Angular 22 (`v22`)

No Angular 22, o objeto de metadados `host` substitui completamente todos os decorators, oferecendo visão declarativa imediata de como o componente interage com seu elemento no DOM:

```typescript
// machine-action-card.ts (Angular 22)
@Component({
  selector: 'app-machine-action-card',
  templateUrl: './machine-action-card.html',
  styleUrls: ['./machine-action-card.css'],
  host: {
    'role': 'button',
    'tabindex': '0',
    '[class.is-hovered]': 'isHovered()',
    '[class.is-active]': 'isActive()',
    '[style.borderColor]': 'corBorda()',
    '[attr.aria-pressed]': 'isActive()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(click)': 'toggleActive()',
    '(keydown.enter)': 'toggleActive()'
  }
})
export class MachineActionCard {
  readonly isHovered = signal(false);
  readonly isActive = signal(false);

  readonly corBorda = computed(() => {
    if (this.isActive()) return '#16a34a';
    if (this.isHovered()) return '#2563eb';
    return '#cbd5e1';
  });

  onMouseEnter(): void { this.isHovered.set(true); }
  onMouseLeave(): void { this.isHovered.set(false); }
  toggleActive(): void { this.isActive.update(v => !v); }
}
```

---

## Vantagens da Abordagem Moderna

1. **Centralização e Legibilidade**: Ao inspecionar o cabeçalho do componente, o desenvolvedor compreende imediatamente todos os atributos, classes e eventos vinculados ao elemento hospedeiro.
2. **Reatividade com Signals**: As propriedades do host utilizam `computed()` e `signal()`, atualizando o DOM com precisão cirúrgica sem Zone.js.
3. **Padrão Oficial Recomendado**: A equipe oficial do Angular orienta descontinuar `@HostBinding` e `@HostListener` em favor do objeto de metadados `host`.

---

## Como Executar

### Angular 15 (`v15`)

```bash
cd concepts/26-host-interaction/v15
npm install
npm start
```
Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

```bash
cd concepts/26-host-interaction/v22
npm install
npm start
```
Acesse em: `http://localhost:4201`
