// r2a0645: star_advice, ADVICE SOLO, "Sag, you don’t have | to be perfect." (topic: Sagittarius, you don't have to be perfect)
// (~51 s vertical, signs3kit social cut, music: lofi · G). One sign the whole way through (makeFilm solo mode, 9 cards): a
// relatable Sagittarius truth + a warm reframe, one gag each. Ending: lesson.
//   0.0–3.6    "Sag, you don’t have | *to be perfect.*"  One big Sagittarius pops in.
//   3.6–37.8   missed the target? you still threw · said the wrong thing? laugh, then apologise · plans changed? that's life
//              (the compass spins) · burnt pancakes are still breakfast · page twelve is still reading · awkward first date?
//              great story later · a messy room means you're living · tried something new, wobbly counts
//              · good enough today is good enough (a gold sticker)
//  37.8        "Imperfect. | *Still amazing.*"  Sagittarius comes back, big.
//  41.0        LESSON UNLOCKED: "Perfect is boring. | *You’re an adventure.*"  PRESSURE: OFF
//  46.9        "Aim high. | *Miss happily.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VIOLET = '#b98cff', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'
const S = 'sagittarius'

// ── props
const PANCAKES = [
  '....BBBB....',
  '.KKKKKKKKKK.',
  'KCCCCCCCCCCK',
  '.KKKKKKKKKK.',
  'KCCCCCCCCCCK',
  '.KKKKKKKKKK.',
  'KCCCCCCCCCCK',
  '.WWWWWWWWWW.',
]
const PANCAKES_C = { B: '#ffe24a', K: '#3a1a0a', C: '#a0602a', W: '#9aa5c4' }
const BOARD = [
  '.WWWWWWWWWWWW.',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
  '..KK......KK..',
  '..KK......KK..',
]
const BOARD_C = { W: '#ff9a4a', K: INK }
const SOCK = ['.SS.', '.SS.', '.SS.', 'SSSS', 'SSS.']

// a target with an arrow that lands just off the bullseye
function target(x, cx, cy, k, fly) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const R = [[110, RED], [86, CREAM], [62, RED], [38, CREAM], [16, RED]]
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  for (const [r, c] of R) { x.fillStyle = c; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill() }
  // the arrow: flies in from the left, lands at the outer ring
  const ax = lerp(-380, 70, ease.outCubic(fly)), ay = lerp(60, -74, ease.outCubic(fly))
  x.save(); x.translate(ax, ay); x.rotate(-0.3)
  x.fillStyle = INK; x.fillRect(-150, -6, 150, 12); x.fillStyle = '#c98f2a'; x.fillRect(-148, -3, 146, 6)
  x.fillStyle = INK; x.beginPath(); x.moveTo(12, 0); x.lineTo(-10, -14); x.lineTo(-10, 14); x.fill()
  x.fillStyle = PINK; x.fillRect(-160, -16, 26, 12); x.fillRect(-160, 4, 26, 12)
  x.restore()
  x.restore()
}
// a compass with a spinning needle
function compass(x, cx, cy, k, t, settle) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 122, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('N', 0, -80); x.fillText('S', 0, 80); x.fillText('E', 80, 0); x.fillText('W', -80, 0)
  x.rotate(lerp(t * 9, 0.6, settle))
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, -70); x.lineTo(14, 0); x.lineTo(-14, 0); x.fill()
  x.fillStyle = '#5a6698'; x.beginPath(); x.moveTo(0, 70); x.lineTo(14, 0); x.lineTo(-14, 0); x.fill()
  x.restore()
}
// an open book with a bookmark
function book(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -110, 340, 220); x.fillStyle = '#2f6fd0'; x.fillRect(-164, -104, 328, 208)
  x.fillStyle = CREAM; x.fillRect(-154, -96, 150, 190); x.fillRect(4, -96, 150, 190)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) { x.fillRect(-140, -70 + i * 26, 120, 6); x.fillRect(18, -70 + i * 26, 120, 6) }
  x.fillStyle = RED; x.fillRect(80, -130, 26, 90); x.beginPath(); x.moveTo(80, -40); x.lineTo(93, -54); x.lineTo(106, -40); x.fill()
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('p. 12', -80, 80)
  x.restore()
}
// a phone with one match chat bubble
function phone(x, cx, cy, k, msg) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = MINT; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ MATCH', 0, -132)
  x.font = `800 26px ${INTER}`
  msg.forEach(([m, col, kk], i) => { if (kk <= 0.01) return; x.save(); x.translate(i % 2 ? 12 : -12, -56 + i * 60); x.scale(kk, kk); const w = x.measureText(m).width + 28; x.fillStyle = col; x.fillRect(-w / 2, -23, w, 46); x.fillStyle = INK; x.fillText(m, 0, 2); x.restore() })
  x.restore()
}
// a gold star sticker
function sticker(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.12); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(0, 0, 116, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 40 : 90; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Missed the target? | *You still threw.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      target(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.5, 0.9))
      label(x, 800, 1080, 'AIM: IMPROVING', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said the wrong thing? | *Laugh, then apologise.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'oops. that | came out wrong', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 980, 'SORRY + HUG', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plans changed? | *That’s just life.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      compass(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), t, ease.outCubic(prog(lt, 1.0, 1.5)))
      label(x, 800, 1080, 'ROUTE: UPDATED', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Burnt the pancakes? | *Still breakfast.*', mood: lt => lt > 1.2 ? 'wink' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, PANCAKES, PANCAKES_C, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 680, 'CRISPY ON PURPOSE', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Page twelve? | *Still reading.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      book(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1100, 'NO RUSH', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 38, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Awkward first date? | *Great story later.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), [['so… that', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['was fun?', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['haha YES', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2)]])
      label(x, 790, 1110, 'STORY: LEGENDARY', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Messy room? | *Proof you’re living.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const COLS = [PINK, MINT, SKYB, GOLD, LAV]
      const SP = [[690, 1040, -0.4], [830, 1080, 0.3], [930, 980, 1.1], [740, 900, 0.8], [880, 850, -0.9]]
      SP.forEach(([sx, sy, r], i) => drawBits(x, SOCK, { S: COLS[i] }, sx, sy, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { rot: r }))
      label(x, 800, 680, 'CHAOS: COZY', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tried something new? | *Wobbly counts.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -40, y: -40 }, squash: lt => 0.05 * Math.sin(lt * 9),
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOARD, BOARD_C, 500 + Math.sin(t * 5) * 20, 1050, 22 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: 0.08 * Math.sin(t * 7) })
      label(x, 800, 680, 'BALANCE: SORT OF', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Good enough today? | *Is good enough.*', mood: 'heart', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      sticker(x, 800, 860, pop01(t, P.t0 + 0.3, 0.3, 2.6))
      label(x, 800, 1090, 'GOOD ENOUGH ✦', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 0.6, 8, 170, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0645', key: 'G', accent: VIOLET, solo: S, ending: 'lesson',
  title: 'Sag, you don’t have | *to be perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Imperfect. | *Still amazing.*', mood: 'sparkle' },
  lesson: { text: 'Perfect is boring. | *You’re an adventure.*', chip: 'PRESSURE: OFF' },
  last: {
    text: 'Aim high. | *Miss happily.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1000, t - lt + 0.6, 10, 260, 0.4); hearts(x, t, 540, 1250, t - lt + 0.4, { n: 7, life: 2.2, spread: 640, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
