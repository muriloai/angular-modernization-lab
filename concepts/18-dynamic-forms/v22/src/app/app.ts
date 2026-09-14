import { Component } from '@angular/core';
import { DynamicForm } from './dynamic-form';

@Component({
  selector: 'app-root',
  imports: [DynamicForm],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 18: Dynamic Forms no Angular 22';
}
