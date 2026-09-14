import { Component } from '@angular/core';
import { ApiResilient } from './pages/api-resilient';

@Component({
  selector: 'app-root',
  imports: [ApiResilient],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 21: Error Handling e Retry no Angular 22';
}
