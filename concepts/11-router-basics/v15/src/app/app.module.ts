import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FarmsComponent } from './pages/farms.component';
import { SensorsComponent } from './pages/sensors.component';
import { NotFoundComponent } from './pages/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    FarmsComponent,
    SensorsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
