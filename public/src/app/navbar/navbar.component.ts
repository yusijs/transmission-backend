import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public dataSource: any;
  public asyncSelected: string = '';

  constructor(private _sharedService: SharedService, private _router: Router) {
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    }).mergeMap((token: string) => this._sharedService.searchAll(token));

    this._sharedService.socketList()
      .subscribe(data => {
        console.log(data);
      });
  }

  public typeaheadOnSelect(e: any): void {
    console.log('Selected value: ', e.item.item);
    switch (e.item.item.type) {
      case 'TV':
        this._router.navigate(['tv', e.item.item.id, e.item.item.name.replace(/\s/g, '_').replace(/[^\w\s!?]/g, '')]);
        break;
      case 'Movies':
        this._router.navigate(['movies', e.item.item.id, e.item.item.title.replace(/\s/g, '_').replace(/[^\w\s!?]/g, '')]);
        break;
      default:
        console.error('Failed to pinpoint type', e.item.item.type);
        break;
    }
  }

  ngOnInit() {
  }

}
