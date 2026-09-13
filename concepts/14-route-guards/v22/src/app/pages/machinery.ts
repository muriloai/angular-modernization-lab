import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule],
  templateUrl: './machinery.html',
  styleUrls: ['./machinery.css']
})
export class Machinery implements HasPendingChanges {
  readonly authService = inject(AgroAuthService);

  readonly maquinas = signal<MachineItem[]>([
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
  ]);

  readonly selectedMachineId = signal('TRAT-01');
  readonly observacoesManutencao = signal('');
  readonly registroSalvoComSucesso = signal(false);

  // Implementação da interface HasPendingChanges para a guarda unsavedChangesGuard
  hasUnsavedChanges(): boolean {
    return this.observacoesManutencao().trim().length > 0;
  }

  salvarOrdem(): void {
    if (!this.hasUnsavedChanges()) {
      return;
    }

    this.registroSalvoComSucesso.set(true);
    this.observacoesManutencao.set('');

    setTimeout(() => {
      this.registroSalvoComSucesso.set(false);
    }, 4000);
  }
}
