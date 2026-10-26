// STUB — replaced by the starscorpio agent. Export DURATION, SCENES and CUES.
import { el } from '../../../src/lib.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
export const DURATION = 15
export const CUES = [...endcardCues(DURATION - ENDCARD_LEN)]
export const SCENES = [
  async (stage) => ({ start: 0, end: DURATION - ENDCARD_LEN + 0.01, root: el('div', { position: 'absolute', inset: '0', background: '#0b0620', color: '#efe6d6', font: '60px serif', display: 'grid', placeItems: 'center' }, stage, 'starscorpio'), update() {} }),
  (stage) => buildEndcard(stage, { start: DURATION - ENDCARD_LEN }),
]
