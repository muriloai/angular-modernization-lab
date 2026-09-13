import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

/**
 * Configuração da aplicação do Angular 22.
 * 
 * Substitui completamente o app.module.ts tradicional.
 * Provedores e configurações globais são registrados via funções provide*.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
