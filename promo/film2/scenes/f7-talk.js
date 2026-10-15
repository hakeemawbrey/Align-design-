// PLACEHOLDER — replaced by the scene agent. Real-time window 24.0–27.2s (see ../BRIEF.md).
import { el, prog } from '../../src/lib.js'
import { W, H, SERIF, fill } from '../../src/scenes/common.js'
export default function build(stage) {
  const root = fill(stage, { background: '#0b0620' })
  el('div', { position: 'absolute', left: 0, width: W + 'px', top: (H / 2 - 40) + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '64px', color: '#efe6d6' }, root, 'f7-talk')
  return { start: 24.0, end: 27.2, root, update(t) { root.style.opacity = String(prog(t, 24.0, 24.0 + 0.2)) } }
}
export const cues = []
