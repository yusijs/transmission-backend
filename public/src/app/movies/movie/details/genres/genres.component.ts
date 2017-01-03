import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  @Input('genres') genres: Genre[];

  constructor() { }

  ngOnInit() {
  }

}

interface Genre {
  id: number;
  name: string;
}
