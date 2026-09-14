import { ApplicationConfig, ErrorHandler, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AgroErrorHandler } from './services/error-handler.service';
import { SilosApiService } from './services/silos-api.service';

/**
 * Configuração moderna do Angular 22:
 * 1. provideZonelessChangeDetection: Execução de alta performance sem Zone.js.
 * 2. provideHttpClient: Cliente HTTP funcional nativo.
 * 3. ErrorHandler global configurado através de provider orientado a DI limpa.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    SilosApiService,
    AgroErrorHandler,
    {
      provide: ErrorHandler,
      useExisting: AgroErrorHandler
    }
  ]
};
