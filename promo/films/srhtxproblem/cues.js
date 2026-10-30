// srhtxproblem score — cinematic, D minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pads, strings and the arp under the Mission Control alarm and the swipe blur; the ABORT slam cuts it with a tape stop;
// the drop lands as the mystery card does (8.93 = beat 15); a crash + sub hit for "we have a solution" (12.82), ringing
// out under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxproblem', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 17101, sections: { drop: 8.934, outroAt: DURATION - 4.4 }, hits: [12.823] }, cues: CUES }
