// r2a0022: ADVICE SOLO, "Capricorn, here's | your Sunday reset." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Capricorn truth + a warm reframe, one gag each.
//   0.0–3.6    "Capricorn, here’s | your *Sunday reset.*"
//   3.6–37.8   checked work email (close the laptop) · a to-do list for resting (just rest) · the long bath, no timer
//              · call the friend who makes you laugh · fill the fridge, future you says thanks · the week counts
//              · lie on the floor, a valid activity · the plant got water, so do you · Monday can wait till Monday
//  37.8        GROUP ENDING: "Reset complete. | *Go easy, goat.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#2fc79a', RED = '#e23d4e', BROWN = '#8a4a2e'

// ── props
function laptop(x, cx, cy, k, shut) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 60, 340, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-164, 64, 328, 20)
  const h = 200 * (1 - shut)
  if (h > 4) {
    x.fillStyle = INK; x.fillRect(-150, 60 - h - 8, 300, h + 8); x.fillStyle = '#6fc3ff'; x.fillRect(-140, 60 - h, 280, h - 8)
    if (h > 120) { x.fillStyle = '#fff4e2'; for (let i = 0; i < 4; i++) x.fillRect(-110, 60 - h + 30 + i * 36, 220, 16) }
  }
  x.restore()
}
function tub(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 9; i++) { const bx = -150 + i * 38, by = -60 - 20 * Math.abs(Math.sin(i * 1.7 + t * 2)); x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(bx, by, 28, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.fillRect(-200, -50, 400, 150); x.fillStyle = '#fff4e2'; x.fillRect(-192, -42, 384, 134)
  x.fillStyle = INK; x.fillRect(-170, 100, 30, 40); x.fillRect(140, 100, 30, 40)
  x.restore()
}
const PHONE = ['KKKKKKKK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KKKGGKKK', 'KKKKKKKK']
const FRIDGE = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWWWWWGK', 'KWWWWWWWWK', 'KKKKKKKKKK', 'KWWWWWWWWK', 'KWWWWWWWGK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const PLANT = ['..G.G..', '.GGGGG.', 'GG.G.GG', '...G...', '.TTTTT.', '.TTTTT.', '..TTT..']
const GLASS = ['K.....K', 'KSSSSSK', 'KSWSSSK', 'KSSSSSK', 'KSSSSSK', '.KKKKK.']
const STICKER = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY']
function strike(x, cx, cy, w, k) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'
  x.beginPath(); x.moveTo(cx - w / 2, cy + 8); x.lineTo(cx - w / 2 + w * k, cy - 8); x.stroke(); x.restore()
}

const S = 'capricorn'
const CAMEOS = [
  { sign: S, cap: 'Checking work email? | *Close the laptop.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      laptop(x, 790, 940, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outBounce ? ease.outBounce(prog(lt, 1.0, 1.4)) : ease.outCubic(prog(lt, 1.0, 1.4)))
      label(x, 790, 1110, 'INBOX: MONDAY’S PROBLEM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A to-do list for resting? | *Just rest.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -170, 320, 340); x.fillStyle = '#fff4e2'; x.fillRect(-150, -160, 300, 320)
        x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.fillText('REST PLAN', -125, -115)
        ;['1. relax', '2. relax more', '3. report'].forEach((s, i) => { x.font = `700 36px ${INTER}`; x.fillText(s, -125, -40 + i * 70) })
        x.restore()
      }
      strike(x, 790, 860, 320, ease.outCubic(prog(lt, 1.0, 1.3)))
      label(x, 790, 1100, 'JUST REST', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: TEAL, rot: -0.04 })
    } },
  { sign: S, cap: 'Take the long bath. | *No timer.*', mood: 'sleepy', look: [1, 0], star: { x: -60, y: -40, s: 260 }, hops: [],
    front(x, t, lt, P) {
      tub(x, 480, 1040, pop01(t, P.t0 + 0.15, 0.3, 2), t)
      label(x, 800, 700, 'TIMER: OFF', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Call the friend | who *makes you laugh.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: '#2a2350', S: SKYB, G: '#6b62a8' }, 760, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      bubble(x, 800, 660, 'HAHAHA', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 58, tail: 'bl' })
    } },
  { sign: S, cap: 'Stock the fridge. | *Future you* says thanks.', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FRIDGE, { K: INK, W: '#e8f0ff', G: '#9aa5c4' }, 790, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'MEALS: 5 OF 5', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'thanks, me!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'You did a lot. | *Let it count.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, STICKER, { Y: GOLD }, 790, 840, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 2) })
      label(x, 790, 1080, 'WEEK: HANDLED', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: TEAL, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 840, P.t0 + 1.2, 7, 180, 0.3)
    } },
  { sign: S, cap: 'Lie on the floor. | It’s *a valid activity.*', mood: 'sleepy', look: [0, -1], star: { x: -170, y: 70 },
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.15, 0.3, 2); x.fillStyle = '#c96a3a'; x.fillRect(150, 1050, 520, 40); x.fillStyle = INK; x.fillRect(150, 1086, 520, 8); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'FLOOR TIME', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 42, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 900, '20 MIN ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The plant got water. | *So should you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, { G: '#5fd068', T: '#c96a3a' }, 700, 960, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, GLASS, { K: INK, S: SKYB, W: '#ffffff' }, 880, 990, 24 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 700, 'HYDRATED: BOTH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Monday can wait | *till Monday.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 820, 'MONDAY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: BONE, rot: -0.03 })
      label(x, 800, 960, 'NOT YET', pop01(t, P.t0 + 1.1, 0.35, 2.8), { size: 52, bg: RED, color: BONE, rot: 0.08, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0022', key: 'F', accent: TEAL, solo: 'capricorn', ending: 'group',
  title: 'Capricorn, here’s | your *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Reset complete. | *Go easy, goat.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
