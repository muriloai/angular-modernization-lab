import { Component, input, output } from '@angular/core';
import { Machinery, MachineryActionEvent } from '../models/machinery';

@Component({
  selector: 'app-machinery-card',
  templateUrl: './machinery-card.html',
  styleUrls: ['./machinery-card.css']
})
export class MachineryCard {
  // Primitiva reativa input() obrigatória
  readonly machinery = input.required<Machinery>();

  // Primitiva funcional output() declarativa
  readonly action = output<MachineryActionEvent>();

  onToggleAutonomous(): void {
    this.action.emit({
      machineryId: this.machinery().id,
      action: 'toggle-autonomous'
    });
  }

  onRequestMaintenance(): void {
    this.action.emit({
      machineryId: this.machinery().id,
      action: 'request-maintenance'
    });
  }

  onDispatch(): void {
    this.action.emit({
      machineryId: this.machinery().id,
      action: 'dispatch'
    });
  }
}
