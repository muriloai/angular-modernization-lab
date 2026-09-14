import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drone } from './models/drone.model';
import { DroneCard } from './components/drone-card';

interface LogOperacao {
  horario: string;
  mensagem: string;
  tipo: 'sucesso' | 'aviso' | 'perigo';
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, DroneCard],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 22: Comunicação entre Componentes no Angular 22';

  // Sinal reativo compartilhado bidirecionalmente com os filhos via model()
  readonly altitudePadrao = signal<number>(18);
  readonly modoGlobal = signal<'manual' | 'automatico'>('automatico');

  readonly alertaEmergencia = signal<string | null>(null);
  readonly logsOperacionais = signal<LogOperacao[]>([]);

  readonly frotaDrones = signal<Drone[]>([
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
  ]);

  alternarModoOperacao(): void {
    const proximo = this.modoGlobal() === 'automatico' ? 'manual' : 'automatico';
    this.modoGlobal.set(proximo);
    this.adicionarLog(`Modo operacional da frota alterado para: ${proximo.toUpperCase()}`, 'aviso');
  }

  processarDecolagem(drone: Drone): void {
    this.alertaEmergencia.set(null);
    this.frotaDrones.update(drones =>
      drones.map(d =>
        d.id === drone.id
          ? { ...d, status: d.capacidadeTanqueLitros > 0 ? 'Em Pulverização' : 'Mapeando' }
          : d
      )
    );
    this.adicionarLog(
      `Decolagem autorizada: ${drone.modelo} (${drone.id}) em altitude de ${this.altitudePadrao()}m.`,
      'sucesso'
    );
  }

  processarRetorno(drone: Drone): void {
    this.frotaDrones.update(drones =>
      drones.map(d =>
        d.id === drone.id ? { ...d, status: 'Retornando à Base' } : d
      )
    );
    this.adicionarLog(`Retorno à base solicitado para o drone ${drone.id}.`, 'aviso');
  }

  tratarAlerta(mensagem: string): void {
    this.alertaEmergencia.set(mensagem);
    this.adicionarLog(mensagem, 'perigo');
  }

  private adicionarLog(mensagem: string, tipo: 'sucesso' | 'aviso' | 'perigo'): void {
    const novoLog: LogOperacao = {
      horario: new Date().toLocaleTimeString('pt-BR'),
      mensagem,
      tipo
    };
    this.logsOperacionais.update(atuais => [novoLog, ...atuais.slice(0, 14)]);
  }
}
