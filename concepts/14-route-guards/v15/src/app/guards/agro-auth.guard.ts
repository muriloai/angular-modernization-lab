import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AgroAuthService } from '../services/agro-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AgroAuthGuard implements CanActivate {
  constructor(
    private authService: AgroAuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    // Redireciona o operador para a tela de autenticação
    return this.router.parseUrl('/login');
  }
}
