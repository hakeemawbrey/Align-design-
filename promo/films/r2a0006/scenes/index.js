// r2a0006: star_advice ADVICE SOLO, "How to encourage | an Aries." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aries truth + a warm reframe, one light gag each.
//   0.0–3.6    "How to encourage | *an Aries.*"  One big Aries pops in, then dives away.
//   3.6–37.8   cheer first, questions later (foam finger) · say "go for it", they already went (dust cloud)
//              · celebrate day one (DAY 1: DONE) · a loss gets snacks, not lectures · challenge them, they light up
//              · mad for a minute, hug in two (timer) · rest isn't losing · hype the idea before the plan (moon café)
//              · tell them you're proud, out loud (medal)
//  37.8        GROUP ENDING: "Be their hype squad. | They'll *be yours.*"  The big Aries comes back, all hearts.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, signChar, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff6b5a', ORANGE = '#ffb34a'

const FINGER = [
  '....FF....',
  '...FFFF...',
  '...FFFF...',
  '...FFFF...',
  '...FFFF...',
  '.FFFFFFFF.',
  'FFFFFFFFFF',
  'FFWWWWWWFF',
  'FFFFFFFFFF',
  'FFFFFFFFFF',
  '.FFFFFFFF.',
  '..FFFFFF..',
  '...SSSS...',
  '...SSSS...',
]
const FINGER_C = { F: RED, W: '#fff4e2', S: '#8a4a2e' }
const ORANGES = [
  '..OOO....OOO..',
  '.OWWWO..OWWWO.',
  'OWOWOWOOWOWOWO',
  'OOOOOOOOOOOOOO',
  '.BBBBBBBBBBBB.',
  'BBBBBBBBBBBBBB',
  '.BBBBBBBBBBBB.',
  '..BBBBBBBBBB..',
]
const ORANGES_C = { O: ORANGE, W: '#ffe7a8', B: '#6fc3ff' }
const BULB = [
  '...YYYYY...',
  '..YYYYYYY..',
  '.YYYWYYYYY.',
  '.YYWYYYYYY.',
  '.YYYYYYYYY.',
  '..YYYYYYY..',
  '...YYYYY...',
  '....GGG....',
  '....GGG....',
  '.....G.....',
]
const BULB_C = { Y: '#ffe36a', W: '#ffffff', G: '#9aa5c4' }
const MEDAL = [
  'RR.....BB',
  '.RR...BB.',
  '..RR.BB..',
  '...RBB...',
  '...GGG...',
  '..GGGGG..',
  '.GGGWGGG.',
  '.GGWGGGG.',
  '.GGGGGGG.',
  '..GGGGG..',
  '...GGG...',
]
const MEDAL_C = { R: RED, B: '#6fc3ff', G: GOLD, W: '#fff4e2' }
const PILLOW = [
  '.PPPPPPPPPPPP.',
  'PPPPPPPPPPPPPP',
  'PPPWPPPPPPPPPP',
  'PPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPP',
  '.PPPPPPPPPPPP.',
]
const PILLOW_C = { P: LAV, W: '#fff4e2' }

function confetti(x, t, cx, cy, t0, n = 18, spread = 300) {
  const tt = t - t0; if (tt < 0 || tt > 2.4) return
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i / n - 0.5) * 2.2, v = 300 + (i * 37) % 200
    const px = cx + Math.cos(a) * v * tt * 0.9 * (spread / 300), py = cy + Math.sin(a) * v * tt + 260 * tt * tt
    x.fillStyle = [GOLD, PINK, MINT, SKYB, LAV][i % 5]; x.fillRect(px, py, 14, 9)
  }
}

const S = 'aries'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Cheer *first.* | Ask questions later.', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FINGER, FINGER_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 + 0.08 * Math.sin(t * 9) })
      label(x, 790, 1170, 'GO ARIES!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Said “go for it.” | They *already went.*', mood: 'wide', look: [1, 0], star: { x: -170 }, hideStar: true,
    back(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.9, 1.4))
      if (g <= 0) return
      x.save(); x.globalAlpha = 0.8 * (1 - prog(lt, 1.8, 2.4))
      for (let i = 0; i < 6; i++) { x.fillStyle = '#e8dcc6'; x.beginPath(); x.arc(330 + i * 40 - 120 * g, 1060 - (i % 2) * 24, 34 + 14 * g, 0, Math.PI * 2); x.fill() }
      x.restore()
    },
    front(x, t, lt, P) {
      const run = ease.inCubic(prog(lt, 0.8, 1.2))
      if (run < 1) signChar(x, t, 'aries', 370 - 420 * run, 880, 300, { mood: lt > 0.6 ? 'sparkle' : 'wide', look: [-1, 0], pop: P.k, seed: 4 })
      bubble(x, 760, 650, 'go for i—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, tail: 'br' })
      label(x, 790, 880, 'ARIES: GONE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: RED, color: '#fff4e2', rot: 0.05 })
      label(x, 790, 1060, 'they love you for it', pop01(t, P.t0 + 1.7, 0.3, 2), { size: 28, bg: MINT, rot: -0.03 })
    } },
  { sign: S, cap: 'Celebrate the start, | not just *the finish.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      label(x, 790, 860, 'DAY 1: DONE!', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      confetti(x, t, 790, 860, P.t0 + 0.6, 20, 260)
      bubble(x, 790, 1080, 'you started!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Lost the game? | *Snacks,* not lectures.', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 650, 'SCORE: 2–3', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, ORANGES, ORANGES_C, 790, 920, 22 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      hearts(x, t, 790, 880, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Challenge them. | Watch them *light up.*', mood: lt => lt > 0.9 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [0.9, 1.3],
    front(x, t, lt, P) {
      bubble(x, 770, 680, 'bet you can’t…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: BONE, tail: 'br' })
      bubble(x, 790, 900, 'WATCH ME.', pop01(t, P.t0 + 0.9, 0.25, 2.6), { size: 64, col: GOLD, tail: 'bl' })
      sparkles(x, t, 370, 880, P.t0 + 1.0, 8, 180, 0.4)
    } },
  { sign: S, cap: 'Mad for a minute. | *Hug in two.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const s = Math.max(0, 60 - Math.floor(prog(lt, 0.3, 1.5) * 60))
      label(x, 790, 760, s > 0 ? `MAD: 0:${String(s).padStart(2, '0')}` : 'MAD: OVER', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 46, bg: s > 0 ? RED : MINT, color: s > 0 ? '#fff4e2' : INK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'hug?', pop01(t, P.t0 + 1.6, 0.25, 2.4), { size: 60, col: PINK, tail: 'bl' })
      hearts(x, t, 370, 820, P.t0 + 1.9, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Remind them | rest *isn’t losing.*', mood: lt => lt > 0.8 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170, y: 40 },
    back(x, t, lt, P) { drawBits(x, PILLOW, PILLOW_C, 370, 1040, 24 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 780, 760, 'REST: ALSO A WIN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04 })
      drawBits(x, MEDAL, MEDAL_C, 790, 960, 16 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
    } },
  { sign: S, cap: 'Hype the idea | *before* the plan.', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BULB, BULB_C, 790, 720, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 960, 'a café | on the moon?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1150, 'YOU: “LOVE IT!”', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Tell them you’re proud. | *Out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 770, 660, 'I’M SO PROUD | OF YOU!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 50, col: PINK, tail: 'bl' })
      drawBits(x, MEDAL, MEDAL_C, 800, 960, 20 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      sparkles(x, t, 800, 960, P.t0 + 1.2, 6, 160, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0006', key: 'D', accent: RED, solo: 'aries', ending: 'group',
  title: 'How to encourage | *an Aries.*',
  cameos: CAMEOS,
  group: { cap: 'Be their hype squad. | They’ll *be yours.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
