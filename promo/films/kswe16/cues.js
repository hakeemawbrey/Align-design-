// kswe16 score: cinematic, D (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 75.0.
//   drop 5.0: the panic · breakdowns 18.0 (plan), 47.0 (the twist) · lifts 31.0 (the date), 56.2 (the fountain), 61.0 (back).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kswe16', duration: DURATION, music: { style: 'cinematic', key: 'D', seed: 1116, sections: { drop: 5.0, breakdown: [18.0, 47.0], lift: [31.0, 56.2, 61.0], outroAt: 72.6 }, hits: [56.2] }, cues: CUES }
