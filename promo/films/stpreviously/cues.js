// stpreviously score — cinematic, Cm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   0.6 the brass hit under "PREVIOUSLY ON…" · drop 4.49: the recap montage (taiko) · breakdown 21.16: the season finale ·
//   23.82 the music grinds to a halt (tape stop) — silence for "Six days. I counted." and "Are you still watching?" ·
//   lift 28.93: they slam YES and the band kicks back in · hit 33.38: RENEWED · breakdown 36.71: ★ lesson unlocked ·
//   41.74 a second tape stop: a heartbeat alone under "This season…", the music creeps back at 43.38 ·
//   lift 48.93: "WHO IS THAT?!" · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stpreviously', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 117, sections: { drop: 4.489, breakdown: [21.156, 36.711], lift: [28.933, 48.933], outroAt: DURATION - 4.4 }, hits: [0.6, 33.378] }, cues: CUES }
