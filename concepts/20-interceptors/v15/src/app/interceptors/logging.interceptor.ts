import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private loggingService: LoggingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    const url = req.urlWithParams;
    const method = req.method;

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            const elapsed = Date.now() - startTime;
            this.loggingService.registrarLog({
              metodo: method,
              url,
              status: event.status,
              duracaoMs: elapsed,
              timestamp: new Date().toLocaleTimeString('pt-BR'),
              headersEnviados: {
                Authorization: req.headers.get('Authorization') || '(não informado)',
                'X-Farm-Terminal': req.headers.get('X-Farm-Terminal') || '(não informado)'
              }
            });
          }
        },
        error: (error) => {
          const elapsed = Date.now() - startTime;
          this.loggingService.registrarLog({
            metodo: method,
            url,
            status: error.status || 500,
            duracaoMs: elapsed,
            timestamp: new Date().toLocaleTimeString('pt-BR'),
            headersEnviados: {
              Authorization: req.headers.get('Authorization') || '(não informado)',
              'X-Farm-Terminal': req.headers.get('X-Farm-Terminal') || '(não informado)'
            }
          });
        }
      })
    );
  }
}
