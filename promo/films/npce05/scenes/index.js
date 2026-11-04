// npce05: PISCES CRIES ABOUT… "a blind card." (14 s vertical trial reel, promo/films/next30/b48.md, music: pop · E).
// Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: Pisces holds up tonight's blind mystery card, face down (a "?" back), sniffling already.
//   1.3–1.7   the card flips: no face, just words: "cries at weddings." … "and bakeries." (2.2)
//   2.75      sticker "they cry at *bakeries* too."  4.4 fountains; the card gets a little heart stamp.
//   5.6       card cut. THE STARS: "Card first. Face last. Tissues always."
import { makeCry, box, R, ink, shadow, glow, drawBits, sparkles, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, SERIF, MONO, HEART } from '../../npce01/scenes/criekit.js'

function card(x, t, cx, cy, sc, rot, flip, { line2 = 1, stamp = 0 } = {}) {
  const sx = Math.cos(Math.PI * flip), front = flip > 0.5
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc * Math.max(0.02, Math.abs(sx)), sc)
  if (!front) {
    box(x, -210, -300, 420, 600, '#4a2e8c', { b: 8 })
    x.strokeStyle = GOLD; x.lineWidth = 5; x.strokeRect(-180, -270, 360, 540)
    for (let i = 0; i < 12; i++) drawBits(x, ['.G.', 'GGG', '.G.'], { G: 'rgba(242,199,92,0.5)' }, -140 + (i % 3) * 140, -200 + Math.floor(i / 3) * 130, 7, { outline: null })
    x.font = `800 200px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('?', 0, 10)
  } else {
    box(x, -210, -300, 420, 600, '#fbf6e9', { b: 8 })
    R(x, '#4a2e8c', -210, -300, 420, 80)
    ink(x, 'BLIND CARD', 0, -260, { size: 34, col: GOLD, font: MONO })
    ink(x, 'no face yet.', 0, -170, { size: 30, col: 'rgba(27,18,54,0.55)', font: MONO })
    ink(x, 'cries at', 0, -70, { size: 64, font: SERIF, weight: 500, col: '#2a1f5a' })
    ink(x, 'weddings.', 0, 0, { size: 64, font: SERIF, weight: 500, col: '#2a1f5a' })
    if (line2 > 0.01) { x.save(); x.globalAlpha = line2; ink(x, 'and bakeries.', 0, 110, { size: 64, font: SERIF, weight: 500, col: '#c0392b', rot: -0.04 }); x.restore() }
    if (stamp > 0.01) drawBits(x, HEART, { H: '#ff5c8a' }, 130, 220, 10 * stamp, { rot: 0.2 })
  }
  x.restore()
}

const EP = makeCry({
  id: 'npce05', topic: 'a blind card', accent: '#c9a6ff', deep: '#c0392b',
  sticker: 'they cry at *bakeries* too.', peak: 4.4,
  tissues: [1.75, 2.3, 2.9, 4.4, 4.65, 4.9],
  scene(x, t, S) {
    glow(x, 540, 760, 600, 0.45, '201,166,255')
    const flip = ease.inOutCubic(prog(t, 1.3, 1.7))
    const sc = lerp(0.82, 0.9, ease.outCubic(prog(t, 1.3, 1.9)))
    card(x, t, 560, 720 + 8 * Math.sin(t * 2.2), sc, -0.05 + 0.03 * Math.sin(t * 1.7), flip, { line2: prog(t, 2.15, 2.4), stamp: pop01(t, 4.4, 0.3, 2.6) })
    sparkles(x, t, 560, 720, 1.6, 12, 300, 0.2, [GOLD, BONE, PINK])
    shadow(x, 560, 1310, 230)
    S.pis(x, t, { x: 560, y: 1150, s: 240, mood: t < 1.6 ? 'neutral' : t < 2.2 ? 'wide' : 'sparkle', look: [0, -1], hops: [1.75, 2.3, 4.42, 4.75] })
  },
  finale(x, t, { ok }) { const k = pop01(t, 5.75, 0.3, 2.2) * ok; if (k > 0.01) card(x, t, 470, 640, 0.42 * k, -0.12, 1, { stamp: 1 }) },
  last: 'Card first. Face last. Tissues always.',
  cues: [['whoosh', 1.28, 0.3, 0.035], ['pluck', 1.7, 1318.51, 0.04, 0, 0.3], ['pop', 2.2, 1567.98, 0.04, 0.2], ['pop', 4.42, 1760, 0.04, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
