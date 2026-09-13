import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TalhaoListComponent } from './talhao-list.component';
import { TalhaoDetailComponent } from './talhao-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TalhaoListComponent,
    TalhaoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
