// r2a0201: star_advice, ADVICE SOLO, "Signs an Aries | *needs a break.*" (~47 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine signs an Aries is running on empty, each with a warm reframe and one gag. Ending: group.
//   0.0–3.6    "Signs an Aries | *needs a break.*"
//   3.6–37.8   nine cards: three projects before breakfast · four hours of sleep (battery 4%) · racing the microwave
//              · walks turned into races · said yes to everyone · yelled at the printer · every day on the calendar is red
//              · lunch in ninety seconds · and finally: allowed to just rest (blanket, NO GOAL TODAY)
//  37.8        GROUP (the ending): "Rest isn't losing. | It's *refueling.*"  Aries comes back, rested and glowing.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', CORAL = '#ff8a5a', GREEN = '#3fcf7a', SLATE = '#9aa5c4'

// a pixel battery, level 0…1, colour by level
function battery(x, cx, cy, k, level, { w = 260, h = 120, text = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillRect(w / 2 + 8, -h / 4, 22, h / 2)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = level < 0.2 ? RED : level < 0.6 ? GOLD : GREEN; x.fillRect(-w / 2 + 8, -h / 2 + 8, Math.max(6, (w - 16) * level), h - 16)
  if (text) { x.fillStyle = BONE; x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${Math.round(level * 100)}%`, 0, 2) }
  x.restore()
}
const MICRO = ['KKKKKKKKKKKKKKKK', 'KSSSSSSSSSSSSSSK', 'KSGGGGGGGGGKSSSK', 'KSGYYYYYYYYGKDSK', 'KSGYYYYYYYYGKSSK', 'KSGYYYYYYYYGKBSK', 'KSGYYYYYYYYGKBSK', 'KSGGGGGGGGGGKBSK', 'KSSSSSSSSSSSSSSK', 'KKKKKKKKKKKKKKKK']
const MICRO_C = { K: INK, S: '#d8dbe8', G: '#6b7290', Y: '#ffe7a8', D: '#2fc79a', B: '#9aa5c4' }
const PRINTER = ['....WWWWWW....', '....WKKKKW....', '....WWWWWW....', 'KKKKKKKKKKKKKK', 'KSSSSSSSSSSRSK', 'KSSSSSSSSSSSSK', 'KKKKKKKKKKKKKK', 'KSWWWWWWWWWWSK', 'KKKKKKKKKKKKKK']
const PRINTER_C = { K: INK, S: '#c9c9d8', W: '#fff4e2', R: RED }
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', '.BBBBBBBBBB.']
const SANDWICH_C = { B: '#e0a85a', G: '#6fd36f', R: '#ff6b5a', Y: '#ffd23a' }
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWLWWWWWWLWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']

const CAMEOS = [
  { sign: 'aries', cap: 'Three new projects? | *Pick one.* Breathe.', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const names = ['START A BAND', 'LEARN KOREAN', 'BUILD A SHED']
      names.forEach((n, i) => label(x, 790, 700 + i * 120, n, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2.2), { size: 32, bg: [CORAL, SKYB, GOLD][i], rot: (i - 1) * 0.06, font: MONO, weight: 700 }))
      label(x, 790, 1100, 'BEFORE 8 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Four hours of sleep? | *Your body* noticed.', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      battery(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04 + 0.02 * Math.sin(t * 6))
      bubble(x, 790, 1040, 'still going!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Racing the *microwave?* | It can wait.', mood: lt => lt > 1.3 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MICRO, MICRO_C, 790, 880, 20 * k)
      if (k > 0.5) { x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; const s = Math.max(0, 30 - Math.floor(lt * 2)); x.fillText(`0:${String(s).padStart(2, '0')}`, 750, 880) }
      bubble(x, 800, 660, 'COME ON!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: CORAL, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Every walk is a *race.* | Try a stroll.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? INK : BONE; x.fillRect(640 + i * 50, 1100, 50, 24); x.fillStyle = i % 2 ? BONE : INK; x.fillRect(640 + i * 50, 1124, 50, 24) } x.restore() }
    },
    front(x, t, lt, P) {
      label(x, 790, 720, 'STROLL: 1ST PLACE', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 930, 'it was a | dog walk', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
    } },
  { sign: 'aries', cap: 'Said yes to everyone? | *No* is okay too.', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const asks = ['help me move?', 'cover my shift?', 'plan the party?']
      asks.forEach((a, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.3, 0.25, 2.2); bubble(x, 740, 660 + i * 130, a, k, { size: 30, tail: 'br' }); if (lt > 0.4 + i * 0.3) label(x, 895, 690 + i * 130, 'YES', k, { size: 24, bg: MINT, rot: 0.1, font: MONO, weight: 700 }) })
      label(x, 790, 1100, 'NEW WORD: “NO”', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Yelled at the printer? | You\'re *just tired.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PRINTER, PRINTER_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? 0.03 * Math.sin(t * 30) : 0 })
      bubble(x, 790, 660, 'WHY?!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 52, col: CORAL, tail: 'bl' })
      label(x, 800, 1110, 'PAPER JAM (YOU)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Every day is booked? | Add *one blank one.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(775, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = BONE; x.fillRect(-162, -142, 324, 284)
        for (let d = 0; d < 14; d++) { const c = d % 7, r = Math.floor(d / 7); const free = d === 12 && lt > 1.2; x.fillStyle = free ? SKYB : RED; x.fillRect(-150 + c * 43, -110 + r * 120, 36, 100) }
        x.restore()
      }
      label(x, 770, 1110, 'SATURDAY: NOTHING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Lunch in *ninety seconds?* | Sit. Taste it.', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 700, (q => `${Math.floor(q / 60)}:${String(q % 60).padStart(2, '0')}`)(Math.min(90, Math.floor(lt * 40))), pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 48, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1090, 'oh, it has pickles', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'You\'re allowed | to *just rest.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { W: '#fff4e2', L: LAV }, 370, 1010, 22 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 1.8)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(200, 960, 340, 170); x.fillStyle = PINK; x.fillRect(208, 968, 324, 154); x.fillStyle = '#ffb3cb'; for (let i = 0; i < 4; i++) x.fillRect(208 + i * 84, 968, 40, 154); x.restore() }
      label(x, 790, 780, 'NO GOAL TODAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.6, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0201', key: 'D', accent: CORAL, solo: 'aries', ending: 'group',
  title: 'Signs an Aries | *needs a break.*',
  cameos: CAMEOS,
  group: {
    cap: 'Rest isn\'t losing. | It\'s *refueling.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
