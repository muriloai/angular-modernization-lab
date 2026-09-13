import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CalculoIrrigacao {
  cultura: 'soja' | 'milho' | 'algodao';
  area: number;
  lamina: number;
  tarifa: number;
  volumeM3: number;
  horasOperacao: number;
  consumoKwh: number;
  custoTotal: number;
  alertaConsumo: boolean;
}

@Component({
  selector: 'app-irrigation-calculator',
  templateUrl: './irrigation-calculator.component.html',
  styleUrls: ['./irrigation-calculator.component.css']
})
export class IrrigationCalculatorComponent {
  // Streams RxJS que armazenam o estado reativo clássico
  readonly cultura$ = new BehaviorSubject<'soja' | 'milho' | 'algodao'>('soja');
  readonly areaHectares$ = new BehaviorSubject<number>(50);
  readonly laminaMm$ = new BehaviorSubject<number>(8);
  readonly tarifaKwh$ = new BehaviorSubject<number>(0.72);

  // Composição de cálculos derivados com combineLatest e pipe(map)
  readonly dadosCalculados$: Observable<CalculoIrrigacao> = combineLatest([
    this.cultura$,
    this.areaHectares$,
    this.laminaMm$,
    this.tarifaKwh$
  ]).pipe(
    map(([cultura, area, lamina, tarifa]) => {
      const volumeM3 = area * lamina * 10;
      const horasOperacao = Number((volumeM3 / 180).toFixed(1));
      const consumoKwh = Number((horasOperacao * 75).toFixed(1));
      const custoTotal = Number((consumoKwh * tarifa).toFixed(2));
      const alertaConsumo = custoTotal > 3000;

      return {
        cultura,
        area,
        lamina,
        tarifa,
        volumeM3,
        horasOperacao,
        consumoKwh,
        custoTotal,
        alertaConsumo
      };
    })
  );

  selecionarCultura(cultura: 'soja' | 'milho' | 'algodao'): void {
    this.cultura$.next(cultura);
    // Efeito colateral manual para redefinir o valor recomendado da lâmina
    this.laminaMm$.next(this.obterLaminaRecomendada(cultura));
  }

  alterarArea(area: number): void {
    if (area >= 5) {
      this.areaHectares$.next(area);
    }
  }

  alterarLamina(lamina: number): void {
    if (lamina >= 1) {
      this.laminaMm$.next(lamina);
    }
  }

  private obterLaminaRecomendada(cultura: string): number {
    switch (cultura) {
      case 'milho': return 12;
      case 'algodao': return 10;
      case 'soja':
      default:
        return 8;
    }
  }
}
