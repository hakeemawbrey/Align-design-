// r2a0030: star_advice, ADVICE ROLLCALL, "Each sign's | happy place." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: each one's happy place, said warmly, each with a light gag. Ending: the group beat.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ the front of the line (every line) · ♉ a garden and a long lunch · ♊ a long walk with a chatty friend
//              · ♋ the kitchen, everyone fed · ♌ sunshine and an audience · ♍ a freshly labelled pantry
//              · ♎ a pretty café, good company · ♏ a deep talk at 1 a.m. · ♐ anywhere they haven't been
//              · ♑ an early, empty office · ♒ a late-night idea that might work · ♓ a rainy window and a sad song
//  49.2        group (the ending): "Find yours. | *Go often.*"  Over the photo: HAPPY PLACE: FOUND
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SUN = '#ffd36b', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

// ── props
const FLOWERS = ['.R...Y...P.', 'RRR.YYY.PPP', '.R...Y...P.', '..G..G..G..', '...G.G.G...', '....GGG....', '...BBBBB...', '...BBBBB...', '....BBB....']
const POT = ['KKKKKKKKK', 'PPPPPPPPP', 'PPPPPPPPP', 'PPPPPPPPP', '.PPPPPPP.']
const STEAM = ['.S...S.', 'S...S..', '.S...S.', '..S...S']
const SUNBM = ['..Y..Y..Y..', '...YYYYY...', 'Y.YYYYYYY.Y', '.YYYYYYYYY.', 'YYYYYYYYYYY', '.YYYYYYYYY.', 'Y.YYYYYYY.Y', '...YYYYY...', '..Y..Y..Y..']
const JAR = ['.KKKK.', 'GGGGGG', 'GWWWWG', 'GWKKWG', 'GWWWWG', 'GGGGGG']
const CUP = ['WWWWW..', 'WCCCWWW', 'WWWWW.W', 'WWWWWWW', '.WWW...']
const MOON = ['..MMM.', '.MM...', 'MM....', 'MM....', 'MM....', '.MM...', '..MMM.']
const LAMP = ['..LLLL..', '.LLLLLL.', 'LLLLLLLL', '...KK...', '...KK...', '..KKKK..']
const BULB = ['..YYYY..', '.YYYYYY.', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..']
const WINDOW = ['FFFFFFFFFFFF', 'FBBBBFBBBBBF', 'FBdBBFBBdBBF', 'FBBBBFBBBBBF', 'FBBdBFBdBBBF', 'FFFFFFFFFFFF', 'FBBBBFBBBBBF', 'FBBBdFBBBBdF', 'FBBBBFBBBBBF', 'FFFFFFFFFFFF']

const CAMEOS = [
  { sign: 'aries', cap: 'The front of the line. | *Every line.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        if (k > 0.01) signChar(x, t, ['taurus', 'libra', 'pisces'][i], 600 + i * 140, 990, 130 * k, { mood: i === 2 ? 'wide' : 'neutral', look: [-1, 0], seed: 30 + i, glyph: false, tears: i === 2 ? 1 : 0 })
      }
      label(x, 790, 720, 'POSITION: 1ST', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A garden. | *And a long lunch.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, { R: PINK, Y: GOLD, P: LAV, G: GREEN, B: BROWN }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1100, 'LUNCH: 3 HOURS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A long walk | *with a chatty friend.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 820, 980, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 41, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.8] })
      bubble(x, 760, 700, 'and THEN—', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      bubble(x, 840, 830, 'no way!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      label(x, 600, 1120, 'STEPS: 21,000', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'The kitchen. | *Everyone fed.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const kp = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, { K: INK, P: SKYB }, 790, 900, 22 * kp)
      drawBits(x, STEAM, { S: '#e6e0f0' }, 790, 900 - 22 * 6 - Math.sin(t * 3) * 6, 12 * kp, { outline: null, alpha: 0.8 })
      hearts(x, t, 790, 800, P.t0 + 0.9, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
      label(x, 790, 1100, 'BOWLS: ALL FULL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Sunshine. | *And an audience.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, SUNBM, { Y: SUN }, 800, 790, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: t * 0.3 })
      label(x, 790, 1080, 'APPLAUSE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 360, 860, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'A freshly | *labelled pantry.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const L = ['OATS', 'RICE', 'TEA']
      L.forEach((s, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)
        drawBits(x, JAR, { K: INK, G: '#c9e8f5', W: CREAM }, 660 + i * 125, 900, 19 * k)
        if (lt > 0.9 + i * 0.2) label(x, 660 + i * 125, 910, s, 1, { size: 24, bg: BONE, rot: 0, font: MONO, weight: 700 })
      })
      label(x, 790, 1100, 'ALPHABETICAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A pretty café. | *Good company.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CUP, { W: CREAM, C: '#c98f2a' }, 720, 920, 18 * k)
      drawBits(x, CUP, { W: PINK, C: '#c98f2a' }, 870, 920, 18 * k, { sx: -1 })
      hearts(x, t, 790, 850, P.t0 + 0.8, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
      label(x, 790, 1100, 'TABLE BY THE WINDOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'A deep talk | *at 1 a.m.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MOON, { M: '#fff1b0' }, 880, 680, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 860, 'okay… | real talk?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1100, 'SOUL: SEEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Anywhere | *they haven’t been.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -130, 340, 260); x.fillStyle = '#cfeaff'; x.fillRect(-162, -122, 324, 244)
        x.fillStyle = '#9be08a'; x.fillRect(-130, -90, 110, 70); x.fillRect(-10, -40, 130, 90); x.fillRect(-120, 40, 80, 60)
        const n = Math.min(5, Math.floor(Math.max(0, lt - 0.4) / 0.3) + 1)
        const pins = [[-90, -60], [40, -10], [-80, 70], [90, 30], [10, 90]]
        for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(pins[i][0] - 9, pins[i][1] - 22, 18, 18); x.fillStyle = RED; x.fillRect(pins[i][0] - 6, pins[i][1] - 19, 12, 12); x.fillStyle = INK; x.fillRect(pins[i][0] - 2, pins[i][1] - 4, 4, 14) }
        x.restore()
      }
      label(x, 790, 1110, 'NEXT: ???', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'An early, empty office. | *Peace.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, LAMP, { L: '#fff1b0', K: '#6a7594' }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6) { x.save(); x.globalAlpha = 0.25; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(740, 900); x.lineTo(860, 900); x.lineTo(940, 1080); x.lineTo(660, 1080); x.fill(); x.restore() }
      label(x, 790, 700, '7:00 AM', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'NOBODY HERE. BLISS.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'A late-night idea | *that might work.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.0],
    front(x, t, lt, P) {
      const on = lt > 0.9
      drawBits(x, BULB, { Y: on ? '#fff1b0' : '#6a7594', G: '#9aa5c4' }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (on) sparkles(x, t, 800, 840, P.t0 + 0.9 * (3.1 / 2.4), 8, 170, 0.3)
      label(x, 790, 1100, 'EUREKA (MAYBE)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A rainy window. | *A sad song. Bliss.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, WINDOW, { F: '#c9c9d8', B: '#4a5bd6', d: SKYB }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 800, 760, { n: 4, cell: 7, col: LAV, seed: 2 })
      label(x, 790, 1110, 'HAPPY-SAD', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0030', key: 'G', accent: SUN, ending: 'group',
  title: 'Each sign’s | *happy place.*',
  cameos: CAMEOS,
  group: {
    cap: 'Find yours. | *Go often.*',
    draw(x, t, lt) {
      label(x, 540, 700, 'HAPPY PLACE: FOUND', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 44, bg: SUN, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
