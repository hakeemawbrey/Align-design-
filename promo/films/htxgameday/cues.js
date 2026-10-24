// htxgameday score — house, D, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the whole crowd flips to the same jersey (1.156), breaks down as the jerseys drain to grey (3.75),
// lifts as the two charts light up and link (6.156); the end card lands at 10.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxgameday', duration: DURATION, music: { style: 'house', key: 'D', seed: 103, sections: { drop: 1.156, breakdown: 3.75, lift: 6.156, outroAt: DURATION - 4.4 } }, cues: CUES }
