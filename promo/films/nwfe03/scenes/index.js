// nwfe03: WAIT FOR IT, "Found it." (18 s vertical trial reel, Wait for It Vol. 2 ep 3, music: screwed · Dm)
// Story 0–15.6, then the short end card (2.4 s). No Align card transition (owner change, 4 Nov). The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Cancer is wrapping | *a tiny present.*" + "wait for it…". ♋ Cancer, mid-pull of a long tape strip,
//             works on a small box on the table; ♌ Leo waits on the right. Tape strips pile up.
//   3.95–9.3  "That is | *a lot of tape…*"  Stickers: "layer four: *more tape*" · "the box is *getting smaller?*" ·
//             "…it's *wrapped in a sock?!*". The box shrinks; a striped sock appears round it.
//   9.45      card cut.
//   9.5–13.4  "What's inside? | *Yours.*"  On the drop the lid pops: Leo's lost glove floats up, mended with a heart
//             patch. ♋ CANCER: "you lost it in *October*. I kept looking."
//   13.45–15.5 "*Found* it."  Hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, HEART, drawBits, pop01, outK, popOut, r3, plate, sparkles, snowfall } from '../../nwfe01/scenes/wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const BX = 560, TABLE = 1150
const PAPER = '#7fd0c8', PAPER_D = '#4fa8a0', TAPE = 'rgba(235,245,255,0.75)'
const STRIPS = [[-0.4, -20, -30, 0.5], [0.9, 10, -60, -0.4], [1.8, -30, -10, 1.2], [2.7, 25, -40, 0.2], [3.6, -10, -70, -0.9],
  [4.5, 30, -20, 0.8], [5.4, -25, -50, -0.2], [6.3, 5, -15, 1.4], [7.2, -15, -35, -1.1], [8.1, 20, -60, 0.4]]

function table(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  R(x, INK, 330, TABLE, 460, 30); R(x, '#a06a42', 334, TABLE + 4, 452, 22); R(x, '#c48a5a', 334, TABLE + 4, 452, 6)
  R(x, INK, 360, TABLE + 30, 26, 120); R(x, '#6e4329', 364, TABLE + 30, 18, 116)
  R(x, INK, 734, TABLE + 30, 26, 120); R(x, '#6e4329', 738, TABLE + 30, 18, 116)
  x.restore()
}

function present(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const shrink = lerp(1, 0.72, ease.inOutCubic(prog(t, T.stk[1] - 0.3, T.stk[1] + 0.6)))
  const w = 200 * shrink, h = 150 * shrink
  const open = prog(t, T.reveal, T.reveal + 0.35)
  x.save(); x.globalAlpha = k
  // the box
  R(x, INK, BX - w / 2 - 6, TABLE - h - 6, w + 12, h + 12); R(x, PAPER, BX - w / 2, TABLE - h, w, h)
  for (let i = 0; i < 4; i++) R(x, PAPER_D, BX - w / 2 + 12 + i * (w / 4), TABLE - h + 10, 10, h - 20)
  // the sock round it (third sticker)
  const sk = ease.outCubic(prog(t, T.stk[2] - 0.1, T.stk[2] + 0.3))
  if (sk > 0 && open < 1) {
    const sh = (h + 30) * sk
    R(x, INK, BX - w / 2 - 22, TABLE - sh - 12, w + 44, sh + 12)
    for (let j = 0; j < 6; j++) R(x, j % 2 ? '#ff8fb1' : '#ffffff', BX - w / 2 - 16, TABLE - sh - 6 + j * (sh / 6), w + 32, sh / 6)
    // the heel poking out
    R(x, INK, BX + w / 2 + 10, TABLE - 66, 54, 60); R(x, '#ff8fb1', BX + w / 2 + 14, TABLE - 62, 46, 52)
  }
  // tape strips piling up (until the drop)
  if (open <= 0) for (const [at, dx, dy, a] of STRIPS) {
    if (t < at) continue
    x.save(); x.translate(BX + dx * shrink, TABLE - h / 2 + (dy + 40) * shrink * 0.8); x.rotate(a)
    const sl = ease.outCubic(prog(t, at, at + 0.25))
    R(x, 'rgba(27,18,54,0.5)', -w * 0.55 * sl - 2, -14, w * 1.1 * sl + 4, 28); R(x, TAPE, -w * 0.55 * sl, -11, w * 1.1 * sl, 22)
    x.restore()
  }
  // the lid: flies off on the drop
  const lx = BX + 140 * ease.outCubic(open), ly = TABLE - h - 14 - 180 * Math.sin(Math.PI * Math.min(1, open * 0.9))
  if (open < 1) { x.save(); x.translate(lx, ly); x.rotate(open * 1.4); R(x, INK, -w / 2 - 12, -18, w + 24, 34); R(x, PAPER_D, -w / 2 - 6, -12, w + 12, 22); R(x, GOLD, -10, -12, 20, 22); x.restore() }
  else { R(x, INK, BX - w / 2 - 6, TABLE - h - 6, w + 12, 10) }
  x.restore()
}

// the mended glove: floats up out of the box after the drop
const GLOVE = [
  '.B.B.B....',
  '.B.B.B....',
  'BBBBBB..B.',
  'BBBBBB.BB.',
  'BBBHHBBBB.',
  'BBHHHHBB..',
  'BBBHHBBB..',
  'BBBBBBBB..',
  '.WWWWWW...',
  '.WWWWWW...',
]
function glove(x, t, T) {
  const g = pop01(t, T.reveal + 0.15, 0.45, 2.0) * outK(t, T.out)
  if (g <= 0.01) return
  const rise = ease.outCubic(prog(t, T.reveal + 0.15, T.reveal + 0.8))
  const gy = lerp(TABLE - 80, TABLE - 300, rise) + 10 * Math.sin(t * 2.4)
  drawBits(x, GLOVE, { B: '#5aa8e0', H: '#ff5d8f', W: '#ffffff' }, BX, gy, 18 * g, { rot: 0.12 * Math.sin(t * 1.8) })
  const pk = pop01(t, T.reveal + 0.9, 0.3, 2.4) * outK(t, T.out)
  if (pk > 0.01) plate(x, 'MENDED', BX + 150, gy - 70, { size: 24, bg: GOLD, alpha: clamp(pk), rot: 0.1 })
}

// the tape strip being pulled from Cancer's hand (hook + build)
function pulling(x, t, T, ctx) {
  if (!ctx.hero || t > T.reveal) return
  const H = ctx.hero
  const ph = (t * 1.1) % 1
  const hx = H.x + 110, hy = H.F.cy + 10
  const len = 40 + 140 * ease.outCubic(Math.min(1, ph * 1.6))
  x.save(); x.globalAlpha = clamp(popOut(t, T.out))
  R(x, INK, hx - 26, hy - 26, 52, 52); R(x, '#8a6ad8', hx - 22, hy - 22, 44, 44); R(x, '#d8ccff', hx - 10, hy - 10, 20, 20)
  x.translate(hx + 10, hy - 4); x.rotate(-0.25)
  R(x, 'rgba(27,18,54,0.5)', 0, -12, len + 4, 24); R(x, TAPE, 0, -9, len, 18)
  x.restore()
}

const EP = makeEpisode({
  id: 'nwfe03', key: 'Dm', seed: 4703,
  hero: { sign: 'cancer', lineColor: '#cfe0ff' },
  date: { sign: 'leo' },
  pos: { hero: { x: 205, y: 1075, s: 230 }, date: { x: 910, y: 1090, s: 200 }, pis: { x: 990, y: 700, s: 120 } },
  h0: 'Cancer is wrapping | *a tiny present.*', h0Accent: '#cfe0ff',
  h1: 'That is | *a lot of tape…*',
  h2: 'What’s inside? | *Yours.*', h2Accent: PINK,
  last: '*Found* it.', lastAccent: GOLD,
  stickers: ['layer four: *more tape*', 'the box is *getting smaller?*', '…it’s *wrapped in a sock?!*'],
  line: { who: 'hero', text: 'you lost it in *October*. I kept looking.' },
  focus: { x: BX, y: 1000 },
  glow: { x: BX, y: 950 },
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: 'squint', look: [1, 0.6] }
    if (ph === 'build') return { mood: 'squint', look: [1, 0.8] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'build' && t > T.stk[1]) return { mood: 'wide', look: [-1, 0.5] }
    if (ph === 'reveal' && t > T.reveal + 0.5) return { mood: 'sparkle', look: [-1, -0.6] }
    return null
  },
  back(x, t, T) { snowfall(x, t, { n: 26, seed: 7, alpha: 0.5 * clamp(popOut(t, T.out)), y1: 940, speed: 0.6 }) },
  mid(x, t, T) { table(x, t, T); present(x, t, T) },
  front(x, t, T, ctx) {
    pulling(x, t, T, ctx)
    glove(x, t, T)
    sparkles(x, t, BX, TABLE - 120, T.reveal + 0.05, 12, 160, 3, [GOLD, '#5aa8e0', BONE])
  },
  cues: T => [
    ...STRIPS.filter(s => s[0] < T.reveal).map(s => ['whoosh', r3(s[0] + 0.02), 0.18, 0.015]),
    ...STRIPS.filter(s => s[0] < T.reveal).map(s => ['tick', r3(s[0] + 0.25), 0.02]),
    ['pop', r3(T.stk[1]), 349.23, 0.03, 0], ['pop', r3(T.stk[2]), 311.13, 0.035, 0],
    ['pop', r3(T.reveal + 0.05), 1046.5, 0.04, 0.2], ['pop', r3(T.reveal + 0.9), 1567.98, 0.03, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [HEART, INK]
