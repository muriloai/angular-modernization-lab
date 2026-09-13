import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly titulo = 'Conceito 09: Signals vs RxJS';
  readonly subtitulo = 'Fluxos de eventos assíncronos com RxJS (BehaviorSubject, combineLatest) e pipe async';
}
