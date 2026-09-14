import { Component } from '@angular/core';
import { SensorsList } from './sensors-list';

@Component({
  selector: 'app-root',
  imports: [SensorsList],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 19: Resource API e Comunicação HTTP no Angular 22';
}
