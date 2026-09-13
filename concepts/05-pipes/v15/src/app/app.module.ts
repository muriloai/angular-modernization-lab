import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SensorStatusPipe } from './pipes/sensor-status.pipe';
import { FilterImpurePipe } from './pipes/filter-impure.pipe';

// No Angular 15, todos os pipes customizados devem ser declarados no array declarations do módulo
@NgModule({
  declarations: [
    AppComponent,
    SensorStatusPipe,
    FilterImpurePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
