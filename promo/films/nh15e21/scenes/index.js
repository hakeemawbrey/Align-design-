// nh15e21: HOME FOR THE HOLIDAYS, "The call to a friend who stayed in town." (28 s vertical, Star Talk Season 15 ep 21,
// music: lofi · Cm). Story 0–25.6, then the shared end card. The look lives in ../../nh15e13/scenes/holikit.js.
// A split screen (a generic video call, no real app chrome): top, Virgo on the family's snowy porch; bottom, Aquarius at
// home in the city with a very small tree.
//   0.0–3.0    hook "Calling the friend who | *stayed in town.*"  Virgo mid-wave, phone up; Aquarius picks up.
//   3.0–7.6    "“How’s the | *city?*”"  AQUARIUS: "it's quiet. i made a one-person *feast.*"  (one plate, one candle)
//   7.6–12.4   "Virgo turns | *the camera.*"  The whole family crowds in: HI!!  Aquarius sparkles.
//   12.4       card cut. "Grandma | *insists.*"  Grandma's face fills the screen. GRANDMA: "are you eating enough, *dear?*"
//   16.8       VIRGO: "we're doing our own holiday when i'm *back.*"  THE STARS: "check on the ones who *stayed.*"
//   22.0       Virgo covers a plate and labels it AQUA ♡; Aquarius hugs its phone; Pisces fountains. "Save them a *plate.*"
import { makeEp, room, tree, table, plate, candle, street, snow, rel, sign, pisces, theStars, sparkles, hearts, bubble, label, box, R, glow, tissues, stringLights,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const VIR = 'virgo', AQU = 'aquarius'
const VC = '#ff9ad0', AQC = '#7fe3ff'
const LINES = [
  { t: 3.4, speaker: tagOf(AQU), color: AQC, text: "it's quiet. i made a one-person *feast.*" },
  { t: 13.5, speaker: '✦ GRANDMA', color: '#d8c6f2', text: 'are you eating enough, *dear?*' },
  { t: 17.0, speaker: tagOf(VIR), color: VC, text: "we're doing our own holiday when i'm *back.*" },
  { t: 19.7, speaker: 'THE STARS', text: 'check on the ones who *stayed.*' },
]
const BY = 1612
const BOXES = [{ open: 3.2, close: 7.4, from: 0, to: 1, y: BY, h: 250 }, { open: 13.3, close: 16.6, from: 1, to: 2, y: BY, h: 250 }, { open: 16.8, close: 21.85, from: 2, to: 4, y: BY, h: 250 }]
const TOP = [40, 330, 1000, 640], BOT = [40, 1000, 1000, 600]       // panel x, y, w, h
const VIR_HOPS = [-0.1, 0.5, 1.1, 7.8, 8.4, ...talkHops(LINES, tagOf(VIR), { cps: CPS }), 22.3]
const AQ_HOPS = [0.9, ...talkHops(LINES, tagOf(AQU), { cps: CPS }), 8.6, 9.1, 14.9, 22.4, 23.0]

function panel(x, t, [px, py, pw, ph], fn, { tag = '', col = BONE } = {}) {
  box(x, px, py, pw, ph, '#0c0a1c', { b: 8 })
  x.save(); x.beginPath(); x.rect(px, py, pw, ph); x.clip(); x.translate(px, py); fn(x, pw, ph); x.restore()
  if (tag) { box(x, px + 22, py + 22, 18 + tag.length * 15, 40, 'rgba(12,8,30,0.85)', { b: 3 }); label(x, tag, px + 34, py + 43, { size: 22, col, align: 'left' }) }
  // call timer
  const s = Math.floor(t + 243), mm = String(Math.floor(s / 60)).padStart(2, '0'), ss = String(s % 60).padStart(2, '0')
  if (tag) label(x, `● ${mm}:${ss}`, px + pw - 30, py + 43, { size: 22, col: '#ff8080', align: 'right' })
}
function porch(x, t, w, h, o = {}) {
  // a snowy porch at night, the warm window behind
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#141a44'); g.addColorStop(1, '#2a2f6a'); x.fillStyle = g; x.fillRect(0, 0, w, h)
  box(x, 0, 120, w, h, '#5a3a4a', { b: 0 }); for (let i = 0; i < w; i += 60) R(x, 'rgba(0,0,0,0.15)', i, 120, 6, h)
  glow(x, 240, 290, 220, 0.4, '255,200,120'); box(x, 120, 200, 240, 190, '#ffd27a', { b: 7 }); R(x, '#c98a3a', 236, 200, 8, 190); R(x, '#c98a3a', 120, 292, 240, 8)
  stringLights(x, t, 0, 130, w, 130, { sag: 20, n: 10 })
  R(x, '#e9ecff', 0, h - 110, w, 110); R(x, '#c7cdea', 0, h - 110, w, 10)
  snow(x, t, { n: 30, x0: 0, x1: w, y0: 0, y1: h, speed: 40 })
  if (o.family) {
    const k = o.family
    rel(x, t, 'UNCLE', { x: 520, y: 410, s: 200, pop: pop01(t, 8.0, 0.3, 2.2) * k, mood: 'happy', look: [0, 0], hops: [8.2, 8.8, 9.4] })
    rel(x, t, 'AUNTIE', { x: 740, y: 400, s: 190, pop: pop01(t, 8.2, 0.3, 2.2) * k, mood: 'happy', look: [0, 0], hops: [8.4, 9.0, 9.6] })
    rel(x, t, 'KID', { x: 620, y: 470, s: 140, pop: pop01(t, 8.4, 0.3, 2.2) * k, mood: 'sparkle', hops: [8.6, 9.2, 9.8, 10.4] })
    rel(x, t, 'GRANDMA', { x: 880, y: 430, s: 180, pop: pop01(t, 8.6, 0.3, 2.2) * k, mood: 'happy', look: [-1, 0], hops: [8.8, 9.4] })
  }
  sign(x, t, VIR, { x: o.vx ?? 300, y: 430, s: o.vs ?? 250, mood: o.vm ?? 'happy', look: o.vl ?? [0, 0], hops: VIR_HOPS, scarf: '#3fae6a' })
  if (o.phone !== false) { box(x, (o.vx ?? 300) + 120, 330, 70, 120, '#1d1830', { b: 5 }); R(x, AQC, (o.vx ?? 300) + 128, 342, 54, 90) }
  pisces(x, t, { x: w - 80, y: h - 130, s: 110, look: [-1, -1] }, o.pt ?? 1)
}
function apartment(x, t, w, h, o = {}) {
  R(x, '#2c3c5e', 0, 0, w, h); for (let i = 0; i < w; i += 80) R(x, 'rgba(255,255,255,0.04)', i, 0, 36, h)
  // the city window
  box(x, 620, 60, 320, 260, '#0c1236', { b: 7 })
  for (let i = 0; i < 7; i++) { const bh = 80 + (i * 53) % 140; R(x, '#1c2450', 630 + i * 44, 320 - bh, 40, bh); for (let j = 0; j < 4; j++) if ((i + j) % 2) R(x, '#ffd27a', 640 + i * 44, 330 - bh + j * 30, 8, 10) }
  snow(x, t, { n: 12, x0: 620, x1: 940, y0: 60, y1: 320, speed: 30 })
  R(x, '#5a3a2a', 0, h - 150, w, 150)
  // the very small tree
  tree(x, t, 860, h - 130, 200)
  // one-person feast: one plate, one candle, a tiny table
  box(x, 260, h - 220, 280, 26, '#c9a06a', { b: 6 }); box(x, 270, h - 190, 18, 80, '#8a6a4a', { b: 4 }); box(x, 510, h - 190, 18, 80, '#8a6a4a', { b: 4 })
  plate(x, 360, h - 230); candle(x, t, 470, h - 222, 50, GOLD)
  sign(x, t, AQU, { x: o.ax ?? 200, y: h - 290, s: o.as ?? 240, mood: o.am ?? 'neutral', look: o.al ?? [0, 0], hops: AQ_HOPS })
  if (o.hug) { box(x, (o.ax ?? 200) + 110, h - 360, 80, 120, '#1d1830', { b: 5 }); R(x, VC, (o.ax ?? 200) + 118, h - 350, 64, 100) }
}
function split(x, t, top = {}, bot = {}) {
  R(x, '#07051a', 0, 0, 1080, 1920)
  panel(x, t, TOP, (c, w, h) => porch(c, t, w, h, top), { tag: 'VIRGO · ON THE PORCH', col: VC })
  panel(x, t, BOT, (c, w, h) => apartment(c, t, w, h, bot), { tag: 'AQUARIUS · IN THE CITY', col: AQC })
}
const shots = [
  { at: 0, draw(x, t) { split(x, t, { vm: 'sparkle' }, { am: t > 1.0 ? 'happy' : 'wide' }); bubble(x, t, 340, 600, -1, 3.0, 'pick up pick up', { size: 30 }) } },
  { at: 3.0, draw(x, t) { split(x, t, { vm: 'happy' }, { am: 'happy', al: [1, 0] }) } },
  { at: 7.6, draw(x, t) {
    split(x, t, { vm: 'sparkle', family: 1, vx: 200, vs: 220 }, { am: t > 8.6 ? 'sparkle' : 'wide' })
    bubble(x, t, 640, 540, 8.4, 12.3, 'HI!!', { size: 44, col: '#fff3a8' })
    hearts(x, t, 9.0, 240, 1300, { n: 5 })
  } },
  { at: 12.4, draw(x, t) {
    split(x, t, { vm: 'happy', phone: false, vx: 160, vs: 200, pt: 2 }, { am: t > 14.8 ? 'happy' : 'neutral' })
    // Grandma's face fills the top screen
    x.save(); x.beginPath(); x.rect(...TOP); x.clip()
    rel(x, t, 'GRANDMA', { x: 600, y: 760, s: 680, pop: pop01(t, 12.55, 0.35, 2), mood: t > 15.6 ? 'happy' : 'squint', look: [0, 0], hops: [13.5, 14.1, 14.8] })
    x.restore()
    bubble(x, t, 540, 1260, 14.9, 16.6, 'ha! yes, grandma.', { size: 32, col: '#d9f6ff' })
  } },
  { at: 16.8, draw(x, t) {
    split(x, t, { vm: 'happy' }, { am: t > 18.6 ? 'sparkle' : 'happy' })
    theStars(x, t, { x: 880, y: 1150 + 6 * Math.sin(t * 2), s: 110, pop: pop01(t, 19.5, 0.34, 2.2), mood: 'happy', look: [-1, 0], hops: [19.7, 20.4] })
  } },
  { at: 22.0, draw(x, t) {
    split(x, t, { vm: 'heart', phone: false, pt: 3 }, { am: 'heart', hug: true, ax: 220 })
    // the saved plate, on the porch rail
    const pk = pop01(t, 22.3, 0.35, 2.2)
    if (pk > 0.01) { x.save(); x.translate(700, 800); x.scale(pk, pk); box(x, -110, -16, 220, 30, '#ffffff', { b: 6 }); x.fillStyle = INK; x.beginPath(); x.arc(0, -16, 96, Math.PI, 0); x.fill(); x.fillStyle = '#c9d6f0'; x.beginPath(); x.arc(0, -16, 88, Math.PI, 0); x.fill(); R(x, '#ffffff', -50, -80, 30, 12)
      box(x, -70, 26, 140, 44, BONE, { b: 4 }); label(x, 'AQUA ♡', 0, 48, { size: 24, col: INK, shadow: false }); x.restore() }
    hearts(x, t, 22.6, 260, 1300, { n: 6 })
    sparkles(x, t, 700, 780, 22.6, 10, 140, 1)
  } },
]
const CUTS = [7.6, { t: 12.4, kind: 'flip' }, 22.0]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 30,
  hook: { text: 'Calling the friend who | *stayed in town.*', out: [2.8, 3.0], color: AQC, size: 70, accentSize: 116, top: 120 },
  heads: [
    { at: 3.15, out: [7.4, 7.6], text: '“How’s the | *city?*”', color: AQC, top: 120, size: 70, accentSize: 108 },
    { at: 7.75, out: [12.2, 12.4], text: 'Virgo turns | *the camera.*', color: VC, top: 120, size: 70, accentSize: 108 },
    { at: 12.55, out: [16.6, 16.8], text: 'Grandma | *insists.*', color: '#d8c6f2', top: 120, size: 70, accentSize: 108 },
    { at: 16.95, out: [21.8, 22.0], text: 'Virgo makes | *a plan.*', color: VC, top: 120, size: 70, accentSize: 108 },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 22.3, text: 'Save them a *plate.*', color: AQC, top: 130, size: 84, accentSize: 130 },
  cuts: CUTS,
  pitch: { [tagOf(AQU)]: 987.77, [tagOf(VIR)]: 659.25, '✦ GRANDMA': 739.99 },
  cues: [
    ['pluck', 0.3, 1318.51, 0.03, 0.4, 0], ['pluck', 0.6, 1567.98, 0.03, 0.4, 0], ['pop', 1.0, 1174.66, 0.04, 0],
    ...[8.0, 8.2, 8.4, 8.6].map((t, i) => ['pop', t, [880, 987.77, 1174.66, 1318.51][i], 0.04, 0]), ['glitter', 8.6, 9.2],
    ['whoosh', 12.5, 0.3, 0.035], ['pop', 12.6, 739.99, 0.045, 0],
    ['pop', 19.55, 739.99, 0.03, 0.4],
    ['pop', 22.35, 1174.66, 0.045, 0], ['glitter', 22.6, 23.1],
  ],
})
