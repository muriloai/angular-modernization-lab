import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AgroAuthService } from '../services/agro-auth.service';

/**
 * Guarda de ativação funcional do Angular 22:
 * Não requer classe com @Injectable nem declaração em providers de módulo.
 * Resolve dependências diretamente via inject() no contexto da rota.
 */
export const agroAuthGuard: CanActivateFn = () => {
  const authService = inject(AgroAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redireciona o operador diretamente para a rota de login via UrlTree
  return router.parseUrl('/login');
};
