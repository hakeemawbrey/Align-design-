// og-ktte11 score (drop moved to the first pick): synthwave, F# (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the dodge · lift on SAY THE FEELING · rings into the loop.
import { DURATION, CUES, LIFT, FIRST } from './scenes/index.js'
export default { id: 'og-ktte11', duration: DURATION, music: { style: 'synthwave', key: 'F#', seed: 2911, sections: { drop: FIRST, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
