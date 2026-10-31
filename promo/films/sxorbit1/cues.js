// sxorbit1 score — cinematic, Dm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). A glossy soap.
//   hit 0.6: the ORBIT title · drop 3.933: the first card lands · hits 5.044 / 7.267: the two snap-zooms · hit 16.711: the shell
//   breakdown 26.156: silence before the tap · lift 27.822: the tap (IT'S MUTUAL) · breakdown 31.711: LESSON UNLOCKED
//   lift 36.156: the faces start to flip → freeze 37.267 · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'sxorbit1', duration: DURATION, music: { style: 'cinematic', key: 'Dm', seed: 41, sections: { drop: 3.933, breakdown: [26.156, 31.711], lift: [27.822, 36.156], outroAt: DURATION - 4.4 }, hits: [0.6, 5.044, 7.267, 16.711] }, cues: CUES }
