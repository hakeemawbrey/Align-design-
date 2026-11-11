// v3a101: zodiac.advice444 (star_advice), ADVICE SOLO, "Dear Leo: | it's okay." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): gentle permission slips for a Leo, one gag each.
//   0.0–3.6    "Dear Leo: | *it's okay.*"
//   3.6–37.8   nine cards: a small birthday (one candle, PARTY OF TWO) · asking "are we okay?" · a little jealous
//              · lost at cards (sore loser, cute) · cried at the movie (popcorn) · one awkward date (DATE 2: ?)
//              · proud of yourself (a medal: "I DID THAT!") · not everyone gets you (huh? vs ICONIC)
//              · crowns get heavy (a pal helps carry it)
//  37.8        "Golden. | *Even on grey days.*"
//  41.0        LESSON: "You don't have to earn | *being loved.*"  HEART: SAFE
//  46.9        "Sag still says | *“iconic.”*" over the match card: Leo + Sagittarius (the fan from card 8).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
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

const CAKE = ['....F....', '....C....', '.WWWWWWW.', 'WPPPPPPPW', 'WWWWWWWWW', 'PPPPPPPPP', 'YYYYYYYYY']
const CAKE_C = { F: GOLD, C: SKYB, W: WHITE, P: ROSE, Y: GOLD }
const POPCORN = ['.W.WW.W.', 'WWWWWWWW', 'WYWWWYWW', 'RWRWRWRW', 'RWRWRWRW', '.RWRWRW.', '.RWRWRW.', '..RWRW..']
const POP_C = { W: WHITE, Y: GOLD, R: RED }
const MEDAL = ['R.....R', '.R...R.', '..R.R..', '..YYY..', '.YYWYY.', '.YYYYY.', '..YYY..']
const MEDAL_C = { R: RED, Y: GOLD, W: '#fff' }
const CROWN = ['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYYYBY', 'YYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
// three playing cards fanned out
function cardsFan(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  ;[-0.35, 0, 0.35].forEach((r, i) => {
    x.save(); x.rotate(r); x.translate(0, -60)
    x.fillStyle = INK; x.fillRect(-58, -84, 116, 168); x.fillStyle = WHITE; x.fillRect(-52, -78, 104, 156)
    x.fillStyle = i === 1 ? RED : INK; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(['2', '3', '2'][i], 0, -6)
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'A small birthday | *still counts.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      table(x, 790, 1060, 300)
      drawBits(x, CAKE, CAKE_C, 790, 980, 22 * k)
      label(x, 790, 720, 'PARTY OF TWO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 6, 150, 0.6)
    } },
  { sign: S, cap: 'Asking “are we okay?” | *is okay.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), 'MESSAGES', 'are we | okay?', pop01(t, P.t0 + 0.6, 0.3, 2.2), { msgCol: LAV, msgSize: 36 })
      label(x, 780, 1110, 'REPLY: “ALWAYS.”', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A little jealous? | *Totally human.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -230, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'gemini', 700, 1000, 160 * k, { mood: 'happy', look: [1, 0], seed: 41, glyph: false })
        signChar(x, t, 'libra', 860, 1000, 160 * k, { mood: 'happy', look: [-1, 0], seed: 42, glyph: false })
      }
      hearts(x, t, 780, 880, P.t0 + 0.6, { n: 4, life: 1.6, spread: 100, cell: 6, seed: 6 })
      label(x, 600, 650, 'NOT JEALOUS. (A BIT.)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lost at cards? | *Still adorable.*', mood: lt => lt > 1.4 ? 'wink' : 'eyeroll', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      cardsFan(x, 770, 960, 1.4 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 740, 1150, 'SORE LOSER. CUTE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cried at the movie? | *Brave, actually.*', mood: 'wide', tears: lt => lt > 0.6 ? 2 : 0, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, POPCORN, POP_C, 790, 980, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.06 })
      label(x, 790, 720, 'THE DOG LIVED.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One awkward date | *isn’t the whole story.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 780, 780, 'DATE 1: OOPS', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 780, 900, 'DATE 2: ?', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 780, 1020, 'DATE 3: !!!', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Proud of yourself? | *Say it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MEDAL, MEDAL_C, P.cx - 200, 1020, 12 * pop01(t, P.t0 + 0.4, 0.35, 2))
      bubble(x, 760, 700, 'I DID | THAT!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      sparkles(x, t, 340, 880, P.t0 + 1.2, 8, 170, 0.2)
    } },
  { sign: S, cap: 'Not everyone | *has to get you.*', mood: lt => lt > 1.6 ? 'wink' : 'neutral', look: [0, -1], star: { x: 0, y: -80, s: 220 },
    front(x, t, lt, P) {
      const a = pop01(t, P.t0 + 0.3, 0.35, 2), b = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (a > 0.01) signChar(x, t, 'capricorn', 300, 1080, 150 * a, { mood: 'squint', look: [1, -1], seed: 43, glyph: false })
      if (b > 0.01) signChar(x, t, 'sagittarius', 780, 1080, 150 * b, { mood: 'heart', look: [-1, -1], seed: 44, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 300, 640, 'huh?', a > 0.5 ? pop01(t, P.t0 + 0.6, 0.25, 2.2) : 0, { size: 36, tail: 'bc' })
      bubble(x, 780, 640, 'ICONIC.', b > 0.5 ? pop01(t, P.t0 + 1.3, 0.25, 2.2) : 0, { size: 36, col: GOLD, tail: 'bc' })
    } },
  { sign: S, cap: 'Crowns get heavy. | *Share the load.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), lift = ease.outCubic(prog(lt, 1.0, 1.8))
      if (k > 0.01) signChar(x, t, 'taurus', 820, 1030, 150 * k, { mood: lt > 1.4 ? 'happy' : 'squint', look: [-1, -1], seed: 45, glyph: false })
      drawBits(x, CROWN, CROWN_C, 620, 900 - 50 * lift, 22 * k, { rot: -0.08 })
      label(x, 700, 690, 'TEAMWORK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a101', key: 'D', accent: GOLD, solo: S, ending: 'card',
  title: 'Dear Leo: | *it’s okay.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'sagittarius', chip: 'IT’S A MATCH' },
  group: { cap: 'Golden. | *Even on grey days.*', mood: 'sparkle' },
  lesson: { text: 'You don’t have to earn | *being loved.*', chip: 'HEART: SAFE' },
  last: {
    text: 'Sag still says | *“iconic.”*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
