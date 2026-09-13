import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SensorAlertDirective } from './directives/sensor-alert.directive';

// No Angular 15, toda diretiva precisa ser declarada no array declarations de um módulo
@NgModule({
  declarations: [
    AppComponent,
    SensorAlertDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
