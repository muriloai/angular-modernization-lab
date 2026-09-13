import { Injectable } from '@angular/core';

export interface EstacaoStatus {
  id: string;
  nome: string;
  temperatura: number;
  umidade: number;
  status: 'ativa' | 'manutencao';
}

// Serviço singleton provido no injetor raiz
@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  private readonly estacoes: EstacaoStatus[] = [
    { id: 'EST-01', nome: 'Estação Meteorológica Norte', temperatura: 29.4, umidade: 62, status: 'ativa' },
    { id: 'EST-02', nome: 'Estação Setor Sul (Pivô 02)', temperatura: 33.1, umidade: 48, status: 'ativa' },
    { id: 'EST-03', nome: 'Estação Baixada Úmida', temperatura: 26.8, umidade: 81, status: 'manutencao' }
  ];

  obterEstacoes(): EstacaoStatus[] {
    return [...this.estacoes];
  }

  obterVersaoServico(): string {
    return 'TelemetryService v1.0 (Singleton via Injetor Raiz)';
  }
}
