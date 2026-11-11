// v3t032: THE SIGNS AS… v3, "Date prep | be like." (~57 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   one sign getting ready for a date per card, each pushed to the extreme:
//              ♈ ready in four minutes, two hours early · ♉ picked the outfit around the menu · ♊ six friends, six answers
//              · ♋ packed like it's a week away · ♌ changed outfits eleven times · ♍ annotated your profile
//              · ♎ outfit A or B, wore both · ♏ sunglasses at night, indoors · ♐ forgot to get ready, looks great anyway
//              · ♑ wore a suit to a picnic · ♒ outfit theme: the future · ♓ did their makeup, cried it off twice
//  49.2        group: "Ready. | *Ish.*"
//  52.6        callback: "Aries is still | *at the restaurant.*" (the clock from Aries' card, now late at night)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2'

// a round wall clock; hand angles in turns
function clock(x, cx, cy, r, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 5, Math.sin(a) * r * 0.82 - 5, 10, 10) }
  x.lineCap = 'round'; x.strokeStyle = INK
  x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(h * Math.PI * 2) * r * 0.5, -Math.cos(h * Math.PI * 2) * r * 0.5); x.stroke()
  x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(m * Math.PI * 2) * r * 0.75, -Math.cos(m * Math.PI * 2) * r * 0.75); x.stroke()
  x.fillStyle = RED; x.fillRect(-8, -8, 16, 16)
  x.restore()
}
const SUITCASE = [
  '....KKKK....',
  '....K..K....',
  'PPPPPPPPPPPP',
  'PppPPPPPPppP',
  'PPPPPPPPPPPP',
  'PPPPYYYYPPPP',
  'PPPPPPPPPPPP',
  'PppPPPPPPppP',
  'PPPPPPPPPPPP',
  '.K........K.',
]
const SUIT_C = { K: INK, P: '#c24a6a', p: '#e27a96', Y: GOLD }
const SHIRT = [
  '..AA..BB..',
  'AAAAABBBBB',
  'AAAAABBBBB',
  'AAAAABBBBB',
  '.AAAABBBB.',
  '.AAAABBBB.',
  '.AAAABBBB.',
  '.AAAABBBB.',
]
const SHADES = [
  'KKKKKKKKKKKKKKK',
  'KBBBBK...KBBBBK',
  'KBBBBK...KBBBBK',
  '.KBBK.....KBBK.',
]
const TIE = [
  '.RRR.',
  '..R..',
  '.RRR.',
  '.RrR.',
  'RRRRR',
  'RRrRR',
  '.RRR.',
  '..R..',
]
const BASKET = [
  '...BBBBBB...',
  '..B......B..',
  '.B........B.',
  'RWRWRWRWRWRW',
  'YYYYYYYYYYYY',
  'YyYyYyYyYyYy',
  'YYYYYYYYYYYY',
  '.YyYyYyYyYy.',
]
const MIRROR = [
  '..GGGGGG..',
  '.GSSSSSSG.',
  'GSSWSSSSSG',
  'GSWSSSSSSG',
  'GSSSSSSSSG',
  'GSSSSSSSSG',
  'GSSSSSSSSG',
  '.GSSSSSSG.',
  '..GGGGGG..',
  '....GG....',
  '...GGGG...',
]

// a match's sign profile card, covered in Virgo's red-pen notes
function profile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -210, 300, 420)
  x.fillStyle = CREAM; x.fillRect(-142, -202, 284, 404)
  x.fillStyle = '#6fc3ff'; x.fillRect(-142, -202, 284, 150)
  x.fillStyle = GOLD; x.fillRect(-40, -170, 80, 80)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('YOUR PROFILE', 0, -20)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-110, 30 + i * 40, 220 - (i % 2) * 60, 14)
  const n = Math.floor(clamp((lt - 0.5) / 1.3) * 4 + 0.001)
  x.strokeStyle = RED; x.lineWidth = 7; x.lineCap = 'round'
  const marks = [[-120, 20, 120, 50], [-110, 110, 90, 70], [-120, 150, 110, 190], [90, -60, 140, -20]]
  for (let i = 0; i < Math.min(n, 4); i++) { const [a, b, c, d] = marks[i]; x.beginPath(); x.moveTo(a, b); x.lineTo(c, d); x.stroke() }
  if (n >= 2) { x.fillStyle = RED; x.font = `800 32px ${INTER}`; x.fillText('see p.2', 70, 175) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ready in four minutes. | *Two hours early.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.3, 0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 800, 820, 110, pop01(t, P.t0 + 0.2, 0.3, 2), 5 / 12, lerp(0, 0.07, clamp(lt / 2)))
      label(x, 800, 640, 'DATE: 7:00', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 38, bg: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1030, 'NOW: 5:00', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Picked the outfit | *around the menu.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'there’s | a dessert | menu', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 960, 'STRETCHY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 44, bg: MINT, rot: -0.05 })
      label(x, 800, 1050, 'PANTS ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Asked six friends. | Got *six answers.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const A = ['red!', 'blue', 'the hat', 'NO hat', 'cape??', 'just go']
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.22, 0.25, 2.2)
        bubble(x, 690 + (i % 2) * 190, 620 + Math.floor(i / 2) * 175, A[i], k, { size: 40, col: [CREAM, LAV, SKYB][i % 3], tail: i % 2 ? 'br' : 'bl' })
      }
    } },
  { sign: 'cancer', cap: 'Packed for the date | like *a week away.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUIT_C, 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const L = ['snacks', 'blanket', 'spare socks']
      for (let i = 0; i < 3; i++) label(x, 790 + (i - 1) * 40, 600 + i * 68, L[i], pop01(t, P.t0 + 0.8 + i * 0.3, 0.3, 2.4), { size: 32, bg: [GOLD, MINT, PINK][i], rot: (i - 1) * 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Changed outfits | *eleven times.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const n = Math.min(11, 1 + Math.floor(lt / 0.2))
      const C = [RED, GOLD, MINT, PINK, LAV, SKYB, ORANGE]
      for (let i = 0; i < Math.min(n, 7); i++) { x.fillStyle = INK; x.fillRect(680 + (i % 3) * 30 - 6, 1060 - i * 34 - 6, 232, 46); x.fillStyle = C[i]; x.fillRect(680 + (i % 3) * 30, 1060 - i * 34, 220, 34) }
      label(x, 790, 640, 'LOOK ' + n, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 48, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Read your profile. | *Annotated it.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -190, s: 270 },
    front(x, t, lt, P) { profile(x, t, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Outfit A or B? | *Wore both.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHIRT, { A: PINK, B: MINT }, 790, 880, 30 * k)
      label(x, 680, 660, 'A', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.06, font: MONO, weight: 700 })
      label(x, 900, 660, 'B', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 44, bg: MINT, rot: 0.06, font: MONO, weight: 700 })
      label(x, 790, 1110, 'A + B', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Sunglasses. | *At night.* Indoors.', mood: 'neutral', star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) drawBits(x, SHADES, { K: INK, B: '#2a2350' }, F.x, F.cy - 6 - (1 - k) * 200, F.cell * 1.6, { alpha: clamp(k) })
      label(x, 800, 700, 'MOOD: MYSTERY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'can’t see | a thing', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Forgot to get ready. | Looks *great anyway.*', mood: lt => lt > 1.0 ? 'wink' : 'sleepy', star: { x: 150 }, hops: [1.0],
    front(x, t, lt, P) {
      label(x, 330, 760, 'EFFORT: 0', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 330, 900, 'RESULT: 10', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 690, 860, P.t0 + 1.3, 8, 190, 0.2)
    } },
  { sign: 'capricorn', cap: 'Wore a suit. | It’s *a picnic.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P, F) {
      drawBits(x, TIE, { R: RED, r: '#ff8a8a' }, F.x, F.cy + F.cell * 12, F.cell * 1.3, { alpha: clamp(pop01(t, P.t0 + 0.3, 0.3, 2)) })
      drawBits(x, BASKET, { B: BROWN, R: RED, W: CREAM, Y: '#d8a050', y: '#a8703a' }, 800, 1000, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 800, 690, 'DRESS CODE: GRASS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Outfit theme: | *the future.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = clamp(pop01(t, P.t0 + 0.3, 0.3, 2))
      if (k > 0.01) {
        x.save(); x.globalAlpha = k
        x.fillStyle = INK; x.fillRect(F.x - 8, F.top - 110, 16, 110); x.fillStyle = '#9aa5c4'; x.fillRect(F.x - 4, F.top - 106, 8, 104)
        const on = Math.sin(t * 9) > 0
        x.fillStyle = INK; x.fillRect(F.x - 22, F.top - 140, 44, 44); x.fillStyle = on ? RED : '#ff8a8a'; x.fillRect(F.x - 16, F.top - 134, 32, 32)
        x.restore()
      }
      label(x, 800, 720, 'FASHION: 3026', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 960, 'beep. | hello.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Did their makeup. | *Cried it off.* Twice.', mood: lt => lt < 0.6 ? 'happy' : 'wide', tears: lt => lt < 0.6 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MIRROR, { G: GOLD, S: '#a8d8ef', W: '#ffffff' }, 800, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'they sent | a heart', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 800, 1150, 'MAKEUP: 0/2', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t032', key: 'D', accent: '#ff8fb1', ending: 'callback',
  title: 'Date prep | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Ready. | *Ish.*' },
  last: {
    text: 'Aries is still | *at the restaurant.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.4, 2)
      clock(x, 540, 1120, 150, k, lerp(9.5 / 12, 10.5 / 12, clamp(lt / 3)), lerp(0.5, 0.5 + 12, clamp(lt / 3)))
      signChar(x, t, 'aries', 540, 1430, 200, { mood: 'sleepy', pop: pop01(t, t - lt + 0.6, 0.4, 1.8), seed: 11 })
      label(x, 760, 960, 'DATE: 7:00', pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 34, bg: CREAM, rot: 0.06, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
