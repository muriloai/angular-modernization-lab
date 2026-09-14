import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoggingService, HttpLogEntry } from '../services/logging.service';

@Component({
  selector: 'app-interceptor-demo',
  templateUrl: './interceptor-demo.component.html',
  styleUrls: ['./interceptor-demo.component.css']
})
export class InterceptorDemoComponent {
  requisicaoEmAndamento = false;
  respostaRecebida: any = null;

  constructor(
    private http: HttpClient,
    public loggingService: LoggingService
  ) {}

  dispararGetSensores(): void {
    this.requisicaoEmAndamento = true;
    this.respostaRecebida = null;

    // Dispara requisição HTTP interceptada
    this.http.get('/api/v1/telemetria/sensores?talhao=norte').subscribe({
      next: (res) => {
        this.respostaRecebida = res;
        this.requisicaoEmAndamento = false;
      },
      error: () => {
        // Fallback simulado para fins de demonstração visual no lab
        of([
          { sensor: 'FDR-01', umidade: '68%', talhao: 'Norte' },
          { sensor: 'PH-02', ph: '6.4', talhao: 'Norte' }
        ]).pipe(delay(250)).subscribe(dados => {
          this.respostaRecebida = dados;
          this.requisicaoEmAndamento = false;
        });
      }
    });
  }

  dispararPostComandoPivo(): void {
    this.requisicaoEmAndamento = true;
    this.respostaRecebida = null;

    const payload = {
      comando: 'INICIAR_IRRIGACAO',
      pivoId: 'PIVO-04',
      vazaoAlvo: '350 m3/h',
      timestamp: new Date().toISOString()
    };

    this.http.post('/api/v1/operacoes/pivo/acionar', payload).subscribe({
      next: (res) => {
        this.respostaRecebida = res;
        this.requisicaoEmAndamento = false;
      },
      error: () => {
        of({ status: 'Sucesso', acaoExecutada: 'Ciclo Noturno Iniciado', pivo: 'PIVO-04' })
          .pipe(delay(250))
          .subscribe(dados => {
            this.respostaRecebida = dados;
            this.requisicaoEmAndamento = false;
          });
      }
    });
  }

  limparHistorico(): void {
    this.loggingService.limparLogs();
    this.respostaRecebida = null;
  }
}
