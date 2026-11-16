// og-ktte05 score (drop moved to the first pick): pop, G (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the spotlight leap · lift on ASK ABOUT THEM · lands under the last line.
import { DURATION, CUES, LIFT, FIRST } from './scenes/index.js'
export default { id: 'og-ktte05', duration: DURATION, music: { style: 'pop', key: 'G', seed: 2905, sections: { drop: FIRST, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
