// r2a0493: star_advice, ADVICE SOLO, "Sag, the plan | *can be loose.*" (topic: Sagittarius, the plan can be loose)
// (~51 s vertical, signs3kit social cut, music: lofi · C). One sign the whole way: nine gentle ways a Sagittarius can keep
// plans light and still look after themself and their people. Ending: lesson.
//   0.0–3.6    "Sag, the plan | *can be loose.*"
//   3.6–37.8   no itinerary, wander on purpose · plans changed, new adventure · got lost, found a great café
//              · friends want a schedule, give a rough time · booked on a whim, pack the charger · running late, send a heads-up
//              · match wants a date, just pick a day · big dream, take one tiny step · restless at home, a walk counts as travel
//  37.8        "Go with | *the flow.*"
//  41.0        LESSON: "You don’t need every step. | Just *the next one.*"  PLAN: FLEXIBLE
//  46.9        "Lost the map? | *Enjoy the view.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ff9a4a', DEEP = '#2a2350', GREEN = '#5fd068'
const ACC = '#c9a6ff'
const S = 'sagittarius', ST = { x: -170 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const R = (t, P, a = 0.2) => pop01(t, P.t0 + a, 0.3, 2)
const pill = (t, P, a) => pop01(t, P.t0 + a, 0.2, 2)

function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 23 + lh * (i + 0.5)))
  x.restore()
}
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
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 22
    x.save(); x.translate(right ? 96 - w : -96, -62 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -23, w, 46); x.fillStyle = INK; x.fillText(txt, 11, 2)
    x.restore()
  })
  x.restore()
}
/** a folded paper map with a dotted wandering route drawn up to p (0…1) and an X */
function map(x, t, cx, cy, k, p, { x2 = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -130, 340, 280)
  x.fillStyle = INK; x.fillRect(-176, -146, 352, 292)
  const C = ['#e8dcb5', '#d9cba0', '#e8dcb5', '#d9cba0']
  for (let i = 0; i < 4; i++) { x.fillStyle = C[i]; x.fillRect(-168 + i * 84, -138, 84, 276) }
  x.fillStyle = '#9bd08a'; x.fillRect(-140, -100, 90, 60); x.fillRect(40, 30, 100, 70)
  x.fillStyle = SKYB; x.fillRect(-60, 50, 80, 40)
  const N = 26
  for (let i = 0; i < N * p; i++) {
    const u = i / N, px = -130 + u * 250 + Math.sin(u * 14) * 40, py = 90 - u * 180 + Math.cos(u * 9) * 40
    x.fillStyle = RED; x.fillRect(px - 5, py - 5, 10, 10)
  }
  if (x2 && p >= 1) { x.fillStyle = RED; x.font = `800 56px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✕', 125, -95) }
  x.restore()
}
const BACKPACK = ['...KKKK...', '..K....K..', '.OOOOOOOO.', 'OOOOOOOOOO', 'OOyyyyyyOO', 'OOyOOOOyOO', 'OOyyyyyyOO', 'OOOOOOOOOO', '.OOOOOOOO.']
const PLUG = ['.K..K.', '.K..K.', 'WWWWWW', 'WWWWWW', '.WWWW.', '..KK..', '..KK..', '..KK..']
const CUP = ['.S.S..', '..S.S.', 'WWWWW.', 'WCCCWWW', 'WCCCW.W', 'WCCCWWW', 'WWWWW..']
const SHOE = ['.SSSS.....', '.SWSS.....', '.SSSSSSS..', 'SSSSSSSSSS', 'KKKKKKKKKK']
const FLAG = ['KRRR', 'KRRR', 'K...', 'K...', 'K...']

const CAMEOS = [
  // 1 · no itinerary
  { sign: S, cap: 'No itinerary? | Wander *on purpose.*', mood: lt => lt < 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      map(x, t, 790, 860, R(t, P), clamp((lt - 0.4) / 1.4), { x2: false })
      L(x, 790, 1090, 'ROUTE: VIBES', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  // 2 · plans changed
  { sign: S, cap: 'Plans changed? | *New adventure.*', mood: lt => lt < 1.1 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 840, R(t, P), ['PLAN A', 'beach day'], { w: 280, bg: CREAM, size: 40, rot: -0.05 })
      const d = prog(lt, 0.6, 0.9)
      if (d > 0) { x.save(); x.fillStyle = RED; x.translate(790, 840); x.rotate(-0.05); x.fillRect(-120, -6, 240 * d, 12); x.restore() }
      L(x, 800, 1040, 'PLAN B: MUSEUM ✦', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 32)
    } },
  // 3 · got lost
  { sign: S, cap: 'Got lost? | Found *a great café.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CUP, { S: '#e6e1f2', W: CREAM, C: '#8a5a3a' }, 790, 880, 22 * R(t, P, 0.5))
      bubble(x, 790, 630, 'wrong turn, | right place.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  // 4 · rough time
  { sign: S, cap: 'Friends want a time? | Give them *a rough one.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 860, R(t, P), { head: 'THE GROUP', headCol: SKYB, lines: [['what time??', BONE, pill(t, P, 0.4)], ['7-ish ✦', MINT, pill(t, P, 1.0), true], ['perfect ♡', BONE, pill(t, P, 1.5)]] })
    } },
  // 5 · the whim
  { sign: S, cap: 'Booked on a whim? | *Pack the charger.*', mood: lt => lt < 1.3 ? 'sparkle' : 'wide', star: ST,
    front(x, t, lt, P) {
      drawBits(x, BACKPACK, { K: INK, O: ORANGE, y: '#c95f2a' }, 760, 900, 22 * R(t, P))
      drawBits(x, PLUG, { K: INK, W: '#ffffff' }, 900, 760, 14 * R(t, P, 1.2), { rot: 0.3 })
      L(x, 790, 1110, 'FUTURE YOU: THANKS', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  // 6 · running late
  { sign: S, cap: 'Running late? | Send *a heads-up.*', mood: lt => lt < 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, R(t, P), { head: 'BESTIE', headCol: PINK, lines: [['10 min late!', MINT, pill(t, P, 0.5), true], ['sorry ♡', MINT, pill(t, P, 0.7), true], ['all good!', BONE, pill(t, P, 1.4)], ['grab snacks', BONE, pill(t, P, 1.6)]] })
    } },
  // 7 · the match
  { sign: S, cap: 'Match wants a date? | *Just pick a day.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = R(t, P)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = BONE; x.fillRect(-162, -142, 324, 284)
        x.fillStyle = PINK; x.fillRect(-162, -142, 324, 54); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ANY DAY', 0, -114)
        for (let d = 0; d < 14; d++) { const c = d % 7, r = Math.floor(d / 7); x.fillStyle = '#b9b0a0'; x.fillRect(-150 + c * 43, -60 + r * 80, 34, 50) }
        if (lt > 1.0) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(-150 + 4 * 43 + 17, 20 + 25, 38, 0, Math.PI * 2); x.stroke() }
        x.restore()
      }
      hearts(x, t, 560, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 4 })
    } },
  // 8 · one tiny step
  { sign: S, cap: 'Big dream? | Take *one tiny step.*', mood: lt => lt < 1.2 ? 'neutral' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = R(t, P)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        x.fillStyle = INK; x.fillRect(620, 1010, 120, 90); x.fillStyle = GOLD; x.fillRect(628, 1018, 104, 82)
        x.restore()
        drawBits(x, FLAG, { K: INK, R: RED }, 920, 640, 16 * k)
        L(x, 920, 760, 'THE DREAM', k, LAV, 0.04, 28)
      }
      const p = ease.outBack(prog(lt, 0.8, 1.2))
      if (lt > 0.7) signChar(x, t, S, lerp(560, 680, clamp(p)), lerp(1060, 950, clamp(p)), 90, { mood: 'happy', seed: 22, glyph: false })
      L(x, 680, 1130, 'STEP ONE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 30)
    } },
  // 9 · a walk
  { sign: S, cap: 'Restless at home? | A walk *counts as travel.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P, F) {
      drawBits(x, SHOE, { S: SKYB, W: '#ffffff', K: INK }, 790, 900, 22 * R(t, P), { rot: -0.1 + 0.08 * Math.sin(t * 6) })
      L(x, 790, 700, 'TRIP: THE BLOCK', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 34)
      L(x, 790, 1080, 'PASSPORT: NOT NEEDED', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, -0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2a0493', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Sag, the plan | *can be loose.*',
  cameos: CAMEOS,
  group: { cap: 'Go with | *the flow.*', mood: 'sparkle' },
  lesson: { text: 'You don’t need every step. | Just *the next one.*', chip: 'PLAN: FLEXIBLE' },
  last: {
    text: 'Lost the map? | *Enjoy the view.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 7 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
