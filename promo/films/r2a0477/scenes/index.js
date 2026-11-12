// r2a0477: star_advice, ADVICE SOLO, "How to check in | *on a Gemini.*" (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine kind ways to check in on a Gemini, each a relatable truth + a warm reframe. Ending: callback.
//   0.0–3.6    "How to check in | *on a Gemini.*"
//   3.6–37.8   ask twice, the second answer is real · fifty tabs open, close one together · meme first, then the question
//              · walk and talk · both moods are real (the twins) · a twelve-minute voice note, listen to all of it
//              · bored isn't fine, bring a new plan · they check on everyone, check on them · quiet Gemini, sit with them
//  37.8        "Two moods. | *One big heart.*"
//  41.2        callback: "Down to one tab. | *It’s you.*"  (card two's fifty tabs, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350', GREEN = '#5fd068', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, color = INK } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 320, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a profile card with a sign star inside */
function profile(x, t, cx, cy, k, id, title, { w = 250, h = 320, mood = 'sparkle', rot = 0.05, bg = DEEP, col = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 90)
  signChar(x, t, id, 0, -26, 150, { mood, seed: 71, glyph: false, glow: 0.9, tears: id === 'pisces' ? 1 : 0 })
  x.fillStyle = col; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(title, 0, h / 2 - 38)
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a box with a lid (gift): open = 0…1 lifts the lid */
function giftBox(x, cx, cy, k, open = 0, { body = PINK, ribbon = GOLD, w = 200, h = 160, bow = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = body; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = ribbon; x.fillRect(-14, -h / 2, 28, h)
  const ly = -h / 2 - 30 - open * 120, lr = open * -0.5
  x.save(); x.translate(0, ly); x.rotate(lr)
  x.fillStyle = INK; x.fillRect(-w / 2 - 22, -6, w + 44, 48)
  x.fillStyle = body; x.fillRect(-w / 2 - 16, 0, w + 32, 36)
  x.fillStyle = ribbon; x.fillRect(-14, 0, 28, 36)
  if (bow) { x.fillStyle = INK; x.fillRect(-62, -40, 124, 46); x.fillStyle = ribbon; x.fillRect(-56, -34, 46, 34); x.fillRect(10, -34, 46, 34); x.fillStyle = '#c98f2a'; x.fillRect(-12, -30, 24, 30) }
  x.restore()
  x.restore()
}

const ACC = '#ffd23a'
/** a browser window with a row of tabs; n = how many tabs are open */
function browser(x, cx, cy, k, n, { w = 330, h = 250, rot = 0.04, title = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = DEEP; x.fillRect(-w / 2, -h / 2, w, 54)
  const shown = Math.min(n, 14), tw = (w - 16) / Math.max(1, shown)
  const COLS = [PINK, MINT, SKYB, GOLD, LAV, ORANGE]
  for (let i = 0; i < shown; i++) { x.fillStyle = COLS[i % 6]; x.fillRect(-w / 2 + 8 + i * tw, -h / 2 + 12, Math.max(4, tw - 4), 34) }
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2 + 54, w, h - 54)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (title) { x.font = `800 40px ${INTER}`; x.fillText(title, 0, 30) }
  else { x.font = `700 30px ${MONO}`; x.fillText(`TABS: ${n}`, 0, 30) }
  x.restore()
}
const SHOE = ['....WWW...', '...WWWWW..', '..WPWWWWW.', 'WWWWWWWWWW', 'KKKKKKKKKK']
const SHOE_C = { W: CREAM, P: PINK, K: INK }
const BENCH = ['BBBBBBBBBBBBBBBBBB', 'BBBBBBBBBBBBBBBBBB', '.K..............K.', '.K..............K.', '.K..............K.']
const BENCH_C = { B: BROWN, K: INK }

const CAMEOS = [
  // 1 · ask twice
  { sign: 'gemini', cap: 'Ask twice. | The *second answer* is real.', mood: lt => lt < 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'I’m fine!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 800, 800, 'but really?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      bubble(x, 760, 960, 'ok so actually…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1120, 'THE REAL ONE ♡', pop01(t, P.t0 + 1.7, 0.3, 2.2), ACC, 0.04, 32)
    } },
  // 2 · fifty tabs
  { sign: 'gemini', cap: 'Fifty tabs open? | *Close one together.*', mood: lt => lt < 1.3 ? 'wide' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = lt < 1.2 ? 50 : 49
      browser(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), n)
      if (lt > 1.1 && lt < 1.6) sparkles(x, t, 790, 760, P.t0 + 1.2 * (3.1 / 2.4), 6, 120, 0.2)
      L(x, 790, 640, 'ONE DOWN', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 36)
      bubble(x, 790, 1100, 'that’s a start', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  // 3 · meme first
  { sign: 'gemini', cap: 'Send a meme first. | *Then the real question.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE ♡', headCol: ACC, lines: [
        ['[funny cat]', SKYB, pop01(t, P.t0 + 0.4, 0.2, 2)], ['HAHAHA', BONE, pop01(t, P.t0 + 0.7, 0.2, 2), true], ['you ok tho?', PINK, pop01(t, P.t0 + 1.1, 0.2, 2)], ['…not really', BONE, pop01(t, P.t0 + 1.5, 0.2, 2), true],
      ] })
      L(x, 790, 1130, 'DOOR: OPEN', pop01(t, P.t0 + 1.9, 0.3, 2.2), MINT, 0.04, 32)
    } },
  // 4 · walk and talk
  { sign: 'gemini', cap: 'Walk and talk. | They *open up moving.*', mood: 'sparkle', star: ST, hops: [0.5, 0.9, 1.3, 1.7, 2.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SHOE, SHOE_C, 720, 1080, 14 * k, { rot: Math.sin(t * 8) * 0.06 })
      drawBits(x, SHOE, SHOE_C, 870, 1060, 14 * k, { rot: -Math.sin(t * 8) * 0.06 })
      const f = Math.floor(clamp((lt - 0.5) / 1.6) * 4)
      L(x, 790, 680, 'STEPS: LOTS', pop01(t, P.t0 + 0.4, 0.3, 2), SKYB, -0.04, 32)
      L(x, 790, 850, `FEELINGS SHARED: ${f}`, pop01(t, P.t0 + 0.9, 0.3, 2), PINK, 0.04, 28)
    } },
  // 5 · both moods
  { sign: 'gemini', cap: 'Both moods are real. | *Love the pair.*', mood: 'sparkle', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.35, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 760, 960, 230 * k, { mood: 'sleepy', seed: 31, glyph: false, hops: [P.t0 + 1.2] })
      L(x, 380, 680, 'HYPE', pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.06, 36)
      L(x, 760, 760, 'NAP', pop01(t, P.t0 + 0.8, 0.3, 2), LAV, 0.06, 36)
      L(x, 570, 1150, 'BOTH VALID', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.03, 36)
      hearts(x, t, 570, 900, P.t0 + 1.6, { n: 4, life: 1.6, spread: 300, cell: 7, seed: 3 })
    } },
  // 6 · the long voice note
  { sign: 'gemini', cap: 'Got a twelve-minute voice note? | *Listen to all of it.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k); x.rotate(0.03)
        x.fillStyle = INK; x.fillRect(-176, -66, 352, 132); x.fillStyle = PINK; x.fillRect(-168, -58, 336, 116)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -24); x.lineTo(-100, 0); x.lineTo(-140, 24); x.closePath(); x.fill()
        const pr = clamp((lt - 0.4) / 1.8)
        for (let i = 0; i < 16; i++) { const hh = 14 + 30 * Math.abs(Math.sin(i * 1.7 + 0.5)); x.fillStyle = i / 16 < pr ? INK : 'rgba(27,18,54,0.35)'; x.fillRect(-80 + i * 14, -hh / 2, 8, hh) }
        x.restore()
      }
      L(x, 790, 1020, '12:47 · PLAYING', pop01(t, P.t0 + 0.6, 0.3, 2), CREAM, 0.04, 30)
      L(x, 790, 700, 'EVERY SECOND ♡', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 32)
    } },
  // 7 · bored isn't fine
  { sign: 'gemini', cap: 'Bored isn’t fine. | *Bring a new plan.*', mood: lt => lt < 1.2 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 880, pop01(t, P.t0 + 0.6, 0.3, 2), ['NEW PLAN', 'pottery?', 'night market?', 'both?!'], { w: 320, bg: SKYB, size: 34, rot: 0.05 })
      bubble(x, 790, 620, 'so bored…', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 1.0, 1.2)), { size: 40, col: LAV, tail: 'bl' })
      L(x, 790, 1120, 'SPARK: BACK', pop01(t, P.t0 + 1.5, 0.3, 2.2), ACC, -0.04, 34)
    } },
  // 8 · they check on everyone
  { sign: 'gemini', cap: 'They check on everyone. | *Check on them.*', mood: lt => lt < 1.4 ? 'happy' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const sent = ['u ok, Leo?', 'u ok, Libra?', 'u ok, Aries?'].map((s, i) => [s, BONE, pop01(t, P.t0 + 0.3 + i * 0.25, 0.2, 2), true])
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'SENT', headCol: SKYB, lines: [...sent, ['u ok, Gemini? ♡', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)]] })
      hearts(x, t, 560, 1100, P.t0 + 1.6, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 6 })
    } },
  // 9 · quiet Gemini
  { sign: 'gemini', cap: 'Quiet Gemini? | *Just sit with them.*', mood: 'happy', star: { x: -150, y: 20 },
    back(x, t, lt, P) {
      drawBits(x, BENCH, BENCH_C, 540, 1100, 26 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 730, 930, 220 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      L(x, 540, 640, 'NO WORDS NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.03, 34)
      if (lt > 1.6) hearts(x, t, 560, 820, P.t0 + 1.6 * (3.1 / 2.4), { n: 3, life: 1.4, spread: 100, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0477', key: 'F', accent: ACC, solo: 'gemini', ending: 'callback',
  title: 'How to check in | *on a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Two moods. | *One big heart.*', mood: 'heart' },
  last: {
    text: 'Down to one tab. | *It’s you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      browser(x, 540, 1000, 1.7 * pop01(t, t0 + 0.4, 0.4, 2), 1, { title: 'you ♡', rot: -0.03 })
      signChar(x, t, 'gemini', 540, 1330, 200 * pop01(t, t0 + 0.8, 0.4, 2), { mood: 'heart', seed: 9, glyph: false, hops: [t0 + 1.4] })
      hearts(x, t, 540, 900, t0 + 1.0, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
