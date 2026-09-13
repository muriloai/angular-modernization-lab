import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly titulo = 'Conceito 12: Parâmetros de Rota e Injeção com withComponentInputBinding';
  readonly subtitulo = 'Extração clássica com ActivatedRoute (paramMap, queryParamMap, data) vs injeção direta';
}
