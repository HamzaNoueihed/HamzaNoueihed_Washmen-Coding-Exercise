import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { OverlayModule } from './overlay/overlay.module';

import { DataService } from './services/data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterService } from './services/filter.service';
import { TrackByService } from './services/trackby.service';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { EventBusService } from './services/event-bus.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, OverlayModule],
  exports: [ RouterModule, HttpClientModule, OverlayModule, NavbarComponent],
  declarations: [NavbarComponent],
  providers: [FilterService, DataService, TrackByService,
    EventBusService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: 'Window', useFactory: () => window }
  ] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}



