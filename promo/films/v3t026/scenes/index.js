// v3t026: THE SIGNS AS… v3, SOLO film, "Things only | Virgos get." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine everyday situations, each pushed to the most extreme (and lovable) Virgo version.
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Things only | *Virgos* get."  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              your frame was one degree crooked, fixed it · a to-do list for the to-do list · group project, did all of it
//              · read the terms and conditions, all 40 pages · labelled every sock · browser tabs: one
//              · your birth time? needs the second · stressed, cleans the clean kitchen · loves you, remembers your coffee order
//  37.8        "Neat. Kind. | *Slightly much.*"  Virgo comes back, big.
//  41.2        callback: "Last to-do? | *“Relax.”* Unticked." (the list of lists comes back, one empty box).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#2fc79a'
const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }

const SOCK = pad(['..WWWW', '..CCCC', '..CCCC', '..CCCC', '..CCCC', 'CCCCCC', 'CCCCCC', 'CCCCC.'])
const SPRAY = pad(['KKKK...', 'KWWKKK.', 'KKKK...', '.BB....', '.BB....', 'BBBB...', 'BWWB...', 'BWWB...', 'BBBB...', 'BBBB...'])
const CUP = pad(['.SS.S...', '..S.S...', 'WWWWWWW.', 'WBBBBBWWW', 'WBBBBBW.W', 'WBBBBBWWW', 'WBBBBBW..', '.WWWWW...'])

/** paper with ticked rows (ticks: how many rows are ticked) */
function sheet(x, cx, cy, k, { title, rows, ticks = 0, w = 300, rowH = 52, rot = 0.05, size = 26 }) {
  if (k <= 0.01) return
  const h = 90 + rows.length * rowH
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10); x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 30px ${INTER}`; x.fillText(title, 0, -h / 2 + 36)
  x.textAlign = 'left'; x.font = `700 ${size}px ${MONO}`
  rows.forEach((r, i) => {
    const y = -h / 2 + 90 + i * rowH
    x.fillStyle = INK; x.fillRect(-w / 2 + 20, y - 14, 28, 28); x.fillStyle = '#fff4e2'; x.fillRect(-w / 2 + 24, y - 10, 20, 20)
    if (i < ticks) { x.fillStyle = GREEN; x.fillRect(-w / 2 + 26, y - 8, 16, 16) }
    x.fillStyle = INK; x.fillText(r, -w / 2 + 62, y + 2)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'virgo', cap: 'Your frame was crooked. | *Fixed it.* At your house.', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      const r = lerp(0.12, 0, ease.outBack ? ease.outCubic(prog(lt, 0.9, 1.3)) : prog(lt, 0.9, 1.3))
      x.save(); x.translate(790, 820); x.rotate(r); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = GOLD; x.fillRect(-142, -102, 284, 204)
      x.fillStyle = '#6fc3ff'; x.fillRect(-120, -80, 240, 160); x.fillStyle = '#5fd068'; x.fillRect(-120, 20, 240, 60)
      x.fillStyle = '#fff1b0'; x.fillRect(50, -60, 40, 40)
      x.restore()
      label(x, 790, 1040, lt > 1.2 ? 'LEVEL: PERFECT' : 'OFF BY 1°', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: lt > 1.2 ? MINT : RED, color: lt > 1.2 ? INK : '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A to-do list | for *the to-do list.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { title: 'LIST OF LISTS', rows: ['work list', 'home list', 'list list', 'relax'], ticks: Math.floor(clamp((lt - 0.6) / 1.2) * 3.99) })
    } },
  { sign: 'virgo', cap: 'Group project? | *Did all of it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 820); x.rotate(0.05); x.scale(1.2 * k, 1.2 * k)
        x.fillStyle = INK; x.fillRect(-150, -180, 300, 360); x.fillStyle = '#fff4e2'; x.fillRect(-142, -172, 284, 344)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GROUP PROJECT', 0, -130)
        x.font = `700 24px ${MONO}`; ['by: Virgo', 'Leo', 'Gemini', 'Sag', '(+ Virgo)'].forEach((n, i) => x.fillText(n, 0, -70 + i * 40))
        x.restore()
      }
      label(x, 790, 1120, 'WORK: 100% VIRGO', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'Read the terms. | *All 40 pages.*', mood: 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const L = 140 + 360 * ease.outCubic(prog(lt, 0.4, 1.6))
      if (k > 0.01) {
        x.save(); x.translate(790, 640); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -10, 240, L + 10); x.fillStyle = '#fff4e2'; x.fillRect(-112, -2, 224, L - 4)
        x.fillStyle = '#b9b0a0'; for (let y = 30; y < L - 20; y += 22) x.fillRect(-92, y, 160 + ((y * 7) % 30), 8)
        x.fillStyle = '#e8dcc0'; x.fillRect(-130, -26, 260, 34); x.fillStyle = INK; x.fillRect(-130, -30, 260, 6)
        x.restore()
      }
      label(x, 790, 1150, 'PAGE 40 / 40', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Weekend trip. | *Labelled every sock.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const D = ['FRI', 'SAT', 'SUN', 'SPARE']
      const C = [PINK, SKYB, MINT, GOLD]
      D.forEach((d, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        const cx = 660 + (i % 2) * 220, cy = 770 + Math.floor(i / 2) * 230
        drawBits(x, SOCK, { W: '#fff4e2', C: C[i] }, cx, cy, 16 * k, { rot: 0.1 * (i % 2 ? 1 : -1) })
        label(x, cx, cy + 90, d, k, { size: 26, bg: BONE, rot: 0, font: MONO, weight: 700 })
      })
    } },
  { sign: 'virgo', cap: 'Browser tabs open: | *one.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -140, 340, 280); x.fillStyle = '#e8e3f4'; x.fillRect(-162, -132, 324, 264)
        x.fillStyle = '#9aa5c4'; x.fillRect(-162, -132, 324, 44)
        x.fillStyle = '#fff4e2'; x.fillRect(-150, -124, 110, 36); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('tab 1', -140, -105)
        x.fillStyle = '#ff5a4f'; x.fillRect(116, -122, 24, 24); x.fillStyle = '#ffd23a'; x.fillRect(86, -122, 24, 24)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-130, -50 + i * 40, 200 + (i % 2) * 50, 12)
        x.restore()
      }
      bubble(x, 520, 610, 'closed after use.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Your birth time? | Virgo needs *the second.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const s = Math.floor(Math.min(32, Math.max(0, (lt - 0.4) * 30)))
      label(x, 790, 800, `04:17:${String(s).padStart(2, '0')}`, k, { size: 64, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 980, '✦ CHART: EXACT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.05 })
      bubble(x, 520, 600, 'AM or PM?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Stressed? | Cleans *the clean kitchen.*', mood: 'squint', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      drawBits(x, SPRAY, { K: INK, W: '#fff4e2', B: '#6fc3ff' }, F.x + 180, F.cy, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      sparkles(x, t, 790, 900, P.t0 + 0.7, 6, 140, 0.2, [SKYB, BONE, MINT]); sparkles(x, t, 790, 900, P.t0 + 1.4, 6, 160, 0.8, [SKYB, BONE, MINT])
      label(x, 800, 760, 'ALREADY CLEAN', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: SKYB, rot: 0.05 })
      label(x, 800, 1060, 'ROUND 3', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Loves you? | Knows *your coffee order.*', mood: 'heart', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CUP, { S: '#e8e3f4', W: '#fff4e2', B: '#8a4a2e' }, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'oat · half-sweet · 64°', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 5, life: 1.2, spread: 150, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t026', key: 'C', accent: MINT, solo: 'virgo', ending: 'callback',
  title: 'Things only | *Virgos* get.',
  cameos: CAMEOS,
  group: { cap: 'Neat. Kind. | *Slightly much.*', mood: 'sparkle' },
  last: {
    text: 'Last to-do? | *“Relax.”* Unticked.',
    draw(x, t, lt) {
      sheet(x, 540, 1100, 2 * pop01(t, t - lt + 0.3, 0.4, 2), { title: 'LIST OF LISTS', rows: ['work list', 'home list', 'list list', 'relax'], ticks: 3, rot: -0.03 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
