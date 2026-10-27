// stsaturn score — cinematic, Fm, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: Saturn's glasses glint · lift 12.3: the dealbreakers card · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stsaturn', duration: DURATION, music: { style: 'cinematic', key: 'Fm', seed: 229, sections: { drop: 2.82, lift: 12.3, outroAt: DURATION - 4.4 } }, cues: CUES }
