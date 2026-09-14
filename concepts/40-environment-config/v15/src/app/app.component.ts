import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fazenda Santa Maria - Parametrização de Ambientes (v15 - fileReplacements)';

  // Import direto de constante estática gerada pelo build
  env = environment;
}
