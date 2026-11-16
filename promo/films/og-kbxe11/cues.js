// og-kbxe11 score: the original's cinematic in G, every section shifted by the stretched opening (LEAD). Hard cut, no loop.
import { DURATION, CUES, LEAD } from './scenes/index.js'
const L = LEAD
export default { id: 'og-kbxe11', duration: DURATION, music: { style: 'cinematic', key: 'G', seed: 2011, sections: { drop: 1.62 + L, breakdown: [14.3 + L], lift: [18.1 + L], outroAt: 21.05 + L }, hits: [0.35 + L, 18.1 + L, 21.05 + L] }, cues: CUES }
