import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,     // Main routes for application
    CoreModule,           // Singleton objects (services, components that are loaded only once, etc.)
    SharedModule          // Shared (multi-instance) objects
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
