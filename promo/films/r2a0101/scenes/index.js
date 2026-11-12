// r2a0101: star_advice, ADVICE SOLO, "Virgo, you don't have | to be perfect." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): small imperfections, warmly reframed, one gag each.
//   0.0–3.6    "Virgo, you don't have | *to be perfect.*"
//   3.6–37.8   nine cards (3.8 s each):
//              the cake sank, the party still happened · wobbly handwriting, they kept the card · sang off-key, everyone
//              joined in · profile pic blinked, still got a match · a hole in the sweater, it's vintage now · came in last,
//              laughed the most · the snowman leans, he has character · messy wrapping, happy tears · mistakes and all, loved
//  37.8        "A little crooked. | *A lot loved.*"  Virgo comes back, big.
//  41.2        callback: "The sunken cake? | *Not a crumb left.*"  the cake plate comes back, empty.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VIR = '#ef5c94', RED = '#e23d4e'
const S = 'virgo'

// ── props
// a cake that sinks in the middle (sink 0…1); empty = just the plate with crumbs
function cake(x, t, cx, cy, k, sink, { empty = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 70, 190, 44, 0, 0, 7); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, 66, 180, 36, 0, 0, 7); x.fill()
  if (empty) { x.fillStyle = '#c98f2a'; for (const [a, b] of [[-60, 60], [20, 74], [70, 58], [-10, 52]]) x.fillRect(a, b, 10, 8); x.restore(); return }
  const d = 60 * sink
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, 60); x.lineTo(-150, -70); x.quadraticCurveTo(0, -70 + d * 2, 150, -70); x.lineTo(150, 60); x.closePath(); x.fill()
  x.fillStyle = '#f2b6c8'; x.beginPath(); x.moveTo(-140, 54); x.lineTo(-140, -62); x.quadraticCurveTo(0, -62 + d * 2, 140, -62); x.lineTo(140, 54); x.closePath(); x.fill()
  x.fillStyle = '#fff4e2'; x.fillRect(-140, -6, 280, 16)
  for (const cxx of [-80, 0, 80]) { const cy0 = -70 + (cxx === 0 ? d : d * 0.45); x.fillStyle = INK; x.fillRect(cxx - 9, cy0 - 70, 18, 72); x.fillStyle = LAV; x.fillRect(cxx - 5, cy0 - 66, 10, 64); x.fillStyle = GOLD; x.beginPath(); x.ellipse(cxx, cy0 - 84 + Math.sin(t * 12 + cxx) * 2, 8, 14, 0, 0, 7); x.fill() }
  x.restore()
}
function card(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -180, 316, 380)
  x.fillStyle = INK; x.fillRect(-160, -195, 320, 390); x.fillStyle = BONE; x.fillRect(-150, -185, 300, 370)
  // a wobbly hand-drawn heart and wobbly writing
  x.strokeStyle = VIR; x.lineWidth = 9; x.lineJoin = 'round'; x.beginPath()
  for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 2, w = 1 + 0.08 * Math.sin(i * 1.7); const hx = 16 * Math.pow(Math.sin(a), 3) * 5 * w, hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * 5 * w; i ? x.lineTo(hx, hy - 60) : x.moveTo(hx, hy - 60) }
  x.stroke()
  x.strokeStyle = INK; x.lineWidth = 5
  for (let r = 0; r < 3; r++) { x.beginPath(); for (let i = 0; i <= 30; i++) { const px = -110 + i * 7.3, py = 60 + r * 44 + Math.sin(i * 1.3 + r) * 6 + i * 0.3 * (r - 1); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}
function sweater(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-90, -150); x.lineTo(-200, -90); x.lineTo(-160, 10); x.lineTo(-110, -20); x.lineTo(-110, 160); x.lineTo(110, 160); x.lineTo(110, -20); x.lineTo(160, 10); x.lineTo(200, -90); x.lineTo(90, -150); x.closePath(); x.fill()
  x.fillStyle = '#7da0e8'; x.beginPath(); x.moveTo(-84, -140); x.lineTo(-186, -86); x.lineTo(-156, -4); x.lineTo(-100, -36); x.lineTo(-100, 150); x.lineTo(100, 150); x.lineTo(100, -36); x.lineTo(156, -4); x.lineTo(186, -86); x.lineTo(84, -140); x.closePath(); x.fill()
  x.fillStyle = '#a9c2f5'; for (let i = 0; i < 5; i++) x.fillRect(-90, -80 + i * 44, 180, 10)
  x.fillStyle = INK; x.beginPath(); x.arc(30, 60, 24, 0, 7); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(30, 60, 17, 0, 7); x.fill()
  x.restore()
}
function snowman(x, t, cx, cy, k, lean) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + 150); x.rotate(lean); x.scale(k, k)
  const ball = (y, r) => { x.fillStyle = INK; x.beginPath(); x.arc(0, y, r + 8, 0, 7); x.fill(); x.fillStyle = '#f4f8ff'; x.beginPath(); x.arc(0, y, r, 0, 7); x.fill() }
  ball(-80, 90); ball(-230, 68); ball(-345, 50)
  x.fillStyle = INK; x.fillRect(-20, -360, 10, 10); x.fillRect(12, -360, 10, 10)
  x.fillStyle = '#ff9a4a'; x.beginPath(); x.moveTo(0, -342); x.lineTo(46, -334); x.lineTo(0, -326); x.fill()
  x.fillStyle = RED; x.fillRect(-56, -296, 112, 22); x.fillRect(20, -280, 24, 60)
  x.fillStyle = INK; for (const y of [-250, -210]) { x.beginPath(); x.arc(0, y, 8, 0, 7); x.fill() }
  x.restore()
}
function gift(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -100); x.lineTo(140, -120); x.lineTo(160, 120); x.lineTo(-140, 110); x.closePath(); x.fill()
  x.fillStyle = MINT; x.beginPath(); x.moveTo(-140, -90); x.lineTo(130, -110); x.lineTo(150, 110); x.lineTo(-130, 100); x.closePath(); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.55)'
  for (const [a, b, r] of [[-90, -40, 0.4], [40, 20, -0.7], [-20, 70, 0.2], [90, -60, 1.1], [-100, 50, -0.3], [60, 80, 0.8]]) { x.save(); x.translate(a, b); x.rotate(r); x.fillRect(-40, -9, 80, 18); x.restore() }
  x.fillStyle = PINK; x.fillRect(-20, -112, 40, 228)
  x.fillStyle = INK; x.beginPath(); x.ellipse(-40, -128, 44, 24, -0.4, 0, 7); x.fill(); x.beginPath(); x.ellipse(40, -132, 44, 24, 0.5, 0, 7); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.ellipse(-40, -128, 36, 17, -0.4, 0, 7); x.fill(); x.beginPath(); x.ellipse(40, -132, 36, 17, 0.5, 0, 7); x.fill()
  x.restore()
}
const DIE = ['WWWWWWW', 'WKWWWKW', 'WWWWWWW', 'WWWKWWW', 'WWWWWWW', 'WKWWWKW', 'WWWWWWW']
const DIE_C = { W: '#fff4e2', K: INK }
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'The cake sank. | The party *still happened.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cake(x, t, 790, 960, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack(prog(lt, 0.5, 0.9)))
      label(x, 790, 680, 'STILL A PARTY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.3) sparkles(x, t, 790, 900, P.t0 + 1.3 * 1.29, 7, 180, 0.3)
    } },
  { sign: S, cap: 'Wobbly handwriting? | They *kept the card.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      card(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1130, 'ON THE FRIDGE. FOREVER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sang off-key. | *Everyone joined in.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', star: { x: -220 }, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      bubble(x, 400, 610, '♪ la-LAAA? ♪', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, tail: 'bc' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'leo', 720, 1000, 150 * k, { mood: 'happy', seed: 31, glyph: false, hops: [P.t0 + 1.6] }); signChar(x, t, 'gemini', 880, 960, 150 * k, { mood: 'wink', seed: 32, glyph: false, hops: [P.t0 + 1.8] }) }
      if (lt > 1.0) notes(x, t, 800, 860, { n: 5, cell: 7, col: GOLD, alpha: clamp((lt - 1.0) * 3) })
      label(x, 800, 700, 'CHOIR: FORMED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Profile pic blinked? | *Still got a match.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#3d3470'; x.fillRect(-90, -140, 180, 170)
        x.fillStyle = VIR; x.beginPath(); x.arc(0, -55, 56, 0, 7); x.fill()
        x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-30, -60); x.lineTo(-10, -60); x.moveTo(10, -60); x.lineTo(30, -60); x.stroke()
        if (lt > 1.0) { x.fillStyle = PINK; x.fillRect(-96, 60, 192, 60); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ NEW MATCH', 0, 91) }
      })
      label(x, 790, 640, 'EYES: CLOSED', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.0) hearts(x, t, 790, 960, P.t0 + 1.0 * 1.29, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'A hole in your sweater? | It’s *vintage now.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      sweater(x, t, 790, 900, 1.05 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1130, 'VINTAGE', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 48, bg: GOLD, rot: -0.06 })
    } },
  { sign: S, cap: 'Came in last. | *Laughed the most.*', mood: lt => lt > 1.1 ? 'happy' : 'neutral', star: { x: -220 }, hops: [1.2, 1.6],
    front(x, t, lt, P) {
      const roll = clamp(lt / 0.9)
      drawBits(x, DIE, DIE_C, 720 + roll * 30, 820, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: (1 - roll) * 5 })
      drawBits(x, DIE, DIE_C, 870 - roll * 20, 860, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: (1 - roll) * -4 })
      label(x, 790, 1010, 'PLACE: LAST', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'FUN: FIRST', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your snowman leans. | He has *character.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      snowman(x, t, 790, 1000, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2), 0.05 + 0.2 * ease.outBack(prog(lt, 0.6, 1.0)))
      label(x, 800, 1150, 'CHARACTER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04 })
    } },
  { sign: S, cap: 'Messy wrapping? | They *cried happy tears.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      gift(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, 'TAPE: ALL OF IT', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.2) hearts(x, t, 790, 900, P.t0 + 1.2 * 1.29, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 7 })
    } },
  { sign: S, cap: 'Mistakes and all? | *Still so loved.*', mood: 'heart', star: { x: -40, y: 20, s: 280 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'cancer', 270, 1010, 170 * k, { mood: 'heart', look: [1, 0], seed: 33, glyph: false, hops: [P.t0 + 1.4] }); signChar(x, t, 'pisces', 810, 1010, 170 * k, { mood: 'happy', look: [-1, 0], seed: 34, glyph: false, tears: 2, hops: [P.t0 + 1.6] }) }
      hearts(x, t, 500, 760, P.t0 + 1.0, { n: 8, life: 2.0, spread: 420, cell: 8, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0101', key: 'D', accent: VIR, solo: S, ending: 'callback',
  title: 'Virgo, you don’t | have to be *perfect.*',
  cameos: CAMEOS,
  group: { cap: 'A little crooked. | *A lot loved.*', mood: 'sparkle' },
  last: {
    text: 'The sunken cake? | *Not a crumb left.*',
    draw(x, t, lt) {
      cake(x, t, 700, 1130, 1.6 * pop01(t, t - lt + 0.3, 0.45, 1.8), 1, { empty: true })
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 330, 1080, 250 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 44, hops: [t - lt + 1.4] })
      label(x, 700, 1330, 'BEST CAKE EVER', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 38, bg: VIR, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
