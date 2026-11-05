// kine01 score: lofi, Dm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.55: "I ended it. So why am I sad?" · breakdown 10.5: THE STARS answer · lift 17.3: the sun comes out
//   · hit 8.3: SO NORMAL · no end card: the score lands under the last line and the film hard-cuts at 20.4.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine01', duration: DURATION, music: { style: 'lofi', key: 'Dm', seed: 1301, sections: { drop: 1.55, breakdown: [10.5], lift: [17.3], outroAt: DURATION - 1.6 }, hits: [8.3] }, cues: CUES }
