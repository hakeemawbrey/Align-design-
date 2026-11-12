// r2a0432: star_advice, ADVICE SOLO, "Sagittarius, you’re allowed | *to change your mind.*" (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Sagittarius truth + a warm reframe, one light gag each.
// Ending: callback.
//   0.0–3.6    hook · 3.6–37.8 nine cards:
//              new plan by Tuesday (PLAN v14) · changed the destination, still an adventure · quit the hobby, kept the skill
//              · third new era this year · changed your mind mid-sentence · your opinion evolved · left the party early
//              · your chart says wanderer · said yes, then no: honesty wins
//  37.8        "Free spirit. | *Free to choose.*"
//  41.2        callback: "Plan v14? | *Make it v15.*"  the plan comes back, one version newer.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff8ea', SLATE = '#9fb4c8', WOOD = '#c98f5a', SAND = '#f3d79a', ORANGE = '#ffb34a', GREEN = '#5fd068', BROWN = '#8a4a2e'
// ── shared props (each film carries its own copy)
/** a paper sheet / screen with a coloured header and text rows: [text, colour?, k?] */
function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30, scale = 1.12, paper = CREAM, ink = INK, font = MONO } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 60 : 0) + 44
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    x.fillText(txt, -w / 2 + 22, top + i * (size + 16)); x.restore()
  })
  x.restore()
}
/** a phone with message bubbles: [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 28
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 14, 2)
    x.restore()
  })
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k, r = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 150, k * r / 150); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18
    const py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a pixel bitmap that pops in at t0 (cell size c) */
const bits = (x, t, bm, cols, cx, cy, c, t0, o = {}) => drawBits(x, bm, cols, cx, cy, c * pop01(t, t0, 0.3, 2), o)
const S = 'sagittarius', PURP = '#b07bff'
const TICKET = ['KKKKKKKKKKKKKKKK', 'KPPPPPPPPPPKWWWK', 'KPWWWWWWWPPKWWWK', 'KPPPPPPPPPPKWWWK', 'KPWWWWWPPPPKWWWK', 'KPPPPPPPPPPKWWWK', 'KKKKKKKKKKKKKKKK']
const TICKET_C = { K: INK, P: GOLD, W: CREAM }
const GUITAR = ['.........KK', '........KK.', '.......KK..', '......KK...', '..OOOKK....', '.OOOOOO....', 'OOOKKOOO...', 'OOOKKOOO...', '.OOOOOO....', '..OOOO.....']
const GUITAR_C = { K: BROWN, O: ORANGE }
const DOOR = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWBBBBBBWK', 'KWBBBBBBWK', 'KWBBBBBBWK', 'KWBBBBBGWK', 'KWBBBBBBWK', 'KWBBBBBBWK', 'KWBBBBBBWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const DOOR_C = { K: INK, W: '#c98f5a', B: '#8a4a2e', G: GOLD }
// the evolving plan: a sheet whose version number ticks up
function plan(x, t, cx, cy, k, v, { strike = 0 } = {}) {
  sheet(x, cx, cy, k, { w: 320, h: 360, head: `PLAN v${v}`, headCol: PURP, rows: [
    ['~beach~', '#9a90b8', 1], ['~mountains~', '#9a90b8', 1], [v >= 15 ? 'go see. ✓' : 'desert??', INK, 1],
  ] })
  if (k > 0.5 && strike) { x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k * 1.12, k * 1.12); x.fillStyle = RED; x.fillRect(-140, -46, 190 * strike, 5); x.fillRect(-140, 0, 250 * strike, 5); x.restore() }
}

const CAMEOS = [
  { sign: S, cap: 'New plan by Tuesday? | *That’s growth.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plan(x, t, 780, 850, pop01(t, P.t0 + 0.15, 0.3, 2), 11 + Math.min(3, Math.floor(clamp((lt - 0.3) / 1.2) * 4)), { strike: clamp((lt - 0.4) / 0.6) })
      label(x, 780, 1110, 'UPDATED, NOT FLAKY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Changed the destination? | *Still an adventure.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, TICKET, TICKET_C, 790, 800, 18, P.t0 + 0.2, { rot: -0.06 })
      label(x, 790, 640, lt < 1.1 ? 'TO: SNOW' : 'TO: SUN', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: lt < 1.1 ? SKYB : GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1040, 'both sound fun', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Quit the hobby? | You *kept the skill.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, GUITAR, GUITAR_C, 790, 860, 24, P.t0 + 0.2, { rot: 0.1 })
      label(x, 790, 650, 'WEEK 3 OF GUITAR', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'KNOWS 1 SONG ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Third new era | *this year? Valid.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const ERAS = [['ERA 1: COWBOY', ORANGE], ['ERA 2: POET', LAV], ['ERA 3: GARDENER', MINT]]
      ERAS.forEach(([e, c], i) => label(x, 790, 700 + i * 150, e, pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.2), { size: 30, bg: c, rot: (i - 1) * 0.05, font: MONO, weight: 700 }))
      sparkles(x, t, 790, 1000, P.t0 + 1.3, 7, 150, 0.2)
    } },
  { sign: S, cap: 'Changed your mind | *mid-sentence? Fine.*', mood: lt => lt > 1.0 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'let’s get pizza—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 880, 'actually, tacos?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      label(x, 790, 1080, 'BOTH: FINE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your opinion grew up. | *Say so proudly.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 780, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 330, h: 330, head: 'OPINIONS', headCol: GOLD, rows: [
        ['olives: gross', '#9a90b8', 1], ['olives: ok?', INK, pop01(t, P.t0 + 0.7, 0.2, 2)], ['olives: ♡', PINK, pop01(t, P.t0 + 1.2, 0.2, 2)],
      ] })
      label(x, 780, 1090, 'UPDATE INSTALLED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Left the party early? | *Your call.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      bits(x, t, DOOR, DOOR_C, 790, 860, 26, P.t0 + 0.2)
      bubble(x, 790, 620, 'bye, love you all', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 790, 1110, 'PAJAMAS: ON', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your chart says wanderer. | *Wander kindly.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 135)
      label(x, 790, 1070, 'ROUTE: OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PURP, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said yes, then no? | *Honesty wins.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'yes!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, tail: 'bl' })
      bubble(x, 800, 880, 'actually, no ♡', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      signChar(x, t, 'libra', 820, 1060, 140 * pop01(t, P.t0 + 1.3, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 640, 1110, 'thanks for saying', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 28, col: BONE, tail: 'br' })
    } },
]

const F = makeFilm({
  id: 'r2a0432', key: 'F', accent: PURP, solo: S, ending: 'callback',
  title: 'Sagittarius, you’re allowed | *to change your mind.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Free to choose.*', mood: 'sparkle' },
  last: {
    text: 'Plan v14? | *Make it v15.*',
    draw(x, t, lt) {
      const t0 = t - lt
      plan(x, t, 540, 1050, pop01(t, t0 + 0.5, 0.4, 2) * 1.3, lt > 1.3 ? 15 : 14)
      sparkles(x, t, 540, 1050, t0 + 1.3, 8, 260, 0.3)
    },
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-200px', width: '1480px', transformOrigin: '50% 0', transform: 'scale(0.7)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
