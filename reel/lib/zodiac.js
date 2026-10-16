/* Align reel — zodiac glyph library.
 * ALIGN.zodiac.glyph(ctx, i, x, y, size, { color, lw, progress, alpha, glow })
 * ALIGN.zodiac.SIGNS[i] = { id, name, element, symbol, dates, color }
 * ALIGN.zodiac.constellation(ctx, i, x, y, size, { color, alpha, progress, lw, starColor })
 *
 * Glyphs are hand-built vector paths in a 100×100 box centred on 0,0 (y down), sampled
 * into polylines once so draw-in (`progress`) is an exact length cut. No fonts needed. */
(function () {
  const A = window.ALIGN
  const TAU = Math.PI * 2
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

  const SIGNS = [
    ['aries', 'Aries', 'fire', '♈', 'Mar 21 – Apr 19', '#f0603a'],
    ['taurus', 'Taurus', 'earth', '♉', 'Apr 20 – May 20', '#e9b24a'],
    ['gemini', 'Gemini', 'air', '♊', 'May 21 – Jun 20', '#f2cf4a'],
    ['cancer', 'Cancer', 'water', '♋', 'Jun 21 – Jul 22', '#3fb6f0'],
    ['leo', 'Leo', 'fire', '♌', 'Jul 23 – Aug 22', '#f39a3a'],
    ['virgo', 'Virgo', 'earth', '♍', 'Aug 23 – Sep 22', '#ef5c94'],
    ['libra', 'Libra', 'air', '♎', 'Sep 23 – Oct 22', '#e163d6'],
    ['scorpio', 'Scorpio', 'water', '♏', 'Oct 23 – Nov 21', '#e23d66'],
    ['sagittarius', 'Sagittarius', 'fire', '♐', 'Nov 22 – Dec 21', '#a35cf0'],
    ['capricorn', 'Capricorn', 'earth', '♑', 'Dec 22 – Jan 19', '#2fc79a'],
    ['aquarius', 'Aquarius', 'air', '♒', 'Jan 20 – Feb 18', '#38c4ec'],
    ['pisces', 'Pisces', 'water', '♓', 'Feb 19 – Mar 20', '#7c74f0'],
  ].map(([id, name, element, symbol, dates, color]) => ({ id, name, element, symbol, dates, color }))

  /* ---- path specs: arrays of commands in a 100-unit box centred on 0,0 ----
   * M x y | L x y | C x1 y1 x2 y2 x y | Q x1 y1 x y | O cx cy r startAngle(deg) dir(1|-1)  (full circle as its own subpath) */
  const P = [
    // ♈ Aries: a stem that splits into two ram horns curling outward and down
    [['M', 0, 44], ['L', 0, -8], ['C', 0, -30, -8, -42, -22, -42], ['C', -36, -42, -44, -31, -43, -19], ['C', -42, -10, -37, -5, -31, -4],
     ['M', 0, -8], ['C', 0, -30, 8, -42, 22, -42], ['C', 36, -42, 44, -31, 43, -19], ['C', 42, -10, 37, -5, 31, -4]],
    // ♉ Taurus: circle under a crescent of horns
    [['M', -42, -40], ['C', -38, -16, -20, -8, 0, -8], ['C', 20, -8, 38, -16, 42, -40],
     ['O', 0, 17, 25, -90, 1]],
    // ♊ Gemini: two pillars between curved lintels
    [['M', -36, -40], ['Q', 0, -26, 36, -40], ['M', -36, 40], ['Q', 0, 26, 36, 40],
     ['M', -15, -33], ['L', -15, 33], ['M', 15, -33], ['L', 15, 33]],
    // ♋ Cancer: a sideways 69, two circles with sweeping tails
    [['O', -20, -12, 12, -90, -1], ['M', -20, -24], ['C', -2, -36, 30, -34, 42, -12],
     ['O', 20, 12, 12, 90, -1], ['M', 20, 24], ['C', 2, 36, -30, 34, -42, 12]],
    // ♌ Leo: small loop, a high arch, a falling tail with an outward curl
    [['O', -24, 16, 12, 0, -1], ['M', -12, 16], ['C', -12, -4, -20, -42, 6, -42], ['C', 30, -42, 34, -16, 22, 4], ['C', 10, 22, 12, 40, 28, 40], ['C', 36, 40, 42, 34, 42, 26]],
    // ♍ Virgo: an m whose third leg loops back across itself
    [['M', -44, -26], ['C', -40, -32, -32, -32, -32, -22], ['L', -32, 40],
     ['M', -32, -16], ['C', -32, -36, -12, -36, -12, -18], ['L', -12, 40],
     ['M', -12, -16], ['C', -12, -36, 8, -36, 8, -18], ['L', 8, 18], ['C', 8, 34, 16, 40, 26, 34], ['C', 40, 26, 38, 2, 26, 4], ['C', 16, 6, 12, 22, 2, 46]],
    // ♎ Libra: the horizon with the sun rising over it
    [['M', -44, 32], ['L', 44, 32],
     ['M', -44, 12], ['L', -16, 12], ['C', -28, 2, -26, -32, 0, -32], ['C', 26, -32, 28, 2, 16, 12], ['L', 44, 12]],
    // ♏ Scorpio: an m whose third leg sweeps out into an arrow sting
    [['M', -44, -26], ['C', -40, -32, -32, -32, -32, -22], ['L', -32, 38],
     ['M', -32, -16], ['C', -32, -36, -12, -36, -12, -18], ['L', -12, 38],
     ['M', -12, -16], ['C', -12, -36, 8, -36, 8, -18], ['L', 8, 26], ['C', 8, 38, 18, 42, 28, 36], ['L', 44, 24],
     ['M', 31, 21], ['L', 44, 24], ['L', 41, 37]],
    // ♐ Sagittarius: the archer's arrow, with a crossbar
    [['M', -40, 40], ['L', 40, -40], ['M', 10, -40], ['L', 40, -40], ['L', 40, -10], ['M', -26, -6], ['L', 6, 26]],
    // ♑ Capricorn: a V, a rising stroke, a looped fish tail
    [['M', -44, -30], ['C', -40, -36, -34, -34, -32, -26], ['L', -20, 28], ['L', -6, -24], ['C', -2, -36, 10, -36, 10, -22], ['L', 10, 14],
     ['C', 10, 34, 38, 36, 38, 16], ['C', 38, 0, 16, 0, 10, 16], ['C', 6, 30, -2, 40, -16, 42]],
    // ♒ Aquarius: two zigzag waves
    [['M', -44, -4], ['L', -29, -18], ['L', -14, -4], ['L', 0, -18], ['L', 14, -4], ['L', 29, -18], ['L', 44, -4],
     ['M', -44, 18], ['L', -29, 4], ['L', -14, 18], ['L', 0, 4], ['L', 14, 18], ['L', 29, 4], ['L', 44, 18]],
    // ♓ Pisces: two arcs back to back, bound by a bar
    [['M', -36, -42], ['C', -10, -22, -10, 22, -36, 42], ['M', 36, -42], ['C', 10, -22, 10, 22, 36, 42], ['M', -36, 0], ['L', 36, 0]],
  ]

  /** sample a spec into polylines [{pts:[[x,y]...], len}] */
  function build(spec) {
    const subs = []
    let cur = null, px = 0, py = 0
    const push = (x, y) => { cur.pts.push([x, y]); px = x; py = y }
    for (const c of spec) {
      const k = c[0]
      if (k === 'M') { cur = { pts: [] }; subs.push(cur); push(c[1], c[2]) }
      else if (k === 'L') { const n = 12; const x0 = px, y0 = py; for (let i = 1; i <= n; i++) push(x0 + (c[1] - x0) * i / n, y0 + (c[2] - y0) * i / n) }
      else if (k === 'Q') { const x0 = px, y0 = py; for (let i = 1; i <= 24; i++) { const t = i / 24, u = 1 - t; push(u * u * x0 + 2 * u * t * c[1] + t * t * c[3], u * u * y0 + 2 * u * t * c[2] + t * t * c[4]) } }
      else if (k === 'C') { const x0 = px, y0 = py; for (let i = 1; i <= 32; i++) { const t = i / 32, u = 1 - t; push(u * u * u * x0 + 3 * u * u * t * c[1] + 3 * u * t * t * c[3] + t * t * t * c[5], u * u * u * y0 + 3 * u * u * t * c[2] + 3 * u * t * t * c[4] + t * t * t * c[6]) } }
      else if (k === 'O') {
        const [, cx, cy, r, st, dir] = c
        cur = { pts: [], closed: true }; subs.push(cur)
        for (let i = 0; i <= 64; i++) { const a = (st * Math.PI) / 180 + (dir || 1) * TAU * i / 64; push(cx + Math.cos(a) * r, cy + Math.sin(a) * r) }
        cur = null
      }
    }
    let total = 0
    for (const s of subs) { let l = 0; for (let i = 1; i < s.pts.length; i++) l += Math.hypot(s.pts[i][0] - s.pts[i - 1][0], s.pts[i][1] - s.pts[i - 1][1]); s.len = l; total += l }
    return { subs, total }
  }
  const GLYPHS = P.map(build)

  function strokeUpTo(ctx, g, s, x, y, upto) {
    let used = 0
    for (const sub of g.subs) {
      if (used >= upto) break
      const pts = sub.pts
      ctx.beginPath()
      ctx.moveTo(x + pts[0][0] * s, y + pts[0][1] * s)
      for (let i = 1; i < pts.length; i++) {
        const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
        if (used + d > upto) {
          const f = (upto - used) / d
          ctx.lineTo(x + (pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f) * s, y + (pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f) * s)
          used = upto
          break
        }
        used += d
        ctx.lineTo(x + pts[i][0] * s, y + pts[i][1] * s)
      }
      if (sub.closed && used >= upto - 1e-6 && upto >= g.total) ctx.closePath()
      ctx.stroke()
    }
  }

  /** Draw zodiac glyph i (0 Aries … 11 Pisces) centred on x,y inside a size×size box. */
  function glyph(ctx, i, x, y, size, o = {}) {
    const g = GLYPHS[((i % 12) + 12) % 12]
    const prog = o.progress == null ? 1 : clamp(o.progress)
    if (prog <= 0) return
    const s = size / 100
    ctx.save()
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = o.color || A.C.bone
    const lw = o.lw || Math.max(1.2, size * 0.056)
    if (o.glow) {
      ctx.save()
      ctx.globalAlpha *= 0.35 * o.glow
      ctx.lineWidth = lw * 3.2
      ctx.strokeStyle = o.glowColor || o.color || A.C.gold
      strokeUpTo(ctx, g, s, x, y, g.total * prog)
      ctx.restore()
    }
    ctx.lineWidth = lw
    strokeUpTo(ctx, g, s, x, y, g.total * prog)
    ctx.restore()
  }

  /* ---- constellations: the app's own figures (Constellation.tsx), 100×70 box ---- */
  const chain = (n, from = 0) => Array.from({ length: n - 1 }, (_, i) => [from + i, from + i + 1])
  const CONST = [
    { pts: [[5, 45], [42, 22], [68, 26], [88, 42]], lines: chain(4) },
    { pts: [[33, 0], [69, 0], [27, 25], [71, 25], [21, 48], [77, 48], [15, 70], [84, 70]], lines: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], [2, 3]] },
    { pts: [[28, 0], [26, 24], [22, 48], [18, 70], [66, 0], [68, 24], [71, 48], [74, 70]], lines: [...chain(4), ...chain(4, 4), [0, 4], [2, 6]] },
    { pts: [[50, 0], [48, 30], [16, 66], [82, 60], [58, 50]], lines: [[0, 1], [1, 2], [1, 4], [4, 3]] },
    { pts: [[78, 14], [66, 0], [50, 6], [50, 24], [60, 34], [54, 48], [22, 52], [4, 68], [26, 36]], lines: [...chain(6), [5, 6], [6, 7], [6, 8], [8, 3]] },
    { pts: [[0, 8], [20, 20], [40, 14], [55, 30], [72, 24], [88, 44], [60, 56], [42, 70]], lines: [...chain(6), [3, 6], [6, 7]] },
    { pts: [[50, 0], [18, 28], [82, 28], [24, 62], [76, 58]], lines: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4]] },
    { pts: [[2, 6], [12, 0], [18, 16], [32, 26], [46, 36], [54, 50], [64, 62], [80, 68], [94, 56]], lines: [[0, 2], [1, 2], ...chain(7, 2)] },
    { pts: [[10, 36], [28, 22], [46, 28], [44, 50], [22, 54], [62, 14], [80, 6], [66, 40], [90, 60]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 5], [5, 6], [2, 7], [7, 8]] },
    { pts: [[0, 10], [30, 34], [56, 60], [80, 44], [96, 10], [50, 18]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] },
    { pts: [[0, 34], [16, 22], [32, 34], [48, 22], [64, 34], [80, 18], [96, 28]], lines: chain(7) },
    { pts: [[0, 12], [22, 32], [46, 64], [70, 42], [90, 22], [98, 8], [84, 6]], lines: [...chain(5), [4, 5], [5, 6], [6, 4]] },
  ].map((c) => {
    // centre each figure on its own bounding box
    const xs = c.pts.map((p) => p[0]), ys = c.pts.map((p) => p[1])
    const mx = (Math.min(...xs) + Math.max(...xs)) / 2, my = (Math.min(...ys) + Math.max(...ys)) / 2
    return { pts: c.pts.map(([x, y]) => [x - mx, y - my]), lines: c.lines }
  })

  /** Star-and-line figure for sign i, centred on x,y, about `size` px wide. */
  function constellation(ctx, i, x, y, size, o = {}) {
    const c = CONST[((i % 12) + 12) % 12]
    const s = size / 100
    const prog = o.progress == null ? 1 : clamp(o.progress)
    if (prog <= 0) return
    const col = o.color || A.C.bone
    const star = o.starColor || '#ffffff'
    ctx.save()
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    ctx.lineCap = 'round'
    ctx.strokeStyle = A.rgba(col, 0.55)
    ctx.lineWidth = o.lw || Math.max(0.8, size * 0.008)
    const nL = c.lines.length
    c.lines.forEach(([a, b], k) => {
      const f = clamp(prog * (nL + 2) - k)
      if (f <= 0) return
      const [x1, y1] = c.pts[a], [x2, y2] = c.pts[b]
      // stop short of the stars so dots read as separate points
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, gap = Math.min(0.25, 4 / L)
      ctx.beginPath()
      ctx.moveTo(x + (x1 + dx * gap) * s, y + (y1 + dy * gap) * s)
      const e = gap + (1 - 2 * gap) * f
      ctx.lineTo(x + (x1 + dx * e) * s, y + (y1 + dy * e) * s)
      ctx.stroke()
    })
    const nP = c.pts.length
    c.pts.forEach(([px, py], k) => {
      const f = clamp(prog * (nP + 1) - k)
      if (f <= 0) return
      const X = x + px * s, Y = y + py * s
      const r = Math.max(1.5, size * 0.018) * (k % 3 === 0 ? 1.25 : 1)
      const g = ctx.createRadialGradient(X, Y, 0, X, Y, r * 5)
      g.addColorStop(0, A.rgba(col, 0.55 * f)); g.addColorStop(1, A.rgba(col, 0))
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(X, Y, r * 5, 0, TAU); ctx.fill()
      ctx.fillStyle = star
      ctx.globalAlpha *= f
      ctx.beginPath(); ctx.arc(X, Y, r, 0, TAU); ctx.fill()
      ctx.globalAlpha /= f
    })
    ctx.restore()
  }

  A.zodiac = { glyph, SIGNS, constellation, CONSTELLATIONS: CONST }
})()
