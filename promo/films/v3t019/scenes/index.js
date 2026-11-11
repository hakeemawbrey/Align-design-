// v3t019: THE SIGNS AS… v3, "Stressed zodiacs | be like." (~57 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "Stressed zodiacs | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one stressed sign per card (3.8 s each), each pushed to the extreme:
//              ♈ ran a marathon · ♉ a four-hour bath · ♊ vented to eleven group chats · ♋ baked two hundred cookies
//              · ♌ needs a standing ovation · ♍ a to-do list for the to-do list · ♎ redecorated, twice
//              · ♏ went dark for a week · ♐ laughed it off, loudly · ♑ worked harder · ♒ unplugged the whole house
//              · ♓ cried in the shower, then the car
//  49.2        "Deep breaths, | *everyone.*"
//  52.6        callback: "Taurus is still | *in the bath.*"  (the tub comes back, more bubbles)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#5fd068', CREAM = '#fff4e2'

const TUB = [
  'K.............K',
  'WWWWWWWWWWWWWWW',
  'WSSSSSSSSSSSSSW',
  'WSSSSSSSSSSSSSW',
  '.WWWWWWWWWWWWW.',
  '..Y.........Y..',
]
const TUB_C = { K: '#9aa5c4', W: '#ffffff', S: SKYB, Y: GOLD }
const COOKIE = ['.CCCC.', 'CCKCCC', 'CCCCKC', 'CKCCCC', '.CCCC.']
const COOKIE_C = { C: '#d89a4a', K: '#5a2e1a' }
const LAMP = ['.YYYYY.', 'YYYYYYY', '...K...', '...K...', '..KKK..']
const PLANT = ['.G.G.', 'GGGGG', '.GGG.', 'BBBBB', '.BBB.']
const PLANT_C = { G: GREEN, B: '#c97a3a' }
const PLUG = ['..K.K..', '.KKKKK.', '.KKKKK.', '..KKK..', '...K...', '...K...']
const LAPTOP = [
  '.KKKKKKKKKK.',
  '.KSSSSSSSSK.',
  '.KSWWWWWSSK.',
  '.KSWWWWSSSK.',
  '.KSSSSSSSSK.',
  'GGGGGGGGGGGG',
]
const LAPTOP_C = { K: INK, S: '#2a2350', W: MINT, G: '#9aa5c4' }
const CAR = [
  '...BBBBBB.....',
  '..BSSBBSSB....',
  'BBBBBBBBBBBBB.',
  'BBBBBBBBBBBBBB',
  '.KK.......KK..',
]
const CAR_C = { B: '#c97bff', S: SKYB, K: INK }

/** the bath (Taurus's card and the callback): a tub, foam that grows with `foam` (0…1+) */
function bath(x, t, cx, cy, cell, k, foam) {
  if (k <= 0.01) return
  drawBits(x, TUB, TUB_C, cx, cy, cell * k)
  const n = Math.floor(6 + foam * 10)
  for (let i = 0; i < n; i++) {
    const a = i * 2.4, r = cell * (1.2 + (i % 3) * 0.5) * k
    const bx = cx + Math.sin(a) * cell * 6 * k, by = cy - cell * 2.5 * k - Math.abs(Math.cos(a * 1.3)) * cell * 2 * foam * k + Math.sin(t * 2 + i) * 3
    x.save(); x.fillStyle = INK; x.beginPath(); x.arc(bx, by, r + 3, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Stressed. | Ran *a marathon.*', mood: 'squint', star: { x: -160 }, hops: [0.3, 0.55, 0.8, 1.05, 1.3],
    back(x, t, lt, P) {
      const k = clamp((lt - 0.2) / 0.3)
      if (k > 0) { x.save(); x.globalAlpha = 0.6 * k; x.fillStyle = BONE; for (let i = 0; i < 5; i++) x.fillRect(150 + ((t * 900 + i * 130) % 160), 760 + i * 50, 120, 8); x.restore() }
    },
    front(x, t, lt, P) {
      const km = Math.min(42, Math.floor(Math.max(0, lt - 0.3) * 24))
      label(x, 790, 820, `KM: ${km}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 48, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1010, 'feel better!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Stressed. | Took a *four-hour bath.*', mood: 'sleepy', star: { x: 0, y: -40, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bath(x, t, 540, 1080, 26, pop01(t, P.t0 + 0.1, 0.3, 2), clamp(lt / 2.4))
      label(x, 800, 640, 'HOUR 4', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Vented to | *eleven group chats.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(11, 1 + Math.floor(Math.max(0, lt - 0.2) * 6))
      for (let i = 0; i < Math.min(4, n); i++) bubble(x, 760 + (i % 2) * 40, 680 + i * 105, ['ugh', 'SO much', 'anyway', 'also!!'][i], 1, { size: 34, col: [BONE, MINT, PINK, GOLD][i], tail: i % 2 ? 'br' : 'bl' })
      label(x, 790, 1140, `CHATS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Stressed. | Baked *200 cookies.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 9; i++) drawBits(x, COOKIE, COOKIE_C, 690 + (i % 3) * 100, 820 + Math.floor(i / 3) * 110, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2))
      label(x, 790, 1150, 'BATCH #17', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Stressed. Needs | a *standing ovation.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -150 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'clap for me?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      for (let i = 0; i < 5; i++) label(x, 640 + (i % 3) * 140, 900 + Math.floor(i / 3) * 110, 'CLAP', pop01(t, P.t0 + 1.0 + i * 0.12, 0.25, 2.4), { size: 30, bg: ORANGE, rot: (i % 2 ? 0.08 : -0.08), font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.4, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Made a to-do list | for *the to-do list.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -190, 280, 380); x.fillStyle = CREAM; x.fillRect(-132, -182, 264, 364)
        x.fillStyle = INK; x.font = `800 30px Inter, Arial, sans-serif`; x.textAlign = 'left'; x.fillText('TO DO:', -110, -135)
        const R = ['☐ make list', '☐ check list', '☐ list lists', '☐ breathe']
        x.font = `700 26px ${'Space Mono'}, monospace`
        R.slice(0, Math.floor(clamp((lt - 0.3) / 1.2) * 4.99)).forEach((r, i) => x.fillText(r, -110, -75 + i * 66))
        x.restore()
      }
      label(x, 790, 1130, 'LIST 2 OF 6', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Stressed. | *Redecorated.* Twice.', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      const sw = Math.floor(lt * 2.5) % 2
      drawBits(x, LAMP, { Y: GOLD, K: '#c97a3a' }, sw ? 880 : 690, 760, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PLANT, PLANT_C, sw ? 690 : 880, 1000, 26 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 1150, `LAYOUT #${1 + Math.floor(lt * 2.5)}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Stressed. | *Went dark.* For a week.', mood: 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const d = clamp((lt - 0.8) / 0.6) * 0.55
      if (d > 0) { x.save(); x.fillStyle = `rgba(6,4,18,${d})`; x.fillRect(110, 480, 860, 740); x.restore() }
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'DO NOT DISTURB', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: '#c97bff', color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'BACK: SOMEDAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Stressed? | *Laughed it off.* Loudly.', mood: lt => lt > 0.5 ? 'happy' : 'wide', star: { x: 150 }, hops: [0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) label(x, 300 + (i % 2) * 60, 700 + i * 140, 'HA HA HA', pop01(t, P.t0 + 0.5 + i * 0.3, 0.25, 2.4), { size: 38 - i * 2, bg: GOLD, rot: i % 2 ? 0.07 : -0.07, font: MONO, weight: 700 })
      label(x, 320, 1150, 'NEIGHBOURS: AWAKE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Stressed. | *Worked harder.*', mood: 'squint', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 320, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const h = Math.min(14, 9 + Math.floor(Math.max(0, lt - 0.5) * 3))
      label(x, 320, 1090, `HOUR ${h} OF 8`, pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Stressed. Unplugged | *the whole house.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, PLUG, { K: '#dfe7ff' }, 690 + i * 100, 820 + (i % 2) * 40, 22 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { rot: 0.4 * (i - 1) })
      label(x, 790, 1030, 'EVEN THE FRIDGE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 660, 'peace.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried in the shower. | *Then the car.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      if (lt < 1.0) for (let i = 0; i < 8; i++) { const ph = ((t * 1.4 + i / 8) % 1); x.save(); x.fillStyle = SKYB; x.fillRect(700 + i * 24, 640 + ph * 360, 6, 24); x.restore() }
      label(x, 790, 760, lt < 1.0 ? 'SHOWER' : 'CAR', 1, { size: 38, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, CAR, CAR_C, 790, 980, 24 * k)
      label(x, 790, 1150, 'NEXT: THE BUS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t019', key: 'F', accent: LAV, ending: 'callback',
  title: 'Stressed zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Deep breaths, | *everyone.*' },
  last: {
    text: 'Taurus is still | *in the bath.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 880, 260 * k, { mood: 'sleepy', seed: 9, glyph: false })
      bath(x, t, 540, 1180, 30, k, 0.8 + 0.3 * clamp(lt / 3))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
