// stfirstfight score — chiptune, Bm (the preset is major, so it plays in the relative D major; the chips are written in
// B minor), 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: "PLAY!" and the first serve · breakdown 3.93: the VS freeze (a pause-menu groove) · lift 8.93: game one's
//   serve · breakdown 25.6: the streak ends (tape stop, then crickets and the long climb down) · lift 36.16: doubles ·
//   breakdown 43.93: LESSON UNLOCKED · outro under the end card. Hits: the 7-ISH smash, LOVE – LOVE.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stfirstfight', duration: DURATION, music: { style: 'chiptune', key: 'Bm', seed: 15, sections: { drop: 1.711, breakdown: [3.933, 25.6, 43.933], lift: [8.933, 36.156], outroAt: DURATION - 4.4 }, hits: [18.378, 39.6] }, cues: CUES }
