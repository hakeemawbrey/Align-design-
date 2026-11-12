// r2t0353: star_talk, SOLO, "Aquarians on a | first date *be like.*" (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way: nine first-date moments, each the most extreme (and lovable) Aquarius version. Ending: card.
//   0.0–3.6    "Aquarians on a | first date *be like.*"
//   3.6–37.8   nine cards: first question, thoughts on aliens? · brought a diagram of their theory · dessert first, for
//              science · arrived on a unicycle · read your birth chart before the date · two hours on the moon landing
//              · holding hands? processing · brought their robot · date two: a protest, romantic
//  37.8        "Weird? | *Wonderfully.*"
//  41.0        LESSON UNLOCKED: "Love an Aquarius? | Love *the weird.*"  MATCH: MADE
//  46.9        "Gemini said aliens. | *Instant match.*" over the match card: Aquarius + Gemini.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#6fc3ff', PAPER = '#fff4e2'
const L = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 30, font: MONO, weight: 700, ...o })

// ── props
const UFO = [
  '.....GGGG.....',
  '....GSSSSG....',
  '...GSSWSSSG...',
  '.MMMMMMMMMMMM.',
  'MMYMMYMMYMMYMM',
  '.MMMMMMMMMMMM.',
  '....L....L....',
  '...L......L...',
]
const UFO_C = { G: '#7dffb0', S: '#8fe3ff', W: '#ffffff', M: '#9aa5c4', Y: '#ffd23a', L: '#7dffb0' }
function board(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.03)
  x.fillStyle = INK; x.fillRect(-186, -136, 372, 272)
  x.fillStyle = PAPER; x.fillRect(-180, -130, 360, 260)
  x.strokeStyle = '#ff6b5a'; x.lineWidth = 6; x.beginPath()
  const n = Math.floor(clamp(lt / 1.6) * 7)
  const pts = [[-140, -90], [-20, -40], [100, -100], [40, 40], [-110, 70], [120, 90], [0, 0], [-140, -90]]
  for (let i = 0; i <= n; i++) i ? x.lineTo(...pts[i]) : x.moveTo(...pts[i]); x.stroke()
  x.fillStyle = '#6fc3ff'; for (const [a, b] of pts.slice(0, n + 1)) x.fillRect(a - 12, b - 12, 24, 24)
  x.restore()
}
const CAKE = [
  '.....R.....',
  '....WWW....',
  '..PPPPPPP..',
  '.PWPWPWPWP.',
  '.CCCCCCCCC.',
  '.CCCCCCCCC.',
  '.PPPPPPPPP.',
  '.CCCCCCCCC.',
  'DDDDDDDDDDD',
]
const CAKE_C = { R: '#ff4f86', W: '#ffffff', P: '#ff8fb1', C: '#c98a4e', D: '#d8dbe8' }
const UNI = [
  '.KKKKK.',
  '...K...',
  '...K...',
  '...K...',
  '.WWWWW.',
  'WW.K.WW',
  'W..K..W',
  'W.KKK.W',
  'W..K..W',
  'WW...WW',
  '.WWWWW.',
]
const UNI_C = { K: '#ff6b5a', W: '#9aa5c4' }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.5, 2.4, 4.4]) x.fillRect(Math.cos(a) * r * 0.4 - 7, Math.sin(a) * r * 0.4 - 7, 14, 14)
  x.restore()
}
const MOONB = [
  '...GGGGG...',
  '..GGgGGGG..',
  '.GGGGGGgGG.',
  'GgGGGGGGGGG',
  'GGGGGgGGGGG',
  'GGGGGGGGgGG',
  '.GGgGGGGGG.',
  '..GGGGGgG..',
  '...GGGGG...',
]
const MOONB_C = { G: '#d8dbe8', g: '#9aa5c4' }
const ROBOT = [
  '....R....',
  '....K....',
  '.KKKKKKK.',
  '.KSSSSSK.',
  '.KSYSYSK.',
  '.KSSSSSK.',
  '.KSMMMSK.',
  '.KKKKKKK.',
  'KK.GGG.KK',
  '...GGG...',
  '...K.K...',
  '..KK.KK..',
]
const ROBOT_C = { R: '#ff6b5a', K: '#6b62a8', S: '#9aa5c4', Y: '#7dffb0', M: INK, G: '#c3cbe0' }
function sign(x, t, cx, cy, text, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + 6 * Math.sin(t * 6)); x.rotate(0.04 * Math.sin(t * 3)); x.scale(k, k)
  x.fillStyle = '#c98a4e'; x.fillRect(-8, 0, 16, 220)
  x.restore()
  label(x, cx, cy + 6 * Math.sin(t * 6), text, k, { size: 34, bg: MINT, rot: 0.04 * Math.sin(t * 3), font: MONO, weight: 700 })
}

const CAMEOS = [
  // 1 · aliens
  { sign: 'aquarius', cap: 'First question: | *“Thoughts on aliens?”*', mood: lt => lt < 1.0 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, UFO, UFO_C, 800, 760 + 12 * Math.sin(t * 3), 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1060, 'SMALL TALK: SKIPPED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: LAV })
    } },
  // 2 · the diagram
  { sign: 'aquarius', cap: 'Brought a diagram | of *their theory.*', mood: lt => lt < 1.6 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.7],
    front(x, t, lt, P) {
      board(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1100, 'IT ALL CONNECTS', pop01(t, P.t0 + 1.7, 0.3, 2.2), { bg: GOLD })
    } },
  // 3 · dessert first
  { sign: 'aquarius', cap: 'Ordered dessert first. | *For science.*', mood: lt => lt < 1.2 ? 'wink' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'EXPERIMENT #4', pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: SKYB, size: 34 })
      if (lt > 1.4) L(x, 790, 1130, 'RESULT: DELICIOUS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: MINT })
    } },
  // 4 · the unicycle
  { sign: 'aquarius', cap: 'Arrived on | *a unicycle.*', mood: 'sparkle', look: [-1, 0], star: { x: 60, y: -110, s: 240 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      drawBits(x, UNI, UNI_C, 600, 1030 + 6 * Math.sin(t * 9), 22 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: 0.1 * Math.sin(t * 4) })
    },
    front(x, t, lt, P) { L(x, 300, 640, 'PARKING: EASY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: GOLD, rot: -0.06 }) } },
  // 5 · Align: read your chart before the date
  { sign: 'aquarius', cap: 'Read your birth chart | *before the date.*', mood: lt => lt < 1.2 ? 'squint' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 860, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 1110, 'so. your moon | is in Cancer.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  // 6 · the moon landing
  { sign: 'aquarius', cap: 'Two hours on | *the moon landing.*', mood: lt => lt < 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MOONB, MOONB_C, 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.2 })
      L(x, 790, 1060, lt < 1.4 ? 'SLIDE 3 OF 90' : 'DATE: STILL HERE', pop01(t, P.t0 + 0.7, 0.3, 2.2), { bg: lt < 1.4 ? BONE : PINK })
    } },
  // 7 · holding hands
  { sign: 'aquarius', cap: 'Holding hands? | *Processing…*', mood: lt => lt < 1.0 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const pct = Math.min(99, Math.floor(clamp((lt - 0.3) / 2) * 99))
      L(x, 790, 820, `LOADING… ${pct}%`, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: LAV, size: 36, rot: 0 })
      x.save(); x.fillStyle = INK; x.fillRect(630, 900, 320, 44); x.fillStyle = MINT; x.fillRect(636, 906, 308 * pct / 99, 32); x.restore()
      L(x, 790, 1060, 'FEELINGS: DETECTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: PINK, size: 28 })
    } },
  // 8 · the robot
  { sign: 'aquarius', cap: 'Brought their | *robot* along.', mood: lt => lt < 1.2 ? 'happy' : 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 4) })
      bubble(x, 800, 640, 'BEEP. | NICE TO MEET YOU', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 30, tail: 'bc', font: MONO, weight: 700 })
    } },
  // 9 · date two: a protest
  { sign: 'aquarius', cap: 'Date two? | A protest. *Romantic.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      sign(x, t, 800, 780, 'SAVE THE BEES', pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 800, 700, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0353', key: 'G', accent: ACC, solo: 'aquarius', ending: 'card',
  title: 'Aquarians on a | first date *be like.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'gemini', chip: "IT'S A MATCH" },
  group: { cap: 'Weird? | *Wonderfully.*', mood: 'sparkle' },
  lesson: { text: 'Love an Aquarius? | Love *the weird.*', chip: 'MATCH: MADE' },
  last: { text: 'Gemini said aliens. | *Instant match.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
