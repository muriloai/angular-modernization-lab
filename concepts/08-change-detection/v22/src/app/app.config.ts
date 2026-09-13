import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

/**
 * Configuração da aplicação do Angular 22 no modo Zoneless nativo.
 * A biblioteca zone.js foi removida dos polyfills e o framework opera
 * exclusivamente orientado a notificações granulares de Signals.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};
