// r2a0255: star_advice, ADVICE ROLLCALL, "Each sign | at a new job." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific line each about their first days at a new job, with one light gag.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ asks for the hard task on day one · ♉ finds the snack drawer first, smart · ♊ makes a work friend in the
//              lift · ♋ brings cookies for the whole team · ♌ introduces themself with a theme song · ♍ takes notes on the
//              welcome speech · ♎ decorates the desk before logging in · ♏ quietly learns how everything works
//              · ♐ asks about the travel policy · ♑ already sketching the path up · ♒ has a better system by hour two
//              · ♓ cries at the welcome card
//  49.2        group ending: "New job nerves? | *You’ve got this.*"  the group photo with a DAY ONE: DONE sticker.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const JOB = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', BROWN = '#7a4a2e'
const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
function slab(x, cx, cy, w, h, k, { rot = 0.04, bg = BONE, edge = INK } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(x)
  x.restore()
}
// a desk top (a plank) the props sit on
function desk(x, cx, cy, k, w = 380) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -6, w + 12, 40); x.fillRect(-w / 2 + 14, 30, 22, 120); x.fillRect(w / 2 - 36, 30, 22, 120)
  x.fillStyle = WOOD; x.fillRect(-w / 2, 0, w, 28)
  x.restore()
}
function cookieTray(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -20, 360, 40); x.fillStyle = '#c9c9d8'; x.fillRect(-172, -14, 344, 28)
  for (let i = 0; i < 8; i++) { const c = i % 4, r = Math.floor(i / 4), px = -120 + c * 80, py = -46 - r * 50; x.fillStyle = INK; x.beginPath(); x.arc(px, py, 32, 0, 7); x.fill(); x.fillStyle = WOOD; x.beginPath(); x.arc(px, py, 26, 0, 7); x.fill(); x.fillStyle = BROWN; for (const [a, b] of [[-8, -6], [8, 4], [-4, 10], [10, -10]]) x.fillRect(px + a, py + b, 6, 6) }
  x.restore()
}
function snackDrawer(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = '#8a8aa0'; x.fillRect(-152, -142, 304, 284)
  x.fillStyle = INK; for (let i = 0; i < 3; i++) x.fillRect(-152, -50 + i * 94, 304, 6)
  const dx = open * 120
  x.fillStyle = INK; x.fillRect(-152 + dx - 8, -142 - 4, 304 + 16, 96)
  x.fillStyle = '#a9a9bd'; x.fillRect(-152 + dx, -142, 304, 86)
  // snacks peeking out
  const S = [[GOLD, -100], [PINK, -40], [MINT, 20], [SKYB, 80]]
  if (open > 0.3) S.forEach(([c, a], i) => { x.fillStyle = INK; x.fillRect(a + dx - 26, -196, 52, 64); x.fillStyle = c; x.fillRect(a + dx - 20, -190, 40, 52) })
  x.fillStyle = INK; x.fillRect(-30 + dx, -110, 60, 16)
  x.restore()
}
function notepad(x, t, cx, cy, k, lt) {
  slab(x, cx, cy, 280, 360, k, { rot: 0.04, bg: CREAM }, x => {
    x.fillStyle = '#ef5c94'; x.fillRect(-140, -180, 280, 30)
    txt(x, 'WELCOME SPEECH', 0, -120, 20, '#3d3470', MONO, 700)
    const n = Math.floor(clamp((lt - 0.3) / 1.4) * 8)
    for (let i = 0; i < n; i++) { x.fillStyle = '#6b62a8'; x.fillRect(-110 + (i % 3 === 0 ? 0 : 20), -80 + i * 32, 200 - (i * 23) % 70, 10) }
    if (lt > 1.6) { x.fillStyle = MINT; x.fillRect(40, 120, 90, 34); txt(x, 'p. 1/4', 85, 138, 18, INK, MONO, 700) }
  })
}
function manual(x, t, cx, cy, k) {
  slab(x, cx, cy, 240, 320, k, { rot: -0.04, bg: '#3d2a4a' }, x => {
    txt(x, 'HOW', 0, -70, 40, GOLD); txt(x, 'EVERYTHING', 0, -20, 30, GOLD); txt(x, 'WORKS', 0, 26, 40, GOLD)
    txt(x, '(all of it)', 0, 100, 20, LAV, MONO, 700)
  })
}
function flowchart(x, t, cx, cy, k, lt) {
  slab(x, cx, cy, 320, 360, k, { rot: 0.03, bg: '#1f3a5a' }, x => {
    const boxes = [[0, -120], [-80, -20], [80, -20], [0, 90]]
    boxes.forEach(([a, b], i) => { if (lt < 0.3 + i * 0.3) return; x.fillStyle = INK; x.fillRect(a - 56, b - 30, 112, 60); x.fillStyle = [SKYB, MINT, PINK, GOLD][i]; x.fillRect(a - 50, b - 24, 100, 48) })
    x.strokeStyle = BONE; x.lineWidth = 5
    if (lt > 0.9) { x.beginPath(); x.moveTo(0, -90); x.lineTo(-80, -50); x.moveTo(0, -90); x.lineTo(80, -50); x.stroke() }
    if (lt > 1.4) { x.beginPath(); x.moveTo(-80, 10); x.lineTo(0, 60); x.moveTo(80, 10); x.lineTo(0, 60); x.stroke() }
    txt(x, 'v2', 120, 150, 24, GOLD, MONO, 700)
  })
}
function ladder(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-80, -220, 20, 440); x.fillRect(60, -220, 20, 440)
  for (let i = 0; i < 7; i++) { x.fillStyle = INK; x.fillRect(-64, -190 + i * 62, 128, 16); x.fillStyle = WOOD; x.fillRect(-60, -187 + i * 62, 120, 10) }
  x.fillStyle = WOOD; x.fillRect(-76, -216, 12, 432); x.fillRect(64, -216, 12, 432)
  x.restore()
}
function welcomeCard(x, t, cx, cy, k, open) {
  slab(x, cx, cy, 300, 220, k, { rot: -0.04, bg: CREAM }, x => {
    x.fillStyle = '#7c74f0'; x.fillRect(-150, -110, 300, 54)
    txt(x, 'WELCOME!', 0, -82, 34, CREAM)
    txt(x, 'so glad you’re here', 0, -10, 24, '#3d3470', "'EB Garamond', Georgia, serif", 600)
    txt(x, '– the team', 40, 40, 20, '#6b62a8', MONO, 700)
    drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, -90, 60, 6)
  })
}
function suitcase(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -100, 300, 210); x.fillRect(-50, -140, 100, 50)
  x.fillStyle = '#5b3a8a'; x.fillRect(-142, -92, 284, 194); x.fillStyle = '#140c30'; x.fillRect(-42, -132, 84, 36)
  x.fillStyle = INK; x.fillRect(-100, -92, 14, 194); x.fillRect(86, -92, 14, 194)
  for (const [a, b, c] of [[-40, -30, GOLD], [30, 20, PINK], [-20, 50, MINT]]) { x.save(); x.translate(a, b); x.rotate(a * 0.01); x.fillStyle = INK; x.fillRect(-32, -22, 64, 44); x.fillStyle = c; x.fillRect(-28, -18, 56, 36); x.restore() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Asks for the hard task. | *On day one.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      slab(x, 790, 860, 280, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05, bg: CREAM }, x => { x.fillStyle = RED; x.fillRect(-140, -100, 280, 50); txt(x, 'TASK: HARD', 0, -74, 28, CREAM, MONO, 700); txt(x, 'nobody wants it', 0, 10, 24, '#3d3470', MONO, 700); txt(x, '(yet)', 0, 50, 22, '#6b62a8', MONO, 700) })
      bubble(x, 790, 1080, 'mine!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 48, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Finds the snack drawer | *first.* Smart.', mood: lt => lt > 1.0 ? 'heart' : 'squint', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      snackDrawer(x, t, 760, 940, 0.9 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack(prog(lt, 0.6, 0.95)))
      label(x, 790, 640, 'PRIORITIES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: '#e9b24a', rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Makes a work friend | *in the lift.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -160 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(200, 560, 680, 640); x.fillStyle = '#5a5a78'; x.fillRect(212, 572, 656, 616); x.fillStyle = '#6a6a88'; x.fillRect(540, 572, 4, 616); x.fillStyle = INK; x.fillRect(780, 760, 60, 120); x.fillStyle = GOLD; x.fillRect(792, 776, 36, 36); x.fillStyle = BONE; x.fillRect(792, 826, 36, 36); x.restore() }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 650, 960, 170 * k, { mood: lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], seed: 41, glyph: false })
      bubble(x, 420, 640, 'hi! I’m new!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 660, 1140, 'BEST FRIENDS NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: '#f2cf4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Brings cookies | *for the whole team.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      cookieTray(x, t, 790, 1000, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 660, 'EVERYONE’S FAVOURITE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: '#3fb6f0', rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 5, life: 1.5, spread: 220, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'Introduces themself | with a *theme song.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.7, 1.4, 2.0],
    front(x, t, lt, P) {
      notes(x, t, 560, 860, { n: 6, cell: 8, col: '#f39a3a', seed: 1 })
      bubble(x, 790, 700, '♪ it’s me, the new hire ♪', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 28, tail: 'bl' })
      label(x, 790, 1060, 'MEMORABLE', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 44, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'Takes notes | on *the welcome speech.*', mood: 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) { notepad(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'libra', cap: 'Decorates the desk | *before logging in.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      desk(x, 790, 1060, pop01(t, P.t0 + 0.15, 0.3, 2))
      const k1 = pop01(t, P.t0 + 0.4, 0.3, 2), k2 = pop01(t, P.t0 + 0.7, 0.3, 2), k3 = pop01(t, P.t0 + 1.0, 0.3, 2)
      if (k1 > 0.01) { x.save(); x.translate(690, 1060); x.scale(k1, k1); x.fillStyle = INK; x.fillRect(-36, -90, 72, 90); x.fillStyle = PINK; x.fillRect(-30, -84, 60, 84); for (const [a, b, c] of [[-24, -130, '#ff6a9a'], [10, -150, GOLD], [30, -118, LAV]]) { x.fillStyle = '#3fae5e'; x.fillRect(a + 2, b + 14, 6, -b - 100); x.fillStyle = INK; x.beginPath(); x.arc(a + 5, b, 20, 0, 7); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(a + 5, b, 15, 0, 7); x.fill() } x.restore() }
      if (k2 > 0.01) slab(x, 820, 990, 110, 130, k2, { rot: 0.08, bg: '#e163d6' }, x => signChar(x, t, 'libra', 0, 0, 80, { mood: 'wink', seed: 51, glyph: false, glow: 0.4 }))
      if (k3 > 0.01) { x.save(); x.translate(920, 1040); x.scale(k3, k3); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 26, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 20, 0, 7); x.fill(); x.restore() }
      label(x, 790, 650, 'LOGGED IN: 11 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Quietly learns | *how everything works.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      manual(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1130, 'WEEK ONE: EXPERT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#e23d66', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Asks about | the *travel policy.* Day one.', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.1],
    front(x, t, lt, P) {
      suitcase(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 650, 'any trips?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Already sketching | *the path up.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -220 },
    front(x, t, lt, P) {
      ladder(x, t, 790, 880, 0.9 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const c = ease.outCubic(prog(lt, 0.6, 1.6))
      if (c > 0) signChar(x, t, 'capricorn', 790, lerp(1050, 760, c), 110, { mood: 'sparkle', seed: 61, glyph: false, hops: [P.t0 + 0.8, P.t0 + 1.2, P.t0 + 1.6] })
      label(x, 790, 1150, 'STEP 1 OF MANY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Has a better system | *by hour two.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      flowchart(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1130, 'TEAM: IMPRESSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: '#38c4ec', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries at | *the welcome card.*', mood: 'heart', tears: lt => lt > 0.7 ? 3 : 2, look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      welcomeCard(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1100, 'HAPPY TEARS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: '#7c74f0', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0255', key: 'G', accent: JOB, ending: 'group',
  title: 'Each sign | *at a new job.*',
  cameos: CAMEOS,
  group: {
    cap: 'New job nerves? | *You’ve got this.*',
    moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'happy', 'wink', 'happy', 'sparkle', 'happy', 'sparkle', 'heart'],
    draw(x, t, lt) { label(x, 540, 700, 'DAY ONE: DONE', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 48, bg: JOB, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
