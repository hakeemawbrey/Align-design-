// r2a0599: star_advice, ADVICE ROLLCALL, "How each sign | *spends a day off.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, one warm, specific day-off line each:
//   ♈ a run, then a nap · ♉ long brunch, no alarm · ♊ three cafés, one book · ♋ cooking for friends · ♌ face mask, candles
//   · ♍ alphabetised the spice rack · ♎ brunch with a match · ♏ phone off, mystery novel · ♐ a random train
//   · ♑ made a rest plan · ♒ found their sign in the stars · ♓ a happy cry at a movie
// Ending: callback. "Capricorn’s rest plan? | *Step one: nap.*" (the rest plan comes back, ticked).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -160 }

const CAMEOS = [
  { sign: 'aries', cap: 'A sunrise run. | Then a *proud* nap.', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.7, 1.0],
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.1, '5K: DONE ✓', 'NAP: STARTED', { size: 42, fromBg: GOLD, toBg: LAV })
      if (lt > 1.3) zzz(x, t, 450, 700)
      L(x, 800, 1060, 'PACE: CHILL (FOR ARIES)', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'Long brunch. | *No alarm.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 820, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5) steam(x, t, 820, 850)
      L(x, 800, 1090, 'ALARM: OFF ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: 'gemini', cap: 'Three cafés. | *One* great book.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bits(x, 'MUG', 740, 900, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BOOK', 900, 920, 13 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.08 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 2.99)
      L(x, 800, 1090, `CAFÉ #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), SKYB, 0.04, 40)
    } },
  { sign: 'cancer', cap: 'Cooking for friends. | Hosting *is* rest.', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 820, 890, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5) steam(x, t, 820, 830)
      L(x, 800, 1090, 'TABLE FOR SIX ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Face mask. Candles. | *Glowing.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'CANDLE', 760, 900, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CANDLE', 900, 920, 12 * pop01(t, P.t0 + 0.35, 0.3, 2))
      sparkles(x, t, F.x, F.cy, P.t0 + 1.0, 8, 170, 0.3)
      L(x, 800, 1090, 'SELF-CARE: ROYAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Alphabetised the spices. | *So* relaxing.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'SPICES A–Z', headBg: MINT, headInk: INK, align: 'left', size: 32, lines: ['anise', 'basil', 'cumin', 'dill…'], progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1090, 'BEST DAY EVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Brunch with a match. | *Lovely* day.', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MATCH ♎︎', headCol: PINK, size: 22, lines: [['brunch sunday?', BONE, pop01(t, P.t0 + 0.5, 0.2, 2.2)], ['yes ♡', PINK, pop01(t, P.t0 + 1.0, 0.2, 2.2), true]] })
      hearts(x, t, 470, 760, P.t0 + 1.1, { n: 5, life: 1.5, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Phone off. | *Mystery novel.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 820, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      L(x, 800, 1080, 'DO NOT DISTURB', pop01(t, P.t0 + 1.0, 0.3, 2.4), RED, 0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Got on a random train. | *Loved it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      bits(x, 'MAP', 820, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'DESTINATION: ?', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: 'capricorn', cap: 'Tried to rest. | Made *a rest plan.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 320, head: 'REST PLAN', headBg: STEEL, headInk: INK, align: 'left', size: 30, lines: ['9:00 relax', '9:15 relax more', '9:30 review relax', '[ ] nap'], progress: clamp((lt - 0.3) / 1.0) })
    } },
  { sign: 'aquarius', cap: 'Stargazing. | Found *their sign.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const pts = [[700, 740], [780, 700], [860, 760], [940, 720], [900, 860]]
      const n = Math.floor(clamp((lt - 0.3) / 1.0) * 5)
      x.save(); x.globalAlpha = k; x.strokeStyle = BONE; x.lineWidth = 4
      for (let i = 1; i < n; i++) { x.beginPath(); x.moveTo(...pts[i - 1]); x.lineTo(...pts[i]); x.stroke() }
      pts.forEach(([px, py]) => { x.fillStyle = GOLD; x.fillRect(px - 9, py - 9, 18, 18) })
      x.restore()
      L(x, 800, 1060, 'IT’S ME! ♒︎', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, 0.04, 40)
    } },
  { sign: 'pisces', cap: 'A movie. | A *happy* cry.', mood: 'heart', look: [1, 0], tears: 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 820, 840, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'TISSUE', 680, 1000, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 830, 1080, 'PERFECT DAY ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0599', key: 'E', accent: ACC, ending: 'callback',
  title: 'How each sign | *spends a day off.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone rests | *their own way.*' },
  last: {
    text: 'Capricorn’s rest plan? | *Step one: nap.*',
    draw(x, t, lt) {
      const t0 = t - lt
      sheet(x, 720, 1060, pop01(t, t0 + 0.4, 0.35, 2), { w: 360, h: 300, head: 'REST PLAN', headBg: STEEL, headInk: INK, size: 40, lines: [lt > 1.2 ? '[x] nap ♡' : '[ ] nap'] })
      const k = pop01(t, t0 + 0.6, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 330, 1080, 320 * k, { mood: lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], seed: 87, glyph: false })
      if (lt > 1.3) zzz(x, t, 380, 900, { size: 56 })
      if (lt > 1.2) sparkles(x, t, 720, 1060, t0 + 1.25, 7, 170, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
