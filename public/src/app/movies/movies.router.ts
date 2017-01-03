import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { tokenNotExpired } from 'angular2-jwt';
import { MoviesComponent } from './movies.component';
import { MovieComponent } from './movie/movie.component';



export const routes: Routes = [
  {
    path: 'movies', children: [
      { path: '', component: MoviesComponent },
      { path: 'discover', component:  MoviesComponent },
      { path: ':id/:title', component: MovieComponent}
    ]
  }
];

export const MOVIE_ROUTER_PROVIDERS: any[] = [
];

export const MOVIE_ROUTER: ModuleWithProviders = RouterModule.forRoot(routes);