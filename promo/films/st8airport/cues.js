// st8airport score — cinematic, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.35: the departures board · breakdown 9.05: the slo-mo hurdle · lift 20.5: Venus answers · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st8airport', duration: DURATION, music: { style: 'cinematic', key: 'Bb', seed: 8233, sections: { drop: 2.35, breakdown: 9.05, lift: 20.5, outroAt: DURATION - 4.4 } }, cues: CUES }
