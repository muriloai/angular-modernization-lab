import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

/**
 * Configuração moderna do Angular 22:
 * Execução Zoneless com renderização e validação reativa estrita.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};
