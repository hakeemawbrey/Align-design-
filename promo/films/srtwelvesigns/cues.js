// srtwelvesigns score — funk, D, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs). The groove
// drops as Aries hops up (3.38; six beats per sign); a breakdown under the LESSON (43.93); the lift for the card (48.5)
// through "Tag your sign."; the hit on Leo's spotlight (16.71); outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srtwelvesigns', duration: DURATION, music: { style: 'funk', key: 'D', seed: 1212, sections: { drop: 3.378, breakdown: T.lesson, lift: T.card, outroAt: DURATION - 4.4 }, hits: [16.711] }, cues: CUES }
