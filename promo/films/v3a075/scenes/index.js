// v3a075: star_advice, ADVICE SOLO, "Dear Scorpio: | it's okay." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a soft Scorpio truth, a warm "it's okay", one gag each.
//   0.0–3.6    "Dear Scorpio: | *it’s okay.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a door with five locks, one opens (lock 1 of 5) · "why?" → "just because." · deep water: depth, not too much
//              · a cosy bubble of space: back soon · a balloon marked OLD STORY floats away · the intensity dial turns to LOVE
//              · a bandaged heart: still works · hugging a teddy: soft & safe · Pisces pops in: "still here." (crying)
//  37.8        "Deep heart. | *Safe to open.*"  Scorpio comes back, big.
//  41.0        LESSON UNLOCKED: "The right one | makes it *safe.*"  TRUST: BUILDING
//  46.9        "Pisces stayed. | *Cried, but stayed.*" over the match card: Scorpio + Pisces (the last card, paid off).
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e'
const S = 'scorpio'

// ── props
const BALLOON = [
  '..RRRRR..',
  '.RRWRRRR.',
  'RRWRRRRRR',
  'RRRRRRRRR',
  'RRRRRRRRR',
  '.RRRRRRR.',
  '..RRRRR..',
  '....R....',
  '....S....',
  '...S.....',
  '....S....',
  '.....S...',
  '....S....',
]
const BALLOON_C = { R: '#b07dff', W: '#fff', S: BONE }
const BANDAGE = [
  '.HH.HH.',
  'HHHHHHH',
  'HWWWWHH',
  'HWWBWHH',
  '.HWWWWH',
  '..HHHH.',
  '...H...',
]
const BEAR = [
  'BB......BB',
  'BbB....BbB',
  '.BBBBBBBB.',
  'BBeBBBBeBB',
  'BBBBttBBBB',
  'BBBBnnBBBB',
  '.BBBBBBBB.',
  'BBBBBBBBBB',
  'BBBttttBBB',
  'BBBttttBBB',
  '.BB....BB.',
]
const BEAR_C = { B: '#c98f5a', b: '#f3c49a', e: INK, t: '#f3c49a', n: INK }

function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -172, 236, 356)
  x.fillStyle = INK; x.fillRect(-122, -182, 244, 364)
  x.fillStyle = '#8a4a2e'; x.fillRect(-114, -174, 228, 348)
  x.fillStyle = '#6f3a24'; x.fillRect(-90, -150, 180, 130); x.fillRect(-90, 10, 180, 140)
  for (let i = 0; i < 5; i++) {
    const y = -130 + i * 62, o = i === 0 && open
    x.fillStyle = INK; x.fillRect(46, y - 4, 60, 44)
    x.fillStyle = o ? MINT : GOLD; x.fillRect(50, y, 52, 36)
    x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(76, y - (o ? 14 : 2), 15, Math.PI, 0); x.stroke()
  }
  x.restore()
}
function water(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.beginPath(); x.rect(150, 490, 780, 720); x.clip()
  const top = lerp(1210, 1000, k)
  const cols = ['#2a6fd1', '#1f56a8', '#17417f', '#102d5a']
  for (let i = 0; i < 4; i++) {
    x.fillStyle = cols[i]; x.beginPath(); x.moveTo(150, 1220)
    for (let px = 150; px <= 930; px += 20) x.lineTo(px, top + i * 50 + 10 * Math.sin(px / 60 + t * 2 + i))
    x.lineTo(930, 1220); x.closePath(); x.fill()
  }
  x.restore()
}
function dial(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.lineTo(150, 30); x.lineTo(-150, 30); x.closePath(); x.fill()
  const segs = ['#7dffb0', '#ffd23a', '#ff9f5a', '#ff4f86']
  for (let i = 0; i < 4; i++) { x.fillStyle = segs[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 138, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 70, Math.PI, 0); x.closePath(); x.fill()
  const a = Math.PI + p * Math.PI * 0.92 + 0.12
  x.strokeStyle = BONE; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 120, Math.sin(a) * 120); x.stroke()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 18, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('INTENSITY', 0, 70)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'It’s okay | *to trust slowly.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      door(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0)
      label(x, 790, 1110, 'LOCK 1 OF 5: OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t | *owe an explanation.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'but why?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 790, 940, 'just because.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 1110, 'VALID', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'You feel deep. | *That’s not too much.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170, y: -40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { water(x, t, ease.outCubic(prog(lt, 0.2, 1.2))) },
    front(x, t, lt, P) {
      label(x, 790, 700, 'DEPTH: OCEAN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04 })
      label(x, 790, 800, 'TOO MUCH: NO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Needing space | *is allowed.*', mood: 'sleepy', star: { x: -150 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = 0.85 * clamp(k)
        x.strokeStyle = SKYB; x.lineWidth = 8; x.beginPath(); x.arc(F.x, F.cy, 210 * k, 0, Math.PI * 2); x.stroke()
        x.fillStyle = 'rgba(143,227,255,0.12)'; x.fill()
        x.fillStyle = '#fff'; x.fillRect(F.x - 120 * k, F.cy - 140 * k, 26, 26)
        x.restore()
      }
      label(x, 800, 800, 'BACK SOON', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.04 })
      label(x, 800, 900, '(PROMISE)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Letting go | *is allowed too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 0.9, 2.4))
      drawBits(x, BALLOON, BALLOON_C, lerp(790, 840, up), lerp(900, 560, up), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 3) })
      label(x, lerp(790, 840, up), lerp(840, 500, up), 'OLD STORY', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 1090, 'bye!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Your intensity? | *It’s just love.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      dial(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.4, 1.4)))
      label(x, 790, 700, 'SETTING: LOVE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Hurt before? | *Still works.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 7)) * (lt > 1.2 ? 1 : 0)
      drawBits(x, BANDAGE, { H: '#ff4f86', W: CREAM, B: '#e8c9a0' }, 790, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2) * beat)
      label(x, 790, 1100, 'STILL WORKS ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Being soft | *won’t break you.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, BEAR, BEAR_C, F.x + 150, F.cy + 100, 13 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 820, 'SOFT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.05 })
      label(x, 790, 920, '& SAFE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 44, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Someone will | *stay.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 780, 930, 210 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false, tears: 2, hops: [P.t0 + 1.0] })
      bubble(x, 790, 660, 'still here.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      hearts(x, t, 560, 800, P.t0 + 1.6, { n: 5, life: 1.8, spread: 240, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'v3a075', key: 'C', accent: RED, solo: S, ending: 'card',
  title: 'Dear Scorpio: | *it’s okay.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'pisces', chip: 'ALIGNED' },
  group: { cap: 'Deep heart. | *Safe to open.*', mood: 'heart' },
  lesson: { text: 'The right one | makes it *safe.*', chip: 'TRUST: BUILDING' },
  last: { text: 'Pisces stayed. | *Cried, but stayed.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
