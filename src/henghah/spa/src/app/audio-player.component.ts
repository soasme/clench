import { Component, Input, ViewChild, Renderer } from '@angular/core';
import { AudioPlayerService } from './audio-player.service';
import { Audio, AudioFrame } from './data';

@Component({
  selector: 'audio-player',
  providers: [AudioPlayerService],
  template: `<div class="progress">{{ formatProgress()}}</div>
  <div class="controllers">
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
  @Input() audio: Audio;
  @ViewChild('player') player;

  progress: number;

  constructor(
    private audioPlayerService: AudioPlayerService,
    public renderer: Renderer
  ) { }

  getAudio(): void {
    this.audioPlayerService.getAudio().then(
      audio => {
        this.audio = audio;
        console.log(audio.audio);
        this.renderer.setElementAttribute(this.player, 'src', audio.audio);
      }
    );
  }


  ngOnInit(): void {
    this.getAudio();
    this.progress = 0;
  }

  formatProgress(): string {
    return '00:00:00';
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
