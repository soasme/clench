import 'rxjs/add/operator/switchMap';
import { Component, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { APIService } from './api.service';
import { Diff, Audio, TrimAudio, Series } from './data';
import { AudioPlayerComponent } from './audio-player.component';

@Component({
  selector: 'audios',
  providers: [ APIService ],
  styles: [
    'ins{ color: black; background: #bbffbb; }',
    'del{ color: black; background: #ffbbbb; }'
  ],
  template: `
  <section class="page-content container">
    <div class="row space-top" *ngIf="this.series">
      <div class="col-md-3 col-sm-6">
        <div class="thumbnail"><img src="{{ this.series.cover }}"></div>
      </div>
      <div class="page-header col-md-8 col-sm-12">
        <h1>{{ this.series.title }}<small>{{ this.series.description }}</small></h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="row" *ngIf="this.series">
          <audio-player></audio-player>
        </div>
        <div class="row" *ngIf="this.series">
          <div *ngFor="let audio of this.audios;">
            <h4 class="block-subheading" (click)="chooseAudio(audio)" [attr.audio]="audio">{{ audio.title }}</h4>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div>
          <textarea #dictationText rows="20" class="form-control"
            placeholder="Write dictation text here."></textarea>
        </div>
        <div *ngIf="this.allowCheck">
          <a type="button" role="button" class="btn btn-primary"
            (click)="checkDiff()">Check</a>
        </div>
        <pre semanticDiff [left]="this.diff.text" [right]="this.diff.origin" *ngIf="this.diff"></pre>
      </div>

    </div>
  </section>
  `
})
export class AudiosComponent{
  allowCheck: boolean;
  series: Series;
  audios: TrimAudio[];
  diff: Diff;
  @Input() slug: string;
  @ViewChild(AudioPlayerComponent) player: AudioPlayerComponent;
  @ViewChild('dictationText') dictationTextarea;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: APIService
  ) {
    this.allowCheck = false;
  }

  chooseAudio(audio): void {
    this.player.setAudio(audio);
    this.allowCheck = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params  => {
      var slug = params['slug'];
      var query = `?slug=${ slug }`;
      this.api.getApi('series', null).then(url=> {
        var api = url + query;
        this.api.getResource(api).then(list => {
          if (list.count == 1) {
            this.series = list.results[0];
            this.api.getResource(this.series.audios_api).then(list => {
              this.audios = list.results;
            })
          }
        })
      })
    });
  }

  checkDiff(): void {
    var text = this.dictationTextarea.nativeElement.value;
    this.diff = this.player.diff(text);
  }
}
