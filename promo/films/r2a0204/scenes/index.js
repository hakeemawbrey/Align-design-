// r2a0204: star_advice, ADVICE ROLL CALL, "Each sign vs. | *a creative block.*" (~57 s vertical, signs3kit social cut, lofi · E)
// Twelve signs in zodiac order, one warm, specific way each one gets unstuck, with a light visual gag. Ending: callback.
//   0.0–3.6    "Each sign vs. | *a creative block.*"
//   3.6–49.2   ♈ starts ten drafts, one will fly · ♉ bakes bread till the idea rises · ♊ talks it out with everyone
//              · ♋ old journals, finds the spark · ♌ dances it out · ♍ cleans the desk, clarity arrives · ♎ a museum
//              refills them · ♏ digs deep at 2 a.m., finds gold · ♐ a long walk, ideas walk back · ♑ shows up anyway,
//              ten minutes counts · ♒ flips it upside down, literally · ♓ daydreams, cries a little, paints a sky
//  49.2        "Blocks pass. | *The artist stays.*"
//  52.6        CALLBACK: "The bread? | *Also art.*"  Taurus is back with the loaf.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', CRUST = '#c97a3a', ORANGE = '#ffb34a', WOOD = '#8a5a3a'

const BREAD = ['...KKKKKKKK...', '..KCCCCCCCCK..', '.KCCLCCCLCCCK.', 'KCCCCLCCCLCCCK', 'KCCCCCCCCCCCCK', 'KCCCCCCCCCCCCK', '.KKKKKKKKKKKK.']
const BREAD_C = { K: INK, C: CRUST, L: '#ffd28a' }
const JOURNAL = ['KKKKKKKKKK', 'KRRRRRRRRK', 'KRYYYYYYRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KKKKKKKKKK']
const NUGGET = ['..YYY...', '.YYWYY..', 'YYYYYYY.', 'YYYYYYYY', '.YYYYYY.']
function easel(x, cx, cy, k, fn, { sy = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = WOOD; x.fillRect(-110, 80, 16, 170); x.fillRect(94, 80, 16, 170); x.fillRect(-8, -150, 16, 60)
  x.save(); x.scale(1, sy)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 230); x.fillStyle = BONE; x.fillRect(-142, -102, 284, 214)
  if (fn) fn()
  x.restore(); x.restore()
}
function frame(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -130, 320, 260); x.fillStyle = GOLD; x.fillRect(-152, -122, 304, 244); x.fillStyle = BONE; x.fillRect(-126, -96, 252, 192)
  if (fn) fn()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Starts *ten drafts.* | One will fly.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2); if (k <= 0.01) continue; x.save(); x.translate(720 + (i % 3) * 80, 760 + Math.floor(i / 3) * 170); x.rotate((i - 2.5) * 0.12); x.scale(k, k); x.fillStyle = INK; x.fillRect(-56, -76, 112, 152); x.fillStyle = BONE; x.fillRect(-50, -70, 100, 140); x.fillStyle = '#9aa5c4'; for (let j = 0; j < 4; j++) x.fillRect(-36, -46 + j * 26, 72, 6); x.restore() }
      const fly = prog(lt, 1.4, 2.4)
      if (fly > 0) label(x, 800 + fly * 60, 1100 - fly * 120, 'THIS ONE!', 1, { size: 34, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Bakes bread till | *the idea rises.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const rise = 1 + 0.35 * ease.outCubic(prog(lt, 0.4, 1.6))
      drawBits(x, BREAD, BREAD_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: rise })
      if (lt > 1.4) label(x, 790, 700, 'IDEA: READY', pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Talks it out | *with everyone.* It works.', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const qs = ['what if…', 'ooh, and…', 'WAIT. YES.']
      qs.forEach((q, i) => bubble(x, 790, 690 + i * 150, q, pop01(t, P.t0 + 0.3 + i * 0.45, 0.25, 2.2), { size: 38, col: [BONE, SKYB, GOLD][i], tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Rereads old journals. | *Finds the spark.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, JOURNAL, { K: INK, R: '#5a8ad8', Y: GOLD }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      sparkles(x, t, 790, 860, P.t0 + 1.2 * 1.29, 8, 190, 0.5)
      label(x, 790, 1130, 'AGE 12: GENIUS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Dances it out. | *Ideas follow the beat.*', mood: 'sparkle', star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6], squash: lt => 0.06 * Math.sin(lt * 9),
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 5, cell: 9, col: ORANGE, seed: 4 })
      label(x, 790, 700, 'IDEA #1', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
      label(x, 820, 800, 'IDEA #2', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Cleans the desk. | *Clarity arrives.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 980); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -16, 340, 32); x.fillStyle = WOOD; x.fillRect(-164, -10, 328, 20); x.fillRect(-150, 10, 16, 120); x.fillRect(134, 10, 16, 120)
        const mess = clamp(1 - (lt - 0.5) / 1.0)
        for (let i = 0; i < 5; i++) { x.globalAlpha = mess; x.fillStyle = [BONE, SKYB, PINK, GOLD, LAV][i]; x.fillRect(-140 + i * 58, -60 - (i % 2) * 30, 48, 44) }
        x.globalAlpha = 1 - mess; x.fillStyle = BONE; x.fillRect(-30, -56, 60, 40)
        x.restore()
      }
      if (lt > 1.5) sparkles(x, t, 790, 900, P.t0 + 1.5 * 1.29, 7, 180, 0.2)
      label(x, 790, 700, 'CLEAR DESK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'One museum trip. | *Beauty refills them.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      frame(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        x.fillStyle = '#8fe3ff'; x.fillRect(-126, -96, 252, 110); x.fillStyle = '#7ad35a'; x.fillRect(-126, 14, 252, 82)
        x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(60, -40, 30, 0, 7); x.fill()
        x.fillStyle = PINK; for (let i = 0; i < 5; i++) x.fillRect(-100 + i * 44, 30 + (i % 2) * 20, 16, 16)
      })
      label(x, 790, 1100, 'INSPIRED: FULL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Digs deep at 2 a.m. | *Finds gold.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      x.fillStyle = '#3a2a1a'; x.fillRect(640, 1000, 300, 150); x.fillStyle = INK; x.fillRect(640, 994, 300, 8)
      const up = ease.outBack ? ease.outBack(prog(lt, 1.2, 1.7)) : prog(lt, 1.2, 1.7)
      drawBits(x, NUGGET, { Y: GOLD, W: '#fff6c8' }, 790, lerp(1080, 880, up), 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (lt > 1.3) sparkles(x, t, 790, 880, P.t0 + 1.3 * 1.29, 8, 160, 0.3)
      label(x, 790, 700, '2:00 AM', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: '#ff6b8a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Takes a long walk. | *Ideas walk back.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.4) * 6)
      for (let i = 0; i < n; i++) { x.fillStyle = BONE; x.fillRect(560 + i * 60, 1110 - (i % 2) * 30, 22, 30) }
      bubble(x, 800, 760, 'oh! OH!', pop01(t, P.t0 + 1.6, 0.25, 2.4), { size: 52, col: '#c58bff', tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Shows up anyway. | *Ten minutes counts.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const s = Math.max(0, 600 - Math.floor(lt * 250))
      label(x, 790, 840, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 76, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 1060, 'ONE PAGE DONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Flips it upside down. | *Literally.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const flip = Math.cos(Math.PI * ease.inOutCubic(prog(lt, 0.6, 1.3)))
      easel(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        x.fillStyle = SKYB; x.beginPath(); x.moveTo(-90, 70); x.lineTo(0, -70); x.lineTo(90, 70); x.fill()
        x.fillStyle = PINK; x.beginPath(); x.arc(0, 20, 22, 0, 7); x.fill()
      }, { sy: flip })
      label(x, 790, 640, 'NEW ANGLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Daydreams, cries a bit, | *paints a sky.*', mood: 'heart', tears: lt => lt < 1.0 ? 2 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.5) / 1.2)
      easel(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        const g = x.createLinearGradient(0, -102, 0, 112); g.addColorStop(0, '#5a4ab8'); g.addColorStop(0.6, '#ff8fb1'); g.addColorStop(1, '#ffd28a')
        x.save(); x.beginPath(); x.rect(-142, -102, 284 * p, 214); x.clip(); x.fillStyle = g; x.fillRect(-142, -102, 284, 214); x.restore()
      })
      if (p >= 1) label(x, 790, 1130, 'MASTERPIECE', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0204', key: 'E', accent: GOLD, ending: 'callback',
  title: 'Each sign vs. | *a creative block.*',
  cameos: CAMEOS,
  group: { cap: 'Blocks pass. | *The artist stays.*' },
  last: {
    text: 'The bread? | *Also art.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      frame(x, 640, 1150, k * 1.05, () => { drawBits(x, BREAD, BREAD_C, 0, 10, 15, { sy: 1.3 }) })
      signChar(x, t, 'taurus', 340, 1200, 230 * pop01(t, t0 + 0.8, 0.45, 1.8), { mood: lt > 1.4 ? 'heart' : 'sparkle', seed: 23, hops: [t0 + 1.4] })
      sparkles(x, t, 640, 1150, t0 + 1.2, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
