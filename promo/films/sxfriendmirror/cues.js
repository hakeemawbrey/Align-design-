// sxfriendmirror score — lofi, A minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.16: POOF, the inner critic · breakdown 14.49: the cloud rains on Cancer · lift 20.6: "hey. I like this
//   sweater." · breakdown 25.6: the puff ("…I just didn't want you hurt.") · lift 27.82: the hug · crash hit at the
//   LESSON (32.27) · outro under the end card.
import { DURATION, CUES, T, BEAT, KEY } from './scenes/index.js'
export default { id: 'sxfriendmirror', duration: DURATION, music: { style: 'lofi', key: KEY, seed: 517, sections: { drop: T.poof, breakdown: [BEAT(25), BEAT(45)], lift: [BEAT(36), BEAT(49)], outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
