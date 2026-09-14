import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.css']
})
export class StatusBadgeComponent {
  @Input() status: 'planejado' | 'em_andamento' | 'concluido' = 'planejado';

  get label(): string {
    switch (this.status) {
      case 'planejado': return 'Planejado';
      case 'em_andamento': return 'Em Andamento';
      case 'concluido': return 'Concluido';
      default: return this.status;
    }
  }
}
