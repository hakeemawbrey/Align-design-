// v3a117: star_advice, ADVICE SOLO, "Aries, stop doing | this in love." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): kind, funny nudges for an Aries in love.
//   0.0–3.6    "Aries, stop doing | *this in love.*"
//   3.6–37.8   nine cards: the LAST WORD trophy (zero hugs included) · a pause is just typing · let them plan a date
//              (THEIR TURN) · the crush on a rocket: MOVING IN: TUESDAY? · after the chase comes the good part
//              · the fire, in cozy mode · sorry didn't burn (STILL ALIVE) · Libra wins the board game: "good… game."
//              · asking about THEIR moon sign
//  37.8        "All fire. | *Big heart.*"
//  41.0        LESSON UNLOCKED: "Your fire is a gift. | *Let it breathe.*"  PATIENCE: +1
//  46.9        "Libra won. | *Aries stayed.*"  over the match card: Aries + Libra (the board game, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aries'
const RED = '#e23d4e', EMBER = '#ff6b5a', WOOD = '#c98f2a'

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
const TROPHY = ['GGGGGGGGG', 'GGGGGGGGG', '.GGGGGGG.', '..GGGGG..', '...GGG...', '....G....', '...GGG...', '..BBBBB..']
const ROCKET = ['....W....', '...WWW...', '..WWWWW..', '..WSWSW..', '..WWWWW..', '..WWWWW..', '.RWWWWWR.', 'RR.WWW.RR', '...FFF...', '....F....']
const TICKET = ['TTTTTTTTTT', 'T.TTTTTT.T', 'TTTTTTTTTT', 'T.TTTTTT.T', 'TTTTTTTTTT']
const FIRE = ['....F....', '...FFF...', '..FFYFF..', '.FFYYYFF.', '.FYYWYYF.', 'FFYWWWYFF', 'BBBBBBBBB']
const COUCH = ['.CCCCCCCC.', 'CCCCCCCCCC', 'CccccccccC', 'CCCCCCCCCC', 'C........C']
function board(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -110, 340, 220)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { x.fillStyle = (i + j) % 2 ? '#ffb34a' : BONE; x.fillRect(-162 + i * 54, -102 + j * 51, 54, 51) }
  x.fillStyle = RED; x.beginPath(); x.arc(-108, -50, 18, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff9ccf'; x.beginPath(); x.arc(108, 50, 18, 0, Math.PI * 2); x.fill()
  x.restore()
}
function phone(x, cx, cy, k, head, headCol, msgs, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 300, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-132, -190, 264, 380)
  x.fillStyle = headCol; x.fillRect(-120, -178, 240, 44)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -155)
  msgs.forEach(([at, y, col, lines, sz = 34]) => {
    const b = pop01(lt, at, 0.25, 2)
    if (b <= 0.01) return
    x.save(); x.translate(0, y); x.scale(b, b)
    const h = lines.length * (sz + 8) + 30
    x.fillStyle = INK; x.fillRect(-120, -h / 2 - 4, 240, h + 8); x.fillStyle = col; x.fillRect(-116, -h / 2, 232, h)
    x.fillStyle = INK; x.font = `800 ${sz}px ${INTER}`
    lines.forEach((l, j) => x.fillText(l, 0, -h / 2 + 15 + (sz + 8) * (j + 0.5) + 2))
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Winning the argument | *isn’t winning.*', mood: lt => lt > 1.4 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { G: GOLD, B: WOOD }, 790, 840, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1060, 'THE LAST WORD', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1140, '(ZERO HUGS INCLUDED)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A pause isn’t | *a no.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const dots = '• '.repeat(1 + Math.floor((t * 3) % 3)).trim()
      bubble(x, 790, 760, dots, pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 64, col: LAV, tail: 'bl' })
      label(x, 790, 960, 'THEY’RE JUST TYPING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them | *plan a date.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -220, s: 270 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 980, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 91, glyph: false, hops: [P.t0 + 1.6] })
      drawBits(x, TICKET, { T: GOLD }, lerp(830, 640, ease.inOutCubic(prog(lt, 0.8, 1.3))), 820, 18 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.15 })
      label(x, 760, 640, 'THEIR TURN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Slow down. | *Savor the crush.*', mood: 'wide', look: [1, -1], star: { x: -230, y: 30 },
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 0.8, 2.4))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, ROCKET, { W: BONE, S: SKYB, R: RED, F: Math.floor(t * 10) % 2 ? GOLD : '#ffb34a' }, 790, 880 - up * 160, 30 * k)
      label(x, 790, 1140, 'MOVING IN: TUESDAY?', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: EMBER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'After the chase | comes *the good part.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, COUCH, { C: '#8b6fd6', c: '#a58cf0' }, 790, 960, 26 * pop01(t, P.t0 + 0.5, 0.35, 2))
      label(x, 790, 740, 'THE GOOD PART →', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04 })
      label(x, 790, 1130, 'COZY NIGHTS IN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your fire? | Use it *for warmth.*', mood: lt => lt > 1.3 ? 'heart' : 'eyeroll', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), f = 1 + 0.06 * Math.sin(t * 14)
      drawBits(x, FIRE, { F: EMBER, Y: GOLD, W: '#fff4e2', B: WOOD }, 790, 900, 26 * k, { sy: f })
      label(x, 790, 1110, 'MODE: COZY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say sorry. | *It won’t burn.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'sorry. | (that was easy?)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 940, 'STILL ALIVE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 46, bg: MINT, rot: -0.04 })
      if (lt > 1.4) hearts(x, t, 420, 900, P.t0 + 1.4 * (3.1 / 2.4), { n: 5, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Let them | *win something.*', mood: lt => lt > 1.4 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -230, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 830, 900, 200 * k, { mood: lt > 1.2 ? 'sparkle' : 'happy', look: [-1, 0], seed: 92, glyph: false, hops: [P.t0 + 1.5, P.t0 + 1.9] })
      board(x, 640, 1110, 0.8 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 400, 620, 'good… | game.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 830, 680, 'LIBRA WINS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: '#ff9ccf', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask about | *their chart too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      phone(x, 780, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), '✦ YOUR MATCH', PINK, [[0.5, -40, BONE, ['what’s your', 'moon sign?']], [1.3, 100, MINT, ['finally!', 'you asked!']]], lt)
    } },
]

const F = makeFilm({
  id: 'v3a117', key: 'E', accent: EMBER, solo: S, ending: 'card',
  title: 'Aries, stop doing | *this in love.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: 'ALIGNED' },
  group: { cap: 'All fire. | *Big heart.*', mood: 'sparkle' },
  lesson: { text: 'Your fire is a gift. | *Let it breathe.*', chip: 'PATIENCE: +1' },
  last: { text: 'Libra won. | *Aries stayed.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
