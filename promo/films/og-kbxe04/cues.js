// og-kbxe04 score: the original's chiptune in B, every section shifted by the stretched opening (LEAD). Hard cut, no loop.
import { DURATION, CUES, LEAD } from './scenes/index.js'
const L = LEAD
export default { id: 'og-kbxe04', duration: DURATION, music: { style: 'chiptune', key: 'B', seed: 2004, sections: { drop: 1.62 + L, breakdown: [11.7 + L], lift: [14.0 + L], outroAt: DURATION - 0.5 }, hits: [0.35 + L, 15.05 + L] }, cues: CUES }
