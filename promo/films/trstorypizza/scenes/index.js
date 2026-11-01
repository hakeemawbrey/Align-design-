// trstorypizza: STORYTIME: HOW WE MET, "We argued about pizza toppings for an hour." (45 s vertical, Star Talk Trends
// §19.3, music: cinematic · F#m). Story 0–40.6, then the shared end card. The format look lives in ./story.js (identical
// in all five STORYTIME films). ♉ Taurus tells it from the couch; ♓ Pisces cries on the other end. Rewatch bait: the
// framed photo is a single slice of pizza, and there's a stack of pizza boxes on the windowsill.
//   0.0–5.6    "We argued about pizza | for *an hour.*"  "first date. one pizza. *one hour.*"
//   5.6–13.9   FLASHBACK, FIRST DATE · 7:02 PM. "Pineapple? | *Absolutely not.*"  A café, one pizza. Taurus:
//              "pineapple? absolutely not." ♈ Aries: "absolutely YES." Napkin diagrams: CRUST IS SACRED vs PINEAPPLE
//              = JOY. The wall clock spins to 8:00; ♍ Virgo the waiter stacks chairs: "we're closed. since 8."
//   13.9–18.4  "Best fight | *ever.*"  "I've never laughed that *hard.*"
//  18.38       card cut.
//   18.4–27.8  FLASHBACK, 8:04 PM. "The | *compromise.*"  A new box: HALF + HALF. Aries glances at the moon; a pineapple
//              slice drifts toward Taurus… Aries: "I SAW that." Taurus: "…it's good, ok?" Both crack up.
//   27.8–33.4  "Every Friday | *since.*"  Aries pops onto the couch with the box: "every Friday. their half is *bigger.*"
//   33.4       LESSON UNLOCKED: "Playful disagreement | is *chemistry.*"  +1 SLICE (CONTESTED)
//   37.95      "*Half* and half."
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, drawCafe, pop01, outK, r3,
  GOLD, BONE, PINK, INK, MONO, INTER, FR,
} from './story.js'

const ACC = '#ff7a59'
const TAU = { x: 300, y: 1020, s: 240 }, ARI = { x: 780, y: 1020, s: 240 }

// ── a pixel pizza seen from the front (an ellipse of cells): crust ring, cheese, pepperoni; pine = pineapple on the right half
function pizza(x, t, cx, cy, w, { pine = false, missing = 0, cell = 12 } = {}) {
  const rx = w / 2, ry = w * 0.3
  const nI = Math.ceil(rx / cell), nJ = Math.ceil(ry / cell)
  for (let j = -nJ; j <= nJ; j++) for (let i = -nI; i <= nI; i++) {
    const u = (i * cell) / rx, v = (j * cell) / ry, d = u * u + v * v
    if (d > 1) continue
    // a missing slice: the wedge on the right half
    if (missing > 0 && i > 0 && Math.abs(Math.atan2(v, u)) < 0.5) continue
    let col = '#ffd36b'
    if (d > 0.72) col = '#c9873e'
    else if ((i * 7 + j * 13) % 11 === 0) col = '#d8393c'
    else if (pine && i > 0 && (i * 5 + j * 3) % 4 === 0) col = '#fff9c8'
    else if ((i + j) % 5 === 0) col = '#ffe49a'
    x.fillStyle = col; x.fillRect(cx + i * cell - cell / 2, cy + j * cell - cell / 2, cell + 0.5, cell + 0.5)
  }
  if (pine) { x.fillStyle = INK; x.fillRect(cx - 3, cy - ry, 6, ry * 2) }
}
const SLICE = ['CCCCCCC', '.YPYRY.', '.YYYYY.', '..RYP..', '..YYY..', '...Y...']
const drawSlice = (x, cx, cy, cell, rot = 0) => drawBits(x, SLICE, { C: '#c9873e', Y: '#ffd36b', R: '#d8393c', P: '#ffef5a' }, cx, cy, cell, { rot })
function napkin(x, cx, cy, text, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-124, -104, 248, 208)
  x.fillStyle = '#ffffff'; x.fillRect(-118, -98, 236, 196)
  x.fillStyle = 'rgba(0,0,0,0.06)'; x.fillRect(0, -98, 3, 196); x.fillRect(-118, 0, 236, 3)
  x.fillStyle = '#2c2a7a'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  text.split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, (i - (a.length - 1) / 2) * 40 - 26))
  // the diagram: a tiny pie with an arrow
  x.fillStyle = '#d8393c'; x.beginPath(); x.moveTo(-30, 58); x.arc(-30, 58, 30, 0, Math.PI * 1.5); x.fill()
  x.strokeStyle = '#2c2a7a'; x.lineWidth = 5; x.beginPath(); x.arc(-30, 58, 30, 0, Math.PI * 2); x.stroke()
  x.beginPath(); x.moveTo(14, 58); x.lineTo(70, 40); x.stroke()
  x.restore()
}
function wallClock(x, cx, cy, hours) {
  for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j); if (d < 5.5) { x.fillStyle = d > 4.5 ? INK : '#f4e8cc'; x.fillRect(cx + i * 12 - 6, cy + j * 12 - 6, 12, 12) } }
  const ha = (hours / 12) * Math.PI * 2 - Math.PI / 2, ma = (hours % 1) * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'square'
  x.lineWidth = 9; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ha) * 30, cy + Math.sin(ha) * 30); x.stroke()
  x.lineWidth = 6; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ma) * 46, cy + Math.sin(ma) * 46); x.stroke()
}
function table(x) {
  x.fillStyle = INK; x.fillRect(FR.x, 1120, FR.w, 12)
  x.fillStyle = '#2f6f5a'; x.fillRect(FR.x, 1130, FR.w, 170)
  x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(FR.x, 1130, FR.w, 14)
  x.fillStyle = 'rgba(255,255,255,0.07)'; for (let i = 0; i < FR.w; i += 60) for (let j = 0; j < 170; j += 60) if (((i + j) / 60) % 2 === 0) x.fillRect(FR.x + i, 1144 + j, 60, 60)
}
const CHAIR = ['BBBB', 'B...', 'B...', 'BBBB', 'B..B', 'B..B']

// ── flashback 1: the argument
const F1 = { tau: 0.6, ari: 2.3, nap: [4.1, 6.3], close: 6.3, virgo: 6.5 }
function flash1(x, t, lt) {
  drawCafe(x, t, FR, { lamps: [0.82], wall: '#4a3020', wall2: '#2e1c14' })
  wallClock(x, 200, 640, 7 + 2 / 60 + clamp(prog(lt, 1.0, F1.close)) * (58 / 60) + (lt > F1.close ? (lt - F1.close) * 0.01 : 0))
  // closing time: Virgo the waiter stacks chairs at the back
  if (lt > F1.virgo) {
    const k = pop01(lt, F1.virgo, 0.3, 2)
    for (let i = 0; i < 3; i++) drawBits(x, CHAIR, { B: '#8a6a4a' }, 975, 870 - i * 50 - (lt > F1.virgo + 0.4 + i * 0.3 ? 0 : 400), 10, { alpha: lt > F1.virgo + 0.4 + i * 0.3 ? 1 : 0 })
    signChar(x, t, 'virgo', 880, 790, 150, { mood: 'squint', look: [-1, 0.5], pop: k, seed: 12, hops: [5.6 + F1.virgo + 0.4, 5.6 + F1.virgo + 0.7, 5.6 + F1.virgo + 1.0] })
    bubble(x, 700, 620, "we're closed. | since 8.", pop01(lt, F1.virgo + 0.5, 0.3, 2.2), { size: 32, tail: 'br', col: '#e8f5c8' })
  }
  const nap = lt > F1.nap[0] && lt < F1.nap[1]
  signChar(x, t, 'taurus', TAU.x, TAU.y, TAU.s, { mood: lt > F1.ari && lt < F1.nap[0] ? 'wide' : nap ? 'squint' : 'neutral', look: [1, 0], seed: 4, hops: [5.6 + F1.tau, 5.6 + F1.nap[0], 5.6 + F1.nap[0] + 0.3] })
  signChar(x, t, 'aries', ARI.x, ARI.y, ARI.s, { mood: nap ? 'wink' : 'sparkle', look: [-1, 0], seed: 8, hops: [5.6 + F1.ari, 5.6 + F1.ari + 0.25, 5.6 + F1.ari + 0.5, 5.6 + F1.nap[0] + 0.15] })
  table(x)
  pizza(x, t, 540, 1170, 300)
  bubble(x, TAU.x + 20, 830, 'pineapple? | absolutely not.', pop01(lt, F1.tau, 0.3, 2.2) * outK(lt, [F1.nap[0] - 0.2, F1.nap[0]]), { size: 34, tail: 'bl' })
  bubble(x, ARI.x - 10, 830, 'absolutely | YES.', pop01(lt, F1.ari, 0.3, 2.6) * outK(lt, [F1.nap[0] - 0.2, F1.nap[0]]), { size: 40, tail: 'br', col: '#ffd0c0' })
  const nk = k => pop01(lt, F1.nap[0] + k, 0.3, 2.2) * outK(lt, [F1.nap[1] - 0.2, F1.nap[1]])
  napkin(x, 250, 760, 'CRUST IS | SACRED', nk(0), -0.12)
  napkin(x, 830, 760, 'PINEAPPLE | = JOY', nk(0.3), 0.1)
  // lights dim at closing
  if (lt > F1.close) { x.fillStyle = `rgba(8,4,20,${(0.35 * clamp(prog(lt, F1.close, F1.close + 0.6))).toFixed(3)})`; x.fillRect(FR.x, FR.y, FR.w, FR.h) }
}

// ── flashback 2: the compromise
const F2 = { box: 0.5, lid: [0.9, 1.3], away: [2.6, 5.0], slice: [3.3, 4.7], saw: 5.0, ok: 6.3, laugh: 7.4 }
function flash2(x, t, lt) {
  drawCafe(x, t, FR, { lamps: [0.82], wall: '#4a3020', wall2: '#2e1c14' })
  wallClock(x, 200, 640, 8 + 4 / 60 + lt / 60)
  const away = lt > F2.away[0] && lt < F2.away[1]
  const laugh = lt > F2.laugh
  signChar(x, t, 'taurus', TAU.x, TAU.y, TAU.s, { mood: laugh ? 'happy' : lt > F2.saw ? 'wide' : lt > F2.slice[0] ? 'squint' : 'neutral', look: lt > F2.slice[0] && lt < F2.saw ? [1, 0] : [1, 0], seed: 4, hops: [18.378 + F2.ok, 18.378 + F2.laugh, 18.378 + F2.laugh + 0.3, 18.378 + F2.laugh + 0.6] })
  signChar(x, t, 'aries', ARI.x, ARI.y, ARI.s, { mood: laugh ? 'happy' : lt > F2.saw ? 'wide' : away ? 'sparkle' : 'happy', look: away ? [1, -1] : [-1, 0], seed: 8, hops: [18.378 + F2.saw, 18.378 + F2.laugh + 0.15, 18.378 + F2.laugh + 0.45, 18.378 + F2.laugh + 0.75] })
  table(x)
  // the box lands, the lid swings up
  const bk = ease.outBack(prog(lt, F2.box - 0.3, F2.box))
  const by = lerp(700, 1170, bk)
  if (lt > F2.box - 0.3) {
    const lid = ease.inOutCubic(prog(lt, ...F2.lid))
    const lh = 110 * lid
    x.fillStyle = INK; x.fillRect(540 - 166, by - 30 - lh - 6, 332, lh + 12)
    x.fillStyle = '#e8d2a8'; x.fillRect(540 - 160, by - 30 - lh, 320, lh)
    if (lid > 0.6) { x.fillStyle = ACC; x.font = `800 ${Math.round(40 * lid)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HALF + HALF', 540, by - 30 - lh / 2) }
    x.fillStyle = INK; x.fillRect(540 - 176, by - 34, 352, 110)
    x.fillStyle = '#d9bf8f'; x.fillRect(540 - 170, by - 28, 340, 98)
    pizza(x, t, 540, by + 6, 290, { pine: true, missing: lt > F2.slice[0] ? 1 : 0, cell: 11 })
  }
  // the sneaky slice
  if (lt > F2.slice[0]) {
    const p = ease.inOutCubic(prog(lt, ...F2.slice))
    drawSlice(x, lerp(640, TAU.x + 110, p), lerp(1150, 1060, p) - Math.sin(Math.PI * p) * 60, 11, lerp(0, -0.6, p))
  }
  bubble(x, ARI.x - 10, 820, 'I SAW that.', pop01(lt, F2.saw, 0.3, 2.6), { size: 40, tail: 'br', col: '#ffd0c0' })
  bubble(x, TAU.x + 20, 820, "…it's good, ok?", pop01(lt, F2.ok, 0.3, 2.2), { size: 36, tail: 'bl' })
  if (laugh) { label(x, 540, 660, 'HA HA HA', pop01(lt, F2.laugh, 0.3, 2.6), { size: 44, bg: GOLD, rot: -0.05 + 0.04 * Math.sin(lt * 20) }); hearts(x, t, 540, 1000, 18.378 + F2.laugh + 0.3, { n: 6, life: 1.6, spread: 500, cell: 7, seed: 4 }) }
}

// room: a stack of pizza boxes on the windowsill; the framed photo: one slice
function room(x) {
  for (let i = 0; i < 4; i++) {
    const y = 770 - i * 26, ox = (i % 2 ? 6 : -4)
    x.fillStyle = INK; x.fillRect(150 + ox, y - 4, 200, 30); x.fillStyle = i % 2 ? '#e8d2a8' : '#d9bf8f'; x.fillRect(154 + ox, y, 192, 22)
    x.fillStyle = ACC; x.fillRect(240 + ox, y + 6, 20, 10)
  }
}
function photo(x, cx, cy, w, h) {
  x.fillStyle = '#3a2440'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  drawSlice(x, cx, cy, 20, 0.1)
}

const F = makeFilm({
  id: 'trstorypizza', key: 'F#m', seed: 1903, accent: ACC,
  narrator: 'taurus', partner: 'aries',
  heads: [
    'We argued about pizza | for *an hour.*',
    'Pineapple? | *Absolutely not.*',
    'Best fight | *ever.*',
    'The | *compromise.*',
    'Every Friday | *since.*',
  ],
  stamps: [null, 'FIRST DATE · 7:02 PM', null, 'FIRST DATE · 8:04 PM', null],
  lines: [
    { t: 1.2, text: 'first date. one pizza. *one hour.*' },
    { t: 6.0, text: 'pineapple. they said *yes.*' },
    { t: 9.8, text: 'we argued until *closing.*' },
    { t: 14.3, text: "I've never laughed that *hard.*" },
    { t: 19.0, text: 'so we *compromised.*' },
    { t: 23.6, text: 'then I *tried* their half.' },
    { t: 28.75, text: 'every Friday. their half is *bigger.*' },
  ],
  mood(t) {
    if (t < 3.0) return { mood: 'happy' }
    if (t < 5.6) return { mood: 'squint' }
    if (t < 9.8) return { mood: 'eyeroll' }
    if (t < 13.93) return { mood: 'happy', look: [-1, -0.4] }
    if (t < 18.38) return { mood: 'sparkle' }
    if (t < 23.6) return { mood: 'happy', look: [-1, -0.4] }
    if (t < 27.82) return { mood: 'wink' }
    if (t < 30.3) return { mood: 'happy', look: [1, 0] }
    if (t < 37.95) return { mood: 'squint', look: [1, 0] }
    return { mood: 'heart' }
  },
  partnerIn: 28.3,
  partnerMood: t => (t < 30.3 ? { mood: 'happy', look: [-1, 0] } : { mood: 'wink' }),
  room, photo,
  flash: [flash1, flash2],
  talk(x, t, K) {
    if (!K.pF) return
    // the Friday box, held in front of Aries; the lid line is wobbly
    const bx = K.pF.x + 20, by = K.pF.cy + 90
    x.fillStyle = INK; x.fillRect(bx - 106, by - 34, 212, 72); x.fillStyle = '#e8d2a8'; x.fillRect(bx - 100, by - 28, 200, 60)
    x.fillStyle = INK; x.fillRect(bx - 4 + 4 * Math.sin(by * 0.1), by - 28, 8, 60)
    x.fillStyle = ACC; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('½   ½', bx, by + 2)
  },
  lesson: { text: 'Playful disagreement | is *chemistry.*', chip: '+1 SLICE (CONTESTED)' },
  last: { text: '*Half* and half.' },
  music: { breakdown: [13.933], hits: [27.822] },
  cues: [
    ['pop', r3(5.6 + F1.tau), 659.25, 0.04, -0.3], ['pop', r3(5.6 + F1.ari), 1318.51, 0.05, 0.3], ['pop', r3(5.6 + F1.ari + 0.1), 1567.98, 0.04, 0.3],
    ['whoosh', r3(5.6 + F1.nap[0]), 0.3, 0.03], ['tick', r3(5.6 + F1.nap[0] + 0.1), 0.04], ['tick', r3(5.6 + F1.nap[0] + 0.4), 0.04],
    ...Array.from({ length: 12 }, (_, i) => ['tick', r3(5.6 + 1.0 + i * 0.44), 0.015]),
    ['bell', r3(5.6 + F1.close), 880, 0.03, 1.2, -0.4],
    ['pop', r3(5.6 + F1.virgo), 987.77, 0.035, 0.4], ...[0.4, 0.7, 1.0].map(d => ['tick', r3(5.6 + F1.virgo + d), 0.05]),
    ['whoosh', r3(18.378 + F2.box - 0.3), 0.3, 0.035], ['tom', r3(18.378 + F2.box), 110, { gain: 0.2, decay: 0.2 }], ['tick', r3(18.378 + F2.lid[1]), 0.04],
    ['riser', r3(18.378 + F2.slice[0]), r3(18.378 + F2.slice[1]), 0.015],
    ['pop', r3(18.378 + F2.saw), 1318.51, 0.05, 0.3], ['pop', r3(18.378 + F2.ok), 783.99, 0.04, -0.3],
    ...[0, 0.15, 0.3, 0.45].map((d, i) => ['pop', r3(18.378 + F2.laugh + d), [880, 987.77, 1174.66, 1318.51][i], 0.035, 0]),
  ],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const T = F.T
export const LINES = F.LINES
