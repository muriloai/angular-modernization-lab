import { Component } from '@angular/core';
import { Drone } from './models/drone.model';

interface LogOperacao {
  horario: string;
  mensagem: string;
  tipo: 'sucesso' | 'aviso' | 'perigo';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conceito 22: Comunicação entre Componentes no Angular 15';

  // Variável bidirecional compartilhada com os componentes filhos via banana-in-a-box
  altitudePadrao = 18;
  modoGlobal: 'manual' | 'automatico' = 'automatico';

  alertaEmergencia: string | null = null;
  logsOperacionais: LogOperacao[] = [];

  frotaDrones: Drone[] = [
    {
      id: 'DRONE-01',
      modelo: 'DJI Agras T40 Pulverizador',
      finalidade: 'Aplicação de Defensivo Biológico',
      bateriaPercentual: 88,
      capacidadeTanqueLitros: 40,
      status: 'Em Espera',
      talhaoDesignado: 'Talhão 04 - Soja Safra'
    },
    {
      id: 'DRONE-02',
      modelo: 'Matrice 350 RTK Multiespectral',
      finalidade: 'Mapeamento de Falhas e Índice NDVI',
      bateriaPercentual: 64,
      capacidadeTanqueLitros: 0,
      status: 'Em Espera',
      talhaoDesignado: 'Talhão 11 - Milho Irrigado'
    },
    {
      id: 'DRONE-03',
      modelo: 'Agras T20P Apoio Rápido',
      finalidade: 'Pulverização Seletiva de Bordadura',
      bateriaPercentual: 14,
      capacidadeTanqueLitros: 20,
      status: 'Em Espera',
      talhaoDesignado: 'Talhão 02 - Algodão'
    }
  ];

  alternarModoOperacao(): void {
    this.modoGlobal = this.modoGlobal === 'automatico' ? 'manual' : 'automatico';
    this.adicionarLog(`Modo operacional da frota alterado para: ${this.modoGlobal.toUpperCase()}`, 'aviso');
  }

  processarDecolagem(drone: Drone): void {
    this.alertaEmergencia = null;
    drone.status = drone.capacidadeTanqueLitros > 0 ? 'Em Pulverização' : 'Mapeando';
    this.adicionarLog(`Decolagem autorizada: ${drone.modelo} (${drone.id}) em altitude de ${this.altitudePadrao}m.`, 'sucesso');
  }

  processarRetorno(drone: Drone): void {
    drone.status = 'Retornando à Base';
    this.adicionarLog(`Retorno à base solicitado para o drone ${drone.id}.`, 'aviso');
  }

  tratarAlerta(mensagem: string): void {
    this.alertaEmergencia = mensagem;
    this.adicionarLog(mensagem, 'perigo');
  }

  private adicionarLog(mensagem: string, tipo: 'sucesso' | 'aviso' | 'perigo'): void {
    const novoLog: LogOperacao = {
      horario: new Date().toLocaleTimeString('pt-BR'),
      mensagem,
      tipo
    };
    this.logsOperacionais.unshift(novoLog);
    if (this.logsOperacionais.length > 15) {
      this.logsOperacionais.pop();
    }
  }
}
