import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Torrent } from '../../../torrents/torrent';

@Component({
  selector: 'app-torrents',
  templateUrl: './torrents.component.html',
  styleUrls: ['./torrents.component.css']
})
export class TorrentsComponent implements OnInit {

  @Input('torrents') torrents: Torrents;
  @Output('emitTorrent') emitTorrent = new EventEmitter();

  getTorrent(event) {
    this.emitTorrent.emit(event);
  }

  constructor() { }

  ngOnInit() {
  }

}

interface Torrents {
  data: {
    pages: number;
    torrents: Torrent[];
    total: number;
  };
  status: number;
}
