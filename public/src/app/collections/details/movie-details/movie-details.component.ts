import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../collection';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Input('movie') movie: Movie;

  constructor() { }

  ngOnInit() {
  }

}
