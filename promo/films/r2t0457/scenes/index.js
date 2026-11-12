// r2t0457: star_talk, SOLO (libra), "Libras shopping | *be like.*" (signs3kit social cut, music: lofi · E).
// Ending: group (the group beat is the punchline).
//   two identical shirts, forty minutes · asked the cashier's opinion · bought one lamp, redid the room · returned it,
//   bought it again · called five friends about socks · picked the colour that suits their Venus · window shopping,
//   bought the window · still choosing a cart · bought one shoe.
//   group "Can't decide. | Impeccable taste."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff9cc8', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const SHIRT = ['SSS...SSS', 'SSSSSSSSS', 'SSSSSSSSS', '..SSSSS..', '..SSSSS..', '..SSSSS..', '..SSSSS..']
const LAMP = ['...YYYYY...', '..YYYYYYY..', '.YYYYYYYYY.', 'YYYYYYYYYYY', '.....K.....', '.....K.....', '.....K.....', '.....K.....', '...KKKKK...']
const LAMP_C = { Y: GOLD, K: '#c98f5a' }
const SOCK = ['.SSS', '.SWS', '.SSS', '.SSS', 'SSSS', 'SSSS']
const WINDOW = ['KKKKKKKKKKKKK', 'KSSSSSKSSSSSK', 'KSWSSSKSWSSSK', 'KSSSSSKSSSSSK', 'KKKKKKKKKKKKK', 'KSSSSSKSSSSSK', 'KSSWSSKSSWSSK', 'KSSSSSKSSSSSK', 'KKKKKKKKKKKKK']
const WINDOW_C = { K: '#c98f5a', S: SKYB, W: '#ffffff' }
const CART = ['KKKK...........', '...KKKKKKKKKKKK', '...KWKWKWKWKWK.', '....KWKWKWKWK..', '....KKKKKKKKK..', '.....K.....K...', '....KKK...KKK..']
const CART_C = { K: SLATE, W: '#140c30' }
const SHOE = ['....PPP......', '....PWP......', '....PPPP.....', '....PPPPPP...', 'PPPPPPPPPPPP.', 'PPPPPPPPPPPPP', 'KKKKKKKKKKKKK']
const SHOE_C = { P: ACC, W: CREAM, K: INK }
const RECEIPT = ['WWWWWWWW', 'WKKKKKWW', 'WWWWWWWW', 'WKKKWKKW', 'WWWWWWWW', 'WKKKKWWW', 'WWWWWWWW', 'W.W.W.W.']

/** a phone with a stack of message bubbles */
function chat(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 28
    x.save(); x.translate(i % 2 ? 112 - w : -112, -140 + i * 66); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -25, w, 50); x.fillStyle = INK; x.fillText(txt, 14, 2); x.restore()
  })
  x.restore()
}

const S = 'libra', ST = { x: -170 }
const CAMEOS = [
  // 1 · two identical shirts
  { sign: S, cap: 'Two identical shirts. | *Forty minutes.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: lt => [Math.sin(lt * 5) > 0 ? 1 : 0.3, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHIRT, { S: SKYB }, 710, 860, 20 * k, { rot: -0.05 })
      drawBits(x, SHIRT, { S: SKYB }, 890, 860, 20 * k, { rot: 0.05 })
      L(x, 800, 640, '0:40:12', pop01(t, P.t0 + 1.0, 0.3, 2.2), SLATE, 0.04, 44)
      L(x, 800, 1090, 'SAME: YES', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  // 2 · asked the cashier
  { sign: S, cap: 'Asked the cashier | *for their opinion.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'be honest. | which one?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 900, 'there’s a | line, babe', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      L(x, 790, 1110, 'QUEUE: 14', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 34)
    } },
  // 3 · one lamp, whole room
  { sign: S, cap: 'Bought one lamp. | Redid *the whole room.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, LAMP, LAMP_C, 790, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = 0.25 * clamp((lt - 0.5) * 2); x.fillStyle = GOLD; x.beginPath(); x.arc(790, 780, 170, 0, Math.PI * 2); x.fill(); x.restore()
      L(x, 790, 1110, 'ROOM: REDONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 38)
    } },
  // 4 · returned it, bought it again
  { sign: S, cap: 'Returned it. | Bought it *again.*', mood: lt => lt > 1.1 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, RECEIPT, { W: CREAM, K: '#9a90b8' }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      const n = 1 + Math.min(2, Math.floor(Math.max(0, lt - 0.6) / 0.5))
      L(x, 790, 1100, `RETURN #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), ACC, -0.05, 42)
    } },
  // 5 · called five friends about socks
  { sign: S, cap: 'Called five friends. | *For socks.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chat(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), [
        ['stripes or dots?', ACC, pop01(t, P.t0 + 0.4, 0.2, 2)], ['dots', MINT, pop01(t, P.t0 + 0.7, 0.2, 2)], ['stripes', GOLD, pop01(t, P.t0 + 0.9, 0.2, 2)],
        ['both??', SKYB, pop01(t, P.t0 + 1.1, 0.2, 2)], ['it’s 2 a.m.', LAV, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ])
      drawBits(x, SOCK, { S: PINK, W: CREAM }, 620, 1110, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.2 })
    } },
  // 6 · Align: the colour that suits their Venus
  { sign: S, cap: 'Picked the colour | that suits *their Venus.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const sw = [GOLD, MINT, ACC, SKYB]
      sw.forEach((c, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2); if (k < 0.01) return; x.save(); x.translate(700 + i * 64, 860); x.rotate(-0.3 + i * 0.2); x.scale(k, k); x.fillStyle = INK; x.fillRect(-34, -110, 68, 220); x.fillStyle = c; x.fillRect(-28, -104, 56, 208); x.restore() })
      L(x, 790, 650, '♀︎ VENUS: APPROVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 30)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 170, 0.5)
    } },
  // 7 · window shopping
  { sign: S, cap: 'Window shopping. | *Bought the window.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, WINDOW, WINDOW_C, 790, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1100, 'SOLD ✓', pop01(t, P.t0 + 1.2, 0.3, 2.6), RED, -0.06, 46)
    } },
  // 8 · still choosing a cart
  { sign: S, cap: 'Still choosing a cart. | *Hour two.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CART, CART_C, 800, 820, 18 * k)
      drawBits(x, CART, CART_C, 800, 990, 18 * k)
      L(x, 790, 640, 'ENTRANCE', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, 0.04, 34)
      L(x, 790, 1150, 'THIS ONE? NO.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  // 9 · bought one shoe
  { sign: S, cap: 'Bought the left shoe. | *Still deciding* the right.', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHOE, SHOE_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'the right one | feels like a lot', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1110, 'PAIRS: 0.5', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 38)
    } },
]

const F = makeFilm({
  id: 'r2t0457', key: 'E', accent: ACC, solo: S,
  title: 'Libras shopping | *be like.*',
  cameos: CAMEOS,
  ending: 'group',
  group: {
    cap: 'Can’t decide. | *Impeccable taste.*', mood: 'sparkle',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
