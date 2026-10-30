// stelevator score — jazzy, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). Elevator muzak.
//   drop 4.489: THUNK, stuck at floor 12 (the band keeps playing, because of course it does) · breakdown 28.378: the
//   lights go out (tape stop, a clunk, the emergency hum) · lift 35.6: "I like you." the muzak swells · hit 42.267: DING,
//   the roof · breakdown 45.6: LESSON UNLOCKED · lift 50.044: card first → "Going up." · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stelevator', duration: DURATION, music: { style: 'jazzy', key: 'Eb', seed: 742, sections: { drop: T.thunk, breakdown: [T.out1, T.lesson], lift: [T.swell, T.lift2], outroAt: DURATION - 4.4 }, hits: [T.ding] }, cues: CUES }
