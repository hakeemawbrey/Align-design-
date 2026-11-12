// r2a0012: ADVICE SOLO, "Taurus, here's your | Monday pep talk." (~46 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one gag each.
//   0.0–3.6    "Taurus, here’s your | *Monday pep talk.*"
//   3.6–37.8   snoozed four times (still counts) · slow start (a snail: on my way) · comfiest outfit (dress code: approved)
//              · packed a big lunch (you earned it) · Monday 0, Taurus 1 (a trophy) · hate change (one new mug is enough)
//              · stubborn? determined · a cozy playlist (press play) · four sleeps to Friday
//  37.8        "Slow and steady. | *Still unstoppable.*"
//  41.2        CALLBACK: "The snail? | Made it *by noon.*"  Taurus and the snail with a little flag.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7ee08a', RED = '#e23d4e', BROWN = '#8a4a2e'

// ── props
function alarm(x, cx, cy, k, t, ringing) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + (ringing ? Math.sin(t * 60) * 6 : 0), cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(-70, -90, 44, 0, Math.PI * 2); x.arc(70, -90, 44, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(-70, -90, 36, 0, Math.PI * 2); x.arc(70, -90, 36, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 106, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineWidth = 9; x.lineCap = 'round'
  x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -56); x.moveTo(0, 0); x.lineTo(40, 18); x.stroke()
  x.fillStyle = INK; x.fillRect(-70, 104, 26, 30); x.fillRect(44, 104, 26, 30)
  x.restore()
}
const SNAIL = ['....SSSS.......', '...SPPPPS......', '..SPSSSSPS.....', '..SPSPPSPS.....', '..SPSSPPS......', '...SPPPS....E.E', 'BBBSSSSBBBBBB.B', 'BBBBBBBBBBBBBBB']
const SNAIL_C = { S: '#c96a3a', P: '#ffb34a', B: '#9fe0a0', E: INK }
const HOODIE = ['...GGGGGGG...', '..GGG...GGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG', 'GGGGWWWWWGGGG', 'GG.GWWWWWG.GG', 'GG.GGGGGGG.GG', 'GG.GGGGGGG.GG', 'GG.GGGGGGG.GG', '...GGGGGGG...']
const SANDWICH = ['..BBBBBBBBBB..', '.BBBBBBBBBBBB.', 'GGGGGGGGGGGGGG', 'RRRRRRRRRRRRRR', 'YYYYYYYYYYYYYY', 'GGGGGGGGGGGGGG', 'RRRRRRRRRRRRRR', 'YYYYYYYYYYYYYY', '.BBBBBBBBBBBB.', '..BBBBBBBBBB..']
const SANDWICH_C = { B: '#d99a4e', G: '#5fd068', R: RED, Y: '#ffd23a' }
const TROPHY = ['YYYYYYYYYYY', 'Y.YYYYYYY.Y', 'Y.YYYYYYY.Y', '.YYYYYYYYY.', '..YYYYYYY..', '....YYY....', '....YYY....', '...YYYYY...', '..KKKKKKK..', '..KKKKKKK..']
const MUG = ['PPPPPPP..', 'PWPPPPPPP', 'PPPPPPP.P', 'PPPPPPP.P', 'PPPPPPPPP', 'PPPPPPP..', '.PPPPP...']
const PHONES = ['..KKKKKKKKK..', '.KK.......KK.', 'KK.........KK', 'K...........K', 'K...........K', 'GGG.......GGG', 'GGG.......GGG', 'GGG.......GGG', 'GGG.......GGG']
function strike(x, cx, cy, w, k) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'
  x.beginPath(); x.moveTo(cx - w / 2, cy + 8); x.lineTo(cx - w / 2 + w * k, cy - 8); x.stroke(); x.restore()
}

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'Snoozed four times? | *Still counts.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      alarm(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), t, lt < 1.2)
      label(x, 790, 1100, 'SNOOZE ×4', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow start? | Slow is *still moving.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, lerp(840, 760, prog(lt, 0.3, 2.4)), 1040, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 790, 'on my way', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: GREEN, tail: 'bc' })
    } },
  { sign: S, cap: 'Comfiest outfit? | *Dress code: approved.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { G: GREEN, W: BONE }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1110, '✓ APPROVED', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 40, bg: MINT, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Packed a big lunch? | *You earned it.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.2, 1.0))
      drawBits(x, SANDWICH, SANDWICH_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: lerp(0.5, 1.6, g) })
      hearts(x, t, 790, 800, P.t0 + 1.2, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Monday tried you. | *Taurus won.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, K: BROWN }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'MONDAY 0 · TAURUS 1', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: GREEN, font: MONO, weight: 700 })
      sparkles(x, t, 790, 840, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Hate change? | *One new mug* is plenty.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MUG, { P: PINK, W: BONE }, 790, 880, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      sparkles(x, t, 790, 880, P.t0 + 0.6, 7, 160, 0.2)
      label(x, 790, 650, 'BIG STEP', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stubborn? | Call it *determined.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'STUBBORN', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 48, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      strike(x, 790, 760, 300, ease.outCubic(prog(lt, 0.6, 0.9)))
      label(x, 790, 940, 'DETERMINED', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 52, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Need a cozy song? | *Press play.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, PHONES, { K: INK, G: GREEN }, F.x, F.top + 40, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      notes(x, t, 790, 1000, { n: 5, cell: 9, col: GOLD, alpha: pop01(t, P.t0 + 0.8, 0.3, 2) })
      label(x, 800, 1120, '▶ COZY MODE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Long week ahead? | *Friday’s coming.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 4 - Math.floor(prog(lt, 0.4, 1.6) * 2.99)
      label(x, 790, 820, `${n} SLEEPS`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 960, 'TO FRIDAY', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 44, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0012', key: 'F', accent: GREEN, solo: 'taurus', ending: 'callback',
  title: 'Taurus, here’s your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: { cap: 'Slow and steady. | *Still unstoppable.*', mood: 'sparkle' },
  last: {
    text: 'The snail? | Made it *by noon.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 400, 1060, 250 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      const s = pop01(t, t - lt + 0.7, 0.35, 2)
      drawBits(x, SNAIL, SNAIL_C, 720, 1100, 26 * s)
      if (s > 0.5) { x.fillStyle = BONE; x.fillRect(656, 880, 10, 150); x.fillStyle = GOLD; x.fillRect(666, 884, 90, 56) }
      sparkles(x, t, 700, 1000, t - lt + 1.3, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
