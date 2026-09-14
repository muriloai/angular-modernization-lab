import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Token estático representativo da credencial agronômica
  private readonly authToken = 'AGRO-TOKEN-SANTA-MARIA-2026';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona a requisição adicionando os cabeçalhos de autorização e identificação de campo
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authToken}`,
        'X-Farm-Terminal': 'Terminal-Campo-MT-01',
        'X-Client-Version': 'Angular-15-Classic'
      }
    });

    return next.handle(authReq);
  }
}
