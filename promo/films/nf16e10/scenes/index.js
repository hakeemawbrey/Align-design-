// nf16e10: MEET THE FAMILY, Ep 10, "What do I bring to their parents?" (30 s vertical, star_advice, music: pop · F).
// Story 0–25.6, then the shared end card. The series look lives in ../../nf16e01/scenes/familykit.js.
//   0.0–3.0    DEAR STARS: "“What do I bring | their *parents?*”" — a Virgo, on attempt seven. ♍ Virgo mid-hop under a
//              wobbling tower of gift options.
//   3.0–9.6    "The gift | *pile.*"  More drops on: a vase, a BREAD MAKER box, a framed GIFT PLAN v7. VIRGO: "I made a
//              *ranking.* there are twelve finalists."
//   9.6        card cut.
//   9.6–16.0   "Ask what | they *love.*"  THE STARS: "skip the pile. ask what they *love.*" ♋ CANCER: "mom always talks
//              about that *mint tea.*" The pile slides away; one small tea tin glows.
//  16.0–25.6   "Small. | *Thoughtful.*"  The door opens; MOM: "you *remembered!*" Hearts; Pisces fountains in the hallway.
//              THE STARS: "Bring something that shows you listened."
import { makeFamily, K, box, R, ink, sparkles, hearts, shadow, gift, teaTin, frontDoor, snow, drawBits,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, GOLD, BONE, PINK, MINT, SKYB, PINE, INTER, INK } from '../../nf16e01/scenes/familykit.js'

const VIR = K.tag('virgo'), CAN = K.tag('cancer')
const T = { b1: 3.0, b2: 9.6, b3: 16.0, end: 25.61, drops: [3.6, 4.4, 5.2], slide: 13.8, open: 16.2 }
const BOXES = [
  { open: 5.8, close: 9.4, lines: [{ t: 6.0, speaker: VIR, color: MINT, text: 'I made a *ranking.* there are twelve finalists.' }] },
  { open: 10.0, close: 15.8, lines: [
    { t: 10.2, speaker: K.STARS, text: 'skip the pile. ask what they *love.*' },
    { t: 12.5, speaker: CAN, color: SKYB, text: 'mom always talks about that *mint tea.*' },
  ] },
  { open: 17.0, close: 25.1, lines: [
    { t: 17.2, speaker: 'MOM', color: '#ffd1a0', text: 'you *remembered!*' },
    { t: 19.4, speaker: K.STARS, text: 'Bring something that shows you listened.' },
  ] },
]
function vase(x, cx, cy) { box(x, cx - 40, cy - 70, 80, 120, '#7fb5e0', { b: 6, hi: '#a8d0f0' }); box(x, cx - 26, cy - 100, 52, 30, '#7fb5e0', { b: 5 }); R(x, PINK, cx - 10, cy - 140, 20, 40) }
function breadBox(x, cx, cy) { box(x, cx - 120, cy - 70, 240, 140, '#e9b24a', { b: 6 }); ink(x, 'BREAD', cx, cy - 18, { size: 34, font: INTER, weight: 800 }); ink(x, 'MAKER', cx, cy + 22, { size: 34, font: INTER, weight: 800 }) }
function frame(x, cx, cy) { box(x, cx - 130, cy - 90, 260, 180, WOODC, { b: 6 }); box(x, cx - 110, cy - 70, 220, 140, BONE, { b: 3 }); ink(x, 'GIFT PLAN v7', cx, cy - 40, { size: 24 }); for (let i = 0; i < 4; i++) R(x, i % 2 ? PINK : MINT, cx - 90, cy - 14 + i * 20, 60 + i * 30, 12) }
const WOODC = '#a0703c'
// the pile, drawn bottom-up; n = how many items have landed (0…3 extra)
function pile(x, t, cx, base, extra, wob = 0) {
  x.save(); x.translate(cx, base); x.rotate(0.03 * Math.sin(t * 3) * wob); x.translate(-cx, -base)
  gift(x, cx - 80, base - 50, 1.1, { col: '#c2334f' }); gift(x, cx + 90, base - 50, 1.0, { col: '#3f7cf0', rib: BONE })
  gift(x, cx, base - 170, 1.0, { col: PINE })
  const items = [vase, breadBox, frame]
  const ys = [base - 300, base - 400, base - 560]
  items.forEach((f, i) => {
    if (i >= extra.length) return
    const k = extra[i]; if (k <= 0.01) return
    const y = lerp(ys[i] - 700, ys[i], ease.outCubic(k))
    f(x, cx + [-60, 40, 0][i], y)
  })
  x.restore()
}
function hook(x, t, S) {
  pile(x, t, 600, 1290, [1, 1], 1)
  shadow(x, 300, 1360, 220)
  S.asker(x, t, { x: 300, y: 1210, s: 230, mood: 'wide', look: [1, -1], hops: [-0.12, 1.0, 2.0] })
}
function beat1(x, t, S) {
  pile(x, t, 600, 1290, T.drops.map(a => prog(t, a, a + 0.35)), 1 + (t - S.t0) * 0.4)
  T.drops.forEach(a => sparkles(x, t, 600, 900, a + 0.35, 6, 120, 1))
  shadow(x, 260, 1360, 220)
  S.asker(x, t, { x: 260, y: 1210, s: 230, mood: t > 6.0 ? 'happy' : 'wide', look: [1, -1], hops: T.drops.map(a => a + 0.35) })
}
function beat2(x, t, S) {
  const sl = ease.inCubic(prog(t, T.slide, T.slide + 0.6))
  if (sl < 1) { x.save(); x.translate(sl * 900, sl * 200); x.rotate(sl * 0.4); pile(x, t, 600, 1290, [1, 1, 1], 1); x.restore() }
  const tk = pop01(t, T.slide + 0.3, 0.4, 2.4)
  if (tk > 0.01) { const g = x.createRadialGradient(620, 1080, 0, 620, 1080, 260); g.addColorStop(0, 'rgba(159,230,176,0.35)'); g.addColorStop(1, 'rgba(159,230,176,0)'); x.fillStyle = g; x.fillRect(360, 820, 520, 520); teaTin(x, 620, 1120, 1.5 * tk, { label: 'MINT' }) }
  sparkles(x, t, 620, 1100, T.slide + 0.7, 10, 180, 2, [MINT, GOLD, BONE])
  shadow(x, 260, 1360, 220); shadow(x, 900, 1360, 180)
  S.asker(x, t, { x: 260, y: 1210, s: 230, mood: t > T.slide ? 'sparkle' : 'neutral', look: [1, -0.5], hops: [T.slide + 0.9] })
  S.partner(x, t, { x: 900, y: 1230, s: 180, mood: 'happy', look: [-1, -0.3], pop: pop01(t, 12.2, 0.3, 2) })
}
function beat3(x, t, S) {
  frontDoor(x, t, { cx: 540, floor: 1250, s: 0.95, open: ease.inOutCubic(prog(t, T.open, T.open + 0.8)) })
  snow(x, t, { n: 40, y0: 380, y1: 1380, seed: 10 })
  const lit = t > 17.2
  S.rel(x, t, { color: '#ffd1a0', acc: [['bow', '#c2334f']], x: 560, y: 1050, s: 190, mood: lit ? 'sparkle' : 'happy', look: [-1, 0.3], hops: [17.2, 17.6], pop: pop01(t, T.open + 0.5, 0.3, 2) })
  hearts(x, t, 17.4, 560, 880, { n: 6 })
  shadow(x, 300, 1360, 210); shadow(x, 760, 1360, 170)
  S.asker(x, t, { x: 300, y: 1210, s: 210, mood: lit ? 'happy' : 'neutral', look: [1, -0.4], hops: [17.5, 22.4] })
  teaTin(x, 420, 1170 + 4 * Math.sin(t * 4), 0.9, { label: 'MINT' })
  S.partner(x, t, { x: 780, y: 1230, s: 170, mood: 'happy', look: [-1, -0.4], hops: [17.6, 22.5] })
}

const EP = makeFamily({
  id: 'nf16e10', D: 30, key: 'F', asker: 'virgo', partner: 'cancer',
  askerAcc: [['glasses']], partnerAcc: [['beanie', '#7fd0ff']],
  q: { text: '“What do I bring | their *parents?*”', sign: '— a Virgo, on attempt seven', out: [2.7, 3.0], accentSize: 120 },
  hook,
  hookPis: { x: 950, y: 1360, s: 110, at: 0.6, tears: 1, look: [-1, -1] },
  beats: [
    { t0: T.b1, t1: T.b2, head: 'The gift | *pile.*', accent: PINK, draw: beat1, stars: null, pis: { x: 950, y: 1360, s: 115, tears: 2, look: [-1, -1], at: 0.6 } },
    { t0: T.b2, t1: T.b3, head: 'Ask what | they *love.*', accent: MINT, draw: beat2, stars: { x: 150, y: 960, s: 140, mood: 'happy' }, pis: { x: 960, y: 560, s: 105, tears: 2, mood: 'sparkle', look: [-1, 1], at: 4.6 } },
    { t0: T.b3, t1: T.end, head: 'Small. | *Thoughtful.*', accent: GOLD, draw: beat3, stars: { x: 140, y: 1300, s: 140, at: 3.0 }, pis: { x: 860, y: 700, s: 110, tears: 3, mood: 'happy', look: [-1, 1], at: 1.4, noTissues: true } },
  ],
  boxes: BOXES,
  cuts: [{ t: T.b2, kind: 'flip' }],
  flashes: [T.b1, T.b3],
  shakes: T.drops.map(a => a + 0.35),
  cues: [
    ...T.drops.flatMap((a, i) => [['whoosh', a, 0.3, 0.03], ['tom', +(a + 0.35).toFixed(3), [120, 105, 92][i], { gain: 0.22, decay: 0.25 }]]),
    ['whoosh', T.slide, 0.6, 0.04], ['pop', T.slide + 0.4, 1318.51, 0.05, 0], ['glitter', T.slide + 0.5, T.slide + 1.0],
    ['tick', T.open, 0.05], ['pluck', 17.4, 1567.98, 0.04, 0.5, 0], ['bell', 17.5, 1760, 0.03, 1, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawBits, INK, clamp, outK, easeOutBack]
