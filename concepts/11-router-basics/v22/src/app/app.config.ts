import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuração da aplicação do Angular 22:
 * Modo Zoneless nativo combinado ao roteamento funcional moderno via provideRouter().
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
