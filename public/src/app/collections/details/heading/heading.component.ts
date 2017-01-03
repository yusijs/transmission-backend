import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '../collection';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {
  @Input('title') title: string;
  @Input('collection') collection: Collection;

  constructor() { }

  ngOnInit() {
  }

}
