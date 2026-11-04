// nf16e19 score: lofi, Am. drop 5.0: the wobble · lift 10.8: the drawing · breakdown 15.2: NOTES · hit 24.8: "I am now." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'nf16e19', duration: DURATION, music: { style: 'lofi', key: 'Am', seed: 1619, sections: { drop: 5.0, breakdown: [15.2], lift: [10.8], outroAt: DURATION - 4.4 }, hits: [24.8] }, cues: CUES }
