// STUB — replaced by the saturnreturn agent. Export DURATION, SCENES and CUES.
import { el } from '../../../src/lib.js'
export const DURATION = 45
export const CUES = []
export const SCENES = [async (stage) => ({ start: 0, end: DURATION + 0.01, root: el('div', { position: 'absolute', inset: '0', background: '#0b0620', color: '#efe6d6', font: '60px serif', display: 'grid', placeItems: 'center' }, stage, 'saturnreturn'), update() {} })]
