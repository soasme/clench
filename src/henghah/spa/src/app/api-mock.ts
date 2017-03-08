import { Transcript, Audio } from './data';

export const AUDIO: Audio = {
    title: "mock audio",
    audio: "http://mock.aud.io/audios/1/",
    transcripts: [{
        start: 0,
        end: 500,
        content: '5 seconds text'
        }, {
        start: 500,
        end: 1500,
        content: '10 seconds text'
        }
        ],
    created_at: 'today',
    updated_at: 'today',
}
