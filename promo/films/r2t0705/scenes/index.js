// r2t0705: star_talk, SOLO (aquarius), "Aquarians on their | *birthday be like.*" (signs3kit social cut, music:
// lofi · F). One sign the whole way: nine birthday moments, each the most extreme Aquarius version. Ending: callback
// (the gift they turned into a lamp, still glowing).
//   "age is a construct" (no candles) · party theme: bring your weirdest fact · opened your gift, made it a lamp · cake?
//   ordered a pie · wants zero fuss, counts who remembered · birthday wish: world peace and a nap · argued with their
//   birthday chart · invited everyone they've met, forty strangers came · left their own party to stargaze
//   group "Weird, wonderful, | *one year older.*" · last "Your gift? | *Still a lamp.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, gift, chart, confetti, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fe3ff', S = 'aquarius', ST = { x: -180 }
const CAKE = ['....Y.Y.Y....', '....W.W.W....', '.PPPPPPPPPPP.', 'PCPCPCPCPCPCP', 'BBBBBBBBBBBBB', 'BBBBBBBBBBBBB', 'PPPPPPPPPPPPP', 'BBBBBBBBBBBBB', 'BBBBBBBBBBBBB']
const CAKE_C = { Y: GOLD, W: BONE, P: PINK, C: CREAM, B: '#c98f6a' }
const PIE = ['...CCCCCCC...', '.CCKCCKCCKCC.', 'CCCCCCCCCCCCC', 'CKCCCKCCCKCCC', 'RRRRRRRRRRRRR', '.RRRRRRRRRRR.', '..RRRRRRRRR..']
const PIE_C = { C: '#e8b36a', K: '#a8692e', R: '#8a4a2e' }
/** the gift-lamp: a lamp with a little bow still on it, glowing */
function giftLamp(x, t, cx, cy, cell, k, glow = 1) {
  if (k <= 0.01) return
  if (glow > 0.01) { x.save(); x.globalAlpha = 0.35 * glow * (0.85 + 0.15 * Math.sin(t * 3)); const g = x.createRadialGradient(cx, cy - cell * 5, 10, cx, cy - cell * 5, cell * 18); g.addColorStop(0, '#fff1b0'); g.addColorStop(1, 'rgba(255,241,176,0)'); x.fillStyle = g; x.fillRect(cx - cell * 20, cy - cell * 24, cell * 40, cell * 40); x.restore() }
  bits(x, 'LAMP', cx, cy, cell * k)
  drawBits(x, ['P...P', 'PP.PP', '.PPP.', 'PP.PP'], { P: PINK }, cx, cy + cell * 3.2 * k, cell * 0.6 * k)
}

const CAMEOS = [
  { sign: S, cap: 'Birthday? | *“Age is a construct.”*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE.map((r, j) => j < 2 ? r.replace(/[YW]/g, '.') : r), CAKE_C, 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'CANDLES: 0', pop01(t, P.t0 + 0.8, 0.3, 2), STEEL, -0.04, 36)
      L(x, 800, 1100, '(BY CHOICE)', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Party theme: | *“Your weirdest fact.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, head: 'YOU’RE INVITED', headBg: SKYB, headInk: INK, lines: ['theme:', 'your weirdest', 'fact', 'dress: optional'], size: 30, progress: prog(lt, 0.3, 1.3), rot: 0.04 })
    } },
  { sign: S, cap: 'Opened your gift. | *Turned it into a lamp.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const sw = lt > 1.1
      if (!sw) gift(x, 800, 960, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 220, h: 160, col: LAV, rib: PINK, open: prog(lt, 0.6, 1.0) })
      else giftLamp(x, t, 800, 920, 24, pop01(t, P.t0 + 1.1 * 1.29, 0.35, 2))
      L(x, 800, 660, sw ? 'NOW A LAMP ✦' : 'A NICE SCARF', pop01(t, P.t0 + 0.3, 0.3, 2), sw ? GOLD : BONE, -0.04, 34)
      if (sw) sparkles(x, t, 800, 860, P.t0 + 1.1 * 1.29, 7, 180, 0.3)
    } },
  { sign: S, cap: 'Cake? Too normal. | *Ordered a pie.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PIE, PIE_C, 800, 920, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 680, 'NOT A CAKE', pop01(t, P.t0 + 0.9, 0.3, 2.2), RED, -0.05, 38)
      L(x, 800, 1100, 'REBELLIOUS ✦', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Wants zero fuss. | *Counts who remembered.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.35) + 1)
      phone(x, t, 800, 860, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: `WISHES: ${n * 9}`, headCol: SKYB, lines: [['hbd!!', BONE, n > 0 ? 1 : 0], ['happy bday', PINK, n > 1 ? 1 : 0], ['cake?? :)', GOLD, n > 2 ? 1 : 0]], size: 28 })
      L(x, 800, 1140, 'NOT COUNTING (IS)', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Birthday wish? | *World peace. And a nap.*', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 800, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, 'world peace. | also a nap.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Their birthday chart? | *They argued with it.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 860, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 800, 640, 'respectfully, | no', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      L(x, 800, 1090, 'DEBATE: ROUND 3', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Invited everyone. | *Forty strangers came.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const ids = ['taurus', 'leo', 'virgo', 'libra', 'capricorn', 'gemini', 'scorpio', 'aries']
      ids.forEach((id, i) => friend(x, t, id, 650 + (i % 4) * 100, 810 + Math.floor(i / 4) * 140, 110, pop01(t, P.t0 + 0.3 + i * 0.12, 0.3, 2), { mood: i % 3 ? 'happy' : 'wide', look: [-1, 0] }))
      L(x, 800, 1110, 'GUESTS: 40 (WHO?)', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Left their own party | *to go stargazing.*', mood: 'heart', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 720, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 6; i++) { const a = pop01(t, P.t0 + 0.6 + i * 0.15, 0.3, 2); if (a > 0.01) label(x, 640 + (i * 97) % 300, 900 + (i * 53) % 160, '✦', a, { size: 40, bg: '#ffe76a', color: INK, rot: (i % 2 ? 0.1 : -0.1) }) }
      L(x, 800, 1130, 'BEST GIFT: SPACE', pop01(t, P.t0 + 1.6, 0.3, 2.2), SKYB, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0705', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Aquarians on their | *birthday be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weird, wonderful, | *one year older.*', mood: 'sparkle' },
  last: {
    text: 'Your gift? | *Still a lamp.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signChar(x, t, S, 380, 1120, 280 * pop01(t, t0 + 0.2, 0.45, 1.8), { mood: lt > 1.3 ? 'heart' : 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.35] })
      giftLamp(x, t, 760, 1100, 28, pop01(t, t0 + 0.6, 0.35, 2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
