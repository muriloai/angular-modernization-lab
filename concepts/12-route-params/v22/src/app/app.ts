import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly titulo = 'Conceito 12: Parâmetros de Rota e Injeção com withComponentInputBinding';
  readonly subtitulo = 'Injeção direta e declarativa de parâmetros de rota, query params e resolvers como inputs';
}
