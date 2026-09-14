import { Component, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './services/global-error-handler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fazenda Santa Maria - Painel Agroclima (v15 - ErrorHandler Global)';

  constructor(public errorHandler: ErrorHandler) {}

  get globalHandler(): GlobalErrorHandler {
    return this.errorHandler as GlobalErrorHandler;
  }
}
