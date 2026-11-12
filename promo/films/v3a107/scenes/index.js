// v3a107: zodiac.advice444 (star_advice), ADVICE SOLO, "What Libras need | in love." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): what a Libra needs from a partner, one gag each.
//   0.0–3.6    "What Libras need | *in love.*"
//   3.6–37.8   nine cards: you make a decision sometimes ("you pick!" / "the blue one.") · real dates, candles included
//              · fight fair, talk it out · dress up for no reason (TUESDAY. FANCY.) · slow dance in the kitchen
//              · matching mugs · a love note (FRIDGE-WORTHY) · ask their opinion, then listen · meet halfway (a match)
//  37.8        "Romantic. | *And fair about it.*"
//  41.0        LESSON: "Love them as an equal. | They'll *make it beautiful.*"  HARMONY: ON
//  46.9        last line: "Libra in love? | *Candles. Always.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'libra'
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

const CANDLE = ['..F..', '.FYF.', '..F..', '..K..', '.WWW.', '.WWW.', '.WWW.', '.WWW.', 'BBBBB']
const CANDLE_C = { F: '#ff9a3d', Y: GOLD, K: INK, W: WHITE, B: GOLD }
const BOW = ['RR...RR', 'RRR.RRR', 'RRRYRRR', 'RRR.RRR', 'RR...RR']
const BOW_C = { R: RED, Y: GOLD }
const MUG = ['MMMMM..', 'MWWWMMM', 'MWHWM.M', 'MWWWMMM', 'MMMMM..', '.MMM...']
const ENVELOPE = ['WWWWWWWWWWW', 'WKWWWWWWWKW', 'WWKWWWWWKWW', 'WWWKWHWKWWW', 'WWWWKWKWWWW', 'WWWWWKWWWWW', 'WWWWWWWWWWW']
const ENVELOPE_C = { W: WHITE, K: '#b9b0d0', H: RED }

const CAMEOS = [
  { sign: S, cap: 'Make a decision | *sometimes.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 810, 1030, 170 * k, { mood: lt > 1.3 ? 'wink' : 'neutral', look: [-1, 0], seed: 91, glyph: false })
      bubble(x, 420, 640, 'you pick!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bc' })
      bubble(x, 790, 760, 'the blue one.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Real dates. | *Candles included.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      table(x, 780, 1080, 320)
      for (let i = 0; i < 3; i++) drawBits(x, CANDLE, CANDLE_C, 680 + i * 100, 990 - (i === 1 ? 24 : 0), 18 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2.2))
      label(x, 780, 760, 'ROMANCE: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fight fair. | *Talk it out.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 810, 1030, 170 * k, { mood: lt > 1.5 ? 'happy' : 'eyeroll', look: [-1, 0], seed: 92, glyph: false, hops: lt > 1.5 ? [P.t0 + 1.9] : [] })
      bubble(x, 560, 650, 'can we | talk about it?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 810, 820, 'TALKED. HUGGED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Dress up | *for no reason.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, BOW, BOW_C, F.x, F.cy + F.S * 0.36, 12 * pop01(t, P.t0 + 0.5, 0.3, 2.4))
      label(x, 780, 820, 'TUESDAY. FANCY.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.9, 8, 160, 0.3)
    } },
  { sign: S, cap: 'Slow dance | *in the kitchen.*', mood: lt => lt > 1 ? 'heart' : 'happy', star: { x: -130, y: 20, s: 260 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), sway = 18 * Math.sin(t * 2.4)
      if (k > 0.01) signChar(x, t, 'taurus', 680 + sway, 900, 240 * k, { mood: 'heart', look: [-1, 0], seed: 93, glyph: false })
      notes(x, t, 540, 760, { n: 4, cell: 7, col: GOLD, alpha: k, seed: 2 })
      label(x, 540, 1150, 'NO MUSIC NEEDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be a team. | *Matching mugs.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      table(x, 780, 1070, 320)
      drawBits(x, MUG, { M: ROSE, W: WHITE, H: RED }, 690, 980, 24 * pop01(t, P.t0 + 0.3, 0.3, 2.2))
      drawBits(x, MUG, { M: ROSE, W: WHITE, H: RED }, 870, 980, 24 * pop01(t, P.t0 + 0.6, 0.3, 2.2), { sx: -1 })
      label(x, 780, 780, 'YOURS · MINE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Leave them | *a love note.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, ENVELOPE, ENVELOPE_C, 780, 920, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.06 })
      label(x, 780, 1110, 'FRIDGE-WORTHY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 780, 860, P.t0 + 1.0, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 12 })
    } },
  { sign: S, cap: 'Ask their opinion. | *Then listen.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 810, 1030, 170 * k, { mood: 'happy', look: [-1, 0], seed: 94, glyph: false })
      bubble(x, 760, 690, 'what do YOU | think?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 420, 640, 'FINALLY ASKED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A match who | *meets them halfway.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), '✦ IT’S A MATCH', 'café | halfway | between us?', pop01(t, P.t0 + 0.7, 0.3, 2.2), { msgCol: ROSE, msgSize: 30 })
      label(x, 780, 1110, 'MEET IN THE MIDDLE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a107', key: 'E', accent: ROSE, solo: S, ending: 'lesson',
  title: 'What Libras need | *in love.*',
  cameos: CAMEOS,
  group: { cap: 'Romantic. | *And fair about it.*', mood: 'heart' },
  lesson: { text: 'Love them as an equal. | They’ll *make it beautiful.*', chip: 'HARMONY: ON' },
  last: {
    text: 'Libra in love? | *Candles. Always.*',
    draw(x, t, lt) {
      for (let i = 0; i < 3; i++) drawBits(x, CANDLE, CANDLE_C, 420 + i * 120, 1190 - (i === 1 ? 30 : 0), 20 * pop01(t, t - lt + 0.5 + i * 0.2, 0.3, 2.2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
