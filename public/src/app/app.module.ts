import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TypeaheadModule, DropdownModule } from 'ng2-bootstrap';

import { APP_ROUTER_PROVIDERS, APP_ROUTER } from './app.router';

import { MoviesModule } from './movies/movies.module';
import { ShowsModule } from './shows/shows.module';
import { SharedModule } from './shared/shared.module';
import { CollectionsModule } from './collections/collections.module';
import { TorrentsModule } from './torrents/torrents.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTER,
    RouterModule,
    MoviesModule,
    ShowsModule,
    TorrentsModule,
    CollectionsModule,
    SharedModule,
    TypeaheadModule,
    DropdownModule
  ],
  providers: [APP_ROUTER_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
