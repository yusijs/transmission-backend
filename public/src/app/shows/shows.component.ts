import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ShowsService } from './shows.service';

@Component({
    selector: 'app-shows',
    templateUrl: './shows.component.html',
    styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

    public availableFields = ['air_date.lte', 'first_air_date.gte', 'first_air_date.lte', 'first_air_date_year', 'vote_average.gte',
        'vote_count.gte', 'with_genres', 'without_genres', 'with_runtime.gte', 'with_runtime.lte'];

    public selects = {
        with_genres: [],
        without_genres: []
    };

    public formFields = {
        sort_by: {
            title: 'Sort By',
            placeholder: 'Order results by',
            type: 'select',
            multiple: false,
            validator: []
        },
        'air_date.gte': {
            title: 'Latest air date',
            placeholder: `Filter and only include TV shows that have a air date (by looking at all episodes) 
      that is greater or equal to the specified value.`,
            type: 'date',
            validator: []
        },
        'air_date.lte': {
            title: 'Earliest air date',
            placeholder: `Filter and only include TV shows that have a air date (by looking at all episodes) 
      that is less than or equal to the specified value.`,
            type: 'date',
            validator: []
        },
        'first_air_date.gte': {
            title: 'Earliest first air date',
            placeholder: `Filter and only include TV shows that have a original air date that is greater or equal to the specified value`,
            type: 'date',
            validator: []
        },
        'first_air_date.lte': {
            title: 'Latest first air date',
            placeholder: `Filter and only include TV shows that have a original air date that is less than or equal to the specified value`,
            type: 'date',
            validator: []
        },
        'first_air_date_year': {
            title: 'First aired year',
            placeholder: `Filter and only include TV shows that have a original air date year that equal to the specified value.`,
            type: 'number',
            validator: []
        },
        'vote_average.gte': {
            title: 'Minimum Vote Average',
            placeholder: `Filter and only include movies that have a rating that is greater or equal to the specified value.`,
            type: 'number',
            validator: []
        },
        'vote_count.gte': {
            title: 'Minimum Vote Count',
            placeholder: `Filter and only include movies that have a rating that is less than or equal to the specified value.`,
            type: 'number',
            validator: []
        },
        'with_genres': {
            title: 'Include Genres',
            type: 'multi-select',
            validator: []
        },
        'without_genres': {
            title: 'Exclude Genres',
            type: 'multi-select',
            validator: []
        },
        'with_runtime.gte': {
            title: 'Minimum Runtime',
            placeholder: `Filter and only include movies that have a runtime that is greater or equal to a value.`,
            type: 'number',
            validator: []
        },
        'with_runtime.lte': {
            title: 'Maximum Runtime',
            placeholder: `Filter and only include movies that have a runtime that is less than or equal to a value.`,
            type: 'number',
            validator: []
        },
    };


    public genres: any[];
    public page = 0;
    public pages = 0;
    public total_results = 0;
    private form: FormGroup;
    private shows: any[];

    changePage(event) {
        this.page = event.page;
        let query = this.form.value;
        query['page'] = this.page;
        this._showsService.discoverShows(query)
            .subscribe(shows => {
                this.shows = shows.results;
                document.querySelector('.navbar-header').scrollIntoView({
                    behavior: 'smooth'
                });
            });
    }
    submitForm() {
        this._showsService.discoverShows(this.form.value)
            .subscribe(shows => {
                this.shows = shows.results;
                this.pages = shows.total_pages;
                this.total_results = shows.total_results;
            });
    }

    constructor(private _showsService: ShowsService, private _formBuilder: FormBuilder) {

        this.form = this._formBuilder.group({});

        for (let i of this.availableFields) {
            this.form.addControl(i, new FormControl());
        }

        this._showsService.showGenres()
            .subscribe(genres => {
                this.genres = genres;
                this.selects.with_genres = genres;
                this.selects.without_genres = genres;
            });
    }

    ngOnInit() {
    }

}
