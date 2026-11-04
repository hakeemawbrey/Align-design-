// nf16e11: MEET THE FAMILY, Ep 11, "When the family takes a while to warm up." (43 s vertical, star_advice, music: cinematic · Cm).
// Story 0–40.6, then the short 2.4 s end card (no card-cut transition). Aries asks (it was brought home); Taurus is the partner whose family it is. The series look lives in ../../nf16e01/scenes/familykit.js.
//   0.0–3.2    DEAR STARS: "“Their family was | *so quiet* with me.”" — an Aries, after dinner. ♈ Aries mid-hop beside ♉
//              Taurus at a frosty dinner table.
//   3.2–11.4   "A very | *quiet* dinner."  Frost creeps over the cloth. Aries tries three jokes, louder each time: "so… nice
//              pie!" · "HAHA, PIE, RIGHT?" · "WHO WANTS A PIE PUN?!" A cousin: "…maybe later." TAURUS: "they're usually
//              *warmer* than this."
//  11.4–20.4   "Give it | *time.*"  THE STARS: "new people take a while. that's not a *verdict.*" → "but don't let them earn it
//              *alone.*" Taurus scoots closer to Aries.
//  20.4–30.0   "Bring them | *in.*"  TAURUS: "grandpa, Aries makes the *best* pie crust." GRANDPA: "really? what's the trick?"
//              The frost melts. THE STARS: "anything bigger? talk to family *privately.*"
//  30.0        ★ LESSON UNLOCKED: "Warming up takes | *more than one* dinner."  +1 PATIENCE
//  34.8–40.6   "Stay | *warm.*"  A talk card lands ("Cook at home or try somewhere new?"). THE STARS: "Some families warm up
//              slowly. Stay warm anyway."
import { makeFamily, K, box, R, ink, sparkles, hearts, shadow, diningRoom, table, bubble, drawBits,
  pop01, outK, prog, lerp, clamp, ease, GOLD, BONE, PINK, MINT, SKYB } from '../../nf16e01/scenes/familykit.js'

const TAU = K.tag('taurus')
const T = { b1: 3.2, b2: 11.4, b3: 20.4, lesson: 30.0, b4: 34.8, end: 40.61, jokes: [4.4, 5.8, 7.2], nope: 8.3, scoot: 16.6, grandpa: 23.4, melt: [23.6, 25.0] }
const BOXES = [
  { open: 9.0, close: 11.2, lines: [{ t: 9.2, speaker: TAU, color: MINT, text: "they're usually *warmer* than this." }] },
  { open: 11.8, close: 20.2, lines: [
    { t: 12.0, speaker: K.STARS, text: "new people take a while. that's not a *verdict.*" },
    { t: 15.4, speaker: K.STARS, text: "but don't let them earn it *alone.*" },
  ] },
  { open: 20.6, close: 29.8, lines: [
    { t: 20.8, speaker: TAU, color: MINT, text: 'grandpa, Aries makes the *best* pie crust.' },
    { t: 23.4, speaker: 'GRANDPA', color: '#c9c3dc', text: "really? what's the *trick?*" },
    { t: 25.9, speaker: K.STARS, text: 'anything bigger? talk to family *privately.*' },
  ] },
  { open: 35.2, close: 40.1, lines: [{ t: 35.4, speaker: K.STARS, text: 'Some families warm up slowly. Stay warm anyway.' }] },
]
const RELS = [
  { color: '#c9c3dc', acc: [['glasses']], seed: 61, x: 170, name: 'grandpa' }, { color: '#ffd1a0', acc: [['bow', '#3f7cf0']], seed: 62, x: 360 },
  { color: '#9fd0a0', acc: [['beanie', '#c2334f']], seed: 63, x: 910 },
]
function dinner(x, t, S, { frost = 0, warm = false, couple = 'apart' } = {}) {
  diningRoom(x, t, { top: 420, floor: 1340, lights: !frost || frost < 0.5 })
  RELS.forEach((r, i) => S.rel(x, t, { ...r, y: 1060, s: 170, mood: warm ? (i === 0 ? 'sparkle' : 'happy') : 'neutral', look: [i < 2 ? 1 : -1, 0.2], bob: frost > 0.7 ? 0 : undefined, hops: warm ? [T.grandpa + i * 0.2] : [] }))
  const tx = couple === 'close' ? [600, 740] : [560, 760]
  S.partner(x, t, { x: tx[0], y: 1060, s: 180, mood: S.taMood || 'neutral', look: [1, 0], hops: S.taHops })
  S.asker(x, t, { x: tx[1], y: 1060, s: 180, mood: S.arMood || 'happy', look: S.arLook || [-1, 0], hops: S.arHops })
  table(x, t, { y: 1190, dishes: ['plates', 'pie', 'teapot'], frost })
  if (frost > 0) { x.save(); x.globalAlpha = 0.18 * frost; R(x, '#cfefff', 0, 420, 1080, 920); x.restore() }
}
function hook(x, t, S) {
  dinner(x, t, { ...S, taMood: 'neutral', taHops: [1.4], arMood: 'wide', arHops: [-0.12, 1.6] }, { frost: 0.5 })
}
function beat1(x, t, S) {
  const fr = 0.5 + 0.5 * prog(t, S.t0, S.t0 + 4)
  const ji = T.jokes.filter(a => t >= a).length
  dinner(x, t, { ...S, taMood: t > 9.2 ? 'squint' : 'neutral', arMood: ji ? 'sparkle' : 'happy', arHops: T.jokes.map(a => a + 0.02), arLook: [-1, -0.5] }, { frost: fr })
  const J = [['so… nice pie!', 30], ['HAHA, PIE, RIGHT?', 38], ['WHO WANTS A PIE PUN?!', 46]]
  J.forEach(([s, sz], i) => bubble(x, t, 760 - i * 40, 820 - i * 90, T.jokes[i], i < 2 ? T.jokes[i + 1] - 0.05 : S.t1, s, { size: sz, tail: 0.5 }))
  bubble(x, t, 910, 840, T.nope, S.t1, '…maybe later.', { size: 30, col: '#cfefff', tail: 0.2 })
}
function beat2(x, t, S) {
  const sc = ease.inOutCubic(prog(t, T.scoot, T.scoot + 0.6))
  dinner(x, t, { ...S, taMood: t > T.scoot ? 'happy' : 'neutral', taHops: [T.scoot + 0.1], arMood: t > T.scoot + 0.4 ? 'heart' : 'neutral' }, { frost: 1 - 0.25 * sc, couple: sc > 0.5 ? 'close' : 'apart' })
  hearts(x, t, T.scoot + 0.5, 680, 900, { n: 5 })
}
function beat3(x, t, S) {
  const melt = 0.75 * (1 - prog(t, ...T.melt))
  dinner(x, t, { ...S, taMood: 'happy', taHops: [20.8, 21.6], arMood: t > T.grandpa ? 'sparkle' : 'happy', arHops: [T.grandpa + 0.6, T.grandpa + 1.2] }, { frost: melt, warm: t > T.grandpa, couple: 'close' })
  if (t > T.melt[0] && t < T.melt[1] + 0.5) for (let i = 0; i < 8; i++) { const p = ((t - T.melt[0]) * 0.8 + i / 8) % 1; R(x, '#8fe3ff', 100 + i * 120, 1240 + p * 80, 8, 14) }
  sparkles(x, t, 540, 900, T.melt[1], 12, 300, 1, [GOLD, '#ffcf8a', BONE])
}
function beat4(x, t, S) {
  dinner(x, t, { ...S, taMood: 'happy', taHops: [S.t0 + 0.4, 38], arMood: t > 38 ? 'heart' : 'happy', arHops: [S.t0 + 0.6, 38.1] }, { frost: 0, warm: true, couple: 'close' })
  hearts(x, t, 38.1, 680, 900, { n: 6 })
}

const EP = makeFamily({
  id: 'nf16e11', D: 45, key: 'Cm', asker: 'aries', partner: 'taurus',
  askerAcc: [['beanie', '#f2c75c']], partnerAcc: [['scarf', '#3fb08a']],
  q: { text: '“Their family was | *so quiet* with me.”', sign: '— an Aries, after dinner', out: [2.9, 3.2], size: 80, accentSize: 108 },
  hook,
  beats: [
    { t0: T.b1, t1: T.b2, head: 'A very | *quiet* dinner.', accent: SKYB, draw: beat1, stars: null, pis: { x: 960, y: 1330, s: 115, tears: 2, look: [-1, -1], at: 1.2 } },
    { t0: T.b2, t1: T.b3, head: 'Give it | *time.*', accent: GOLD, size: 104, accentSize: 150, draw: beat2, stars: { x: 140, y: 1300, s: 140 }, pis: { x: 960, y: 1330, s: 115, tears: 1, look: [-1, -1], at: 1.0 } },
    { t0: T.b3, t1: T.lesson, head: 'Bring them | *in.*', accent: MINT, size: 104, accentSize: 150, draw: beat3, stars: { x: 140, y: 1300, s: 140, at: 5.2 }, pis: { x: 960, y: 1330, s: 130, tears: 3, mood: 'sparkle', look: [-1, -1], at: 3.4 } },
    { t0: T.lesson, t1: T.b4, head: null, draw: beat3, stars: null, pis: null, punch: false },
    { t0: T.b4, t1: T.end, head: 'Stay | *warm.*', accent: PINK, size: 104, accentSize: 150, draw: beat4, stars: { x: 140, y: 1300, s: 140 }, pis: { x: 960, y: 1330, s: 130, tears: 3, mood: 'happy', look: [-1, -1], at: 0.6 } },
  ],
  boxes: BOXES,
  lesson: { at: T.lesson, out: [34.6, 34.8], text: 'Warming up takes | *more than one* dinner.', chip: '+1 PATIENCE', accentColor: GOLD, dim: 0.6, size: 80, accentSize: 120 },
  tie: { img: 'card-talk-4.png', at: 35.6, out: [40.1, 40.5], x: 540, y: 680, w: 280, rot: 0.05 },
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, T.b4],
  flashes: [T.b2],
  cues: [
    ['riser', T.b1, T.b1 + 4, 0.012],
    ...T.jokes.map((a, i) => ['pop', a, [880, 1174.66, 1567.98][i], 0.03 + i * 0.012, 0.3]),
    ['pluck', T.nope, 220, 0.03, 0.4, 0.4],
    ['whoosh', T.scoot, 0.4, 0.03], ['pluck', T.scoot + 0.5, 1174.66, 0.035, 0.5, 0],
    ['riser', T.melt[0], T.melt[1], 0.015], ['glitter', T.melt[1], T.melt[1] + 0.5], ['bell', T.melt[1], 1760, 0.03, 1, 0],
    ['pluck', 38.1, 1318.51, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, ink, drawBits, lerp, clamp, pop01, outK]
