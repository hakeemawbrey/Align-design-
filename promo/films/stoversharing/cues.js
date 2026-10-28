// stoversharing score — pop, C major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). The film agent sets sections.
//   drop 1.16: the screen slams down · breakdown 11.16: the blank therapist slide (tape stop, a cricket) · lift 15.04: fast forward
//   hit 17.82: the counter zooms ("12 / 87") · breakdown 23.38: THE STARS step in · lift 29.49: "…I'd like chapter two." (hearts)
//   breakdown 31.16: LESSON UNLOCKED (the chiptune level-up sits on top) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stoversharing', duration: DURATION, music: { style: 'pop', key: 'C', seed: 12, sections: { drop: 1.156, breakdown: [11.156, 23.378, 31.156], lift: [15.044, 29.489], outroAt: DURATION - 4.4 }, hits: [17.822] }, cues: CUES }
