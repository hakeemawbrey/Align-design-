// kzce01 score: chiptune, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.55: "order!" gavel · breakdown 4.75: the meme freeze · lift 10.4: GUILTY · hit 10.4. No end card: the score
//   runs to the hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-kzce01', duration: DURATION, music: { style: 'chiptune', key: 'D', seed: 6101, sections: { drop: 1.55, breakdown: [4.75], lift: [10.4], outroAt: DURATION - 0.6 }, hits: [10.4] }, cues: CUES }
