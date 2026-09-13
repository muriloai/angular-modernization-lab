import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

/**
 * Configuração da aplicação do Angular 22.
 * O Built-in Control Flow (@if, @for, @switch) é nativo do compilador
 * e não exige nenhum provedor ou módulo adicional.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
