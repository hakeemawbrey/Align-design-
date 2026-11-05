// k3se01 score: pop, D (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   tape stop 0.5: the freeze · drop 2.4: the advice slams in · hit 6.6: the phone buzzes · hard cut at the end.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'k3se01', duration: DURATION, music: { style: 'pop', key: 'D', seed: 2801, sections: { drop: 2.4, outroAt: DURATION - 0.9 }, hits: [6.6] }, cues: CUES }
