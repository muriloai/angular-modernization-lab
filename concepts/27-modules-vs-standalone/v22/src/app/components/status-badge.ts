import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css'
})
export class StatusBadge {
  readonly status = input<'planejado' | 'em_andamento' | 'concluido'>('planejado');

  readonly label = computed(() => {
    switch (this.status()) {
      case 'planejado': return 'Planejado';
      case 'em_andamento': return 'Em Andamento';
      case 'concluido': return 'Concluido';
      default: return this.status();
    }
  });
}
