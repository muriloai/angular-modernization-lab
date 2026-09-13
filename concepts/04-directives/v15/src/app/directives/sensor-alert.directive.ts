import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSensorAlert]'
})
export class SensorAlertDirective {
  // Nível de severidade do sensor recebido via propriedade de entrada
  @Input() nivelAlerta: 'baixo' | 'medio' | 'critico' = 'baixo';

  // No Angular 15, o decorator @HostBinding vincula classes e estilos ao elemento hospedeiro
  @HostBinding('class.alerta-hover') isHovered = false;
  @HostBinding('class.sensor-card-host') hostClass = true;

  @HostBinding('style.borderLeftColor')
  get borderLeftColor(): string {
    switch (this.nivelAlerta) {
      case 'critico': return '#dc2626';
      case 'medio': return '#f59e0b';
      default: return '#16a34a';
    }
  }

  // O decorator @HostListener escuta eventos disparados pelo elemento hospedeiro
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovered = false;
  }
}
