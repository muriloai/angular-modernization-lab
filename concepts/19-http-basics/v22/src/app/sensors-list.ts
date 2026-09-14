import { Component, inject, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SensorsApiService, AgroSensor } from './services/sensors-api.service';

@Component({
  selector: 'app-sensors-list',
  imports: [FormsModule],
  templateUrl: './sensors-list.html',
  styleUrls: ['./sensors-list.css']
})
export class SensorsList {
  readonly apiService = inject(SensorsApiService);

  // Primitiva moderna Resource API do Angular 22
  // Fornece automaticamente .value(), .isLoading(), .error() e .reload()
  readonly sensorsResource = resource({
    loader: async () => {
      return await this.apiService.getSensoresAsync();
    }
  });

  readonly isMutating = signal(false);
  readonly mensagemSucesso = signal<string | null>(null);

  // Modelo reativo para cadastro de novo sensor
  readonly novoNome = signal('Sonda TDR Perfil Profundo');
  readonly novoTipo = signal('Umidade de Solo');
  readonly novoTalhao = signal('Talhão 11 - Pivô Central');
  readonly novoValor = signal('71.0%');
  readonly novoBateria = signal(98);

  async cadastrarSensor(): Promise<void> {
    if (!this.novoNome().trim()) return;

    this.isMutating.set(true);
    try {
      await this.apiService.adicionarSensorAsync({
        nome: this.novoNome(),
        tipo: this.novoTipo(),
        talhao: this.novoTalhao(),
        valorLeitura: this.novoValor(),
        bateria: this.novoBateria(),
        status: 'Operacional'
      });
      this.exibirSucesso('Novo sensor telemétrico registrado com sucesso.');
      this.sensorsResource.reload();
    } finally {
      this.isMutating.set(false);
    }
  }

  async alternarStatus(sensor: AgroSensor): Promise<void> {
    const proximoStatus = sensor.status === 'Operacional' ? 'Calibração' : 'Operacional';
    await this.apiService.atualizarStatusAsync(sensor.id, proximoStatus);
    this.exibirSucesso(`Status do sensor ${sensor.id} atualizado para ${proximoStatus}.`);
    this.sensorsResource.reload();
  }

  async excluirSensor(id: string): Promise<void> {
    await this.apiService.removerSensorAsync(id);
    this.exibirSucesso(`Sensor ${id} descomissionado da rede.`);
    this.sensorsResource.reload();
  }

  alternarFalha(): void {
    this.apiService.alternarSimulacaoFalha();
    this.sensorsResource.reload();
  }

  private exibirSucesso(msg: string): void {
    this.mensagemSucesso.set(msg);
    setTimeout(() => {
      this.mensagemSucesso.set(null);
    }, 4000);
  }
}
