import { Component } from '@angular/core';
import { APIService } from './api.service';
import { Series } from './data';

@Component({
  selector: 'series-list',
  providers: [APIService],
  template: `
  <ul>
    <li *ngFor="let series of seriesList; let i = index; ">
      <div>
        <div>
          <img src="{{ series.cover }}">
        </div>
        <div>
          <h2>{{ series.title }}</h2>
          <p>{{ series.description }}</p>
          <a routerLink="/audios" routerLinkActive="active">Audios</a>
        </div>
      </div>
    </li>
  </ul>
  `
})
export class SeriesListComponent {

  seriesList: Series[];

  constructor(
    private api: APIService
  ) {}

  ngOnInit(): void {
    this.api.getApi('series', null).then(url=>
      this.api.getResource(url).then(list => {
        this.seriesList = list;
      })
    )
  }

}

