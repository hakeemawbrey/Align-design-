// r2t0637: star_talk, BELIKE (twelve signs), "Long weekend? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · E).
// Each sign's most extreme three-day weekend. Ending: callback.
//   ♈ three days of plans, done by Saturday noon · ♉ a match asked to hang, "can't. couch." (72 hours) · ♊ booked three
//   trips, same weekend · ♋ went home to mom's, brought four bags of laundry · ♌ turned it into Leo Fest · ♍ relaxed on a
//   schedule · ♎ compared the beaches' charts, it's Monday · ♏ vanished Friday, reappeared Tuesday · ♐ left for three
//   days, came back in June · ♑ long weekend, longer to-do list · ♒ started a commune by Sunday · ♓ the weekend ended,
//   Pisces held a funeral
//   group "Three days off. | *Zero chill.*"
//   last "Libra picked a beach. | *For next year.*" (card 7, paid off: the map comes back with one pin)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, confetti, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dd18a', ST = { x: -180 }

// a map with a red pin dropping in
function pinMap(x, t, cx, cy, cell, k, pinAt) {
  if (k <= 0.01) return
  bits(x, 'MAP', cx, cy, cell * k)
  const p = pop01(t, pinAt, 0.3, 2.4)
  if (p > 0.01) { x.save(); x.translate(cx + cell * 1.5, cy - cell * 0.8); x.scale(p, p); x.fillStyle = INK; x.fillRect(-18, -78, 36, 36); x.fillRect(-5, -46, 10, 46); x.fillStyle = RED; x.fillRect(-13, -73, 26, 26); x.restore() }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Three days of plans. | Done *by Saturday noon.*', mood: lt => lt > 1.6 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      const done = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.25))
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 380, h: 420, head: 'THE WEEKEND', headBg: RED, lines: ['hike ✓', 'beach ✓', 'concert ✓', 'paddleboard ✓', 'skydive ✓'].map((l, i) => [i < done ? l : '…', INK]), size: 34, align: 'left' })
      L(x, 800, 1120, 'SAT · 12:00 · NOW?', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Match: “wanna hang?” | Taurus: *“couch.”*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 1050, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 800, 650, '✦ match: wanna hang?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'br' })
      bubble(x, 790, 850, 'can’t. couch.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Booked three trips. | *Same weekend.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const DEST = ['BEACH', 'SKI', 'CITY']
      DEST.forEach((d, i) => { const k = pop01(t, P.t0 + 0.25 + i * 0.35, 0.3, 2); bits(x, 'STUB', 800, 700 + i * 150, 22 * k, { rot: (i - 1) * 0.08 }); L(x, 800, 700 + i * 150, d, k, BONE, (i - 1) * 0.08, 28) })
      L(x, 800, 1150, 'ALL: SATURDAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Went home to mom’s. | Brought *laundry.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 820, 760, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 4; i++) bits(x, 'BAG', 680 + i * 110, 1060 - (i % 2) * 20, 13 * pop01(t, P.t0 + 0.6 + i * 0.2, 0.25, 2))
      L(x, 800, 590, 'BAGS: 4', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.05, 34)
    } },
  { sign: 'leo', cap: 'Three days off. | Called it *Leo Fest.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      L(x, 800, 720, '✦ LEO FEST ✦', pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.05, 48)
      L(x, 800, 860, 'DAY 3 OF 3', pop01(t, P.t0 + 0.8, 0.3, 2), PINK, 0.05, 34)
      bits(x, 'TROPHY', 800, 1050, 12 * pop01(t, P.t0 + 1.2, 0.3, 2))
      confetti(x, t, 800, 760, P.t0 + 0.4, { n: 20, spread: 260 })
    } },
  { sign: 'virgo', cap: 'Relaxed | *on a schedule.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 400, h: 440, head: 'SATURDAY', headBg: '#2fc79a', headInk: INK, lines: ['9:00 relax', '9:15 relax more', '9:30 review relaxing', '9:45 nap (12 min)'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
    } },
  { sign: 'libra', cap: 'Checked beach charts. | *It’s Monday.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      pinMap(x, t, 800, 850, 26, pop01(t, P.t0 + 0.2, 0.3, 2), 1e9)
      L(x, 800, 650, 'BEACH A ♡ BEACH B?', pop01(t, P.t0 + 0.6, 0.3, 2), PINK, -0.04, 30)
      L(x, 800, 1080, 'MON · 9 PM', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, 0.05, 36)
    } },
  { sign: 'scorpio', cap: 'Vanished Friday. | *Reappeared Tuesday.*', mood: 'squint', look: [1, 0], star: ST, hideStar: false,
    front(x, t, lt, P) {
      bits(x, 'DOORX', 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 640, 'GONE.', pop01(t, P.t0 + 0.5, 0.3, 2), '#c97bff', -0.05, 40)
      L(x, 800, 1130, 'WHERE? CLASSIFIED', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Left for three days. | Came back *in June.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 1010, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const p = clamp((lt - 0.4) / 1.3)
      bits(x, 'PLANE', lerp(680, 920, p), 740 - 70 * Math.sin(p * Math.PI), 22 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.25 })
      L(x, 800, 620, 'BACK: JUNE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.05, 36)
    } },
  { sign: 'capricorn', cap: 'Long weekend? | *Longer to-do list.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 1060, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 800, 770, pop01(t, P.t0 + 0.35, 0.3, 2), { w: 370, h: 360, head: 'TO DO', headBg: STEEL, headInk: INK, lines: ['taxes (early)', 'emails (all)', '5-year plan v9', '“rest” (later)'], size: 32, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
    } },
  { sign: 'aquarius', cap: 'Started a commune | *by Sunday.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TENT', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'gemini', 690, 1080, 110, pop01(t, P.t0 + 0.7, 0.3, 2), { mood: 'happy' })
      friend(x, t, 'leo', 910, 1080, 110, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'happy' })
      L(x, 800, 660, 'MEMBERS: 31', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#6fc3ff', -0.05, 34)
    } },
  { sign: 'pisces', cap: 'The weekend ended. | Pisces *held a funeral.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'CANDLE', 700 + i * 100, 1030, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 800, 780, 'RIP SATURDAY', pop01(t, P.t0 + 0.7, 0.3, 2), BONE, -0.04, 40)
      L(x, 800, 900, 'AND SUNDAY. AND MONDAY.', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, 0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2t0637', key: 'E', accent: ACC, ending: 'callback',
  title: 'Long weekend? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Three days off. | *Zero chill.*' },
  last: {
    text: 'Libra picked a beach. | *For next year.*',
    draw(x, t, lt) {
      const t0 = t - lt
      pinMap(x, t, 540, 1080, 46, pop01(t, t0 + 0.5, 0.4, 2), t0 + 1.2)
      L(x, 540, 1370, 'BOOKED: NEXT JULY', pop01(t, t0 + 1.6, 0.3, 2.2), PINK, -0.04, 38)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
