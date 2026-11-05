// kdye08: DATE YOURSELF, "No Itinerary" (21.7 s vertical, star_advice post, house · C, LOOP). Row: promo/films/month2/m16.md.
// Feeling: needing a plan for everything. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.0   FRAME 0: ♍ Virgo's spreadsheet mid-shred into confetti, Virgo mid-gasp. Glitch at 0.15.
//             Hook "Virgo. No itinerary. | Just *turn left.*" Stamp at 1.3.
//   3.0–8.4   STOP 1 coin flip at every corner: LEFT · RIGHT · LEFT.
//   8.4–13.4  STOP 2 lost (a little): a map full of question marks, one deep breath.
//  13.4–19.6  STOP 3 the bakery you'd never plan: a tiny warm window; Pisces cries at the pastries.
//  19.8–end   last line "The best part wasn't | *on the list.*", then a loop back to frame 0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, street, shadow, glow, drawBits,
  sparkles, hearts, bubble, label, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 21.7
const S1 = [3.0, 8.4], S2 = [8.4, 13.4], S3 = [13.4, 19.7]
const VIR = '#a8e07a'

function sheet(x, cx, cy, shred, t) {
  // a spreadsheet tearing into strips that fly apart
  const n = 8
  for (let i = 0; i < n; i++) {
    const p = shred, dx = (i - n / 2 + 0.5) * (46 + p * 60), dy = p * (120 + ((i * 53) % 90)) * (i % 2 ? 1 : -0.4)
    x.save(); x.translate(cx + dx, cy + dy); x.rotate(p * (i % 2 ? 0.5 : -0.4) * (1 + i * 0.1))
    box(x, -22, -170, 44, 340, BONE, { b: 3 })
    for (let j = 0; j < 9; j++) R(x, j % 3 ? '#c9e8c0' : '#9fd88a', -18, -160 + j * 37, 36, 30)
    x.restore()
  }
  for (let i = 0; i < 26; i++) { const a = i * 2.4, r = 160 + shred * 260 + (i % 5) * 30; R(x, [GOLD, PINK, '#7fd0ff', BONE][i % 4], cx + Math.cos(a + t) * r, cy + Math.sin(a + t) * r * 0.8, 12, 8) }
}
function coin(x, cx, cy, t0, t, face) {
  const u = t - t0
  if (u < 0 || u > 1.6) return
  const up = u < 0.7 ? Math.sin(Math.PI * u / 0.7) : 0
  const spin = u < 0.7 ? Math.abs(Math.cos(u * 18)) : 1
  const y = cy - up * 300
  x.save(); x.translate(cx, y); x.scale(1, Math.max(0.08, spin))
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 68, 0, Math.PI * 2); x.fill()
  x.restore()
  if (u > 0.7) label(x, face, cx, cy, { size: 40, col: INK, font: INTER, weight: 800, alpha: outK(t, [t0 + 1.4, t0 + 1.6]) })
}

function opener(x, t, S) {
  room(x, { wall: '#2c3a4e', wall2: '#283548', floor: '#1e2438', floorY: 1320, stripes: false })
  box(x, 140, 1060, 800, 36, '#6b4428', { b: 7 })
  sheet(x, 540, 760, 0.35 + 0.25 * clamp(t / 3), t * 0.3)
  label(x, 'ITINERARY.xls', 540, 520, { size: 34, col: '#9fd88a' })
  shadow(x, 540, 1330, 240)
  S.hero(x, t, { x: 540, y: 1130, s: 260, mood: 'wide', look: [0, -1], squash: -0.06 })
  S.pis(x, t, { x: 930, y: 1480, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}

function corners(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1160, sky: 'day', lamps: [120, 960], tint: '#3a3260' })
  const flips = [[0.4, 'LEFT'], [2.0, 'RIGHT'], [3.6, 'LEFT']]
  let dir = 0
  flips.forEach(([f, face]) => { coin(x, 540, 760, S.a + f, t, face); if (u > f + 0.8) dir = face === 'LEFT' ? -1 : 1 })
  const hx = 540 + dir * 120 * Math.sin(Math.PI * clamp(((u - 1.2) % 1.6) / 1.6))
  shadow(x, hx, 1300, 240)
  S.hero(x, t, { x: hx, y: 1100, s: 250, mood: u > 3.8 ? 'happy' : 'neutral', look: [dir, -0.6], hops: flips.map(([f]) => S.a + f + 0.8) })
}

function lost(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1160, sky: 'night', lamps: [160, 920], tint: '#2b2150' })
  // the paper map, full of question marks
  x.save(); x.translate(540, 700); x.rotate(-0.03)
  box(x, -300, -190, 600, 380, '#f4e8cc', { b: 7 })
  for (let i = 0; i < 6; i++) R(x, '#d8c8a0', -280 + i * 100, -180, 10, 360)
  for (let i = 0; i < 4; i++) R(x, '#d8c8a0', -290, -150 + i * 100, 580, 10)
  for (let i = 0; i < 7; i++) { const k = pop01(t, S.a + 0.3 + i * 0.18, 0.25, 2.4); if (k > 0.01) label(x, '?', -230 + ((i * 131) % 460), -110 + ((i * 89) % 220), { size: 54 * k, col: RED, font: INTER, weight: 800 }) }
  x.restore()
  label(x, 'YOU ARE HERE (?)', 540, 450, { size: 38, col: GOLD })
  const breathe = u > 2.4 ? 1 + 0.08 * Math.sin((u - 2.4) * 3) : 1
  S.hero(x, t, { x: 540, y: 1110, s: 250 * breathe, mood: u > 2.8 ? 'happy' : 'wide', look: u > 2.8 ? [0, 0] : [Math.sin(t * 4), -0.6] })
  if (u > 2.4 && u < 4.2) label(x, 'in… out…', 540, 1340, { size: 32, col: BONE, alpha: outK(t, [S.a + 3.9, S.a + 4.2]) })
}

function bakery(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1240, sky: 'night', lamps: [80], tint: '#2b2150' })
  // the tiny bakery front
  box(x, 200, 560, 680, 680, '#c46a4a', { b: 8 })
  for (let i = 0; i < 7; i++) R(x, i % 2 ? BONE : '#e8504a', 200 + i * 97, 560, 97, 70)
  box(x, 260, 700, 560, 300, '#ffe0a0', { b: 7 })
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 850, 520, '255,200,120', 0.35); x.restore()
  const P = ['..CCCC..', '.CHHHHC.', 'CHCHHCHC', 'CCCCCCCC']
  for (let i = 0; i < 4; i++) drawBits(x, P, { C: '#e0a050', H: '#ffd38a' }, 330 + i * 140, 930, 10)
  label(x, 'TINY BAKERY', 540, 1080, { size: 40, col: BONE, font: INTER, weight: 800 })
  S.hero(x, t, { x: 330, y: 1250, s: 220, mood: u > 0.8 ? 'heart' : 'wide', look: [0.6, -0.8], hops: [S.a + 0.8] })
  hearts(x, t, S.a + 0.9, 330, 1100, { n: 4 })
  S.pis(x, t, { x: 760, y: 1260, s: 160, mood: 'sparkle', look: [-0.4, -1] }, 3)
  bubble(x, t, 760, 1110, S.a + 1.6, S.b - 0.2, 'the CROISSANTS', { size: 28, col: '#c9ecfb', tail: 0 })
}

const EP = makeDate({
  id: 'kdye08', sign: 'virgo', name: 'Virgo', D, ending: 'loop',
  hook: 'Virgo. No itinerary. | Just *turn left.*', hookSize: 108, hookAccent: VIR,
  fx: [{ kind: 'glitch', o: { at: 0.15, len: 0.6, dialog: false, amp: 1 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: '*coin flip* at every corner', draw: corners,
      cues: [0.4, 2.0, 3.6].flatMap(f => [['whoosh', f, 0.3, 0.03], ['pluck', r3(f + 0.7), 1760, 0.03, 0.4, 0]]) },
    { a: S2[0], b: S2[1], sticker: '*lost* (a little)', draw: lost,
      cues: [['whoosh', 0.02, 0.4, 0.035], ...Array.from({ length: 7 }, (_, i) => ['pop', r3(0.3 + i * 0.18), 1318.51 - i * 60, 0.025, (i % 2) - 0.5]), ['riser', 2.4, 3.2, 0.015]] },
    { a: S3[0], b: S3[1], sticker: "the bakery you'd *never* plan", draw: bakery,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['bell', 0.5, 1760, 0.03, 1.0, 0], ['pluck', 0.9, 1174.66, 0.04, 0.5, -0.2], ['pop', 1.6, 880, 0.03, 0.3]] },
  ],
  lines: [
    { t: 3.7, who: 'stars', text: 'heads, left. tails, *also* left.' },
    { t: 6.0, who: 'hero', text: "that's not how coins *work!*" },
    { t: 9.0, who: 'hero', text: 'where even *am* I?' },
    { t: 11.2, who: 'stars', text: 'somewhere *new.* breathe.' },
    { t: 14.2, who: 'hero', text: "this place isn't on *any* list." },
    { t: 16.4, who: 'stars', text: "that's what makes it *yours.*" },
  ],
  boxes: [[3.5, 8.25, [0, 1]], [8.8, 13.25, [2, 3]], [14.0, 19.5, [4, 5]]],
  last: { t: 19.8, text: "The best part wasn't | *on the list.*", top: 300, size: 96, accent: VIR },
  cues: [],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MONO, sparkles, lerp, ease]
