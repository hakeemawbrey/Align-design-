// r2t0433: star_talk, ROLL CALL, "The signs at | *a cooking class.*" (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself at a cooking class. Ending: callback.
//   0.0–3.6    hook · 3.6–49.2 twelve cards (3.8 s each):
//              ♈ done in 4 minutes, it was a 2-hour bread · ♉ ate the ingredients before class · ♊ asked 40 questions, didn't cook
//              · ♋ made soup for the whole street (serves 80) · ♌ a chef hat three feet tall · ♍ measured the salt grain by grain
//              · ♎ asked everyone to taste, still deciding · ♏ secret ingredient: won't say, ever · ♐ ignored the recipe, invented a cuisine
//              · ♑ left with a job at the restaurant · ♒ ketchup on the cake, on purpose · ♓ chopped onions, blamed the onions
//  49.2        "Dinner is… | *served?*"
//  52.6        callback: "Aries’ bread? | *Still rising.*"  the raw bread comes back, rising.
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
const BREAD = ['...DDDDDDDD...', '.DDDDDDDDDDDD.', 'DDdDDDdDDDdDDD', 'DDDDDDDDDDDDDD', 'DDDDDDDDDDDDDD', '.DDDDDDDDDDDD.']
const BREAD_C = { D: '#f6e2b8', d: '#e0c58e' }
const BOWL = ['K..........K', 'KWWWWWWWWWWK', '.KWWWWWWWWK.', '..KWWWWWWK..', '...KKKKKK...']
const BOWL_C = { K: INK, W: SKYB }
const POT = ['..KKKKKKKKKKKK..', '.KSSSSSSSSSSSSK.', 'KKKKKKKKKKKKKKKK', 'K.KMMMMMMMMMMK.K', '..KMMMMMMMMMMK..', '..KMMMMMMMMMMK..', '..KMMMMMMMMMMK..', '...KKKKKKKKKK...']
const POT_C = { K: INK, S: '#ffd27a', M: '#a9a9bf' }
const HAT = ['.WWWWW.', 'WWWWWWW', 'WWWWWWW', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', 'KKKKKKK']
const HAT_C = { W: '#ffffff', K: '#d8dbe8' }
const JAR = ['.KKKKKK.', 'KLLLLLLK', 'KJJJJJJK', 'KJJQQJJK', 'KJJJQJJK', 'KJJQJJJK', 'KJJJJJJK', 'KJJQJJJK', '.KKKKKK.']
const JAR_C = { K: INK, L: '#8a4a2e', J: '#b07bff', Q: CREAM }
const CAKE = ['....C..C..C....', '..PPPPPPPPPPP..', '..PRPRRPPRRPP..', '..BBBBBBBBBBB..', '.BBBBBBBBBBBBB.', '.PPPPPPPPPPPPP.', 'BBBBBBBBBBBBBBB', 'KKKKKKKKKKKKKKK']
const CAKE_C = { C: GOLD, P: PINK, R: RED, B: '#c98f5a', K: '#8a4a2e' }
const ONION = ['....G....', '...GG....', '..WWWWW..', '.WWwWWWW.', 'WWWWwWWWW', 'WWWWWwWWW', '.WWWWWWW.', '..WWWWW..']
const ONION_C = { G: GREEN, W: '#f4e6f6', w: '#d8b6e0' }

const CAMEOS = [
  { sign: 'aries', cap: 'Done in 4 minutes. | It was *a 2-hour bread.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.5, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, BREAD, BREAD_C, 790, 900, 20, P.t0 + 0.2)
      label(x, 790, 680, 'DONE! ✓', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1090, 'BREAD: RAW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ate the ingredients. | *Before class.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, BOWL, BOWL_C, 790, 900, 22, P.t0 + 0.2)
      sheet(x, 790, 700, pop01(t, P.t0 + 0.5, 0.3, 2), { w: 300, h: 190, head: 'RECIPE', headCol: GOLD, scale: 1, rows: [['butter: gone', RED, 1], ['flour: gone?', RED, pop01(t, P.t0 + 1.2, 0.2, 2)]] })
      bubble(x, 800, 1090, 'it was a snack', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Asked 40 questions. | *Cooked nothing.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const Q = ['why salt?', 'is soup a drink?', 'who invented forks?']
      Q.forEach((q, i) => bubble(x, 770 + (i % 2) * 30, 660 + i * 170, q, pop01(t, P.t0 + 0.2 + i * 0.5, 0.25, 2.2), { size: 34, col: i === 1 ? GOLD : BONE, tail: 'bl' }))
      label(x, 790, 1150, 'QUESTION 40', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made soup | *for the whole street.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, POT, POT_C, 790, 900, 22, P.t0 + 0.2)
      label(x, 790, 680, 'SERVES: 80', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 120, cell: 6, seed: 4 })
      label(x, 790, 1100, 'TAKE SOME HOME ♡', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wore a chef hat. | *Three feet tall.*', mood: 'sparkle', star: { x: -120, y: 120, s: 260 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      if (k > 0.01) drawBits(x, HAT, HAT_C, F.x, F.top - 14 * 20 * k / 2 + 14, 20, { sy: k })
      label(x, 790, 760, 'TALLEST HAT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1050, 'call me chef', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Measured the salt. | *Grain by grain.*', mood: 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 380 + Math.floor(clamp((lt - 0.3) / 1.8) * 32)
      label(x, 790, 720, `GRAIN #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: '#b6e08a', rot: -0.04, font: MONO, weight: 700 })
      x.fillStyle = '#ffffff'; for (let i = 0; i < 9; i++) if (lt > 0.4 + i * 0.1) x.fillRect(740 + (i % 3) * 30, 900 + Math.floor(i / 3) * 26, 10, 10)
      label(x, 790, 1080, 'CLASS ENDED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Asked everyone to taste. | *Still deciding.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 11)
      label(x, 790, 760, `TASTER #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1000, 'more salt? | less salt?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Secret ingredient? | *Won’t say. Ever.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, JAR, JAR_C, 790, 880, 22, P.t0 + 0.2)
      label(x, 790, 640, 'TOP SECRET', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: '#b07bff', color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1110, 'it’s love. | (it’s not.)', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Ignored the recipe. | *Invented a cuisine.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      sheet(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 200, head: 'RECIPE', headCol: SLATE, scale: 1, rows: [['step 1: ...', '#9a90b8', 1], ['(skipped)', RED, pop01(t, P.t0 + 0.8, 0.2, 2)]] })
      label(x, 790, 1060, 'NEW CUISINE ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 1000, P.t0 + 1.4, 7, 160, 0.3)
    } },
  { sign: 'capricorn', cap: 'Came to learn. | *Left with a job.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 330, head: 'OFFER', headCol: MINT, rows: [
        ['role: head chef', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['start: monday', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['signed ✓', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'aquarius', cap: 'Ketchup on the cake. | *On purpose.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, t, CAKE, CAKE_C, 790, 900, 20, P.t0 + 0.2)
      bubble(x, 790, 680, 'trust me', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1090, 'IT’S… GOOD?!', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: '#6fd6ff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Chopped onions. | *Blamed the onions.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, ONION, ONION_C, 790, 880, 22, P.t0 + 0.2)
      bubble(x, 790, 660, 'it’s the onions', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 790, 1090, '(it’s a sad film)', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0433', key: 'G', accent: '#ffd27a', ending: 'callback',
  title: 'The signs at | *a cooking class.*',
  cameos: CAMEOS,
  group: { cap: 'Dinner is… | *served?*' },
  last: {
    text: 'Aries’ bread? | *Still rising.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.4, 0.4, 2), rise = 1 + 0.5 * ease.inOutCubic(prog(lt, 0.8, 3.2))
      drawBits(x, BREAD, BREAD_C, 540, 1100 - 60 * (rise - 1), 30 * k, { sy: rise })
      label(x, 540, 1300, 'HOUR 3', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 48, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
