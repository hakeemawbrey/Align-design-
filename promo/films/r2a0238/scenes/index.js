// r2a0238: star_advice, ADVICE SOLO, "Cancer, let yourself | be loved." (~47 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the Cancer who looks after everybody, learning to be
// looked after too.
//   0.0–3.6    "Cancer, let yourself | *be loved.*"
//   3.6–37.8   nine cards (3.8 s each): host every birthday, let them throw yours · never forget birthdays, neither do
//              they · got a compliment? say thank you · hiding in your shell, they'll knock with soup · asking for
//              help is trust · knit everyone scarves, accept the lumpy one · needing hugs is human · mom-friend deserves a
//              mom-friend · let someone else hold the umbrella
//  37.8        "Cared for. | *For once.*"
//  41.0        LESSON UNLOCKED: "You’re easy to love. | *Let it land.*"  STATUS: HELD
//  46.9        "Scorpio’s got | *the umbrella.*" over the match card: Cancer + Scorpio (the umbrella card, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, handset, confetti, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, WOOD } from './props.js'

const S = 'cancer', ACC = '#ff8fb1'
const ST = { x: -180 }
const LBL = { font: MONO, weight: 700 }

const CAKE = ['..Y..Y..Y..', '..R..R..R..', 'PPPPPPPPPPP', 'WWWWWWWWWWW', 'PPPPPPPPPPP', 'WWWWWWWWWWW']
const CAKE_C = { Y: SUN, R: RED, P: PINK, W: CREAM }
const SCARF = ['RR.........', 'RRRR.......', '.RRRRR.....', '..RRRRRR...', '....RRRRRR.', '......RRRRR', '.....RRRR..', '....RRR....', '....R.R....']
const BOXX = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBTTBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const UMB = ['....LLLLL....', '..LLWWLLWWL..', '.LWWLLWWLLWW.', 'LLLLLLLLLLLLL', '......K......', '......K......', '......K......', '......K......', '.....KK......']
const DOOR = ['KKKKKKKK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWYK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK']
const BOWL = ['.S.S.S.', 'S.S.S..', 'WWWWWWW', 'WOOOOOW', '.WWWWW.', '..WWW..']

function rain(x, t, a = 0.5) {
  x.fillStyle = SKYB
  for (let i = 0; i < 14; i++) { const ph = (t * 1.3 + i * 0.173) % 1; x.globalAlpha = a * (1 - ph); x.fillRect(140 + (i * 67) % 780, 500 + ph * 650, 6, 18) }
  x.globalAlpha = 1
}

const CAMEOS = [
  { sign: S, cap: 'You host every birthday. | *Let them throw yours.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'SURPRISE!!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 46, bg: PINK, rot: -0.05 })
      confetti(x, t, 640, 860, P.t0 + 0.9, { n: 18, spread: 300, h: 560 })
    } },
  { sign: S, cap: 'You never forget birthdays. | *Neither do they.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        const M = [['happy bday!!', PINK], ['love you ♥', MINT], ['cake on me', GOLD], ['🎂 x 100', LAV]]
        M.slice(0, 3).forEach(([s, c], i) => { if (lt < 0.5 + i * 0.3) return; x.fillStyle = c; x.fillRect(-90, -130 + i * 70, 180, 54); txt(x, s, 0, -103 + i * 70, { size: 24 }) })
      })
      label(x, 790, 1110, '47 NEW MESSAGES', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Got a compliment? | *Just say thank you.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, squash: lt => lt < 1.3 ? 0.06 * Math.sin(lt * 30) : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'you’re amazing', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      bubble(x, 790, 880, 'n-no I’m— | …thank you.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      label(x, 790, 1080, 'ACCEPTED ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'Hiding in your shell? | *They’ll knock with soup.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, W: BROWN, Y: SUN }, 800, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 620, 'knock knock', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      drawBits(x, BOWL, { S: '#ffffff', W: CREAM, O: ORANGE }, 660, 1080, 14 * pop01(t, P.t0 + 1.2, 0.3, 2))
      label(x, 800, 1000, 'SOUP DELIVERY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: ORANGE, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Asking for help? | *That’s trust.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const lift = ease.outCubic(prog(lt, 1.0, 1.5))
      drawBits(x, BOXX, { K: INK, B: WOOD, T: CREAM }, 780, 1060 - 80 * lift, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 900, 900 - 80 * lift, 150 * k, { mood: 'sparkle', look: [-1, 0], seed: 41, glyph: false })
      label(x, 780, 660, 'HEAVY? WE GOT IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'You knit everyone scarves. | *Accept the lumpy one.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SCARF, { R: '#7dffb0' }, 800, 900, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.1 })
      label(x, 800, 660, 'HANDMADE (BADLY) ♥', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, ...LBL })
      hearts(x, t, 800, 1000, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Needing hugs | *isn’t too needy.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      card(x, 790, 800, 290, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a2350', rot: 0.03 }, () => {
        txt(x, 'HUG METER', 0, -56, { size: 26, font: MONO, weight: 700, color: BONE })
        x.fillStyle = DEEP; x.fillRect(-120, -20, 240, 50); x.fillStyle = PINK; x.fillRect(-120, -20, 240 * clamp((lt - 0.4) / 1.0), 50)
        txt(x, lt > 1.4 ? 'FULL ♥' : 'filling…', 0, 62, { size: 26, font: MONO, weight: 700, color: lt > 1.4 ? PINK : BONE })
      })
      label(x, 790, 1060, 'REFILLS: UNLIMITED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'The mom-friend | *deserves a mom-friend.*', mood: lt => lt > 1.1 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 900, 170 * k, { mood: 'heart', look: [-1, 0], seed: 43, glyph: false })
      const d = ease.outCubic(prog(lt, 0.9, 1.3))
      if (lt > 0.85) { x.save(); x.globalAlpha = d; x.fillStyle = INK; x.fillRect(F.x - 130, F.cy + 20, 260, 110); x.fillStyle = LAV; x.fillRect(F.x - 124, F.cy + 26, 248, 98); x.fillStyle = '#b7a6ff'; for (let i = 0; i < 4; i++) x.fillRect(F.x - 110 + i * 64, F.cy + 40, 30, 70); x.restore() }
      bubble(x, 800, 650, 'blanket. tea. rest.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Let someone else | *hold the umbrella.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, -1], star: ST,
    back(x, t, lt, P) { rain(x, t, 0.5) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 640, 900, 170 * k, { mood: lt > 1.2 ? 'wink' : 'neutral', look: [-1, 0], seed: 44, glyph: false })
      drawBits(x, UMB, { L: '#c97bff', W: '#e7c8ff', K: INK }, 500, 700, 24 * k, { rot: -0.15 })
      label(x, 760, 1100, 'DRY. HELD. SAFE.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, ...LBL })
    } },
]

const F = makeFilm({
  id: 'r2a0238', key: 'C', accent: ACC, solo: S, ending: 'card',
  title: 'Cancer, let yourself | *be loved.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'scorpio', chip: 'ALIGNED' },
  group: { cap: 'Cared for. | *For once.*', mood: 'heart' },
  lesson: { text: 'You’re easy to love. | *Let it land.*', chip: 'STATUS: HELD' },
  last: { text: 'Scorpio’s got | *the umbrella.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
