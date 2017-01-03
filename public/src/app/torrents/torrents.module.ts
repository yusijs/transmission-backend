import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from 'ng2-bootstrap';
import { TorrentsComponent } from './torrents.component';
import { TorrentComponent } from './torrent/torrent.component';
import { TorrentsService } from './torrents.service';
import { TORRENTS_ROUTER_PROVIDERS, TORRENTS_ROUTER} from './torrents.router';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TORRENTS_ROUTER,
    SharedModule,
    ProgressbarModule
  ],
  declarations: [TorrentsComponent, TorrentComponent, DetailsComponent],
  providers: [TorrentsService, TORRENTS_ROUTER_PROVIDERS]
})
export class TorrentsModule { }
