// ngfe04: 24 DAYS OF GREEN FLAGS, door 4: "Packs a spare pair of gloves." (18 s vertical, pop · D)
//   hook "It's freezing and | you *forgot gloves.*" · snowy street: Sagittarius shivers ("brrr"), Cancer rummages in
//   its bag: "I packed two." Two mittens fly over and land on Sag's tips; Sag does a warm wiggle: "you packed TWO??"
//   Last: "They packed *two pairs*."
import { makeDoor, snowGround, snowfall, bubble, hearts, shadow, label, box, drawBits, starFrame, R, INK, BONE, GOLD, RED, prog, ease, lerp, clamp, sparkles } from '../../ngfe01/scenes/advent.js'
const MITT = ['.MM..', 'MMMM.', 'MMMMM', 'MMMMM', 'MMMM.', 'WWWW.']
function lamp(x, cx) { R(x, INK, cx - 9, 520, 18, 660); R(x, '#4a4470', cx - 5, 520, 10, 660); box(x, cx - 40, 470, 80, 56, '#ffe9a8', { b: 6 }) }
function scene(x, t, S) {
  const { u, hero, mate } = S
  snowGround(x, 1180)
  lamp(x, 540)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 500, 0, 540, 500, 420); g.addColorStop(0, 'rgba(255,230,160,0.25)'); g.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = g; x.fillRect(100, 100, 900, 900); x.restore()
  snowfall(x, t, { n: 70, h: 1300, speed: 80, seed: 4 })
  shadow(x, 300, 1160, 240); shadow(x, 790, 1160, 240)
  const warm = u > 3.3
  const shiver = warm ? 0 : 5 * Math.sin(t * 60)
  const sagMood = u < 3.3 ? (u < 1.9 ? 'squint' : 'wide') : 'happy'
  const sagHops = [S.t0 + 3.35, S.t0 + 3.6, S.t0 + 3.85, S.t0 + 4.5]
  const so = { x: 300 + shiver, y: 990, s: 270, mood: sagMood, look: u > 1.9 && u < 3.3 ? [1, -0.4] : [0, 0], hops: sagHops, squash: warm ? 0 : 0.06 }
  mate(x, t, so)
  if (!warm) label(x, 'brrr', 300, 760, { size: 40, col: '#bfe8ff', rot: -0.1 })
  // Cancer + its bag
  const rum = u > 1.0 && u < 2.6
  hero(x, t, { x: 790, y: 990, s: 270, mood: u < 2.6 ? 'neutral' : 'happy', look: rum ? [1, 1] : [-1, -0.3], hops: [S.t0 + 1.1, S.t0 + 1.5, S.t0 + 2.0, S.t0 + 2.7] })
  const bj = rum ? 6 * Math.sin(t * 40) : 0
  box(x, 900 + bj, 1060, 130, 110, '#c86a4a', { b: 6, hi: '#e08a64' }); R(x, INK, 930 + bj, 1030, 70, 10)
  // mittens fly (2.7 → 3.3) and land on Sag's tips
  const F = starFrame(so.x, so.y, so.s, t, { hops: sagHops, squash: so.squash, seed: 7 })
  const tips = [[F.ox - F.S * 0.45, F.cy + F.S * 0.0], [F.ox + F.S * 0.45, F.cy + F.S * 0.0]]
  tips.forEach(([tx, ty], i) => {
    const p = ease.inOutCubic(prog(u, 2.7 + i * 0.12, 3.25 + i * 0.12))
    if (p <= 0) return
    const sx = 960, sy = 1040, mx = lerp(sx, tx, p), my = lerp(sy, ty, p) - Math.sin(Math.PI * p) * 300
    drawBits(x, MITT, { M: i ? RED : '#5fd38a', W: BONE }, mx, my, 9, { rot: (1 - p) * 6 + (i ? 0.3 : -0.3), sx: i ? -1 : 1 })
  })
  sparkles(x, t, 300, 990, S.t0 + 3.35, 10, 170, 1, [GOLD, BONE, RED])
  if (u > 3.6) hearts(x, t, S.t0 + 3.7, 300, 820)
  bubble(x, t, 760, 690, S.t0 + 1.6, S.t0 + 3.4, 'I packed two.', { size: 46, tail: 0.1 })
  bubble(x, t, 340, 690, S.t0 + 3.95, S.t1 - 0.2, 'you packed\nTWO??', { size: 46, tail: -0.1 })
  void clamp
}
const EP = makeDoor({
  day: 4, hero: 'cancer', mate: 'sagittarius', hook: "It's freezing and | you *forgot gloves.*",
  flag: 'packs a *spare pair* of gloves.', scene,
  payoff(x, t, S) { if (S.ok > 0.5) { drawBits(x, MITT, { M: '#5fd38a', W: BONE }, 920, 1150, 7, { rot: 0.3 }); drawBits(x, MITT, { M: RED, W: BONE }, 690, 1150, 7, { rot: -0.3, sx: -1 }) } },
  cues: [['tick', 1.1, 0.04], ['tick', 1.3, 0.04], ['tick', 1.5, 0.04], ['tick', 1.7, 0.04], ['pop', 1.6, 880, 0.04, 0.3],
    ['whoosh', 2.7, 0.4, 0.035], ['pop', 3.25, 1174.66, 0.045, -0.3], ['pop', 3.37, 1318.51, 0.045, -0.3], ['glitter', 3.35, 3.8], ['pop', 3.95, 987.77, 0.04, -0.3]],
  last: 'They packed *two pairs*.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
