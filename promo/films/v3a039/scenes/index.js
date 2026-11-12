// v3a039: star_advice, ADVICE SOLO, "Dear Virgo: | it's okay." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): a gentle "it's okay" for the Virgo who holds everything
// to a high standard, one gag each.
//   0.0–3.6    "Dear Virgo: | *it’s okay.*"  One big Virgo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the dishes can wait (a sink stacked high: LATER IS FINE) · one typo won't end you (a sent message, "teh")
//              · a crooked frame is still cute · rest doesn't need a checklist (one item: nap) · ask for help (Taurus
//              lifts the other end of the box: TEAM LIFT) · the plan changed (PLAN B: ALSO GOOD) · your match liked the
//              real you (a profile card: NO EDITS NEEDED) · good enough is good (a lopsided cake: DELICIOUS)
//              · be as kind to you as you are to us (a mirror with a heart)
//  37.8        "Not perfect. | *Perfectly loved.*"  Virgo comes back, big.
//  41.0        LESSON UNLOCKED: "You’re allowed | *to just be.*"  WORRY: PAUSED
//  46.9        "The dishes? | *Still waiting.*"  (the sink from card one, still stacked, Virgo unbothered)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', CREAM = '#fff4e2', SAGE = '#b8e08a'
const S = 'virgo'
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

function sink(x, t, cx, cy, k, wob = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, 20, 400, 150); x.fillStyle = '#dfe7f2'; x.fillRect(-192, 28, 384, 134)
  x.fillStyle = INK; x.fillRect(120, -60, 20, 90); x.fillRect(80, -70, 60, 20)
  const cols = [CREAM, SKYB, CREAM, PINK, CREAM, GOLD, CREAM, MINT]
  for (let i = 0; i < 8; i++) {
    const y = 10 - i * 30, sx = wob * 8 * Math.sin(t * 3 + i * 0.7) * (i / 8)
    x.fillStyle = INK; x.beginPath(); x.ellipse(-30 + sx, y, 110, 22, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = cols[i]; x.beginPath(); x.ellipse(-30 + sx, y - 2, 102, 16, 0, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
function msg(x, cx, cy, k, circled) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -60, 360, 120); x.fillStyle = MINT; x.fillRect(-172, -52, 344, 104)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('see u at teh park!', 0, 2)
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.fillText('SENT ✓✓', 120, 84)
  if (circled > 0.01) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(52, 2, 50 * circled, 34 * circled, 0, 0, Math.PI * 2 * circled); x.stroke() }
  x.restore()
}
function frame(x, t, cx, cy, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy - 170 * k); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 10, 0, Math.PI * 2); x.fill()
  x.rotate(tilt)
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-110, 70); x.moveTo(0, 0); x.lineTo(110, 70); x.stroke()
  x.fillStyle = INK; x.fillRect(-150, 60, 300, 230); x.fillStyle = WOOD; x.fillRect(-142, 68, 284, 214)
  x.fillStyle = SKYB; x.fillRect(-122, 88, 244, 174); x.fillStyle = SAGE; x.fillRect(-122, 190, 244, 72)
  x.fillStyle = GOLD; x.beginPath(); x.arc(60, 130, 26, 0, Math.PI * 2); x.fill()
  x.restore()
}
function list(x, cx, cy, k, check) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -170, 320, 340); x.fillStyle = CREAM; x.fillRect(-152, -162, 304, 324)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('REST PLAN', 0, -120)
  x.fillStyle = INK; x.fillRect(-120, -30, 50, 50); x.fillStyle = CREAM; x.fillRect(-114, -24, 38, 38)
  x.fillStyle = INK; x.font = `800 48px ${INTER}`; x.textAlign = 'left'; x.fillText('nap', -40, -4)
  if (check > 0.01) { x.strokeStyle = '#2f9e5a'; x.lineWidth = 12; x.beginPath(); x.moveTo(-112, -6); x.lineTo(-96, 12 * check); x.lineTo(-96 + 50 * check, -40 * check); x.stroke() }
  x.fillStyle = 'rgba(27,18,54,0.18)'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('(that’s it)', 0, 90)
  x.restore()
}
function box(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -90, 300, 180); x.fillStyle = '#d9a066'; x.fillRect(-142, -82, 284, 164)
  x.fillStyle = '#c48a52'; x.fillRect(-142, -82, 284, 26)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HEAVY', 0, 20)
  x.restore()
}
function plans(x, cx, cy, k, cross) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = CREAM; x.fillRect(-162, -142, 324, 284)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('PLAN A:', -130, -80); x.font = `700 26px ${MONO}`; x.fillText('picnic, 1:00', -130, -36)
  if (cross > 0.01) { x.fillStyle = RED; x.fillRect(-140, -64, 280 * cross, 8); x.fillRect(-140, -40, 280 * cross, 8) }
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('PLAN B:', -130, 40); x.font = `700 26px ${MONO}`; x.fillText('blanket fort', -130, 84)
  x.restore()
}
function profile(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-156, -196, 324, 410)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-170, -210, 340, 420, 26); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.roundRect(-162, -202, 324, 404, 20); x.fill()
  x.fillStyle = SAGE; x.fillRect(-140, -180, 280, 200)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = BONE; x.fillText('♍︎ VIRGO', 0, 60)
  x.font = `700 22px ${MONO}`; x.fillText('likes: lists, you', 0, 100)
  x.fillStyle = PINK; x.fillRect(-90, 140, 180, 44); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('♥ MATCH', 0, 162)
  x.restore()
  signChar(x, t, S, cx, cy - 80 * k, 150 * k, { mood: 'happy', seed: 31, glyph: false, pop: k > 0.3 ? 1 : 0 })
}
const LCAKE = [
  '...W.W....',
  '..WWWWWW..',
  '.PPPPPPPP.',
  'PPPPPPPP..',
  'WWWWWWWWW.',
  '.CCCCCCCCC',
  'CCCCCCCCC.',
  '.CCCCCCCCC',
]
function mirror(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 200, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 140, 190, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#cfe9ff'; x.beginPath(); x.ellipse(0, 0, 118, 166, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-80, -110, 20, 90)
  x.fillStyle = INK; x.fillRect(-60, 196, 120, 24)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'The dishes | *can wait.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      sink(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85)
      label(x, 790, 640, 'LATER IS FINE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One typo | *won’t end you.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      msg(x, 760, 820, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85, ease.outCubic(prog(lt, 0.6, 1.1)))
      label(x, 780, 1060, 'THEY STILL CAME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A crooked frame | *is still cute.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, -1], star: { x: -220 },
    front(x, t, lt, P) {
      frame(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.95, 0.18 + 0.03 * Math.sin(t * 2))
      label(x, 790, 1150, 'LEFT IT. GROWTH.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rest doesn’t need | *a checklist.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      list(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 1.0, 1.3)))
    } },
  { sign: S, cap: 'Ask for help. | *We want to.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', star: { x: -220, y: 20, s: 240 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2), lift = ease.inOutCubic(prog(lt, 1.0, 1.4))
      if (k > 0.01) signChar(x, t, 'taurus', 860, 920, 200 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.4] })
      box(x, 590, lerp(1060, 990, lift), pop01(t, P.t0 + 0.2, 0.35, 2) * 0.8)
      label(x, 600, 650, 'TEAM LIFT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The plan changed. | *You’re still fine.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      plans(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.7, 1.1)))
      label(x, 790, 1110, 'PLAN B: ALSO GOOD', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match liked | *the real you.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 780, 860, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85)
      label(x, 780, 1140, 'NO EDITS NEEDED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Good enough | *is actually good.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, LCAKE, { W: CREAM, P: PINK, C: '#d99a4e' }, 790, 900, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      label(x, 790, 1130, 'LOPSIDED. DELICIOUS.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be as kind to you | *as you are to us.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      mirror(x, t, 790, 860, k * 0.9)
      if (k > 0.3) signChar(x, t, S, 790, 850, 160, { mood: 'sparkle', seed: 33, glyph: false, alpha: 0.8 })
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 860, 740, 10 * pop01(t, P.t0 + 1.0, 0.3, 2.4))
      label(x, 790, 1130, 'SELF: ALSO A FRIEND', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a039', key: 'G', accent: SAGE, solo: S, ending: 'lesson',
  title: 'Dear Virgo: | *it’s okay.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Perfectly loved.*', mood: 'heart' },
  lesson: { text: 'You’re allowed | *to just be.*', chip: 'WORRY: PAUSED' },
  last: {
    text: 'The dishes? | *Still waiting.*',
    draw(x, t, lt) { sink(x, t, 540, 1260, pop01(t, t - lt + 0.6, 0.35, 2) * 0.7) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
