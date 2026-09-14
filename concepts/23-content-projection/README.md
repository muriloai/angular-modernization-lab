# Conceito 23: Projeção de Conteúdo e Conteúdo Padrão (Content Projection e Fallback Content)

Comparativo técnico entre a projeção clássica com `<ng-content>` multi-slot no Angular 15 (com suas limitações históricas para exibição de conteúdo padrão) e a moderna Projeção de Conteúdo com suporte nativo a Fallback Content introduzida nas versões recentes e consolidada no Angular 22.

---

## Cenário de Negócio

No painel de operações agrícolas da **Fazenda Santa Maria**, diversos módulos precisam exibir informações em cartões visuais padronizados (`AgroCard`):

1. **Boletim de Colheita Diária**:
   - Projeta título e insígnia no cabeçalho, dados consolidados de produtividade no corpo e botões de exportação de relatório no rodapé.
2. **Telemetria de Pivô de Irrigação Central**:
   - Projeta cabeçalho com status da motobomba e métricas no corpo, porém não define ações no rodapé, acionando o comportamento de contingência.
3. **Alerta de Risco Climático**:
   - Projeta apenas o cabeçalho crítico e uma recomendação textual rápida, delegando o rodapé para a orientação padrão de plantão agronômico.

---

## O Que Mudou entre Angular 15 e Angular 22?

| Dimensão | Angular 15 (Clássico) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Projeção Simples** | `<ng-content>` projeta tudo o que não tem seletor específico | `<ng-content>` com comportamento idêntico e otimizações de compilação |
| **Projeção Multi-slot** | `<ng-content select="[card-header]">` baseado em seletores CSS | `<ng-content select="[card-header]">` com suporte a seletores CSS e diretivas |
| **Suporte a Fallback Content** | Não suportado nativamente. Tags filhas dentro de `<ng-content>` eram ignoradas | Nativo. Qualquer marcação dentro de `<ng-content>` é exibida se o slot estiver vazio |
| **Controle de Slot Vazio** | Exigia inspecionar `@ContentChild` via código TypeScript para alternar `*ngIf` | Puramente declarativo no template HTML, sem linhas de TypeScript adicionais |
| **Arquitetura do Componente** | Componente clássico registrado em `@NgModule` | Componente Standalone nativo sem necessidade de módulos |

---

## Análise Comparativa Detalhada

### No Angular 15 (`v15`)

No Angular 15, colocar marcação dentro da tag `<ng-content>` causava aviso do compilador ou o conteúdo era descartado em tempo de execução:

```html
<!-- agro-card.component.html (Angular 15 - Limitação Clássica) -->
<div class="card">
  <div class="card-header">
    <ng-content select="[card-header]"></ng-content>
  </div>

  <div class="card-body">
    <ng-content select="[card-body]"></ng-content>
  </div>

  <!-- No Angular 15, se o pai não passar [card-footer], este slot fica em branco.
       Para contornar, era necessário inspecionar @ContentChild no TypeScript. -->
  <div class="card-footer" *ngIf="hasCustomFooter; else fallbackFooter">
    <ng-content select="[card-footer]"></ng-content>
  </div>

  <ng-template #fallbackFooter>
    <div class="card-footer fallback-box">
      <span>Procedimento padrão: Nenhuma ação imediata requerida.</span>
    </div>
  </ng-template>
</div>
```

E no TypeScript era obrigatório realizar queries no DOM projetado:

```typescript
// agro-card.component.ts (Angular 15)
@Component({
  selector: 'app-agro-card',
  templateUrl: './agro-card.component.html'
})
export class AgroCardComponent implements AfterContentInit {
  @ContentChild('footerSlot') footerContent?: ElementRef;
  hasCustomFooter = false;

  ngAfterContentInit(): void {
    this.hasCustomFooter = !!this.footerContent;
  }
}
```

---

### No Angular 22 (`v22`)

No Angular 22, o suporte a **Fallback Content** é nativo e elegante. Basta declarar o conteúdo padrão diretamente no interior da tag `<ng-content>`:

```html
<!-- agro-card.html (Angular 22 - Nativo e Declarativo) -->
<div class="card">
  <div class="card-header">
    <ng-content select="[card-header]">
      <!-- Fallback nativo de cabeçalho -->
      <h3 class="default-title">Indicador Geral da Fazenda</h3>
    </ng-content>
  </div>

  <div class="card-body">
    <ng-content select="[card-body]">
      <!-- Fallback nativo de corpo -->
      <p class="empty-body">Nenhum dado telemétrico transmitido nesta janela de tempo.</p>
    </ng-content>
  </div>

  <div class="card-footer">
    <ng-content select="[card-footer]">
      <!-- Fallback nativo de rodapé: renderizado automaticamente quando o consumidor omite o slot -->
      <div class="fallback-footer">
        <span class="badge-auto">Plantão Operacional Padrão</span>
        <span class="fallback-note">Monitoramento contínuo sem pendências técnicas.</span>
      </div>
    </ng-content>
  </div>
</div>
```

No TypeScript do Angular 22, o componente se torna 100% livre de código boilerplate:

```typescript
// agro-card.ts (Angular 22)
@Component({
  selector: 'app-agro-card',
  templateUrl: './agro-card.html',
  styleUrls: ['./agro-card.css']
})
export class AgroCard {
  // Nenhuma query no DOM nem hooks de ciclo de vida são necessários para gerenciar fallback.
}
```

---

## Vantagens da Abordagem Moderna

1. **Eliminação de Código Imperativo**: Não há necessidade de injetar `@ContentChild`, escutar `ngAfterContentInit` nem manter flags booleanas de presença.
2. **Performance Otimizada**: O compilador do Angular gerencia a projeção condicional sem overhead de verificação de mudanças do Zone.js.
3. **Reutilização e Robustez de Design System**: Componentes de interface compartilhados definem comportamentos padrão seguros para quando os consumidores omitirem slots secundários.

---

## Como Executar

### Angular 15 (`v15`)

Certifique-se de estar utilizando o **Node.js 18.x**:

```bash
cd concepts/23-content-projection/v15
npm install
npm start
```

Acesse em: `http://localhost:4200`

### Angular 22 (`v22`)

Certifique-se de estar utilizando o **Node.js 20.x ou 22.x+**:

```bash
cd concepts/23-content-projection/v22
npm install
npm start
```

Acesse em: `http://localhost:4201`
