// nf16e06: MEET THE FAMILY, Ep 6, "The first five minutes at the door." (35 s vertical, star_advice, music: lofi · Am).
// Story 0–30.6, then the shared end card. The series look lives in ../../nf16e01/scenes/familykit.js.
//   0.0–3.2    DEAR STARS: "“What do I say | when the *door opens?*”" — an Aquarius, on the doorstep. ♒ Aquarius mid-hop on
//              the snowy step, rehearsing from a cue card.
//   3.2–10.6   "The door | *opens.*"  Their partner's parents fill the doorway. Aquarius freezes; the cue cards flip: TALK
//              ABOUT… WEATHER? · SNOW IS… COLD? · HELLO. I AM A STAR. AQUARIUS: "so. snow. it's… *cold?*"
//  10.6–18.6   "One real | *question.*"  The cue cards fly off. THE STARS: "drop the cards. ask *one* real question." →
//              "then listen like it *matters.* it does."
//  18.6        card cut.
//  18.6–30.6   "Then *listen.*"  AQUARIUS: "how did you two *meet?*" The parents light up: "it was a snowy night…", "the bus
//              was late…", "she laughed at my hat!" Pisces sobs happily in the hallway. THE STARS: "One good question opens
//              the whole door."
import { makeFamily, K, box, ink, sparkles, hearts, shadow, frontDoor, snow, cueCard, bubble, drawBits,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, GOLD, BONE, PINK, MINT, SKYB, QMARK } from '../../nf16e01/scenes/familykit.js'

const AQU = K.tag('aquarius')
const T = { b1: 3.2, b2: 10.6, b3: 18.6, end: 30.61, open: 3.5, cards: [5.0, 6.0, 7.0], ask: 19.0, story: [21.0, 22.2, 23.4] }
const BOXES = [
  { open: 7.8, close: 10.4, lines: [{ t: 8.0, speaker: AQU, color: SKYB, text: "so. snow. it's… *cold?*" }] },
  { open: 11.0, close: 18.4, lines: [
    { t: 11.2, speaker: K.STARS, text: 'drop the cards. ask *one* real question.' },
    { t: 14.3, speaker: K.STARS, text: 'then listen like it *matters.* it does.' },
  ] },
  { open: 18.8, close: 30.1, lines: [
    { t: 19.0, speaker: AQU, color: SKYB, text: 'how did you two *meet?*' },
    { t: 25.0, speaker: K.STARS, text: 'One good question opens the whole door.' },
  ] },
]
const MOMDAD = [{ color: '#ffb0c8', acc: [['glasses']], seed: 41 }, { color: '#9fd0a0', acc: [['scarf', '#c2334f']], seed: 42 }]
const CARDS = ['TALK ABOUT… | WEATHER?', 'SNOW IS… | COLD?', 'HELLO. | I AM A STAR.']

function doorstep(x, t, open) {
  frontDoor(x, t, { cx: 540, floor: 1250, s: 0.95, open })
  snow(x, t, { n: 60, y0: 380, y1: 1380, seed: 6 })
}
function parents(x, t, S, k, { happy = false, hops = [] } = {}) {
  if (k <= 0.01) return
  MOMDAD.forEach((r, i) => S.rel(x, t, { ...r, x: 500 + i * 150, y: 1030, s: 175, pop: k, mood: happy ? (i ? 'happy' : 'sparkle') : 'happy', look: [0, 0.3], hops }))
}
function hook(x, t, S) {
  doorstep(x, t, 0)
  shadow(x, 300, 1350, 230)
  S.asker(x, t, { x: 300, y: 1200, s: 230, mood: 'squint', look: [1, 0.6], hops: [-0.12, 1.1, 2.2] })
  cueCard(x, 330, 880 + 6 * Math.sin(t * 4), { w: 280, h: 160, text: 'SAY HI. | BE NORMAL.', size: 28, rot: 0.12 })
}
function beat1(x, t, S) {
  const open = ease.inOutCubic(prog(t, T.open, T.open + 0.9))
  doorstep(x, t, open)
  parents(x, t, S, pop01(t, T.open + 0.5, 0.35, 2))
  shadow(x, 300, 1350, 230)
  const frozen = t > T.open + 0.9
  S.asker(x, t, { x: 300, y: 1200, s: 230, mood: frozen ? 'wide' : 'squint', look: frozen ? [0, -1] : [1, 0.6], bob: frozen ? 0 : undefined, hops: [] })
  const ci = T.cards.filter(a => t >= a).length - 1
  const txt = ci < 0 ? 'SAY HI. | BE NORMAL.' : CARDS[ci]
  const flip = ci < 0 ? 1 : Math.abs(Math.cos(Math.PI * clamp((t - T.cards[ci]) / 0.25) - Math.PI))
  cueCard(x, 330, 880, { w: 280 * Math.max(0.1, flip), h: 160, text: txt, size: 28, rot: 0.12 })
  if (frozen) drawBits(x, QMARK, { Q: GOLD }, 440, 1040 - 10 * Math.sin(t * 5), 7)
}
function beat2(x, t, S) {
  doorstep(x, t, 1)
  parents(x, t, S, 1)
  // the cue cards fly away
  for (let i = 0; i < 3; i++) {
    const p = ease.inCubic(prog(t, 11.6 + i * 0.25, 12.6 + i * 0.25))
    if (p < 1) cueCard(x, 330 - p * 600 - i * 30, 880 - p * 500 - i * 40, { w: 280, h: 160, text: CARDS[i], size: 28, rot: 0.12 + p * 3 })
  }
  shadow(x, 300, 1350, 230)
  S.asker(x, t, { x: 300, y: 1200, s: 230, mood: t > 14.3 ? 'happy' : 'neutral', look: [-1, -0.4], hops: [12.0, 15.5] })
}
function beat3(x, t, S) {
  doorstep(x, t, 1)
  const lit = t > T.story[0] - 0.3
  parents(x, t, S, 1, { happy: lit, hops: lit ? [T.story[0], T.story[1], T.story[2]] : [] })
  bubble(x, t, 340, 780, T.story[0], S.t1, 'it was a snowy night…', { size: 30, tail: 0.6 })
  bubble(x, t, 740, 700, T.story[1], S.t1, 'the bus was late…', { size: 30, tail: -0.5, col: '#c9f2d4' })
  bubble(x, t, 560, 600, T.story[2], S.t1, 'she laughed at my hat!', { size: 30, tail: 0, col: '#ffd1de' })
  hearts(x, t, T.story[2] + 0.2, 575, 900, { n: 6 })
  shadow(x, 300, 1350, 230)
  S.asker(x, t, { x: 300, y: 1200, s: 230, mood: t > T.story[0] ? 'sparkle' : 'happy', look: [0, -1], hops: [T.ask + 0.1, T.story[2] + 0.4] })
}

const EP = makeFamily({
  id: 'nf16e06', D: 35, key: 'Am', asker: 'aquarius', partner: 'libra',
  askerAcc: [['beanie', '#f2c75c']],
  q: { text: '“What do I say | when the *door opens?*”', sign: '— an Aquarius, on the doorstep', out: [2.9, 3.2], size: 72, accentSize: 92 },
  hook,
  hookPis: { x: 950, y: 1350, s: 115, at: 0.8, tears: 1, look: [-1, -1] },
  beats: [
    { t0: T.b1, t1: T.b2, head: 'The door | *opens.*', accent: GOLD, draw: beat1, stars: null, pis: { x: 950, y: 1350, s: 115, tears: 2, look: [-1, -1], at: 1.5 } },
    { t0: T.b2, t1: T.b3, head: 'One real | *question.*', accent: SKYB, draw: beat2, stars: { x: 150, y: 1300, s: 150 }, pis: { x: 950, y: 1350, s: 115, tears: 1, look: [-1, -1], at: 1.0 } },
    { t0: T.b3, t1: T.end, head: 'Then *listen.*', accent: PINK, size: 104, accentSize: 140, draw: beat3, stars: { x: 150, y: 1300, s: 150, at: 6.0 }, pis: { x: 870, y: 1030, s: 110, tears: 3, mood: 'happy', look: [-1, 0], at: 3.3, noTissues: true } },
  ],
  boxes: BOXES,
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, 25.0],
  flashes: [T.b1],
  cues: [
    ['tick', T.open, 0.05], ['whoosh', T.open + 0.1, 0.6, 0.03], ['pop', T.open + 0.6, 987.77, 0.035, -0.2], ['pop', T.open + 0.7, 1174.66, 0.035, 0.2],
    ...T.cards.map(a => ['tick', a, 0.04]), ['pluck', 8.0, 220, 0.03, 0.4, 0],
    ...[11.6, 11.85, 12.1].map(a => ['whoosh', a, 0.35, 0.03]),
    ...T.story.map((a, i) => ['pop', a, [987.77, 1174.66, 1318.51][i], 0.04, i - 1]), ['bell', T.story[2] + 0.2, 1760, 0.025, 1, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, ink, sparkles, BONE, MINT, lerp, outK, easeOutBack]
