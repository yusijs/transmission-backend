import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public availableFields = ['sort_by', 'certification_country', 'certification', 'certification.lte', 'include_adult', 'include_video',
    'page', 'primary_release_year', 'primary_release_date.gte', 'primary_release_date.lte', 'release_date.gte', 'release_date.lte',
    'vote_count.gte', 'vote_count.lte', 'vote_average.gte', 'vote_average.lte', 'with_cast', 'with_crew', 'with_companies',
    'with_genres', 'with_keywords', 'with_people', 'year', 'without_genres', 'with_runtime.gte', 'with_runtime.lte'];

  public sortableFields = ['popularity.asc', 'popularity.desc', 'release_date.asc', 'release_date.desc', 'revenue.asc', 'revenue.desc',
    'primary_release_date.asc', 'primary_release_date.desc', 'original_title.asc', 'original_title.desc', 'vote_average.asc',
    'vote_average.desc', 'vote_count.asc', 'vote_count.desc'];

  public certifications: any[] = [];
  public pages = 0;
  public total_results = 0;
  public page = 1;
  public selects = {
    with_genres: [] as Genre[],
    without_genres: [] as Genre[],
    sort_by: this.sortableFields,
    'certification': [],
    'certification.lte': []
  };

  public genres: { [propName: string]: string } = {};

  public formFields = {
    sort_by: {
      title: 'Sort By',
      placeholder: 'Order results by',
      type: 'select',
      multiple: false,
      validator: []
    },
    'certification': {
      title: 'Certification',
      placeholder: 'Filter and only include movies that matches this choice',
      type: 'select',
      validator: []
    },
    'certification.lte': {
      title: 'Certification less than or equal',
      placeholder: 'Filter and only include movies that have a certification that is less than or equal to the specified value.',
      type: 'select',
      validator: []
    },
    include_adult: {
      title: 'Include Adult',
      type: 'boolean',
      validator: []
    },
    include_video: {
      title: 'Include videos',
      type: 'boolean',
      validator: []
    },
    primary_release_year: {
      title: 'Released Year',
      placeholder: 'A filter to limit the results to a specific primary release year.',
      type: 'number',
      validator: []
    },
    'primary_release_date.gte': {
      title: 'Minimum Primary Release Date',
      placeholder: 'Filter and only include movies that have a primary release date that is greater or equal to the specified value.',
      type: 'date',
      validator: []
    },
    'primary_release_date.lte': {
      title: 'Maximum Primary Release Date',
      placeholder: 'Filter and only include movies that have a primary release date that is less than or equal to the specified value.',
      type: 'date',
      validator: []
    },
    'vote_count.gte': {
      title: 'Minimum number of votes',
      placeholder: 'Filter and only include movies that have a vote count that is greater or equal to the specified value.',
      type: 'number',
      validator: []
    },
    'vote_count.lte': {
      title: 'Maximum number of votes',
      placeholder: 'Filter and only include movies that have a vote count that is less than or equal to the specified value.',
      type: 'number',
      validator: []
    },
    'vote_average.gte': {
      title: 'Minimum Average Vote',
      placeholder: 'Filter and only include movies that have a rating that is greater or equal to the specified value.',
      type: 'number',
      validator: []
    },
    'vote_average.lte': {
      title: 'Maximum Average Vote',
      placeholder: 'Filter and only include movies that have a rating that is less than or equal to the specified value.',
      type: 'number',
      validator: []
    },
    with_genres: {
      title: 'Include Genres',
      type: 'multi-select',
      validator: []
    },
    without_genres: {
      title: 'Exclude Genres',
      type: 'multi-select',
      validator: []
    },
    'with_runtime.gte': {
      title: 'Minimum runtime',
      type: 'number',
      placeholder: 'Filter and only include movies that have a runtime that is greater or equal to a value (minutes)',
      validator: []
    },
    'with_runtime.lte': {
      title: 'Maximum runtime',
      type: 'number',
      placeholder: 'Filter and only include movies that have a runtime that is less than or equal to a value (minutes)',
      validator: []
    }
  };

  private movies: any;
  private form: FormGroup;

  changePage(event) {
    this.page = event.page;
    let query = this.form.value;
    query['page'] = this.page;
    this._moviesService.discoverMovies(query)
      .subscribe(movies => {
        this.movies = movies.results;
        document.querySelector('.navbar-header').scrollIntoView({
          behavior: 'smooth'
        });
      });
  }

  submitForm(values = this.form.value) {
    this._moviesService.discoverMovies(values)
      .subscribe(movies => {
        this.movies = movies.results;
        this.pages = movies.total_pages;
        this.total_results = movies.total_results;
      });
  }

  logEvent(e) {
    let certification = e.target.value.split('\'')[1];
    let name = e.target.name;
    let meaning;
    this.certifications.filter(value => {
      if (value.certification === certification) {
        meaning = value.meaning;
      }
    });
    this.formFields[name].meaning = meaning;
  };

  constructor(private _moviesService: MoviesService, private _formBuilder: FormBuilder) {


    this.form = this._formBuilder.group({});

    for (let i of this.availableFields) {
      this.form.addControl(i, new FormControl());
    }

    this.form.valueChanges.debounceTime(300).subscribe(values => {
      this.submitForm(values);
    });

    this._moviesService.getGenres()
      .subscribe(genres => {
        this.selects.with_genres = genres;
        this.selects.without_genres = genres;
        genres.map(value => {
          this.genres[value.id] = value.name;
        });
      });

    this._moviesService.getCertifications()
      .subscribe(certifications => {
        this.certifications = certifications;
        let stringCertifications: string[] = [];
        certifications.map(value => {
          stringCertifications.push(value.certification);
        });
        this.selects['certification'] = stringCertifications;
        this.selects['certification.lte'] = stringCertifications;
      });

  }

  ngOnInit() {
  }

}

interface Genre {
  id: number;
  name: string;
}
