// nh15e19: HOME FOR THE HOLIDAYS, "Cooking together." (28 s vertical, Star Talk Season 15 ep 19, music: dreamy · F)
// Story 0–25.6, then the shared end card. The season's look lives in ../../nh15e13/scenes/holikit.js.
//   0.0–3.0    hook "Two cooks. *One* spoon."  Taurus and Cancer (Taurus's date) both gripping one wooden spoon over the pot.
//   3.0–7.4    "Taurus | *tastes everything.*"  Taste, taste, taste. "needs more… everything."
//   7.4–11.6   "Cancer follows | *the card.*"  Grandma's recipe card, a measuring cup, then a soft flour puff over both.
//   11.6       card cut. "Both talk | *at once.*"  Bubbles pile up: "more salt!" "the card says—" "trust me!"
//              GRANDMA taps the card: "read the *last* line, dears."  … "a pinch of PATIENCE."
//   16.4       "Split | *the jobs.*"  Taurus mashes, Cancer stirs. THE STARS: "share the kitchen. split the *jobs.*"
//   20.6       two spoons, one taste; Pisces cries into the steam. "Stir it *together.*"
import { makeEp, room, candle, mug, tissues, rel, sign, pisces, theStars, sparkles, hearts, bubble, label, box, R, glow,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const TAU = 'taurus', CAN = 'cancer'
const TC = '#9fe6b0', CC = '#cfd8ff'
const LINES = [
  { t: 13.9, speaker: '✦ GRANDMA', color: '#d8c6f2', text: 'read the *last* line, dears.' },
  { t: 17.0, speaker: 'THE STARS', text: 'share the kitchen. split the *jobs.*' },
]
const BOXES = [{ open: 13.7, close: 16.35, from: 0, to: 1 }, { open: 16.8, close: 20.45, from: 1, to: 2 }]
const PUFF = 10.0

function kitchen(x, t) {
  room(x, t, { wall: '#3d5a52', wains: '#2a423c', floor: '#6a5a4a', window: true, winX: 640, winY: 560, winW: 260, winH: 240, wreath: false, lights: true, lightsY: 470 })
  // tiles + counter + stove
  for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) R(x, (i + j) % 2 ? '#e8efe9' : '#d6e2da', i * 90, 860 + j * 60, 88, 58)
  box(x, 0, 1100, 1080, 40, '#c9a06a', { b: 6, hi: '#e2bd88' }); R(x, '#8a6a4a', 0, 1146, 1080, 300)
  for (let i = 0; i < 4; i++) box(x, 40 + i * 260, 1180, 220, 220, '#9a7a5a', { b: 5 })
  box(x, 330, 1060, 420, 40, '#3a3a4a', { b: 6 })
  for (const bx of [420, 660]) { R(x, INK, bx - 44, 1052, 88, 10); glow(x, bx, 1060, 80, 0.2, '255,120,60') }
}
function pot(x, t, cx = 540, by = 1060, level = 1) {
  box(x, cx - 130, by - 150, 260, 150, '#7a7f9a', { b: 7, hi: '#9aa0bb' }); R(x, INK, cx - 160, by - 120, 30, 14); R(x, INK, cx + 130, by - 120, 30, 14)
  R(x, '#e08a3a', cx - 122, by - 146 + (1 - level) * 40, 244, 18)
  for (let i = 0; i < 4; i++) { const ph = ((t * 0.5 + i / 4) % 1); x.save(); x.globalAlpha = 0.55 * (1 - ph); R(x, '#ffffff', cx - 80 + i * 50 + Math.sin(t * 2 + i) * 12, by - 190 - ph * 220, 14, 34); x.restore() }
}
function spoon(x, cx, cy, rot, len = 300) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -10, -len, 20, len); R(x, '#c9905a', -6, -len + 4, 12, len - 8)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 6, 30, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9905a'; x.beginPath(); x.ellipse(0, 6, 22, 32, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
function recipe(x, t, k, cx, cy, { hi = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  box(x, -180, -120, 360, 240, '#fff6dc', { b: 6 }); R(x, '#e8a0a0', -180, -84, 360, 4)
  label(x, "GRANDMA'S STEW", 0, -100, { size: 24, col: '#a0522d', shadow: false })
  ;['2 cups of stock', '1 big spoon of love', 'stir slowly'].forEach((l, i) => label(x, l, -160, -50 + i * 40, { size: 22, col: INK, align: 'left', shadow: false }))
  if (hi > 0) { x.save(); x.globalAlpha = 0.6 * hi; R(x, '#fff07a', -166, 54, 332, 40); x.restore() }
  label(x, hi > 0 ? 'a pinch of PATIENCE' : 'a pinch of ……', -160, 74, { size: 24, col: '#a0522d', align: 'left', shadow: false })
  x.restore()
}
function cooks(x, t, o = {}) {
  sign(x, t, TAU, { x: o.tx ?? 240, y: 920, s: 290, mood: o.tm ?? 'happy', look: o.tl ?? [1, 0], hops: o.th, squash: o.tsq ?? 0 })
  sign(x, t, CAN, { x: o.cx ?? 840, y: 920, s: 290, mood: o.cm ?? 'happy', look: o.cl ?? [-1, 0], hops: o.ch, scarf: RED, squash: o.csq ?? 0 })
}
function pisDoor(x, t, k = 2) { tissues(x, 980, 1040, 60); pisces(x, t, { x: 990, y: 1090, s: 120, look: [-1, -1] }, k) }

const shots = [
  { at: 0, cam: [1.18, 540, 980], draw(x, t) {
    kitchen(x, t); pot(x, t)
    const tug = Math.sin(t * 7) * 30
    cooks(x, t, { tx: 340 + tug * 0.3, cx: 740 + tug * 0.3, tm: 'squint', cm: 'squint', th: [-0.1, 0.9, 1.9], ch: [0.4, 1.4, 2.4], tsq: 0.04, csq: 0.04 })
    spoon(x, 540 + tug, 990, 0.25 * Math.sin(t * 7), 360)
    pisDoor(x, t, 1)
  } },
  { at: 3.0, cam: [1.18, 540, 980], draw(x, t) {
    kitchen(x, t); pot(x, t, 540, 1060, lerp(1, 0.6, prog(t, 3.0, 7.4)))
    const sips = [3.5, 4.6, 5.7], last = sips.filter(s => t >= s).pop() ?? -9, up = Math.sin(Math.PI * clamp((t - last) / 0.7, 0, 1))
    cooks(x, t, { tm: up > 0.3 ? 'heart' : 'happy', cm: t > 5.6 ? 'squint' : 'neutral', th: sips.map(s => s + 0.3), tl: [1, 1] })
    spoon(x, lerp(470, 360, up), lerp(990, 830, up), lerp(0.4, -0.3, up), 240)
    bubble(x, t, 300, 640, 6.3, 7.35, 'needs more… everything.', { size: 30, tail: -0.2 })
    pisDoor(x, t, 1)
  } },
  { at: 7.4, cam: [1.18, 540, 980], draw(x, t) {
    kitchen(x, t); pot(x, t, 540, 1060, 0.6)
    cooks(x, t, { tm: t > PUFF ? 'wide' : 'neutral', cm: t > PUFF ? 'wide' : 'squint', cl: [-1, 1], th: [PUFF + 0.05], ch: [PUFF + 0.1] })
    recipe(x, t, pop01(t, 7.6, 0.35, 2.2), 780, 650)
    // the measuring cup + the flour puff (a soft cloud, not a bang)
    box(x, 640, 960, 70, 70, '#cfe6ff', { b: 5 }); R(x, '#ffffff', 646, 990, 58, 34)
    const pk = prog(t, PUFF, PUFF + 1.4)
    if (pk > 0 && pk < 1) { x.save(); x.globalAlpha = 0.85 * (1 - ease.inQuad(pk)); for (let i = 0; i < 26; i++) { const a = i * 2.4, r = 40 + ease.outCubic(pk) * (160 + (i % 5) * 40); R(x, '#fbfbff', 540 + Math.cos(a) * r - 18, 860 + Math.sin(a) * r * 0.6 - 18, 36, 36) } x.restore() }
    pisDoor(x, t, 2)
  } },
  { at: 11.6, cam: [1.18, 540, 980], draw(x, t) {
    kitchen(x, t); pot(x, t, 540, 1060, 0.6)
    cooks(x, t, { tm: t > 15.0 ? 'neutral' : 'squint', cm: t > 15.0 ? 'neutral' : 'squint', th: [11.8, 12.5, 13.2], ch: [12.1, 12.8, 13.5] })
    bubble(x, t, 260, 640, 11.8, 13.7, 'more salt!', { size: 32, tail: -0.2 })
    bubble(x, t, 820, 600, 12.2, 13.7, 'the card says—', { size: 32, tail: 0.2 })
    bubble(x, t, 300, 740, 12.7, 13.7, 'trust me!', { size: 32, col: '#d9f5df', tail: -0.2 })
    bubble(x, t, 780, 700, 13.1, 13.7, 'the CARD—', { size: 32, col: '#e0e6ff', tail: 0.2 })
    rel(x, t, 'GRANDMA', { x: 540, y: 780, s: 200, pop: pop01(t, 13.6, 0.35, 2.2), mood: 'happy', look: [0, 0], hops: [13.9, 14.5] })
    recipe(x, t, pop01(t, 14.9, 0.35, 2.2) * 1.05, 540, 1000, { hi: prog(t, 15.3, 15.7) })
    pisDoor(x, t, 2)
  } },
  { at: 16.4, cam: [1.18, 540, 980], draw(x, t) {
    kitchen(x, t); pot(x, t, 640, 1060, 0.8)
    // Taurus mashes in a bowl on the left; Cancer stirs the pot
    const m = Math.abs(Math.sin(t * 6))
    sign(x, t, TAU, { x: 180, y: 920, s: 260, mood: 'happy', look: [1, 1], squash: 0.05 * m })
    box(x, 280, 1000, 220, 70, '#f3ead8', { b: 6 }); R(x, '#f2e0a0', 290, 1002, 200, 18)
    x.save(); x.translate(390, 980 - m * 40); R(x, INK, -60, -10, 120, 16); R(x, '#9aa0bb', -56, -6, 112, 8); R(x, INK, -8, -140, 16, 130); R(x, '#c9905a', -4, -136, 8, 122); x.restore()
    sign(x, t, CAN, { x: 860, y: 920, s: 260, mood: 'happy', look: [-1, 1], scarf: RED })
    spoon(x, 640 + Math.cos(t * 4) * 50, 960, -0.5 + Math.sin(t * 4) * 0.2, 260)
    theStars(x, t, { x: 540, y: 600 + 6 * Math.sin(t * 2), s: 120, pop: pop01(t, 16.7, 0.34, 2.2), mood: 'happy', look: [0, 1], hops: [17.0, 17.7, 18.6] })
    pisDoor(x, t, 2)
  } },
  { at: 20.6, cam: [1.18, 540, 980], draw(x, t) {
    kitchen(x, t); pot(x, t, 540, 1060, 0.85)
    const up = ease.inOutCubic(prog(t, 20.9, 21.5))
    cooks(x, t, { tx: 340, cx: 740, tm: t > 21.5 ? 'heart' : 'happy', cm: t > 21.5 ? 'heart' : 'happy', th: [21.6, 23.0], ch: [21.65, 23.1] })
    spoon(x, lerp(480, 420, up), lerp(1000, 860, up), lerp(0.3, -0.2, up), 220)
    spoon(x, lerp(600, 660, up), lerp(1000, 860, up), lerp(-0.3, 0.2, up), 220)
    hearts(x, t, 21.6, 540, 800, { n: 6 })
    pisces(x, t, { x: 990, y: 1090, s: 150, look: [-1, -1] }, 3); tissues(x, 960, 1040, 60)
  } },
]
const CUTS = [7.4, { t: 11.6, kind: 'flip' }, 20.6]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 30,
  hook: { text: 'Two cooks. | *One* spoon.', out: [2.8, 3.0], color: '#ffb36b', size: 94, accentSize: 146 },
  heads: [
    { at: 3.15, out: [7.2, 7.4], text: 'Taurus | *tastes everything.*', color: TC },
    { at: 7.55, out: [11.4, 11.6], text: 'Cancer follows | *the card.*', color: CC },
    { at: 11.75, out: [16.2, 16.4], text: 'Both talk | *at once.*', color: '#ffb36b' },
    { at: 16.55, out: [20.4, 20.6], text: 'Split | *the jobs.*', color: TC },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 20.9, text: 'Stir it *together.*', color: '#ffb36b' },
  cuts: CUTS,
  pitch: { '✦ GRANDMA': 659.25 },
  cues: [
    ...[3.5, 4.6, 5.7].flatMap(s => [['pop', s + 0.35, 1318.51, 0.035, -0.3], ['pluck', s + 0.45, 1567.98, 0.025, 0.4, -0.3]]),
    ['whoosh', PUFF, 0.8, 0.04], ['glitter', PUFF, PUFF + 0.9],
    ...[11.8, 12.2, 12.7, 13.1].map((s, i) => ['pop', s, [880, 987.77, 1174.66, 1318.51][i], 0.04, i % 2 ? 0.3 : -0.3]),
    ['pop', 15.0, 987.77, 0.04, 0], ['bell', 15.4, 1760, 0.03, 1.0, 0],
    ...Array.from({ length: 8 }, (_, i) => ['tick', 16.6 + i * 0.52, 0.025]),
    ['pop', 21.55, 1174.66, 0.04, 0], ['glitter', 21.6, 22.1],
  ],
})
