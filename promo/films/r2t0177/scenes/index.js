// r2t0177: THE SIGNS AS… v3, SOLO (Cancer), "Cancers when you | leave early." (~43 s vertical, signs3kit social cut, music: lofi · E)
// Nine cards, one Cancer the whole way, each the most extreme version of a Cancer saying goodbye. Ending: group.
//   0.0–3.6    "Cancers when you | *leave early.*"
//   3.6–37.8   packed you leftovers (a tower) · walked you to the car, then the highway · texted "home yet?" before you
//              left · waved for forty-five minutes · packed you a sweater in July · "was it the dip?" · saved your seat
//              for next year · checked your chart: "needs rest", forgiven · forty photos waiting when you get home
//  37.8        GROUP (the ending): "Leave early. | Get *loved anyway.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'cancer', ST = { x: -170 }, RED = '#e23d4e'

const BOX = ['KKKKKKKKKK', 'WWWWWWWWWW', 'W........W', 'W..F..F..W', 'W........W', 'WWWWWWWWWW']
const PHONE = ['KKKKKKKK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KKKGGKKK', 'KKKKKKKK']
const PHONE_C = { K: '#2a2350', S: SKYB, G: '#6b62a8' }
const HAND = ['.F.F.F..', '.F.F.F..', '.F.F.F.F', '.FFFFF.F', 'FFFFFFFF', 'FFFFFFF.', '.FFFFF..', '..FFFF..']
const HAND_C = { F: '#ffd9b0' }
const SWEATER = ['..RR..RR..', 'RRRRWWRRRR', 'RRRRRRRRRR', 'RR.RWWR.RR', 'RR.RRRR.RR', 'RR.RWWR.RR', 'WW.RRRR.WW', '...RRRR...', '...WWWW...']
const SWEATER_C = { R: RED, W: '#fff4e2' }
const CHAIR = ['.BBBBBB.', '.BBBBBB.', '.B....B.', '.BBBBBB.', 'BBBBBBBB', 'B......B', 'B......B', 'B......B']
const CHAIR_C = { B: '#c98f2a' }
const PHOTO = ['KKKKKKKK', 'KSSSSSSK', 'KSSYSSSK', 'KSSSSSSK', 'KGGSGGGK', 'KGGGGGGK', 'KKKKKKKK']
const PHOTO_C = { K: BONE, S: SKYB, Y: GOLD, G: '#5fd068' }

function chartWheel(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  const W = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = W[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.42 - 6, Math.sin(a) * r * 0.42 - 6, 12, 12)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You said bye. | They packed *leftovers.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const cols = [PINK, MINT, SKYB, GOLD, LAV, '#ff9a4a']
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2); if (k > 0.01) drawBits(x, BOX, { K: cols[i], W: '#fff4e2', F: '#c98f2a' }, 790 + (i % 2 ? 8 : -8), 1120 - i * 82, 15 * k) }
      label(x, 790, 600, 'FOR THE ROAD', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Walked you to the car. | Then *the highway.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(110, 1130, 860, 60); x.fillStyle = '#4a4470'; x.fillRect(114, 1134, 852, 52)
      x.fillStyle = GOLD; for (let i = 0; i < 6; i++) x.fillRect(130 + ((i * 160 - t * 300) % 960 + 960) % 960 * 0.88, 1156, 70, 8)
      const n = Math.floor(clamp((lt - 0.4) / 1.6) * 12)
      label(x, 790, 760, `MILE ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 48, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'almost there!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Texted “home yet?” | *Before you left.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 790, 680, 'home yet?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 790, 1130, 'YOU: STILL HERE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Waved goodbye | for *forty-five minutes.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, HAND, HAND_C, F.x + 160, F.cy - 70, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.35 * Math.sin(t * 9) })
      const m = Math.floor(clamp((lt - 0.3) / 1.8) * 45)
      label(x, 790, 1060, `WAVING: ${m} MIN`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 700, 'byeee!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, tail: 'bl' })
    } },
  { sign: S, cap: 'Packed you a sweater. | *It’s July.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SWEATER, SWEATER_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 790, 1110, 'it gets chilly!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 640, 'JULY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked if it was | *something they said.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'was it the dip?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      bubble(x, 800, 900, 'it was the dip.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      label(x, 790, 1110, 'OVERTHINKING…', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saved your seat. | *For next year.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'RESERVED: YOU', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1150, 'SEE YOU NEXT JUNE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked your chart. | “Needs rest.” *Forgiven.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      chartWheel(x, 790, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1090, 'CHART SAYS: REST', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 370, 780, P.t0 + 1.6, { n: 4, life: 1.6, spread: 150, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'You got home. | *Forty photos* waiting.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.6) * 8)
      for (let i = 0; i < n; i++) drawBits(x, PHOTO, PHOTO_C, 720 + (i % 3) * 80, 770 + Math.floor(i / 3) * 120, 15, { rot: Math.sin(i * 2.1) * 0.25 })
      label(x, 790, 1130, `PHOTOS: ${Math.min(40, n * 5)}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0177', key: 'E', accent: SKYB, solo: S, ending: 'group',
  title: 'Cancers when you | *leave early.*',
  cameos: CAMEOS,
  group: {
    cap: 'Leave early. | Get *loved anyway.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
