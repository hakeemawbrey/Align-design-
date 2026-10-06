/* Align reel — sacred geometry library (ALIGN.geo).
 *
 *   ALIGN.geo.FORMS  ordered [{ id, name, note, draw(ctx, cx, cy, size, o) }]
 *   ALIGN.geo.byId(id)
 *   ALIGN.geo.project(x, y, z, { fov = 4, cx = 0, cy = 0, scale = 1 }) -> [sx, sy, k, z]
 *   ALIGN.geo.rotate3([x, y, z], rx, ry, rz) -> [x, y, z]
 *   ALIGN.geo.platonicAt(t) -> name of the solid the 'platonic' form shows at time t
 *
 * draw(ctx, cx, cy, size, o): size = outer diameter in px. o (all optional):
 *   t        seconds, drives continuous motion (3D spin, pulses, breathing)
 *   progress 0..1 draw-in (lines stroke on, points pop, staggered); 1 = complete
 *   color, color2   ink colours (default bone #efe6d6 / gold #f2c75c)
 *   lw       line width px (default scales with size)
 *   alpha, rot (rad, screen-plane rotation), glow 0..1 (default 0.55)
 *   rx, ry   3D view angles (override the t-driven spin) · fov (3D camera distance, default 4)
 *   solid    'platonic' only: 'tetrahedron'|'cube'|'octahedron'|'dodecahedron'|'icosahedron'
 * Every draw is a pure function of its inputs: no state, no Math.random. */
;(function () {
  const A = (window.ALIGN = window.ALIGN || {})
  const TAU = Math.PI * 2, PI = Math.PI, PHI = (1 + Math.sqrt(5)) / 2, S3 = Math.sqrt(3)
  const BONE = '#efe6d6', GOLD = '#f2c75c'
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
  const lerp = (a, b, t) => a + (b - a) * t
  const win = (p, a, b) => clamp((p - a) / (b - a))
  const io3 = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
  const out3 = (x) => 1 - Math.pow(1 - x, 3)
  const outBack = (x) => { if (x <= 0) return 0; if (x >= 1) return 1; const c1 = 1.70158, c3 = c1 + 1; return Math.max(0, 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)) }
  /** local 0..1 progress of item i of n inside a 0..1 master progress; each item occupies w of the span */
  const stag = (p, i, n, w = 0.35) => (n <= 1 ? clamp(p) : clamp((p - (i / (n - 1)) * (1 - w)) / w))
  const mix = (a, b, t) => (A.mixHex ? A.mixHex(a, b, t) : a)

  /* ---------------- option + stroke helpers ---------------- */
  function opts(size, o) {
    o = o || {}
    return {
      t: o.t || 0, p: o.progress == null ? 1 : clamp(o.progress),
      c: o.color || BONE, c2: o.color2 || GOLD,
      lw: o.lw || Math.max(0.8, size * 0.0024),
      a: o.alpha == null ? 1 : o.alpha, rot: o.rot || 0,
      glow: o.glow == null ? 0.55 : o.glow, o,
    }
  }
  /** stroke a Path2D with an optional two-pass soft glow underneath */
  function paint(ctx, path, O, color, am = 1, lm = 1) {
    if (am <= 0) return
    const base = ctx.globalAlpha
    ctx.strokeStyle = color
    if (O.glow > 0) {
      ctx.globalAlpha = base * am * 0.06 * O.glow; ctx.lineWidth = O.lw * lm * 7; ctx.stroke(path)
      ctx.globalAlpha = base * am * 0.16 * O.glow; ctx.lineWidth = O.lw * lm * 2.8; ctx.stroke(path)
    }
    ctx.globalAlpha = base * am; ctx.lineWidth = O.lw * lm; ctx.stroke(path)
    ctx.globalAlpha = base
  }
  /** node dots. pts: [x, y, f] where f 0..1 is the pop-in amount */
  function dots(ctx, pts, r, color, O, am = 1) {
    if (am <= 0) return
    const base = ctx.globalAlpha
    ctx.fillStyle = color
    const pass = (mul, a) => {
      ctx.globalAlpha = base * a
      ctx.beginPath()
      for (const q of pts) {
        const f = q[2] == null ? 1 : q[2]
        if (f <= 0) continue
        const rr = r * mul * outBack(f) * (q[3] == null ? 1 : q[3])
        if (rr <= 0) continue
        ctx.moveTo(q[0] + rr, q[1]); ctx.arc(q[0], q[1], rr, 0, TAU)
      }
      ctx.fill()
    }
    if (O.glow > 0) pass(3, am * 0.16 * O.glow)
    pass(1, am)
    ctx.globalAlpha = base
  }
  function arcP(P, x, y, r, a0, f, ccw = false) {
    if (f <= 0) return
    f = Math.min(1, f)
    P.moveTo(x + r * Math.cos(a0), y + r * Math.sin(a0))
    P.arc(x, y, r, a0, a0 + (ccw ? -1 : 1) * TAU * f, ccw)
  }
  function lineP(P, x1, y1, x2, y2, f) {
    if (f <= 0) return
    f = Math.min(1, f)
    P.moveTo(x1, y1); P.lineTo(lerp(x1, x2, f), lerp(y1, y2, f))
  }
  /** polyline drawn on by arc length */
  function polyP(P, pts, f, closed) {
    if (f <= 0) return
    const q = closed ? pts.concat([pts[0]]) : pts
    let tot = 0
    const L = []
    for (let i = 1; i < q.length; i++) { const l = Math.hypot(q[i][0] - q[i - 1][0], q[i][1] - q[i - 1][1]); L.push(l); tot += l }
    let rem = Math.min(1, f) * tot
    P.moveTo(q[0][0], q[0][1])
    for (let i = 1; i < q.length && rem > 0; i++) {
      const k = Math.min(1, rem / (L[i - 1] || 1))
      P.lineTo(lerp(q[i - 1][0], q[i][0], k), lerp(q[i - 1][1], q[i][1], k))
      rem -= L[i - 1]
    }
    if (f >= 1 && closed) P.closePath()
  }
  const pol = (deg, r) => [r * Math.cos((deg * PI) / 180), r * Math.sin((deg * PI) / 180)]

  /* ---------------- 3D ---------------- */
  function rotate3(p, rx = 0, ry = 0, rz = 0) {
    let [x, y, z] = p
    if (ry) { const c = Math.cos(ry), s = Math.sin(ry); [x, z] = [x * c + z * s, -x * s + z * c] }
    if (rx) { const c = Math.cos(rx), s = Math.sin(rx); [y, z] = [y * c - z * s, y * s + z * c] }
    if (rz) { const c = Math.cos(rz), s = Math.sin(rz); [x, y] = [x * c - y * s, x * s + y * c] }
    return [x, y, z]
  }
  /** perspective projection. Positive z is away from the camera. Returns [sx, sy, k, z]. */
  function project(x, y, z, o = {}) {
    const fov = o.fov || 4, k = fov / (fov + z), s = o.scale == null ? 1 : o.scale
    return [(o.cx || 0) + x * k * s, (o.cy || 0) + y * k * s, k, z]
  }
  /** edges of a projected unit-radius object, faded/thinned by depth (4 buckets, back drawn first) */
  function edges3(ctx, pts, edges, O, color, prog, am = 1) {
    const B = [new Path2D(), new Path2D(), new Path2D(), new Path2D()]
    edges.forEach(([i, j], k) => {
      const f = prog ? prog(k) : 1
      if (f <= 0) return
      const a = pts[i], b = pts[j]
      const d = clamp(((a[3] + b[3]) / 2 + 1) / 2)
      const bi = Math.min(3, Math.floor(d * 4))
      lineP(B[bi], a[0], a[1], b[0], b[1], f)
    })
    for (let bi = 3; bi >= 0; bi--) paint(ctx, B[bi], O, color, am * (1 - bi * 0.25), 1 - bi * 0.13)
  }
  function vdots(ctx, pts, r, color, O, f = 1, am = 1) {
    dots(ctx, pts.map((q) => [q[0], q[1], f, q[2]]), r, color, O, 1 * am)
  }
  function edgesByMin(V) {
    let m = Infinity
    for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) m = Math.min(m, dist3(V[i], V[j]))
    const E = []
    for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) if (Math.abs(dist3(V[i], V[j]) - m) < 1e-4 * Math.max(1, m)) E.push([i, j])
    return E
  }
  const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
  const norm = (V) => { const r = Math.max(...V.map((v) => Math.hypot(...v))); return V.map((v) => v.map((c) => c / r)) }
  const signs = (arr) => arr.reduce((acc, c) => acc.flatMap((v) => (c === 0 ? [[...v, 0]] : [[...v, c], [...v, -c]])), [[]])
  const cyc = (v) => [v, [v[1], v[2], v[0]], [v[2], v[0], v[1]]]

  const SOLIDS = (() => {
    const tet = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]]
    const cube = signs([1, 1, 1])
    const oct = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
    const ico = signs([0, 1, PHI]).flatMap(cyc)
    const dod = signs([1, 1, 1]).concat(signs([0, 1 / PHI, PHI]).flatMap(cyc))
    const out = {}
    for (const [k, V] of Object.entries({ tetrahedron: tet, cube, octahedron: oct, dodecahedron: dod, icosahedron: ico })) { const N = norm(V); out[k] = { V: N, E: edgesByMin(N) } }
    // cuboctahedron (vector equilibrium)
    const ve = norm([[1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0], [1, 0, 1], [1, 0, -1], [-1, 0, 1], [-1, 0, -1], [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1]])
    out.ve = { V: ve, E: edgesByMin(ve) }
    return out
  })()
  const SOLID_ORDER = ['tetrahedron', 'cube', 'octahedron', 'dodecahedron', 'icosahedron']
  const PLAT_PERIOD = 3.2
  const platonicAt = (t) => SOLID_ORDER[((Math.floor((t || 0) / PLAT_PERIOD) % 5) + 5) % 5]

  /* draw a projected solid; returns nothing */
  function drawSolid(ctx, S, name, O, rx, ry, prog, am = 1, color) {
    const { V, E } = SOLIDS[name]
    const sc = S * 0.4
    const P = V.map((v) => { const r = rotate3(v, rx, ry, 0); const q = project(r[0], r[1], r[2], { fov: O.o.fov || 4, scale: sc }); return [q[0], q[1], 1 - clamp((r[2] + 1) / 2) * 0.7, r[2]] })
    edges3(ctx, P, E, O, color || O.c, (k) => io3(stag(prog, k, E.length, 0.3)), am)
    vdots(ctx, P, O.lw * 1.5, O.c2, O, outBack(win(prog, 0.15, 1)), am)
  }

  /* ---------------- the forms ---------------- */
  const FORMS = []
  function form(id, name, note, fn) {
    FORMS.push({
      id, name, note,
      draw(ctx, cx, cy, size, o) {
        const O = opts(size, o)
        if (O.a <= 0 || !(size > 0)) return
        ctx.save()
        ctx.translate(cx, cy)
        if (O.rot) ctx.rotate(O.rot)
        ctx.globalAlpha *= O.a
        ctx.lineCap = 'round'; ctx.lineJoin = 'round'
        fn(ctx, size, O)
        ctx.restore()
      },
    })
  }
  const hex = (r, a0 = -PI / 2) => Array.from({ length: 6 }, (_, k) => [r * Math.cos(a0 + (k * TAU) / 6), r * Math.sin(a0 + (k * TAU) / 6)])

  /* --- Seed of Life --- */
  form('seed', 'Seed of Life', '7 circles · day of creation', (ctx, S, O) => {
    const r = (S / 4) * 0.97, p = O.p
    const P = new Path2D(), Q = new Path2D()
    arcP(P, 0, 0, r, -PI / 2, io3(stag(p, 0, 8, 0.32)))
    const C = hex(r)
    C.forEach(([x, y], k) => arcP(P, x, y, r, Math.atan2(y, x) + PI, io3(stag(p, k + 1, 8, 0.32))))
    arcP(Q, 0, 0, 2 * r, -PI / 2, io3(stag(p, 7, 8, 0.32)))
    paint(ctx, Q, O, O.c2, 0.85)
    paint(ctx, P, O, O.c)
    const tw = (k) => 0.75 + 0.25 * Math.sin(O.t * 1.7 + k * 1.1)
    dots(ctx, [[0, 0, win(p, 0.1, 0.3)], ...C.map(([x, y], k) => [x, y, stag(p, k + 1, 8, 0.32), tw(k)])], O.lw * 1.4, O.c2, O)
    // petal tips where neighbours cross
    dots(ctx, hex(r * S3, -PI / 2 + PI / 6).map(([x, y], k) => [x, y, win(p, 0.75 + k * 0.03, 0.95 + k * 0.01)]), O.lw * 1.1, O.c, O, 0.8)
  })

  /* --- Egg of Life --- */
  form('egg', 'Egg of Life', '7 spheres · the first cell divisions', (ctx, S, O) => {
    const r = (S / 6) * 0.97, p = O.p
    const C = [[0, 0], ...hex(2 * r)]
    const P = new Path2D(), Q = new Path2D(), L = new Path2D()
    C.forEach(([x, y], k) => arcP(P, x, y, r, k ? Math.atan2(y, x) + PI : -PI / 2, io3(stag(win(p, 0, 0.8), k, 7, 0.34))))
    arcP(Q, 0, 0, 3 * r, -PI / 2, io3(win(p, 0.6, 0.95)))
    const lp = io3(win(p, 0.55, 1))
    const H = hex(2 * r)
    polyP(L, H, lp, true)
    H.forEach(([x, y]) => lineP(L, 0, 0, x, y, lp))
    paint(ctx, L, O, O.c2, 0.32, 0.7)
    paint(ctx, Q, O, O.c2, 0.85)
    paint(ctx, P, O, O.c)
    // inner sphere highlight: soft gold disc breathing in the middle
    const br = 0.5 + 0.5 * Math.sin(O.t * 1.3)
    ctx.save(); ctx.globalAlpha *= (0.05 + 0.04 * br) * win(p, 0.4, 1); ctx.fillStyle = O.c2
    ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); ctx.restore()
    dots(ctx, C.map(([x, y], k) => [x, y, stag(win(p, 0, 0.8), k, 7, 0.34)]), O.lw * 1.4, O.c2, O)
  })

  /* --- Vesica Piscis --- */
  form('vesica', 'Vesica Piscis', 'two circles · the almond of union', (ctx, S, O) => {
    const r = (S / 3) * 0.97, d = r / 2, h = (r * S3) / 2, p = O.p
    const P = new Path2D()
    arcP(P, -d, 0, r, 0, io3(win(p, 0, 0.45)))
    arcP(P, d, 0, r, PI, io3(win(p, 0.12, 0.57)), true)
    const lens = new Path2D()
    lens.arc(-d, 0, r, -PI / 3, PI / 3); lens.arc(d, 0, r, (2 * PI) / 3, (4 * PI) / 3); lens.closePath()
    // lens fill (breathing)
    const fa = win(p, 0.5, 0.85) * (0.13 + 0.06 * Math.sin(O.t * 1.6))
    ctx.save(); ctx.globalAlpha *= fa; ctx.fillStyle = O.c2; ctx.fill(lens); ctx.restore()
    // lens outline grows from the top tip down both sides
    const lf = io3(win(p, 0.45, 0.8)), Lp = new Path2D()
    if (lf > 0) {
      Lp.moveTo(0, -h); Lp.arc(-d, 0, r, -PI / 3, -PI / 3 + (2 * PI / 3) * lf)
      Lp.moveTo(0, -h); Lp.arc(d, 0, r, (4 * PI) / 3, (4 * PI) / 3 - (2 * PI / 3) * lf, true)
    }
    // construction: axis, centre line, rhombus of two equilateral triangles
    const cf = io3(win(p, 0.65, 1)), K = new Path2D()
    lineP(K, 0, -h, 0, h, cf)
    lineP(K, -d, 0, d, 0, cf)
    polyP(K, [[0, -h], [d, 0], [0, h], [-d, 0]], cf, true)
    paint(ctx, K, O, O.c, 0.38, 0.7)
    paint(ctx, P, O, O.c)
    paint(ctx, Lp, O, O.c2, 1, 1.5)
    const ff = win(p, 0.6, 0.9)
    dots(ctx, [[-d, 0, win(p, 0, 0.2)], [d, 0, win(p, 0.12, 0.3)], [0, -h, ff], [0, h, ff]], O.lw * 1.6, O.c2, O)
  })

  /* --- Flower of Life --- */
  const FLOWER_C = (() => {
    const c = []
    for (let q = -2; q <= 2; q++) for (let s = -2; s <= 2; s++) {
      const u = -q - s
      if (Math.max(Math.abs(q), Math.abs(s), Math.abs(u)) > 2) continue
      c.push([q + s / 2, (s * S3) / 2])
    }
    const ang = ([x, y]) => (Math.atan2(y, x) + PI / 2 + TAU + 1e-6) % TAU
    return c.sort((a, b) => Math.round(Math.hypot(...a) * 100) - Math.round(Math.hypot(...b) * 100) || ang(a) - ang(b))
  })()
  form('flower', 'Flower of Life', '19 circles · the blueprint', (ctx, S, O) => {
    const r = (S / 6) * 0.95, p = O.p, n = FLOWER_C.length
    const P = new Path2D(), Q = new Path2D()
    FLOWER_C.forEach(([x, y], k) => arcP(P, x * r, y * r, r, k ? Math.atan2(y, x) + PI : -PI / 2, io3(stag(p, k, n + 1, 0.22))))
    const of = io3(stag(p, n, n + 1, 0.22))
    arcP(Q, 0, 0, 3 * r, -PI / 2, of)
    arcP(Q, 0, 0, 3 * r * 1.035, -PI / 2, of, true)
    paint(ctx, Q, O, O.c2, 0.9)
    paint(ctx, P, O, O.c, 1, 0.85)
    dots(ctx, FLOWER_C.map(([x, y], k) => [x * r, y * r, stag(p, k, n + 1, 0.22), 0.7 + 0.3 * Math.sin(O.t * 1.4 - Math.hypot(x, y) * 1.3)]), O.lw * 1.15, O.c2, O, 0.85)
  })

  /* --- Fruit of Life & Metatron's Cube --- */
  const FRUIT = (r) => [[0, 0], ...hex(2 * r), ...hex(4 * r)]
  form('fruit', 'Fruit of Life', '13 circles · hidden in the flower', (ctx, S, O) => {
    const r = (S / 10) * 0.97, p = O.p, C = FRUIT(r)
    const P = new Path2D()
    C.forEach(([x, y], k) => arcP(P, x, y, r, k ? Math.atan2(y, x) + PI : -PI / 2, io3(stag(p, k, 13, 0.3))))
    // ghost lattice: the flower it is carved from
    const G = new Path2D(), gf = win(p, 0.5, 1)
    if (gf > 0) { for (const [x, y] of FLOWER_C) if (Math.hypot(x, y) < 1.2) G.moveTo(x * 2 * r + 2 * r, y * 2 * r), G.arc(x * 2 * r, y * 2 * r, 2 * r, 0, TAU) }
    paint(ctx, G, O, O.c, 0.12 * gf, 0.6)
    paint(ctx, P, O, O.c)
    dots(ctx, C.map(([x, y], k) => [x, y, stag(p, k, 13, 0.3), 0.75 + 0.25 * Math.sin(O.t * 1.5 + k)]), O.lw * 1.5, O.c2, O)
  })
  const MET_LINES = (() => {
    const C = FRUIT(1), L = []
    for (let i = 0; i < 13; i++) for (let j = i + 1; j < 13; j++) L.push([i, j])
    const key = ([i, j]) => { const a = C[i], b = C[j]; return Math.hypot(a[0] - b[0], a[1] - b[1]) * 10 + ((Math.atan2((a[1] + b[1]) / 2, (a[0] + b[0]) / 2) + PI / 2 + TAU) % TAU) / TAU }
    return L.sort((a, b) => key(a) - key(b))
  })()
  form('metatron', "Metatron's Cube", '13 circles · 78 lines · all five solids', (ctx, S, O) => {
    const r = (S / 10) * 0.97, p = O.p, C = FRUIT(r)
    const P = new Path2D(), L = new Path2D()
    const cp = win(p, 0, 0.45)
    C.forEach(([x, y], k) => arcP(P, x, y, r, k ? Math.atan2(y, x) + PI : -PI / 2, io3(stag(cp, k, 13, 0.3))))
    const lp = win(p, 0.3, 1)
    MET_LINES.forEach(([i, j], k) => lineP(L, C[i][0], C[i][1], C[j][0], C[j][1], io3(stag(lp, k, 78, 0.12))))
    paint(ctx, P, O, O.c, 0.75, 0.9)
    paint(ctx, L, O, O.c2, 0.9, 0.8)
    dots(ctx, C.map(([x, y], k) => [x, y, stag(cp, k, 13, 0.3), 0.8 + 0.2 * Math.sin(O.t * 2 + k * 0.7)]), O.lw * 1.6, O.c, O)
  })

  /* --- Star of David / hexagram --- */
  form('hexagram', 'Hexagram', 'as above, so below', (ctx, S, O) => {
    const R = (S / 2) * 0.97, p = O.p
    const up = [0, 1, 2].map((k) => pol(-90 + k * 120, R)), dn = [0, 1, 2].map((k) => pol(90 + k * 120, R))
    const P = new Path2D(), Q = new Path2D(), I = new Path2D(), Cc = new Path2D()
    arcP(Cc, 0, 0, R, -PI / 2, io3(win(p, 0, 0.4)))
    polyP(P, up, io3(win(p, 0.2, 0.65)), true)
    polyP(Q, dn, io3(win(p, 0.35, 0.8)), true)
    const fi = io3(win(p, 0.6, 1))
    polyP(I, hex(R / S3, -PI / 2 + PI / 6), fi, true)
    arcP(I, 0, 0, R / 2, -PI / 2, fi)
    arcP(Cc, 0, 0, R * 0.94, PI / 2, io3(win(p, 0.1, 0.5)), true)
    paint(ctx, Cc, O, O.c2, 0.75)
    paint(ctx, I, O, O.c2, 0.45, 0.8)
    paint(ctx, P, O, O.c)
    paint(ctx, Q, O, O.c2)
    const br = (k) => 0.75 + 0.25 * Math.sin(O.t * 1.6 + k * PI / 3)
    dots(ctx, [...up, ...dn].map(([x, y], k) => [x, y, win(p, 0.5 + k * 0.05, 0.75 + k * 0.05), br(k)]), O.lw * 1.6, O.c2, O)
  })

  /* --- Sri Yantra ---
   * Triangle data from the concurrent model published at texample.net/sri-yantra
   * (circle radius 1, y down): [apexY, baseY, baseHalfWidth]; down = Shakti. */
  const SRI = [
    // down (Shakti)
    [1.0, -0.26795, 0.96343], [0.70038, -0.46878, 0.69016], [0.10660, -0.71895, 0.59514], [0.47923, -0.15692, 0.33649], [0.24247, -0.05202, 0.25388],
    // up (Shiva)
    [-1.0, 0.24247, 0.97016], [-0.71895, 0.47923, 0.71735], [-0.26795, 0.70038, 0.51282], [-0.46878, 0.10660, 0.35051],
  ].sort((a, b) => a[2] - b[2]) // inner first
  const SRI_U = 1 / 1.86
  function bhupura(o) {
    const B = 1.6 - o, gs = 0.36 - o, G = 0.66 - o, y1 = 1.7 + o, y2 = 1.86 - o
    const side = [[-B, -B], [-gs, -B], [-gs, -y1], [-G, -y1], [-G, -y2], [G, -y2], [G, -y1], [gs, -y1], [gs, -B]]
    const pts = []
    for (let k = 0; k < 4; k++) for (const [x, y] of side) { let X = x, Y = y; for (let j = 0; j < k; j++) [X, Y] = [-Y, X]; pts.push([X, Y]) }
    return pts
  }
  function petals(P, n, r0, r1, f, U) {
    const step = 360 / n, k = step / 45 // shape scaled from the 8-petal template
    for (let i = 0; i < n; i++) {
      const g = f(i)
      if (g <= 0) continue
      const s = step / 2 + step * i
      const R = (r) => r0 + (r - r0) * out3(g)
      const q = (deg, r) => pol(deg, R(r) * U)
      const dr = r1 - r0
      P.moveTo(...q(s, r0))
      P.bezierCurveTo(...q(s - 5 * k, r0 + dr * 0.7), ...q(s - 17.5 * k, r0 + dr * 0.5), ...q(s - 22.5 * k, r1))
      P.bezierCurveTo(...q(s - 27.5 * k, r0 + dr * 0.5), ...q(s - 40 * k, r0 + dr * 0.7), ...q(s - 45 * k, r0))
    }
  }
  form('sriYantra', 'Sri Yantra', '9 triangles · 43 · lotus 8 & 16 · bhupura', (ctx, S, O) => {
    const U = (S / 2) * SRI_U * 0.98, p = O.p
    // triangles
    const T = new Path2D()
    const tp = win(p, 0.04, 0.5)
    SRI.forEach(([ay, by, hw], k) => polyP(T, [[0, ay * U], [hw * U, by * U], [-hw * U, by * U]], io3(stag(tp, k, 9, 0.3)), true))
    // circle + lotus rings
    const C = new Path2D(), L8 = new Path2D(), L16 = new Path2D(), Bh = new Path2D()
    arcP(C, 0, 0, U, -PI / 2, io3(win(p, 0.38, 0.55)))
    arcP(C, 0, 0, 1.2 * U, -PI / 2, io3(win(p, 0.5, 0.66)))
    arcP(C, 0, 0, 1.38 * U, -PI / 2, io3(win(p, 0.6, 0.76)))
    for (const [rr, a, b] of [[1.44, 0.68, 0.82], [1.475, 0.7, 0.84], [1.51, 0.72, 0.86]]) arcP(C, 0, 0, rr * U, -PI / 2, io3(win(p, a, b)))
    const l8 = win(p, 0.46, 0.66), l16 = win(p, 0.56, 0.78)
    petals(L8, 8, 1.0, 1.2, (i) => stag(l8, i, 8, 0.4), U)
    petals(L16, 16, 1.2, 1.38, (i) => stag(l16, i, 16, 0.3), U)
    const bp = io3(win(p, 0.76, 1))
    for (const off of [0, 0.035, 0.07]) polyP(Bh, bhupura(off).map(([x, y]) => [x * U, y * U]), bp, true)
    const br = 0.5 + 0.5 * Math.sin(O.t * 1.4)
    paint(ctx, Bh, O, O.c, 0.6, 0.8)
    paint(ctx, C, O, O.c2, 0.7, 0.8)
    paint(ctx, L16, O, O.c2, 0.75, 0.8)
    paint(ctx, L8, O, O.c2, 0.9, 0.85)
    paint(ctx, T, O, O.c, 1, 0.95)
    // bindu
    const bf = win(p, 0, 0.12)
    ctx.save(); ctx.globalAlpha *= bf * (0.12 + 0.08 * br); ctx.fillStyle = O.c2
    ctx.beginPath(); ctx.arc(0, 0.035 * U, U * 0.09, 0, TAU); ctx.fill(); ctx.restore()
    dots(ctx, [[0, 0.035 * U, bf]], Math.max(1.4, U * 0.022), O.c2, O)
  })

  /* --- Tree of Life --- */
  const SEPH = [['Keter', 0, 0], ['Chokmah', 1, 0.5], ['Binah', -1, 0.5], ['Chesed', 1, 1.5], ['Geburah', -1, 1.5], ['Tiferet', 0, 2], ['Netzach', 1, 2.5], ['Hod', -1, 2.5], ['Yesod', 0, 3], ['Malkuth', 0, 4]]
  const PATHS = [[0, 1], [0, 2], [0, 5], [1, 2], [1, 5], [1, 3], [2, 5], [2, 4], [3, 4], [3, 5], [3, 6], [4, 5], [4, 7], [5, 6], [5, 8], [5, 7], [6, 7], [6, 8], [6, 9], [7, 8], [7, 9], [8, 9]]
  form('treeOfLife', 'Tree of Life', '10 sephirot · 22 paths', (ctx, S, O) => {
    const u = (S / 4.75) * 0.98, nr = 0.29 * u, p = O.p
    const N = SEPH.map(([, x, y]) => [x * (S3 / 2) * u, (y - 2) * u])
    const P = new Path2D()
    const order = PATHS.map((e, k) => [e, k]).sort((a, b) => Math.min(N[a[0][0]][1], N[a[0][1]][1]) - Math.min(N[b[0][0]][1], N[b[0][1]][1]) || a[1] - b[1])
    const pp = win(p, 0.15, 1)
    order.forEach(([[i, j]], k) => {
      const a = N[i], b = N[j], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L
      lineP(P, a[0] + ux * nr, a[1] + uy * nr, b[0] - ux * nr, b[1] - uy * nr, io3(stag(pp, k, 22, 0.2)))
    })
    paint(ctx, P, O, O.c, 0.85, 0.9)
    // Da'at, the hidden sephirah
    const D = new Path2D(), df = win(p, 0.7, 1)
    if (df > 0) for (let k = 0; k < 16; k += 2) D.moveTo(nr * 0.9 * Math.cos((k * TAU) / 16), -u + nr * 0.9 * Math.sin((k * TAU) / 16)), D.arc(0, -u, nr * 0.9, (k * TAU) / 16, ((k + 1) * TAU) / 16)
    paint(ctx, D, O, O.c, 0.35 * df, 0.7)
    // sephirot
    const R = new Path2D(), flash = (O.t * 3) % 13
    const FLASH = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // lightning-flash order
    ctx.save()
    N.forEach(([x, y], k) => {
      const f = io3(stag(win(p, 0, 0.6), k, 10, 0.3))
      if (f <= 0) return
      arcP(R, x, y, nr, -PI / 2, f)
      const lit = Math.max(0, 1 - Math.abs(flash - FLASH.indexOf(k) - 1.5))
      ctx.globalAlpha = (0.1 + 0.14 * lit) * f * O.a
      ctx.fillStyle = O.c2
      ctx.beginPath(); ctx.arc(x, y, nr * outBack(f), 0, TAU); ctx.fill()
    })
    ctx.restore()
    paint(ctx, R, O, O.c2, 1, 1.1)
    dots(ctx, N.map(([x, y], k) => [x, y, stag(win(p, 0.1, 0.7), k, 10, 0.3)]), Math.max(1, nr * 0.16), O.c, O)
  })

  /* --- Merkaba (star tetrahedron) --- */
  const MERK = (() => {
    const a = Math.sqrt(8) / 3
    const T1 = [[0, -1, 0], ...[0, 1, 2].map((k) => [a * Math.cos((k * TAU) / 3), 1 / 3, a * Math.sin((k * TAU) / 3)])]
    const T2 = T1.map(([x, y, z]) => [-x, -y, -z])
    const E = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1]]
    return { T1, T2, E }
  })()
  form('merkaba', 'Merkaba', 'star tetrahedron · light body', (ctx, S, O) => {
    const p = O.p, sc = S * 0.42, fov = O.o.fov || 4
    const spin = O.o.ry == null ? O.t * 0.22 : O.o.ry
    const rx = O.o.rx == null ? 0.38 + 0.08 * Math.sin(O.t * 0.4) : O.o.rx
    const proj = (V, s) => V.map((v) => { const r = rotate3(v, rx, s, 0); const q = project(r[0], r[1], r[2], { fov, scale: sc }); return [q[0], q[1], 1 - clamp((r[2] + 1) / 2) * 0.7, r[2]] })
    // counter-rotation: the fields turn against each other in eased 120° steps, resting on the star
    const u = O.o.ry == null ? O.t / 3.5 : 0, ph = u - Math.floor(u)
    const delta = (Math.floor(u) + io3(clamp(ph / 0.55))) * (PI / 3)
    const P1 = proj(MERK.T1, spin + delta), P2 = proj(MERK.T2, spin - delta)
    // bounding sphere
    const C = new Path2D()
    arcP(C, 0, 0, sc * fov / Math.sqrt(fov * fov - 1), -PI / 2, io3(win(p, 0, 0.5)))
    paint(ctx, C, O, O.c, 0.18, 0.7)
    edges3(ctx, P2, MERK.E, O, O.c2, (k) => io3(stag(win(p, 0.15, 1), k * 2 + 1, 12, 0.25)))
    edges3(ctx, P1, MERK.E, O, O.c, (k) => io3(stag(win(p, 0.1, 0.95), k * 2, 12, 0.25)))
    const df = win(p, 0.4, 1)
    vdots(ctx, P1, O.lw * 1.7, O.c, O, df)
    vdots(ctx, P2, O.lw * 1.7, O.c2, O, df)
  })

  /* --- Platonic solids --- */
  form('platonic', 'Platonic Solids', 'tetra · cube · octa · dodeca · icosa', (ctx, S, O) => {
    const ry = O.o.ry == null ? O.t * 0.5 : O.o.ry
    const rx = O.o.rx == null ? 0.48 + 0.12 * Math.sin(O.t * 0.37) : O.o.rx
    if (O.o.solid && SOLIDS[O.o.solid]) { drawSolid(ctx, S, O.o.solid, O, rx, ry, O.p); return }
    const lt = ((O.t % PLAT_PERIOD) + PLAT_PERIOD) % PLAT_PERIOD / PLAT_PERIOD
    const name = platonicAt(O.t)
    const prog = O.p * io3(clamp(lt / 0.32))
    const fade = 1 - io3(win(lt, 0.86, 1))
    drawSolid(ctx, S, name, O, rx, ry, O.t < PLAT_PERIOD ? O.p : prog, fade)
  })

  /* --- Vector equilibrium (cuboctahedron) --- */
  form('vectorEquilibrium', 'Vector Equilibrium', 'cuboctahedron · 12 around 1', (ctx, S, O) => {
    const { V, E } = SOLIDS.ve, p = O.p, sc = S * 0.41, fov = O.o.fov || 4
    const ry = O.o.ry == null ? O.t * 0.4 : O.o.ry
    const rx = O.o.rx == null ? 0.55 : O.o.rx
    const P = V.map((v) => { const r = rotate3(v, rx, ry, 0); const q = project(r[0], r[1], r[2], { fov, scale: sc }); return [q[0], q[1], 1 - clamp((r[2] + 1) / 2) * 0.7, r[2]] })
    // the 12 radial vectors from the centre
    const rp = win(p, 0, 0.45)
    const Rad = P.map((q) => [-1, q[0], q[1], q[3]])
    const pts = [[0, 0, 1, 0], ...P]
    edges3(ctx, pts, Rad.map((_, k) => [0, k + 1]), O, O.c2, (k) => io3(stag(rp, k, 12, 0.4)), 0.55)
    edges3(ctx, P, E, O, O.c, (k) => io3(stag(win(p, 0.3, 1), k, E.length, 0.25)))
    vdots(ctx, P, O.lw * 1.7, O.c2, O, win(p, 0.2, 0.6))
    dots(ctx, [[0, 0, win(p, 0, 0.15)]], O.lw * 2.2, O.c2, O)
  })

  /* --- Torus --- */
  form('torus', 'Torus', 'the self-sustaining field', (ctx, S, O) => {
    const p = O.p, sc = S * 0.4, fov = O.o.fov || 4.5
    const ry = O.o.ry == null ? O.t * 0.35 : O.o.ry
    const rx = O.o.rx == null ? 1.0 + 0.1 * Math.sin(O.t * 0.3) : O.o.rx
    const R = 0.6, r = 0.4, NM = 30, SEG = 44, NP = 6
    const B = [0, 1, 2, 3].map(() => new Path2D()), Bp = [0, 1, 2, 3].map(() => new Path2D())
    const pt = (th, ph) => { const w = R + r * Math.cos(th); const q = rotate3([w * Math.cos(ph), r * Math.sin(th), w * Math.sin(ph)], rx, ry, 0); const s = project(q[0], q[1], q[2], { fov, scale: sc }); return [s[0], s[1], q[2]] }
    const ring = (buckets, f, fn) => {
      const n = Math.max(1, Math.ceil(SEG * f))
      let prev = fn(0)
      for (let i = 1; i <= n; i++) {
        const cur = fn(Math.min(f, i / SEG) * TAU)
        const d = clamp(((prev[2] + cur[2]) / 2 + 1) / 2), bi = Math.min(3, Math.floor(d * 4))
        buckets[bi].moveTo(prev[0], prev[1]); buckets[bi].lineTo(cur[0], cur[1])
        prev = cur
      }
    }
    for (let j = 0; j < NM; j++) {
      const f = io3(stag(win(p, 0, 0.85), j, NM, 0.3))
      if (f > 0) ring(B, f, (th) => pt(th, (j / NM) * TAU))
    }
    for (let j = 0; j < NP; j++) {
      const f = io3(stag(win(p, 0.4, 1), j, NP, 0.5))
      if (f > 0) ring(Bp, f, (ph) => pt((j / NP) * TAU, ph))
    }
    for (let bi = 3; bi >= 0; bi--) { paint(ctx, Bp[bi], O, O.c2, 0.6 * (1 - bi * 0.24), 0.8 - bi * 0.1); paint(ctx, B[bi], O, O.c, 1 - bi * 0.24, 0.85 - bi * 0.12) }
  })

  /* --- Golden spiral --- */
  const GOLD_STEPS = (() => {
    let x = -PHI / 2, y = -0.5, w = PHI, h = 1
    const out = []
    for (let k = 0; k < 11; k++) {
      const dir = k % 4
      if (dir === 0) { const s = h; out.push({ sq: [x, y, s], c: [x + s, y + s], a0: PI, r: s }); x += s; w -= s }
      else if (dir === 1) { const s = w; out.push({ sq: [x, y, s], c: [x, y + s], a0: PI * 1.5, r: s }); y += s; h -= s }
      else if (dir === 2) { const s = h; out.push({ sq: [x + w - s, y, s], c: [x + w - s, y], a0: 0, r: s }); w -= s }
      else { const s = w; out.push({ sq: [x, y + h - s, s], c: [x + s, y + h - s], a0: PI / 2, r: s }); h -= s }
    }
    // pole: intersection of the two diagonals
    const [ax, ay, bx, by] = [-PHI / 2, 0.5, PHI / 2, -0.5], [cx, cy, dx, dy] = [-PHI / 2 + 1, -0.5, PHI / 2, 0.5]
    const d1 = [bx - ax, by - ay], d2 = [dx - cx, dy - cy]
    const tt = ((cx - ax) * d2[1] - (cy - ay) * d2[0]) / (d1[0] * d2[1] - d1[1] * d2[0])
    return { steps: out, pole: [ax + d1[0] * tt, ay + d1[1] * tt] }
  })()
  form('goldenSpiral', 'Golden Spiral', 'φ = 1.618 · rectangles within rectangles', (ctx, S, O) => {
    const k = (S * 0.95) / PHI, p = O.p, st = GOLD_STEPS.steps, n = st.length
    const Rq = new Path2D(), Sp = new Path2D(), Dg = new Path2D()
    polyP(Rq, [[-PHI / 2 * k, -0.5 * k], [PHI / 2 * k, -0.5 * k], [PHI / 2 * k, 0.5 * k], [-PHI / 2 * k, 0.5 * k]], io3(win(p, 0, 0.25)), true)
    st.forEach(({ sq: [x, y, s] }, i) => polyP(Rq, [[x * k, y * k], [(x + s) * k, y * k], [(x + s) * k, (y + s) * k], [x * k, (y + s) * k]], io3(stag(win(p, 0.12, 0.6), i, n, 0.3)), true))
    const dp = io3(win(p, 0.55, 0.85))
    lineP(Dg, -PHI / 2 * k, 0.5 * k, PHI / 2 * k, -0.5 * k, dp)
    lineP(Dg, (-PHI / 2 + 1) * k, -0.5 * k, PHI / 2 * k, 0.5 * k, dp)
    // spiral: arcs by length (each arc length ∝ r)
    const tot = st.reduce((a, s) => a + s.r, 0)
    let rem = io3(win(p, 0.3, 1)) * tot
    for (const s of st) { if (rem <= 0) break; const f = Math.min(1, rem / s.r); Sp.moveTo(s.c[0] * k + s.r * k * Math.cos(s.a0), s.c[1] * k + s.r * k * Math.sin(s.a0)); Sp.arc(s.c[0] * k, s.c[1] * k, s.r * k, s.a0, s.a0 + (PI / 2) * f); rem -= s.r }
    paint(ctx, Dg, O, O.c, 0.22, 0.6)
    paint(ctx, Rq, O, O.c, 0.72, 0.85)
    paint(ctx, Sp, O, O.c2, 1, 1.5)
    // a spark travelling the spiral inward
    if (p >= 1) {
      const u = (O.t * 0.18) % 1, L = Math.pow(u, 0.6) * tot
      let acc = 0
      for (const s of st) {
        if (acc + s.r >= L) { const a = s.a0 + (PI / 2) * ((L - acc) / s.r); dots(ctx, [[(s.c[0] + s.r * Math.cos(a)) * k, (s.c[1] + s.r * Math.sin(a)) * k, 1]], O.lw * 2.2 * (1 - u * 0.5), O.c2, O, Math.sin(PI * u)); break }
        acc += s.r
      }
    }
    dots(ctx, [[GOLD_STEPS.pole[0] * k, GOLD_STEPS.pole[1] * k, win(p, 0.85, 1)]], O.lw * 1.4, O.c2, O, 0.8)
  })

  /* --- Phyllotaxis --- */
  const GA = PI * (3 - Math.sqrt(5))
  form('phyllotaxis', 'Phyllotaxis', 'golden angle 137.5° · the sunflower', (ctx, S, O) => {
    const n = 400, Rd = (S / 2) * 0.96, c = Rd / Math.sqrt(n), p = O.p
    const base = ctx.globalAlpha
    const groups = [[], [], [], [], [], [], [], [], [], []] // [colourIdx*5 + alphaBucket]
    for (let i = 0; i < n; i++) {
      const f = stag(p, i, n, 0.12)
      if (f <= 0) continue
      const rr = c * Math.sqrt(i + 0.5), a = i * GA
      const sz = c * 0.36 * (0.55 + 0.45 * Math.sqrt(i / n)) * outBack(f)
      const wave = 0.5 + 0.5 * Math.sin(Math.sqrt(i) * 0.9 - O.t * 2.2)
      const gold = i % 21 === 0 || i % 34 === 0
      const ab = Math.min(4, Math.floor((0.45 + 0.55 * wave) * 5))
      groups[(gold ? 5 : 0) + ab].push([rr * Math.cos(a), rr * Math.sin(a), sz])
    }
    groups.forEach((g, gi) => {
      if (!g.length) return
      const col = gi >= 5 ? O.c2 : O.c, al = ((gi % 5) + 1) / 5
      if (O.glow > 0) { ctx.globalAlpha = base * al * 0.15 * O.glow; ctx.fillStyle = col; ctx.beginPath(); for (const [x, y, s] of g) { ctx.moveTo(x + s * 2.4, y); ctx.arc(x, y, s * 2.4, 0, TAU) } ctx.fill() }
      ctx.globalAlpha = base * (0.35 + 0.65 * al); ctx.fillStyle = col
      ctx.beginPath(); for (const [x, y, s] of g) { ctx.moveTo(x + s, y); ctx.arc(x, y, s, 0, TAU) } ctx.fill()
    })
    ctx.globalAlpha = base
  })

  /* ---------------- exports ---------------- */
  const byId = (id) => FORMS.find((f) => f.id === id) || null
  A.geo = { FORMS, byId, project, rotate3, platonicAt, SOLIDS, helpers: { stag, win, io3, out3, outBack, paint, dots, arcP, lineP, polyP } }
})()
