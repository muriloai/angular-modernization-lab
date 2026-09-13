import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Talhao } from './models/talhao.model';

@Component({
  selector: 'app-talhao-detail',
  templateUrl: './talhao-detail.component.html',
  styleUrls: ['./talhao-detail.component.css']
})
export class TalhaoDetailComponent implements OnInit, OnDestroy {
  id: string = '';
  safra: string = '2026';
  modo: string = 'resumido';
  talhao?: Talhao;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Extração do parâmetro de caminho :id via Observable paramMap
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.id = params.get('id') ?? '';
    });

    // 2. Extração de parâmetros de consulta (?safra e ?modo) via queryParamMap
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(qp => {
      this.safra = qp.get('safra') ?? '2026';
      this.modo = qp.get('modo') ?? 'resumido';
    });

    // 3. Extração dos dados pré-carregados pelo Resolver via Observable data
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.talhao = data['talhao'];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  voltar(): void {
    this.router.navigate(['/talhoes']);
  }
}
