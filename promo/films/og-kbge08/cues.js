// og-kbge08 score (social rework of kbge08): screwed, Fm (arranged by the style engine in promo/scripts/teaser-sound.mjs). No end card.
//   drop at the pattern break · breakdown on the red pen · lift on the glow-up · hit on the last line.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-kbge08', duration: DURATION, music: { style: 'screwed', key: 'Fm', seed: 3408, sections: { drop: T.fx, breakdown: [T.strike[0]], lift: [T.glow], outroAt: DURATION - 0.6 }, hits: [T.last + 0.3] }, cues: CUES }
