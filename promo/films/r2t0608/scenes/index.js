// r2t0608: star_talk, SOLO (taurus), "Tauruses on a trip | *be like.*" (signs3kit social cut, music: lofi · G).
// Nine trip moments, each the most extreme Taurus version. Ending: callback.
//   one outfit, nine snacks · brought their own pillow, and the mattress · the itinerary is restaurants
//   · 5am sunrise hike? absolutely not · found a hammock, lives there now · one massage, then four more
//   · the souvenir is an armchair · a match asked "where to?", Taurus sent a bakery · checkout: never
//   group "Slow trip. | *Snacks first.*"
//   callback "The hammock? | *Came home too.*" (card 5's hammock, Taurus asleep in it, in the living room)
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, zzz, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd068', S = 'taurus', ST = { x: -190 }
const HAMMOCK = ['K..............K', '.K............K.', '..WWWWWWWWWWWW..', '..WRWRWRWRWRWR..', '...WWWWWWWWWW...', '....RWRWRWRW....']
const HC = { K: WOOD, W: CREAM, R: '#ff9a4a' }
const MATT = ['WWWWWWWWWWWWWW', 'WBWWBWWBWWBWWW', 'WWWWWWWWWWWWWW', 'WWBWWBWWBWWBWW', 'WWWWWWWWWWWWWW']
const ALARM = ['K.......K', '.KKKKKKK.', 'KRRRRRRRK', 'KRWWWWWRK', 'KRWWKWWRK', 'KRWWKKWRK', 'KRWWWWWRK', 'KRRRRRRRK', '.K.....K.']

const CAMEOS = [
  { sign: S, cap: 'Packed one outfit. | *Nine snacks.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.2))
      for (let i = 0; i < n; i++) bits(x, i % 2 ? 'APPLE' : 'COOKIE', 700 + i * 50, 770 - (i % 2) * 30, 11 * pop01(t, P.t0 + 0.4 + i * 0.2, 0.25, 2), { rot: (i - 2) * 0.1 })
      L(x, 800, 1100, 'CLOTHES: OPTIONAL', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Brought their own pillow. | And *the mattress.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.2) bits(x, 'PILLOW', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else drawBits(x, MATT, { W: CREAM, B: LAV }, 800 + 30 * (1 - pop01(t, P.t0 + 1.2, 0.35, 2)), 860, 24 * pop01(t, P.t0 + 1.2, 0.35, 2), { rot: -0.05 })
      L(x, 800, 1060, lt < 1.2 ? 'CARRY-ON: PILLOW' : 'CARRY-ON: MATTRESS', 1, lt < 1.2 ? CREAM : PINK, 0.04, 30)
    } },
  { sign: S, cap: 'The itinerary? | *Just restaurants.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 360, head: 'DAY 1', headBg: '#5fd068', headInk: INK, lines: ['8am breakfast', '11am brunch', '1pm lunch', '3pm lunch 2'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
      L(x, 800, 1100, 'SIGHTSEEING: TBD', pop01(t, P.t0 + 1.7, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: S, cap: 'Sunrise hike at 5am? | *Absolutely not.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ALARM, { K: INK, R: RED, W: BONE }, 800 + (lt < 1.0 ? 4 * Math.sin(t * 60) : 0), 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1050, lt < 1.0 ? 'ALARM: 5:00' : 'ALARM: SNOOZED (x9)', pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.0 ? RED : LAV, 0.04, 30)
      zzz(x, t, 470, 760, { alpha: clamp((lt - 0.8) * 2) })
    } },
  { sign: S, cap: 'Found a hammock. | *Lives there now.*', mood: 'sleepy', star: { x: 0, y: -70, s: 260 },
    back(x, t, lt, P) { drawBits(x, HAMMOCK, HC, 540, 900, 30 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.03 * Math.sin(t * 1.6) }) },
    front(x, t, lt, P) {
      L(x, 540, 1080, 'DAY 3: STILL HERE', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 32)
      zzz(x, t, 680, 680, { alpha: clamp((lt - 0.5) * 2) })
    } },
  { sign: S, cap: 'Booked one massage. | Then *four more.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 760, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CANDLE', 860, 840, 13 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 800, 1040, `SPA VISITS: ${Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.8) / 0.25))}`, pop01(t, P.t0 + 0.6, 0.3, 2), PINK, -0.04, 34)
      hearts(x, t, 470, 880, P.t0 + 1.2, { n: 3, life: 1.4, spread: 120, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'The souvenir? | *A whole armchair.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'COMFIEST ONE', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 30)
      L(x, 800, 1060, 'SHIPPING: YES', pop01(t, P.t0 + 1.5, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: S, cap: 'Match asked “where to?” | Taurus *sent a bakery.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH: VIRGO', headCol: GOLD, lines: [['where to?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), false], ['the bakery', '#5fd068', pop01(t, P.t0 + 1.0, 0.25, 2), true], ['all 3 of them', '#5fd068', pop01(t, P.t0 + 1.5, 0.25, 2), true]], size: 22 })
    } },
  { sign: S, cap: 'Trip’s over? | *Extended it.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'KEY', 800, 780, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 980, lt, 1.0, 'CHECKOUT: TODAY', 'CHECKOUT: NEVER', { size: 32, fromBg: CREAM, toBg: MINT })
    } },
]

const F = makeFilm({
  id: 'r2t0608', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Tauruses on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Slow trip. | *Snacks first.*', mood: 'heart' },
  last: {
    text: 'The hammock? | *Came home too.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      drawBits(x, HAMMOCK, HC, 540, 1220, 32 * k, { rot: 0.03 * Math.sin(t * 1.6) })
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1090, 260 * k, { mood: 'sleepy', seed: 9, glyph: false })
      L(x, 540, 1420, 'LIVING ROOM: TAKEN', pop01(t, t - lt + 1.4, 0.3, 2.2), GOLD, -0.04, 32)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
