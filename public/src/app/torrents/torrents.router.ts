import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';

import { TorrentsComponent } from './torrents.component';



export const routes: Routes = [
  {
    path: 'torrents', component: TorrentsComponent
  }
];

export const TORRENTS_ROUTER_PROVIDERS: any[] = [
];

export const TORRENTS_ROUTER: ModuleWithProviders = RouterModule.forRoot(routes);