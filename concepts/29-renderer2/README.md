# Conceito 29: Manipulacao Segura do DOM com Renderer2

Este modulo explora o uso de `Renderer2` e `ElementRef` para manipulacao segura do DOM, demonstrando a diferenca entre o acesso direto inseguro (`nativeElement`, `document`) e a camada de abstracao do Angular que preserva a compatibilidade com Server-Side Rendering (SSR) e plataformas isoladas.

No cenario da **Fazenda Santa Maria**, a aplicacao gerencia silos de armazenamento de graos. Os operadores podem inspecionar a temperatura e o nivel de preenchimento dos silos, aplicando estilizacoes dinamicas, classes de alerta e mutacoes no DOM de forma programatica e segura.

---

## 1. Visao Comparativa Geral

| Aspecto | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Injecao de Dependencia** | Construtor com injecao de `Renderer2` e `ElementRef` | Funcao utilitaria `inject(Renderer2)` em campos declarativos |
| **Consulta de Elementos** | `@ViewChild('siloGauge', { static: false })` exigindo ciclo `AfterViewInit` | Signal query `viewChild<ElementRef>('siloGauge')` reativo |
| **Acoplamento de Plataforma** | Risco comum de desenvolvedores acessarem `element.nativeElement.style` diretamente | Abstracao com `Renderer2` garantindo compatibilidade com SSR e hidratacao |
| **Arquitetura de Modulos** | Componentes declarados em `AppModule` | Componente Standalone por padrao sem declaracoes de modulo |
| **Reatividade** | Variaveis de estado locais com Change Detection manual | Signals reativos atualizando metricas em tempo real de forma Zoneless |

---

## 2. O Modelo Legado: Angular 15

No Angular 15, a manipulacao do DOM com `Renderer2` era feita via injecao classica no construtor combinada com consultas de visao usando decorators:

```typescript
// silo-visualizer.component.ts (Angular 15)
import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-silo-visualizer',
  templateUrl: './silo-visualizer.component.html'
})
export class SiloVisualizerComponent implements AfterViewInit {
  @ViewChild('gaugeBar') gaugeBar!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private hostRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.updateLevel(75);
  }

  updateLevel(percent: number): void {
    // Manipulacao segura via Renderer2
    this.renderer.setStyle(this.gaugeBar.nativeElement, 'height', percent + '%');
    if (percent > 85) {
      this.renderer.addClass(this.gaugeBar.nativeElement, 'level-critical');
    }
  }
}
```

### Problemas do acesso direto ao DOM:
- **Quebra em SSR**: Acessos como `document.getElementById()` ou `window.alert()` quebram a execucao no Node.js durante SSR ou pre-rendering.
- **Risco de seguranca**: Manipular `nativeElement.innerHTML` diretamente contorna o sistema de sanitizacao e abre brechas para vulnerabilidades XSS.

---

## 3. O Modelo Moderno: Angular 22

No Angular 22, o `Renderer2` permanece como a API recomendada para manipulacoes programaticas imperativas do DOM, porem enriquecido com `inject()` e `viewChild()` reativo:

```typescript
// silo-visualizer.ts (Angular 22)
import { Component, ElementRef, viewChild, inject, effect } from '@angular/core';

@Component({
  selector: 'app-silo-visualizer',
  templateUrl: './silo-visualizer.html'
})
export class SiloVisualizer {
  private readonly renderer = inject(Renderer2);
  readonly gaugeBar = viewChild<ElementRef>('gaugeBar');

  applyLevel(percent: number): void {
    const el = this.gaugeBar()?.nativeElement;
    if (el) {
      this.renderer.setStyle(el, 'height', `${percent}%`);
      if (percent > 85) {
        this.renderer.addClass(el, 'level-critical');
      } else {
        this.renderer.removeClass(el, 'level-critical');
      }
    }
  }
}
```

### Vantagens do modelo moderno:
- **Total integracao com Signals**: Os valores podem ser sincronizados com `effect()` ou acionados sob demanda por metodos reativos.
- **Codigo conciso**: Eliminacao completa do construtor e de decorators de propriedade.
- **Suporte a SSR e Zoneless**: Operacoes executadas via `Renderer2` sao compativeis com a nova arquitetura de renderizacao do Angular 22.

---

## 4. Estrutura dos Projetos

```text
concepts/29-renderer2/
|-- README.md
|-- v15/
|   |-- package.json                     (porta 4200)
|   `-- src/app/
|       |-- models/silo.model.ts         (Modelo de dados dos silos)
|       |-- components/silo-visualizer.* (Uso de Renderer2 no construtor)
|       |-- app.module.ts                (Modulo classico)
|       `-- app.component.*              (Tela principal)
`-- v22/
    |-- package.json                     (porta 4201)
    `-- src/app/
        |-- models/silo.model.ts         (Modelo tipado)
        |-- components/silo-visualizer.* (Uso de inject(Renderer2) e viewChild)
        |-- app.config.ts                (Zoneless)
        `-- app.*                        (Componente raiz standalone)
```

---

## 5. Roteiro de Migracao

1. **Substituir o construtor por inject()**: Substitua `constructor(private renderer: Renderer2)` por `private readonly renderer = inject(Renderer2)`.
2. **Substituir @ViewChild por viewChild()**: Troque `@ViewChild('gauge')` por `readonly gauge = viewChild<ElementRef>('gauge')`.
3. **Remover AfterViewInit desnecessario**: Utilize a reatividade dos signals para acessar o elemento de forma segura assim que ele for instanciado.
