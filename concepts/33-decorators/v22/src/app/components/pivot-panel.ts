import { Component, ElementRef, inject, input, output, signal, viewChild, DecimalPipe } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IrrigationPivot } from '../models/pivot.model';

@Component({
  selector: 'app-pivot-panel',
  imports: [DecimalPipe],
  templateUrl: './pivot-panel.html',
  styleUrl: './pivot-panel.css',
  host: {
    'class': 'pivot-card',
    '[class.pivot-online]': 'pivot().isActive',
    '[attr.aria-label]': '"Painel do " + pivot().name',
    '(mouseenter)': 'isHovered.set(true)',
    '(mouseleave)': 'isHovered.set(false)'
  }
})
export class PivotPanel {
  private readonly document = inject(DOCUMENT);

  readonly pivot = input.required<IrrigationPivot>();
  readonly pressureChanged = output<{ id: string; delta: number }>();
  readonly statusToggled = output<string>();

  readonly pressureIndicator = viewChild<ElementRef>('pressureIndicator');
  readonly isHovered = signal(false);

  adjustPressure(delta: number): void {
    this.pressureChanged.emit({ id: this.pivot().id, delta });
  }

  togglePower(): void {
    this.statusToggled.emit(this.pivot().id);
  }
}
