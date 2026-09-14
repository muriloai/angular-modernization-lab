import { Component, signal } from '@angular/core';
import { HarvestList } from './features/harvest/harvest-list';

@Component({
  selector: 'app-root',
  imports: [HarvestList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('Fazenda Santa Maria - Gestao de Colheita (v22 - Standalone Architecture)');
}
