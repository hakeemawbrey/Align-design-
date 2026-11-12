// r2t0424: star_talk, SOLO, "Capricorn secrets | *be like.*" (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine Capricorns keeping a secret, each pushed to the extreme. Ending: callback.
//   0.0–3.6    "Capricorn secrets | *be like.*"
//   3.6–37.8   told a secret, filed it in a vault · surprise party planned eight months early · promoted, told nobody for a year
//              · "what's wrong?" "quarterly stuff." · hid their birth time till date three · questioned for hours, zero blinks
//              · wrote it down in their own code · almost slipped, pivoted to taxes · the secret: your birthday gift
//  37.8        "Lips sealed. | *Heart soft.*"
//  41.2        CALLBACK: "Inside the vault? | *Cake. For you.*"  the vault from card 1 swings open.
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
const ACC = '#7dffb0'
const VAULT = ['KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGKKKKKKKKGK', 'KGK......KGK', 'KGK.YYYY.KGK', 'KGK.Y..Y.KGK', 'KGK.YYYY.KGK', 'KGK......KGK', 'KGKKKKKKKKGK', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK', '.KK......KK.']
const VAULT_C = { K: INK, G: GREY, Y: GOLD }
const GIFT = ['...PP.PP...', '....PPP....', 'RRRRRPRRRRR', 'RRRRRPRRRRR', 'RRRRRPRRRRR', 'RRRRRPRRRRR', 'RRRRRPRRRRR']
const GIFT_C = { R: MINT, P: PINK }
const CAKE = ['..F..F..F..', '..C..C..C..', 'PPPPPPPPPPP', 'PWPPWPPWPPW', 'BBBBBBBBBBB', 'BBBBBBBBBBB', 'PPPPPPPPPPP', 'BBBBBBBBBBB']
const CAKE_C = { F: ORANGE, C: CREAM, P: PINK, W: '#fff', B: '#e0a56a' }

function redact(x, cx, cy, w, k, rot = -0.03) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = INK; x.fillRect(-w / 2, -16, w * k, 32); x.restore()
}

const CAMEOS = [
  // 1 · the vault
  { sign: 'capricorn', cap: 'You told them a secret. | Filed it *in a vault.*', mood: 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, VAULT, VAULT_C, 770, 890, 25 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'CLEARANCE: CAP ONLY', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, -0.04, 28, CREAM)
      L(x, 790, 1130, 'LOCKED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 38)
    } },
  // 2 · the surprise party
  { sign: 'capricorn', cap: 'Surprise party planned | *eight months early.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), ['PROJECT: CAKE', 'phase 1 of 9', 'guests: briefed'], { w: 360, bg: CREAM, size: 34, font: MONO, weight: 700 })
      L(x, 790, 1100, 'CLASSIFIED', pop01(t, P.t0 + 1.1, 0.3, 2.4), RED, -0.06, 44, CREAM)
    } },
  // 3 · the promotion
  { sign: 'capricorn', cap: 'Got promoted. | Told *nobody for a year.*', mood: 'happy', star: ST,
    front(x, t, lt, P) {
      L(x, 790, 700, 'NEW TITLE:', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 40)
      note(x, 790, 880, pop01(t, P.t0 + 0.5, 0.3, 2), ['█████ ████'], { w: 330, bg: CREAM, size: 40 })
      bubble(x, 790, 1100, 'oh, same job.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  // 4 · "what's wrong?"
  { sign: 'capricorn', cap: '“What’s wrong?” | “*Quarterly stuff.*”', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 620, 'what’s | wrong?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      note(x, 790, 900, pop01(t, P.t0 + 0.6, 0.3, 2), ['FEELINGS:', ' ', ' '], { w: 320, bg: CREAM, size: 36, font: MONO, weight: 700, rot: 0.03 })
      redact(x, 790, 912, 230, prog(lt, 0.9, 1.2), 0.03); redact(x, 790, 966, 200, prog(lt, 1.1, 1.4), 0.03)
      L(x, 790, 1110, 'REDACTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, -0.04, 36, CREAM)
    } },
  // 5 · Align: the birth time
  { sign: 'capricorn', cap: 'Hid their birth time | *till date three.*', mood: lt => lt < 1.3 ? 'squint' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      x.save(); x.translate(790, 830); x.rotate(-0.2); x.fillStyle = INK; x.fillRect(-170 * pop01(t, P.t0 + 0.7, 0.3, 2), -26, 340 * pop01(t, P.t0 + 0.7, 0.3, 2), 52); x.restore()
      L(x, 790, 830, 'RISING: ???', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.2, 32)
      L(x, 790, 1070, '✦ MATCH: WAITING', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 32)
    } },
  // 6 · the interrogation
  { sign: 'capricorn', cap: 'Questioned for hours. | *Zero blinks.*', mood: 'neutral', look: [0, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const ids = ['gemini', 'scorpio']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, id, 760 + i * 150, 1000, 150 * k, { mood: 'squint', look: [-1, 0], seed: 40 + i, glyph: false }) })
      bubble(x, 830, 700, 'just TELL | us!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 400, 1130, 'BLINKS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.05, 38)
    } },
  // 7 · their own code
  { sign: 'capricorn', cap: 'Wrote it down | in *their own code.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), ['XQ7-ZZ9', 'K4/B/22', '▲▲●■'], { w: 330, bg: CREAM, size: 44, font: MONO, weight: 700 })
      L(x, 790, 1110, 'KEY: IN ANOTHER VAULT', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  // 8 · almost slipped
  { sign: 'capricorn', cap: 'Almost slipped. | *Pivoted to taxes.*', mood: lt => lt < 0.8 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'so the gif—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 860, 'SO. taxes.', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 50, col: MINT, tail: 'bl' })
      L(x, 790, 1080, 'SECRET: SAFE', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 38)
    } },
  // 9 · the reveal
  { sign: 'capricorn', cap: 'The big secret? | *Your birthday gift.*', mood: lt => lt < 1.0 ? 'neutral' : 'heart', star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 3) })
      L(x, 790, 650, 'SINCE MARCH', pop01(t, P.t0 + 0.8, 0.3, 2.2), BONE, -0.04, 38)
      sparkles(x, t, 790, 900, P.t0 + 1.1, 8, 190, 0.3)
      hearts(x, t, 400, 800, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0424', key: 'D', accent: ACC, solo: 'capricorn', ending: 'callback',
  title: 'Capricorn secrets | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Lips sealed. | Heart *soft.*', mood: 'heart' },
  last: {
    text: 'Inside the vault? | *Cake. For you.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      const open = ease.outBack(prog(lt, 0.9, 1.5))
      drawBits(x, VAULT.map(r => r.replace(/Y/g, '.')), { ...VAULT_C }, 600, 1120, 34 * k)
      drawBits(x, CAKE, CAKE_C, 600, 1110, 20 * pop01(t, t0 + 1.2, 0.35, 2.2))
      x.save(); x.translate(600 + 204, 1120); x.scale(lerp(1, -0.4, open), 1); drawBits(x, VAULT, VAULT_C, -204, 0, 34 * k); x.restore()
      signChar(x, t, 'capricorn', 290, 1000, 280 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 33, hops: [t0 + 1.5] })
      hearts(x, t, 600, 1000, t0 + 1.4, { n: 8, life: 2.0, spread: 420, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
