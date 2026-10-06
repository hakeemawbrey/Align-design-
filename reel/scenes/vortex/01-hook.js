/* Vortex teaser · 01 Hook (0–2 s) + the shared vortex toolkit (ALIGN.vortex).
 * A spark in the dark, "FROM THE BEGINNING", then on the 0.5 s beat the wormhole blooms open
 * and the fall begins. ALIGN.vortex is used by 02-descent and 03-emerge too.
 * Everything is a pure function of global time T. */
;(function () {
  const A = window.ALIGN
  const { seg, ease, lerp, clamp, rgba, mixHex, TAU } = A

  /* ---------------- camera ---------------- */
  const L = 8          // tunnel depth (world units) visible ahead of the camera
  const F = 270        // focal: a point at radius 1, depth 1 projects 270 px from the axis
  const BLOOM = 0.5    // the beat the vortex opens on
  // speed surges: [time, amount, tau]. The bloom, then one push per chapter start.
  const SURGES = [[BLOOM, 2.2, 0.45]]
  for (let i = 0; i < 7; i++) SURGES.push([2 + i * 2, 1.1, 0.35])
  SURGES.push([16, 2.5, 0.3])
  const BASE = 1.35
  function camZ(T) {
    let z = T > BLOOM ? BASE * (T - BLOOM) : 0
    for (const [s, a, tau] of SURGES) if (T > s) z += a * (1 - Math.exp(-(T - s) / tau))
    return z
  }
  function speed(T) {
    let v = T > BLOOM ? BASE : 0
    for (const [s, a, tau] of SURGES) if (T > s) v += (a / tau) * Math.exp(-(T - s) / tau)
    return v
  }
  /** near-axis centre and the far eye drift a little so the tunnel bends like a hand-held fall */
  const NEAR = { x: 540, y: 930 }
  function bend(T) { return { x: 46 * Math.sin(T * 0.43 + 0.6), y: -30 + 24 * Math.cos(T * 0.31) } }
  function eye(T) { const b = bend(T); return { x: NEAR.x + b.x * 0.55, y: NEAR.y + b.y * 0.55 } }

  /* ---------------- palette arc: fire → magenta → Align indigo ---------------- */
  const PAL = [
    { hot: '#fff4dc', gold: '#ffc861', mid: '#ff7a2e', edge: '#c42a12', cloud: '#ff8a3a', smoke: '#030101', billow: '#d8b49a', form: '#f6d68a' },
    { hot: '#ffe8f4', gold: '#ffa0cf', mid: '#e8407f', edge: '#7e1460', cloud: '#ff5fa2', smoke: '#030102', billow: '#d6a8c4', form: '#ffd9c6' },
    { hot: '#f0eaff', gold: '#c2adff', mid: '#8f6cff', edge: '#3b2fc4', cloud: '#7a68ff', smoke: '#020105', billow: '#b2aee0', form: '#efe6d6' },
  ]
  function pal(T) {
    const k1 = ease.inOutQuad(seg(T, 6.5, 10.5)), k2 = ease.inOutQuad(seg(T, 11, 15.2))
    const o = {}
    for (const key in PAL[0]) o[key] = k2 > 0 ? mixHex(PAL[1][key], PAL[2][key], k2) : mixHex(PAL[0][key], PAL[1][key], k1)
    return o
  }

  /* ---------------- particles + clouds (fixed, deterministic) ---------------- */
  const ARMS = 5, TW = 0.7 // log-spiral twist: radians per e-fold of depth
  const P = [], CL = [], BANDS = []
  ;(() => {
    const r = A.rng(2024)
    for (let i = 0; i < 2600; i++) {
      const arm = i % ARMS
      const inner = r() < 0.18
      P.push({
        z: r(), ang: (arm / ARMS) * TAU + (r() + r() - 1) * 0.55,
        rho: inner ? 0.35 + r() * 0.4 : 0.8 + r() * 0.6,
        w: 0.5 + r() * 1.4, len: 0.5 + r() * 0.9, c: r(),
      })
    }
    for (let i = 0; i < 46; i++) {
      const arm = i % ARMS
      const z = r(), ang = (arm / ARMS) * TAU + 0.3 + (r() - 0.5) * 0.8, rho = 1.05 + r() * 0.8
      // a billow = a cluster of sub-puffs
      for (let k = 0; k < 4; k++) CL.push({ z: z + (r() - 0.5) * 0.025, ang: ang + (r() - 0.5) * 0.32, rho: rho + (r() - 0.5) * 0.35, s: 0.4 + r() * 0.5, c: r() })
    }
    for (let a = 0; a < ARMS; a++) for (let k = 0; k < 3; k++) BANDS.push({ ang: (a / ARMS) * TAU + (k - 1) * 0.12, rho: 0.9 + k * 0.18, w: 0.6 + r() * 0.6 })
  })()

  const mod = (a, n) => ((a % n) + n) % n
  function project(rho, ang, d, T, cz, spin, b, open) {
    const th = ang + TW * Math.log(d) + spin
    const rr = (F * rho) / d
    const f = d / L
    return [NEAR.x + b.x * f + Math.cos(th) * rr * open.s, NEAR.y + b.y * f + Math.sin(th) * rr * open.s, rr]
  }

  function glow(ctx, x, y, r, col, a, mid = 0.35) {
    if (a <= 0 || r <= 0) return
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba(col, Math.min(1, a))); g.addColorStop(mid, rgba(col, Math.min(1, a) * 0.35)); g.addColorStop(1, rgba(col, 0))
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }

  /**
   * The wormhole, on the bg layer. o: open (0..1 bloom from the eye outward), alpha,
   * exit (0..1, we burst through: everything scales past us and fades), p (palette override)
   */
  function bg(ctx, T, o = {}) {
    const open = o.open == null ? 1 : o.open
    if (open <= 0) return
    const alpha = (o.alpha == null ? 1 : o.alpha)
    const exit = o.exit || 0
    const p = o.p || pal(T)
    const cz = camZ(T), v = speed(T), b = bend(T)
    const spin = T * 0.42
    const os = { s: lerp(0.15, 1, ease.outCubic(open)) * (1 + exit * exit * 5) }
    const maxR = lerp(60, 1500, ease.outCubic(open))
    const E = eye(T)
    ctx.save()
    // deep base: a warm bowl of light that falls off toward the frame edges
    const base = ctx.createRadialGradient(E.x, E.y, 0, E.x, E.y, 1150)
    base.addColorStop(0, rgba(p.gold, 0.55 * alpha * open)); base.addColorStop(0.18, rgba(p.mid, 0.38 * alpha * open))
    base.addColorStop(0.55, rgba(p.edge, 0.16 * alpha * open)); base.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = base; ctx.fillRect(0, 0, A.W, A.H)

    // clouds: each sub-puff is smoke (occluding) with a lit rim on the side facing the eye
    for (const c of CL) {
      const d = mod(c.z * L - cz * 0.95, L)
      if (d < 0.3 || d > L - 0.3) continue
      const [x, y, rr] = project(c.rho, c.ang, d, T, cz, spin, b, os)
      if (rr > maxR) continue
      const pr = Math.min(520, (F * c.s) / d * os.s)
      if (pr < 6) continue
      const fa = clamp((L - d) / 2.4) * clamp((d - 0.3) / 0.45) * alpha
      ctx.globalCompositeOperation = 'source-over'
      glow(ctx, x, y, pr * 1.1, p.smoke, 0.75 * fa * (1 - exit), 0.6)
      ctx.globalCompositeOperation = 'lighter'
      const ux = (E.x - x) / (rr || 1), uy = (E.y - y) / (rr || 1)
      glow(ctx, x + ux * pr * 0.3, y + uy * pr * 0.3, pr * 0.8, c.c < 0.5 ? p.cloud : c.c < 0.8 ? p.billow : p.gold, (0.05 + 0.08 * c.c) * fa, 0.4)
    }
    ctx.globalCompositeOperation = 'lighter'

    // continuous spiral bands: the arms' coherent structure, filled as soft ribbons
    for (const band of BANDS) {
      const cl = [], nr = []
      for (let k = 0; k <= 48; k++) {
        const d = 0.3 * Math.pow(L / 0.3, k / 48)
        const [x, y, rr] = project(band.rho, band.ang, d, T, cz, spin, b, os)
        const [x2, y2] = project(band.rho, band.ang + 0.02, d, T, cz, spin, b, os)
        let nx = x2 - x, ny = y2 - y; const nl = Math.hypot(nx, ny) || 1
        cl.push([x, y]); nr.push([nx / nl, ny / nl, Math.min(rr * 0.5, (55 * band.w) / d) * (rr < maxR ? 1 : 0)])
      }
      for (const wk of [1, 0.6, 0.3]) { // three nested ribbons = a soft-edged band
        ctx.fillStyle = rgba(wk < 0.5 ? p.gold : p.mid, 0.035 * alpha)
        ctx.beginPath()
        cl.forEach(([x, y], i) => { const [nx, ny, w] = nr[i]; i ? ctx.lineTo(x + nx * w * wk, y + ny * w * wk) : ctx.moveTo(x + nx * w * wk, y + ny * w * wk) })
        for (let i = cl.length - 1; i >= 0; i--) { const [nx, ny, w] = nr[i]; ctx.lineTo(cl[i][0] - nx * w * wk, cl[i][1] - ny * w * wk) }
        ctx.closePath(); ctx.fill()
      }
    }
    ctx.lineCap = 'round'

    // particle streaks rushing out of the eye toward us
    const tail = 0.03 + v * 0.06
    for (let i = 0; i < P.length; i++) {
      const q = P[i]
      const d = mod(q.z * L - cz, L)
      if (d < 0.2) continue
      const d2 = d + Math.min(1.8, tail * q.len * (0.6 + d * 0.25))
      const [x1, y1, r1] = project(q.rho, q.ang, d, T, cz, spin, b, os)
      if (r1 > maxR) continue
      const [x2, y2] = project(q.rho, q.ang, d2, T, cz, spin, b, os)
      const fa = clamp((L - d) / 1.6) * clamp((d - 0.2) / 0.35)
      const col = q.c < 0.12 ? p.hot : d > 4.2 ? p.hot : d > 2.2 ? (q.c < 0.6 ? p.gold : p.hot) : d > 1.0 ? (q.c < 0.55 ? p.mid : p.gold) : (q.c < 0.6 ? p.edge : p.mid)
      ctx.strokeStyle = col
      ctx.globalAlpha = alpha * fa * (0.55 + 0.45 * q.c) * (1 - exit * 0.7)
      ctx.lineWidth = Math.min(16, Math.max(0.6, (q.w * 5.5) / d)) * (1 + exit * 2)
      ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x1, y1); ctx.stroke()
    }
    ctx.globalAlpha = 1

    // the eye: white-hot core with a breathing halo (pulses on every beat)
    const beat = Math.exp(-mod(T, 0.5) * 7)
    glow(ctx, E.x, E.y, 520 * open * (1 + exit * 3), p.mid, 0.5 * alpha, 0.3)
    glow(ctx, E.x, E.y, (190 + 30 * beat) * open * (1 + exit * 3), p.gold, 0.85 * alpha)
    glow(ctx, E.x, E.y, (70 + 16 * beat) * (0.4 + 0.6 * open) * (1 + exit * 4), p.hot, alpha)
    ctx.restore()
  }

  /* ---------------- sacred geometry access (ALIGN.geo when present, else core fallbacks) ---------------- */
  const NAMES = { seed: 'Seed of Life', vesica: 'Vesica Piscis', flower: 'Flower of Life', metatron: "Metatron's Cube", sriYantra: 'Sri Yantra', merkaba: 'Merkaba', goldenSpiral: 'Golden Spiral' }
  function getForm(id) { return (A.geo && A.geo.byId && A.geo.byId(id)) || null }
  function formName(id) { const f = getForm(id); return ((f && f.name) || NAMES[id] || id).toUpperCase() }
  function fallback(ctx, id, cx, cy, size, o) {
    const r = size / 2, col = o.color || A.C.bone, lw = o.lw || 2, prog = o.progress == null ? 1 : o.progress
    ctx.save(); ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha; ctx.strokeStyle = col; ctx.lineWidth = lw
    ctx.translate(cx, cy); ctx.rotate(o.rot || 0)
    const circ = (x, y, rad, k = 1) => { ctx.beginPath(); ctx.arc(x, y, rad, -Math.PI / 2, -Math.PI / 2 + TAU * clamp(k)); ctx.stroke() }
    const poly = (pts, k = 1) => { ctx.beginPath(); const n = Math.max(1, Math.ceil(pts.length * clamp(k))); pts.slice(0, n).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); if (k >= 1) ctx.closePath(); ctx.stroke() }
    const tri = (rad, a0) => [0, 1, 2].map((i) => [Math.cos(a0 + (i * TAU) / 3) * rad, Math.sin(a0 + (i * TAU) / 3) * rad])
    if (id === 'seed') A.flowerOfLife(ctx, 0, 0, r / 2, { rings: 1, outer: true, lw, color: col, progress: prog })
    else if (id === 'flower') A.flowerOfLife(ctx, 0, 0, r / 3, { rings: 2, outer: true, lw, color: col, progress: prog })
    else if (id === 'metatron') A.metatron(ctx, 0, 0, r / 5, { lw, color: col, progress: prog })
    else if (id === 'vesica') { circ(-r * 0.3, 0, r * 0.6, prog * 1.5); circ(r * 0.3, 0, r * 0.6, prog * 1.5 - 0.5); circ(0, 0, r, prog) }
    else if (id === 'merkaba') { poly(tri(r * 0.9, -Math.PI / 2), prog * 2); poly(tri(r * 0.9, Math.PI / 2), prog * 2 - 1); circ(0, 0, r, prog) }
    else if (id === 'sriYantra') { for (let k = 0; k < 4; k++) { poly(tri(r * (0.9 - k * 0.17), -Math.PI / 2 + (k % 2) * Math.PI), prog * 4 - k) } circ(0, 0, r, prog) }
    else if (id === 'goldenSpiral') {
      ctx.beginPath(); const n = Math.floor(160 * prog)
      for (let k = 0; k <= n; k++) { const a = k * 0.06, rr = r * 0.02 * Math.exp(0.306 * a); if (rr > r) break; const x = Math.cos(a) * rr, y = Math.sin(a) * rr; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y) }
      ctx.stroke(); circ(0, 0, r, prog)
    }
    ctx.restore()
  }
  /** draw a chapter form. size = overall diameter in px */
  function drawForm(ctx, id, cx, cy, size, o = {}) {
    const f = getForm(id)
    if (f && f.draw) { ctx.save(); try { f.draw(ctx, cx, cy, size, o) } catch (e) { console.error('[geo ' + id + ']', e) } ctx.restore() }
    else fallback(ctx, id, cx, cy, size, o)
  }

  /* ---------------- the falling figure ---------------- */
  // An original skydiver silhouette in unit space (≈1 tall), arms open, knees soft.
  function figurePath(ctx, s, ph) {
    const fl = Math.sin(ph) * 0.03, fl2 = Math.cos(ph * 0.8) * 0.03
    const J = {
      head: [0, -0.43], neck: [0, -0.33], pel: [0, 0.04],
      shL: [-0.085, -0.3], shR: [0.085, -0.3],
      elL: [-0.26, -0.36 + fl], elR: [0.27, -0.35 - fl],
      haL: [-0.43, -0.47 + fl * 1.5], haR: [0.44, -0.45 - fl * 1.5],
      hiL: [-0.055, 0.06], hiR: [0.055, 0.06],
      knL: [-0.15, 0.29 + fl2], knR: [0.15, 0.28 - fl2],
      ftL: [-0.27, 0.47 + fl2], ftR: [0.29, 0.45 - fl2],
    }
    const seg2 = (a, b, w) => { ctx.lineWidth = w * s; ctx.beginPath(); ctx.moveTo(J[a][0] * s, J[a][1] * s); ctx.lineTo(J[b][0] * s, J[b][1] * s); ctx.stroke() }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    // torso: tapered shoulders → waist
    ctx.beginPath()
    ctx.moveTo(J.shL[0] * s - 0.02 * s, J.shL[1] * s); ctx.lineTo(J.shR[0] * s + 0.02 * s, J.shR[1] * s)
    ctx.lineTo(J.hiR[0] * s + 0.01 * s, J.hiR[1] * s); ctx.lineTo(J.hiL[0] * s - 0.01 * s, J.hiL[1] * s); ctx.closePath()
    ctx.lineWidth = 0.06 * s; ctx.fill(); ctx.stroke()
    seg2('neck', 'pel', 0.1)
    seg2('shL', 'elL', 0.06); seg2('elL', 'haL', 0.045)
    seg2('shR', 'elR', 0.06); seg2('elR', 'haR', 0.045)
    seg2('hiL', 'knL', 0.085); seg2('knL', 'ftL', 0.06)
    seg2('hiR', 'knR', 0.085); seg2('knR', 'ftR', 0.06)
    ctx.beginPath(); ctx.arc(J.head[0] * s, J.head[1] * s, 0.072 * s, 0, TAU); ctx.fill()
  }
  /** where the figure is at time T: spirals in toward the eye, shrinking with depth */
  function figureState(T) {
    const u = seg(T, 0.7, 16)
    const depth = 1 + 9 * Math.pow(u, 1.15)
    const E = eye(T)
    const th = 2.35 + u * 4.6
    const rr = 470 / (1 + 4.2 * u)
    return { x: E.x + Math.cos(th) * rr * 0.95, y: E.y + Math.sin(th) * rr * 1.35, size: 330 / depth, rot: -0.5 + T * 0.55 + 0.25 * Math.sin(T * 1.3), ph: T * 2.2, u }
  }
  function figure(ctx, T, o = {}) {
    const st = figureState(T)
    const a = (o.alpha == null ? 1 : o.alpha)
    if (a <= 0) return
    const p = o.p || pal(T)
    const E = eye(T)
    // light trail streaming behind (away from the eye)
    const dx = st.x - E.x, dy = st.y - E.y, dl = Math.hypot(dx, dy) || 1
    ctx.save()
    ctx.globalAlpha = a
    ctx.globalCompositeOperation = 'lighter'
    const tl = st.size * 1.6
    const g = ctx.createLinearGradient(st.x, st.y, st.x + (dx / dl) * tl, st.y + (dy / dl) * tl)
    g.addColorStop(0, rgba(p.gold, 0.35)); g.addColorStop(1, rgba(p.gold, 0))
    ctx.strokeStyle = g; ctx.lineWidth = st.size * 0.18; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.moveTo(st.x, st.y); ctx.lineTo(st.x + (dx / dl) * tl, st.y + (dy / dl) * tl); ctx.stroke()
    glow(ctx, st.x, st.y, st.size * 0.9, p.mid, 0.25)
    ctx.globalCompositeOperation = 'source-over'
    ctx.translate(st.x, st.y)
    // rim light: the eye is the light source, so the rim sits on the side facing it
    const lx = (-dx / dl) * st.size * 0.022, ly = (-dy / dl) * st.size * 0.022
    ctx.rotate(st.rot)
    const lr = [lx * Math.cos(-st.rot) - ly * Math.sin(-st.rot), lx * Math.sin(-st.rot) + ly * Math.cos(-st.rot)]
    ctx.save(); ctx.translate(lr[0], lr[1]); ctx.fillStyle = ctx.strokeStyle = p.hot; ctx.shadowColor = p.gold; ctx.shadowBlur = st.size * 0.12; figurePath(ctx, st.size, st.ph); ctx.restore()
    ctx.fillStyle = ctx.strokeStyle = '#0c0611'
    figurePath(ctx, st.size, st.ph)
    ctx.restore()
  }

  /** spinning ring of ALIGN ✦ around the eye */
  function ring(ctx, T, o = {}) {
    const E = eye(T)
    const beat = Math.exp(-mod(T, 0.5) * 8)
    const r = (o.r || 345) * (1 + 0.012 * beat)
    const a = o.alpha == null ? 1 : o.alpha
    if (a <= 0) return
    A.ringOfWords(ctx, 'ALIGN', E.x, E.y, r, { size: o.size || 23, font: 'mono', weight: 700, color: o.color || A.C.gold, alpha: 0.8 * a, start: -T * 0.35, sep: '  ✦  ', spacing: 0.12 })
    ctx.save(); ctx.strokeStyle = rgba(o.color || A.C.gold, 0.32 * a); ctx.lineWidth = 1.2
    ctx.beginPath(); ctx.arc(E.x, E.y, r - 26, 0, TAU); ctx.stroke()
    ctx.beginPath(); ctx.arc(E.x, E.y, r + 26, 0, TAU); ctx.stroke()
    ctx.restore()
  }

  A.vortex = { L, F, BLOOM, camZ, speed, eye, bend, pal, bg, glow, getForm, formName, drawForm, figure, figureState, ring, mod }

  /* ---------------- 01 · Hook ---------------- */
  const TL = A.TL.hook
  A.registerScene({
    id: 'vx-hook', start: TL.start, duration: TL.duration,
    draw({ bg: b, fg, t, T }) {
      const V = A.vortex
      const E = V.eye(T)
      const open = ease.outCubic(seg(T, BLOOM, BLOOM + 0.9))
      A.fx.halftone = A.param('ht', '1') !== '0'
      A.fx.halftoneCell = 6
      // the spark: a single point breathing in the dark, swelling into the bloom
      const pre = seg(T, 0, BLOOM)
      if (T < BLOOM + 0.2) {
        const s = 1 + 0.25 * Math.sin(t * 18)
        glow(b, E.x, E.y, (40 + 260 * ease.inExpo(pre)) * s, '#ffb347', 0.9)
        glow(fg, E.x, E.y, (10 + 40 * ease.inExpo(pre)) * s, '#fff4dc', 1, 0.25)
      }
      V.bg(b, T, { open })
      // the bloom flash
      if (T >= BLOOM) { const k = seg(T, BLOOM, BLOOM + 0.35); A.fx.flash = 0.85 * (1 - ease.outQuad(k)); A.fx.flashColor = '#ffd9a8'; A.fx.shake = 14 * (1 - k) }
      // shock ring out of the eye
      const sr = seg(T, BLOOM, BLOOM + 0.7)
      if (sr > 0 && sr < 1) {
        fg.save(); fg.strokeStyle = rgba('#fff4dc', 0.85 * (1 - sr)); fg.lineWidth = 3
        fg.beginPath(); fg.arc(E.x, E.y, 30 + ease.outCubic(sr) * 900, 0, TAU); fg.stroke(); fg.restore()
      }
      // ALIGN ring arrives with the fall
      V.ring(fg, T, { alpha: ease.outCubic(seg(T, 1.0, 1.6)), r: lerp(240, 345, ease.outCubic(seg(T, 0.9, 1.8))) })
      V.figure(fg, T, { alpha: ease.outCubic(seg(T, 0.75, 1.2)) })
      // the line
      const la = ease.outCubic(seg(T, 0.08, 0.4)) * (1 - ease.inQuad(seg(T, 1.45, 1.9)))
      const ly = lerp(1090, 1430, ease.inOutCubic(seg(T, BLOOM, 1.1)))
      A.text(fg, 'FROM THE BEGINNING', 540, ly, { size: 28, font: 'mono', weight: 700, color: A.C.bone, spacing: 0.5, alpha: la })
    },
  })
})()
