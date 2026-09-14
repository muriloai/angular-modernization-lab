import { Component } from '@angular/core';

@Component({
  selector: 'app-multispectral-widget',
  template: `
    <div class="widget-box" [class.crashed]="hasCrashed">
      <h3>Câmera Multiespectral (NDVI)</h3>
      <p class="status-badge" [class.error]="hasCrashed">
        {{ hasCrashed ? 'Sensor Inoperante (Exceção Disparada)' : 'Sensor Operando Calibrado' }}
      </p>

      <div *ngIf="!hasCrashed" class="data-content">
        <div class="data-row">
          <span>Índice NDVI Médio:</span>
          <strong>0.78 (Vegetação Vigorosa)</strong>
        </div>
        <div class="data-row">
          <span>Banda Infravermelho:</span>
          <strong>840 nm</strong>
        </div>
        <button class="btn-crash" (click)="simulateCrash()">
          Simular Pane no Sensor Óptico
        </button>
      </div>

      <div *ngIf="hasCrashed" class="crash-notice">
        <p>A pane disparou uma exceção no componente.</p>
        <button class="btn-reset" (click)="resetWidget()">Restaurar Sensor</button>
      </div>
    </div>
  `,
  styles: [`
    .widget-box { background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; }
    .widget-box.crashed { border-color: #f87171; background: #fef2f2; }
    h3 { margin: 0 0 4px 0; color: #854d0e; }
    .status-badge { color: #16a34a; font-size: 12px; font-weight: bold; margin: 0 0 12px 0; }
    .status-badge.error { color: #dc2626; }
    .data-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
    .btn-crash { background: #dc2626; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; margin-top: 8px; font-weight: 500; font-size: 12px; }
    .btn-reset { background: #4b5563; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .crash-notice { color: #991b1b; font-size: 13px; }
  `]
})
export class MultispectralWidgetComponent {
  hasCrashed = false;

  simulateCrash(): void {
    this.hasCrashed = true;
    throw new Error('Falha crítica de comunicação no barramento I2C do sensor multiespectral');
  }

  resetWidget(): void {
    this.hasCrashed = false;
  }
}
