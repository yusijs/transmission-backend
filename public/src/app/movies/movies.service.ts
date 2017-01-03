import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Movie } from './movie';
import { Torrents } from '../shared/torrents';

import { API_URL, API_KEY } from '../app.config';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class MoviesService {

  searchMovies(query: string): Observable<Movie[]> {
    let params = new URLSearchParams();
    params.set('query', query);
    params.set('api_key', API_KEY);
    return this._http.get(`${API_URL}/movies/find/`, { search: params })
      .map(res => res.json());
  }

  getGenres(): Observable<Genre[]> {
    return this._http.get(`${API_URL}/discover/movies/genres`)
      .map(res => res.json());
  }

  getCertifications(): Observable<Certification[]> {
    return this._http.get(`${API_URL}/discover/movies/certifications`)
      .map(res => res.json());
  }

  discoverMovies(query: Object): Observable<Response> {
    let params = new URLSearchParams();
    for (let i in query) {
      params.set(i, query[i]);
    }
    params.set('certification_country', 'US');
    return this._http.get(`${API_URL}/discover/movies`, { search: params })
      .map(res => res.json());
  }

  findMovieById(id: number): Observable<Movie> {
    return this._http.get(`${API_URL}/movies/find/${id}`)
      .map(res => res.json());
  }

  searchTorrent(query: string): Observable<Torrents> {
    return this._http.get(`${API_URL}/torrent-api/movie/${query}`)
      .map(res => res.json());
  }

  constructor(private _http: Http) { }

}

interface Genre {
  id: number;
  name: string;
}

interface Response {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}

interface Certification {
  'certification': string;
  'meaning': string;
  'order': number;
}
