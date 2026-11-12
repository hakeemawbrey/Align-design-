// r2t0130: star_talk, ROLLCALL, "The signs clearing | their closet." (topic: The signs decluttering their closet)
// (~54 s vertical, signs3kit social cut, music: lofi · F). Twelve signs in zodiac order, each one's most extreme clean-out.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ bagged it all, even today's outfit · ♉ kept every sweater, all cozy · ♊ tried it all on, look 47
//              · ♋ every shirt has a memory, donated zero · ♌ found the first-date outfit, still iconic · ♍ colour-coded the hangers
//              · ♎ keep or donate? asked the group chat · ♏ only owns black, sorted by darkness · ♐ found a passport in a jacket, booked a trip
//              · ♑ a spreadsheet of every sock · ♒ turned old jeans into a lamp · ♓ found an old hoodie, cried for an hour
//  49.2        GROUP ENDING: "Closet clean? | *Not even close.*"  A heap of clothes lands in front of the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', DENIM = '#5b7fc4', TEAL = '#4fc2b0'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const SHIRT = ['SS....SS', 'SSSSSSSS', 'SSSSSSSS', '.SSSSSS.', '.SSSSSS.', '.SSSSSS.', '.SSSSSS.']
const SWEATER = ['SS.ww.SS', 'SSSSSSSS', 'SWSWSWSS', 'SSSSSSSS', '.SWSWSW.', '.SSSSSS.', '.wwwwww.']
const HANGER = ['...KK...', '..K..K..', '.....K..', '....K...', '.KKKKKK.', 'K......K']
const BAG = ['..KK..KK..', '...KKKK...', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', '.BBBBBBBB.']
const HOODIE = ['..HHHH..', '.HKKKKH.', 'HHHHHHHH', 'HHHddHHH', '.HHHHHH.', '.HHHHHH.', '.HHHHHH.']
const PASS = ['NNNNNNN', 'NNNGNNN', 'NNGGGNN', 'NNNGNNN', 'NNNNNNN', 'NGGGGGN', 'NNNNNNN']
const LAMP = ['..YYYY..', '.YYYYYY.', 'DDDDDDDD', '...DD...', '...DD...', '...DD...', '..DDDD..', '.DDDDDD.']
const shirt = (x, col, cx, cy, cell, o = {}) => drawBits(x, SHIRT, { S: col }, cx, cy, cell, o)

const CAMEOS = [
  { sign: 'aries', cap: 'Bagged it all. | *Even today’s outfit.*', mood: 'sparkle', star: { x: -190 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) { const fly = ease.inCubic(prog(lt, 0.2 + i * 0.25, 0.6 + i * 0.25)); if (fly < 1) shirt(x, [RED, SKYB, GOLD, MINT][i], lerp(560, 820, fly), lerp(760, 960, fly) - Math.sin(Math.PI * fly) * 160, 14, { rot: fly * 3 }) }
      drawBits(x, BAG, { K: INK, B: '#3a3168' }, 820, 1000, 20 * pop01(t, P.t0 + 0.1, 0.3, 2))
      label(x, 800, 640, 'CLOSET: EMPTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Kept every sweater. | *They’re all cozy.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const COL = ['#c9a6ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#8fe3ff', '#ffd23a']
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.2))
      for (let i = 0; i < n; i++) drawBits(x, SWEATER, { S: COL[i], W: CREAM, w: CREAM }, 800 + (i % 2 ? 10 : -10), 1100 - i * 74, 14 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.2, 2))
      label(x, 600, 620, 'DONATED: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Tried everything on. | *Started a fashion show.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -190 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P, F) {
      const COL = [PINK, SKYB, MINT, GOLD, LAV]
      shirt(x, COL[Math.floor(lt * 3) % 5], 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 * Math.sin(t * 4) })
      label(x, 800, 640, `LOOK ${41 + Math.floor(lt * 3)}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 0.4 + Math.floor(lt * 3) * 0.33, 6, 140, lt)
      label(x, 800, 1110, 'RUNWAY: HALLWAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Every shirt has a memory. | *Kept them all.*', mood: lt => lt < 1.1 ? 'happy' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      shirt(x, '#9fd8ff', 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 800, 640, 'camp, 2011', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bl' })
      label(x, 800, 1100, 'BACK IN THE CLOSET', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'Found the first-date outfit. | *Still iconic.*', mood: 'sparkle', star: { x: -190 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.1, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      shirt(x, GOLD, 800, 860, 26 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.05 })
      sparkles(x, t, 800, 860, P.t0 + 0.6, 8, 200, 0.2)
      label(x, 800, 620, '✦ MATCH APPROVED IT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'WEARING IT. NOW.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Colour-coded the hangers. | *By shade.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { x.save(); x.fillStyle = INK; x.fillRect(600, 690, 380 * k, 14); x.restore() }
      const COL = ['#ff4f5a', '#ff8a5c', '#ffb34a', '#ffd23a', '#7dffb0', '#4fc2b0', '#8fe3ff', '#6b8cff', '#c9a6ff']
      for (let i = 0; i < 9; i++) { const kk = pop01(t, P.t0 + 0.3 + i * 0.12, 0.2, 2); drawBits(x, HANGER, { K: '#c9c9d8' }, 625 + i * 42, 712, 4 * kk); shirt(x, COL[i], 625 + i * 42, 790, 9 * kk) }
      label(x, 790, 1050, 'SHADE 9 OF 9', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Keep or donate? | *Asked the group chat.*', mood: lt => lt < 1.3 ? 'squint' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      shirt(x, PINK, 800, 700, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 720, 920, 'KEEP', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      bubble(x, 880, 1010, 'DONATE', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: '#ff8a7a', tail: 'br' })
      label(x, 800, 1140, 'VOTES: TIED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Only owns black. | *Sorted by darkness.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const COL = ['#3a3448', '#2c2738', '#211d2c', '#171420', '#0d0b13']
      for (let i = 0; i < 5; i++) shirt(x, COL[i], 660 + i * 66, 860, 10 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.2, 2), { outline: '#6b62a8' })
      label(x, 790, 680, 'BLACK 1 → BLACK 5', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'obviously.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Found a passport in a jacket. | *Booked a trip.*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      drawBits(x, PASS, { N: '#2f4a8a', G: GOLD }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      sparkles(x, t, 800, 860, P.t0 + 0.5, 7, 170, 0.3)
      label(x, 800, 640, 'CLOSET: ABANDONED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1090, 'GATE 12', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Made a spreadsheet | of *every sock.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (card(x, 800, 850, 330, 330, CREAM, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03)) {
        x.fillStyle = '#c9d6f0'; for (let j = 0; j < 4; j++) x.fillRect(-150, -74 + j * 72, 300, 2)
        x.fillRect(-60, -150, 2, 300)
        x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        const ROWS = [['SOCK', 'PAIR?'], ['blue', 'yes'], ['grey', 'maybe'], ['lone', 'ALERT']]
        ROWS.forEach((r, j) => { if (lt > 0.3 + j * 0.25) { x.fillText(r[0], -140, -110 + j * 72); x.fillText(r[1], -40, -110 + j * 72) } })
        x.restore()
      }
      label(x, 800, 1100, 'TAB 2: SHOES', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Old jeans? | Turned them *into a lamp.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const on = lt > 1.3
      if (on) { x.save(); x.globalAlpha = 0.35; const g = x.createRadialGradient(800, 760, 10, 800, 760, 260); g.addColorStop(0, '#ffe7a8'); g.addColorStop(1, 'rgba(255,231,168,0)'); x.fillStyle = g; x.fillRect(540, 500, 520, 520); x.restore() }
      drawBits(x, LAMP, { Y: on ? '#ffe7a8' : '#9aa5c4', D: DENIM }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1100, 'FASHION? NO. LIGHTING.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Found an old hoodie. | *Cried for an hour.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { H: '#9aa5c4', K: INK, d: '#6b62a8' }, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 800, 640, 'SMELLS LIKE 2016', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'TISSUES: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const PILE = [[RED, -260, 0], [SKYB, -150, -20], [GOLD, -40, 10], [MINT, 80, -10], [LAV, 190, 5], [PINK, 280, -5], [ORANGE, -200, -60], [TEAL, -60, -70], ['#c97bff', 100, -70], [DENIM, 230, -60]]
const F = makeFilm({
  id: 'r2t0130', key: 'F', accent: ORANGE, ending: 'group',
  title: 'The signs clearing | *their closet.*',
  cameos: CAMEOS,
  group: {
    cap: 'Closet clean? | *Not even close.*',
    // the whole wardrobe lands in a heap in front of the twelve
    draw(x, t, lt) {
      PILE.forEach(([c, dx, dy], i) => { const d = ease.outCubic(prog(lt, 1.6 + i * 0.08, 2.0 + i * 0.08)); if (lt > 1.6 + i * 0.08) shirt(x, c, 540 + dx, lerp(300, 740 + dy, d), 16, { rot: (i % 3 - 1) * 0.3 }) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
