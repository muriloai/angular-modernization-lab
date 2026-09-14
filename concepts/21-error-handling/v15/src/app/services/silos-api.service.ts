import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface SiloTelemetry {
  id: string;
  identificacao: string;
  graoArmazenado: string;
  capacidadeToneladas: number;
  ocupacaoAtual: number;
  temperaturaMedia: string;
  umidadeGraos: string;
  aeracaoAtiva: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SilosApiService {
  private contadorTentativas = 0;
  private falhasParaProduzir = 0;

  // Dados reais dos silos da Fazenda Santa Maria
  private dadosOnline: SiloTelemetry[] = [
    {
      id: 'SILO-01',
      identificacao: 'Silo Pulmão Principal',
      graoArmazenado: 'Soja em Grãos',
      capacidadeToneladas: 5000,
      ocupacaoAtual: 4250,
      temperaturaMedia: '24.2°C',
      umidadeGraos: '13.1%',
      aeracaoAtiva: true
    },
    {
      id: 'SILO-02',
      identificacao: 'Silo Secador Secundário',
      graoArmazenado: 'Milho Safrinha',
      capacidadeToneladas: 3500,
      ocupacaoAtual: 2800,
      temperaturaMedia: '27.8°C',
      umidadeGraos: '14.0%',
      aeracaoAtiva: true
    },
    {
      id: 'SILO-03',
      identificacao: 'Silo de Expedição Rápida',
      graoArmazenado: 'Farelo de Soja',
      capacidadeToneladas: 1500,
      ocupacaoAtual: 890,
      temperaturaMedia: '22.5°C',
      umidadeGraos: '11.8%',
      aeracaoAtiva: false
    }
  ];

  // Dados em cache de contingência caso a conexão seja irrecuperável
  private dadosCacheOffline: SiloTelemetry[] = [
    {
      id: 'SILO-01',
      identificacao: 'Silo Pulmão Principal (Cache Offline)',
      graoArmazenado: 'Soja em Grãos',
      capacidadeToneladas: 5000,
      ocupacaoAtual: 4200,
      temperaturaMedia: '24.0°C',
      umidadeGraos: '13.2%',
      aeracaoAtiva: true
    },
    {
      id: 'SILO-02',
      identificacao: 'Silo Secador Secundário (Cache Offline)',
      graoArmazenado: 'Milho Safrinha',
      capacidadeToneladas: 3500,
      ocupacaoAtual: 2750,
      temperaturaMedia: '28.1°C',
      umidadeGraos: '14.2%',
      aeracaoAtiva: true
    }
  ];

  configurarFalhasTemporarias(quantidadeFalhas: number): void {
    this.falhasParaProduzir = quantidadeFalhas;
    this.contadorTentativas = 0;
  }

  getContadorTentativas(): number {
    return this.contadorTentativas;
  }

  // Simula requisição com falhas temporárias recuperáveis ou definitivas
  getSilosTelemetry(): Observable<SiloTelemetry[]> {
    this.contadorTentativas++;

    if (this.falhasParaProduzir > 0) {
      this.falhasParaProduzir--;
      return throwError(() => new Error(`Falha HTTP 503: Conexão instável na antena do silo. Tentativa: ${this.contadorTentativas}`)).pipe(
        delay(400)
      );
    }

    return of([...this.dadosOnline]).pipe(delay(400));
  }

  obterDadosOffline(): SiloTelemetry[] {
    return [...this.dadosCacheOffline];
  }
}
