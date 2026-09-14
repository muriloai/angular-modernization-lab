import { Component } from '@angular/core';
import { CropAlert } from './models/crop-alert.model';
import { cardAnimation } from './animations/card.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [cardAnimation]
})
export class AppComponent {
  title = 'Fazenda Santa Maria - Central de Alertas (v15)';

  alerts: CropAlert[] = [
    {
      id: 'ALT-101',
      field: 'Talhao Leste 03',
      type: 'geada',
      severity: 'alta',
      message: 'Previsao de temperatura abaixo de 2 C nas proximas 6 horas.',
      timestamp: '10:15'
    },
    {
      id: 'ALT-102',
      field: 'Talhao Norte 09',
      type: 'praga',
      severity: 'media',
      message: 'Identificada presenca de lagarta-do-cartucho acima do limiar de controle.',
      timestamp: '09:40'
    },
    {
      id: 'ALT-103',
      field: 'Talhao Sul 01',
      type: 'colheita',
      severity: 'baixa',
      message: 'Umidade do grao em 13.5%. Janela favoravel para colheita.',
      timestamp: '08:30'
    }
  ];

  newField = '';
  newType: CropAlert['type'] = 'geada';
  newSeverity: CropAlert['severity'] = 'media';
  newMessage = '';

  addAlert(): void {
    if (!this.newField || !this.newMessage) return;

    const alert: CropAlert = {
      id: `ALT-${Math.floor(100 + Math.random() * 900)}`,
      field: this.newField,
      type: this.newType,
      severity: this.newSeverity,
      message: this.newMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    // Adiciona no topo para disparar animacao de entrada (:enter)
    this.alerts = [alert, ...this.alerts];

    this.newField = '';
    this.newMessage = '';
  }

  dismissAlert(id: string): void {
    // Remove para disparar animacao de saida (:leave)
    this.alerts = this.alerts.filter(a => a.id !== id);
  }
}
