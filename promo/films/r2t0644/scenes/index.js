// r2t0644: star_talk, SOLO, "Making plans? | Aquarians be like." (topic: Aquarians making plans be like)
// (~43 s vertical, signs3kit social cut, music: lofi · D). One sign the whole film (makeFilm solo mode, 9 cards): every way
// an Aquarius makes plans, pushed to the extreme. Ending: the group beat.
//   0.0–3.6    "Making plans? | Aquarians *be like.*"  One big Aquarius pops in.
//   3.6–37.8   Plan A? they're on Plan Z · dinner at seven? how about 3 a.m. (a telescope) · invited the group, and the
//              neighbour's cat · made a group poll, every option weird · a road trip to nowhere specific · first date idea:
//              build a robot together · booked it, told nobody · skipped the party, started a book club for owls
//              · after all that? built a blanket fort
//  37.8        group (the ending): "Unpredictable. | *Never boring.*"  The big Aquarius comes back.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQUA = '#38d6f0', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#5fd068', BROWN = '#8a4a2e'
const S = 'aquarius'

// ── props
const SCOPE = [
  '..........KK',
  '........KKBK',
  '......KKBBK.',
  '....KKBBBK..',
  '..KKBBBBK...',
  'KKBBBBKK....',
  'KBBBKK......',
  '.KKK.K......',
  '....K.K.....',
  '...K...K....',
  '..K.....K...',
]
const SCOPE_C = { K: INK, B: '#9aa5c4' }
const CAT = [
  '...........P...',
  '..........PPP..',
  'G.......G.YPY..',
  'GG.....GG......',
  'GGGGGGGGG......',
  'GKGGGGKGG......',
  'GGGNNGGGG......',
  '.GGGGGGG.......',
  '.GGGGGGGGGGG.T.',
  '.GGGGGGGGGGGTT.',
  '.G.G.....G.G...',
]
const CAT_C = { G: '#9aa5c4', K: INK, N: PINK, P: PINK, Y: GOLD, T: '#9aa5c4' }
const ROBOT = [
  '....R....',
  '....K....',
  '.KKKKKKK.',
  '.KWWWWWK.',
  '.KWBWBWK.',
  '.KWWWWWK.',
  '.KKKKKKK.',
  'GGGGGGGGG',
  'G.GGHGG.G',
  'G.GGGGG.G',
  '..GG.GG..',
]
const ROBOT_C = { R: RED, K: INK, W: '#9aa5c4', B: AQUA, G: '#7a86b8', H: PINK }
const OWL = [
  '.BB.....BB.',
  'BBBBBBBBBBB',
  'BWWWBBBWWWB',
  'BWKWBBBWKWB',
  'BWWWBYBWWWB',
  'BBBBBYBBBBB',
  'BBTTTTTTTBB',
  'BTTTTTTTTTB',
  '.BBBBBBBBB.',
  '..O.....O..',
]
const OWL_C = { B: '#a0703a', W: CREAM, K: INK, Y: GOLD, T: '#e0b07a', O: '#ff9a4a' }
const BOOK = ['RRRRRRRRRR', 'RWWWWRWWWW', 'RWWWWRWWWW', 'RWWWWRWWWW', 'RRRRRRRRRR']

// a whiteboard: plan letters flip from A to Z
function board(x, cx, cy, k, letter) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -130, 320, 250); x.fillStyle = '#ffffff'; x.fillRect(-150, -120, 300, 230)
  x.fillStyle = INK; x.fillRect(-10, 120, 20, 70); x.fillRect(-80, 180, 160, 12)
  x.fillStyle = '#2f6fd0'; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`PLAN ${letter}`, 0, -20)
  x.strokeStyle = RED; x.lineWidth = 5; for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(-120, 50 + i * 20); x.lineTo(-40 + i * 30, 46 + i * 20); x.stroke() }
  x.restore()
}
// a phone poll with three strange options
function poll(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -192, 296, 400)
  x.fillStyle = INK; x.fillRect(-154, -204, 308, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -194, 288, 388)
  x.fillStyle = '#140c30'; x.fillRect(-132, -170, 264, 340)
  x.fillStyle = MINT; x.fillRect(-120, -156, 240, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('POLL: SATURDAY?', 0, -132)
  const OPTS = ['fog museum', 'moon picnic', 'silent bowling']
  x.font = `800 24px ${INTER}`
  for (let i = 0; i < Math.min(3, n); i++) {
    const y = -64 + i * 70
    x.fillStyle = BONE; x.fillRect(-116, y - 26, 232, 52); x.fillStyle = INK; x.strokeStyle = INK; x.lineWidth = 3; x.strokeRect(-104, y - 10, 20, 20)
    x.textAlign = 'left'; x.fillText(OPTS[i], -72, y + 2)
  }
  x.restore()
}
// a folded map with a dotted route that wanders off to a question mark
function map(x, cx, cy, k, d) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260)
  const COL = ['#c8e6a0', '#e8f4c8', '#c8e6a0']
  for (let i = 0; i < 3; i++) { x.fillStyle = COL[i]; x.fillRect(-164 + i * 110, -124, 108, 248) }
  x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath()
  const pts = [[-130, 90], [-80, 20], [-10, 60], [30, -40], [90, 10], [120, -80]]
  const m = Math.max(1, Math.round(d * (pts.length - 1)))
  pts.slice(0, m + 1).forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.stroke(); x.setLineDash([])
  if (d > 0.95) { x.fillStyle = RED; x.font = `800 70px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 120, -86) }
  x.restore()
}
// a calendar page with a big star on one day
function calendar(x, cx, cy, k, mark) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#ffffff'; x.fillRect(-142, -142, 284, 284)
  x.fillStyle = RED; x.fillRect(-142, -142, 284, 60); x.fillStyle = '#ffffff'; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -112)
  x.fillStyle = '#c9c3d8'; for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) x.fillRect(-120 + c * 50, -64 + r * 50, 36, 36)
  if (mark > 0.01) { x.save(); x.translate(20, 10); x.scale(mark, mark); x.fillStyle = GOLD; x.beginPath(); for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 22 : 52; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.fill(); x.restore() }
  x.restore()
}
// a blanket fort: a draped triangle with fairy lights
function fort(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -200); x.lineTo(210, 130); x.lineTo(-210, 130); x.closePath(); x.fill()
  x.fillStyle = LAV; x.beginPath(); x.moveTo(0, -186); x.lineTo(196, 122); x.lineTo(-196, 122); x.closePath(); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.moveTo(0, -40); x.lineTo(70, 122); x.lineTo(-70, 122); x.closePath(); x.fill()
  for (let i = 0; i < 7; i++) { const px = -150 + i * 50, py = 60 - Math.abs(px) * 0.9 - 60; x.fillStyle = (Math.floor(t * 4) + i) % 2 ? GOLD : PINK; x.beginPath(); x.arc(px, py + 40, 9, 0, Math.PI * 2); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Plan A? | *They’re on Plan Z.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const i = Math.min(25, Math.floor(Math.max(0, lt - 0.4) / 0.045))
      board(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), L[i])
    } },
  { sign: S, cap: 'Dinner at seven? | *How about 3 a.m.?*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 780, 960, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      { const k = pop01(t, P.t0 + 0.5, 0.3, 2); if (k > 0.01) { x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(910, 720, 46 * k, 0, Math.PI * 2); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(930, 706, 40 * k, 0, Math.PI * 2); x.fill() } }
      label(x, 740, 640, 'STARGAZING ONLY', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 900, 760, P.t0 + 1.4, 6, 90, 0.4)
    } },
  { sign: S, cap: 'Invited the group. | *And the neighbour’s cat.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 790, 920, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 660, 'GUEST OF HONOUR', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Made a group poll. | *Every option: weird.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      poll(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 1 + Math.floor(Math.max(0, lt - 0.5) / 0.3))
    } },
  { sign: S, cap: 'A road trip | *to nowhere specific.*', mood: lt => lt > 1.6 ? 'wink' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.7],
    front(x, t, lt, P) {
      map(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutQuad(prog(lt, 0.4, 1.6)))
      label(x, 790, 1080, 'DESTINATION: VIBES', pop01(t, P.t0 + 1.6, 0.3, 2.6), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'First date idea? | *Build a robot.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 790, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 6) * 0.04 })
      label(x, 790, 640, '✦ MATCH: INTRIGUED', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 30, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.5, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Booked everything. | *Told nobody.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 0.8, 0.25, 2.6))
      label(x, 790, 1100, 'INVITES SENT: 0', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skipped the party. | *Started an owl club.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, OWL, OWL_C, 800, 880, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, BOOK, { R: '#2f6fd0', W: CREAM }, 800, 1050, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 800, 650, 'MEMBERS: 1 OWL', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'After all that? | *Built a blanket fort.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      fort(x, 800, 920, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 800, 650, 'PLANS: PERFECT', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0644', key: 'D', accent: AQUA, solo: S, ending: 'group',
  title: 'Making plans? | Aquarians *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Unpredictable. | *Never boring.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
