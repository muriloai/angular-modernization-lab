# Conceito 04: Diretivas e Directive Composition API

Comparativo prático da evolução das Diretivas de Atributo e da introdução da **Directive Composition API** (`hostDirectives`) entre o **Angular 15** e o **Angular 22**.

---

## Cenário de Negócio

Para ilustrar o uso de diretivas na prática, ambos os projetos implementam cartões e crachás de telemetria agrícola para **Alertas de Sensores de Campo (Fazenda Santa Maria)**:

- Realce visual dinâmico com cor de borda conforme o nível de severidade (`baixo`, `médio` ou `crítico`).
- Efeito de foco e destaque visual durante a interação do usuário (passagem do cursor do mouse).
- Animação de pulso contínuo para indicar sensores com status crítico de leitura.
- Composição de múltiplos comportamentos em elementos hospedeiros sem duplicar código.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Declaração de Diretivas** | Obrigatório declarar no array `declarations` de um `NgModule` | Standalone por padrão, importada diretamente onde necessária |
| **Vinculação com o Hospedeiro** | Decorators legados `@HostBinding()` e `@HostListener()` | Propriedade declarativa `host: {}` no metadado da diretiva |
| **Composição em Componentes** | Inexistente; o consumidor precisava aplicar a diretiva manualmente na tag | `hostDirectives` permite embutir diretivas no próprio componente |
| **Exposição de Inputs/Outputs** | Sem suporte a renomeação ou remapeamento de contratos do host | Mapeamento explícito de entradas e saídas via `inputs: ['origem: alias']` |
| **Herança vs Composição** | Tendência a criar classes base abstratas para compartilhar comportamento | Composição pura de comportamentos reutilizáveis e desacoplados |

---

## Análise Comparativa Detalhada

### Diretiva de Atributo Clássica (Angular 15)

#### No Angular 15 (`v15/src/app/directives/sensor-alert.directive.ts`)

No Angular 15, a diretiva depende de decorators para interagir com o elemento onde foi aplicada:

```typescript
@Directive({
  selector: '[appSensorAlert]'
})
export class SensorAlertDirective {
  @Input() nivelAlerta: 'baixo' | 'medio' | 'critico' = 'baixo';

  @HostBinding('class.alerta-hover') isHovered = false;

  @HostBinding('style.borderLeftColor')
  get borderLeftColor(): string {
    switch (this.nivelAlerta) {
      case 'critico': return '#dc2626';
      case 'medio': return '#f59e0b';
      default: return '#16a34a';
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
  }
}
```

#### O Problema no Angular 15

Se você criar um componente reutilizável `SensorBadgeComponent` e quiser que ele possua os comportamentos de alerta e animação, você não tem como embutir essas diretivas internamente. O desenvolvedor que consumir o componente precisará aplicar as diretivas manualmente na tag HTML todas as vezes:

```html
<!-- No Angular 15: O consumidor e obrigado a aplicar a diretiva na tag -->
<div appSensorAlert [nivelAlerta]="'critico'">
  Crachá de Alerta
</div>
```

---

### Directive Composition API (Angular 22)

#### Diretivas Modernas e Independentes (`v22/src/app/directives/`)

No Angular 22, as diretivas utilizam a propriedade `host` declarativa no metadado e entradas baseadas em signals:

```typescript
@Directive({
  selector: '[appSensorAlert]',
  host: {
    '[class.alerta-hover]': 'isHovered()',
    '[style.borderLeftColor]': 'bordaCor()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class SensorAlertDirective {
  readonly nivelAlerta = input<'baixo' | 'medio' | 'critico'>('baixo');
  readonly isHovered = signal(false);

  bordaCor(): string {
    switch (this.nivelAlerta()) {
      case 'critico': return '#dc2626';
      case 'medio': return '#f59e0b';
      default: return '#16a34a';
    }
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
  }
}
```

#### Compondo Diretivas no Componente (`v22/src/app/sensor-badge.ts`)

Através de `hostDirectives`, o componente herda os comportamentos de `SensorAlertDirective` e `PulseAnimationDirective` sem herança de classes. Ele ainda pode remapear as entradas para nomes mais convenientes:

```typescript
@Component({
  selector: 'app-sensor-badge',
  templateUrl: './sensor-badge.html',
  styleUrl: './sensor-badge.css',
  // O componente recebe os comportamentos e expoe os inputs diretamente
  hostDirectives: [
    {
      directive: SensorAlertDirective,
      inputs: ['nivelAlerta: nivel']
    },
    {
      directive: PulseAnimationDirective,
      inputs: ['animar: pulsar']
    }
  ]
})
export class SensorBadge {
  readonly nome = input.required<string>();
  readonly tipo = input.required<string>();
  readonly valor = input.required<string>();
}
```

#### Uso Limpo no Template do Pai (`v22/src/app/app.html`)

O consumidor do componente utiliza os inputs remapeados sem precisar saber quais diretivas internas foram aplicadas:

```html
<!-- No Angular 22: O componente ja nasce com os comportamentos embutidos -->
<app-sensor-badge
  [nome]="'Sensor Solo 01'"
  [tipo]="'Umidade'"
  [valor]="'14%'"
  [nivel]="'critico'"
  [pulsar]="true"
/>
```

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/04-directives/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/04-directives/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
