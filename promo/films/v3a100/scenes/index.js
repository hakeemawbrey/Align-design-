// v3a100: zodiac.advice444 (star_advice), ADVICE SOLO, "What Leos need | in love." (~50 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): what a Leo actually needs from love, one gag each.
//   0.0–3.6    "What Leos need | *in love.*"  One big Leo pops in.
//   3.6–37.8   nine cards: hype them up in public (a pal's "MY LEO IS A GENIUS" placard) · a reply longer than "ok"
//              (read 40 times) · notice the new haircut · a trophy for parking first try · front-row cheering
//              · a big heart stamped FRAGILE · let them protect you (bodyguard mode) · a match with the same energy
//              · love on the bad days too (a blanket, a cocoa, a pal)
//  37.8        "Loud love. | *Loyal heart.*"
//  41.0        LESSON: "Clap for them a little. | They'll *guard you forever.*"  HEART: FULL
//  46.9        last line: "Clap for your Leo. | *They'll take a bow.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'leo'
const WOOD = '#c98f2a', RED = '#e23d4e', ROSE = '#ff9ccf', WHITE = '#fff4e2'

// ── shared little props for this film
// a phone: a coloured header strip and an optional message bubble that pops in
function phone(x, cx, cy, k, head, msg, sent, { headCol = MINT, msgCol = ROSE, rot = 0.05, msgSize = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = headCol; x.fillRect(-100, -146, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -122)
  if (msg && sent > 0.01) {
    x.save(); x.translate(4, -6); x.scale(sent, sent)
    const lines = msg.split('|').map(s => s.trim())
    const h = lines.length * msgSize * 1.25 + 30
    x.fillStyle = msgCol; x.fillRect(-96, -h / 2, 192, h)
    x.fillStyle = INK; x.font = `800 ${msgSize}px ${INTER}`
    lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 15 + msgSize * 1.25 * (i + 0.5)))
    x.restore()
  }
  x.restore()
}
// a tiny pal star with a placard on a stick
function placard(x, t, id, cx, cy, size, text, k, { col = GOLD, mood = 'happy', seed = 31, tears = 0, look } = {}) {
  if (k <= 0.01) return
  signChar(x, t, id, cx, cy, size * k, { mood, seed, glyph: false, tears, look })
  x.fillStyle = INK; x.fillRect(cx + size * 0.42 - 5, cy - size * 1.05, 10, size * 0.9)
  label(x, cx + size * 0.42, cy - size * 1.1, text, k, { size: 28, bg: col, rot: -0.04 })
}
// a little table top line
function table(x, cx, cy, w) { x.fillStyle = INK; x.fillRect(cx - w / 2, cy, w, 22); x.fillStyle = WOOD; x.fillRect(cx - w / 2 + 4, cy + 4, w - 8, 14) }

const TROPHY = [
  'Y.YYYYY.Y',
  'Y.YYWYY.Y',
  'Y.YYWYY.Y',
  '.YYYYYYY.',
  '..YYYYY..',
  '...YYY...',
  '....Y....',
  '...YYY...',
  '..BBBBB..',
  '..BBBBB..',
]
const TROPHY_C = { Y: GOLD, W: '#fff', B: WOOD }
const MUG = ['.SS.S..', '..S.S..', 'MMMMM..', 'MCCCMMM', 'MMMMM.M', 'MMMMMMM', 'MMMMM..', '.MMM...']
const MUG_C = { S: BONE, M: ROSE, C: '#6b3a22' }

const CAMEOS = [
  { sign: S, cap: 'Hype them up | *in public.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.3],
    front(x, t, lt, P) {
      placard(x, t, 'sagittarius', 720, 1010, 180, 'MY LEO = GENIUS', pop01(t, P.t0 + 0.4, 0.35, 2), { col: GOLD, look: [-1, 0] })
      hearts(x, t, 330, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'A reply longer | *than “ok.”*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), 'MESSAGES', 'you were | SO good | today!!', pop01(t, P.t0 + 0.7, 0.3, 2.2))
      label(x, 780, 1110, 'READ IT 40 TIMES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Notice | *the new haircut.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 1010, 170 * k, { mood: lt > 1.1 ? 'wide' : 'neutral', look: [-1, -1], seed: 33, glyph: false })
      bubble(x, 780, 640, 'wait. | NEW HAIR?!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br' })
      sparkles(x, t, 370, 700, P.t0 + 1.4, 8, 150, 0.4)
    } },
  { sign: S, cap: 'Celebrate | *the tiny wins.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      table(x, 790, 1060, 280)
      drawBits(x, TROPHY, TROPHY_C, 790, 950, 18 * k)
      label(x, 790, 720, 'PARKED FIRST TRY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 920, P.t0 + 0.9, 7, 150, 0.6)
    } },
  { sign: S, cap: 'Be there. | *Front row.*', mood: 'sparkle', star: { x: 0, y: -60, s: 240 }, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      const ids = [['taurus', 300], ['libra', 780]]
      ids.forEach(([id, px], i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, px, 1080, 150 * k, { mood: 'happy', look: [i ? -1 : 1, -1], seed: 34 + i, glyph: false, hops: [P.t0 + 1.2 + i * 0.2, P.t0 + 2.0] })
      })
      label(x, 540, 1185, 'FRONT ROW · SEATS 1 + 2', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.02, font: MONO, weight: 700 })
      hearts(x, t, 540, 820, P.t0 + 1.4, { n: 6, life: 1.6, spread: 400, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Big heart. | *Handle gently.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 880, 30 * k, { rot: 0.08 * Math.sin(t * 2) })
      label(x, 790, 900, 'FRAGILE', pop01(t, P.t0 + 1.0, 0.25, 2.6), { size: 44, bg: BONE, color: RED, rot: -0.2, font: MONO, weight: 700 })
      label(x, 790, 1110, 'THIS SIDE UP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them | *protect you* a little.', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -60, s: 330 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 790, 1010, 150 * k, { mood: 'heart', look: [-1, -1], seed: 36, glyph: false })
    },
    front(x, t, lt, P) {
      label(x, 540, 610, 'BODYGUARD MODE: ON', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A match | *with the same energy.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), '✦ IT’S A MATCH', 'HI!!!!! | omg HI!!!', pop01(t, P.t0 + 0.8, 0.3, 2.2), { msgCol: GOLD })
      label(x, 780, 1110, 'SAME ENERGY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Love on | *the off days* too.', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 1010, 170 * k, { mood: 'happy', look: [-1, 0], seed: 37, glyph: false })
      drawBits(x, MUG, MUG_C, 640, 1060, 13 * pop01(t, P.t0 + 0.8, 0.3, 2))
      bubble(x, 800, 660, 'cocoa? | movie? | no talking?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
]

const F = makeFilm({
  id: 'v3a100', key: 'C', accent: GOLD, solo: S, ending: 'lesson',
  title: 'What Leos need | *in love.*',
  cameos: CAMEOS,
  group: { cap: 'Loud love. | *Loyal heart.*', mood: 'sparkle' },
  lesson: { text: 'Clap for them a little. | They’ll *guard you forever.*', chip: 'HEART: FULL' },
  last: {
    text: 'Clap for your Leo. | *They’ll take a bow.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
