// npce08: PISCES CRIES ABOUT… "a new leaf." (12 s vertical trial reel, promo/films/next30/b48.md,
// music: synthwave · F#m). Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: Pisces nose to nose with a small houseplant on the windowsill, snow outside, watering can in hand.
//   1.1–2.2   a tiny new leaf unrolls at the top.  2.75 sticker "in *December.*"
//   3.5       Pisces holds up a sign: "1 NEW LEAF".  4.3 fountains.
//   5.6       flash cut. THE STARS: "Growth is quiet. Notice it anyway."
import { makeCry, box, R, ink, shadow, glow, snow, sparkles, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, MONO } from '../../npce01/scenes/criekit.js'

const LEAF = '#5fbf6a', LEAF_D = '#3b8a48', NEW = '#a8f07a'
function leaf(x, cx, cy, len, ang, col, w = 0.42) {
  x.save(); x.translate(cx, cy); x.rotate(ang)
  x.fillStyle = INK; x.beginPath(); x.ellipse(len / 2, 0, len / 2 + 6, len * w / 2 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(len / 2, 0, len / 2, len * w / 2, 0, 0, Math.PI * 2); x.fill()
  R(x, 'rgba(255,255,255,0.25)', 6, -2, len * 0.8, 4); x.restore()
}
function plant(x, t, cx, base, grow) {
  // stems + old leaves
  R(x, INK, cx - 7, base - 250, 14, 250); R(x, LEAF_D, cx - 3, base - 246, 6, 246)
  leaf(x, cx, base - 90, 130, Math.PI + 0.35 + 0.03 * Math.sin(t * 1.5), LEAF)
  leaf(x, cx, base - 130, 140, -0.35 + 0.03 * Math.sin(t * 1.5 + 1), LEAF)
  leaf(x, cx, base - 190, 110, Math.PI + 0.6, LEAF_D)
  leaf(x, cx, base - 210, 100, -0.55, LEAF)
  // the new one, unrolling
  if (grow > 0.01) leaf(x, cx, base - 248, 30 + 70 * grow, -Math.PI / 2 + 0.6 * (1 - grow) + 0.05 * Math.sin(t * 3), NEW, 0.2 + 0.25 * grow)
  // the pot
  box(x, cx - 110, base, 220, 140, '#c4673f', { b: 6, hi: '#e08a5f' })
  box(x, cx - 126, base - 6, 252, 34, '#d77b50', { b: 6 })
}
function windowBg(x, t) {
  box(x, 140, 360, 800, 760, '#18213e', { b: 10 })
  x.save(); x.beginPath(); x.rect(140, 360, 800, 760); x.clip(); snow(x, t, { n: 30, y0: 340, y1: 1130, a: 0.8, seed: 3 }); x.restore()
  R(x, INK, 532, 360, 16, 760); R(x, INK, 140, 732, 800, 16)
  box(x, 90, 1120, 900, 40, '#e9e6f6', { b: 6 })
}

const EP = makeCry({
  id: 'npce08', topic: 'a new leaf', accent: NEW, deep: '#2f7a3a',
  sticker: 'in *December.*', peak: 4.3,
  tissues: [1.3, 2.2, 2.85, 3.55, 4.3, 4.55, 4.8],
  dim: 0.7,
  scene(x, t, S) {
    windowBg(x, t)
    glow(x, 420, 900, 400, 0.4, '200,255,190')
    const grow = ease.outBack ? ease.outCubic(prog(t, 1.1, 2.2)) : prog(t, 1.1, 2.2)
    plant(x, t, 400, 980, grow)
    sparkles(x, t, 430, 700, 2.1, 10, 120, 0.4, [NEW, BONE, GOLD])
    // Pisces, nose to nose, then the sign
    const sk = pop01(t, 3.5, 0.32, 2.4)
    const look = [-1, t < 1.1 ? 0 : -1]
    S.pis(x, t, { x: 740, y: 940, s: 260, mood: t < 1.1 ? 'neutral' : t < 2.2 ? 'wide' : 'sparkle', look, hops: [1.15, 2.25, 3.52, 4.32, 4.7] })
    if (t < 3.5) {        // the watering can
      x.save(); x.translate(860, 1060); x.rotate(-0.2)
      box(x, -50, -40, 100, 80, '#7fa6d8', { b: 5 }); R(x, INK, 46, -30, 70, 14); R(x, '#7fa6d8', 50, -27, 62, 8); R(x, INK, -40, -66, 80, 12)
      x.restore()
    }
    if (sk > 0.01) {
      x.save(); x.translate(760, 640 - 8 * Math.abs(Math.sin(t * 6))); x.rotate(0.05 * Math.sin(t * 5)); x.scale(sk, sk)
      R(x, INK, -8, 40, 16, 150); R(x, '#a07850', -4, 40, 8, 146)
      box(x, -170, -60, 340, 110, BONE, { b: 7 })
      ink(x, '1 NEW LEAF', 0, -4, { size: 48, col: '#2f7a3a', font: MONO }); x.restore()
    }
  },
  finale(x, t, { ok }) {
    const k = pop01(t, 5.75, 0.3, 2.2) * ok
    if (k > 0.01) { x.save(); x.translate(470, 900); x.scale(0.45 * k, 0.45 * k); x.translate(-400, -980); plant(x, t, 400, 980, 1); x.restore() }
  },
  last: 'Growth is quiet. Notice it anyway.',
  cues: [['riser', 1.1, 1.1, 0.012], ['pluck', 2.2, 1567.98, 0.04, -0.2, 0.4], ['pop', 3.52, 1318.51, 0.04, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
