import { Component, Input, ViewChild, Renderer } from '@angular/core';
import { AudioPlayerService } from './audio-player.service';
import { APIService } from './api.service';
import { Audio, AudioFrame } from './data';

@Component({
  selector: 'audio-player',
  providers: [AudioPlayerService],
  template: `
  <div class="controllers" *ngIf="audio">
    <div class="play current"
      (click)="playCurrent()">Play</div>
    <div class="play next"
      (click)="playNext()">Next</div>
    <div class="pause"
      (click)="pause()">Pause</div>
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
  ) { }

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
