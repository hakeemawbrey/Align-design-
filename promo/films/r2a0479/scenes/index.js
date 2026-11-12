// r2a0479: star_advice, ADVICE ROLL CALL, "How each sign | *finds their people.*" (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm and specific way each finds the people who get them, with a light visual gag. Ending: callback.
//   0.0–3.6    "How each sign | *finds their people.*"
//   3.6–49.2   ♈ say yes first · ♉ host the dinner, they stay for dessert · ♊ talk to everyone, one gets you
//              · ♋ remember birthdays · ♌ be loudly yourself, your fans find you · ♍ join the tiny club (label makers)
//              · ♎ show your taste · ♏ let one person in, then another · ♐ say yes to the trip
//              · ♑ show up every week · ♒ be the odd one, the odd ones wave back · ♓ cry at the film, find who cries too
//  49.2        "Your people | *are out there.*"
//  52.6        callback: "The tiny club? | *Now twelve.*"  (card six's sign-up sheet, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350', GREEN = '#5fd068', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
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
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 */
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
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, color = INK } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 320, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a profile card with a sign star inside */
function profile(x, t, cx, cy, k, id, title, { w = 250, h = 320, mood = 'sparkle', rot = 0.05, bg = DEEP, col = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 90)
  signChar(x, t, id, 0, -26, 150, { mood, seed: 71, glyph: false, glow: 0.9, tears: id === 'pisces' ? 1 : 0 })
  x.fillStyle = col; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(title, 0, h / 2 - 38)
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
/** a box with a lid (gift): open = 0…1 lifts the lid */
function giftBox(x, cx, cy, k, open = 0, { body = PINK, ribbon = GOLD, w = 200, h = 160, bow = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = body; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = ribbon; x.fillRect(-14, -h / 2, 28, h)
  const ly = -h / 2 - 30 - open * 120, lr = open * -0.5
  x.save(); x.translate(0, ly); x.rotate(lr)
  x.fillStyle = INK; x.fillRect(-w / 2 - 22, -6, w + 44, 48)
  x.fillStyle = body; x.fillRect(-w / 2 - 16, 0, w + 32, 36)
  x.fillStyle = ribbon; x.fillRect(-14, 0, 28, 36)
  if (bow) { x.fillStyle = INK; x.fillRect(-62, -40, 124, 46); x.fillStyle = ribbon; x.fillRect(-56, -34, 46, 34); x.fillRect(10, -34, 46, 34); x.fillStyle = '#c98f2a'; x.fillRect(-12, -30, 24, 30) }
  x.restore()
  x.restore()
}

const ACC = '#c9a6ff'
const CAKE = ['....F....', '...WWW...', '..PPPPP..', '.WWWWWWW.', '.PPPPPPP.', 'KKKKKKKKK']
const CAKE_C = { F: ORANGE, W: CREAM, P: PINK, K: LAV }
const MUG = ['WWWWWW..', 'WPPPPWWW', 'WPPPPW.W', 'WPPPPWWW', 'WWWWWW..']
const BUS = ['YYYYYYYYYYYYY.', 'YSSYSSYSSYSSY.', 'YSSYSSYSSYSSYY', 'YYYYYYYYYYYYYY', 'YYYYYYYYYYYYYY', '..KK.....KK...']
const BUS_C = { Y: GOLD, S: SKYB, K: INK }
const BOX = ['..WW.WW..', 'KKKKKKKKK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBBBK']
const BOX_C = { W: CREAM, K: INK, B: SKYB }
/** the club sign-up sheet: n names */
function signup(x, cx, cy, k, n, { s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -170, 316, 356)
  x.fillStyle = INK; x.fillRect(-160, -180, 320, 360); x.fillStyle = CREAM; x.fillRect(-152, -172, 304, 344)
  x.fillStyle = MINT; x.fillRect(-152, -172, 304, 70)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 26px ${INTER}`; x.fillText('LABEL MAKER', 0, -150); x.fillText('CLUB', 0, -118)
  x.font = `700 22px ${MONO}`
  const NAMES = ['Virgo', 'you?', '', '', '', '']
  for (let i = 0; i < 6; i++) { x.fillStyle = '#d8d2c4'; x.fillRect(-120, -70 + i * 40, 240, 3); if (i < n) { x.fillStyle = INK; x.fillText(n > 2 ? `member ${i + 1} ✓` : NAMES[i], 0, -84 + i * 40) } }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Say yes first. | *Your people say it back.*', mood: 'sparkle', star: ST, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'who’s in?!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 46, tail: 'bl' })
      ;['leo', 'sagittarius', 'gemini'].forEach((id, i) => { const k = pop01(t, P.t0 + 0.8 + i * 0.25, 0.3, 2); if (k > 0.01) signChar(x, t, id, 680 + i * 120, 1000 + (i % 2) * 20, 130 * k, { mood: 'sparkle', look: [-1, 0], seed: 30 + i, glyph: false, glow: 0.5, hops: [P.t0 + 1.4 + i * 0.1] }) })
      L(x, 800, 840, 'ME! ME! ME!', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 32, CREAM)
    } },
  { sign: 'taurus', cap: 'Host the dinner. | They’ll *stay for dessert.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'SECONDS? ALWAYS', pop01(t, P.t0 + 0.9, 0.3, 2), GOLD, -0.04, 32)
      L(x, 800, 1110, 'GUESTS LEFT: 0', pop01(t, P.t0 + 1.5, 0.3, 2.2), GREEN, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Talk to everyone. | *One of them gets you.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 700, 660, 'hi!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 880, 760, 'hello!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'br' })
      bubble(x, 690, 860, 'hey you!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 830, 1010, 'what’s your sign? ♡', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, col: PINK, tail: 'br' })
      sparkles(x, t, 830, 1010, P.t0 + 1.3, 6, 160, 0.4)
    } },
  { sign: 'cancer', cap: 'Remember their birthdays. | *They’ll remember yours.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), ['MAR 3  Leo ♡', 'JUN 9  Libra ♡', 'JUL 1  ME?'], { w: 320, bg: CREAM, size: 30, rot: 0.04, font: MONO, weight: 700 })
      L(x, 790, 1090, 'SURPRISE CAKE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 32)
      hearts(x, t, 560, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Be loudly yourself. | *Your fans find you.*', mood: 'sparkle', star: ST, hops: [1.1],
    front(x, t, lt, P) {
      L(x, 790, 660, 'LEO FAN CLUB', pop01(t, P.t0 + 0.3, 0.3, 2), ORANGE, -0.04, 38)
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.6) / 0.35))
      for (let i = 0; i < n; i++) signChar(x, t, ['cancer', 'aries', 'pisces'][i], 680 + i * 110, 1000, 120, { mood: 'heart', look: [-1, 0], seed: 50 + i, glyph: false, glow: 0.5, tears: i === 2 ? 1 : 0 })
      L(x, 790, 820, `MEMBERS: ${n}`, pop01(t, P.t0 + 0.7, 0.3, 2), GOLD, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Join the tiny club. | *They love details too.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      signup(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 2 : 1)
      bubble(x, 800, 1120, 'finally!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Show your taste. | *Your people share it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MUG, { W: CREAM, P: PINK }, 690, 930, 20 * k)
      drawBits(x, MUG, { W: CREAM, P: PINK }, 900, 930, 20 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 810, 700, 'SAME MUG?!', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 36)
      L(x, 810, 1100, 'COMPATIBILITY ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Let one person in. | *Then another.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(860, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-80, -160, 160, 320); x.fillStyle = '#140c30'; x.fillRect(-72, -152, 144, 312)
        const o = ease.outCubic(prog(lt, 0.6, 1.1)) * 0.75
        x.fillStyle = BROWN; x.fillRect(-72, -152, 144 * (1 - o), 312); x.fillStyle = GOLD; x.fillRect(-72 + 144 * (1 - o) - 26, -6, 14, 14)
        x.restore()
      }
      const g = pop01(t, P.t0 + 1.2, 0.3, 2)
      if (g > 0.01) signChar(x, t, 'cancer', 690, 1060, 130 * g, { mood: 'happy', look: [1, 0], seed: 61, glyph: false, glow: 0.5 })
      L(x, 790, 660, 'GUEST LIST: 2', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Say yes to the trip. | *Your people are aboard.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const bx = lerp(140, 330, ease.outCubic(prog(lt, 0.2, 0.9)))
      drawBits(x, BUS, BUS_C, bx, 960, 20 * pop01(t, P.t0 + 0.1, 0.3, 2))
      L(x, 330, 760, 'SEATS: ALL FRIENDS', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 28)
      bubble(x, 330, 620, 'road trip!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Show up every week. | *Your people notice.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 860); x.scale(k, k); x.rotate(-0.04)
        x.fillStyle = INK; x.fillRect(-160, -140, 320, 280); x.fillStyle = CREAM; x.fillRect(-152, -132, 304, 264)
        x.fillStyle = RED; x.fillRect(-152, -132, 304, 50); x.fillStyle = CREAM; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THURSDAYS', 0, -106)
        const n = Math.floor(clamp((lt - 0.4) / 1.2) * 12)
        for (let i = 0; i < 12; i++) { const c = i % 4, r = Math.floor(i / 4); x.fillStyle = i < n ? GREEN : '#d8d2c4'; x.fillRect(-120 + c * 66, -60 + r * 62, 44, 44) }
        x.restore()
      }
      bubble(x, 330, 1110, 'saved you a spot', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: PINK, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Be the odd one. | *The odd ones wave back.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const ant = (cx, cy, s) => { x.save(); x.fillStyle = INK; x.fillRect(cx - 4 * s, cy - 50 * s, 8 * s, 50 * s); x.fillStyle = MINT; x.fillRect(cx - 12 * s, cy - 70 * s, 24 * s, 24 * s); x.restore() }
      if (F) ant(F.x, F.top + 6, 1)
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) {
        const Fa = signChar(x, t, 'gemini', 720, 1020, 140 * k, { mood: 'sparkle', look: [-1, 0], seed: 71, glyph: false, glow: 0.5, hops: [P.t0 + 1.3] })
        const Fb = signChar(x, t, 'pisces', 870, 1020, 140 * k, { mood: 'sparkle', look: [-1, 0], seed: 72, glyph: false, glow: 0.5, tears: 1, hops: [P.t0 + 1.5] })
        ant(Fa.x, Fa.top + 4, 0.6); ant(Fb.x, Fb.top + 4, 0.6)
      }
      bubble(x, 790, 680, 'oh hi! | same!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Cry at the film. | *Find who cries too.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 980, 190 * k, { mood: 'wide', look: [-1, 0], seed: 81, glyph: false, tears: 2 })
      drawBits(x, BOX, BOX_C, 620, 1120, 14 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 680, 'TISSUES: SHARED ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0479', key: 'E', accent: ACC, ending: 'callback',
  title: 'How each sign | *finds their people.*',
  cameos: CAMEOS,
  group: { cap: 'Your people | *are out there.*' },
  last: {
    text: 'The tiny club? | *Now twelve.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signup(x, 540, 1040, pop01(t, t0 + 0.4, 0.4, 2), 6, { s: 1.3 })
      sparkles(x, t, 540, 1040, t0 + 0.9, 8, 260, 0.3)
      L(x, 540, 1330, 'MEMBERS: 12 ✦', pop01(t, t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
