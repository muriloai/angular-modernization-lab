import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

/**
 * Configuração moderna do Angular 22:
 * provideZonelessChangeDetection ativa detecção pura sem zone.js.
 * provideHttpClient registra o cliente HTTP desacoplado de módulos.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient()
  ]
};
