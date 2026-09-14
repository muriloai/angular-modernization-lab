import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GrainBatch } from './models/grain-batch.model';
import { SiloService } from './services/silo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Fazenda Santa Maria - Rastreabilidade de Grãos (v15 - RxJS Manual)';

  selectedCrop = 'soja';
  simulateError = false;

  // Estados manuais de carregamento e dados
  isLoading = false;
  errorMessage: string | null = null;
  batches: GrainBatch[] = [];

  private cropSubject$ = new BehaviorSubject<{ crop: string; error: boolean }>({
    crop: 'soja',
    error: false
  });
  private sub?: Subscription;

  constructor(private siloService: SiloService) {}

  ngOnInit(): void {
    // Pipeline RxJS com switchMap para evitar race conditions e tratar loading/error manualmente
    this.sub = this.cropSubject$
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.errorMessage = null;
          this.batches = [];
        }),
        switchMap(({ crop, error }) =>
          this.siloService.fetchBatchesByCrop(crop, error).pipe(
            catchError((err: Error) => {
              this.errorMessage = err.message || 'Erro inesperado';
              return of([]);
            })
          )
        )
      )
      .subscribe((data) => {
        this.isLoading = false;
        this.batches = data;
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onCropChange(crop: string): void {
    this.selectedCrop = crop;
    this.triggerFetch();
  }

  toggleSimulateError(): void {
    this.simulateError = !this.simulateError;
    this.triggerFetch();
  }

  reload(): void {
    this.triggerFetch();
  }

  private triggerFetch(): void {
    this.cropSubject$.next({
      crop: this.selectedCrop,
      error: this.simulateError
    });
  }
}
