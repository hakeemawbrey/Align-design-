/* Align reel — shared core.
 * Everything hangs off window.ALIGN so scene files can be plain <script>s.
 * All drawing must be a pure function of time: renderFrame(i) can be called
 * in any order (the exporter jumps around, the preview scrubs). */
(function () {
  const A = (window.ALIGN = window.ALIGN || {})

  A.W = 1080
  A.H = 1920
  A.FPS = 30

  /* Stardust palette (app/src/index.css) + the chakra column (AlignMark.tsx) */
  A.C = {
    void: '#0b0620', canvas: '#140a2e', raised: '#1e1240', glass: '#34235f',
    bone: '#efe6d6', label2: '#b3a6c4', label3: '#7d6f94',
    spark: '#7fd8b0', rub: '#e8628a', gold: '#f2c75c', violet: '#9a7be0',
    coral: '#f07a76', // the reel's mandala ink
    ink: '#05030f',
  }
  A.CHAKRA_COLORS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']

  A.FONT = {
    serif: "'EB Garamond', Georgia, serif",
    mono: "'Space Mono', ui-monospace, monospace",
  }

  /* ---------- math ---------- */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
  const lerp = (a, b, t) => a + (b - a) * t
  const TAU = Math.PI * 2
  /** progress of t through [a,b], clamped 0..1 */
  const seg = (t, a, b) => clamp((t - a) / (b - a))
  const ease = {
    linear: (x) => x,
    inQuad: (x) => x * x,
    outQuad: (x) => 1 - (1 - x) * (1 - x),
    inOutQuad: (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2),
    outCubic: (x) => 1 - Math.pow(1 - x, 3),
    inCubic: (x) => x * x * x,
    inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    outExpo: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
    inExpo: (x) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10)),
    outBack: (x) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2) },
    outElastic: (x) => (x === 0 || x === 1 ? x : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * (TAU / 3)) + 1),
  }
  /** deterministic PRNG */
  function rng(seed) {
    let s = seed >>> 0 || 1
    return () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  }
  /** cheap hash noise in [0,1) for integer-ish inputs */
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }
  function hexToRgb(hex) {
    const h = hex.replace('#', '')
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
  }
  const rgba = (hex, a = 1) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
  function mixHex(a, b, t) {
    const x = hexToRgb(a), y = hexToRgb(b)
    return '#' + x.map((v, i) => Math.round(lerp(v, y[i], t)).toString(16).padStart(2, '0')).join('')
  }
  Object.assign(A, { clamp, lerp, TAU, seg, ease, rng, hash, hexToRgb, rgba, mixHex })

  /* ---------- canvases ---------- */
  A.makeCanvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }

  /* ---------- text ---------- */
  /** Draw letter-spaced text centred on x. opts: size, font ('serif'|'mono'), weight, italic, color, spacing (em), align, alpha, baseline */
  A.text = function (ctx, str, x, y, o = {}) {
    const size = o.size || 64
    const fam = A.FONT[o.font || 'serif']
    ctx.save()
    ctx.font = `${o.italic ? 'italic ' : ''}${o.weight || 500} ${size}px ${fam}`
    ctx.fillStyle = o.color || A.C.bone
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    ctx.textBaseline = o.baseline || 'middle'
    const sp = (o.spacing || 0) * size
    const chars = [...str]
    const widths = chars.map((c) => ctx.measureText(c).width)
    const total = widths.reduce((a, b) => a + b, 0) + sp * (chars.length - 1)
    let cx = o.align === 'left' ? x : o.align === 'right' ? x - total : x - total / 2
    ctx.textAlign = 'left'
    if (o.stroke) { ctx.strokeStyle = o.stroke; ctx.lineWidth = o.strokeWidth || 2 }
    chars.forEach((c, i) => {
      if (o.stroke) ctx.strokeText(c, cx, y)
      if (!o.strokeOnly) ctx.fillText(c, cx, y)
      cx += widths[i] + sp
    })
    ctx.restore()
    return total
  }

  /** Text along a circle. opts as A.text plus: start (rad, 0 = top), dir 1|-1, inward */
  A.textOnCircle = function (ctx, str, cx, cy, r, o = {}) {
    const size = o.size || 40
    ctx.save()
    ctx.font = `${o.italic ? 'italic ' : ''}${o.weight || 500} ${size}px ${A.FONT[o.font || 'mono']}`
    ctx.fillStyle = o.color || A.C.bone
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    const sp = (o.spacing || 0) * size
    let a = (o.start || 0) - Math.PI / 2
    const dir = o.dir || 1
    for (const ch of str) {
      const w = ctx.measureText(ch).width + sp
      const da = (w / r) * dir
      a += da / 2
      ctx.save()
      ctx.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
      ctx.rotate(a + (dir > 0 ? Math.PI / 2 : -Math.PI / 2))
      ctx.fillText(ch, 0, 0)
      ctx.restore()
      a += da / 2
    }
    ctx.restore()
  }

  /** Repeat a word around a full circle so it closes seamlessly. */
  A.ringOfWords = function (ctx, word, cx, cy, r, o = {}) {
    const size = o.size || 40
    ctx.save()
    ctx.font = `${o.weight || 500} ${size}px ${A.FONT[o.font || 'mono']}`
    const sp = (o.spacing || 0) * size
    const unit = [...(word + (o.sep || ' ✦ '))].reduce((s, c) => s + ctx.measureText(c).width + sp, 0)
    ctx.restore()
    const n = Math.max(1, Math.floor((TAU * r) / unit))
    const str = Array.from({ length: n }, () => word + (o.sep || ' ✦ ')).join('')
    // stretch spacing so n units exactly fill the circumference
    const extra = (TAU * r - n * unit) / [...str].length
    A.textOnCircle(ctx, str, cx, cy, r, { ...o, spacing: (sp + extra) / size })
  }

  /* ---------- galaxy (background) ---------- */
  // One fixed particle field, rotated per frame. Each particle is drawn as a short
  // arc along its own orbit, so the field reads as a swirling, motion-blurred vortex.
  const GAL = (() => {
    const r = rng(7)
    const pts = []
    const ARMS = 4
    for (let i = 0; i < 16000; i++) {
      const arm = i % ARMS
      const d = Math.pow(r(), 0.85) // 0 core .. 1 edge
      const spin = d * 4.2
      const a = (arm / ARMS) * TAU + spin + (r() - 0.5) * (1.1 - d * 0.4)
      const spread = (r() - 0.5) * 0.22 * (0.3 + d)
      const hue = r()
      const col = d < 0.1 ? '#fff4e8' : hue < 0.42 ? '#5f6dff' : hue < 0.62 ? '#a77cff' : hue < 0.74 ? '#ff7fc0' : hue < 0.82 ? '#7fd8ff' : '#eef2ff'
      pts.push({ a, d: Math.max(0.01, d + spread), s: 0.8 + r() * (d < 0.15 ? 3.2 : 2.2), len: 0.04 + r() * 0.22, col, tw: r() * TAU })
    }
    // soft nebula clouds riding the arms
    const clouds = []
    for (let i = 0; i < 60; i++) { const d = 0.15 + r() * 0.85; clouds.push({ a: (i % ARMS) / ARMS * TAU + d * 4.2 + (r() - 0.5) * 0.5, d, s: 0.12 + r() * 0.22, col: ['#3b3dff', '#8a4dff', '#ff5fae', '#2f9dff'][i % 4] }) }
    return { pts, clouds }
  })()

  /**
   * Draw a swirling galaxy into ctx (any size). o: cx, cy, scale (radius px), rot (rad),
   * tilt (0..1 vertical squash), tiltAngle, alpha, tint (hex), tintAmt, density 0..1
   */
  A.galaxy = function (ctx, t, o = {}) {
    const W = ctx.canvas.width, H = ctx.canvas.height
    const cx = o.cx == null ? W / 2 : o.cx, cy = o.cy == null ? H / 2 : o.cy
    const R = o.scale || Math.min(W, H) * 0.55
    const rot = o.rot == null ? t * 0.35 : o.rot
    const tilt = o.tilt == null ? 0.7 : o.tilt
    const alpha = o.alpha == null ? 1 : o.alpha
    const cosT = Math.cos(o.tiltAngle == null ? 0.35 : o.tiltAngle), sinT = Math.sin(o.tiltAngle == null ? 0.35 : o.tiltAngle)
    const tint = (c) => (o.tint ? mixHex(c, o.tint, o.tintAmt == null ? 0.5 : o.tintAmt) : c)
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'
    ctx.translate(cx, cy)
    ctx.transform(cosT, sinT, -sinT, cosT, 0, 0)
    ctx.scale(1, tilt)
    for (const c of GAL.clouds) {
      const a = c.a + rot * (1.2 - c.d * 0.6)
      const x = Math.cos(a) * c.d * R, y = Math.sin(a) * c.d * R
      const g = ctx.createRadialGradient(x, y, 0, x, y, c.s * R)
      g.addColorStop(0, rgba(tint(c.col), 0.28 * alpha)); g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(x - c.s * R, y - c.s * R, c.s * R * 2, c.s * R * 2)
    }
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.42)
    g.addColorStop(0, rgba('#fff6ea', alpha)); g.addColorStop(0.2, rgba('#d9b8ff', 0.6 * alpha)); g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(-R, -R, R * 2, R * 2)
    const n = Math.floor(GAL.pts.length * (o.density == null ? 1 : o.density))
    ctx.lineCap = 'round'
    for (let i = 0; i < n; i++) {
      const p = GAL.pts[i]
      const a = p.a + rot * (1.2 - p.d * 0.6) // inner turns faster
      const tw = 0.6 + 0.4 * Math.sin(t * 3 + p.tw)
      ctx.strokeStyle = tint(p.col)
      ctx.globalAlpha = alpha * tw * (1 - p.d * 0.5)
      ctx.lineWidth = p.s * (R / 520)
      ctx.beginPath()
      ctx.arc(0, 0, p.d * R, a - p.len, a)
      ctx.stroke()
    }
    ctx.restore()
  }

  /** Scattered background stars (deterministic). */
  A.stars = function (ctx, t, o = {}) {
    const W = ctx.canvas.width, H = ctx.canvas.height
    const r = rng(o.seed || 3)
    const n = o.count || 260
    ctx.save()
    for (let i = 0; i < n; i++) {
      const x = r() * W, y = r() * H, s = r() * 1.8 + 0.4, ph = r() * TAU
      ctx.globalAlpha = (o.alpha == null ? 1 : o.alpha) * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * (1 + r() * 2) + ph)))
      ctx.fillStyle = r() < 0.15 ? A.C.gold : '#e8e4ff'
      ctx.fillRect(x, y + ((o.drift || 0) * t) % H, s, s)
    }
    ctx.restore()
  }

  /* ---------- sacred geometry ---------- */
  /** Seed of life / flower of life rings. o: rings (1 = seed, 2 = flower), lw, color, progress 0..1 (stroke draw), alpha */
  A.flowerOfLife = function (ctx, cx, cy, r, o = {}) {
    const rings = o.rings || 1
    const centers = [[0, 0]]
    // hex lattice up to `rings`
    for (let q = -rings; q <= rings; q++) for (let s = -rings; s <= rings; s++) {
      const u = -q - s
      if (Math.max(Math.abs(q), Math.abs(s), Math.abs(u)) > rings || (q === 0 && s === 0)) continue
      centers.push([r * (q + s / 2), r * s * Math.sqrt(3) / 2])
    }
    centers.sort((a, b) => Math.hypot(...a) - Math.hypot(...b))
    ctx.save()
    ctx.strokeStyle = o.color || A.C.bone
    ctx.lineWidth = o.lw || 2
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    const prog = o.progress == null ? 1 : o.progress
    centers.forEach(([x, y], i) => {
      const local = clamp(prog * centers.length - i * 0.6)
      if (local <= 0) return
      ctx.beginPath()
      const st = Math.atan2(y, x) + Math.PI
      ctx.arc(cx + x, cy + y, r, st, st + TAU * ease.outCubic(local))
      ctx.stroke()
    })
    if (o.outer) { ctx.beginPath(); ctx.arc(cx, cy, r * (rings + 1), 0, TAU * prog); ctx.stroke() }
    ctx.restore()
  }

  /** Metatron's cube: 13 circles + all connecting lines. */
  A.metatron = function (ctx, cx, cy, r, o = {}) {
    const pts = [[0, 0]]
    for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k * TAU) / 6; pts.push([Math.cos(a) * r * 2, Math.sin(a) * r * 2]) }
    for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k * TAU) / 6; pts.push([Math.cos(a) * r * 4, Math.sin(a) * r * 4]) }
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(o.rot || 0)
    ctx.strokeStyle = o.color || A.C.bone
    ctx.lineWidth = o.lw || 1.5
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    const prog = o.progress == null ? 1 : o.progress
    let k = 0
    const total = (13 * 12) / 2
    ctx.beginPath()
    for (let i = 0; i < 13; i++) for (let j = i + 1; j < 13; j++) {
      if (k++ / total > prog) continue
      ctx.moveTo(...pts[i]); ctx.lineTo(...pts[j])
    }
    ctx.stroke()
    pts.forEach(([x, y], i) => { if (i / 13 <= prog) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke() } })
    ctx.restore()
  }

  /** The Align mark: seed of life + 7 chakra dots in a column. o: lit (0..7 dots lit, fractional ok), glow, progress (circles) */
  A.alignMark = function (ctx, cx, cy, size, o = {}) {
    const k = size / 88
    const R = 20 * k
    ctx.save()
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    A.flowerOfLife(ctx, cx, cy, R, { rings: 1, outer: true, lw: o.lw || Math.max(1, 0.9 * k), color: o.color || '#d9cdf0', alpha: o.strokeAlpha == null ? 0.7 : o.strokeAlpha, progress: o.progress })
    const lit = o.lit == null ? 7 : o.lit
    for (let i = 0; i < 7; i++) {
      const a = clamp(lit - i)
      if (a <= 0) continue
      const y = cy + (3 - i) * 10.6 * k
      const c = A.CHAKRA_COLORS[i]
      const gr = ctx.createRadialGradient(cx, y, 0, cx, y, 3.7 * k * 3.4 * (o.glow || 1))
      gr.addColorStop(0, rgba(c, 0.9 * a)); gr.addColorStop(0.45, rgba(c, 0.35 * a)); gr.addColorStop(1, rgba(c, 0))
      ctx.fillStyle = gr
      ctx.beginPath(); ctx.arc(cx, y, 3.7 * k * 3.4 * (o.glow || 1), 0, TAU); ctx.fill()
      const core = ctx.createRadialGradient(cx - k, y - k, 0, cx, y, 3.7 * k)
      core.addColorStop(0, '#fff'); core.addColorStop(0.35, c); core.addColorStop(1, c)
      ctx.fillStyle = core
      ctx.globalAlpha = (o.alpha == null ? 1 : o.alpha) * a
      ctx.beginPath(); ctx.arc(cx, y, 3.7 * k * ease.outBack(a), 0, TAU); ctx.fill()
      ctx.globalAlpha = o.alpha == null ? 1 : o.alpha
    }
    ctx.restore()
  }

  /* ---------- post: halftone, grain, misregistration ---------- */
  const HT = { small: null, cell: 9 }
  /**
   * Halftone `src` onto `dst` (same size). Dots sized by luminance, coloured by the source.
   * o: cell px, gain, angle (rad) — dots on a rotated grid like a print screen.
   */
  A.halftone = function (dst, src, o = {}) {
    const cell = o.cell || HT.cell
    const W = src.width, H = src.height
    const gw = Math.ceil(W / cell) + 2, gh = Math.ceil(H / cell) + 2
    if (!HT.small || HT.small.width !== gw || HT.small.height !== gh) HT.small = A.makeCanvas(gw, gh)
    const sctx = HT.small.getContext('2d', { willReadFrequently: true })
    sctx.clearRect(0, 0, gw, gh)
    sctx.drawImage(src, 0, 0, gw * cell, gh * cell, 0, 0, gw, gh)
    const data = sctx.getImageData(0, 0, gw, gh).data
    const gain = o.gain || 1.25
    dst.save()
    for (let y = 0; y < gh; y++) {
      const off = (y % 2) * 0.5 // staggered rows read as a classic screen
      for (let x = 0; x < gw; x++) {
        const i = (y * gw + x) * 4
        const r = data[i], g = data[i + 1], b = data[i + 2]
        const lum = (0.3 * r + 0.59 * g + 0.11 * b) / 255
        if (lum < 0.04) continue
        const rad = Math.min(cell * 0.72, Math.sqrt(lum) * cell * 0.62 * gain)
        const m = Math.max(r, g, b) || 1
        const boost = Math.min(255 / m, 1.6) // dots carry saturated colour, size carries value
        dst.fillStyle = `rgb(${Math.min(255, r * boost) | 0},${Math.min(255, g * boost) | 0},${Math.min(255, b * boost) | 0})`
        dst.beginPath()
        dst.arc((x + off) * cell, y * cell, rad, 0, TAU)
        dst.fill()
      }
    }
    dst.restore()
  }

  let GRAIN = null
  A.grain = function (ctx, frame, amt = 0.16) {
    if (!GRAIN) {
      GRAIN = A.makeCanvas(512, 512)
      const g = GRAIN.getContext('2d')
      const img = g.createImageData(512, 512)
      const r = rng(11)
      for (let i = 0; i < img.data.length; i += 4) { const v = r() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255 }
      g.putImageData(img, 0, 0)
    }
    const W = ctx.canvas.width, H = ctx.canvas.height
    const ox = Math.floor(hash(frame) * 512), oy = Math.floor(hash(frame + 99) * 512)
    ctx.save()
    ctx.globalCompositeOperation = 'overlay'
    ctx.globalAlpha = amt
    for (let y = -oy; y < H; y += 512) for (let x = -ox; x < W; x += 512) ctx.drawImage(GRAIN, x, y)
    ctx.restore()
  }

  /** Vignette darkening the corners. */
  A.vignette = function (ctx, amt = 0.65) {
    const W = ctx.canvas.width, H = ctx.canvas.height
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.75)
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${amt})`)
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore()
  }

  /* ---------- scene registry ---------- */
  A.scenes = []
  /**
   * registerScene({ id, start, duration, draw(env) })
   * env = { bg, fg, t (sec into scene), p (0..1 through scene), T (global sec), frame, W, H, dur }
   *  - bg: background ctx — gets HALFTONED (galaxies, glows, photos-ish things)
   *  - fg: foreground ctx — stays crisp (glyphs, type, line geometry); gets slight print offset + grain
   * Scenes may overlap in time; later-registered draws on top.
   */
  A.registerScene = (s) => { A.scenes.push(s); A.scenes.sort((a, b) => a.start - b.start) }
})()

/* URL parameters (e.g. sign.html?sign=leo, love.html?a=taurus&b=scorpio) */
;(function () {
  const q = new URLSearchParams(location.search)
  window.ALIGN.param = (k, d) => (q.has(k) ? q.get(k) : d)
})()

/* ---------- house look: heavy soft film grain, bloom, halation, lifted milky blacks ----------
 * Applied to every frame by the compositor (lib/render.js). Soft, dreamy, ethereal.
 * Scenes can dial a frame via ALIGN.fx.look = { grain, bloom, halation, lift, soften } (multipliers, 1 = default). */
;(function () {
  const A = window.ALIGN
  A.LOOK = {
    grain: 0.62,     // overlay strength of the luminance grain
    chroma: 0.09,    // faint colour grain
    grainSize: 2.6,  // px per grain clump (soft, filmic, not digital speckle)
    bloom: 0.55,      // tight glow around highlights
    halation: 0.32,  // wide warm-pink glow, like light bleeding through film
    lift: 0.42,      // blacks lifted to a milky indigo
    soften: 0.7,     // overall lens softness (px blur)
  }
  const TILE = 384, N = 6
  let tiles = null, chroma = null, small = null, wide = null, soft = null
  function makeTiles() {
    tiles = []; chroma = []
    for (let k = 0; k < N; k++) {
      const r = A.rng(101 + k)
      const raw = A.makeCanvas(TILE, TILE), g = raw.getContext('2d')
      const img = g.createImageData(TILE, TILE)
      for (let i = 0; i < img.data.length; i += 4) {
        // sum of uniforms ≈ gaussian: fewer harsh outliers, a creamier grain
        const v = ((r() + r() + r()) / 3) * 255
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255
      }
      g.putImageData(img, 0, 0)
      const t = A.makeCanvas(TILE, TILE), tg = t.getContext('2d')
      tg.filter = 'blur(0.6px)' // round the clumps off
      tg.drawImage(raw, 0, 0)
      tiles.push(t)
      const c = A.makeCanvas(TILE, TILE), cg = c.getContext('2d')
      const ci = cg.createImageData(TILE, TILE)
      for (let i = 0; i < ci.data.length; i += 4) { ci.data[i] = r() * 255; ci.data[i + 1] = r() * 255; ci.data[i + 2] = r() * 255; ci.data[i + 3] = 255 }
      cg.putImageData(ci, 0, 0)
      chroma.push(c)
    }
  }
  function tile(ctx, src, frame, size, alpha, op) {
    const W = ctx.canvas.width, H = ctx.canvas.height
    const span = TILE * size
    const ox = Math.floor(A.hash(frame * 1.7) * span), oy = Math.floor(A.hash(frame * 2.9 + 5) * span)
    ctx.save()
    ctx.globalCompositeOperation = op
    ctx.globalAlpha = alpha
    ctx.imageSmoothingEnabled = true
    for (let y = -oy; y < H; y += span) for (let x = -ox; x < W; x += span) ctx.drawImage(src, x, y, span, span)
    ctx.restore()
  }

  /** Apply the house film look to a finished frame on `out`. */
  A.filmLook = function (out, frame) {
    const W = out.canvas.width, H = out.canvas.height
    const m = Object.assign({ grain: 1, bloom: 1, halation: 1, lift: 1, soften: 1 }, (A.fx && A.fx.look) || {})
    const L = A.LOOK
    if (!tiles) makeTiles()
    if (!small) { small = A.makeCanvas(W / 4, H / 4); wide = A.makeCanvas(W / 10, H / 10); soft = A.makeCanvas(W, H) }
    // lens softness
    if (L.soften * m.soften > 0) {
      const sg = soft.getContext('2d')
      sg.clearRect(0, 0, W, H)
      sg.filter = `blur(${L.soften * m.soften}px)`
      sg.drawImage(out.canvas, 0, 0)
      sg.filter = 'none'
      out.save(); out.globalCompositeOperation = 'copy'; out.drawImage(soft, 0, 0); out.restore()
    }
    // bloom: quarter-res blurred copy screened back
    const s = small.getContext('2d')
    s.globalCompositeOperation = 'copy'
    s.filter = 'blur(5px)'
    s.drawImage(out.canvas, 0, 0, small.width, small.height)
    s.filter = 'none'
    out.save()
    out.globalCompositeOperation = 'screen'
    out.globalAlpha = A.clamp(L.bloom * m.bloom)
    out.drawImage(small, 0, 0, W, H)
    out.restore()
    // halation: very wide, warm-pink tinted glow
    const w = wide.getContext('2d')
    w.globalCompositeOperation = 'copy'
    w.filter = 'blur(6px)'
    w.drawImage(small, 0, 0, wide.width, wide.height)
    w.filter = 'none'
    w.globalCompositeOperation = 'multiply'
    w.fillStyle = '#ff9ec4'
    w.fillRect(0, 0, wide.width, wide.height)
    out.save()
    out.globalCompositeOperation = 'screen'
    out.globalAlpha = A.clamp(L.halation * m.halation)
    out.drawImage(wide, 0, 0, W, H)
    out.restore()
    // lifted, milky blacks
    out.save()
    out.globalCompositeOperation = 'screen'
    out.globalAlpha = A.clamp(L.lift * m.lift)
    out.fillStyle = '#211838'
    out.fillRect(0, 0, W, H)
    out.restore()
    // grain: soft luminance clumps (overlay twice: once fine, once coarse) + faint colour
    const gi = frame % N
    tile(out, tiles[gi], frame, L.grainSize, L.grain * m.grain, 'overlay')
    tile(out, tiles[(gi + 3) % N], frame + 17, L.grainSize * 1.9, L.grain * m.grain * 0.45, 'soft-light')
    tile(out, chroma[gi], frame + 31, L.grainSize * 1.3, L.chroma * m.grain, 'soft-light')
  }
})()

/* ---------- the Align wordmark ----------
 * Exactly as the app's splash screen (design-refs/screens/S-01-open-app.png):
 * "Align" — EB Garamond italic, title case, normal tracking, warm bone.
 * Use this for the brand everywhere. Never spaced caps, never mono. */
;(function () {
  const A = window.ALIGN
  /** o: size (px, default 96), color, alpha, glow (0..1 soft halo), weight (400|500) */
  A.wordmark = function (ctx, x, y, o = {}) {
    const size = o.size || 96
    ctx.save()
    ctx.font = `italic ${o.weight || 400} ${size}px ${A.FONT.serif}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.globalAlpha *= o.alpha == null ? 1 : o.alpha
    if (o.glow) { ctx.shadowColor = A.rgba(o.color || A.C.bone, 0.55 * o.glow); ctx.shadowBlur = size * 0.35 }
    ctx.fillStyle = o.color || A.C.bone
    ctx.fillText('Align', x, y)
    ctx.restore()
  }
})()

/* ---------- images ----------
 * ALIGN.img(path) returns an HTMLImageElement and registers it for preloading;
 * the exporter waits for every registered image before rendering.
 * ALIGN.cover(ctx, img, x, y, w, h, { zoom, fx, fy }) draws it object-fit: cover, with zoom (1 = cover)
 * and a focal point fx, fy (0..1) to drift around. */
;(function () {
  const A = window.ALIGN
  A.preload = A.preload || []
  const cache = {}
  A.img = function (path) {
    if (cache[path]) return cache[path]
    const im = new Image()
    A.preload.push(new Promise((res) => { im.onload = res; im.onerror = () => { console.error('image failed: ' + path); res() } }))
    im.src = path
    return (cache[path] = im)
  }
  A.cover = function (ctx, im, x, y, w, h, o = {}) {
    if (!im.naturalWidth) return
    const zoom = o.zoom || 1, fx = o.fx == null ? 0.5 : o.fx, fy = o.fy == null ? 0.5 : o.fy
    const s = Math.max(w / im.naturalWidth, h / im.naturalHeight) * zoom
    const dw = im.naturalWidth * s, dh = im.naturalHeight * s
    ctx.drawImage(im, x + (w - dw) * fx, y + (h - dh) * fy, dw, dh)
  }
  A.SIGN_IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
})()
