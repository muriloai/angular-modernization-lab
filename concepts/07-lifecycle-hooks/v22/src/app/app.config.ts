import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

/**
 * Configuração da aplicação do Angular 22.
 * Funções como afterNextRender e DestroyRef são utilitários nativos do core.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
