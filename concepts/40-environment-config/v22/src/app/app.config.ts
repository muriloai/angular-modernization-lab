import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { APP_ENVIRONMENT, defaultProductionEnv } from './config/app-environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    {
      provide: APP_ENVIRONMENT,
      useValue: defaultProductionEnv
    }
  ]
};
