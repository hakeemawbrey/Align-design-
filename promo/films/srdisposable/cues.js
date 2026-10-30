// srdisposable score — screwed, Dm, 108 bpm grid (half-time; arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: the LOST & FOUND belt rolling · build 12.4: the belt speeds up · breakdown 17.27: STOP (tape stop), crickets,
//   the grey stars get their colour back · drop 25.7: the deal cut into tonight's deck · hits on the lock and the LESSON
//   · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srdisposable', duration: DURATION, music: { style: 'screwed', key: 'Dm', seed: 904, sections: { build: T.ramp[0], drop: T.cut2, breakdown: [T.stop, T.restore[0]], outroAt: DURATION - 4.4 }, hits: [T.lock, T.lesson] }, cues: CUES }
