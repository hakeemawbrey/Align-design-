// og-ktte07 score (drop moved to the first pick): jazzy, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the first buzzer · lift on WHAT I WANT · lands under the last line.
import { DURATION, CUES, LIFT, FIRST } from './scenes/index.js'
export default { id: 'og-ktte07', duration: DURATION, music: { style: 'jazzy', key: 'Bb', seed: 2907, sections: { drop: FIRST, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
