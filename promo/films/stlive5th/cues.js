// stlive5th score — funk, Am (A dorian), 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). The film agent sets sections.
//   drop 1.71: the TV clicks on, "AND WE'RE LIVE" · breakdown 11.71: the freeze (record scratch at 11.4), small talk + dead air run thin
//   lift 27.27: "A TALK CARD!" · breakdown 33.94: the drumroll plays alone · hit 37.27: the flip · lift 40.6: the booth erupts
//   breakdown 46.16: LESSON UNLOCKED (the chiptune level-up sits on top) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stlive5th', duration: DURATION, music: { style: 'funk', key: 'Am', seed: 55, sections: { drop: 1.71, breakdown: [11.71, 33.94, 46.16], lift: [27.27, 40.6], outroAt: DURATION - 4.4 }, hits: [37.27] }, cues: CUES }
