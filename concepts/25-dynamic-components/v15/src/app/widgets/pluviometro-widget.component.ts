import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pluviometro-widget',
  template: `
    <div class="widget-box widget-rain">
      <div class="widget-badge">Pluviometria Digital</div>
      <h4 class="widget-title">Índice de Precipitação Acumulada</h4>
      <div class="widget-value">{{ valorPrincipal }}</div>
      <span class="widget-location">Estação: {{ localizacao }}</span>
      <p class="widget-desc">Volume pluviométrico ideal para germinação da soja nas últimas 24h.</p>
    </div>
  `,
  styles: [`
    .widget-box { padding: 16px; border-radius: 8px; border: 1px solid #bfdbfe; background-color: #eff6ff; }
    .widget-badge { font-size: 0.75rem; font-weight: 700; color: #1d4ed8; text-transform: uppercase; }
    .widget-title { margin: 4px 0 8px 0; font-size: 1.1rem; color: #1e3a8a; }
    .widget-value { font-size: 1.8rem; font-weight: 800; color: #2563eb; }
    .widget-location { font-size: 0.8rem; color: #64748b; }
    .widget-desc { margin: 8px 0 0 0; font-size: 0.85rem; color: #334155; }
  `]
})
export class PluviometroWidgetComponent {
  @Input() localizacao = 'Talhão 04 - Pivô Central';
  @Input() valorPrincipal = '42.5 mm';
}
