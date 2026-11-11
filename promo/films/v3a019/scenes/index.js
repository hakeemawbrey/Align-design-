// v3a019: zodiac.advice444, ADVICE SOLO, "Dear Taurus: | it's okay." (~51 s vertical, signs3kit social cut, lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): a gentle Taurus truth, a warm "it's okay", one gag each.
//   0.0–3.6    "Dear Taurus: | *it’s okay.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the same favourite outfit, seven times over · change is scary: one toe in the water at a time
//              · stubborn and kind (Aries pushes, Taurus doesn't budge: HAVE A SEAT) · a bubble bath: SPA AT HOME
//              · missing someone (a pressed flower in a book: KEPT IT) · last over the finish line, holding flowers
//              · a match that wasn't forever (stamp: IT WAS NICE) · giant fluffy slippers: COMFORT NON-NEGOTIABLE
//              · a jar of feelings, lid pops, hearts float out
//  37.8        GROUP ending: "Soft, steady, | *still not moving.*"  Taurus comes back, big (the Aries push, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const MOSS = '#9fdc6a', RED = '#e23d4e', WOOD = '#c98f2a', ORANGE = '#ffb34a'
const S = 'taurus'

// ── props
const TEE = ['SSS...SSS', 'SSSSSSSSS', 'SSSSSSSSS', '.SSSSSSS.', '..SSSSS..', '..SSSSS..', '..SSSSS..']
const FLOWER = ['.PP.', 'PYYP', 'PYYP', '.PP.', '..G.', '.GG.', '..G.', '..G.']
const SLIPPER = [
  '..WWWWWW......',
  '.WWWWWWWWW....',
  'WWWPPPPWWWWW..',
  'WWPPPPPPWWWWWW',
  'WWWWWWWWWWWWWW',
  '.KKKKKKKKKKKK.',
]
const SLIPPER_C = { W: '#fff4e2', P: PINK, K: '#c9a6ff' }

// a wardrobe rail with seven identical tees
function wardrobe(x, cx, cy, n) {
  x.fillStyle = INK; x.fillRect(cx - 200, cy - 120, 400, 12)
  for (let i = 0; i < n; i++) {
    const px = cx - 160 + i * 80
    x.fillStyle = INK; x.fillRect(px - 2, cy - 112, 4, 24)
    drawBits(x, TEE, { S: MOSS }, px, cy - 40, 11)
  }
}
// a little pool with ripples where the toe touches
function pool(x, t, cx, cy, k, touch) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 230, 70, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#6fc7ff'; x.beginPath(); x.ellipse(0, 0, 220, 62, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-120, -20, 80, 8); x.fillRect(40, 10, 60, 8)
  if (touch > 0) for (let i = 0; i < 3; i++) {
    const r = ((t * 0.9 + i / 3) % 1)
    x.strokeStyle = `rgba(255,255,255,${(0.8 * (1 - r)).toFixed(3)})`; x.lineWidth = 4
    x.beginPath(); x.ellipse(-150, -10, 20 + r * 90, 6 + r * 26, 0, 0, Math.PI * 2); x.stroke()
  }
  x.restore()
}
// a bathtub of bubbles over the bottom of the star
function bath(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const puff = (px, py, r) => { x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; for (let i = 0; i < 9; i++) puff(-200 + i * 50, -20 + Math.sin(i * 1.7) * 12, 40)
  x.fillStyle = '#f4f0ff'; for (let i = 0; i < 9; i++) puff(-200 + i * 50, -20 + Math.sin(i * 1.7) * 12, 34)
  x.fillStyle = INK; x.fillRect(-250, -10, 500, 150)
  x.fillStyle = '#fff4e2'; x.fillRect(-242, -2, 484, 134)
  x.fillStyle = INK; x.fillRect(-210, 140, 24, 40); x.fillRect(186, 140, 24, 40)
  x.restore()
  for (let i = 0; i < 6; i++) {
    const ph = (t * 0.5 + i / 6) % 1
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * clamp(k); x.strokeStyle = BONE; x.lineWidth = 3
    x.beginPath(); x.arc(cx - 150 + i * 60 + Math.sin(t * 2 + i) * 10, cy - 60 - ph * 260, 10 + (i % 3) * 6, 0, Math.PI * 2); x.stroke(); x.restore()
  }
}
// an open book with a pressed flower
function book(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-196, -110, 404, 240)
  x.fillStyle = INK; x.fillRect(-208, -122, 416, 244)
  x.fillStyle = '#5b3a8a'; x.fillRect(-202, -116, 404, 232)
  x.fillStyle = '#fff4e2'; x.fillRect(-190, -106, 184, 212); x.fillRect(6, -106, 184, 212)
  x.fillStyle = '#d6cdbb'; for (let i = 0; i < 6; i++) x.fillRect(-170, -76 + i * 30, 144, 6)
  x.restore()
  drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: '#5fd068' }, cx + 92 * k, cy, 14 * k, { rot: 0.3 })
}
// a finish line ribbon, already broken, with a bouquet
function finish(x, cx, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.fillRect(cx - 6, 560, 12, 600)
  for (let j = 0; j < 12; j++) { x.fillStyle = j % 2 ? '#fff4e2' : INK; x.fillRect(cx - 6, 560 + j * 50, 12, 25) }
  x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(cx, 800); x.quadraticCurveTo(cx - 60, 900, cx - 30, 1000); x.stroke()
  x.restore()
}
// a profile card stamped IT WAS NICE
function niceCard(x, t, cx, cy, k, stamp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-117, -150, 250, 320)
  x.fillStyle = INK; x.fillRect(-131, -166, 262, 332)
  x.fillStyle = '#2a2350'; x.fillRect(-125, -160, 250, 320)
  x.fillStyle = '#140c30'; x.fillRect(-111, -146, 222, 230)
  signChar(x, t, 'gemini', 0, -30, 150, { mood: 'happy', look: [-1, 0], seed: 52, glyph: false, glow: 0.8 })
  x.fillStyle = GOLD; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ MATCH', 0, 122)
  if (stamp > 0.01) {
    x.save(); x.translate(0, 40); x.rotate(-0.2); x.scale(stamp, stamp)
    x.fillStyle = '#e8fff0'; x.fillRect(-130, -38, 260, 76)
    x.strokeStyle = '#2f9e5a'; x.lineWidth = 7; x.strokeRect(-130, -38, 260, 76)
    x.fillStyle = '#2f9e5a'; x.font = `800 36px ${INTER}`; x.fillText('IT WAS NICE', 0, 2)
    x.restore()
  }
  x.restore()
}
// a glass jar labelled FEELINGS; the lid pops off and hearts float out
function jar(x, t, cx, cy, k, pop) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-116, -130, 232, 270)
  x.fillStyle = 'rgba(220,240,255,0.85)'; x.fillRect(-108, -122, 216, 254)
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-90, -100, 18, 160)
  if (pop < 0.5) { x.fillStyle = PINK; for (let i = 0; i < 5; i++) x.fillRect(-70 + i * 30, 40 - (i % 2) * 30, 24, 24) }
  x.fillStyle = INK; x.fillRect(-84, -10, 168, 64); x.fillStyle = '#fff4e2'; x.fillRect(-78, -4, 156, 52)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FEELINGS', 0, 22)
  x.save(); x.translate(pop * 70, -140 - pop * 90); x.rotate(pop * 1.4)
  x.fillStyle = INK; x.fillRect(-126, -24, 252, 40); x.fillStyle = GOLD; x.fillRect(-120, -18, 240, 28)
  x.restore()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Same outfit again? | *Still cute.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.6],
    front(x, t, lt, P) {
      wardrobe(x, 760, 820, Math.min(5, Math.floor(clamp((lt - 0.2) / 1.0) * 5)))
      label(x, 760, 1010, 'MY FAVOURITE ×5', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MOSS, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Change is scary. | *Go slow.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 1], star: { x: -180, y: -20 },
    front(x, t, lt, P) {
      pool(x, t, 700, 1110, pop01(t, P.t0 + 0.2, 0.35, 1.8), lt > 1.0 ? 1 : 0)
      label(x, 760, 640, 'ONE TOE AT A TIME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Stubborn and kind | *can both be true.*', mood: 'happy', look: [1, 0], star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 620 + Math.sin(t * 18) * 4, 940, 170 * k, { mood: 'squint', look: [-1, 0], seed: 15, glyph: false, squash: 0.06 })
      bubble(x, 760, 640, 'MOVE!!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 660, 1130, 'NOT MOVING. SIT WITH ME?', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Treating yourself | *is allowed.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -10, y: 20 },
    front(x, t, lt, P) {
      bath(x, t, 540, 1000, pop01(t, P.t0 + 0.3, 0.35, 1.8))
      label(x, 540, 620, 'SPA: AT HOME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Missing them | *is okay too.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 1], star: { x: -210 },
    front(x, t, lt, P) {
      book(x, 780, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1080, 'KEPT IT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 780, 800, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Finished last? | *Smelled the flowers.*', mood: 'sparkle', look: [1, 0], star: { x: lt => 0 }, hideStar: true,
    front(x, t, lt, P) {
      finish(x, 820, pop01(t, P.t0 + 0.1, 0.3, 1.6))
      const walk = ease.inOutCubic(prog(lt, 0.1, 1.4)), bob = Math.abs(Math.sin(lt * 8)) * 14 * (walk < 1 ? 1 : 0)
      const F = signChar(x, t, S, lerp(260, 580, walk), 900 - bob, 260, { mood: walk >= 1 ? 'sparkle' : 'happy', look: [1, 0], seed: 3 })
      for (let i = 0; i < 3; i++) drawBits(x, FLOWER, { P: [PINK, GOLD, LAV][i], Y: '#fff4e2', G: '#5fd068' }, F.x + 110 + i * 22, F.cy + 30 - i * 18, 9, { rot: -0.3 + i * 0.25 })
      label(x, 540, 1150, 'TIME: SLOW. VIBES: GREAT.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MOSS, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not every match | *has to be forever.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      niceCard(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 0.9, 0.3, 2.4))
      label(x, 790, 1100, 'NO HARD FEELINGS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wanting comfort | *isn’t too much.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, SLIPPER, SLIPPER_C, 760, 900, 18 * k, { rot: -0.08 })
      drawBits(x, SLIPPER, SLIPPER_C, 800, 1010, 18 * pop01(t, P.t0 + 0.5, 0.35, 2), { rot: 0.06 })
      label(x, 780, 680, 'COMFORT: ESSENTIAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t have to | *hold it all in.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const pop = ease.outCubic(prog(lt, 0.9, 1.3))
      jar(x, t, 780, 880, pop01(t, P.t0 + 0.2, 0.35, 2), pop)
      if (pop > 0) hearts(x, t, 780, 760, P.t0 + 1.0 * 1.29, { n: 8, life: 2.0, spread: 220, cell: 8, seed: 6 })
      label(x, 780, 1130, 'LET IT OUT ♥︎', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a019', key: 'G', accent: MOSS, solo: S,
  title: 'Dear Taurus: | *it’s okay.*',
  cameos: CAMEOS,
  ending: 'group',
  group: { cap: 'Soft, steady, | *still not moving.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
