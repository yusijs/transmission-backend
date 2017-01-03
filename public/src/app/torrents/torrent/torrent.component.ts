import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Torrent } from '../torrent';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.css']
})
export class TorrentComponent implements OnInit {
  @Input('torrent') torrent: Torrent;
  @Output('details') details = new EventEmitter();
  @Output('changeState') changeState = new EventEmitter();

  progressType(percentDone) {
    let type: string;
    switch (percentDone) {
      case 1:
        type = 'success';
        break;
      default:
        type = 'primary';
        break;
    }
    return type;
  }

  torrentStatus(status: number, id: number) {
    let newStatus;
    switch (status) {
      case 0:
        newStatus = 'start';
        break;
      case 4:
        newStatus = 'stop';
        break;
      case 6:
        newStatus = 'stop';
        break;
      default:
        newStatus = 'start';
        break;
    }
    this.changeState.emit({
      status: newStatus,
      id
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
