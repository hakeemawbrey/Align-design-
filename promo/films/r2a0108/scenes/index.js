// r2a0108: star_advice, ADVICE SOLO, "Scorpio, you can | be a beginner." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Scorpio truth + a warm reframe, one gag each.
//   0.0–3.6    "Scorpio, you can | *be a beginner.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              first pottery class: wobbly is the point · wobbly on skates: everyone was · asked a "dumb" question: smart move
//              · no need to master it by Tuesday · burnt the first pancake: tradition · lost at chess: learned three moves
//              · new to dating again: clumsy is cute · skip the 400-page research, just start · being new takes guts (a medal)
//  37.8        "Intense. | *And still learning.*"  Scorpio comes back, big.
//  41.2        "That wobbly pot? | *Holds snacks now.*"  The lopsided pot from card one returns, full of snacks (callback).
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CRIMSON = '#ff5a76', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', CLAY = '#d9875a'
const S = 'scorpio'

// ── props
const POT = [
  '...CCCCC...',
  '..CdddddC..',
  '...CCCCC...',
  '...CCCCCC..',
  '..CCCCCCCC.',
  '.CCCCCCCCCC',
  'CCCCCCCCCC.',
  'CCCCCCCCCC.',
  '.CCCCCCCC..',
  '..CCCCCC...',
]
const POT_C = { C: CLAY, d: '#5a2e1a' }
const SKATE = [
  '.KKK......',
  '.KPPK.....',
  '.KPPK.....',
  '.KPPPKKK..',
  'KPPPPPPPK.',
  'KKKKKKKKKK',
  '.WW....WW.',
  '.WW....WW.',
]
const SKATE_C = { K: INK, P: PINK, W: GOLD }
const PANCAKE = ['..BBBBBB..', '.BbBBBbBB.', 'BBBBbBBBBB', 'BbBBBBBbBB', '.BBBbBBBB.', '..BBBBBB..']
const PANCAKE_C = { B: '#3a2a20', b: '#1b1236' }
const PAWN = ['...KK...', '..KWWK..', '..KWWK..', '...KK...', '..KWWK..', '..KWWK..', '.KWWWWK.', 'KKKKKKKK']
const PAWN_C = { K: INK, W: CREAM }
const MEDAL = ['RR....RR', '.RR..RR.', '..RRRR..', '..GGGG..', '.GGYYGG.', '.GYGGYG.', '.GGYYGG.', '..GGGG..']
const MEDAL_C = { R: CRIMSON, G: GOLD, Y: '#fff1a8' }

// a wall calendar with "MASTER IT" written on Tuesday, then crossed out
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -170, 316, 356)
  x.fillStyle = INK; x.fillRect(-162, -182, 324, 364); x.fillStyle = CREAM; x.fillRect(-154, -174, 308, 348)
  x.fillStyle = CRIMSON; x.fillRect(-154, -174, 308, 64)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TUESDAY', 0, -142)
  x.font = `800 40px ${INTER}`; x.fillText('MASTER IT', 0, -30)
  x.font = `700 26px ${MONO}`; x.fillStyle = '#7a6f60'; x.fillText('(started: Monday)', 0, 30)
  const cross = ease.outCubic(prog(lt, 0.9, 1.3))
  if (cross > 0) { x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(-120, -30); x.lineTo(lerp(-120, 120, cross), -30); x.stroke() }
  if (lt > 1.4) { x.fillStyle = '#2fc79a'; x.font = `800 36px ${INTER}`; x.fillText('just try it ♡', 0, 110) }
  x.restore()
}
// a tall stack of books with a page count
function books(x, cx, base, k, lt) {
  if (k <= 0.01) return
  const COLS = [CRIMSON, LAV, SKYB, GOLD, MINT, PINK, '#ffb34a']
  for (let i = 0; i < 7; i++) {
    const kk = pop01(0, -1, 1) * k
    const w = 210 - (i % 3) * 18, h = 46
    x.save(); x.translate(cx + Math.sin(i * 2.1) * 14, base - i * 52); x.rotate(Math.sin(i * 1.3) * 0.04); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10); x.fillStyle = COLS[i]; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = CREAM; x.fillRect(w / 2 - 22, -h / 2 + 6, 12, h - 12)
    x.restore()
  }
}
// a phone with a first message
function phone(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -192, 296, 400)
  x.fillStyle = INK; x.fillRect(-154, -204, 308, 408); x.fillStyle = '#2a2350'; x.fillRect(-144, -194, 288, 388)
  x.fillStyle = '#140c30'; x.fillRect(-132, -170, 264, 340)
  x.fillStyle = MINT; x.fillRect(-120, -156, 240, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ NEW MATCH', 0, -132)
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 16 : -16, -60 + i * 76); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`
    const ls = txt.split('|'), w = Math.max(...ls.map(l => x.measureText(l).width)) + 28, h = ls.length * 32 + 16
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h); x.fillStyle = INK
    ls.forEach((l, j) => x.fillText(l, 0, -h / 2 + 8 + 16 + j * 32))
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'First pottery class? | *Wobbly is the point.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      const wob = Math.sin(t * 5) * 0.08
      drawBits(x, POT, POT_C, 800, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: wob })
      label(x, 800, 1110, 'MASTERPIECE (ISH)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Wobbly on skates? | *Everyone was.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 }, squash: lt => lt < 1.4 ? Math.sin(lt * 12) * 0.08 : 0,
    back(x, t, lt, P, F) {
      drawBits(x, SKATE, SKATE_C, F.x - 50, F.cy + 140, 9 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 9) * 0.12 })
      drawBits(x, SKATE, SKATE_C, F.x + 60, F.cy + 140, 9 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -Math.sin(t * 9) * 0.12 })
    },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'whoa whoa WHOA', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.4 ? 1 : 0), { size: 38, col: PINK, tail: 'bl' })
      label(x, 790, 760, 'DAY 1 ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 48, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'GRACE: LOADING', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked a “dumb” question? | *Smart move.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'wait… how | does it work?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      bubble(x, 800, 960, 'great question!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      label(x, 790, 1120, 'BRAVE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 48, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No need to master it | *by Tuesday.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      calendar(x, 790, 870, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
    } },
  { sign: S, cap: 'Burnt the first pancake? | *Tradition.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      x.fillStyle = INK; x.beginPath(); x.ellipse(800, 1000, 160, 40, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = CREAM; x.beginPath(); x.ellipse(800, 994, 150, 32, 0, 0, Math.PI * 2); x.fill()
      const flip = ease.outCubic(prog(lt, 0.3, 0.9))
      drawBits(x, PANCAKE, PANCAKE_C, 800, 960 - Math.sin(Math.PI * flip) * 160, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { sy: 0.6, rot: flip * Math.PI * 2 })
      for (let i = 0; i < 3; i++) { const ph = (lt * 0.8 + i / 3) % 1; x.fillStyle = `rgba(160,150,170,${(0.6 * (1 - ph)).toFixed(3)})`; x.fillRect(760 + i * 40 + Math.sin(ph * 6) * 10, 900 - ph * 160, 24, 24) }
      label(x, 800, 690, 'PANCAKE #1: RIP', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lost at chess? | *Three new moves.*', mood: lt => lt > 1.3 ? 'sparkle' : 'eyeroll', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 960); x.scale(k, k)
        for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { x.fillStyle = (r + c) % 2 ? '#2a2350' : '#c9b8e8'; x.fillRect(-160 + c * 80, -60 + r * 50, 80, 50) }
        x.restore()
      }
      const tip = ease.outCubic(prog(lt, 0.4, 0.8))
      drawBits(x, PAWN, PAWN_C, 820, 860, 14 * k, { rot: tip * 1.4 })
      label(x, 800, 690, '+3 MOVES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 48, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New to dating again? | *Clumsy is cute.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 790, 860, 1.15 * pop01(t, P.t0 + 0.15, 0.3, 2), [
        ['hi! I’m Scorpio. | wait. you knew.', CRIMSON, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['haha. cute ♡', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ])
    } },
  { sign: S, cap: 'Researched 400 pages? | *Just start.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      books(x, 800, 1090, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 800, 620, 'PAGES READ: 400', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 900, 'JUST START', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 50, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Being new | *takes guts.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, MEDAL, MEDAL_C, F.x + 10, F.cy + 120, 12 * pop01(t, P.t0 + 0.6, 0.3, 2.4))
      label(x, 790, 900, 'PROUD OF YOU', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, F.x, F.top, P.t0 + 1.1, { n: 6, life: 1.8, spread: 160, cell: 7, seed: 6 })
      sparkles(x, t, F.x + 10, F.cy + 120, P.t0 + 0.8, 7, 120, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0108', key: 'C', accent: CRIMSON, solo: S, ending: 'callback',
  title: 'Scorpio, you can | *be a beginner.*',
  cameos: CAMEOS,
  group: { cap: 'Intense. | *And still learning.*', mood: 'sparkle' },
  last: {
    text: 'That wobbly pot? | *Holds snacks now.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.4, 0.4, 2)
      drawBits(x, POT, POT_C, 700, 1080, 30 * k, { rot: Math.sin(t * 3) * 0.05 })
      for (let i = 0; i < 5; i++) { const d = pop01(t, t0 + 0.9 + i * 0.1, 0.3, 2); drawBits(x, ['.YY.', 'YYYY', 'YyYY', '.YY.'], { Y: '#ffb34a', y: GOLD }, 700 + i * 30 - 60, 910 - (i % 2) * 24, 12 * d) }
      signChar(x, t, S, 330, 1150, 250, { mood: lt > 1.5 ? 'heart' : 'sparkle', pop: pop01(t, t0 + 0.6, 0.4, 2), seed: 9, hops: [t0 + 1.6], look: [1, 0] })
      sparkles(x, t, 700, 1000, t0 + 1.4, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
