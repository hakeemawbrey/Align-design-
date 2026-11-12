// v3t077: THE SIGNS AS… v3, SOLO film, "Things only | Pisces get." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine everyday Pisces things, each pushed to the extreme. Pisces cries in every card.
// The format look lives in ../../signs3kit.js. Ending: card.
//   0.0–3.6    "Things only | *Pisces* get."  One big (teary) Pisces pops in, then the cards start.
//   3.6–37.8   nine cards: gave directions, walked them there · a duck family, stopped traffic · texted "you ok?", they
//              weren't · the houseplant is their therapist · a good horoscope, wept with relief · everyone's
//              emergency contact · playlist names are paragraphs · borrowed a pen once, still has it · matched with
//              someone, already picked "our song"
//  37.8        "Feels it all. | *Loves it all.*"  The big Pisces comes back.
//  41.0        LESSON UNLOCKED: "Feeling everything | is *a superpower.*"  HEART: OPEN
//  46.9        "Their match? | *Brought tissues.*" over the match card: Pisces + Cancer, and a tissue box pops in.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PI = '#b7a6ff', RED = '#e23d4e', ORANGE = '#ffb34a'

// ── props
const PIN = [
  '..RRRR..',
  '.RRRRRR.',
  'RRRWWRRR',
  'RRRWWRRR',
  '.RRRRRR.',
  '..RRRR..',
  '...RR...',
  '...RR...',
]
const DUCK = ['.YY..', 'YYKO.', 'YYY..', 'YYYYY', '.YYY.']
const MAMA = ['..WWW...', '.WWKWO..', '.WWWW...', 'WWWWWWWW', 'WWWWWWW.', '.WWWWW..']
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSSWWWSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', W: '#fff4e2', G: '#6b62a8' }
const PLANT = [
  '.G..G..G.',
  'GGG.G.GGG',
  '.GGGGGGG.',
  '..GGGGG..',
  '...GGG...',
  '.TTTTTTT.',
  '..TTTTT..',
  '..TTTTT..',
  '...TTT...',
]
const PLANT_C = { G: '#5fd068', T: '#c86a3a' }
const TISSUE = ['....WW....', '...WWWW...', '....WW....', 'BBBBBBBBBB', 'BPPPPPPPPB', 'BPPPPPPPPB', 'BBBBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB, P: '#d8f4ff' }
const PEN = ['....PP', '...PPP', '..PPP.', '.PPP..', 'GPP...', 'GG....']

function card(x, cx, cy, k, { w = 300, h = 300, head = '', headBg = PI, body = [], rot = 0.05, size = 32, font = INTER } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 58); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 31) }
  x.fillStyle = INK; x.font = `800 ${size}px ${font}`
  const top = head ? -h / 2 + 58 : -h / 2
  body.forEach((l, i) => x.fillText(l, 0, top + (h - (head ? 58 : 0)) * (i + 0.5) / body.length))
  x.restore()
}

const CAMEOS = [
  { sign: 'pisces', cap: 'Gave directions. | *Walked them there.*', mood: 'happy', tears: 1, star: { x: -180 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, PIN, { R: RED, W: '#fff4e2' }, 790, 820, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1000, 'DISTANCE: 4 km', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'almost there!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Saw a duck family. | *Stopped traffic.*', mood: 'heart', tears: 2, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), p = clamp((lt - 0.4) / 1.8)
      drawBits(x, MAMA, { W: '#fff4e2', K: INK, O: ORANGE }, lerp(680, 760, p), 960, 14 * k)
      for (let i = 0; i < 3; i++) drawBits(x, DUCK, { Y: GOLD, K: INK, O: ORANGE }, lerp(680, 760, p) + 110 + i * 70, 985, 10 * k)
      label(x, 790, 760, 'STOP!', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 50, bg: RED, color: '#fff4e2', rot: -0.04 })
      label(x, 790, 1110, 'CARS WAITING: 40', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Texted “you ok?” | *They weren’t.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', tears: 2, star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 790, 650, 'you ok?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      bubble(x, 790, 1090, 'how did you KNOW', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'Their houseplant? | *Also their therapist.*', mood: 'neutral', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 660, 'and then… | I felt…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 790, 1100, 'SESSION 112', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Good horoscope? | *Wept with relief.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 850, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 300, h: 260, head: '♓︎ THIS WEEK', headBg: PI, body: ['good things', 'are coming.'], size: 36 })
      label(x, 790, 1090, 'SCREENSHOTTED: 9×', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Everyone’s | *emergency contact.*', mood: 'wide', tears: 2, star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 870, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 + 0.06 * Math.sin(t * 40) * (lt > 0.4 ? 1 : 0) })
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.3))
      label(x, 790, 650, `INCOMING: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'on my way!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Playlist names? | *Full paragraphs.*', mood: 'neutral', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 340, h: 330, head: '▶ PLAYLIST', headBg: PI, body: ['songs for when', 'the moon looks', 'lonely and so', 'do I (vol. 4)'], size: 28, font: `Georgia, serif` })
      notes(x, t, 600, 760, { n: 3, cell: 7, col: PI, seed: 3 })
    } },
  { sign: 'pisces', cap: 'Borrowed a pen once. | *Still has it.*', mood: 'heart', tears: 2, star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PEN, { P: SKYB, G: GOLD }, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.1 })
      label(x, 790, 680, 'MUSEUM OF MEMORIES', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04 })
      label(x, 790, 1060, 'EXHIBIT 418', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'New match. | Already *picked “our song.”*', mood: 'heart', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 650, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: GOLD, rot: -0.05 })
      label(x, 790, 860, '✦ OUR SONG ✦', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04 })
      notes(x, t, 560, 1000, { n: 3, cell: 7, col: PINK, seed: 1 })
      label(x, 790, 1100, 'MESSAGES SENT: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t077', key: 'D', accent: PI, solo: 'pisces', ending: 'card',
  title: 'Things only | *Pisces* get.',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'cancer', chip: "IT'S A MATCH" },
  group: { cap: 'Feels it all. | *Loves it all.*', mood: 'heart' },
  lesson: { text: 'Feeling everything | is *a superpower.*', chip: 'HEART: OPEN' },
  last: {
    text: 'Their match? | *Brought tissues.*',
    draw(x, t, lt) { drawBits(x, TISSUE, TISSUE_C, 540, 1440, 16 * pop01(t, t - lt + 1.8, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
