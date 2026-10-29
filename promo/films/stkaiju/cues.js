// stkaiju score — cinematic, D minor (a monster movie), on the 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro under the B-movie title card (stomps + a roar as cues) · drop 7.27: the what-if hatches · the feeding builds,
//   a hit on the colossal growth (20.04) · breakdown 23.38: the stars put it on a diet (a tape stop under the
//   wait for the reply) · lift 30.6: LESSON UNLOCKED · outro under the end card.
import { DURATION, CUES, T, BEAT } from './scenes/index.js'
export default { id: 'stkaiju', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 31, sections: { drop: T.hatch, breakdown: [BEAT(41)], lift: [T.lesson], outroAt: DURATION - 4.4 }, hits: [T.g4] }, cues: CUES }
