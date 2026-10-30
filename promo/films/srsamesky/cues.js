// srsamesky score — house, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: two windows, same moon, never met (womp at 10.9) · drop 13.93: the card cut into the stars drawing the line ·
//   hits on the line locking (16.45) and the windows turning gold (21.65) · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srsamesky', duration: DURATION, music: { style: 'house', key: 'F', seed: 902, sections: { drop: T.cut1, outroAt: DURATION - 4.4 }, hits: [T.lock, T.gold] }, cues: CUES }
