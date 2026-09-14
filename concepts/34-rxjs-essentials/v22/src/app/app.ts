import { Component, signal } from '@angular/core';
import { SearchSupplies } from './components/search-supplies';

@Component({
  selector: 'app-root',
  imports: [SearchSupplies],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = signal('Fazenda Santa Maria - Gestão de Insumos e RxJS (v22)');
}
