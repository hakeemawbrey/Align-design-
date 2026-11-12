// v3a108: zodiac.advice444 (star_advice), ADVICE SOLO, "Aries, read this | before your date." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): friendly first-date notes for the boldest sign.
//   0.0–3.6    "Aries, read this | *before your date.*" (the batch hook "...before your next date." trimmed by one word to fit two lines)
//   3.6–37.8   nine cards: let them order first · ask a question, then another · walk, don't sprint (SPEED LIMIT: STROLL)
//              · mini golf, let them win one · honest is hot, volume 4 · thirty minutes early, get a coffee
//              · compliment them first · fire + air = sparks (a compatibility check) · brave is cute
//  37.8        ending (group): "Bold heart. | *Easy pace.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aries'
const CORAL = '#ff6b5e'
const WOOD = '#c98f2a', RED = '#e23d4e', ROSE = '#ff9ccf', WHITE = '#fff4e2'

// ── shared little props for this film
// a phone: a coloured header strip and an optional message bubble that pops in
function phone(x, cx, cy, k, head, msg, sent, { headCol = MINT, msgCol = ROSE, rot = 0.05, msgSize = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.fillStyle = headCol; x.fillRect(-100, -146, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -122)
  if (msg && sent > 0.01) {
    x.save(); x.translate(4, -6); x.scale(sent, sent)
    const lines = msg.split('|').map(s => s.trim())
    const h = lines.length * msgSize * 1.25 + 30
    x.fillStyle = msgCol; x.fillRect(-96, -h / 2, 192, h)
    x.fillStyle = INK; x.font = `800 ${msgSize}px ${INTER}`
    lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 15 + msgSize * 1.25 * (i + 0.5)))
    x.restore()
  }
  x.restore()
}
// a tiny pal star with a placard on a stick
function placard(x, t, id, cx, cy, size, text, k, { col = GOLD, mood = 'happy', seed = 31, tears = 0, look } = {}) {
  if (k <= 0.01) return
  signChar(x, t, id, cx, cy, size * k, { mood, seed, glyph: false, tears, look })
  x.fillStyle = INK; x.fillRect(cx + size * 0.42 - 5, cy - size * 1.05, 10, size * 0.9)
  label(x, cx + size * 0.42, cy - size * 1.1, text, k, { size: 28, bg: col, rot: -0.04 })
}
// a little table top line
function table(x, cx, cy, w) { x.fillStyle = INK; x.fillRect(cx - w / 2, cy, w, 22); x.fillStyle = WOOD; x.fillRect(cx - w / 2 + 4, cy + 4, w - 8, 14) }

const MENU = ['RRRRRR.RRRRRR', 'RWWWWWRWWWWWR', 'RWKKKWRWKKKWR', 'RWWWWWRWWWWWR', 'RWKKWWRWKKWWR', 'RWWWWWRWWWWWR', 'RWKKKWRWKKKWR', 'RRRRRRRRRRRRR']
const MENU_C = { R: '#8a4a2e', W: WHITE, K: '#9a8fb5' }
const FLAG = ['KRRRR', 'KRRR.', 'KRR..', 'K....', 'K....', 'K....', 'K....', 'GGGGG']
const FLAG_C = { K: INK, R: RED, G: '#5fd068' }
const CUP = ['.S.S..', '..S.S.', 'WWWWW.', 'WCCCWW', 'WWWWW.W', 'WWWWWW.', '.WWW...']
const CUP_C = { S: BONE, W: WHITE, C: '#6b3a22' }
const FLAME = ['..R..', '.RRR.', 'RRYRR', 'RYYYR', '.RYR.']
const FLAME_C = { R: '#ff6b3d', Y: GOLD }
// a round road sign on a pole
function roadSign(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, 0, 16, 230)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fill()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 102, 0, 7); x.fill()
  x.fillStyle = WHITE; x.beginPath(); x.arc(0, 0, 80, 0, 7); x.fill()
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
// a volume knob turned down to 4
function knob(x, cx, cy, k, ang) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i <= 10; i++) { const a = -Math.PI * 1.25 + i * Math.PI * 0.25; x.fillStyle = i <= 4 ? MINT : '#5a4a8a'; x.fillRect(Math.cos(a) * 130 - 7, Math.sin(a) * 130 - 7, 14, 14) }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 100, 0, 7); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 90, 0, 7); x.fill()
  x.save(); x.rotate(ang); x.fillStyle = INK; x.fillRect(-8, -84, 16, 50); x.restore()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Let them | *order first.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, MENU, MENU_C, 780, 930, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 720, 'HANDS: IN LAP', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 1110, 'PATIENCE +1', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask a question. | *Then another.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 810, 1030, 170 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 101, glyph: false })
      bubble(x, 540, 640, 'wait, and | then what?!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 810, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 100, cell: 6, seed: 13 })
    } },
  { sign: S, cap: 'It’s a date. | *Not a race.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: { x: -220 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      roadSign(x, 790, 790, pop01(t, P.t0 + 0.3, 0.35, 2), 'STROLL')
      label(x, 790, 1110, 'SPEED LIMIT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mini golf? | *Let them win one.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 760, 930, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 880, 1040, 130 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', seed: 102, glyph: false, hops: [P.t0 + 1.4, P.t0 + 1.8] })
      label(x, 700, 700, 'HOLE IN ONE (THEM)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Honest is hot. | *Volume, less.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const ang = lerp(Math.PI * 1.25, -Math.PI * 0.25, ease.inOutCubic(prog(lt, 0.4, 1.4)))
      knob(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), ang)
      label(x, 790, 1120, 'VOLUME: 4', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Thirty minutes early? | *Get a coffee.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      table(x, 790, 1070, 260)
      drawBits(x, CUP, CUP_C, 790, 975, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 740, 'ARRIVED: 6:30', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 830, 'DATE: 7:00', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Compliment them | *first.*', mood: 'happy', look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 810, 1030, 170 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 103, glyph: false })
      bubble(x, 540, 640, 'you look | AMAZING.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 810, 830, 'BLUSH: CRITICAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fire + air? | *Sparks.*', mood: 'sparkle', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 830, pop01(t, P.t0 + 0.2, 0.3, 2), '✦ COMPATIBILITY', 'ARIES | + | GEMINI', pop01(t, P.t0 + 0.7, 0.3, 2.2), { msgCol: GOLD, msgSize: 30 })
      sparkles(x, t, 780, 830, P.t0 + 1.4, 9, 200, 0.2)
      label(x, 780, 1110, 'SPARKS: YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be yourself. | *Brave is cute.*', mood: 'sparkle', star: { x: 0, y: 30, s: 320 }, hops: [0.9, 1.6],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2.2)
      drawBits(x, FLAME, FLAME_C, F.x - 240, F.cy - 40, 24 * k, { sy: 1 + 0.1 * Math.sin(t * 12) })
      drawBits(x, FLAME, FLAME_C, F.x + 240, F.cy - 40, 24 * k, { sy: 1 + 0.1 * Math.sin(t * 12 + 1) })
      label(x, 540, 620, 'BRAVE = CUTE', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 40, bg: GOLD, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a108', key: 'F', accent: CORAL, solo: S, ending: 'group',
  title: 'Aries, read this | *before your date.*',
  cameos: CAMEOS,
  group: { cap: 'Bold heart. | *Easy pace.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
