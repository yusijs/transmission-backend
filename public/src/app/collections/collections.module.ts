import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsComponent } from './collections.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { CollectionsService } from './collections.service';
import { COLLECTIONS_ROUTER, COLLECTIONS_ROUTER_PROVIDERS } from './collections.router';
import { MovieComponent } from './details/movie/movie.component';
import { InfoComponent } from './details/movie/info/info.component';
import { MovieDetailsComponent } from './details/movie-details/movie-details.component';
import { HeadingComponent } from './details/heading/heading.component';
import { TorrentsComponent } from './details/torrents/torrents.component';

@NgModule({
  imports: [
    CommonModule,
    COLLECTIONS_ROUTER
  ],
  declarations: [CollectionsComponent, SearchComponent, DetailsComponent, MovieComponent, InfoComponent, MovieDetailsComponent, HeadingComponent, TorrentsComponent],
  providers: [CollectionsService, COLLECTIONS_ROUTER_PROVIDERS]
})
export class CollectionsModule { }
