import { Component } from '@angular/core';
import { PivoForm } from './pivo-form';

@Component({
  selector: 'app-root',
  imports: [PivoForm],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 16: Template-Driven Forms no Angular 22';
}
