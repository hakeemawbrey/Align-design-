// ksbe01 score: pop, E (style engine in promo/scripts/teaser-sound.mjs). Hard cut at the end: no outro tail.
//   drop 2.4: colour snaps back after the freeze · lift 10.4: the better line writes in.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksbe01', duration: DURATION, music: { style: 'pop', key: 'E', seed: 1701, sections: { drop: 2.4, lift: [10.4], outroAt: DURATION - 1.0 } }, cues: CUES }
