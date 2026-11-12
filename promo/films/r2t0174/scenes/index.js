// r2t0174: star_talk, SOLO film, "Your Taurus coworker | *be like.*" (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine office moments, each the most extreme Taurus version. Ending: group.
//   0.0–3.6    "Your Taurus | coworker *be like.*"
//   3.6–37.8   nine cards: labelled their lunch, and the fridge · meeting at 12:01? lunch is at 12
//              · software update? remind me never · snack drawer better stocked than a shop · leaves at 5:00, not 5:01
//              · you moved their stapler, they noticed · free pizza, got there first · checked the new hire's sign (Taurus:
//              instant bestie) · same lunch order, year six
//  37.8        "Loyal. Calm. | *Snacks: theirs.*"  (group is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', GREEN = '#7ad86a', ORANGE = '#ffb34a'

// ── props
function fridge(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -230, 260, 460); x.fillStyle = '#e8eef8'; x.fillRect(-122, -222, 244, 444)
  x.fillStyle = INK; x.fillRect(-122, -70, 244, 8); x.fillRect(80, -190, 12, 90); x.fillRect(80, -30, 12, 120)
  const tags = [[-60, -160, -0.1], [10, -120, 0.08], [-40, 20, 0.05], [0, 120, -0.06], [-70, 170, 0.1]]
  const n = Math.floor(clamp((lt - 0.3) / 1.3) * tags.length)
  tags.slice(0, Math.max(1, n)).forEach(([px, py, r]) => {
    x.save(); x.translate(px, py); x.rotate(r); x.fillStyle = GOLD; x.fillRect(-58, -18, 116, 36)
    x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TAURUS’S', 0, 1); x.restore()
  })
  x.restore()
}
function clock(x, cx, cy, k, h, m, { r = 130 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, r, 0, 7); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * (r - 20) - 5, Math.sin(a) * (r - 20) - 5, 10, 10) }
  const hand = (a, len, w) => { x.save(); x.rotate(a); x.fillRect(-w / 2, -len, w, len); x.restore() }
  x.fillStyle = INK; hand((h % 12 + m / 60) / 12 * Math.PI * 2, r * 0.5, 14); x.fillStyle = RED; hand(m / 60 * Math.PI * 2, r * 0.78, 9)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 12, 0, 7); x.fill()
  x.restore()
}
function monitor(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 260); x.fillRect(-20, 110, 40, 50); x.fillRect(-90, 156, 180, 16)
  x.fillStyle = '#3d6fd8'; x.fillRect(-178, -138, 356, 236)
  x.fillStyle = BONE; x.fillRect(-150, -110, 300, 180)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Update now?', 0, -70)
  x.fillStyle = '#b9b0a0'; x.fillRect(-130, -20, 120, 54); x.fillStyle = lt > 1.0 ? MINT : '#d8d0c0'; x.fillRect(4, -20, 126, 54)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('YES', -70, 7); x.fillText('NEVER', 67, 7)
  if (lt > 1.0) { x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(2, -22, 130, 58) }
  x.restore()
}
const DONUT = ['..KKKK..', '.KPPPPK.', 'KPPKKPPK', 'KPK..KPK', 'KPPKKPPK', '.KPPPPK.', '..KKKK..']
const CHIPS = ['KKKKKK', 'KYYYYK', 'KYRRYK', 'KYRRYK', 'KYYYYK', 'KYYYYK', 'KKKKKK']
const BAR = ['KKKKKKKK', 'KBBBBBBK', 'KBGGGGBK', 'KBBBBBBK', 'KKKKKKKK']
function drawer(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -60, 400, 200); x.fillStyle = '#a8742a'; x.fillRect(-192, -52, 384, 184)
  x.fillStyle = '#7a4a1a'; x.fillRect(-176, -36, 352, 152)
  x.restore()
  for (let i = 0; i < 9; i++) {
    const bm = [DONUT, CHIPS, BAR][i % 3], pal = [{ K: INK, P: PINK }, { K: INK, Y: GOLD, R: RED }, { K: INK, B: '#5a3a2a', G: GOLD }][i % 3]
    drawBits(x, bm, pal, cx - 140 + (i % 5) * 70, cy - 20 - Math.floor(i / 5) * 60 + 40, 8 * k, { rot: (i % 3 - 1) * 0.2 })
  }
}
const STAPLER = ['..KKKKKKKKKKK', '.KRRRRRRRRRRK', 'KRRRRRRRRRRRK', 'KKKKKKKKKKKKK', 'KGGGGGGGGGGGK', 'KKKKKKKKKKKKK']
function pizza(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -40, 380, 160); x.fillStyle = '#d8b88a'; x.fillRect(-182, -32, 364, 144)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, 90); x.lineTo(0, -10); x.lineTo(150, 90); x.fill()
  x.fillStyle = '#ffd23a'; x.beginPath(); x.moveTo(-136, 84); x.lineTo(0, 0); x.lineTo(136, 84); x.fill()
  x.fillStyle = RED; for (const [a, b] of [[-60, 60], [0, 40], [60, 64]]) { x.beginPath(); x.arc(a, b, 12, 0, 7); x.fill() }
  x.restore()
}
function newHire(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -170, 272, 340); x.fillStyle = BONE; x.fillRect(-128, -162, 256, 324)
  x.fillStyle = SKYB; x.fillRect(-128, -162, 256, 54)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEW HIRE', 0, -134)
  signChar(x, t, 'taurus', 0, -10, 140, { mood: 'happy', seed: 61, glyph: false, glow: 0.6 })
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('sign: ♉︎ Taurus', 0, 120)
  x.restore()
}
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']

const CAMEOS = [
  { sign: 'taurus', cap: 'Labelled their lunch. | And *the fridge.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { fridge(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'taurus', cap: 'A meeting at 12:01? | *Lunch is at 12.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      clock(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 12, 0)
      label(x, 790, 640, 'DECLINED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'lunch o’clock', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'tl' })
    } },
  { sign: 'taurus', cap: 'Software update? | *Remind me never.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { monitor(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'taurus', cap: 'Their snack drawer | could *open a shop.*', mood: 'heart', look: [1, 0], star: { x: -200 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawer(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 650, 'OPEN 9 TO 5', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Leaves at 5:00. | *Not 5:01.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      clock(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 5, lt > 1.2 ? 0 : 59 + lt * 0.5)
      bubble(x, 790, 1100, 'bye!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 48, tail: 'tl' })
    } },
  { sign: 'taurus', cap: 'You moved their stapler. | *They noticed.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const dx = 50 * ease.inOutCubic(clamp((lt - 0.4) / 0.4))
      drawBits(x, STAPLER, { K: INK, R: RED, G: '#9aa5c4' }, 790 + dx, 890, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1090, 'MOVED 3 CM. WHY?', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Free pizza in the kitchen? | Taurus *got there first.*', mood: 'heart', look: [1, 0], star: { x: -200 }, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      pizza(x, 790, 880, 1.25 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 650, 'FIRST IN LINE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Checked the new hire’s sign. | *Taurus?* Instant bestie.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      newHire(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1100, 'SNACK BUDDY: FOUND', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.3) hearts(x, t, 560, 780, P.t0 + 1.3 * 1.29, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 8 })
    } },
  { sign: 'taurus', cap: 'Same lunch order. | *Year six.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, { B: '#e8a84a', G: GREEN, R: RED, Y: GOLD }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 650, 'THE USUAL', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'NO NOTES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0174', key: 'D', accent: GREEN, solo: 'taurus', ending: 'group',
  title: 'Your Taurus | coworker *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Loyal. Calm. | *Snacks: theirs.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
