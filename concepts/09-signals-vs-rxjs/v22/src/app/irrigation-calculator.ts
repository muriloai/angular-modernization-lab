import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-irrigation-calculator',
  imports: [DecimalPipe, CurrencyPipe],
  templateUrl: './irrigation-calculator.html',
  styleUrl: './irrigation-calculator.css'
})
export class IrrigationCalculator {
  // Sinais de estado de entrada (Signals primitivos)
  readonly cultura = signal<'soja' | 'milho' | 'algodao'>('soja');
  readonly areaHectares = signal<number>(50);
  readonly tarifaKwh = signal<number>(0.72);

  // linkedSignal: sincroniza o valor padrão quando a cultura de origem é alterada,
  // mas permite que o usuário sobrescreva o valor manualmente a qualquer momento
  readonly laminaMm = linkedSignal({
    source: this.cultura,
    computation: c => this.obterLaminaRecomendada(c)
  });

  // Cálculos derivados síncronos e memoizados com computed()
  readonly volumeM3 = computed(() => this.areaHectares() * this.laminaMm() * 10);
  readonly horasOperacao = computed(() => Number((this.volumeM3() / 180).toFixed(1)));
  readonly consumoKwh = computed(() => Number((this.horasOperacao() * 75).toFixed(1)));
  readonly custoTotal = computed(() => Number((this.consumoKwh() * this.tarifaKwh()).toFixed(2)));
  readonly alertaConsumo = computed(() => this.custoTotal() > 3000);

  constructor() {
    // Efeito colateral declarativo e seguro gerenciado pelo framework
    effect(() => {
      if (this.alertaConsumo()) {
        console.warn(`[Alerta de Irrigação] Custo projetado elevado: R$ ${this.custoTotal().toFixed(2)} para cultura ${this.cultura()}`);
      }
    });
  }

  selecionarCultura(cultura: 'soja' | 'milho' | 'algodao'): void {
    this.cultura.set(cultura);
  }

  alterarArea(area: number): void {
    if (area >= 5) {
      this.areaHectares.set(area);
    }
  }

  alterarLamina(lamina: number): void {
    if (lamina >= 1) {
      this.laminaMm.set(lamina);
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
