import { Directive, input, signal } from '@angular/core';

@Directive({
  selector: '[appSensorAlert]',
  // No Angular 22, a propriedade declarativa host substitui @HostBinding e @HostListener
  host: {
    '[class.alerta-hover]': 'isHovered()',
    '[class.sensor-card-host]': 'true',
    '[style.borderLeftColor]': 'bordaCor()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class SensorAlertDirective {
  // Entrada baseada em Signal
  readonly nivelAlerta = input<'baixo' | 'medio' | 'critico'>('baixo');

  readonly isHovered = signal(false);

  bordaCor(): string {
    switch (this.nivelAlerta()) {
      case 'critico': return '#dc2626';
      case 'medio': return '#f59e0b';
      default: return '#16a34a';
    }
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
  }
}
