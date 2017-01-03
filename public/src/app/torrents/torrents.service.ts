import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/map';
import { API_URL } from '../app.config';
import { Torrent } from './torrent';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class TorrentsService {

  private port = environment.production ? 80 : 3000;
  private socket: SocketIOClient.Socket = io(window.location.protocol + '//' + window.location.hostname + `:${this.port}`);

  torrentList(): Observable<Torrent[]> {
    return this._http.get(`${API_URL}/torrents/`)
      .map(res => res.json());
  }

  socketList(): Observable<Torrent[]> {
    let observable = Observable.create((obs: Observer<any>) => {
      this.socket.on('torrents', (torrents: {torrents: Torrent[]}) => {
        obs.next(torrents.torrents);
      });
    });
    return observable;
  }

  constructor(private _http: Http) { }

}
