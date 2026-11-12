// r2t0300: star_talk, SOLO, "Never race | *an Aries.*" (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine races nobody else knew were races, each the most extreme Aries version. Ending: lesson.
//   0.0–3.6    "Never race | *an Aries.*"
//   3.6–37.8   nine cards: raced you to the door, won by a week · walking to lunch, sprinting · board game night, rematch #9
//              · dinner isn't a race, won anyway · "first one up", never slept · matched, messaged before it loaded
//              · beat the elevator, forty floors of stairs · lost once, trained eleven months · after a fight, says sorry first
//  37.8        "Always first. | *Always fired up.*"
//  41.0        LESSON UNLOCKED: "Run with an Aries. | *Never against.*"  STATUS: TEAMMATE
//  46.9        "Fine, you win. | Aries: *“Rematch.”*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff6b5a', RED = '#e23d4e', CREAM = '#fff4e2'
const ST = { x: -200 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const FLAG = ['KWKWKW', 'WKWKWK', 'KWKWKW', 'WKWKWK', 'P.....', 'P.....', 'P.....', 'P.....', 'P.....', 'P.....']
const PLATE = ['..WWWWW..', '.WSSSSSW.', 'WSSSSSSSW', '.WSSSSSW.', '..WWWWW..']
const DUMBBELL = ['KK......KK', 'KKKKKKKKKK', 'KK......KK']
const STAIRS = ['.......SS', '.....SSSS', '...SSSSSS', '.SSSSSSSS', 'SSSSSSSSS']

function speed(x, t, cx, cy, n = 5) {
  x.save(); x.fillStyle = 'rgba(239,230,214,0.6)'
  for (let i = 0; i < n; i++) { const w = 80 + ((i * 37) % 60), o = ((t * 900 + i * 130) % 260); x.fillRect(cx - o - w, cy - 80 + i * 36, w, 8) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Raced you to the door. | *Won by a week.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, W: BONE, P: '#9aa5c4' }, 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1080, 'TIME: −7 DAYS', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 36)
      sparkles(x, t, 800, 760, P.t0 + 0.9, 7, 150, 0.4)
    } },
  { sign: 'aries', cap: 'Walking to lunch? | *They’re sprinting.*', mood: 'wide', star: { x: -120 }, squash: lt => 0.05 * Math.sin(lt * 30),
    back(x, t, lt, P) { speed(x, t, 380, 880) },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'it’s a walk!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 1050, 'ARRIVED: 11:02', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
      L(x, 790, 1150, 'LUNCH: AT NOON', pop01(t, P.t0 + 1.8, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: 'aries', cap: 'Won board game night. | *Demanded a rematch.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.rotate(-0.1); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -120, 340, 240)
        for (let i = 0; i < 8; i++) for (let j = 0; j < 6; j++) { x.fillStyle = (i + j) % 2 ? CREAM : ACC; x.fillRect(-162 + i * 40.5, -112 + j * 37.3, 40.5, 37.3) }
        x.restore()
      }
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.2) * 8)
      if (lt > 0.6) L(x, 790, 680, `REMATCH #${n}`, 1, GOLD, 0.04, 38)
      bubble(x, 790, 1110, 'again.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Dinner isn’t a race. | Aries *won it anyway.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: BONE, S: '#e8e0ff' }, 790, 900, 34 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt < 0.8) { x.fillStyle = '#ffb34a'; x.fillRect(730, 880, 120, 40) }
      L(x, 790, 700, lt < 0.8 ? 'GO?' : 'PLATE: CLEAN', 1, lt < 0.8 ? BONE : MINT, 0.04, 36)
      L(x, 790, 1080, 'TIME: 4 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'aries', cap: '“First one up wins”? | *Never went to sleep.*', mood: 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(790, 760); x.scale(k, k); x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(0, 0, 80, 0, 7); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(34, -20, 70, 0, 7); x.fill(); x.restore() }
      L(x, 790, 940, 'TIME: 3:12 AM', pop01(t, P.t0 + 0.7, 0.3, 2), BONE, 0.04, 34)
      L(x, 790, 1080, 'STILL WINNING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'aries', cap: 'Got a match. | Messaged *before it loaded.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -220, 260, 440); x.fillStyle = '#2a2350'; x.fillRect(-120, -210, 240, 420); x.fillStyle = '#140c30'; x.fillRect(-106, -180, 212, 360)
        x.restore()
      }
      bubble(x, 790, 760, 'hi!!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: ACC, tail: 'br' })
      bubble(x, 790, 880, 'race you to a date?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 26, col: ACC, tail: 'br' })
      L(x, 790, 1030, 'LOADING MATCH…', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 28)
    } },
  { sign: 'aries', cap: 'Raced the elevator. | Took *all forty floors.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [0.4, 0.7, 1.0, 1.3],
    front(x, t, lt, P) {
      drawBits(x, STAIRS, { S: '#9aa5c4' }, 800, 900, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const f = Math.min(40, 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 39))
      L(x, 790, 680, `FLOOR ${f}`, pop01(t, P.t0 + 0.3, 0.3, 2), f === 40 ? MINT : BONE, 0.04, 40)
      L(x, 790, 1100, 'ELEVATOR: FLOOR 3', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: 'aries', cap: 'Lost one race. | Trained *eleven months.*', mood: 'squint', look: [1, 0], star: ST, squash: lt => 0.06 * Math.sin(lt * 12),
    front(x, t, lt, P) {
      drawBits(x, DUMBBELL, { K: '#c9d3e8' }, 790, 800 - Math.abs(Math.sin(lt * 5)) * 60, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const m = 1 + Math.floor(clamp((lt - 0.4) / 1.3) * 10)
      L(x, 790, 980, `MONTH ${m} OF 11`, pop01(t, P.t0 + 0.4, 0.3, 2), ACC, 0.04, 34)
      L(x, 790, 1110, 'REMATCH: BOOKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'aries', cap: 'After a fight? | Says *sorry first.* Fast.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [0.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'SORRY! | I’M SORRY!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: ACC, tail: 'bl' })
      L(x, 790, 920, 'PEACE: RECORD TIME', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 30)
      hearts(x, t, 380, 800, P.t0 + 1.4, { n: 6, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0300', key: 'F', accent: ACC, solo: 'aries', ending: 'lesson',
  title: 'Never race | *an Aries.*',
  cameos: CAMEOS,
  group: { cap: 'Always first. | *Always fired up.*', mood: 'sparkle' },
  lesson: { text: 'Run with an Aries. | *Never against.*', chip: 'STATUS: TEAMMATE' },
  last: { text: 'Fine, you win. | Aries: *“Rematch.”*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
