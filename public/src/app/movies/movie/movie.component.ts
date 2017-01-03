import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../movie';
import { Torrents } from '../../shared/torrents';

import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private id: number;
  private title: string;
  private movie: Movie;
  private torrentResults: Torrents;

  constructor(private _moviesService: MoviesService, private _route: ActivatedRoute) {
    this._route.params.subscribe(params => {
      this.id = +params['id'];
      this.title = params['title'].replace(/_/g, ' ');
      this._moviesService.findMovieById(this.id)
        .subscribe(movie => {
          this.movie = movie;
        });
      this._moviesService.searchTorrent(this.title)
        .subscribe(torrentResults => this.torrentResults = torrentResults);

    });
  }

  ngOnInit() {
  }

}
