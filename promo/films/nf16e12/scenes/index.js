// nf16e12: MEET THE FAMILY, Ep 12, "They're not ready to meet my family." (35 s vertical, star_advice, music: lofi · Em).
// Story 0–30.6, then the shared end card. The series look lives in ../../nf16e01/scenes/familykit.js.
//   0.0–3.2    DEAR STARS: "“They’re not ready | to *meet my family.*”" — a Scorpio, staring at a text. ♏ Scorpio mid-hop, the
//              phone: "come meet my family this weekend?" · "can we wait a bit?"
//   3.2–10.6   "The *spiral.*"  Question marks swirl; thought bubbles: "they don't like me?" · "is this a no??" · "do I
//              return the scarf???" SCORPIO: "not ready means *no*, right?"
//  10.6–19.0   "Wait | *isn't* never."  The swirl slows. THE STARS: "they said *wait.* they didn't say never." → "get
//              *curious,* not hurt."
//  19.0        card cut.
//  19.0–30.6   "Start | *small.*"  SCORPIO: "what would make it *easier?*" ♌ LEO: "maybe just your sister first? *coffee?*"
//              Coffee for three: Scorpio, Leo and the sister, three mugs, hearts. Pisces fountains.
//              THE STARS: "Not yet is an answer. Ask what would help."
import { makeFamily, K, box, R, ink, sparkles, hearts, shadow, phone, bubble, drawBits,
  pop01, outK, prog, lerp, clamp, ease, GOLD, BONE, PINK, MINT, SKYB, RED, QMARK, WOOD } from '../../nf16e01/scenes/familykit.js'

const SCO = K.tag('scorpio'), LEO = K.tag('leo')
const T = { b1: 3.2, b2: 10.6, b3: 19.0, end: 30.61, coffee: 23.8, calm: [11.0, 13.0] }
const BOXES = [
  { open: 7.8, close: 10.4, lines: [{ t: 8.0, speaker: SCO, color: '#ff7a9a', text: 'not ready means *no*, right?' }] },
  { open: 11.0, close: 18.8, lines: [
    { t: 11.2, speaker: K.STARS, text: "they said *wait.* they didn't say never." },
    { t: 14.4, speaker: K.STARS, text: 'get *curious,* not hurt.' },
  ] },
  { open: 19.2, close: 30.1, lines: [
    { t: 19.4, speaker: SCO, color: '#ff7a9a', text: 'what would make it *easier?*' },
    { t: 21.6, speaker: LEO, color: GOLD, text: 'maybe just your sister first? *coffee?*' },
    { t: 25.2, speaker: K.STARS, text: 'Not yet is an answer. Ask what would help.' },
  ] },
]
const THREAD = [{ at: -1, side: 'R', text: 'come meet my family this weekend?', col: PINK }, { at: -1, side: 'L', text: 'can we wait a bit?' }]

function swirl(x, t, n, speed, R0) {
  for (let i = 0; i < n; i++) { const a = t * speed + i * (Math.PI * 2 / n); drawBits(x, QMARK, { Q: i % 2 ? GOLD : PINK }, 540 + Math.cos(a) * R0, 1040 + Math.sin(a) * R0 * 0.55, 10) }
}
function hook(x, t, S) {
  phone(x, t, { cx: 700, top: 560, w: 440, h: 520, fs: 32, title: `${'♌'}︎ my Leo`, msgs: THREAD, rot: 0.05 })
  shadow(x, 320, 1350, 250)
  S.asker(x, t, { x: 320, y: 1180, s: 250, mood: 'wide', look: [1, -0.6], hops: [-0.12, 1.3, 2.6] })
}
function beat1(x, t, S) {
  const u = t - S.t0
  swirl(x, t, 8, 2.4, 300)
  ;['they don’t like me?', 'is this a no??', 'do I return the scarf???'].forEach((s, i) => bubble(x, t, [320, 760, 540][i], [620, 700, 520][i], S.t0 + 0.6 + i * 1.3, S.t1, s, { size: 32, col: ['#ffd1de', BONE, '#fff1c8'][i], tail: [0.4, -0.4, 0][i] }))
  shadow(x, 540, 1300, 250)
  S.asker(x, t, { x: 540, y: 1130, s: 250, mood: u > 4.8 ? 'squint' : 'wide', look: [Math.sin(t * 3), -0.5], squash: 0.05 * Math.sin(t * 9), hops: [S.t0 + 0.6, S.t0 + 1.9, S.t0 + 3.2] })
}
function beat2(x, t, S) {
  const calm = ease.inOutCubic(prog(t, ...T.calm))
  if (calm < 1) { x.save(); x.globalAlpha *= 1 - calm; swirl(x, t, 8, 2.4 * (1 - calm) + 0.2, 300 + calm * 200); x.restore() }
  shadow(x, 620, 1300, 250)
  S.asker(x, t, { x: 620, y: 1130, s: 250, mood: t > 14.4 ? 'happy' : 'neutral', look: [-1, -0.3], hops: [15.6] })
  if (t > 14.6) sparkles(x, t, 620, 1080, 14.6, 10, 180, 1)
}
function beat3(x, t, S) {
  if (t < T.coffee) {
    const msgs = [...THREAD, { at: 19.4, side: 'R', text: 'what would make it easier?', col: PINK }, { at: 21.6, side: 'L', text: 'maybe just your sister first? coffee?' }]
    phone(x, t, { cx: 640, top: 440, w: 560, h: 780, fs: 36, title: '♌︎ my Leo', msgs, alpha: 1 - prog(t, T.coffee - 0.3, T.coffee) })
    shadow(x, 220, 1340, 200)
    S.asker(x, t, { x: 220, y: 1190, s: 200, mood: t > 21.6 ? 'sparkle' : 'neutral', look: [1, -1], hops: [19.4, 22.4] })
    return
  }
  // coffee for three
  const k = pop01(t, T.coffee, 0.4, 2)
  box(x, 300, 1150, 480, 34, WOOD, { b: 6 }); R(x, '#1b1236', 520, 1190, 40, 160)
  ;[380, 540, 700].forEach((mx, i) => { box(x, mx - 30, 1100, 60, 50, [PINK, BONE, SKYB][i], { b: 5 }); box(x, mx + 30, 1112, 16, 24, [PINK, BONE, SKYB][i], { b: 4 }); for (let j = 0; j < 2; j++) R(x, 'rgba(255,255,255,0.5)', mx - 12 + j * 18, 1050 - 10 * Math.sin(t * 3 + i + j), 6, 30) })
  S.asker(x, t, { x: 230, y: 1000, s: 200, pop: k, mood: 'happy', look: [1, 0], hops: [T.coffee + 0.4, 27.6] })
  S.rel(x, t, { color: '#c9a6ff', acc: [['bow', '#f2c75c']], x: 540, y: 900, s: 170, pop: k, mood: 'sparkle', look: [0, 0.3], hops: [T.coffee + 0.6, 27.7] })
  S.partner(x, t, { x: 850, y: 1000, s: 200, pop: k, mood: t > 27.6 ? 'heart' : 'happy', look: [-1, 0], hops: [T.coffee + 0.5, 27.6] })
  hearts(x, t, 27.6, 540, 760, { n: 7 })
}

const EP = makeFamily({
  id: 'nf16e12', D: 35, key: 'Em', asker: 'scorpio', partner: 'leo',
  askerAcc: [['scarf', '#ff8fb1']], partnerAcc: [['beanie', '#3fb08a']],
  q: { text: '“They’re not ready | to *meet my family.*”', sign: '— a Scorpio, staring at a text', out: [2.9, 3.2], size: 78, accentSize: 100 },
  hook,
  hookPis: { x: 950, y: 1360, s: 115, at: 0.6, tears: 1, look: [-1, -1] },
  beats: [
    { t0: T.b1, t1: T.b2, head: 'The *spiral.*', accent: PINK, size: 104, accentSize: 150, draw: beat1, stars: null, pis: { x: 950, y: 1350, s: 115, tears: 2, look: [-1, -1], at: 1.0 } },
    { t0: T.b2, t1: T.b3, head: 'Wait | *isn’t* never.', accent: GOLD, draw: beat2, stars: { x: 220, y: 1120, s: 190 }, pis: { x: 950, y: 1350, s: 115, tears: 1, look: [-1, -1], at: 1.0 } },
    { t0: T.b3, t1: T.end, head: 'Start | *small.*', accent: MINT, size: 104, accentSize: 150, draw: beat3, stars: { x: 140, y: 1300, s: 140, at: 6.0 }, pis: { x: 950, y: 1330, s: 125, tears: 3, mood: 'happy', look: [-1, -1], at: 5.0 } },
  ],
  boxes: BOXES,
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, T.coffee],
  flashes: [T.b1, T.coffee],
  cues: [
    ['riser', T.b1, T.b1 + 4, 0.012],
    ...[0.6, 1.9, 3.2].map((a, i) => ['pop', +(T.b1 + a).toFixed(3), [880, 1046.5, 1318.51][i], 0.035, [-0.3, 0.3, 0][i]]),
    ['riser', T.calm[0], T.calm[1], 0.01], ['bell', 14.6, 1760, 0.025, 1, 0],
    ['pop', 19.4, 1174.66, 0.04, 0.2], ['pop', 21.6, 987.77, 0.04, -0.2],
    ['whoosh', T.coffee - 0.1, 0.35, 0.03], ['pop', T.coffee + 0.3, 1318.51, 0.035, 0], ['pluck', 27.6, 1174.66, 0.04, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ink, RED, lerp, clamp, outK]
