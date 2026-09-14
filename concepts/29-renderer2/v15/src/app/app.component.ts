import { Component } from '@angular/core';
import { SiloData } from './models/silo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fazenda Santa Maria - Monitoramento de Silos (v15)';

  silos: SiloData[] = [
    { id: 'SILO-01', name: 'Silo Pulmao Norte', grain: 'Soja', capacityTonnes: 1000, currentTonnes: 450, temperatureC: 22 },
    { id: 'SILO-02', name: 'Silo Estocagem Sul', grain: 'Milho', capacityTonnes: 1500, currentTonnes: 1100, temperatureC: 28 },
    { id: 'SILO-03', name: 'Silo Secador Central', grain: 'Soja', capacityTonnes: 800, currentTonnes: 760, temperatureC: 34 }
  ];

  adjustSilo(id: string, amountTonnes: number): void {
    this.silos = this.silos.map(silo => {
      if (silo.id === id) {
        const next = Math.max(0, Math.min(silo.capacityTonnes, silo.currentTonnes + amountTonnes));
        return { ...silo, currentTonnes: next };
      }
      return silo;
    });
  }

  toggleTemp(id: string): void {
    this.silos = this.silos.map(silo => {
      if (silo.id === id) {
        const temp = silo.temperatureC > 30 ? 24 : 35;
        return { ...silo, temperatureC: temp };
      }
      return silo;
    });
  }
}
