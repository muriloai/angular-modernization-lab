import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptador funcional de autenticação do Angular 22:
 * Não requer classe com @Injectable nem token HTTP_INTERCEPTORS com multi: true.
 * Injeta os cabeçalhos diretamente de forma pura e imutável.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'AGRO-TOKEN-SANTA-MARIA-2026';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
      'X-Farm-Terminal': 'Terminal-Campo-MT-01',
      'X-Client-Version': 'Angular-22-Modern'
    }
  });

  return next(authReq);
};
