import { Pipe, PipeTransform } from '@angular/core';
import { SensorItem } from '../sensor.model';

// Pipe impuro do Angular 15:
// Executa a cada ciclo de detecção de mudanças do Zone.js,
// mesmo quando a lista de entrada ou os parâmetros não mudaram
@Pipe({
  name: 'filterImpure',
  pure: false
})
export class FilterImpurePipe implements PipeTransform {
  static totalChamadas = 0;

  transform(itens: SensorItem[] | null, termo: string): SensorItem[] {
    FilterImpurePipe.totalChamadas++;
    console.log(`[FilterImpurePipe] Execução número ${FilterImpurePipe.totalChamadas}`);

    if (!itens) {
      return [];
    }

    if (!termo || termo.trim() === '') {
      return itens;
    }

    const busca = termo.toLowerCase();
    return itens.filter(item =>
      item.tipo.toLowerCase().includes(busca) ||
      item.talhao.toLowerCase().includes(busca)
    );
  }
}
