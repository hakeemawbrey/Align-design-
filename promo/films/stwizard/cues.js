// stwizard score — chiptune, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: the cauldron bubbles · drop 5.04: the brew (petals, moonlight, three glugs, KA-BLOOP at 11.16) ·
//   17.55 the record scratch tape-stops into silence as Taurus's eyes drift to the chair · lift 18.38: "It worked. On a
//   chair." · breakdown 22.82: Professor Saturn wakes, the potion wears off, ★ LESSON UNLOCKED, the card · lift 37.27:
//   "Class dismissed." and the bell · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'stwizard', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 24, sections: { drop: BEAT(8), breakdown: [BEAT(40)], lift: [BEAT(32), BEAT(66)], outroAt: DURATION - 4.4 } }, cues: CUES }
