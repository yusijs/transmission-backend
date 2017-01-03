import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowsComponent } from './shows.component';
import { ShowComponent } from './show/show.component';



export const routes: Routes = [
  {
    path: 'tv', children: [
      { path: '', component: ShowsComponent },
      { path: 'discover', component: ShowsComponent },
      { path: ':id/:title', component: ShowComponent }
    ]
  }
];

export const SHOWS_ROUTER_PROVIDERS: any[] = [
];

export const SHOWS_ROUTER: ModuleWithProviders = RouterModule.forRoot(routes);