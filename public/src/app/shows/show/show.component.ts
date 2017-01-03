import { Torrent } from './../../shared/torrents';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ShowsService } from '../shows.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  private id: number;
  private show: any;
  private torrents: any[];
  private season: any;

  getTorrent(torrent: Torrent) {
    this._sharedService.addTorrentByUrl('tv', torrent.name, torrent.id)
      .subscribe(res => {
        console.log(res);
      });
  }

  searchTorrent(showName: string, season?: number, episode?: number) {
    console.log(showName, season);
    this._sharedService.searchTorrent('tv', showName, season, episode)
      .subscribe(torrents => {
        this.torrents = torrents;
      });
  }

  changeSeason(season: number) {
    this._showsService.getSeason(this.id, season)
      .subscribe(newSeason => this.season = newSeason);
    this.searchTorrent(this.show.name, season);
  }

  constructor(private _route: ActivatedRoute, private _router: Router,
    private _showsService: ShowsService, private _sharedService: SharedService) {
    this._route.params.subscribe(params => {
      this.id = +params['id'];
      this._showsService.getShow(this.id)
        .subscribe(show => {
          show.credits.cast = show.credits.cast.slice(0, 6);
          this.show = show;
          this.searchTorrent(show.name);
          this._showsService.getSeason(this.id, this.show.number_of_seasons)
            .subscribe(season => {
              this.season = season;
            });
        });
    });

    _router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = _router.parseUrl(_router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) { element.scrollIntoView(element); }
        }
      }
    });
  }

  ngOnInit() {
  }

}
