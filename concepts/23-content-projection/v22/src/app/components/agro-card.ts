import { Component } from '@angular/core';

@Component({
  selector: 'app-agro-card',
  templateUrl: './agro-card.html',
  styleUrls: ['./agro-card.css']
})
export class AgroCard {
  // No Angular 22, o suporte a Fallback Content em <ng-content> é 100% nativo e declarativo.
  // Não há necessidade de @ContentChild, ngAfterContentInit ou variáveis booleanas de controle.
}
