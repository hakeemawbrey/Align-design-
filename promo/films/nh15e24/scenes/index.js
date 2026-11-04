// nh15e24: HOME FOR THE HOLIDAYS, "Where we're going next year." (43 s vertical, finale, Star Talk Season 15 ep 24,
// music: cinematic · D). Story 0–40.6, then the shared end card. The look lives in ../../nh15e13/scenes/holikit.js.
// The couples are the season's (episodes 1–12): Aries & Libra, Taurus & Sagittarius, Gemini & Aquarius, Cancer & Scorpio…
//   0.0–3.4    hook "Next year: | *whose* family?"  Aries mid-hop at a big wall calendar with two little houses pinned
//              on it, MINE and YOURS; Libra holds the pins.
//   3.4–8.6    "Plan 1: | *split the days.*"  Cancer & Scorpio: the calendar page tears neatly in two, EVE | DAY.
//   8.6–13.6   "Plan 2: | *take turns.*"  Taurus & Sagittarius: a sign flips THIS YEAR: YOURS → NEXT YEAR: MINE.
//   13.6       card cut. "Plan 3: | *one big table.*"  Gemini & Aquarius: a table that keeps getting longer.
//   18.8       "Plan 4: | *every family, one day.*"  Aries unrolls a map: twelve houses, the route tangles into a knot.
//   24.0       PISCES (crying, naturally): "can we just plan it *together?*"  ARIES: "…okay. one day at a *time.*"
//   29.1       ★ LESSON UNLOCKED "It's not *whose* home. | It's *our* plan."  +1 HOLIDAY TREATY
//   33.9       all twelve signs around a talk card, "Where should we spend next year?"  "Wherever we go, *we choose it.*"
import { makeEp, room, table, plate, candle, pie, tree, gift, tissues, rel, sign, pisces, theStars, sparkles, hearts, confetti, bubble, label, box, R, glow, talkCard, snow,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, drawPixelStar, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const ARI = 'aries', LIB = 'libra'
const AC = '#ff9a7a', LC = '#ffb3d0', PC = '#b9a6ff'
const LINES = [
  { t: 24.3, speaker: tagOf('pisces'), color: PC, text: 'can we just plan it *together?*' },
  { t: 26.0, speaker: tagOf(ARI), color: AC, text: '…okay. one day at a *time.*' },
]
const BOXES = [{ open: 24.1, close: 28.95, from: 0, to: 2 }]
const LESSON = { at: 29.1, out: [33.6, 33.9], text: "It's not *whose* home. | It's *our* plan.", chip: '+1 HOLIDAY TREATY' }
const ARI_HOPS = [-0.12, 0.5, 1.1, 1.7, 2.3, 19.0, 19.6, 20.4, ...talkHops(LINES, tagOf(ARI), { cps: CPS }), 34.1]

function house(x, cx, cy, s, col, lbl) {
  box(x, cx - s / 2, cy - s * 0.35, s, s * 0.7, col, { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - s * 0.62, cy - s * 0.3); x.lineTo(cx, cy - s * 0.85); x.lineTo(cx + s * 0.62, cy - s * 0.3); x.fill()
  x.fillStyle = '#e9ecff'; x.beginPath(); x.moveTo(cx - s * 0.5, cy - s * 0.34); x.lineTo(cx, cy - s * 0.76); x.lineTo(cx + s * 0.5, cy - s * 0.34); x.fill()
  R(x, '#ffd27a', cx - s * 0.12, cy - s * 0.1, s * 0.24, s * 0.3)
  if (lbl) label(x, lbl, cx, cy + s * 0.55, { size: 22, col: BONE })
}
function calendar(x, t, k = 1, o = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 760); x.scale(k, k); x.rotate(-0.02)
  const tear = o.tear ?? 0
  for (const side of [-1, 1]) {
    x.save(); x.translate(side * tear * 60, 0); x.rotate(side * tear * 0.08)
    x.beginPath(); x.rect(side < 0 ? -300 : 0, -230, 300, 460); x.clip()
    box(x, -280, -210, 560, 420, '#fffaf0', { b: 8 }); R(x, RED, -280, -210, 560, 70); label(x, 'NEXT YEAR', 0, -175, { size: 32, col: BONE })
    for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) R(x, 'rgba(27,18,54,0.12)', -260 + i * 76, -120 + j * 74, 66, 64)
    x.restore()
  }
  if (o.homes) { house(x, -130, 40, 120, '#3a7fd0', 'MINE'); house(x, 130, 40, 120, '#7c74f0', 'YOURS') }
  if (tear > 0.3) { label(x, 'EVE', -150 - tear * 60, 120, { size: 40, col: INK, shadow: false, font: "'Inter', sans-serif", weight: 800 }); label(x, 'DAY', 150 + tear * 60, 120, { size: 40, col: INK, shadow: false, font: "'Inter', sans-serif", weight: 800 }) }
  x.restore()
}
function flipSign(x, t, at) {
  const p = prog(t, at, at + 0.5), sc = Math.abs(Math.cos(Math.PI * p)), front = p < 0.5
  x.save(); x.translate(540, 760); x.scale(1, Math.max(0.02, sc))
  box(x, -300, -110, 600, 220, front ? '#f3ead8' : '#fff3a8', { b: 8 })
  label(x, front ? 'THIS YEAR:' : 'NEXT YEAR:', 0, -40, { size: 36, col: INK, shadow: false })
  label(x, front ? 'YOURS' : 'MINE', 0, 34, { size: 64, col: front ? '#7c74f0' : '#3a7fd0', shadow: false, font: "'Inter', sans-serif", weight: 800 })
  x.restore()
  R(x, INK, 532, 870, 16, 320)
}
function tangledMap(x, t, k, tangle) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 780); x.scale(k, k)
  box(x, -400, -260, 800, 520, '#efe2c0', { b: 8 }); R(x, 'rgba(120,80,40,0.15)', -400, -260, 800, 520)
  const H = Array.from({ length: 12 }, (_, i) => [-320 + (i % 4) * 210 + ((i * 37) % 40), -170 + Math.floor(i / 4) * 160 + ((i * 53) % 30)])
  x.strokeStyle = RED; x.lineWidth = 6; x.beginPath()
  const n = Math.round(lerp(3, 40, tangle))
  for (let s = 0; s < n; s++) { const a = H[(s * 5) % 12], b = H[(s * 7 + 3) % 12]; x.moveTo(a[0], a[1]); x.quadraticCurveTo((a[0] + b[0]) / 2 + Math.sin(s * 3) * 120, (a[1] + b[1]) / 2 + Math.cos(s * 2) * 90, b[0], b[1]) }
  x.stroke()
  H.forEach(([hx, hy], i) => house(x, hx, hy, 60, ['#3a7fd0', '#7c74f0', '#3fae6a', '#e8344e'][i % 4]))
  label(x, 'ALL 12 FAMILIES · ONE DAY', 0, 226, { size: 26, col: INK, shadow: false })
  x.restore()
}
function couple(x, t, a, b, o = {}) {
  sign(x, t, a, { x: o.ax ?? 330, y: o.y ?? 1180, s: o.s ?? 280, mood: o.am ?? 'happy', look: [1, 0], hops: o.ah })
  sign(x, t, b, { x: o.bx ?? 750, y: o.y ?? 1180, s: o.s ?? 280, mood: o.bm ?? 'happy', look: [-1, 0], hops: o.bh, scarf: o.bscarf })
}
function pisCorner(x, t, k = 2) { tissues(x, 950, 1380, 60); pisces(x, t, { x: 960, y: 1440, s: 120, look: [-1, -1] }, k) }
const ALL = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']

const shots = [
  { at: 0, cam: [1.1, 540, 980], draw(x, t) {
    room(x, t, { wall: '#3a3a6a', wains: '#282850', window: false, wreath: false })
    calendar(x, t, 1, { homes: true })
    couple(x, t, ARI, LIB, { am: 'sparkle', bm: 'happy', ah: ARI_HOPS, bh: [1.4] })
    pisCorner(x, t, 1)
  } },
  { at: 3.4, cam: [1.1, 540, 980], draw(x, t) {
    room(x, t, { wall: '#3a3a6a', wains: '#282850', window: false, wreath: false })
    calendar(x, t, 1, { tear: ease.inOutCubic(prog(t, 5.0, 5.8)) })
    couple(x, t, 'cancer', 'scorpio', { am: t > 5.8 ? 'happy' : 'neutral', bm: t > 5.8 ? 'happy' : 'squint', ah: [5.9, 7.0], bh: [6.1] })
    bubble(x, t, 540, 1000, 6.2, 8.5, 'eve at mine, day at yours?', { size: 30 })
    pisCorner(x, t, 1)
  } },
  { at: 8.6, cam: [1.1, 540, 980], draw(x, t) {
    room(x, t, { wall: '#3a3a6a', wains: '#282850', window: false, wreath: false })
    flipSign(x, t, 10.2)
    couple(x, t, 'taurus', 'sagittarius', { am: t > 10.7 ? 'sparkle' : 'neutral', bm: 'happy', ah: [10.8], bh: [10.9, 11.4] })
    pisCorner(x, t, 2)
  } },
  { at: 13.6, cam: [1.04, 540, 1000], draw(x, t) {
    room(x, t, { wall: '#5e3448', winX: 420, winY: 560, winW: 240, winH: 240, wreath: false })
    const w = lerp(700, 2400, ease.inOutCubic(prog(t, 14.2, 18.0)))
    const n = Math.floor(w / 140)
    for (let i = 0; i < n; i++) { const rx = 540 - w / 2 + 70 + i * 140; if (Math.abs(rx - 540) < 120) continue; rel(x, t, ['GRANDMA', 'UNCLE', 'AUNTIE', 'MOM', 'COUSIN', 'KID'][i % 6], { x: rx, y: 1050, s: 160, mood: 'happy', look: [0, 0], hops: [14.3 + i * 0.12] }) }
    sign(x, t, 'gemini', { x: 450, y: 1010, s: 220, mood: t > 16.5 ? 'wide' : 'sparkle', look: [1, 0] })
    sign(x, t, 'aquarius', { x: 630, y: 1010, s: 220, mood: t > 16.5 ? 'wide' : 'happy', look: [-1, 0] })
    table(x, 540, 1130, w, { legs: false })
    for (let i = 0; i < n; i++) plate(x, 540 - w / 2 + 70 + i * 140, 1122)
    bubble(x, t, 540, 760, 16.6, 18.7, '…how many chairs?', { size: 32 })
  } },
  { at: 18.8, cam: [1.1, 540, 1000], draw(x, t) {
    room(x, t, { wall: '#3a3a6a', wains: '#282850', window: false, wreath: false })
    tangledMap(x, t, pop01(t, 19.0, 0.4, 2), prog(t, 20.0, 22.5))
    couple(x, t, ARI, LIB, { am: t > 22.4 ? 'wide' : 'sparkle', bm: t > 21.0 ? 'wide' : 'happy', ah: ARI_HOPS, y: 1240 })
    pisCorner(x, t, t > 22.5 ? 3 : 2)
  } },
  { at: 24.0, cam: [1.16, 560, 1000], draw(x, t) {
    room(x, t, { wall: '#3a3a6a', wains: '#282850', winX: 420, winY: 560, winW: 240, winH: 240, wreath: false })
    sign(x, t, ARI, { x: 250, y: 1150, s: 250, mood: t > 26.0 ? 'happy' : 'neutral', look: [1, 0], hops: ARI_HOPS })
    sign(x, t, LIB, { x: 460, y: 1170, s: 220, mood: 'happy', look: [1, 0] })
    pisces(x, t, { x: 720, y: 1120, s: 270, look: [-1, 0], mood: 'sparkle', hops: talkHops(LINES, tagOf('pisces'), { cps: CPS }) }, 3)
    sign(x, t, 'capricorn', { x: 930, y: 1170, s: 220, mood: 'happy', look: [-1, 0] })
  } },
  { at: 28.95, flash: false, cam: [1.16, 560, 1000], draw(x, t) {
    room(x, t, { wall: '#3a3a6a', wains: '#282850', winX: 420, winY: 560, winW: 240, winH: 240, wreath: false })
    sign(x, t, ARI, { x: 250, y: 1150, s: 250, mood: 'happy', look: [1, 0] })
    sign(x, t, LIB, { x: 460, y: 1170, s: 220, mood: 'happy', look: [1, 0] })
    pisces(x, t, { x: 720, y: 1120, s: 270, look: [-1, 0], mood: 'happy' }, 3)
    sign(x, t, 'capricorn', { x: 930, y: 1170, s: 220, mood: 'happy', look: [-1, 0] })
  } },
  { at: 33.9, cam: [1.02, 540, 1000], draw(x, t) {
    room(x, t, { wall: '#3a3a6a', wains: '#282850', tree: true, treeX: 540, treeH: 380, window: false, wreath: false })
    snow(x, t, { n: 40, alpha: 0.5 })
    // all twelve, two rows around the card
    ALL.forEach((id, i) => {
      const row = i < 6 ? 0 : 1, col = i % 6
      const sx = 120 + col * 168 + (row ? 84 : 0) - (row ? 40 : 0), sy = row ? 1250 : 1050
      const k = pop01(t, 34.0 + i * 0.08, 0.3, 2.2)
      if (id === 'pisces') pisces(x, t, { x: sx, y: sy, s: 170, pop: k, look: [0, -1] }, 3)
      else sign(x, t, id, { x: sx, y: sy, s: 170, pop: k, mood: ['happy', 'sparkle', 'heart'][i % 3], look: [0, -1], hops: [34.4 + i * 0.1, 36.5 + (i % 4) * 0.2] })
    })
    talkCard(x, t, 540, 760, pop01(t, 34.6, 0.4, 2), 'Where should we spend next year?', { w: 560, h: 260 })
    confetti(x, t, 34.8, 540, 760)
    hearts(x, t, 35.2, 540, 1000, { n: 8 })
  } },
]
const CUTS = [8.6, { t: 13.6, kind: 'flip' }, 24.0]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 45,
  hook: { text: 'Next year: | *whose* family?', out: [3.2, 3.4], color: AC, size: 92, accentSize: 140 },
  heads: [
    { at: 3.55, out: [8.4, 8.6], text: 'Plan 1: | *split the days.*', color: '#cfd8ff' },
    { at: 8.75, out: [13.4, 13.6], text: 'Plan 2: | *take turns.*', color: '#9fe6b0' },
    { at: 13.75, out: [18.6, 18.8], text: 'Plan 3: | *one big table.*', color: '#ffe27a' },
    { at: 18.95, out: [23.8, 24.0], text: 'Plan 4: | *every family, one day.*', color: AC, accentSize: 104 },
  ],
  shots, lines: LINES, boxes: BOXES, lesson: LESSON,
  last: { at: 34.3, text: 'Wherever we go, | *we choose it.*', color: GOLD, top: 180, size: 90, accentSize: 140 },
  cuts: CUTS,
  pitch: { [tagOf('pisces')]: 987.77, [tagOf(ARI)]: 783.99 },
  cues: [
    ['tick', 5.0, 0.04], ['whoosh', 5.0, 0.8, 0.04], ['pop', 5.8, 1174.66, 0.04, 0],
    ['whoosh', 10.2, 0.5, 0.035], ['pop', 10.7, 1318.51, 0.045, 0],
    ...Array.from({ length: 10 }, (_, i) => ['pop', 14.3 + i * 0.38, 659.25 * (1 + (i % 5) * 0.12), 0.025, i % 2 ? 0.3 : -0.3]),
    ['whoosh', 19.0, 0.4, 0.04], ...Array.from({ length: 12 }, (_, i) => ['tick', 20.0 + i * 0.2, 0.03]), ['pop', 22.5, 440, 0.05, 0],
    ...Array.from({ length: 12 }, (_, i) => ['pop', 34.0 + i * 0.08, 587.33 * Math.pow(2, (i % 7) / 12), 0.025, 0]),
    ['glitter', 34.6, 35.4], ['bell', 34.9, 1760, 0.03, 1.4, 0],
  ],
})
