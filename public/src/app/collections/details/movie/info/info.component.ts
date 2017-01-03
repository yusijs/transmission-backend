import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input('released') released: Date;
  @Input('rating') rating: Number;

  constructor() { }

  ngOnInit() {
  }

}
