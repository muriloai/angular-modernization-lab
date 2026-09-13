import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AgroAuthService } from './services/agro-auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = 'Conceito 14: Functional Route Guards no Angular 22';
  readonly authService = inject(AgroAuthService);
}
