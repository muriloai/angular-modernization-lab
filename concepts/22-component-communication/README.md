# Conceito 22: Comunicação entre Componentes (Inputs, Outputs e Two-Way Binding)

Comparativo técnico entre a comunicação clássica baseada em decorators (`@Input()`, `@Output()`, `EventEmitter`) e a convenção manual *banana-in-a-box* no Angular 15 contra a abordagem moderna com Signals (`input()`, `input.required()`, `output()` e `model()`) no Angular 22.

---

## Cenário de Negócio

Na gestão agrícola da **Fazenda Santa Maria**, o controle da frota de aeronaves não tripuladas (drones de pulverização e drones de sensoriamento multiespectral) requer comunicação contínua e precisa entre a central de operações e as unidades em voo:

1. **Envio de Parâmetros de Missão (Pai para Filho - Inputs)**:
   - A central transmite a telemetria da aeronave (identificação, nível de bateria, capacidade do tanque de calda) para o cartão individual de controle do drone.
2. **Notificação de Eventos Operacionais (Filho para Pai - Outputs)**:
   - O operador aciona ações no cartão (decolagem para pulverização, retorno à base de recarga ou pouso de emergência), propagando eventos para o painel consolidado da fazenda.
3. **Sincronização Bidirecional em Tempo Real (Two-Way Binding)**:
   - O ajuste da altitude de voo (metros acima da copa da cultura) e a taxa de vazão da calda precisam ser ajustados tanto no cartão do operador quanto refletidos imediatamente no sumário da frota.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Definição de Entradas** | Decorator `@Input()` com asserção não-nula (`drone!: Drone`) | Função reativa `input()` ou `input.required<Drone>()` |
| **Entradas Obrigatórias** | Sem validação em tempo de compilação nativa do compilador | Compilação estrita garantida com `input.required()` |
| **Transformação de Inputs** | Getters/setters imperativos ou hook `ngOnChanges` complexo | Derivação declarativa imediata usando `computed()` |
| **Definição de Saídas** | Decorator `@Output()` acoplado à classe `EventEmitter` do RxJS | Função utilitária `output<T>()` desacoplada de streams |
| **Two-Way Binding** | Par manual obrigatório: `@Input() valor` e `@Output() valorChange` | Primitivo reativo único: `model<T>(valorPadrao)` |
| **Change Detection** | Dependência de `zone.js` para detectar mutações em referências | Atualização cirúrgica orientada a Signals em modo Zoneless |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No modelo clássico do Angular 15, a comunicação entre componentes depende fortemente de decorators de classe e convenções de nomenclatura:

```typescript
// drone-card.component.ts (Angular 15)
@Component({
  selector: 'app-drone-card',
  templateUrl: './drone-card.component.html'
})
export class DroneCardComponent {
  // Entrada simples sem garantia estrita de obrigatoriedade
  @Input() drone!: Drone;

  // Par de propriedades para suportar banana-in-a-box [(altitude)]
  @Input() altitude: number = 15;
  @Output() altitudeChange = new EventEmitter<number>();

  // Evento de saída clássico com RxJS EventEmitter
  @Output() missaoIniciada = new EventEmitter<Drone>();

  ajustarAltitude(novaAltitude: number): void {
    this.altitude = novaAltitude;
    this.altitudeChange.emit(this.altitude);
  }

  decolar(): void {
    this.missaoIniciada.emit(this.drone);
  }
}
```

No template do componente pai (`app.component.html`), o two-way binding exigia o casamento exato de nomes com o sufixo `Change`:

```html
<!-- app.component.html (Angular 15) -->
<app-drone-card
  [drone]="droneSelecionado"
  [(altitude)]="altitudeGlobal"
  (missaoIniciada)="processarDecolagem($event)">
</app-drone-card>
```

---

### No Angular 22 (`v22`)

No Angular 22, a comunicação passa a ser puramente declarativa com primitivos de Signals, eliminando decorators legados e o acoplamento desnecessário ao RxJS:

```typescript
// drone-card.ts (Angular 22)
@Component({
  selector: 'app-drone-card',
  templateUrl: './drone-card.html'
})
export class DroneCard {
  // Entrada obrigatória estritamente tipada
  readonly drone = input.required<Drone>();

  // Two-way binding automático via Signal Model
  readonly altitude = model<number>(15);

  // Saída moderna e limpa
  readonly missaoIniciada = output<Drone>();

  // Valor computado derivado do input sem necessidade de ngOnChanges
  readonly autonomiaRestanteKm = computed(() => {
    return Math.round((this.drone().bateriaPercentual / 100) * 45);
  });

  ajustarAltitude(novaAltitude: number): void {
    this.altitude.set(novaAltitude);
  }

  decolar(): void {
    this.missaoIniciada.emit(this.drone());
  }
}
```

No template pai, a sintaxe `[(altitude)]` funciona diretamente com signals sem exigir pares manuais de `Input` e `Output`:

```html
<!-- app.html (Angular 22) -->
<app-drone-card
  [drone]="droneSelecionado()"
  [(altitude)]="altitudeGlobal"
  (missaoIniciada)="processarDecolagem($event)">
</app-drone-card>
```

---

## Vantagens da Abordagem Moderna

1. **Tipagem e Segurança em Tempo de Compilação**: Com `input.required()`, esquecer de passar um dado essencial gera erro imediato no build, prevenindo exceções de tela em produção.
2. **Eliminação de Boilerplate no Two-Way**: O primitivo `model()` substitui a repetição enfadonha de criar dois membros no componente apenas para sincronizar valores.
3. **Derivação de Estado Limpa**: Em vez de interceptar mudanças em `ngOnChanges` ou criar setters imperativos, novos valores calculados são expressos naturalmente com `computed()`.
4. **Desacoplamento do RxJS**: O uso de `output()` substitui o `EventEmitter`, reduzindo a sobrecarga de memória quando fluxos de dados complexos não são necessários.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/22-component-communication/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/22-component-communication/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
