import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Inicialização clássica com AppModule e zone.js
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error('Erro ao inicializar o Angular 15:', err));
