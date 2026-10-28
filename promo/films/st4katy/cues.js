// st4katy score — pop, A, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.16: Aries starts talking mid-swerve · breakdown 7.5: "neither does rushing love." (Aries settles into one lane) ·
//   outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4katy', duration: DURATION, music: { style: 'pop', key: 'A', seed: 1101, sections: { drop: 1.16, breakdown: 7.5, outroAt: DURATION - 4.4 } }, cues: CUES }
