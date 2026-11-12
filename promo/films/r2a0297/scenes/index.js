// r2a0297: star_advice, ADVICE SOLO, "Libra, it's okay | *to want more.*" (topic: you're allowed to want more) (~43 s vertical, signs3kit, lofi · F)
// One sign the whole way: nine moments a Libra settles to keep everyone happy, each with a warm "you can want more".
// Ending: group (the group beat is the punchline).
//   0.0–3.6    "Libra, you're allowed | *to want more.*"
//   3.6–37.8   nine cards: "either is fine" (pick yours) · keep the peace, yours counts · ask for the window seat
//              · get the fancy dessert · profile says "easygoing" (add what you want) · standards aren't too much
//              · ask for the raise · nobody's mad you spoke up · buy yourself the flowers
//  37.8        "Want more. | *You're worth it.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = PINK, RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#c98f5a'
const ST = { x: -200 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const CAKE = ['....R....', '...RRR...', '.WWWWWWW.', 'WPWPWPWPW', 'PPPPPPPPP', 'BBBBBBBBB', 'PPPPPPPPP', 'BBBBBBBBB']
const CAKE_C = { R: RED, W: '#fff', P: PINK, B: '#8a4a2e' }
const SMALL = ['.WWW.', 'WBBBW', 'BBBBB']
const FLOWERS = ['.P.Y.P.', 'PPPYPPP', '.PYYYP.', 'Y.PGP.Y', '...G...', '..GGG..', '.KKKKK.', '..KKK..']
const FLOWERS_C = { P: PINK, Y: GOLD, G: '#4ac77d', K: LAV }
const COIN = ['.YYYY.', 'YYKKYY', 'YKYYKY', 'YYKKYY', '.YYYY.']

function scales(x, t, cx, cy, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -150, 24, 300); x.fillRect(-90, 140, 180, 24)
  x.fillStyle = GOLD; x.fillRect(-6, -146, 12, 290)
  x.save(); x.translate(0, -140); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 16); x.fillStyle = GOLD; x.fillRect(-166, -4, 332, 8)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 160, 0); x.rotate(-tilt)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 90); x.moveTo(0, 0); x.lineTo(50, 90); x.stroke()
    x.fillStyle = INK; x.fillRect(-64, 88, 128, 18); x.fillStyle = GOLD; x.fillRect(-60, 90, 120, 12)
    x.restore()
  }
  x.restore(); x.restore()
}
function windowSeat(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-120, -170, 240, 340, 100); x.fill()
  x.fillStyle = '#d8dbe8'; x.beginPath(); x.roundRect(-108, -158, 216, 316, 90); x.fill()
  x.fillStyle = '#8fe3ff'; x.beginPath(); x.roundRect(-84, -132, 168, 264, 74); x.fill()
  x.fillStyle = '#fff'; const cx2 = -40 + ((lt * 60) % 160); x.fillRect(cx2 - 30, -40, 60, 20); x.fillRect(cx2 - 16, -54, 34, 16)
  x.fillStyle = '#ffb34a'; x.beginPath(); x.arc(30, 70, 28, 0, 7); x.fill()
  x.restore()
}
function profile(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -200, 340, 400); x.fillStyle = CREAM; x.fillRect(-162, -192, 324, 384)
  x.fillStyle = PINK; x.fillRect(-162, -192, 324, 70)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♎︎ LIBRA', 0, -156)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'
  x.fillText('easygoing ✓', -140, -80)
  const W = ['wants: long talks', 'wants: flowers', 'wants: you, on time']
  const n = Math.floor(clamp((lt - 0.7) / 1.1) * 3.99)
  for (let i = 0; i < n; i++) { x.fillStyle = '#2f9a5a'; x.fillText('+ ' + W[i], -140, -20 + i * 54) }
  x.restore()
}

const CAMEOS = [
  { sign: 'libra', cap: '“Either is fine”? | *Pick yours.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: lt => lt < 1.2 ? [Math.floor(lt * 3) % 2 ? 1 : -1, 0] : [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CAKE, CAKE_C, 700, 840, 16 * k)
      drawBits(x, ['.GGGGG.', 'GGgGgGG', 'GGGGGGG', '.KKKKK.'], { G: '#4ac77d', g: '#2f9a5a', K: BONE }, 880, 860, 18 * pop01(t, P.t0 + 0.35, 0.35, 2))
      if (lt > 1.2) L(x, 700, 1000, 'YOUR PICK ✓', pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.4), MINT, -0.04, 30)
      bubble(x, 790, 660, 'either is fine!', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt < 1.2 ? 1 : 0), { size: 34, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'You keep the peace. | *Yours counts too.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tilt = lerp(0.25, 0, ease.inOutCubic(prog(lt, 0.8, 1.6)))
      scales(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), tilt)
      if (lt > 0.8) { const k = pop01(t, P.t0 + 0.8 * 1.29, 0.3, 2); if (k > 0.01) signChar(x, t, 'libra', 790 - 160 * Math.cos(tilt), 820 - 160 * Math.sin(tilt) - 30, 90 * k, { mood: 'heart', seed: 50, glyph: false }) }
      L(x, 790, 1110, 'BALANCE: INCLUDES YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 26)
    } },
  { sign: 'libra', cap: 'Want the window seat? | *Ask for it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      windowSeat(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 1100, 'SEAT 12A: YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Ordered what they ordered? | Get *the fancy one.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const big = lt > 1.0
      drawBits(x, big ? CAKE : SMALL, big ? CAKE_C : { W: BONE, B: '#c98f5a' }, 790, 860, (big ? 26 : 30) * pop01(t, P.t0 + (big ? 1.29 : 0.2), 0.35, 2))
      if (big) sparkles(x, t, 790, 820, P.t0 + 1.4, 8, 170, 0.3)
      L(x, 790, 660, big ? 'THE FANCY ONE ✦' : 'SAME AS THEM', 1, big ? GOLD : BONE, 0.04, 32)
      L(x, 790, 1090, 'EXTRA SPRINKLES ✓', pop01(t, P.t0 + 1.8, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Profile says “easygoing”? | *Add what you want.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { profile(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'libra', cap: 'High standards | aren’t *too much.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), y = lerp(1060, 640, ease.inOutCubic(prog(lt, 0.4, 1.5)))
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        x.fillStyle = INK; x.fillRect(630, 560, 22, 560); x.fillRect(930, 560, 22, 560)
        x.fillStyle = '#9aa5c4'; x.fillRect(634, 564, 14, 552); x.fillRect(934, 564, 14, 552)
        x.fillStyle = INK; x.fillRect(624, y - 12, 334, 24); x.fillStyle = GOLD; x.fillRect(630, y - 6, 322, 12)
        x.restore()
      }
      L(x, 790, y + 60, 'BAR: RAISED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Scared to ask for a raise? | *You earned it.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.6) / 1.2) * 5)
      for (let i = 0; i < n; i++) drawBits(x, COIN, { Y: GOLD, K: '#c98f2a' }, 790, 1040 - i * 50, 16)
      bubble(x, 790, 680, 'about my salary…', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1120, 'ASK: SENT ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'You spoke up. | *Nobody’s mad.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 600, 640, 'actually, I’d like…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, tail: 'bl' })
      for (let i = 0; i < 2; i++) { const k = pop01(t, P.t0 + 0.7 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, ['cancer', 'sagittarius'][i], 720 + i * 170, 960, 150 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 40 + i, glyph: false }) }
      bubble(x, 800, 790, 'of course!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: MINT, tail: 'br' })
      hearts(x, t, 800, 880, P.t0 + 1.7, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'libra', cap: 'Want flowers? | *Buy yourself some.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 790, 840, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1080, 'FROM: ME · TO: ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 30)
      sparkles(x, t, 790, 800, P.t0 + 1.0, 7, 170, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0297', key: 'F', accent: ACC, solo: 'libra', ending: 'group',
  title: 'Libra, it’s okay | *to want more.*',
  cameos: CAMEOS,
  group: {
    cap: 'Want more. | *You’re worth it.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
