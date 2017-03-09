import { Component, Input, ViewChild, Renderer } from '@angular/core';
import { AudioPlayerService } from './audio-player.service';
import { APIService } from './api.service';
import { Diff, Audio, AudioFrame } from './data';

@Component({
  selector: 'audio-player',
  providers: [AudioPlayerService ],
  template: `
  <div class="controllers" *ngIf="audio">
    <a class="btn btn-xs btn-primary" role="button"
      (click)="playCurrent()">Play(ctrl-p)</a>
    <a class="btn btn-xs btn-primary"  role="button"
      (click)="playNext()">Next(ctrl-n)</a>
    <br>
    <a class="btn btn-xs btn-primary" role="button"
      (click)="pause()">Pause(ctrl-c)</a>
    <a class="btn btn-xs btn-primary"  role="button"
      (click)="reset()">Reset(ctrl-r)</a>
  </div>
  <audio controls #player [attr.src]="audio.audio" *ngIf="audio">
    <source [src]="audio.audio" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  `
})
export class AudioPlayerComponent {
  audio: Audio;
  @ViewChild('player') player;

  progress: number;

  constructor(
    private api: APIService,
    private audioPlayerService: AudioPlayerService,
    public renderer: Renderer
  ) {
    this.setHotKeys();
  }

  setHotKeys(): void {
  }

  setAudio(audio: Audio): void {
    this.api.getResource(audio.audio_api).then(audio => {
      this.audio = audio;
    });
  }

  playFrame(frame: AudioFrame): void {
    var el = this.player.nativeElement;
    el.currentTime = frame.currentTime;
    el.play();
    setTimeout(() => {
      el.pause();
    }, frame.segmentLength * 1000.0);
  }

  diff(text: string): Diff {
    var origin = this.audioPlayerService.getOriginText(this.audio);
    return { origin, text };
  }

  reset(): void {
    this.pause();
    this.audioPlayerService.reset();
    this.playCurrent();
  }

  playCurrent(): void {
    var frame = this.audioPlayerService.getCurrentFrame(this.audio);
    this.playFrame(frame);
  }

  playNext(): void {
    var frame = this.audioPlayerService.getNextFrame(this.audio);
    this.playFrame(frame);
  }

  pause(): void {
    this.player.nativeElement.pause();
  }

}
