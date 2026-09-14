import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorsBoard } from './components/sensors-board';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SensorsBoard],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 24: Consultas de Visão no Angular 22';
}
