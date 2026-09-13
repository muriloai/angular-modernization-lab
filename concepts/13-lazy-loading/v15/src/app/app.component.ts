import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly titulo = 'Conceito 13: Carregamento Sob Demanda (Lazy Loading) e Deferrable Views';
  readonly subtitulo = 'Divisão clássica por módulos com loadChildren vs componentes sob demanda e @defer';
}
