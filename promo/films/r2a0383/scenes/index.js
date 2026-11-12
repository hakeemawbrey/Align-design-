// r2a0383: star_advice, ADVICE SOLO (sagittarius), "Signs a Sagittarius | likes you." (signs3kit social cut, music: lofi · C).
// Ending: card (lesson + last line over the match card: Sagittarius + Aries, the two-ticket trip paid off).
//   a trip, leaving in an hour · brutally honest with you · a video a day just to say hi · laughs loudest at your jokes
//   · lets you pick the adventure · asks your sign · late, but always shows up · 2 a.m. philosophy only with you
//   · they unpacked the suitcase for you.   group "Free spirit. | Chose you."  lesson "Give them room. | They come back."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', SLATE = '#9aa5c4', ACC = '#ff9a4a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const CASE = ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', 'BBBWWWWBBB', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', '.K......K.']
const CASE_C = { K: INK, B: ACC, Y: GOLD, W: CREAM }
const HAT = ['....GGG....', '...GGGGG...', '...GPPPG...', '..GGGGGGG..', 'GGGGGGGGGGG']
const HAT_C = { G: '#5fd068', P: PINK }
const SHIRT = ['SS.SS.SS', 'SSSSSSSS', '.SSSSSS.', '.SSSSSS.', '.SSSSSS.']
const MOON = ['..YYYY..', '.YYY....', 'YYY.....', 'YYY.....', 'YYY.....', '.YYY....', '..YYYY..']
const COMPASS = ['...KKK...', '.KKWWWKK.', '.KWWRWWK.', 'KWWWRWWWK', 'KWWWKWWWK', 'KWWWBWWWK', '.KWWBWWK.', '.KKWWWKK.', '...KKK...']
const COMPASS_C = { K: INK, W: CREAM, R: RED, B: SKYB }

/** a pixel phone with video tiles */
function vids(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.22) + (lt > 0.3 ? 1 : 0))
  const COLS = [GOLD, MINT, PINK, SKYB]
  for (let i = 0; i < n; i++) {
    const y = -130 + i * 80
    x.fillStyle = COLS[i]; x.fillRect(-100, y - 30, 200, 64)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-14, y - 16); x.lineTo(16, y + 2); x.lineTo(-14, y + 20); x.closePath(); x.fill()
  }
  x.restore()
}
/** a little map with a dotted path and two pins */
function map(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -120, 336, 260)
  x.fillStyle = INK; x.fillRect(-172, -134, 344, 268)
  x.fillStyle = '#e8d9b0'; x.fillRect(-164, -126, 328, 252)
  x.fillStyle = '#8fd6a0'; x.fillRect(-140, -100, 110, 80); x.fillRect(40, 20, 110, 80)
  x.fillStyle = '#8fc8e8'; x.fillRect(-40, -110, 60, 230)
  x.fillStyle = RED
  const p = clamp((lt - 0.4) / 1.0)
  for (let i = 0; i < 10; i++) if (i / 10 < p) x.fillRect(-110 + i * 24, 40 - Math.sin(i / 9 * Math.PI) * 90, 10, 10)
  x.fillStyle = INK; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; if (p >= 1) x.fillText('✕', 120, 40)
  x.restore()
}

const S = 'sagittarius', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Invites you on a trip. | *Leaving in an hour.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 })
      L(x, 790, 640, '2 TICKETS', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 42)
      bubble(x, 790, 1150, 'pack light!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Brutally honest with you? | *That’s trust.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, HAT, HAT_C, 800, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'that hat? | bold. I love you.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1100, 'HONESTY = LOVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Sends you videos daily? | *Each one says hi.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      vids(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1120, 'TRANSLATION: HI ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Laughs loudest | *at your jokes.*', mood: lt => lt > 0.8 ? 'squint' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.1, 1.4, 1.7],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'and then the | duck said…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 760, 860, 'HA!', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, -0.1, 56)
      L(x, 870, 960, 'HAHA!', pop01(t, P.t0 + 1.1, 0.3, 2.4), ACC, 0.08, 48)
      L(x, 760, 1080, 'HAHAHA!!', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.05, 44)
    } },
  { sign: S, cap: 'Lets you pick | *the next adventure.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      map(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      drawBits(x, COMPASS, COMPASS_C, F.x + 140, F.cy + 120, 10 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: Math.sin(t * 3) * 0.3 })
      L(x, 790, 1080, 'YOUR CALL ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Asked your sign? | *They’re curious.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'wait. what’s | your sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 880, '✦ TELL ME ALL', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, 0.04, 30)
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 170, 0.4)
      L(x, 790, 1040, 'CURIOUS: VERY', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Shows up late. | *Always shows up.*', mood: lt => lt > 0.9 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.7],
    front(x, t, lt, P) {
      L(x, 790, 660, '7:12 PM', pop01(t, P.t0 + 0.2, 0.3, 2), SLATE, 0.04, 44)
      bubble(x, 790, 860, 'I’m here!! | I brought cake', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1060, 'WORTH THE WAIT', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: '2 a.m. big questions? | *Only with you.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: '#fff1b0' }, 860, 640, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 860, 'is a hot dog | a sandwich?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      L(x, 790, 1070, 'DEEP TALK: YOU ONLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'Unpacked the suitcase. | *For you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const open = lt > 0.9
      drawBits(x, CASE, CASE_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: open ? 0 : 0.04 })
      if (open) { const sk = pop01(lt, 1.0, 0.3, 2); drawBits(x, SHIRT, { S: MINT }, 650, 1110, 9 * sk); drawBits(x, SHIRT, { S: PINK }, 790, 1120, 9 * sk); drawBits(x, SHIRT, { S: GOLD }, 930, 1110, 9 * sk) }
      if (open) L(x, 790, 760, 'UNPACKED', pop01(lt, 0.9, 0.3, 2.4), MINT, -0.04, 44)
      hearts(x, t, F.x + 40, F.top, P.t0 + 1.2, { n: 5, life: 1.6, spread: 150, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0383', key: 'C', accent: ACC, solo: S,
  title: 'Signs a Sagittarius | *likes you.*',
  cameos: CAMEOS,
  ending: 'card',
  card: { a: 'sagittarius', b: 'aries', chip: 'ALIGNED' },
  group: { cap: 'Free spirit. | *Chose you.*', mood: 'heart' },
  lesson: { text: 'Give them room. | They *come back.*', chip: 'STATUS: CHOSEN' },
  last: { text: 'Two tickets. | *One is yours.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
