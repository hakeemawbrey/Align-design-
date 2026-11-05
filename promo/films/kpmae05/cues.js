// kpmae05 score: pop, Bb (style engine in promo/scripts/teaser-sound.mjs).
//   drop 0.38: Mars lands through the banner · breakdown 12.0: the spotlight clicks off · lift 16.0: "Yes!" · hit 24.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpmae05', duration: DURATION, music: { style: 'pop', key: 'Bb', seed: 5505, sections: { drop: 0.38, breakdown: [12.0], lift: [16.0], outroAt: DURATION - 0.6 }, hits: [24.7] }, cues: CUES }
