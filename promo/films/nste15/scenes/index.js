// nste15: SINGLE AND THRIVING, Ep 15 "Nine Hellos" (25 s vertical, Next 30 b33, music: synthwave · F#m).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the shared end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Texted *nine* people. | Still lonely." Gemini with a phone in each hand, "hey!" bubbles flying out in
//              every direction ("hey!" "hey!!" "heyyy"), replies trickling back as thumbs. Then: "why do I still feel
//              alone?"  Pisces sniffles.
//   6.8        card cut → THE STARS: "lots of *hellos.* not much *talking.*" / "call *one* friend. really catch up."
//   13.6       one phone, one call: Libra's face on screen, the call timer racing from 0:01 to 1:02:14. Gemini laughing:
//              "wait, tell me EVERYTHING." → Libra: "it's been an HOUR?!"  Meter fills.
//   17.4       "Gemini: *thriving.*" Last line: "One real call beats *ten* hellos."
import { makeSingle, room, box, R, ink, note, shadow, sparkles, hearts, pop01, prog, lerp, ease, clamp, T, INK, BONE, MONO } from '../../nste01/singlekit.js'

const DARK = (x, t) => room(x, t, { wall: '#1e1a3c', wall2: '#1a1636', floor: '#26203e', win: { x: 700, y: 470, w: 240, h: 260 } })
function miniPhone(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -30, -52, 60, 104); R(x, '#2a2148', -25, -47, 50, 94); R(x, '#7fd0ff', -19, -38, 38, 66); x.restore() }
function heyBubble(x, cx, cy, text, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 42px Inter, sans-serif`; const w = x.measureText(text).width + 36
  R(x, INK, -w / 2 - 5, -34, w + 10, 68); R(x, '#5fa8ff', -w / 2, -29, w, 58)
  x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 1)
  x.restore()
}
const HEYS = ['hey!', 'hey!!', 'heyyy', 'hiii', 'hey you', 'yo!', 'hey!', 'hello!!', 'heyy']

function s1(x, t, S) {
  const { u, hero } = S
  DARK(x, t)
  HEYS.forEach((h, i) => {
    const b = i * 0.32 - 0.6, p = (u - b) / 2.6
    if (p < 0 || p > 1) return
    const a = -Math.PI / 2 + (i - 4) * 0.36, r = 200 + p * 240
    heyBubble(x, 540 + Math.cos(a) * r, 1100 + Math.sin(a) * r * 0.9, h, Math.min(1, p * 6) * (1 - ease.inQuad(prog(p, 0.7, 1))))
  })
  hero(x, t, { x: 540, y: 1200, s: 290, mood: u > 3.8 ? 'neutral' : 'sparkle', look: u > 3.8 ? [0, 1] : [0, -1], hops: [0.1, 0.5, 0.9, 1.3, 1.7, 3.85] })
  miniPhone(x, 370, 1220, -0.3); miniPhone(x, 710, 1220, 0.3)
}
function s2(x, t, S) {
  const { hero } = S
  DARK(x, t)
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'call ONE|friend', { w: 320, h: 150, col: '#ffe27a', rot: 0.05, size: 44, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function callTimer(u) {
  const s = Math.floor(lerp(1, 3734, ease.inCubic(clamp(u / 3.6))))
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${m}:${String(ss).padStart(2, '0')}`
}
function s3(x, t, S) {
  const { u, hero, star } = S
  DARK(x, t)
  // the big call screen
  box(x, 560, 560, 400, 640, '#2a2148', { b: 8 }); R(x, '#14102a', 576, 630, 368, 540)
  ink(x, 'on a call', 760, 670, { size: 26, col: '#9fe6b0', font: MONO, weight: 700 })
  star(x, t, 'libra', { x: 760, y: 880, s: 220, mood: u > 2.3 ? 'happy' : 'sparkle', look: [-0.6, 0], seed: 41, hops: [0.6, 1.4, 2.3, 2.6].map(v => S.t0 + v) })
  ink(x, callTimer(u), 760, 1110, { size: 44, col: BONE, font: MONO, weight: 700 })
  hero(x, t, { x: 290, y: 1200, s: 290, mood: u > 0.4 ? 'happy' : 'sparkle', look: [1, -0.4], hops: [0.3, 0.9, 1.2, 2.0, 2.9].map(v => S.t0 + v) })
  miniPhone(x, 430, 1170, 0.4)
  hearts(x, t, S.t0 + 1.2, 540, 900, { n: 6 })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  miniPhone(x, 720, 1040, 0.3)
}

const EP = makeSingle({
  id: 'nste15', sign: 'gemini', name: 'Gemini',
  hook: 'Texted *nine* people. | Still lonely.',
  h1: 'Fewer *hellos.*', h2: 'One *real* call.',
  lines: ['lots of *hellos.* not much *talking.*', 'call *one* friend. really catch up.'],
  last: 'One real call beats *ten* hellos.',
  bubbles: [
    { t0: 3.85, t1: 6.6, x: 540, y: 960, text: 'why do I still feel alone?', size: 40, tail: 0 },
    { t0: 14.2, t1: 15.7, x: 330, y: 960, text: 'wait, tell me EVERYTHING.', size: 38, tail: -0.2 },
    { t0: 15.9, t1: 17.3, x: 700, y: 520, text: 'it’s been an HOUR?!', size: 40, tail: 0.2, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 960, y: 1630, s: 110 },
  meter: { x: 450, y: 1620 },
  s1, s2, s3, fin,
  cues: [...HEYS.map((h, i) => ['pop', +(Math.max(0.05, i * 0.32 - 0.6 + 0.05)).toFixed(2), [880, 987.77, 1174.66, 1318.51][i % 4] * 1.5, 0.025, (i % 2 ? 0.4 : -0.4)]), ['pluck', 13.75, 1174.66, 0.04, 0.6, 0.3], ['pluck', 13.95, 1567.98, 0.035, 0.6, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
