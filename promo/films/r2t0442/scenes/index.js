// r2t0442: star_talk, ROLLCALL, "The signs | *doing the dishes.*" (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs at the sink, each the most extreme version of itself. Ending: callback (Taurus's plate is still soaking).
//   0.0–3.6    hook
//   3.6–49.2   ♈ washed everything in eleven seconds · ♉ one plate, soaking since Tuesday · ♊ washed one fork, started a podcast
//              · ♋ every plate has a memory · ♌ washed one cup, waited for applause · ♍ re-washed your clean ones
//              · ♎ still choosing a sponge · ♏ trusts no dishwasher · ♐ paper plates, problem solved
//              · ♑ a chore chart with deadlines · ♒ built a robot to do it · ♓ dropped a spoon, apologised to it
//  49.2        "Twelve signs. | *One sink.*"
//  52.6        "Taurus’s plate? | *Still soaking.*" (the soaking plate comes back: DAY 9)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', STEEL = '#c9c9d8', DSTEEL = '#8a8aa0', SUDS = '#eaf8ff', AQUA = '#6fd6ff'

const PLATE = ['...WWWWW...', '.WWBBBBBWW.', 'WWB.....BWW', 'WB.......BW', 'WB.......BW', 'WB.......BW', 'WWB.....BWW', '.WWBBBBBWW.', '...WWWWW...']
const PLATE_C = { W: CREAM, B: '#a8d8f0' }
const CUP = ['WWWWWW..', 'WRRRRW..', 'WWWWWWWW', 'WWWWWW.W', 'WWWWWW.W', 'WWWWWWWW', '.WWWW...']
const CUP_C = { W: CREAM, R: GOLD }
const FORK = ['W.W.W', 'W.W.W', 'WWWWW', '.WWW.', '..W..', '..W..', '..W..', '..W..', '..W..', '..W..']
const SPOON = ['.WWW.', 'WWWWW', 'WWWWW', '.WWW.', '..W..', '..W..', '..W..', '..W..', '..W..']
const SPONGE = ['YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY', 'GGGGGGGG', 'GGGGGGGG']
const ROBOT = ['...AA...', '..KKKK..', '.KSSSSK.', '.KSWSWK.', '.KSSSSK.', '..KKKK..', 'KKSSSSKK', 'S.SSSS.S', 'S.SRRS.S', '..SSSS..', '..S..S..', '.SS..SS.']
const ROBOT_C = { A: RED, K: INK, S: STEEL, W: AQUA, R: RED }

/** a sink basin with water and suds; soak = how murky */
function sink(x, t, cx, cy, k, { suds = 1, w = 320 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  // tap
  x.fillStyle = INK; x.fillRect(-20, -150, 40, 90); x.fillRect(-20, -160, 100, 30)
  x.fillStyle = STEEL; x.fillRect(-14, -144, 28, 80); x.fillRect(-14, -154, 88, 18)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -40, w, 170)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -58, w + 16, 186)
  x.fillStyle = STEEL; x.fillRect(-w / 2, -50, w, 170)
  x.fillStyle = DSTEEL; x.fillRect(-w / 2 + 16, -36, w - 32, 140)
  x.fillStyle = '#7fc8e8'; x.fillRect(-w / 2 + 16, -6, w - 32, 110)
  x.restore()
  if (suds > 0) for (let i = 0; i < 9; i++) { const a = i * 1.7, bx = cx + (Math.sin(a * 3) * 0.42) * w * k, by = cy - 6 * k - Math.abs(Math.sin(t * 2 + i)) * 10 * k; x.fillStyle = INK; x.beginPath(); x.arc(bx, by, (16 + (i % 3) * 7) * k * suds + 3, 0, Math.PI * 2); x.fill(); x.fillStyle = SUDS; x.beginPath(); x.arc(bx, by, (16 + (i % 3) * 7) * k * suds, 0, Math.PI * 2); x.fill() }
}
/** a paper sheet with header and rows */
function sheet(x, cx, cy, k, { w = 340, h = 360, head = '', headCol = GOLD, rows = [], rot = 0.04, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, kk = 1, col = INK], i) => { if (kk <= 0.01) return; x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col; x.font = `700 ${size}px ${MONO}`; x.fillText(txt, -w / 2 + 22, -h / 2 + (head ? 60 : 0) + 44 + i * (size + 18)); x.restore() })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Washed everything | in *eleven seconds.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      const n = Math.min(7, Math.floor(Math.max(0, lt - 0.2) / 0.12))
      for (let i = 0; i < n; i++) drawBits(x, PLATE, PLATE_C, 790 + (i % 2 ? 6 : -6), 1110 - i * 34, 12, { sy: 0.45 })
      label(x, 790, 680, `0:${String(Math.min(11, Math.floor(lt * 6))).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 820, 'DONE. NEXT?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'One plate. | Soaking *since Tuesday.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      sink(x, t, 790, 1000, k)
      drawBits(x, PLATE, PLATE_C, 790, 960, 14 * k, { rot: 0.3 })
      sink(x, t, 790, 1000, 0)
      label(x, 790, 700, 'SOAK: DAY 6', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Washed one fork. | Started *a podcast.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FORK, { W: STEEL }, 760, 980, 14 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.3 })
      bubble(x, 790, 660, 'welcome back | to Fork Talk!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1130, 'EPISODE 47', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Every plate | has a *memory.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 920, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 640, 'from our | first date ♡', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      label(x, 790, 1150, 'WASHING: SLOWLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.0, { n: 4, life: 1.6, spread: 180, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Washed one cup. | Waited for *applause.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 790, 920, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      sparkles(x, t, 790, 900, P.t0 + 0.8, 8, 180, 0.5)
      bubble(x, 790, 650, 'you’re welcome.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      label(x, 790, 1130, 'STANDING OVATION?', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Re-washed | *your clean ones.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, PLATE, PLATE_C, 790, 900, 26 * k)
      if (k > 0.5) {
        const mx = 790 + Math.sin(lt * 3) * 50, my = 880 + Math.cos(lt * 2.4) * 30
        x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.moveTo(mx + 50, my + 50); x.lineTo(mx + 110, my + 110); x.stroke()
        x.lineWidth = 12; x.strokeStyle = '#8a4a2e'; x.beginPath(); x.moveTo(mx + 54, my + 54); x.lineTo(mx + 106, my + 106); x.stroke()
        x.fillStyle = INK; x.beginPath(); x.arc(mx, my, 76, 0, Math.PI * 2); x.fill()
        x.fillStyle = 'rgba(191,232,255,0.55)'; x.beginPath(); x.arc(mx, my, 64, 0, Math.PI * 2); x.fill()
      }
      label(x, 790, 650, 'A SPOT. (IMAGINED)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still choosing | *a sponge.*', mood: 'squint', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const C = [['#ffd23a', '#5fd068'], ['#ff8fb1', '#c97bff'], ['#8fe3ff', '#2f7ac0']]
      C.forEach(([a, b], i) => {
        const sel = Math.floor(lt * 3) % 3 === i
        drawBits(x, SPONGE, { Y: a, G: b }, 690 + i * 100, 920 - (sel ? 30 : 0), 13 * pop01(t, P.t0 + 0.15 + i * 0.12, 0.3, 2))
      })
      label(x, 790, 1110, 'PROS & CONS: 3 PAGES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Trusts | *no dishwasher.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 920); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -170, 300, 340); x.fillStyle = STEEL; x.fillRect(-142, -162, 284, 324)
        x.fillStyle = DSTEEL; x.fillRect(-142, -162, 284, 60); x.fillStyle = INK; x.fillRect(-100, -70, 200, 14)
        x.fillStyle = MINT; x.fillRect(60, -142, 20, 20); x.fillStyle = RED; x.fillRect(96, -142, 20, 20)
        x.restore()
      }
      label(x, 800, 1130, 'STATUS: SUSPECT', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 650, 'I’ll do it myself.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Paper plates. | *Problem solved.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      for (let i = 0; i < 6; i++) drawBits(x, PLATE, { W: '#f6f0e0', B: '#e8dcc0' }, 790, 1070 - i * 14, 18 * k, { sy: 0.4 })
      label(x, 790, 720, 'SINK: RETIRED', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 1000, P.t0 + 1.0, 6, 160, 0.4)
    } },
  { sign: 'capricorn', cap: 'Made a chore chart. | *With deadlines.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'DISHES Q3', headCol: '#9aa5c4', size: 30, rows: [
        ['plates  ✓ 9:00', pop01(t, P.t0 + 0.5, 0.2, 2)], ['cups    ✓ 9:04', pop01(t, P.t0 + 0.8, 0.2, 2)], ['forks   ✓ 9:07', pop01(t, P.t0 + 1.1, 0.2, 2)], ['review  10:00', pop01(t, P.t0 + 1.4, 0.2, 2), RED],
      ] })
    } },
  { sign: 'aquarius', cap: 'Built a robot | *to do it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, ROBOT, ROBOT_C, 800, 920, 24 * k, { rot: Math.sin(t * 6) * 0.05 })
      label(x, 800, 650, 'BEEP. PLATE.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1180, 'TOOK 3 WEEKS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Dropped a spoon. | *Apologised to it.*', mood: 'wide', look: [1, 1], tears: lt => lt > 0.8 ? 3 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.outCubic(prog(lt, 0.2, 0.6))
      drawBits(x, SPOON, { W: STEEL }, 790, lerp(680, 1060, d), 22, { rot: lerp(0, 1.4, d) })
      bubble(x, 790, 800, 'sorry, spoon!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0442', key: 'E', accent: AQUA, ending: 'callback',
  title: 'The signs | *doing the dishes.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One sink.*' },
  last: {
    text: 'Taurus’s plate? | *Still soaking.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.5, 0.4, 2)
      sink(x, t, 540, 1050, k * 1.3)
      drawBits(x, PLATE, PLATE_C, 540, 1000, 18 * k, { rot: 0.3 })
      label(x, 540, 1300, 'SOAK: DAY 9', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
