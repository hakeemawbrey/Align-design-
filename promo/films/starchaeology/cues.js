// starchaeology score — lofi, Gm (the engine reads it as Bb major), 108 bpm (arranged by the style engine in
// promo/scripts/teaser-sound.mjs).
//   drop 5.6: the pith helmet lands on Capricorn ("Carbon dating.") · breakdown 16.16: the list is done, the stars stare
//   · lift 18.38: "crumbs" (every artifact crumbles) and the pigeon parade · tape stop 21.25 + breakdown 21.71: the
//   helmet comes off, "has he ever made a plan?", the calendar, crickets · lift 27.27: LESSON UNLOCKED (crash hit) ·
//   outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'starchaeology', duration: DURATION, music: { style: 'lofi', key: 'Gm', seed: 2019, sections: { drop: T.drop, breakdown: [16.156, 21.711], lift: [18.378, T.lesson], outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
