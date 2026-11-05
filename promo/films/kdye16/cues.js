// kdye16 score: lofi, D (style engine in promo/scripts/teaser-sound.mjs). No end card: the outro lands under the last line.
// drop 3.4: chapter 1 · breakdown 40.6: the nap · lift 48.0: evening · hits 1.3 the stamp, 62.4 the tick on "be proud of me".
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kdye16', duration: DURATION, music: { style: 'lofi', key: 'D', seed: 1616, sections: { drop: 3.4, breakdown: [40.6], lift: [48.0], outroAt: 65.2 }, hits: [1.3, 62.4] }, cues: CUES }
