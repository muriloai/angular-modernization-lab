import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Ponto de entrada moderno do Angular 22:
// Inicialização Zoneless com interceptadores funcionais HttpInterceptorFn
bootstrapApplication(App, appConfig)
  .catch(err => console.error('Erro ao inicializar o Angular 22:', err));
