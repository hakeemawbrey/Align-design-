// citynashville score — pop, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The band kicks in as "heartbreak" lands (2.82); it thins to a breakdown as the bar row drops and the staff draws for
// "Write a different song." (4.49), and lifts with the full band as the gold Align line draws over the charts (7.27);
// the end card lands at 10.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'citynashville', duration: DURATION, music: { style: 'pop', key: 'D', seed: 137, sections: { drop: 2.822, breakdown: 4.489, lift: 7.267, outroAt: DURATION - 4.4 } }, cues: CUES }
