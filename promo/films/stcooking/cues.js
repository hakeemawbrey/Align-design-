// stcooking score — funk, A (the funk preset is dorian, so the major key is read as its relative: F# dorian, the parent
// E major), 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: the APPLAUSE lamp on "Love Kitchen" · hit 15.6: the BUT sack slams onto the counter · breakdown 22.27: POOF
//   (tape stop, a lonely clap, crickets) · lift 27.27: the deal cut into "NOT NOW, CANCER." · hit 43.93: Cancer explodes up
//   with the soup · breakdown 46.16: LESSON UNLOCKED · lift 50.6: the talk card → "Serves two." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stcooking', duration: DURATION, music: { style: 'funk', key: 'A', seed: 214, sections: { drop: 1.711, breakdown: [22.267, 46.156], lift: [27.267, 50.6], outroAt: DURATION - 4.4 }, hits: [15.6, 43.933] }, cues: CUES }
