// kine18 score: lofi, Bb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.6: chapter 1 · breakdown 16.0: chapter 2 (the myths) · lift 30.5: chapter 3 (the truth) · lift 50.5: the last
//   chapter · hits 52.75: SO NORMAL, 58.4: the laugh · no end card: the film hard-cuts at 63.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine18', duration: DURATION, music: { style: 'lofi', key: 'Bb', seed: 1318, sections: { drop: 2.6, breakdown: [16.0], lift: [30.5, 50.5], outroAt: DURATION - 1.6 }, hits: [52.75, 58.4] }, cues: CUES }
