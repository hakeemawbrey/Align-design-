import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, A, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ─────────────────────────────────────────────────────── S2 · { now they do }
const CHIP_SRC = [
  'card-profile-1.png', 'card-profile-2.png', 'card-profile-3.png', 'card-event.png',
  'card-profile-4.png', 'card-profile-5.png', 'card-talk-1.png', 'card-profile-6.png',
]
const TILE_W = 50, TILE_H = 64, TILE_STEP = 53, CHIP_W = 156, CHIP_MARGIN = 4

/** four corner ticks, each following the box with its own small delay */
function makeTicks(parent, color, size = 10) {
  const s = [0, 1, 2, 3].map(() => el('div', { position: 'absolute', width: size + 'px', height: size + 'px', background: color, opacity: 0 }, parent))
  const pts = [[-1, -1], [1, -1], [-1, 1], [1, 1]]
  const delays = [0, 0.07, 0.11, 0.04]
  return {
    /** box(tt) → { cx, cy, w, h, op } */
    update(t, box) {
      s.forEach((d, i) => {
        const b = box(t - delays[i])
        d.style.left = (b.cx + pts[i][0] * b.w / 2 - size / 2) + 'px'
        d.style.top = (b.cy + pts[i][1] * b.h / 2 - size / 2) + 'px'
        d.style.opacity = String(clamp(b.op))
      })
    },
  }
}

export function sceneIntro(stage) {
  const root = fill(stage, { background: C.paper })
  const mid = el('div', { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px' }, root)
  const row = el('div', {
    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center',
    fontFamily: SANS, fontWeight: 400, fontSize: '50px', color: C.ink, whiteSpace: 'nowrap', letterSpacing: '-0.01em',
  }, mid)
  const mk = (txt, extra = {}) => el('span', { display: 'inline-block', overflow: 'hidden', verticalAlign: 'middle', ...extra }, row, txt)
  const lb = mk('{', { padding: '0 14px 6px 0' })
  const wIn = mk('now')
  const wYour = mk('&nbsp;they')
  const wStars = mk('&nbsp;do')
  const wIntro = mk('intro', { color: C.rub })
  const chip = el('span', { display: 'inline-block', position: 'relative', height: TILE_H + 'px', overflow: 'hidden', borderRadius: '8px', margin: `0 ${CHIP_MARGIN}px`, verticalAlign: 'middle', flexShrink: 0 }, row)
  // each tile crops the card toward its art window (aura / arch) so it reads at thumbnail size
  const tiles = CHIP_SRC.map((f) => {
    const tile = el('div', { position: 'absolute', top: 0, width: TILE_W + 'px', height: TILE_H + 'px', overflow: 'hidden', borderRadius: '6px', background: C.canvas }, chip)
    const talk = f.startsWith('card-talk')
    const iw = talk ? 118 : 132, ih = talk ? iw * 1170 / 732 : iw * 2238 / 1496
    img(tile, A + f, { left: (TILE_W / 2 - iw * 0.5) + 'px', top: (TILE_H / 2 - ih * (talk ? 0.36 : 0.27)) + 'px', width: iw + 'px', height: ih + 'px' })
    return tile
  })
  const dot = mk('•', { color: C.rub, fontSize: '22px' })
  const wDucing = mk('ducing')
  const rb = mk('}', { padding: '0 0 6px 14px' })
  const arrL = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: '44px', color: 'rgba(26,16,51,0.22)' }, mid, '⟵')
  const arrR = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: '44px', color: 'rgba(26,16,51,0.22)' }, mid, '⟶')
  const ticks = makeTicks(mid, C.ink, 10)

  let natural = null
  const measure = () => {
    natural = {}
    for (const [k, e] of Object.entries({ lb, rb, wIn, wYour, wStars, wIntro, wDucing, dot })) {
      e.style.width = 'auto'; natural[k] = e.getBoundingClientRect().width / (window.__stageScale || 1)
    }
  }
  const setW = (e, k, f) => {
    e.style.width = (natural[k] * clamp(f, 0, 1.2)) + 'px'
    e.style.opacity = String(clamp(f * 1.6))
  }
  const sp = (tt, a, d = 0.45, b = 0.08) => ease.spring(prog(tt, a, a + d), b)
  /** all layout factors as a pure function of time (so the ticks can sample the past) */
  const state = (tt) => {
    const collapse = 1 - ease.inOutCubic(prog(tt, 4.78, 4.95))
    const b = sp(tt, 4.95, 0.5)
    const open = ease.spring(prog(tt, 5.25, 5.75), 0.1) * (1 - ease.inOutCubic(prog(tt, 6.0, 6.25)))
    const f = {
      wIn: sp(tt, 3.62) * collapse, wYour: sp(tt, 4.0) * collapse, wStars: sp(tt, 4.38) * collapse,
      wIntro: b, wDucing: b, dot: (1 - open) * b,
    }
    const w = natural.lb + natural.rb + CHIP_MARGIN * 2 + open * CHIP_W +
      Object.entries(f).reduce((a, [k, v]) => a + natural[k] * clamp(v, 0, 1.2), 0)
    return { f, open, w }
  }

  return {
    start: 3.55, end: 6.86, root,
    update(t) {
      if (!natural) measure()
      const st = state(t)
      setW(wIn, 'wIn', st.f.wIn); setW(wYour, 'wYour', st.f.wYour); setW(wStars, 'wStars', st.f.wStars)
      setW(wIntro, 'wIntro', st.f.wIntro); setW(wDucing, 'wDucing', st.f.wDucing); setW(dot, 'dot', st.f.dot)
      chip.style.width = (st.open * CHIP_W) + 'px'
      chip.style.opacity = String(clamp(st.open * 3))
      // stepped carousel: 8 slots of TILE_STEP, window shows ~3; every slot is always filled
      const shift = Math.floor(t * 9)
      tiles.forEach((tile, i) => {
        const slot = ((i - shift) % 8 + 8) % 8
        tile.style.left = (slot * TILE_STEP + (CHIP_W - 3 * TILE_STEP) / 2 - TILE_STEP) + 'px'
      })
      const outF = 1 - ease.inCubic(prog(t, 6.25, 6.45))
      row.style.opacity = String(Math.min(ease.outQuad(prog(t, 3.55, 3.66)), outF))
      // ticks: a roomy box around the row, springing to each new size, corners slightly out of step
      ticks.update(t, (tt) => {
        const rw = state(tt).w
        const lag = ease.outCubic(prog(tt, 3.85, 4.35))
        const grow = ease.spring(prog(tt, 3.85, 4.5), 0.1)
        const conv = ease.inOutCubic(prog(tt, 6.3, 6.6))
        const bw = rw * lerp(1.05, 1.45, grow) + 40, bh = 80 + 280 * grow
        return { cx: W / 2, cy: H / 2, w: lerp(bw, 0, conv), h: lerp(bh, 0, conv), op: lag * (1 - prog(tt, 6.55, 6.62)) }
      })
      const rw = st.w
      const ap = ease.outCubic(prog(t, 4.95, 5.6))
      arrL.style.left = (W / 2 - rw / 2 - lerp(260, 130, ap) - 40) + 'px'
      arrR.style.left = (W / 2 + rw / 2 + lerp(260, 130, ap) - 4) + 'px'
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
  // a small hill that keeps swelling, floods the frame over ~0.18s, then the mosaic resolves (40 → 20 → 10px)
  const hill = ease.inOutQuad(prog(lt, 0, 0.5))
  const flood = ease.inCubic(prog(lt, dur - 0.27, dur - 0.09))
  if (flood >= 1 && g) {
    const fine = lt >= dur - 0.035 ? 10 : lt >= dur - 0.075 ? 20 : size
    const gf = thermalGrid(fine) || g
    ctx.save(); ctx.imageSmoothingEnabled = false
    ctx.drawImage(gf.small, 0, 0, gf.cols * fine, gf.rows * fine)
    ctx.restore()
    return
  }
  const width = lerp(1.5, 6.5, hill) + 42 * flood
  const height = lerp(1, 7.5, hill) + rows * 1.7 * flood
  for (let cx = 0; cx < cols; cx++) {
    const dx = (cx + 0.5 - cols / 2) / width
    const h = Math.floor(height * Math.exp(-dx * dx) + jit[cx] * 1.2 * (1 - flood))
    for (let k = 0; k < Math.min(h, rows); k++) {
      const cy = rows - 1 - k
      const depth = h - k
      let pick
      if (depth <= 1) {
        const rr = rng(cx * 37 + k * 101 + seed + Math.floor(t * 15) * 7)
        pick = PIXEL_PALETTE[Math.floor(rr() * PIXEL_PALETTE.length)]
      } else pick = g ? g.css[cy * g.cols + cx] : fallback[Math.min(4, Math.floor(depth / 2))]
      ctx.fillStyle = pick
      ctx.fillRect(cx * size, cy * size, size + 0.5, size + 0.5)
    }
  }
}
