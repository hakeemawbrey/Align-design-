// kpvee02 score: lofi, Db (style engine in promo/scripts/teaser-sound.mjs). Long (75 s), hard cut.
//   drop 0.15: Venus bursts in · breakdown 24.8 / 38.8: chapters 2 and 3 · lift 55.8: Saturday · hit 73.6: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee02', duration: DURATION, music: { style: 'lofi', key: 'Db', seed: 4102, sections: { drop: 0.15, breakdown: [24.8, 38.8], lift: [5.4, 55.8], outroAt: DURATION - 0.8 }, hits: [51.2, 73.6] }, cues: CUES }
