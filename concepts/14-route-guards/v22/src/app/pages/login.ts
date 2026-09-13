import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgroAuthService } from '../services/agro-auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  readonly authService = inject(AgroAuthService);
  private readonly router = inject(Router);

  readonly operadorNome = signal('Mariana Silva');
  readonly operadorCargo = signal('Engenheira Agrônoma');
  readonly operadorRegistro = signal('CREA-MT 45892');

  entrar(): void {
    this.authService.login(
      this.operadorNome(),
      this.operadorCargo(),
      this.operadorRegistro()
    );
    this.router.navigate(['/maquinario']);
  }

  sair(): void {
    this.authService.logout();
  }
}
