import { Component } from '@angular/core';
import { IrrigationCalculator } from './irrigation-calculator';

@Component({
  selector: 'app-root',
  imports: [IrrigationCalculator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly titulo = 'Conceito 09: Signals vs RxJS';
  readonly subtitulo = 'Reatividade síncrona por dependências finas (signal, computed, linkedSignal, effect)';
}
