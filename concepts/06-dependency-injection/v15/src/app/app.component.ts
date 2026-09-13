import { Component, Inject } from '@angular/core';
import { ESTACAO_CONFIG, EstacaoConfig } from './tokens/api-config.token';
import { TelemetryService, EstacaoStatus } from './services/telemetry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  estacoes: EstacaoStatus[] = [];

  // Injeção de dependência clássica do Angular 15:
  // Todos os serviços e tokens são declarados como parâmetros no construtor
  constructor(
    @Inject(ESTACAO_CONFIG) public rootConfig: EstacaoConfig,
    public telemetryService: TelemetryService
  ) {
    this.estacoes = this.telemetryService.obterEstacoes();
  }
}
