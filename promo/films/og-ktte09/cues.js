// og-ktte09 score (drop moved to the first pick): house, A (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the first slam · lift on SOMEONE TO TELL IT TO · lands under the last line.
import { DURATION, CUES, LIFT, FIRST } from './scenes/index.js'
export default { id: 'og-ktte09', duration: DURATION, music: { style: 'house', key: 'A', seed: 2909, sections: { drop: FIRST, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
