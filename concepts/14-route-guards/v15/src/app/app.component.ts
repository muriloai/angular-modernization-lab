import { Component } from '@angular/core';
import { AgroAuthService } from './services/agro-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conceito 14: Route Guards no Angular 15';

  constructor(public authService: AgroAuthService) {}
}
