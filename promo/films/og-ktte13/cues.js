// og-ktte13 score (drop moved to the first pick): pop, C (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the first slam · lift on PASTA · lands under the last line.
import { DURATION, CUES, LIFT, FIRST } from './scenes/index.js'
export default { id: 'og-ktte13', duration: DURATION, music: { style: 'pop', key: 'C', seed: 2913, sections: { drop: FIRST, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
