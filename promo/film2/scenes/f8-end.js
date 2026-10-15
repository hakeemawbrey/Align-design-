// ─────────────────────────────────────────────── F8 · END (real time 27.0–30.0)
// The first film's opening sky (S1: grainy deep-space nebula with dust lanes, crescent moon, bright stars,
// pixel-star twinkles, heavy grain) comes back for the close, then the Align lockup (S8 language).
// Timing (sound):
//   27.00–27.20 crossfade over f7's tilt-up (slow dolly runs the whole scene)
//   27.16 "Take a chance on the stars." types in (27 chars × 0.022, fade 0.3 → fully typed ~27.76), centred, 104px
//   27.80–28.25 a gold shimmer sweeps through the line left→right · 27.86–28.30 a shooting star crosses top-left → right
//   28.28–28.78 the line rises to the top third (104 → 84px) as the lockup forms beneath it
//   28.32–28.74 seed-of-life rings draw · chakra dots light bottom→top 28.56 + i·0.06 (→ 28.92)
//   28.82–29.28 wordmark "Align" · 29.02–29.36 sub-line "BLIND BY DESIGN"
//   29.18–29.60 one chakra pulse sweeps up the column · 29.48 the moon brightens
//   fade to black 29.50 → 30.00 (all content × (1 − fade); a black plate reaches 1.0 exactly at 30.0)
import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C } from '../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../src/scenes/common.js'
import { drawMoon } from '../../src/scenes/fx-moon.js'

const T0 = 27.0, T1 = 30.01
const T_TYPE = 27.16, PER = 0.022, FADE = 0.3
const T_SHIM = 27.98, T_RISE = 28.2, T_RINGS = 28.5, T_DOTS = 28.72
const T_WORD = 28.96, T_SUB = 29.12, T_PULSE = 29.3, T_OUT = 29.55
const LINE = 'Take a chance on the stars.'
const BGW = 2304, BGH = 1296, NEB_RES = 2, GRAIN_N = 6, GRAIN_TILE = 512
const BAND_A = -0.42

// ── deterministic 2D value noise / fbm (copied from s1-imagine.js)
function hash2(x, y, seed) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 982451653)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}
function vnoise(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
  const a = hash2(ix, iy, seed), b = hash2(ix + 1, iy, seed), c = hash2(ix, iy + 1, seed), d = hash2(ix + 1, iy + 1, seed)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
function fbm(x, y, seed, oct = 5) {
  let v = 0, amp = 0.5, f = 1, norm = 0
  for (let o = 0; o < oct; o++) { v += amp * vnoise(x * f, y * f, seed + o * 17); norm += amp; amp *= 0.5; f *= 2.03 }
  return v / norm
}
const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k) }
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]

/** S1 nebula, recomposed for the end card: the luminous clouds wrap the rims (upper-left arc,
 *  lower-right bloom, a rose band low-left) and the centre stays a deep indigo well for the lockup */
function buildNebula() {
  const w = Math.ceil(BGW / NEB_RES), h = Math.ceil(BGH / NEB_RES)
  const lo = canvas(w, h), lx = lo.getContext('2d')
  const id = lx.createImageData(w, h), px = id.data
  const top = hex('#0b0620'), bot = hex('#140a2e')
  const pal = [hex('#9a7be0'), hex('#b45cff'), hex('#e8628a'), hex('#f29a4a')]
  const palAt = (c) => {
    const x = clamp(c) * (pal.length - 1), i = Math.min(pal.length - 2, Math.floor(x)), f = x - i
    return [0, 1, 2].map(k => pal[i][k] + (pal[i + 1][k] - pal[i][k]) * f)
  }
  for (let y = 0; y < h; y++) {
    const v = y / h
    for (let x = 0; x < w; x++) {
      const u = x / w
      const nx = u * 4.6 + 3.1, ny = v * 2.6 + 1.7
      const wx = fbm(nx + 1.7, ny + 9.2, 11, 4), wy = fbm(nx + 8.3, ny + 2.8, 23, 4)
      const qx = nx + 2.4 * wx, qy = ny + 2.4 * wy
      const d = fbm(qx, qy, 37, 6)
      const arc = Math.exp(-Math.pow((v - (0.16 + 0.7 * u * u * 0.9)) / 0.3, 2))
      const lowR = Math.exp(-(Math.pow((u - 0.82) / 0.26, 2) + Math.pow((v - 0.84) / 0.24, 2)))
      const upL = Math.exp(-(Math.pow((u - 0.16) / 0.28, 2) + Math.pow((v - 0.14) / 0.22, 2)))
      const lowL = Math.exp(-(Math.pow((u - 0.12) / 0.3, 2) + Math.pow((v - 0.9) / 0.16, 2)))
      const well = Math.exp(-(Math.pow((u - 0.5) / 0.24, 2) + Math.pow((v - 0.5) / 0.3, 2)))
      const mask = clamp((0.08 + 0.75 * arc + 1.1 * lowR + 0.85 * upL + 0.55 * lowL) * (1 - 0.72 * well), 0, 1.7)
      const fr = 1 - Math.abs(fbm(qx * 2.1 + 5.5, qy * 2.1 + 0.7, 89, 5) - 0.5) * 2
      const cloud = smooth(0.4, 0.82, d)
      let e = mask * (0.55 * cloud * cloud + 0.75 * Math.pow(fr, 7) * smooth(0.3, 0.7, d) + 0.06 * smooth(0.25, 0.6, d))
      e = 1 - Math.exp(-e * 1.8)
      const cn = fbm(qx * 0.7 + 4.1, qy * 0.7 + 1.3, 53, 3)
      const col = palAt(clamp(0.05 + 0.6 * u + 0.45 * v + (cn - 0.5) * 1.2) * 0.9)
      const dn = fbm(qx * 1.6 + 3.3, qy * 1.6 + 7.7, 71, 5)
      const ridge = 1 - Math.abs(dn - 0.5) * 2
      const dust = smooth(0.66, 0.95, ridge) * 0.95
      const k = (1 - dust)
      const o = (y * w + x) * 4
      for (let c = 0; c < 3; c++) {
        const base = top[c] + (bot[c] - top[c]) * v
        px[o + c] = clamp((base * (1 - dust * 0.35) + col[c] * e * 0.78 * k) / 255) * 255
      }
      px[o + 3] = 255
    }
  }
  lx.putImageData(id, 0, 0)
  const neb = canvas(BGW, BGH), nx = neb.getContext('2d')
  nx.imageSmoothingQuality = 'high'
  nx.filter = 'blur(1.2px)'; nx.drawImage(lo, 0, 0, BGW, BGH); nx.filter = 'none'
  const bl = canvas(BGW / 4, BGH / 4), blx = bl.getContext('2d')
  blx.filter = 'blur(10px)'; blx.drawImage(neb, 0, 0, BGW / 4, BGH / 4)
  nx.globalCompositeOperation = 'screen'; nx.globalAlpha = 0.42
  nx.drawImage(bl, 0, 0, BGW, BGH)
  nx.globalAlpha = 1
  const glow = (x, y, r, rgba) => {
    const g = nx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba); g.addColorStop(1, rgba.replace(/[\d.]+\)$/, '0)'))
    nx.fillStyle = g; nx.fillRect(x - r, y - r, 2 * r, 2 * r)
  }
  glow(BGW * 0.82, BGH * 0.86, 520, 'rgba(232,98,138,0.24)')
  glow(BGW * 0.88, BGH * 0.92, 260, 'rgba(242,154,74,0.2)')
  glow(BGW * 0.16, BGH * 0.12, 560, 'rgba(154,123,224,0.20)')
  glow(BGW * 0.12, BGH * 0.92, 420, 'rgba(232,98,138,0.14)')
  const GL = Math.max(BGW, BGH)
  nx.save(); nx.translate(BGW * 0.5, BGH * 0.5); nx.rotate(BAND_A); nx.scale(1, 0.14)
  const gb = nx.createRadialGradient(0, 0, 0, 0, 0, GL * 0.62)
  gb.addColorStop(0, 'rgba(201,166,255,0.08)'); gb.addColorStop(0.6, 'rgba(154,123,224,0.035)'); gb.addColorStop(1, 'rgba(154,123,224,0)')
  nx.fillStyle = gb; nx.fillRect(-GL, -GL, GL * 2, GL * 2); nx.restore()
  nx.globalCompositeOperation = 'source-over'
  return neb
}
function buildStars(n, seed, { rMin, rMax, aMin, aMax, band = 0 }) {
  const c = canvas(BGW, BGH), x = c.getContext('2d')
  const r = rng(seed)
  const tints = ['255,247,236', '239,230,214', '214,222,255', '255,226,236', '255,236,205']
  for (let i = 0; i < n; i++) {
    let sx = r() * BGW, sy = r() * BGH
    if (band && r() < band) {
      const t = r() * 2 - 1, off = (r() + r() + r() - 1.5) * 90, GL = Math.max(BGW, BGH)
      sx = BGW * 0.5 + t * GL * 0.6 * Math.cos(BAND_A) - off * Math.sin(BAND_A)
      sy = BGH * 0.5 + t * GL * 0.6 * Math.sin(BAND_A) + off * Math.cos(BAND_A)
    }
    const s = rMin + Math.pow(r(), 2.2) * (rMax - rMin)
    x.fillStyle = `rgba(${tints[Math.floor(r() * tints.length)]},${aMin + r() * (aMax - aMin)})`
    x.beginPath(); x.arc(sx, sy, s, 0, Math.PI * 2); x.fill()
  }
  return c
}
function buildStarSprite(spikes) {
  const S = 160, c = canvas(S, S), x = c.getContext('2d'), m = S / 2
  const g = x.createRadialGradient(m, m, 0, m, m, m)
  g.addColorStop(0, 'rgba(255,250,240,1)'); g.addColorStop(0.04, 'rgba(255,246,232,0.95)')
  g.addColorStop(0.12, 'rgba(226,206,255,0.35)'); g.addColorStop(0.35, 'rgba(180,140,255,0.08)'); g.addColorStop(1, 'rgba(180,140,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, S, S)
  if (spikes) {
    x.globalCompositeOperation = 'lighter'
    for (const [dx, dy, len] of [[1, 0, 1], [0, 1, 1], [0.707, 0.707, 0.35], [0.707, -0.707, 0.35]]) {
      const L = m * len
      const lg = x.createLinearGradient(m - dx * L, m - dy * L, m + dx * L, m + dy * L)
      lg.addColorStop(0, 'rgba(255,240,230,0)'); lg.addColorStop(0.5, `rgba(255,244,236,${len > 0.5 ? 0.7 : 0.3})`); lg.addColorStop(1, 'rgba(255,240,230,0)')
      x.strokeStyle = lg; x.lineWidth = len > 0.5 ? 1.6 : 1
      x.beginPath(); x.moveTo(m - dx * L, m - dy * L); x.lineTo(m + dx * L, m + dy * L); x.stroke()
    }
  }
  return c
}
function buildGrain() {
  const noiseTile = (S, seed, mean, amp) => {
    const c = canvas(S, S), x = c.getContext('2d'), id = x.createImageData(S, S), p = id.data, r = rng(seed)
    for (let i = 0; i < p.length; i += 4) {
      const g = (r() + r() + r() + r() - 2) * 0.5
      p[i] = p[i + 1] = p[i + 2] = clamp(mean + g * amp) * 255; p[i + 3] = 255
    }
    x.putImageData(id, 0, 0); return c
  }
  const wrapDraw = (dst, src, filter, alpha = 1) => {
    const T = GRAIN_TILE, big = canvas(T * 3, T * 3), bx = big.getContext('2d')
    bx.imageSmoothingQuality = 'high'
    for (let i = 0; i < 9; i++) bx.drawImage(src, (i % 3) * T, Math.floor(i / 3) * T, T, T)
    const dx = dst.getContext('2d'); dx.filter = filter; dx.globalAlpha = alpha
    dx.drawImage(big, -T, -T); dx.filter = 'none'; dx.globalAlpha = 1
  }
  return Array.from({ length: GRAIN_N }, (_, n) => {
    const out = canvas(GRAIN_TILE, GRAIN_TILE)
    wrapDraw(out, noiseTile(GRAIN_TILE / 2, 9301 + n * 131, 0.46, 1.3), 'blur(0.5px) contrast(1.5)')
    wrapDraw(out, noiseTile(GRAIN_TILE, 7301 + n * 97, 0.46, 1.0), 'blur(0.35px)', 0.4)
    return out
  })
}
// pixel-art star sprites (S1 / fx-stars language)
const STAR_SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x, y, ch === 'C'])).filter(Boolean))
function drawPixelStar(ctx, cx, cy, px, kind, color, centre, a) {
  ctx.globalAlpha = a
  const x0 = Math.round(cx - px * 3.5), y0 = Math.round(cy - px * 3.5)
  for (const [x, y, c] of STAR_SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
  ctx.globalAlpha = 1
}

// ── layout (1920×1080): line rises to y≈250; lockup block beneath, centred on the frame
const LINE_Y0 = H / 2, LINE_Y1 = 238, LINE_FS = 104, LINE_S1 = 0.8
const MARK = 250, MARK_CY = 492, WORD_TOP = 632, WORD_FS = 118, SUB_TOP = 806, SUB_FS = 30
const MOON = { x: 1590, y: 214, r: 58 }

export default function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  bgC.width = W; bgC.height = H
  const bx = bgC.getContext('2d')
  const neb = buildNebula()
  const far = buildStars(8000, 111, { rMin: 0.45, rMax: 1.0, aMin: 0.3, aMax: 0.8, band: 0.45 })
  const mid = buildStars(1700, 212, { rMin: 0.7, rMax: 1.5, aMin: 0.5, aMax: 1 })
  const near = buildStars(160, 313, { rMin: 1.1, rMax: 2.2, aMin: 0.75, aMax: 1 })
  const spriteS = buildStarSprite(true), spriteG = buildStarSprite(false)
  const rb = rng(818)
  const bright = []
  while (bright.length < 34) {
    const x = rb() * W, y = rb() * H
    if (x > 460 && x < 1460 && y > 130 && y < 880) continue   // keep the type + lockup clear
    if (Math.hypot(x - MOON.x, y - MOON.y) < 150) continue
    bright.push({ x, y, size: 26 + Math.pow(rb(), 2.5) * 110, spike: bright.length < 8, seed: 600 + bright.length, sp: 1.6 + rb() * 3, depth: rb() })
  }
  const vig = canvas(W, H), vx = vig.getContext('2d')
  const vg = vx.createRadialGradient(W / 2, H * 0.48, H * 0.32, W / 2, H * 0.5, H * 1.08)
  vg.addColorStop(0, 'rgba(11,6,32,0)'); vg.addColorStop(0.65, 'rgba(11,6,32,0.35)'); vg.addColorStop(1, 'rgba(8,4,24,0.85)')
  vx.fillStyle = vg; vx.fillRect(0, 0, W, H)
  // indigo pocket behind the type/lockup column (bone holds ≥ 7:1)
  const pocket = canvas(W, H), pk = pocket.getContext('2d')
  pk.save(); pk.translate(W / 2, H / 2); pk.scale(1, 0.62)
  const pg = pk.createRadialGradient(0, 0, 0, 0, 0, 820)
  pg.addColorStop(0, 'rgba(11,6,32,0.62)'); pg.addColorStop(0.6, 'rgba(11,6,32,0.42)'); pg.addColorStop(1, 'rgba(11,6,32,0)')
  pk.fillStyle = pg; pk.fillRect(-1000, -1000, 2000, 2000); pk.restore()

  // pixel twinkles (fx-stars palette), deterministic positions
  const pr = rng(4471), PIXC = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']
  const PIX = []
  while (PIX.length < 26) {
    const x = pr() * W, y = pr() * H
    if (x > 520 && x < 1400 && y > 150 && y < 870) continue
    PIX.push({ x, y, px: pr() < 0.3 ? 4 : 3, col: PIXC[Math.floor(pr() * PIXC.length)], ph: pr() * 6.28, sp: 2 + pr() * 3, kind: Math.floor(pr() * 4), t0: T0 + pr() * 0.9 })
  }

  // ── closing line (per-char spans: typed with an accent shimmer, then a gold wave passes through)
  const lineBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', textAlign: 'center', transformOrigin: '50% 50%', willChange: 'transform' }, root)
  const lineE = el('div', { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontSize: LINE_FS + 'px', lineHeight: '1', whiteSpace: 'pre', color: C.bone,
    textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.7)' }, lineBox)
  const chars = [...LINE].map(ch => el('span', { opacity: 0 }, lineE, ch === ' ' ? ' ' : ch))
  const ACC = [C.rub, C.amber, C.gold, C.plum]

  // ── lockup (S8 recipe): seed-of-life rings + chakra column, wordmark, sub-line
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${MARK_CY + 120}px` })
  const glow = el('div', { position: 'absolute', left: (W / 2 - 520) + 'px', top: (MARK_CY - 380) + 'px', width: '1040px', height: '760px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.34), rgba(154,123,224,0.12) 55%, rgba(11,6,32,0) 100%)' }, lock)
  const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CHK.map((c, i) => `<radialGradient id="f8g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="f8c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px' }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#f8g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#f8c${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  // grain over everything in the scene (type included), then the final black plate
  const grainC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity: 0.5, pointerEvents: 'none' }, root)
  grainC.width = W; grainC.height = H
  const gx = grainC.getContext('2d')
  const grain = buildGrain().map(t => gx.createPattern(t, 'repeat'))
  const black = fill(root, { background: '#000', opacity: 0 })

  const layer = (img, s, dx, dy) => { const w = BGW * s, h = BGH * s; bx.drawImage(img, W / 2 - w / 2 + dx, H / 2 - h / 2 + dy, w, h) }

  return {
    start: T0, end: T1, root,
    update(t) {
      root.style.opacity = String(ease.inOutQuad(prog(t, T0, T0 + 0.2)))
      const k = prog(t, T0, 30)
      const cam = lerp(1.04, 1.1, 0.3 * k + 0.7 * ease.inOutQuad(k))
      // continues f7's tilt-up: the sky is still settling down into place for the first ~0.6s
      const settle = (1 - ease.outCubic(prog(t, T0, T0 + 0.8)))
      const driftX = lerp(-14, 16, k), driftY = lerp(-8, 10, k) - 70 * settle
      const flick = 1 + (noise1(t * 14, 5) - 0.5) * 0.05
      const out = ease.inOutQuad(prog(t, T_OUT, 30.0))

      bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
      bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
      bx.globalAlpha = flick
      layer(neb, cam, driftX * 0.5, driftY * 0.5)
      bx.globalCompositeOperation = 'lighter'
      bx.globalAlpha = 0.9; layer(far, cam, driftX * 0.7, driftY * 0.7)
      bx.globalAlpha = 1; layer(mid, cam * lerp(1, 1.02, k), driftX, driftY)
      layer(near, cam * lerp(1, 1.06, k), driftX * 1.6, driftY * 1.6)
      for (const b of bright) {
        const s = cam * lerp(1, 1.02 + 0.05 * b.depth, k)
        const x = W / 2 + (b.x - W / 2) * s + driftX * (1 + b.depth * 0.6)
        const y = H / 2 + (b.y - H / 2) * s + driftY * (1 + b.depth * 0.6)
        const tw2 = 0.55 + 0.45 * noise1(t * b.sp, b.seed) + 0.25 * Math.max(0, noise1(t * b.sp * 3.1, b.seed + 9) - 0.6)
        const sz = b.size * (0.85 + 0.25 * tw2)
        bx.globalAlpha = clamp(tw2)
        bx.drawImage(b.spike ? spriteS : spriteG, x - sz / 2, y - sz / 2, sz, sz)
      }
      bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
      // the crescent moon (S1's motif) — waxing, it brightens as the lockup completes
      {
        const mb = tw(t, [[29.35, 0], [29.55, 1, ease.outQuad], [29.95, 0.6, ease.inOutQuad]])
        drawMoon(bx, MOON.x + driftX * 1.3, MOON.y + driftY * 1.3, MOON.r * lerp(1, 1.04, k), lerp(0.1, 0.13, k),
          { alpha: ease.inOutQuad(prog(t, T0, T0 + 0.5)), glow: 3.4 + 2.2 * mb, earthshine: 1, darkAlpha: 0.62 })
      }
      // shooting star: a wish crossing the top-left as the line finishes
      {
        const p = prog(t, 28.0, 28.45)
        if (p > 0 && p < 1) {
          const e = ease.inOutQuad(p)
          const x0 = 180, y0 = 96, x1 = 980, y1 = 300
          const hx = lerp(x0, x1, e), hy = lerp(y0, y1, e)
          const tl = 340 * Math.sin(Math.PI * Math.min(1, p * 1.3))
          const ang = Math.atan2(y1 - y0, x1 - x0)
          const a = Math.sin(Math.PI * p)
          const g = bx.createLinearGradient(hx - Math.cos(ang) * tl, hy - Math.sin(ang) * tl, hx, hy)
          g.addColorStop(0, 'rgba(255,226,180,0)'); g.addColorStop(0.7, `rgba(255,232,200,${0.5 * a})`); g.addColorStop(1, `rgba(255,252,244,${a})`)
          bx.strokeStyle = g; bx.lineWidth = 3.2; bx.lineCap = 'round'
          bx.beginPath(); bx.moveTo(hx - Math.cos(ang) * tl, hy - Math.sin(ang) * tl); bx.lineTo(hx, hy); bx.stroke()
          bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = a
          bx.drawImage(spriteS, hx - 30, hy - 30, 60, 60)
          bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
        }
      }
      // pixel twinkles
      bx.imageSmoothingEnabled = false
      const tick = Math.round(t * 30) >> 1
      PIX.forEach((s, i) => {
        const a = ease.outQuad(prog(t, s.t0, s.t0 + 0.3)) * (0.45 + 0.55 * Math.sin(t * s.sp + s.ph))
        if (a <= 0.02) return
        drawPixelStar(bx, s.x + driftX * 1.2, s.y + driftY * 1.2, s.px, (tick + i) % 5 === 0 ? 2 : s.kind, s.col, '#fff3e0', a)
      })
      bx.imageSmoothingEnabled = true
      bx.drawImage(pocket, 0, 0)
      bx.drawImage(vig, 0, 0)

      // ── the line
      const n = chars.length
      chars.forEach((s, i) => {
        const t0 = T_TYPE + i * PER
        const p = prog(t, t0, t0 + FADE)
        // gold wave after typing (left → right)
        const wv = Math.exp(-Math.pow((t - (T_SHIM + i * 0.016)) / 0.09, 2))
        s.style.opacity = String(ease.outQuad(p))
        const base = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
        s.style.color = wv > 0.02 ? mix(p >= 1 ? '#efe6d6' : '#efe6d6', '#ffe6a8', wv) : base
        s.style.textShadow = wv > 0.02 ? `0 0 ${18 * wv}px rgba(242,199,92,${0.8 * wv}), 0 0 30px rgba(11,6,32,0.85)` : ''
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.45))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_FS * 0.55
      lineBox.style.transform = `translateY(${ly}px) scale(${lerp(1, LINE_S1, rise) * lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 1)))})`

      // ── lockup
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.03, T_RINGS + 0.36 + i * 0.03)))))
      const pulse = i => tw(t, [[T_PULSE + i * 0.06, 0], [T_PULSE + 0.07 + i * 0.06, 1, ease.outQuad], [T_PULSE + 0.4 + i * 0.06, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.06 * Math.sin((t - 28.9) * 2.4 - i * 0.5) * prog(t, 28.9, 29.2)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.06, T_DOTS + i * 0.06 + 0.42))
        c.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pulse(i))))
        c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T_DOTS + i * 0.06, T_DOTS + i * 0.06 + 0.3)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, T_RINGS - 0.02, T_RINGS + 0.1))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, T_RINGS, T_RINGS + 0.8)))})`
      const wp = ease.outCubic(prog(t, T_WORD, T_WORD + 0.46))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      const sp = ease.outQuad(prog(t, T_SUB, T_SUB + 0.34))
      sub.style.opacity = String(sp)
      sub.style.letterSpacing = lerp(0.42, 0.32, sp) + 'em'
      const gP = tw(t, [[T_PULSE, 0], [T_PULSE + 0.25, 1, ease.outQuad], [T_PULSE + 0.75, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, T_RINGS, T_RINGS + 0.6)) * (0.85 + 0.15 * Math.sin((t - 28.9) * 1.9)) + 0.4 * gP)
      glow.style.transform = `scale(${1 + 0.06 * gP})`
      lock.style.transform = `scale(${lerp(1, 1.03, ease.inOutQuad(prog(t, T_RINGS, 30)))})`

      // ── grain + fade to black (content dims through 29.5–30.0; plate reaches 1 exactly at 30.0)
      const frame = Math.round(t * 30), gr2 = rng(frame * 7919 + 23)
      const ox = Math.floor(gr2() * GRAIN_TILE), oy = Math.floor(gr2() * GRAIN_TILE)
      gx.setTransform(1, 0, 0, 1, -ox, -oy); gx.fillStyle = grain[frame % GRAIN_N]; gx.fillRect(ox, oy, W, H); gx.setTransform(1, 0, 0, 1, 0, 0)
      black.style.opacity = String(out)
    },
  }
}

export const cues = [
  ['riser', 26.95, 27.3, 0.03],
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.022]).filter(Boolean),  // typing
  ['bell', T_TYPE + 0.02, 587.33, 0.04, 2.6, 0],          // the line arrives (D5)
  ['glitter', T_SHIM, T_SHIM + 0.5],                       // gold shimmer through the words
  ['whoosh', 27.98, 0.5, 0.05],                            // shooting star
  ['bell', 28.24, 1318.51, 0.03, 1.8, 0.35],
  ['whoosh', T_RINGS - 0.05, 0.5, 0.08],                   // rings draw
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.06, f, 0.06, 2.2, (i - 3) * 0.12]),  // chakra chimes bottom→top
  ['boom', T_WORD, 0.22],                                  // wordmark lands
  ['bell', T_WORD + 0.02, 146.83, 0.05, 3.2, 0],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.06, f, 0.022, 1.6, (i - 3) * 0.1]),  // pulse up the column
]
