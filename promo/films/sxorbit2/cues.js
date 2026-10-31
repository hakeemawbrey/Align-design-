// sxorbit2 score — lofi, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   hit 1.711: the faces land · drop 5.6: the thought bubble · hit 16.156: the answers flip · breakdown 20.044: the silence
//   lift 21.156: "…I could try yours." · breakdown 27.822: LESSON UNLOCKED · lift 33.933: the comet · hit 36.156: "Who is she?!"
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxorbit2', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 42, sections: { drop: 5.6, breakdown: [20.044, 27.822], lift: [21.156, 33.933], outroAt: DURATION - 4.4 }, hits: [1.711, 16.156, 36.156] }, cues: CUES }
