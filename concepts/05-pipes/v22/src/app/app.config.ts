import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

/**
 * Configuração da aplicação do Angular 22.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
