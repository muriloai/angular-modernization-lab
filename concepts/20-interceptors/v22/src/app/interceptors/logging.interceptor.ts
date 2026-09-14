import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';

/**
 * Interceptador funcional de auditoria e logging de rede do Angular 22:
 * Utiliza inject(LoggingService) dentro do escopo da função.
 * Mede a latência da chamada e atualiza a telemetria em Signals.
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const loggingService = inject(LoggingService);
  const startTime = Date.now();
  const url = req.urlWithParams;
  const method = req.method;

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          const elapsed = Date.now() - startTime;
          loggingService.registrarLog({
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
        loggingService.registrarLog({
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
};
