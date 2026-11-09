// trs2firstdate: THE SIGNS ON… a first date. (v2 calm cut, ~64 s vertical, music: lofi · D). Built on ../../signs2kit.js.
//   0–3.6      "The signs on | a *first date.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   the roll call, one stage card per sign (3.8 s each):
//              ♈ already planning date two · ♉ here for the breadbasket · ♊ ten topics in ten minutes · ♋ asked about
//              your grandma · ♌ picked the table with the best light · ♍ read the menu beforehand · ♎ still can't pick a
//              dish · ♏ a deep question before the bread · ♐ a story from three countries · ♑ reserved the table weeks
//              ahead · ♒ asked what you think about aliens · ♓ cried at the dessert
//  49.2        "Everyone said yes | to *date two.*"  The group photo.
//  52.4        LESSON UNLOCKED: "Be curious, | not *perfect.*"  DATE TWO: BOOKED
//  58.3        "See you at *date two.*"  Hearts rise.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, outK,
  GOLD, BONE, PINK, INK,
} from '../../signs2kit.js'

// ── props
const CAL = [
  'RRRRRRRRRR',
  'RWRRRRRRWR',
  'WWWWWWWWWW',
  'WGWGWGWGWW',
  'WWWWWWWWWW',
  'WGWGWHHWHH',
  'WWWWWHHHHH',
  'WGWGWWHHHW',
  'WWWWWWWHWW',
  'WWWWWWWWWW',
]
const CAL_C = { R: '#ff4f6d', W: '#fff4e2', G: '#c9c4d8', H: '#ff8fb1' }
const BREAD = [
  '..BBBBBB..',
  '.BbBBbBBB.',
  'BBBBBBBbBB',
  'BbBBBBBBBB',
  'WWWWWWWWWW',
  '.KWKWKWKW.',
  '..KKKKKK..',
]
const BREAD_C = { B: '#e0a458', b: '#f6d08a', W: '#c9b48a', K: '#8a6a3a' }
const LAMP = ['..YYYY..', '.YYYYYY.', 'YYYYYYYY', '...KK...', '...KK...', '...KK...', '..KKKK..']
const LAMP_C = { Y: '#ffe27a', K: '#6b62a8' }
const MENU = [
  'KKKKKKKK',
  'KWWWWWWK',
  'KWGGGWWK',
  'KWWWWWWK',
  'KWGGGGWK',
  'KWWWWWWK',
  'KWGGWWWK',
  'KWWWWWWK',
  'KWGGGWWK',
  'KWWWWWWK',
  'KKKKKKKK',
]
const MENU_C = { K: '#a0784a', W: '#f4e8cc', G: '#7c74f0' }
const TICK = ['....R', '...R.', 'R.R..', '.R...']
const SIGN = ['.KKKKKKKK.', 'KWWWWWWWWK', 'KWRRRRRRWK', 'KWWWWWWWWK', 'KKKKKKKKKK', '....KK....', '..KKKKKK..']
const SIGN_C = { K: '#8a6a3a', W: '#fff4e2', R: '#ff4f6d' }
const UFO = ['...GGG...', '..GSSSG..', 'MMMMMMMMM', 'MYMMYMMYM', '.MMMMMMM.', '..Y.Y.Y..']
const UFO_C = { G: '#bfe6ff', S: '#ffffff', M: '#9a94b8', Y: '#ffe27a' }
const CAKE = ['....R....', '...WWW...', '..WPPPW..', '.WWWWWWW.', 'PPPPPPPPP', 'WWWWWWWWW', 'BBBBBBBBB', '.KKKKKKK.']
const CAKE_C = { R: '#ff4f6d', W: '#fff4e2', P: '#ffb3c8', B: '#c9b48a', K: '#6b62a8' }
const GLOBE = ['..BBBB..', '.BGGBBB.', 'BGGGBBGB', 'BBGBBGGB', 'BBBBBGGB', 'BGBBBBBB', '.BGGBBB.', '..BBBB..']
const GLOBE_C = { B: '#5fb6ff', G: '#5fd38a' }

const CAMEOS = [
  { sign: 'aries', cap: 'Already planning | *date two.*', mood: 'sparkle', star: { x: 140 }, hops: [0.6, 1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, CAL, CAL_C, 300, 820, 22 * k, { rot: -0.08 })
      label(x, 300, 1000, 'FRIDAY?', pop01(t, P.t0 + 0.9, 0.3, 2), { bg: PINK, rot: -0.06 })
    } },
  { sign: 'taurus', cap: 'Here for | the *breadbasket.*', mood: 'heart', look: [1, 0], star: { x: -150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, BREAD, BREAD_C, 760, 980, 22 * k)
      sparkles(x, t, 760, 920, P.t0 + 0.5, 8, 140, 1, [GOLD, BONE, PINK])
    } },
  { sign: 'gemini', cap: 'Ten topics in | *ten minutes.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', star: { x: -120 },
    front(x, t, lt, P) {
      bubble(x, 700, 620, 'anyway, octopuses—', pop01(t, P.t0 + 0.4, 0.25, 2.2) * outK(t, [P.t0 + 1.25, P.t0 + 1.4]), { size: 34, tail: 'bl' })
      bubble(x, 700, 620, 'wait, back to tacos', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl', col: '#ffe27a' })
    } },
  { sign: 'cancer', cap: 'Asked about | *your grandma.*', mood: 'sparkle', star: { x: -120 },
    front(x, t, lt, P) {
      bubble(x, 720, 620, 'how is she doing?', pop01(t, P.t0 + 0.4, 0.28, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 760, 1000, P.t0 + 0.9, { n: 5, life: 2.2, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Picked the table with | *the best light.*', mood: lt => (Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle'), star: { x: 60 },
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = 0.22 * Math.min(1, k); x.fillStyle = '#ffe27a'
        x.beginPath(); x.moveTo(560, 640); x.lineTo(380, 1080); x.lineTo(740, 1080); x.closePath(); x.fill(); x.restore()
      }
      drawBits(x, LAMP, LAMP_C, 560, 600, 16 * k)
      label(x, 830, 1060, 'BEST LIGHT', pop01(t, P.t0 + 0.9, 0.3, 2), { bg: GOLD, rot: 0.06 })
    } },
  { sign: 'virgo', cap: 'Read the menu | *beforehand.*', mood: lt => lt > 1.9 ? 'happy' : 'squint', look: [-1, 0], star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, MENU, MENU_C, 310, 860, 30 * k, { rot: -0.06 })
      if (k > 0.5) for (let n = 0; n < 4; n++) if (lt > 0.6 + n * 0.3) drawBits(x, TICK, { R: '#e23d4e' }, 380, 770 + n * 60, 8, { outline: null })
    } },
  { sign: 'libra', cap: 'Still can’t | *pick a dish.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, -1],
    front(x, t, lt, P) {
      const opts = ['soup?', 'pasta?', 'both?', 'soup?']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.5))
      bubble(x, 720, 620, opts[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', col: n % 2 ? '#ffe27a' : BONE })
    } },
  { sign: 'scorpio', cap: 'Deep question before | *the bread.*', mood: 'neutral', look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      bubble(x, 720, 620, 'what is your | biggest dream?', pop01(t, P.t0 + 0.45, 0.28, 2.2), { size: 32, tail: 'bl', col: '#c9c4d8' })
    } },
  { sign: 'sagittarius', cap: 'One story, | *three countries.*', mood: 'sparkle', star: { x: 130 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, GLOBE, GLOBE_C, 290, 820, 24 * k, { rot: lt * 0.2 })
      label(x, 290, 1000, 'PART 3 OF 7', pop01(t, P.t0 + 1.0, 0.3, 2), { bg: '#c97bff', color: BONE, rot: -0.06 })
    } },
  { sign: 'capricorn', cap: 'Reserved the table | *weeks ahead.*', mood: 'happy', star: { x: 140 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SIGN, SIGN_C, 300, 900, 26 * k)
      label(x, 300, 760, 'RESERVED', pop01(t, P.t0 + 0.6, 0.3, 2), { bg: '#2fc79a', rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Asked your take | on *aliens.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [-1, -1], star: { x: 130 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      const bob = Math.sin(t * 3) * 12
      if (k > 0.5) { x.save(); x.globalAlpha = 0.18; x.fillStyle = '#ffe27a'; x.beginPath(); x.moveTo(280, 680 + bob); x.lineTo(200, 1000); x.lineTo(360, 1000); x.closePath(); x.fill(); x.restore() }
      drawBits(x, UFO, UFO_C, 280, 660 + bob, 20 * k)
      label(x, 290, 1060, 'just curious!', pop01(t, P.t0 + 1.1, 0.3, 2), { bg: '#8fe3ff', rot: 0.05, size: 28 })
    } },
  { sign: 'pisces', cap: 'Cried at | *the dessert.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, star: { x: -130 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2.2)
      drawBits(x, CAKE, CAKE_C, 770, 960, 20 * k)
      label(x, 770, 1080, 'it’s so pretty', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 26, bg: '#7c74f0', color: BONE, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'trs2firstdate', key: 'D', accent: '#ff8fb1',
  title: 'The signs on | a *first date.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone said yes | to *date two.*' },
  lesson: { text: 'Be curious, | not *perfect.*', chip: 'DATE TWO: BOOKED' },
  last: {
    text: 'See you at | *date two.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
