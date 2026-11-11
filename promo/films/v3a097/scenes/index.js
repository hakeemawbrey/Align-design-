// v3a097: star_advice, ADVICE SOLO, "Signs you're | a healed Scorpio." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): the small, funny wins of a healed Scorpio.
//   0.0–3.6    "Signs you're | *a healed Scorpio.*"
//   3.6–37.8   nine cards (3.8 s each):
//              you just ask (the magnifying glass goes down) · "seen 9:02" and you slept fine · you share a secret,
//              voluntarily (PAGE 1 OF 900) · the ex's profile stays closed · you forgive, mostly (the grudge list, one line
//              left) · you wore pastel on purpose (a pink bow) · you say "I miss you" first · small talk: you tried it
//              (GROWTH) · still intense, just softer (the intensity slider slides down to cosy)
//  37.8        "Deep. | *And at peace.*"  Scorpio comes back, big.
//  41.2        callback: "Pastel day? | *Now pastel week.*"  the pink bow comes back, bigger.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SCO = '#e23d66', WOOD = '#c98f2a', PASTEL = '#ffc2dc'
const S = 'scorpio'

const BOW = ['PP.....PP', 'PPP...PPP', 'PPPPpPPPP', 'PPPpppPPP', 'PPPPpPPPP', 'PPP...PPP', 'PP.....PP']
const BOW_C = { P: PASTEL, p: PINK }
const GLASS = ['..KKKK....', '.KwwwwK...', 'KwwWwwwK..', 'KwwwwwwK..', 'KwwwwwwK..', '.KwwwwK...', '..KKKKK...', '......KK..', '.......KK.', '........KK']
const GLASS_C = { K: '#5a3a7a', w: '#bfe8ff', W: '#fff' }
const DIARY = ['BBBBBBBBBB', 'BbbbbbbbbB', 'BbBBBBBBbB', 'BbBHHBBBbB', 'BbBHHHBBbB', 'BbBBHBBBbB', 'BbBBBBBBbB', 'BbbbbbbbbB', 'BBBBBBBBBB']
const DIARY_C = { B: '#7a1f3d', b: GOLD, H: PINK }

function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x)
  x.restore()
}
function scroll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -210, 300, 420); x.fillStyle = '#f5e6c4'; x.fillRect(-142, -202, 284, 404)
  x.fillStyle = '#d8c39a'; x.fillRect(-150, -226, 300, 30); x.fillRect(-150, 196, 300, 30)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GRUDGES', 0, -160)
  x.font = `800 26px ${INTER}`; x.textAlign = 'left'
  const items = ['ate my fries', 'was late (2019)', 'spoiled the show', 'said “k”', 'wore my hoodie', 'the parking spot']
  items.forEach((s, i) => { x.fillStyle = INK; x.fillText(s, -120, -100 + i * 52); if (i !== 5 && lt > 0.6 + i * 0.18) { x.fillStyle = SCO; x.fillRect(-124, -103 + i * 52, 248, 6) } })
  x.restore()
}
function slider(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-60, -230, 120, 460); x.fillStyle = '#2a2350'; x.fillRect(-52, -222, 104, 444)
  const g = x.createLinearGradient(0, -200, 0, 200); g.addColorStop(0, '#ff3b5c'); g.addColorStop(1, PASTEL)
  x.fillStyle = g; x.fillRect(-14, -200, 28, 400)
  const ky = lerp(-180, 60, p)
  x.fillStyle = INK; x.fillRect(-56, ky - 26, 112, 52); x.fillStyle = BONE; x.fillRect(-50, ky - 20, 100, 40)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You just ask. | *No investigating.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const down = ease.inOutCubic(prog(lt, 0.7, 1.2))
      drawBits(x, GLASS, GLASS_C, lerp(560, 760, down), lerp(760, 1050, down), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0, 1.2, down) })
      bubble(x, 760, 660, 'how was | your day?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 760, 880, 'JUST ASKED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Seen 9:02”? | *You slept fine.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = SCO; x.fillRect(-60, -130, 150, 70); x.fillStyle = BONE; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('hey :)', 15, -95)
        x.fillStyle = 'rgba(239,230,214,0.7)'; x.font = `700 22px ${MONO}`; x.fillText('SEEN 9:02', 20, -30)
      })
      label(x, 790, 1110, 'UNBOTHERED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You share a secret. | *Voluntarily.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DIARY, DIARY_C, 790, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1100, 'PAGE 1 OF 900', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Your ex’s profile? | *Never opened.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#3d3470'; x.fillRect(-90, -140, 180, 180)
        x.fillStyle = BONE; x.font = `700 70px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, -50)
        x.fillStyle = 'rgba(239,230,214,0.75)'; x.font = `700 22px ${MONO}`; x.fillText('VIEW PROFILE', 0, 90)
      })
      label(x, 790, 1110, 'NOT TODAY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'You forgive. | *Mostly.*', mood: lt => lt > 1.8 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) { scroll(x, 780, 850, 0.95 * pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: S, cap: 'You wore pastel. | *On purpose.*', mood: 'sparkle', look: [1, 0], star: { x: -140 }, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, BOW, BOW_C, F.x + 40, F.top - 20, 12 * pop01(t, P.t0 + 0.5, 0.3, 2.4), { rot: 0.2 })
      label(x, 760, 700, 'PASTEL DAY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: PASTEL, rot: 0.05 })
      sparkles(x, t, F.x + 40, F.top - 20, P.t0 + 0.7, 6, 90, 0.4, [PASTEL, BONE, GOLD])
    } },
  { sign: S, cap: 'You say | *“I miss you”* first.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 830, 990, 170 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 560, 650, 'I miss you.', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 38, tail: 'bl', col: '#ffd2e0' })
      bubble(x, 830, 760, 'me too!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, tail: 'br' })
      hearts(x, t, 690, 900, P.t0 + 1.3, { n: 6, life: 1.6, spread: 240, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Small talk? | *You tried it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 830, 990, 170 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false })
      bubble(x, 560, 650, 'nice… | weather.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 780, 760, 'GROWTH', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 48, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'Still intense. | *Just softer.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      slider(x, 760, 850, 0.85 * pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.5)))
      label(x, 760, 620, 'INTENSITY', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 880, 1000, 'COSY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: PASTEL, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'v3a097', key: 'E', accent: PASTEL, solo: S, ending: 'callback',
  title: 'Signs you’re | *a healed Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Deep. | *And at peace.*', mood: 'heart' },
  last: {
    text: 'Pastel day? | *Now pastel week.*',
    draw(x, t, lt) {
      drawBits(x, BOW, BOW_C, 540, 1000 + 10 * Math.sin(t * 2.5), 34 * pop01(t, t - lt + 0.3, 0.45, 1.8), { rot: 0.1 * Math.sin(t * 2) })
      sparkles(x, t, 540, 1000, t - lt + 0.6, 8, 220, 0.2, [PASTEL, BONE, GOLD])
      label(x, 540, 1230, 'MON–SUN', pop01(t, t - lt + 1.1, 0.3, 2.4), { size: 40, bg: PASTEL, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
