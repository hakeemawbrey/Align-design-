import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// index.html ships Inter 200/300/400/600 only; weight 500 would silently fall back to 400.
// Register the 500 face locally (shared guard with s2) — document.fonts.ready waits for it.
if (typeof document !== 'undefined' && !window.__inter500) {
  window.__inter500 = new FontFace('Inter', "url(../app/node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2) format('woff2')", { weight: '500' })
  document.fonts.add(window.__inter500); window.__inter500.load().catch(() => {})
}

// ─────────────────────────────────────────────────────────────── S1 · Imagine
// Cinematic deep space with heavy film grain. Everything expensive (nebula, star fields,
// star sprite, vignette, grain tiles) is pre-rendered once at build time; each frame only
// transforms + composites those layers, so every frame stays a pure function of t.
/** typing starts here (sound cue); 37 chars × perChar 0.026 + fade 0.3 → fully typed by ~1.44s */
const TYPE_START = 0.2
const S1_END = 3.55
const GLITCH = [[1.62, 1.72], [2.28, 2.36], [2.72, 2.86]]
const BGW = 2304, BGH = 1296                 // oversized layers (1.2×) so push + parallax never reveal an edge
const NEB_RES = 3                            // nebula field computed at 1/3 res, then upscaled + softened
const GRAIN_N = 6, GRAIN_TILE = 512

// ── deterministic 2D value noise / fbm (local: lib.js only ships 1D noise)
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

/** nebula: domain-warped fbm emission in Align's palette, carved by dark dust lanes, over an indigo void */
function buildNebula() {
  const w = Math.ceil(BGW / NEB_RES), h = Math.ceil(BGH / NEB_RES)
  const lo = canvas(w, h), lx = lo.getContext('2d')
  const id = lx.createImageData(w, h), px = id.data
  const top = hex('#0b0620'), bot = hex('#140a2e')
  const pal = [hex('#9a7be0'), hex('#b45cff'), hex('#e8628a'), hex('#f29a4a')]
  const palAt = (c) => {               // 0..1 → violet → plum → rose → amber
    const x = clamp(c) * (pal.length - 1), i = Math.min(pal.length - 2, Math.floor(x)), f = x - i
    return [0, 1, 2].map(k => pal[i][k] + (pal[i + 1][k] - pal[i][k]) * f)
  }
  for (let y = 0; y < h; y++) {
    const v = y / h
    for (let x = 0; x < w; x++) {
      const u = x / w
      const nx = u * 3.2, ny = v * 1.8
      // domain warp → wispy filaments rather than blobs
      const wx = fbm(nx + 1.7, ny + 9.2, 11, 4), wy = fbm(nx + 8.3, ny + 2.8, 23, 4)
      const qx = nx + 1.9 * wx, qy = ny + 1.9 * wy
      let d = fbm(qx, qy, 37, 6)
      // composition: a broad luminous arc from upper-left down to lower-right, kept off the caption band
      const arc = Math.exp(-Math.pow((v - (0.18 + 0.75 * u * u * 0.9)) / 0.32, 2))
      const lowR = Math.exp(-(Math.pow((u - 0.78) / 0.28, 2) + Math.pow((v - 0.82) / 0.26, 2)))
      const upL = Math.exp(-(Math.pow((u - 0.2) / 0.3, 2) + Math.pow((v - 0.16) / 0.24, 2)))
      const mask = clamp(0.25 + 0.8 * arc + 0.9 * lowR + 0.7 * upL, 0, 1.6)
      let e = smooth(0.42, 0.85, d) * mask
      e = e * e * 1.25 + 0.08 * smooth(0.3, 0.7, d) * mask
      // colour: violet/plum up-left, rose → a touch of amber toward the lower-right core
      const cn = fbm(qx * 0.7 + 4.1, qy * 0.7 + 1.3, 53, 3)
      const col = palAt(clamp(0.1 + 0.55 * u + 0.35 * v + (cn - 0.5) * 0.9) * 0.93)
      // dust lanes: thin dark ridges of a second fbm
      const dn = fbm(qx * 1.6 + 3.3, qy * 1.6 + 7.7, 71, 5)
      const ridge = 1 - Math.abs(dn - 0.5) * 2
      const dust = smooth(0.72, 0.95, ridge) * 0.85
      const k = (1 - dust)
      const o = (y * w + x) * 4
      for (let c = 0; c < 3; c++) {
        const base = top[c] + (bot[c] - top[c]) * v
        px[o + c] = clamp((base * (1 - dust * 0.35) + col[c] * e * 0.95 * k) / 255) * 255
      }
      px[o + 3] = 255
    }
  }
  lx.putImageData(id, 0, 0)
  const neb = canvas(BGW, BGH), nx = neb.getContext('2d')
  nx.imageSmoothingQuality = 'high'
  nx.filter = 'blur(3px)'
  nx.drawImage(lo, 0, 0, BGW, BGH)
  nx.filter = 'none'
  // soft emission cores (screen-blended radial glows)
  const glow = (x, y, r, rgba) => {
    const g = nx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, rgba); g.addColorStop(1, rgba.replace(/[\d.]+\)$/, '0)'))
    nx.fillStyle = g; nx.fillRect(x - r, y - r, 2 * r, 2 * r)
  }
  nx.globalCompositeOperation = 'screen'
  glow(BGW * 0.80, BGH * 0.84, 520, 'rgba(232,98,138,0.22)')
  glow(BGW * 0.86, BGH * 0.90, 260, 'rgba(242,154,74,0.16)')
  glow(BGW * 0.18, BGH * 0.14, 560, 'rgba(154,123,224,0.20)')
  glow(BGW * 0.30, BGH * 0.22, 300, 'rgba(180,92,255,0.12)')
  glow(BGW * 0.62, BGH * 0.12, 380, 'rgba(154,123,224,0.08)')
  // faint galaxy band (diagonal) – a long soft streak
  nx.save(); nx.translate(BGW * 0.5, BGH * 0.5); nx.rotate(-0.42); nx.scale(1, 0.14)
  const gb = nx.createRadialGradient(0, 0, 0, 0, 0, BGW * 0.62)
  gb.addColorStop(0, 'rgba(201,166,255,0.09)'); gb.addColorStop(0.6, 'rgba(154,123,224,0.04)'); gb.addColorStop(1, 'rgba(154,123,224,0)')
  nx.fillStyle = gb; nx.fillRect(-BGW, -BGW, BGW * 2, BGW * 2); nx.restore()
  // hidden seed-of-life: seven hairline circles, barely there (felt more than seen)
  nx.globalCompositeOperation = 'screen'
  nx.strokeStyle = 'rgba(242,199,92,0.045)'; nx.lineWidth = 1.5
  const R = 150, cx = BGW * 0.5, cy = BGH * 0.5
  for (let i = -1; i < 6; i++) {
    const a = i * Math.PI / 3
    nx.beginPath(); nx.arc(cx + (i < 0 ? 0 : R * Math.cos(a)), cy + (i < 0 ? 0 : R * Math.sin(a)), R, 0, Math.PI * 2); nx.stroke()
  }
  nx.globalCompositeOperation = 'source-over'
  return neb
}

/** a star field on a transparent oversized canvas */
function buildStars(n, seed, { rMin, rMax, aMin, aMax, band = 0 }) {
  const c = canvas(BGW, BGH), x = c.getContext('2d')
  const r = rng(seed)
  const tints = ['255,247,236', '239,230,214', '214,222,255', '255,226,236', '255,236,205']
  for (let i = 0; i < n; i++) {
    let sx = r() * BGW, sy = r() * BGH
    if (band && r() < band) {           // cluster along the galaxy band
      const t = r() * 2 - 1, off = (r() + r() + r() - 1.5) * 90
      sx = BGW * 0.5 + t * BGW * 0.6 * Math.cos(-0.42) - off * Math.sin(-0.42)
      sy = BGH * 0.5 + t * BGW * 0.6 * Math.sin(-0.42) + off * Math.cos(-0.42)
    }
    const s = rMin + Math.pow(r(), 2.2) * (rMax - rMin)
    const a = aMin + r() * (aMax - aMin)
    x.fillStyle = `rgba(${tints[Math.floor(r() * tints.length)]},${a})`
    x.beginPath(); x.arc(sx, sy, s, 0, Math.PI * 2); x.fill()
  }
  return c
}

/** bright-star sprite: core + halo + 4-point diffraction spikes (128px) */
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

/** monochrome film-grain tiles: gaussian-ish luma, slightly clumped (blurred) so it reads as silver, not static */
function buildGrain() {
  return Array.from({ length: GRAIN_N }, (_, n) => {
    const raw = canvas(GRAIN_TILE, GRAIN_TILE), rx = raw.getContext('2d')
    const id = rx.createImageData(GRAIN_TILE, GRAIN_TILE), p = id.data, r = rng(9001 + n * 131)
    for (let i = 0; i < p.length; i += 4) {
      const g = (r() + r() + r() + r() - 2) * 0.5            // ~N(0, 0.29)
      const v = clamp(0.5 + g * 1.15) * 255
      p[i] = p[i + 1] = p[i + 2] = v; p[i + 3] = 255
    }
    rx.putImageData(id, 0, 0)
    // tile 3×3 → blur → crop centre so the clumped tile still wraps seamlessly
    const big = canvas(GRAIN_TILE * 3, GRAIN_TILE * 3), bx = big.getContext('2d')
    for (let i = 0; i < 9; i++) bx.drawImage(raw, (i % 3) * GRAIN_TILE, Math.floor(i / 3) * GRAIN_TILE)
    const out = canvas(GRAIN_TILE, GRAIN_TILE), ox = out.getContext('2d')
    ox.filter = 'blur(0.55px) contrast(1.9)'
    ox.drawImage(big, -GRAIN_TILE, -GRAIN_TILE)
    return out
  })
}

export function sceneImagine(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  bgC.width = W; bgC.height = H
  const bx = bgC.getContext('2d')
  const scratch = canvas(W, H), sx = scratch.getContext('2d')

  const neb = buildNebula()
  const far = buildStars(5200, 101, { rMin: 0.35, rMax: 0.9, aMin: 0.18, aMax: 0.6, band: 0.45 })
  const mid = buildStars(1100, 202, { rMin: 0.55, rMax: 1.3, aMin: 0.35, aMax: 0.85 })
  const near = buildStars(160, 303, { rMin: 0.9, rMax: 1.9, aMin: 0.55, aMax: 0.95 })
  const spriteS = buildStarSprite(true), spriteG = buildStarSprite(false)
  const rb = rng(404)
  // bright stars, kept out of the caption band (y 470–610 around x 220–1700)
  const bright = []
  while (bright.length < 26) {
    const x = rb() * W, y = rb() * H
    if (y > 440 && y < 640 && x > 180 && x < 1740) continue
    bright.push({ x, y, size: 26 + Math.pow(rb(), 2.5) * 120, spike: bright.length < 7, seed: 500 + bright.length, sp: 1.6 + rb() * 3, depth: rb() })
  }
  // vignette (indigo, never black) — baked once
  const vig = canvas(W, H), vx = vig.getContext('2d')
  const vg = vx.createRadialGradient(W / 2, H * 0.48, H * 0.32, W / 2, H * 0.5, H * 1.08)
  vg.addColorStop(0, 'rgba(11,6,32,0)'); vg.addColorStop(0.65, 'rgba(11,6,32,0.35)'); vg.addColorStop(1, 'rgba(8,4,24,0.85)')
  vx.fillStyle = vg; vx.fillRect(0, 0, W, H)
  // caption pocket: a very soft indigo darkening so bone text holds ≥4.5:1 even over nebula wisps
  const pocket = canvas(W, H), px2 = pocket.getContext('2d')
  px2.save(); px2.translate(W / 2, H / 2 + 6); px2.scale(1, 0.2)
  const pg = px2.createRadialGradient(0, 0, 0, 0, 0, 1000)
  pg.addColorStop(0, 'rgba(11,6,32,0.55)'); pg.addColorStop(0.7, 'rgba(11,6,32,0.3)'); pg.addColorStop(1, 'rgba(11,6,32,0)')
  px2.fillStyle = pg; px2.fillRect(-1000, -1000, 2000, 2000); px2.restore()

  const line = new TypeLine(root, 'What if the stars chose who you meet?', {
    left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 500, fontSize: '80px', letterSpacing: '-0.018em',
    // soft shadow + the faintest chromatic fringe (filmic softness)
    textShadow: '-0.7px 0 0 rgba(232,98,138,0.32), 0.7px 0 0 rgba(140,170,255,0.28), 0 2px 26px rgba(11,6,32,0.75)',
  }, { perChar: 0.026, fade: 0.3, final: C.bone, accent: [C.rub, C.amber, C.gold, C.plum] })

  // grain sits above everything in the scene (text included), hard-light so it bites into the dark void
  const grainC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'hard-light', opacity: 0.32, pointerEvents: 'none' }, root)
  grainC.width = W; grainC.height = H
  const gx = grainC.getContext('2d')
  const grain = buildGrain().map(t => gx.createPattern(t, 'repeat'))

  const r = rng(7)
  const bandY = Array.from({ length: 7 }, () => r() * H)
  const stripY = Array.from({ length: 5 }, () => [r() * H, 30 + r() * 120])
  const sliceDef = Array.from({ length: 5 }, () => ({ y: 120 + r() * 760, h: 18 + r() * 80, dir: r() < 0.5 ? -1 : 1, amp: 40 + r() * 60 }))

  /** draw an oversized layer scaled about a focus point with a drift offset */
  const layer = (img, s, dx, dy) => {
    const w = BGW * s, h = BGH * s
    bx.drawImage(img, W / 2 - w / 2 + dx, H / 2 - h / 2 + dy, w, h)
  }

  return {
    start: 0, end: S1_END, root,
    update(t) {
      const k = prog(t, 0, S1_END)
      const push = 0.25 * k + 0.75 * ease.inOutQuad(k)      // slow, almost linear dolly
      const cam = lerp(1.0, 1.1, push)
      const driftX = lerp(-18, 22, k), driftY = lerp(10, -12, k)
      const frame = Math.round(t * 30)
      // gentle exposure flicker (film gate) + a short fade-up from the void
      const flick = 1 + (noise1(t * 14, 3) - 0.5) * 0.06
      const fadeUp = lerp(0.35, 1, ease.outCubic(prog(t, 0, 0.45)))

      bx.globalCompositeOperation = 'source-over'
      bx.globalAlpha = 1
      bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
      bx.globalAlpha = fadeUp * flick
      layer(neb, cam * lerp(1, 0.985, k), driftX * 0.5, driftY * 0.5)
      bx.globalCompositeOperation = 'lighter'
      bx.globalAlpha = fadeUp * 0.9
      layer(far, cam * 1.0, driftX * 0.7, driftY * 0.7)
      bx.globalAlpha = fadeUp
      layer(mid, cam * lerp(1, 1.025, k), driftX * 1.0, driftY * 1.0)
      layer(near, cam * lerp(1, 1.07, k), driftX * 1.6, driftY * 1.6)
      // bright stars: placed with the mid/near parallax, twinkling on their own clocks
      for (const b of bright) {
        const s = cam * lerp(1, 1.02 + 0.05 * b.depth, k)
        const x = W / 2 + (b.x - W / 2) * s + driftX * (1 + b.depth * 0.6)
        const y = H / 2 + (b.y - H / 2) * s + driftY * (1 + b.depth * 0.6)
        const tw2 = 0.55 + 0.45 * noise1(t * b.sp, b.seed) + 0.25 * Math.max(0, noise1(t * b.sp * 3.1, b.seed + 9) - 0.6)
        const sz = b.size * (0.85 + 0.25 * tw2)
        bx.globalAlpha = fadeUp * clamp(tw2)
        bx.drawImage(b.spike ? spriteS : spriteG, x - sz / 2, y - sz / 2, sz, sz)
      }
      bx.globalCompositeOperation = 'source-over'
      bx.globalAlpha = 1
      bx.drawImage(pocket, 0, 0)
      bx.drawImage(vig, 0, 0)

      // glitch bursts: displaced slices of the space plate + a chroma-split copy, scan bands, light strips
      const g = GLITCH.find(([a, b2]) => t >= a && t < b2)
      if (g) {
        const gr = rng(frame * 97 + 5)
        sx.globalCompositeOperation = 'copy'; sx.drawImage(bgC, 0, 0)
        sliceDef.forEach((d, i) => {
          const y = d.y + (gr() - 0.5) * 90, h = d.h * (0.6 + gr() * 0.8)
          const off = d.dir * d.amp * (0.5 + gr())
          bx.drawImage(scratch, 0, y, W, h, off, y, W, h)
          if (i % 2 === 0) {      // RGB-ish split on alternating slices
            bx.globalCompositeOperation = 'screen'; bx.globalAlpha = 0.55
            bx.fillStyle = i % 4 ? 'rgba(232,98,138,0.35)' : 'rgba(127,160,255,0.3)'
            bx.fillRect(0, y, W, h)
            bx.drawImage(scratch, 0, y, W, h, off + d.dir * 14, y, W, h)
            bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
          }
        })
        bx.globalCompositeOperation = 'screen'
        bandY.forEach(by => { bx.fillStyle = `rgba(255,247,236,${0.25 + gr() * 0.5})`; bx.fillRect(0, by + (gr() - 0.5) * 30, W, 2) })
        stripY.forEach(([sy, sh]) => { bx.fillStyle = `rgba(255,247,236,${0.05 * gr()})`; bx.fillRect(0, sy, W, sh) })
        bx.globalCompositeOperation = 'source-over'
      }
      // the caption jitters with the glitch too (tiny, horizontal)
      line.root.style.transform = g ? `translate(calc(-50% + ${(rng(frame * 13 + 1)() - 0.5) * 16}px),-50%)` : 'translate(-50%,-50%)'
      line.update(t - TYPE_START)

      // film grain: new tile + random offset every frame
      const gr2 = rng(frame * 7919 + 17)
      const tile = grain[frame % GRAIN_N]
      const ox = Math.floor(gr2() * GRAIN_TILE), oy = Math.floor(gr2() * GRAIN_TILE)
      gx.setTransform(1, 0, 0, 1, -ox, -oy)
      gx.fillStyle = tile
      gx.fillRect(ox, oy, W, H)
      gx.setTransform(1, 0, 0, 1, 0, 0)
    },
  }
}

/** stepped pixel wipe from the top, painted on the fx canvas (S1 → S2) */
export function fxStairWipe(ctx, t, { start, dur, color, seed = 3, size = 48, fromBottom = false }) {
  const p = prog(t, start, start + dur)
  if (p <= 0 || p >= 1) return p >= 1
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const r = rng(seed)
  const jitter = Array.from({ length: cols }, () => r())
  const maxStair = 14
  const front = ease.inOutQuad(p) * (rows + maxStair + 2)
  for (let cx = 0; cx < cols; cx++) {
    const stair = Math.floor(cx / 4) * 1.4 + jitter[cx] * 1.2
    for (let cy = 0; cy < rows; cy++) {
      const row = fromBottom ? rows - 1 - cy : cy
      const d = front - (row + stair)
      if (d <= 0) continue
      if (d < 1.2) {
        const rr = rng(seed * 131 + cx * 977 + cy * 31 + (Math.round(t * 30) >> 1))
        ctx.fillStyle = PIXEL_PALETTE[Math.floor(rr() * PIXEL_PALETTE.length)]
      } else ctx.fillStyle = color
      ctx.fillRect(cx * size, cy * size, size + 0.5, size + 0.5)
    }
  }
  return false
}
