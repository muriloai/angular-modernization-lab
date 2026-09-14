import { Component, OnInit } from '@angular/core';
import { SensorsApiService, AgroSensor } from './services/sensors-api.service';

@Component({
  selector: 'app-sensors-list',
  templateUrl: './sensors-list.component.html',
  styleUrls: ['./sensors-list.component.css']
})
export class SensorsListComponent implements OnInit {
  sensores: AgroSensor[] = [];

  // Variáveis manuais clássicas de controle de estado
  isLoading = false;
  errorMessage: string | null = null;
  mensagemSucesso: string | null = null;

  // Modelo de cadastro de novo sensor
  novoNome = 'Sonda TDR Perfil Profundo';
  novoTipo = 'Umidade de Solo';
  novoTalhao = 'Talhão 11 - Pivô Central';
  novoValor = '71.0%';
  novoBateria = 98;

  constructor(public apiService: SensorsApiService) {}

  ngOnInit(): void {
    this.carregarSensores();
  }

  carregarSensores(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.getSensores().subscribe({
      next: (dados) => {
        this.sensores = dados;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erro inesperado ao consultar sensores.';
        this.isLoading = false;
      }
    });
  }

  cadastrarSensor(): void {
    if (!this.novoNome.trim()) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.adicionarSensor({
      nome: this.novoNome,
      tipo: this.novoTipo,
      talhao: this.novoTalhao,
      valorLeitura: this.novoValor,
      bateria: this.novoBateria,
      status: 'Operacional'
    }).subscribe({
      next: () => {
        this.exibirSucesso('Novo sensor telemétrico registrado com sucesso.');
        this.carregarSensores();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  alternarStatus(sensor: AgroSensor): void {
    const proximoStatus = sensor.status === 'Operacional' ? 'Calibração' : 'Operacional';
    this.apiService.atualizarStatus(sensor.id, proximoStatus).subscribe({
      next: () => {
        this.exibirSucesso(`Status do sensor ${sensor.id} atualizado para ${proximoStatus}.`);
        this.carregarSensores();
      }
    });
  }

  excluirSensor(id: string): void {
    this.apiService.removerSensor(id).subscribe({
      next: () => {
        this.exibirSucesso(`Sensor ${id} descomissionado da rede.`);
        this.carregarSensores();
      }
    });
  }

  alternarFalha(): void {
    this.apiService.alternarSimulacaoFalha();
    this.carregarSensores();
  }

  private exibirSucesso(msg: string): void {
    this.mensagemSucesso = msg;
    setTimeout(() => {
      this.mensagemSucesso = null;
    }, 4000);
  }
}
