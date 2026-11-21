// marblerace physics: a deterministic 2D "space astrology" marble run, precomputed once (identical in the browser and in
// node: only + - * / sqrt, sin/cos of exact inputs, no Math.hypot, no engine-dependent sort).
// World units are pixels of the 1080-wide vertical frame; y grows downward. simulate() → { frames, order, finishT, events, course }.
// Sections (top → bottom): start shelf · launch ramps · ASTEROID BELT (drifting rocks) · BINARY STARS (two suns in orbit)
// · ZODIAC WHEEL (12 rotating spokes) · BLACK HOLE (pulls; inside the horizon you're spat out of the WORMHOLE far below)
// · STARDUST plinko · MERCURY RETROGRADE (gravity flips on a timer) · SATURN (ringed planet) · COMET (sweeps across) · finish.
export const R = 30
export const FPS = 60
export const GATE = 2.6
export const FINISH_Y = 15350
const hyp = (a, b) => Math.sqrt(a * a + b * b)
const L = 90, RW = 990

// ── the course. Static: segments [x1,y1,x2,y2,th], pegs [x,y,r]. Moving: movers (circles with p(t)), wheels (spokes).
export const COURSE = (() => {
  const S = [], P = [], M = [], W = [], A = [], Z = [], SIGNS = []
  const seg = (x1, y1, x2, y2, th = 10) => S.push([x1, y1, x2, y2, th])
  const sign = (y, text, col) => SIGNS.push([y, text, col])
  seg(L, 300, L, FINISH_Y + 500, 14); seg(RW, 300, RW, FINISH_Y + 500, 14)
  const SHELF = [L, 640, RW, 640, 12]
  seg(L, 900, 500, 1180); seg(RW, 900, 600, 1180)
  // launch ramps
  seg(L, 1300, 860, 1450); seg(RW, 1720, 220, 1870); seg(L, 2140, 860, 2290)
  // ASTEROID BELT: rocks drifting side to side
  sign(2480, 'ASTEROID BELT', 'rock')
  for (let row = 0; row < 5; row++) for (let k = 0; k < 3; k++) {
    const y = 2620 + row * 150, x0 = 230 + k * 300 + (row % 2) * 150, amp = 70 + 20 * ((row + k) % 3), w = 0.9 + 0.25 * ((row * 3 + k) % 4), ph = row * 1.3 + k * 2.1
    M.push({ kind: 'rock', r: 26 + ((row + k) % 3) * 6, e: 1.35, p: t => [x0 + amp * Math.sin(w * t + ph), y] , v: t => [amp * w * Math.cos(w * t + ph), 0] })
  }
  // BINARY STARS: two suns orbiting a common centre, very bouncy
  sign(3500, 'BINARY STARS', 'sun')
  seg(L, 3420, 420, 3560); seg(RW, 3420, 660, 3560)
  { const cx = 540, cy = 3900, Ro = 190, w = 1.15
    for (const ph of [0, Math.PI]) M.push({ kind: 'sun', r: 74, e: 1.7, p: t => [cx + Ro * Math.cos(w * t + ph), cy + Ro * 0.55 * Math.sin(w * t + ph)], v: t => [-Ro * w * Math.sin(w * t + ph), Ro * 0.55 * w * Math.cos(w * t + ph)] }) }
  seg(L, 4250, 480, 4460); seg(RW, 4250, 600, 4460)
  // ZODIAC WHEEL: 12 spokes rotating slowly
  sign(4560, 'ZODIAC WHEEL', 'wheel')
  W.push({ cx: 540, cy: 5000, r0: 70, r1: 330, n: 12, w: 0.55, th: 12 })
  seg(L, 5420, 470, 5560); seg(RW, 5420, 610, 5560)
  // BLACK HOLE: inverse-square pull; inside the horizon → out of the wormhole far below
  sign(5760, 'BLACK HOLE', 'void')
  seg(RW, 5700, 330, 5900)                                         // the stream comes down the left side…
  A.push({ x: 640, y: 6330, k: 2.4e7, rmax: 460, horizon: 40, exit: [540, 11050] })   // …the hole waits on the right
  seg(L, 6080, 380, 6250)
  seg(L, 6450, 330, 6600); seg(RW, 6450, 750, 6600)
  seg(L, 6800, 470, 6980); seg(RW, 6800, 610, 6980)
  // STARDUST plinko
  sign(7140, 'STARDUST', 'dust')
  for (let row = 0; row < 11; row++) { const y = 7280 + row * 105, off = row % 2 ? 55 : 0; for (let x = 190 + off; x < 900; x += 110) P.push([x, y, 11]) }
  seg(L, 8520, 470, 8760); seg(RW, 8520, 610, 8760)
  // MERCURY RETROGRADE: gravity flips upward for 1.3 s out of every 3.4 s inside the zone
  sign(8900, 'MERCURY RETROGRADE', 'retro')
  Z.push({ x0: L, x1: RW, y0: 9020, y1: 9880, period: 3.4, on: 1.3, g: -1.15 })
  seg(L, 9200, 800, 9340); seg(RW, 9560, 280, 9700)
  seg(L, 9900, 470, 10060); seg(RW, 9900, 610, 10060)
  // SATURN: a ringed planet to roll around (static circle + ring rails)
  sign(10200, 'SATURN', 'saturn')
  P.push([540, 10560, 150])
  seg(310, 10545, 175, 10610, 10); seg(770, 10545, 905, 10610, 10)   // the rings, tilted out so nobody parks on them
  // WORMHOLE exit sits here (from the black hole)
  sign(10940, 'WORMHOLE EXIT', 'worm')
  seg(L, 11250, 800, 11400); seg(RW, 11650, 280, 11800)
  // COMET: a bright rock that sweeps the whole width every 4 s
  sign(12000, 'COMET', 'comet')
  { const y = 12300, per = 4.2
    M.push({ kind: 'comet', r: 44, e: 1.8, p: t => { const u = ((t % per) + per) % per / per; return [-200 + 1480 * u, y] }, v: () => [1480 / per, 0] }) }
  seg(L, 12550, 800, 12700); seg(RW, 12950, 280, 13100)
  // final plinko + funnel
  for (let row = 0; row < 7; row++) { const y = 13350 + row * 120, off = row % 2 ? 65 : 0; for (let x = 200 + off; x < 900; x += 130) P.push([x, y, 14]) }
  seg(L, 14250, 480, 14500); seg(RW, 14250, 600, 14500)
  seg(L, 14700, 800, 14860); seg(RW, 15050, 300, 15200)
  seg(L, FINISH_Y + 230, RW, FINISH_Y + 310, 14)                  // finish tray
  return { S, P, M, W, A, Z, SHELF, SIGNS }
})()

export function wheelSpokes(wh, t) {
  const out = [], a0 = wh.w * t
  for (let i = 0; i < wh.n; i++) { const a = a0 + i * 2 * Math.PI / wh.n, c = Math.cos(a), s = Math.sin(a); out.push([wh.cx + wh.r0 * c, wh.cy + wh.r0 * s, wh.cx + wh.r1 * c, wh.cy + wh.r1 * s, wh.th]) }
  return out
}
export const retroOn = (z, t) => (((t % z.period) + z.period) % z.period) < z.on

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) }

export function simulate({ seed = 7, ids, drag = {}, kick = {}, T = 90 } = {}) {
  const C = COURSE, r = rng(seed), n = ids.length
  const slots = ids.map((_, i) => i)
  for (let i = slots.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [slots[i], slots[j]] = [slots[j], slots[i]] }
  const B = ids.map((id, i) => { const s = slots[i]; return { id, x: 150 + (s % 6) * 150 + (s >= 6 ? 75 : 0) + r() * 10, y: 640 - R - 14 - (s >= 6 ? 2 * R + 6 : 0), vx: 0, vy: 0, fin: null } })
  const G = 1900, DT = 1 / 480, SUB = 480 / FPS
  const frames = new Float32Array(Math.ceil(T * FPS) * n * 2)
  const order = [], events = []
  let step = 0
  const hitSeg = (b, x1, y1, x2, y2, th, wx = null) => {
    const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy
    let u = ((b.x - x1) * dx + (b.y - y1) * dy) / L2; u = Math.max(0, Math.min(1, u))
    const px = x1 + u * dx, py = y1 + u * dy, ex = b.x - px, ey = b.y - py, d = hyp(ex, ey), md = R + th / 2
    if (d >= md || d === 0) return
    const nx = ex / d, ny = ey / d
    b.x += nx * (md - d); b.y += ny * (md - d)
    let svx = 0, svy = 0
    if (wx) { svx = -wx.w * (py - wx.cy); svy = wx.w * (px - wx.cx) }      // spoke surface velocity
    const rvx = b.vx - svx, rvy = b.vy - svy, vn = rvx * nx + rvy * ny
    if (vn < 0) { b.vx -= 1.32 * vn * nx; b.vy -= 1.32 * vn * ny }
    b.vx *= 0.9994; b.vy *= 0.9994
  }
  const hitCircle = (b, cx, cy, cr, e, ovx = 0, ovy = 0) => {
    const ex = b.x - cx, ey = b.y - cy, d = hyp(ex, ey), md = R + cr
    if (d >= md || d === 0) return false
    const nx = ex / d, ny = ey / d
    b.x += nx * (md - d); b.y += ny * (md - d)
    const vn = (b.vx - ovx) * nx + (b.vy - ovy) * ny
    if (vn < 0) { b.vx -= e * vn * nx; b.vy -= e * vn * ny }
    return true
  }
  for (let f = 0; f < T * FPS; f++) {
    for (let k = 0; k < SUB; k++, step++) {
      const ts = step * DT
      const spokes = C.W.map(wh => [wh, wheelSpokes(wh, ts)])
      const movers = C.M.map(m => [m, m.p(ts), m.v(ts)])
      for (const b of B) {
        if (ts < GATE && kick[b.id] && ts > GATE - 0.02) b.vx += kick[b.id]
        let g = G
        for (const z of C.Z) if (b.x > z.x0 && b.x < z.x1 && b.y > z.y0 && b.y < z.y1 && retroOn(z, ts)) g = G * z.g
        b.vy += g * DT
        for (const a of C.A) {
          const ex = a.x - b.x, ey = a.y - b.y, d = hyp(ex, ey)
          if (d < a.horizon) { events.push({ t: ts, id: b.id, kind: 'swallow', from: [b.x, b.y] }); b.x = a.exit[0]; b.y = a.exit[1]; b.vx = (b.x < 540 ? -1 : 1) * 120; b.vy = 380; continue }
          if (d < a.rmax) { const acc = a.k / (d * d + 900); b.vx += acc * ex / d * DT; b.vy += acc * ey / d * DT }
        }
        const dr = 1 - (drag[b.id] ?? 0.12) * DT; b.vx *= dr; b.vy *= dr
        const sp = hyp(b.vx, b.vy); if (sp > 1600) { b.vx *= 1600 / sp; b.vy *= 1600 / sp }
        b.x += b.vx * DT; b.y += b.vy * DT
        if (ts < GATE) hitSeg(b, ...C.SHELF)
        for (const s of C.S) { if (b.y < Math.min(s[1], s[3]) - 60 || b.y > Math.max(s[1], s[3]) + 60) continue; hitSeg(b, ...s) }
        for (const [wh, sk] of spokes) { if (Math.abs(b.y - wh.cy) > wh.r1 + 60) continue; for (const s of sk) hitSeg(b, ...s, wh) }
        for (const p of C.P) { if (Math.abs(b.y - p[1]) > p[2] + 40) continue; hitCircle(b, p[0], p[1], p[2], 1.55) }
        for (const [m, [mx, my], [mvx, mvy]] of movers) { if (Math.abs(b.y - my) > m.r + 40) continue; if (hitCircle(b, mx, my, m.r, m.e, mvx, mvy) && m.kind !== 'rock') events.push({ t: ts, id: b.id, kind: m.kind }) }
        if (b.fin === null && b.y > FINISH_Y) { b.fin = ts; order.push(b.id) }
      }
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const a = B[i], c = B[j], ex = c.x - a.x, ey = c.y - a.y
        if (ex > 2 * R || ex < -2 * R || ey > 2 * R || ey < -2 * R) continue
        const d = hyp(ex, ey)
        if (d >= 2 * R || d === 0) continue
        const nx = ex / d, ny = ey / d, o = (2 * R - d) / 2
        a.x -= nx * o; a.y -= ny * o; c.x += nx * o; c.y += ny * o
        const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny
        if (rv < 0) { const jv = -0.75 * rv; a.vx -= jv * nx; a.vy -= jv * ny; c.vx += jv * nx; c.vy += jv * ny }
      }
    }
    B.forEach((b, i) => { frames[(f * n + i) * 2] = b.x; frames[(f * n + i) * 2 + 1] = b.y })
  }
  return { frames, n, order, finishT: Object.fromEntries(B.map(b => [b.id, b.fin])), events, course: C }
}
