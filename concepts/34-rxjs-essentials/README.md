# Conceito 34: Operadores Essenciais de Flattening e Concorrencia no RxJS

Este modulo aborda os operadores essenciais do **RxJS**, focando em tecnicas de busca reativa (`debounceTime`, `distinctUntilChanged`), comparativo pratico de operadores de achatamento de fluxo (**flattening operators**: `switchMap`, `concatMap`, `mergeMap`, `exhaustMap`) e a interoperabilidade moderna entre Streams RxJS e Signals atraves do pacote `@angular/core/rxjs-interop` no Angular 22.

No cenario da **Fazenda Santa Maria**, a cooperativa gerencia o estoque de insumos agricolas (defensivos, fertilizantes e sementes). O sistema realiza consultas com debounce e cancelamento automatico de chamadas desatualizadas, envia ordens de aplicacao em fila sequencial e impede cliques repetidos em acionamentos criticos.

---

## 1. Guia Mental dos Operadores de Flattening

| Operador | Comportamento com Novas Emissoes | Caso de Uso Tipico no AgroTech |
| :--- | :--- | :--- |
| **`switchMap`** | Cancela a requisicao interna anterior e assina a mais recente | Busca de sementes/fertilizantes em tempo real conforme o operador digita |
| **`concatMap`** | Enfileira as requisicoes executando uma a uma em ordem estrita | Envio ordenado de comandos de telemetria para controladores de campo |
| **`mergeMap`** | Executa todas as requisicoes concorrentemente em paralelo | Download simultaneo de logs de telemetria de multiplas maquinas |
| **`exhaustMap`** | Ignora novas emissoes enquanto a requisicao atual estiver em execucao | Botao de acionamento de bomba d'agua para evitar disparos duplicados |

---

## 2. O Modelo Legado: Angular 15

No Angular 15, toda a cadeia assincrona dependia exclusivamente do ecossistema RxJS, necessitando do operador `pipe(takeUntil(...))` para desinscricao ou do pipe `async` no template para evitar vazamento de memoria:

```typescript
// search-supplies.component.ts (Angular 15)
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SupplyService } from '../services/supply.service';
import { SupplyItem } from '../models/supply.model';

@Component({
  selector: 'app-search-supplies',
  templateUrl: './search-supplies.component.html'
})
export class SearchSuppliesComponent implements OnInit {
  searchControl = new FormControl('');
  results$!: Observable<SupplyItem[]>;

  constructor(private supplyService: SupplyService) {}

  ngOnInit(): void {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.supplyService.searchSupplies(query || ''))
    );
  }
}
```

---

## 3. O Modelo Moderno: Angular 22

No Angular 22, o RxJS continua sendo insubstituivel para fluxos baseados em tempo, cancelamento e concorrencia complexa, porem sua saida pode ser convertida diretamente em um **Signal** reativo usando `toSignal()`:

```typescript
// search-supplies.ts (Angular 22)
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { SupplyService } from '../services/supply.service';

@Component({
  selector: 'app-search-supplies',
  imports: [ReactiveFormsModule],
  templateUrl: './search-supplies.html'
})
export class SearchSupplies {
  private readonly supplyService = inject(SupplyService);

  readonly searchControl = new FormControl('');

  // Converte a stream com debounce e switchMap diretamente em um Signal reativo
  readonly results = toSignal(
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.supplyService.searchSupplies(query || ''))
    ),
    { initialValue: [] }
  );
}
```

### Vantagens do modelo moderno:
- **Zero pipe async no template**: O template consome `results()` diretamente, simplificando o binding e a sintaxe `@for`.
- **Desinscricao automatica**: O `toSignal()` se desinscreve automaticamente quando o contexto de injecao do componente e destruido.
- **Perfeito com Zoneless**: Como o valor emitido pelo Observable e propagado atraves de um Signal, a interface atualiza de forma cirurgica sem depender de `zone.js`.

---

## 4. Estrutura dos Projetos

```text
concepts/34-rxjs-essentials/
|-- README.md
|-- v15/
|   |-- package.json                     (porta 4200)
|   `-- src/app/
|       |-- models/supply.model.ts       (Modelo de insumos)
|       |-- services/supply.service.ts   (Metodos simulando latencia)
|       |-- components/search-supplies.* (RxJS puro + pipe async)
|       |-- app.module.ts
|       `-- app.component.*
`-- v22/
    |-- package.json                     (porta 4201)
    `-- src/app/
        |-- models/supply.model.ts
        |-- services/supply.service.ts
        |-- components/search-supplies.* (toSignal + switchMap + exhaustMap)
        |-- app.config.ts
        `-- app.*
```

---

## 5. Roteiro de Migracao

1. **Identificar fluxos assincronos baseados em tempo**: Mantenha operadores como `debounceTime` e `switchMap` no pipeline RxJS.
2. **Converter a saida final com toSignal()**: Elimine variaveis `$` e pipes `| async` no template convertendo o Observable para Signal na camada do componente.
3. **Utilizar operadores adequados para cada interacao**:
   - `switchMap` para caixas de pesquisa e autocomplete.
   - `exhaustMap` para botoes de envio e transacoes financeiras.
   - `concatMap` para filas ordenadas de comandos.
