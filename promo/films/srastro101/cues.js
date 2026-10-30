// srastro101 score — synthwave, D major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.49: the road appears, the Sun starts its lap · breakdown 35.05 under the slot-machine spin → lift on the SNAP
//   (37.27) · breakdown 46.16 → lift on ★ LESSON UNLOCKED (46.71) · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srastro101', duration: DURATION, music: { style: 'synthwave', key: 'D', seed: 1301, sections: { drop: 4.489, breakdown: [35.05, 46.16], lift: [37.27, 46.71], outroAt: DURATION - 4.4 } }, cues: CUES }
