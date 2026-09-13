import { Pipe, PipeTransform } from '@angular/core';
import { SensorStatus } from '../sensor.model';

// Pipe standalone puro do Angular 22:
// No Angular moderno, pipes continuam excelentes para formatar valores pontuais
@Pipe({
  name: 'sensorStatus'
})
export class SensorStatusPipe implements PipeTransform {
  transform(status: SensorStatus): string {
    switch (status) {
      case 'critico':
        return 'Intervenção Crítica';
      case 'alerta':
        return 'Atenção Operacional';
      case 'normal':
      default:
        return 'Operação Regular';
    }
  }
}
