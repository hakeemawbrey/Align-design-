// nhse03: HOLIDAY SURVIVAL GUIDE No. 3, "Plus-One Short." (30 s vertical, Next 30 · b29, music: funk · G)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "Everyone came | *in pairs.*"  ♐ Sagittarius stands in the party doorway holding a cocoa while couples
//              sway two by two, little hearts between them. Pisces sniffles by the tree.
//   6.6–13.9   "Look busy. | *Very* busy."  At the snack table Sag refolds the same napkin over and over (FOLDS: 14).
//              ♐: "I'm just… really into napkins."
//   13.9       card cut.
//   13.9–21.6  "You're a | *whole* one."  THE STARS: "you're not a plus-one *short*." / "you're a *whole* one. go say hi."
//              Sag says hi: the best talker in the room, the host's dog, a cocoa refill. Three ticks.
//   21.6–25.6  "Packed: | *one name sticker.*"  THE STARS: "Came solo. Left with three new friends."
import { makeSurv, R, box, ink, room, table, door, mug, drawBits, sparkles, hearts, label, shadow, bubble, HEART,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, PINE, INTER } from '../../nhse01/survkit.js'

const SAG = '#c9a6ff'
const COUPLES = [['libra', 'leo'], ['virgo', 'aries'], ['cancer', 'capricorn']]
function couple(x, t, star, cx, cy, s, [a, b], seed, k = 1) {
  if (k <= 0.01) return
  const sw = Math.sin(t * 2.2 + seed) * 14
  star(a, x, t, { x: cx - s * 0.42 + sw, y: cy, s, pop: k, mood: 'happy', seed: seed * 3, look: [1, 0] })
  star(b, x, t, { x: cx + s * 0.42 + sw, y: cy, s, pop: k, mood: 'happy', seed: seed * 3 + 1, look: [-1, 0] })
  drawBits(x, HEART, { H: '#ff5c8a' }, cx + sw, cy - s * 0.55 - 6 * Math.abs(Math.sin(t * 3 + seed)), 5 * k)
}
function tree(x, t, cx, by, h) {
  for (let i = 0; i < 4; i++) { const w = h * (0.3 + i * 0.16), y = by - h + i * h * 0.2; box(x, cx - w / 2, y + h * 0.1, w, h * 0.2, PINE, { b: 5 }) }
  R(x, '#6b3f2a', cx - 16, by - h * 0.1, 32, h * 0.12)
  drawBits(x, ['..G..', '.GGG.', 'GGGGG', '.G.G.'], { G: GOLD }, cx, by - h + 20, 7)
  for (let i = 0; i < 8; i++) { const on = Math.sin(t * 3 + i) > 0; R(x, on ? ['#ff5c6c', GOLD, '#7fd0ff'][i % 3] : '#2a1f4a', cx - h * 0.3 + ((i * 53) % (h * 0.6)), by - h * 0.75 + i * h * 0.08, 12, 12) }
}
function dog(x, t, cx, cy, s, wag = 1) {
  const tail = Math.sin(t * 16) * wag
  drawBits(x, ['B..........', 'BB.....BBB.', '.BBBBBBBEBN', '.BBBBBBBBBB', '.BBBBBBBB..', '.B.B..B.B..'], { B: '#c88a4a', E: INK, N: INK }, cx, cy, 11 * s)
  x.save(); x.translate(cx - 60 * s, cy - 30 * s); x.rotate(-0.6 + tail * 0.5); R(x, INK, -6, -40 * s, 14, 44 * s); R(x, '#c88a4a', -3, -37 * s, 8, 38 * s); x.restore()
}

function act0(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: { x: 640, y: 470, w: 260, h: 300 } })
  tree(x, t, 900, 1240, 360)
  COUPLES.forEach((c, i) => couple(x, t, star, [560, 760, 420][i], [1180, 1140, 1000][i], 110, c, i + 1, pop01(t, -1 + i * 0.01 + (i === 2 ? 1.4 : 0), 0.3, 2)))
  door(x, 180, 1250, { w: 200, h: 380, col: '#5a3a6a', open: 1, wreath: false })
  shadow(x, 180, 1255, 200)
  hero(x, t, { x: 180, y: 1120, s: 210, mood: u > 2.5 ? 'wide' : 'neutral', look: [1, 0], hops: [0.4, 2.5] })
  mug(x, t, 270, 1150, 0.9)
  // a pair walks in through the door past Sag, holding hands
  const w = prog(u, 3.4, 5.6)
  if (w > 0 && w < 1) couple(x, t, star, lerp(-120, 360, w), 1190, 100, ['taurus', 'aquarius'], 7)
  bubble(x, t, 230, 860, 4.6, 6.5, '…oh.', { size: 32, tail: -0.4 })
}

function act1(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: null })
  COUPLES.slice(0, 2).forEach((c, i) => couple(x, t, star, [300, 820][i], 980, 90, c, i + 4))
  table(x, 540, 1100, 620, { cloth: '#3a6a8a' })
  // snacks
  for (let i = 0; i < 4; i++) { box(x, 290 + i * 140, 1070, 90, 30, BONE, { b: 4 }); R(x, ['#e0a050', '#ff8fb1', '#9fe6b0', '#e0a050'][i], 300 + i * 140, 1060, 70, 14) }
  // Sag refolds the same napkin, faster and faster
  const fold = (u * (1.4 + u * 0.35)), ph = fold % 1, n = Math.floor(fold)
  hero(x, t, { x: 540, y: 960, s: 220, mood: u > 4 ? 'squint' : 'neutral', look: [0, 1], hops: [S.t0 + 1, S.t0 + 2, S.t0 + 3] })
  x.save(); x.translate(540, 1060); x.scale(1, Math.abs(Math.cos(Math.PI * ph))); box(x, -60, -24, 120, 48, '#fff', { b: 5 }); R(x, RED, -60, -6, 120, 8); x.restore()
  box(x, 90, 560, 250, 90, BONE, { b: 6 }); ink(x, `FOLDS: ${Math.min(14, n)}`, 215, 605, { size: 30, font: INTER, weight: 800 })
}

function act2(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: null })
  const k1 = pop01(t, S.t0 + 1.2, 0.3, 2.2), k2 = pop01(t, S.t0 + 3.0, 0.3, 2.2), k3 = pop01(t, S.t0 + 4.6, 0.3, 2.2)
  // the best talker (Gemini) mid-story, the host's dog, a cocoa refill
  if (k1 > 0.01) { star('gemini', x, t, { x: 760, y: 900, s: 150, pop: k1, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.3, S.t0 + 1.7, S.t0 + 2.1] }); bubble(x, t, 820, 760, S.t0 + 1.5, S.t0 + 7.6, 'and THEN…', { size: 28, tail: -0.4 }) }
  if (k2 > 0.01) { x.save(); x.translate(820, 1170); x.scale(1.5 * k2, 1.5 * k2); dog(x, t, 0, 0, 1); x.restore(); hearts(x, t, S.t0 + 3.2, 820, 1100, { n: 4, cell: 5 }) }
  shadow(x, 520, 1260, 200)
  hero(x, t, { x: 520, y: 1110, s: 220, mood: u > 1.3 ? 'happy' : 'neutral', look: [1, -0.2], hops: [S.t0 + 1.25, S.t0 + 3.05, S.t0 + 4.65, S.t0 + 6] })
  if (k3 > 0.01) { mug(x, t, 640, 1130, k3); sparkles(x, t, 640, 1110, S.t0 + 4.62, 6, 60, 1, [GOLD, BONE]) }
  // ticks
  ;[['BEST TALKER', 1.2], ['THE DOG', 3.0], ['COCOA REFILL', 4.6]].forEach(([s, a], i) => {
    const k = pop01(t, S.t0 + a + 0.2, 0.3, 2.6)
    if (k <= 0.01) return
    x.save(); x.translate(200, 640 + i * 90); x.scale(k, k); box(x, -24, -24, 48, 48, MINT, { b: 5 }); ink(x, '✓', 0, 2, { size: 34, font: INTER, weight: 800 }); x.restore()
    label(x, s, 250, 640 + i * 90, { size: 30, align: 'left', alpha: clamp(k) })
  })
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.06)
  box(x, -170, -90, 340, 180, '#fff', { b: 7 })
  R(x, '#d24a3c', -170, -90, 340, 64)
  ink(x, 'HELLO,', 0, -58, { size: 34, font: INTER, weight: 800, col: BONE })
  ink(x, 'I’M HERE', 0, 30, { size: 46, font: INTER, weight: 800, col: INK })
  x.restore()
}

const EP = makeSurv({
  id: 'nhse03', ep: 3, hero: 'sagittarius', accent: SAG,
  heads: ['Everyone came | *in pairs.*', 'Look busy. | *Very* busy.', 'You’re a | *whole* one.', 'Packed: | *one name sticker.*'],
  acts: [act0, act1, act2],
  line1: { t: 9.3, speaker: '♐︎ SAGITTARIUS', color: SAG, text: 'I’m just… really into *napkins*.', close: 13.5 },
  tips: ['you’re not a plus-one *short*.', 'you’re a *whole* one. go say hi.'],
  last: 'Came solo. Left with *three* new friends.',
  item: { label: 'ONE NAME STICKER', draw: item },
  pis: [{ x: 990, y: 1290, s: 100 }, { x: 960, y: 640, s: 100, noTissues: true }, { x: 950, y: 470, s: 100, noTissues: true }],
  cues: [
    [['pop', 3.45, 880, 0.03, -0.4], ['pop', 3.6, 987.77, 0.03, -0.4], ['pluck', 4.6, 392, 0.035, 0.6, -0.3]],
    [0.7, 1.35, 1.9, 2.4, 2.85, 3.25, 3.6, 3.95, 4.25, 4.55, 4.85, 5.1, 5.35, 5.6].map(a => ['tick', a, 0.035]),
    [['pop', 1.25, 1174.66, 0.04, 0.3], ['pop', 3.05, 987.77, 0.04, 0.3], ['pop', 3.2, 1318.51, 0.03, 0.3], ['pop', 4.65, 1567.98, 0.04, 0.2], ['tick', 1.4, 0.04], ['tick', 3.2, 0.04], ['tick', 4.8, 0.04]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, GOLD, RED, lerp, clamp, ease, outK]
