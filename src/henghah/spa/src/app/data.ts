export class Series {
  title: string;
  cover: string;
  description: string;
  audios: string;
}

export class Transcript {
    start: number;
    end: number;
    content: string;
}

export class Audio {
    title: string;
    audio: string;
    transcripts: Transcript[];
    created_at: string;
    updated_at: string;
}

export class AudioFrame {
  currentTime: number;
  segmentLength: number;
  content: string;
}
