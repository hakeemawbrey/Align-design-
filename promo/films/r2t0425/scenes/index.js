// r2t0425: star_talk, ROLL CALL, "The signs | *at a bookstore.*" (~58 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself at a bookstore. Ending: lesson.
//   0.0–3.6    "The signs | *at a bookstore.*"
//   3.6–49.2   ♈ read the last page first · ♉ came for one book, stayed for the café · ♊ started six books in one aisle
//              · ♋ smelled every old book, felt like home · ♌ saw the memoir shelf, pitched their own · ♍ found a typo, wrote to the publisher
//              · ♎ bought it for the cover · ♏ solved the mystery by page three · ♐ eight travel guides, zero trips
//              · ♑ in self-help, already wrote one · ♒ found the zodiac shelf, moved in · ♓ read one poem, needed a moment
//  49.2        "Twelve signs. | *Zero books returned.*"
//  52.4        LESSON: "Every sign reads. | Just *very differently.*"  SHELF: SHARED
//  58.3        "Pisces is still | *on page one.*"
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
const ACC = '#c97bff'
const BOOK = ['KKKKKKKKKK', 'KCCCCCCCCK', 'KCWWWWWWCK', 'KCCCCCCCCK', 'KCCWWWWCCK', 'KCCCCCCCCK', 'KCCCCCCCCK', 'KCCCCCCCCK', 'KCCCCCCCCK', 'KKKKKKKKKK']
const OPEN = ['WWWWW.WWWWW', 'WLLLW.WLLLW', 'WWWWWKWWWWW', 'WLLLWKWLLLW', 'WWWWWKWWWWW', 'WLLLWKWLLLW', 'WWWWWKWWWWW', '.WWWWKWWWW.']
const CUP = ['KKKKKKKK..', 'KBBBBBBKKK', 'KWWWWWWK.K', 'KWWWWWWK.K', 'KWWWWWWKKK', 'KWWWWWWK..', '.KKKKKK...', 'SSSSSSSSS.']
const GLASS = ['..KKKK...', '.KLLLLK..', 'KLLWLLLK.', 'KLLLLLLK.', 'KLLLLLLK.', '.KLLLLK..', '..KKKKK..', '......KK.', '.......KK']

function book(x, cx, cy, cell, col, rot = 0, alpha = 1) { drawBits(x, BOOK, { K: INK, C: col, W: CREAM }, cx, cy, cell, { rot, alpha }) }

const CAMEOS = [
  { sign: 'aries', cap: 'Read the last page | *first. Obviously.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, OPEN, { W: CREAM, L: '#c9b8a8', K: INK }, 790, 880, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.04 })
      L(x, 790, 680, 'PAGE 412 OF 412', pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.04, 34)
      L(x, 790, 1090, 'SPOILED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, 0.04, 40, CREAM)
    } },
  { sign: 'taurus', cap: 'Came for one book. | Stayed for *the café.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CUP, { K: INK, W: PINK, B: '#8a4a2e', S: CREAM }, 800, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      puffs(x, t, 780, 790, P.t0 + 0.5, { n: 3, cell: 9, rise: 120, spread: 60 })
      L(x, 790, 1090, 'PAGES READ: 0', pop01(t, P.t0 + 1.2, 0.3, 2.2), BONE, -0.04, 36)
      L(x, 790, 640, 'SCONES: 3', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.05, 34)
    } },
  { sign: 'gemini', cap: 'Started six books. | *In one aisle.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const cols = [PINK, MINT, SKYB, GOLD, LAV, ORANGE]
      for (let i = 0; i < 6; i++) book(x, 645 + (i % 3) * 125, 760 + Math.floor(i / 3) * 230, 12 * pop01(t, P.t0 + 0.2 + i * 0.18, 0.25, 2), cols[i], (i % 2 ? 0.1 : -0.1))
      L(x, 790, 1130, 'FINISHED: 0', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Smelled every old book. | *Felt like home.*', mood: lt => lt < 0.8 ? 'happy' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      book(x, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), '#c99a2e', 0.08)
      puffs(x, t, 640, 860, P.t0 + 0.6, { n: 3, cell: 8, rise: 80, spread: 60, col: '#ffe9a8' })
      bubble(x, 790, 640, 'ahh, grandma’s | attic', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Saw the memoir shelf. | *Pitched their own.*', mood: 'sparkle', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      book(x, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), ORANGE, 0.05)
      L(x, 790, 860, 'ME: VOL. 1', pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.05, 36)
      L(x, 790, 1110, 'VOL. 2-9: COMING', pop01(t, P.t0 + 1.3, 0.3, 2.2), BONE, -0.04, 32)
      sparkles(x, t, 790, 880, P.t0 + 0.6, 7, 190, 0.4)
    } },
  { sign: 'virgo', cap: 'Found one typo. | Wrote *to the publisher.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['p. 214:', '“teh”'], { w: 300, bg: CREAM, size: 44, font: MONO, weight: 700 })
      x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.globalAlpha = clamp((lt - 0.7) * 3); x.beginPath(); x.ellipse(790, 860, 90, 40, 0, 0, 7); x.stroke(); x.restore()
      L(x, 790, 1060, 'LETTER: 3 PAGES', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Bought it | *for the cover.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      book(x, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), PINK, -0.05)
      sparkles(x, t, 790, 860, P.t0 + 0.5, 8, 180, 0.2); sparkles(x, t, 790, 860, P.t0 + 1.1, 8, 200, 0.6)
      L(x, 790, 1100, 'PLOT: NO IDEA', pop01(t, P.t0 + 1.3, 0.3, 2.2), BONE, 0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Solved the mystery | *by page three.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      book(x, 760, 900, 20 * pop01(t, P.t0 + 0.15, 0.3, 2), '#ff6b5a', 0.05)
      drawBits(x, GLASS, { K: INK, W: '#fff', L: 'rgba(191,233,255,0.55)' }, lerp(740, 860, 0.5 + 0.5 * Math.sin(t * 2)), 880, 26 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 640, 'IT WAS THE BUTLER', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, -0.04, 30, CREAM)
    } },
  { sign: 'sagittarius', cap: 'Eight travel guides. | *Zero trips booked.*', mood: 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const cols = [SKYB, MINT, GOLD, ORANGE, PINK, LAV, '#ff6b5a', '#5fd068']
      const n = Math.min(8, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.18))
      for (let i = 0; i < n; i++) { x.save(); x.translate(790 + (i % 2 ? 10 : -10), 1110 - i * 52); x.rotate((i % 3 - 1) * 0.05); x.fillStyle = INK; x.fillRect(-124, -26, 248, 52); x.fillStyle = cols[i]; x.fillRect(-118, -20, 236, 40); x.restore() }
      L(x, 790, 640, 'PASSPORT: SOMEWHERE', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, -0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Browsed self-help. | *Already wrote one.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      book(x, 790, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), MINT, -0.04)
      L(x, 790, 850, 'GOALS: A GUIDE', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, -0.04, 30)
      L(x, 790, 1100, 'AUTHOR: ME', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 40)
    } },
  { sign: 'aquarius', cap: 'Found the zodiac shelf. | *Moved in.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 820, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1040, 'ADDRESS: AISLE 7', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 34)
      bubble(x, 430, 600, 'home.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Read one poem. | *Needed a moment.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, OPEN, { W: CREAM, L: '#c9b8a8', K: INK }, 790, 880, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 680, 'PAGE 1 OF 300', pop01(t, P.t0 + 0.6, 0.3, 2), LAV, -0.04, 36)
      L(x, 790, 1080, 'MOMENT: 40 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0425', key: 'F', accent: ACC, ending: 'lesson',
  title: 'The signs | *at a bookstore.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero books finished.*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'squint', 'heart', 'wink', 'sparkle', 'happy', 'heart', 'wide'] },
  lesson: { text: 'Every sign reads. | Just *very differently.*', chip: 'SHELF: SHARED' },
  last: {
    text: 'Pisces is still | *on page one.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 7 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
