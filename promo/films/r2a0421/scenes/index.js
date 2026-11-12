// r2a0421: star_advice, ADVICE SOLO, "Libra, your sign | *to slow down.*" (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine gentle nudges for a Libra to slow down, each a relatable truth + a warm reframe. Ending: lesson.
//   0.0–3.6    "Libra, your sign | *to slow down.*"
//   3.6–37.8   five plans, pick a favourite · balance means rest counts · twenty minutes on the menu, take twenty
//              · everyone's fight, sit this one out · reply tomorrow, the chat survives · a match asks to meet, next week is fine
//              · twelve outfits, the first was cute · rest is a reset · say no once, nothing breaks
//  37.8        "Gentle pace. | *Same sparkle.*"
//  41.0        LESSON: "You keep everyone balanced. | Balance *includes you.*"  PACE: YOURS
//  46.9        "Still picking dinner? | *Take your time.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const B = (x, cx, cy, text, k, o = {}) => bubble(x, cx, cy, text, k, { size: 44, ...o })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 (steam, sighs, dust) */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a sticky note / paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a little anger mark (four red corner ticks) */
function vein(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const s = 9 * k * (1 + 0.15 * Math.sin(t * 14))
  x.save(); x.translate(cx, cy)
  for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.fillStyle = INK; x.fillRect(dx * s * 1.6 - s * 0.9, dy * s * 1.6 - s * 0.9, s * 1.8, s * 1.8); x.fillStyle = RED; x.fillRect(dx * s * 1.6 - s * 0.6, dy * s * 1.6 - s * 0.6, s * 1.2, s * 1.2) }
  x.restore()
}
const ACC = '#ff8fb1'
const BED = ['P..........P', 'PWWW.......P', 'PWWWBBBBBBBP', 'PBBBBBBBBBBP', 'PPPPPPPPPPPP', 'P..........P']
const BED_C = { P: PURP, W: CREAM, B: LAV }
const VASE = ['..FF.FF..', '...FGF...', '....G....', '..KKKKK..', '.KPPPPPK.', 'KPPWPPPPK', 'KPPPPPPPK', '.KPPPPPK.', '..KKKKK..']
const VASE_C = { F: PINK, G: '#5fd068', K: INK, P: SKYB, W: '#ffffff' }
const SHIRT = ['WW...WW', 'WWWWWWW', '.WWWWW.', '.WWWWW.', '.WWWWW.']
const TWO = ['.AA....', 'AAAA...', 'AAAA...', '.AA....']

function scales(x, cx, cy, k, ang, la, lb) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 290); x.fillRect(-90, 130, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 280); x.fillRect(-84, 134, 168, 16)
  x.save(); x.translate(0, -140); x.rotate(ang)
  x.fillStyle = INK; x.fillRect(-190, -10, 380, 20); x.fillStyle = GOLD; x.fillRect(-186, -6, 372, 12)
  for (const [s, l] of [[-1, la], [1, lb]]) {
    x.save(); x.translate(s * 170, 0); x.rotate(-ang)
    x.fillStyle = BONE; x.fillRect(-2, 0, 4, 90)
    x.fillStyle = INK; x.fillRect(-84, 86, 168, 30); x.fillStyle = GOLD; x.fillRect(-80, 90, 160, 22)
    label(x, 0, 60, l, 1, { size: 40, bg: s < 0 ? PINK : MINT, rot: 0, font: MONO, weight: 700 })
    x.restore()
  }
  x.restore(); x.restore()
}

const CAMEOS = [
  // 1 · the weekend
  { sign: 'libra', cap: 'Five plans this weekend? | Pick *your favourite.*', mood: lt => lt < 1.1 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      note(x, 790, 860, k, ['brunch', 'party', 'gym', 'movie', 'NAP ♡'], { w: 300, size: 40, rot: 0.04 })
      x.save(); x.fillStyle = RED
      for (let i = 0; i < 4; i++) { const d = prog(lt, 0.7 + i * 0.18, 0.85 + i * 0.18); if (d > 0) { x.save(); x.translate(790, 860); x.rotate(0.04); x.fillRect(-100, -136 + i * 62, 200 * d, 8); x.restore() } }
      x.restore()
      sparkles(x, t, 790, 1000, P.t0 + 1.5, 6, 120, 0.3)
    } },
  // 2 · the scales
  { sign: 'libra', cap: 'Balance means | *rest counts too.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', star: { x: -200 },
    front(x, t, lt, P) {
      const ang = lerp(0.32, 0, ease.outBack(prog(lt, 0.9, 1.5)))
      scales(x, 750, 900, pop01(t, P.t0 + 0.15, 0.3, 2) * 0.88, ang, 'PLANS', 'NAPS')
      L(x, 760, 600, 'BALANCED', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 40)
    } },
  // 3 · the menu
  { sign: 'libra', cap: 'Menu taking forever? | *Take twenty.*', mood: lt => lt < 1.1 ? 'squint' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), ['MENU', 'pasta?', 'soup?', 'both??'], { w: 280, bg: CREAM, size: 40, rot: -0.05 })
      bubble(x, 790, 600, 'still | thinking…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 790, 1130, 'NO RUSH ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 40)
    } },
  // 4 · friends: everyone's fight
  { sign: 'libra', cap: 'Fixing everyone’s fight? | Sit *this one out.*', mood: lt => lt < 1.1 ? 'wide' : 'sleepy', star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        signChar(x, t, 'aries', 700, 1000, 160 * k, { mood: 'squint', look: [1, 0], seed: 14, glyph: false })
        signChar(x, t, 'taurus', 880, 1000, 160 * k, { mood: 'squint', look: [-1, 0], seed: 15, glyph: false })
      }
      bubble(x, 790, 760, 'WHO WAS | RIGHT?!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bc' })
      L(x, 790, 600, 'NOT YOUR SHIFT', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 34)
    } },
  // 5 · the group chat
  { sign: 'libra', cap: 'Reply tomorrow. | The chat *survives.*', mood: lt => lt < 1.0 ? 'wide' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const lines = ['who’s in??', 'libra??', 'LIBRA', 'all good x'].map((s, i) => [s, i === 3 ? MINT : PINK, pop01(t, P.t0 + 0.3 + i * 0.3, 0.2, 2), i % 2 === 1])
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'GROUP · 99+', headCol: GOLD, lines })
      L(x, 790, 1130, 'STILL ALIVE', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 36)
    } },
  // 6 · Align: a match wants to meet
  { sign: 'libra', cap: 'Match asked to meet? | Next week *is fine.*', mood: lt => lt < 1.2 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const lines = [['coffee?', LAV, pop01(t, P.t0 + 0.35, 0.2, 2), false], ['next week? ♡', PINK, pop01(t, P.t0 + 0.9, 0.2, 2), true], ['perfect :)', LAV, pop01(t, P.t0 + 1.4, 0.2, 2), false]]
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MATCH · GEMINI', headCol: MINT, lines })
      hearts(x, t, 790, 700, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  // 7 · the mirror: twelve outfits
  { sign: 'libra', cap: 'Twelve outfit changes? | The first *was cute.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const n = Math.min(7, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.16))
      const cols = [PINK, MINT, LAV, GOLD, SKYB, ORANGE, '#ff6b5a']
      for (let i = 0; i < n; i++) drawBits(x, SHIRT, { W: cols[i] }, 790 + (i % 2 ? 26 : -26), 1100 - i * 50, 22 * pop01(t, P.t0 + 0.2 + i * 0.16, 0.2, 2), { rot: (i % 3 - 1) * 0.12 })
      L(x, 790, 620, 'OUTFIT 12 OF 12', pop01(t, P.t0 + 1.1, 0.3, 2.2), BONE, 0.04, 34)
      label(x, 450, 600, '#1 ♡', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.08, font: MONO, weight: 700 })
    } },
  // 8 · home: rest
  { sign: 'libra', cap: 'Rest isn’t lazy. | It’s *your reset.*', mood: lt => lt < 0.8 ? 'happy' : 'sleepy', star: { x: -170, y: -30 },
    back(x, t, lt, P) { drawBits(x, BED, BED_C, 470, 1080, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 700, 'DO NOT DISTURB', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, 0.05, 34)
      L(x, 790, 900, 'BATTERY: 12%', lt < 1.3 ? pop01(t, P.t0 + 0.9, 0.3, 2) : 0, RED, -0.04, 34, CREAM)
      L(x, 790, 900, 'BATTERY: 100%', lt >= 1.3 ? pop01(t, P.t0 + 1.3, 0.3, 2.2) : 0, MINT, -0.04, 34)
    } },
  // 9 · say no
  { sign: 'libra', cap: 'Say no once. | Watch *nothing break.*', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 450, 600, 'no, thank | you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bc' })
      drawBits(x, VASE, VASE_C, 790, 920, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lt > 0.6 && lt < 1.2 ? 0.08 * Math.sin(t * 16) : 0 })
      L(x, 790, 1130, 'STILL FINE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 38)
      sparkles(x, t, 790, 920, P.t0 + 1.3, 6, 150, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0421', key: 'D', accent: ACC, solo: 'libra', ending: 'lesson',
  title: 'Libra, your sign | *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Gentle pace. | *Same sparkle.*', mood: 'heart' },
  lesson: { text: 'You keep everyone balanced. | Balance *includes you.*', chip: 'PACE: YOURS' },
  last: {
    text: 'Still picking dinner? | *Take your time.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
