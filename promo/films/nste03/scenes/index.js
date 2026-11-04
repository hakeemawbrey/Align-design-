// nste03: SINGLE AND THRIVING, Ep 3 "The Couples Photo" (25 s vertical, Next 30 b33, music: pop · D).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Everyone in the photo | *is a pair.*" Gemini behind a camera on a tripod, framing two cosy couples
//              (Libra + Cancer, Leo + Virgo) under the party lights. "say cheese!" → Gemini: "I'll just… take it?"
//   6.8        card cut → THE STARS: "you're not the *extra* in this picture." / "you're one of the *people* in it."
//   13.6       the self-timer blinks 3, 2, 1; Gemini dashes in, the couples scoot apart and make room in the middle; FLASH,
//              and the print slides out with everybody on it. Meter fills.
//   17.4       "Gemini: *thriving.*" holding the print. Last line: "You were never the *spare.*"
import { makeSingle, room, stringLights, box, R, ink, note, shadow, sparkles, glow, pop01, prog, lerp, ease, clamp, T, INK, BONE } from '../../nste01/singlekit.js'

const PARTY = (x, t) => {
  room(x, t, { wall: '#2c1f4e', wall2: '#271b47', floor: '#3b2948', win: null })
  stringLights(x, t, -20, 440, 560, 470, { n: 9, sag: 60 }); stringLights(x, t, 520, 470, 1100, 440, { n: 9, sag: 60 })
}
function camera(x, t, cx, cy, { k = 1, blink = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -6, 40, 12, 240); for (const d of [-1, 1]) { x.save(); x.translate(0, 270); x.rotate(d * 0.4); R(x, INK, -6, 0, 12, 110); x.restore() }
  box(x, -80, -40, 160, 90, '#3a3550', { b: 6, hi: '#55507a' })
  R(x, INK, -36, -26, 62, 62); R(x, '#7fd0ff', -28, -18, 46, 46); R(x, '#ffffff', -20, -12, 12, 12)
  R(x, blink > 0 ? '#ff4f6e' : '#5a2030', 48, -30, 16, 16)
  x.restore()
}
const COUPLES = [['libra', 600, 0], ['cancer', 700, 1], ['leo', 860, 2], ['virgo', 960, 3]]
function couples(x, t, star, { spread = 0, mood = 'happy', y = 1270, s = 160 } = {}) {
  for (const [sg, cx, i] of COUPLES) {
    const dx = (i < 2 ? -1 : 1) * spread * (i === 0 || i === 3 ? 1.6 : 1)
    const lean = i % 2 ? -1 : 1
    star(x, t, sg, { x: cx + dx - (spread ? 70 : 0), y, s, mood, look: [0, 0], seed: 10 + i, squash: spread ? 0 : 0.02 * lean, glyph: false })
  }
}
function polaroid(x, t, cx, cy, k, star, rot = -0.08) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.45)', -150, -128, 320, 290); box(x, -160, -140, 320, 290, BONE, { b: 6 })
  R(x, '#2c1f4e', -140, -120, 280, 200)
  const fig = [['libra', -105], ['cancer', -60], ['gemini', 0], ['leo', 60], ['virgo', 105]]
  for (const [sg, dx] of fig) star(x, t, sg, { x: dx, y: -10, s: sg === 'gemini' ? 70 : 52, mood: 'happy', look: [0, 0], tips: false, bob: 0, glyph: false })
  ink(x, 'all of us ♡', 0, 116, { size: 30, font: "'EB Garamond', Georgia, serif", weight: 500 })
  x.restore()
}

function s1(x, t, S) {
  const { u, hero, star } = S
  PARTY(x, t)
  shadow(x, 780, 1420, 520)
  couples(x, t, star)
  camera(x, t, 330, 1100)
  hero(x, t, { x: 190, y: 1130, s: 240, mood: u > 3.8 ? 'neutral' : 'happy', look: u > 3.8 ? [1, 0.6] : [1, -0.1], hops: [0.2, 3.85] })
}
function s2(x, t, S) {
  const { hero } = S
  PARTY(x, t)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'you’re IN|the picture', { w: 380, h: 150, col: '#ffe27a', rot: -0.05, size: 38, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.A + 1.55, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero, star } = S
  PARTY(x, t)
  const sp = ease.outBack(prog(u, 0.9, 1.4))
  shadow(x, 700, 1420, 640)
  couples(x, t, star, { spread: 60 * sp, mood: u > 0.9 ? 'sparkle' : 'happy' })
  // Gemini dashes in to the gap
  const run = ease.inOutCubic(prog(u, 0.3, 1.2))
  hero(x, t, { x: lerp(190, 780 - 70, run), y: lerp(1130, 1230, run), s: lerp(240, 200, run), mood: run < 1 ? 'wide' : 'happy', look: [1, 0], hops: [S.t0 + 0.35, S.t0 + 0.75, S.t0 + 1.15] })
  const blink = u < 2.2 ? Math.floor(u * 3) % 2 : 0
  camera(x, t, 230, 1100, { blink })
  const fl = clamp(1 - Math.abs(u - 2.2) / 0.25)
  if (fl > 0) { x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 230, 1080, 900, 0.6 * fl, '255,255,255'); x.restore() }
  polaroid(x, t, 330, lerp(1100, 860, ease.outCubic(prog(u, 2.4, 3.0))), pop01(t, S.t0 + 2.4, 0.35, 2), star, -0.08)
  ;['3', '2', '1'].forEach((n, i) => { const a = S.t0 + 0.6 + i * 0.5; if (t > a && t < a + 0.45) ink(x, n, 230, 940, { size: 90, col: '#ff4f6e' }) })
}
function fin(x, t, S) {
  const { hero, ok, u, star } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  polaroid(x, t, 820, 640, ok * 0.75, star, 0.1)
}

const EP = makeSingle({
  id: 'nste03', sign: 'gemini', name: 'Gemini',
  hook: 'Everyone in the photo | *is a pair.*',
  h1: 'Hold *up.*', h2: 'Get *in* the shot.',
  lines: ['you’re not the *extra* in this picture.', 'you’re one of the *people* in it.'],
  last: 'You were never the *spare.*',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 780, y: 1000, text: 'say cheese!!', size: 42, tail: 0 },
    { t0: 3.8, t1: 6.6, x: 300, y: 900, text: 'I’ll just… take it?', size: 42, tail: -0.4 },
    { t0: 14.0, t1: 15.7, x: 760, y: 1000, text: 'scoot! scoot!', size: 40, tail: 0.2 },
    { t0: 16.0, t1: 17.3, x: 740, y: 1010, text: 'all of us!!', size: 42, tail: 0, col: '#ffe2c4' },
  ],
  pis1: { x: 950, y: 1590, s: 130 }, pis3: { x: 960, y: 1610, s: 120 },
  s1, s2, s3, fin,
  cues: [['tick', 14.2, 0.05], ['tick', 14.7, 0.05], ['tick', 15.2, 0.05], ['whoosh', 13.9, 0.4, 0.03], ['pop', 15.8, 1760, 0.05, -0.3], ['glitter', 15.8, 16.2], ['whoosh', 16.0, 0.4, 0.03]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
