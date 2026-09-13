import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

/**
 * Configuração da aplicação do Angular 22 no modo Zoneless nativo.
 * Sem dependência do zone.js, atualizando nós do DOM a partir de Signals.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};
