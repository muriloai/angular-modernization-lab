import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Ponto de entrada clássico com AppModule e Webpack
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error('Erro ao inicializar o Angular 15:', err));
