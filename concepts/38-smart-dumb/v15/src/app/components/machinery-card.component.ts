import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Machinery, MachineryActionEvent } from '../models/machinery.model';

@Component({
  selector: 'app-machinery-card',
  templateUrl: './machinery-card.component.html',
  styleUrls: ['./machinery-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MachineryCardComponent {
  @Input() machinery!: Machinery;
  @Output() action = new EventEmitter<MachineryActionEvent>();

  onToggleAutonomous(): void {
    this.action.emit({
      machineryId: this.machinery.id,
      action: 'toggle-autonomous'
    });
  }

  onRequestMaintenance(): void {
    this.action.emit({
      machineryId: this.machinery.id,
      action: 'request-maintenance'
    });
  }

  onDispatch(): void {
    this.action.emit({
      machineryId: this.machinery.id,
      action: 'dispatch'
    });
  }
}
