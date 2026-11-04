// nste20: SINGLE AND THRIVING, Ep 20 "The Invite" (23 s vertical, Next 30 b33, music: cinematic · Fm).
// Format kit: ../../nste01/singlekit.js (story 0–20.6, then the short end card). Rows: promo/films/next30/b33.md.
//   0.0–6.8    hook "Invited to their family dinner. | *Almost* said no." Scorpio at home turning over Cancer's handwritten
//              invite ("come to ours! ♡ Cancer"): "they invited… me?" → "I'd just be in the way…"  Pisces sniffles.
//   6.8        beat cut → THE STARS: "they asked because they *want* you." / "letting people in is *allowed.*"
//   13.6       Cancer's table, candles and a pie; a place card "♏ SCORPIO". Scorpio pops in, everyone cheers:
//              "you made it!!" → Scorpio: "…I'm really glad I came."  Meter fills.
//   17.4       "Scorpio: *thriving.*" Last line: "Let them *set* a place for you."
import { makeSingle, room, stringLights, table, box, R, ink, note, shadow, sparkles, hearts, glow, confetti, pop01, prog, lerp, ease, T, INK, BONE, GOLD } from '../../nste01/singlekit.js'

const SERIF = "'EB Garamond', Georgia, serif"
function invite(x, cx, cy, rot = 0, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.4)', -150, -86, 310, 196); box(x, -160, -100, 320, 200, '#fff6e6', { b: 6 })
  R(x, '#e8344e', -160, -100, 320, 14)
  ink(x, 'come to ours!', 0, -30, { size: 40, font: SERIF, weight: 500 })
  ink(x, 'dinner · 7pm · ♡', 0, 20, { size: 28, font: SERIF, weight: 500 })
  ink(x, '— Cancer', 70, 64, { size: 26, font: SERIF, weight: 500, col: '#4f7cd8' })
  x.restore()
}
function candle(x, t, cx, cy) { R(x, INK, cx - 10, cy - 70, 20, 70); R(x, BONE, cx - 6, cy - 66, 12, 62); R(x, '#ffd23a', cx - 5, cy - 88 + 2 * Math.sin(t * 9), 10, 16); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, cx, cy - 80, 90, 0.3, '255,210,120'); x.restore() }
function pie(x, cx, cy) { x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 80, 30, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9a35c'; x.beginPath(); x.ellipse(cx, cy - 4, 74, 24, 0, 0, Math.PI * 2); x.fill(); for (let i = -2; i <= 2; i++) R(x, '#b07a3a', cx + i * 24 - 3, cy - 20, 6, 30) }
const HOME = (x, t) => room(x, t, { wall: '#261d3c', wall2: '#221a36', floor: '#2e2440', win: { x: 680, y: 470, w: 260, h: 280 } })

function s1(x, t, S) {
  const { u, hero } = S
  HOME(x, t)
  hero(x, t, { x: 330, y: 1220, s: 280, mood: u > 3.8 ? 'neutral' : 'wide', look: u > 3.8 ? [0.6, 1] : [1, -0.2], hops: [0.6, 3.85] })
  invite(x, 700, 1040, -0.06 + 0.05 * Math.sin(u * 2), 1.3)
}
function s2(x, t, S) {
  const { hero } = S
  HOME(x, t)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'they WANT|you there', { w: 340, h: 150, col: '#ffe27a', rot: 0.05, size: 40, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { wall: '#3a2638', wall2: '#342234', floor: '#43303e', win: null })
  stringLights(x, t, -20, 450, 1100, 450, { n: 16, sag: 60 })
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 1150, 520, 0.14, '255,190,120'); x.restore()
  const cheer = u > 0.9
  star(x, t, 'cancer', { x: 560, y: 1100, s: 210, mood: cheer ? 'happy' : 'sparkle', look: [1, 0], seed: 81, hops: [1.0, 1.3, 1.6].map(v => S.t0 + v) })
  star(x, t, 'taurus', { x: 760, y: 1110, s: 180, mood: cheer ? 'happy' : 'neutral', look: [1, 0], seed: 82, glyph: false, hops: [1.05, 1.4].map(v => S.t0 + v) })
  star(x, t, 'virgo', { x: 360, y: 1110, s: 180, mood: cheer ? 'happy' : 'neutral', look: [1, 0], seed: 83, glyph: false, hops: [1.1, 1.45].map(v => S.t0 + v) })
  table(x, 600, 1250, 820, '#6b4a2f')
  candle(x, t, 420, 1250); candle(x, t, 780, 1250); pie(x, 600, 1235)
  note(x, 880, 1235, '♏ SCORPIO', { w: 170, h: 50, col: BONE, rot: -0.04, size: 22 })
  const k = pop01(t, S.t0 + 0.7, 0.36, 2.2)
  if (k > 0.01) hero(x, t, { x: 930, y: 1100, s: 210, pop: k, mood: u > 2.3 ? 'happy' : 'sparkle', look: [-1, 0], hops: [1.0, 2.35, 2.7].map(v => S.t0 + v) })
  confetti(x, t, S.t0 + 1.0, 600, 900)
  hearts(x, t, S.t0 + 2.4, 930, 960, { n: 5 })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
  note(x, 790, 1080, '♏ SCORPIO', { w: 190, h: 56, col: BONE, rot: 0.06, size: 24, k: ok })
}

const EP = makeSingle({
  id: 'nste20', sign: 'scorpio', name: 'Scorpio',
  hook: 'Invited to their | family dinner. | *Almost* said no.', hookSize: 84, hookTop: 140,
  h1: 'You’re *wanted.*', h2: 'Let them *in.*',
  lines: ['they asked because they *want* you.', 'letting people in is *allowed.*'],
  last: 'Let them *set* a place for you.',
  bubbles: [
    { t0: 1.0, t1: 3.6, x: 300, y: 1010, text: 'they invited… me?', size: 42, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 300, y: 1010, text: 'I’d just be in the way…', size: 40, tail: 0 },
    { t0: 14.4, t1: 15.7, x: 560, y: 880, text: 'you made it!!', size: 44, tail: 0 },
    { t0: 15.85, t1: 17.3, x: 760, y: 880, text: '…I’m really glad I came.', size: 38, tail: 0.6, col: '#ffe2c4' },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 960, y: 1630, s: 110 },
  meter: { x: 450, y: 1620 },
  s1, s2, s3, fin,
  cues: [['pop', 14.3, 987.77, 0.04, 0.4], ['glitter', 14.6, 15.2], ['pop', 14.6, 1174.66, 0.035, -0.2], ['pop', 14.7, 1318.51, 0.035, 0.2]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, prog, GOLD]
