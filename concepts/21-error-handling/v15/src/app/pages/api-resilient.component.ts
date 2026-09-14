import { Component, OnInit } from '@angular/core';
import { of, timer } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { SilosApiService, SiloTelemetry } from '../services/silos-api.service';
import { AgroErrorHandler } from '../services/error-handler.service';

@Component({
  selector: 'app-api-resilient',
  templateUrl: './api-resilient.component.html',
  styleUrls: ['./api-resilient.component.css']
})
export class ApiResilientComponent implements OnInit {
  silos: SiloTelemetry[] = [];
  isLoading = false;
  isModoContingencia = false;
  errorMessage: string | null = null;
  tentativasContador = 0;
  tempoUltimaSincronizacao = '';

  constructor(
    public silosService: SilosApiService,
    public errorHandler: AgroErrorHandler
  ) {}

  ngOnInit(): void {
    this.executarCarregamentoPadrao();
  }

  // Cenário 1: Conexão normal sem falhas
  executarCarregamentoPadrao(): void {
    this.silosService.configurarFalhasTemporarias(0);
    this.buscarComRetry();
  }

  // Cenário 2: Falha transitória (2 erros e recuperação na 3ª tentativa)
  simularFalhaTransitoria(): void {
    this.silosService.configurarFalhasTemporarias(2);
    this.buscarComRetry();
  }

  // Cenário 3: Falha persistente (4 erros, esgota as 3 tentativas e cai em contingência)
  simularFalhaPersistente(): void {
    this.silosService.configurarFalhasTemporarias(4);
    this.buscarComRetry();
  }

  // Forçar uma exceção não tratada para testar o AgroErrorHandler global
  forcarErroNaoTratado(): void {
    throw new Error('Falha crítica de barramento: Disjuntor térmico do Silo 01 desarmado.');
  }

  private buscarComRetry(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.isModoContingencia = false;
    this.tentativasContador = 0;

    this.silosService.getSilosTelemetry().pipe(
      // Política de repetição: tenta até 3 vezes com intervalo de 600ms
      retry({
        count: 3,
        delay: (err, retryCount) => {
          this.tentativasContador = retryCount;
          return timer(600);
        }
      }),
      // Captura do erro após esgotar todas as tentativas
      catchError((err) => {
        this.errorMessage = 'Rede telemétrica inacessível após 3 tentativas de reconexão.';
        this.isModoContingencia = true;
        this.errorHandler.handleError(err);
        // Retorna dados em cache de contingência
        return of(this.silosService.obterDadosOffline());
      })
    ).subscribe({
      next: (dados) => {
        this.silos = dados;
        this.isLoading = false;
        this.tempoUltimaSincronizacao = new Date().toLocaleTimeString('pt-BR');
      }
    });
  }
}
