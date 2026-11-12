// r2t0192: star_talk, SOLO film, "Pisces red flags | we love." (~52 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): nine "red flags" that are really the softest Pisces
// traits, pushed to the extreme. Pisces cries in every card.
//   0.0–3.6    "Pisces red flags | *we love.*"  One big (teary) Pisces pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              every houseplant has a name and a mood · apologised to a chair · third message, named our future dog
//              · cried at the sunset (a tally of every sunset) · daydreaming mid-chat: a whole castle
//              · keeps every receipt "for the memories" · replies to texts in poems · adopted a snail (family now)
//              · feels your feelings before you do (Cancer just sighed)
//  37.8        "Red flags? | *Pink* flags."  Pisces comes back, big.
//  41.0        LESSON UNLOCKED: "Love them gently. | They feel *everything.*"  STATUS: SO SOFT
//  46.9        "Their match? | A fellow *crier.*" over the match card: Pisces + Cancer (the shared sigh, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURP = '#7c74f0', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const S = 'pisces'

// ── props
const PLANT = [
  '...L.L.L...',
  '..LLLLLLL..',
  '.LLlLLLlLL.',
  'LLLLLLLLLLL',
  '.LLLLLLLLL.',
  '.....L.....',
  '..PPPPPPP..',
  '..PPPPPPP..',
  '...PPPPP...',
  '...PPPPP...',
]
const PLANT_C = { L: '#5fd068', l: '#3fa04e', P: '#c96a4a' }
const CHAIR = [
  'WW......',
  'WW......',
  'WW......',
  'WW......',
  'WWWWWWWW',
  'WWWWWWWW',
  'W......W',
  'W......W',
  'W......W',
]
const CHAIR_C = { W: '#c98f2a' }
const DOG = [
  'EE......EE',
  'EEFFFFFFEE',
  '.FFKFFKFF.',
  '.FFFFFFFF.',
  '..FFNNFF..',
  '...FFFF...',
]
const DOG_C = { E: BROWN, F: '#e2a45a', K: INK, N: '#3a2a1a' }
const SUN = ['...YYYY...', '.YYYYYYYY.', 'YYYYYYYYYY', 'YYYYYYYYYY']
const CASTLE = [
  'P.P...P.P...P.P',
  'PPP...PPP...PPP',
  'PPPPPPPPPPPPPPP',
  'PPPPPPKPPPPPPPP',
  'PPPPPKKKPPPPPPP',
  'PPPPPKKKPPPPPPP',
]
const CASTLE_C = { P: '#ff9ccf', K: INK }
const SNAIL = [
  '.....SSSS......',
  '....SsSSSS.....',
  '...SSsSssSS....',
  '...SSssSsSS..AA',
  '...SSSSsSSS..A.',
  '....SSSSSS..BB.',
  'BBBBBBBBBBBBBB.',
  '.BBBBBBBBBBBB..',
]
const SNAIL_C = { S: '#c98f6a', s: '#8a4a2e', B: '#b9e07a', A: '#b9e07a' }
const BOW = ['RR.RR', 'RRRRR', 'RR.RR']

// a cloud-shaped thought bubble with a little world inside
function thought(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const blob = (bx, by, r) => { x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; for (const [bx, by, r] of [[-100, 0, 86], [0, -40, 104], [100, 0, 86], [0, 40, 90]]) blob(bx, by, r + 6)
  blob(-190, 130, 20); blob(-230, 175, 13)
  x.fillStyle = CREAM; for (const [bx, by, r] of [[-100, 0, 86], [0, -40, 104], [100, 0, 86], [0, 40, 90]]) blob(bx, by, r)
  blob(-190, 130, 14); blob(-230, 175, 8)
  drawBits(x, CASTLE, CASTLE_C, 0, 10, 12)
  x.fillStyle = PURP; x.fillRect(-16, -100, 6, 40); x.fillStyle = PINK; x.fillRect(-10, -100, 26, 14)
  x.restore()
}
// a pile of receipts, the top one a little love note
function receipts(x, t, lt, P) {
  for (let i = 0; i < 6; i++) {
    const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2)
    if (k <= 0.01) continue
    x.save(); x.translate(720 + ((i * 47) % 150), 760 + ((i * 83) % 260)); x.rotate(Math.sin(i * 2.1) * 0.25); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-56, -86, 112, 172); x.fillStyle = CREAM; x.fillRect(-50, -80, 100, 160)
    x.fillStyle = '#b9b0a0'; for (let j = 0; j < 6; j++) x.fillRect(-36, -60 + j * 22, 72 - (j % 2) * 20, 8)
    x.restore()
  }
  const k = pop01(t, P.t0 + 1.2, 0.3, 2.2)
  if (k > 0.01) {
    x.save(); x.translate(790, 880); x.rotate(-0.06); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-120, -100, 240, 200); x.fillStyle = CREAM; x.fillRect(-112, -92, 224, 184)
    x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('1 hot cocoa', 0, -50); x.fillText('1 hot cocoa', 0, -14)
    x.fillStyle = RED; x.font = `800 30px ${INTER}`; x.fillText('our first date', 0, 40)
    drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 0, 76, 5)
    x.restore()
  }
}
// a phone with a reply written as a little poem
function poemPhone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -202, 276, 420)
  x.fillStyle = INK; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#2a2350'; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#140c30'; x.fillRect(-122, -180, 244, 360)
  x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = MINT; x.fillRect(-110, -160, 140, 48); x.fillStyle = INK; x.fillText('u up?', -40, -135)
  const L = ['the moon is up,', 'and so am I,', 'and so is every', 'star. hi.']
  x.fillStyle = LAV; x.fillRect(-90, -90, 200, 36 * L.length + 24)
  x.fillStyle = INK; x.font = `700 24px ${INTER}`
  L.forEach((s, i) => { if (lt > 0.5 + i * 0.25) x.fillText(s, 10, -64 + i * 36) })
  x.restore()
}
// a sunset, with a tally of every sunset ever cried at
function sunset(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 260)
  const g = x.createLinearGradient(0, -140, 0, 100); g.addColorStop(0, '#ff8fb1'); g.addColorStop(1, '#ffb34a')
  x.fillStyle = g; x.fillRect(-162, -142, 324, 244)
  x.save(); x.beginPath(); x.rect(-162, -142, 324, 244); x.clip()
  drawBits(x, SUN, { Y: '#fff1b0' }, 0, 50 + ease.inOutQuad(clamp(lt / 2)) * 40, 22)
  x.fillStyle = '#5b3a8a'; x.fillRect(-162, 70, 324, 32)
  x.restore()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Every plant has a name. | And *a mood.*', mood: 'sparkle', tears: 2, look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PLANT, PLANT_C, 790, 880, 22 * k, { rot: 0.03 * Math.sin(t * 2) })
      label(x, 790, 1110, 'GERALD (SAD)', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 620, 'he’s sad today', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Bumped a chair. | *Apologised* to it.', mood: lt => lt > 0.8 ? 'wide' : 'happy', tears: 3, look: [1, 0], star: { x: -170 }, hops: [0.7],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 930, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 0.7 && lt < 1.0 ? 0.12 : 0 })
      bubble(x, 760, 620, 'I’m SO sorry', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1120, 'CHAIR: FINE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Third message. | Named *our future dog.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 780, 620, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, DOG, DOG_C, 780, 860, 24 * pop01(t, P.t0 + 0.8, 0.3, 2.2))
      label(x, 780, 1080, 'MEET BISCUIT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 780, 800, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Cried at the sunset. | *Every* sunset.', mood: 'sparkle', tears: 3, look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      sunset(x, 780, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 780, 1060, 'CRIED AT: ALL', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: ORANGE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Zoned out mid-chat. | Built *a castle.*', mood: 'sleepy', tears: 1, star: { x: -200, y: 60 }, hops: [1.8],
    front(x, t, lt, P) {
      thought(x, 740, 720, pop01(t, P.t0 + 0.4, 0.4, 2))
      bubble(x, 780, 1100, '…sorry, what?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Keeps every receipt. | For *the memories.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', tears: 2, look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) { receipts(x, t, lt, P) } },
  { sign: S, cap: 'Replies to texts | *in poems.*', mood: 'sparkle', tears: 2, look: [1, 0], star: { x: -210 }, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { poemPhone(x, 760, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: S, cap: 'Adopted a snail. | It’s *family now.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const sx = 820 - ease.inOutQuad(clamp(lt / 2.4)) * 40
      drawBits(x, SNAIL, SNAIL_C, sx, 980, 18 * k)
      drawBits(x, BOW, { R: PINK }, sx - 30, 900, 8 * k)
      label(x, 790, 700, 'MEET GARY JR.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'he has a room', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Feels your feelings. | *Before you do.*', mood: 'sparkle', tears: 3, look: [1, 0], star: { x: -200 }, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 920, 240 * k, { mood: lt > 1.3 ? 'wide' : 'neutral', look: [-1, 0], seed: 31, glyph: false })
      bubble(x, 790, 640, '*sigh*', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
      label(x, 540, 1130, 'PISCES: SOBBING', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0192', key: 'E', accent: PINK, solo: S, ending: 'card',
  title: 'Pisces red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'cancer', chip: 'IT’S A MATCH' },
  group: { cap: 'Red flags? | *Pink* flags.', mood: 'sparkle' },
  lesson: { text: 'Love them gently. | They feel *everything.*', chip: 'STATUS: SO SOFT' },
  last: {
    text: 'Their match? | A fellow *crier.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
