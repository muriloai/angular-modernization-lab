import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuração moderna do Angular 22:
 * provideRouter ativado com withComponentInputBinding(), permitindo que parâmetros de rota,
 * query params e resolvers sejam injetados diretamente como signal inputs nos componentes.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding())
  ]
};
