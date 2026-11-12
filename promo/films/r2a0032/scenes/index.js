// r2a0032: star_advice ADVICE SOLO, "Taurus, your sign | to slow down." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one gag each.
//   0.0–3.6    "Taurus, your sign | *to slow down.*"
//   3.6–37.8   already slow? go slower (a turtle approves) · inhaled the pasta (taste it) · pushing through tired (stubborn can nap)
//              · saving the nice candle (light it) · booked every weekend (keep one empty) · scrolling at sunset (look up)
//              · watered every plant (sit with them) · rushing the hug (stay a while) · rushing home (take the long way)
//  37.8        GROUP ending: "Savour it, Taurus. | *All of it.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const MOSS = '#9fd86a', BROWN = '#8a4a2e'
// ── props
const TURTLE = [
  '...SSSSS......',
  '..SHSSSHS.....',
  '.SSSSHSSSS.KK.',
  'SSHSSSSSHSSKWK',
  'SSSSSHSSSSSKKK',
  'LLLLLLLLLLLLK.',
  '.LL....LL.....',
]
const TURTLE_C = { S: '#5fb05a', H: '#3c7a3a', K: '#b8d878', W: INK, L: '#8a6a3a' }
const PASTA = ['..YYYYYYYY..', '.YRYYYRYYYY.', 'YYYYRYYYYRYY', 'WWWWWWWWWWWW', '.WWWWWWWWWW.', '..WWWWWWWW..']
const PASTA_C = { Y: '#ffd88a', R: '#e23d4e', W: BONE }
const PILLOW = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLWLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', '.LLLLLLLLLLLL.']
const CANDLE = ['..F..', '.FOF.', '.FOF.', '..W..', 'CCCCC', 'CCCCC', 'CCCCC', 'CCCCC', 'CCCCC', 'GGGGG']
const CANDLE_OFF = ['.....', '.....', '.....', '..W..', 'CCCCC', 'CCCCC', 'CCCCC', 'CCCCC', 'CCCCC', 'GGGGG']
const CANDLE_C = { F: '#ffb34a', O: '#fff1b0', W: INK, C: PINK, G: GOLD }
const ROCK = ['...RRRRR...', '.RRRRRRRRR.', 'RRRHRRRRRRR', 'RRRRRRRHRRR', 'RRRRRRRRRRR', '.RRRRRRRRR.']
const ROCK_C = { R: '#7d86a8', H: '#9aa5c4' }
const PHONE = ['KKKKKKK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KSSSSSK', 'KKKWKKK']
const PHONE_C = { K: '#2a2350', S: '#3b3170', W: BONE }
const PLANT = ['....GG.G....', '..G.GGGG.G..', '.GGGG..GGGG.', '..GGGGGGGG..', '....GGGG....', '..TTTTTTTT..', '...TTTTTT...', '...TTTTTT...']
const PLANT_C = { G: '#7dd36b', T: '#c96a3a' }
const MUG = ['WWWWWWW..', 'WCCCCCWWW', 'WCCCCCW.W', 'WCCCCCW.W', 'WCCCCCWWW', 'WCCCCCW..', '.WWWWW...']

function sunset(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.beginPath(); x.rect(-220, -180, 440, 180); x.clip()
  const g = x.createLinearGradient(0, -180, 0, 0); g.addColorStop(0, '#ff8fb1'); g.addColorStop(1, '#ffb34a')
  x.fillStyle = g; x.fillRect(-220, -180, 440, 180)
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(0, 10, 90, 0, Math.PI * 2); x.fill()
  x.restore()
  x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = INK; x.fillRect(-226, -186, 452, 6); x.fillRect(-226, 0, 452, 10); x.fillRect(-226, -186, 6, 196); x.fillRect(220, -186, 6, 196); x.restore()
}

const S = 'taurus'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Already slow? | *Go even slower.*', mood: 'sleepy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TURTLE, TURTLE_C, 760 + lt * 40, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 760, 'impressive.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 42, tail: 'bl' })
      label(x, 790, 1140, 'TURTLE: OVERTAKING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MOSS, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Inhaled the pasta? | *Taste it this time.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PASTA, PASTA_C, 790, 880, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 660, 'BITE 1 OF MANY', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, font: MONO, weight: 700 })
      hearts(x, t, 790, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Pushing through tired? | *Stubborn can nap.*', mood: lt => lt > 1.1 ? 'sleepy' : 'squint', star: { x: -120, y: 30 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { L: LAV, W: BONE }, 450, 1010, 30 * pop01(t, P.t0 + 0.6, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'zzz', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 52, col: LAV, tail: 'bl' })
      label(x, 790, 1130, 'NAP: NON-NEGOTIABLE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MOSS, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saving the nice candle? | *Light it tonight.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const lit = lt > 0.9, k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (lit) { x.save(); x.globalAlpha = 0.35 * Math.min(1, (lt - 0.9) * 3); const g = x.createRadialGradient(790, 760, 10, 790, 760, 240); g.addColorStop(0, '#ffd88a'); g.addColorStop(1, 'rgba(255,216,138,0)'); x.fillStyle = g; x.fillRect(550, 520, 480, 480); x.restore() }
      drawBits(x, lit ? CANDLE : CANDLE_OFF, CANDLE_C, 790, 860, 30 * k, { sx: 1 + (lit ? 0.02 * Math.sin(t * 20) : 0) })
      label(x, 790, 1130, 'OCCASION: TODAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Booked every weekend? | *Keep one empty.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = BONE; x.fillRect(-162, -162, 324, 324)
        x.fillStyle = '#e23d4e'; x.fillRect(-162, -162, 324, 50)
        for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) {
          const free = i === 2 && j === 2 && lt > 1.0
          x.fillStyle = free ? GOLD : ['#9aa5c4', '#7d86a8', '#b7a6ff'][(i + j) % 3]; x.fillRect(-150 + i * 76, -100 + j * 64, 66, 56)
        }
        x.restore()
      }
      label(x, 790, 1120, 'SATURDAY: NOTHING ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MOSS, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Scrolling at sunset? | *Look up.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: lt => lt > 1.1 ? [1, -1] : [0, 1], star: ST,
    front(x, t, lt, P) {
      sunset(x, 770, 820, 0.9 * pop01(t, P.t0 + 0.9, 0.3, 2))
      const away = ease.inCubic(prog(lt, 0.8, 1.2))
      if (away < 1) drawBits(x, PHONE, PHONE_C, 470 + away * 80, 1010 + away * 200, 14 * pop01(t, P.t0 + 0.15, 0.3, 2), { alpha: 1 - away })
      label(x, 790, 1120, 'BETTER THAN THE FEED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Watered every plant? | *Sit with them too.*', mood: 'happy', look: [1, 0], star: { x: 0, y: 40, s: 240 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, PLANT, PLANT_C, [250, 390, 690, 830][i], 1000 + (i % 2) * 20, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      label(x, 540, 640, 'PLANT CLUB', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MOSS, font: MONO, weight: 700 })
      hearts(x, t, 540, 820, P.t0 + 1.5, { n: 4, life: 1.6, spread: 300, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Rushing the hug? | *Stay a while.*', mood: 'heart', star: { x: -90 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 650, 900, 240 * k, { mood: 'heart', look: [-1, 0], seed: 33, hops: [P.t0 + 0.4] })
      hearts(x, t, 560, 720, P.t0 + 0.9, { n: 6, life: 2, spread: 220, cell: 7, seed: 3 })
      label(x, 560, 1140, 'HUG: ONGOING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rushing home? | *Take the long way.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), d = ease.outCubic(prog(lt, 0.3, 1.6))
      if (k > 0.01) {
        x.save(); x.globalAlpha *= k; x.lineCap = 'round'
        const path = () => { x.beginPath(); x.moveTo(640, 1080); x.bezierCurveTo(1000, 1000, 600, 860, 900, 780); x.bezierCurveTo(1100, 700, 640, 620, 820, 560) }
        x.strokeStyle = INK; x.lineWidth = 34; path(); x.stroke()
        x.strokeStyle = '#e8c78a'; x.lineWidth = 22; x.setLineDash([900 * d, 2000]); path(); x.stroke(); x.setLineDash([])
        x.restore()
      }
      drawBits(x, PLANT, PLANT_C, 680, 760, 9 * pop01(t, P.t0 + 0.8, 0.3, 2))
      drawBits(x, PLANT, PLANT_C, 930, 960, 9 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1150, 'SCENIC ROUTE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0032', key: 'F', accent: MOSS, solo: 'taurus', ending: 'group',
  title: 'Taurus, your sign | *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Savour it, Taurus. | *All of it.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
