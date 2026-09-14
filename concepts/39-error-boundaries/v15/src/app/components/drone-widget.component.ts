import { Component } from '@angular/core';

@Component({
  selector: 'app-drone-widget',
  template: `
    <div class="widget-box">
      <h3>Drones de Monitoramento</h3>
      <p class="status-online">Em Voo de Mapeamento</p>
      <div class="data-row">
        <span>Altitude:</span>
        <strong>120 m</strong>
      </div>
      <div class="data-row">
        <span>Bateria Drone 02:</span>
        <strong>74 %</strong>
      </div>
      <div class="data-row">
        <span>Área Coberta:</span>
        <strong>340 ha</strong>
      </div>
    </div>
  `,
  styles: [`
    .widget-box { background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; }
    h3 { margin: 0 0 4px 0; color: #1e40af; }
    .status-online { color: #2563eb; font-size: 12px; font-weight: bold; margin: 0 0 12px 0; }
    .data-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
  `]
})
export class DroneWidgetComponent {}
