// v3a047: star_advice, ADVICE SOLO, "Signs you're | a healed Taurus." (~43 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (solo mode, 9 cards): the small, lovely signs a Taurus has grown, one gag each.
// Ending: 'group' (the group beat is the ending: Taurus comes back, big, under the punchline).
//   0.0–3.6    "Signs you're | *a healed Taurus.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a friend picks the music ("my turn!") · lends the favourite sweater: RETURN DATE: WHENEVER
//              · the restaurant's closed: TACOS INSTEAD. FINE. · says sorry first (Scorpio, stunned)
//              · do not disturb: NAP, GUILT-FREE · the budget has a FLOWERS line · takes the new route home: SCENIC
//              · asks for help with the heavy plant · plants a seed and waits: it grows
//  37.8        "Soft. Steady. | *Still you.*"  Taurus comes back, big (the ending).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#2fc79a', LEAF = '#5fd068', BROWN = '#8a4a2e', MOSS = '#9fd36a'
const S = 'taurus'

function slab(x, cx, cy, w, h, k, { bg = BONE, rot = 0, inner = null, pad = 14 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) { x.fillStyle = inner; x.fillRect(-w / 2 + pad, -h / 2 + pad, w - 2 * pad, h - 2 * pad) }
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const SWEATER = ['SS.....SS', 'SSSSSSSSS', 'SSsSSSsSS', '.SSSSSSS.', '.SsSSSsS.', '.SSSSSSS.', '.SSSSSSS.']
const SWEATER_C = { S: '#c97bff', s: '#e6d6ff' }
const POT = ['..L.L.L..', '.LLLLLLL.', 'LLLlLLlLL', '.LLLLLLL.', '..LLLLL..', '...L.L...', 'PPPPPPPPP', '.PPPPPPP.', '.PPPPPPP.', '..PPPPP..']
const POT_C = { L: LEAF, l: '#a8f0a0', P: '#d9744a' }
const TACO = ['...YYYY...', '..YgrgrY..', '.YgrgrgrY.', 'YYYYYYYYYY']
const TACO_C = { Y: '#ffd23a', g: LEAF, r: RED }

const CAMEOS = [
  { sign: S, cap: 'Someone else | *picks the music.* Fine.', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4, 1.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 830, 940, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 81, glyph: false, hops: [P.t0 + 0.9, P.t0 + 1.4] })
      bubble(x, 830, 650, 'my turn!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bc' })
      if (lt > 0.9) notes(x, t, 560, 830, { n: 5, cell: 7, col: MOSS, seed: 2 })
      label(x, 540, 1140, 'NOT MY SONG. STILL BOPPING.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.02, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You lend | the *favourite sweater.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 840, 930, 190 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 82, glyph: false })
      const d = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, SWEATER, SWEATER_C, lerp(F.x + 120, 700, d), lerp(F.cy + 20, 900, d) - Math.sin(Math.PI * d) * 80, 17 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: d * 0.15 })
      label(x, 540, 640, 'RETURN DATE: WHENEVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plans changed. | You *didn’t spiral.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.3],
    front(x, t, lt, P) {
      if (slab(x, 800, 760, 300, 160, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: RED, rot: -0.05 })) {
        txt(x, 'SORRY,', 0, -26, 40, '#fff4e2'); txt(x, 'CLOSED', 0, 28, 48, '#fff4e2', MONO, 700); x.restore()
      }
      drawBits(x, TACO, TACO_C, 800, 990, 22 * pop01(t, P.t0 + 1.0, 0.35, 2))
      label(x, 760, 1130, 'TACOS INSTEAD. FINE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You say *sorry* | first.', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -220, y: 30 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 830, 950, 200 * k, { mood: lt > 1.4 ? 'heart' : lt > 0.8 ? 'wide' : 'squint', look: [-1, 0], seed: 83, glyph: false, hops: lt > 1.4 ? [P.t0 + 1.9] : [] })
      bubble(x, 420, 630, "I'm sorry.", pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 830, 700, 'oh! me too.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 540, 1150, 'PRIDE: STILL INTACT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You rest | *without the guilt.*', mood: 'sleepy', star: { x: -200 },
    front(x, t, lt, P) {
      if (slab(x, 800, 850, 260, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', inner: '#140c30', rot: 0.04 })) {
        x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(0, -80, 60, 0, Math.PI * 2); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(26, -100, 54, 0, Math.PI * 2); x.fill()
        txt(x, 'DO NOT', 0, 40, 34, BONE, MONO, 700); txt(x, 'DISTURB', 0, 84, 34, BONE, MONO, 700)
        x.fillStyle = lt > 0.9 ? TEAL : '#6b62a8'; x.fillRect(-50, 124, 100, 40); x.fillStyle = '#fff'; x.fillRect(lt > 0.9 ? 12 : -46, 128, 34, 32)
        x.restore()
      }
      label(x, 800, 1130, 'NAP: GUILT-FREE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your budget | *includes joy.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 790, 860, 290, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#ffffff', rot: -0.03 })) {
        txt(x, 'BUDGET', 0, -150, 34, INK, MONO, 700)
        const rows = [['rent', '✓'], ['bills', '✓'], ['savings', '✓']]
        rows.forEach(([a, b], i) => { txt(x, a, -50, -84 + i * 56, 28, '#6b62a8', INTER, 700); txt(x, b, 90, -84 + i * 56, 28, TEAL) })
        if (lt > 0.9) { x.fillStyle = '#ffe3ef'; x.fillRect(-130, 70, 260, 70); txt(x, 'FLOWERS', -30, 105, 34, '#ff4f86'); txt(x, '✓', 95, 105, 34, TEAL) }
        x.restore()
      }
      label(x, 790, 1120, 'JOY: BUDGETED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 960, P.t0 + 1.0, 7, 160, 0.3, [PINK, GOLD, BONE])
    } },
  { sign: S, cap: 'You take | the *new way home.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 790, 860, 330, 320, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#d9efc0', rot: 0.03 })) {
        x.fillStyle = '#b9b0a0'; x.fillRect(-140, 100, 280, 24); x.fillRect(116, -120, 24, 244)
        txt(x, 'HOME', 100, -136, 24, INK, MONO, 700)
        const n = Math.floor(clamp((lt - 0.4) / 1.0) * 10)
        x.fillStyle = '#ff4f86'; for (let i = 0; i < n; i++) { const p = i / 9; x.fillRect(lerp(-130, 110, p) - 7, lerp(100, -110, p) - 40 * Math.sin(p * Math.PI) - 7, 14, 14) }
        for (const [fx, fy] of [[-60, -20], [20, -90], [-110, -100]]) { x.fillStyle = GOLD; x.fillRect(fx - 9, fy - 9, 18, 18); x.fillStyle = PINK; x.fillRect(fx - 4, fy - 4, 8, 8) }
        x.restore()
      }
      label(x, 790, 1120, 'NEW ROUTE: SCENIC', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You ask for help. | *Out loud.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -230, y: 30 }, hops: [1.6],
    front(x, t, lt, P) {
      const lift = ease.outCubic(prog(lt, 1.1, 1.5))
      drawBits(x, POT, POT_C, 610, 990 - lift * 60, 21 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 830, 960 - lift * 30, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 84, glyph: false })
      bubble(x, 420, 630, 'little help?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 830, 700, 'ON IT!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05 })
    } },
  { sign: S, cap: 'You plant things | and *let them grow.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 1], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), g = ease.outBack(prog(lt, 0.5, 1.6))
      if (k > 0.01) {
        x.save(); x.translate(800, 1060); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-96, -10, 192, 120); x.fillStyle = '#d9744a'; x.fillRect(-88, -2, 176, 104); x.fillStyle = BROWN; x.fillRect(-88, -2, 176, 22)
        const h = 260 * g
        x.fillStyle = INK; x.fillRect(-9, -h - 4, 18, h + 4); x.fillStyle = LEAF; x.fillRect(-5, -h, 10, h)
        for (let i = 0; i < 3; i++) { const y = -h * (0.35 + i * 0.25), d = i % 2 ? 1 : -1; if (g > 0.3 + i * 0.2) { x.fillStyle = INK; x.fillRect(d > 0 ? 0 : -64, y - 18, 64, 36); x.fillStyle = LEAF; x.fillRect(d > 0 ? 4 : -60, y - 14, 56, 28) } }
        if (g > 0.95) { x.fillStyle = PINK; x.fillRect(-30, -h - 50, 60, 60); x.fillStyle = GOLD; x.fillRect(-12, -h - 32, 24, 24) }
        x.restore()
      }
      label(x, 800, 610, 'PATIENCE: PAID OFF', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
      sparkles(x, t, 800, 760, P.t0 + 1.6, 7, 160, 0.2, [PINK, GOLD, MINT])
    } },
]

const F = makeFilm({
  id: 'v3a047', key: 'E', accent: MOSS, solo: S, ending: 'group',
  title: "Signs you're | *a healed Taurus.*",
  cameos: CAMEOS,
  group: { cap: 'Soft. Steady. | *Still you.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
