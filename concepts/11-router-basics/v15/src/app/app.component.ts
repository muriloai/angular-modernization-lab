import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly titulo = 'Conceito 11: Roteamento Básico';
  readonly subtitulo = 'Configuração clássica com AppRoutingModule, RouterModule.forRoot() e RouterOutlet';
}
