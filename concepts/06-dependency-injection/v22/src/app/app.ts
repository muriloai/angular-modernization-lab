import { Component, inject } from '@angular/core';
import { ESTACAO_CONFIG } from './tokens/api-config.token';
import { TelemetryService } from './services/telemetry.service';
import { StationDetail } from './station-detail';

@Component({
  selector: 'app-root',
  imports: [StationDetail],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Injeção moderna e direta com a função utilitária inject()
  // Não requer construtor nem repasse de parâmetros em caso de herança
  readonly rootConfig = inject(ESTACAO_CONFIG);
  readonly telemetryService = inject(TelemetryService);

  readonly estacoes = this.telemetryService.obterEstacoes();
}
