import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionsService } from '../collections.service';
import { Collection, Movie } from './collection';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  private collection: Collection;
  private title: string;
  private id: number;
  private movie: Movie;
  private torrents;

  movieDetails(event) {
    this.movie = event;
    this._collectionsService.searchTorrent(this.movie.title)
      .subscribe(torrents => {
        this.torrents = torrents;
      });
  }

  constructor(private _collectionsService: CollectionsService, private _route: ActivatedRoute) {
    this._route.params.subscribe(params => {
      this.id = +params['id'];
      this.title = params['title'];
      let torrentCollection = this.title.replace(' Collection', '');

      this._collectionsService.searchTorrent(torrentCollection)
        .subscribe(torrents => this.torrents = torrents);

      this._collectionsService.getCollectionInfo(this.id)
        .subscribe(collection => {
          this.collection = collection;
        });
    });
  }

  ngOnInit() {
  }

}
