// astro101 score — pop, A major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Pop: the verse groove drops at 2.82 (bars land on 20.6, 40.6 and 53.94); breakdown under the slot-machine spin
// (33.38) → chorus lift on the SNAP (35.6); breakdown for “That’s you.” (50.6) → lift on “Now you speak astrology.” (53.94).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'astro101', duration: DURATION, music: { style: 'pop', key: 'A', seed: 71, sections: { drop: 2.82, breakdown: [33.38, 50.6], lift: [35.6, 53.94], outroAt: 57.27 } }, cues: CUES }
