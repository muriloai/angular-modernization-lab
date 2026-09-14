import { Component, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SilosApiService } from '../services/silos-api.service';
import { AgroErrorHandler } from '../services/error-handler.service';

@Component({
  selector: 'app-api-resilient',
  imports: [CommonModule],
  templateUrl: './api-resilient.html',
  styleUrls: ['./api-resilient.css']
})
export class ApiResilient {
  readonly silosService = inject(SilosApiService);
  readonly errorHandler = inject(AgroErrorHandler);

  readonly isModoContingencia = signal(false);
  readonly tempoUltimaSincronizacao = signal('');

  // Primitiva Resource API nativa do Angular 22 com signals e zoneless
  readonly silosResource = resource({
    loader: async () => {
      try {
        const dados = await this.silosService.carregarSilosAsync(3);
        this.isModoContingencia.set(false);
        this.tempoUltimaSincronizacao.set(new Date().toLocaleTimeString('pt-BR'));
        return dados;
      } catch (err) {
        this.isModoContingencia.set(true);
        this.errorHandler.handleError(err);
        return this.silosService.obterDadosOffline();
      }
    }
  });

  executarCarregamentoPadrao(): void {
    this.silosService.configurarFalhasTemporarias(0);
    this.silosResource.reload();
  }

  simularFalhaTransitoria(): void {
    this.silosService.configurarFalhasTemporarias(2);
    this.silosResource.reload();
  }

  simularFalhaPersistente(): void {
    this.silosService.configurarFalhasTemporarias(4);
    this.silosResource.reload();
  }

  forcarErroNaoTratado(): void {
    throw new Error('Falha crítica de barramento: Disjuntor térmico do Silo 01 desarmado.');
  }
}
