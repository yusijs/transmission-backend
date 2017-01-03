import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { API_URL } from '../app.config';

@Injectable()
export class ShowsService {

  getShow(id: number): Observable<any> {
    return this._http.get(`${API_URL}/series/find/${id}`)
      .map(res => res.json());
  }

  discoverShows(query: Object): Observable<Response> {
    let params = new URLSearchParams();
    for (let i in query) {
      params.set(i, query[i]);
    }
    return this._http.get(`${API_URL}/discover/series`, { search: params })
      .map(res => res.json());
  }

  showGenres(): Observable<Genre[]> {
    return this._http.get(`${API_URL}/discover/series/genres`)
      .map(res => res.json());
  }

  getSeason(showId: number, season = 0): Observable<any> {
    return this._http.get(`${API_URL}/series/find/season/${showId}/${season}`)
      .map(res => res.json());
  }

  constructor(private _http: Http) { }

}

interface Response {
  results: any[];
  page: number;
  total_results: number;
  total_pages: number;
}


interface Genre {
  id: number;
  name: string;
}
