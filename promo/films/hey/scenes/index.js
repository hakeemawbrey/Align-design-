// STUB — replaced by the film's agent. Export DURATION, SCENES (array of async build(stage) fns), CUES.
import { el } from '../../../src/lib.js'
export const DURATION = 15
export const CUES = []
export const SCENES = [async (stage) => ({ start: 0, end: 15.01, root: el('div', { position: 'absolute', inset: '0', background: '#0b0620', color: '#efe6d6', font: '60px serif', display: 'grid', placeItems: 'center' }, stage, 'hey'), update() {} })]
