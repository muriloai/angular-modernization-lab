import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

/**
 * Configuração da aplicação do Angular 22.
 * A Directive Composition API (hostDirectives) é um recurso nativo do framework.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
