// moonphases score — dreamy, E major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Bell arps + airy pad for the new moon and the seed; the soft groove blooms with the FULL moon (7.27, after the
// waxing riser); the final chord lands on “tonight.” (12.82).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'moonphases', duration: DURATION, music: { style: 'dreamy', key: 'E', seed: 29, sections: { drop: 7.27, build: 2, outroAt: 12.82 } }, cues: CUES }
