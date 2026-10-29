// stmagic score — funk, Bb (108 bpm), arranged by the style engine in promo/scripts/teaser-sound.mjs.
//   drop 3.378: trick 1 · hit 23.378: TA-DA! · breakdown 23.933: the silence (crickets, one slow clap) · lift 25.6: it all
//   comes back · breakdown 28.378: "pick a card" + the honest answer · lift 32.822: LESSON · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stmagic', duration: DURATION, music: { style: 'funk', key: 'Bb', seed: 14, sections: { drop: T.date, breakdown: [T.quiet, T.bd], lift: [T.burst, T.lesson], outroAt: DURATION - 4.4 }, hits: [T.tada] }, cues: CUES }
