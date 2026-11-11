// v3t051: THE SIGNS AS… v3, SOLO film, "Things only | Libras get." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine everyday situations, each the most extreme (and lovable) Libra version.
//   0.0–3.6    "Things only | *Libras* get."  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              forty minutes to pick a filter · coin flip, then best of nine · mirror check to take the bins out
//              · matched, rated their font · "whatever you want" meant option three · one new plant, restyled the room
//              · agreed with both sides of the fight · thank-you note for the thank-you note · birth chart matches the sofa
//  37.8        "Pretty. Fair. | *Undecided.*"
//  41.0        LESSON UNLOCKED: "Give a Libra a minute. | Their *yes* is worth it."  STATUS: BALANCED
//  46.9        "Still picking | *the filter.*" (calls back card one; the phone comes back, filter 41)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9ec7', GREEN = '#5fd068', BROWN = '#8a4a2e', RED = '#e23d4e'

// ── props
const COIN = [
  '..GGGG..',
  '.GYYYYG.',
  'GYYGGYYG',
  'GYGYYGYG',
  'GYGYYGYG',
  'GYYGGYYG',
  '.GYYYYG.',
  '..GGGG..',
]
const COIN_C = { G: '#c98f2a', Y: GOLD }
const MIRROR = [
  '...FFFFFF...',
  '..FSSSSSSF..',
  '.FSSWSSSSSF.',
  '.FSWSSSSSSF.',
  '.FSSSSSSSSF.',
  '.FSSSSSSSSF.',
  '.FSSSSSSSSF.',
  '.FSSSSSSSSF.',
  '..FSSSSSSF..',
  '...FFFFFF...',
  '.....FF.....',
  '....FFFF....',
]
const MIRROR_C = { F: GOLD, S: '#bfe8ff', W: '#ffffff' }
const BIN = [
  '.KKKKKKKK.',
  'KKKKKKKKKK',
  '.GGGGGGGG.',
  '.GgGGgGGg.',
  '.GgGGgGGg.',
  '.GgGGgGGg.',
  '.GgGGgGGg.',
  '.GGGGGGGG.',
]
const BIN_C = { K: '#3b4a5a', G: '#6c7f8f', g: '#52626f' }
const PLANT = [
  '...L.L...',
  '.LL.L.LL.',
  'LLLLLLLLL',
  '.LLLLLLL.',
  '...LLL...',
  '..PPPPP..',
  '..PPPPP..',
  '...PPP...',
]
const PLANT_C = { L: GREEN, P: '#d9774b' }
const ENVELOPE = [
  'WWWWWWWWWWWW',
  'WPWWWWWWWWPW',
  'WWPWWWWWWPWW',
  'WWWPWWWWPWWW',
  'WWWWPRRPWWWW',
  'WWWWWRRWWWWW',
  'WWWWWWWWWWWW',
  'WWWWWWWWWWWW',
]
const ENV_C = { W: '#fff4e2', P: '#d8c8b8', R: ROSE }
const SOFA = [
  '.RRRRRRRRRRRR.',
  'RRrrrrrrrrrrRR',
  'RRrrrrrrrrrrRR',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRR',
  '.K..........K.',
]
const SOFA_C = { R: ROSE, r: '#ffc4dc', K: '#5a2e1a' }

// a phone with a selfie on screen, tinted by the current filter
function phone(x, t, cx, cy, k, { rot = 0.05, filter = 0, name = '', mood = 'sparkle' } = {}) {
  if (k <= 0.01) return
  const TINTS = ['rgba(255,158,199,0.35)', 'rgba(143,227,255,0.35)', 'rgba(242,199,92,0.35)', 'rgba(125,255,176,0.30)', 'rgba(201,166,255,0.35)', 'rgba(255,179,74,0.32)']
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-138, -214, 288, 440)
  x.fillStyle = INK; x.fillRect(-150, -226, 300, 452)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -216, 280, 432)
  x.fillStyle = '#140c30'; x.fillRect(-126, -186, 252, 300)
  signChar(x, t, 'libra', 0, -40, 170, { mood, seed: 61, glyph: false, glow: 0.6 })
  x.fillStyle = TINTS[filter % TINTS.length]; x.fillRect(-126, -186, 252, 300)
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(name, 0, 150)
  for (let i = 0; i < 5; i++) { x.fillStyle = i === 2 ? GOLD : '#6b62a8'; x.fillRect(-110 + i * 46, 176, 36, 22) }
  x.restore()
}
// a dating-profile card: a sign star, a name line in a very fancy font
function profile(x, t, cx, cy, k, { rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -150, 260, 320)
  x.fillStyle = INK; x.fillRect(-136, -166, 272, 332)
  x.fillStyle = '#2a2350'; x.fillRect(-130, -160, 260, 320)
  x.fillStyle = '#140c30'; x.fillRect(-116, -146, 232, 200)
  signChar(x, t, 'gemini', 0, -50, 150, { mood: 'wink', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = '#ffd23a'; x.font = `italic 700 40px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('♊︎ Gemini', 0, 100)
  x.fillStyle = MINT; x.font = `700 22px ${MONO}`; x.fillText('NEW MATCH', 0, 138)
  x.restore()
}
// a framed birth chart: a wheel of twelve coloured wedges
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -140, 296, 296)
  x.fillStyle = INK; x.fillRect(-156, -156, 312, 312)
  x.fillStyle = GOLD; x.fillRect(-148, -148, 296, 296)
  x.fillStyle = '#fff4e2'; x.fillRect(-124, -124, 248, 248)
  const C = [ROSE, '#ffc4dc', ROSE, '#ffc4dc']
  for (let i = 0; i < 12; i++) { x.fillStyle = C[i % 4]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 104, i / 12 * Math.PI * 2 + t * 0.2, (i + 1) / 12 * Math.PI * 2 + t * 0.2); x.fill() }
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: 'libra', cap: 'Forty minutes | to pick *a filter.*', mood: lt => lt > 1.8 ? 'squint' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const f = Math.floor(lt * 5)
      phone(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { filter: f, name: `FILTER ${Math.min(38, 1 + f * 3)}` })
      label(x, 790, 600, '0:40:00', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Flipped a coin. | Then *best of nine.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const ph = (lt * 2.2) % 1
      drawBits(x, COIN, COIN_C, 780, 960 - Math.sin(Math.PI * ph) * 280, 26 * k, { sx: Math.cos(lt * 14), rot: 0 })
      const n = 1 + Math.min(6, Math.floor(lt * 2.6))
      label(x, 790, 1120, `FLIP ${n} OF 9`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Full glam. | To take *the bins out.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', star: { x: -180 }, hops: [1.3],
    back(x, t, lt, P) { drawBits(x, BIN, BIN_C, 830, 1060, 16 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, MIRROR, MIRROR_C, 760, 760, 20 * pop01(t, P.t0 + 0.35, 0.3, 2), { rot: 0.06 })
      bubble(x, 760, 560, 'flawless.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 760, 760, P.t0 + 1.3, 6, 150, 0.4)
    } },
  { sign: 'libra', cap: 'New match. | Rated *their font.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      profile(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1070, 'FONT: 10/10', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'libra', cap: '“Whatever you want.” | Meant *option three.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      const OPTS = ['tacos', 'pasta', 'sushi']
      OPTS.forEach((o, i) => {
        const k = pop01(t, P.t0 + 0.25 + i * 0.2, 0.3, 2), pick = i === 2 && lt > 1.3
        label(x, 790, 660 + i * 150, `${i + 1}. ${o}`, k, { size: 40, bg: pick ? GOLD : BONE, rot: (i - 1) * 0.04, weight: 800 })
      })
      if (lt > 1.3) sparkles(x, t, 790, 960, P.t0 + 1.3 * 1.29, 6, 150, 0.1)
      bubble(x, 420, 590, 'anything!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Bought one plant. | Restyled *the whole flat.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.5) / 1.2) * 4)
      const ITEMS = [[700, 640, '#ffc4dc'], [880, 660, LAV], [640, 1010, GOLD], [940, 1010, SKYB]]
      ITEMS.slice(0, n).forEach(([a, b, c], i) => { x.fillStyle = INK; x.fillRect(a - 56, b - 40, 112, 80); x.fillStyle = c; x.fillRect(a - 50, b - 34, 100, 68); x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(a - 40, b - 24, 30, 20) })
    },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1240 - 120, 'ONE PLANT', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.6, 7, 200, 0.5)
    } },
  { sign: 'libra', cap: 'Friends fighting? | Agreed *with both.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { s: 260, y: 40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'aries', 260, 760, 170 * k, { mood: 'squint', look: [1, 0], seed: 13, glyph: false })
        signChar(x, t, 'capricorn', 820, 760, 170 * k, { mood: 'squint', look: [-1, 0], seed: 14, glyph: false })
      }
      bubble(x, 300, 560, 'right?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: '#ffb3a8', tail: 'bc' })
      bubble(x, 790, 560, 'RIGHT?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: '#c8d4e0', tail: 'bc' })
      label(x, 540, 1130, 'YOU’RE BOTH RIGHT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.03 })
    } },
  { sign: 'libra', cap: 'Sent a thank-you note | for *the thank-you note.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, ENVELOPE, ENV_C, 800, 760, 20 * k, { rot: -0.06 })
      drawBits(x, ENVELOPE, ENV_C, 790, 980, 20 * pop01(t, P.t0 + 1.1, 0.3, 2), { rot: 0.07 })
      label(x, 800, 620, 'THANKS!', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.06, font: MONO, weight: 700 })
      label(x, 790, 1120, 'THANKS FOR THANKS!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: ROSE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Their birth chart? | Matches *the sofa.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200, s: 270 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 790, 740, pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, SOFA, SOFA_C, 790, 1060, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1185, 'PERFECT MATCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 740, P.t0 + 1.5, 7, 180, 0.6)
    } },
]

const F = makeFilm({
  id: 'v3t051', key: 'C', accent: ROSE, solo: 'libra', ending: 'lesson',
  title: 'Things only | *Libras* get.',
  cameos: CAMEOS,
  group: { cap: 'Pretty. Fair. | *Undecided.*', mood: 'sparkle' },
  lesson: { text: 'Give a Libra a minute. | Their *yes* is worth it.', chip: 'STATUS: BALANCED' },
  last: {
    text: 'Still picking | *the filter.*',
    draw(x, t, lt) { phone(x, t, 820, 1150, pop01(t, t - lt + 0.6, 0.35, 2) * 0.62, { rot: 0.08, filter: Math.floor(lt * 4), name: 'FILTER 41' }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
