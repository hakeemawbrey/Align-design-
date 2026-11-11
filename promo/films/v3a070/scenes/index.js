// v3a070: star_advice, ADVICE ROLLCALL, "Each sign's | dating superpower." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, one warm and specific dating superpower each, one light gag per card.
//   0.0–3.6    "Each sign's | *dating superpower.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ makes the first move (a little GO flag) · ♉ remembers your coffee order (the mug) · ♊ never a boring date
//              (the clock spins: six hours) · ♋ makes you feel at home (a lit-up little house) · ♌ hypes you like a fan club
//              (megaphone) · ♍ notices the little things (magnifier: new earrings?) · ♎ makes a date feel like a movie
//              (clapperboard) · ♏ loves you all the way (a heart padlock) · ♐ turns Tuesday into an adventure (treasure map)
//              · ♑ shows up early with a plan (clipboard) · ♒ loves your weird side (you collect spoons? tell me more)
//              · ♓ feels your feelings with you (tissues for two)
//  49.2        "Different powers. | *Same big heart.*"  The twelve fly up into a group photo.
//  52.6        callback: "Taurus already | *ordered yours.*"  The coffee mug comes back.
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e'

// a paper card: cream sheet, ink outline, an optional coloured header strip, centred lines (y relative to the centre)
function paper(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head, headBg = PINK, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 29) }
  for (const l of lines) { if (l.k !== undefined && l.k <= 0.01) continue; x.fillStyle = l.color || INK; x.font = l.font || `800 ${l.size || 34}px ${INTER}`; x.fillText(l.text, l.x || 0, l.y) }
  x.restore()
}

// ── props
const FLAG = [
  'PRRRRRRR...',
  'PRRRRRRRRR.',
  'PRRRRRRRRRR',
  'PRRRRRRRRR.',
  'PRRRRRRR...',
  'P..........',
  'P..........',
  'P..........',
  'P..........',
  'P..........',
  'P..........',
]
const FLAG_C = { P: BONE, R: RED }
const MUG = [
  '..s..s....',
  '...s..s...',
  '..s..s....',
  '.WWWWWW...',
  'WBBBBBBW..',
  'WBBBBBBWWW',
  'WBBWWBBW.W',
  'WBBBBBBW.W',
  'WBBBBBBWWW',
  'WBBBBBBW..',
  '.WWWWWW...',
]
const MUG_C = { W: CREAM, B: '#c98f2a', s: 'rgba(239,230,214,0.8)' }
const HOUSE = [
  '.....RR.....',
  '....RRRR....',
  '...RRRRRR...',
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  'RRRRRRRRRRRR',
  '.WWWWWWWWWW.',
  '.WYYWWWWYYW.',
  '.WYYWWWWYYW.',
  '.WWWWDDWWWW.',
  '.WWWWDDWWWW.',
  '.WWWWDDWWWW.',
]
const HOUSE_C = { R: '#d1495b', W: CREAM, Y: '#ffd23a', D: BROWN }
const HORN = [
  '.........GG',
  '.......GGGG',
  '.....GGGGGG',
  'WWWGGGGGGGG',
  'WWWGGGGGGGG',
  '.....GGGGGG',
  '.....H.GGGG',
  '.....H...GG',
  '.....H.....',
]
const HORN_C = { G: GOLD, W: BONE, H: BROWN }
const GLASS = [
  '..LLLL....',
  '.L....L...',
  'L......L..',
  'L......L..',
  'L......L..',
  'L......L..',
  '.L....L...',
  '..LLLLHH..',
  '.......HH.',
  '........HH',
]
const GLASS_C = { L: BONE, H: BROWN }
const CLAP = [
  'KWKWKWKWKWKW',
  'WKWKWKWKWKWK',
  '............',
  'KKKKKKKKKKKK',
  'KWWWWWWWWWWK',
  'KWKKKKKKKKWK',
  'KWWWWWWWWWWK',
  'KWKKKKKWWWWK',
  'KWWWWWWWWWWK',
  'KKKKKKKKKKKK',
]
const CLAP_C = { K: '#2a2350', W: BONE }
const LOCK = [
  '...SSSSS...',
  '..S.....S..',
  '..S.....S..',
  '..S.....S..',
  '.HH.HHH.HH.',
  'HHHHHHHHHHH',
  'HWHHHHHHHHH',
  'HHHHHKHHHHH',
  '.HHHHKHHHH.',
  '..HHHHHHH..',
  '...HHHHH...',
  '....HHH....',
  '.....H.....',
]
const LOCK_C = { S: '#c9d1e0', H: '#ff4f86', W: '#fff', K: INK }
const TISSUE = [
  '....WW......',
  '...WWWW.....',
  '....WWWW....',
  '.BBBBBBBBBB.',
  'BBPPPPPPPPBB',
  'BPPBBBBBBPPB',
  'BPPPPPPPPPPB',
  'BPPPPPPPPPPB',
  'BBBBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: SKYB, P: '#c6efff' }

function clock(x, t, cx, cy, k, spin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(8, 10, 130, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  const hand = (a, len, w) => { x.save(); x.rotate(a); x.fillRect(-w / 2, -len, w, len); x.restore() }
  hand(spin * Math.PI * 2, 88, 10); hand(spin * Math.PI * 2 / 12, 58, 14)
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 12, 0, Math.PI * 2); x.fill()
  x.restore()
}
function map(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-152, -112, 320, 240)
  x.fillStyle = INK; x.fillRect(-166, -126, 332, 252)
  x.fillStyle = '#f3dfae'; x.fillRect(-158, -118, 316, 236)
  x.fillStyle = '#7ccf8a'; x.fillRect(-120, -80, 90, 60); x.fillRect(40, 20, 100, 70); x.fillRect(-40, 40, 60, 50)
  x.fillStyle = SKYB; x.fillRect(20, -90, 110, 40)
  const pts = [[-120, 80], [-70, 20], [-10, 0], [40, -10], [70, -40], [110, -60]]
  const n = Math.floor(clamp(p) * 18)
  x.fillStyle = RED
  for (let i = 0; i < n; i++) { const s = i / 17 * (pts.length - 1), a = Math.floor(s), f = s - a, q = pts[Math.min(a + 1, pts.length - 1)]; x.fillRect(lerp(pts[a][0], q[0], f) - 4, lerp(pts[a][1], q[1], f) - 4, 9, 9) }
  if (p > 0.95) { x.fillStyle = RED; x.save(); x.translate(110, -60); x.rotate(Math.PI / 4); x.fillRect(-22, -6, 44, 12); x.fillRect(-6, -22, 12, 44); x.restore() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Makes the first move. | *Every time.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2.2)
      drawBits(x, FLAG, FLAG_C, 760, 800, 22 * k, { rot: 0.08 + 0.04 * Math.sin(t * 6) })
      bubble(x, 790, 600, "hi! I'm Aries.", pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1070, 'FIRST MOVE: MADE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Remembers your | *coffee order.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1090, 'OAT · EXTRA HOT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 620, 'your usual!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Never, ever | a *boring date.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clock(x, t, 790, 820, pop01(t, P.t0 + 0.25, 0.3, 2), ease.inOutCubic(prog(lt, 0.4, 1.8)) * 6)
      label(x, 790, 1070, 'TALKED: 6 HOURS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Makes you feel | *at home.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      const glow = ease.outCubic(prog(lt, 0.8, 1.2))
      if (glow > 0.01 && k > 0.5) { x.save(); x.globalAlpha = 0.35 * glow; x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(790, 880, 190, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, HOUSE, HOUSE_C, 790, 860, 24 * k)
      label(x, 790, 1100, 'WELCOME HOME', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Hypes you up | *like a fan club.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      drawBits(x, HORN, HORN_C, 560, 880, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.12 })
      bubble(x, 800, 760, 'MY DATE | IS ICONIC!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      sparkles(x, t, 800, 760, P.t0 + 1.0, 8, 190, 0.2)
      label(x, 800, 1060, 'VOLUME: MAX', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Notices the | *little things.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      const sweep = ease.inOutCubic(prog(lt, 0.3, 1.1))
      drawBits(x, GLASS, GLASS_C, lerp(860, 760, sweep), lerp(980, 840, sweep), 22 * k, { rot: -0.1 })
      bubble(x, 790, 620, 'new earrings?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1110, 'NOTICED ✓', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Makes a date | *feel like a movie.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      const snap = lt > 0.9 ? 0 : -0.35
      x.save(); x.translate(790, 860)
      drawBits(x, CLAP.slice(3), CLAP_C, 0, 40, 24 * k)
      drawBits(x, CLAP.slice(0, 2), CLAP_C, -20 * k, -100 * k, 24 * k, { rot: snap })
      x.restore()
      label(x, 790, 1080, 'SCENE 1: FIRST DATE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Loves you | *all the way.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LOCK, LOCK_C, 790, 840, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      sparkles(x, t, 790, 860, P.t0 + 1.1, 8, 170, 0.3, [PINK, BONE, GOLD])
      label(x, 790, 1110, 'LOCKED IN', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: '#b07dff', rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Turns Tuesday | *into an adventure.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      map(x, t, 310, 820, pop01(t, P.t0 + 0.25, 0.3, 2), prog(lt, 0.5, 1.6))
      label(x, 310, 1050, 'DATE: SOMEWHERE NEW', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Shows up early. | *With a plan.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const lk = i => pop01(t, P.t0 + 0.7 + i * 0.3, 0.25, 2)
      paper(x, 320, 840, 300, 320, pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.04, head: 'DATE PLAN', headBg: GREEN,
        lines: [{ text: '1. dinner', y: -40, size: 36, k: lk(0) }, { text: '2. stargazing', y: 20, size: 36, k: lk(1) }, { text: '3. you', y: 80, size: 36, color: RED, k: lk(2) }] })
      label(x, 320, 1080, 'ARRIVED: 6:50', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Loves your | *weird side* most.', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'you collect | spoons?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 940, 'TELL ME | EVERYTHING.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      sparkles(x, t, 790, 940, P.t0 + 1.3, 6, 170, 0.5, [MINT, BONE, SKYB])
    } },
  { sign: 'pisces', cap: 'Feels your feelings | *right with you.*', mood: lt => lt > 1.2 ? 'wide' : 'heart', tears: lt => lt > 1.2 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1080, 'TISSUES FOR TWO', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'v3a070', key: 'C', accent: PINK, ending: 'callback',
  title: 'Each sign’s dating | *superpower.*',
  cameos: CAMEOS,
  group: { cap: 'Different powers. | *Same big heart.*' },
  last: {
    text: 'Taurus already | *ordered yours.*',
    draw(x, t, lt) {
      drawBits(x, MUG, MUG_C, 540, 1000, 28 * pop01(t, t - lt + 0.6, 0.35, 2))
      label(x, 540, 1250, 'OAT · EXTRA HOT', pop01(t, t - lt + 1.1, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 900, t - lt + 1.3, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
