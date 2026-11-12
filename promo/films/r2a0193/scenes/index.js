// r2a0193: star_advice, ADVICE SOLO, "What Pisces need | after a fight." (~52 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Pisces truth after an argument + a warm
// reframe, one gag each. Pisces cries in every card (gently).
//   0.0–3.6    "What Pisces need | *after a fight.*"  One big (teary) Pisces pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              replaying it all night (sleep first) · a soft voice, not a lecture (volume: gentle) · tea, and you
//              · say "we're okay" out loud · they might cry: hand a tissue · space, then come back (back in 20)
//              · meet them halfway (Virgo walks over too) · one fight isn't the end (to be continued) · then a silly film
//  37.8        "Soft hearts. | *Gentle* repairs."  Pisces comes back, big.
//  41.0        LESSON UNLOCKED: "Gentle after a fight? | It *heals faster.*"  STATUS: MADE UP
//  46.9        "Met halfway. | *Still aligned.*" over the match card: Pisces + Virgo (the halfway walk, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURP = '#7c74f0', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', WOOD = '#c98f2a'
const S = 'pisces'

// ── props
const CUP = ['..H.H....', '.HHHHH...', '..HHH....', 'WWWWWWW..', 'WTTTTTWWW', 'WTTTTTW.W', 'WTTTTTWWW', 'WWWWWWW..', '.WWWWW...']
const CUP_C = { W: CREAM, T: '#c98f6a', H: PINK }
const TISSUE = [
  '...WWW.....',
  '..WWWWW....',
  '.BBBBBBBBB.',
  'BBbBBBBbBBB',
  'BBBBBBBBBBB',
  'BBbBBBBbBBB',
  'BBBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: SKYB, b: '#ffffff' }
const DOOR = ['DDDDDDDD', 'DddddddD', 'DddddddD', 'DddddddD', 'DdddddYD', 'DddddddD', 'DddddddD', 'DddddddD', 'DDDDDDDD']
const DOOR_C = { D: '#5b2e1a', d: '#a65d38', Y: GOLD }
const BOOK = ['PPPPPPPPPPPP', 'PWWWWWPWWWWW', 'PWKKKWPWKKKW', 'PWWWWWPWWWWW', 'PWKKKWPWKKWW', 'PWWWWWPWWWWW', 'PPPPPPPPPPPP']
const BOOK_C = { P: PURP, W: CREAM, K: '#b9b0a0' }
const POPCORN = ['.W.WW.W.', 'WWWWWWWW', 'WYWWWYWW', 'RWRWRWRW', 'RWRWRWRW', '.RWRWRW.', '.RWRWRW.']
const POPCORN_C = { W: '#fff8e2', Y: GOLD, R: RED }
const REWIND = ['K...K...', 'KK..KK..', 'KKK.KKK.', 'KKKKKKKK', 'KKK.KKK.', 'KK..KK..', 'K...K...']

// a volume slider, sliding down to "gentle"
function volume(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -60, 300, 120); x.fillStyle = '#2a2350'; x.fillRect(-142, -52, 284, 104)
  x.fillStyle = '#140c30'; x.fillRect(-110, -8, 220, 16)
  const v = lerp(1, 0.25, ease.inOutCubic(clamp((lt - 0.4) / 0.9)))
  x.fillStyle = v > 0.5 ? RED : MINT; x.fillRect(-110, -8, 220 * v, 16)
  x.fillStyle = INK; x.fillRect(-110 + 220 * v - 16, -26, 32, 52); x.fillStyle = BONE; x.fillRect(-110 + 220 * v - 10, -20, 20, 40)
  x.restore()
}
// a little TV with a silly cartoon (bouncing blob)
function tv(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 250); x.fillStyle = '#2a2350'; x.fillRect(-160, -120, 320, 230)
  x.fillStyle = '#8fe3ff'; x.fillRect(-140, -100, 280, 190)
  x.fillStyle = '#5fd068'; x.fillRect(-140, 50, 280, 40)
  const b = Math.abs(Math.sin(t * 5)) * 50
  x.fillStyle = INK; x.fillRect(-30, 10 - b, 60, 44); x.fillStyle = ORANGE; x.fillRect(-26, 14 - b, 52, 36)
  x.fillStyle = INK; x.fillRect(-14, 24 - b, 6, 6); x.fillRect(8, 24 - b, 6, 6)
  x.fillStyle = INK; x.fillRect(-60, 120, 20, 30); x.fillRect(40, 120, 20, 30)
  x.restore()
}
// a dotted path between the two, a heart where they meet
function halfway(x, t, lt, P) {
  const k = pop01(t, P.t0 + 0.2, 0.3, 2)
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  for (let i = 0; i < 12; i++) { x.fillStyle = 'rgba(239,230,214,0.55)'; x.fillRect(300 + i * 42, 1110, 22, 10) }
  x.fillStyle = GOLD; x.fillRect(530, 1098, 22, 34)
  x.restore()
}

const tears = 2
const CAMEOS = [
  { sign: S, cap: 'Replaying it all night? | *Sleep first.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', tears: lt => lt > 1.4 ? 1 : 2, look: [1, 0], star: { x: -200 }, hops: [],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, REWIND, { K: LAV }, 790, 820, 22 * k * (lt > 1.4 ? 1 - clamp((lt - 1.4) / 0.3) : 1))
      label(x, 790, 1000, `REPLAY #${1 + Math.floor(clamp(lt / 1.3) * 13)}`, k * (lt > 1.4 ? 0 : 1), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'TALK TOMORROW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They need a soft voice. | *Not a lecture.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears, look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      volume(x, 780, 850, 1.4 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 780, 1060, 'VOLUME: GENTLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tea helps. | *So do you.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', tears, look: [1, 0], star: { x: -150, s: 260 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 900, 230 * k, { mood: 'happy', look: [-1, 0], seed: 61, glyph: false })
      drawBits(x, CUP, CUP_C, lerp(720, 560, ease.outCubic(clamp((lt - 0.6) / 0.6))), 1030, 17 * pop01(t, P.t0 + 0.5, 0.3, 2))
      hearts(x, t, 540, 800, P.t0 + 1.3, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 9 })
    } },
  { sign: S, cap: 'Say “we’re okay.” | *Out loud.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', tears, look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 760, 'we’re okay.', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 60, tail: 'bl' })
      bubble(x, 800, 980, 'really?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
      label(x, 760, 1120, 'REALLY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They might cry. | Hand *a tissue.*', mood: 'sparkle', tears: 3, look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TISSUE, TISSUE_C, 790, 940, 22 * k)
      for (let i = 0; i < 3; i++) {
        const d = clamp((lt - 0.6 - i * 0.3) / 0.8)
        if (d > 0) { x.save(); x.globalAlpha = 1 - d; x.fillStyle = INK; x.fillRect(780 + i * 30 - 6 - d * 120, 820 - d * 200 - 6, 52, 52); x.fillStyle = '#fff'; x.fillRect(780 + i * 30 - d * 120, 820 - d * 200, 40, 40); x.restore() }
      }
      label(x, 790, 1110, 'NO JUDGEMENT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Give them space. | Then *come back.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', tears, look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const open = lt > 1.4 ? ease.outCubic(clamp((lt - 1.4) / 0.4)) : 0
      if (open > 0) { x.fillStyle = `rgba(255,230,160,${(0.5 * open).toFixed(3)})`; x.fillRect(700, 740, 180, 280) }
      drawBits(x, DOOR, DOOR_C, 790, 880, 32 * k, { sx: lerp(1, 0.35, open) })
      label(x, 790, 640, 'BACK IN 20', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1110, 'I’m here.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Meet them halfway. | They’ll *walk too.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', tears, look: [1, 0], star: { x: -300, y: 40, s: 240 }, hops: [0.6, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { halfway(x, t, lt, P) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), w = ease.inOutCubic(clamp((lt - 0.4) / 1.0))
      if (k > 0.01) signChar(x, t, 'virgo', lerp(840, 680, w), 920, 230 * k, { mood: w > 0.9 ? 'heart' : 'happy', look: [-1, 0], seed: 62, glyph: false, hops: [P.t0 + 0.9, P.t0 + 1.5] })
      hearts(x, t, 540, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 8, seed: 10 })
    } },
  { sign: S, cap: 'One fight isn’t | *the end.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', tears, look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'TO BE CONTINUED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.25, 7, 180, 0.7)
    } },
  { sign: S, cap: 'Then a silly cartoon. | *Laugh-crying* counts.', mood: lt => lt > 1.0 ? 'happy' : 'sparkle', tears: 3, look: [1, 0], star: { x: -210 }, hops: [0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      tv(x, t, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, POPCORN, POPCORN_C, 420, 1110, 13 * pop01(t, P.t0 + 0.7, 0.3, 2.2))
    } },
]

const F = makeFilm({
  id: 'r2a0193', key: 'C', accent: LAV, solo: S, ending: 'card',
  title: 'What Pisces need | *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'virgo', chip: 'ALIGNED' },
  group: { cap: 'Soft hearts. | *Gentle* repairs.', mood: 'sparkle' },
  lesson: { text: 'Gentle after a fight? | It *heals faster.*', chip: 'STATUS: MADE UP' },
  last: {
    text: 'Met halfway. | *Still aligned.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 11 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
