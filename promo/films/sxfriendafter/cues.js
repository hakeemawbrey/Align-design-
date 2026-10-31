// sxfriendafter score — cinematic, Bb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the friends' constellation snaps round the burrito · breakdown 13.38: day 12 (the dog, the relapse) ·
//   lift 21.16: Libra laughs · breakdown 28.94: tonight's deck (quiet) · lift 30.05: the card flips · crash hit at the
//   LESSON (32.83) · outro under the end card.
import { DURATION, CUES, T, BEAT, KEY } from './scenes/index.js'
export default { id: 'sxfriendafter', duration: DURATION, music: { style: 'cinematic', key: KEY, seed: 733, sections: { drop: T.snap, breakdown: [BEAT(23), BEAT(51)], lift: [BEAT(37), BEAT(53)], outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
