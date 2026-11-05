// kzce16 score: cinematic, Dm (arranged by the style engine in promo/scripts/teaser-sound.mjs). Long film: breakdown at the
// surprise witness, lift at the closing, hit on the verdict. No end card: the score runs to the hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kzce16', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 6116, sections: { drop: 1.45, breakdown: [37.8], lift: [50.0, 60.6], outroAt: DURATION - 0.5 }, hits: [60.6, 65.0] }, cues: CUES }
