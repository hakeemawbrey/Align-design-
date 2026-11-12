// r2a0212: star_advice, ADVICE SOLO, "Aquarius, it's okay | to start over." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one gag each.
//   0.0–3.6    "Aquarius, it’s okay | *to start over.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              deleted the draft again (draft two is braver) · moved somewhere new (brave, not lost)
//              · quit what drained you (the battery recharges) · the weird idea flopped (idea #2 lights up)
//              · pressed restart on the routine (day one counts) · a fresh profile (bio: starting fresh)
//              · repainted the whole room · feel behind (your own route) · starting over is beginning (a sprout)
//  37.8        ending 'group': "Fresh start. | *Same brilliant you.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#6fe3ff', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a', GREEN = '#5fd068'
const S = 'aquarius'

// ── props
const BIN = [
  'KKKKKKKKKK',
  '.GGGGGGGG.',
  '.GgGgGgGG.',
  '.GgGgGgGG.',
  '.GgGgGgGG.',
  '.GgGgGgGG.',
  '..GGGGGG..',
]
const BIN_C = { K: '#5b5d78', G: '#8a8aa0', g: '#6b6d88' }
const BALL = ['.WWW.', 'WWwWW', 'WwWWW', 'WWWwW', '.WWW.']
const BOX = [
  'TTTTTTTTTTTT',
  'BBBBBTTBBBBB',
  'BBBBBTTBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]
const BOX_C = { B: WOOD, T: '#e8c07a' }
const BULB = [
  '..YYYY..',
  '.YYYYYY.',
  'YYYWYYYY',
  'YYWYYYYY',
  'YYYYYYYY',
  '.YYYYYY.',
  '..YYYY..',
  '..GGGG..',
  '..gggg..',
  '..GGGG..',
]
const SPROUT = [
  '.LL...LL.',
  'LLLL.LLLL',
  '.LLL.LLL.',
  '...LLL...',
  '....L....',
  '....L....',
]
const POT = [
  'RRRRRRRRR',
  '.RRRRRRR.',
  '.RRRRRRR.',
  '..RRRRR..',
]

// a battery: level falls, then refills
function battery(x, cx, cy, k, lvl, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -150, 180, 300); x.fillRect(-36, -172, 72, 26)
  x.fillStyle = '#2a2350'; x.fillRect(-78, -138, 156, 276)
  const h = 260 * clamp(lvl)
  x.fillStyle = col; x.fillRect(-70, 130 - h, 140, h)
  x.restore()
}
// a big round RESTART button
function button(x, cx, cy, k, press) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 150, 60, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#5b5d78'; x.beginPath(); x.ellipse(0, 34, 140, 52, 0, 0, Math.PI * 2); x.fill()
  const d = 30 * press
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -10 + d, 118, 50, 0, 0, Math.PI * 2); x.fill(); x.fillRect(-118, -40 + d, 236, 30 - d + 20)
  x.fillStyle = press > 0.5 ? GREEN : AQUA; x.beginPath(); x.ellipse(0, -30 + d, 110, 44, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('↺ RESTART', 0, -28 + d)
  x.restore()
}
// a profile card with the star inside and a typed bio line
function profile(x, t, cx, cy, k, bio) {
  if (k <= 0.01) return
  const w = 280, h = 360
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 130)
  x.fillStyle = AQUA; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♒︎ AQUARIUS', 0, h / 2 - 90)
  x.fillStyle = CREAM; x.font = `800 24px ${INTER}`; x.fillText(bio, 0, h / 2 - 46)
  x.restore()
  signChar(x, t, S, cx + 4, cy - 50, 150 * k, { mood: 'sparkle', seed: 71, glyph: false, glow: 0.8 })
}

const CAMEOS = [
  { sign: S, cap: 'Deleted the draft again? | *Draft two is braver.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, BIN, BIN_C, 720, 1010, 18 * k)
      for (let i = 0; i < 3; i++) {
        const p = prog(lt, 0.3 + i * 0.25, 0.7 + i * 0.25)
        if (p > 0) drawBits(x, BALL, { W: CREAM, w: '#b9b0a0' }, lerp(560, 700 + i * 20, p), 900 - Math.sin(Math.PI * p) * 160 + p * 30, 11, { alpha: p >= 1 ? 0 : 1 })
      }
      const n = pop01(t, P.t0 + 1.4, 0.3, 2.2)
      if (n > 0.01) { x.save(); x.translate(860, 820); x.rotate(0.06); x.scale(n, n); x.fillStyle = INK; x.fillRect(-86, -110, 172, 220); x.fillStyle = CREAM; x.fillRect(-80, -104, 160, 208); x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) x.fillRect(-60, -64 + i * 32, 120 - (i % 2) * 30, 10); x.restore() }
      label(x, 860, 990, 'DRAFT 2', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: AQUA, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Moved somewhere new? | *Brave, not lost.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BOX, BOX_C, 760 + (i === 2 ? 60 : i * 120 - 60), 1010 - (i === 2 ? 110 : 0), 14 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      label(x, 790, 650, 'NEW ADDRESS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'FEELS LIKE HOME (SOON)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: AQUA, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Quit what drained you? | *That’s growth.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', star: { x: -200 },
    front(x, t, lt, P) {
      const lvl = lt < 1.0 ? lerp(0.4, 0.08, prog(lt, 0.2, 1.0)) : lerp(0.08, 1, ease.outCubic(prog(lt, 1.1, 2.0)))
      battery(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lvl, lvl < 0.25 ? RED : GREEN)
      label(x, 790, 1110, lt > 1.1 ? 'RECHARGING' : 'LOW BATTERY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: lt > 1.1 ? GREEN : RED, color: lt > 1.1 ? INK : CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your wild idea flopped? | *Idea two is loading.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: lt => lt > 1.4 ? [1, -1] : [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const off = lt > 0.7 && lt < 1.4
      const big = lt >= 1.4 ? 1 + 0.35 * pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2) - 0.35 : 1
      if (lt >= 1.4) { x.save(); x.globalAlpha = 0.35; x.fillStyle = GOLD; x.beginPath(); x.arc(790, 800, 180, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, BULB, { Y: off ? '#5b5d78' : GOLD, W: off ? '#7a7c98' : '#ffffff', G: '#8a8aa0', g: '#5b5d78' }, 790, 840, (lt >= 1.4 ? 26 : 20) * k * big)
      label(x, 790, 1110, lt >= 1.4 ? 'IDEA #2: ON' : 'IDEA #1: OFF', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: lt >= 1.4 ? GOLD : '#8a8aa0', rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.4 * 1.29, 8, 200, 0.3)
    } },
  { sign: S, cap: 'Restarted your routine? | *Day one counts.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      button(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), clamp(Math.sin(Math.PI * prog(lt, 0.8, 1.2)) * 1.0 + (lt > 1.2 ? 0.6 : 0)))
      label(x, 790, 650, 'DAY 1 ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New profile, new you? | *Write it fresh.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const full = 'starting fresh ✦'
      const n = Math.floor(clamp((lt - 0.5) / 1.0) * full.length)
      profile(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), full.slice(0, n) + (Math.floor(t * 3) % 2 ? '|' : ''))
      hearts(x, t, 790, 700, P.t0 + 1.6, { n: 5, life: 1.4, spread: 180, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Repainted the whole room? | *New walls, new chapter.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.fillRect(574, 594, 312, 432); x.fillStyle = '#6b6d88'; x.fillRect(580, 600, 300, 420)
      const p = ease.inOutCubic(prog(lt, 0.4, 1.7))
      x.fillStyle = AQUA; x.fillRect(580, 600, 300 * p, 420)
      x.restore()
      const rx = 580 + 300 * p
      x.fillStyle = INK; x.fillRect(rx - 26, 760, 52, 100); x.fillStyle = PINK; x.fillRect(rx - 20, 766, 40, 88)
      x.fillStyle = INK; x.fillRect(rx + 22, 806, 40, 10); x.fillRect(rx + 56, 806, 10, 120)
      label(x, 770, 1110, 'FRESH COAT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feel behind everyone? | *Your route is yours.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.strokeStyle = '#8a8aa0'; x.lineWidth = 10; x.setLineDash([22, 16]); x.beginPath(); x.moveTo(580, 1020); x.lineTo(860, 660); x.stroke(); x.setLineDash([])
      const p = clamp((lt - 0.3) / 1.6)
      x.strokeStyle = AQUA; x.lineWidth = 12; x.beginPath()
      for (let i = 0; i <= 60 * p; i++) { const u = i / 60, px = 580 + u * 280 + Math.sin(u * 14) * 50, py = 1020 - u * 360 + Math.cos(u * 11) * 40; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke(); x.restore()
      drawBits(x, ['G.....', 'GGGGG.', 'GGGGGG', 'GGGGG.', 'G.....', 'G.....', 'G.....'], { G: GOLD }, 880, 630, 10 * k)
      label(x, 760, 1120, 'SCENIC ROUTE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: AQUA, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Starting over isn’t failing. | *It’s beginning.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, POT, { R: '#c9643a' }, 790, 1040, 22 * k)
      const g = ease.outBack ? clamp(ease.outCubic(prog(lt, 0.5, 1.4))) : prog(lt, 0.5, 1.4)
      if (g > 0.01) drawBits(x, SPROUT, { L: GREEN }, 790, 1000 - 70 * g, 22 * g)
      label(x, 790, 700, 'NEW GROWTH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.4 * 1.29, 7, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0212', key: 'F', accent: AQUA, solo: S, ending: 'group',
  title: 'Aquarius, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'Fresh start. | *Same brilliant you.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
