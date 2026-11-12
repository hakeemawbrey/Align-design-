// r2a0463: star_advice, ADVICE SOLO (leo), "Leo, let yourself | *be loved.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine gentle truths for the Leo who gives everything, each with a warm reframe. Ending: card.
//   you hype everyone, let them hype you · a compliment, don't deflect · always the host, be the guest · asking for help
//   is still royal · let someone treat you · your match planned the date, let them · bad day, you don't have to shine
//   · a party for you, just enjoy it · a quiet "proud of you" still counts
//   group "Big heart. | Room to receive."   lesson "You love so loudly. | Let it come back."   last "Cancer planned it all. | Leo let them."
//   over the match card: Leo + Cancer (the match who planned the date).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'leo', ACC = '#ff8fb1', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, lh = 1.55 } = {}) {
  if (k <= 0.01) return
  const LH = size * lh, h = lines.length * LH + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + LH * (i + 0.5)))
  x.restore()
}
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const CHAIR = ['.PPPPPP.', '.PPPPPP.', '.PPPPPP.', '.PPPPPP.', 'CCCCCCCC', 'CCCCCCCC', 'P......P', 'P......P', 'P......P']
const CHAIR_C = { P: PURP, C: PINK }
const CAKE = ['.F..F..F.', '.W..W..W.', '.W..W..W.', 'PPPPPPPPP', 'PCPCPCPCP', 'PPPPPPPPP', 'BBBBBBBBB', 'BBBBBBBBB']
const CAKE_C = { F: GOLD, W: '#ffffff', P: PINK, C: CREAM, B: '#e0a458' }
const CLOUD = ['..GGGG....', '.GGGGGGGG.', 'GGGGGGGGGG', '.GGGGGGGG.', '..B..B..B.', '.B..B..B..']
const CLOUD_C = { G: GREY, B: SKYB }
const FRIDGE = ['WWWWWWWWW', 'WWWWWWWWW', 'WWWWWWWKW', 'WWWWWWWKW', 'WWWWWWWWW', 'KKKKKKKKK', 'WWWWWWWWW', 'WWWWWWWKW', 'WWWWWWWKW', 'WWWWWWWWW', 'WWWWWWWWW']
const FRIDGE_C = { W: '#dfe6f2', K: GREY }

const CAMEOS = [
  // 1 · the fan club
  { sign: S, cap: 'You hype everyone up. | *Let them hype you.*', mood: lt => lt < 1.1 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ids = ['cancer', 'libra', 'pisces']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, id, 640 + i * 135, 990 + (i % 2) * 30, 150 * k, { mood: 'sparkle', seed: 30 + i, glyph: false, hops: [P.t0 + 1.2 + i * 0.1, P.t0 + 1.8 + i * 0.1], tears: id === 'pisces' ? 1 : 0 }) })
      L(x, 790, 680, 'GO LEO!!', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 48)
    } },
  // 2 · the compliment
  { sign: S, cap: 'Got a compliment? | *Don’t deflect. Glow.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'love your | hair!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      bubble(x, 560, 1060, lt < 1.2 ? 'oh, this old…' : 'thank you!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 390, 880, P.t0 + 1.25, 8, 200, 0.4)
    } },
  // 3 · the host
  { sign: S, cap: 'Always the host? | *Be the guest tonight.*', mood: lt => lt < 1.0 ? 'happy' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'RESERVED: LEO', pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, -0.04, 36)
      L(x, 790, 1170, 'FEET: UP', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 34)
    } },
  // 4 · asking for help
  { sign: S, cap: 'Need a hand? | Asking *is still royal.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 30, 14 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.06 })
      bubble(x, 790, 760, 'could you | help me?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 1040, 'ROYAL DECREE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  // 5 · being treated
  { sign: S, cap: 'Paying for everyone? | *Let someone treat you.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), ['RECEIPT', 'dinner ×6', '—', lt < 1.3 ? 'PAID BY: ?' : 'PAID: A FRIEND ♡'], { w: 360, bg: CREAM, size: 30, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) hearts(x, t, 790, 700, P.t0 + 1.4, { n: 5, life: 1.4, spread: 200, cell: 7, seed: 5 })
    } },
  // 6 · Align nod: the match plans the date
  { sign: S, cap: 'Match planned the date? | *Let them.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MATCH · CANCER', headCol: SKYB, lines: [['planned it all', LAV, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['even dessert ♡', LAV, pop01(t, P.t0 + 0.8, 0.2, 2), false], ['…okay ♡', PINK, pop01(t, P.t0 + 1.5, 0.2, 2), true]] })
    } },
  // 7 · a bad day
  { sign: S, cap: 'Bad day? | You *don’t have to shine.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [0, 1], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, CLOUD, CLOUD_C, F.x, F.top - 50, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 760, 'DIM MODE:', pop01(t, P.t0 + 0.6, 0.3, 2), LAV, -0.04, 36)
      L(x, 790, 840, 'ALLOWED ♡', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 40)
    } },
  // 8 · the party for you
  { sign: S, cap: 'A party for you? | *Just enjoy it.*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'FOR: LEO ♡', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 40)
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 200, 0.5)
    } },
  // 9 · quiet love
  { sign: S, cap: 'A quiet “proud of you”? | *Still counts.*', mood: lt => lt < 1.1 ? 'happy' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FRIDGE, FRIDGE_C, 800, 880, 36 * pop01(t, P.t0 + 0.15, 0.3, 2))
      note(x, 770, 760, pop01(t, P.t0 + 0.5, 0.3, 2), ['proud', 'of you ♡'], { w: 200, size: 32, rot: -0.08 })
      hearts(x, t, 790, 700, P.t0 + 1.2, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0463', key: 'C', accent: ACC, solo: S, ending: 'card',
  title: 'Leo, let yourself | *be loved.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Big heart. | *Room to receive.*', mood: 'heart' },
  lesson: { text: 'You love so loudly. | *Let it come back.*', chip: 'LOVE: RECEIVED' },
  last: { text: 'Cancer planned it all. | Leo *let them.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
