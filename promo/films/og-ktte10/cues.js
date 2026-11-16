// og-ktte10 score (drop moved to the first pick): cinematic, Eb (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the lift · lift on NOT REALLY · lands under the hug.
import { DURATION, CUES, LIFT, FIRST } from './scenes/index.js'
export default { id: 'og-ktte10', duration: DURATION, music: { style: 'cinematic', key: 'Eb', seed: 2910, sections: { drop: FIRST, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
