// r2a0117: ADVICE SOLO, "Aries, you’re allowed | to want more." (~47 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aries truth + a warm reframe, one gag each.
//   0.0–3.6    "Aries, it’s okay | to *want more.*"
//   3.6–37.8   want the bigger role (hand up: me! me!) · ambition is fuel (the gauge hits FULL) · want seconds (seconds: yes)
//              · outgrew the old goal (a bigger target) · asking for a raise (a coin stack: worth it) · want more rest
//              (nap: earned) · big dream, no permission slip needed · want closeness (say it first) · came second (round 2)
//  37.8        GROUP ENDING: "More is allowed. | *Go get it.*"  The big Aries star, sparkling.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff6b5a', DRED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a'
const S = 'aries'

const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PASTA = ['...YYYY...', '.YYYYYYYY.', 'YYYRYYYRYY', 'YYYYYYYYYY']
const COIN = ['.YYYY.', 'YYWYYY', 'YYYYYY', '.YYYY.']
const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWLWWWWWWLWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']

function gauge(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.lineTo(150, 30); x.lineTo(-150, 30); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 138, Math.PI, 0); x.lineTo(138, 20); x.lineTo(-138, 20); x.fill()
  const seg = [DRED, ORANGE, GOLD, '#5fd068']
  seg.forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 26; x.beginPath(); x.arc(0, 0, 108, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); x.stroke() })
  const a = Math.PI + Math.PI * (0.08 + 0.88 * p)
  x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 110, Math.sin(a) * 110); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 16, 0, Math.PI * 2); x.fill()
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('E', -120, 0 + 8 - 40); x.fillText('F', 120, -32)
  x.restore()
}
function target(x, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  ;[INK, BONE, DRED, BONE, DRED, BONE, DRED].forEach((c, i) => { x.fillStyle = c; x.beginPath(); x.arc(0, 0, r * (1 - i * 0.14) + (i ? 0 : 8), 0, Math.PI * 2); x.fill() })
  x.restore()
}
function slip(x, cx, cy, k, stamped) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = '#fff4e2'; x.fillRect(-142, -102, 284, 204)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PERMISSION SLIP', 0, -66)
  x.fillStyle = '#c9c0b0'; for (let i = 0; i < 3; i++) x.fillRect(-110, -20 + i * 32, 220 - i * 40, 8)
  x.restore()
  if (stamped > 0) label(x, cx + 10, cy + 20, 'NOT NEEDED', stamped, { size: 44, bg: DRED, color: '#fff4e2', rot: -0.18, font: MONO, weight: 700 })
}
function ribbon(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  x.fillStyle = BONE; x.fillRect(cx - 150, cy - 200, 18, 340); x.fillRect(cx + 132, cy - 200, 18, 340)
  for (let i = 0; i < 10; i++) { x.fillStyle = i % 2 ? INK : BONE; x.fillRect(cx - 150 + i * 30, cy - 230, 30, 30) }
  x.fillStyle = '#e23d4e'; x.fillRect(cx - 132, cy - 20, 264, 16)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Want the bigger role? | *Raise your hand.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'ME! ME!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 60, tail: 'bl' })
      label(x, 790, 1000, 'LEAD ROLE: YOURS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ambition isn’t greedy. | It’s *fuel.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      gauge(x, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outBack ? ease.outCubic(prog(lt, 0.4, 1.4)) : prog(lt, 0.4, 1.4))
      label(x, 790, 1080, 'TANK: FULL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: '#5fd068', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want seconds? | *Ask for seconds.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PLATE, { W: '#fff4e2' }, 790, 1000, 20 * k)
      drawBits(x, PASTA, { Y: '#ffd98a', R: DRED }, 790, lerp(700, 950, ease.outCubic(prog(lt, 0.9, 1.3))), 20 * pop01(t, P.t0 + 1.0, 0.2, 2))
      label(x, 790, 730, 'SECONDS: YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Outgrew the old goal? | *Pick a bigger one.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.9, 1.5))
      target(x, 790, 880, lerp(60, 170, g), pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, g > 0.5 ? 'NEW GOAL' : 'OLD GOAL', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: g > 0.5 ? GOLD : BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asking for a raise? | *You’re worth it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * 9)
      for (let i = 0; i < n; i++) drawBits(x, COIN, { Y: GOLD, W: '#fff' }, 790 + (i % 2) * 6, 1100 - i * 34, 16)
      label(x, 790, 700, 'WORTH IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 48, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Want more rest? | *Also allowed.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: '#fff4e2', L: LAV }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 760, 'zzz…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
      label(x, 790, 1120, 'NAP: EARNED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big dream? | No *permission slip* needed.', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      slip(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.2, 0.25, 2.6))
    } },
  { sign: S, cap: 'Want closeness? | *Say it first.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 980, 200 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 14, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 680, 720, 'I really | like you!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Came second? | *Run it again.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [1.1, 1.5],
    front(x, t, lt, P) {
      ribbon(x, 770, 960, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 770, 1150, 'ROUND 2', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0117', key: 'F', accent: RED, solo: 'aries', ending: 'group',
  title: 'Aries, it’s okay | to *want more.*',
  cameos: CAMEOS,
  group: { cap: 'More is allowed. | *Go get it.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
