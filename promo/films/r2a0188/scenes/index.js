// r2a0188: star_advice, ADVICE SOLO (Virgo), "Virgo, it's okay | to start over." (~45 s vertical, signs3kit social cut,
// music: lofi · C). Nine cards: a relatable Virgo truth + a warm reframe, one light gag each. Ending: callback.
//   0.0–3.6    "Virgo, it’s okay | *to start over.*"
//   3.6–37.8   plan changed? new plan, gently (PLAN B, with a doodle) · messy drafts still count (paper balls pile up)
//              · restarting is editing (v2 stamp) · the sourdough flopped, bake again · new desk, same brilliant you
//              · lost the streak? day one is still a day · unravelled the scarf, the yarn forgives you
//              · erase it, the page doesn't mind · even the moon starts over every month
//  37.8        "Fresh start. | *Still you.*"
//  41.2        callback: "Loaf number two? | *Didn’t measure.*"  The sourdough is back, tall and golden.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const S = 'virgo', ACC = '#7dffb0', L = { x: -160 }
const FLAT = ['..BBBBBBBB..', '.BBbBBBBbBB.', 'BBBBBBBBBBBB']
const LOAF = ['....BBBB....', '..BBBBBBBB..', '.BBBbBBbBBB.', 'BBBBBBBBBBBB', 'BBbBBBBBBbBB', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']
const LOAF_C = { B: '#d89a4a', b: '#f2d08a' }
const PAPER = ['.WWW.', 'WWwWW', 'WwWWW', 'WWWwW', '.WWW.']
const BOX = ['BBBBBBBBBBBB', 'BbbbbTTbbbbB', 'BBBBBTTBBBBB', 'BbbbbbbbbbbB', 'BbbbbbbbbbbB', 'BbbbbbbbbbbB', 'BBBBBBBBBBBB']
const BOX_C = { B: '#c98f4a', b: '#e0b070', T: '#f2e0b0' }
const YARN = ['..YYYY..', '.YyYYyY.', 'YYYyYYYY', 'YyYYYyYY', 'YYYyYYyY', '.YYYYyY.', '..YYYY..']
const ERASER = ['PPPPPPWWWWWW', 'PPPPPPWWWWWW', 'PPPPPPWWWWWW', 'PPPPPPWWWWWW']

const CAMEOS = [
  { sign: S, cap: 'The plan changed? | *Make a new one.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const flip = ease.inOutCubic(prog(lt, 0.8, 1.3))
      card(x, 790, 880, 320, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        if (flip < 0.5) {
          txt(x, 'PLAN A', 0, -140, { size: 30, font: MONO, weight: 700 })
          x.fillStyle = GREY; for (let i = 0; i < 5; i++) x.fillRect(-120, -80 + i * 46, 240 - (i % 2) * 50, 10)
          x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(-130, -110); x.lineTo(130, 120); x.stroke()
        } else {
          txt(x, 'PLAN B', 0, -140, { size: 30, font: MONO, weight: 700, color: GREEN })
          x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-120, -80 + i * 46, 200, 10)
          drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 0, 100, 10)
        }
      })
      label(x, 790, 1120, 'PLAN B: CUTER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Messy drafts | *still count.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 1], star: L,
    front(x, t, lt, P) {
      const n = Math.min(11, Math.floor(Math.max(0, lt - 0.2) / 0.12))
      for (let i = 0; i < n; i++) drawBits(x, PAPER, { W: CREAM, w: GREY }, 680 + ((i * 47) % 230), 1080 - Math.floor(i / 4) * 60 - (i % 2) * 14, 14, { rot: i * 0.7 })
      label(x, 790, 700, `DRAFT ${n + 1}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Restarting isn’t failing. | *It’s editing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        x.fillStyle = GREY; for (let i = 0; i < 6; i++) x.fillRect(-120, -130 + i * 46, 240 - (i % 3) * 40, 10)
        x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(-120, -38); x.lineTo(100, -38); x.stroke(); x.beginPath(); x.arc(40, 50, 40, 0, 7); x.stroke()
      })
      label(x, 860, 1080, 'v2 ✓', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 56, bg: MINT, rot: -0.1, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The sourdough flopped? | *Bake again.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 1], star: L,
    front(x, t, lt, P) {
      drawBits(x, FLAT, LOAF_C, 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'ROUND 2: PREHEATING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 760, 'flat. like | a pancake.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: CREAM, tail: 'bc' })
    } },
  { sign: S, cap: 'New desk, new city. | *Same brilliant you.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 990, 'LABELLED. TWICE.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: CREAM, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 400, 860, P.t0 + 1.4, 7, 200, 0.4)
    } },
  { sign: S, cap: 'Lost the streak? | *Day one still counts.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-160, -150, 320, 56); txt(x, 'STREAK', 0, -122, { size: 28, font: MONO, weight: 700, color: CREAM })
        const n = lt < 0.9 ? 41 : 1
        txt(x, String(n), 0, 30, { size: 120, color: n === 1 ? GREEN : GREY })
      })
      label(x, 790, 1100, 'FRESH ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Unravelled the scarf? | *The yarn forgives you.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, YARN, { Y: PINK, y: '#ff6b9a' }, 820, 1000, 20 * k)
      if (k > 0.5) { x.strokeStyle = PINK; x.lineWidth = 7; x.beginPath(); x.moveTo(800, 960); for (let i = 0; i <= 20; i++) { const p = i / 20; x.lineTo(lerp(800, F.x + 60, p), lerp(960, F.cy - 20, p) + Math.sin(p * 18 + t * 3) * 18) } x.stroke() }
      bubble(x, 820, 700, 'again? sure!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: CREAM, tail: 'bc' })
    } },
  { sign: S, cap: 'Erase it. | *The page doesn’t mind.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 900, 330, 300, k, { bg: CREAM, rot: 0.02 }, () => {
        const er = clamp((lt - 0.6) / 0.8)
        x.save(); x.globalAlpha = 1 - er; x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(-110, 20); x.bezierCurveTo(-50, -100, 20, 120, 110, -30); x.stroke(); x.restore()
      })
      const ex = 790 + Math.sin(t * 16) * 80 * (lt > 0.6 && lt < 1.4 ? 1 : 0)
      drawBits(x, ERASER, { P: PINK, W: SKYB }, ex, 880, 16 * k, { rot: -0.4 })
      label(x, 790, 1120, 'GOOD AS NEW', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even the moon | *starts over monthly.*', mood: 'heart', look: [1, -1], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2.2)
        if (k <= 0.01) continue
        const cx = 690 + (i % 3) * 100, cy = 760 + Math.floor(i / 3) * 140 + (i === 4 ? 0 : 0)
        x.save(); x.translate(i < 3 ? cx : 740 + (i - 3) * 100, i < 3 ? 760 : 900); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 44, 0, 7); x.fill(); x.fillStyle = '#fff4c8'; x.beginPath(); x.arc(0, 0, 38, 0, 7); x.fill()
        const ph = [0.0, 0.5, 1, 0.5, 0.0][i], side = i < 2 ? 1 : -1
        if (i !== 2) { x.fillStyle = '#2a2350'; x.beginPath(); x.arc(side * 38 * (1 - ph) * 1.2, 0, 38, 0, 7); x.fill() }
        x.restore()
      }
      label(x, 790, 1100, 'NEW MOON, NEW YOU', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0188', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Virgo, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'Fresh start. | *Still you.*', mood: 'sparkle' },
  last: {
    text: 'Loaf number two? | *Didn’t measure.*',
    draw(x, t, lt) {
      drawBits(x, LOAF, LOAF_C, 600, 1150, 34 * pop01(t, t - lt + 0.5, 0.45, 2))
      sparkles(x, t, 600, 1100, t - lt + 1.0, 8, 240, 0.3)
      const k = pop01(t, t - lt + 0.8, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 290, 1150, 200 * k, { mood: lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], seed: 47, hops: [t - lt + 1.5] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
