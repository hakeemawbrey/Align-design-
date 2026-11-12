// r2a0142: star_advice, ADVICE SOLO, "Cancer, you're not | too much." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm reframe, one gag each.
// Ending: group (the group beat is the punchline; no lesson, no last line).
//   0.0–3.6    "Cancer, you're not | *too much.*"
//   3.6–37.8   nine cards (3.8 s each):
//              texted "home safe?" three times, that's love · packed snacks for everyone (a bag for twelve)
//              · cried at a commercial, soft is strong · knows everyone's sign and birthday, a superpower
//              · hiding in your shell, rest is allowed (a blanket fort) · the group's mom friend (a first-aid kit with
//              everything) · kept every ticket stub, memories matter · hugs that last too long, nobody's complaining
//              · your soup heals (a steaming bowl)
//  37.8        "You're not too much. | You're *home.*"  Cancer comes back, big.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CAN = '#8fd3ff', RED = '#e23d4e'
const S = 'cancer'

// ── props
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x); x.restore()
}
function msg(x, y, text, col, right, size = 30) {
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 28, h = size + 22, l = right ? 96 - w : -96
  x.fillStyle = col; x.fillRect(l, y - h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, l + 14, y + 2)
}
const BAG = [
  '...KKKK...',
  '..K....K..',
  'BBBBBBBBBB',
  'BbbbbbbbbB',
  'BbbbbbbbbB',
  'BbbbbbbbbB',
  'BbbbbbbbbB',
  'BbbbbbbbbB',
  'BBBBBBBBBB',
]
const BAG_C = { K: '#8a5a3a', B: '#c98f2a', b: '#e8b56a' }
// a little TV with a heart on the screen
function tv(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-60, -200, 8, 70); x.fillRect(52, -200, 8, 70)
  x.fillStyle = INK; x.fillRect(-170, -140, 340, 260); x.fillStyle = '#6b62a8'; x.fillRect(-160, -130, 320, 240)
  x.fillStyle = '#140c30'; x.fillRect(-140, -112, 280, 196)
  x.restore()
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, cx, cy - 12 * k, 12 * k * (1 + 0.08 * Math.sin(t * 6)))
}
// a blanket fort with a little door: the star peeks out
function fort(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-250, 160); x.lineTo(0, -170); x.lineTo(250, 160); x.closePath(); x.fill()
  x.fillStyle = '#7a6fd0'; x.beginPath(); x.moveTo(-236, 152); x.lineTo(0, -154); x.lineTo(236, 152); x.closePath(); x.fill()
  x.fillStyle = '#9a90e8'; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(-236 + i * 118, 152); x.lineTo(0, -154); x.lineTo(-236 + i * 118 + 40, 152); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.moveTo(-90, 152); x.lineTo(0, 10); x.lineTo(90, 152); x.closePath(); x.fill()
  x.restore()
}
const KIT = [
  'KKKKKKKKKKKK',
  'KWWWWWWWWWWK',
  'KWWWWRRWWWWK',
  'KWWWWRRWWWWK',
  'KWWRRRRRRWWK',
  'KWWRRRRRRWWK',
  'KWWWWRRWWWWK',
  'KWWWWRRWWWWK',
  'KWWWWWWWWWWK',
  'KKKKKKKKKKKK',
]
const KIT_C = { K: '#2a2350', W: '#f4f1ff', R: RED }
function stub(x, cx, cy, k, text, col, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -46, 252, 92); x.fillStyle = col; x.fillRect(-120, -40, 240, 80)
  x.setLineDash([6, 6]); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(70, -40); x.lineTo(70, 40); x.stroke()
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, -24, 2)
  x.restore()
}
function bowl(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(255,255,255,0.55)'
  for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.fillRect(-70 + i * 60 + Math.sin(ph * 8 + i) * 10, -60 - ph * 160, 18, 40) }
  x.globalAlpha = 1
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -30, 190, 42, 0, 0, 7); x.fill()
  x.fillStyle = '#ffb34a'; x.beginPath(); x.ellipse(0, -30, 176, 32, 0, 0, 7); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-190, -30); x.quadraticCurveTo(-170, 140, 0, 140); x.quadraticCurveTo(170, 140, 190, -30); x.closePath(); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-176, -22); x.quadraticCurveTo(-156, 126, 0, 126); x.quadraticCurveTo(156, 126, 176, -22); x.closePath(); x.fill()
  x.fillStyle = CAN; x.fillRect(-150, 20, 300, 14)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Texted “home safe?” | *Three times.* Love.', mood: lt => lt > 1.7 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 780, 870, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        if (lt > 0.4) msg(x, -110, 'home safe?', CAN, true, 28)
        if (lt > 0.8) msg(x, -40, 'home safe??', CAN, true, 28)
        if (lt > 1.2) msg(x, 30, 'HOME SAFE???', CAN, true, 28)
        if (lt > 1.7) msg(x, 110, 'yes, love u', MINT, false, 28)
      })
    } },
  { sign: S, cap: 'Packed snacks | *for everyone?* Sweet.', mood: 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 780, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 780, 890, 'SNACKS FOR 12', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 780, 1110, 'JUST IN CASE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cried at an ad? | *Soft is strong.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', tears: lt => lt > 0.8 ? 2 : 0, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      tv(x, t, 780, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 780, 1110, 'STRONG ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Know everyone’s birthday? | *Superpower.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      ;[['SAM ♈︎ MAR 28', PINK], ['JO ♍︎ SEP 2', MINT], ['MOM ♓︎ MAR 1', SKYB], ['YOU ♋︎ JUL 4', GOLD]].forEach(([s, c], i) =>
        label(x, 780, 680 + i * 120, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.4), { size: 28, bg: c, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }))
    } },
  { sign: S, cap: 'Hiding in your shell? | *Rest is allowed.*', mood: 'sleepy', star: { x: 0, y: 140, s: 200 },
    back(x, t, lt, P) { fort(x, 540, 930, pop01(t, P.t0 + 0.15, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 640, 'RECHARGING…', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The mom friend? | *Lucky friends.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, KIT, KIT_C, 780, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 780, 1080, 'HAS: EVERYTHING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Kept every ticket stub? | *Memories matter.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      ;[['FIRST GIG', PINK, -0.12], ['ZOO 2019', MINT, 0.08], ['MOVIE ♥', SKYB, -0.05], ['FAIR', GOLD, 0.1]].forEach(([s, c, r], i) =>
        stub(x, 790 + (i % 2 ? 30 : -30), 660 + i * 130, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), s, c, r))
    } },
  { sign: S, cap: 'Hugs that last *too long?* | Nobody’s complaining.', mood: 'heart', star: { x: -120 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2), near = ease.inOutCubic(prog(lt, 0.6, 1.0))
      if (k > 0.01) signChar(x, t, 'capricorn', lerp(880, 680, near), 930, 230 * k, { mood: lt > 1.4 ? 'happy' : 'wide', look: [-1, 0], seed: 21, glyph: false })
      label(x, 700, 1150, `HUG: ${Math.max(1, Math.floor((lt - 0.6) * 9))} MIN`, pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      if (lt > 1.0) hearts(x, t, 760, 760, P.t0 + 1.0 * 1.29, { n: 6, life: 1.8, spread: 240, cell: 8, seed: 3 })
    } },
  { sign: S, cap: 'Your soup? | It *actually heals.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bowl(x, t, 780, 930, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1130, 'SOUP: HEALING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0142', key: 'F', accent: CAN, solo: S, ending: 'group',
  title: 'Cancer, you’re not | *too much.*',
  cameos: CAMEOS,
  group: { cap: 'You’re not too much. | You’re *home.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
