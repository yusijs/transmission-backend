import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionsComponent } from './collections.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  {
    path: 'collections', children: [
      { path: '', component: CollectionsComponent },
      { path: 'search', component: SearchComponent },
      { path: ':id/:title', component: DetailsComponent }
    ]
  }
];

export const COLLECTIONS_ROUTER_PROVIDERS: any[] = [
];

export const COLLECTIONS_ROUTER: ModuleWithProviders = RouterModule.forRoot(routes);
