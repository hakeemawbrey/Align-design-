// nh15e20: HOME FOR THE HOLIDAYS, "The quiet walk after dinner." (35 s vertical, Star Talk Season 15 ep 20,
// music: cinematic · Eb). Story 0–30.6, then the shared end card. The look lives in ../../nh15e13/scenes/holikit.js.
//   0.0–3.4    hook "The house is *loud.*"  A NOISE meter pinned at MAX over the dining room (Uncle's laugh, the toy drum,
//              three conversations at once); Scorpio slides into its scarf.
//   3.4–7.8    "Scorpio: | *“walk?”*"  At the door, Scorpio tips its head at Pisces (its date). Pisces nods. The door opens.
//   7.8–14.0   "Outside: | *quiet.*"  Snow, footprints, the meter drops to zero. Orion is up in the east, as it is on
//              December evenings; a small sky chip says so.
//   14.0       card cut. "Then, | *the thing.*"  SCORPIO: "your family's great. i was *nervous.*"  PISCES: "me *too.*"
//              Happy tears, of course.
//   21.0       THE STARS: "some things are easier to say *side by side.*"
//   25.8       under the lamp post, the house's lights behind them. "Some talks need a *sidewalk.*"
import { makeEp, room, table, plate, candle, street, snow, rel, sign, pisces, theStars, sparkles, hearts, bubble, label, box, R, glow, drawPixelStar,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const SCO = 'scorpio'
const SC = '#ff7aa8', PC = '#b9a6ff'
const LINES = [
  { t: 14.4, speaker: tagOf(SCO), color: SC, text: "your family's great. i was *nervous.*" },
  { t: 16.9, speaker: tagOf('pisces'), color: PC, text: 'me *too.*' },
  { t: 21.3, speaker: 'THE STARS', text: 'some things are easier to say *side by side.*' },
]
const BOXES = [{ open: 14.2, close: 20.8, from: 0, to: 2 }, { open: 21.1, close: 25.6, from: 2, to: 3 }]
const SCO_HOPS = [-0.1, 4.0, 4.6, ...talkHops(LINES, tagOf(SCO), { cps: CPS }), 26.0]

function meter(x, t, level, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(820, 600); x.scale(k, k)
  box(x, -150, -60, 300, 120, '#1b1236', { b: 6 }); label(x, 'NOISE', -120, -32, { size: 22, col: BONE, align: 'left' })
  for (let i = 0; i < 10; i++) { const on = i < Math.round(level * 10); R(x, on ? (i > 7 ? RED : i > 4 ? GOLD : '#3fd08a') : 'rgba(255,255,255,0.12)', -124 + i * 25, -6, 20, 46) }
  if (level > 0.95) label(x, 'MAX', 110, -32, { size: 22, col: RED, alpha: Math.floor(t * 6) % 2 ? 1 : 0.4 })
  x.restore()
}
function orion(x, t, cx, cy, k) {
  if (k <= 0.01) return
  // Betelgeuse, Bellatrix, the belt (Alnitak, Alnilam, Mintaka), Saiph, Rigel — the familiar hourglass
  const P = [[-70, -120, 1.3, '#ffb27a'], [60, -110, 1, BONE], [-20, 0, 1, BONE], [0, -6, 1, BONE], [20, -12, 1, BONE], [-60, 110, 1, BONE], [80, 100, 1.3, '#bfe0ff']]
  x.save(); x.globalAlpha *= k
  x.strokeStyle = 'rgba(239,230,214,0.25)'; x.lineWidth = 3; x.beginPath()
  for (const [a, b] of [[0, 2], [1, 4], [2, 5], [4, 6], [0, 1], [5, 6]]) { x.moveTo(cx + P[a][0], cy + P[a][1]); x.lineTo(cx + P[b][0], cy + P[b][1]) }
  x.stroke()
  P.forEach(([dx, dy, s, c], i) => drawPixelStar(x, cx + dx, cy + dy, 26 * s * (0.9 + 0.1 * Math.sin(t * 3 + i)), 1, c))
  x.restore()
}
function skyChip(x, t, at, out) {
  const k = pop01(t, at, 0.3, 2) * outK(t, out)
  if (k <= 0.01) return
  x.save(); x.translate(540, 680); x.scale(k, k)
  box(x, -330, -46, 660, 92, 'rgba(20,12,44,0.92)', { b: 5 }); R(x, GOLD, -330, -46, 8, 92)
  label(x, '★ SKY NOTE', -300, -16, { size: 22, col: GOLD, align: 'left' })
  label(x, 'December evenings: Orion rises in the east.', -300, 16, { size: 22, col: BONE, align: 'left' })
  x.restore()
}
function walkers(x, t, o = {}) {
  const step = Math.abs(Math.sin(t * 4)), bob = step * 8
  sign(x, t, SCO, { x: o.sx ?? 420, y: 1130 - bob, s: o.s ?? 260, mood: o.sm ?? 'neutral', look: o.sl ?? [1, 0], hops: SCO_HOPS, scarf: '#5a2a7a', bob: 0 })
  pisces(x, t, { x: o.px ?? 680, y: 1130 - (1 - step) * 8, s: (o.s ?? 260) * 0.95, look: o.pl ?? [-1, 0], mood: o.pm ?? 'happy', bob: 0, scarf: '#ff8fb1' }, o.pt ?? 1)
}
function footprints(x, t, scroll) {
  for (let i = 0; i < 16; i++) { const fx = ((i * 70 + scroll * 1.4) % 1200) - 120, side = i % 2; R(x, '#b9bfe0', fx, 1250 + side * 26, 22, 12); R(x, '#b9bfe0', fx + 360, 1260 + side * 26, 22, 12) }
}
const shots = [
  { at: 0, cam: [1.14, 540, 1000], draw(x, t) {
    room(x, t, { wall: '#5e3448', winX: 380, winY: 560, winW: 260, winH: 240, wreathX: 860, wreathY: 650 })
    const shake = Math.sin(t * 40) * 3
    rel(x, t, 'UNCLE', { x: 200 + shake, y: 1000, s: 240, mood: 'happy', look: [1, -1], hops: [0.1, 0.5, 0.9, 1.3, 1.7, 2.1, 2.5, 2.9] })
    rel(x, t, 'KID', { x: 420, y: 1060, s: 170, mood: 'sparkle', hops: Array.from({ length: 14 }, (_, i) => i * 0.25) })
    rel(x, t, 'AUNTIE', { x: 620, y: 1010, s: 230, mood: 'wide', look: [-1, 0], hops: [0.6, 1.6, 2.6] })
    table(x, 480, 1130, 860, {}); plate(x, 200, 1122); plate(x, 620, 1122); candle(x, t, 420, 1122, 70)
    for (const [bx, by, s, a] of [[200, 760, 'HA HA HA!', 0], [470, 860, 'BOOM BOOM', 0], [640, 720, 'AND THEN—', 0]]) bubble(x, t, bx, by, -1, 3.4, s, { size: 30, tail: 0 })
    sign(x, t, SCO, { x: 900, y: 1060, s: 240, mood: 'squint', look: [-1, 0], hops: [-0.1, 1.5], scarf: '#5a2a7a' })
    pisces(x, t, { x: 980, y: 1240, s: 120, look: [-1, -1] }, 1)
    meter(x, t, 1)
  } },
  { at: 3.4, cam: [1.2, 600, 1000], draw(x, t) {
    room(x, t, { wall: '#4a2c3e', window: false, wreath: false, lightsY: 470 })
    // the front door (opens at 6.6 onto the snow)
    const op = ease.inOutCubic(prog(t, 6.6, 7.4))
    box(x, 640, 640, 300, 640, '#0c1236', { b: 8 })
    x.save(); x.beginPath(); x.rect(640, 640, 300, 640); x.clip(); snow(x, t, { n: 20, x0: 640, x1: 940, y0: 640, y1: 1280, speed: 50 }); R(x, '#e9ecff', 640, 1220, 300, 60); x.restore()
    box(x, 640, 640, 300 * (1 - op) + 8, 640, '#7a3a2a', { b: 6, hi: '#9a5a3a' }); if (op < 0.9) R(x, GOLD, 640 + 300 * (1 - op) - 40, 960, 16, 16)
    sign(x, t, SCO, { x: 420, y: 1060, s: 270, mood: t > 4.6 ? 'happy' : 'neutral', look: [1, 0], hops: SCO_HOPS, scarf: '#5a2a7a' })
    pisces(x, t, { x: 220, y: 1080, s: 230, look: [1, 0], mood: t > 5.3 ? 'happy' : 'sparkle', hops: [5.3, 5.6], scarf: '#ff8fb1' }, 1)
    bubble(x, t, 420, 760, 4.0, 6.4, 'walk?', { size: 36, col: '#ffd1e3', tail: 0 })
    bubble(x, t, 220, 820, 5.3, 6.4, '*nods*', { size: 30, tail: 0 })
    meter(x, t, 0.9 - 0.2 * prog(t, 6.6, 7.6), 0.8)
  } },
  { at: 7.8, cam: [1.12, 540, 860], draw(x, t) {
    const sc = (t - 7.8) * 60
    orion(x, t, 840, 560, pop01(t, 8.6, 0.6, 1.4))
    street(x, t, { scroll: sc }); footprints(x, t, sc); snow(x, t, { n: 70 })
    walkers(x, t, { sm: 'neutral', pm: 'happy', sl: [1, -1], pl: [1, -1] })
    label(x, 'ORION', 840, 720, { size: 22, col: 'rgba(239,230,214,0.8)', alpha: pop01(t, 9.0, 0.4, 1.4) })
    meter(x, t, Math.max(0, 0.7 - prog(t, 7.8, 9.5) * 0.7), 0.7 * outK(t, [9.6, 9.9]))
    skyChip(x, t, 10.0, [13.6, 13.9])
  } },
  { at: 14.0, cam: [1.26, 540, 920], draw(x, t) {
    const sc = (t - 7.8) * 40
    orion(x, t, 840, 560, 1)
    street(x, t, { scroll: sc }); footprints(x, t, sc); snow(x, t, { n: 70 })
    walkers(x, t, { sm: t > 16.0 ? 'happy' : 'neutral', pm: t > 16.8 ? 'sparkle' : 'wide', sl: [1, 0], pl: [-1, 0], pt: t > 17.0 ? 3 : 1 })
    if (t > 17.2) hearts(x, t, 17.3, 550, 1000, { n: 6 })
  } },
  { at: 21.0, cam: [1.12, 540, 860], draw(x, t) {
    const sc = (t - 7.8) * 40
    orion(x, t, 840, 560, 1)
    street(x, t, { scroll: sc }); footprints(x, t, sc); snow(x, t, { n: 70 })
    walkers(x, t, { sm: 'happy', pm: 'happy', sl: [1, 0], pl: [-1, 0], pt: 2 })
    theStars(x, t, { x: 200, y: 640 + 6 * Math.sin(t * 2), s: 120, pop: pop01(t, 21.1, 0.34, 2.2), mood: 'happy', look: [1, 0], hops: [21.3, 22.0, 22.8] })
  } },
  { at: 25.8, cam: [1.12, 540, 860], draw(x, t) {
    orion(x, t, 840, 560, 1)
    street(x, t, { scroll: 1060 }); snow(x, t, { n: 70 })
    walkers(x, t, { sx: 440, px: 650, sm: 'heart', pm: 'heart', sl: [1, 0], pl: [-1, 0], pt: 3, s: 280 })
    sparkles(x, t, 545, 950, 26.1, 12, 200, 1)
  } },
]
const CUTS = [7.8, { t: 14.0, kind: 'flip' }, 25.8]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 35,
  hook: { text: 'The house is *loud.*', out: [3.2, 3.4], color: '#ffb36b', size: 92, accentSize: 150 },
  heads: [
    { at: 3.55, out: [7.6, 7.8], text: 'Scorpio: | *“walk?”*', color: SC },
    { at: 7.95, out: [13.8, 14.0], text: 'Outside: | *quiet.*', color: '#bfe0ff' },
    { at: 14.15, out: [20.8, 21.0], text: 'Then, | *the thing.*', color: SC },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 26.1, text: 'Some talks need a *sidewalk.*', color: '#bfe0ff' },
  cuts: CUTS,
  pitch: { [tagOf(SCO)]: 587.33, [tagOf('pisces')]: 987.77 },
  cues: [
    ...Array.from({ length: 12 }, (_, i) => ['tom', 0.1 + i * 0.25, 120, { gain: 0.08, decay: 0.1 }]),
    ['pop', 4.0, 739.99, 0.035, 0], ['whoosh', 6.6, 0.9, 0.04], ['tick', 7.4, 0.04],
    ...Array.from({ length: 10 }, (_, i) => ['tick', 8.0 + i * 0.5, 0.012]),
    ['bell', 8.7, 1567.98, 0.02, 1.4, 0.4], ['pop', 10.05, 880, 0.03, 0],
    ['glitter', 17.2, 17.8], ['pluck', 17.0, 1318.51, 0.03, 0.8, 0.2], ['glitter', 26.1, 26.7],
  ],
})
