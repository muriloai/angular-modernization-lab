import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Machine } from '../models/machine.model';

@Component({
  selector: 'app-machine-action-card',
  imports: [CommonModule],
  templateUrl: './machine-action-card.html',
  styleUrls: ['./machine-action-card.css'],
  // Configuração declarativa e moderna no objeto host, eliminando @HostBinding e @HostListener
  host: {
    'role': 'button',
    'tabindex': '0',
    '[class.is-hovered]': 'isHovered()',
    '[class.is-selected]': 'isSelected()',
    '[style.borderColor]': 'borderColor()',
    '[attr.aria-pressed]': 'isSelected()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(click)': 'toggleSelecionado()',
    '(keydown.enter)': 'toggleSelecionado()'
  }
})
export class MachineActionCard {
  readonly machine = input.required<Machine>();
  readonly statusAlternado = output<Machine>();

  readonly isHovered = signal(false);
  readonly isSelected = signal(false);

  // Estilo de borda reativo calculado por Signal
  readonly borderColor = computed(() => {
    if (this.isSelected()) return '#16a34a';
    if (this.isHovered()) return '#2563eb';
    return '#cbd5e1';
  });

  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
  }

  toggleSelecionado(): void {
    this.isSelected.update(v => !v);
    this.statusAlternado.emit(this.machine());
  }
}
