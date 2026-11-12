// r2t0124: THE SIGNS AS… v3, SOLO film, "How to spot | a Cancer." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine tells of a Cancer, each pushed to the most extreme (and lovable) version.
//   0.0–3.6    "How to spot | *a Cancer.*"
//   3.6–37.8   snacks in their bag for everyone · cries at car commercials · remembers your outfit from 2014
//              · says "I'm fine" (is not fine) · brought a blanket to the beach · kept every birthday card since kindergarten
//              · adopted the whole friend group · date one? already picked curtains · left the party early: home is the party
//  37.8        "Big heart. | *Bigger snack bag.*"
//  41.2        CALLBACK: "The beach blanket? | *Now a fort.*"  Cancer peeks out of a blanket fort under string lights.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BLUE = '#8fe3ff', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#7ee08a'

// ── props
const BAG = ['....HHHH....', '...H....H...', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBYYBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']
const BAG_C = { H: INK, B: '#c97bff', Y: GOLD }
const SNACKS = [
  ['.RRR.', 'RRRRR', 'RWRWR', 'RRRRR'],
  ['GGGG', 'GYYG', 'GYYG', 'GGGG', 'GGGG'],
  ['..CC..', '.CCCC.', 'CCKCCC', 'CCCCKC', '.CCCC.'],
]
const SNACKS_C = { R: RED, W: CREAM, G: GREEN, Y: GOLD, C: '#e8b46a', K: '#5b2e1a' }
const CAR = ['...BBBBB....', '..BWWBWWB...', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', '.KK.....KK..']
const CAR_C = { B: RED, W: SKYB, K: INK }
const BLANKET = ['PWPWPWPWPWPWPW', 'WPWPWPWPWPWPWP', 'PWPWPWPWPWPWPW', 'WPWPWPWPWPWPWP', 'PWPWPWPWPWPWPW', 'WPWPWPWPWPWPWP']
const BLANKET_C = { P: PINK, W: CREAM }
const SUN = ['..Y..Y..Y..', '...YYYYY...', 'Y.YYYYYYY.Y', '..YYYYYYY..', 'Y.YYYYYYY.Y', '...YYYYY...', '..Y..Y..Y..']
const CARD = ['WWWWWW', 'WPPPPW', 'WPHHPW', 'WPPPPW', 'WWWWWW']
const SWATCH = ['WWWWWW', 'WCCCCW', 'WCCCCW', 'WCCCCW', 'WWWWWW', 'WKKKKW', 'WWWWWW']

// a little TV with a car crossing it
function tv(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 250)
  x.fillStyle = '#2a2350'; x.fillRect(-160, -120, 320, 230)
  x.fillStyle = '#8fd8ff'; x.fillRect(-140, -100, 280, 170)
  x.fillStyle = '#5fd068'; x.fillRect(-140, 30, 280, 40)
  x.save(); x.beginPath(); x.rect(-140, -100, 280, 170); x.clip()
  drawBits(x, CAR, CAR_C, lerp(-120, 120, clamp(lt / 2.4)), 18, 12)
  x.restore()
  x.fillStyle = INK; x.fillRect(-60, 120, 20, 30); x.fillRect(40, 120, 20, 30)
  x.restore()
}
// a shoebox overflowing with cards
function shoebox(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 7; i++) drawBits(x, CARD, { W: CREAM, P: [PINK, BLUE, GOLD, GREEN][i % 4], H: RED }, -120 + i * 40, -60 - (i % 3) * 26 - ease.outBack(clamp(lt - 0.4 - i * 0.08)) * 30, 11, { rot: (i - 3) * 0.12 })
  x.fillStyle = INK; x.fillRect(-170, -40, 340, 150)
  x.fillStyle = '#e86a5a'; x.fillRect(-162, -32, 324, 134)
  x.fillStyle = CREAM; x.fillRect(-60, 10, 120, 40)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CARDS', 0, 31)
  x.restore()
}
// the blanket fort: a pink tent, string lights, Cancer peeking out
function fort(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-250, 160); x.lineTo(0, -170); x.lineTo(250, 160); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.moveTo(-236, 152); x.lineTo(0, -156); x.lineTo(236, 152); x.fill()
  x.fillStyle = CREAM; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(-200 + i * 100, 152); x.lineTo(-150 + i * 100, 152); x.lineTo(-175 + i * 100, 120); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.moveTo(-90, 152); x.lineTo(0, 10); x.lineTo(90, 152); x.fill()
  x.restore()
  const pk = ease.outBack(prog(lt, 0.9, 1.3))
  if (pk > 0.01) signChar(x, t, 'cancer', cx, cy + 110 * k - 30 * pk, 150 * k, { mood: lt > 1.6 ? 'heart' : 'happy', seed: 33, pop: pk, glyph: false })
  // string lights
  x.save(); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 3; x.beginPath()
  for (let i = 0; i <= 20; i++) { const fx = cx - 300 + i * 30, fy = cy - 190 * k + 40 * Math.sin(Math.PI * i / 20); i ? x.lineTo(fx, fy) : x.moveTo(fx, fy) } x.stroke()
  for (let i = 0; i < 9; i++) { const fx = cx - 270 + i * 67, fy = cy - 190 * k + 40 * Math.sin(Math.PI * (i * 67 + 30) / 600) + 10; x.fillStyle = [GOLD, PINK, BLUE, GREEN][i % 4]; x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4 + i); x.fillRect(fx - 7, fy, 14, 18) }
  x.restore()
}

const S = 'cancer'
const CAMEOS = [
  { sign: S, cap: 'Snacks in their bag | *for everyone.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      SNACKS.forEach((bm, i) => drawBits(x, bm, SNACKS_C, 720 + i * 70, lerp(940, 740 - (i % 2) * 40, ease.outBack(prog(lt, 0.5 + i * 0.25, 0.9 + i * 0.25))), 13 * k, { rot: (i - 1) * 0.3 }))
      drawBits(x, BAG, BAG_C, 790, 980, 20 * k)
      label(x, 790, 1130, 'SERVES: 12', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cries at commercials. | *Car commercials.*', mood: 'wide', tears: lt => lt > 0.9 ? 2 : 0, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      tv(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1080, 'IT’S JUST A CAR', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remembers your outfit | *from 2014.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'the green | sweater!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl', col: '#d4ffd9' })
      label(x, 790, 960, 'MEMORY: FLAWLESS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Says “I’m fine.” | Is *not fine.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: lt => lt > 1.2 ? [0, 1] : [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'I’m fine!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 940, 'FINE: 2%', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Brought a blanket | *to the beach.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: 10 },
    front(x, t, lt, P, F) {
      drawBits(x, SUN, { Y: GOLD }, 860, 650, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      drawBits(x, BLANKET, BLANKET_C, F.x, F.cy + 120, 16 * k, { sy: 1.0 })
      label(x, 800, 1000, '31°C. COZY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Kept every birthday card | *since kindergarten.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      shoebox(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1100, 'BOX 7 OF 12', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: BLUE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Adopted the whole | *friend group.*', mood: 'heart', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      ;['aries', 'leo', 'gemini'].forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.35, 2); if (k > 0.01) signChar(x, t, id, 680 + i * 120, 920 - (i % 2) * 40, 140 * k, { mood: 'happy', seed: 50 + i, glyph: false, hops: [P.t0 + 1.2 + i * 0.1] }) })
      label(x, 800, 700, 'MY BABIES ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Date one? | Already *picked curtains.*', mood: lt => lt > 1.2 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ;[PINK, BLUE, GOLD].forEach((c, i) => drawBits(x, SWATCH, { W: CREAM, C: c, K: INK }, 700 + i * 90, 860 + (i % 2) * 30, 18 * pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.12 }))
      label(x, 790, 660, 'OUR HOME? ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'we met 1 hr ago', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, tail: 'bc', col: LAV })
    } },
  { sign: S, cap: 'Left the party early. | *Home is the party.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 790, 740, '9:02 PM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 52, bg: '#2a2350', color: BLUE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 900, 'PAJAMAS: ON', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 400, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0124', key: 'D', accent: BLUE, solo: 'cancer', ending: 'callback',
  title: 'How to spot | *a Cancer.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger snack bag.*', mood: 'heart' },
  last: {
    text: 'The beach blanket? | *Now a fort.*',
    draw(x, t, lt) { fort(x, t, 540, 1150, 1.5 * pop01(t, t - lt + 0.4, 0.45, 1.8), lt) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
