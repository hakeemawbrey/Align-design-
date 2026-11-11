// trs3leo: THE SIGNS AS… v3, SOLO film, "Things only | Leos get." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through: nine everyday situations, each pushed to the most extreme (and lovable) Leo version.
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Things only | *Leos* get."  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              birthday week? Leo said month · boss said "nice work", Leo framed it · phone full, all selfies
//              · ran a compatibility check with themself · karaoke, never gave back the mic · winked at their reflection
//              in a spoon · profile photo is an oil painting · you got the job, Leo threw a parade
//              · you had a bad day, Leo crowned you
//  37.8        "Born for | the *spotlight.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "Love a Leo out loud. | They *glow* back."  STATUS: ADORED
//  46.9        "Their perfect match? | *Also a Leo.*" over the match card: Leo + Leo (the self-compatibility check, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'

// ── props
const CROWN = [
  'Y...Y...Y',
  'YY.YYY.YY',
  'YYYYYYYYY',
  'YRYYBYYRY',
  'YYYYYYYYY',
]
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const MIC = [
  '.GGGG.',
  'GgGGgG',
  'GGgGGG',
  'GgGGgG',
  '.GGGG.',
  '..KK..',
  '..KK..',
  '..KK..',
  '..KK..',
  '..KK..',
  '..KK..',
]
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const SPOON = [
  '..SSSSS..',
  '.SSSSSSS.',
  'SSSSSSSSS',
  'SSSSSSSSS',
  'SSSSSSSSS',
  'SSSSSSSSS',
  '.SSSSSSS.',
  '..SSSSS..',
  '....S....',
  '....S....',
  '....S....',
  '....S....',
  '....S....',
  '...SSS...',
  '...SSS...',
]
const SPOON_C = { S: '#d8dbe8' }

// a wall calendar: every day gets a little gold party star, one by one, then the month is all birthday
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -170, 336, 356)
  x.fillStyle = INK; x.fillRect(-172, -184, 344, 360)
  x.fillStyle = BONE; x.fillRect(-164, -176, 328, 344)
  x.fillStyle = RED; x.fillRect(-164, -176, 328, 62)
  x.fillStyle = '#fff4e2'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AUGUST', 0, -144)
  const n = Math.floor(clamp((lt - 0.35) / 1.3) * 31)
  for (let d = 0; d < 31; d++) {
    const c = d % 7, r = Math.floor(d / 7), px = -150 + c * 44, py = -84 + r * 54
    if (d < n) {
      x.fillStyle = '#ffe7a8'; x.fillRect(px, py - 18, 38, 40)
      drawBits(x, CROWN, CROWN_C, px + 19, py + 2, 3.6)
    } else {
      x.fillStyle = '#b9b0a0'; x.font = `700 20px ${MONO}`; x.fillText(String(d + 1), px + 18, py + 2)
    }
  }
  x.restore()
}
// a gold picture frame on the wall, with the boss's two words inside
function framed(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -116, 336, 248)
  x.fillStyle = INK; x.fillRect(-176, -132, 352, 264)
  x.fillStyle = GOLD; x.fillRect(-168, -124, 336, 248)
  x.fillStyle = '#c98f2a'; x.fillRect(-140, -96, 280, 192)
  x.fillStyle = '#fff4e2'; x.fillRect(-128, -84, 256, 168)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 44px ${INTER}`; x.fillText('“nice work”', 0, -14)
  x.font = `700 26px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('– the boss', 0, 42)
  // corner studs
  x.fillStyle = '#fff1b0'; for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) x.fillRect(a * 152 - 8, b * 108 - 8, 16, 16)
  x.restore()
}
// a phone whose whole gallery is the same face
function gallery(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-138, -214, 288, 440)
  x.fillStyle = INK; x.fillRect(-150, -226, 300, 452)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -216, 280, 432)
  x.fillStyle = '#140c30'; x.fillRect(-126, -186, 252, 372)
  const n = Math.min(12, Math.floor(Math.max(0, lt - 0.3) / 0.08) + 1)
  for (let i = 0; i < n; i++) {
    const c = i % 3, r = Math.floor(i / 3), px = -82 + c * 82, py = -136 + r * 92
    x.fillStyle = ['#ffd23a', '#ffb34a', '#ff8fb1', '#8fe3ff'][(i + r) % 4]; x.fillRect(px - 36, py - 40, 72, 82)
    signChar(x, t, 'leo', px, py + 6, 64, { mood: i % 3 === 1 ? 'wink' : 'sparkle', seed: 60 + i, glyph: false, glow: 0.6 })
  }
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 196, 60, 10)
  x.restore()
}
// a little profile card with a sign star inside and its name
function profileCard(x, t, cx, cy, k, { id = 'leo', w = 250, h = 320, mood = 'sparkle', title = '♌︎ LEO', frame = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = frame ? GOLD : '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  if (frame) {
    x.fillStyle = '#c98f2a'; x.fillRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 96)
    x.fillStyle = '#5b2e1a'; x.fillRect(-w / 2 + 28, -h / 2 + 28, w - 56, h - 120)
    // painterly strokes behind the sitter
    x.fillStyle = '#8a4a2e'; for (let i = 0; i < 6; i++) x.fillRect(-w / 2 + 36 + i * 34, -h / 2 + 40 + (i % 2) * 30, 22, 120)
  } else {
    x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 90)
  }
  signChar(x, t, id, 0, frame ? -h / 2 + 28 + (h - 120) / 2 + 8 : -26, frame ? 170 : 150, { mood, seed: 71, glyph: false, glow: frame ? 0.5 : 0.9 })
  x.fillStyle = frame ? INK : ORANGE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(title, 0, h / 2 - 38)
  x.restore()
}
// paper confetti falling over the parade
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
// bunting across the top of the panel
function bunting(x, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i <= 20; i++) { const fx = 600 + i * 18, fy = 600 + 30 * Math.sin(Math.PI * i / 20); i ? x.lineTo(fx, fy) : x.moveTo(fx, fy) } x.stroke()
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE]
  for (let i = 0; i < 7; i++) { const fx = 620 + i * 52, fy = 600 + 30 * Math.sin(Math.PI * (i * 52 + 20) / 360); x.fillStyle = COLS[i % 5]; x.beginPath(); x.moveTo(fx - 18, fy); x.lineTo(fx + 18, fy); x.lineTo(fx, fy + 36); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: 'leo', cap: 'Birthday week? | Leo said *month.*', mood: lt => lt > 1.6 ? 'heart' : 'sparkle', star: { x: -170 }, hops: [1.7],
    front(x, t, lt, P) {
      calendar(x, 770, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 770, 1090, 'ALL OF IT. BIRTHDAY.', pop01(t, P.t0 + 1.75, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 790, 830, P.t0 + 1.8, 7, 190, 0.3)
    } },
  { sign: 'leo', cap: 'Boss said “nice work.” | Leo *framed it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      framed(x, 790, 800, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      label(x, 790, 1030, 'HUNG. LIT. ADMIRED.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.05 })
      sparkles(x, t, 790, 800, P.t0 + 0.7, 7, 200, 0.5)
    } },
  { sign: 'leo', cap: 'Phone storage full. | All *selfies.*', mood: lt => Math.floor(lt * 2.2) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      gallery(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 610, 'STORAGE FULL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 390, 1110, 'worth it', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Ran a compatibility check. | With *themself.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 610, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      profileCard(x, t, 790, 860, pop01(t, P.t0 + 0.45, 0.35, 2), { mood: lt > 1.4 ? 'heart' : 'wink' })
      label(x, 790, 1100, 'LEO + LEO: PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04 })
      hearts(x, t, 560, 800, P.t0 + 1.5, { n: 5, life: 1.7, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Karaoke night. | Never *gave back the mic.*', mood: lt => lt > 1.5 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 160, F.cy + 10, 13 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.35 })
      notes(x, t, F.x + 200, F.cy - 80, { n: 4, cell: 7, col: ORANGE, seed: 2 })
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.6) * 13)
      label(x, 800, 680, `SONG ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'one more!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Caught their reflection | in a *spoon.* Winked.', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, SPOON, SPOON_C, 790, 900, 30 * k, { rot: 0.12 })
      if (k > 0.6) {
        x.save(); x.translate(790, 900); x.rotate(0.12); x.translate(-790, -900)
        x.globalAlpha = clamp((k - 0.6) * 2.5)
        signChar(x, t, 'leo', 774, 860, 150, { mood: lt > 1.1 ? 'wink' : 'happy', seed: 81, glyph: false, glow: 0.4, squash: -0.04 })
        x.restore()
      }
      bubble(x, 800, 610, 'hey, you.', pop01(t, P.t0 + 1.15, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 780, 800, P.t0 + 1.15, 6, 150, 0.7)
    } },
  { sign: 'leo', cap: 'Their profile photo? | An *oil painting.*', mood: 'sparkle', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      profileCard(x, t, 790, 830, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 290, h: 380, frame: true, title: 'MY PROFILE', mood: 'sparkle' })
      label(x, 790, 1100, 'OIL ON CANVAS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 830, P.t0 + 1.0, 7, 210, 0.9)
    } },
  { sign: 'leo', cap: 'You got the job. | Leo threw a *parade.*', mood: lt => lt > 0.9 ? 'heart' : 'sparkle', star: { x: -180 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      bunting(x, pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.35, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 990, 190 * k, { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.4] })
      label(x, 800, 760, 'NEW JOB!!', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 44, bg: MINT, rot: 0.05 })
      confetti(x, t, 600, 860, P.t0 + 0.9)
      bubble(x, 390, 600, 'SPEECH!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Had a bad day? | Leo *crowned you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [0.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      const happy = lt > 1.2
      const Fc = signChar(x, t, 'cancer', 790, 960, 220 * k, { mood: happy ? 'heart' : 'neutral', look: happy ? [0, 0] : [0, 1], seed: 17, glyph: false, hops: [P.t0 + 1.3] })
      // the crown drops from above onto the friend's head
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.6, 1.2)) : ease.outCubic(prog(lt, 0.6, 1.2))
      if (lt > 0.55) drawBits(x, CROWN, CROWN_C, 790, lerp(560, Fc.top - 34, d), 14, { rot: 0.06 })
      if (!happy) bubble(x, 790, 1150, 'ugh, today…', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
      else label(x, 790, 1150, 'ROYALTY NOW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 790, 760, P.t0 + 1.2, 7, 170, 0.6)
    } },
]

const F = makeFilm({
  id: 'trs3leo', key: 'E', accent: ORANGE, solo: 'leo',
  title: 'Things only | *Leos* get.',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'leo', chip: 'PERFECT MATCH' },
  group: { cap: 'Born for | the *spotlight.*', mood: 'sparkle' },
  lesson: { text: 'Love a Leo out loud. | They *glow* back.', chip: 'STATUS: ADORED' },
  last: {
    text: 'Their perfect match? | *Also a Leo.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
