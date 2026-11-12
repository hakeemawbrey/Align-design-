// r2a0404: star_advice, ADVICE ROLL CALL, "Each sign's | cozy hobby." (~62 s vertical, signs3kit social cut, music:
// lofi · E). Twelve signs in zodiac order, one warm, specific hobby line each with one light gag. Ending: lesson.
//   0.0–3.6    "Each sign’s | *cozy hobby.*"
//   3.6–49.2   ♈ a puzzle, speedrun off · ♉ baking bread · ♊ journaling, page 47 · ♋ making tea · ♌ dancing in the
//              kitchen (disco ball) · ♍ sorting buttons by colour · ♎ arranging flowers · ♏ mystery novels, guessed it
//              by page ten · ♐ stargazing (telescope) · ♑ the crossword, in pen · ♒ tiny robots · ♓ watercolours
//              (the tears help)
//  49.2        "Twelve signs. | *Zero rush.*"
//  52.4        LESSON: "Rest looks different | for *every heart.*"  COZY: UNLOCKED
//  58.3        "Pick one. | Bring *a blanket.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREEN = '#5fd068', COZY = '#ffb38a'

const PIECE = ['.XX..', 'XXXXX', '.XXXX', 'XXXXX', '..XX.']
const BREAD = [
  '...BBBBBB...',
  '.BBbBBbBBbB.',
  'BBBBBBBBBBBB',
  'BbBBbBBbBBbB',
  'BBBBBBBBBBBB',
  '.DDDDDDDDDD.',
]
const BREAD_C = { B: '#e8a24a', b: '#ffd08a', D: '#b97a2a' }
const MUG = [
  '.WWWWWWW...',
  'WTTTTTTTW..',
  'WTTTTTTTWWW',
  'WTTTTTTTW.W',
  'WTTTTTTTW.W',
  'WTTTTTTTWWW',
  'WTTTTTTTW..',
  '.WWWWWWW...',
]
const MUG_C = { W: PAPER, T: '#c98f5a' }
const DISCO = [
  '....K....',
  '....K....',
  '..SSSSS..',
  '.SsSSsSS.',
  'SSSsSSsSS',
  'SsSSsSSsS',
  'SSsSSsSSS',
  '.SSsSSsS.',
  '..SSSSS..',
]
const DISCO_C = { K: INK, S: '#c3cbe0', s: '#ffffff' }
const VASE = [
  '.P..Y..P.',
  'PPPYYYPPP',
  '.P.GYG.P.',
  '...GGG...',
  '....G....',
  '..BBBBB..',
  '.BBBBBBB.',
  '.BbBBBbB.',
  '.BBBBBBB.',
  '..BBBBB..',
]
const VASE_C = { P: PINK, Y: GOLD, G: GREEN, B: SKYB, b: '#cfe8ff' }
const SCOPE = [
  '.........KK',
  '.......KTTK',
  '.....KTTTK.',
  '...KTTTK...',
  '.KTTTK.....',
  'KTTK.......',
  '.KK........',
  '..L.L......',
  '.L...L.....',
  'L.....L....',
]
const SCOPE_C = { K: INK, T: '#9a7ad8', L: '#c98f2a' }
const ROBOT = [
  '...Y...',
  '...K...',
  '.GGGGG.',
  '.GWGWG.',
  '.GGGGG.',
  'GGGGGGG',
  'G.GGG.G',
  '..G.G..',
]
const ROBOT_C = { Y: RED, K: INK, G: '#8fe3ff', W: INK }

// an open notebook with doodles
function notebook(x, cx, cy, k, lt, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-166, -116, 332, 232)
  x.fillStyle = '#ffffff'; x.fillRect(-160, -110, 156, 220); x.fillRect(4, -110, 156, 220)
  x.fillStyle = '#c3cbe0'; for (let i = 0; i < 7; i++) { x.fillRect(-150, -80 + i * 28, 136, 2); x.fillRect(14, -80 + i * 28, 136, 2) }
  x.fillStyle = PINK; x.fillRect(-130, -70, 30, 30); x.fillStyle = GOLD; x.fillRect(40, -60, 60, 14); x.fillStyle = SKYB; x.fillRect(30, 0, 90, 40)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`p.${n}`, 120, 96)
  x.restore()
}
// a tray of buttons that sort themselves into colour rows
function buttons(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-166, -106, 332, 212); x.fillStyle = '#c98f5a'; x.fillRect(-160, -100, 320, 200)
  const COLS = [RED, GOLD, MINT, SKYB]
  const p = ease.inOutCubic(prog(lt, 0.4, 1.4))
  for (let i = 0; i < 20; i++) {
    const r = i % 4, c = Math.floor(i / 4)
    const sx = -130 + ((i * 73) % 260), sy = -70 + ((i * 41) % 140)
    const tx = -120 + c * 60, ty = -66 + r * 44
    const px = lerp(sx, tx, p), py = lerp(sy, ty, p)
    x.fillStyle = INK; x.fillRect(px - 16, py - 16, 32, 32); x.fillStyle = COLS[r]; x.fillRect(px - 12, py - 12, 24, 24)
    x.fillStyle = INK; x.fillRect(px - 5, py - 5, 4, 4); x.fillRect(px + 1, py + 1, 4, 4)
  }
  x.restore()
}
// a mystery book with a magnifier
function mystery(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-116, -156, 232, 312)
  x.fillStyle = '#5b2e4a'; x.fillRect(-110, -150, 220, 300)
  x.fillStyle = GOLD; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WHO', 0, -80); x.fillText('DID IT?', 0, -40)
  x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(20, 50, 50, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#c3cbe0'; x.lineWidth = 8; x.beginPath(); x.arc(20, 50, 50, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(143,227,255,0.35)'; x.beginPath(); x.arc(20, 50, 46, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(56, 86, 22, 70); x.fillStyle = '#c98f2a'; x.fillRect(60, 90, 14, 62)
  x.restore()
}
// a crossword grid filling in (in pen)
function crossword(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-146, -146, 292, 292); x.fillStyle = '#ffffff'; x.fillRect(-140, -140, 280, 280)
  const n = Math.floor(clamp((lt - 0.3) / 1.4) * 25)
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
    const px = -140 + c * 56, py = -140 + r * 56, black = (r * 5 + c) % 7 === 3
    x.fillStyle = black ? INK : '#ffffff'; x.fillRect(px + 2, py + 2, 52, 52)
    if (!black && r * 5 + c < n) { x.fillStyle = '#2a3aa8'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ALIGNMENT'[(r * 5 + c) % 9], px + 28, py + 30) }
  }
  x.restore()
}
// a watercolour palette
function palette(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-156, -86, 312, 172); x.fillStyle = '#ffffff'; x.fillRect(-150, -80, 300, 160)
  const C = [RED, ORANGE, GOLD, GREEN, SKYB, LAV, PINK, '#5b8cff']
  C.forEach((c, i) => { const px = -112 + (i % 4) * 74, py = -36 + Math.floor(i / 4) * 72; x.fillStyle = INK; x.fillRect(px - 28, py - 26, 56, 52); x.fillStyle = c; x.fillRect(px - 24, py - 22, 48, 44) })
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Aries, try a puzzle. | *Slow is a sport too.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), Cc = [RED, GOLD, SKYB, MINT, PINK, LAV]
      for (let i = 0; i < 6; i++) drawBits(x, PIECE, { X: Cc[i] }, 700 + (i % 3) * 100, 900 + Math.floor(i / 3) * 110, 16 * k, { rot: (i % 2 ? 0.3 : -0.2) * (1 - ease.inOutCubic(prog(lt, 0.8, 1.6))) })
      label(x, 790, 680, 'SPEEDRUN: OFF', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Taurus, bake bread. | *It smells like peace.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.fillStyle = 'rgba(239,230,214,0.55)'; for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.fillRect(730 + i * 60 + Math.sin(ph * 7) * 10, 880 - ph * 150, 12, 26) } x.restore()
      label(x, 790, 680, 'FRESH OUT THE OVEN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: COZY, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Gemini, journal it. | *Every idea, a page.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      notebook(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt, 1 + Math.floor(clamp((lt - 0.4) / 1.5) * 46))
      bubble(x, 790, 680, 'ooh, AND…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Cancer, make tea. | *Warm cup, warm heart.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 770, 860, P.t0 + 0.8, { n: 5, life: 1.8, spread: 120, cell: 7, seed: 2 })
      label(x, 790, 680, 'STEEPING ♥︎', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Leo, kitchen dancing. | *Your stage.*', mood: 'sparkle', look: [1, 0], star: STAR, hops: [0.5, 1.0, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DISCO, DISCO_C, 790, 700, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 3) })
      if (lt > 0.6) { x.save(); x.globalAlpha = 0.6; const C = [PINK, GOLD, SKYB, MINT]; for (let i = 0; i < 10; i++) { const a = i * 0.63 + t * 1.5; x.fillStyle = C[i % 4]; x.fillRect(790 + Math.cos(a) * 190 - 8, 900 + Math.sin(a) * 130 - 8, 16, 16) } x.restore() }
      notes(x, t, 790, 1080, { n: 4, cell: 7, col: ORANGE, seed: 3 })
    } },
  { sign: 'virgo', cap: 'Virgo, sort the buttons. | *Calm in every colour.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: STAR, hops: [1.5],
    front(x, t, lt, P) {
      buttons(x, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 700, 'SORTED ✦', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Libra, arrange flowers. | *Beauty is rest too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, VASE, VASE_C, 790, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1150, 'MOVED IT 1 CM. PERFECT.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 26, bg: PINK, rot: 0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 170, 0.3)
    } },
  { sign: 'scorpio', cap: 'Scorpio + a mystery. | Solved *by page ten.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      mystery(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'PAGE 10 OF 400', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sagittarius, stargaze. | *Travel from the porch.*', mood: 'sparkle', look: [1, -1], star: STAR, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 860, 720, P.t0 + 1.0, 8, 120, 0.2, [GOLD, BONE, SKYB])
      label(x, 760, 680, 'NEW STAR FOUND', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Capricorn, a crossword. | *Yes, in pen.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: STAR, hops: [1.7],
    front(x, t, lt, P) {
      crossword(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1130, 'ZERO MISTAKES', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Aquarius, tiny robots. | *Weird is wonderful.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, ROBOT, ROBOT_C, 790, 980 - Math.abs(Math.sin(t * 5)) * 20 * (lt > 1.0 ? 1 : 0), 20 * k)
      bubble(x, 790, 760, 'beep. hi.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Pisces, try watercolours. | *Your tears help.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 1], star: STAR, tears: 2,
    front(x, t, lt, P) {
      palette(x, 790, 960, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'WATER: SUPPLIED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0404', key: 'E', accent: COZY, ending: 'lesson',
  title: 'Each sign’s | *cozy hobby.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero rush.*' },
  lesson: { text: 'Rest looks different | for *every heart.*', chip: 'COZY: UNLOCKED' },
  last: {
    text: 'Pick one. | Bring *a blanket.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 0.4, { n: 9, life: 2.0, spread: 640, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
