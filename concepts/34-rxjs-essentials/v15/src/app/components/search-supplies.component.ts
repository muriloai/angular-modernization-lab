import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, exhaustMap, tap } from 'rxjs/operators';
import { SupplyService } from '../services/supply.service';
import { SupplyItem } from '../models/supply.model';

@Component({
  selector: 'app-search-supplies',
  templateUrl: './search-supplies.component.html',
  styleUrls: ['./search-supplies.component.css']
})
export class SearchSuppliesComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  supplies$!: Observable<SupplyItem[]>;

  private dispatchSubject = new Subject<string>();
  isDispatching = false;
  lastFeedback = '';

  private sub = new Subscription();

  constructor(private supplyService: SupplyService) {}

  ngOnInit(): void {
    // switchMap: cancela requisicoes anteriores quando o usuario continua digitando
    this.supplies$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.supplyService.searchSupplies(query || ''))
    );

    // exhaustMap: ignora cliques subsequentes enquanto a requisicao atual estiver em voo
    this.sub.add(
      this.dispatchSubject.pipe(
        tap(() => {
          this.isDispatching = true;
          this.lastFeedback = 'Processando liberação no depósito...';
        }),
        exhaustMap(supplyId => this.supplyService.dispatchApplication(supplyId)),
        tap(response => {
          this.isDispatching = false;
          this.lastFeedback = response.message;
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onDispatch(supplyId: string): void {
    this.dispatchSubject.next(supplyId);
  }
}
