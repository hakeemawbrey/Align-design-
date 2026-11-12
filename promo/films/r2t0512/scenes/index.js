// r2t0512: star_talk, SOLO, "Late Geminis | *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (solo mode, 9 cards), each the most extreme Gemini-running-late. Ending: callback.
//   3.6–37.8   "five minutes away", still in the shower · went back for phone two · bumped into a friend, chatted an hour
//              · outfit number four · blamed traffic, they walked · a nine-minute voice note about being late · late to the
//              date, brought a chart reading · took a shortcut, it was longer · finally arrived: wrong café
//  37.8        "Late, but | *never boring.*"
//  41.2        callback: "Still five | *minutes away.*" (card 1's text, the clock spinning)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, chartWheel, clock, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const S = 'gemini', GY = '#f2cf4a'
const SHOWER = ['KKKKKK.....', '.....K.....', '.....K.....', '...SSSSS...', '..SSSSSSS..', '..SKSKSKS..']
const SHOWER_C = { K: '#c9c9d8', S: '#d8dbe8' }
const PHONEB = ['KKKKKK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KKWWKK']
const PH1_C = { K: '#2a2350', S: SKYB, W: BONE }, PH2_C = { K: '#2a2350', S: GY, W: BONE }
const SHIRT = ['TT...TT', 'TTTTTTT', '.TTTTT.', '.TTTTT.', '.TTTTT.']
const SHOE = ['....KKK..', '...KWWK..', 'KKKWWWWK.', 'KWWWWWWWK', 'KKKKKKKKK']
const SHOE_C = { K: INK, W: '#ff8f6a' }

function drops(x, t, cx, cy) { for (let i = 0; i < 8; i++) { const ph = (t * 1.6 + i / 8) % 1; x.fillStyle = SKYB; x.fillRect(cx - 50 + (i % 4) * 32, cy + ph * 200, 8, 18) } }

const CAMEOS = [
  { sign: S, cap: '“Five minutes away.” | *Still in the shower.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHOWER, SHOWER_C, F.x + 30, F.top - 70, 16 * k)
      if (k > 0.5) drops(x, t, F.x + 30, F.top - 30)
      bubble(x, 790, 760, 'omw!! | 5 min away', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: GY, tail: 'bl' })
      label(x, 790, 1080, '(not dressed)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Left on time. | Went back for *phone two.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PHONEB, PH1_C, 720, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      drawBits(x, PHONEB, PH2_C, 870, 900, 22 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.1 })
      label(x, 720, 1080, 'WORK', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      label(x, 870, 1080, 'ALSO WORK', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 32, bg: GY, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 660, 'BOTH ESSENTIAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bumped into a friend. | *Chatted for an hour.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 950, 220 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 560, 650, 'and THEN…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: GY, tail: 'bl' })
      label(x, 820, 690, `+${Math.round(clamp((lt - 0.6) / 1.4) * 60)} MIN`, pop01(t, P.t0 + 0.7, 0.3, 2), { size: 44, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One outfit? | Try *outfit four.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P, F) {
      const n = Math.min(3, Math.floor(clamp((lt - 0.2) / 1.5) * 3.99))
      const COLS = [RED, MINT, LAV, GY]
      drawBits(x, SHIRT, { T: COLS[n] }, 790, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 10) })
      for (let i = 0; i < n; i++) drawBits(x, SHIRT, { T: COLS[i] }, 380 + i * 50, 1130 - i * 14, 11, { rot: -0.3 + i * 0.2 })
      label(x, 790, 680, `OUTFIT ${n + 1}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: GY, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Blamed the traffic. | *They walked.*', mood: 'wink', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SHOE, SHOE_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 8) })
      bubble(x, 790, 720, 'traffic was | WILD', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      label(x, 790, 1120, 'CARS PASSED: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent a nine-minute voice note | *about being late.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-190, -60, 380, 120); x.fillStyle = GY; x.fillRect(-182, -52, 364, 104)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-160, -24); x.lineTo(-160, 24); x.lineTo(-124, 0); x.fill()
        for (let i = 0; i < 18; i++) { const h = 10 + 34 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillRect(-100 + i * 15, -h / 2, 8, h) }
        x.restore()
      }
      label(x, 790, 1040, '9:41', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 48, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 700, 'LISTENED: NOBODY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Late to the date. | Brought a *chart reading.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 130)
      label(x, 790, 1080, '“IT’S A ♊︎ THING”', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: GY, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.5, spread: 180, cell: 6, seed: 8 })
    } },
  { sign: S, cap: 'Took a shortcut. | *It was longer.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 880); x.rotate(0.03); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-180, -200, 360, 400); x.fillStyle = '#e8f0d8'; x.fillRect(-172, -192, 344, 384)
      x.strokeStyle = RED; x.lineWidth = 8; x.setLineDash([16, 10]); x.beginPath()
      const n = Math.floor(clamp((lt - 0.3) / 1.3) * 60)
      for (let i = 0; i <= n; i++) { const u = i / 60, px = -130 + 260 * u + 90 * Math.sin(u * 19), py = 140 - 280 * u + 70 * Math.cos(u * 13); i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke(); x.setLineDash([])
      x.fillStyle = MINT; x.fillRect(-146, 124, 32, 32); x.fillStyle = GOLD; x.fillRect(114, -156, 32, 32)
      x.restore()
      label(x, 800, 1120, 'SAVED: -40 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Finally arrived. | *Wrong café.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'i’m here!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: GY, tail: 'bl' })
      phone(x, 800, 1000, pop01(t, P.t0 + 1.1, 0.3, 2) * 0.78, { head: 'FRIEND', headCol: MINT, lines: [['where??', PINK, 1], ['other side', PINK, 1], ['of town', PINK, 1]] })
    } },
]

const F = makeFilm({
  id: 'r2t0512', key: 'E', accent: GY, solo: S, ending: 'callback',
  title: 'Late Geminis | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Late, but | *never boring.*', mood: 'wink' },
  last: {
    text: 'Still five | *minutes away.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, S, 380, 1020, 260, { mood: 'wink', look: [1, 0], pop: k, seed: 12, hops: [t - lt + 1.0, t - lt + 2.2] })
      const spin = lt * 4
      clock(x, 730, 1000, k, (spin * 3) % 12, (spin * 60) % 60, 120)
      bubble(x, 720, 760, '5 min away!', pop01(t, t - lt + 1.1, 0.25, 2.2), { size: 42, col: GY, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
