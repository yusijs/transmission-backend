import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ng2-bootstrap';
import { ShowsComponent } from './shows.component';
import { SharedModule } from '../shared/shared.module';

import { SHOWS_ROUTER, SHOWS_ROUTER_PROVIDERS } from './shows.router';
import { ShowComponent } from './show/show.component';
import { ShowsService } from './shows.service';
import { SeasonComponent } from './show/season/season.component';
import { EpisodeComponent } from './show/episode/episode.component';
import { TorrentsComponent } from './show/torrents/torrents.component';
import { TorrentComponent } from './show/torrents/torrent/torrent.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SHOWS_ROUTER,
    SharedModule,
    PaginationModule
  ],
  declarations: [ShowsComponent, ShowComponent, SeasonComponent, EpisodeComponent, TorrentsComponent, TorrentComponent],
  providers: [SHOWS_ROUTER_PROVIDERS, ShowsService]
})
export class ShowsModule { }
