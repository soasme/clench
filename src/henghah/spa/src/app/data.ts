export class Series {
  slug: string;
  title: string;
  cover: string;
  description: string;
  audios_api: string;
}

export class Transcript {
    start: number;
    end: number;
    content: string;
}

export class TrimAudio {
  title: string;
  audio_api: string;
  created_at: string;
  updated_at: string;
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
