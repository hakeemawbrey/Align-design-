// sxorbit3 score — synthwave, Em, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.933: Streak lands · hits 6.711 (the shell) · 15.044 / 18.378 (the knocks) · breakdown 21.711: knock… three?
//   lift 22.822: the talk card · breakdown 26.156: LESSON · lift 31.156: the reply · hits 33.933 / 36.156: the zooms → freeze.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxorbit3', duration: DURATION, music: { style: 'synthwave', key: 'Em', seed: 43, sections: { drop: 3.933, breakdown: [21.711, 26.156], lift: [22.822, 31.156], outroAt: DURATION - 4.4 }, hits: [6.711, 15.044, 18.378, 33.933, 36.156] }, cues: CUES }
