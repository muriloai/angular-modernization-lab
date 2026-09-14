import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // Habilita arquitetura puramente Zoneless sem monkey-patching do browser
    provideZonelessChangeDetection()
  ]
};
