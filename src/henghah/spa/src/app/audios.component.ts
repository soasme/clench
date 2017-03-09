import { Component, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { APIService } from './api.service';
import { Audio, TrimAudio, Series } from './data';
import { AudioPlayerComponent } from './audio-player.component';

@Component({
  selector: 'audios',
  providers: [ APIService ],
  template: `
  <div *ngIf="this.series">
  <h2>{{ this.series.title }}</h2>
  <div><img src="{{ this.series.cover }}"></div>
  <h3>Audios</h3>
  <audio-player></audio-player>
  <ul>
    <li *ngFor="let audio of this.audios;">
      <div (click)="chooseAudio(audio)" [attr.audio]="audio">{{ audio.title }}</div>
    </li>
  </ul>
  </div>
  `
})
export class AudiosComponent{
  series: Series;
  audios: TrimAudio[];
  @Input() slug: string;
  @ViewChild(AudioPlayerComponent) player: AudioPlayerComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: APIService
  ) {}

  chooseAudio(audio): void {
    this.player.setAudio(audio);
  }

  ngOnInit(): void {
    this.api.getApi('series', null).then(url=> {
      var api = url + `?slug=${ this.route.params.value['slug']}`;
      this.api.getResource(api).then(list => {
        if (list.count == 1) {
          this.series = list.results[0];
          this.api.getResource(this.series.audios_api).then(list => {
            this.audios = list.results;
          })
        }
      })
    })
  }
}
