import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../collection';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input('movie') movie: Movie;
  @Output('movieEvent') movieEvent = new EventEmitter();

  emitMovie(e) {
    this.movieEvent.emit(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
