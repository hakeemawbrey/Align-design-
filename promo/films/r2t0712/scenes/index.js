// r2t0712: star_talk, SOLO, "Aquarians explaining | their new theory." (signs3kit social cut, music: lofi · E, ending: group)
// One sign the whole way (solo mode, 9 cards), each theory the most extreme Aquarius version:
//   0.0–3.6    "Aquarians explaining | *their new theory.*"
//   3.6–37.8   nine cards: pigeons invented maps · a diagram on the napkin (three napkins) · first date: "time is a circle"
//              · asked their sign, invented a thirteenth · a 3 am group chat slideshow (slide 1 of 40) · the work
//              whiteboard nobody asked for · the moon is just shy · proven wrong? now it's two theories · explained it
//              to the cat, the cat agreed
//  37.8        the ending (group): "Not weird. | *Just early.*"  Aquarius comes back, big.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, planet, chartWheel, friend, BIRD, BIRD_C, CAT, CAT_C, CLOUD, CLOUD_C, MUG, MUG_C, RED, CREAM, ORANGE, VIOLET, NIGHT } from './props.js'

const S = 'aquarius', TEAL = '#6be0ff'
// a scribbled diagram: boxes, arrows, a question mark
function scribble(x, t, lt, n = 1) {
  x.strokeStyle = '#3a3aa0'; x.lineWidth = 5; x.fillStyle = '#3a3aa0'
  const steps = clamp((lt - 0.4) / 1.0) * 5
  if (steps > 0) x.strokeRect(-120, -70, 70, 50)
  if (steps > 1) { x.beginPath(); x.moveTo(-50, -45); x.lineTo(30, -45); x.stroke(); x.fillRect(24, -52, 14, 14) }
  if (steps > 2) { x.beginPath(); x.arc(80, -40, 34, 0, Math.PI * 2); x.stroke() }
  if (steps > 3) { x.beginPath(); x.moveTo(80, 0); x.lineTo(0, 50); x.lineTo(-90, 10); x.stroke() }
  if (steps > 4) { x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?!', 20, 50) }
}
// a little folded map
function map(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  const C = ['#f4e4b8', '#e8d4a0', '#f4e4b8']
  for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(-126 + i * 84 - 4, -84, 92, 168); x.fillStyle = C[i]; x.fillRect(-126 + i * 84, -80, 84, 160) }
  x.strokeStyle = RED; x.lineWidth = 5; x.setLineDash([12, 8]); x.beginPath(); x.moveTo(-100, 50); x.quadraticCurveTo(0, -80, 100, 30); x.stroke(); x.setLineDash([])
  x.fillStyle = RED; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✕', 100, 30)
  x.restore()
}
// a zodiac wheel with a 13th slot squeezed in
function wheel13(x, t, cx, cy, k, lt) {
  chartWheel(x, t, cx, cy, 140, k, { center: '13?', spin: 0.1 })
  const s = pop01(t, t - lt + 1.2, 0.3, 2.4)
  if (s > 0.01) label(x, cx + 40, cy - 175, '+ NEW SIGN', s, { size: 30, bg: TEAL, font: MONO, weight: 700, rot: 0.08 })
}

const CAMEOS = [
  { sign: S, cap: 'At brunch: | *pigeons invented maps.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BIRD, BIRD_C, 820, 720, 18 * pop01(t, P.t0 + 0.25, 0.3, 2))
      map(x, 790, 960, pop01(t, P.t0 + 0.7, 0.35, 2))
      bubble(x, 520, 620, 'think about it.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Drew it on a napkin. | *Then three more.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      for (let i = 2; i >= 0; i--) {
        const k = pop01(t, P.t0 + 0.2 + (2 - i) * 0.5, 0.3, 2)
        board(x, 760 + i * 40, 780 + i * 110, k * (i === 0 ? 1 : 0.85), { w: 280, h: 200, frame: '#e8e4f8', bg: '#ffffff', rot: -0.06 + i * 0.07 }, x => scribble(x, t, i === 0 ? lt - 1.0 : 2))
      }
    } },
  { sign: S, cap: 'First date. | *“Time is a circle.”*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.8],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 800, 960, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.4 ? 'sleepy' : 'neutral', look: [-1, 0] })
      bubble(x, 560, 640, 'so if time | is a circle…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 800, 700, 'HOUR 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, font: MONO, weight: 700, rot: 0.06 })
    } },
  { sign: S, cap: 'Asked their sign. | *Invented a thirteenth.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { wheel13(x, t, 760, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: S, cap: 'Group chat, 3 a.m.: | *a slideshow.*', mood: 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 3)
      phone(x, 790, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: `SLIDE ${n} / 40`, headCol: TEAL, lines: [['THE TRUTH', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['about socks', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['who is awake', LAV, pop01(t, P.t0 + 1.6, 0.25, 2.2)]] })
    } },
  { sign: S, cap: 'Took over the whiteboard. | *Nobody asked.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      board(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 380, h: 270, legs: true }, x => scribble(x, t, lt))
      label(x, 790, 1110, 'MEETING: HIJACKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: TEAL, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: 'New theory: | *the moon is shy.*', mood: 'sparkle', look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), peek = 0.5 + 0.5 * Math.sin(lt * 2.6)
      planet(x, 790 + peek * 70, 760, 90, k, { body: '#fff1c8', crater: '#e8d8a0', face: 'shy' })
      drawBits(x, CLOUD, CLOUD_C, 760, 820, 18 * k)
      bubble(x, 790, 1060, 'leave it alone!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Proven wrong? | *Now it’s two theories.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const split = ease.outBack(clamp((lt - 1.0) / 0.5))
      label(x, 790, 760, 'WRONG', pop01(t, P.t0 + 0.3, 0.3, 2.2) * (1 - clamp((lt - 1.0) / 0.2)), { size: 44, bg: RED, color: CREAM, font: MONO, weight: 700 })
      if (lt > 1.0) { label(x, 790 - 90 * split, 820, 'THEORY A', split, { size: 34, bg: TEAL, font: MONO, weight: 700, rot: -0.08 }); label(x, 790 + 90 * split, 920, 'THEORY B', split, { size: 34, bg: GOLD, font: MONO, weight: 700, rot: 0.08 }) }
      sparkles(x, t, 790, 860, P.t0 + 1.0, 6, 160, 0.4)
    } },
  { sign: S, cap: 'Explained it to the cat. | *The cat agreed.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 800, 960, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 560, 640, '…and that’s why.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 830, 760, 'mrrp.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bc', col: LAV })
    } },
]

const F = makeFilm({
  id: 'r2t0712', key: 'E', accent: TEAL, solo: S, ending: 'group',
  title: 'Aquarians explain | *their new theory.*',
  cameos: CAMEOS,
  group: { cap: 'Not weird. | *Just early.*', mood: 'wink' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
