// r2a0476: star_advice, ADVICE SOLO, "Taurus, let yourself | *be loved.*" (~52 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine gentle nudges for a Taurus to receive the care they give so easily. Ending: card.
//   0.0–3.6    "Taurus, let yourself | *be loved.*"
//   3.6–37.8   someone cooked, let them · the blanket isn't earned · compliments aren't bills · your match planned the date
//              · being cared for isn't a burden (Cancer brings soup) · gifts aren't a test · slow love still arrives (snail)
//              · you hold everyone, let someone hold you · they remembered your order
//  37.8        "Soft heart. | *Steady love.*"
//  41.0        LESSON: "You give comfort so well. | Let it *come back.*"  LOVE: RECEIVED
//  46.9        "Cancer brought | *more soup.*" over the match card: Taurus + Cancer (card five's soup, paid off).
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

const ACC = '#5fd068'
const POT = ['..KKKKKKK..', 'KKGGGGGGGKK', '.KGGGGGGGK.', '.KGGGGGGGK.', '.KGGGGGGGK.', '..KKKKKKK..']
const POT_C = { K: INK, G: '#e8a24a' }
const SPOON = ['..WW', '.WWW', '.WW.', 'W...', 'W...', 'W...']
const BOWL = ['KKKKKKKKKKK', 'KSSSSSSSSSK', '.KSSSSSSSK.', '..KKKKKKK..']
const BOWL_C = { K: '#fff4e2', S: ORANGE }
const SNAIL = ['....HH.HH...', '...HHHHHHH..', '...HHHHHHH..', '....HHHHH...', '.....HHH....', 'E.....H.....', 'E..........', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB']
const SNAIL_C = { H: PINK, E: '#c9b48a', B: '#c9b48a' }
const BOX = ['KKKKKKKK', 'KBBBBBBK', 'KBBTTBBK', 'KBBBBBBK', 'KKKKKKKK']
const BOX_C = { K: BROWN, B: '#e8a24a', T: CREAM }
const CUP = ['.WWWWWW.', 'WWWWWWWW', 'WCCCCCCW.', 'WCCCCCCWW', 'WCCCCCCW.W', 'WCCCCCCWW', '.WWWWWW.', '..WWWW..']
const CUP_C = { W: CREAM, C: '#c98f6a' }

const CAMEOS = [
  // 1 · someone cooked
  { sign: 'taurus', cap: 'Someone cooked for you? | *Let them.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, POT_C, 800, 960, 22 * k)
      puffs(x, t, 800, 880, P.t0 + 0.5, { n: 4, cell: 12, rise: 160 })
      bubble(x, 780, 660, 'I could | just stir…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 800, 1120, 'SIT. ENJOY.', pop01(t, P.t0 + 1.4, 0.3, 2.2), ACC, 0.04, 38)
    } },
  // 2 · the blanket
  { sign: 'taurus', cap: 'You don’t have to earn | *the cozy blanket.*', mood: lt => lt < 1.1 ? 'neutral' : 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.6, 1.1))
      if (d > 0) {
        x.save(); x.translate(F.x, lerp(560, F.cy + 40, d)); x.rotate(-0.04)
        x.fillStyle = INK; x.fillRect(-150, -40, 300, 130); x.fillStyle = PINK; x.fillRect(-142, -32, 284, 114)
        x.fillStyle = '#ff4f86'; for (let i = 0; i < 5; i++) x.fillRect(-130 + i * 58, -32, 26, 114)
        x.restore()
      }
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['TO-DO', 'laundry ✓', 'emails ✓', 'rest?'], { w: 270, bg: CREAM, size: 34, rot: 0.05 })
      L(x, 790, 1080, 'NO TO-DO NEEDED', pop01(t, P.t0 + 1.5, 0.3, 2.2), ACC, -0.04, 30)
    } },
  // 3 · compliments
  { sign: 'taurus', cap: 'Compliments aren’t bills. | *Just keep them.*', mood: lt => lt < 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'you look | lovely today', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      note(x, 790, 900, pop01(t, P.t0 + 0.7, 0.3, 2), ['INVOICE', '1 compliment', 'owed: 0'], { w: 300, bg: CREAM, size: 32, rot: -0.04, font: MONO, weight: 700 })
      L(x, 800, 1100, 'PAID IN FULL ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.05, 32)
    } },
  // 4 · the match planned it
  { sign: 'taurus', cap: 'Your match planned the date? | *Just show up.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const lines = [['picked a spot ♡', PINK, pop01(t, P.t0 + 0.45, 0.2, 2), false], ['can I help?', BONE, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['just come :)', PINK, pop01(t, P.t0 + 1.15, 0.2, 2), false]]
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', headCol: GOLD, lines })
      L(x, 790, 1130, 'PLANNING: NOT YOU', pop01(t, P.t0 + 1.6, 0.3, 2.2), ACC, 0.04, 30)
    } },
  // 5 · sick day, Cancer with soup
  { sign: 'taurus', cap: 'Being looked after | *isn’t a burden.*', mood: lt => lt < 1.2 ? 'sleepy' : 'heart', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 11, glyph: false, hops: [P.t0 + 1.2] })
      drawBits(x, BOWL, BOWL_C, 660, 1010, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      puffs(x, t, 660, 980, P.t0 + 0.9, { n: 3, cell: 9, rise: 120, spread: 50 })
      bubble(x, 790, 680, 'soup delivery!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'br' })
      L(x, 600, 1140, 'GUILT: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), ACC, -0.04, 32)
    } },
  // 6 · gifts
  { sign: 'taurus', cap: 'A gift isn’t a test. | Just *say thank you.*', mood: lt => lt < 1.1 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      giftBox(x, 790, 960, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 1.2, 1.6)), { body: GOLD, ribbon: PINK })
      bubble(x, 790, 650, 'you shouldn’t | have!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 790, 1140, 'THEY WANTED TO', pop01(t, P.t0 + 1.5, 0.3, 2.2), ACC, 0.04, 32)
      sparkles(x, t, 790, 900, P.t0 + 1.4, 6, 140, 0.3)
    } },
  // 7 · slow love
  { sign: 'taurus', cap: 'Slow love | *still arrives.*', mood: lt => lt < 1.2 ? 'neutral' : 'sparkle', look: [1, 0], star: { x: -170, y: -30 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const sx = lerp(940, 640, ease.inOutQuad(prog(lt, 0.3, 2.2)))
      drawBits(x, SNAIL, SNAIL_C, sx, 1080, 15 * k)
      L(x, 790, 700, 'ARRIVING: SOON ♡', pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, -0.04, 32)
      if (lt > 1.9) hearts(x, t, sx, 1040, P.t0 + 1.9, { n: 3, life: 1.2, spread: 80, cell: 6, seed: 4 })
    } },
  // 8 · carrying everything
  { sign: 'taurus', cap: 'You carry everyone. | *Let someone help.*', mood: lt => lt < 1.3 ? 'squint' : 'happy', star: { x: -170, y: 60 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const fk = pop01(t, P.t0 + 0.7, 0.35, 2)
      let Ff = null
      if (fk > 0.01) Ff = signChar(x, t, 'aries', 800, 1060, 190 * fk, { mood: lt > 1.6 ? 'sparkle' : 'happy', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.2] })
      for (let i = 0; i < 4; i++) {
        const away = ease.inOutCubic(prog(lt, 1.0 + i * 0.18, 1.35 + i * 0.18))
        const ty = Ff ? Ff.top - 30 - i * 54 : 900
        drawBits(x, BOX, BOX_C, lerp(F.x, 800, away), lerp(F.top - 30 - i * 54, ty, away), 13 * k, { rot: (i % 2 ? 0.05 : -0.04) })
      }
      L(x, 790, 600, 'HELP: ACCEPTED', pop01(t, P.t0 + 1.8, 0.3, 2.2), ACC, -0.04, 32)
    } },
  // 9 · they remembered the order
  { sign: 'taurus', cap: 'They remembered your order. | *That’s love.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, CUP, CUP_C, 790, 930, 24 * k)
      if (k > 0.8) { x.save(); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillText('TAURUS', 778, 940); x.fillText('♡', 778, 975); x.restore() }
      puffs(x, t, 790, 800, P.t0 + 0.6, { n: 3, cell: 10, rise: 120, spread: 60 })
      bubble(x, 790, 640, 'the usual?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0476', key: 'D', accent: ACC, solo: 'taurus', ending: 'card',
  title: 'Taurus, let yourself | *be loved.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Soft heart. | *Steady love.*', mood: 'heart' },
  lesson: { text: 'You give comfort so well. | Let it *come back.*', chip: 'LOVE: RECEIVED' },
  last: {
    text: 'Cancer brought | *more soup.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
