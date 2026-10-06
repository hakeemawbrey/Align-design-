/* Align reel — the seven chakra symbols, drawn as vector paths.
 *
 *   ALIGN.chakra.draw(ctx, i, x, y, r, { color, lw, progress, rot, alpha, fill })
 *     i 0..6 root → crown, r = radius to the petal tips.
 *     fill: true  → bold flat print: solid ink petals and rings, inner geometry
 *                   knocked out (transparent, so whatever is behind shows through).
 *     fill: false → line drawing; progress 0..1 draws it in (petals grow base → tip in
 *                   sequence, rings and yantra lines stroke in).
 *     progress also works in fill mode (petals bloom in sequence, centre blooms last).
 *   ALIGN.chakra.INFO[i] = { name, sanskrit, bija, planet, signs, color, ink, element }
 *
 * Geometry lives in unit space (petal tips at radius 1). Every element is a list of
 * points, so partial draw-in is just "stroke the first k% of the points". */
;(function () {
  const A = window.ALIGN
  const { clamp, ease, TAU } = A
  const PI = Math.PI

  const INFO = [
    { name: 'Root', sanskrit: 'Muladhara', bija: 'LAM', planet: 'Saturn', signs: [9, 10], element: 'Earth', color: A.CHAKRA_COLORS[0], ink: '#f2706c' },
    { name: 'Sacral', sanskrit: 'Svadhisthana', bija: 'VAM', planet: 'Jupiter', signs: [8, 11], element: 'Water', color: A.CHAKRA_COLORS[1], ink: '#ff8f4f' },
    { name: 'Solar Plexus', sanskrit: 'Manipura', bija: 'RAM', planet: 'Mars', signs: [0, 7], element: 'Fire', color: A.CHAKRA_COLORS[2], ink: '#ffd34a' },
    { name: 'Heart', sanskrit: 'Anahata', bija: 'YAM', planet: 'Venus', signs: [1, 6], element: 'Air', color: A.CHAKRA_COLORS[3], ink: '#74e06a' },
    { name: 'Throat', sanskrit: 'Vishuddha', bija: 'HAM', planet: 'Mercury', signs: [2, 5], element: 'Ether', color: A.CHAKRA_COLORS[4], ink: '#4fd9ee' },
    { name: 'Third Eye', sanskrit: 'Ajna', bija: 'OM', planet: 'Sun & Moon', signs: [4, 3], element: 'Light', color: A.CHAKRA_COLORS[5], ink: '#7f97ff' },
    { name: 'Crown', sanskrit: 'Sahasrara', bija: '', planet: 'Beyond the planets', signs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], element: 'Thought', color: A.CHAKRA_COLORS[6], ink: '#d2b0ff' },
  ]

  /* ---------- point helpers (unit space) ---------- */
  const rotP = ([x, y], a) => { const c = Math.cos(a), s = Math.sin(a); return [x * c - y * s, x * s + y * c] }
  function bez(p0, p1, p2, p3, n) {
    const out = []
    for (let k = 0; k <= n; k++) {
      const t = k / n, u = 1 - t
      out.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]])
    }
    return out
  }
  function circlePts(r, n = 96, cx = 0, cy = 0, a0 = -PI / 2) {
    const out = []
    for (let k = 0; k <= n; k++) { const a = a0 + (k / n) * TAU; out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]) }
    return out
  }
  /** regular polygon, closed (first point repeated). a0 = angle of first vertex (0 = up) */
  function ngon(n, r, a0 = 0) {
    const out = []
    for (let k = 0; k <= n; k++) { const a = a0 + (k / n) * TAU - PI / 2; out.push([Math.cos(a) * r, Math.sin(a) * r]) }
    return out
  }
  const triDown = (r) => ngon(3, r, PI)
  /** subdivide a polyline so partial strokes advance smoothly */
  function dense(pts, step = 0.02) {
    const out = [pts[0]]
    for (let k = 1; k < pts.length; k++) {
      const [x0, y0] = pts[k - 1], [x1, y1] = pts[k]
      const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / step))
      for (let j = 1; j <= n; j++) out.push([x0 + ((x1 - x0) * j) / n, y0 + ((y1 - y0) * j) / n])
    }
    return out
  }
  function scaleAbout(pts, c, s) { return pts.map(([x, y]) => [c[0] + (x - c[0]) * s, c[1] + (y - c[1]) * s]) }

  /**
   * One lotus petal pointing along angle `ang` (0 = up, clockwise).
   * Ogee profile: swells out from the base, then draws in to a fine point.
   * Returns { left, right, outline, base } where left/right run base → tip.
   */
  function petal(rb, rt, w, ang, swell = 1.5, tipIn = 0.1) {
    const L = rt - rb
    const left = bez([-w, -rb], [-w * swell, -(rb + 0.45 * L)], [-w * tipIn, -(rt - 0.42 * L)], [0, -rt], 22)
    const right = left.map(([x, y]) => [-x, y])
    const R = (pts) => pts.map((p) => rotP(p, ang))
    const outline = [...left, ...right.slice(0, -1).reverse()]
    const mid = [0, -(rb + 0.4 * L)]
    const inner = scaleAbout(outline, mid, 0.62)
    return { left: R(left), right: R(right), outline: R(outline), inner: R(inner), base: rotP([0, -rb], ang), vein: R([[0, -(rb + 0.08 * L)], [0, -(rb + 0.72 * L)]]) }
  }

  /** crescent moon, horns up. Outer circle (0,oy,R1), bite circle (0,iy,R2) */
  function crescent(oy, R1, iy, R2) {
    // intersection of the two circles
    const d = oy - iy
    const yy = (R2 * R2 - R1 * R1 + d * d) / (2 * d) // distance from bite centre along +y
    const px = Math.sqrt(Math.max(0, R2 * R2 - yy * yy))
    const py = iy + yy
    const a1 = Math.atan2(py - oy, px), a2 = Math.atan2(py - oy, -px)
    const b1 = Math.atan2(py - iy, px), b2 = Math.atan2(py - iy, -px)
    const pts = []
    const n = 60
    // outer: right horn → bottom → left horn (increasing angle)
    let e = a2; while (e < a1) e += TAU
    for (let k = 0; k <= n; k++) { const a = a1 + ((e - a1) * k) / n; pts.push([Math.cos(a) * R1, oy + Math.sin(a) * R1]) }
    // bite: left horn → bottom of bite → right horn (decreasing angle)
    let f = b1; while (f > b2) f -= TAU
    for (let k = 0; k <= n; k++) { const a = b2 + ((f - b2) * k) / n; pts.push([Math.cos(a) * R2, iy + Math.sin(a) * R2]) }
    pts.push(pts[0])
    return pts
  }

  /* ---------- the seven specs ---------- */
  // rings: petal rings { n, rb, rt, w, a0, swell, contour }
  // rc: centre circle radius; geo: list of yantra elements drawn inside
  //   { kind: 'band', pts }   thick ink outline
  //   { kind: 'solid', pts }  solid ink shape with a knocked-out inner contour
  //   { kind: 'line', pts }   thin ink line
  //   { kind: 'dot', r }      bindu
  //   { kind: 'hexagram', r } woven Star of David
  const SPECS = []
  {
    // 1 Root: 4 petals, square (earth), downward triangle, bindu
    const rc = 0.5, s = rc * 0.6
    const sq = [[-s, -s], [s, -s], [s, s], [-s, s], [-s, -s]]
    SPECS.push({
      rc, ringHalo: 0.72,
      rings: [{ n: 4, rb: 0.36, rt: 1, w: 0.31, a0: 0, swell: 1.55, contour: true, vein: true }],
      geo: [
        { kind: 'band', pts: sq, w: 0.045 },
        { kind: 'line', pts: scaleAbout(sq, [0, 0], 0.84) },
        { kind: 'solid', pts: triDown(s * 0.8).map(([x, y]) => [x, y + s * 0.08]) },
        { kind: 'dot', r: 0.035, y: -0.02 },
      ],
    })
  }
  {
    // 2 Sacral: 6 petals, circle (water), crescent moon
    const rc = 0.52
    SPECS.push({
      rc, ringHalo: 0.74,
      rings: [{ n: 6, rb: 0.38, rt: 1, w: 0.22, a0: 0, swell: 1.6, contour: true, vein: true }],
      geo: [
        { kind: 'line', pts: circlePts(rc * 0.78) },
        { kind: 'solid', pts: crescent(0.06, rc * 0.6, -0.1, rc * 0.52) },
        { kind: 'dot', r: 0.03, y: -0.13 },
      ],
    })
  }
  {
    // 3 Solar plexus: 10 petals, downward triangle (fire) with T-shaped bhupura arms
    const rc = 0.52, tr = rc * 0.8
    const tri = triDown(tr)
    const geo = [{ kind: 'solid', pts: tri }]
    const inr = tr * 0.5
    for (let k = 0; k < 3; k++) {
      // the three side midpoints of a downward triangle point up, lower-left, lower-right
      const ang = k * (TAU / 3) // 0 = up
      const stem = [rotP([0, -inr], ang), rotP([0, -(inr + 0.17)], ang)]
      const bar = [rotP([-0.075, -(inr + 0.17)], ang), rotP([0.075, -(inr + 0.17)], ang)]
      geo.push({ kind: 'band', pts: stem, w: 0.032, open: true })
      geo.push({ kind: 'band', pts: bar, w: 0.032, open: true })
    }
    geo.push({ kind: 'dot', r: 0.03, y: -0.02 })
    SPECS.push({ rc, ringHalo: 0.73, rings: [{ n: 10, rb: 0.4, rt: 1, w: 0.14, a0: 0, swell: 1.6, contour: true }], geo })
  }
  {
    // 4 Heart: 12 petals, hexagram (two interlaced triangles, air)
    const rc = 0.53
    SPECS.push({
      rc, ringHalo: 0.75,
      rings: [{ n: 12, rb: 0.41, rt: 1, w: 0.12, a0: PI / 12, swell: 1.6, contour: true }],
      geo: [{ kind: 'hexagram', r: rc * 0.86 }, { kind: 'dot', r: 0.03, y: 0 }],
    })
  }
  {
    // 5 Throat: 16 petals, downward triangle containing the full-moon circle
    const rc = 0.54, tr = rc * 0.86
    SPECS.push({
      rc, ringHalo: 0.76,
      rings: [{ n: 16, rb: 0.42, rt: 1, w: 0.092, a0: PI / 16, swell: 1.65, contour: true }],
      geo: [
        { kind: 'band', pts: triDown(tr), w: 0.04 },
        { kind: 'solid', pts: circlePts(tr * 0.5 * 0.78), knock: true },
        { kind: 'line', pts: circlePts(rc * 0.9) },
      ],
    })
  }
  {
    // 6 Third eye: two great petals (wings), circle, small downward triangle, bindu
    const rc = 0.4
    SPECS.push({
      rc, ringHalo: 0,
      rings: [{ n: 2, rb: 0.3, rt: 1, w: 0.3, a0: PI / 2, swell: 1.7, contour: true, vein: false }],
      geo: [
        { kind: 'line', pts: circlePts(rc * 0.8) },
        { kind: 'solid', pts: triDown(rc * 0.58).map(([x, y]) => [x, y + 0.01]) },
        { kind: 'dot', r: 0.032, y: -0.05 },
      ],
    })
  }
  {
    // 7 Crown: thousand-petalled lotus as two offset rings (32 + 20), circle, full moon
    const rc = 0.34
    SPECS.push({
      rc, ringHalo: 0.62,
      rings: [
        { n: 32, rb: 0.5, rt: 1, w: 0.05, a0: 0, swell: 1.7, contour: false },
        { n: 20, rb: 0.3, rt: 0.74, w: 0.07, a0: PI / 20, swell: 1.7, contour: true },
      ],
      geo: [
        { kind: 'line', pts: circlePts(rc * 0.8) },
        { kind: 'solid', pts: circlePts(rc * 0.5), knock: true },
        { kind: 'dot', r: 0.03, y: 0 },
      ],
    })
  }
  // precompute petals per spec
  for (const s of SPECS) {
    s.petals = []
    s.rings.forEach((rg, ri) => {
      for (let k = 0; k < rg.n; k++) {
        const ang = rg.a0 + (k / rg.n) * TAU
        s.petals.push({ ...petal(rg.rb, rg.rt, rg.w, ang, rg.swell), ring: ri, k, n: rg.n, contour: rg.contour, veinOn: rg.vein })
      }
    })
    // order petals for the bloom: outer ring first (inner ring sits on top), then each ring from the top, alternating sides
    s.bloom = s.petals.map((p, idx) => ({ idx, key: p.ring * 1000 + Math.min(p.k, p.n - p.k) * 2 + (p.k > p.n / 2 ? 1 : 0) }))
      .sort((a, b) => a.key - b.key).map((o, order) => ({ ...o, order }))
    s.bloomOrder = new Array(s.petals.length)
    s.bloom.forEach((b) => (s.bloomOrder[b.idx] = b.order))
  }

  /* ---------- low-level drawing ---------- */
  function path(ctx, pts, closed) {
    ctx.beginPath()
    ctx.moveTo(pts[0][0], pts[0][1])
    for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1])
    if (closed) ctx.closePath()
  }
  /** stroke the first `p` fraction of a polyline */
  function partial(ctx, pts, p) {
    if (p <= 0) return
    if (p >= 1) { path(ctx, pts, false); ctx.stroke(); return }
    const n = (pts.length - 1) * p
    const k = Math.floor(n), f = n - k
    ctx.beginPath()
    ctx.moveTo(pts[0][0], pts[0][1])
    for (let j = 1; j <= k; j++) ctx.lineTo(pts[j][0], pts[j][1])
    if (k + 1 < pts.length) ctx.lineTo(pts[k][0] + (pts[k + 1][0] - pts[k][0]) * f, pts[k][1] + (pts[k + 1][1] - pts[k][1]) * f)
    ctx.stroke()
  }

  function hexTris(r) { return [ngon(3, r, 0), ngon(3, r, PI)] }
  /** hexagram crossing points (the inner hexagon), angle order starting at the top-right */
  function hexCross(r) { const ri = r / Math.sqrt(3); const out = []; for (let k = 0; k < 6; k++) { const a = -PI / 2 + PI / 6 + (k * TAU) / 6; out.push([Math.cos(a) * ri, Math.sin(a) * ri]) } return out }

  /* ---------- line mode ---------- */
  function drawLine(ctx, s, prog, ulw) {
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'
    ctx.lineWidth = ulw
    const nP = s.petals.length
    // petals 0..0.6, grow base → tip on both sides at once
    ctx.save()
    // hide petal strokes inside the centre circle
    ctx.beginPath(); ctx.rect(-2, -2, 4, 4); ctx.arc(0, 0, s.rc, 0, TAU, true); ctx.clip()
    const pw = nP > 12 ? 0.3 : 0.45
    s.bloom.forEach(({ idx, order: o }) => {
      const p = s.petals[idx]
      const st = nP > 1 ? (o / (nP - 1)) * (0.6 - pw) : 0
      const lp = ease.outCubic(seg01(prog, st, st + pw))
      if (lp <= 0) return
      if (p.ring > 0) {
        ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'
        path(ctx, scaleAbout(p.outline, p.base, lp), true); ctx.fill(); ctx.restore()
      }
      partial(ctx, p.left, lp); partial(ctx, p.right, lp)
      if (p.contour && nP <= 16) { ctx.save(); ctx.lineWidth = ulw * 0.6; ctx.globalAlpha *= 0.75 * lp; path(ctx, p.inner, true); if (lp > 0.6) ctx.stroke(); ctx.restore() }
    })
    ctx.restore()
    // centre circle(s) 0.25..0.65
    const cp = ease.inOutCubic(seg01(prog, 0.25, 0.65))
    partial(ctx, circlePts(s.rc), cp)
    ctx.save(); ctx.lineWidth = ulw * 0.6; partial(ctx, circlePts(s.rc * 0.94, 96, 0, 0, PI / 2), cp); ctx.restore()
    // yantra 0.5..1
    s.geo.forEach((g, gi) => {
      const st = 0.5 + (gi / Math.max(1, s.geo.length)) * 0.3
      const gp = ease.inOutCubic(seg01(prog, st, st + 0.3))
      if (gp <= 0) return
      if (g.kind === 'dot') { ctx.save(); ctx.globalAlpha *= gp; ctx.beginPath(); ctx.arc(0, g.y || 0, g.r * 0.8, 0, TAU); ctx.fillStyle = ctx.strokeStyle; ctx.fill(); ctx.restore(); return }
      if (g.kind === 'hexagram') { for (const tr of hexTris(g.r)) partial(ctx, dense(tr), gp); return }
      if (g.kind === 'line') { ctx.save(); ctx.lineWidth = ulw * 0.6; partial(ctx, dense(g.pts), gp); ctx.restore(); return }
      partial(ctx, dense(g.pts), gp)
    })
  }
  function seg01(v, a, b) { return clamp((v - a) / (b - a)) }

  /* ---------- fill (flat print) mode ---------- */
  // Drawn onto a private canvas so knock-outs (destination-out) only cut the symbol.
  let OC = null
  function drawFill(ctx, s, prog, col) {
    const ink = () => { ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = col; ctx.strokeStyle = col }
    const knock = () => { ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = '#000'; ctx.strokeStyle = '#000' }
    ctx.lineJoin = 'round'; ctx.lineCap = 'round'
    const nP = s.petals.length
    const gap = nP > 20 ? 0.016 : 0.02 // knock-out line between overlapping petals
    const cl = nP > 12 ? 0.008 : 0.011 // inner contour width
    // halo ring through the petals (shows in the gaps)
    const hp = seg01(prog, 0.0, 0.5)
    if (s.ringHalo && hp > 0) {
      ink(); ctx.lineWidth = 0.014; partial(ctx, circlePts(s.ringHalo + 0.18, 128, 0, 0, -PI / 2), ease.inOutCubic(hp))
    }
    // petals, layered in bloom order
    const pw = nP > 12 ? 0.25 : 0.4
    for (const b of s.bloom) {
      const p = s.petals[b.idx]
      const st = nP > 1 ? (b.order / (nP - 1)) * (0.6 - pw) : 0
      const lp = seg01(prog, st, st + pw)
      if (lp <= 0) continue
      const sc = Math.max(0.001, ease.outBack(lp))
      const pts = lp < 1 ? scaleAbout(p.outline, p.base, sc) : p.outline
      knock(); ctx.lineWidth = gap * 2; path(ctx, pts, true); ctx.stroke()
      ink(); ctx.globalAlpha = Math.min(1, lp * 2.5); path(ctx, pts, true); ctx.fill()
      if (p.contour) {
        knock(); ctx.lineWidth = cl; path(ctx, lp < 1 ? scaleAbout(p.inner, p.base, sc) : p.inner, true); ctx.stroke()
        if (p.veinOn) { const v = lp < 1 ? scaleAbout(p.vein, p.base, sc) : p.vein; path(ctx, v, false); ctx.lineWidth = cl * 0.9; ctx.stroke() }
      }
      ctx.globalAlpha = 1
    }
    // centre disc: solid ring band, interior knocked out
    const cp = Math.max(0, ease.outBack(seg01(prog, 0.3, 0.65)))
    if (cp > 0) {
      const R = s.rc * cp
      knock(); ctx.beginPath(); ctx.arc(0, 0, R + gap, 0, TAU); ctx.fill()
      ink(); ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fill()
      knock(); ctx.beginPath(); ctx.arc(0, 0, Math.max(0, R - 0.05), 0, TAU); ctx.fill()
      ink(); ctx.lineWidth = 0.012; ctx.beginPath(); ctx.arc(0, 0, Math.max(0, R - 0.075), 0, TAU); ctx.stroke()
    }
    // yantra
    s.geo.forEach((g, gi) => {
      const st = 0.5 + (gi / Math.max(1, s.geo.length)) * 0.3
      const gp = seg01(prog, st, st + 0.25)
      if (gp <= 0) return
      ctx.save()
      ctx.globalAlpha = gp
      const sc = Math.max(0.001, ease.outBack(gp))
      ctx.scale(sc, sc)
      if (g.kind === 'dot') { ink(); ctx.beginPath(); ctx.arc(0, g.y || 0, g.r, 0, TAU); ctx.fill() }
      else if (g.kind === 'line') { ink(); ctx.lineWidth = 0.012; path(ctx, g.pts, false); ctx.stroke() }
      else if (g.kind === 'band') {
        ink(); ctx.lineWidth = g.w || 0.04; ctx.lineCap = g.open ? 'butt' : 'round'; path(ctx, g.pts, false); ctx.stroke()
        if (!g.open) { knock(); ctx.lineWidth = (g.w || 0.04) * 0.28; path(ctx, g.pts, false); ctx.stroke() }
      } else if (g.kind === 'solid') {
        ink(); path(ctx, g.pts, true); ctx.fill()
        knock(); ctx.lineWidth = 0.011
        const c = centroid(g.pts)
        path(ctx, scaleAbout(g.pts, c, g.knock ? 0.72 : 0.8), true); ctx.stroke()
      } else if (g.kind === 'hexagram') drawHexagram(ctx, g.r, ink, knock)
      ctx.restore()
    })
  }
  function centroid(pts) { let x = 0, y = 0; const n = pts.length - 1; for (let k = 0; k < n; k++) { x += pts[k][0]; y += pts[k][1] } return [x / n, y / n] }

  function drawHexagram(ctx, r, ink, knock) {
    const [up, down] = hexTris(r)
    const W = 0.05, G = 0.022
    const band = (tr) => {
      knock(); ctx.lineWidth = W + G * 2; path(ctx, tr, true); ctx.stroke()
      ink(); ctx.lineWidth = W; path(ctx, tr, true); ctx.stroke()
      knock(); ctx.lineWidth = W * 0.3; path(ctx, tr, true); ctx.stroke()
    }
    band(up)
    band(down)
    // weave: the up-triangle passes over at alternating crossings
    const xs = hexCross(r)
    for (let k = 0; k < 6; k += 2) {
      ctx.save()
      ctx.beginPath(); ctx.arc(xs[k][0], xs[k][1], W * 1.9, 0, TAU); ctx.clip()
      band(up)
      ctx.restore()
    }
  }

  /* ---------- public draw ---------- */
  function draw(ctx, i, x, y, r, o = {}) {
    const s = SPECS[((i % 7) + 7) % 7]
    const col = o.color || INFO[i].ink
    const prog = o.progress == null ? 1 : clamp(o.progress)
    const alpha = o.alpha == null ? 1 : o.alpha
    if (prog <= 0 || alpha <= 0 || r <= 0) return
    // render into a private canvas at device resolution, then composite
    const m = ctx.getTransform()
    const k = Math.max(0.25, Math.hypot(m.a, m.b))
    const S = Math.ceil(2 * r * 1.04 * k) + 4
    if (!OC) OC = A.makeCanvas(S, S)
    if (OC.width < S || OC.height < S) { OC.width = Math.max(OC.width, S); OC.height = Math.max(OC.height, S) }
    const oc = OC.getContext('2d')
    oc.setTransform(1, 0, 0, 1, 0, 0)
    oc.globalCompositeOperation = 'source-over'
    oc.globalAlpha = 1
    oc.clearRect(0, 0, S + 2, S + 2)
    oc.translate(S / 2, S / 2)
    oc.rotate(o.rot || 0)
    oc.scale(r * k, r * k)
    if (o.fill) drawFill(oc, s, prog, col)
    else { oc.strokeStyle = col; oc.fillStyle = col; drawLine(oc, s, prog, (o.lw || Math.max(1.5, r * 0.009)) / r) }
    ctx.save()
    ctx.globalAlpha *= alpha
    ctx.drawImage(OC, 0, 0, S, S, x - S / 2 / k, y - S / 2 / k, S / k, S / k)
    ctx.restore()
  }

  A.chakra = { draw, INFO }
})()
