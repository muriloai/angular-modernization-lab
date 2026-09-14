import { Component, signal } from '@angular/core';
import { IrrigationPivot } from './models/pivot.model';
import { PivotPanel } from './components/pivot-panel';

@Component({
  selector: 'app-root',
  imports: [PivotPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('Fazenda Santa Maria - Irrigação e Pivôs Centrais (v22)');

  readonly pivots = signal<IrrigationPivot[]>([
    { id: 'PIV-01', name: 'Pivô Central 01', field: 'Talhão Soja Norte', pressureBar: 2.8, flowRateM3h: 180, isActive: true, angleDegrees: 135 },
    { id: 'PIV-02', name: 'Pivô Central 02', field: 'Talhão Milho Sul', pressureBar: 2.2, flowRateM3h: 150, isActive: false, angleDegrees: 45 },
    { id: 'PIV-03', name: 'Pivô Central 03', field: 'Talhão Trigo Leste', pressureBar: 3.1, flowRateM3h: 210, isActive: true, angleDegrees: 280 }
  ]);

  onPressureChange(event: { id: string; delta: number }): void {
    this.pivots.update(list =>
      list.map(p => {
        if (p.id === event.id) {
          const next = Math.max(1.0, Math.min(5.0, Number((p.pressureBar + event.delta).toFixed(1))));
          return { ...p, pressureBar: next };
        }
        return p;
      })
    );
  }

  onTogglePower(id: string): void {
    this.pivots.update(list =>
      list.map(p => {
        if (p.id === id) {
          return { ...p, isActive: !p.isActive };
        }
        return p;
      })
    );
  }
}
