import { Component } from '@angular/core';
import { APIService } from './api.service';
import { Series } from './data';


@Component({
  selector: 'series-list',
  providers: [APIService ],
  template: `

  <section class="page-content container">
    <div class="row space-top">
      <div class="col-md-9 col-sm-7">
        <div class="col-md-6" *ngFor="let series of seriesList; let i = index; ">
          <div class="thumbnail with-caption">
            <img src="{{ series.cover }}" alt="{{ series.title }}">
            <div class="caption">
              <h4>{{ series.title }}</h4>
              <span class="text-muted">{{ series.updated_at }}</span>
              <p>{{ series.description }}</p>
              <a class="btn btn-primary" role="button" routerLink="/series/{{ series.slug }}" audios_api="series.audio_api" routerLinkActive="active">Audios</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

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
        this.seriesList = list.results;
      })
    )
  }



}

