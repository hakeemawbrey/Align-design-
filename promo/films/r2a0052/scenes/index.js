// r2a0052: star_advice, ADVICE SOLO, "Aries, here’s your | Monday pep talk." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a warm Monday pep talk for Aries, each a relatable truth
// + a kind reframe, one visual gag each.
//   0.0–3.6    "Aries, here’s your | *Monday pep talk.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              up before the alarm? eat breakfast first · forty tabs open? close thirty-nine · elevator too slow? you
//              don’t have to race it · three projects started? finish one, celebrate loudly · snapped a little? a quick
//              sorry works · too much energy? someone needed that · new match? let them text first (patience: 3 s)
//              · rest feels like losing? naps are training · running ahead? wait for your friends
//  37.8        group (the ending): "Go get Monday. | *Gently.*"  Aries comes back, big; the punchline ends it.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#f0603a', CREAM = '#fff4e2', GREEN = '#5fd068'
const S = 'aries'

// ── props
const PAN = [
  '..KKKKKK..........',
  '.KGGGGGGK.........',
  'KGGWWWWGGK........',
  'KGWWYYWWGKKKKKKKKK',
  'KGWWYYWWGKBBBBBBBK',
  'KGGWWWWGGKKKKKKKKK',
  '.KGGGGGGK.........',
  '..KKKKKK..........',
]
const PAN_C = { K: INK, G: '#4a4a60', W: '#ffffff', Y: GOLD, B: '#8a4a2e' }
const TROPHY = [
  'Y.YYYYYY.Y',
  'YYYYYYYYYY',
  'Y.YYYYYY.Y',
  '..YYYYYY..',
  '...YYYY...',
  '....YY....',
  '....YY....',
  '..BBBBBB..',
  '..BBBBBB..',
]
const TROPHY_C = { Y: GOLD, B: '#8a4a2e' }

function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, edge = INK } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
// a browser window: a crowd of tabs that collapses to one
function tabs(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 340, 280, k, { rot: 0.03, bg: '#e8ecff' })) return
  const n = Math.max(1, Math.round(lerp(14, 1, ease.inOutCubic(prog(lt, 0.8, 1.6)))))
  const w = 316 / n
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-158 + i * w, -132, w - 3, 40); x.fillStyle = i === 0 ? CREAM : ['#c8d0f0', LAV, '#ffd0a8'][i % 3]; x.fillRect(-156 + i * w, -130, w - 7, 34) }
  if (n === 1) { x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('the one that matters', -144, -113) }
  x.fillStyle = '#c8d0f0'; for (let i = 0; i < 4; i++) x.fillRect(-140, -50 + i * 40, 280 - (i % 2) * 80, 16)
  x.restore()
}
// an elevator: the floor counter barely moves; a flight of stairs beside it
function elevator(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 220, 360, k, { rot: 0, bg: '#c9c9d8' })) return
  x.fillStyle = '#9a9ab0'; x.fillRect(-90, -120, 86, 280); x.fillRect(4, -120, 86, 280)
  x.fillStyle = INK; x.fillRect(-2, -120, 4, 280)
  x.fillStyle = '#140c30'; x.fillRect(-70, -170, 140, 40)
  x.fillStyle = '#ff6f6f'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(lt < 1.2 ? '▲ 1' : '▲ 2', 0, -149)
  x.restore()
}
// three progress bars; one fills to the end
function progress(x, t, cx, cy, k, lt) {
  if (!card(x, cx, cy, 340, 300, k, { rot: -0.03, bg: '#2a2350' })) return
  const L = [['PROJECT A', 0.3, 1], ['PROJECT B', 0.5, 0.45], ['PROJECT C', 0.2, 0.2]]
  L.forEach(([s, a, b], i) => {
    const v = i === 0 ? lerp(a, b, ease.inOutCubic(prog(lt, 0.4, 1.3))) : a
    const y = -90 + i * 90
    x.fillStyle = CREAM; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(s + (i === 0 && v >= 0.999 ? ' ✓' : ''), -146, y - 22)
    x.fillStyle = INK; x.fillRect(-146, y, 292, 34); x.fillStyle = i === 0 && v >= 0.999 ? GREEN : GOLD; x.fillRect(-140, y + 6, 280 * v, 22)
  })
  x.restore()
}
// a battery, overflowing with charge
function battery(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -170, 180, 330); x.fillRect(-40, -196, 80, 32)
  x.fillStyle = '#140c30'; x.fillRect(-78, -158, 156, 306)
  const v = ease.outCubic(prog(lt, 0.2, 1.0))
  for (let i = 0; i < 5; i++) if (v > i / 5) { x.fillStyle = GREEN; x.fillRect(-66, 92 - i * 60, 132, 46) }
  x.restore()
  if (lt > 1.0) sparkles(x, t, cx, cy - 190 * k, t - lt + 1.0, 7, 120, 0.3, [GOLD, MINT, BONE])
}
// a phone with a fresh match, and a countdown
function matchPhone(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 280, 410, k, { rot: 0.04, bg: '#2a2350' })) return
  x.fillStyle = '#140c30'; x.fillRect(-124, -182, 248, 364)
  x.fillStyle = MINT; x.fillRect(-110, -166, 220, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ NEW MATCH', 0, -142)
  x.fillStyle = CREAM; x.font = `800 26px ${INTER}`; x.fillText('♎︎ Libra, 27', 0, -80)
  const c = 3 - Math.min(3, Math.floor(Math.max(0, lt - 0.6) / 0.45))
  x.fillStyle = c ? GOLD : PINK; x.font = `800 96px ${INTER}`; x.fillText(c ? String(c) : '♡', 0, 40)
  x.fillStyle = BONE; x.font = `700 20px ${MONO}`; x.fillText(c ? 'waiting…' : 'they said hi!', 0, 128)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Up before the alarm? | *Eat breakfast first.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      drawBits(x, PAN, PAN_C, 800, 880, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 3) * 0.04 })
      label(x, 790, 650, '4:58 AM. READY.', pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'FUEL FIRST ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forty tabs open? | *Close thirty-nine.*', mood: lt => lt > 1.6 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.65],
    front(x, t, lt, P) {
      tabs(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'BRAIN: QUIET', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Elevator too slow? | *You don’t have to race it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      elevator(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 800, 620, 'TAKING THE STAIRS', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 30, tail: 'bl' })
      label(x, 800, 1100, 'OR… JUST WAIT ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Started three projects? | *Finish one. Party.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.35, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      progress(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      sparkles(x, t, 790, 770, P.t0 + 1.35, 8, 190, 0.2)
      label(x, 790, 1080, 'DONE = DANCE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Snapped a little? | *A quick sorry works.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 790, 920, 200 * k, { mood: lt > 1.3 ? 'happy' : 'wide', look: [-1, 0], seed: 12, glyph: false, hops: lt > 1.3 ? [P.t0 + 1.8] : null })
      bubble(x, 560, 640, 'my bad ♡', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 690, 'all good!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: MINT, tail: 'br' })
    } },
  { sign: S, cap: 'Too much energy? | *Someone needed that.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      battery(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1130, 'SHARE IT AROUND', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New match? | *Let them text first.*', mood: lt => lt > 2.0 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [2.05],
    front(x, t, lt, P) {
      matchPhone(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      if (lt > 2.0) hearts(x, t, 800, 760, t - lt + 2.0, { n: 5, life: 1.4, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Rest feels like losing? | *Naps are training.*', mood: lt => lt > 0.9 ? 'sleepy' : 'neutral', star: { x: -200, y: 10 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 990); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -36, 300, 80); x.fillStyle = CREAM; x.fillRect(-142, -28, 284, 64); x.restore() }
      drawBits(x, TROPHY, TROPHY_C, 800, 900, 16 * k)
      label(x, 800, 660, 'REST: CHAMPION', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Way out in front? | *Wait for your friends.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: 160 }, hops: [0.3, 1.4],
    front(x, t, lt, P) {
      const run = ease.outCubic(prog(lt, 0.3, 1.5))
      ;['taurus', 'cancer'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, lerp(150, 370, run) + i * 120 - 60, 950 - i * 10, 160 * k, { mood: run > 0.95 ? 'heart' : 'wide', look: [1, 0], seed: 50 + i, glyph: false, hops: [P.t0 + 0.6 + i * 0.2, P.t0 + 1.1 + i * 0.2] })
      })
      bubble(x, 700, 620, 'c’mon, team ♡', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'br' })
      label(x, 540, 1150, 'TEAM PACE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0052', key: 'F', accent: RED, solo: S, ending: 'group',
  title: 'Aries, here’s your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: {
    cap: 'Go get Monday. | *Gently.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
