import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-anemometro-widget',
  template: `
    <div class="widget-box widget-wind">
      <div class="widget-badge">Segurança Operacional</div>
      <h4 class="widget-title">Velocidade e Rajadas de Vento</h4>
      <div class="widget-value">{{ valorPrincipal }}</div>
      <span class="widget-location">Estação: {{ localizacao }}</span>
      <p class="widget-desc">Condições favoráveis para pulverização de defensivos com deriva controlada.</p>
    </div>
  `,
  styles: [`
    .widget-box { padding: 16px; border-radius: 8px; border: 1px solid #fed7aa; background-color: #fff7ed; }
    .widget-badge { font-size: 0.75rem; font-weight: 700; color: #c2410c; text-transform: uppercase; }
    .widget-title { margin: 4px 0 8px 0; font-size: 1.1rem; color: #7c2d12; }
    .widget-value { font-size: 1.8rem; font-weight: 800; color: #ea580c; }
    .widget-location { font-size: 0.8rem; color: #64748b; }
    .widget-desc { margin: 8px 0 0 0; font-size: 0.85rem; color: #334155; }
  `]
})
export class AnemometroWidgetComponent {
  @Input() localizacao = 'Pista de Operação de Drones';
  @Input() valorPrincipal = '12.6 km/h (Sudeste)';
}
