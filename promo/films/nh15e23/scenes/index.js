// nh15e23: HOME FOR THE HOLIDAYS, "The drive home debrief." (33 s vertical, Star Talk Season 15 ep 23,
// music: synthwave · F#m). Story 0–30.6, then the shared end card. The look lives in ../../nh15e13/scenes/holikit.js.
//   0.0–3.4    hook "The *drive home* debrief."  Night road through the windshield; Leo at the wheel, eyes wide; Sagittarius
//              (Leo's date) mid-laugh in the passenger seat; Pisces in the back with the leftovers.
//   3.4–8.0    "“So… how | *did it go?*”"  LEO: "so… how did it go? be *honest.*"
//   8.0–13.0   "The *hard* part."  SAG: "honestly? the questions. and the *noise.*"  Leo braces… then nods.
//   13.0       card cut. "Leo’s | *hard part.*"  LEO: "mine was watching you get *asked* stuff."
//   18.0       "The *best* part."  SAG: "your grandma gave me her *recipe card.*"  Leo nearly misses the turn (that card is
//              famous). Pisces fountains.
//   22.6       THE STARS: "one hard part. one best part. *both* count."  A talk card: "What was your favourite moment?"
//   26.2       "Debrief with *kindness.*"
import { makeEp, carInterior, steeringWheel, rel, sign, pisces, theStars, sparkles, hearts, bubble, label, box, R, glow, talkCard,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const LEO = 'leo', SAG = 'sagittarius'
const LC = '#ffb35c', SC = '#c9a6ff'
const LINES = [
  { t: 3.7, speaker: tagOf(LEO), color: LC, text: 'so… how did it go? be *honest.*' },
  { t: 8.3, speaker: tagOf(SAG), color: SC, text: 'honestly? the questions. and the *noise.*' },
  { t: 13.3, speaker: tagOf(LEO), color: LC, text: 'mine was watching you get *asked* stuff.' },
  { t: 18.3, speaker: tagOf(SAG), color: SC, text: 'your grandma gave me her *recipe card.*' },
  { t: 22.9, speaker: 'THE STARS', text: 'one hard part. one best part. *both* count.' },
]
const BOXES = [
  { open: 3.5, close: 7.8, from: 0, to: 1 }, { open: 8.1, close: 12.8, from: 1, to: 2 }, { open: 13.1, close: 17.8, from: 2, to: 3 },
  { open: 18.1, close: 22.4, from: 3, to: 4 }, { open: 22.7, close: 26.05, from: 4, to: 5 },
]
const LEO_HOPS = [-0.1, ...talkHops(LINES, tagOf(LEO), { cps: CPS }), 20.0]
const SAG_HOPS = [0.2, 0.6, 1.0, ...talkHops(LINES, tagOf(SAG), { cps: CPS }), 26.4]
const SWERVE = [19.9, 21.0]

function car(x, t, o = {}) {
  const sw = Math.sin(Math.PI * prog(t, ...SWERVE))
  carInterior(x, t, { speed: 1, turn: sw * 1.2 + 0.1 * Math.sin(t * 0.4), clock: t < 15 ? '9:48 PM' : '9:52 PM' })
  // the seats (backs behind each of them)
  box(x, 150, 1030, 330, 520, '#2a2040', { b: 8, hi: '#3a3054' }); box(x, 600, 1030, 330, 520, '#2a2040', { b: 8, hi: '#3a3054' })
  // Pisces in the back, between the seats, a leftovers box on its lap
  pisces(x, t, { x: 540, y: 930, s: 150, look: [0, 0], mood: o.pm ?? 'sparkle' }, o.pt ?? 1)
  box(x, 490, 990, 100, 40, '#ffe1ef', { b: 4 })
  sign(x, t, LEO, { x: 320, y: 1180, s: 290, mood: o.lm ?? 'neutral', look: o.ll ?? [0.6, -1], hops: LEO_HOPS, squash: -0.02 + sw * 0.08 })
  sign(x, t, SAG, { x: 770, y: 1190, s: 280, mood: o.sm ?? 'happy', look: o.sl ?? [-1, 0], hops: SAG_HOPS })
  steeringWheel(x, t, 320, 1420, sw * 1.4)
  // the seat belts
  for (const [ax, bx] of [[180, 460], [900, 620]]) { x.save(); x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.moveTo(ax, 1300); x.lineTo(bx, 1520); x.stroke(); x.strokeStyle = '#4a4070'; x.lineWidth = 12; x.stroke(); x.restore() }
}
const shots = [
  { at: 0, cam: [1.06, 540, 1000], draw(x, t) { car(x, t, { lm: 'wide', sm: 'happy', ll: [0, -1], sl: [-1, 0] }); bubble(x, t, 770, 900, -1, 3.3, 'HA!', { size: 40, col: '#ece0ff' }) } },
  { at: 3.4, cam: [1.12, 420, 1100], draw(x, t) { car(x, t, { lm: 'neutral', sm: 'neutral', ll: [1, 0] }) } },
  { at: 8.0, cam: [1.12, 680, 1100], draw(x, t) { car(x, t, { lm: t > 10.6 ? 'neutral' : 'squint', sm: 'neutral', ll: [1, 0], sl: [-1, 0] }) } },
  { at: 13.0, cam: [1.12, 420, 1100], draw(x, t) { car(x, t, { lm: 'neutral', sm: t > 15.2 ? 'heart' : 'wide', ll: [1, 0], pt: 2 }) } },
  { at: 18.0, cam: [1.06, 540, 1020], draw(x, t) {
    car(x, t, { lm: t > 19.8 ? 'wide' : 'neutral', sm: 'sparkle', ll: [1, 0], pt: t > 19.9 ? 3 : 2, pm: t > 19.9 ? 'wide' : 'sparkle' })
    // the recipe card, held up
    const k = pop01(t, 19.3, 0.3, 2.2)
    if (k > 0.01) { x.save(); x.translate(770, 860); x.rotate(0.08); x.scale(k, k); box(x, -120, -76, 240, 152, '#fff6dc', { b: 6 }); R(x, '#e8a0a0', -120, -44, 240, 4); label(x, "GRANDMA'S", 0, -60, { size: 22, col: '#a0522d', shadow: false }); for (let i = 0; i < 3; i++) R(x, INK, -90, -10 + i * 30, 180 - i * 40, 8); x.restore() }
    bubble(x, t, 330, 870, 19.95, 21.2, '!!', { size: 48, col: '#fff3a8' })
    sparkles(x, t, 770, 860, 19.4, 12, 160, 1)
  } },
  { at: 22.6, cam: [1.06, 540, 1020], draw(x, t) {
    car(x, t, { lm: 'happy', sm: 'happy', ll: [1, 0], pt: 2 })
    theStars(x, t, { x: 900, y: 520 + 6 * Math.sin(t * 2), s: 110, pop: pop01(t, 22.7, 0.34, 2.2), mood: 'happy', look: [-1, 1], hops: [22.9, 23.6, 24.4] })
  } },
  { at: 26.2, cam: [1.06, 540, 1020], draw(x, t) {
    car(x, t, { lm: 'heart', sm: 'heart', ll: [1, 0], pt: 3 })
    talkCard(x, t, 540, 760, pop01(t, 26.4, 0.4, 2), 'What was your favourite moment?', { w: 560, h: 260 })
    hearts(x, t, 26.6, 540, 1000, { n: 6 })
  } },
]
const CUTS = [8.0, { t: 13.0, kind: 'flip' }, 22.6]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 35,
  hook: { text: 'The *drive home* | debrief.', out: [3.2, 3.4], color: LC, size: 96, accentSize: 140 },
  heads: [
    { at: 3.55, out: [7.8, 8.0], text: '“So… how | *did it go?*”', color: LC },
    { at: 8.15, out: [12.8, 13.0], text: 'The *hard* part.', color: SC },
    { at: 13.15, out: [17.8, 18.0], text: 'Leo’s | *hard part.*', color: LC },
    { at: 18.15, out: [22.4, 22.6], text: 'The *best* part.', color: SC },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 26.9, text: 'Debrief with *kindness.*', color: LC, top: 200 },
  cuts: CUTS,
  pitch: { [tagOf(LEO)]: 739.99, [tagOf(SAG)]: 880 },
  cues: [
    ['pop', 0.25, 1174.66, 0.04, 0.3], ['pop', 0.6, 1318.51, 0.035, 0.3],
    ['pop', 19.35, 1318.51, 0.045, 0.3], ['glitter', 19.4, 19.9],
    ['whoosh', SWERVE[0], 1.0, 0.05], ['tick', SWERVE[0] + 0.1, 0.06], ['pop', 20.0, 1567.98, 0.04, -0.3],
    ['pop', 22.75, 739.99, 0.03, 0.4], ['whoosh', 26.4, 0.35, 0.03], ['pluck', 26.8, 1318.51, 0.04, 0.6, 0],
  ],
})
