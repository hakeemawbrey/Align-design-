// r2t0754: star_talk, BELIKE, "There’s free food? | Zodiacs *be like.*" (topic: zodiacs when there's free food;
// signs3kit social cut, music: lofi · D). Twelve signs in zodiac order, each one's most extreme free-food move.
// Ending: group ("Twelve signs. | *Zero leftovers.*" over an empty pizza box).
//   ♈ first in line before it was announced · ♉ one plate, three floors high · ♊ told forty people first · ♋ packed
//   six boxes, one for their mom · ♌ gave a thank-you speech to the pizza · ♍ read every ingredient · ♎ still hovering
//   · ♏ knew an hour early · ♐ already at stop four of the food tour · ♑ asked who's paying, then took two · ♒ brought
//   their own experimental soup · ♓ cried at the cake: someone thought of them
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }

// a little layered cake with candles
function cake(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-116, -46, 248, 170)
  x.fillStyle = INK; x.fillRect(-128, -60, 256, 176)
  x.fillStyle = '#ffd6e4'; x.fillRect(-120, -52, 240, 160)
  x.fillStyle = PINK; x.fillRect(-120, -52, 240, 30); x.fillRect(-120, 30, 240, 20)
  x.fillStyle = '#ffffff'; for (let i = 0; i < 6; i++) x.fillRect(-110 + i * 40, -22, 20, 14)
  for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(-58 + i * 50, -110, 16, 58); x.fillStyle = SKYB; x.fillRect(-54 + i * 50, -106, 8, 50); x.fillStyle = GOLD; x.fillRect(-56 + i * 50, -128 + Math.sin(t * 10 + i) * 3, 12, 18) }
  x.restore()
}
// an open, empty pizza box with a few crumbs
function emptyBox(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -40, 316, 130)
  x.fillStyle = INK; x.fillRect(-166, -150, 332, 250)
  x.fillStyle = '#d9a46a'; x.fillRect(-158, -142, 316, 100)
  x.fillStyle = '#e8bf86'; x.fillRect(-158, -36, 316, 128)
  x.fillStyle = '#c98f2a'; for (const [a, b] of [[-60, 20], [40, 50], [90, 10], [-110, 60]]) x.fillRect(a, b, 12, 10)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'First in line. | *Before it was announced.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.6, 0.9],
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 800, 860, 18 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 800, 660, 'QUEUE: #1 (ONLY)', pop01(t, P.t0 + 0.3, 0.3, 2.2), RED, 0.05, 34)
      bubble(x, 800, 1080, '“food’s here” ← 2 min later', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 28, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Took one plate. | *Three floors high.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const FOOD = ['PLATE', 'SANDWICH', 'PIZZA', 'COOKIE', 'SANDWICH', 'APPLE']
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.25))
      for (let i = 0; i < n; i++) bits(x, FOOD[i], 800 + Math.sin(i * 2) * 14, 1100 - i * 76, i ? 9 : 12)
      L(x, 800, 620, 'ENGINEERING', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.05, 32)
    } },
  { sign: 'gemini', cap: 'Told forty people. | *Before grabbing any.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(lt / 0.35))
      for (let i = 0; i < n; i++) bubble(x, 760 + (i % 2) * 70, 650 + i * 115, ['FREE FOOD!!', 'kitchen NOW', 'bring friends', 'wait is it gone'][i], 1, { size: 32, tail: i % 2 ? 'br' : 'bl', col: i % 2 ? '#ffe76a' : BONE })
    } },
  { sign: 'cancer', cap: 'Packed six boxes. | *One for their mom.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) bits(x, 'BOX', 730 + (i % 2) * 130, 1050 - Math.floor(i / 2) * 80, 11 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 800, 660, 'FOR MOM ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: 'leo', cap: 'Gave a speech | *thanking the pizza.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 820, 980, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      bubble(x, 800, 700, 'I’d like to | thank… you.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: '#ffd23a', tail: 'bl' })
      sparkles(x, t, 820, 980, P.t0 + 1.2, 7, 160, 0.4)
    } },
  { sign: 'virgo', cap: 'Read every | *single ingredient.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 380, head: 'INGREDIENTS', headBg: MINT, headInk: INK, lines: ['flour ✓', 'cheese ✓', 'tomato ✓', 'oregano ✓', '“love” ??'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.3) })
      L(x, 800, 1110, 'REVIEW: PENDING', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Couldn’t choose. | *Still hovering.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 700, 960, 10 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SANDWICH', 880, 960, 10 * pop01(t, P.t0 + 0.35, 0.3, 2))
      x.save(); x.fillStyle = PINK; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = pop01(t, P.t0 + 0.5, 0.3, 2) > 0.5 ? 1 : 0; x.fillText(Math.floor(t * 2) % 2 ? '←' : '→', 790, 960); x.restore()
      L(x, 800, 700, 'HOVER TIME: 20 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Knew about it | *an hour early.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1020, 'INTEL: CONFIRMED', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#c97bff', 0.04, 34)
      bubble(x, 800, 650, 'I have sources', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Grabbed a slice. | *Off to the next one.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 320, head: 'FOOD TOUR', headBg: '#ff9a4a', headInk: INK, lines: ['✓ kitchen', '✓ floor 3', '✓ lobby', '→ floor 9'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
      bits(x, 'PIZZA', 650, 1100, 9 * pop01(t, P.t0 + 1.2, 0.3, 2))
    } },
  { sign: 'capricorn', cap: 'Asked who’s paying. | *Then took two.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 690, 'who’s paying?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bits(x, 'SANDWICH', 740, 940, 10 * pop01(t, P.t0 + 1.0, 0.3, 2)); bits(x, 'SANDWICH', 870, 930, 10 * pop01(t, P.t0 + 1.2, 0.3, 2))
      L(x, 800, 1110, 'LUNCH BUDGET: SAVED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Brought their own. | *Experimental soup.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 920, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.save(); x.fillStyle = '#7dffb0'; for (let i = 0; i < 4; i++) { const ph = ((t * 0.8 + i / 4) % 1); x.globalAlpha = Math.sin(Math.PI * ph); x.beginPath(); x.arc(730 + i * 45, 860 - ph * 130, 12, 0, 7); x.fill() } x.restore()
      L(x, 800, 660, 'FLAVOUR: UNKNOWN', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#6fc3ff', -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried at the cake. | *Someone thought of them.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cake(x, t, 800, 920, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 660, 'IT’S NOT EVEN MY BIRTHDAY', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#bfe6ff', 0.04, 24)
      hearts(x, t, 800, 820, P.t0 + 1.2, { n: 4, life: 1.6, spread: 180, cell: 6, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0754', key: 'D', accent: ACC, ending: 'group',
  title: 'There’s free food? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *Zero leftovers.*',
    moods: ['sparkle', 'heart', 'wide', 'happy', 'wink', 'squint', 'wide', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'],
    draw(x, t, lt) {
      emptyBox(x, 540, 720, pop01(t, t - lt + 1.6, 0.35, 2))
      if (lt > 2.2) { const k = pop01(t, t - lt + 2.2, 0.3, 2.4); x.save(); x.translate(540, 660); x.rotate(-0.05); x.scale(k, k); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.fillText('ALL GONE', 0, 0); x.restore() }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
