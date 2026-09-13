import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

/**
 * Configuração da aplicação do Angular 22.
 * Provedores e recursos globais são registrados via funções provide.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
