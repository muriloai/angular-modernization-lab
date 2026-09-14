import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

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

  private simularFalha = false;

  alternarSimulacaoFalha(): boolean {
    this.simularFalha = !this.simularFalha;
    return this.simularFalha;
  }

  isFalhaAtiva(): boolean {
    return this.simularFalha;
  }

  // Operação GET: Retorna Observable simulando requisição HTTP assíncrona
  getSensores(): Observable<AgroSensor[]> {
    if (this.simularFalha) {
      return throwError(() => new Error('Falha de comunicação telemétrica com o gateway de campo.')).pipe(
        delay(600)
      );
    }
    return of([...this.dadosSensores]).pipe(delay(600));
  }

  // Operação POST: Cadastra novo sensor
  adicionarSensor(sensor: Omit<AgroSensor, 'id'>): Observable<AgroSensor> {
    const novoSensor: AgroSensor = {
      ...sensor,
      id: `SNS-${Math.floor(100 + Math.random() * 900)}`
    };
    this.dadosSensores.push(novoSensor);
    return of(novoSensor).pipe(delay(400));
  }

  // Operação PUT: Atualiza status do sensor
  atualizarStatus(id: string, novoStatus: 'Operacional' | 'Calibração' | 'Alerta'): Observable<AgroSensor> {
    const item = this.dadosSensores.find(s => s.id === id);
    if (!item) {
      return throwError(() => new Error(`Sensor com identificador ${id} não encontrado.`));
    }
    item.status = novoStatus;
    return of({ ...item }).pipe(delay(300));
  }

  // Operação DELETE: Remove sensor de campo
  removerSensor(id: string): Observable<boolean> {
    const index = this.dadosSensores.findIndex(s => s.id === id);
    if (index !== -1) {
      this.dadosSensores.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }
}
