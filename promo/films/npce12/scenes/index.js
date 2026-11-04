// npce12: PISCES CRIES ABOUT… "you." (12 s vertical trial reel, promo/films/next30/b48.md, music: cinematic · C).
// The finale of the set. Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: Pisces looks straight into the lens, tissue in hand, wobbling.
//   1.0       a big pointer pops: "← YOU" at the viewer.  1.9 / 2.5 / 3.1 three little cards: "you texted back",
//             "you said sorry first", "you stayed kind".  2.75 sticker "yes, *you.* watching this."  4.2 fountains.
//   5.6       flash cut. THE STARS: "Feeling it all is its own courage."
import { makeCry, box, R, ink, shadow, glow, sparkles, hearts, pop01, prog, ease, INK, BONE, GOLD, PINK, SERIF, MONO, TEAR } from '../../npce01/scenes/criekit.js'

const NOTES = [['you texted back', 260, 470, -0.08, 1.9], ['you said sorry first', 760, 600, 0.07, 2.5], ['you stayed kind', 300, 760, 0.05, 3.1]]
function chip(x, t, [text, cx, cy, rot, at], k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + 6 * Math.sin(t * 2 + cx)); x.rotate(rot); x.scale(k, k)
  x.font = `500 48px ${SERIF}`; const w = x.measureText(text).width + 60
  box(x, -w / 2, -40, w, 80, '#fbf6e9', { b: 6 })
  ink(x, text, 0, 2, { size: 48, font: SERIF, weight: 500, col: '#2a1f5a' })
  x.restore()
  void at
}
function tissue(x, t, cx, cy) {
  x.save(); x.translate(cx, cy); x.rotate(0.2 + 0.1 * Math.sin(t * 6))
  R(x, INK, -34, -50, 68, 90); R(x, '#ffffff', -28, -44, 56, 78); R(x, '#dfe9f2', -28, 10, 56, 24)
  x.restore()
}

const EP = makeCry({
  id: 'npce12', topic: 'you', accent: TEAR, deep: '#2a7fb0',
  sticker: 'yes, *you.* watching this.', peak: 4.2,
  tissues: [1.0, 1.95, 2.55, 3.15, 4.2, 4.45, 4.7, 4.95],
  scene(x, t, S) {
    glow(x, 540, 1000, 640, 0.5, '190,230,255')
    const zoom = 1 + 0.06 * ease.outCubic(prog(t, 0, 1.0))
    shadow(x, 540, 1290, 300)
    S.pis(x, t, { x: 540, y: 1060, s: 360 * zoom, mood: t < 1.9 ? 'sparkle' : t < 4.2 ? 'wide' : 'happy', look: [0, 0], hops: [1.0, 1.95, 2.55, 3.15, 4.22, 4.6] })
    tissue(x, t, 790, 1120)
    // the pointer at the viewer
    const pk = pop01(t, 1.0, 0.3, 2.6) * (1 - ease.inQuad(prog(t, 1.75, 1.9)))
    if (pk > 0.01) {
      x.save(); x.translate(540, 680); x.scale(pk * (1 + 0.05 * Math.sin(t * 12)), pk)
      box(x, -200, -70, 400, 140, GOLD, { b: 8 })
      ink(x, '↓ YOU ↓', 0, 4, { size: 80, col: INK, font: MONO })
      x.restore()
    }
    NOTES.forEach(n => chip(x, t, n, pop01(t, n[4], 0.3, 2.4)))
    NOTES.forEach(n => sparkles(x, t, n[1], n[2], n[4], 8, 140, 0.3, [GOLD, BONE, PINK]))
    if (t > 3.3) hearts(x, t, 3.35, 540, 1000, { n: 6, spread: 560 })
  },
  finale(x, t, { ok }) { NOTES.forEach((n, i) => chip(x, t, [n[0], [330, 760, 360][i], [470, 580, 690][i], n[3], 0], 0.62 * pop01(t, 5.75 + i * 0.12, 0.3, 2.2) * ok)) },
  last: 'Feeling it all is its own courage.',
  cues: [['pop', 1.02, 1318.51, 0.045, 0], ['pop', 1.92, 987.77, 0.035, -0.3], ['pop', 2.52, 1174.66, 0.035, 0.3], ['pop', 3.12, 1318.51, 0.035, -0.3],
    ['pop', 5.77, 987.77, 0.025, -0.3], ['pop', 5.89, 1174.66, 0.025, 0.3], ['pop', 6.01, 1318.51, 0.025, -0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
