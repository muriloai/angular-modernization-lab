import { Pipe, PipeTransform } from '@angular/core';
import { SensorStatus } from '../sensor.model';

// Pipe puro do Angular 15:
// Executa apenas quando a referência do valor de entrada for alterada
@Pipe({
  name: 'sensorStatus',
  pure: true
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
