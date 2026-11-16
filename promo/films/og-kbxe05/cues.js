// og-kbxe05 score: the original's dreamy in F, every section shifted by the stretched opening (LEAD). Hard cut, no loop.
import { DURATION, CUES, LEAD } from './scenes/index.js'
const L = LEAD
export default { id: 'og-kbxe05', duration: DURATION, music: { style: 'dreamy', key: 'F', seed: 2005, sections: { drop: 1.62 + L, breakdown: [14.5 + L], lift: [20.0 + L], outroAt: 21.05 + L }, hits: [0.35 + L, 21.05 + L] }, cues: CUES }
