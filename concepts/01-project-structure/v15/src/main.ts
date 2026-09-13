import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Ponto de entrada clássico do Angular 15:
// O compilador carrega a plataforma dinâmica do browser e compila o AppModule em tempo de execução
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error('Erro ao inicializar o AppModule no Angular 15:', err));
