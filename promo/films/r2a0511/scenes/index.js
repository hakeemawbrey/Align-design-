// r2a0511: star_advice, ADVICE SOLO, "Libra, you can | change your *mind.*" (~51 s vertical, signs3kit, music: lofi · D)
// One sign the whole film (solo mode, 9 cards): a relatable Libra truth + a warm reframe, one light gag each. Ending: lesson.
//   3.6–37.8   changed the order twice · a new opinion is growth · said yes, meant no · both options good · a week of
//              paint swatches · cancelled plans to rest · updated the profile again · polled everyone but you · a new chapter
//  37.8        "Your mind, | *your call.*"
//  41.0        LESSON: "Changing your mind | is *growing.*"  STATUS: EVOLVING
//  46.9        "Final answer? | *For now.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const S = 'libra', LCOL = '#e163d6'
const SCALES = ['......K......', '.....KYK.....', 'YYYYYYYYYYYYY', 'Y.....Y.....Y', 'Y.....Y.....Y', 'Y.....Y.....Y', '.....YYY.....', '....YYYYY....']
const SCALES_C = { Y: GOLD, K: INK }
const PAN = ['YYYYYYY', '.YYYYY.']
const CUP = ['..PWP..', '.PPPPP.', 'PPPPPPP', '.BBBBB.', '.BWBWB.', '..BBB..']
const CUP_C = { P: PINK, W: '#ffffff', B: '#c98f5a' }
const CUP2_C = { P: MINT, W: '#ffffff', B: '#c98f5a' }

// a sign board that flips over from OLD to NEW
function flipSign(x, cx, cy, k, p, a, b) {
  if (k <= 0.01) return
  const sy = Math.abs(Math.cos(Math.PI * p)), front = p < 0.5
  x.save(); x.translate(cx, cy); x.scale(k, k * Math.max(0.04, sy))
  x.fillStyle = INK; x.fillRect(-170, -70, 340, 140)
  x.fillStyle = front ? BONE : MINT; x.fillRect(-162, -62, 324, 124)
  x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(front ? a : b, 0, 4)
  x.restore()
  x.fillStyle = WOOD; x.fillRect(cx - 8, cy + 70 * k, 16, 120 * k)
}
function swatches(x, cx, cy, k, n) {
  if (k <= 0.01) return
  const C = ['#ffb3c8', '#ffaac0', '#ffa3ba', '#ff9cb4', '#ff95ae', '#ff8fb1']
  for (let i = 0; i < n; i++) {
    x.save(); x.translate(cx - 120 + (i % 3) * 120, cy - 90 + Math.floor(i / 3) * 170); x.rotate((i % 2 ? 0.08 : -0.06)); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-52, -72, 104, 144); x.fillStyle = CREAM; x.fillRect(-46, -66, 92, 132); x.fillStyle = C[i % 6]; x.fillRect(-40, -60, 80, 90)
    x.restore()
  }
}

const CAMEOS = [
  { sign: S, cap: 'Changed your order twice? | *Still a great order.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 360, head: 'MY ORDER', headCol: LCOL, size: 32, rows: [
        ['pasta', SLATE], ['salad', SLATE, pop01(t, P.t0 + 0.6, 0.2, 2)], ['pasta ♡', INK, pop01(t, P.t0 + 1.1, 0.2, 2)],
      ] })
      for (const [r, at] of [[0, 0.55], [1, 1.0]]) { const p = prog(lt, at, at + 0.25); if (p > 0) { x.fillStyle = RED; x.fillRect(640, 838 + r * 48, 150 * p, 6) } }
      label(x, 790, 1110, 'FINAL (FOR NOW)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A new opinion? | That’s *growth.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      flipSign(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.8, 1.3)), 'OLD TAKE', 'NEW TAKE')
      label(x, 790, 1110, 'UPDATED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 790, P.t0 + 1.3 * (3.1 / 2.4), 7, 190, 0.3)
    } },
  { sign: S, cap: 'Said yes, meant no? | You can *say no.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const later = lt > 1.1
      bubble(x, 790, 720, later ? 'actually… | no, thank you' : 'YES! totally!', pop01(t, P.t0 + (later ? 1.1 : 0.3), 0.25, 2.2), { size: later ? 38 : 44, col: later ? LAV : BONE, tail: 'bl' })
      label(x, 790, 1000, 'STILL LOVED ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Both options good? | *Either is lovely.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), tilt = 0.18 * Math.sin(t * 2.4) * (lt > 1.4 ? 0.2 : 1)
      x.save(); x.translate(790, 900); x.rotate(tilt); x.translate(-790, -900)
      drawBits(x, SCALES, SCALES_C, 790, 900, 20 * k)
      drawBits(x, CUP, CUP_C, 790 - 120, 790, 14 * k); drawBits(x, CUP, CUP2_C, 790 + 120, 790, 14 * k)
      x.restore()
      label(x, 790, 1110, 'BOTH: DELICIOUS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A week of paint swatches? | *The wall can wait.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.2) * 5.99)
      swatches(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), Math.min(6, n))
      label(x, 790, 640, 'ALL “BLUSH”', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cancelled plans to rest? | *Rest is a plan.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: 10 },
    front(x, t, lt, P) {
      drawBits(x, BM.BLANKET, BM.BLANKET_C, 380, 1010, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      phone(x, 790, 860, pop01(t, P.t0 + 0.5, 0.3, 2), { head: 'TONIGHT', headCol: LAV, lines: [
        ['party', SLATE, 1], ['dinner', SLATE, 1], ['sofa ♡', MINT, pop01(t, P.t0 + 1.4, 0.2, 2), true],
      ] })
      if (lt > 0.9) { x.fillStyle = RED; x.fillRect(680, 788, 100 * prog(lt, 0.9, 1.1), 6); x.fillRect(680, 862, 120 * prog(lt, 1.1, 1.3), 6) }
    } },
  { sign: S, cap: 'Rewrote your profile again? | *You’re evolving.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const v = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 6.99)
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 360, head: '♎︎ MY PROFILE', headCol: LCOL, size: 30, rows: [
        ['likes: art', INK], ['and: also not art', INK, pop01(t, P.t0 + 0.9, 0.2, 2)], ['open to: all', INK, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
      label(x, 800, 1100, `BIO v${v}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked everyone’s opinion? | *Yours counts most.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'POLL: BANGS?', headCol: GOLD, lines: [
        ['yes!', MINT, pop01(t, P.t0 + 0.4, 0.2, 2)], ['NO.', PINK, pop01(t, P.t0 + 0.7, 0.2, 2)], ['maybe?', LAV, pop01(t, P.t0 + 1.0, 0.2, 2)], ['me: YES ♡', GOLD, pop01(t, P.t0 + 1.5, 0.2, 2), true],
      ] })
    } },
  { sign: S, cap: 'Changed the whole plan? | *New chapter.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BM.BOOK, BM.BOOK_C, 790, 900, 20 * k)
      if (lt > 0.7 && lt < 1.5) { const p = prog(lt, 0.7, 1.5); x.save(); x.translate(790, 900); x.scale(Math.cos(Math.PI * p), 1); x.fillStyle = CREAM; x.fillRect(0, -78, 140, 156); x.restore() }
      label(x, 790, 700, lt > 1.3 ? 'CHAPTER 2 ✦' : 'CHAPTER 1', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: lt > 1.3 ? LCOL : BONE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.5 * (3.1 / 2.4), 8, 200, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0511', key: 'D', accent: LCOL, solo: S, ending: 'lesson',
  title: 'Libra, you can | change your *mind.*',
  cameos: CAMEOS,
  group: { cap: 'Your mind, | *your call.*', mood: 'heart' },
  lesson: { text: 'Changing your mind | is *growing.*', chip: 'STATUS: EVOLVING' },
  last: {
    text: 'Final answer? | *For now.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
