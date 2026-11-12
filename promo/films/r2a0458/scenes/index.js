// r2a0458: star_advice, ADVICE SOLO (leo), "Leo, you're allowed | *to want more.*" (signs3kit social cut, music: lofi · C).
// Ending: callback (the big bouquet comes back: "The big bouquet? | You deserve it.").
//   you hype everyone (hype yourself too) · want the lead role (ask for it) · asking for more pay isn't too much
//   · want flowers (buy the big bouquet) · dreams too big? no such thing · want a match who cheers? hold out for that
//   · resting isn't losing · outgrew the room? find a bigger one · your chart says: go for it.
//   group "Big heart. | Bigger dreams."   last "The big bouquet? | You deserve it."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb347', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const BOUQUET = [
  '..PP.RR.YY.PP..',
  '.PPPRRRRYYYPPP.',
  'RRPPRYYRRYPPRRY',
  'RRRYYYRRPPPRRRY',
  '.YYYRRPPPPYYYY.',
  '..LLYYPPRRYLL..',
  '...LLLLLLLLL...',
  '....WLLLLLW....',
  '.....WLLLW.....',
  '......WLW......',
  '......LLL......',
  '......LLL......',
]
const BOUQUET_C = { P: PINK, R: RED, Y: GOLD, L: '#5fd068', W: CREAM }
const COINS = ['.YYYY.', 'YYWYYY', 'YWYYYY', 'YYYYYY', '.YYYY.']
const PILLOW = ['.PPPPPPPPPPPP.', 'PPPPPPPPPPPPPP', 'PPWPPPPPPPPWPP', 'PPPPPPPPPPPPPP', 'PPPPPPPPPPPPPP', '.PPPPPPPPPPPP.']
const PILLOW_C = { P: LAV, W: CREAM }
const BIGSTAR = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']

/** a mirror the star hypes itself in */
function mirror(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 180, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 122, 172, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe6ff'; x.beginPath(); x.ellipse(0, 0, 104, 152, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-60, -110, 18, 70)
  x.restore()
}
/** a cast list where the lead's name gets written in */
function castList(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const W = 330, H = 280
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = CREAM; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = ACC; x.fillRect(-W / 2, -H / 2, W, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CAST LIST', 0, -H / 2 + 31)
  x.textAlign = 'left'; x.font = `700 32px ${MONO}`
  x.fillText('LEAD:', -W / 2 + 22, -20)
  const w = lt > 1.1 ? 'LEO ✓' : '____'
  x.fillStyle = lt > 1.1 ? RED : '#9a90b8'; x.fillText(w, -W / 2 + 140, -20)
  x.fillStyle = '#9a90b8'; x.fillText('tree #2: ___', -W / 2 + 22, 50)
  x.restore()
}
/** a small room the star is too big for; the walls push out */
function room(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const g = ease.outBack ? ease.outBack(prog(lt, 1.0, 1.5)) : ease.outCubic(prog(lt, 1.0, 1.5))
  const w = lerp(200, 360, g), h = lerp(180, 320, g)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#3a2f6a'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, h / 4, w, h / 4)
  x.fillStyle = SKYB; x.fillRect(-w / 4 - 30, -h / 4 - 20, 60, 50)
  x.restore()
}

const S = 'leo', ST = { x: -170 }
const CAMEOS = [
  // 1 · hype yourself too
  { sign: S, cap: 'You hype everyone else. | *Hype yourself too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mirror(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 600, 'you’re amazing! | …wait, me too?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1110, 'FAN CLUB: +1 (YOU)', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  // 2 · ask for the lead role
  { sign: S, cap: 'Want the lead role? | *Ask for it.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      castList(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      sparkles(x, t, 790, 840, P.t0 + 1.45, 7, 180, 0.4)
    } },
  // 3 · more pay isn't too much
  { sign: S, cap: 'Asking for more? | *Not too much.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.25) + 1)
      for (let i = 0; i < n; i++) drawBits(x, COINS, { Y: GOLD, W: '#fff1a8' }, 790, 1060 - i * 66, 20 * pop01(t, P.t0 + 0.3 + i * 0.32, 0.2, 2))
      L(x, 790, 640, 'WORTH IT: YES', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 36)
    } },
  // 4 · buy the big bouquet
  { sign: S, cap: 'Want flowers? | *Buy the big bouquet.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, BOUQUET, BOUQUET_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      L(x, 790, 1130, 'SIZE: XXL', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 38)
    } },
  // 5 · dreams too big
  { sign: S, cap: 'Dreams too big? | *No such thing.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const g = lerp(10, 30, ease.outCubic(prog(lt, 0.3, 1.4)))
      drawBits(x, BIGSTAR, { Y: GOLD }, 790, 820, g * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 2) })
      L(x, 790, 1120, 'DREAM SIZE: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 34)
    } },
  // 6 · Align: a match who cheers
  { sign: S, cap: 'Want a match who cheers? | *Hold out for that.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 640, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 36)
      bubble(x, 790, 860, 'you did WHAT?? | so proud of you', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      hearts(x, t, 370, 760, P.t0 + 1.2, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 3 })
    } },
  // 7 · resting isn't losing
  { sign: S, cap: 'Resting isn’t losing. | *Stars sleep too.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170, y: 20 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'NAP: EARNED', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, -0.04, 40)
    } },
  // 8 · outgrew the room
  { sign: S, cap: 'Outgrew the room? | *Find a bigger one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      room(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1120, 'ROOM: UPGRADED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 36)
    } },
  // 9 · your chart says go
  { sign: S, cap: 'Your chart says it too: | *go for it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      L(x, 790, 700, '☉ SUN: LEO', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 48)
      L(x, 790, 860, 'MORE: ALLOWED', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, 0.04, 40)
      sparkles(x, t, 790, 760, P.t0 + 1.0, 8, 200, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0458', key: 'C', accent: ACC, solo: S,
  title: 'Leo, you’re allowed | *to want more.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Big heart. | *Bigger dreams.*', mood: 'sparkle' },
  last: {
    text: 'The big bouquet? | *You deserve it.*',
    draw(x, t, lt) {
      drawBits(x, BOUQUET, BOUQUET_C, 540, 1060, 26 * pop01(t, t - lt + 0.6, 0.4, 2), { rot: 0.05 })
      sparkles(x, t, 540, 1060, t - lt + 1.0, 9, 230, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
