// r2a0252: star_advice, ADVICE SOLO, "How to thank | a Capricorn." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a true thing about Capricorn + a warm way to thank them.
//   0.0–3.6    "How to thank | *a Capricorn.*"
//   3.6–37.8   nine cards (3.8 s each):
//              fixed it quietly, notice out loud · planned everything, plan one day for them · never asks for credit, give
//              a gold star · says "it was nothing", it was a lot · works late, bring dinner · gift idea: a really good pen
//              · hates a fuss, a small note lands · always the strong one, ask how they are · always shows up, say you see it
//  37.8        group ending: "Thank them. | *Watch them blush.*"  Capricorn comes back, big, secretly thrilled.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CAP = '#2fc79a', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'capricorn'

function slab(x, cx, cy, w, h, k, { rot = 0.04, bg = BONE, edge = INK } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(x)
  x.restore()
}
const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

const WRENCH = [
  '.GG...GG.',
  '.GG...GG.',
  '.GGGGGGG.',
  '..GGGGG..',
  '...GGG...',
  '...GGG...',
  '...GGG...',
  '...GGG...',
  '...GGG...',
  '...GGG...',
  '..GGGGG..',
  '..GgggG..',
  '..GGGGG..',
]
const STAR5 = [
  '....Y....',
  '....Y....',
  '...YYY...',
  'YYYYYYYYY',
  '.YYYYYYY.',
  '..YYYYY..',
  '..YY.YY..',
  '.YY...YY.',
]
// a little faucet that stops dripping once fixed
function faucet(x, t, cx, cy, k, fixed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -60, 230, 70); x.fillRect(40, -60, 70, 150)
  x.fillStyle = '#a9a9bd'; x.fillRect(-142, -52, 214, 54); x.fillRect(48, -52, 54, 134)
  x.fillStyle = INK; x.fillRect(-120, -110, 60, 60); x.fillStyle = RED; x.fillRect(-112, -102, 44, 44)
  if (!fixed) for (let i = 0; i < 3; i++) { const ph = (t * 1.6 + i / 3) % 1; x.fillStyle = SKYB; x.fillRect(66, 100 + ph * 140, 18, 24) }
  x.restore()
}
// a planner page with one gold sticky note on top
function planner(x, t, cx, cy, k, lt) {
  slab(x, cx, cy, 300, 380, k, { rot: 0.04, bg: CREAM }, x => {
    x.fillStyle = CAP; x.fillRect(-150, -190, 300, 50)
    txt(x, 'THE PLAN', 0, -165, 26, INK, MONO, 700)
    for (let i = 0; i < 6; i++) { x.fillStyle = '#d8d0c0'; x.fillRect(-120, -110 + i * 46, 240, 6); x.fillStyle = '#6b62a8'; x.fillRect(-120, -126 + i * 46, 60 + (i * 37) % 120, 10) }
    const s = ease.outBack(prog(lt, 0.9, 1.25))
    if (s > 0.01) {
      x.save(); x.translate(20, 40); x.rotate(-0.08); x.scale(s, s)
      x.fillStyle = INK; x.fillRect(-120, -80, 240, 160); x.fillStyle = GOLD; x.fillRect(-112, -72, 224, 144)
      txt(x, 'YOUR DAY OFF', 0, -24, 26, INK); txt(x, '(we planned it)', 0, 24, 22, '#6b4a1a', MONO, 700)
      x.restore()
    }
  })
}
// a desk lamp and a takeout box sliding in
function lamp(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(255,230,150,0.18)'; x.beginPath(); x.moveTo(-40, -90); x.lineTo(40, -90); x.lineTo(140, 150); x.lineTo(-140, 150); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-90, 140, 180, 30); x.fillRect(-10, -60, 20, 210)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -60); x.lineTo(70, -60); x.lineTo(40, -140); x.lineTo(-40, -140); x.closePath(); x.fill()
  x.fillStyle = CAP; x.beginPath(); x.moveTo(-60, -66); x.lineTo(60, -66); x.lineTo(34, -132); x.lineTo(-34, -132); x.closePath(); x.fill()
  x.restore()
}
function takeout(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-100, -70); x.lineTo(100, -70); x.lineTo(80, 90); x.lineTo(-80, 90); x.closePath(); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-92, -62); x.lineTo(92, -62); x.lineTo(74, 82); x.lineTo(-74, 82); x.closePath(); x.fill()
  x.fillStyle = RED; x.fillRect(-40, -10, 80, 50)
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(0, -70, 60, Math.PI, 0); x.stroke()
  for (let i = 0; i < 3; i++) { x.fillStyle = `rgba(255,255,255,${0.5 - i * 0.12})`; const ph = (t * 0.8 + i / 3) % 1; x.fillRect(-30 + i * 30 + Math.sin(t * 3 + i) * 6, -90 - ph * 80, 10, 26) }
  x.restore()
}
// a fancy fountain pen
function pen(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.6); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -34, 330, 68); x.beginPath(); x.moveTo(130, -34); x.lineTo(220, 0); x.lineTo(130, 34); x.fill()
  x.fillStyle = '#1f6b55'; x.fillRect(-192, -26, 200, 52)
  x.fillStyle = GOLD; x.fillRect(8, -26, 22, 52); x.fillRect(-150, -38, 120, 14)
  x.fillStyle = '#d8dbe8'; x.fillRect(30, -26, 100, 52); x.beginPath(); x.moveTo(130, -26); x.lineTo(206, 0); x.lineTo(130, 26); x.fill()
  x.fillStyle = INK; x.fillRect(150, -2, 50, 4)
  x.restore()
}
// a folded note card
function note(x, t, cx, cy, k) {
  slab(x, cx, cy, 260, 170, k, { rot: -0.05, bg: CREAM }, x => {
    txt(x, 'thank you.', 0, -10, 40, INK, "'EB Garamond', Georgia, serif", 600)
    x.fillStyle = PINK; x.fillRect(-14, 40, 28, 22)
  })
}

const CAMEOS = [
  { sign: S, cap: 'Fixed it quietly? | *Notice out loud.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      faucet(x, t, 800, 780, 1.25 * pop01(t, P.t0 + 0.2, 0.35, 2), lt > 0.8)
      drawBits(x, WRENCH, { G: '#a9a9bd', g: '#6b6b80' }, 470, 900, 10 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.5 })
      bubble(x, 790, 1080, 'you FIXED it!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'They plan everything. | *Plan one day for them.*', mood: lt => lt > 1.3 ? 'wide' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      planner(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      sparkles(x, t, 810, 900, P.t0 + 1.3, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Never ask for credit? | *Give it anyway.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.6, 1.1)) : ease.outCubic(prog(lt, 0.6, 1.1))
      if (lt > 0.55) drawBits(x, STAR5, { Y: GOLD }, F.x + 100, lerp(500, F.cy + 40, d), 9)
      label(x, 780, 760, 'EMPLOYEE OF', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 840, 'FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 46, bg: GOLD, rot: 0.03 })
      sparkles(x, t, F.x + 100, F.cy + 40, P.t0 + 1.3, 7, 130, 0.3)
    } },
  { sign: S, cap: 'They say “it was nothing.” | *It was a lot.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 450, 620, 'it was nothing', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bc' })
      // a tall tower of boxes they quietly carried
      const n = Math.floor(clamp((lt - 0.5) / 0.8) * 5)
      for (let i = 0; i < n; i++) { const y = 1150 - i * 92; x.fillStyle = INK; x.fillRect(700, y - 84, 180, 88); x.fillStyle = WOOD; x.fillRect(708, y - 76, 164, 72); x.fillStyle = '#a8731f'; x.fillRect(780, y - 76, 20, 72) }
      label(x, 790, 610, 'IT WAS A LOT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Working late again? | *Bring them dinner.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      lamp(x, t, 690, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      const s = ease.outCubic(prog(lt, 0.8, 1.2))
      if (s > 0) takeout(x, t, lerp(1150, 880, s), 1080, 0.85)
      label(x, 690, 640, 'OVERTIME', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Gift idea? | A *really good pen.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.1, 1.6],
    front(x, t, lt, P) {
      pen(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 870, P.t0 + 0.6, 8, 200, 0.5)
      label(x, 790, 1110, 'BEST GIFT EVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They hate a fuss. | *A small note lands.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      note(x, t, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1080, 'KEPT IN WALLET', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Always the strong one? | *Ask how they are.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 810, 980, 180 * k, { mood: 'happy', look: [-1, 0], seed: 41, glyph: false })
      bubble(x, 790, 680, 'how are YOU?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 430, 600, '…me?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'They always show up. | *Say you see it.*', mood: 'heart', star: { x: 0, y: 10, s: 320 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      hearts(x, t, 540, 820, P.t0 + 0.8, { n: 9, life: 2.2, spread: 560, cell: 8, seed: 4 })
      label(x, 540, 1150, 'SEEN. THANK YOU.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: CAP, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0252', key: 'F', accent: CAP, solo: S, ending: 'group',
  title: 'How to thank | *a Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Thank them. | *Watch them blush.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
