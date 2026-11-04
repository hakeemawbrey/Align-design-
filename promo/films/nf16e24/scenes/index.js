// nf16e24: MEET THE FAMILY, "Our Own Tradition" (45 s vertical, star_advice post, music: dreamy · Ab). The b22 finale.
// Story 0–40.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–5.2    HOOK "After all the visits… | what do *we* keep?"  Their own place. ♎ Libra mid-pin of a photo on a corkboard;
//              ♈ Aries holding a wobbly stack of pancakes. ARIES: "pancakes? it's our *first night home.*"
//   5.2–11.6   "The season, | *pinned.*"  The board fills with tiny photos: the porch, the table, the car, the snowy walk.
//              LIBRA: "the porch. the photo. *the drive.*" ARIES: "so… what do *we* keep?"
//   11.6       card cut → NOTES: keep what felt like home · leave what didn't, kindly · start one thing that's just yours.
//   20.4–25.4  ★ LESSON UNLOCKED "Family is | something you *build.*" (+1 TRADITION)
//   25.4–32.4  "New tradition: | *pancakes.*"  Aries flips one high; Libra catches it on a plate. LIBRA: "every year. *just us.*"
//   32.4–40.6  "And a walk | to see *the lights.*"  The snowy street; the neighbour ♓ Pisces cries happy at a lit window.
//              THE STARS: "Start your own *tradition.*"
import { makeFamily, bubble, hearts, sparkles, confetti, drawPixelStar, label, R, box, plate, prog, clamp, ease, lerp, BONE, GOLD, PINK, INK, MINT, SKYB } from '../../nf16e13/famkit.js'

function stack(x, cx, cy, n = 5, wob = 0) {
  plate(x, cx, cy + 20, 150)
  for (let i = 0; i < n; i++) { const ox = wob * Math.sin(i * 1.3) * i * 3; box(x, cx - 55 + ox, cy - i * 20, 110, 16, '#e8b25a', { b: 4, hi: '#f6cf7a' }) }
  R(x, '#fff3c8', cx - 16 + wob * n * 3 * Math.sin(n * 1.3), cy - n * 20 - 4, 30, 12)
}
// tiny pinned photos: 0 porch door · 1 table · 2 car · 3 snowy walk
function mini(x, t, cx, cy, kind, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate([-0.08, 0.06, -0.04, 0.09][kind]); x.scale(k, k)
  box(x, -62, -70, 124, 140, '#fffaf0', { b: 4 })
  R(x, ['#544470', '#5a2f45', '#1d1a3c', '#2c2660'][kind], -52, -60, 104, 100)
  if (kind === 0) { R(x, '#8a2f3e', -16, -36, 32, 76); R(x, '#3aa36a', -10, -28, 20, 20) }
  if (kind === 1) { R(x, '#c94a5a', -48, 10, 96, 30); R(x, '#b5652e', -18, -4, 36, 16) }
  if (kind === 2) { R(x, '#2a2148', -52, 14, 104, 26); for (let i = 0; i < 3; i++) R(x, GOLD, -4, -50 + i * 20, 8, 12) }
  if (kind === 3) { R(x, '#e9eef9', -52, 20, 104, 20); for (let i = 0; i < 6; i++) R(x, BONE, -44 + i * 17, -50 + (i * 23) % 50, 5, 5) }
  R(x, INK, -6, -76, 12, 12); R(x, [PINK, GOLD, SKYB, MINT][kind], -4, -74, 8, 8)
  x.restore()
}
function corkboard(x, t, n, u0, t0) {
  box(x, 280, 480, 520, 340, '#b5835a', { b: 7 })
  for (let i = 0; i < 40; i++) R(x, 'rgba(90,50,30,0.35)', 290 + (i * 97) % 500, 490 + (i * 61) % 320, 6, 6)
  const spots = [[370, 590], [500, 610], [630, 590], [730, 650]]
  for (let i = 0; i < 4; i++) {
    const at = t0 + u0 + i * 0.8
    const k = i < n ? 1 : ease.outBack(prog(t, at, at + 0.35))
    if (i < n || t > at) mini(x, t, spots[i][0], spots[i][1] + 40, i, i < n ? 1 : k)
  }
}
function neighbourWindow(x, t, S, cx, cy, ok) {
  box(x, cx - 90, cy - 90, 180, 180, '#ffd98a', { b: 8 })
  x.save(); x.beginPath(); x.rect(cx - 90, cy - 90, 180, 180); x.clip()
  S.pisces(x, t, { x: cx, y: cy + 30, s: 150, mood: 'happy', tears: 3, pop: ok, look: [-1, 0.4] })
  x.restore()
  R(x, INK, cx - 4, cy - 90, 8, 180); R(x, INK, cx - 90, cy - 4, 180, 8)
}
const HOME = { couchX: 540, couchW: 440, frames: false, tree: true, treeX: 900, winX: 160, wall: 'plum' }
const T_FLIP = 25.4
const EP = makeFamily({
  id: 'nf16e24', key: 'Ab',
  cast: {
    you: { sign: 'libra', role: 'LIBRA', acc: { scarf: '#ff8fb1' }, text: '#ffd8ec' },
    them: { sign: 'aries', role: 'ARIES', acc: { apron: '#fff1dc' }, text: '#ffd0c0' },
  },
  beats: [
    { len: 5.2, room: 'living', roomOpts: HOME, head: 'After all the visits… | what do *we* keep?',
      lines: [{ u: 0.6, who: 'them', text: 'pancakes? it’s our *first night home.*' }],
      draw(x, t, S) {
        corkboard(x, t, 1, 0, 0)
        S.cast(x, t, 'you', { x: 420, y: 930, s: 200, mood: 'happy', look: [0, -1], squash: -0.05 })
        mini(x, t, 500, 760 - 6 * Math.sin(t * 4), 0, 1)
        const F = S.cast(x, t, 'them', { x: 720, y: 1080, s: 200, mood: 'sparkle', look: [-1, -0.5] })
        stack(x, 720, F.cy - 150, 6, Math.sin(t * 3))
      } },
    { len: 6.4, room: 'living', roomOpts: HOME, head: 'The season, | *pinned.*',
      lines: [{ u: 0.4, who: 'you', text: 'the porch. the photo. *the drive.*' }, { u: 3.6, who: 'them', text: 'so… what do *we* keep?' }],
      draw(x, t, S) {
        const u = S.u
        corkboard(x, t, 1, 0.3, S.t0)
        S.cast(x, t, 'you', { x: 420, y: 1060, s: 190, mood: u > 3.6 ? 'neutral' : 'sparkle', look: [0, -1], hops: [S.t0 + 1.1, S.t0 + 1.9, S.t0 + 2.7] })
        S.cast(x, t, 'them', { x: 680, y: 1060, s: 190, mood: u > 3.6 ? 'neutral' : 'happy', look: [-1, -0.5] })
        if (u > 3.6) stack(x, 680, 900, 6, 0)
      },
      cues: [['pop', 0.3, 880, 0.035, -0.2], ['pop', 1.1, 987.77, 0.035, 0], ['pop', 1.9, 1174.66, 0.035, 0.2], ['pop', 2.7, 1318.51, 0.04, 0.3]] },
    { len: 8.8, kind: 'notes',
      tips: ['Keep what felt *like home.*', 'Leave what didn’t, *kindly.*', 'Start one thing *that’s just yours.*'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.9] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: S.u > 5.6 ? 'heart' : 'happy', look: [-1, 0], hops: [S.t0 + 5.6] })
      } },
    { len: 5.0, kind: 'lesson', text: 'Family is | something you *build.*', chip: '+1 TRADITION' },
    { len: 7.0, room: 'living', roomOpts: { ...HOME, couch: false }, head: 'New tradition: | *pancakes.*',
      lines: [{ u: 2.3, who: 'you', text: 'every year. *just us.*' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'them', { x: 330, y: 1060, s: 200, mood: u > 0.4 && u < 1.6 ? 'wide' : 'sparkle', look: [1, -1], hops: [S.t0 + 0.3, S.t0 + 1.7] })
        // the pan + the flip
        box(x, 390, 960, 130, 20, '#3a3358', { b: 5 }); R(x, INK, 300, 966, 90, 10)
        const p = prog(u, 0.3, 1.5)
        if (p > 0 && p < 1) { const px = lerp(455, 720, p), py = 950 - Math.sin(Math.PI * p) * 360; x.save(); x.translate(px, py); x.rotate(p * Math.PI * 3); box(x, -50, -8, 100, 16, '#e8b25a', { b: 4 }); x.restore() }
        const F = S.cast(x, t, 'you', { x: 740, y: 1060, s: 200, mood: u > 1.5 ? 'heart' : 'wide', look: [-1, -1], hops: [S.t0 + 1.55] })
        if (u >= 1.5) { plate(x, 740, F.cy - 140, 150); box(x, 690, F.cy - 160, 100, 16, '#e8b25a', { b: 4 }) } else plate(x, 740, F.cy - 140, 150)
        sparkles(x, t, 740, 900, S.t0 + 1.5, 10, 170, 1, [GOLD, BONE, PINK])
        bubble(x, t, 330, 830, S.t0 + 1.6, S.t0 + 3.4, 'NAILED IT', { size: 30, col: '#ffd0c0' })
      },
      cues: [['whoosh', 0.3, 0.4, 0.04], ['riser', 0.4, 1.4, 0.012], ['pop', 1.5, 1318.51, 0.05, 0.3], ['glitter', 1.5, 2.0], ['pop', 1.7, 987.77, 0.035, -0.3]] },
    { len: 8.2, room: 'street', roomOpts: { scroll: t => (t - 32.4) * 70 }, head: 'And a walk | to see *the lights.*', pis: false,
      lastU: 3.2, last: 'Start your own *tradition.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out, step = Math.abs(Math.sin(t * 4.5))
        neighbourWindow(x, t, S, 860, 640, ok)
        S.cast(x, t, 'you', { x: 400, y: 1090 - 12 * step, s: 200, mood: 'happy', look: [1, -0.4], pop: ok })
        S.cast(x, t, 'them', { x: 600, y: 1090 - 12 * (1 - step), s: 200, mood: u > 1.0 ? 'heart' : 'happy', look: [-1, -0.4], pop: ok })
        hearts(x, t, S.t0 + 1.0, 500, 920, { n: 6 })
        for (let i = 0; i < 6; i++) drawPixelStar(x, 120 + i * 160, 470 + 30 * Math.sin(i * 2), 26, 2, [GOLD, PINK, SKYB, MINT][i % 4])
        confetti(x, t, S.t0 + 0.3, 500, 700, { n: 18, life: 1.8 })
      },
      cues: [['glitter', 0.3, 0.9], ['pluck', 1.0, 1174.66, 0.04, 0.5, 0]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, clamp, T_FLIP]
