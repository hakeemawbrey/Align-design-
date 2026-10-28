// stfog score — screwed, A minor, 108 bpm grid played half-time (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: Pisces lands, heart-eyes · the money question: the score winds down under the silence (tape stop 15.6–18.38)
//   and slams back with the giant flag · breakdown 20.04: Neptune drifts in and the fog rolls (dreamy pad + bells) ·
//   lift 31.71: the glasses get booped off (tape-stop fill, crash) · breakdown 39.49: LESSON UNLOCKED · lift 45.04: the
//   dealbreaker taps · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stfog', duration: DURATION, music: { style: 'screwed', key: 'Am', seed: 66, sections: { drop: 1.711, breakdown: [20.044, 39.489], lift: [31.711, 45.044], outroAt: DURATION - 4.4 } }, cues: CUES }
