// r2t0038: THE SIGNS AS… v3 SOLO, "Tauruses on a day off | be like." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: callback.
//   0.0–3.6    "Tauruses on a day off | *be like.*"
//   3.6–37.8   woke at noon, called it early · breakfast, then second breakfast · a nap in two parts · bed to sofa
//              (commute: 3 steps) · "plans?" "bed." · bath till hour three · profile status: horizontal · takeout for
//              lunch AND dinner · watered one plant (chores: done)
//  37.8        "Zero plans. | *Fully booked.*"
//  41.2        CALLBACK: "The nap? | *To be continued.*" (NAP: PART 3)  Taurus back on the pillow.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'taurus', GREEN = '#7ee08a', RED = '#e23d4e', NAVY = '#2a2350', ORANGE = '#ffb34a', BROWN = '#8a4a2e', WOOD = '#b77a45'
function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

function clock(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -80, 340, 160); box(x, -170, -80, 340, 160, NAVY); x.fillStyle = '#140c30'; x.fillRect(-150, -60, 300, 120)
  x.shadowColor = RED; x.shadowBlur = 20; txt(x, '12:47', 0, 4, 84, '#ff6b6b', { font: MONO, weight: 700 })
  x.restore()
}
function plate(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 120, 40, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, 0, 112, 33, 0, 0, Math.PI * 2); x.fill()
  const foods = [[GOLD, '#fff'], [ORANGE, BROWN], [PINK, GREEN]][n % 3]
  x.fillStyle = INK; x.fillRect(-56, -40, 112, 40); x.fillStyle = foods[0]; x.fillRect(-50, -34, 100, 30); x.fillStyle = foods[1]; x.fillRect(-20, -46, 40, 14)
  x.restore()
}
function pillow(x, cx, cy, k, col = LAV) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -50, 340, 110); box(x, -170, -50, 340, 110, col); x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-150, -36, 120, 20)
  x.restore()
}
function sofa(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -170, -110, 340, 210); box(x, -170, -110, 340, 120, '#c96a3a'); box(x, -190, -20, 380, 100, '#e08050')
  box(x, -210, -60, 40, 140, '#c96a3a'); box(x, 170, -60, 40, 140, '#c96a3a')
  x.restore()
}
function bed(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -110, -40, 220, 80, SKYB); box(x, -130, -90, 30, 160, WOOD); box(x, -90, -64, 70, 30, BONE)
  x.restore()
}
function tub(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 9; i++) { const bx = -200 + i * 50, by = -60 + Math.sin(t * 2 + i) * 8; x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(bx, by, 28, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-250, -40); x.lineTo(250, -40); x.lineTo(220, 110); x.lineTo(-220, 110); x.fill()
  x.fillStyle = '#e8ecf6'; x.beginPath(); x.moveTo(-240, -34); x.lineTo(240, -34); x.lineTo(212, 102); x.lineTo(-212, 102); x.fill()
  box(x, -200, 110, 26, 30, GOLD, 4); box(x, 174, 110, 26, 30, GOLD, 4)
  x.restore()
}
function profile(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  shadow(x, -140, -190, 280, 380); box(x, -140, -190, 280, 380, NAVY); x.fillStyle = '#140c30'; x.fillRect(-124, -174, 248, 220)
  signChar(x, t, 'taurus', 0, -60, 150, { mood: 'sleepy', seed: 71, glyph: false, glow: 0.6, zzz: false })
  txt(x, '♉︎ TAURUS', 0, 86, 28, GREEN, { font: MONO, weight: 700 })
  txt(x, 'status:', 0, 126, 22, '#9a90c8', { font: MONO, weight: 700 })
  x.restore()
}
function bag(x, cx, cy, k, col, word) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  shadow(x, -90, -100, 180, 210); box(x, -90, -100, 180, 210, '#d99a4e')
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(0, -100, 40, Math.PI, 0); x.stroke()
  box(x, -70, -20, 140, 50, col, 4); txt(x, word, 0, 6, 26, INK, { font: MONO, weight: 700 })
  x.restore()
}
const CAN = ['......GGGGGGG', '.....GG.....G', 'B...GGGGGGGGG', 'BB..GGGGGGGGG', '.BBGGGGGGGGGG', '..GGGGGGGGGGG', '....GGGGGGGGG', '....GGGGGGGGG']
const POT = ['TTTTTTTTT', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..']
const LEAF = ['..G..', '.GGG.', 'GGGGG', '..G..', '..G..']

const CAMEOS = [
  { sign: S, cap: 'Woke up at noon. | *Called it early.*', mood: lt => lt > 1.2 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clock(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1010, 'SO EARLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Breakfast. Then | *second breakfast.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) plate(x, 790, 1040 - i * 120, pop01(t, P.t0 + 0.2 + i * 0.4, 0.3, 2), i)
      label(x, 790, 640, 'MEAL 3 OF 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GREEN, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Took a nap. | *In two parts.*', mood: 'sleepy', star: { x: -150, y: -30 },
    back(x, t, lt, P) { pillow(x, 390, 1000, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 780, 760, 'NAP: PART 1', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      label(x, 780, 900, 'NAP: PART 2', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bed to sofa. | *Exhausting commute.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -100, y: -100, s: 220 }, hops: [0.8],
    back(x, t, lt, P) {
      bed(x, 300, 1070, pop01(t, P.t0 + 0.1, 0.3, 2))
      sofa(x, 760, 1040, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.8)
    },
    front(x, t, lt, P) {
      label(x, 780, 700, 'COMMUTE: 3 STEPS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Friends asked for plans. | *Replied “bed.”*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'plans tonight??', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: PINK, tail: 'br' })
      bubble(x, 760, 930, 'bed.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 80, tail: 'bl' })
    } },
  { sign: S, cap: 'Ran a bath. | Stayed *three hours.*', mood: 'sparkle', star: { x: 0, y: -40, s: 260 },
    front(x, t, lt, P) {
      tub(x, t, 540, 1040, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'PRUNE MODE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Updated their profile. | *Status: horizontal.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'HORIZONTAL', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 40, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ordered takeout. | For *lunch AND dinner.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bag(x, 700, 900, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, 'LUNCH')
      bag(x, 880, 930, pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 'DINNER')
      bubble(x, 790, 650, 'efficient', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Watered one plant. | *Chores: done.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, { T: '#c96a3a' }, 820, 1060, 18 * k)
      drawBits(x, LEAF, { G: GREEN }, 820, 980, 22 * k)
      drawBits(x, CAN, { G: SKYB, B: SKYB }, 720, 820, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: lt > 0.8 ? 0.4 : 0 })
      if (lt > 0.8 && lt < 1.6) { x.fillStyle = SKYB; for (let i = 0; i < 5; i++) x.fillRect(790 + i * 6, 880 + ((t * 300 + i * 30) % 80), 6, 14) }
      label(x, 790, 640, 'CHORES ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 42, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
]

function fitTitleScenes(SCENES, maxW = 940) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) {
        const k = (maxW - 8) / widest
        tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'
        for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px'
      }
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2t0038', key: 'G', accent: GREEN, solo: S, ending: 'callback',
  title: 'Tauruses on a day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Zero plans. | *Fully booked.*', mood: 'sleepy' },
  last: {
    text: 'The nap? | *To be continued.*',
    draw(x, t, lt) {
      const t0 = t - lt
      pillow(x, 540, 1200, pop01(t, t0 + 0.3, 0.35, 2) * 1.2)
      const k = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1080, 280 * k, { mood: 'sleepy', seed: 40, hops: [t0 + 0.6] })
      label(x, 540, 880, 'NAP: PART 3', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 44, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
