import { Component } from '@angular/core';
import { InterceptorDemo } from './pages/interceptor-demo';

@Component({
  selector: 'app-root',
  imports: [InterceptorDemo],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 20: HTTP Interceptors no Angular 22';
}
