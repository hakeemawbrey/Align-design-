// nh15e17: HOME FOR THE HOLIDAYS, "The gift you forgot." (28 s vertical, Star Talk Season 15 ep 17, music: lofi · Am)
// Story 0–25.6, then the shared end card. The season's look lives in ../../nh15e13/scenes/holikit.js.
//   0.0–3.0    hook "Everyone brought a gift. | *Except you.*"  Aquarius frozen, empty-handed, before a pile of wrapped
//              boxes; Cancer (Aquarius's date) holds a perfect one. Grandma's floor lamp wobbles in the corner.
//   3.0–7.6    "Plan A: wrap | a *spoon.*"  A spoon-shaped present. Grandma tilts her head.
//   7.6–11.8   "Plan B: | a *pinecone.*"  With a bow. The lamp wobbles harder.
//   11.8       card cut. "Plan C: | *the truth.*"  CANCER: "just tell them. it's okay."
//              AQUARIUS: "i forgot. but i can fix the *wobbly lamp.*"
//   17.6       "Fixed. | *Right now.*"  Two turns and the lamp stands straight and glows; a coupon pops: ONE FIXED THING,
//              ANY TIME. THE STARS: "a gift is *attention*, not an object."
//   21.0       Grandma hugs the coupon; Pisces fountains. "Give them your *time.*"
import { makeEp, room, tree, gift, tissues, rel, sign, pisces, theStars, sparkles, hearts, bubble, label, box, R, glow,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const AQU = 'aquarius', CAN = 'cancer'
const AQC = '#7fe3ff', CC = '#cfd8ff'
const LINES = [
  { t: 11.95, speaker: tagOf(CAN), color: CC, text: "just tell them. it's *okay.*" },
  { t: 13.85, speaker: tagOf(AQU), color: AQC, text: 'i forgot. but i can fix the *wobbly lamp.*' },
  { t: 18.0, speaker: 'THE STARS', text: 'a gift is *attention*, not an object.' },
]
const BOXES = [{ open: 11.75, close: 17.4, from: 0, to: 2 }, { open: 17.8, close: 20.85, from: 2, to: 3 }]
const AQ_HOPS = [-0.1, 3.2, 4.4, 7.8, 8.9, ...talkHops(LINES, tagOf(AQU), { cps: CPS }), 17.75, 18.6, 21.2]
const FIX = 18.6

function lamp(x, t) {
  const fixed = prog(t, FIX - 0.4, FIX)
  const wob = (1 - fixed) * (t < 7.6 ? 0.08 : 0.16) * Math.sin(t * 5)
  x.save(); x.translate(880, 1290); x.rotate(wob + (1 - fixed) * 0.12)
  box(x, -60, -16, 120, 16, '#5a3420', { b: 6 }); R(x, INK, -8, -560, 16, 548); R(x, '#c9a06a', -4, -556, 8, 540)
  const on = fixed > 0.9 ? 1 : 0.35 + 0.25 * Math.max(0, Math.sin(t * 13))
  glow(x, 0, -610, 240, 0.4 * on, '255,214,140')
  x.fillStyle = INK; x.beginPath(); x.moveTo(-104, -560); x.lineTo(104, -560); x.lineTo(70, -680); x.lineTo(-70, -680); x.fill()
  x.fillStyle = fixed > 0.9 ? '#ffe6a8' : '#e9cf9a'; x.beginPath(); x.moveTo(-94, -566); x.lineTo(94, -566); x.lineTo(64, -674); x.lineTo(-64, -674); x.fill()
  x.restore()
}
function set(x, t) {
  room(x, t, { wall: '#2f4a5e', wains: '#203646', tree: true, treeX: 300, treeH: 470, winX: 520, winY: 580, winW: 240, winH: 250, wreath: false })
  const pile = [[180, 1300, 120, 90, RED], [300, 1310, 100, 110, '#3a7fd0'], [420, 1300, 130, 80, '#3fae6a'], [250, 1210, 90, 70, GOLD], [380, 1220, 80, 60, PINK]]
  pile.forEach(([cx, b, w, h, c], i) => gift(x, cx, b, w, h, c, i % 2 ? BONE : GOLD))
  lamp(x, t)
}
function cast(x, t, o = {}) {
  rel(x, t, 'GRANDMA', { x: 870, y: 1150, s: 220, mood: o.gm ?? 'neutral', look: [-1, 0], hops: [0.5, FIX + 0.2, FIX + 0.6, 21.3] })
  sign(x, t, CAN, { x: 380, y: 1060, s: 230, scarf: RED, mood: o.cm ?? 'happy', look: [1, 0], hops: [1.0, 12.0, 21.1] })
  sign(x, t, AQU, { x: o.ax ?? 620, y: 1080, s: 300, mood: o.am ?? 'wide', look: o.alook ?? [0, 0], hops: AQ_HOPS, blink: o.blink })
  tissues(x, 900, 1330, 60); pisces(x, t, { x: 940, y: 1380, s: 110, look: [-1, -1] }, o.pt ?? 1)
}
function spoonGift(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(640, 820); x.rotate(-0.5 + 0.05 * Math.sin(t * 4)); x.scale(k, k)
  box(x, -16, -20, 32, 200, '#ff8fb1', { b: 6 }); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -60, 54, 72, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ff8fb1'; x.beginPath(); x.ellipse(0, -60, 46, 64, 0, 0, Math.PI * 2); x.fill()
  R(x, GOLD, -46, -70, 92, 12); R(x, GOLD, -6, -124, 12, 300); x.restore()
}
function coneGift(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(640, 820); x.rotate(0.1 * Math.sin(t * 3)); x.scale(k, k)
  for (let j = 0; j < 6; j++) { const w = 40 + j * 16; for (let i = 0; i < 3; i++) box(x, -w / 2 + i * w / 3, -90 + j * 30, w / 3 - 4, 24, j % 2 ? '#8a5a2a' : '#a8743e', { b: 4 }) }
  R(x, INK, -44, -134, 88, 40); R(x, RED, -40, -130, 32, 32); R(x, RED, 8, -130, 32, 32); R(x, '#ff6b7f', -8, -124, 16, 20)
  x.restore()
}
function coupon(x, t, k, cx = 540, cy = 760, rot = -0.05) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot + 0.02 * Math.sin(t * 2)); x.scale(k, k)
  box(x, -240, -110, 480, 220, '#fff3c8', { b: 8 }); R(x, '#e8c46a', -224, -94, 448, 6); R(x, '#e8c46a', -224, 88, 448, 6)
  for (let i = 0; i < 9; i++) R(x, INK, -246, -96 + i * 22, 10, 10)
  label(x, 'COUPON', 0, -56, { size: 30, col: '#b5651d', shadow: false })
  x.font = `800 40px Inter, sans-serif`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('ONE FIXED THING,', 0, 6); x.fillText('ANY TIME.', 0, 54)
  x.restore()
}
const shots = [
  { at: 0, cam: [1.26, 580, 1010], draw(x, t) { set(x, t); cast(x, t, { am: 'wide', blink: false }); gift(x, 400, 1210, 120, 96, '#7c74f0', GOLD, { rot: 0.08 }) } },
  { at: 3.0, cam: [1.26, 580, 1010], draw(x, t) { set(x, t); cast(x, t, { am: 'sparkle', gm: t > 5.2 ? 'squint' : 'neutral', alook: [0, -1] }); spoonGift(x, t, pop01(t, 3.6, 0.35, 2.3)); bubble(x, t, 880, 840, 5.3, 7.5, '…a spoon?', { size: 32, col: '#ece0ff', tail: 0.2 }) } },
  { at: 7.6, cam: [1.26, 580, 1010], draw(x, t) { set(x, t); cast(x, t, { am: 'happy', gm: 'squint', pt: 2, alook: [0, -1] }); coneGift(x, t, pop01(t, 8.1, 0.35, 2.3)); bubble(x, t, 380, 840, 9.4, 11.7, 'aw, babe…', { size: 32, tail: 0 }) } },
  { at: 11.8, cam: [1.2, 520, 1060], draw(x, t) { set(x, t); cast(x, t, { am: t > 15.4 ? 'sparkle' : 'neutral', cm: 'happy', gm: t > 15.6 ? 'happy' : 'neutral', alook: t < 13.8 ? [-1, 0] : [1, 0] }) } },
  { at: 17.6, cam: [1.14, 600, 1060], draw(x, t) {
    set(x, t)
    cast(x, t, { ax: lerp(620, 760, ease.inOutCubic(prog(t, 17.6, 18.0))), am: t > FIX ? 'happy' : 'squint', gm: t > FIX ? 'heart' : 'wide', alook: [1, -1], pt: 3 })
    // a screwdriver turning at the lamp's base
    if (t < FIX + 0.2) { x.save(); x.translate(860, 1240); x.rotate(Math.sin(t * 16) * 0.4); R(x, INK, -8, -80, 16, 80); R(x, '#9a9ab0', -4, -76, 8, 72); box(x, -14, 0, 28, 60, GOLD, { b: 5 }); x.restore() }
    sparkles(x, t, 880, 640, FIX, 14, 160, 1)
    coupon(x, t, pop01(t, FIX + 0.6, 0.35, 2.2), 470, 760)
    theStars(x, t, { x: 180, y: 560 + 6 * Math.sin(t * 2), s: 120, pop: pop01(t, 17.85, 0.34, 2.2), mood: 'happy', look: [1, 0], hops: [18.0, 18.7, 19.4] })
  } },
  { at: 21.0, cam: [1.14, 620, 1080], draw(x, t) {
    set(x, t)
    cast(x, t, { ax: 760, am: 'sparkle', gm: 'heart', alook: [1, 0], pt: 3 })
    coupon(x, t, 0.8, 800, 960, 0.08)
    hearts(x, t, 21.3, 860, 1000, { n: 6 })
  } },
]
const CUTS = [7.6, { t: 11.8, kind: 'flip' }, 17.6]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 30,
  hook: { text: 'Everyone brought a gift. | *Except you.*', out: [2.8, 3.0], color: AQC, size: 74, accentSize: 130 },
  heads: [
    { at: 3.15, out: [7.4, 7.6], text: 'Plan A: wrap | a *spoon.*', color: PINK },
    { at: 7.75, out: [11.6, 11.8], text: 'Plan B: | a *pinecone.*', color: '#e0a86a' },
    { at: 11.95, out: [17.4, 17.6], text: 'Plan C: | *the truth.*', color: AQC },
    { at: 17.75, out: [20.8, 21.0], text: 'Fixed. | *Right now.*', color: GOLD },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 21.3, text: 'Give them your *time.*', color: AQC },
  cuts: CUTS,
  pitch: { [tagOf(AQU)]: 987.77, [tagOf(CAN)]: 659.25 },
  cues: [
    ['whoosh', 3.6, 0.3, 0.03], ['pop', 3.95, 1174.66, 0.04, 0], ['whoosh', 8.1, 0.3, 0.03], ['pop', 8.45, 987.77, 0.04, 0],
    ...Array.from({ length: 6 }, (_, i) => ['tick', 17.9 + i * 0.12, 0.03]),
    ['pop', FIX, 1318.51, 0.05, 0.3], ['bell', FIX + 0.05, 1760, 0.03, 1.1, 0.3], ['glitter', FIX, FIX + 0.5],
    ['pop', FIX + 0.65, 1174.66, 0.045, -0.2], ['pop', 17.9, 739.99, 0.03, -0.4],
  ],
})
