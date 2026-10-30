// srhtxhoods score — cinematic, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands with the Aries star (2.82; one sign every 4 beats); it breaks down for the turn "Know your sign?"
// (29.49), lifts on the LESSON (33.93) and carries "Tag your neighborhood." (37.82); the end card lands at 40.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxhoods', duration: DURATION, music: { style: 'cinematic', key: 'A', seed: 23303, sections: { drop: 2.822, breakdown: 29.489, lift: 33.933, outroAt: DURATION - 4.4 }, hits: [31.1] }, cues: CUES }
