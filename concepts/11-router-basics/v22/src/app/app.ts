import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly titulo = 'Conceito 11: Roteamento Básico';
  readonly subtitulo = 'Roteamento funcional moderno com provideRouter(), RouterOutlet e diretivas diretas';
}
