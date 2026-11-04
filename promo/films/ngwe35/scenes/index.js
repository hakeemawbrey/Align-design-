// ngwe35 · Your Star Guide: Winter · ♐ Sagittarius, winter note 3 / 4: the small gift (20 s; story 0–15.6, then the end card)
//   0.00  "Sagittarius, don't wrap it."  Sag shaking a big gift box by its ear, bored already.
//   3.0   ♐ YOUR STAR: "you don't want more stuff."  The box pops open: no stuff. A folded paper flies out and unfolds:
//         a hand-drawn map, a dotted path through snowy trees, "OUR NEXT WALK. YOU PICK THE TURNS."
//   6.6   "you want a door that opens somewhere new."  Sag's eyes go starry; the path draws itself to a little heart.
//  10.68  "A map beats | a box."  Sag holds the map up like a trophy; the empty box tumbles off. Pisces: fountains.
import { winterGuide, giftBox, prog, ease, lerp, clamp, INK, MONO, R, box, heart, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const T0 = { open: 4.6, fly: [4.7, 5.4], unfold: [5.4, 6.0], path: [6.2, 8.6] }

function map(x, t, cx, cy, k, rot) {
  if (k <= 0.01) return
  const w = 560, h = 380
  const uf = ease.outBack(prog(t, ...T0.unfold))
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * lerp(0.33, 1, uf), k)
  box(x, -w / 2, -h / 2, w, h, '#f3e6c4', { b: 7 })
  R(x, 'rgba(120,80,40,0.25)', -w / 6, -h / 2, 4, h); R(x, 'rgba(120,80,40,0.25)', w / 6, -h / 2, 4, h)
  // trees
  for (const [tx, ty] of [[-200, -60], [-150, 70], [-40, -110], [60, 90], [170, -70], [210, 60]]) {
    x.fillStyle = '#2f7a5a'; x.beginPath(); x.moveTo(tx, ty - 34); x.lineTo(tx + 24, ty + 14); x.lineTo(tx - 24, ty + 14); x.closePath(); x.fill()
    R(x, '#ffffff', tx - 8, ty - 30, 16, 8); R(x, '#6b4a2a', tx - 4, ty + 14, 8, 10)
  }
  // the dotted path drawing itself
  const P = [[-230, 120], [-170, 20], [-90, 60], [-20, -20], [40, 30], [110, -40], [180, 10], [220, -110]]
  const n = 70, shown = Math.floor(n * prog(t, ...T0.path))
  x.fillStyle = '#b0244a'
  for (let i = 0; i < Math.max(shown, t < T0.path[0] ? 6 : 0); i++) {
    if (i % 2) continue
    const u = i / n * (P.length - 1), a = Math.floor(u), f = u - a, p0 = P[a], p1 = P[Math.min(a + 1, P.length - 1)]
    x.fillRect(lerp(p0[0], p1[0], f) - 5, lerp(p0[1], p1[1], f) - 5, 10, 10)
  }
  R(x, INK, -238, 112, 16, 16); R(x, '#ffd34d', -235, 115, 10, 10)
  if (shown >= n - 1) heart(x, 220, -116, 5, '#e23d66')
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('OUR NEXT WALK.', 0, -h / 2 + 34); x.fillStyle = '#b0244a'; x.fillText('YOU PICK THE TURNS.', 0, h / 2 - 30)
  x.restore()
}

const F = winterGuide({
  sign: 'sagittarius', note: 3, duration: 20,
  hook: "*Sagittarius,* | don't wrap it.",
  lines: [
    { t: 3.0, text: "you don't want more *stuff.*" },
    { t: 6.6, text: 'you want a door that opens somewhere *new.*' },
  ],
  fact: 'SAGITTARIUS IS A FIRE SIGN', factAt: 8.6, factDur: 1.8,
  last: 'A map beats | a *box.*',
  guide(t) {
    const shake = t < T0.open ? 0.07 * Math.sin(t * 18) : 0
    return { x: 560, y: 1140, size: 280, mood: t < T0.open ? 'sleepy' : t < T0.path[0] ? 'wide' : t < 10.68 ? 'sparkle' : 'happy', look: [0, -1], squash: shake, lanternSize: 70, zzz: false }
  },
  drawMid(x, t, K) {
    const o = K.outAll(t)
    x.save(); x.globalAlpha *= o
    const away = ease.inCubic(prog(t, 9.6, 10.5))
    if (away < 1) {
      const sx = t < T0.open ? 12 * Math.sin(t * 30) : 0
      giftBox(x, 540 + sx + away * 500, 830 + away * 400, 250, t, { color: '#a35cf0', ribbon: '#7fe3ff', open: prog(t, T0.open, T0.open + 0.7) * 1.3, wobble: t < T0.open ? 1 : 0 })
    }
    x.restore()
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    if (t < 2.7) K.bubble(830, 960, 'socks again?', { size: 38, k: 1 - prog(t, 2.4, 2.7) })
    K.burst(540, 690, 90, t, T0.open, { word: 'POP!', size: 40 })
    if (t > T0.fly[0]) {
      const p = ease.outCubic(prog(t, ...T0.fly))
      const late = t > 10.68
      const cy = late ? 760 + Math.sin(t * 2) * 6 : lerp(760, 690, p)
      map(x, t, 540, cy, lerp(0.3, 1, p) * o, late ? -0.04 : lerp(0.6, -0.03, p))
      if (late) K.sparkles(t, 540, 760, 10.9, 12, 330, 1)
    }
    heartsUp(x, t, 560, 960, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['tick', 0.2, 0.03], ['tick', 0.4, 0.03], ['tick', 0.6, 0.03], ['tick', 1.5, 0.03], ['tick', 1.7, 0.03], ['tick', 1.9, 0.03],
    ['boom', T0.open, 0.12], ['pop', T0.open, 1318.51, 0.05, 0], ['whoosh', T0.fly[0], 0.6, 0.04], ['pop', T0.unfold[0], 880, 0.04, 0], ['pop', T0.unfold[0] + 0.2, 1174.66, 0.04, 0],
    ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['tick', T0.path[0] + i * 0.3, 0.025]), ['pluck', T0.path[1], 1567.98, 0.045, 0.8, 0], ['glitter', T0.path[1], T0.path[1] + 0.5],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
