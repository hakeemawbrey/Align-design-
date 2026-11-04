// nf16e05: MEET THE FAMILY, Ep 5, "The question you're not ready for." (40 s vertical, star_advice, music: cinematic · Dm).
// Story 0–35.6, then the shared end card. The series look lives in ../../nf16e01/scenes/familykit.js.
//   0.0–3.2    DEAR STARS: "“So when’s the | *wedding?*”" — a Sagittarius, mid-bite. ♐ Sag frozen at the dinner table, a
//              spoonful of pie halfway up; the relatives lean in.
//   3.2–10.6   "The whole table | *leans in.*"  Freeze-frame: the four relatives slide closer, Sag sweats. SAG: "ok so, the
//              thing about *timelines* is—" A speech timer ticks MIN 1… MIN 20.
//  10.6–19.8   "Warm *and* vague." THE STARS: "breathe. you can be *warm* and vague." → "try: we're really happy. you'll be
//              the *first* to know."
//  19.8        card cut.
//  19.8–26.2   "Said kindly. | *Done.*"  SAG: "we're really happy. you'll be the *first* to know!" The table: "aww!"; ♒ Aquarius
//              squeezes Sag's hand (hearts); the Pisces cousin fountains.
//  26.2        ★ LESSON UNLOCKED: "You don’t owe | anyone a *timeline.*"  +1 COMPOSURE
//  30.2–35.6   "Now pass | the *pie.*"  THE STARS: "Happy is a full answer."
import { makeFamily, K, box, R, ink, sparkles, hearts, shadow, diningRoom, table, bubble, drawBits,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, GOLD, BONE, PINK, MINT, SKYB, RED, SWEAT, INK } from '../../nf16e01/scenes/familykit.js'

const SAG = K.tag('sagittarius')
const T = { b1: 3.2, b2: 10.6, b3: 19.8, lesson: 26.2, b4: 30.2, end: 35.61, speech: 6.8, aww: 21.9, squeeze: 22.4 }
const BOXES = [
  { open: 6.6, close: 10.4, lines: [{ t: T.speech, speaker: SAG, color: '#c9a6ff', text: 'ok so, the thing about *timelines* is—' }] },
  { open: 11.0, close: 19.6, lines: [
    { t: 11.2, speaker: K.STARS, text: 'breathe. you can be *warm* and vague.' },
    { t: 14.0, speaker: K.STARS, text: "try: we're really happy. you'll be the *first* to know." },
  ] },
  { open: 20.0, close: 26.0, lines: [{ t: 20.2, speaker: SAG, color: '#c9a6ff', text: "we're really happy. you'll be the *first* to know!" }] },
  { open: 30.75, close: 35.1, lines: [{ t: 30.95, speaker: K.STARS, text: 'Happy is a full answer.' }] },
]
const RELS = [
  { color: '#ff9a6a', acc: [['glasses']], seed: 31, x: 180 }, { color: '#9fe6b0', acc: [['beanie', '#3f7cf0']], seed: 32, x: 370 },
  { color: '#ffd1a0', acc: [['bow', '#e8344e']], seed: 33, x: 720 }, { color: '#c9a6ff', acc: [['scarf', '#f2c75c']], seed: 34, x: 900 },
]
// the table, the relatives leaning toward the centre by `lean`
function dinner(x, t, S, { lean = 0, mood = 'wide', happy = false } = {}) {
  diningRoom(x, t, { top: 420, floor: 1340 })
  RELS.forEach((r, i) => {
    const dx = (540 - r.x) * 0.22 * lean
    S.rel(x, t, { ...r, x: r.x + dx, y: 1060 - 20 * lean, s: 170, mood: happy ? 'happy' : mood, look: [Math.sign(540 - r.x), 0.2], hops: happy ? [T.aww + i * 0.1] : [] })
  })
  table(x, t, { y: 1190, dishes: ['plates', 'pie', 'candles'] })
}
function sag(x, t, S, o) {
  shadow(x, 520, 1350, 260)
  const F = S.asker(x, t, { x: 520, y: 1200, s: 250, ...o })
  return F
}
function spoon(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -6, 0, 12, 110, '#c9c3dc', { b: 4 }); box(x, -26, -36, 52, 40, '#c9c3dc', { b: 4 }); R(x, '#e3a05a', -18, -46, 36, 18)
  x.restore()
}
function hook(x, t, S) {
  dinner(x, t, S, { lean: 0.6 + 0.1 * Math.sin(t * 2) })
  sag(x, t, S, { mood: 'wide', look: [0, 0], bob: 0, hops: [-0.12] })
  spoon(x, 690, 1150, -0.4)
  drawBits(x, SWEAT, { S: SKYB, W: '#ffffff' }, 640, 1060 + ((t * 120) % 60), 6)
}
function beat1(x, t, S) {
  const u = t - S.t0
  const freeze = u < 1.2
  dinner(x, t, S, { lean: clamp(u / 2.5) })
  sag(x, t, S, { mood: t > T.speech ? 'happy' : 'wide', look: [0, 0], bob: freeze ? 0 : undefined, hops: t > T.speech ? [T.speech, T.speech + 0.5, T.speech + 1.0, T.speech + 1.5] : [] })
  if (freeze) { x.save(); x.globalAlpha = 0.25 * (1 - u / 1.2); R(x, '#c9c3dc', 0, 380, 1080, 1000); x.restore(); ink(x, 'FREEZE', 540, 640, { size: 70, col: BONE, font: "Inter, sans-serif", weight: 800, alpha: 1 - u / 1.2 }) }
  for (let i = 0; i < 3; i++) drawBits(x, SWEAT, { S: SKYB, W: '#ffffff' }, 390 + i * 130, 1060 + ((t * 140 + i * 30) % 70), 5)
  if (t > T.speech) {
    const mins = Math.min(20, 1 + Math.floor((t - T.speech) * 6))
    box(x, 720, 470, 300, 80, BONE, { b: 6 }); ink(x, `SPEECH · MIN ${mins}`, 870, 512, { size: 28, col: RED })
      }
}
function beat2(x, t, S) {
  // the camera pulls out of the table: just Sag and THE STARS, a calm pool of light
  x.save(); x.globalAlpha *= 0.5; diningRoom(x, t, { top: 420, floor: 1340, lights: true }); x.restore()
  const g = x.createRadialGradient(560, 1050, 0, 560, 1050, 420); g.addColorStop(0, 'rgba(255,220,160,0.28)'); g.addColorStop(1, 'rgba(255,220,160,0)'); x.fillStyle = g; x.fillRect(0, 500, 1080, 1000)
  shadow(x, 620, 1300, 260)
  const calm = ease.inOutCubic(prog(t, 11.4, 13.0))
  S.asker(x, t, { x: 620, y: 1120, s: 270, mood: calm > 0.5 ? 'happy' : 'wide', look: [-1, -0.4], squash: 0.08 * Math.sin(t * 2.2) * calm, hops: [16.6] })
  // a breath: the rings
  for (let i = 0; i < 3; i++) { const p = ((t - 11.2) * 0.5 + i / 3) % 1; if (t < 11.2) break; x.save(); x.globalAlpha = 0.35 * (1 - p); x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.arc(620, 1080, 160 + p * 220, 0, Math.PI * 2); x.stroke(); x.restore() }
}
function beat3(x, t, S) {
  dinner(x, t, S, { lean: 0.5 * (1 - prog(t, T.aww, T.aww + 0.6)), mood: 'wide', happy: t > T.aww })
  sag(x, t, S, { mood: 'happy', look: [1, 0] })
  S.partner(x, t, { x: 780, y: 1230, s: 180, mood: t > T.squeeze ? 'heart' : 'happy', look: [-1, 0], hops: [T.squeeze] })
  if (t > T.aww) ['aww!', 'aww!!', 'lovely!', 'aww!'].forEach((s, i) => bubble(x, t, RELS[i].x, 800 + (i % 2) * 40, T.aww + i * 0.15, S.t1, s, { size: 32, tail: i < 2 ? 0.3 : -0.3 }))
  hearts(x, t, T.squeeze, 650, 1080, { n: 6 })
}
function beat4(x, t, S) {
  dinner(x, t, S, { happy: true })
  sag(x, t, S, { mood: t > 33 ? 'sparkle' : 'happy', look: [1, 0], hops: [S.t0 + 0.4, 33] })
  S.partner(x, t, { x: 780, y: 1230, s: 180, mood: 'happy', look: [-1, 0], hops: [33.1] })
  spoon(x, 690, 1150 + 10 * Math.sin(t * 4), -0.4)
}

const EP = makeFamily({
  id: 'nf16e05', D: 40, key: 'Dm', asker: 'sagittarius', partner: 'aquarius',
  askerAcc: [['scarf', '#f2c75c']], partnerAcc: [['beanie', '#9fe6b0']],
  q: { text: '“So when’s the | *wedding?*”', sign: '— a Sagittarius, mid-bite', out: [2.9, 3.2], accentSize: 130 },
  hook,
  beats: [
    { t0: T.b1, t1: T.b2, head: 'The whole table | *leans in.*', accent: PINK, draw: beat1, stars: null, pis: { x: 960, y: 1320, s: 120, tears: 1, look: [-1, -1], at: 1.6 } },
    { t0: T.b2, t1: T.b3, head: 'Warm *and* vague.', accent: GOLD, draw: beat2, stars: { x: 220, y: 1120, s: 190, mood: 'happy', look: [1, 0] }, pis: { x: 960, y: 1320, s: 110, tears: 1, look: [-1, -1], at: 2.5 } },
    { t0: T.b3, t1: T.lesson, head: 'Said kindly. | *Done.*', accent: MINT, draw: beat3, stars: null, pis: { x: 960, y: 1320, s: 130, tears: 3, mood: 'sparkle', look: [-1, -1], at: 2.0 } },
    { t0: T.lesson, t1: T.b4, head: null, draw: beat3, stars: null, pis: null, punch: false },
    { t0: T.b4, t1: T.end, head: 'Now pass | the *pie.*', accent: GOLD, draw: beat4, stars: { x: 140, y: 1300, s: 140 }, pis: { x: 950, y: 1310, s: 130, tears: 3, mood: 'happy', look: [-1, -1], at: 0.6 } },
  ],
  boxes: BOXES,
  lesson: { at: T.lesson, out: [30.0, 30.2], text: 'You don’t owe | anyone a *timeline.*', chip: '+1 COMPOSURE', accentColor: PINK, dim: 0.6 },
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, T.b4],
  flashes: [T.b2],
  shakes: [T.b1],
  cues: [
    ['boom', 0.1, 0.25], ['tick', T.b1, 0.08], ['whoosh', T.b1 + 0.02, 0.2, 0.05], ['pluck', T.b1 + 0.05, 220, 0.05, 0.3, 0],
    ['riser', T.b1 + 1.2, T.speech, 0.015],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.speech + 0.4 + i * 0.4).toFixed(3), 0.025]),
    ['riser', 11.2, 13.0, 0.01],
    ...[0, 0.15, 0.3, 0.45].map((a, i) => ['pop', +(T.aww + a).toFixed(3), [987.77, 1174.66, 1318.51, 1567.98][i], 0.035, i % 2 ? 0.4 : -0.4]),
    ['pluck', T.squeeze, 1174.66, 0.04, 0.5, 0], ['bell', T.squeeze + 0.1, 1760, 0.025, 1, 0],
    ['pop', 33, 1318.51, 0.03, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, INK, lerp, pop01, outK, easeOutBack, BONE]
