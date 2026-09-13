import { Component } from '@angular/core';
import { AgroAuthService } from '../services/agro-auth.service';
import { HasPendingChanges } from '../guards/unsaved-changes.guard';

interface MachineItem {
  id: string;
  tipo: string;
  modelo: string;
  status: 'Operacional' | 'Em Calibração' | 'Manutenção Requerida';
  pressaoOleo: string;
  temperaturaMotor: string;
}

@Component({
  selector: 'app-machinery',
  templateUrl: './machinery.component.html',
  styleUrls: ['./machinery.component.css']
})
export class MachineryComponent implements HasPendingChanges {
  // Lista de maquinários em operação na Fazenda Santa Maria
  maquinas: MachineItem[] = [
    {
      id: 'TRAT-01',
      tipo: 'Trator Pesado',
      modelo: 'John Deere 8R 410',
      status: 'Operacional',
      pressaoOleo: '4.2 bar',
      temperaturaMotor: '82°C'
    },
    {
      id: 'COLH-03',
      tipo: 'Colheitadeira de Grãos',
      modelo: 'Case IH Axial-Flow 9250',
      status: 'Operacional',
      pressaoOleo: '4.0 bar',
      temperaturaMotor: '88°C'
    },
    {
      id: 'PULV-02',
      tipo: 'Pulverizador Autopropelido',
      modelo: 'Jacto Uniport 3030',
      status: 'Em Calibração',
      pressaoOleo: '3.8 bar',
      temperaturaMotor: '76°C'
    }
  ];

  // Campos do formulário de diário de manutenção
  selectedMachineId = 'TRAT-01';
  observacoesManutencao = '';
  registroSalvoComSucesso = false;

  constructor(public authService: AgroAuthService) {}

  // Implementação da interface HasPendingChanges para o UnsavedChangesGuard
  hasUnsavedChanges(): boolean {
    return this.observacoesManutencao.trim().length > 0;
  }

  salvarOrdem(): void {
    if (this.observacoesManutencao.trim().length === 0) {
      return;
    }

    // Registra alteração e limpa a pendência
    this.registroSalvoComSucesso = true;
    this.observacoesManutencao = '';

    setTimeout(() => {
      this.registroSalvoComSucesso = false;
    }, 4000);
  }
}
