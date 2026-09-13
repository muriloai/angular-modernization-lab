import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Ponto de entrada da aplicação Angular 22:
// O componente raiz é inicializado de forma direta via bootstrapApplication
bootstrapApplication(App, appConfig)
  .catch(err => console.error('Erro ao inicializar o Angular 22:', err));
