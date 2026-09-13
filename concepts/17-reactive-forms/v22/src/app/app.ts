import { Component } from '@angular/core';
import { SafraForm } from './safra-form';

@Component({
  selector: 'app-root',
  imports: [SafraForm],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 17: Reactive Forms e Typed Forms no Angular 22';
}
