import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, VERT, IMG, A, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars, spaceBackdrop } from "./common.js"
import { veilCanvas } from './s3-veil.js'

// index.html ships Inter 200/300/400/600 only; weight 500 would silently fall back to 400.
// Register the 500 face locally (shared guard with s2) — document.fonts.ready waits for it.
if (typeof document !== 'undefined' && !window.__inter500) {
  window.__inter500 = new FontFace('Inter', "url(../app/node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2) format('woff2')", { weight: '500' })
  document.fonts.add(window.__inter500); window.__inter500.load().catch(() => {})
}

// ─────────────────────────────────────────────────────── S2 · { now they do }
// the chip flicks through real people: aura portraits cropped to the face (fx/fy = face centre in the source, fw = face width)
const PEOPLE_SRC = [3, 8, 'juniper', 4, 12, 2, 1, 9, 5, 'hakeem', 6, 10, 7, 11]
const CHIP_FACES = PEOPLE_SRC.map((k) => k === 'juniper' ? { src: IMG + 'juniper.jpg', iw: 720, ih: 960, fx: 0.5, fy: 0.46, fw: 0.30 }
  : k === 'hakeem' ? { src: IMG + 'hakeem.jpg', iw: 900, ih: 750, fx: 0.5, fy: 0.43, fw: 0.20 }
  : { src: PEOPLE[k - 1], iw: 342, ih: 366, fx: 0.5, fy: 0.37, fw: 0.25 })
const CHIP_STEP_FRAMES = 2   // carousel advances one slot every 2 frames (15 Hz) → ~12 faces flash by while the chip is open
// vertical: bigger line (80px vs 68px) → chip tiles, ticks scaled to match
const TILE_W = VERT ? 84 : 68, TILE_H = VERT ? 106 : 86, TILE_STEP = VERT ? 89 : 72, CHIP_W = 3 * TILE_W + 2 * (TILE_STEP - TILE_W), CHIP_MARGIN = 6
const TICK = VERT ? 24 : 20
const ROSE = '#ff8fb1'   // light rose accent: reads on the dark ground (≈8:1 on #120a2e)
const FI = (t) => Math.round(t * 30)            // frame index (never floor: float error duplicates frames)

/** four corner ticks, each following the box with its own small delay; positions snap at 10 Hz like the reference */
function makeTicks(parent, color, size = TICK) {
  const s = [0, 1, 2, 3].map(() => el('div', { position: 'absolute', width: size + 'px', height: size + 'px', background: color, opacity: 0 }, parent))
  const pts = [[-1, -1], [1, -1], [-1, 1], [1, 1]]
  const delays = [0, 0.07, 0.11, 0.04]
  return {
    /** box(tt) → { cx, cy, w, h, op } */
    update(t, box) {
      s.forEach((d, i) => {
        const tt = t - delays[i]
        const q = Math.floor(FI(tt) / 3) * 3 / 30   // stepped sampling
        const b = box(q)
        d.style.left = Math.round(b.cx + pts[i][0] * b.w / 2 - size / 2) + 'px'
        d.style.top = Math.round(b.cy + pts[i][1] * b.h / 2 - size / 2) + 'px'
        d.style.opacity = String(clamp(b.op))
      })
    },
  }
}

/** "{ now they do }": a small constellation of people around the tick box — each starts as a point of light and
 *  blooms into a round aura portrait; hairlines join them in order (dx, dy from frame centre, d = diameter, glow rgb) */
const CONST = VERT ? [
  // vertical: stacked above / below the bracket line (path dips through the line's sides, outside the tick box)
  { k: 5, dx: -420, dy: 400, d: 84, g: '232,98,138' },
  { k: 9, dx: -420, dy: -320, d: 92, g: '242,154,74' },
  { k: 12, dx: -40, dy: -560, d: 84, g: '180,92,255' },
  { k: 1, dx: 330, dy: -420, d: 92, g: '242,154,74' },
  { k: 6, dx: 420, dy: 330, d: 84, g: '127,216,176' },
  { k: 10, dx: 40, dy: 560, d: 90, g: '232,98,138' },
] : [
  { k: 5, dx: -470, dy: 262, d: 52, g: '232,98,138' },
  { k: 9, dx: -622, dy: -40, d: 58, g: '242,154,74' },
  { k: 12, dx: -262, dy: -330, d: 52, g: '180,92,255' },
  { k: 1, dx: 204, dy: -330, d: 58, g: '242,154,74' },
  { k: 6, dx: 592, dy: -196, d: 52, g: '127,216,176' },
  { k: 10, dx: 556, dy: 240, d: 56, g: '232,98,138' },
]
const CONST_T0 = 3.80, CONST_DT = 0.06   // star i lights at CONST_T0 + i·DT, blooms 0.09s later (0.22s)
const CONST_OUT = 4.58                     // fold back to points and fade before the line collapses (4.64)

// timeline (s) — sound cues
const T = {
  enter: 3.45,          // scene shows (over the wipe tail)
  wIn: 3.50, wYour: 3.62, wStars: 3.74,   // 0.12s pops → whole line by ~3.84
  ticks: 3.60,
  collapse: 4.64, intro: 4.78,            // complete line holds ~0.8s (3.84 → 4.64)
  open: 5.02, close: 5.52, align: 5.62,   // "{ introducing Align }" reads 5.70 → ~6.30 (mound floods 6.30)
  out: 6.38, conv: 6.40,
}

export function sceneIntro(stage) {
  const root = fill(stage, { background: 'transparent' })
  const bg = spaceBackdrop(root, 'rose', { seed: 2 })   // deep-space ground (first child)
  const mid = el('div', { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px' }, root)
  const row = el('div', {
    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center',
    fontFamily: SANS, fontWeight: 500, fontSize: VERT ? '80px' : '68px', color: C.bone, whiteSpace: 'nowrap', letterSpacing: '-0.01em',
  }, mid)
  const mk = (txt, extra = {}) => el('span', { display: 'inline-block', overflow: 'hidden', verticalAlign: 'middle', ...extra }, row, txt)
  const BR_L = VERT ? 23 : 20, BR_R = VERT ? 23 : 20   // gap inside the braces (tuned by eye so both sides read equal)
  const lb = mk('{', { padding: `0 ${BR_L}px 8px 0` })
  const wIn = mk('now')
  const wYour = mk('&nbsp;they')
  const wStars = mk('&nbsp;do')
  const wIntro = mk('intro', { color: ROSE })
  const chip = el('span', { display: 'inline-block', position: 'relative', height: TILE_H + 'px', overflow: 'hidden', borderRadius: '10px', margin: `0 ${CHIP_MARGIN}px`, verticalAlign: 'middle', flexShrink: 0, willChange: 'transform' }, row)
  // each tile crops a portrait to the face (face ≈ 62% of the tile width, eyes a touch above centre)
  const tiles = CHIP_FACES.map((f) => {
    const tile = el('div', { position: 'absolute', top: 0, width: TILE_W + 'px', height: TILE_H + 'px', overflow: 'hidden', borderRadius: '8px', background: C.canvas }, chip)
    const iw = TILE_W * 0.56 / f.fw, ih = iw * f.ih / f.iw
    img(tile, f.src, { left: (TILE_W / 2 - iw * f.fx) + 'px', top: (TILE_H * 0.47 - ih * f.fy) + 'px', width: iw + 'px', height: ih + 'px' })
    return tile
  })
  const dot = mk('•', { color: ROSE, fontSize: VERT ? '35px' : '30px' })
  const wDucing = mk('ducing')
  const wAlign = mk('&nbsp;<span style="font-family:' + SERIF.replace(/"/g, "'") + ';font-style:italic;font-size:1.16em;letter-spacing:0;padding-right:0.03em">Align</span>', { color: ROSE })
  const rb = mk('}', { padding: `0 0 8px ${BR_R}px` })
  const arrL = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: VERT ? '68px' : '56px', color: 'rgba(239,230,214,0.34)' }, mid, '⟵')
  const arrR = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: VERT ? '68px' : '56px', color: 'rgba(239,230,214,0.34)' }, mid, '⟶')
  const ticks = makeTicks(mid, C.bone, TICK)
  // constellation (lines on a canvas under the avatars)
  const cLines = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none' }, mid)
  cLines.width = W; cLines.height = H
  const cctx = cLines.getContext('2d')
  const stars = CONST.map((c) => {
    const dot = el('div', { position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: C.bone, boxShadow: '0 0 10px 2px rgba(239,230,214,0.55)', opacity: 0,
      left: (W / 2 + c.dx - 4) + 'px', top: (H / 2 + c.dy - 4) + 'px' }, mid)
    const av = el('div', { position: 'absolute', width: c.d + 'px', height: c.d + 'px', borderRadius: '50%', overflow: 'hidden', opacity: 0,
      left: (W / 2 + c.dx - c.d / 2) + 'px', top: (H / 2 + c.dy - c.d / 2) + 'px', background: C.canvas,
      boxShadow: `0 0 0 2px ${C.bone}, 0 0 ${Math.round(c.d * 0.45)}px ${Math.round(c.d * 0.12)}px rgba(${c.g},0.55)` }, mid)
    const iw = c.d * 0.6 / 0.25, ih = iw * 366 / 342
    img(av, PEOPLE[c.k - 1], { left: (c.d / 2 - iw * 0.5) + 'px', top: (c.d * 0.5 - ih * 0.375) + 'px', width: iw + 'px', height: ih + 'px' })
    return { dot, av, c }
  })
  const starState = (t, i) => {
    const a = CONST_T0 + i * CONST_DT
    const light = ease.outCubic(prog(t, a, a + 0.06))
    const bloom = prog(t, a + 0.09, a + 0.31)
    const fold = ease.inCubic(prog(t, CONST_OUT + i * 0.012, CONST_OUT + 0.12 + i * 0.012))
    return { light, bloom, fold }
  }

  let natural = null
  const measure = () => {
    natural = {}
    for (const [k, e] of Object.entries({ lb, rb, wIn, wYour, wStars, wIntro, wDucing, dot, wAlign })) {
      e.style.width = 'auto'; natural[k] = e.getBoundingClientRect().width / (window.__stageScale || 1)
    }
  }
  const setW = (e, k, f) => {
    // width never exceeds natural (overshoot made the braces wobble); the spring's overshoot becomes a tiny scale pop
    e.style.width = (natural[k] * clamp(f, 0, 1)) + 'px'
    e.style.opacity = String(clamp(f * 1.6))
    e.style.transform = f > 1 ? `scale(${1 + 0.3 * (f - 1)})` : 'none'
  }
  const sp = (tt, a, d = 0.45, b = 0.08) => ease.spring(prog(tt, a, a + d), b)
  /** all layout factors as a pure function of time (so the ticks can sample the past) */
  const state = (tt) => {
    const collapse = 1 - ease.inOutCubic(prog(tt, T.collapse, T.collapse + 0.17))
    const b = sp(tt, T.intro, 0.5)
    const openIn = ease.spring(prog(tt, T.open, T.open + 0.5), 0.1)
    const close = ease.inOutCubic(prog(tt, T.close, T.close + 0.2))
    const open = openIn * (1 - close)
    const f = {
      wIn: sp(tt, T.wIn) * collapse, wYour: sp(tt, T.wYour) * collapse, wStars: sp(tt, T.wStars) * collapse,
      wIntro: b, wDucing: b, dot: (1 - clamp(openIn)) * b, wAlign: sp(tt, T.align, 0.5),
    }
    const margin = CHIP_MARGIN * (1 - close) * clamp(b)
    const w = natural.lb + natural.rb + margin * 2 + open * CHIP_W +
      Object.entries(f).reduce((a, [k, v]) => a + natural[k] * clamp(v, 0, 1), 0)
    return { f, open, close, margin, w }
  }

  return {
    start: T.enter, end: 6.86, root,
    update(t) {
      if (!natural) measure()
      // before s1 ends (wipe tail), sit above the fx canvas with a clear ground: the wipe's bone shows through
      const early = t < 3.55
      // the space ground eases in over the wipe's last frames (the wipe is a dark indigo close to it)
      bg.root.style.opacity = String(ease.inOutQuad(prog(t, 3.45, 3.56)))
      bg.update(t)
      root.style.zIndex = early ? '1001' : '11'
      const st = state(t)
      setW(wIn, 'wIn', st.f.wIn); setW(wYour, 'wYour', st.f.wYour); setW(wStars, 'wStars', st.f.wStars)
      setW(wIntro, 'wIntro', st.f.wIntro); setW(wDucing, 'wDucing', st.f.wDucing); setW(dot, 'dot', st.f.dot)
      setW(wAlign, 'wAlign', st.f.wAlign)
      wIntro.style.color = mix(ROSE, C.bone, st.close)
      chip.style.width = (st.open * CHIP_W) + 'px'
      chip.style.margin = `0 ${st.margin}px`
      chip.style.opacity = String(clamp(st.open * 3))
      // stepped carousel: N slots of TILE_STEP, window shows 3; every slot is always filled
      const NT = tiles.length
      const shift = Math.floor(FI(t) / CHIP_STEP_FRAMES)
      tiles.forEach((tile, i) => {
        const slot = ((i - shift) % NT + NT) % NT
        tile.style.left = ((slot - 1) * TILE_STEP) + 'px'
      })
      const outF = 1 - ease.inCubic(prog(t, T.out, T.out + 0.16))
      row.style.opacity = String(Math.min(ease.outQuad(prog(t, T.enter + 0.02, T.enter + 0.12)), outF))
      // ticks: a roomy box around the row, springing to each new size, corners slightly out of step
      ticks.update(t, (tt) => {
        const rw = state(tt).w
        const lag = ease.outCubic(prog(tt, T.ticks, T.ticks + 0.5))
        const grow = ease.spring(prog(tt, T.ticks, T.ticks + 0.65), 0.1)
        const conv = ease.inOutCubic(prog(tt, T.conv, T.conv + 0.24))
        const bw = VERT ? Math.min(rw * lerp(1.02, 1.12, grow) + 40, 940) : rw * lerp(1.05, 1.4, grow) + 60
        const bh = VERT ? 118 + 382 * grow : 100 + 300 * grow
        return { cx: W / 2, cy: H / 2, w: lerp(bw, 0, conv), h: lerp(bh, 0, conv), op: lag * (1 - prog(tt, T.conv + 0.22, T.conv + 0.28)) }
      })
      // constellation
      cctx.clearRect(0, 0, W, H)
      const P = (c) => [W / 2 + c.dx, H / 2 + c.dy]
      stars.forEach(({ dot, av, c }, i) => {
        const { light, bloom, fold } = starState(t, i)
        const b = ease.outBack(bloom)
        const sc = lerp(0.16, 1, b) * lerp(1, 0.16, fold)
        av.style.opacity = String(clamp(bloom * 4) * (1 - clamp(fold * 1.3)))
        av.style.transform = `scale(${sc.toFixed(4)})`
        // the point of light: a small ink dot that swells into the portrait (and is left behind as it folds)
        dot.style.opacity = String(clamp(light - clamp(bloom * 5)) + clamp(fold * 3) * (1 - prog(t, CONST_OUT + 0.1, CONST_OUT + 0.2)))
        dot.style.transform = `scale(${lerp(0.4, 1, light).toFixed(3)})`
        // hairline to the previous star, drawn as this one lights (trimmed at both radii)
        if (i > 0) {
          const pr = stars[i - 1].c
          const draw = ease.inOutQuad(prog(t, CONST_T0 + (i - 0.6) * CONST_DT, CONST_T0 + (i + 0.6) * CONST_DT + 0.08))
          const lop = draw > 0 ? 0.2 * (1 - ease.inQuad(prog(t, CONST_OUT - 0.04, CONST_OUT + 0.1))) : 0
          if (lop > 0.002) {
            const [x0, y0] = P(pr), [x1, y1] = P(c)
            const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L
            const r0 = pr.d / 2 + 10, r1 = c.d / 2 + 10
            const len = (L - r0 - r1) * draw
            cctx.strokeStyle = `rgba(239,230,214,${(lop * 1.6).toFixed(3)})`
            cctx.lineWidth = 1.5
            cctx.beginPath(); cctx.moveTo(x0 + ux * r0, y0 + uy * r0); cctx.lineTo(x0 + ux * (r0 + len), y0 + uy * (r0 + len)); cctx.stroke()
          }
        }
      })
      const rw = st.w
      const ap = ease.outCubic(prog(t, T.intro, T.intro + 0.65))
      if (VERT) {
        // vertical: the arrows sit above / below the line (no room at the sides), pointing outward
        const off = lerp(420, 300, ap)
        arrL.style.left = arrR.style.left = (W / 2) + 'px'
        arrL.style.transform = `translate(-50%, calc(-55% - ${off}px)) rotate(90deg)`
        arrR.style.transform = `translate(-50%, calc(-55% + ${off}px)) rotate(90deg)`
      } else {
      arrL.style.left = (W / 2 - rw / 2 - lerp(300, 150, ap) - 56) + 'px'
      arrR.style.left = (W / 2 + rw / 2 + lerp(300, 150, ap) - 4) + 'px'
      arrL.style.transform = arrR.style.transform = 'translateY(-55%)'
      }
      arrL.style.opacity = arrR.style.opacity = String(ap * outF)
    },
  }
}

// ── S3's first frame (the Libra aura-veil mystery card), sampled once into cell grids ──
const grids = {}  // size → { cols, rows, css, small }
function veilGrid(size) {
  if (grids[size]) return grids[size]
  const vc = veilCanvas()   // exact S3 veil composition (VW×VH, visible frame = centre W×H crop)
  if (!vc) return null
  const ox = (vc.width - W) / 2, oy = (vc.height - H) / 2
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const small = document.createElement('canvas'); small.width = cols; small.height = rows
  const sc = small.getContext('2d'); sc.imageSmoothingQuality = 'high'
  // average down to the cell grid (cells past the frame edge reuse the edge pixels)
  sc.drawImage(vc, ox, oy, cols * size, rows * size, 0, 0, cols, rows)
  const data = sc.getImageData(0, 0, cols, rows).data
  const css = []
  for (let i = 0; i < cols * rows; i++) css.push(`rgb(${data[i * 4]},${data[i * 4 + 1]},${data[i * 4 + 2]})`)
  return (grids[size] = { cols, rows, css, small })
}

// pixel-art sparkle sprites (1 = body, 2 = bright core); each "pixel" is drawn as a crisp integer square
const STAR7 = ['...1...', '...1...', '..111..', '1112111', '..111..', '...1...', '...1...']
const STAR5 = ['..1..', '..1..', '11211', '..1..', '..1..']
const STAR3 = ['.1.', '121', '.1.']
const STAR_CORE = '#fff6ea'
function drawPixelStar(ctx, sprite, x, y, px, color) {
  const n = sprite.length, o = Math.floor(n / 2) * px
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const v = sprite[r][c]
    if (v === '.') continue
    ctx.fillStyle = v === '2' ? STAR_CORE : color
    ctx.fillRect(Math.round(x) - o + c * px, Math.round(y) - o + r * px, px, px)
  }
}

/** a pixel mound rising from the bottom; its interior is a mosaic of the S3 mystery-card veil that floods the
 *  frame and lands on s3's first frame (S2 → S3) */
export function fxMound(ctx, t, { start, dur, seed = 5, size = 40 }) {
  const p = prog(t, start, start + dur)
  if (p <= 0) return
  const g = veilGrid(size)
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const r = rng(seed)
  const jit = Array.from({ length: cols }, () => r())
  const fallback = ['#1d0b4a', '#6a1fb0', '#e0408a', '#ff8c3a', '#ffe36a']
  const lt = t - start
  // a small hill that keeps swelling, floods the frame 6.27 → 6.667 (accelerating, so frames
  // 198-199 are still visibly climbing at ~83% / ~93% coverage), then the mosaic resolves 40 → 20 → 10px at a 2-2-2 frame rhythm
  // (frames 200-201 / 202-203 / 204-205), landing on s3's first frame (frame 206 = 6.867s)
  const fi = Math.round(t * 30), endF = Math.round((start + dur) * 30)   // endF = 206 (first s3 frame)
  const hill = ease.inOutQuad(prog(lt, 0, 0.5))
  const flood = fi >= endF - 6 ? 1 : Math.pow(prog(lt, dur - 0.58, (endF - 6) / 30 - start), 2)
  if (flood >= 1 && g) {
    const fine = fi >= endF - 2 ? 10 : fi >= endF - 4 ? 20 : size
    const gf = veilGrid(fine) || g
    ctx.save(); ctx.imageSmoothingEnabled = false
    ctx.drawImage(gf.small, 0, 0, gf.cols * fine, gf.rows * fine)
    ctx.restore()
    return
  }
  // sized so the frame only just fills as flood → 1 (no early saturation → no 2-frame jump)
  const width = lerp(1.5, 6.5, hill) + 24 * flood
  const height = lerp(1, 7.5, hill) + rows * 1.4 * flood
  const edgeCells = []   // [cx, cy] of the hill's leading edge (top cell of each column)
  for (let cx = 0; cx < cols; cx++) {
    const dx = (cx + 0.5 - cols / 2) / width
    const env = Math.exp(-dx * dx)
    const h = Math.floor(height * env + (env > 0.08 ? jit[cx] * 1.2 * (1 - flood) : 0))
    for (let k = 0; k < Math.min(h, rows); k++) {
      const cy = rows - 1 - k
      ctx.fillStyle = g ? g.css[cy * g.cols + cx] : fallback[Math.min(4, Math.floor((h - k) / 2))]
      ctx.fillRect(cx * size, cy * size, size + 0.5, size + 0.5)
    }
    if (h > 0) edgeCells.push([cx, rows - Math.min(h, rows)])
  }
  // rising stardust: pixel-art stars scattered along the leading edge, twinkling every 2 frames
  const tw2 = fi >> 1
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (const [cx, cy] of edgeCells) {
    for (let j = 0; j < 2; j++) {
      const rs = rng(cx * 977 + j * 131 + seed * 7)     // per-star identity (stable)
      if (rs() > 0.62) continue
      const phase = Math.floor(rs() * 6), life = 6     // twinkle cycle in 2-frame steps
      const st = (tw2 + phase) % life                   // 0..5
      if (st >= 5) continue                             // off beat → blink
      const rise = ((tw2 + phase) % 12) * 3 + rs() * 30 // drifts up a little, wraps
      const x = cx * size + Math.floor(rs() * size)
      const y = cy * size - 6 - rise - Math.floor(rs() * size * 0.8)
      const big = rs()
      const sprite = st === 2 ? (big > 0.55 ? STAR7 : STAR5) : st === 1 || st === 3 ? (big > 0.55 ? STAR5 : STAR3) : STAR3
      const px = big > 0.75 ? 8 : big > 0.4 ? 6 : 5
      const col = PIXEL_PALETTE[Math.floor(rng(cx * 37 + j * 53 + tw2 * 7 + seed)() * PIXEL_PALETTE.length)]
      drawPixelStar(ctx, sprite, x, y, px, col)
    }
  }
  ctx.restore()
}
