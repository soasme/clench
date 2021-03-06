import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Transcript, Audio, AudioFrame } from './data';

@Injectable()
export class AudioPlayerService {

  current: number;

  constructor(private api: APIService) {
    this.current = 0;
  }

  getAudio(): Promise<Audio> {
    return this.api.getApi('audios', 6).then(
      api => this.api.getAudio(api)
    )
  }

  reset(): void {
    this.current = 0;
  }

  TranformTranscriptToFrame(transcript: Transcript): AudioFrame {
    return {
      currentTime: transcript.start / 100.0,
      segmentLength: (transcript.end - transcript.start) / 100.0,
      content: transcript.content
    };
  }

  getOriginText(audio: Audio): string {
    var str = "";
    var i: number;
    for (i = 0; i < audio.transcripts.length; i++) {
      str += audio.transcripts[i].content;
      str += '\n';
    }
    return str;
  }

  getCurrentFrame(audio: Audio): AudioFrame {
    this.current = this.current || 0;
    var transcript = audio.transcripts[this.current];
    return this.TranformTranscriptToFrame(transcript);
  }

  getNextFrame(audio: Audio): AudioFrame {
    if (this.current < audio.transcripts.length) {
      this.current = this.current + 1;
      var transcript = audio.transcripts[this.current];
      return this.TranformTranscriptToFrame(transcript);
    } else {
      alert('No next');
    }
  }

}
