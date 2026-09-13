import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgroAuthService } from '../services/agro-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  operadorNome = 'Mariana Silva';
  operadorCargo = 'Engenheira Agrônoma';
  operadorRegistro = 'CREA-MT 45892';

  constructor(
    public authService: AgroAuthService,
    private router: Router
  ) {}

  entrar(): void {
    this.authService.login(
      this.operadorNome,
      this.operadorCargo,
      this.operadorRegistro
    );
    this.router.navigate(['/maquinario']);
  }

  sair(): void {
    this.authService.logout();
  }
}
