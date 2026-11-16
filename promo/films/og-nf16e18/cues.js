// og-nf16e18 score (social: no end card, the score runs to the last line): cinematic, Cm. drop 5.4: the thin walls · breakdown 8.2: the knock · lift 11.4: NOTES · hit 27.7: the door opens · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-nf16e18', duration: DURATION, music: { style: 'cinematic', key: 'Cm', seed: 1618, sections: { drop: 5.4, breakdown: [8.2], lift: [11.4], outroAt: DURATION - 2.4 }, hits: [27.7] }, cues: CUES }
