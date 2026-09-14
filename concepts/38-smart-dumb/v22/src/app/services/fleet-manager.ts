import { Injectable, signal, computed } from '@angular/core';
import { Machinery, MachineryActionEvent } from '../models/machinery';

@Injectable({
  providedIn: 'root'
})
export class FleetManager {
  private initialFleet: Machinery[] = [
    {
      id: 'TR-01',
      code: 'TR-7230-A',
      name: 'Trator Magnum 340',
      type: 'Trator',
      fuelLevel: 82,
      engineHours: 1420,
      oilPressureBar: 4.2,
      isAutonomous: true,
      status: 'Em Operação'
    },
    {
      id: 'CH-01',
      code: 'CH-9250-B',
      name: 'Colheitadeira Axial-Flow',
      type: 'Colheitadeira',
      fuelLevel: 45,
      engineHours: 2310,
      oilPressureBar: 3.8,
      isAutonomous: false,
      status: 'Em Operação'
    },
    {
      id: 'PV-01',
      code: 'PV-Patriot-C',
      name: 'Pulverizador Patriot 350',
      type: 'Pulverizador',
      fuelLevel: 15,
      engineHours: 890,
      oilPressureBar: 2.1,
      isAutonomous: false,
      status: 'Em Manutenção'
    }
  ];

  // Estado reativo da frota com Signals
  readonly fleet = signal<Machinery[]>(this.initialFleet);

  // Derivações reativas computadas
  readonly activeCount = computed(() =>
    this.fleet().filter(m => m.status === 'Em Operação').length
  );

  readonly autonomousCount = computed(() =>
    this.fleet().filter(m => m.isAutonomous).length
  );

  handleAction(event: MachineryActionEvent): void {
    this.fleet.update(list =>
      list.map(item => {
        if (item.id !== event.machineryId) return item;

        switch (event.action) {
          case 'toggle-autonomous':
            return { ...item, isAutonomous: !item.isAutonomous };
          case 'request-maintenance':
            return { ...item, status: 'Em Manutenção' as const, isAutonomous: false };
          case 'dispatch':
            return { ...item, status: 'Em Operação' as const };
          default:
            return item;
        }
      })
    );
  }
}
