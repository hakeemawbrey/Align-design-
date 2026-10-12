// TEMPLATE / placeholder for "10-faith" (an agent will replace this). Shows the teaser contract.
import { W, H, el, fill, prog, ease, spaceBackdrop, typeLine, eyebrow, starField, endTag, BONE } from './kit.js'

const DURATION = 9
const END = 6.6 // end tag starts here (runs to DURATION)

export default {
  id: '10-faith', title: 'Put your faith in the stars', duration: DURATION, endTagAt: END,
  music: { chords: [[0, DURATION, [146.83, 220, 293.66, 369.99, 554.37]]] },
  cues: [['whoosh', 0.4, 0.8, 0.08], ['bell', 1.2, 880, 0.05, 1.5]],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = spaceBackdrop(root, 'rose', { seed: 3 })
    const eb = eyebrow(root, 'BLIND BY DESIGN', { y: 760 })
    const line = typeLine(root, 'Put your faith\nin the stars.', { y: 820, size: 96 })
    const tag = endTag(stage, { start: END, end: DURATION })
    return {
      update(t) {
        bg.update(t)
        eb.style.opacity = String(prog(t, 0.6, 1.0) * (1 - prog(t, END - 0.4, END)))
        line.update(t - 1.0, END - 1.4)
        tag.update(t)
      },
      fx(ctx, t) { starField(ctx, t, { seed: 4, keepOut: [[90, 740, 900, 360]] }) },
    }
  },
}
