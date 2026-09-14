import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  template: `
    <div class="widget-box">
      <h3>Estação Agrometeorológica</h3>
      <p class="status-online">Conexão Estável (Zoneless)</p>
      <div class="data-row">
        <span>Temperatura Atual:</span>
        <strong>{{ temperature() }} °C</strong>
      </div>
      <div class="data-row">
        <span>Radiação Solar:</span>
        <strong>{{ solarRadiation() }} W/m²</strong>
      </div>
      <div class="data-row">
        <span>Umidade Relativa:</span>
        <strong>{{ humidity() }} %</strong>
      </div>
    </div>
  `,
  styles: [`
    .widget-box { background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; height: 100%; }
    h3 { margin: 0 0 4px 0; color: #0f766e; }
    .status-online { color: #16a34a; font-size: 12px; font-weight: bold; margin: 0 0 12px 0; }
    .data-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
  `]
})
export class WeatherWidget {
  readonly temperature = signal(27.4);
  readonly solarRadiation = signal(890);
  readonly humidity = signal(62);
}
