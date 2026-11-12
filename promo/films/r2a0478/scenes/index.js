// r2a0478: star_advice, ADVICE SOLO, "How to thank | *a Virgo.*" (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine warm ways to thank a Virgo, each a relatable truth + a kind reframe. Ending: group.
//   0.0–3.6    "How to thank | *a Virgo.*"
//   3.6–37.8   be specific, they noticed the details too · say it out loud · take the mop, let them rest
//              · it's perfect as it is · write it down, they'll file it · notice the effort, not just the result
//              · make their tea exactly right · not just helpful, loved · remember the favour months later
//  37.8        group (the ending): "Thanked, noted, | *and filed.*"  (card five's filing cabinet, paid off)
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

const ACC = '#7dffb0'
const MOP = ['....WWWW', '....WWWW', '.....B..', '....B...', '...B....', '..B.....', '.B......', 'SSSS....', 'SSSS....']
const MOP_C = { W: CREAM, B: BROWN, S: SKYB }
const TEA = ['..SS....', '...S....', 'WWWWWWW.', 'WTTTTTWW', 'WTTTTTW.W', 'WTTTTTWW', '.WWWWW..', 'PPPPPPPP']
const TEA_C = { S: CREAM, W: CREAM, T: '#c98f2a', P: LAV }
/** a little filing cabinet; open = 0…1 slides the top drawer out */
function cabinet(x, cx, cy, k, open, tag) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -176, 252, 352); x.fillStyle = GREY; x.fillRect(-118, -168, 236, 336)
  for (let i = 0; i < 3; i++) { x.fillStyle = '#7d88a8'; x.fillRect(-104, -154 + i * 108, 208, 94); x.fillStyle = INK; x.fillRect(-24, -116 + i * 108, 48, 12) }
  const d = open * 70
  x.fillStyle = INK; x.fillRect(-116, -164 + d, 232, 104); x.fillStyle = '#b7c0d8'; x.fillRect(-110, -158 + d, 220, 92)
  x.fillStyle = CREAM; x.fillRect(-90, -196 + d, 180, 50); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tag, 0, -170 + d)
  x.restore()
}

const CAMEOS = [
  // 1 · be specific
  { sign: 'virgo', cap: 'Be specific. | They *noticed it all.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['thank you for', 'the colour-coded', 'spice rack'], { w: 320, bg: CREAM, size: 32, rot: 0.04 })
      L(x, 790, 1080, 'SPECIFIC ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), ACC, -0.04, 36)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 6, 170, 0.4)
    } },
  // 2 · out loud
  { sign: 'virgo', cap: 'Say it out loud. | *They’d never ask.*', mood: lt => lt < 1.0 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'THANK YOU, | VIRGO!', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 50, col: PINK, tail: 'br' })
      bubble(x, 760, 1000, 'oh! it was | nothing…', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 790, 1140, 'IT WAS SOMETHING', pop01(t, P.t0 + 1.7, 0.3, 2.2), ACC, 0.04, 30)
    } },
  // 3 · take the mop
  { sign: 'virgo', cap: 'Don’t just say thanks. | *Take the mop.*', mood: lt => lt < 1.2 ? 'squint' : 'sleepy', star: { x: -190 },
    front(x, t, lt, P, F) {
      const away = ease.inOutCubic(prog(lt, 0.8, 1.3))
      drawBits(x, MOP, MOP_C, lerp(F.x + 140, 870, away), lerp(F.cy + 10, 990, away), 18 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: lerp(0, 0.3, away) })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 750, 1010, 180 * k, { mood: 'happy', look: [-1, 0], seed: 11, glyph: false })
      L(x, 600, 640, 'VIRGO: OFF DUTY', pop01(t, P.t0 + 1.5, 0.3, 2.2), ACC, -0.04, 34)
    } },
  // 4 · perfect as it is
  { sign: 'virgo', cap: 'Tell them it’s perfect. | *And mean it.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(lerp(0.12, 0.12, 0)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -120, 300, 240); x.fillStyle = GOLD; x.fillRect(-142, -112, 284, 224)
        x.fillStyle = SKYB; x.fillRect(-120, -90, 240, 180); x.fillStyle = GREEN; x.fillRect(-120, 20, 240, 70); x.fillStyle = CREAM; x.fillRect(40, -70, 40, 40)
        x.restore()
      }
      bubble(x, 790, 620, 'it’s crooked…', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (1 - prog(lt, 1.2, 1.4)), { size: 36, col: LAV, tail: 'bl' })
      L(x, 790, 1080, 'PERFECT AS IS ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 32)
    } },
  // 5 · write it down
  { sign: 'virgo', cap: 'Write it down. | They’ll *file it lovingly.*', mood: lt => lt < 1.3 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cabinet(x, 800, 920, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.6, 1.0)), 'THANK-YOUS')
      const d = ease.inOutCubic(prog(lt, 1.0, 1.5))
      if (lt > 0.9) note(x, 800, lerp(620, 790, d), 1 - prog(lt, 1.45, 1.6), ['thanks!'], { w: 160, bg: '#ffe27a', size: 30, rot: -0.1 })
      L(x, 800, 1150, 'FILED UNDER: ♡', pop01(t, P.t0 + 1.7, 0.3, 2.2), ACC, 0.04, 30)
    } },
  // 6 · notice the effort
  { sign: 'virgo', cap: 'Notice the effort. | *Not just the result.*', mood: lt => lt < 1.3 ? 'neutral' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.scale(k, k); x.rotate(0.03)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = CREAM; x.fillRect(-142, -142, 284, 284)
        const n = Math.floor(clamp((lt - 0.3) / 1.2) * 40)
        for (let i = 0; i < 40; i++) { const c = i % 8, r = Math.floor(i / 8); x.fillStyle = i < n ? GREEN : '#d8d2c4'; x.fillRect(-120 + c * 30, -120 + r * 48, 20, 20) }
        x.restore()
      }
      L(x, 790, 1100, 'ALL 40 STEPS: SEEN', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  // 7 · the tea
  { sign: 'virgo', cap: 'Make their tea. | *Exactly how they like it.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TEA, TEA_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      puffs(x, t, 770, 830, P.t0 + 0.5, { n: 3, cell: 9, rise: 110, spread: 50 })
      L(x, 790, 660, 'STEEPED: 3 MIN', pop01(t, P.t0 + 0.7, 0.3, 2), CREAM, -0.04, 32)
      L(x, 790, 1130, 'MILK: A SPLASH', pop01(t, P.t0 + 1.2, 0.3, 2), LAV, 0.04, 32)
    } },
  // 8 · not just helpful
  { sign: 'virgo', cap: 'Not just helpful. | *Loved.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 760, 'HELPFUL', pop01(t, P.t0 + 0.2, 0.3, 2), GREY, -0.05, 46)
      const s = prog(lt, 0.7, 1.0)
      if (s > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(670, 760); x.lineTo(670 + 240 * s, 760); x.stroke(); x.restore() }
      L(x, 790, 940, 'LOVED ♡', pop01(t, P.t0 + 1.1, 0.35, 2.4), PINK, 0.05, 56)
      hearts(x, t, 790, 1180, P.t0 + 1.3, { n: 4, life: 1.4, spread: 260, cell: 7, seed: 4 })
    } },
  // 9 · remember the favour
  { sign: 'virgo', cap: 'Remember the favour. | *Months later.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: PINK, lines: [
        ['remember', PINK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['when you fixed', PINK, pop01(t, P.t0 + 0.6, 0.2, 2)], ['my CV? thank u', PINK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['…in MARCH?', BONE, pop01(t, P.t0 + 1.3, 0.2, 2), true],
      ] })
      L(x, 790, 1130, 'STILL GRATEFUL', pop01(t, P.t0 + 1.7, 0.3, 2.2), ACC, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0478', key: 'C', accent: ACC, solo: 'virgo', ending: 'group',
  title: 'How to thank | *a Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Thanked, noted, | *and filed.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
