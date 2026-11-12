// v3a076: star_advice, ADVICE SOLO, "What Geminis need | in love." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): what a Gemini needs from love, warmly, one gag each.
//   0.0–3.6    "What Geminis need | *in love.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a ping-pong rally that never ends (rally: 400) · the menu with three crossed-out picks: final answer (for now)
//              · "loud me" and "quiet me" both get a heart · a big die rolls: plan = roll it · the bit, day 40: "HA!"
//              · a window with twelve open tabs: all welcome · "…and how do you FEEL about that?" · a lightbulb: idea #47
//              · a book: chapter 300, still good
//  37.8        group ending: "Two sides. | *One big heart.*"  Gemini comes back, hearts in its eyes.
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e', YEL = '#ffd23a'
const S = 'gemini'

function paper(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head, headBg = PINK, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 29) }
  for (const l of lines) {
    if (l.k !== undefined && l.k <= 0.01) continue
    x.fillStyle = l.color || INK; x.font = l.font || `800 ${l.size || 34}px ${INTER}`; x.fillText(l.text, l.x || 0, l.y)
    if (l.strike) { const w2 = x.measureText(l.text).width; x.fillStyle = RED; x.fillRect((l.x || 0) - w2 / 2 - 6, l.y - 3, (w2 + 12) * clamp(l.strike), 7) }
  }
  x.restore()
}

// ── props
const PADDLE = [
  '.RRRR.',
  'RRRRRR',
  'RRRRRR',
  'RRRRRR',
  '.RRRR.',
  '..WW..',
  '..WW..',
  '..WW..',
]
const DIE = [
  'WWWWWWWWW',
  'WKWWWWWKW',
  'WWWWWWWWW',
  'WWWWKWWWW',
  'WWWWWWWWW',
  'WKWWWWWKW',
  'WWWWWWWWW',
]
const BULB = [
  '..YYYYY..',
  '.YYYYYYY.',
  'YYYWYYYYY',
  'YYWYYYYYY',
  'YYYYYYYYY',
  '.YYYYYYY.',
  '..YYYYY..',
  '...GGG...',
  '...ggg...',
  '...GGG...',
]
const BULB_C = { Y: YEL, W: '#fff', G: '#c9d1e0', g: '#8d8aa8' }
const BOOK = [
  'PPPPPWPPPPP',
  'PPPPPWPPPPP',
  'PPYYPWPPPPP',
  'PPPPPWPPPPP',
  'PPYYPWPPPPP',
  'PPPPPWPPPPP',
  'PPPPPWPPPPP',
  'BBBBBBBBBBB',
]
const BOOK_C = { P: '#6fc3ff', W: CREAM, Y: GOLD, B: '#2a6fd1' }

function tabs(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -112, 336, 240)
  x.fillStyle = INK; x.fillRect(-172, -126, 344, 252)
  x.fillStyle = '#c9d1e0'; x.fillRect(-164, -118, 328, 50)
  const cols = [PINK, MINT, SKYB, GOLD, LAV, ORANGE]
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-160 + i * 27, -114, 25, 40); x.fillStyle = cols[i % 6]; x.fillRect(-158 + i * 27, -112, 21, 36) }
  x.fillStyle = CREAM; x.fillRect(-164, -68, 328, 186)
  x.fillStyle = '#d7d2e8'; for (let i = 0; i < 4; i++) x.fillRect(-140, -40 + i * 38, 200 + ((i * 41) % 80), 16)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Someone who | *keeps up.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -240 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PADDLE, { R: RED, W: BONE }, 580, 900, 16 * k, { rot: -0.3 })
      drawBits(x, PADDLE, { R: '#6f8cff', W: BONE }, 880, 900, 16 * k, { rot: 0.3 })
      if (k > 0.9) { const ph = (t * 1.6) % 1, bx = lerp(620, 840, ph < 0.5 ? ph * 2 : 2 - ph * 2), by = 820 - Math.sin(Math.PI * ((ph * 2) % 1)) * 120; x.fillStyle = INK; x.fillRect(bx - 16, by - 16, 32, 32); x.fillStyle = '#fff'; x.fillRect(bx - 12, by - 12, 24, 24) }
      label(x, 700, 1090, 'RALLY: 400', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Room to | *change their mind.*', mood: lt => lt > 1.6 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      paper(x, 790, 840, 300, 320, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, head: 'MENU', headBg: GOLD, lines: [
        { text: 'pasta', y: -50, size: 38, strike: prog(lt, 0.5, 0.7) },
        { text: 'tacos', y: 10, size: 38, strike: prog(lt, 0.9, 1.1) },
        { text: 'soup', y: 70, size: 38, strike: prog(lt, 1.3, 1.5) }] })
      label(x, 790, 1080, 'ALL OF IT, PLEASE', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Someone who loves | *both sides.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 690, 'LOUD ME', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      bubble(x, 820, 920, 'quiet me', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl', weight: 600 })
      hearts(x, t, 900, 700, P.t0 + 1.3, { n: 3, life: 1.4, spread: 80, cell: 7, seed: 2 })
      hearts(x, t, 940, 920, P.t0 + 1.5, { n: 3, life: 1.4, spread: 80, cell: 7, seed: 5 })
      label(x, 790, 1100, 'BOTH: LOVED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A partner for | *random plans.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const roll = 1 - ease.outCubic(prog(lt, 0.2, 1.1))
      drawBits(x, DIE, { W: CREAM, K: INK }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: roll * 6 })
      label(x, 790, 1080, 'TONIGHT: ROLL IT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 8, 170, 0.3)
    } },
  { sign: S, cap: 'Someone who | *laughs at the bit.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 790, 720, 'THE BIT: DAY 40', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 920, 'HA! still | funny.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 46, col: MINT, tail: 'bl' })
      sparkles(x, t, 790, 920, P.t0 + 1.2, 6, 170, 0.5)
    } },
  { sign: S, cap: 'Patience for | *twelve open tabs.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tabs(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), Math.min(12, 1 + Math.floor(lt * 8)))
      label(x, 790, 1090, 'ALL WELCOME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04 })
    } },
  { sign: S, cap: 'Someone who asks | *the next question.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'and how do you | FEEL about it?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 420, 780, P.t0 + 1.2, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 4 })
      label(x, 790, 1000, 'FINALLY.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 42, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Space to | *stay curious.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const on = lt > 0.8
      drawBits(x, BULB, on ? BULB_C : { ...BULB_C, Y: '#8d8aa8', W: '#c9d1e0' }, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (on) { x.save(); x.globalAlpha = 0.25; x.fillStyle = YEL; x.beginPath(); x.arc(790, 800, 170, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 1060, 'NEW IDEA #47', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone who | *never gets old.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'CHAPTER 300: STILL GOOD', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 26, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'v3a076', key: 'D', accent: GOLD, solo: S, ending: 'group',
  title: 'What Geminis need | *in love.*',
  cameos: CAMEOS,
  group: { cap: 'Two sides. | *One big heart.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
