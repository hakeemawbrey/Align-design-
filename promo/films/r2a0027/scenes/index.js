// r2a0027: star_advice, ADVICE SOLO, "Signs a Virgo | trusts you." (~48 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): small, relatable signs of a Virgo's trust, each a warm truth with
// one gag. Ending: callback.
//   0.0–3.6    "Signs a Virgo | *trusts you.*"
//   3.6–37.8   you loaded the dishwasher, they didn't redo it · they showed you the messy drawer · they asked your opinion
//              and used it · they let you rearrange a shelf (breathing…) · they let you tick a box on their list
//              · they let you drive their car · they text you their worries first · they stopped saying sorry for
//              being particular · they laugh at their own mess
//  37.8        "Quiet trust. | *Huge love.*"
//  41.2        CALLBACK: "Next level? | *Towel duty.*"  A towel stack, folded by you, approved.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#8fdcae', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e'

// ── props
const PLATE = ['..WWWWW..', '.WWWWWWW.', 'WWWWWWWWW', '.WWWWWWW.', '..WWWWW..']
const CAR = ['....BBBBBB.....', '...BSSBSSSB....', '..BSSSBSSSSB...', 'BBBBBBBBBBBBBBB', 'BBBBBBBBBBBBBBY', 'BBBBBBBBBBBBBBB', '.KKK......KKK..', '.KKK......KKK..']
const TOWEL = ['TTTTTTTTTTTT', 'TttttttttttT', 'TTTTTTTTTTTT']
const CRUMBS = ['C...C.....C', '..C...C.C..', 'C..C.....C.', '.....C.C...']

// a drawer pulled open: chaos inside
function drawer(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const o = ease.outCubic(prog(lt, 0.3, 0.9)) * 70
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#c98f2a'; x.fillRect(-162, -112, 324, 224)
  x.fillStyle = INK; x.fillRect(-150, -20 + o - 60, 300, 130)
  x.fillStyle = '#e0b060'; x.fillRect(-142, -12 + o - 60, 284, 114)
  // chaos
  const bits = [[-100, SKYB], [-40, PINK], [20, MINT], [80, GOLD], [-70, LAV], [50, RED]]
  bits.forEach(([bx, c], i) => { x.save(); x.translate(bx, o - 40 - (i % 2) * 24); x.rotate(i * 0.7); x.fillStyle = INK; x.fillRect(-26, -10, 52, 20); x.fillStyle = c; x.fillRect(-22, -6, 44, 12); x.restore() })
  x.fillStyle = INK; x.fillRect(-30, 40 + o, 60, 14)
  x.restore()
}
// a bookshelf: one book leaning, the rest neat
function shelf(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 60, 340, 26); x.fillStyle = '#c98f2a'; x.fillRect(-166, 64, 332, 18)
  const cols = [SKYB, PINK, GOLD, MINT, LAV, RED]
  cols.forEach((c, i) => {
    const lean = i === 4 ? -0.35 * ease.outCubic(prog(lt, 0.5, 0.9)) : 0
    x.save(); x.translate(-130 + i * 50, 60); x.rotate(lean)
    x.fillStyle = INK; x.fillRect(-22, -150 - (i % 3) * 14, 44, 150 + (i % 3) * 14); x.fillStyle = c; x.fillRect(-17, -145 - (i % 3) * 14, 34, 145 + (i % 3) * 14)
    x.restore()
  })
  x.restore()
}
// a checklist where one tick is in a different colour (yours)
function checklist(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = CREAM; x.fillRect(-142, -182, 284, 364)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TO DO', 0, -140)
  x.textAlign = 'left'; x.font = `700 30px ${MONO}`
  const L = ['laundry', 'groceries', 'plants']
  L.forEach((s, i) => {
    const y = -70 + i * 80
    x.fillStyle = INK; x.fillRect(-120, y - 20, 40, 40); x.fillStyle = CREAM; x.fillRect(-114, y - 14, 28, 28)
    x.fillStyle = INK; x.fillText(s, -64, y + 2)
    const ticked = i < 2 || lt > 1.1
    if (ticked) { x.strokeStyle = i === 2 ? '#ff4f86' : '#2fc79a'; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(-112, y); x.lineTo(-100, y + 14); x.lineTo(-76, y - 18); x.stroke() }
  })
  x.restore()
}

const S = 'virgo'
const CAMEOS = [
  { sign: S, cap: 'You loaded the dishwasher. | *They didn’t redo it.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 920); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = '#9aa5c4'; x.fillRect(-142, -122, 284, 244)
        x.fillStyle = '#6a7594'; x.fillRect(-130, -110, 260, 220)
        for (let i = 0; i < 5; i++) drawBits(x, PLATE, { W: CREAM }, -100 + i * 50, 0, 10, { rot: Math.PI / 2 + (i === 2 ? 0.3 : 0) })
        x.restore()
      }
      bubble(x, 790, 690, '…it’s fine. | it’s great.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'They showed you | *the messy drawer.*', mood: lt => lt > 1.1 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawer(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'TOP SECRET', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They asked your opinion. | *And used it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'blue or green?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 810, 880, 'green.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      label(x, 790, 1080, 'GREEN IT IS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: SAGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They let you | *rearrange a shelf.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.0 && lt < 1.6 ? 0.04 * Math.sin(lt * 40) : 0,
    front(x, t, lt, P) {
      shelf(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'BREATHING…', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They let you tick | *a box on their list.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      checklist(x, 790, 880, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      sparkles(x, t, 700, 960, P.t0 + 1.1, 6, 90, 0.4)
    } },
  { sign: S, cap: 'They let you | *drive their car.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAR, { B: SAGE, S: SKYB, K: INK, Y: GOLD }, 790 + Math.sin(t * 6) * 4, 940, 18 * k)
      bubble(x, 790, 700, 'mirrors are… | perfect. go.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1120, 'HUGE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They tell you | *their worries first.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'ok so, | small thing…', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 920, 'i’m here. | tell me.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SKYB, tail: 'br' })
      hearts(x, t, 560, 760, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'They stopped saying sorry | for *being particular.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'i like the | towels this way.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, tail: 'bl' })
      for (let i = 0; i < 3; i++) drawBits(x, TOWEL, { T: SAGE, t: '#6fbf8f' }, 790, 960 - i * 34, 18 * pop01(t, P.t0 + 0.6 + i * 0.2, 0.25, 2))
      label(x, 790, 1120, 'NOTED. LOVED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They laugh | *at their own mess.*', mood: lt => lt > 1.0 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.2, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CRUMBS, { C: '#e8a24a' }, 790, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'ha! | oops.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 52, tail: 'bl' })
      label(x, 790, 1110, 'CRUMBS: ALLOWED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0027', key: 'F', accent: SAGE, solo: 'virgo', ending: 'callback',
  title: 'Signs a Virgo | *trusts you.*',
  cameos: CAMEOS,
  group: { cap: 'Quiet trust. | *Huge love.*', mood: 'sparkle' },
  last: {
    text: 'Next level? | *Towel duty.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1060, 260 * k, { mood: lt > 1.5 ? 'heart' : 'wide', look: [1, 0], seed: 40, hops: [t - lt + 1.5] })
      for (let i = 0; i < 4; i++) drawBits(x, TOWEL, { T: SAGE, t: '#6fbf8f' }, 720, 1150 - i * 36, 20 * pop01(t, t - lt + 0.7 + i * 0.15, 0.25, 2), { rot: i === 3 ? 0.08 : 0 })
      label(x, 720, 1280, 'APPROVED', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
