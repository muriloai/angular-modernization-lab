import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

/**
 * Configuração moderna do Angular 22:
 * Execução Zoneless com renderização e validação sob demanda.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};
