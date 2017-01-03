import { Component, OnInit, Input, Output } from '@angular/core';

import { ShowsService } from '../../shows.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  @Input('season') season: any; // Needs interface

  constructor(private _showsService: ShowsService) {
  }

  ngOnInit() {
  }

}
