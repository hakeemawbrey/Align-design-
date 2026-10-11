import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, A, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// index.html ships Inter 200/300/400/600 only; weight 500 would silently fall back to 400.
// Register the 500 face locally (shared guard with s2) — document.fonts.ready waits for it.
if (typeof document !== 'undefined' && !window.__inter500) {
  window.__inter500 = new FontFace('Inter', "url(../app/node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2) format('woff2')", { weight: '500' })
  document.fonts.add(window.__inter500); window.__inter500.load().catch(() => {})
}

// ─────────────────────────────────────────────────────── S2 · { now they do }
const CHIP_SRC = [
  'card-profile-1.png', 'card-profile-2.png', 'card-profile-3.png', 'card-event.png',
  'card-profile-4.png', 'card-profile-5.png', 'card-talk-1.png', 'card-profile-6.png',
]
const TILE_W = 68, TILE_H = 86, TILE_STEP = 72, CHIP_W = 3 * TILE_W + 2 * (TILE_STEP - TILE_W), CHIP_MARGIN = 6
const TICK = 20
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
  const root = fill(stage, { background: C.paper })
  const mid = el('div', { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px' }, root)
  const row = el('div', {
    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center',
    fontFamily: SANS, fontWeight: 500, fontSize: '68px', color: C.ink, whiteSpace: 'nowrap', letterSpacing: '-0.01em',
  }, mid)
  const mk = (txt, extra = {}) => el('span', { display: 'inline-block', overflow: 'hidden', verticalAlign: 'middle', ...extra }, row, txt)
  const BR_L = 20, BR_R = 20   // gap inside the braces (tuned by eye so both sides read equal)
  const lb = mk('{', { padding: `0 ${BR_L}px 8px 0` })
  const wIn = mk('now')
  const wYour = mk('&nbsp;they')
  const wStars = mk('&nbsp;do')
  const wIntro = mk('intro', { color: C.rub })
  const chip = el('span', { display: 'inline-block', position: 'relative', height: TILE_H + 'px', overflow: 'hidden', borderRadius: '10px', margin: `0 ${CHIP_MARGIN}px`, verticalAlign: 'middle', flexShrink: 0, willChange: 'transform' }, row)
  // each tile crops the card toward its art window (aura / arch) so it reads at thumbnail size
  const tiles = CHIP_SRC.map((f) => {
    const tile = el('div', { position: 'absolute', top: 0, width: TILE_W + 'px', height: TILE_H + 'px', overflow: 'hidden', borderRadius: '8px', background: C.canvas }, chip)
    const talk = f.startsWith('card-talk')
    const iw = talk ? 160 : 180, ih = talk ? iw * 1170 / 732 : iw * 2238 / 1496
    img(tile, A + f, { left: (TILE_W / 2 - iw * 0.5) + 'px', top: (TILE_H / 2 - ih * (talk ? 0.36 : 0.27)) + 'px', width: iw + 'px', height: ih + 'px' })
    return tile
  })
  const dot = mk('•', { color: C.rub, fontSize: '30px' })
  const wDucing = mk('ducing')
  const wAlign = mk('&nbsp;<span style="font-family:' + SERIF.replace(/"/g, "'") + ';font-style:italic;font-size:1.16em;letter-spacing:0;padding-right:0.03em">Align</span>', { color: C.rub })
  const rb = mk('}', { padding: `0 0 8px ${BR_R}px` })
  const arrL = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: '56px', color: 'rgba(26,16,51,0.22)' }, mid, '⟵')
  const arrR = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: '56px', color: 'rgba(26,16,51,0.22)' }, mid, '⟶')
  const ticks = makeTicks(mid, C.ink, TICK)

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
      root.style.background = early ? 'transparent' : C.paper
      root.style.zIndex = early ? '1001' : '11'
      const st = state(t)
      setW(wIn, 'wIn', st.f.wIn); setW(wYour, 'wYour', st.f.wYour); setW(wStars, 'wStars', st.f.wStars)
      setW(wIntro, 'wIntro', st.f.wIntro); setW(wDucing, 'wDucing', st.f.wDucing); setW(dot, 'dot', st.f.dot)
      setW(wAlign, 'wAlign', st.f.wAlign)
      wIntro.style.color = mix(C.rub, C.ink, st.close)
      chip.style.width = (st.open * CHIP_W) + 'px'
      chip.style.margin = `0 ${st.margin}px`
      chip.style.opacity = String(clamp(st.open * 3))
      // stepped carousel: 8 slots of TILE_STEP, window shows 3; every slot is always filled
      const shift = Math.floor(FI(t) / 3)
      tiles.forEach((tile, i) => {
        const slot = ((i - shift) % 8 + 8) % 8
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
        const bw = rw * lerp(1.05, 1.4, grow) + 60, bh = 100 + 300 * grow
        return { cx: W / 2, cy: H / 2, w: lerp(bw, 0, conv), h: lerp(bh, 0, conv), op: lag * (1 - prog(tt, T.conv + 0.22, T.conv + 0.28)) }
      })
      const rw = st.w
      const ap = ease.outCubic(prog(t, T.intro, T.intro + 0.65))
      arrL.style.left = (W / 2 - rw / 2 - lerp(300, 150, ap) - 56) + 'px'
      arrR.style.left = (W / 2 + rw / 2 + lerp(300, 150, ap) - 4) + 'px'
      arrL.style.transform = arrR.style.transform = 'translateY(-55%)'
      arrL.style.opacity = arrR.style.opacity = String(ap * outF)
    },
  }
}

// ── thermal Juniper, sampled once, framed exactly like s3's first frame (6.86s) ──
const THERMAL_STOPS = ['#1d0b4a', '#6a1fb0', '#e0408a', '#ff8c3a', '#ffe36a'].map(h => {
  const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
})
const moundImg = typeof document !== 'undefined' ? document.createElement('img') : null
if (moundImg) {
  moundImg.src = IMG + 'juniper.jpg'
  moundImg.decoding = 'sync'
  Object.assign(moundImg.style, { position: 'absolute', width: '1px', height: '1px', opacity: '0', pointerEvents: 'none', left: '-10px', top: '-10px' })
  // in the document so main.js waits for it along with the other images
  document.body.appendChild(moundImg)
}
const grids = {}  // size → { cols, rows, data }
function thermalGrid(size) {
  if (grids[size]) return grids[size]
  if (!moundImg || !moundImg.complete || !moundImg.naturalWidth) return null
  // full-frame thermal render: s3 at 6.86 → img 1920×2560 centred, translateY(ty) scale(s)
  // keep in sync with s3-veil.js (push = 1.0, yShift = -360 at t = 6.86)
  const s = 1.0, ty = -360
  const full = document.createElement('canvas'); full.width = W; full.height = H
  const fc = full.getContext('2d')
  const dw = 1920 * s, dh = 2560 * s
  fc.drawImage(moundImg, W / 2 - dw / 2, H / 2 + ty - dh / 2, dw, dh)
  const id = fc.getImageData(0, 0, W, H), d = id.data
  for (let i = 0; i < d.length; i += 4) {
    const l = clamp((0.3 * d[i] + 0.55 * d[i + 1] + 0.15 * d[i + 2]) / 255) * 4
    const k = Math.min(3, Math.floor(l)), f = l - k
    const a = THERMAL_STOPS[k], b = THERMAL_STOPS[k + 1]
    d[i] = a[0] + (b[0] - a[0]) * f; d[i + 1] = a[1] + (b[1] - a[1]) * f; d[i + 2] = a[2] + (b[2] - a[2]) * f
  }
  fc.putImageData(id, 0, 0)
  // average down to the cell grid
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const small = document.createElement('canvas'); small.width = cols; small.height = rows
  const sc = small.getContext('2d'); sc.imageSmoothingQuality = 'high'
  sc.drawImage(full, 0, 0, cols * size, rows * size, 0, 0, cols, rows)
  const data = sc.getImageData(0, 0, cols, rows).data
  const css = []
  for (let i = 0; i < cols * rows; i++) css.push(`rgb(${data[i * 4]},${data[i * 4 + 1]},${data[i * 4 + 2]})`)
  return (grids[size] = { cols, rows, css, small })
}

/** a pixel mound rising from the bottom; its interior is a mosaic of thermal Juniper that floods the
 *  frame and lands on s3's first frame (S2 → S3) */
export function fxMound(ctx, t, { start, dur, seed = 5, size = 40 }) {
  const p = prog(t, start, start + dur)
  if (p <= 0) return
  const g = thermalGrid(size)
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const r = rng(seed)
  const jit = Array.from({ length: cols }, () => r())
  const fallback = ['#1d0b4a', '#6a1fb0', '#e0408a', '#ff8c3a', '#ffe36a']
  const lt = t - start
  // a small hill that keeps swelling, floods the frame (~0.33s, inOutCubic), then the mosaic resolves
  // 40 → 20 → 10px, each step held 2 frames, landing on s3's first frame (frame 206 = 6.867s)
  const fi = Math.round(t * 30), endF = Math.round((start + dur) * 30)   // endF = 206 (first s3 frame)
  const hill = ease.inOutQuad(prog(lt, 0, 0.5))
  const flood = fi >= endF - 5 ? 1 : ease.inOutCubic(prog(lt, dur - 0.55, dur - 0.15))
  if (flood >= 1 && g) {
    const fine = fi >= endF - 2 ? 10 : fi >= endF - 4 ? 20 : size
    const gf = thermalGrid(fine) || g
    ctx.save(); ctx.imageSmoothingEnabled = false
    ctx.drawImage(gf.small, 0, 0, gf.cols * fine, gf.rows * fine)
    ctx.restore()
    return
  }
  // sized so the frame only just fills as flood → 1 (no early saturation → no 2-frame jump)
  const width = lerp(1.5, 6.5, hill) + 26 * flood
  const height = lerp(1, 7.5, hill) + rows * 1.5 * flood
  for (let cx = 0; cx < cols; cx++) {
    const dx = (cx + 0.5 - cols / 2) / width
    const env = Math.exp(-dx * dx)
    const h = Math.floor(height * env + (env > 0.08 ? jit[cx] * 1.2 * (1 - flood) : 0))
    for (let k = 0; k < Math.min(h, rows); k++) {
      const cy = rows - 1 - k
      const depth = h - k
      let pick
      if (depth <= 1) {
        const rr = rng(cx * 37 + k * 101 + seed + (Math.round(t * 30) >> 1) * 7)
        pick = PIXEL_PALETTE[Math.floor(rr() * PIXEL_PALETTE.length)]
      } else pick = g ? g.css[cy * g.cols + cx] : fallback[Math.min(4, Math.floor(depth / 2))]
      ctx.fillStyle = pick
      ctx.fillRect(cx * size, cy * size, size + 0.5, size + 0.5)
    }
  }
}
