// kine10 score: cinematic, Dm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.0: "They're happy. I'm spiralling." · breakdown 9.9: THE STARS answer · lift 15.5: the walk in the sun
//   · hit 7.8: SO NORMAL · no end card: the film hard-cuts at 19.2.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kine10', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 1310, sections: { drop: 2.0, breakdown: [9.9], lift: [15.5], outroAt: DURATION - 1.4 }, hits: [7.8] }, cues: CUES }
