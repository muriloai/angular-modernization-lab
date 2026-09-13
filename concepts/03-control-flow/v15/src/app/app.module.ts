import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// No Angular 15, o BrowserModule reexporta o CommonModule,
// disponibilizando as diretivas estruturais clássicas (*ngIf, *ngFor e [ngSwitch])
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
