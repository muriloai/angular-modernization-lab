import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-interceptor-demo',
  imports: [JsonPipe],
  templateUrl: './interceptor-demo.html',
  styleUrls: ['./interceptor-demo.css']
})
export class InterceptorDemo {
  private readonly http = inject(HttpClient);
  readonly loggingService = inject(LoggingService);

  readonly requisicaoEmAndamento = signal(false);
  readonly respostaRecebida = signal<any>(null);

  dispararGetSensores(): void {
    this.requisicaoEmAndamento.set(true);
    this.respostaRecebida.set(null);

    this.http.get('/api/v1/telemetria/sensores?talhao=norte').subscribe({
      next: (res) => {
        this.respostaRecebida.set(res);
        this.requisicaoEmAndamento.set(false);
      },
      error: () => {
        // Fallback simulado para fins de demonstração visual no lab
        of([
          { sensor: 'FDR-01', umidade: '68%', talhao: 'Norte' },
          { sensor: 'PH-02', ph: '6.4', talhao: 'Norte' }
        ]).pipe(delay(250)).subscribe(dados => {
          this.respostaRecebida.set(dados);
          this.requisicaoEmAndamento.set(false);
        });
      }
    });
  }

  dispararPostComandoPivo(): void {
    this.requisicaoEmAndamento.set(true);
    this.respostaRecebida.set(null);

    const payload = {
      comando: 'INICIAR_IRRIGACAO',
      pivoId: 'PIVO-04',
      vazaoAlvo: '350 m3/h',
      timestamp: new Date().toISOString()
    };

    this.http.post('/api/v1/operacoes/pivo/acionar', payload).subscribe({
      next: (res) => {
        this.respostaRecebida.set(res);
        this.requisicaoEmAndamento.set(false);
      },
      error: () => {
        of({ status: 'Sucesso', acaoExecutada: 'Ciclo Noturno Iniciado', pivo: 'PIVO-04' })
          .pipe(delay(250))
          .subscribe(dados => {
            this.respostaRecebida.set(dados);
            this.requisicaoEmAndamento.set(false);
          });
      }
    });
  }

  limparHistorico(): void {
    this.loggingService.limparLogs();
    this.respostaRecebida.set(null);
  }
}
