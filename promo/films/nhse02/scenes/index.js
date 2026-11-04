// nhse02: HOLIDAY SURVIVAL GUIDE No. 2, "Small Budget, Big Heart." (30 s vertical, Next 30 · b29, music: jazzy · Eb)
// The series look lives in ../../nhse01/survkit.js.
//   0.0–6.6    "Big heart. | *Small* budget."  ♉ Taurus holds up a shopping receipt that keeps unrolling to the floor;
//              the piggy bank on the side table starts to sweat. Pisces sniffles.
//   6.6–13.9   "Bigger box. | *Same* feeling."  Taurus pushes a gift box that grows taller than the frame; the piggy
//              bank sighs out one last coin. ♉: "if it's bigger, they'll know I care!"
//   13.9       card cut.
//   13.9–21.6  "Give the | *noticing.*"  THE STARS: "the gift is the *noticing*." / "what did they *love* this year?"
//              Taurus remembers (a thought bubble: pancakes!) and makes a coupon: ONE PANCAKE BREAKFAST, MADE BY ME.
//              ♋ Cancer opens it and melts into hearts.
//   21.6–25.6  "Packed: | *a handmade coupon.*"  THE STARS: "Expensive is easy. Specific is love."
import { makeSurv, R, box, ink, room, table, gift, note, drawBits, sparkles, hearts, label, shadow, bubble,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, CREAM, INTER } from '../../nhse01/survkit.js'

const PIG = ['..PP.....PP..', '.PPPPPPPPPPP.', 'PPPPPPPPPPPPP', 'PPEPPPPPPPPPN', 'PPPPPPPPPPPNN', 'PPPPPPPPPPPPP', '.PPPPPPPPPPP.', '.PP.PP..PP.PP']
function piggy(x, t, cx, cy, s, { sweat = 0, sigh = 0 } = {}) {
  const sq = sigh > 0 ? -0.12 * Math.sin(Math.PI * sigh) : 0
  drawBits(x, PIG, { P: '#ff9ec2', E: INK, N: '#e86a9a' }, cx, cy, 10 * s, { sx: 1 - sq, sy: 1 + sq })
  R(x, INK, cx - 20 * s, cy - 42 * s, 40 * s, 8 * s)
  if (sweat > 0) for (let i = 0; i < 2; i++) { const p = ((t * 1.2 + i * 0.5) % 1); x.save(); x.globalAlpha = sweat * (1 - p); R(x, '#8fe3ff', cx - 70 * s + i * 120 * s, cy - 40 * s + p * 50, 10, 14); x.restore() }
}
// a receipt strip hanging from (cx, top), length L, curling on the floor
function receipt(x, cx, top, L, floor) {
  const hang = Math.min(L, floor - top), curl = Math.max(0, L - hang)
  box(x, cx - 60, top, 120, hang, '#fbf8f0', { b: 4 })
  for (let y = top + 50; y < top + hang - 10; y += 26) { R(x, 'rgba(27,18,54,0.3)', cx - 44, y, 50 + ((y * 7) % 30), 6); R(x, 'rgba(27,18,54,0.3)', cx + 20, y, 24, 6) }
  ink(x, 'RECEIPT', cx, top + 24, { size: 18 })
  if (curl > 0) { box(x, cx - 60 - curl, floor - 20, curl + 60, 30, '#fbf8f0', { b: 4 }); for (let i = 0; i * 40 < curl; i++) R(x, 'rgba(27,18,54,0.3)', cx - 50 - i * 40, floor - 10, 24, 6) }
}

function act0(x, t, S) {
  const { u, hero } = S
  room(x, t, { win: { x: 120, y: 470, w: 260, h: 300 } })
  // side table + sweating piggy bank
  table(x, 820, 1080, 280, { cloth: '#3a6a8a' })
  piggy(x, t, 820, 1020, 1, { sweat: clamp(prog(u, 1.5, 2.2)) })
  // Taurus holds the receipt up high; it unrolls to the floor and along it
  const L = 440 + 400 * ease.outCubic(prog(u, 0.0, 4.5)) + 40 * Math.sin(t * 2)
  shadow(x, 440, 1255, 300)
  receipt(x, 560, 700, L, 1240)
  hero(x, t, { x: 420, y: 1080, s: 340, mood: u > 3.4 ? 'wide' : 'neutral', look: [1, u > 3.4 ? 1 : -0.6], hops: [0.6, 1.8, 3.4] })
  // the total pops: $$$$
  const tk = pop01(t, 3.4, 0.3, 2.6)
  if (tk > 0.01) { x.save(); x.translate(700, 640); x.rotate(0.08); x.scale(tk, tk); box(x, -120, -44, 240, 88, RED, { b: 6 }); ink(x, 'TOTAL: $$$$', 0, 2, { size: 30, col: BONE, font: INTER, weight: 800 }); x.restore() }
  sparkles(x, t, 700, 640, 3.42, 8, 140, 1, [RED, GOLD, BONE])
}

function act1(x, t, S) {
  const { u, hero } = S
  room(x, t, { win: null })
  // the box grows taller than the frame
  const H = 300 + 1100 * ease.inOutCubic(prog(u, 0.4, 3.6))
  gift(x, 600, 1250, 360, H, '#3fa86a', { ribbon: GOLD })
  shadow(x, 330, 1255, 240)
  hero(x, t, { x: 330, y: 1100, s: 250, mood: u > 3.6 ? 'squint' : 'neutral', look: [1, -0.2], squash: 0.08 + 0.03 * Math.sin(t * 14), hops: [S.t0 + 0.4, S.t0 + 1.2, S.t0 + 2.0] })
  // the piggy bank on the floor sighs out one coin
  piggy(x, t, 900, 1200, 0.8, { sweat: 1, sigh: prog(u, 4.6, 5.3) })
  const cp = prog(u, 5.0, 5.8)
  if (cp > 0 && cp < 1) { const cx = lerp(900, 980, cp), cy = 1150 - 160 * Math.sin(Math.PI * cp); drawBits(x, ['.GG.', 'GYYG', 'GYYG', '.GG.'], { G: GOLD, Y: '#fff1a8' }, cx, cy, 7) }
  bubble(x, t, 860, 1060, S.t0 + 4.6, S.t0 + 6.4, '…', { size: 34 })
}

function act2(x, t, S) {
  const { u, hero, star } = S
  room(x, t, { win: null })
  // a thought bubble: pancakes
  const th = pop01(t, S.t0 + 1.2, 0.3, 2.4) * outK(t, [S.t0 + 3.6, S.t0 + 3.8])
  if (th > 0.01) {
    x.save(); x.translate(560, 640); x.scale(th, th)
    box(x, -150, -90, 300, 180, BONE, { b: 6 })
    for (let i = 0; i < 3; i++) box(x, -80, 30 - i * 30, 160, 22, '#e0a050', { b: 4 })
    R(x, GOLD, -20, -54, 40, 16)
    label(x, '“I love pancakes”', 0, -60, { size: 20, col: INK }); x.restore()
    R(x, INK, 640, 760, 26, 26); R(x, BONE, 644, 764, 18, 18)
  }
  // the coupon
  const ck = pop01(t, S.t0 + 3.7, 0.35, 2.4)
  if (ck > 0.01) {
    note(x, 540, 700, 560, 220, ['ONE PANCAKE', 'BREAKFAST', 'made by me ♥'], { rot: -0.04, col: '#fff0c0', size: 40, k: ck * outK(t, [S.t0 + 7.4, S.t0 + 7.7]), font: INTER, weight: 800 })
    sparkles(x, t, 540, 700, S.t0 + 3.72, 10, 260, 1, [GOLD, PINK, BONE])
  }
  // Taurus (pen) and Cancer opening it
  shadow(x, 520, 1255, 200)
  hero(x, t, { x: 520, y: 1110, s: 210, mood: u > 5.4 ? 'happy' : 'neutral', look: [1, -0.5], hops: [S.t0 + 1.25, S.t0 + 3.75, S.t0 + 5.5] })
  const cn = pop01(t, S.t0 + 4.6, 0.35, 2.2)
  if (cn > 0.01) {
    shadow(x, 820, 1255, 200 * cn)
    star('cancer', x, t, { x: 820, y: 1110, s: 210, pop: cn, mood: u > 5.3 ? 'heart' : 'wide', look: [-1, -0.5], seed: 8, hops: [S.t0 + 5.3, S.t0 + 5.9] })
    hearts(x, t, S.t0 + 5.3, 820, 960, { n: 7 })
  }
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.07)
  box(x, -150, -80, 300, 160, '#fff0c0', { b: 7 })
  x.setLineDash([12, 10]); x.strokeStyle = 'rgba(27,18,54,0.5)'; x.lineWidth = 4; x.strokeRect(-136, -66, 272, 132); x.setLineDash([])
  ink(x, 'ONE PANCAKE', 0, -30, { size: 30, font: INTER, weight: 800 })
  ink(x, 'BREAKFAST', 0, 8, { size: 30, font: INTER, weight: 800 })
  ink(x, 'made by me', 0, 46, { size: 22, col: RED })
  x.restore()
}

const EP = makeSurv({
  id: 'nhse02', ep: 2, hero: 'taurus', accent: '#9fe6b0',
  heads: ['Big heart. | *Small* budget.', 'Bigger box. | *Same* feeling.', 'Give the | *noticing.*', 'Packed: | *a handmade coupon.*'],
  acts: [act0, act1, act2],
  line1: { t: 8.6, speaker: '♉︎ TAURUS', color: '#9fe6b0', text: 'if it’s bigger, they’ll know I *care!*', close: 12.0 },
  tips: ['the gift is the *noticing*.', 'what did they *love* this year?'],
  last: 'Expensive is easy. *Specific* is love.',
  item: { label: 'A HANDMADE COUPON', draw: item },
  pis: [{ x: 960, y: 1260, s: 110 }, { x: 960, y: 640, s: 100, noTissues: true }, { x: 950, y: 470, s: 100, noTissues: true }],
  cues: [
    [['tick', 0.3, 0.03], ['tick', 0.6, 0.03], ['tick', 0.9, 0.03], ['tick', 1.2, 0.03], ['tick', 1.5, 0.03], ['tick', 1.8, 0.03], ['tick', 2.1, 0.03], ['tick', 2.4, 0.03], ['pop', 3.42, 523.25, 0.05, 0.3], ['pop', 3.5, 440, 0.04, 0.3]],
    [['riser', 0.4, 3.6, 0.03], ['tick', 3.6, 0.05], ['whoosh', 4.6, 0.6, 0.025], ['pluck', 5.0, 1760, 0.035, 0.4, 0.3], ['tick', 5.8, 0.05]],
    [['pop', 1.25, 880, 0.035, 0], ['pop', 3.72, 1174.66, 0.045, 0], ['glitter', 3.72, 4.1], ['pop', 4.65, 987.77, 0.035, 0.3], ['pluck', 5.3, 1318.51, 0.04, 0.5, 0.3], ['pluck', 5.42, 1567.98, 0.035, 0.5, 0.3]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, CREAM, label, lerp]
