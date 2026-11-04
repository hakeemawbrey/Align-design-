// nwfe06: WAIT FOR IT, "Baked your sign." (18 s vertical trial reel, Wait for It Vol. 2 ep 6, music: screwed · Gm)
// Story 0–15.6, then the short end card (2.4 s). No Align card transition (owner change, 4 Nov). The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Taurus is kneading | *some dough.*" + "wait for it…". ♉ Taurus, mid-knead, squashes a dough ball on a
//             board; ♐ Sagittarius taps a foot on the right. A knead counter ticks up.
//   3.95–9.3  "It's taking | *all evening…*"  Stickers: "knead *forty-one*" · "it's *rising*… slowly" ·
//             "…now it's *shaping it weird?!*". The dough swells, then stretches into a long, odd stick.
//   9.45      card cut.
//   9.5–13.4  "What is it? | *Your sign.*"  On the drop it's baked golden: an arrow, the ♐ glyph.
//             ♉ TAURUS: "it's an *arrow*. like you."
//   13.45–15.5 "*Baked* your sign."  Hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, pop01, outK, popOut, r3, plate, sparkles, snowfall } from '../../nwfe01/scenes/wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const BX = 560, TOP = 1165
const DOUGH = '#f3e3c3', DOUGH_D = '#d9c39a', CRUST = '#d9913f', CRUST_D = '#a5612a', CRUST_L = '#f2c070'

function counter(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  R(x, INK, 300, TOP + 8, 520, 190); R(x, '#a06a42', 300, TOP + 14, 520, 22); R(x, '#6e4329', 300, TOP + 36, 520, 160)
  R(x, INK, BX - 170, TOP - 6, 340, 24); R(x, '#e2b47a', BX - 166, TOP - 2, 332, 16)
  // a flour dusting
  for (let i = 0; i < 9; i++) R(x, '#fff8ea', BX - 150 + i * 36, TOP - 4 + (i % 2) * 3, 10, 4)
  x.restore()
}

/** the dough: a squashy ball while kneading, rising, then stretched into a stick; baked arrow after the drop */
function dough(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  if (t < T.reveal) {
    const rise = 1 + 0.35 * ease.inOutCubic(prog(t, T.stk[1] - 0.3, T.stk[1] + 1.0))
    const stretch = ease.inOutCubic(prog(t, T.stk[2] - 0.2, T.stk[2] + 0.6))
    const kn = stretch < 0.5 ? Math.max(0, Math.sin(t * 5.2)) : 0
    const w = lerp(150 * rise * (1 + 0.25 * kn), 330, stretch), h = lerp(90 * rise * (1 - 0.3 * kn), 40, stretch)
    x.translate(BX, TOP - h / 2 - 4); x.rotate(-0.35 * stretch)
    R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, INK, -w / 2 + 10, -h / 2 - 14, w - 20, 10)
    R(x, DOUGH, -w / 2, -h / 2, w, h); R(x, DOUGH, -w / 2 + 14, -h / 2 - 8, w - 28, 10)
    R(x, DOUGH_D, -w / 2, h / 2 - 12, w, 12)
    R(x, '#ffffff', -w / 2 + 16, -h / 2 + 6, w * 0.25, 8)
    // a knuckle dent while kneading
    if (kn > 0.3) R(x, DOUGH_D, -20, -h / 2, 40, 10 * kn)
  } else {
    // the baked arrow (the ♐ glyph): a diagonal shaft, a head, a crossbar
    const p = pop01(t, T.reveal + 0.02, 0.4, 2.0)
    x.translate(BX, TOP - 120); x.scale(p, p); x.rotate(-Math.PI / 4)
    const bar = (bx, by, bw, bh) => { R(x, INK, bx - 7, by - 7, bw + 14, bh + 14) }
    const fillb = (bx, by, bw, bh) => { R(x, CRUST, bx, by, bw, bh); R(x, CRUST_L, bx, by, bw, 8); R(x, CRUST_D, bx, by + bh - 8, bw, 8) }
    const parts = [[-150, -18, 300, 36], [80, -70, 36, 140], [-60, -70, 36, 140]]
    // shaft · arrowhead (two strokes) · crossbar
    const head = [[110, -18, 70, 36]]
    for (const q of [...parts.slice(0, 1), ...head, parts[2]]) bar(...q)
    x.save(); x.translate(150, 0); x.rotate(Math.PI / 4); bar(-80, -18, 90, 36); x.restore()
    x.save(); x.translate(150, 0); x.rotate(-Math.PI / 4); bar(-80, -18, 90, 36); x.restore()
    for (const q of [...parts.slice(0, 1), parts[2]]) fillb(...q)
    x.save(); x.translate(150, 0); x.rotate(Math.PI / 4); fillb(-80, -18, 90, 36); x.restore()
    x.save(); x.translate(150, 0); x.rotate(-Math.PI / 4); fillb(-80, -18, 90, 36); x.restore()
    // scoring marks
    for (let i = 0; i < 4; i++) R(x, CRUST_D, -120 + i * 50, -6, 22, 6)
  }
  x.restore()
  // steam over the fresh bread
  if (t > T.reveal) for (let i = 0; i < 4; i++) {
    const ph = (t * 0.8 + i / 4) % 1
    x.save(); x.globalAlpha = k * 0.7 * Math.sin(Math.PI * ph)
    R(x, '#ffffff', BX - 60 + i * 40 + 8 * Math.sin(t * 3 + i), TOP - 260 - ph * 110, 14, 14)
    x.restore()
  }
}

const EP = makeEpisode({
  id: 'nwfe06', key: 'Gm', seed: 4706,
  hero: { sign: 'taurus', lineColor: '#9fe6b0' },
  date: { sign: 'sagittarius' },
  pos: { hero: { x: 190, y: 1080, s: 230 }, date: { x: 910, y: 1090, s: 200 }, pis: { x: 990, y: 700, s: 120 } },
  h0: 'Taurus is kneading | *some dough.*', h0Accent: '#9fe6b0',
  h1: 'It’s taking | *all evening…*',
  h2: 'What is it? | *Your sign.*', h2Accent: PINK,
  last: '*Baked* your sign.', lastAccent: GOLD,
  stickers: ['knead *forty-one*', 'it’s *rising*… slowly', '…now it’s *shaping it weird?!*'],
  line: { who: 'hero', text: 'it’s an *arrow*. like you.' },
  focus: { x: BX, y: 1000 },
  glow: { x: BX, y: 1020 },
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: 'happy', look: [1, 0.8], squash: 0.05 * Math.max(0, Math.sin(t * 5.2)) }
    if (ph === 'build') return { mood: 'squint', look: [1, 0.8], squash: t < T.stk[2] ? 0.05 * Math.max(0, Math.sin(t * 5.2)) : 0 }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: t > T.stk[1] ? 'eyeroll' : 'neutral', look: [-1, 0.4], squash: 0.03 * Math.max(0, Math.sin(t * 9)) }
    if (ph === 'reveal' && t > T.reveal + 0.5) return { mood: 'heart', look: [-1, 0] }
    return null
  },
  back(x, t, T) { snowfall(x, t, { n: 24, seed: 8, alpha: 0.45 * clamp(popOut(t, T.out)), y1: 940, speed: 0.6 }) },
  mid(x, t, T) {
    counter(x, t, T); dough(x, t, T)
    // the knead counter (hook + build)
    const n = Math.min(41, Math.floor(1 + t * 8.2))
    const ck = clamp(popOut(t, T.out)) * outK(t, [T.reveal, T.reveal + 0.15])
    if (ck > 0.01) plate(x, `KNEAD ${n}`, BX, TOP + 90, { size: 26, bg: BONE, alpha: ck })
    const bk = pop01(t, T.reveal + 0.5, 0.3, 2.4) * outK(t, T.out)
    if (bk > 0.01) plate(x, 'SAGITTARIUS BREAD', BX, TOP + 90, { size: 26, bg: GOLD, alpha: clamp(bk), scale: 0.8 + 0.2 * clamp(bk) })
  },
  front(x, t, T) { sparkles(x, t, BX, TOP - 130, T.reveal + 0.05, 12, 200, 1, [GOLD, CRUST_L, BONE]) },
  cues: T => [
    ...Array.from({ length: 15 }, (_, i) => ['tom', r3(0.3 + i * 0.6), 80, { gain: 0.05, decay: 0.12 }]).filter(c => c[1] < T.stk[2]),
    ['whoosh', r3(T.stk[2] - 0.2), 0.5, 0.03], ['bell', r3(T.reveal + 0.05), 1318.51, 0.03, 1.2, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
