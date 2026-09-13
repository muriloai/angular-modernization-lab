# Conceito 08: Detecção de Mudanças

Comparativo prático dos mecanismos de **Detecção de Mudanças (Change Detection)** entre o **Angular 15** e o **Angular 22**, confrontando a estratégia clássica com **Zone.js** (`Default` e `OnPush`) com o moderno modo **Zoneless** nativo baseado em **Signals**.

---

## Cenário de Negócio

Para demonstrar como os ciclos de renderização impactam o consumo de CPU e a atualização do DOM, ambos os projetos implementam o painel de **Monitoramento de Pivôs Centrais de Irrigação (Fazenda Santa Maria)**:

- Cartões de telemetria de pivôs agrícolas (`PivoCard`) com dados de ângulo de giro, vazão e status operacional.
- Disparo de eventos neutros e temporizadores no componente pai para testar se os componentes filhos sofrem checagens desnecessárias.
- No Angular 15, visualização do impacto do Zone.js e da contenção de ciclos via `ChangeDetectionStrategy.OnPush`.
- No Angular 22, execução sem Zone.js (`provideZonelessChangeDetection`), onde a reatividade granular dos Signals atualiza exclusivamente os nós de template afetados.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Motor de Detecção** | Dependência obrigatória da biblioteca `zone.js` | Modo Zoneless nativo (`provideZonelessChangeDetection`) |
| **Gatilho de Verificação** | Macrotarefas e eventos do browser interceptados pelo Zone.js | Notificações síncronas e precisas emitidas por Signals |
| **Estratégia Padrão** | `Default` (varredura da árvore inteira do topo à base) | Atualização seletiva apenas onde há nós dependentes de Signals |
| **Otimização Manual** | Exige configurar `OnPush` e invocar `markForCheck()` | Desnecessário; todo componente com Signals já atua de forma seletiva |
| **Tamanho do Pacote (Bundle)** | Inclui `zone.js` (~15KB a 35KB comprimido) | `zone.js` removido dos polyfills, reduzindo o tamanho final |
| **Depuração de Ciclos** | Risco de `ExpressionChangedAfterItHasBeenCheckedError` | Fluxo de dados unidirecional claro e previsível |

---

## Análise Comparativa Detalhada

### O Modelo Clássico: Zone.js e a Estratégia `OnPush` (Angular 15)

No Angular 15, o `zone.js` sobrescreve APIs nativas como `setTimeout`, `setInterval` e `addEventListener`. Quando qualquer evento ocorre:

1. O Zone.js emite um evento global `onMicrotaskEmpty`.
2. O Angular inicia uma varredura completa (`ApplicationRef.tick()`), verificando expressões em toda a árvore de componentes.
3. Para impedir verificações em componentes que não mudaram, o desenvolvedor precisa declarar explicitamente `ChangeDetectionStrategy.OnPush`:

```typescript
@Component({
  selector: 'app-pivo-card',
  templateUrl: './pivo-card.component.html',
  // OnPush instrui o Angular a pular este componente, a menos que seus @Input mudem
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PivoCardComponent {
  @Input() nome = '';
  @Input() angulo = 0;

  constructor(private cd: ChangeDetectorRef) {}

  atualizacaoAssincrona(): void {
    // Exige aviso explicito ao Angular quando algo muda fora dos fluxos padrao
    this.cd.markForCheck();
  }
}
```

_Limitação:_ O `OnPush` é fácil de quebrar. Se objetos forem mutados diretamente em vez de recriados, a tela não atualiza.

---

### O Modelo Moderno: Zoneless Nativo e Signals (Angular 22)

No Angular 22, a biblioteca `zone.js` é dispensada através de `provideZonelessChangeDetection()`:

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};
```

Com o Zoneless:

1. Nenhuma API nativa do navegador é modificada.
2. Quando um Signal é atualizado (`sinal.set(novoValor)`), ele notifica diretamente as instruções de renderização vinculadas àquele nó específico.
3. O framework não varre a árvore de componentes de cima para baixo procurando alterações.
4. Não é necessário configurar `OnPush` nem chamar `markForCheck()`.

```typescript
// pivo-card.ts no Angular 22
@Component({
  selector: 'app-pivo-card',
  templateUrl: './pivo-card.html'
})
export class PivoCard {
  // Entradas em Signals fornecem rastreamento granular automatico
  readonly nome = input.required<string>();
  readonly angulo = input.required<number>();
}
```

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/08-change-detection/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/08-change-detection/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
