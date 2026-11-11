// v3t018: THE SIGNS AS… v3, "First warm day | be like." (~57 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "First warm day | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   the first warm day, one sign per card (3.8 s each), each pushed to the extreme:
//              ♈ shorts on, it's 12 degrees · ♉ moved the couch outside · ♊ made plans with everyone at once
//              · ♋ sunscreen for the whole street · ♌ sunbathing, the sun is jealous · ♍ spring-cleaned the lawn
//              · ♎ sunglasses that match the flowers · ♏ 24 degrees, still in all black · ♐ one sunbeam, already at the beach
//              · ♑ ate lunch outside, felt rebellious · ♒ wore a scarf on purpose · ♓ saw the first flower, wept
//  49.2        "Summer starts | *now, apparently.*"
//  52.6        callback: "Next day: snow. | Aries: *still in shorts.*"  (Aries in the shorts, snowflakes falling)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#5fd068', CREAM = '#fff4e2', SUN = '#ffd23a'

const SHORTS = [
  'RRRRRRRRRRR',
  'RRRRRWRRRRR',
  'RRRRR.RRRRR',
  'RRRR...RRRR',
  'RRRR...RRRR',
]
const SHORTS_C = { R: '#ff6b5a', W: CREAM }
const COUCH = [
  '.GGGGGGGGGGGG.',
  'GGggggggggggGG',
  'GGggggggggggGG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.K..........K.',
]
const COUCH_C = { G: '#c97bff', g: '#e0b0ff', K: '#5a2e1a' }
const GRASS = ['G.g.G.G.g.G.G.g.G', 'GGgGGGgGGgGGGgGGG']
const GRASS_C = { G: GREEN, g: '#2a6b3a' }
const BOTTLE = ['.KK.', 'WWWW', 'WOOW', 'WOOW', 'WOOW', 'WWWW']
const BOTTLE_C = { K: INK, W: CREAM, O: ORANGE }
const GLASSES = [
  'KKKKKK.KKKKKK',
  'KPPPPKKKPPPPK',
  'KPPWPK.KPPWPK',
  '.KKKK...KKKK.',
]
const GLASSES_C = { K: INK, P: PINK, W: '#ffffff' }
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '.GG..', '..G..']
const UMBRELLA = [
  '.....RWRWR.....',
  '...RWRWRWRWR...',
  '.RWRWRWRWRWRWR.',
  'RWRWRWRWRWRWRWR',
  '.......K.......',
  '.......K.......',
  '.......K.......',
  'YYYYYYYKYYYYYYY',
]
const UMBRELLA_C = { R: RED, W: CREAM, K: '#8a4a2e', Y: '#ffe9a8' }
const SCARF = [
  'SSSSSSSSSSSSS',
  'SsSsSsSsSsSsS',
  '..........SsS',
  '..........SsS',
  '..........S.S',
]
const SCARF_C = { S: '#6fc3ff', s: '#ffffff' }
const SANDWICH = ['..BBBBBBB..', 'YYYYYYYYYYY', 'GgGgGgGgGgG', '..BBBBBBB..']
const SAND_C = { B: '#e8a24a', Y: '#ffe9a8', G: GREEN, g: '#2a6b3a' }

function sun(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.4)
  x.fillStyle = SUN
  for (let i = 0; i < 8; i++) { x.save(); x.rotate(i * Math.PI / 4); x.fillRect(-8, -r - 34, 16, 26); x.restore() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = SUN; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.restore()
}
function snow(x, t, t0, { n = 30, top = 460, h = 800, w = 820 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = ((t - t0) * 0.25 + i / n) % 1
    const sx = 540 + (((i * 71) % 100) / 100 - 0.5) * w + Math.sin(ph * 7 + i) * 20
    x.save(); x.globalAlpha = clamp((t - t0) * 2) * 0.9; x.fillStyle = '#ffffff'; x.fillRect(sx - 6, top + ph * h - 6, 12, 12); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Shorts on. | It’s *12 degrees.*', mood: lt => lt > 1.4 ? 'squint' : 'sparkle', star: { x: -160, y: -40 }, hops: [0.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SHORTS, SHORTS_C, 380, 1060, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 760, 'TEMP: 12°', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'SUMMER!!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 50, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Moved the couch | *outside.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -40, y: -40, s: 250 },
    back(x, t, lt, P) {
      drawBits(x, COUCH, COUCH_C, 540, 1000, 32 * pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, GRASS, GRASS_C, 540, 1150, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P) {
      sun(x, t, 820, 620, 46, pop01(t, P.t0 + 0.6, 0.35, 2))
      label(x, 300, 640, 'LIVING ROOM 2.0', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Made plans | with *everyone.* At once.', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const S = ['park: 2pm', 'brunch: 2pm', 'beach: 2pm', 'picnic: 2pm']
      S.forEach((s, i) => label(x, 790, 680 + i * 110, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2), { size: 30, bg: [GOLD, PINK, SKYB, MINT][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
      label(x, 790, 1130, 'DOUBLE-BOOKED ×4', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Brought sunscreen | *for the whole street.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, BOTTLE, BOTTLE_C, 690 + (i % 3) * 100, 900 + Math.floor(i / 3) * 140, 16 * pop01(t, P.t0 + 0.3 + i * 0.12, 0.3, 2))
      label(x, 790, 700, 'SPF FOR ALL', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'reapply, sweetie', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Sunbathing. | *The sun is jealous.*', mood: 'sparkle', star: { x: -150, y: 20 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      sun(x, t, 790, 760, 70, k)
      if (k > 0.5) { x.save(); x.fillStyle = INK; x.fillRect(760, 740, 14, 14); x.fillRect(808, 740, 14, 14); x.fillRect(770, 790, 44, 8); x.restore() }
      label(x, 790, 960, 'SUN: JEALOUS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 390, 900, P.t0 + 0.9, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Spring cleaning. | *Of the lawn.*', mood: 'squint', look: [1, 1], star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, GRASS, GRASS_C, 540, 1150, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'LAWN: SPOTLESS', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'one more…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Sunglasses that | *match the flowers.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GLASSES, GLASSES_C, 370, 840, 16 * pop01(t, P.t0 + 0.3, 0.3, 2.4))
      for (let i = 0; i < 3; i++) drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: GREEN }, 690 + i * 100, 1060, 16 * pop01(t, P.t0 + 0.7 + i * 0.15, 0.3, 2.2))
      label(x, 790, 800, 'COLOUR: MATCHED ✦', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Twenty-four degrees. | Still *in all black.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sun(x, t, 800, 700, 50, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 900, 'TEMP: 24°', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'OUTFIT: BLACK', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: INK, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Saw one sunbeam. | *Already at the beach.*', mood: 'sparkle', star: { x: 150, y: 20 }, hops: [0.5, 1.2],
    back(x, t, lt, P) {
      drawBits(x, UMBRELLA, UMBRELLA_C, 320, 980, 22 * pop01(t, P.t0 + 0.4, 0.35, 2))
      x.save(); x.globalAlpha = 0.6 * clamp(lt / 0.4); x.fillStyle = '#ffe9a8'; x.fillRect(110, 1130, 860, 90); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 320, 660, 'FIRST ONE THERE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ate lunch outside. | *Felt rebellious.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SAND_C, 320, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 320, 720, 'LUNCH: 20 MIN', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 1060, 'REBEL MODE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Wore a scarf. | *On purpose.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SCARF, SCARF_C, 380, 1000, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 760, 'TREND: NOT', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'it’s ironic', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Saw the first flower. | *Wept.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FLOWER, { P: LAV, Y: GOLD, G: GREEN }, 790, 900, 30 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1110, 'SO. PRETTY.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 820, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t018', key: 'E', accent: SUN, ending: 'callback',
  title: 'First warm day | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Summer starts | *now, apparently.*' },
  last: {
    text: 'Next day: snow. | Aries: *still in shorts.*',
    draw(x, t, lt) {
      snow(x, t, t - lt + 0.2)
      const k = pop01(t, t - lt + 0.4, 0.45, 2)
      if (k > 0.01) {
        signChar(x, t, 'aries', 540 + (lt > 1.0 ? 3 * Math.sin(t * 40) : 0), 1000, 320 * k, { mood: lt > 1.0 ? 'squint' : 'sparkle', seed: 9, glyph: false })
        drawBits(x, SHORTS, SHORTS_C, 540, 1180, 18 * k)
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
