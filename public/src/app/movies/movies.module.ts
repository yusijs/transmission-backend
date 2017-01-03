import { PaginationModule } from 'ng2-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { MoviesComponent } from './movies.component';
import { MoviesService } from './movies.service';

import { MOVIE_ROUTER_PROVIDERS, MOVIE_ROUTER } from './movies.router';
import { MovieComponent } from './movie/movie.component';
import { TorrentsComponent } from './movie/torrents/torrents.component';
import { DetailsComponent } from './movie/details/details.component';
import { GenresComponent } from './movie/details/genres/genres.component';
import { KeywordsComponent } from './movie/details/keywords/keywords.component';
import { SimilarComponent } from './movie/similar/similar.component';
import { ItemComponent } from './movie/similar/item/item.component';

@NgModule({
  imports: [
    CommonModule,
    MOVIE_ROUTER,
    SharedModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  declarations: [MoviesComponent, MovieComponent, TorrentsComponent,
  DetailsComponent, GenresComponent, KeywordsComponent, SimilarComponent, ItemComponent],
  providers: [MOVIE_ROUTER_PROVIDERS, MoviesService]
})
export class MoviesModule { }
