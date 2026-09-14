import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { WidgetsHostComponent } from './components/widgets-host.component';
import { PluviometroWidgetComponent } from './widgets/pluviometro-widget.component';
import { TermohigrometroWidgetComponent } from './widgets/termohigrometro-widget.component';
import { AnemometroWidgetComponent } from './widgets/anemometro-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetsHostComponent,
    PluviometroWidgetComponent,
    TermohigrometroWidgetComponent,
    AnemometroWidgetComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
