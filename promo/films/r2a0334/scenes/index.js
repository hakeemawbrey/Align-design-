// r2a0334: star_advice, ADVICE ROLL CALL (twelve signs), "Each sign’s | best friend sign." (~54 s vertical, signs3kit, lofi · E)
// The twelve signs in zodiac order, each beside its best-friend sign with one warm, specific line and one light gag.
// Ending: group.
//   0.0–3.6    "Each sign’s | *best friend sign.*"
//   3.6–49.2   Aries + Sagittarius: yes to every plan · Taurus + Cancer: snacks and deep talks · Gemini + Aquarius: talk till
//              3 a.m. · Cancer + Pisces: cry together, laugh after · Leo + Libra: hype each other up · Virgo + Capricorn:
//              matching planners · Libra + Gemini: never a quiet minute · Scorpio + Cancer: secrets kept forever
//              · Sagittarius + Aries: say yes, figure it out · Capricorn + Taurus: loyal to the end · Aquarius + Gemini:
//              weird ideas welcome · Pisces + Scorpio: a safe place for tears
//  49.2        group ending: "Find your people. | *Keep them close.*" with a FRIENDSHIP: ALIGNED chip.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2'

// ── props
const MUG = [
  '.WWWWW...',
  'WBBBBBW..',
  'WBBBBBWWW',
  'WBBBBBW.W',
  'WBBBBBWWW',
  '.WWWWW...',
]
const MOON = ['..YYYY.', '.YYY...', 'YYY....', 'YYY....', 'YYY....', '.YYY...', '..YYYY.']
const PLANNER = [
  'KKKKKKKK',
  'KPPPPPPK',
  'KPWWWWPK',
  'KPPPPPPK',
  'KPWWWPPK',
  'KPPPPPPK',
  'KPWWWWPK',
  'KKKKKKKK',
]
const LOCK = [
  '..KKKKK..',
  '.K.....K.',
  '.K.....K.',
  'GGGGGGGGG',
  'GGGHHHGGG',
  'GGHHHHHGG',
  'GGGHHHGGG',
  'GGGGHGGGG',
  'GGGGGGGGG',
]
const LOCK_C = { K: '#c9c9d8', G: GOLD, H: '#ff4f86' }
const BULB = [
  '..YYYYY..',
  '.YYyyyYY.',
  'YYyYYYyYY',
  'YYYYYYYYY',
  'YYYYYYYYY',
  '.YYYYYYY.',
  '..YYYYY..',
  '...GGG...',
  '...GGG...',
  '....G....',
]
const BULB_C = { Y: '#ffe066', y: '#fff6c0', G: '#9aa0c0' }
const TISSUE = [
  '...W.W...',
  '..WWWWW..',
  'BBBBBBBBB',
  'BbbbbbbbB',
  'BbHbbbHbB',
  'BbbbbbbbB',
  'BBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: '#6fc3ff', b: '#bfe7ff', H: PINK }
const BACKPACK = [
  '..KKKKK..',
  '.K.....K.',
  'OOOOOOOOO',
  'OoOOOOOoO',
  'OoOYYYOoO',
  'OoOOOOOoO',
  'OoOOOOOoO',
  'OOOOOOOOO',
]
const BACKPACK_C = { K: INK, O: '#ff8a4a', o: '#d8642a', Y: GOLD }

// the friend: a second star on the right of the card
function friend(x, t, P, id, lt, { mood = 'happy', tears = 0, y = 960, s = 240, hop = 1.3 } = {}) {
  const k = pop01(t, P.t0 + 0.35, 0.4, 2)
  if (k <= 0.01) return null
  return signChar(x, t, id, 790, y, s * k, { mood: typeof mood === 'function' ? mood(lt) : mood, look: [-1, 0], seed: 40 + P.i, glyph: true, tears, hops: [P.t0 + hop] })
}
// "BESTIE: <SIGN>" tag above the friend
function tag(x, t, P, id) {
  label(x, 790, 690, `BESTIE: ${id.toUpperCase()}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
}

const S = { star: { x: -170 }, look: [1, 0] }
const CAMEOS = [
  { sign: 'aries', cap: 'Sagittarius. | *Yes to every plan.*', mood: 'sparkle', ...S, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, P, 'sagittarius', lt, { mood: 'sparkle' })
      tag(x, t, P, 'sagittarius')
      drawBits(x, BACKPACK, BACKPACK_C, 400, 1080, 10 * pop01(t, P.t0 + 1.1, 0.3, 2))
      drawBits(x, BACKPACK, BACKPACK_C, 900, 1110, 10 * pop01(t, P.t0 + 1.25, 0.3, 2))
      label(x, 650, 1170, 'ALREADY PACKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.03 })
    } },
  { sign: 'taurus', cap: 'Cancer. | *Snacks and deep talks.*', mood: 'heart', ...S,
    front(x, t, lt, P) {
      friend(x, t, P, 'cancer', lt, { mood: 'heart' })
      tag(x, t, P, 'cancer')
      const k = pop01(t, P.t0 + 1.1, 0.3, 2)
      drawBits(x, MUG, { W: PAPER, B: '#c98f5a' }, 520, 1100, 12 * k)
      drawBits(x, MUG, { W: PAPER, B: '#c98f5a' }, 680, 1110, 12 * k, { sx: -1 })
      hearts(x, t, 600, 1060, P.t0 + 1.3, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Aquarius. | *Talk till 3 a.m.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', ...S,
    front(x, t, lt, P) {
      friend(x, t, P, 'aquarius', lt, { mood: l => Math.floor(l * 3 + 1) % 2 ? 'wink' : 'sparkle' })
      tag(x, t, P, 'aquarius')
      drawBits(x, MOON, { Y: GOLD }, 590, 650, 11 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 600, 1150, '3:00 AM. STILL TALKING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Pisces. | *Cry together, laugh after.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', tears: lt => lt > 1.6 ? 0 : 2, ...S,
    front(x, t, lt, P) {
      friend(x, t, P, 'pisces', lt, { mood: l => l > 1.6 ? 'happy' : 'wide', tears: lt > 1.6 ? 1 : 3 })
      tag(x, t, P, 'pisces')
      label(x, 640, 1150, lt > 1.6 ? 'NOW LAUGHING' : 'CRYING TOGETHER', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: lt > 1.6 ? GOLD : SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Libra. | *Hype each other up.*', mood: 'sparkle', ...S, hops: [1.0, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, P, 'libra', lt, { mood: 'sparkle', hop: 1.5 })
      tag(x, t, P, 'libra')
      bubble(x, 520, 640, 'you look AMAZING', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 760, 820, 'no, YOU do', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: PINK, tail: 'br' })
      sparkles(x, t, 600, 900, P.t0 + 1.5, 7, 260, 0.2)
    } },
  { sign: 'virgo', cap: 'Capricorn. | *Matching planners.*', mood: 'happy', ...S,
    front(x, t, lt, P) {
      friend(x, t, P, 'capricorn', lt, { mood: 'happy' })
      tag(x, t, P, 'capricorn')
      const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      drawBits(x, PLANNER, { K: INK, P: '#7dc7ff', W: PAPER }, 520, 1100, 12 * k, { rot: -0.08 })
      drawBits(x, PLANNER, { K: INK, P: '#7dc7ff', W: PAPER }, 680, 1100, 12 * k, { rot: 0.08 })
      label(x, 600, 1180, 'SYNCED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Gemini. | *Never a quiet minute.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', ...S,
    front(x, t, lt, P) {
      friend(x, t, P, 'gemini', lt, { mood: 'sparkle' })
      tag(x, t, P, 'gemini')
      bubble(x, 600, 1130, 'and THEN—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 800, 'no WAY', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
    } },
  { sign: 'scorpio', cap: 'Cancer. | *Secrets kept forever.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', ...S,
    front(x, t, lt, P) {
      friend(x, t, P, 'cancer', lt, { mood: 'wink' })
      tag(x, t, P, 'cancer')
      drawBits(x, LOCK, LOCK_C, 610, 1090, 11 * pop01(t, P.t0 + 1.1, 0.3, 2.2))
      label(x, 780, 1170, 'VAULT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Aries. | *Say yes, figure it out.*', mood: 'sparkle', ...S, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      friend(x, t, P, 'aries', lt, { mood: 'sparkle', hop: 0.9 })
      tag(x, t, P, 'aries')
      label(x, 600, 1150, 'PLAN: WHO KNOWS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#ff8a4a', rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Taurus. | *Loyal to the end.*', mood: 'happy', ...S,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, P, 'taurus', lt, { mood: 'heart' })
      tag(x, t, P, 'taurus')
      label(x, 600, 1150, 'FRIENDS: LIFETIME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
      hearts(x, t, 600, 1040, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 5 })
    } },
  { sign: 'aquarius', cap: 'Gemini. | *Weird ideas welcome.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', ...S,
    front(x, t, lt, P) {
      friend(x, t, P, 'gemini', lt, { mood: 'sparkle' })
      tag(x, t, P, 'gemini')
      drawBits(x, BULB, BULB_C, 590, 640, 10 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      sparkles(x, t, 590, 640, P.t0 + 1.05, 6, 90, 0.3)
      label(x, 600, 1150, 'IDEA #212: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Scorpio. | *Safe place for tears.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt > 1.4 ? 2 : 3, ...S,
    front(x, t, lt, P) {
      friend(x, t, P, 'scorpio', lt, { mood: 'happy' })
      tag(x, t, P, 'scorpio')
      drawBits(x, TISSUE, TISSUE_C, 620, 1080, 12 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      bubble(x, 760, 820, 'i’m here.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
    } },
]

const F = makeFilm({
  id: 'r2a0334', key: 'E', accent: PINK, ending: 'group',
  title: 'Each sign’s | *best friend sign.*',
  cameos: CAMEOS,
  group: {
    cap: 'Find your people. | *Keep them close.*',
    moods: ['heart', 'happy', 'sparkle', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'happy', 'sparkle', 'heart'],
    draw(x, t, lt) { label(x, 540, 760, 'FRIENDSHIP: ALIGNED', pop01(t, t - lt + 1.4, 0.35, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
