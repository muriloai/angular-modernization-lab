import { Component } from '@angular/core';
import { TasksBoard } from './tasks-board';

@Component({
  selector: 'app-root',
  imports: [TasksBoard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly titulo = 'Conceito 10: Gerenciamento de Estado com Serviços';
  readonly subtitulo = 'Padrão Signal Store nativo com signal(), computed(), update() e asReadonly()';
}
