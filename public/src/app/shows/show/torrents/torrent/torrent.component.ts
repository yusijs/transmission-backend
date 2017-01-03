import { Torrent } from './../../../../torrents/torrent';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.css']
})
export class TorrentComponent implements OnInit {
  @Input('torrent') torrent: Torrent;

  constructor() { }

  ngOnInit() {
  }

}
