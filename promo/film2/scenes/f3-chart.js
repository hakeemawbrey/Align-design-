// PLACEHOLDER — replaced by the scene agent. Real-time window 6.5–10.7s (see ../BRIEF.md).
import { el, prog } from '../../src/lib.js'
import { W, H, SERIF, fill } from '../../src/scenes/common.js'
export default function build(stage) {
  const root = fill(stage, { background: '#0b0620' })
  el('div', { position: 'absolute', left: 0, width: W + 'px', top: (H / 2 - 40) + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '64px', color: '#efe6d6' }, root, 'f3-chart')
  return { start: 6.5, end: 10.7, root, update(t) { root.style.opacity = String(prog(t, 6.5, 6.5 + 0.2)) } }
}
export const cues = []
