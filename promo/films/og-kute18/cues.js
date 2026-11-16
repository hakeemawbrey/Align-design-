// og-kute18 score (social rework of kute18; no end card, the score runs to the hard cut): chiptune, G (arranged by the style engine in promo/scripts/teaser-sound.mjs).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-kute18', duration: DURATION, music: { style: 'chiptune', key: 'G', seed: 3618, sections: { drop: 1.3, outroAt: DURATION - 1.8 } }, cues: CUES }
