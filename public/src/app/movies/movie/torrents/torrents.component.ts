import { Component, OnInit, Input } from '@angular/core';
import { Torrents } from '../../../shared/torrents';

@Component({
  selector: 'app-torrents',
  templateUrl: './torrents.component.html',
  styleUrls: ['./torrents.component.css']
})
export class TorrentsComponent implements OnInit {

  @Input('torrents') torrents: Torrents;

  constructor() { }

  ngOnInit() {
  }

}
