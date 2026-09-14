import { Component, signal, inject } from '@angular/core';
import { FleetManager } from './services/fleet-manager';
import { MachineryCard } from './components/machinery-card';
import { MachineryActionEvent } from './models/machinery';

@Component({
  selector: 'app-root',
  imports: [MachineryCard],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private fleetManager = inject(FleetManager);

  title = signal('Fazenda Santa Maria - Gestão da Frota de Maquinários (v22 - Smart/Dumb Moderno)');

  // Exposição direta dos Signals do Container/Service
  readonly fleet = this.fleetManager.fleet;
  readonly activeCount = this.fleetManager.activeCount;
  readonly autonomousCount = this.fleetManager.autonomousCount;

  onMachineryAction(event: MachineryActionEvent): void {
    this.fleetManager.handleAction(event);
  }
}
