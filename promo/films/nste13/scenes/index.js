// nste13: SINGLE AND THRIVING, Ep 13 "Skating Solo" (25 s vertical, Next 30 b33, music: pop · G).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "First time skating. | *Nobody* to grab." Aries wobbling at the edge of an outdoor rink under string
//              lights while couples glide past hand in hand: "whoa whoa whoa" → "who do I hold onto??"
//   6.8        card cut → THE STARS: "hold the *rail.* that's what it's for." / "fall, laugh, try *again.*"
//   13.6       Aries grips the rail, lets go, plops down ("oop!"), laughs, gets up ("haha. again!") and glides a whole
//              lap, sparkles trailing. Meter fills.
//   17.4       "Aries: *thriving.*" Last line: "You can be your own *steady.*"
import { makeSingle, stringLights, snow, R, note, shadow, sparkles, pop01, prog, lerp, ease, clamp, T, INK } from '../../nste01/singlekit.js'

function rink(x, t) {
  R(x, '#1d1840', 0, 560, 1080, 640)
  for (let i = 0; i < 8; i++) { const hx = i * 150 - 20; R(x, INK, hx, 640 - (i % 3) * 40, 120, 580); R(x, '#2a2352', hx + 6, 646 - (i % 3) * 40, 108, 574); for (let j = 0; j < 5; j++) R(x, (i + j) % 3 ? '#ffd98a' : '#3a3266', hx + 30, 690 - (i % 3) * 40 + j * 90, 26, 34), R(x, (i + j) % 2 ? '#ffd98a' : '#3a3266', hx + 66, 690 - (i % 3) * 40 + j * 90, 26, 34) }
  stringLights(x, t, -20, 980, 560, 1020, { n: 9, sag: 50 }); stringLights(x, t, 520, 1020, 1100, 980, { n: 9, sag: 50 })
  R(x, INK, 0, 1194, 1080, 10); R(x, '#a6cde4', 0, 1204, 1080, 716); R(x, '#8db9d6', 0, 1300, 1080, 620); R(x, '#759fc0', 0, 1560, 1080, 360)
  for (let i = 0; i < 6; i++) { x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = 4; x.beginPath(); x.ellipse(540, 1450 + i * 30, 380 - i * 40, 60 - i * 6, 0, 0.3, 2.6); x.stroke() }
  // the rail along the back
  R(x, INK, 0, 1150, 1080, 14); R(x, '#e8344e', 0, 1153, 1080, 8)
  for (let i = 0; i < 9; i++) R(x, INK, 40 + i * 125, 1150, 10, 60)
  snow(x, t, { n: 30, seed: 9, size: 6 })
}
function skate(x, cx, cy, s = 1) { R(x, INK, cx - 40 * s, cy, 80 * s, 10 * s); R(x, '#cfd6e6', cx - 36 * s, cy + 2 * s, 72 * s, 5 * s) }
function couples(x, t, star, u) {
  const p = (u * 0.18) % 1, cx = lerp(1250, -200, p)
  star(x, t, 'libra', { x: cx, y: 1330, s: 120, mood: 'happy', look: [-1, 0], seed: 31, glyph: false })
  star(x, t, 'taurus', { x: cx + 100, y: 1330, s: 120, mood: 'happy', look: [-1, 0], seed: 32, glyph: false })
}

function s1(x, t, S) {
  const { u, hero, star } = S
  rink(x, t)
  couples(x, t, star, u + 2)
  const wob = Math.sin(u * 7) * 0.5 + Math.sin(u * 13) * 0.3
  shadow(x, 330, 1390, 220)
  hero(x, t, { x: 330 + 20 * wob, y: 1250, s: 280, mood: u > 3.8 ? 'wide' : 'wide', look: [Math.sign(wob), 0.5], squash: 0.07 * wob, blink: false, hops: [1.0, 2.2, 3.85] })
  skate(x, 300 + 20 * wob, 1388); skate(x, 380 + 20 * wob, 1388)
}
function s2(x, t, S) {
  const { hero } = S
  rink(x, t)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 0, 1080, 1920)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'hold the|RAIL', { w: 320, h: 150, col: '#ffe27a', rot: 0.05, size: 44, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  note(x, 800, 1320, 'fall · laugh · again', { w: 360, h: 70, col: '#9fe6b0', rot: -0.04, size: 30, k: pop01(t, T.B + 1.4, 0.3, 2.4) })
}
function s3(x, t, S) {
  const { u, hero } = S
  rink(x, t)
  // 0–0.7 grip the rail, 0.7–1.1 plop, 1.1–2.0 laugh, 2.0 up, 2.2–3.8 glide a lap
  const plop = clamp(prog(u, 0.7, 0.9)) * (1 - clamp(prog(u, 1.9, 2.1)))
  const g = ease.inOutQuad(prog(u, 2.2, 3.8))
  const cx = u < 2.2 ? 330 : 330 + Math.sin(g * Math.PI * 2) * 340, cy = u < 2.2 ? 1250 + 50 * plop : 1250 + (1 - Math.cos(g * Math.PI * 2)) * 70
  shadow(x, cx, 1390 + (cy - 1250) * 0.6, 220)
  const mood = u < 0.9 ? 'neutral' : u < 1.1 ? 'wide' : u < 2.1 ? 'happy' : 'sparkle'
  hero(x, t, { x: cx, y: cy, s: 270, mood, look: [1, 0], squash: 0.22 * plop, blink: mood === 'wide' ? false : undefined, hops: [2.0, 2.3].map(v => S.t0 + v) })
  skate(x, cx - 30, cy + 135 - 40 * plop); skate(x, cx + 50, cy + 135 - 40 * plop)
  if (u > 2.2) for (let i = 1; i < 6; i++) { const gg = Math.max(0, g - i * 0.04); sparkles(x, t, 330 + Math.sin(gg * Math.PI * 2) * 340, 1380 + (1 - Math.cos(gg * Math.PI * 2)) * 50, S.t0 + 2.2 + i * 0.25, 4, 40, i) }
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  skate(x, 500, 1100, ok); skate(x, 590, 1100, ok)
}

const EP = makeSingle({
  id: 'nste13', sign: 'aries', name: 'Aries',
  hook: 'First time skating. | *Nobody* to grab.',
  h1: 'Grab the *rail.*', h2: 'Fall. Laugh. *Again.*',
  lines: ['hold the *rail.* that’s what it’s for.', 'fall, laugh, try *again.*'],
  last: 'You can be your own *steady.*',
  bubbles: [
    { t0: 0.9, t1: 3.6, x: 360, y: 990, text: 'whoa whoa whoa', size: 44, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 380, y: 990, text: 'who do I hold onto??', size: 42, tail: 0 },
    { t0: 14.35, t1: 15.4, x: 380, y: 1040, text: 'oop!', size: 46, tail: 0 },
    { t0: 15.45, t1: 16.6, x: 400, y: 1040, text: 'haha. again!', size: 44, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120, look: [-1, -1] }, pis3: { x: 960, y: 1630, s: 110 },
  meter: { x: 450, y: 1700 },
  s1, s2, s3, fin,
  cues: [['whoosh', 0.6, 0.6, 0.02], ['tom', 14.4, 110, { gain: 0.2, decay: 0.2 }], ['pop', 14.45, 659.25, 0.04, 0], ['whoosh', 15.8, 1.6, 0.03], ['glitter', 15.9, 17.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
