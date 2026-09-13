import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

/**
 * Módulo raiz da arquitetura clássica do Angular 15.
 * 
 * No Angular 15:
 * - declarations: Lista os componentes pertencentes a este módulo.
 * - imports: Importa módulos com diretivas (*ngIf, *ngFor) e serviços de plataforma (BrowserModule).
 * - bootstrap: Identifica qual componente será injetado no index.html.
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
