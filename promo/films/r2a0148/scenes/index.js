// r2a0148: star_advice, ADVICE SOLO, "Signs a Cancer | trusts you." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the little ways a Cancer lets you in, told warmly.
//   0.0–3.6    "Signs a Cancer | *trusts you.*"
//   3.6–37.8   nine cards (3.8 s each):
//              they feed you, seconds then thirds · they show you the baby photos · you get the spare key · they cry in
//              front of you, that's huge · they text "home safe?" every time · you're added to the family chat · they come
//              out of their shell · they remember your coffee order · they tell you their moon sign
//  37.8        "Earned it. | *Keep it safe.*"  Cancer comes back, big.
//  41.2        callback: "You’re family now. | *Here’s your key.*"  the spare key comes back, on a heart keyring.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const S = 'cancer', CAN = '#3fb6f0'
const ST = { x: -190 }

const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PASTA = ['...YYYYY...', '.YYRYYYRYY.', 'YYYYYRYYYYY']
const PASTA_C = { Y: '#ffd86b', R: '#d0453a' }
const KEY = ['.YYYY.........', 'YY..YY........', 'Y....YYYYYYYYY', 'Y....YYYYYYYYY', 'YY..YY....Y.Y.', '.YYYY.....Y.Y.']
const KEY_C = { Y: GOLD }
const CUP = ['.WWWWWW.', 'WBBBBBBW', 'WBBBBBBWWW', 'WBBBBBBW.W', 'WBBBBBBWWW', 'WBBBBBBW', '.WWWWWW.']
const CUP_C = { W: '#fff4e2', B: '#c98f6a' }

/** a little photo album, open, with a baby-star snapshot on each page */
function album(x, t, cx, cy, k, lt) {
  card(x, cx, cy, 400, 260, k, { bg: '#c95a7a', rot: -0.03 }, () => {
    x.fillStyle = CREAM; x.fillRect(-186, -116, 180, 232); x.fillRect(6, -116, 180, 232)
    x.fillStyle = INK; x.fillRect(-3, -116, 6, 232)
    for (const [px, i] of [[-96, 0], [96, 1]]) {
      x.fillStyle = i ? '#cfeeff' : '#ffe0ec'; x.fillRect(px - 70, -90, 140, 130)
      signChar(x, t, S, px, -20, 90, { mood: i ? 'sparkle' : 'happy', seed: 70 + i, glyph: false, glow: 0.4 })
      txt(x, i ? 'age 2' : 'age 1', px, 80, { size: 24, font: MONO, weight: 700 })
    }
  })
}
/** a clam shell that opens (0…1) around a glowing pearl of a star */
function shell(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const half = (dir) => {
    x.save(); x.rotate(dir * open * 0.55)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, dir * 6, 170, 110, 0, dir < 0 ? Math.PI : 0, dir < 0 ? 2 * Math.PI : Math.PI); x.fill()
    x.fillStyle = '#ffd0dc'; x.beginPath(); x.ellipse(0, dir * 6, 158, 98, 0, dir < 0 ? Math.PI : 0, dir < 0 ? 2 * Math.PI : Math.PI); x.fill()
    x.strokeStyle = '#e89aae'; x.lineWidth = 6
    for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(0, dir * 6); x.lineTo(i * 60, dir * 90); x.stroke() }
    x.restore()
  }
  half(1); half(-1)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'They feed you. | *Seconds, then thirds.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, PLATE, { W: CREAM }, 790, 1040, 20 * k)
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.5))
      for (let i = 0; i < n; i++) drawBits(x, PASTA, PASTA_C, 790, 990 - i * 60, 20 * k)
      label(x, 790, 720, `HELPING #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They show you | *the baby photos.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      album(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 790, 650, 'this is me!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1070, 'VOLUME 1 OF 9', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You get | *the spare key.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      drawBits(x, KEY, KEY_C, 790, 860, 18 * k, { rot: -0.15 + 0.05 * Math.sin(t * 3) })
      sparkles(x, t, 790, 860, P.t0 + 0.9, 7, 170, 0.3)
      label(x, 790, 1060, 'KEY: YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They cry in front of you. | *That’s huge.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt > 0.4 && lt < 1.6 ? 2 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 990, 200 * k, { mood: 'heart', look: [-1, 0], seed: 16, glyph: false })
      bubble(x, 820, 760, 'i’ve got you.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
      label(x, 420, 620, 'TRUST: UNLOCKED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They text “home safe?” | *Every single time.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CANCER', headCol: CAN, lines: [['home safe?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2)], ['home safe??', BONE, pop01(t, P.t0 + 0.7, 0.25, 2)], ['yes! home', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.4)], ['phew. love u', PINK, pop01(t, P.t0 + 1.7, 0.25, 2)]] })
    } },
  { sign: S, cap: 'You’re added to | *the family chat.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FAMILY', headCol: PINK, lines: [['Mom added you', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.4)], ['welcome!!', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)], ['eat something', BONE, pop01(t, P.t0 + 1.3, 0.25, 2)], ['proud of you', BONE, pop01(t, P.t0 + 1.7, 0.25, 2)]] })
    } },
  { sign: S, cap: 'They come out | *of their shell.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const op = ease.outBack(prog(lt, 0.7, 1.2))
      shell(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), op)
      if (op > 0.3) { x.save(); x.globalAlpha = clamp((op - 0.3) * 2); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(790, 900, 34, 0, Math.PI * 2); x.fill(); x.restore(); sparkles(x, t, 790, 900, P.t0 + 1.0 * 1.29, 7, 150, 0.2) }
      bubble(x, 790, 640, 'hi. it’s me.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'They remember | *your coffee order.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 680, 'OAT. EXTRA HOT.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'SINCE DAY ONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They tell you | *their moon sign.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 820, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.2)
      bubble(x, 790, 1060, 'don’t tell anyone.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 520, 880, P.t0 + 1.4 * 1.29, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0148', key: 'C', accent: CAN, solo: S, ending: 'callback',
  title: 'Signs a Cancer | *trusts you.*',
  cameos: CAMEOS,
  group: { cap: 'Earned it. | *Keep it safe.*', mood: 'heart' },
  last: {
    text: 'You’re family now. | *Here’s your key.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 330, 1060, 270 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 45, hops: [t - lt + 1.4] })
      const kk = pop01(t, t - lt + 1.0, 0.4, 2)
      drawBits(x, KEY, KEY_C, 740, 1080, 28 * kk, { rot: -0.2 + 0.06 * Math.sin(t * 3) })
      drawBits(x, HEART, { H: PINK, W: '#fff' }, 600, 1060, 12 * kk)
      sparkles(x, t, 700, 1070, t - lt + 1.3, 8, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
