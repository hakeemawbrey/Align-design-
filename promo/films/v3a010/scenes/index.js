// v3a010: zodiac.advice444, ADVICE SOLO, "Signs you're | a healed Leo." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Leo truth with a warm reframe, one gag each.
//   0.0–3.6    "Signs you're | *a healed Leo.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              cheers for a friend's win just as loud (foam finger for Virgo) · a table for one feels like a date
//              · three likes on a selfie, still iconic · shares the spotlight (two beams) · says sorry first
//              · they didn't match back, still a ten · asks for help out loud (cardboard sign) · lets someone else
//              have the last word · dances alone in the kitchen (disco ball, crowd: just me)
//  37.8        "Still the sun. | *Softer now.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "Your light was never | about *the applause.*"  GLOW: STEADY
//  46.9        "Virgo shined. | Leo *clapped first.*" over the match card: Leo + Virgo (the foam finger, paid off).
import { clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const S = 'leo'

// ── props
const FINGER = [
  '...PP...',
  '..PPPP..',
  '..PPPP..',
  '..PPPP..',
  '..PPPP..',
  'PPPPPPP.',
  'PPPPPPPP',
  'PPWWWWPP',
  'PPWPPWPP',
  'PPWWWWPP',
  'PPPPPPPP',
  '.PPPPPP.',
  '..PPPP..',
  '..PPPP..',
  '..KKKK..',
  '..KKKK..',
]
const FINGER_C = { P: ORANGE, W: '#fff4e2', K: '#8a4a2e' }
const CANDLE = [
  '..Y..',
  '.YOY.',
  '.YOY.',
  '..Y..',
  '.WWW.',
  '.WWW.',
  '.WWW.',
  '.WWW.',
  'GGGGG',
]
const CANDLE_C = { Y: GOLD, O: ORANGE, W: '#fff4e2', G: '#c9c9d8' }
const DISCO = [
  '....K....',
  '....K....',
  '..SsSsS..',
  '.sSsSsSs.',
  'SsSsSsSsS',
  'sSsSsSsSs',
  'SsSsSsSsS',
  '.sSsSsSs.',
  '..SsSsS..',
]
const DISCO_C = { K: '#c9c9d8', S: '#d8dbe8', s: '#8fe3ff' }
const WOOD = '#c98f2a'

// a little table for one: a cloth, a candle, a single plate
function tableForOne(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-156, 6, 324, 40)
  x.fillStyle = INK; x.fillRect(-166, -16, 332, 52)
  x.fillStyle = '#fff4e2'; x.fillRect(-158, -10, 316, 40)
  x.fillStyle = RED; for (let i = 0; i < 8; i++) x.fillRect(-158 + i * 40, 22, 20, 8)
  x.fillStyle = INK; x.fillRect(-120, 36, 18, 120); x.fillRect(102, 36, 18, 120)
  x.fillStyle = WOOD; x.fillRect(-116, 36, 10, 116); x.fillRect(106, 36, 10, 116)
  // plate
  x.fillStyle = INK; x.beginPath(); x.ellipse(-40, -18, 70, 18, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f0ff'; x.beginPath(); x.ellipse(-40, -20, 64, 14, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = MINT; x.fillRect(-60, -30, 40, 10)
  x.restore()
  drawBits(x, CANDLE, CANDLE_C, cx + 80 * k, cy - 62 * k, 11 * k)
}
// a phone with a selfie and a tiny like count
function selfiePhone(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#ffe7a8'; x.fillRect(-110, -170, 220, 250)
  signChar(x, t, 'leo', 0, -46, 170, { mood: 'wink', seed: 51, glyph: false, glow: 0.5 })
  x.fillStyle = '#140c30'; x.fillRect(-110, 92, 220, 84)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, -60, 134, 6)
  x.fillStyle = BONE; x.font = `700 38px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('3', -26, 136)
  x.restore()
}
// two soft spotlight beams from the top of the panel
function beam(x, cx, top, bottom, w, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a
  const g = x.createLinearGradient(0, top, 0, bottom)
  g.addColorStop(0, 'rgba(255,241,200,0.55)'); g.addColorStop(1, 'rgba(255,241,200,0.05)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 30, top); x.lineTo(cx + 30, top); x.lineTo(cx + w, bottom); x.lineTo(cx - w, bottom); x.fill()
  x.fillStyle = 'rgba(255,241,200,0.18)'; x.beginPath(); x.ellipse(cx, bottom, w, 34, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a profile card with a NO MATCH stamp
function noMatchCard(x, t, cx, cy, k, stamp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-117, -150, 250, 320)
  x.fillStyle = INK; x.fillRect(-131, -166, 262, 332)
  x.fillStyle = '#2a2350'; x.fillRect(-125, -160, 250, 320)
  x.fillStyle = '#140c30'; x.fillRect(-111, -146, 222, 230)
  signChar(x, t, 'aquarius', 0, -30, 150, { mood: 'neutral', look: [-1, 0], seed: 52, glyph: false, glow: 0.8 })
  x.fillStyle = SKYB; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♒︎ AQUARIUS', 0, 122)
  if (stamp > 0.01) {
    x.save(); x.translate(0, 50); x.rotate(-0.2); x.scale(stamp, stamp)
    x.fillStyle = '#fff4e2'; x.fillRect(-118, -40, 236, 80)
    x.strokeStyle = RED; x.lineWidth = 8; x.strokeRect(-118, -40, 236, 80)
    x.fillStyle = RED; x.font = `800 40px ${INTER}`; x.fillText('NO MATCH', 0, 2)
    x.restore()
  }
  x.restore()
}
// a hand-lettered cardboard sign on a stick
function cardboard(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, 70, 28, 200); x.fillStyle = WOOD; x.fillRect(-8, 70, 16, 196)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -96, 336, 196)
  x.fillStyle = INK; x.fillRect(-172, -108, 344, 196)
  x.fillStyle = '#d9a86a'; x.fillRect(-164, -100, 328, 180)
  x.fillStyle = '#c08a4e'; x.fillRect(-164, 40, 328, 8)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -46 + i * 50))
  x.restore()
}
// coloured light flecks off the disco ball
function flecks(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const COLS = [PINK, SKYB, GOLD, MINT, LAV]
  x.save(); x.globalAlpha = 0.7 * clamp(k)
  for (let i = 0; i < 14; i++) {
    const a = i * 0.9 + t * 0.8, r = 140 + (i % 4) * 60
    x.fillStyle = COLS[i % 5]; x.fillRect(cx + Math.cos(a) * r * 1.3, cy + 160 + Math.sin(a) * r * 0.6, 12, 12)
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You cheer their win | *just as loud.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -180 }, hops: [0.9, 1.5],
    front(x, t, lt, P, F) {
      drawBits(x, FINGER, FINGER_C, F.x + 150, F.cy - 40, 13 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.18 })
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 960, 190 * k, { mood: lt > 1.3 ? 'happy' : 'wide', seed: 13, glyph: false, hops: [P.t0 + 1.4] })
      label(x, 820, 700, 'VIRGO GOT PROMOTED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04 })
      bubble(x, 380, 590, 'GO, YOU!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bc' })
      sparkles(x, t, 820, 900, P.t0 + 1.3, 7, 150, 0.4)
    } },
  { sign: S, cap: 'A table for one | feels *like a date.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      tableForOne(x, 790, 960, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 690, 'RESERVATION: ME ✦', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
      hearts(x, t, 380, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Three likes on a selfie. | *Still iconic.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      selfiePhone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 380, 600, 'love her', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bc' })
      sparkles(x, t, 790, 800, P.t0 + 1.5, 7, 200, 0.2)
    } },
  { sign: S, cap: 'You share | *the spotlight* now.', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    back(x, t, lt, P) {
      beam(x, 370, 520, 1150, 190, pop01(t, P.t0 + 0.1, 0.3, 1.2))
      beam(x, 790, 520, 1150, 170, pop01(t, P.t0 + 0.9, 0.3, 1.2))
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 960, 210 * k, { mood: lt > 1.4 ? 'heart' : 'wide', seed: 14, glyph: false, hops: [P.t0 + 1.5] })
      label(x, 580, 640, 'ROOM FOR TWO', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You say sorry | *first.* Still royal.', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 960, 210 * k, { mood: lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 470, 620, 'I was wrong. | sorry.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 830, 700, 'hug?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: PINK, tail: 'bc' })
      hearts(x, t, 600, 960, P.t0 + 1.6, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'They didn’t match back. | *Still a ten.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', star: { x: -180 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      noMatchCard(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 0.6, 0.3, 2.4))
      label(x, 790, 1100, 'ME: STILL 10/10', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 370, 860, P.t0 + 1.4, 7, 170, 0.6)
    } },
  { sign: S, cap: 'You ask for help | *out loud* now.', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      cardboard(x, 770, 740, pop01(t, P.t0 + 0.2, 0.35, 2), ['COULD USE', 'A HAND!'])
      for (const [id, dx, d] of [['cancer', -60, 1.1], ['aries', 90, 1.3], ['libra', 230, 1.5]]) {
        const k = pop01(t, P.t0 + d, 0.3, 2.2)
        if (k > 0.01) signChar(x, t, id, 640 + dx, 1110, 110 * k, { mood: 'happy', seed: 20 + d * 10, glyph: false, hops: [P.t0 + d + 0.2] })
      }
    } },
  { sign: S, cap: 'You don’t need | *the last word.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 810, 960, 210 * k, { mood: 'wink', look: [-1, 0], seed: 16, glyph: false })
      bubble(x, 810, 650, 'actually…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: LAV, tail: 'bc' })
      label(x, 380, 620, 'FAIR POINT.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'Dancing alone | *still counts.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [0.5, 1.0, 1.5, 2.0],
    back(x, t, lt, P) { flecks(x, t, 540, 700, pop01(t, P.t0 + 0.4, 0.3, 1.2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.strokeStyle = '#c9c9d8'; x.lineWidth = 4; x.beginPath(); x.moveTo(760, 470); x.lineTo(760, 560); x.stroke(); x.restore() }
      drawBits(x, DISCO, DISCO_C, 760, 620, 16 * k, { rot: Math.sin(t * 2) * 0.05 })
      notes(x, t, 420, 760, { n: 4, cell: 7, col: ORANGE, seed: 3 })
      label(x, 790, 1020, 'CROWD: JUST ME', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'encore!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3a010', key: 'C', accent: ORANGE, solo: S,
  title: 'Signs you’re | *a healed Leo.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'virgo', chip: 'ALIGNED' },
  group: { cap: 'Still the sun. | *Softer now.*', mood: 'sparkle' },
  lesson: { text: 'Your light was never | about *the applause.*', chip: 'GLOW: STEADY' },
  last: {
    text: 'Virgo shined. | Leo *clapped first.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
