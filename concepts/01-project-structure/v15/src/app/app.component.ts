import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'Estação AgroTech Rondonópolis';
  versaoFramework = 'Angular 15.2.10';
  modoBootstrap = 'NgModule (AppModule) + platformBrowserDynamic';
  motorBuild = 'Webpack (@angular-devkit/build-angular:browser)';
  statusEstacao = 'Ativa e Operacional';
  sensoresConectados = 48;
  timestampInicio = new Date().toLocaleTimeString('pt-BR');
}
