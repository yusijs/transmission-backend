import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {

  @Input('movies') movies: any[];

  constructor() { }

  ngOnInit() {
  }

}
