import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-termohigrometro-widget',
  template: `
    <div class="widget-box widget-temp">
      <div class="widget-badge">Microclima e Dossel</div>
      <h4 class="widget-title">Temperatura e Umidade Relativa</h4>
      <div class="widget-value">{{ valorPrincipal }}</div>
      <span class="widget-location">Estação: {{ localizacao }}</span>
      <p class="widget-desc">Parâmetros estáveis para desenvolvimento vegetativo sem estresse térmico.</p>
    </div>
  `,
  styles: [`
    .widget-box { padding: 16px; border-radius: 8px; border: 1px solid #bbf7d0; background-color: #f0fdf4; }
    .widget-badge { font-size: 0.75rem; font-weight: 700; color: #15803d; text-transform: uppercase; }
    .widget-title { margin: 4px 0 8px 0; font-size: 1.1rem; color: #14532d; }
    .widget-value { font-size: 1.8rem; font-weight: 800; color: #16a34a; }
    .widget-location { font-size: 0.8rem; color: #64748b; }
    .widget-desc { margin: 8px 0 0 0; font-size: 0.85rem; color: #334155; }
  `]
})
export class TermohigrometroWidgetComponent {
  @Input() localizacao = 'Talhão 08 - Baixada Úmida';
  @Input() valorPrincipal = '28.4°C / 64%';
}
