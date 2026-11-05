// kdye18: DATE YOURSELF, "Beginner on Purpose" (63.6 s vertical, LONG, star_advice post, synthwave · Bm). Row: month2/m16.md.
// Feeling: hating being bad at things. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
// Promise up front: "wait for attempt seven". An ATTEMPT counter and a BEST height marker track every try.
//   0.0–3.4   FRAME 0: ♈ Aries mid-fall off a climbing wall. Record scratch + freeze at 0.35 ("yep. *attempt one.*"),
//             a caught circle. Hook "Aries, beginner on purpose. | *Attempt one.*" Stamp at 1.9.
//   CH 1 THE WALL          3.4–18   attempts 1–3, each one a little higher, each ending on the mat (Pisces cries on the mat)
//   CH 2 THE TIP           18–30    a regular (♑) shares one kind tip: legs, not arms
//   CH 3 ATTEMPTS 4–6      30–47    higher every time, the height marker climbs
//   CH 4 ATTEMPT SEVEN     47–61.6  slow, legs, the top: DING, confetti, Pisces fountains
//   61.8–63.6  last line "Being bad at it | is *how it starts.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, shadow, glow, drawBits,
  sparkles, hearts, confetti, bubble, label, pop01, outK, r3, CORAL, SKYB, MINT,
} from '../../kdye01/props.js'

const D = 63.6
const ARI = '#ff6b5a'
const WALL_TOP = 470, MAT_Y = 1300
// attempts: [start, end (fall or top), peak 0..1]
const ATT = [[3.4, 7.2, 0.15], [7.8, 11.6, 0.25], [12.2, 16.0, 0.32], [30.4, 34.0, 0.5], [34.6, 39.0, 0.66], [39.6, 44.0, 0.8], [47.4, 56.5, 1.0]]
const TOP_T = 56.5
function climbY(t) {
  // returns { y, falling } for the hero on the wall, or null when on the mat
  for (const [a, b, pk] of ATT) {
    if (t < a || t > b + 0.6) continue
    const top = lerp(MAT_Y - 180, WALL_TOP + 120, pk)
    if (t <= b) { const p = ease.inOutQuad(prog(t, a + 0.3, b)); return { y: lerp(MAT_Y - 180, top, p) + 6 * Math.sin(t * 9), falling: false, pk } }
    if (pk >= 1) return { y: top, falling: false, pk }
    const f = ease.inQuad(prog(t, b, b + 0.45)); return { y: lerp(top, MAT_Y - 120, f), falling: true, pk }
  }
  if (t > TOP_T) return { y: WALL_TOP + 120, falling: false, pk: 1 }
  return null
}
function gym(x, t) {
  R(x, '#2a2448', 0, 0, 1080, 1920)
  // the wall
  box(x, 180, WALL_TOP - 40, 720, MAT_Y - WALL_TOP + 40, '#5a5488', { b: 8 })
  const cols = [CORAL, GOLD, MINT, SKYB, PINK, '#c9a6ff']
  for (let i = 0; i < 26; i++) { const hx = 230 + ((i * 197) % 620), hy = WALL_TOP + ((i * 131) % (MAT_Y - WALL_TOP - 60)); drawBits(x, ['.HH.', 'HHHH', '.HH.'], { H: cols[i % cols.length] }, hx, hy, 9) }
  // the top bell
  box(x, 500, WALL_TOP - 110, 80, 60, GOLD, { b: 6 }); R(x, INK, 536, WALL_TOP - 50, 8, 20)
  // the mat
  box(x, 120, MAT_Y, 840, 90, '#4f7cd8', { b: 7, hi: '#7fa0f0' })
  // attempt counter (top right)
  const n = ATT.filter(([a]) => t >= a).length
  if (n > 0 && t < 61.6) { box(x, 760, 300, 260, 70, INK, { b: 5 }); label(x, `ATTEMPT ${n}`, 890, 336, { size: 34, col: n === 7 ? GOLD : '#ff9a7a' }) }
  // height marker
  const c = climbY(t), best = Math.max(0, ...ATT.filter(([a]) => t > a).map(([, , pk]) => pk))
  if (best > 0) { const by = lerp(MAT_Y - 180, WALL_TOP + 120, best); R(x, GOLD, 900, by - 3, 80, 6); label(x, 'BEST', 950, by - 22, { size: 22, col: GOLD }) }
  return c
}
function heroOnWall(x, t, S, c, mood) {
  const F = S.hero(x, t, { x: 540, y: c.y, s: 220, mood: c.falling ? 'wide' : mood, look: c.falling ? [0, -1] : [0, -1], squash: c.falling ? -0.12 : 0 })
  return F
}
function thuds(x, t) { for (const [, b, pk] of ATT) { if (pk >= 1) continue; const u = t - b - 0.45; if (u > 0 && u < 0.6) label(x, 'THUD', 540, MAT_Y - 260, { size: 60, col: RED, font: INTER, weight: 800, alpha: 1 - u / 0.6, rot: -0.08 }) } }

function opener(x, t, S) {
  gym(x, t)
  S.hero(x, t, { x: 540, y: lerp(980, 1060, clamp(t / 0.35)), s: 230, mood: 'wide', look: [0, -1], squash: -0.14 })
  S.pis(x, t, { x: 860, y: MAT_Y - 30, s: 130, mood: 'wide', look: [-1, -1] }, 2)
}
function wall(x, t, S) {
  const c = gym(x, t)
  if (c) heroOnWall(x, t, S, c, 'squint'); else S.hero(x, t, { x: 540, y: MAT_Y - 100, s: 220, mood: 'happy', look: [0, -1] })
  thuds(x, t)
  S.pis(x, t, { x: 860, y: MAT_Y - 30, s: 130, mood: 'sparkle', look: [-1, -1] }, 3)
}
function tip(x, t, S) {
  const { u } = S
  gym(x, t)
  S.hero(x, t, { x: 380, y: MAT_Y - 90, s: 220, mood: u > 4.6 ? 'sparkle' : 'neutral', look: [1, -0.2], hops: [S.a + 4.6] })
  // the regular demonstrates: legs push, not arms
  const k = Math.sin(t * 3)
  S.npc(x, t, { sign: 'capricorn', x: 700, y: MAT_Y - 220 - 60 * Math.max(0, k), s: 190, mood: 'happy', look: [-1, 0] })
  if (u > 1.2 && u < 7) label(x, 'LEGS ↑', 700, MAT_Y - 470, { size: 44, col: MINT, font: INTER, weight: 800 })
  S.pis(x, t, { x: 900, y: MAT_Y - 30, s: 120, mood: 'happy', look: [-1, -1] }, 2)
}
function midAttempts(x, t, S) {
  const c = gym(x, t)
  if (c) heroOnWall(x, t, S, c, 'sparkle'); else S.hero(x, t, { x: 540, y: MAT_Y - 100, s: 220, mood: 'happy', look: [0, -1] })
  thuds(x, t)
  S.pis(x, t, { x: 860, y: MAT_Y - 30, s: 130, mood: 'sparkle', look: [-1, -1] }, 3)
}
function seventh(x, t, S) {
  const c = gym(x, t)
  const top = t > TOP_T
  if (c) heroOnWall(x, t, S, c, top ? 'heart' : 'squint')
  if (top) {
    const dk = t - TOP_T
    if (dk < 1.2) label(x, 'DING!', 800, WALL_TOP + 40, { size: 70, col: GOLD, font: INTER, weight: 800, rot: 0.1 * Math.sin(dk * 20) })
    confetti(x, t, TOP_T, 540, WALL_TOP); sparkles(x, t, 540, WALL_TOP - 80, TOP_T, 14, 200, 1)
    hearts(x, t, TOP_T + 0.3, 540, WALL_TOP + 40, { n: 6 })
  }
  S.npc(x, t, { sign: 'capricorn', x: 220, y: MAT_Y - 60, s: 140, mood: top ? 'happy' : 'neutral', look: [1, -1], hops: top ? [TOP_T + 0.2] : [] })
  S.pis(x, t, { x: 860, y: MAT_Y - 30, s: 140, mood: top ? 'happy' : 'sparkle', look: [-1, -1], hops: top ? [TOP_T + 0.25] : [] }, 3)
}

const HUD = { at: 3.4, out: [61.2, 61.6], title: 'BOULDERING · BEGINNER%', start: 3.4, color: '#ff9a7a',
  splits: ATT.slice(0, 6).map(([, b], i) => ({ at: b, name: `attempt ${i + 1}`, best: false })).concat([{ at: TOP_T, name: 'attempt 7 · TOP' }]) }

const EP = makeDate({
  id: 'kdye18', sign: 'aries', name: 'Aries', D, ending: 'cut',
  hook: 'Aries, beginner on purpose. | *Attempt one.*', hookSize: 96, hookAccent: '#ff9a7a',
  stampAt: 1.9, stampTop: 1500,
  fx: [
    { kind: 'scratch', o: { at: 0.35, len: 1.2, caption: 'yep. *attempt one.*', top: 1620 } },
    { kind: 'caught', o: { at: 0.45, x: 540, y: 1000, r: 170, out: [1.45, 1.55], label: null, arrow: null } },
  ],
  promise: { text: 'wait for *attempt seven.*', at: 3.6, out: [9.4, 9.7], top: 1180 },
  chapters: [
    { at: 3.4, out: [17.6, 18.0], n: 1, title: 'THE WALL' },
    { at: 18.0, out: [29.6, 30.0], n: 2, title: 'THE TIP' },
    { at: 30.0, out: [46.6, 47.0], n: 3, title: 'ATTEMPTS 4–6' },
    { at: 47.0, out: [61.2, 61.6], n: 4, title: 'ATTEMPT SEVEN' },
  ],
  opener,
  stops: [
    { a: 3.4, b: 18.0, draw: wall, cues: [] },
    { a: 18.0, b: 30.0, draw: tip, cues: [['pop', 1.2, 880, 0.04, 0.3], ['pluck', 4.6, 1174.66, 0.04, 0.5, -0.3]] },
    { a: 30.0, b: 47.0, draw: midAttempts, cues: [] },
    { a: 47.0, b: 63.6, draw: seventh, cues: [['riser', 5.0, 9.5, 0.015], ['bell', 9.5, 1760, 0.06, 1.6, 0], ['bell', 9.55, 2349.32, 0.04, 1.6, 0], ['glitter', 9.5, 10.3]] },
  ],
  lines: [
    { t: 4.0, who: 'stars', text: 'first time? *perfect.*' },
    { t: 8.4, who: 'hero', text: "I'm usually *good* at things!" },
    { t: 12.8, who: 'stars', text: "you're good at *trying.* again." },
    { t: 18.8, who: '♑︎ A REGULAR', text: 'legs, not arms. *push* up.' },
    { t: 22.6, who: 'hero', text: "…oh. that's *actually* helpful." },
    { t: 26.0, who: 'stars', text: 'asking is a *skill* too.' },
    { t: 30.8, who: 'hero', text: 'higher! still *falling!*' },
    { t: 35.4, who: 'stars', text: 'look how *far* you got.' },
    { t: 40.2, who: 'hero', text: 'attempt six. *legs.* legs.' },
    { t: 44.4, who: 'stars', text: 'rest. then the *seventh.*' },
    { t: 48.2, who: 'stars', text: 'slow. breathe. *legs.*' },
    { t: 52.0, who: 'hero', text: "don't look down. *don't*—" },
    { t: 57.0, who: 'hero', text: "I'M AT THE *TOP!*" },
  ],
  boxes: [[3.8, 17.4, [0, 1, 2]], [18.6, 29.6, [3, 4, 5]], [30.6, 46.6, [6, 7, 8, 9]], [47.8, 61.2, [10, 11, 12]]],
  last: { t: 61.8, text: 'Being bad at it | is *how it starts.*', top: 300, size: 96, accent: '#ff9a7a' },
  cues: [
    ['boom', 0.0, 0.15],
    ...ATT.filter(([, , pk]) => pk < 1).flatMap(([a, b]) => [['whoosh', a, 0.3, 0.025], ['whoosh', b, 0.3, 0.04], ['tom', r3(b + 0.45), 80, { gain: 0.3, decay: 0.3 }], ['boom', r3(b + 0.45), 0.15]]),
    ['whoosh', 47.4, 0.3, 0.025],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, MONO, shadow, glow, bubble, pop01, outK]
