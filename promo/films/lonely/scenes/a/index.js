// STUB — replaced by the half-a agent. Export SCENES (array of async build(stage) fns) and CUES.
import { el } from '../../../../src/lib.js'
export const CUES = []
export const SCENES = [async (stage) => ({ start: 0, end: 15.2, root: el('div', { position: 'absolute', inset: '0', background: '#0b0620', color: '#efe6d6', font: '60px serif', display: 'grid', placeItems: 'center' }, stage, 'lonely half a'), update() {} })]
