import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly titulo = 'Conceito 10: Gerenciamento de Estado com Serviços';
  readonly subtitulo = 'Padrão Observable Store com BehaviorSubject, seletores via pipe e distinctUntilChanged';
}
