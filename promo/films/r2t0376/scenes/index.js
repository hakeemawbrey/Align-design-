// r2t0376: star_talk BELIKE, "“Let’s hang out!” | Zodiacs *be like:*" (~57 s vertical, signs3kit social cut, lofi · C)
// Twelve signs in zodiac order react to "we should hang out", each the most extreme version of itself:
//   ♈ already at your door · ♉ sure, at their couch · ♊ invited eleven more people · ♋ started a friendship scrapbook
//   · ♌ turned it into a Leo-themed party · ♍ sent a colour-coded itinerary · ♎ offered forty dates, picked none
//   · ♏ "we should" meaning what? · ♐ said yes from a mountaintop · ♑ free in 2027 · ♒ suggested the moon
//   · ♓ cried, nobody's ever asked
//  49.2   "Same plan. | *Twelve versions.*"  group photo
//  52.4   LESSON UNLOCKED: "Want to see them? | *Name a day.*"  PLANS: MADE
//  58.3   "Scorpio is still asking | *what you meant.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb3c7'
const DOOR = [
  'KKKKKKKKK',
  'KBBBBBBBK',
  'KBbbbbbBK',
  'KBbBBBbBK',
  'KBbbbbbBK',
  'KBBBBBBBK',
  'KBBBBBGBK',
  'KBbbbbbBK',
  'KBbBBBbBK',
  'KBbbbbbBK',
  'KBBBBBBBK',
  'KBBBBBBBK',
]
const DOOR_C = { K: '#5b2e1a', B: '#c98f5a', b: '#a8743f', G: GOLD }
const COUCH = [
  '.PPPPPPPPPP.',
  'PPPPPPPPPPPP',
  'PpPPPPPPPPpP',
  'PpppppppppPP',
  'PPPPPPPPPPPP',
  'K..........K',
]
const COUCH_C = { P: '#c97bff', p: '#a35ee0', K: INK }
const BOOK = [
  'RRRRRRRRRR',
  'RWWWWWWWWR',
  'RWWHHWHHWR',
  'RWHHHHHHWR',
  'RWWHHHHWWR',
  'RWWWHHWWWR',
  'RWWWWWWWWR',
  'RRRRRRRRRR',
]
const BOOK_C = { R: '#e23d4e', W: '#fff4e2', H: PINK }
const MOUNTAIN = [
  '.....F......',
  '.....FFF....',
  '.....F......',
  '.....S......',
  '....SSS.....',
  '...SSGGS....',
  '..SGGGGGS...',
  '.SGGGGGGGS..',
  'GGGGGGGGGGGG',
]
const MOUNTAIN_C = { F: '#ff6b5a', S: '#fff4e2', G: '#6b62a8' }
const MOON = [
  '...YYYY...',
  '.YYYYYYYY.',
  'YYYyYYYYYY',
  'YYYYYYyYYY',
  'YYYYYYYYYY',
  'YyYYYYYYYY',
  'YYYYYyYYYY',
  '.YYYYYYYY.',
  '...YYYY...',
]
const MOON_C = { Y: '#fff1b0', y: '#d8c98a' }
const GLASS = [
  '..KKKK..',
  '.KWWWWK.',
  'KWSWWWWK',
  'KWWWWWWK',
  'KWWWWWWK',
  '.KWWWWK.',
  '..KKKKKK',
  '......KK',
  '.......K',
]
const GLASS_C = { K: '#2a2350', W: '#c4f0ff', S: '#fff' }

// a clipboard whose itinerary lines tick off one by one
function clipboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -176, 272, 352)
  x.fillStyle = '#a8743f'; x.fillRect(-128, -168, 256, 336)
  x.fillStyle = '#fff4e2'; x.fillRect(-112, -140, 224, 292)
  x.fillStyle = '#9aa5c4'; x.fillRect(-46, -184, 92, 34)
  const COLS = ['#ff6b5a', GOLD, MINT, SKYB, LAV]
  const ROWS = ['6:00 ARRIVE', '6:07 SMALL TALK', '6:30 SNACKS', '7:15 LAUGH', '8:00 GO HOME']
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  ROWS.forEach((r, i) => {
    const y = -108 + i * 54
    x.fillStyle = COLS[i]; x.fillRect(-100, y - 16, 14, 32)
    x.fillStyle = INK; x.fillText(r, -78, y)
    if (lt > 0.5 + i * 0.28) { x.fillStyle = '#2e9e5b'; x.font = `800 30px ${INTER}`; x.fillText('✓', 76, y); x.font = `700 22px ${MONO}` }
  })
  x.restore()
}

const ST = { x: -170 }
const DATES = ['FRI?', 'SAT?', 'SUN?', 'TUES?', 'FRI?? NO—']
const CAMEOS = [
  { sign: 'aries', cap: 'Already at | *your door.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 610, 'KNOCK KNOCK', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05 })
      label(x, 790, 1110, 'ETA: ALREADY HERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#ff6b5a', color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Sure. | At *my* couch.', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, COUCH, COUCH_C, 790, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'DRESS CODE: BLANKET', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Invited | *eleven more people.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 2 + Math.floor(clamp((lt - 0.3) / 1.4) * 11)
      label(x, 790, 820, `GUESTS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'the more the merrier!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: '#ffe36a', tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Started a | *friendship scrapbook.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1080, 'VOL. 1 OF MANY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Made it a party. | *Theme: Leo.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 780, '✦ LEO FEST ✦', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 50, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 780, P.t0 + 0.6, 8, 190, 0.4)
      bubble(x, 790, 1040, 'you’re welcome', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Sent a | *colour-coded* itinerary.', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
    } },
  { sign: 'libra', cap: 'Offered forty dates. | *Picked none.*', mood: lt => lt > 1.7 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 820, DATES[Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.38))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, tail: 'bl' })
      label(x, 790, 1060, 'STILL DECIDING', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: '#ff9ccf', rot: 0.04 })
    } },
  { sign: 'scorpio', cap: '“We should.” | *Meaning what?*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'we should | hang out!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      drawBits(x, GLASS, GLASS_C, 800 + Math.sin(lt * 4) * 30, 950, 26 * k, { rot: -0.2 })
      label(x, 790, 1130, 'ANALYSING…', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Said yes. | From *a mountaintop.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, MOUNTAIN, MOUNTAIN_C, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'YES!! back in may', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Checked the calendar. | Free in *2027.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 760, 'NEXT OPENING:', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 880, 'MARCH 2027', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 56, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'pencilled in.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Suggested | *the moon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOON, MOON_C, 800, 820, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1080, 'bring a helmet', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried. Nobody’s | *ever* asked before.', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 1110, 'BEST DAY EVER', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: PINK, rot: 0.04 })
      hearts(x, t, 790, 960, P.t0 + 0.6, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0376', key: 'C', accent: ACC, ending: 'lesson',
  title: '“Let’s hang out!” | Zodiacs *be like:*',
  cameos: CAMEOS,
  group: { cap: 'Same plan. | *Twelve versions.*' },
  lesson: { text: 'Want to see them? | *Name a day.*', chip: 'PLANS: MADE' },
  last: {
    text: 'Scorpio is still asking | *what you meant.*',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
