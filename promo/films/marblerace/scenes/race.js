// marblerace physics: a deterministic 2D marble run, precomputed once (same result in the browser and in node).
// World units are pixels of the 1080-wide vertical frame; y grows downward. simulate() → { frames, order, finishT, course }.
export const R = 30                       // star "marble" radius
export const FPS = 60                     // stored positions per second
export const GATE = 2.6                   // film seconds: the start floor drops
export const FINISH_Y = 10250              // crossing this line = finished

// ── the course: line segments [x1, y1, x2, y2, thickness] and round pegs [x, y, r]
function buildCourse() {
  const S = [], P = []
  const seg = (x1, y1, x2, y2, th = 10) => S.push([x1, y1, x2, y2, th])
  const L = 90, Rr = 990                                   // side walls
  seg(L, 300, L, 10700, 14); seg(Rr, 300, Rr, 10700, 14)
  // start shelf (removed at GATE) + funnel into a single drop
  const SHELF = [L, 640, Rr, 640, 12]
  seg(L, 900, 500, 1180); seg(Rr, 900, 600, 1180)
  // zigzag ramps (each ends short of the far wall so marbles drop to the next)
  const ramps = [[1300, 'R'], [1720, 'L'], [2140, 'R'], [2560, 'L'], [2980, 'R']]
  for (const [y, dir] of ramps) dir === 'R' ? seg(L, y, 860, y + 150) : seg(Rr, y, 220, y + 150)
  // peg field
  for (let row = 0; row < 11; row++) {
    const y = 3380 + row * 105, off = row % 2 ? 55 : 0
    for (let x = 190 + off; x < 920; x += 110) P.push([x, y, 11])
  }
  // funnel to the fork
  seg(L, 4620, 470, 4900); seg(Rr, 4620, 610, 4900)
  // the fork: a wedge splits left (short + steep) and right (long, bumpy)
  seg(540, 5040, 300, 5300, 12); seg(540, 5040, 780, 5300, 12)
  seg(300, 5300, 300, 6100, 10)                              // left lane inner wall
  seg(780, 5300, 780, 6100, 10)                              // right lane inner wall
  for (let i = 0; i < 5; i++) i % 2 ? seg(L, 5420 + i * 140, 220, 5500 + i * 140) : seg(300, 5420 + i * 140, 170, 5500 + i * 140)   // left: tight zigzag (gap at the low end)
  for (let i = 0; i < 3; i++) i % 2 ? seg(780, 5380 + i * 230, 905, 5520 + i * 230) : seg(Rr, 5380 + i * 230, 865, 5520 + i * 230)   // right: long ramps (gap at the low end)
  // re-join + final zigzag
  seg(L, 6200, 480, 6380); seg(Rr, 6200, 600, 6380)
  seg(L, 6620, 800, 6800); seg(Rr, 7060, 280, 7240); seg(L, 7500, 760, 7680)
  seg(Rr, 7840, 560, 8000)
  // second peg field (bigger pegs, wider spacing) + funnel + two last ramps
  for (let row = 0; row < 7; row++) {
    const y = 8180 + row * 120, off = row % 2 ? 65 : 0
    for (let x = 200 + off; x < 900; x += 130) P.push([x, y, 14])
  }
  seg(L, 9000, 480, 9250); seg(Rr, 9000, 600, 9250)
  seg(L, 9420, 800, 9580); seg(Rr, 9800, 300, 9960)
  // finish tray: a gentle slope into a pile
  seg(L, 10460, Rr, 10540, 14)
  return { S, P, SHELF, walls: [L, Rr] }
}

const hyp = (a, b) => Math.sqrt(a * a + b * b)      // not Math.hypot: its rounding differs between JS engines
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }

export function simulate({ seed = 7, ids, drag = {}, kick = {}, T = 70 } = {}) {
  const C = buildCourse(), r = rng(seed)
  const n = ids.length
  // two rows on the shelf, shuffled by seed
  const slots = ids.map((_, i) => i)
  for (let i = slots.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [slots[i], slots[j]] = [slots[j], slots[i]] }   // Fisher–Yates (engine-independent)
  const B = ids.map((id, i) => { const s = slots[i]; return { id, x: 150 + (s % 6) * 150 + (s >= 6 ? 75 : 0) + r() * 10, y: 640 - R - 14 - (s >= 6 ? 2 * R + 6 : 0), vx: 0, vy: 0, fin: null } })
  const G = 1900, DT = 1 / 480, SUB = 480 / FPS
  const frames = new Float32Array(Math.ceil(T * FPS) * n * 2)
  const finishOrder = []
  let step = 0
  const collideSeg = (b, [x1, y1, x2, y2, th]) => {
    const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy
    let u = ((b.x - x1) * dx + (b.y - y1) * dy) / L2; u = Math.max(0, Math.min(1, u))
    const px = x1 + u * dx, py = y1 + u * dy, ex = b.x - px, ey = b.y - py, d = hyp(ex, ey), md = R + th / 2
    if (d >= md || d === 0) return
    const nx = ex / d, ny = ey / d
    b.x += nx * (md - d); b.y += ny * (md - d)
    const vn = b.vx * nx + b.vy * ny
    if (vn < 0) { b.vx -= 1.32 * vn * nx; b.vy -= 1.32 * vn * ny }
    b.vx *= 0.9994; b.vy *= 0.9994                       // rolling friction
  }
  const collidePeg = (b, [cx, cy, pr]) => {
    const ex = b.x - cx, ey = b.y - cy, d = hyp(ex, ey), md = R + pr
    if (d >= md || d === 0) return
    const nx = ex / d, ny = ey / d
    b.x += nx * (md - d); b.y += ny * (md - d)
    const vn = b.vx * nx + b.vy * ny
    if (vn < 0) { b.vx -= 1.55 * vn * nx; b.vy -= 1.55 * vn * ny }
  }
  for (let f = 0; f < T * FPS; f++) {
    const t = f / FPS
    for (let k = 0; k < SUB; k++, step++) {
      const ts = step * DT
      for (const b of B) {
        if (b.fin === null && ts < GATE && kick[b.id] && ts > GATE - 0.02) b.vx += kick[b.id]
        b.vy += G * DT
        const dr = 1 - (drag[b.id] ?? 0.12) * DT; b.vx *= dr; b.vy *= dr
        const sp = hyp(b.vx, b.vy); if (sp > 1500) { b.vx *= 1500 / sp; b.vy *= 1500 / sp }
        b.x += b.vx * DT; b.y += b.vy * DT
        if (ts < GATE) collideSeg(b, C.SHELF)
        for (const s of C.S) collideSeg(b, s)
        for (const p of C.P) collidePeg(b, p)
        if (b.fin === null && b.y > FINISH_Y) { b.fin = ts; finishOrder.push(b.id) }
      }
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const a = B[i], c = B[j], ex = c.x - a.x, ey = c.y - a.y, d = hyp(ex, ey)
        if (d >= 2 * R || d === 0) continue
        const nx = ex / d, ny = ey / d, o = (2 * R - d) / 2
        a.x -= nx * o; a.y -= ny * o; c.x += nx * o; c.y += ny * o
        const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny
        if (rv < 0) { const jv = -0.75 * rv; a.vx -= jv * nx; a.vy -= jv * ny; c.vx += jv * nx; c.vy += jv * ny }
      }
    }
    B.forEach((b, i) => { frames[(f * n + i) * 2] = b.x; frames[(f * n + i) * 2 + 1] = b.y })
  }
  return { frames, n, order: finishOrder, finishT: Object.fromEntries(B.map(b => [b.id, b.fin])), course: C }
}
