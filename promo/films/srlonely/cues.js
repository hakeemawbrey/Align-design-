// srlonely score — chiptune, Fm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: the quiet 2 AM scroll and the small talk dying (womp + crickets at 11.2) · drop 13.93: the card cut into the
//   talk card · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srlonely', duration: DURATION, music: { style: 'chiptune', key: 'Fm', seed: 901, sections: { drop: T.cut1, outroAt: DURATION - 4.4 }, hits: [T.flip[1], T.hearts] }, cues: CUES }
