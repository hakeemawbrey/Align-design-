// npce07: PISCES CRIES ABOUT… "last December." (14 s vertical trial reel, promo/films/next30/b48.md,
// music: cinematic · Dm). Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: Pisces holds up an instant photo from last year: a small, grey Pisces alone, hood up.
//   1.4       the photo's caption writes on: "last dec."   2.75 sticker "look how far *we* came."
//   2.9–3.7   friends pop up behind today's Pisces (Cancer, Leo, Virgo).  4.4 fountains.
//   5.6       card cut. THE STARS: "Be proud of who carried you here: you."
import { makeCry, box, R, ink, shadow, glow, sparkles, hearts, pop01, prog, lerp, ease, drawStarChar, signStar, INK, BONE, GOLD, PINK, SERIF } from '../../npce01/scenes/criekit.js'

const PIS = signStar('pisces')
function photo(x, t, cx, cy, sc, rot, cap) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
  box(x, -220, -260, 440, 520, '#fbf6e9', { b: 7 })
  R(x, '#3a3a4e', -190, -230, 380, 380)
  // grey drizzle-free gloom: a dim lamp, an empty bench
  R(x, '#2a2a3a', -190, 70, 380, 80)
  box(x, -150, 40, 300, 22, '#55556a', { b: 4 }); R(x, INK, -130, 62, 12, 40); R(x, INK, 118, 62, 12, 40)
  // small grey Pisces, hood up
  drawStarChar(x, 0, -30, 150, t, { color: '#8d8aa8', mood: 'neutral', look: [0, 1], seed: 11, glow: 0.2, tips: false, blink: 0.4, bob: 0 })
  x.fillStyle = INK; x.beginPath(); x.arc(0, -40, 84, Math.PI * 1.08, Math.PI * 1.92); x.lineTo(56, -40); x.arc(0, -40, 58, Math.PI * 1.85, Math.PI * 1.15, true); x.closePath(); x.fill()
  x.fillStyle = '#4b4b68'; x.beginPath(); x.arc(0, -40, 78, Math.PI * 1.1, Math.PI * 1.9); x.lineTo(50, -40); x.arc(0, -40, 62, Math.PI * 1.86, Math.PI * 1.14, true); x.closePath(); x.fill()
  if (cap > 0) { x.save(); x.beginPath(); x.rect(-200, 160, 400 * cap, 90); x.clip(); ink(x, 'last dec.', 0, 205, { size: 60, font: SERIF, weight: 500, col: '#2a1f5a', rot: -0.03 }); x.restore() }
  x.restore()
}

const EP = makeCry({
  id: 'npce07', topic: 'last December', accent: '#9fd0ff', deep: '#5a3fa0',
  sticker: 'look how far *we* came.', peak: 4.4,
  tissues: [1.5, 2.9, 3.3, 3.7, 4.4, 4.65, 4.9],
  scene(x, t, S) {
    glow(x, 540, 900, 640, 0.5)
    photo(x, t, 540, 620 + 6 * Math.sin(t * 2), 0.92, -0.04 + 0.02 * Math.sin(t * 1.4), prog(t, 1.4, 2.0))
    // friends behind today's Pisces
    const F = [['cancer', 250, 2.9, 1120], ['leo', 540, 3.3, 985], ['virgo', 830, 3.7, 1120]]
    F.forEach(([s, fx, at, fy], i) => { const k = pop01(t, at, 0.35, 2.4); if (k > 0.01) drawStarChar(x, fx, fy, 170, t, { color: signStar(s).color, mood: 'happy', pop: k, hops: [at + 0.3, 4.45], seed: 20 + i, look: [i === 0 ? 1 : i === 2 ? -1 : 0, 0.5] }) })
    shadow(x, 540, 1310, 240)
    S.pis(x, t, { x: 540, y: 1160, s: 250, mood: t < 2.9 ? 'neutral' : 'sparkle', look: t < 2.9 ? [0, -1] : [0, 0], hops: [1.5, 2.95, 3.35, 3.75, 4.42, 4.8] })
    sparkles(x, t, 540, 1080, 3.3, 10, 300, 0.3, [GOLD, BONE, PINK])
    if (t > 3.7) hearts(x, t, 3.75, 540, 1060, { n: 6, spread: 400 })
  },
  finale(x, t, { ok }) {
    const k = pop01(t, 5.75, 0.3, 2.2) * ok
    if (k > 0.01) photo(x, t, 460, 640, 0.42 * k, -0.14, 1)
  },
  last: 'Be proud of who carried you here: you.',
  cues: [['pluck', 1.4, 1174.66, 0.03, 0, 0.5], ['pop', 2.92, 880, 0.04, -0.4], ['pop', 3.32, 1046.5, 0.04, 0], ['pop', 3.72, 1318.51, 0.04, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void PIS
