// r2a0521: star_advice, ADVICE SOLO, "How to surprise | *a Scorpio.*" (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine gentle ways to surprise a Scorpio, each a relatable truth + a warm reframe. Ending: callback.
//   0.0–3.6    "How to surprise | *a Scorpio.*"
//   3.6–37.8   nine cards: they'll guess it anyway, let them win · skip the crowd, a table for two · they love a mystery,
//              leave clues · write it by hand · take them stargazing, find their sign · say the real thing
//              · ask the deep question · they act unbothered, they're melting inside · wrap it in black, obviously
//  37.8        "Make it personal. | *Not loud.*"
//  41.2        CALLBACK: "They knew all along. | *Still loved it.*"  the magnifying glass comes back; the Scorpio beams.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c97bff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }
const S = 'scorpio'

function txt(x, s, px, py, size, col = INK, align = 'center', font = INTER, w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function sheet(x, cx, cy, w, h, k, rot, fn, bg = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
function giftBox(x, cx, cy, k, { box = PINK, lid = '#ff6b9a', ribbon = GOLD, s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-130, -96, 260, 226); x.fillRect(-146, -136, 292, 60)
  x.fillStyle = box; x.fillRect(-120, -86, 240, 206)
  x.fillStyle = lid; x.fillRect(-136, -126, 272, 44)
  x.fillStyle = ribbon; x.fillRect(-18, -126, 36, 246)
  x.fillStyle = INK; x.fillRect(-64, -178, 52, 40); x.fillRect(12, -178, 52, 40)
  x.fillStyle = ribbon; x.fillRect(-56, -170, 38, 26); x.fillRect(18, -170, 38, 26)
  x.restore()
}
function magnifier(x, cx, cy, k, rot = -0.6) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-18, 92, 36, 150); x.fillStyle = BROWN; x.fillRect(-10, 100, 20, 134)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 104, 0, 7); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 94, 0, 7); x.fill()
  x.fillStyle = 'rgba(143,227,255,0.45)'; x.beginPath(); x.arc(0, 0, 80, 0, 7); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-50, -50, 26, 14)
  x.restore()
}
const TABLE = ['WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', '......B......', '......B......', '......B......', '.....BBB.....']
const CHAIR = ['K....', 'K....', 'K....', 'KKKKK', 'K...K', 'K...K']
function map(x, cx, cy, k, lt) {
  sheet(x, cx, cy, 320, 260, k, 0.05, () => {
    x.strokeStyle = BROWN; x.lineWidth = 6; x.setLineDash([14, 12]); x.beginPath()
    const p = clamp((lt - 0.4) / 1.2), pts = [[-120, 80], [-60, 20], [10, 60], [60, -20], [100, -70]]
    const n = Math.max(1, Math.ceil(p * (pts.length - 1)))
    x.moveTo(...pts[0]); for (let i = 1; i <= n; i++) x.lineTo(...pts[i]); x.stroke(); x.setLineDash([])
    if (p >= 1) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(80, -90); x.lineTo(120, -50); x.moveTo(120, -90); x.lineTo(80, -50); x.stroke() }
  }, '#f2dca6')
}
function envelope(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -90, 316, 210)
  x.fillStyle = INK; x.fillRect(-162, -106, 324, 212)
  x.fillStyle = CREAM; x.fillRect(-154, -98, 308, 196)
  x.strokeStyle = '#c8b89a'; x.lineWidth = 5; x.beginPath(); x.moveTo(-154, -98); x.lineTo(0, 20); x.lineTo(154, -98); x.stroke()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 20, 34, 0, 7); x.fill()
  txt(x, '♏︎', 0, 22, 34, '#7a1020', 'center', "'Segoe UI Symbol','Noto Sans Symbols',serif", 700)
  txt(x, 'for you', 0, 72, 28, '#4a4470', 'center', "'EB Garamond', Georgia, serif", 500)
  x.restore()
}
// the Scorpio constellation, dot by dot
const SCO = [[-150, -90], [-110, -110], [-70, -96], [-40, -60], [-20, -10], [0, 40], [40, 76], [90, 80], [130, 56], [146, 16], [120, -6]]
function constellation(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const n = Math.floor(clamp((lt - 0.3) / 1.4) * SCO.length)
  x.strokeStyle = 'rgba(239,230,214,0.8)'; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i < n; i++) i ? x.lineTo(...SCO[i]) : x.moveTo(...SCO[i]); x.stroke()
  SCO.forEach(([a, b], i) => { const on = i < n, s = on ? 16 + 3 * Math.sin(t * 5 + i) : 8; x.fillStyle = on ? GOLD : 'rgba(239,230,214,0.35)'; x.fillRect(a - s / 2, b - s / 2, s, s) })
  x.restore()
}
function bigHeart(x, cx, cy, cell) { drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, cx, cy, cell) }

const CAMEOS = [
  { sign: S, cap: 'They’ll guess it anyway. | *Let them win.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      giftBox(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { s: 0.85 })
      const m = ease.outCubic(prog(lt, 0.5, 1.1))
      magnifier(x, lerp(980, 780, m), lerp(1080, 860, m), pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 640, 'SURPRISE: SOLVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 32)
    } },
  { sign: S, cap: 'Skip the crowd. | *A table for two.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TABLE, { W: CREAM, B: BROWN }, 790, 1010, 16 * k)
      drawBits(x, CHAIR, { K: BROWN }, 650, 1030, 14 * k)
      drawBits(x, CHAIR, { K: BROWN }, 930, 1030, 14 * k, { sx: -1 })
    },
    front(x, t, lt, P) {
      L(x, 790, 890, 'RESERVED: 2', pop01(t, P.t0 + 0.6, 0.3, 2.4), GOLD, -0.03, 32)
      L(x, 790, 660, 'GUEST LIST: YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'They love a mystery. | *Leave them clues.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      map(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 640, 'CLUE 1 OF 7', pop01(t, P.t0 + 0.6, 0.3, 2.4), BONE, 0.04, 32)
      bubble(x, 790, 1100, 'oh, it’s ON.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Write it by hand. | It *means everything.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      envelope(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1080, 'READ IT 40 TIMES', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
      if (lt > 1.3) hearts(x, t, 560, 800, P.t0 + 1.4, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Take them stargazing. | *Find their sign.*', mood: lt => lt > 1.7 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -200, y: 60, s: 260 }, hops: [1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      constellation(x, t, 740, 700, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      L(x, 720, 1090, 'FOUND: ♏︎ SCORPIO', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Say the real thing. | *Honesty is the gift.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'i really, really | like you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      L(x, 790, 960, 'NO WRAPPING NEEDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Skip small talk. | Ask *the deep question.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 790, 830, 300, 220, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        txt(x, 'QUESTION', 0, -70, 26, '#4a4470', 'center', MONO, 700)
        txt(x, 'what do you', 0, -6, 36, INK); txt(x, 'dream about?', 0, 46, 36, INK)
      }, '#d8f0ff')
      bubble(x, 790, 1070, 'finally. | a real one.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'They act unbothered. | *They’re melting inside.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      // a little heart on their chest grows and pulses behind the cool face
      const g = clamp((lt - 0.3) / 1.6)
      if (g > 0) bigHeart(x, F.x + 70, F.cy + 70, (4 + 5 * g) * (1 + 0.08 * Math.sin(t * 9)))
      bubble(x, 790, 700, 'oh. cool. | thanks.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 980, 'INSIDE: MELTING', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Wrap it in black. | *Obviously.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      giftBox(x, 790, 890, pop01(t, P.t0 + 0.2, 0.3, 2), { box: '#1e1a2e', lid: '#2a2540', ribbon: RED })
      L(x, 790, 640, 'AESTHETIC: CORRECT', pop01(t, P.t0 + 1.2, 0.3, 2.4), ACC, -0.04, 30)
      sparkles(x, t, 790, 880, P.t0 + 1.2, 7, 170, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0521', key: 'D', accent: ACC, solo: 'scorpio', ending: 'callback',
  title: 'How to surprise | *a Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Make it personal. | *Not loud.*', mood: 'heart' },
  last: {
    text: 'They knew all along. | *Still loved it.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'scorpio', 400, 1130, 360 * k, { mood: lt > 1.5 ? 'heart' : 'wink', look: [1, 0], seed: 33, hops: [t0 + 1.5] })
      giftBox(x, 760, 1200, k, { box: '#1e1a2e', lid: '#2a2540', ribbon: RED, s: 0.75 })
      magnifier(x, 820, 1050, pop01(t, t0 + 0.8, 0.35, 2), -0.5)
      if (lt > 1.5) hearts(x, t, 400, 1000, t0 + 1.5, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
