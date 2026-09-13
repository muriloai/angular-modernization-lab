import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Ponto de entrada moderno do Angular 22:
// O modo Zoneless e o roteamento com carregamento tardio de componentes são inicializados
bootstrapApplication(App, appConfig)
  .catch(err => console.error('Erro ao inicializar o Angular 22:', err));
