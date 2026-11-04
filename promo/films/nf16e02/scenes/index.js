// nf16e02: MEET THE FAMILY, Ep 2, "You're meeting their whole family." (33 s vertical, star_advice, music: dreamy · Eb).
// Story 0–30.6, then the short 2.4 s end card (no card-cut transition). The series look lives in ../../nf16e01/scenes/familykit.js.
//   0.0–3.2    DEAR STARS: "“I’m meeting | their *whole family.*”" — a Cancer, packing tonight. ♋ Cancer mid-hop,
//              juggling name flash cards. Pisces sniffles (bottom right).
//   3.2–10.6   "Twelve names. | *One* brain."  The flash cards flutter everywhere. THE STARS: "you don't have to *impress*
//              them." → "be kind and *curious.* that's plenty."
//  10.6–20.4   "Ask for the | *cheat sheet.*"  CANCER: "who should I know before I walk in?" ♌ LEO: "three things. I've got
//              you." A cue card writes on: MOM: LOVES HER GARDEN · SKIP: WORK TALK · JOKE: THE TINY TURKEY. LEO: "and I'll
//              be *right* next to you."
//  20.4–30.6   "Kind. Curious. | *You.*"  The front door opens on a warm hallway; Pisces waves from the window, fountaining.
//              THE STARS: "they're curious about *you* too." → "You’re not auditioning. You’re visiting."
import { makeFamily, K, box, ink, sparkles, hearts, shadow, cueCard, frontDoor, snow, livingRoom, drawBits,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, GOLD, BONE, PINK, MINT, SKYB, QMARK } from '../../nf16e01/scenes/familykit.js'

const CAN = K.tag('cancer'), LEO = K.tag('leo')
const T = { b1: 3.2, b2: 10.6, b3: 20.4, end: 30.61, sheet: 14.9, l1: 15.6, l2: 16.3, l3: 17.0, door: 21.0 }
const BOXES = [
  { open: 4.8, close: 10.4, lines: [
    { t: 5.0, speaker: K.STARS, text: "you don't have to *impress* them." },
    { t: 7.5, speaker: K.STARS, text: "be kind and *curious.* that's plenty." },
  ] },
  { open: 11.0, close: 20.2, lines: [
    { t: 11.2, speaker: CAN, color: SKYB, text: 'who should I *know* before I walk in?' },
    { t: 13.8, speaker: LEO, color: GOLD, text: "three things. I've got *you.*" },
    { t: 17.6, speaker: LEO, color: GOLD, text: "and I'll be *right* next to you." },
  ] },
  { open: 21.4, close: 30.1, lines: [
    { t: 21.6, speaker: K.STARS, text: "they're curious about *you* too." },
    { t: 24.2, speaker: K.STARS, text: 'You’re not auditioning. You’re visiting.' },
  ] },
]
const NAMES = ['AUNT JUNE', 'COUSIN RAE', 'GRANDPA LOU', 'UNCLE BO', 'NANA PEARL', 'LITTLE MO', 'DAD', 'MOM', 'COUSIN DEV', 'AUNT FEN', 'BABY KIT', 'THE DOG?']

function hook(x, t, S) {
  shadow(x, 540, 1350, 280)
  S.asker(x, t, { x: 540, y: 1160, s: 280, mood: 'wide', look: [0, -1], hops: [-0.12, 0.7, 1.4, 2.1, 2.8] })
  for (let i = 0; i < 3; i++) {
    const a = t * 3.2 + i * 2.09, cx = 540 + Math.cos(a) * 280, cy = 830 + Math.sin(a) * 60
    cueCard(x, cx, cy, { w: 230, h: 130, text: NAMES[i], size: 28, rot: 0.3 * Math.sin(a) })
  }
}
function beat1(x, t, S) {
  const u = t - S.t0
  // twelve cards flutter down, spinning, over and over
  NAMES.forEach((n, i) => {
    const ph = ((u * 0.22 + i / 12) % 1), cx = 120 + ((i * 263) % 840), cy = 420 + ph * 900
    cueCard(x, cx + 40 * Math.sin(t * 2 + i), cy, { w: 210, h: 120, text: n, size: 24, rot: 0.5 * Math.sin(t * 1.6 + i), k: clamp(u * 3 - i * 0.15) })
  })
  shadow(x, 540, 1300, 260)
  const spin = u < 4 ? Math.sin(u * 7) : 0
  S.asker(x, t, { x: 540 + 30 * spin, y: 1110, s: 240, mood: u < 4.2 ? 'wide' : 'happy', look: [spin, -1], hops: [S.t0 + 0.3, S.t0 + 1.1, S.t0 + 1.9] })
  if (u < 4.2) drawBits(x, QMARK, { Q: GOLD }, 700, 930 - 10 * Math.sin(t * 6), 7)
}
function beat2(x, t, S) {
  livingRoom(x, t, { top: 420, floor: 1330, tree: false, couchX: 540, couchW: 640 })
  S.asker(x, t, { x: 380, y: 1080, s: 220, mood: t > T.l3 ? 'happy' : t > 13.8 ? 'sparkle' : 'neutral', look: [1, 0] })
  S.partner(x, t, { x: 700, y: 1080, s: 220, mood: 'happy', look: [-1, 0] })
  const ck = easeOutBack(prog(t, T.sheet, T.sheet + 0.4), 1.8)
  if (ck > 0.01) {
    x.save(); x.translate(540, 700); x.rotate(-0.03); x.scale(ck, ck)
    box(x, -330, -190, 660, 380, '#fffbea', { b: 7 })
    ink(x, 'THE CHEAT SHEET', 0, -140, { size: 34, col: '#c2334f' })
    const L = [['1. MOM: LOVES HER GARDEN', T.l1], ['2. SKIP: WORK TALK', T.l2], ['3. JOKE: THE TINY TURKEY', T.l3]]
    L.forEach(([s, a], j) => { const p = prog(t, a, a + 0.5); if (p > 0) { x.save(); x.beginPath(); x.rect(-300, -80 + j * 90, 600 * p, 70); x.clip(); ink(x, s, -290, -45 + j * 90, { size: 34, align: 'left', col: '#2a2a6a', font: "Inter, sans-serif", weight: 800 }); x.restore() } })
    x.restore()
    for (const a of [T.l1, T.l2, T.l3]) sparkles(x, t, 860, 700, a + 0.5, 6, 60, 1)
  }
}
function beat3(x, t, S) {
  const open = ease.inOutCubic(prog(t, T.door, T.door + 0.9))
  frontDoor(x, t, { cx: 540, floor: 1220, s: 0.92, open })
  snow(x, t, { n: 50, y0: 380, y1: 1360, seed: 2 })
  shadow(x, 430, 1330, 220); shadow(x, 660, 1330, 220)
  S.asker(x, t, { x: 430, y: 1180, s: 200, mood: t > 24.2 ? 'happy' : 'sparkle', look: [0.6, -0.8], hops: [T.door + 0.9, 26.0] })
  S.partner(x, t, { x: 660, y: 1180, s: 200, mood: 'happy', look: [-0.6, -0.5], hops: [T.door + 1.0, 26.1] })
  hearts(x, t, 26.0, 540, 1000, { n: 5 })
}

const EP = makeFamily({
  id: 'nf16e02', D: 35, key: 'Eb', asker: 'cancer', partner: 'leo',
  askerAcc: [['beanie', '#7fd0ff']], partnerAcc: [['scarf', '#e8344e']],
  q: { text: '“I’m meeting | their *whole family.*”', size: 80, accentSize: 100, sign: '— a Cancer, packing tonight', out: [2.9, 3.2] },
  hook,
  hookPis: { x: 940, y: 1320, s: 130, at: 0.5, tears: 2, look: [-1, -1] },
  beats: [
    { t0: T.b1, t1: T.b2, head: 'Twelve names. | *One* brain.', accent: SKYB, draw: beat1, stars: { x: 150, y: 1300, s: 150 }, pis: { x: 940, y: 1300, s: 130, tears: 2, look: [-1, -1] } },
    { t0: T.b2, t1: T.b3, head: 'Ask for the | *cheat sheet.*', accent: GOLD, draw: beat2, stars: null, pis: { x: 950, y: 1210, s: 115, tears: 1, mood: 'sparkle', look: [-1, -0.5], at: 4.5, noTissues: true } },
    { t0: T.b3, t1: T.end, head: 'Kind. Curious. | *You.*', accent: PINK, draw: beat3, stars: { x: 140, y: 1300, s: 140 }, pis: { x: 840, y: 700, s: 120, tears: 3, mood: 'happy', look: [-1, 1], at: 1.6, noTissues: true } },
  ],
  boxes: BOXES,
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, 26.0],
  flashes: [T.b1, T.b2],
  cues: [
    ...[0.7, 1.4, 2.1, 2.8].map(a => ['pop', a, 987.77, 0.025, 0.3]),
    ['whoosh', T.b1 + 0.2, 0.5, 0.03], ['riser', T.b1 + 0.3, T.b1 + 4, 0.01],
    ['whoosh', T.sheet, 0.4, 0.035], ['pluck', T.sheet + 0.4, 1174.66, 0.035, 0.5, 0],
    ...[T.l1, T.l2, T.l3].map((a, i) => ['pop', a + 0.5, [1174.66, 1318.51, 1567.98][i], 0.04, 0]),
    ['tick', T.door, 0.05], ['whoosh', T.door + 0.1, 0.6, 0.03], ['bell', T.door + 0.9, 1760, 0.025, 1.0, 0],
    ['pluck', 26.0, 1318.51, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, BONE, lerp, pop01, outK]
