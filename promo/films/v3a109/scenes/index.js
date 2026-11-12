// v3a109: zodiac.advice444 (star_advice), ADVICE SOLO, "Dear Aries: | it's okay." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission slips for the sign that never stops.
//   0.0–3.6    "Dear Aries: | *it's okay.*"
//   3.6–37.8   nine cards: came second (a silver medal) · the puzzle stays 999/1000 tonight · angry tears are valid
//              · resting isn't quitting (a hammock) · not every argument needs a winner (DRAW. FINE.)
//              · starting over (PAGE 1) · nervous on day one, still brave · asking for directions · slowing down
//              won't put the fire out (STILL LIT)
//  37.8        "Fierce. | *Allowed to be soft.*"
//  41.2        callback: "The missing piece? | *Under the couch.*" (the missing piece from card 2 turns up)
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

const MEDAL = ['R.....R', '.R...R.', '..R.R..', '..SSS..', '.SSWSS.', '.SSSSS.', '..SSS..']
const MEDAL_C = { R: SKYB, S: '#c9cbd6', W: '#fff' }
const PIECE = ['.PP.', 'PPPP', 'PPPPP', 'PPPP', '.PP.']
const PIECE_C = { P: SKYB }
const NOTEBOOK = ['KWWWWWWW', 'KWLLLLLW', 'KWWWWWWW', 'KWLLLLWW', 'KWWWWWWW', 'KWLLLWWW', 'KWWWWWWW']
const NOTEBOOK_C = { K: CORAL, W: WHITE, L: '#b9b0d0' }
const CANDLE = ['..F..', '.FYF.', '..F..', '..K..', '.WWW.', '.WWW.', '.WWW.', 'BBBBB']
const CANDLE_C = { F: '#ff9a3d', Y: GOLD, K: INK, W: WHITE, B: GOLD }
// a 1000-piece puzzle with one hole
function puzzle(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220)
  const cols = [SKYB, '#7fc8e8', MINT, '#5fd068']
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) {
    if (i === 4 && j === 1) { x.fillStyle = '#21184a'; x.fillRect(-144 + i * 48, -104 + j * 52, 46, 50); continue }
    x.fillStyle = cols[(i + j * 2) % 4]; x.fillRect(-144 + i * 48, -104 + j * 52, 46, 50)
  }
  x.restore()
}
// a striped hammock between two posts
function hammock(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-290, -160, 18, 260); x.fillRect(272, -160, 18, 260)
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-280, -150); x.lineTo(-200, -10); x.moveTo(280, -150); x.lineTo(200, -10); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-210, -20); x.quadraticCurveTo(0, 150, 210, -20); x.lineTo(210, 0); x.quadraticCurveTo(0, 170, -210, 0); x.closePath(); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.moveTo(-204, -14); x.quadraticCurveTo(0, 150, 204, -14); x.lineTo(204, -4); x.quadraticCurveTo(0, 158, -204, -4); x.closePath(); x.fill()
  x.restore()
}
// a folded map with a question mark
function map(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const cols = [BONE, '#e8dcc0', BONE, '#e8dcc0']
  x.fillStyle = INK; x.fillRect(-150, -100, 300, 200)
  cols.forEach((c, i) => { x.fillStyle = c; x.fillRect(-144 + i * 72, -94, 72, 188) })
  x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-110, 60); x.quadraticCurveTo(-20, -80, 60, 10); x.quadraticCurveTo(100, 50, 110, -50); x.stroke(); x.setLineDash([])
  x.fillStyle = INK; x.font = `800 80px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 110, -50)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Came second? | *Still shining.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, MEDAL, MEDAL_C, 780, 890, 32 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 780, 1120, '2ND. STILL COOL.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 900, P.t0 + 1.0, 7, 170, 0.5)
    } },
  { sign: S, cap: 'The puzzle can wait | *till tomorrow.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0.5], star: { x: -230 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      puzzle(x, 770, 940, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 770, 740, '999 / 1000', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Angry tears? | *Totally human.*', mood: 'squint', tears: lt => lt > 0.6 ? 1 : 0, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P, F) {
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = 0.8 * Math.sin(Math.PI * ph); x.fillStyle = BONE; x.beginPath(); x.arc(F.x - 60 + i * 60, F.top - 30 - ph * 110, 20 + ph * 16, 0, 7); x.fill(); x.restore() }
      label(x, 790, 900, 'FEELINGS: VALID', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Resting | *isn’t quitting.*', mood: 'sleepy', look: [0, 0], star: { x: 0, y: 30, s: 240 },
    back(x, t, lt, P) { hammock(x, 540, 960, pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 640, 'RECHARGING…', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not every argument | *needs a winner.*', mood: lt => lt > 1.5 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 810, 1030, 170 * k, { mood: lt > 1.5 ? 'happy' : 'eyeroll', look: [-1, 0], seed: 111, glyph: false })
      label(x, 600, 680, 'SCORE: 1 – 1', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 600, 790, 'DRAW. FINE. HUG.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Starting over | *is still brave.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, NOTEBOOK, NOTEBOOK_C, 780, 930, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      label(x, 780, 720, 'PAGE 1', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Nervous on day one? | *Still brave.*', mood: 'wide', look: [1, 0], star: { x: -200 }, squash: lt => 0.03 * Math.sin(lt * 40),
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      label(x, F.x + 20, F.cy + F.S * 0.5, 'HELLO: NEW HERE', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 26, bg: WHITE, rot: -0.06, font: MONO, weight: 700 })
      label(x, 790, 760, 'GOING ANYWAY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask for directions. | *It’s allowed.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      map(x, 780, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1110, 'LOST: 40 MIN. ASKED: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slowing down | *won’t put you out.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      table(x, 790, 1070, 240)
      drawBits(x, CANDLE, CANDLE_C, 790, 975, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { sy: 1 + 0.04 * Math.sin(t * 10) })
      label(x, 790, 740, 'STILL LIT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a109', key: 'G', accent: CORAL, solo: S, ending: 'callback',
  title: 'Dear Aries: | *it’s okay.*',
  cameos: CAMEOS,
  group: { cap: 'Fierce. | *Allowed to be soft.*', mood: 'heart' },
  last: {
    text: 'The missing piece? | *Under the couch.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'aries', 420, 1080, 260 * k, { mood: lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0.4], seed: 9, hops: [t - lt + 1.3] })
      const p = pop01(t, t - lt + 0.8, 0.4, 2.2)
      drawBits(x, PIECE, PIECE_C, 700, 1110, 26 * p, { rot: 0.2 })
      sparkles(x, t, 700, 1110, t - lt + 1.0, 8, 130, 0.4)
      label(x, 700, 1250, '1000 / 1000', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
