import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, exhaustMap, tap } from 'rxjs/operators';
import { SupplyService } from '../services/supply.service';

@Component({
  selector: 'app-search-supplies',
  imports: [ReactiveFormsModule],
  templateUrl: './search-supplies.html',
  styleUrl: './search-supplies.css'
})
export class SearchSupplies {
  private readonly supplyService = inject(SupplyService);

  readonly searchControl = new FormControl('');

  // Converte a pipeline com switchMap e debounceTime diretamente em um Signal reativo
  readonly supplies = toSignal(
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.supplyService.searchSupplies(query || ''))
    ),
    { initialValue: [] }
  );

  private readonly dispatchSubject = new Subject<string>();
  readonly isDispatching = signal(false);
  readonly lastFeedback = signal('');

  constructor() {
    // exhaustMap: impede execucao simultanea de despachos
    this.dispatchSubject.pipe(
      tap(() => {
        this.isDispatching.set(true);
        this.lastFeedback.set('Processando liberação no depósito...');
      }),
      exhaustMap(supplyId => this.supplyService.dispatchApplication(supplyId)),
      tap(response => {
        this.isDispatching.set(false);
        this.lastFeedback.set(response.message);
      })
    ).subscribe();
  }

  onDispatch(supplyId: string): void {
    this.dispatchSubject.next(supplyId);
  }
}
