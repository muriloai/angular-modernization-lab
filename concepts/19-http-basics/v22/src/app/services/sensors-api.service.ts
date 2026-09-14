import { Injectable, signal } from '@angular/core';

export interface AgroSensor {
  id: string;
  nome: string;
  tipo: string;
  talhao: string;
  valorLeitura: string;
  bateria: number;
  status: 'Operacional' | 'Calibração' | 'Alerta';
}

@Injectable({
  providedIn: 'root'
})
export class SensorsApiService {
  // Base simulada de sensores de telemetria da Fazenda Santa Maria
  private dadosSensores: AgroSensor[] = [
    {
      id: 'SNS-101',
      nome: 'Sonda FDR Camada Radicular',
      tipo: 'Umidade de Solo',
      talhao: 'Talhão 04 - Soja Safra',
      valorLeitura: '64.5%',
      bateria: 92,
      status: 'Operacional'
    },
    {
      id: 'SNS-102',
      nome: 'Eletrodo Potenciométrico',
      tipo: 'pH do Solo',
      talhao: 'Talhão 07 - Milho Safrinha',
      valorLeitura: '6.2 pH',
      bateria: 85,
      status: 'Operacional'
    },
    {
      id: 'SNS-103',
      nome: 'Estação Micrometeorológica',
      tipo: 'Velocidade de Vento e Pluviometria',
      talhao: 'Setor Sede Norte',
      valorLeitura: '14.2 km/h | 0 mm',
      bateria: 78,
      status: 'Operacional'
    }
  ];

  readonly isFalhaAtiva = signal(false);

  alternarSimulacaoFalha(): boolean {
    this.isFalhaAtiva.update(v => !v);
    return this.isFalhaAtiva();
  }

  // Operação assíncrona consumida diretamente pela Resource API
  async getSensoresAsync(): Promise<AgroSensor[]> {
    await new Promise(resolve => setTimeout(resolve, 600));

    if (this.isFalhaAtiva()) {
      throw new Error('Falha de comunicação telemétrica com o gateway de campo.');
    }

    return [...this.dadosSensores];
  }

  // Operação de adição assíncrona
  async adicionarSensorAsync(sensor: Omit<AgroSensor, 'id'>): Promise<AgroSensor> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const novoSensor: AgroSensor = {
      ...sensor,
      id: `SNS-${Math.floor(100 + Math.random() * 900)}`
    };
    this.dadosSensores.push(novoSensor);
    return novoSensor;
  }

  // Operação de atualização de status
  async atualizarStatusAsync(id: string, novoStatus: 'Operacional' | 'Calibração' | 'Alerta'): Promise<AgroSensor> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const item = this.dadosSensores.find(s => s.id === id);
    if (!item) {
      throw new Error(`Sensor com identificador ${id} não encontrado.`);
    }
    item.status = novoStatus;
    return { ...item };
  }

  // Operação de remoção
  async removerSensorAsync(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.dadosSensores.findIndex(s => s.id === id);
    if (index !== -1) {
      this.dadosSensores.splice(index, 1);
      return true;
    }
    return false;
  }
}
