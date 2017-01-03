import { Component, OnInit, Input } from '@angular/core';
import { Movie} from '../../movie';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input('details') details: Movie;

  constructor() { }

  ngOnInit() {
  }

}
