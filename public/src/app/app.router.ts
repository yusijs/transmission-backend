import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { tokenNotExpired } from 'angular2-jwt';
import { HomeComponent } from './home/home.component';



export const routes: Routes = [
  { 'path': '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', redirectTo: '/home'},
  { path: 'home', component: HomeComponent }
];

export const APP_ROUTER_PROVIDERS: any[] = [
];

export const APP_ROUTER: ModuleWithProviders = RouterModule.forRoot(routes);