// v3a125: star_advice, ADVICE SOLO, "How to love | an Aries." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): how to love an Aries, warm and a little funny, one gag each.
//   0.0–3.6    "How to love | *an Aries.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              holds Libra's hand at top speed (speed lines): TOP SPEED · a sunrise hike, Taurus half asleep
//              · lets them win the board game: CHAMPION (AGAIN) · steam puffs, then COOLED DOWN. HUG?
//              · cheers for the cardboard rocket: LAUNCH FRIDAY · a wrapped gift, shaken hard: NO PEEKING
//              · brings snacks, they forgot to eat: FUEL: DELIVERED · "sorry" / "sorry too" at once: DONE. MOVING ON.
//              · a match notification: ARIES LIKED YOU FIRST
//  37.8        "All fire. | *All heart.*"  Aries comes back, big.
//  41.2        callback: "The gift? | *Opened early.*"  The box from card six bursts open, confetti.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AR = '#f0603a', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'aries'

// ── props
const SANDWICH = ['.TTTTTTT.', 'TTTTTTTTT', 'GGGGGGGGG', 'RRRRRRRRR', 'YYYYYYYYY', 'TTTTTTTTT', '.TTTTTTT.']
const SAND_C = { T: '#e7b46a', G: '#5fd068', R: '#ff7a5a', Y: GOLD }
const CROWN = ['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYYYRY', 'YYYYYYY']
const ROCKET = ['...C...', '..CCC..', '..CWC..', '..CCC..', '..CCC..', '.CCCCC.', 'CC.C.CC', 'O..O..O']
const ROCKET_C = { C: '#c99b6a', W: SKYB, O: '#ff9a3c' }

function phone(x, cx, cy, k, { head = '', headBg = MINT, lines = [], lineBg = '#2a2350', ink = BONE, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-100, -146, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(head, 0, -122) }
  lines.forEach(([txt, a], i) => {
    if (a <= 0.01) return
    x.save(); x.translate(0, -40 + i * 92); x.scale(a, a)
    x.fillStyle = lineBg; x.fillRect(-96, -38, 192, 76)
    x.fillStyle = ink; x.font = `800 26px ${INTER}`
    String(txt).split('|').forEach((l, j, arr) => x.fillText(l.trim(), 0, (j - (arr.length - 1) / 2) * 30 + 2))
    x.restore()
  })
  x.restore()
}
// a wrapped gift box; open 0…1 lifts the lid off
function gift(x, t, cx, cy, k, { shake = 0, open = 0, s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + Math.sin(t * 40) * 10 * shake, cy); x.rotate(Math.sin(t * 34) * 0.08 * shake); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-120, -70, 240, 190); x.fillStyle = PINK; x.fillRect(-112, -62, 224, 174)
  x.fillStyle = GOLD; x.fillRect(-16, -62, 32, 174)
  x.save(); x.translate(open * 60, -open * 170); x.rotate(open * 0.6)
  x.fillStyle = INK; x.fillRect(-138, -110, 276, 54); x.fillStyle = '#ff4f86'; x.fillRect(-130, -102, 260, 38); x.fillStyle = GOLD; x.fillRect(-16, -102, 32, 38)
  x.fillStyle = INK; x.beginPath(); x.ellipse(-40, -128, 44, 26, -0.4, 0, Math.PI * 2); x.ellipse(40, -128, 44, 26, 0.4, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(-40, -128, 34, 17, -0.4, 0, Math.PI * 2); x.ellipse(40, -128, 34, 17, 0.4, 0, Math.PI * 2); x.fill()
  x.restore()
  x.restore()
}
function confetti(x, t, cx, cy, t0) {
  const tt = t - t0
  if (tt < 0) return
  const C = [GOLD, PINK, MINT, SKYB, LAV, AR]
  for (let i = 0; i < 28; i++) {
    const a = -Math.PI / 2 + Math.sin(i * 12.9) * 1.1, v = 420 + (i * 37) % 260
    const px = cx + Math.cos(a) * v * tt, py = cy + Math.sin(a) * v * tt + 380 * tt * tt
    x.save(); x.translate(px, py); x.rotate(tt * 8 + i); x.fillStyle = C[i % C.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
function steam(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  for (let i = 0; i < 6; i++) { const ph = (t * 1.2 + i / 6) % 1, s = 30 + ph * 40; x.fillStyle = `rgba(239,230,214,${(0.85 * (1 - ph)).toFixed(3)})`; x.beginPath(); x.arc(cx + (i % 2 ? 1 : -1) * (60 + ph * 50), cy - ph * 220, s, 0, Math.PI * 2); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Keep up. | Or *hold their hand.*', mood: 'sparkle', look: [1, 0], star: { x: -120, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 210, 900 + Math.sin(t * 14) * 10, 200 * k, { mood: 'wide', look: [1, 0], seed: 21, glyph: false, squash: -0.12 })
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = BONE
      for (let i = 0; i < 6; i++) { const ph = (t * 3 + i / 6) % 1; x.fillRect(lerp(700, 130, ph), 760 + i * 50, 140, 8) }
      x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(300, 910); x.lineTo(330, 905); x.stroke()
      x.restore()
      label(x, 760, 600, 'TOP SPEED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: AR, rot: -0.04 })
    } },
  { sign: S, cap: 'Say yes to | *the sunrise hike.*', mood: 'sparkle', look: [1, -1], star: { x: -200, y: 40, s: 260 }, hops: [0.5, 1.2, 1.9],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.4, 1.4)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = GOLD; x.beginPath(); x.arc(760, 900 - 120 * ease.outCubic(prog(lt, 0.2, 1.6)), 90, 0, Math.PI * 2); x.fill()
      x.fillStyle = INK; x.beginPath(); x.moveTo(400, 1210); x.lineTo(760, 760); x.lineTo(1000, 1210); x.closePath(); x.fill()
      x.fillStyle = '#5b4a8a'; x.beginPath(); x.moveTo(420, 1210); x.lineTo(760, 780); x.lineTo(980, 1210); x.closePath(); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.moveTo(705, 850); x.lineTo(760, 780); x.lineTo(815, 850); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 850, 1080, 160 * k, { mood: 'sleepy', seed: 22, glyph: false })
      label(x, 860, 1170, '6:00 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them win | *at board games.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 1010); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -110, 340, 220)
        for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) { x.fillStyle = (i + j) % 2 ? '#f4eee2' : '#5fd068'; x.fillRect(-162 + i * 54, -102 + j * 51, 54, 51) }
        x.fillStyle = INK; x.fillRect(-60, -40, 40, 40); x.fillStyle = AR; x.fillRect(-56, -36, 32, 32)
        x.fillStyle = INK; x.fillRect(60, 10, 40, 40); x.fillStyle = SKYB; x.fillRect(64, 14, 32, 32)
        x.restore()
      }
      drawBits(x, CROWN, { Y: GOLD, R: RED }, F.x, F.top - 30, 14 * pop01(t, P.t0 + 1.3, 0.3, 2.4))
      label(x, 780, 720, 'CHAMPION (AGAIN)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The steam passes. | *Fast.*', mood: lt => lt > 1.5 ? 'happy' : 'eyeroll', look: [0, -1], star: { x: -60 }, hops: [1.6],
    front(x, t, lt, P, F) {
      steam(x, t, F.x, F.top, 1 - ease.inCubic(prog(lt, 1.0, 1.5)))
      if (lt > 1.5) label(x, 760, 600, 'COOLED DOWN. HUG?', pop01(t, P.t0 + 1.55, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.6) hearts(x, t, 540, 860, P.t0 + 1.6, { n: 5, life: 1.4, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Cheer for | *the wild idea.*', mood: 'sparkle', look: [1, 0], star: { x: -230, s: 260 }, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      drawBits(x, ROCKET, ROCKET_C, 620, 900 - Math.max(0, lt - 1.6) * 30, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 860, 1010, 170 * k, { mood: 'happy', look: [-1, -1], seed: 23, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.6, P.t0 + 2.2] })
      bubble(x, 840, 680, 'GO GO GO!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      label(x, 600, 1160, 'LAUNCH: FRIDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Surprises? | *Hide them well.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 1], star: { x: -220 }, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      gift(x, t, 780, 980, pop01(t, P.t0 + 0.2, 0.35, 2), { shake: lt > 0.6 ? 1 : 0 })
      label(x, 780, 680, 'NO PEEKING', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Bring snacks. | They *forgot to eat.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 850, 960, 190 * k, { mood: 'happy', look: [-1, 0], seed: 24, glyph: false, hops: [P.t0 + 0.9] })
      const hand = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, SANDWICH, SAND_C, lerp(760, 560, hand), 1000, 13 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 700, 640, 'FUEL: DELIVERED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Apologies? | *Quick and real.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200, s: 270 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 930, 240 * k, { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], seed: 25, glyph: false, hops: [P.t0 + 1.95] })
      bubble(x, 330, 620, 'sorry!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 780, 620, 'sorry too!', pop01(t, P.t0 + 0.75, 0.25, 2.2), { size: 42, col: MINT, tail: 'br' })
      label(x, 560, 1150, 'DONE. MOVING ON.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They liked you *first.* | Like them back.', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW LIKE', headBg: AR, lines: [['an Aries | liked you', pop01(t, P.t0 + 0.6, 0.3, 2.2)], ['just now. | obviously.', pop01(t, P.t0 + 1.1, 0.3, 2.2)]] })
      label(x, 790, 1130, 'FIRST MOVE: ARIES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a125', key: 'C', accent: AR, solo: S, ending: 'callback',
  title: 'How to love | *an Aries.*',
  cameos: CAMEOS,
  group: { cap: 'All fire. | *All heart.*', mood: 'sparkle' },
  last: {
    text: 'The gift? | *Opened early.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const a = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, 'aries', 400, 1000, 260 * a, { mood: lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], seed: 31, hops: [t0 + 1.0, t0 + 1.8] })
      gift(x, t, 720, 1060, pop01(t, t0 + 0.5, 0.35, 2), { open: ease.outCubic(prog(lt, 0.9, 1.3)), s: 0.9 })
      confetti(x, t, 720, 960, t0 + 1.0)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
