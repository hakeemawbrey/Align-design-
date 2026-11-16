// og-stwereup score — synthwave, F#m, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.38: the whole sky snaps awake · breakdown 10.05: the whistle + record scratch (tape stop) · lift 13.93: the
//   receipts → 27.82 (the old deck beat is cut) · breakdown 20.05: noon, the sun, crickets · LESSON hit at 28.38 · outro.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'og-stwereup', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 207, sections: { drop: T.drop, breakdown: [T.whistle, 20.05], lift: [T.cut1, T.cut2], outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
