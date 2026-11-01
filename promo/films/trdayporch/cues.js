// trdayporch score: lofi, Db, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 5.0: waiting · breakdown 13.45: the goodbye · lift 18.65: walk home safe · hit 21.15: "home safe :)"
//   · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trdayporch', duration: DURATION, music: { style: 'lofi', key: 'Db', seed: 1004, sections: { drop: 5.0, breakdown: [13.45], lift: [18.65], outroAt: DURATION - 4.4 }, hits: [21.15] }, cues: CUES }
