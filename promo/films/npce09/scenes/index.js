// npce09: PISCES CRIES ABOUT… "a snowman." (12 s vertical trial reel, promo/films/next30/b48.md, music: dreamy · Eb).
// Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: Pisces at the window; outside a snowman holds a sign "HI PISCES".
//   1.4       Cancer pops up from behind the snowman and waves.  2.75 sticker "it’s wearing *my* colour." (the scarf)
//   4.3       fountains; Cancer blows a heart.
//   5.6       flash cut. THE STARS: "Let people show up for you."
import { makeCry, box, R, ink, shadow, glow, snow, sparkles, hearts, pop01, prog, ease, PIS_COL, INK, BONE, GOLD, PINK, MONO } from '../../npce01/scenes/criekit.js'

function snowman(x, t, cx, base, { scarfK = 0 } = {}) {
  const ball = (y, r) => { x.fillStyle = INK; x.beginPath(); x.arc(cx, y, r + 7, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4f1ff'; x.beginPath(); x.arc(cx, y, r, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d8d2ec'; x.beginPath(); x.arc(cx + r * 0.25, y + r * 0.2, r * 0.75, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4f1ff'; x.beginPath(); x.arc(cx - r * 0.12, y - r * 0.1, r * 0.8, 0, Math.PI * 2); x.fill() }
  ball(base - 110, 120); ball(base - 290, 90); ball(base - 430, 66)
  R(x, INK, cx - 26, base - 450, 14, 14); R(x, INK, cx + 12, base - 450, 14, 14)
  R(x, INK, cx - 4, base - 432, 50, 16); R(x, '#f08a3a', cx, base - 428, 42, 8)
  for (let i = 0; i < 5; i++) R(x, INK, cx - 30 + i * 14, base - 402 + Math.abs(i - 2) * 3, 8, 8)
  for (let i = 0; i < 3; i++) R(x, INK, cx - 6, base - 320 + i * 50, 12, 12)
  // the scarf, in Pisces' colour
  box(x, cx - 74, base - 378, 148, 30, PIS_COL, { b: 5 })
  x.save(); x.translate(cx + 40, base - 360); x.rotate(0.2 + 0.12 * Math.sin(t * 4)); box(x, -14, 0, 30, 110, PIS_COL, { b: 5 }); x.restore()
  if (scarfK > 0) glow(x, cx, base - 360, 200, scarfK, '201,166,255')
  // stick arm holding the sign
  x.save(); x.strokeStyle = '#6b4a2f'; x.lineWidth = 10; x.beginPath(); x.moveTo(cx - 80, base - 300); x.lineTo(cx - 190, base - 390); x.stroke(); x.restore()
  x.save(); x.translate(cx - 220, base - 470 + 4 * Math.sin(t * 2)); x.rotate(-0.08)
  box(x, -130, -50, 260, 100, BONE, { b: 6 }); ink(x, 'HI PISCES', 0, 2, { size: 40, col: '#7a4fc0', font: MONO })
  x.restore()
}

function outside(x, t, S, fin = 0) {
  box(x, 90, 380, 900, 800, '#1d2a52', { b: 12 })
  x.save(); x.beginPath(); x.rect(90, 380, 900, 800); x.clip()
  glow(x, 600, 700, 500, 0.25, '200,220,255')
  R(x, '#e9e6f6', 90, 1060, 900, 120)
  const ck = fin ? 1 : pop01(t, 1.4, 0.4, 2.2)
  if (ck > 0.01) S.star(x, t, 'cancer', { x: 850, y: 960 - 60 * ck, s: 170, pop: ck, mood: t > 4.3 ? 'heart' : 'happy', look: [-1, 0.3], hops: [1.8, 2.2, 2.6, 4.35], seed: 8 })
  snowman(x, t, 690, 1110, { scarfK: fin ? 0 : pop01(t, 2.8, 0.3) * (1 - prog(t, 3.6, 4.2)) })
  snow(x, t, { n: 40, y0: 360, y1: 1200, seed: 4 })
  x.restore()
  box(x, 50, 1180, 980, 40, '#e9e6f6', { b: 6 })
}

const EP = makeCry({
  id: 'npce09', topic: 'a snowman', accent: '#e9e6f6', deep: '#7a4fc0',
  sticker: 'it’s wearing *my* colour.', peak: 4.3,
  tissues: [1.45, 2.85, 3.4, 4.3, 4.55, 4.8],
  dim: 0.7,
  scene(x, t, S) {
    outside(x, t, S)
    sparkles(x, t, 640, 750, 2.8, 10, 140, 0.2, [PIS_COL, BONE, GOLD])
    if (t > 4.3) hearts(x, t, 4.35, 790, 820, { n: 5 })
    shadow(x, 250, 1300, 220)
    S.pis(x, t, { x: 250, y: 1140, s: 260, mood: t < 1.4 ? 'wide' : 'sparkle', look: [1, -0.6], hops: [1.45, 2.85, 4.32, 4.7] })
  },
  finaleBack(x, t, { ok }) { x.save(); x.globalAlpha = 0.25 * ok; outside(x, t, { star: () => {} }, 1); x.restore() },
  last: 'Let people show up for you.',
  cues: [['pop', 1.45, 987.77, 0.04, 0.3], ['pop', 1.55, 1318.51, 0.03, 0.3], ['glitter', 2.8, 3.3], ['pop', 4.35, 1567.98, 0.035, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
