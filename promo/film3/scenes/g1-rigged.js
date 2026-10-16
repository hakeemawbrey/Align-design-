// STUB — replaced by the scene agent.
import { el } from '../../src/lib.js'
export const cues = []
export default async function build(stage) {
  const root = el('div', { position: 'absolute', inset: '0', background: '#0b0620', color: '#efe6d6', font: '60px serif', display: 'grid', placeItems: 'center' }, stage, 'g1-rigged')
  return { start: 0, end: 3.6, root, update() {} }
}
