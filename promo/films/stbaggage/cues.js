// stbaggage score — lofi, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.49: the trunk bursts out of the hatch · hit + tape stop 20.6: the FAMILY STUFF crate jams the belt ·
//   breakdown 25.6: "everyone has baggage." · lift 30.6: ★ LESSON UNLOCKED · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stbaggage', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 310, sections: { drop: 4.489, breakdown: 25.6, lift: 30.6, outroAt: DURATION - 4.4 }, hits: [20.6] }, cues: CUES }
