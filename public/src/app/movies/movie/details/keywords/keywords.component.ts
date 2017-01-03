import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css']
})
export class KeywordsComponent implements OnInit {

  @Input('keywords') keywords: Keywords;

  constructor() { }

  ngOnInit() {
  }

}

interface Keywords {
  id: number;
  name: string;
}
