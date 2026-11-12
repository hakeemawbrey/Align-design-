// r2a0011: ADVICE SOLO, "Signs a Capricorn | needs a break." (~46 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Capricorn truth + a warm reframe, one gag each.
//   0.0–3.6    "Signs a Capricorn | *needs a break.*"
//   3.6–37.8   emails on your birthday (cake first) · the to-do list needs a nap · calendar full (book yourself in)
//              · a seven-minute nap (take the hour) · carrying everyone's boxes (put some down) · coffee number four
//              (try a walk) · out of office means out · everyone leans on you (lean back) · proud of you for doing nothing
//  37.8        "You built all this. | *Now rest in it.*"
//  41.2        CALLBACK: "The emails waited. | The cake *didn’t.*"  Capricorn and the birthday cake.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#9fd8a8', BROWN = '#8a4a2e', RED = '#e23d4e'

// ── props
const CAKE = ['.....F.....', '.....W.....', '.....W.....', 'PPPPPPPPPPP', 'BBBBBBBBBBB', 'BPBPBPBPBPB', 'BBBBBBBBBBB', 'PPPPPPPPPPP', 'BBBBBBBBBBB', '.GGGGGGGGG.']
const CAKE_C = { F: '#ffb34a', W: '#fff4e2', P: PINK, B: '#fff4e2', G: GOLD }
function box(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function laptop(x, cx, cy, k, close) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, 0, 260, 26); x.fillStyle = '#9aa5c4'; x.fillRect(-124, 4, 248, 16)
  const h = lerp(170, 8, close)
  x.fillStyle = INK; x.fillRect(-114, -h - 6, 228, h + 6); x.fillStyle = '#2a2350'; x.fillRect(-106, -h, 212, h - 4)
  if (close < 0.5) { x.fillStyle = SKYB; for (let i = 0; i < 4; i++) x.fillRect(-90, -h + 22 + i * 30, 150 - i * 20, 12) }
  x.restore()
}
function calendar(x, cx, cy, k, meK) {
  if (k <= 0.01) return
  box(x, cx, cy, 330, 330, BONE, { k, rot: 0.03 })
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = RED; x.fillRect(-165, -165, 330, 50)
  const cols = ['#9aa5c4', '#7d86a8', '#b7a6ff']
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) {
    const me = i === 2 && j === 2
    x.fillStyle = me ? (meK > 0.5 ? GOLD : cols[0]) : cols[(i + j) % 3]
    x.fillRect(-150 + i * 60, -100 + j * 62, 52, 54)
    if (me && meK > 0.5) { x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ME', -150 + i * 60 + 26, -100 + j * 62 + 28) }
  }
  x.restore()
}
function clock(x, cx, cy, k, t, fast) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 106, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 88 - 4, Math.sin(a) * 88 - 4, 8, 8) }
  x.strokeStyle = INK; x.lineCap = 'round'
  const m = t * fast
  x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(m / 12) * 50, -Math.cos(m / 12) * 50); x.stroke()
  x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(m) * 80, -Math.cos(m) * 80); x.stroke()
  x.restore()
}
const MUG = ['WWWWWWW..', 'WCCCCCWWW', 'WCCCCCW.W', 'WCCCCCW.W', 'WCCCCCWWW', 'WCCCCCW..', '.WWWWW...']
const UMB = ['....RRRRRRR....', '..RRWWRRRWWRR..', '.RRWWWRRRWWWRR.', 'RRRRRRRRRRRRRRR', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......']
const PILLOW = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLWLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', '.LLLLLLLLLLLL.']
function hammock(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= Math.min(1, k)
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(cx - 260, cy - 120); x.quadraticCurveTo(cx, cy + 200, cx + 260, cy - 120); x.stroke()
  x.strokeStyle = '#ffb34a'; x.lineWidth = 9; x.beginPath(); x.moveTo(cx - 260, cy - 120); x.quadraticCurveTo(cx, cy + 200, cx + 260, cy - 120); x.stroke()
  x.fillStyle = INK; x.fillRect(cx - 280, cy - 300, 26, 420); x.fillRect(cx + 254, cy - 300, 26, 420)
  x.fillStyle = BROWN; x.fillRect(cx - 274, cy - 294, 14, 408); x.fillRect(cx + 260, cy - 294, 14, 408)
  x.restore()
}

const S = 'capricorn'
const CAMEOS = [
  { sign: S, cap: 'Emails on your birthday? | *Cake first.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      laptop(x, 790, 760, pop01(t, P.t0 + 0.15, 0.3, 2), ease.inOutCubic(prog(lt, 0.7, 1.1)))
      drawBits(x, CAKE, CAKE_C, 790, 1000, 18 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      sparkles(x, t, 790, 980, P.t0 + 1.3, 6, 140, 0.4)
    } },
  { sign: S, cap: 'Your to-do list | *needs a nap too.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), unroll = ease.outCubic(prog(lt, 0.3, 1.2))
      if (k > 0.01) {
        const h = lerp(80, 560, unroll)
        box(x, 790, 600 + h / 2, 240, h, BONE, { k })
        x.save(); x.beginPath(); x.rect(670, 600, 240, h); x.clip()
        for (let i = 0; i < 16; i++) { x.fillStyle = INK; x.fillRect(690, 630 + i * 34, 18, 18); x.fillStyle = '#9aa5c4'; x.fillRect(720, 634 + i * 34, 150 - (i * 37) % 70, 10) }
        x.restore()
      }
      label(x, 790, 1150, 'ITEMS: ALL OF THEM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Calendar booked solid? | *Book yourself in.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      calendar(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), prog(lt, 1.1, 1.2))
      sparkles(x, t, 790, 880, P.t0 + 1.5, 6, 90, 0.2)
    } },
  { sign: S, cap: 'A seven-minute nap? | *Take the hour.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clock(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), t, 6)
      label(x, 790, 1050, 'NAP: 60 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Carrying everyone’s stuff? | *Put some down.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [0, -1], star: { x: -60, y: 90 },
    front(x, t, lt, P, Fr) {
      const drop = ease.inOutCubic(prog(lt, 1.2, 1.7))
      const cols = [GOLD, PINK, SKYB, MINT]
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2), off = i >= 1 ? drop : 0
        const sx = 480 + Math.sin(i * 1.7) * 12, sy = Fr.top - 30 - i * 62
        const fx = 740 + (i % 2) * 150, fy = 1110 - (i === 3 ? 66 : 0)
        box(x, lerp(sx, fx + (i === 3 ? -75 : 0), off), lerp(sy, fy, off) - Math.sin(Math.PI * off) * 80, 160, 60, cols[i], { k })
      }
      label(x, 780, 680, 'LIGHTER NOW', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 36, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Coffee number four? | Try *a walk.*', mood: 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, MUG, { W: BONE, C: BROWN }, 680 + (i % 2) * 170, 760 + Math.floor(i / 2) * 170, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2))
      label(x, 780, 1110, 'STEPS > SIPS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Out of office | means *out.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, UMB, { R: RED, W: BONE, K: INK }, 800, 780, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const lap = 1 - ease.inCubic(prog(lt, 0.9, 1.3))
      if (lap > 0.01) laptop(x, 820 + (1 - lap) * 300, 1060, 0.7 * lap * pop01(t, P.t0 + 0.3, 0.3, 2), 0)
      label(x, 790, 1080, 'OOO: FOR REAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Everyone leans on you. | *Lean back.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -100, y: 30 },
    back(x, t, lt, P) {
      drawBits(x, PILLOW, { L: LAV, W: BONE }, 620, 960, 30 * pop01(t, P.t0 + 0.6, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 780, 620, 'YOUR TURN', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: PINK, font: MONO, weight: 700 })
      hearts(x, t, 560, 900, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Proud of you | for *doing nothing.*', mood: 'sleepy', star: { x: 0, y: 60, s: 260 },
    back(x, t, lt, P) { hammock(x, 540, 980, pop01(t, P.t0 + 0.05, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 620, 'STATUS: OFF', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: SAGE, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0011', key: 'D', accent: SAGE, solo: 'capricorn', ending: 'callback',
  title: 'Signs a Capricorn | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'You built all this. | *Now rest in it.*', mood: 'happy' },
  last: {
    text: 'The emails waited. | The cake *didn’t.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 400, 1060, 260 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      drawBits(x, CAKE, CAKE_C, 700, 1070, 20 * pop01(t, t - lt + 0.7, 0.35, 2))
      hearts(x, t, 560, 960, t - lt + 1.5, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
