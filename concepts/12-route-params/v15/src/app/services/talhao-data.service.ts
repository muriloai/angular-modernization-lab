import { Injectable } from '@angular/core';
import { Talhao } from '../models/talhao.model';

@Injectable({ providedIn: 'root' })
export class TalhaoDataService {
  private readonly talhoes: Talhao[] = [
    {
      id: 'TAL-101',
      nome: 'Talhão Norte 01 - Soja Precoce',
      cultura: 'Soja M-6410 IPRO',
      areaHectares: 120,
      tipoSolo: 'Latossolo Vermelho Eutrófico',
      umidadeMedia: 34.2,
      statusIrrigacao: 'ativa',
      historicoIntervencao: 'Aplicação de micronutrientes foliares há 4 dias'
    },
    {
      id: 'TAL-102',
      nome: 'Talhão Sul 02 - Milho Segunda Safra',
      cultura: 'Milho Híbrido P3889',
      areaHectares: 95,
      tipoSolo: 'Argissolo Vermelho-Amarelo',
      umidadeMedia: 28.6,
      statusIrrigacao: 'programada',
      historicoIntervencao: 'Adubação nitrogenada em cobertura realizada'
    },
    {
      id: 'TAL-103',
      nome: 'Talhão Leste 03 - Algodão Fibra Longa',
      cultura: 'Algodoeiro BRS 368',
      areaHectares: 150,
      tipoSolo: 'Latossolo Roxo Argiloso',
      umidadeMedia: 31.0,
      statusIrrigacao: 'desligada',
      historicoIntervencao: 'Monitoramento de bicudo do algodoeiro sem detecção'
    }
  ];

  obterTalhoes(): Talhao[] {
    return this.talhoes;
  }

  obterPorId(id: string): Talhao | undefined {
    return this.talhoes.find(t => t.id === id);
  }
}
