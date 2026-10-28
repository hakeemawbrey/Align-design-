// stlightyears score — cinematic, Db, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 3.378: the goodnight is sent · lift 11.711: 8 years later (card cut) · breakdown 21.156: the yell (tape stop,
//   silence: sound can't travel in space) through real talk · lift 29.489: the ritual, the gold line (hit at 30.6) and
//   the LESSON · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'stlightyears', duration: DURATION, music: { style: 'cinematic', key: 'Db', seed: 23, sections: { drop: T.send, breakdown: [T.yell], lift: [T.cut1, T.h7 - 0.011], outroAt: DURATION - 4.4 }, hits: [T.gold[0]] }, cues: CUES }
