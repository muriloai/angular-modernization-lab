import { Component } from '@angular/core';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent {
  readonly resumoOperacoes = [
    { talhao: 'Talhão Norte 01 (Soja)', status: 'Pulverização em andamento', operador: 'Carlos Silva' },
    { talhao: 'Talhão Sul 02 (Milho)', status: 'Irrigação via Pivô Central', operador: 'Automação Central' },
    { talhao: 'Talhão Leste 03 (Algodão)', status: 'Solo em repouso hídrico', operador: 'Mariana Souza' }
  ];
}
