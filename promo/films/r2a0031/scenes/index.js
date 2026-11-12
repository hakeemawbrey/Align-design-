// r2a0031: star_advice ADVICE SOLO, "Virgo, your sign | to slow down." (~44 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Virgo truth + a warm reframe, one gag each.
//   0.0–3.6    "Virgo, your sign | *to slow down.*"
//   3.6–37.8   ironing the towels (wrinkles allowed) · re-reading a match's text (just reply) · lunch at the desk (eat outside)
//              · the plan has a plan (let one slip) · speed-walking to relax (stroll with the snail) · one crumb (it can stay)
//              · a timed bath (lose track of time) · resting perfectly (rest isn't graded) · a work in progress (still lovely)
//  37.8        GROUP ending: "Slower days. | Softer *Virgo.*"  
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const SAGE = '#9fd8a8', BROWN = '#8a4a2e'
// ── props
const IRON = ['....KKKKKK..', '...K......K.', '..SSSSSSSSSS', '.SSSSSSSSSSS', 'SSSSSSSSSSSS', 'GGGGGGGGGGGG']
const IRON_C = { K: INK, S: '#9aa5c4', G: '#d6dcef' }
const TOWEL = ['PPPPPPPPPPPP', 'PWWPPPPPPWWP', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', 'PWWPPPPPPWWP', 'PPPPPPPPPPPP']
const PHONE = ['KKKKKKKKK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KKKKWKKKK']
const PHONE_C = { K: '#2a2350', S: '#3b3170', W: BONE }
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', '.BBBBBBBBBB.']
const SANDWICH_C = { B: '#e8b06a', G: '#7dd36b', R: '#e23d4e', Y: '#ffd23a' }
const SUN = ['...Y..Y...', 'Y..OOOO..Y', '..OOOOOO..', 'Y.OOOOOO.Y', '..OOOOOO..', 'Y..OOOO..Y', '...Y..Y...']
const SUN_C = { Y: '#ffd23a', O: '#ffb34a' }
const SNAIL = ['....SSSS....', '..SSSWWSS...', '.SSWSSSSWS..', '.SWSSSSSSWS.', '.SSWSSSWSS..', '..SSSSSSS..E', 'BBBBBBBBBBBE', 'BBBBBBBBBBBB']
const SNAIL_C = { S: '#ffb34a', W: '#c96a3a', B: '#c9e88a', E: INK }
const CRUMB = ['.CC.', 'CCCC', '.CC.']
const DUCK = ['..YYY...', '.YYKYY..', '.YYYYYOO', 'YYYYYY..', 'YYYYYYY.', '.YYYYY..']
const DUCK_C = { Y: '#ffd23a', K: INK, O: '#ff9a4a' }
const BED = ['P.............', 'PWWW..........', 'PWWWBBBBBBBBBB', 'PBBBBBBBBBBBBB', 'PBBBBBBBBBBBBB', 'P............P']
const BED_C = { P: BROWN, W: BONE, B: LAV }

function paper(x, cx, cy, w, h, k, rot = 0, col = BONE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function tub(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -20, 400, 150); x.fillStyle = BONE; x.fillRect(-192, -12, 384, 134)
  x.fillStyle = INK; x.fillRect(-170, 130, 24, 30); x.fillRect(146, 130, 24, 30)
  x.fillStyle = '#ffffff'
  for (let i = 0; i < 9; i++) { const r = 18 + (i * 7) % 16; x.beginPath(); x.arc(-160 + i * 40, -16 + Math.sin(t * 2 + i) * 6, r, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function puzzle(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const cols = [PINK, SKYB, GOLD, MINT, LAV, '#ff9a4a']
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) {
    if ((i === 3 && j === 0) || (i === 2 && j === 2) || (i === 3 && j === 2)) continue
    x.fillStyle = INK; x.fillRect(-160 + i * 80, -120 + j * 80, 80, 80)
    x.fillStyle = cols[(i + j * 2) % 6]; x.fillRect(-154 + i * 80, -114 + j * 80, 68, 68)
  }
  x.restore()
}

const S = 'virgo'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Ironing the towels? | *They’re fine wrinkly.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TOWEL, { P: SKYB, W: BONE }, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const off = ease.inOutCubic(prog(lt, 1.0, 1.4))
      drawBits(x, IRON, IRON_C, 790 + off * 60, 800 - off * 180 + Math.sin(t * 8) * 6 * (1 - off), 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: off * 0.3 })
      label(x, 790, 1130, 'WRINKLES: ALLOWED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Re-read your match’s text? | *Just reply.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 850, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 760, 'hey :)', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 40, tail: 'bl' })
      const n = Math.min(10, 1 + Math.floor(Math.max(0, lt - 0.4) * 9))
      label(x, 790, 930, `READ: ${n}×`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: LAV, font: MONO, weight: 700 })
      label(x, 790, 1130, 'SENT ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lunch at your desk? | *Eat it outside.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SUN, SUN_C, 800, 660, 20 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: t * 0.3 })
      drawBits(x, SANDWICH, SANDWICH_C, 790, 950, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      sparkles(x, t, 790, 940, P.t0 + 1.3, 6, 140, 0.4)
    } },
  { sign: S, cap: 'The plan has a plan. | *Let one slip.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      paper(x, 790, 860, 260, 360, k, 0.03)
      if (k > 0.01) { x.save(); x.translate(790, 860); x.rotate(0.03); x.scale(k, k); for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(-100, -140 + i * 50, 22, 22); x.fillStyle = SAGE; x.fillRect(-96, -136 + i * 50, 14, 14); x.fillStyle = '#9aa5c4'; x.fillRect(-64, -134 + i * 50, 150 - (i * 37) % 60, 12) } x.restore() }
      const fly = ease.outCubic(prog(lt, 1.0, 2.2))
      if (fly > 0) paper(x, 790 + fly * 140, 860 - fly * 330, 120, 80, 1, fly * 1.2, GOLD)
      label(x, 790, 1130, 'PLAN B: VIBES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Speed-walking to relax? | *Stroll instead.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, 780 - lt * 20, 990, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 760, 'no rush.', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 44, tail: 'bc' })
      label(x, 790, 1150, 'PACE: SNAIL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One crumb on the counter? | *It can stay.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha *= k; x.fillStyle = INK; x.fillRect(600, 960, 380, 30); x.fillStyle = '#c9b8a0'; x.fillRect(606, 964, 368, 22); x.restore() }
      drawBits(x, CRUMB, { C: '#e8b06a' }, 800, 930, 18 * k)
      label(x, 800, 800, 'IT’S A GUEST NOW', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A bath with a timer? | *Lose track.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: 0, y: -60, s: 240 },
    back(x, t, lt, P) { tub(x, 540, 980, pop01(t, P.t0 + 0.05, 0.3, 1.8), t) },
    front(x, t, lt, P) {
      const throwIt = ease.outCubic(prog(lt, 1.0, 1.6))
      label(x, 760 + throwIt * 90, 690 - throwIt * 60, 'TIMER: 12:00', pop01(t, P.t0 + 0.3, 0.3, 2.2) * (1 - throwIt * 0.5), { size: 34, bg: LAV, font: MONO, weight: 700, rot: throwIt * 0.9 })
      drawBits(x, DUCK, DUCK_C, 300, 940, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
    } },
  { sign: S, cap: 'Resting “correctly”? | *Rest isn’t graded.*', mood: 'sleepy', star: { x: -120, y: 40, s: 260 },
    back(x, t, lt, P) { drawBits(x, BED, BED_C, 520, 980, 34 * pop01(t, P.t0 + 0.05, 0.3, 1.8)) },
    front(x, t, lt, P) {
      paper(x, 800, 690, 200, 150, pop01(t, P.t0 + 0.4, 0.3, 2), 0.06)
      const k = pop01(t, P.t0 + 1.1, 0.3, 2.6)
      if (k > 0.01) { x.save(); x.translate(800, 690); x.rotate(0.06); x.scale(k, k); x.fillStyle = '#e23d4e'; x.font = `800 72px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A+', 0, 4); x.restore() }
      bubble(x, 560, 600, 'zzz', pop01(t, P.t0 + 1.5, 0.25, 2.4), { size: 44, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Unfinished? | *Still lovely.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      puzzle(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2))
      hearts(x, t, 790, 780, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
      label(x, 790, 1110, 'WORK IN PROGRESS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: PINK, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0031', key: 'D', accent: SAGE, solo: 'virgo', ending: 'group',
  title: 'Virgo, your sign | *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Slower days. | Softer *Virgo.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
