import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ApiResilientComponent } from './pages/api-resilient.component';
import { AgroErrorHandler } from './services/error-handler.service';
import { SilosApiService } from './services/silos-api.service';

@NgModule({
  declarations: [
    AppComponent,
    ApiResilientComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SilosApiService,
    AgroErrorHandler,
    {
      provide: ErrorHandler,
      useExisting: AgroErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
