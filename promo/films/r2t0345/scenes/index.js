// r2t0345: star_talk, BELIKE, "Zodiacs leaving | vacation be like." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself on the last day of vacation.
//   0.0–3.6    "Zodiacs leaving | vacation *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ six activities before checkout · ♉ tried to pack the hotel pillow · ♊ befriended the whole resort (group chat: 48)
//              · ♋ hugged the hotel, the actual building · ♌ tan check, every hour · ♍ packed three days early
//              · ♎ souvenirs for everyone, even the dentist · ♏ already booked the same room for next year
//              · ♐ extended the trip, indefinitely · ♑ answered emails from a pool float · ♒ joined the dolphins
//              · ♓ waved bye to the ocean, the ocean waved back
//  49.2        group ending: "Vacation’s over. | *Nobody’s okay.*" while the sun sets on CHECKOUT: 11 A.M.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', PAPER = '#fff4e2', SEA = '#4fb3ff'

// ── props
const CASE = [
  '....KKKK....',
  '....K..K....',
  'CCCCCCCCCCCC',
  'CSSCCCCCCSSC',
  'CCCCCCCCCCCC',
  'CCCCCCCCCCCC',
  'CCCCCCCCCCCC',
  'CSSCCCCCCSSC',
  'CCCCCCCCCCCC',
  '.K........K.',
]
const caseC = (c = '#ff8f7a') => ({ K: INK, C: c, S: GOLD })
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const PILLOW_C = { W: PAPER }
const HOTEL = [
  '..RRRRRRRRR..',
  '.RRRRRRRRRRR.',
  'WWWWWWWWWWWWW',
  'WBWBWBWBWBWBW',
  'WWWWWWWWWWWWW',
  'WBWBWBWBWBWBW',
  'WWWWWWWWWWWWW',
  'WBWBWDDDWBWBW',
  'WWWWWDDDWWWWW',
]
const HOTEL_C = { R: RED, W: '#fff4e2', B: SKYB, D: WOOD }
const FLOAT = [
  '..PPPPPPPPP..',
  '.PPWPPPPPWPP.',
  'PPP.......PPP',
  'PP.........PP',
  'PPP.......PPP',
  '.PPWPPPPPWPP.',
  '..PPPPPPPPP..',
]
const FLOAT_C = { P: PINK, W: PAPER }
const LAPTOP = [
  '.KKKKKKKKK.',
  '.KSSSSSSSK.',
  '.KSWWWWWSK.',
  '.KSSSSSSSK.',
  '.KKKKKKKKK.',
  'GGGGGGGGGGG',
]
const LAPTOP_C = { K: '#2a2350', S: '#8fe3ff', W: PAPER, G: '#9aa5c4' }
const DOLPHIN = [
  '.......BB....',
  '......BBB....',
  '..BBBBBBBBB..',
  '.BBBBBBBBBBBB',
  'BBKBBBBBBBB.B',
  'BBBBWWWWBB...',
  '.BB.WWWW.....',
]
const DOLPHIN_C = { B: '#6fc3ff', K: INK, W: '#c9e9ff' }

/** a card with ink border and drop shadow; fn draws inside (origin at the card's centre) */
function card(x, cx, cy, w, h, k, rot, bg, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
/** a strip of sea along the bottom of the panel */
function sea(x, t, y0 = 1110) {
  x.save(); x.fillStyle = 'rgba(79,179,255,0.35)'; x.fillRect(110, y0, 860, 1225 - y0)
  x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 40; i++) { const X = 110 + i * 21.5, Y = y0 + 6 * Math.sin(i * 0.9 + t * 3); i ? x.lineTo(X, Y) : x.moveTo(X, Y) }
  x.stroke(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Six activities | *before checkout.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const A = ['SURF', 'KAYAK', 'ZIPLINE', 'SNORKEL', 'HIKE', 'SALSA']
      card(x, 800, 880, 300, 400, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, PAPER, () => {
        txt(x, 'TODAY', 0, -160, 30, INK, MONO, 700)
        A.forEach((a, i) => { txt(x, a, -110, -100 + i * 50, 28, '#6b62a8', MONO, 700, 'left'); if (lt > 0.4 + i * 0.25) txt(x, '✓', 110, -100 + i * 50, 34, '#2fc79a') })
      })
      label(x, 790, 1130, 'CHECKOUT: 11:00', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Tried to pack | *the hotel pillow.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CASE, caseC('#ffb34a'), 800, 1010, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PILLOW, PILLOW_C, 800, 880 + 8 * Math.sin(t * 6), 20 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.12 })
      bubble(x, 780, 680, 'it’s mine now.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Befriended | *the entire resort.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(48, Math.max(2, Math.floor(lt * 24)))
      label(x, 790, 800, `GROUP CHAT: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'love u all!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, col: PINK, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Hugged the hotel. | *The actual building.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: 40 }, hops: [1.0],
    back(x, t, lt, P) {
      drawBits(x, HOTEL, HOTEL_C, 560, 860, 34 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      hearts(x, t, 600, 760, P.t0 + 1.2, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 2 })
      label(x, 560, 1140, 'BYE, HOME ♥', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Tan check. | *Every hour.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const p = Math.min(98, 60 + Math.floor(lt * 16))
      card(x, 800, 880, 300, 160, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, '#2a2350', () => {
        txt(x, 'TAN LEVEL', 0, -40, 30, BONE, MONO, 700)
        x.fillStyle = INK; x.fillRect(-120, 0, 240, 40); x.fillStyle = '#ffb34a'; x.fillRect(-116, 4, 232 * p / 100, 32)
      })
      label(x, 800, 1070, `${p}% GOLDEN`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Packed and ready. | *Three days early.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CASE, caseC('#2fc79a'), 800, 980, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 720, 'READY SINCE MONDAY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Souvenirs for everyone. | *Even the dentist.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const N = ['MOM', 'BOSS', 'NEIGHBOUR', 'DENTIST']
      N.forEach((n, i) => card(x, 720 + (i % 2) * 170, 760 + Math.floor(i / 2) * 200, 150, 130, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), (i % 2 ? 0.06 : -0.06), [PINK, GOLD, MINT, LAV][i], () => {
        x.fillStyle = INK; x.fillRect(-6, -65, 12, 130); x.fillRect(-75, -6, 150, 12)
        x.fillStyle = PAPER; x.fillRect(-70, 22, 140, 36); txt(x, n, 0, 40, n.length > 6 ? 20 : 26, INK, MONO, 700)
      }))
    } },
  { sign: 'scorpio', cap: 'Already booked | *the same room. Next year.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 800, 880, 300, 220, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, PAPER, () => {
        x.fillStyle = '#c97bff'; x.fillRect(-150, -110, 300, 56); txt(x, 'BOOKED ✓', 0, -82, 30, PAPER, MONO, 700)
        txt(x, 'ROOM 7', 0, -6, 44, INK)
        txt(x, 'SAME DATES', 0, 60, 26, '#6b62a8', MONO, 700)
      })
      bubble(x, 790, 650, 'see you soon.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Extended the trip. | *Indefinitely.*', mood: 'sparkle', look: [-1, 0], star: { x: 150 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const d = lt > 1.0
      label(x, 330, 800, d ? 'CHECKOUT: ???' : 'CHECKOUT: TODAY', pop01(t, P.t0 + 0.2, 0.3, 2) * (d ? pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.4) : 1), { size: 40, bg: d ? GOLD : BONE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 1000, 'one more week. | or ten.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Answered emails | *from a pool float.*', mood: lt => lt > 1.2 ? 'neutral' : 'squint', look: [-1, 0], star: { x: 160, y: -20 },
    back(x, t, lt, P) {
      sea(x, t, 1060)
      drawBits(x, FLOAT, FLOAT_C, 700, 1080 + 6 * Math.sin(t * 2), 26 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 330, 870, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 330, 680, 'INBOX: 0 ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Joined the dolphins. | *Not coming back.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    back(x, t, lt, P) { sea(x, t) },
    front(x, t, lt, P) {
      const j = Math.sin(clamp((lt - 0.3) / 1.2) * Math.PI)
      drawBits(x, DOLPHIN, DOLPHIN_C, 800, 1090 - 200 * j, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.5, -0.5, clamp((lt - 0.3) / 1.2)) })
      bubble(x, 790, 660, 'they get me.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Waved bye to the ocean. | *It waved back.*', mood: lt => lt < 1.0 ? 'happy' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      sea(x, t, 1040)
      const w = ease.outCubic(prog(lt, 1.0, 1.4))
      if (w > 0) { x.save(); x.fillStyle = 'rgba(200,236,255,0.9)'; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(680 + i * 70, 1040, 36 * w * (1 + 0.15 * Math.sin(t * 5 + i)), Math.PI, 0); x.fill() } x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'bye, ocean…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      bubble(x, 800, 900, 'bye bye!', pop01(t, P.t0 + 1.1 * 1.29, 0.25, 2.4), { size: 46, col: SKYB, tail: 'bc' })
      hearts(x, t, 820, 900, P.t0 + 1.4, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0345', key: 'F', accent: '#ffb34a', ending: 'group',
  title: 'Zodiacs leaving | vacation *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Vacation’s over. | *Nobody’s okay.*',
    draw(x, t, lt) {
      const s = ease.inOutQuad(prog(lt, 1.0, 4.5))
      const k = pop01(t, t - lt + 0.8, 0.4, 2)
      if (k > 0.01) { x.save(); x.translate(880, lerp(700, 790, s)); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffb34a'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(-16, -16, 30, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 330, 700, 'CHECKOUT: 11 A.M.', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
