import { Component, signal, output } from '@angular/core';

@Component({
  selector: 'app-multispectral-widget',
  template: `
    <div class="widget-box">
      <h3>Câmera Multiespectral (NDVI)</h3>
      <p class="status-badge">Sensor Calibrado</p>
      <div class="data-row">
        <span>Índice NDVI Médio:</span>
        <strong>{{ ndvi() }} (Vegetação Vigorosa)</strong>
      </div>
      <div class="data-row">
        <span>Banda Infravermelho:</span>
        <strong>{{ irBand() }} nm</strong>
      </div>
      <button class="btn-crash" (click)="simulateCrash()">
        Simular Pane de Hardware no Sensor
      </button>
    </div>
  `,
  styles: [`
    .widget-box { background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; height: 100%; }
    h3 { margin: 0 0 4px 0; color: #854d0e; }
    .status-badge { color: #16a34a; font-size: 12px; font-weight: bold; margin: 0 0 12px 0; }
    .data-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
    .btn-crash { background: #dc2626; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-top: 10px; font-weight: 500; font-size: 12px; width: 100%; }
    .btn-crash:hover { background: #b91c1c; }
  `]
})
export class MultispectralWidget {
  readonly ndvi = signal(0.78);
  readonly irBand = signal(840);

  readonly errorTriggered = output<string>();

  simulateCrash(): void {
    this.errorTriggered.emit('Falha crítica de comunicação no barramento I2C do sensor multiespectral');
  }
}
