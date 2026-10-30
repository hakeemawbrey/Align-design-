// srtorsubway score — jazzy, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as face #1 loops round again ("AGAIN.", 2.822); it thins to a breakdown under Taurus' "...but he's
// familiar." (7.3); the lift lands as we leave the car for the tunnel and the deck deals (9.7); hits on the mystery card
// landing (12.3) and the train reaching the star (14.55); the end card takes over at 15.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srtorsubway', duration: DURATION, music: { style: 'jazzy', key: 'D', seed: 129, sections: { drop: 2.822, breakdown: 7.3, lift: 9.7, outroAt: DURATION - 4.4 }, hits: [12.3, 14.55] }, cues: CUES }
