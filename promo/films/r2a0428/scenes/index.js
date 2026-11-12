// r2a0428: star_advice, ADVICE SOLO, "Scorpio, protect | your peace." (~47 s vertical, signs3kit social cut,
// music: lofi · C). Nine relatable Scorpio truths, each with a warm reframe and one light visual gag. Ending: callback.
//   0.0–3.6    "Scorpio, protect | *your peace.*"
//   3.6–37.8   not everyone gets a key · mute the drama, keep the friends · carrying a grudge, set it down (a backpack)
//              · not every question needs an answer tonight · a quiet night in is a power move · trust slowly, that's
//              allowed · your phone can stay face down · say what you need, out loud · protect your peace, not your walls
//  37.8        "Calm. | *Still powerful.*"
//  41.2        "Grudge backpack? | *Now holds snacks.*"  The backpack comes back, full of snacks.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PURPLE = '#c97bff', PAPER = '#fff4e2'

// ── props
const KEY = [
  '.GGG..........',
  'GG.GG.........',
  'G...GGGGGGGGGG',
  'GG.GG....G.G.G',
  '.GGG.....G...G',
]
const PACK = [
  '....KKKKK....',
  '...K.....K...',
  '.PPPPPPPPPPP.',
  'PPPPPPPPPPPPP',
  'PPPpppppppPPP',
  'PPPp.....pPPP',
  'PPPp.....pPPP',
  'PPPpppppppPPP',
  'PPPPPPPPPPPPP',
  '.PPPPPPPPPPP.',
]
const PACK_C = { K: INK, P: '#6b3fa8', p: '#9a6fd8' }
const BLANKET = [
  '....SSSSS....',
  '..BBSSSSSBB..',
  '.BBBBBBBBBBB.',
  'BBbBBBbBBBbBB',
  'BBBBBBBBBBBBB',
  'BbBBBbBBBbBBB',
  'BBBBBBBBBBBBB',
]
const BLANKET_C = { S: 'rgba(0,0,0,0)', B: '#ff8fb1', b: '#ffd0e0' }
const MUG = ['.W.W.W..', 'MMMMMMM.', 'MMMMMMMM', 'MMMMMM.M', 'MMMMMMMM', 'MMMMMMM.', '.MMMMM..']

function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
/** a phone: face up (screen buzzing) or flipped face down by f (0..1) */
function phone(x, t, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * Math.abs(Math.cos(f * Math.PI)) + 0.02, k)
  x.fillStyle = INK; x.fillRect(-110, -190, 220, 380)
  if (f < 0.5) {
    x.fillStyle = '#2a2350'; x.fillRect(-100, -180, 200, 360)
    x.fillStyle = '#140c30'; x.fillRect(-88, -160, 176, 310)
    x.fillStyle = '#ff6b5a'; for (let r = 0; r < 4; r++) x.fillRect(-76 + Math.sin(t * 30 + r) * 3, -140 + r * 70, 152, 50)
  } else {
    x.fillStyle = '#57338c'; x.fillRect(-100, -180, 200, 360)
    x.fillStyle = '#140c30'; x.fillRect(40, -160, 40, 40)
  }
  x.restore()
}

const S = 'scorpio', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Not everyone | *gets a key.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, KEY, { G: GOLD }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 + Math.sin(t * 2) * 0.05 })
      label(x, 790, 680, 'COPIES MADE: 2', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: PURPLE, color: PAPER, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'AND THAT’S OKAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mute the drama. | *Keep the friends.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 300, 330, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('GROUP CHAT', 0, -136)
        const n = lt < 1.2 ? Math.min(5, Math.floor(lt * 5)) : 5
        for (let r = 0; r < n; r++) { x.fillStyle = r % 2 ? '#ff6b5a' : '#ffb34a'; x.fillRect(r % 2 ? -40 : -120, -100 + r * 48, 160, 34) }
        if (lt > 1.2) { x.fillStyle = 'rgba(20,12,48,0.7)'; x.fillRect(-150, -165, 300, 330); x.fillStyle = PAPER; x.font = `800 44px ${INTER}`; x.fillText('MUTED', 0, 0) }
      })
      label(x, 790, 1110, 'FRIENDS: STILL LOVED', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Carrying a grudge? | *Set it down.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.8, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), drop = ease.outBounce ? ease.outBounce(prog(lt, 0.9, 1.3)) : ease.outCubic(prog(lt, 0.9, 1.3))
      drawBits(x, PACK, PACK_C, lerp(560, 780, drop), lerp(800, 1030, drop), 17 * k)
      label(x, lerp(560, 780, drop), lerp(800, 1030, drop) + 20, 'GRUDGES', k, { size: 26, bg: BONE, rot: 0, font: MONO, weight: 700 })
      label(x, 790, 690, 'WEIGHT: LIFTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not every question | *needs an answer tonight.*', mood: lt => lt > 1.5 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const Q = [[700, 660], [880, 720], [740, 840], [900, 900], [780, 1000]]
      Q.forEach(([qx, qy], j) => bubble(x, qx, qy, j === 2 ? 'why??' : '?', pop01(t, P.t0 + 0.2 + j * 0.16, 0.22, 2.2) * (1 - prog(lt, 1.1, 1.3)), { size: 44, col: j % 2 ? LAV : BONE, tail: j % 2 ? 'br' : 'bl' }))
      label(x, 790, 860, 'ANSWER: TOMORROW', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A quiet night in | *is a power move.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    back(x, t, lt, P) { drawBits(x, BLANKET, BLANKET_C, 370, 1030, 22 * pop01(t, P.t0 + 0.5, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: '#d8dbe8', M: PURPLE }, 800, 950, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 700, 'PLANS: CANCELLED ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'BATTERY: FULL', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Trust slowly. | *That’s allowed.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), p = clamp(lt / 2.4) * 0.14
      card(x, 790, 880, 330, 160, k, 0, x => {
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('TRUST', 0, -48)
        x.fillStyle = '#140c30'; x.fillRect(-140, -16, 280, 44); x.fillStyle = MINT; x.fillRect(-136, -12, 272 * p, 36)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText(`${(p * 100).toFixed(1)}%`, 0, 56)
      })
      label(x, 790, 690, 'LOADING… SLOWLY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'PACE: YOURS', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your phone can stay | *face down.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.9, 1.3)))
      label(x, 790, 650, 'PING PING PING', pop01(t, P.t0 + 0.3, 0.3, 2.2) * (1 - prog(lt, 1.2, 1.4)), { size: 32, bg: '#ff6b5a', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'PEACE: ON', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say what you need. | *Out loud.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, '(says nothing)', pop01(t, P.t0 + 0.25, 0.25, 2.2) * (1 - prog(lt, 0.8, 1.0)), { size: 38, col: '#9aa5c4', tail: 'bl' })
      bubble(x, 790, 820, 'i need a | quiet day.', pop01(t, P.t0 + 1.0 * 1.29, 0.25, 2.4), { size: 52, col: LAV, tail: 'bl' })
      label(x, 790, 1080, 'SAID IT ✓', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Protect your peace, | *not your walls.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), w = ease.outCubic(prog(lt, 0.9, 1.4))
      if (k > 0.01) {
        x.save(); x.translate(780, 900); x.scale(0.85 * k, 0.85 * k)
        for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) {
          const bx = -160 + c * 80 + (r % 2 ? 40 : 0), by = -180 + r * 60
          if (bx < -160 || bx > 120) continue
          const hole = r >= 2 && r <= 3 && c >= 1 && c <= 2
          if (hole && w > 0.01) continue
          x.fillStyle = INK; x.fillRect(bx - 3, by - 3, 82, 62); x.fillStyle = '#a34a4a'; x.fillRect(bx, by, 76, 56)
        }
        if (w > 0.01) { x.fillStyle = '#ffe7a8'; x.globalAlpha = w; x.fillRect(-80, -60, 160, 110); x.fillStyle = '#6fc3ff'; x.fillRect(-70, -50, 140, 90) }
        x.restore()
      }
      label(x, 790, 650, 'WINDOW: OPEN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.5, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0428', key: 'C', accent: PURPLE, solo: S, ending: 'callback',
  title: 'Scorpio, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Calm. | *Still powerful.*', mood: 'sparkle' },
  last: {
    text: 'Grudge backpack? | *Now holds snacks.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'scorpio', 340, 1200, 340 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 33, hops: [t0 + 1.4] })
      drawBits(x, PACK, PACK_C, 750, 1200, 26 * k)
      label(x, 750, 1230, 'SNACKS', k, { size: 40, bg: GOLD, rot: 0, font: MONO, weight: 700 })
      sparkles(x, t, 740, 1200, t0 + 1.2, 8, 200, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
