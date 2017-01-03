import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Collection } from './details/collection';
import { Torrents } from '../shared/torrents'; 
import { API_URL } from '../app.config';

@Injectable()
export class CollectionsService {

  getCollectionInfo(id: number): Observable<Collection> {
    return this._http.get(`${API_URL}/collections/${id}`)
      .map(res => res.json());
  }


  searchTorrent(query: string): Observable<Torrents> {
    return this._http.get(`${API_URL}/torrent-api/movie/${query}`)
      .map(res => res.json());
  }

  constructor(private _http: Http) { }

}
