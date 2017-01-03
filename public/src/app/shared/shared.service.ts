import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

import { API_URL, API_KEY } from '../app.config';

import { Observable, Observer } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {

  private port = environment.production ? 80 : 3000;
  private socket: SocketIOClient.Socket = io(window.location.protocol + '//' + window.location.hostname + `:${this.port}`);

  socketList(): Observable<any[]> {
    let observable = Observable.create((obs: Observer<any>) => {
      this.socket.on('newtorrents', (torrents: { torrents: any[] }) => {
        obs.next(torrents);
      });
    });
    return observable;
  }

  searchMovies(query: string): Observable<any> {
    let params = new URLSearchParams();
    params.set('query', query);
    params.set('api_key', API_KEY);
    return this._http.get(`${API_URL}/movies/find/`, { search: params })
      .map(res => res.json().results.slice(0, 10).map(values => {
        values.title = values.original_title;
        values.type = 'Movies';
        return values;
      }));
  }

  searchSeries(query: string): Observable<any> {
    let params = new URLSearchParams();
    params.set('query', query);
    params.set('api_key', API_KEY);
    return this._http.get(`${API_URL}/series/find/`, { search: params })
      .take(2)
      .map(res => res.json().results.slice(0, 10).map(values => {
        values.title = values.original_name;
        values.type = 'TV';
        return values;
      }));
  }

  searchAll(query: string): Observable<any> {
    return Observable.forkJoin(
      this.searchMovies(query), this.searchSeries(query)
    ).map(values => {
      return [].concat.apply([], values).sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    });
  }

  searchTorrent(tvOrMovie: string, name: string, season?: number, episode?: number): Observable<any> {
    let params = new URLSearchParams();
    if (season) {
      params.set('season', season.toString());
    }
    if (episode) {
      params.set('episode', episode.toString());
    }
    return this._http.get(`${API_URL}/torrent-api/${tvOrMovie}/${name}`, { search: params })
      .map(res => res.json());
  }

  addTorrentByUrl(type, name, id): Observable<any> {
    return this._http.post(`${API_URL}/torrents/add/url`, { type, filename: name, id })
      .map(res => res.json());
  }

  constructor(private _http: Http) { }

}
