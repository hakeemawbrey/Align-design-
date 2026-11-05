// ksre09 score: house, A. drop 0.3: the whip zoom · breakdown 5.4: main quest abandoned? · lift 7.6: the last dumpling · hit 9.4: MET ON A SIDE QUEST.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'ksre09', duration: DURATION, music: { style: 'house', key: 'A', seed: 3109, sections: { drop: 0.3, breakdown: [5.4], lift: [7.6], outroAt: DURATION - 0.9 }, hits: [9.4] }, cues: CUES }
