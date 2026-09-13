import { InjectionToken } from '@angular/core';

export interface EstacaoConfig {
  estacaoId: string;
  talhao: string;
  frequenciaSegundos: number;
  servidorUrl: string;
  origemInjetor: string;
}

// Token de injeção tipado para parâmetros de telemetria
export const ESTACAO_CONFIG = new InjectionToken<EstacaoConfig>('ESTACAO_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    estacaoId: 'EST-PADRAO-00',
    talhao: 'Sede Administrativa (Central)',
    frequenciaSegundos: 60,
    servidorUrl: 'https://telemetria.fazendasantamaria.com.br/api',
    origemInjetor: 'Injetor Raiz (Root Injector / Padrão Global)'
  })
});
