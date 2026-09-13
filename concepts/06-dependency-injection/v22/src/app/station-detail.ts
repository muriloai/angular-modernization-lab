import { Component, inject } from '@angular/core';
import { ESTACAO_CONFIG } from './tokens/api-config.token';
import { TelemetryService } from './services/telemetry.service';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.html',
  styleUrl: './station-detail.css',
  // Element Injector: redefine o token apenas para a sua árvore local
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
export class StationDetail {
  // No Angular 22, a função utilitária inject() substitui completamente o construtor
  readonly config = inject(ESTACAO_CONFIG);
  readonly telemetryService = inject(TelemetryService);
}
