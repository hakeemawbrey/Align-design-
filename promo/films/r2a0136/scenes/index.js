// r2a0136: THE SIGNS AS… v3, SOLO advice film, "Taurus, the right people | will stay." (~45 s vertical, signs3kit, lofi · D)
// One Taurus, nine cards: a relatable Taurus truth + a warm reframe, one visual gag each. Ending: 'callback'.
//   0.0–3.6    "Taurus, the right people | *will stay.*"
//   3.6–37.8   slow to let people in (five locks) · never chase, real ones come anyway · same café for years (stamp card)
//              · saved them the last slice · stubborn? steady (the wind can't move them) · take your time (hourglass)
//              · you remember their order · compatibility check? check who shows up (soup) · small circle, strong one
//  37.8        "Slow to trust. | *Built to last.*"
//  41.2        callback: "The right ones | *save you a slice.*"  (a friend brings Taurus the slice back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'taurus', TAN = '#e9b24a', SAGE = '#7fd88a', WOOD = '#8a4a2e', RED = '#e23d4e'

function sheet(x, cx, cy, w, h, k, { rot = 0, bg = BONE, head = null, headBg = RED, headInk = '#fff4e2', headSize = 30 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60)
    x.fillStyle = headInk; x.font = `800 ${headSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32)
  }
  return true
}
const LOCK = ['.GGG.', 'G...G', 'G...G', 'YYYYY', 'YYKYY', 'YYKYY', 'YYYYY']
const OPEN = ['.GGG.', 'G...G', '....G', 'YYYYY', 'YYKYY', 'YYKYY', 'YYYYY']
const LOCK_C = { G: '#c9c9d8', Y: GOLD, K: INK }
const SLICE = [
  'CCCCCCCCC',
  'CYYRYYYYC',
  '.YYYYRYY.',
  '.YRYYYY..',
  '..YYYRY..',
  '..YYYY...',
  '...YY....',
  '...Y.....',
]
const SLICE_C = { C: '#d88a3a', Y: '#ffd76a', R: RED }
const LEAF = ['.LL', 'LLL', 'LL.']
const GLASS = [
  'WWWWWWW',
  '.SSSSS.',
  '..SSS..',
  '...S...',
  '..S.S..',
  '.S...S.',
  'WWWWWWW',
]
const POT = ['.KKKKKKK.', 'KSSSSSSSK', 'KRRRRRRRK', 'KRRRRRRRK', '.KRRRRRK.']

const CAMEOS = [
  { sign: S, cap: 'Slow to let people in? | *Worth the wait.*', mood: lt => lt > 1.7 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.8],
    front(x, t, lt, P) {
      if (sheet(x, 790, 850, 240, 420, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, bg: WOOD })) {
        x.fillStyle = '#6b3820'; x.fillRect(-100, -190, 200, 170); x.fillRect(-100, 10, 200, 170)
        for (let i = 0; i < 5; i++) {
          const open = lt > 0.5 + i * 0.25
          drawBits(x, open ? OPEN : LOCK, LOCK_C, 70, -150 + i * 72, 8)
        }
        x.fillStyle = GOLD; x.fillRect(-80, -10, 22, 22)
        x.restore()
      }
      label(x, 790, 1110, 'COME IN. TAKE A SNACK.', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 28, bg: SAGE, rot: -0.04 })
    } },
  { sign: S, cap: 'You never chase. | Real ones *come anyway.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', star: { x: -180 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(200, 960, 340, 120); x.fillStyle = '#c96a6a'; x.fillRect(208, 968, 324, 104); x.fillStyle = '#a84f55'; x.fillRect(208, 1040, 324, 32); x.restore() }
    },
    front(x, t, lt, P) {
      const w = ease.outCubic(prog(lt, 0.3, 1.3))
      signChar(x, t, 'cancer', lerp(1000, 760, w), 980, 200, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 11, glyph: false, hops: [P.t0 + 0.5, P.t0 + 0.8, P.t0 + 1.1] })
      bubble(x, 770, 720, 'thought I\'d | drop by!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Same café for years? | That\'s *loyalty.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      if (sheet(x, 790, 830, 330, 260, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04, bg: '#fff4e2', head: 'LOYALTY CARD', headBg: WOOD, headSize: 28 })) {
        const n = Math.floor(clamp((lt - 0.4) / 1.1) * 10)
        for (let i = 0; i < 10; i++) {
          const cx = -120 + (i % 5) * 60, cy = -20 + Math.floor(i / 5) * 70
          x.fillStyle = '#d8d0bf'; x.fillRect(cx - 22, cy - 22, 44, 44)
          if (i < n) { x.fillStyle = TAN; x.fillRect(cx - 18, cy - 18, 36, 36); x.fillStyle = INK; x.fillRect(cx - 6, cy - 6, 12, 12) }
        }
        x.restore()
      }
      label(x, 790, 1060, 'CARD #47', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 610, 'the usual?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Saved them the last slice? | That\'s *love.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (sheet(x, 790, 900, 340, 60, k, { bg: '#fff4e2' })) x.restore()
      drawBits(x, SLICE, SLICE_C, 790, 800, 24 * k, { rot: 0.1 + 0.04 * Math.sin(t * 3) })
      label(x, 790, 1010, 'RESERVED: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.05 })
      bubble(x, 380, 620, 'it was hard.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Stubborn? | Call it *steady.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: { x: -100 },
    back(x, t, lt, P) {
      for (let i = 0; i < 10; i++) {
        const ph = ((t * 0.9 + i * 0.137) % 1)
        drawBits(x, LEAF, { L: i % 2 ? SAGE : '#e9b24a' }, 960 - ph * 860, 600 + (i * 67) % 520 + Math.sin(ph * 9 + i) * 30, 14, { rot: t * 4 + i, alpha: Math.sin(Math.PI * ph) })
      }
      x.save(); x.globalAlpha = 0.35; x.strokeStyle = BONE; x.lineWidth = 5
      for (let i = 0; i < 4; i++) { const y = 640 + i * 130, o = ((t * 600 + i * 230) % 900); x.beginPath(); x.moveTo(1000 - o, y); x.lineTo(820 - o, y); x.stroke() }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 700, 1110, 'WIND: 90 MPH · TAURUS: FINE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: SKYB, rot: -0.03 })
    } },
  { sign: S, cap: 'Take your time. | The right ones *wait.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, GLASS, { W: WOOD, S: '#ffe7a8' }, 700, 820, 26 * k, { rot: 0.04 })
      const k2 = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k2 > 0.01) signChar(x, t, 'libra', 860, 990, 170 * k2, { mood: 'happy', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 860, 760, 'no rush.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'You remember their order. | They\'ll *learn yours.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      if (sheet(x, 790, 820, 300, 280, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05, bg: '#ffe98a' })) {
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        ;['oat milk', 'no foam', 'two sugars', 'extra hot'].forEach((s, i) => { if (lt > 0.4 + i * 0.25) x.fillText(s, 0, -84 + i * 58) })
        x.restore()
      }
      label(x, 790, 1060, 'MEMORISED. FOREVER.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SAGE, rot: -0.04 })
    } },
  { sign: S, cap: 'Compatibility check? | Check who *shows up.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 620, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      const w = ease.outCubic(prog(lt, 0.6, 1.3))
      if (lt > 0.55) {
        const F = signChar(x, t, 'virgo', lerp(1020, 800, w), 990, 190, { mood: 'happy', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 0.9] })
        drawBits(x, POT, { K: INK, S: '#9aa5c4', R: '#e8a24a' }, F.x - 70, F.cy + 40, 13)
      }
      label(x, 800, 790, 'BROUGHT SOUP', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Small circle? | A *strong* one.', mood: 'heart', star: { x: 0, y: 30, s: 240 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const R = ['cancer', 'virgo', 'capricorn']
      R.forEach((id, i) => {
        const a = -Math.PI / 2 + (i - 1) * 1.15 + Math.PI
        const k = pop01(t, P.t0 + 0.4 + i * 0.25, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 540 + Math.cos(a + Math.PI) * 300, 880 - Math.sin(a + Math.PI) * 200 + (i === 1 ? -80 : 60), 160 * k, { mood: lt > 1.3 ? 'heart' : 'happy', seed: 40 + i, glyph: false, hops: [P.t0 + 1.4 + i * 0.1] })
      })
    },
    front(x, t, lt, P) {
      label(x, 540, 1140, 'CIRCLE: 3 · STRENGTH: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.03 })
    } },
]

const F = makeFilm({
  id: 'r2a0136', key: 'D', accent: TAN, solo: S, ending: 'callback',
  title: 'Taurus, the right | people *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Slow to trust. | *Built to last.*', mood: 'sparkle' },
  last: {
    text: 'The right ones | *save you a slice.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 380, 1060, 250 * k, { mood: lt > 1.6 ? 'heart' : 'wide', look: [1, 0], seed: 40, hops: [t - lt + 1.6] })
      const w = ease.outCubic(prog(lt, 0.7, 1.5))
      if (lt > 0.6) {
        const Fc = signChar(x, t, 'cancer', lerp(1050, 720, w), 1060, 230, { mood: 'happy', look: [-1, 0], seed: 41, glyph: false })
        drawBits(x, SLICE, SLICE_C, Fc.x - 120, 900, 26, { rot: -0.3 })
      }
      hearts(x, t, 540, 1000, t - lt + 1.7, { n: 6, life: 1.8, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
