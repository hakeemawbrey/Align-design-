// k3se23 score: chiptune, C (style engine). drop 2.6: #1 Aries · breakdowns/lifts at the chapters · hit 58.5: the group hug · hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'k3se23', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 2823, sections: { drop: 2.6, breakdown: [16.4, 30.2, 44.0], lift: [16.4 + 2.25, 30.2 + 2.25, 44.0 + 2.25], outroAt: DURATION - 1.2 }, hits: [58.5] }, cues: CUES }
