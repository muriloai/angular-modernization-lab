import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Ponto de entrada clássico do Angular 15:
// Compilação dinâmica do AppModule para inicializar a aplicação
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
