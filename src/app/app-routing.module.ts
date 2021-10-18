import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/customers' },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/customers' }
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadModulesStrategy, relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ],
  providers: [PreloadModulesStrategy]
})
export class AppRoutingModule { }
