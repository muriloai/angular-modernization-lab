import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly titulo = signal('Estação AgroTech Rondonópolis');
  readonly versaoFramework = signal('Angular 22.1.0');
  readonly modoBootstrap = signal('bootstrapApplication(App, appConfig) (Standalone por padrão)');
  readonly motorBuild = signal('esbuild + Vite (@angular/build:application)');
  readonly statusEstacao = signal('Ativa e Operacional');
  readonly sensoresConectados = signal(48);
  readonly timestampInicio = signal(new Date().toLocaleTimeString('pt-BR'));
}
