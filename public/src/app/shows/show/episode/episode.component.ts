import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {

  @Input('episodes') episodes: any[]; // Needs interface
  public currentEpisode: number = 1;

  changeEpisode(episode: number) {
    this.currentEpisode = episode;
  }

  constructor() { }

  ngOnInit() {
  }

}
