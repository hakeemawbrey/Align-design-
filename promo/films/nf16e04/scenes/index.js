// nf16e04: MEET THE FAMILY, Ep 4, "Their family does it differently." (33 s vertical, star_advice, music: funk · E).
// Story 0–30.6, then the short 2.4 s end card (no card-cut transition). The series look lives in ../../nf16e01/scenes/familykit.js.
//   0.0–3.2    DEAR STARS: "“Wait, you open | gifts *at midnight?*”" — a Gemini, at their partner's family's. ♊ Gemini
//              mid-gasp, a gift in hand, the clock striking twelve.
//   3.2–10.4   "My family: | *everyone at once.*"  Gemini's table: four relatives, four bubbles, all talking over each other;
//              Gemini thriving. GEMINI: "at my house we all talk at *once.*"
//  10.4–17.6   "Their family: | *one at a time.*"  The same table, quiet: one bubble, a nod, a clock tick. ♑ CAPRICORN:
//              "we take turns. and gifts wait for *morning.*" GEMINI: "you wait until *MORNING??*"
//  17.6–30.6   "Ask about | the *why.*"  THE STARS: "different isn't wrong. it's just *new.*" → "ask about the *why.* you'll
//              learn them." A talk card lands ("What does a perfect lazy Sunday look like for you?"). Pisces fountains.
//              THE STARS: "Different traditions. Same table."
import { makeFamily, K, box, ink, sparkles, hearts, shadow, clock, gift, diningRoom, table, bubble, couch, drawBits,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, GOLD, BONE, PINK, MINT, SKYB, LAV, RED, EXCL } from '../../nf16e01/scenes/familykit.js'

const GEM = K.tag('gemini'), CAP = K.tag('capricorn')
const T = { b1: 3.2, b2: 10.4, b3: 17.6, end: 30.61, tick: [12.6, 13.6, 14.4] }
const BOXES = [
  { open: 6.4, close: 10.2, lines: [{ t: 6.6, speaker: GEM, color: '#ffe27a', text: 'at my house we all talk at *once.*' }] },
  { open: 11.0, close: 17.4, lines: [
    { t: 11.2, speaker: CAP, color: '#c9c3dc', text: 'we take turns. and gifts wait for *morning.*' },
    { t: 14.5, speaker: GEM, color: '#ffe27a', text: 'you wait until *MORNING??*' },
  ] },
  { open: 18.0, close: 30.1, lines: [
    { t: 18.2, speaker: K.STARS, text: "different isn't wrong. it's just *new.*" },
    { t: 21.0, speaker: K.STARS, text: "ask about the *why.* you'll learn them." },
    { t: 25.2, speaker: K.STARS, text: 'Different traditions. Same table.' },
  ] },
]
const RELS = [
  { color: '#ff9a6a', acc: [['glasses']], seed: 21 }, { color: '#7fd0ff', acc: [['beanie', '#e8344e']], seed: 22 },
  { color: '#c9a6ff', acc: [['bow', '#ff8fb1']], seed: 23 }, { color: '#9fe6b0', acc: [['scarf', '#f2c75c']], seed: 24 },
]

function hook(x, t, S) {
  const mm = Math.min(60, t * 90), hh = mm >= 60 ? 12 : 11
  clock(x, 790, 860, 130, hh, mm % 60)
  if (t > 0.67) { sparkles(x, t, 790, 860, 0.67, 10, 170, 1); for (let i = 0; i < 3; i++) ink(x, 'BONG', 790 + [-170, 170, 0][i], 680 - i * 25 + 6 * Math.sin(t * 8 + i), { size: 34, col: GOLD, font: "Inter, sans-serif", weight: 800, alpha: clamp((t - 0.67 - i * 0.5) * 4) }) }
  shadow(x, 360, 1330, 270)
  S.asker(x, t, { x: 360, y: 1150, s: 270, mood: 'wide', look: [1, -0.6], hops: [-0.12, 0.7, 1.9] })
  gift(x, 560, 1180 + 6 * Math.sin(t * 5), 0.9, { rot: 0.1 })
}
function tableScene(x, t, S, loud) {
  diningRoom(x, t, { top: 420, floor: 1340 })
  const xs = [190, 400, 680, 890]
  RELS.forEach((r, i) => {
    if (!loud && i === 3) return
    S.rel(x, t, { ...r, x: xs[i], y: 1060, s: 170, mood: loud ? 'happy' : 'neutral', look: loud ? [i % 2 ? -1 : 1, -0.2] : [0, 0.3], hops: loud ? [S.t0 + 0.3 + i * 0.2, S.t0 + 1.6 + i * 0.3, S.t0 + 3 + i * 0.25] : [] })
  })
  table(x, t, { y: 1190, dishes: ['plates', 'pie', 'bowl', 'teapot'] })
}
function beat1(x, t, S) {
  tableScene(x, t, S, true)
  const B = [['PASS THE—', 190, 830], ['DID YOU SEE—', 470, 780], ['WAIT WAIT', 760, 840], ['OK SO—', 900, 720]]
  B.forEach(([s, bx, by], i) => bubble(x, t, bx + 8 * Math.sin(t * 7 + i), by, S.t0 + 0.5 + i * 0.3, S.t1, s, { size: 34, col: [BONE, '#ffe27a', '#c9f2d4', '#ffd1de'][i], tail: i % 2 ? 0.3 : -0.3 }))
  // Gemini, thriving at the end of the table
  S.asker(x, t, { x: 540, y: 1300, s: 170, mood: 'sparkle', look: [0, -1], hops: [S.t0 + 0.8, S.t0 + 2.2, 7.6] })
}
function beat2(x, t, S) {
  tableScene(x, t, S, false)
  bubble(x, t, 400, 820, S.t0 + 0.6, S.t0 + 2.4, 'lovely evening.', { size: 30 })
  for (const a of T.tick) ink(x, 'tick.', 900, 600, { size: 30, col: BONE, alpha: clamp(1 - Math.abs(t - a - 0.2) * 3) })
  S.partner(x, t, { x: 890, y: 1060, s: 170, mood: 'happy', look: [-1, 0], acc: [['tie', '#7fd0ff']] })
  const shock = t > 14.5
  S.asker(x, t, { x: 540, y: 1300, s: 170, mood: shock ? 'wide' : 'neutral', look: [1, -1], hops: [14.5, 15.0] })
  if (shock) drawBits(x, EXCL, { E: RED }, 650, 1140 - 8 * Math.sin(t * 9), 8)
}
function beat3(x, t, S) {
  R0(x)
  couch(x, 540, 1340, 640)
  gift(x, 300, 1130, 0.8, { col: '#3f7cf0', rot: -0.1 }); gift(x, 790, 1130, 0.8, { col: '#c2334f', rot: 0.1 })
  S.asker(x, t, { x: 410, y: 1080, s: 210, mood: t > 21.0 ? 'sparkle' : 'happy', look: [1, 0], hops: [21.2, 25.4] })
  S.partner(x, t, { x: 680, y: 1080, s: 210, mood: t > 25.2 ? 'heart' : 'happy', look: [-1, 0], acc: [['tie', '#7fd0ff']], hops: [21.6, 25.5] })
  hearts(x, t, 25.4, 540, 900, { n: 6 })
}
function R0(x) { x.fillStyle = 'rgba(47,59,94,0.0)' }

const EP = makeFamily({
  id: 'nf16e04', D: 35, key: 'E', asker: 'gemini', partner: 'capricorn',
  askerAcc: [['bow', '#ff8fb1']],
  q: { text: '“Wait, you open | gifts *at midnight?*”', sign: '— a Gemini, at their partner’s family’s', out: [2.9, 3.2], size: 80, accentSize: 106 },
  hook,
  hookPis: { x: 950, y: 1340, s: 120, at: 0.7, tears: 2, look: [-1, -1] },
  beats: [
    { t0: T.b1, t1: T.b2, head: 'My family: | *everyone at once.*', accent: '#ffe27a', draw: beat1, stars: null, pis: { x: 960, y: 1290, s: 120, tears: 2, mood: 'sparkle', look: [-1, -1], at: 1.2 } },
    { t0: T.b2, t1: T.b3, head: 'Their family: | *one at a time.*', accent: SKYB, draw: beat2, stars: null, pis: { x: 140, y: 1290, s: 110, tears: 1, look: [1, -1], at: 1.4 } },
    { t0: T.b3, t1: T.end, head: 'Ask about | the *why.*', accent: MINT, draw: beat3, stars: { x: 140, y: 1290, s: 140 }, pis: { x: 950, y: 1290, s: 130, tears: 3, mood: 'happy', look: [-1, -1], at: 6.5 } },
  ],
  boxes: BOXES,
  tie: { img: 'card-talk-3.png', at: 23.4, out: [30.1, 30.5], x: 540, y: 690, w: 300, rot: -0.05 },
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, 23.0],
  flashes: [T.b1, T.b2],
  cues: [
    ['bell', 0.67, 880, 0.04, 1.2, 0.3], ['bell', 1.17, 880, 0.035, 1.2, 0.3], ['bell', 1.67, 880, 0.03, 1.2, 0.3],
    ...[0, 0.3, 0.6, 0.9].map((a, i) => ['pop', +(T.b1 + 0.5 + a).toFixed(3), [880, 987.77, 1174.66, 1318.51][i], 0.04, i % 2 ? 0.4 : -0.4]),
    ...T.tick.map(a => ['tick', a, 0.05]),
    ['pop', 14.5, 1567.98, 0.05, 0], ['pop', 14.58, 1975.5, 0.035, 0],
    ['pluck', 25.4, 1318.51, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, BONE, PINK, LAV, lerp, pop01, outK, ease, easeOutBack, prog]
