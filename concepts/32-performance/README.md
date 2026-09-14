# Conceito 32: Padroes Corporativos de Performance e Virtual Scrolling

Este modulo aborda estrategias avancadas de otimizacao de performance no Angular, com foco na renderizacao de grandes volumes de dados via **Virtual Scrolling** (`@angular/cdk/scrolling`) e no carregamento eficiente de ativos visuais com **NgOptimizedImage** (`@angular/common`).

No cenario da **Fazenda Santa Maria**, uma rede de telemetria IoT coleta dados de **10.000 sensores de campo** distribuidos por talhoes, silos e estacoes meteorologicas. Renderizar 10.000 cards simultaneamente no DOM convencional resultaria em mais de 50.000 nos HTML, provocando travamento de tela (queda de FPS), alto consumo de memoria RAM e congelamento do navegador. O Virtual Scrolling resolve esse gargalo mantendo no DOM apenas os itens visiveis na janela de rolagem do usuario (viewport).

---

## 1. Visao Comparativa Geral

| Aspecto | Angular 15 (Legado) | Angular 22 (Moderno) |
| :--- | :--- | :--- |
| **Modulo de Rolagem Virtual** | Importacao de `ScrollingModule` no `AppModule` | Importacao direta de `ScrollingModule` no componente Standalone |
| **Otimizacao de Imagens** | Diretiva `NgOptimizedImage` em estagio inicial com configuracoes manuais | `NgOptimizedImage` consolidada com suporte nativo a `priority`, `fill` e `srcset` automatico |
| **Deteccao de Mudancas no Scroll** | Eventos de scroll interceptados e validados pelo `zone.js`, gerando micro-checks | Deteccao Zoneless pura: a rolagem executa a 60 FPS estaveis sem sobrecarga de Zone |
| **Gerenciamento do Dataset** | Arrays estaticos ou Observables com pipe `async` | Signals reativos (`signal<Sensor[]>`) com filtros computados (`computed()`) |
| **Consumo de Memoria do DOM** | Centenas de MB se o desenvolvedor usasse `*ngFor` puro | Menos de 30 elementos no DOM ativo independentemente do tamanho da colecao |

---

## 2. O Modelo Legado: Angular 15

No Angular 15, a configuracao do Virtual Scrolling dependia da importacao de `ScrollingModule` e do registro sincrono no modulo raiz:

```typescript
// app.module.ts (Angular 15)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgOptimizedImage } from '@angular/common';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ScrollingModule,
    NgOptimizedImage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

No template:
```html
<cdk-virtual-scroll-viewport itemSize="64" class="viewport">
  <div *cdkVirtualFor="let sensor of sensors" class="sensor-row">
    <span>{{ sensor.name }}</span>
  </div>
</cdk-virtual-scroll-viewport>
```

---

## 3. O Modelo Moderno: Angular 22

No Angular 22, a remocao do `zone.js` potencializa a performance do Virtual Scrolling. Como o motor do navegador nao precisa interceptar cada micro-evento de scroll para varrer a arvore de componentes, a rolagem permanece perfeitamente suave mesmo em dispositivos moveis de baixo custo:

```typescript
// virtual-sensors.ts (Angular 22)
import { Component, computed, signal } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-virtual-sensors',
  imports: [ScrollingModule, NgOptimizedImage],
  templateUrl: './virtual-sensors.html',
  styleUrl: './virtual-sensors.css'
})
export class VirtualSensors {
  readonly allSensors = signal<Sensor[]>(generateSensors(10000));
  readonly filterQuery = signal('');

  readonly filteredSensors = computed(() => {
    const q = this.filterQuery().toLowerCase();
    return this.allSensors().filter(s => s.name.toLowerCase().includes(q));
  });
}
```

---

## 4. Estrutura dos Projetos

```text
concepts/32-performance/
|-- README.md
|-- v15/
|   |-- package.json                     (porta 4200)
|   `-- src/app/
|       |-- models/sensor.model.ts       (Dados de telemetria)
|       |-- components/virtual-sensors.* (ScrollingModule no modulo)
|       |-- app.module.ts
|       `-- app.component.*
`-- v22/
    |-- package.json                     (porta 4201)
    `-- src/app/
        |-- models/sensor.model.ts
        |-- components/virtual-sensors.* (Standalone + Signals + Zoneless)
        |-- app.config.ts
        `-- app.*
```

---

## 5. Roteiro de Migracao

1. **Importar ScrollingModule diretamente no componente**: Elimine importacoes em `SharedModule` ou `AppModule`.
2. **Adotar Zoneless**: A remocao do `zone.js` eleva o scrolling intensivo para 60 FPS estaveis, pois descarta verificacoes desnecessarias a cada pixel rolado.
3. **Utilizar NgOptimizedImage com prioridade**: Marque imagens acima da dobra (LCP) com o atributo `priority` para otimizar o Core Web Vitals.
