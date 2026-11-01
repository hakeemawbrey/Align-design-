// trwaittaurus: WAIT FOR IT, "Bigger half." (20 s vertical, Star Talk Trends §12.1, music: screwed · Ebm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./wait.js (identical in all five episodes).
//   0.0–3.8   "Taurus is making | *a sandwich.*"  + "wait for it…". ♉ Taurus behind the counter lays the first slice
//             of bread on a board; ♋ Cancer, the date, waits on the other side, hungry. The bar starts crawling.
//   3.95–9.3  "It's taking | *forever…*"  Layer after layer drops on, slowly (lettuce, tomato, cheese, more cheese…).
//             Stickers: "layer six: *more cheese*" · "layer eleven: *still going*" · "…now it's cutting it *uneven?!*"
//             A dotted cut line slices it way off-centre. The bar stalls at 99%. Cancer's stomach rumbles (wobble lines).
//   9.45      card cut.
//   9.5–13.4  "Bigger half? | *Yours.*"  On the drop the BIG half slides across the counter to Cancer; Taurus keeps the
//             skinny one and beams. ♉ TAURUS: "you get the *big* half. always."
//   13.45–15.5 "*Bigger* half."  Cancer hugs the sandwich, hearts float up, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, drawBits, pop01, outK, popOut, r3, plate } from './wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const CX = 550, W = 210, TOP = 1170                 // the sandwich: centre x, width, the board's top
const CUTF = 0.3                                    // the cut, 30% in from Taurus's side: the right part is BIG
// the layers, bottom → top: [fill, shade, height, kind]
const LAYERS = [
  ['#f0c57a', '#b9783a', 30, 'bread'],
  ['#86d96e', '#4f9e45', 14, 'leaf'],
  ['#ff6262', '#c23b3b', 13, 'flat'],
  ['#ffd23a', '#d9a21c', 11, 'cheese'],
  ['#ff9db0', '#d86d86', 16, 'flat'],
  ['#ffd23a', '#d9a21c', 11, 'cheese'],
  ['#86d96e', '#4f9e45', 14, 'leaf'],
  ['#ff6262', '#c23b3b', 13, 'flat'],
  ['#ffd23a', '#d9a21c', 11, 'cheese'],
  ['#78b85a', '#4d8a3a', 12, 'pickle'],
  ['#f0c57a', '#b9783a', 34, 'top'],
]
const LAY_T = LAYERS.map((_, i) => r3(1.0 + i * (6.3 - 1.0) / (LAYERS.length - 1)))
const CUT = [7.75, 8.3], SPLIT = 8.45

function drawLayer(x, L, y, w, cx, t, i) {
  const [c, s, h, kind] = L
  const x0 = cx - w / 2
  if (kind === 'bread' || kind === 'top') {
    const dome = kind === 'top' ? 10 : 0
    R(x, INK, x0 - 4, y - h - dome - 4, w + 8, h + dome + 8)
    R(x, s, x0, y - h - dome + (kind === 'top' ? 4 : 0), w, h + dome - (kind === 'top' ? 4 : 0))
    if (kind === 'top') { R(x, s, x0 + 12, y - h - dome, w - 24, 6); R(x, c, x0 + 8, y - h - dome + 8, w - 16, h + dome - 14) } else R(x, c, x0 + 6, y - h + 4, w - 12, h - 10)
    if (kind === 'top') for (let k = 0; k < 5; k++) R(x, "#fff3d6", x0 + 26 + k * 36 + (k % 2) * 8, y - h - dome + 12 + (k % 2) * 6, 8, 4)
    return
  }
  const over = kind === 'leaf' ? 18 : kind === 'cheese' ? 10 : 6
  R(x, INK, x0 - over - 4, y - h - 4, w + over * 2 + 8, h + 8)
  R(x, s, x0 - over, y - h, w + over * 2, h)
  R(x, c, x0 - over, y - h, w + over * 2, h - 4)
  if (kind === 'leaf') for (let k = 0; k < 8; k++) R(x, c, x0 - over + k * (w + over * 2) / 8, y - 2, 14, 6)
  if (kind === 'cheese') for (let k = 0; k < 3; k++) { const dx = x0 + 24 + k * 70 + i * 5; R(x, INK, dx - 3, y - 3, 16, 20 + k * 4); R(x, c, dx, y - 3, 10, 16 + k * 4) }
  if (kind === 'pickle') for (let k = 0; k < 4; k++) R(x, "#a7e07f", x0 - over + 12 + k * 58, y - h + 3, 22, 4)
}

/** the sandwich (layers that have landed), clipped to [a, b] of its width, moved by dx */
function sandwich(x, t, a, b, dx, dy = 0) {
  x.save()
  const x0 = CX - W / 2 - 30
  x.beginPath(); x.rect(x0 + a * (W + 60) + dx, 0, (b - a) * (W + 60), 1920); x.clip()
  x.translate(dx, dy)
  let y = TOP
  LAYERS.forEach((L, i) => {
    const p = prog(t, LAY_T[i], LAY_T[i] + 0.35)
    if (p <= 0) return
    const fall = (1 - ease.outCubic(p)) * 90
    const sq = p < 1 ? 0 : Math.exp(-(t - LAY_T[i] - 0.35) * 12) * 0.25
    x.save(); x.globalAlpha *= clamp(p * 3)
    x.translate(CX, y); x.scale(1 + sq * 0.3, 1 - sq * 0.4); x.translate(-CX, -y)
    drawLayer(x, L, y - fall, W, CX, t, i)
    x.restore()
    y -= L[2] + (L[3] === 'top' ? 10 : 0)
  })
  x.restore()
}

const EP = makeEpisode({
  id: 'trwaittaurus', key: 'Ebm', seed: 1201,
  hero: { sign: 'taurus', lineColor: '#9fe6b0' },
  date: { sign: 'cancer' },
  h0: 'Taurus is making | *a sandwich.*', h0Accent: '#9fe6b0',
  h1: "It's taking | *forever…*",
  h2: 'Bigger half? | *Yours.*', h2Accent: PINK,
  last: '*Bigger* half.', lastAccent: GOLD,
  stickers: ['layer six: *more cheese*', 'layer eleven: *still going*', '…and it’s cutting it *uneven?!*'],
  line: { who: 'hero', text: 'you get the *big* half. always.' },
  focus: { x: CX, y: 1010 },
  glow: { x: 690, y: 1000 },
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: 'happy', look: [1, 0.8] }
    if (ph === 'build' && t > CUT[0] - 0.2) return { mood: 'squint', look: [1, 1] }
    if (ph === 'reveal' && t < T.reveal + 0.6) return { mood: 'happy', look: [1, 0] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook') return { mood: 'sparkle', look: [-1, 0.5] }
    if (ph === 'build' && t > CUT[0]) return { mood: 'wide', look: [-1, 0.8], squash: 0.03 * Math.sin(t * 30) }
    if (ph === 'build') return { mood: 'neutral', look: [-1, 0.6] }
    return null
  },
  back(x, t, T, ctx) {
    // a little kitchen shelf on the back wall, with jars
    const k = clamp(popOut(t, T.out)) * clamp(prog(t, 0.2, 0.9))
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    R(x, INK, 120, 642, 360, 18); R(x, '#8a5a3a', 124, 645, 352, 12)
    const jars = [[170, '#ffd23a'], [240, '#ff9db0'], [315, '#86d96e'], [395, '#f0c57a']]
    for (const [jx, c] of jars) { R(x, INK, jx - 24, 560, 48, 84); R(x, '#cfe9ff', jx - 20, 564, 40, 78); R(x, c, jx - 20, 594, 40, 48); R(x, '#b9783a', jx - 22, 554, 44, 14) }
    x.restore()
  },
  front(x, t, T, ctx) {
    const k = clamp(popOut(t, T.out))
    if (k <= 0.01) return
    const rise = ease.outCubic(prog(t, 0.1, 0.8))
    x.save(); x.globalAlpha = k; x.translate(0, (1 - rise) * 500)
    // the counter
    R(x, INK, 0, TOP + 8, 1080, 190); R(x, '#a06a42', 0, TOP + 14, 1080, 22); R(x, '#6e4329', 0, TOP + 36, 1080, 160)
    for (let i = 0; i < 6; i++) R(x, '#5a3622', 90 + i * 180, TOP + 50, 6, 140)
    // the board
    R(x, INK, CX - 160, TOP - 6, 320, 24); R(x, '#e2b47a', CX - 156, TOP - 2, 312, 16)
    // the sandwich: whole, then the cut, then the split
    const sp = ease.inOutCubic(prog(t, T.reveal, T.reveal + 0.55))
    const gap = 6 * ease.outCubic(prog(t, SPLIT, SPLIT + 0.2))
    if (t < SPLIT) sandwich(x, t, 0, 1, 0)
    else {
      sandwich(x, t, 0, CUTF + 0.05, -gap + lerp(0, -45, sp))                                   // the skinny half → Taurus
      sandwich(x, t, CUTF + 0.05, 1, gap + lerp(0, 95, sp), -14 * Math.sin(Math.PI * sp))     // the BIG half → Cancer
    }
    // the cut: a dotted line sweeps down, way off-centre
    const cp = prog(t, ...CUT)
    if (cp > 0 && t < SPLIT + 0.25) {
      const cxl = CX - W / 2 - 30 + (CUTF + 0.05) * (W + 60)
      const y0 = TOP - 230, y1 = lerp(y0, TOP, cp)
      x.save(); x.globalAlpha *= outK(t, [SPLIT, SPLIT + 0.25])
      for (let y = y0; y < y1; y += 18) R(x, '#ffffff', cxl - 3, y, 6, 10)
      x.restore()
      if (cp > 0.95) plate(x, '30 / 70', cxl, y0 - 34, { size: 26, bg: PINK, alpha: outK(t, [SPLIT + 0.4, SPLIT + 0.7]) })
    }
    // Cancer's tummy rumbles while the cut is uneven
    if (t > T.stk[1] && t < T.reveal && ctx.date) {
      const D = ctx.date
      for (let i = 0; i < 3; i++) { const ph = (t * 2 + i / 3) % 1; x.save(); x.globalAlpha *= Math.sin(Math.PI * ph); R(x, BONE, D.x + 90 + ph * 30, D.y - 10 + i * 18, 18, 4); x.restore() }
      plate(x, 'grumble', D.x + 40, D.y - 150, { size: 22, bg: BONE, alpha: pop01(t, T.stk[1] + 0.4, 0.3, 2) * outK(t, [T.reveal - 0.2, T.reveal]), rot: 0.08 })
    }
    x.restore()
    // a hug for the sandwich on the last line
    if (t > T.lastLand && ctx.date) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5d8f' }, ctx.date.x - 10, ctx.date.y - 190, 8 * pop01(t, T.lastLand, 0.3, 2.6) * outK(t, T.out))
  },
  cues: T => [
    ...LAY_T.map((v, i) => ['pop', r3(v + 0.32), [392, 440, 493.88, 523.25][i % 4], 0.03, 0]),
    ...LAY_T.map(v => ['tick', r3(v + 0.34), 0.025]),
    ['whoosh', 7.75, 0.55, 0.03], ['tick', 8.3, 0.04], ['pop', 8.45, 1318.51, 0.03, 0],
    ['whoosh', r3(T.reveal + 0.05), 0.45, 0.04],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
