import { Component, OnInit } from '@angular/core';
import { TorrentsService } from './torrents.service';
import { Torrent } from './torrent';
// import { IntervalObservable } from 'rxjs/Observable/IntervalObservable';

@Component({
  selector: 'app-torrents',
  templateUrl: './torrents.component.html',
  styleUrls: ['./torrents.component.css']
})
export class TorrentsComponent implements OnInit {

  public torrents: Torrent[] = [];
  public uploading: number = 0;
  public downloading: number = 0;

  public stateChanged(event) {
    this._torrentsService.changeStatus(event)
      .subscribe(status => {
        console.log(status);
      });
    console.log(event);
  }

  constructor(private _torrentsService: TorrentsService) {
    this._torrentsService.socketList().subscribe(torrents => {
      this.torrents = torrents;
      this.uploading = 0;
      this.downloading = 0;
      torrents.map(value => {
        if (value.rateUpload > 0 && value.rateDownload === 0) {
          this.uploading += 1;
        }
        if (value.rateDownload > 0) {
          this.downloading += 1;
        }
      });
    });
  }

  ngOnInit() {
  }

}
