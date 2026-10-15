// PLACEHOLDER — replaced by the scene agent. Real-time window 10.5–15.2s (see ../BRIEF.md).
import { el, prog } from '../../src/lib.js'
import { W, H, SERIF, fill } from '../../src/scenes/common.js'
export default function build(stage) {
  const root = fill(stage, { background: '#0b0620' })
  el('div', { position: 'absolute', left: 0, width: W + 'px', top: (H / 2 - 40) + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '64px', color: '#efe6d6' }, root, 'f4-chance')
  return { start: 10.5, end: 15.2, root, update(t) { root.style.opacity = String(prog(t, 10.5, 10.5 + 0.2)) } }
}
export const cues = []
