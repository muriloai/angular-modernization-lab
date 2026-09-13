import { Component, Inject } from '@angular/core';
import { ESTACAO_CONFIG, EstacaoConfig } from './tokens/api-config.token';
import { TelemetryService } from './services/telemetry.service';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css'],
  // Element Injector: este componente redefine o token apenas para a sua árvore local
  providers: [
    {
      provide: ESTACAO_CONFIG,
      useValue: {
        estacaoId: 'EST-TALHAO-SUL-02',
        talhao: 'Talhão Sul (Pivô 02)',
        frequenciaSegundos: 15,
        servidorUrl: 'https://telemetria-sul.fazendasantamaria.com.br/api',
        origemInjetor: 'Injetor do Elemento (Element Injector Local)'
      }
    }
  ]
})
export class StationDetailComponent {
  // No Angular 15, tokens de injeção exigem o decorator @Inject no construtor
  constructor(
    @Inject(ESTACAO_CONFIG) public config: EstacaoConfig,
    public telemetryService: TelemetryService
  ) {}
}
