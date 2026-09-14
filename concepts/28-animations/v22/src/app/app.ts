import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CropAlert } from './models/crop-alert.model';
import { cardAnimation } from './animations/card.animations';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [cardAnimation]
})
export class App {
  readonly title = signal('Fazenda Santa Maria - Central de Alertas (v22)');

  readonly alerts = signal<CropAlert[]>([
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
  ]);

  newField = signal('');
  newType = signal<CropAlert['type']>('geada');
  newSeverity = signal<CropAlert['severity']>('media');
  newMessage = signal('');

  addAlert(): void {
    const field = this.newField().trim();
    const message = this.newMessage().trim();

    if (!field || !message) return;

    const alert: CropAlert = {
      id: `ALT-${Math.floor(100 + Math.random() * 900)}`,
      field,
      type: this.newType(),
      severity: this.newSeverity(),
      message,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    // Insere no inicio da lista disparando animacao :enter reativa com Signals
    this.alerts.update(list => [alert, ...list]);

    this.newField.set('');
    this.newMessage.set('');
  }

  dismissAlert(id: string): void {
    // Remove do signal disparando animacao :leave
    this.alerts.update(list => list.filter(a => a.id !== id));
  }
}
