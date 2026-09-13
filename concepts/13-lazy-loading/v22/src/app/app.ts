import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly titulo = 'Conceito 13: Carregamento Sob Demanda (Lazy Loading) e Deferrable Views';
  readonly subtitulo = 'Divisão moderna com loadComponent() para rotas e blocos @defer para templates';
}
