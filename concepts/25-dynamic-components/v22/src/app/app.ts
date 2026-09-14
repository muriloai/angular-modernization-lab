import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsHost } from './components/widgets-host';

@Component({
  selector: 'app-root',
  imports: [CommonModule, WidgetsHost],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 25: Componentes Dinâmicos no Angular 22';
}
