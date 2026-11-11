// v3a013: zodiac.advice444, ADVICE SOLO, "Libra, your gift | is this." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the lovely things Libras do without noticing, one gag each.
//   0.0–3.6    "Libra, your gift | *is this.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              introduces two shy strangers ("you two would love each other") · sees both sides (a perfectly level scale)
//              · walks in and the room gets prettier (flowers + fairy lights) · ends a fight with cookies: PEACE TREATY
//              · compliments that are true ("your laugh is my favourite") · makes a new match feel welcome ("love your chart!")
//              · splits dessert with a ruler: 50/50 · remembers everyone's order (a row of cups)
//              · the group selfie: "scoot in, everyone fits!"
//  37.8        "Grace. | *On purpose.*"  Libra comes back, big.
//  41.0        LESSON UNLOCKED: "Keep some of that peace | *for yourself.*"  BALANCE: FOUND
//  46.9        "Aries and Scorpio? | *Friends now.*" over the match card: Aries + Scorpio (the peace treaty, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9ccf', WOOD = '#c98f2a', RED = '#e23d4e'
const S = 'libra'

// ── props
const COOKIE = ['.CCCC.', 'CCdCCC', 'CCCCdC', 'CdCCCC', 'CCCdCC', '.CCCC.']
const COOKIE_C = { C: '#e7b46a', d: '#5b2e1a' }
const VASE = [
  '.P.R..P.',
  'PYP.RYR.',
  '.P..R...',
  '..G.G.G.',
  '...GGG..',
  '....G...',
  '...BBB..',
  '..BBBBB.',
  '..BWBBB.',
  '..BBBBB.',
  '...BBB..',
]
const VASE_C = { P: PINK, R: RED, Y: GOLD, G: '#5fd068', B: SKYB, W: '#fff' }
const CAKE = [
  '.......WW',
  '.....WWPP',
  '...WWPPPP',
  '.WWPPPPPP',
  'WWWWWWWWW',
  'PPPPPPPPP',
  'YYYYYYYYY',
  'PPPPPPPPP',
]
const CAKE_C = { W: '#fff4e2', P: ROSE, Y: GOLD }

// a balance scale, both pans level
function scale(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const tilt = 0.25 * Math.exp(-Math.max(0, t) * 0) // set by caller via k-phase below
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 290); x.fillRect(-84, 144, 168, 16)
  x.restore()
}
function beamPans(x, cx, cy, k, ang) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.rotate(ang)
  x.fillStyle = INK; x.fillRect(-154, -12, 308, 24); x.fillStyle = GOLD; x.fillRect(-148, -6, 296, 12)
  const ends = [-140, 140].map(px => [px * Math.cos(ang), px * Math.sin(ang)])
  x.restore()
  for (const [px, py] of ends) {
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 56, py + 110); x.moveTo(px, py); x.lineTo(px + 56, py + 110); x.stroke()
    x.fillStyle = INK; x.beginPath(); x.ellipse(px, py + 114, 72, 20, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.ellipse(px, py + 112, 66, 15, 0, 0, Math.PI * 2); x.fill()
  }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = ROSE; x.beginPath(); x.arc(0, 0, 15, 0, Math.PI * 2); x.fill()
  x.restore()
}
// fairy lights strung across the top of the panel
function fairyLights(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 3; x.beginPath()
  for (let i = 0; i <= 24; i++) { const fx = 130 + i * 34, fy = 540 + 40 * Math.sin(Math.PI * i / 12); i ? x.lineTo(fx, fy) : x.moveTo(fx, fy) } x.stroke()
  const COLS = [GOLD, ROSE, MINT, SKYB]
  for (let i = 0; i < 12; i++) {
    const fx = 147 + i * 68, fy = 540 + 40 * Math.sin(Math.PI * (i * 68 + 17) / 408) + 14, on = 0.6 + 0.4 * Math.sin(t * 5 + i)
    x.fillStyle = INK; x.fillRect(fx - 9, fy - 9, 18, 22)
    x.globalAlpha = clamp(k) * on; x.fillStyle = COLS[i % 4]; x.fillRect(fx - 6, fy - 6, 12, 16); x.globalAlpha = clamp(k)
  }
  x.restore()
}
// a phone with a first message to a new match
function phone(x, cx, cy, k, sent) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = MINT; x.fillRect(-100, -146, 200, 46)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ IT’S A MATCH', 0, -122)
  if (sent > 0.01) {
    x.save(); x.translate(10, -10); x.scale(sent, sent)
    x.fillStyle = ROSE; x.fillRect(-90, -50, 186, 104)
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('hi! love', 3, -18); x.fillText('your chart!', 3, 20)
    x.restore()
  }
  x.restore()
}
// a row of takeaway cups, each with a sign glyph
function cups(x, t, cy, P, ids) {
  ids.forEach((id, i) => {
    const k = pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2.2)
    if (k <= 0.01) return
    const cx = 610 + i * 100
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-42, -70); x.lineTo(42, -70); x.lineTo(32, 70); x.lineTo(-32, 70); x.closePath(); x.fill()
    x.fillStyle = '#fff4e2'; x.beginPath(); x.moveTo(-36, -64); x.lineTo(36, -64); x.lineTo(27, 64); x.lineTo(-27, 64); x.closePath(); x.fill()
    x.fillStyle = INK; x.fillRect(-48, -86, 96, 22); x.fillStyle = '#8a4a2e'; x.fillRect(-44, -82, 88, 14)
    x.fillStyle = WOOD; x.fillRect(-31, -10, 62, 34)
    x.fillStyle = INK; x.font = `700 30px 'Segoe UI Symbol', 'Noto Sans Symbols', ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(['♈︎', '♋︎', '♏︎', '♓︎'][i], 0, 8)
    x.restore()
  })
}
// a camera viewfinder frame (corner brackets)
function viewfinder(x, cx, cy, w, h, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 8
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.beginPath(); x.moveTo(sx * w / 2, sy * (h / 2 - 50)); x.lineTo(sx * w / 2, sy * h / 2); x.lineTo(sx * (w / 2 - 50), sy * h / 2); x.stroke() }
  x.fillStyle = RED; x.beginPath(); x.arc(-w / 2 + 34, -h / 2 + 34, 10, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Strangers meet you. | *Leave as friends.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      const a = pop01(t, P.t0 + 0.2, 0.35, 2), b = pop01(t, P.t0 + 0.35, 0.35, 2), meet = ease.inOutCubic(prog(lt, 0.9, 1.6))
      if (a > 0.01) signChar(x, t, 'virgo', lerp(640, 690, meet), 980, 160 * a, { mood: lt > 1.6 ? 'happy' : 'neutral', look: [lt > 1.0 ? 1 : 0, 1], seed: 21, glyph: false, hops: [P.t0 + 1.8] })
      if (b > 0.01) signChar(x, t, 'aquarius', lerp(900, 850, meet), 980, 160 * b, { mood: lt > 1.6 ? 'happy' : 'neutral', look: [lt > 1.0 ? -1 : 0, 1], seed: 22, glyph: false, hops: [P.t0 + 1.8] })
      bubble(x, 600, 640, 'you two would | LOVE each other', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      hearts(x, t, 770, 900, P.t0 + 1.8, { n: 5, life: 1.6, spread: 120, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'You always see | *both sides.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      scale(x, t, 760, 830, k)
      const ang = 0.3 * Math.cos(lt * 5) * (1 - ease.outCubic(prog(lt, 0.3, 1.4)))
      beamPans(x, 760, 700, k, ang)
      label(x, 790, 1120, 'PERFECTLY EVEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You walk in. | The room gets *prettier.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.4],
    back(x, t, lt, P) { fairyLights(x, t, pop01(t, P.t0 + 0.9, 0.3, 1.2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      x.fillStyle = INK; x.fillRect(650, 1060, 280, 22); x.fillStyle = WOOD; x.fillRect(654, 1064, 272, 14)
      drawBits(x, VASE, VASE_C, 790, 960, 17 * k)
      label(x, 790, 760, '+ VIBES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 7, 190, 0.6)
    } },
  { sign: S, cap: 'You end fights | *with cookies.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: 0, y: 50, s: 240 },
    front(x, t, lt, P) {
      const peace = lt > 1.4
      const a = pop01(t, P.t0 + 0.1, 0.35, 2)
      if (a > 0.01) {
        signChar(x, t, 'aries', 250, 960, 180 * a, { mood: peace ? 'happy' : 'eyeroll', look: [1, 0], seed: 23, glyph: false, hops: peace ? [P.t0 + 1.9] : [] })
        signChar(x, t, 'scorpio', 830, 960, 180 * a, { mood: peace ? 'happy' : 'eyeroll', look: [-1, 0], seed: 24, glyph: false, hops: peace ? [P.t0 + 1.9] : [] })
      }
      const ck = pop01(t, P.t0 + 0.8, 0.3, 2)
      drawBits(x, COOKIE, COOKIE_C, 380, 1090, 11 * ck, { rot: 0.2 })
      drawBits(x, COOKIE, COOKIE_C, 700, 1090, 11 * ck, { rot: -0.2 })
      if (!peace) bubble(x, 540, 600, 'ugh. | NO, you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
      else label(x, 540, 610, 'PEACE TREATY', pop01(t, P.t0 + 1.45, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Your compliments | *are actually true.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 810, 980, 210 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 25, glyph: false, hops: [P.t0 + 1.4] })
      bubble(x, 560, 630, 'your laugh is | my favourite', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 810, 1150, 'BLUSHING. HARD.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A new match | *feels welcome* fast.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 840, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 0.8, 0.3, 2.2))
      label(x, 780, 1110, 'REPLY: INSTANT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fair is | *your love language.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CAKE, CAKE_C, 790, 900, 26 * k)
      const r = pop01(t, P.t0 + 0.7, 0.3, 2)
      if (r > 0.01) {
        x.save(); x.translate(790, 1040); x.scale(r, r)
        x.fillStyle = INK; x.fillRect(-150, -18, 300, 36); x.fillStyle = GOLD; x.fillRect(-145, -13, 290, 26)
        x.fillStyle = INK; for (let i = 0; i <= 14; i++) x.fillRect(-140 + i * 20, -13, 3, i % 5 ? 10 : 18)
        x.restore()
      }
      x.save(); x.globalAlpha = clamp((lt - 1.0) * 3); x.strokeStyle = INK; x.setLineDash([10, 8]); x.lineWidth = 5
      x.beginPath(); x.moveTo(790, 760); x.lineTo(790, 1020); x.stroke(); x.restore()
      label(x, 790, 650, 'EXACTLY 50/50', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You remember | *everyone’s order.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      cups(x, t, 950, P, [0, 1, 2, 3])
      label(x, 760, 700, 'ONE OAT, EXTRA HOT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 760, 780, 'NEVER WROTE IT DOWN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: ROSE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'In your photos, | *everyone fits.*', mood: 'sparkle', star: { x: -150, y: 40, s: 230 }, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      const ids = [['cancer', 610], ['taurus', 740], ['gemini', 870]]
      ids.forEach(([id, px], i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, px + (lt > 1.2 ? -20 : 0), 950, 150 * k, { mood: lt > 1.5 ? 'happy' : 'wide', seed: 26 + i, glyph: false, hops: [P.t0 + 1.6 + i * 0.05] })
      })
      viewfinder(x, 560, 900, 700, 460, pop01(t, P.t0 + 0.2, 0.3, 1.6))
      bubble(x, 600, 590, 'scoot in, | everyone fits!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, tail: 'bl' })
      if (lt > 1.6 && lt < 1.75) { x.fillStyle = 'rgba(255,250,235,0.45)'; x.fillRect(110, 480, 860, 740) }
    } },
]

const F = makeFilm({
  id: 'v3a013', key: 'F', accent: ROSE, solo: S,
  title: 'Libra, your gift | *is this.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'scorpio', chip: 'ALIGNED' },
  group: { cap: 'Grace. | *On purpose.*', mood: 'sparkle' },
  lesson: { text: 'Keep some of that peace | *for yourself.*', chip: 'BALANCE: FOUND' },
  last: {
    text: 'Aries and Scorpio? | *Friends now.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
