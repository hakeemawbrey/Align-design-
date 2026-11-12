// r2t0078: star_talk SOLO, "Cancer red flags | we love." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole film (makeFilm solo mode, 9 cards): Cancer's most extreme (and most lovable) "red flags".
//   0.0–3.6    "Cancer red flags | *we love.*"
//   3.6–37.8   kept the receipt from your first date · met your mom once, calls her weekly · you sneezed, soup arrived
//              · remembers your outfit from 2019 · already named your future dog · mood changes with the moon
//              · packed you lunch (you're thirty) · checked your compatibility before hello · built a blanket fort for two
//  37.8        "Red flags? | *Love flags.*"
//  41.0        LESSON UNLOCKED: "Their love is a home. | *Come on in.*"  STATUS: SAFE
//  46.9        "Compatibility check: | *passed.*" over the match card: Cancer + Pisces (the check, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SILVER = '#bfe3ff', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a'
const S = 'cancer'

function card(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function phone(x, cx, cy, k, draw, rot = 0.05) {
  if (!card(x, cx, cy, 250, 400, '#2a2350', k, rot)) return
  x.fillStyle = '#140c30'; x.fillRect(-110, -170, 220, 340)
  draw(); x.restore()
}
// a framed receipt
function receipt(x, cx, cy, k) {
  if (!card(x, cx, cy, 220, 340, '#fff4e2', k, -0.05)) return
  text(x, 'RECEIPT', 0, -130, 30, INK, MONO, 700)
  for (let i = 0; i < 5; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(-80, -84 + i * 36, 110 - (i % 2) * 30, 10); x.fillRect(50, -84 + i * 36, 30, 10) }
  text(x, '2 x pasta', 0, 110, 26, RED, MONO, 700)
  x.restore()
}
const BOWL = ['..s.s.s..', '.s.s.s.s.', 'YYYYYYYYY', 'WYYYYYYYW', '.WWWWWWW.', '..WWWWW..']
const DOG = [
  'BB.....BB.',
  'BBBBBBBBB.',
  'BBKBBBKBB.',
  'BBBBBBBBB.',
  'BBBNNNBBB.',
  '.BBBBBBB..',
  '.BBBBBBBBB',
  '.BBBBBBBB.',
  '.B.B..B.B.',
]
const LUNCH = ['....KKKK....', '....K..K....', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RWWWWWWWWWWR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
// four moon phases in a row, the current one lit
function moons(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const cur = Math.floor(clamp(lt / 2) * 3.99)
  for (let i = 0; i < 4; i++) {
    const mx = cx - 150 + i * 100, r = 38 * k
    x.fillStyle = INK; x.beginPath(); x.arc(mx, cy, r + 5, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#2a2350'; x.beginPath(); x.arc(mx, cy, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = i === cur ? GOLD : SILVER
    x.beginPath(); x.arc(mx, cy, r, -Math.PI / 2, Math.PI / 2, false)
    x.ellipse(mx, cy, r * (1 - i / 1.5) * (i < 2 ? 1 : -1), r, 0, Math.PI / 2, -Math.PI / 2, i >= 2)
    x.fill()
  }
}
function profile(x, t, cx, cy, k, sign) {
  if (!card(x, cx, cy, 260, 330, BONE, k, 0.04)) return
  x.fillStyle = '#2a2350'; x.fillRect(-110, -145, 220, 190)
  x.restore()
  if (k > 0.5) signChar(x, t, sign, cx, cy - 55, 150 * k, { mood: 'happy', seed: 11, glyph: false, tears: sign === 'pisces' ? 1 : 0 })
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  text(x, 'SAYS: hi', 0, 100, 30, INK, MONO, 700)
  x.restore()
}
// a blanket fort
function fort(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-250, 140); x.lineTo(0, -170); x.lineTo(250, 140); x.closePath(); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.moveTo(-232, 130); x.lineTo(0, -150); x.lineTo(232, 130); x.closePath(); x.fill()
  x.fillStyle = '#ff4f86'; for (let i = 0; i < 4; i++) x.fillRect(-140 + i * 80, 20 - (i % 2) * 40, 26, 26)
  x.fillStyle = '#2a1640'; x.beginPath(); x.moveTo(-90, 130); x.lineTo(0, -10); x.lineTo(90, 130); x.closePath(); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Kept the receipt | from *your first date.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      receipt(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1100, 'FRAMED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Met your mom once. | *Calls her weekly.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), () => {
        text(x, 'CALLING', 0, -110, 28, MINT, MONO, 700)
        x.fillStyle = PINK; x.fillRect(-70, -70, 140, 140); text(x, 'MOM', 0, 0, 40, INK)
        text(x, '(yours)', 0, 110, 28, BONE, MONO, 700)
      })
      bubble(x, 420, 600, 'hi mama!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'You sneezed once. | *Soup arrived.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 620, 'achoo', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
      const fly = ease.outCubic(prog(lt, 0.8, 1.3))
      drawBits(x, BOWL, { s: '#c9c9d8', Y: GOLD, W: BONE }, lerp(400, 790, fly), 940, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1120, 'HOMEMADE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remembers your outfit | from *2019.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (card(x, 790, 860, 240, 300, BONE, k, 0.05)) {
        x.fillStyle = '#ffd23a'; x.fillRect(-60, -80, 120, 140); x.fillStyle = INK; for (let i = 0; i < 4; i++) x.fillRect(-60, -70 + i * 36, 120, 8)
        text(x, 'MAR 14', 0, 110, 30, INK, MONO, 700); x.restore()
      }
      label(x, 790, 640, 'MEMORY: SAVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SILVER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Already named | *your future dog.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DOG, { B: '#c98f5a', K: INK, N: '#2a1640' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'BISCUIT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 48, bg: PINK, rot: 0.05 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Mood changes | *with the moon.*', mood: lt => ['happy', 'squint', 'wide', 'heart'][Math.floor(clamp(lt / 2) * 3.99)], look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      moons(x, t, 770, 820, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1060, 'TODAY: ALL FOUR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Packed your lunch. | *You’re thirty.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LUNCH, { K: '#2a2350', R: RED, W: BONE }, 790, 880, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 1090, 'love you! xo', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Checked your compatibility | *before hello.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 840, pop01(t, P.t0 + 0.15, 0.3, 2), 'pisces')
      label(x, 790, 1100, 'MATCH: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Built a blanket fort. | *Table for two.*', mood: 'heart', look: [0, 0], star: { x: 0, y: 70, s: 230 },
    back(x, t, lt, P) { fort(x, 540, 900, pop01(t, P.t0 + 0.05, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 600, 'NEVER LEAVING', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: SILVER, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0078', key: 'G', accent: SILVER, solo: S, ending: 'card',
  title: 'Cancer red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'pisces', chip: 'IT’S A MATCH' },
  group: { cap: 'Red flags? | *Love flags.*', mood: 'heart' },
  lesson: { text: 'Their love is a home. | *Come on in.*', chip: 'STATUS: SAFE' },
  last: {
    text: 'Compatibility check: | *passed.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
