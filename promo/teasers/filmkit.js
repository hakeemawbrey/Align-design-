// Film kit: seamless loops that look like they were cut from the feature film (promo/src/scenes), not like a
// music visualizer. Dark, deep, textured (dust lanes, heavy silver grain), photographic and product-led, restrained.
//
// Clock: LOOP = 10s at 96 bpm (the film's tempo) → 16 beats, 4 bars of 2.5s. EVERYTHING must be a function of
// ph/osc/cyc/kick/bar/sd/near (all periodic in LOOP). No `t * speed` drifts, no Math.random.
//
// Look (all lifted from the film so the loops match it):
//   filmNebula   S1 · domain-warped fbm nebula with dust lanes, 3 star layers + spiked bright stars, indigo vignette,
//                caption pocket, film-gate flicker; camera on a small CLOSED circular pan/zoom path (parallax per layer)
//   filmGrain    S1 · clumped monochrome silver grain, overlay, new tile + offset every frame (repeats each loop),
//                sits above EVERYTHING (z 1100, over the #fx canvas) like the film
//   auroraSky    S7 · aurora-mood space + indigo core + galaxy arc + curtain of light rays with a wavy hem, periodic sway
//   portraitStar S7 · ringed aura portrait (bone ring, soft halo), constellation hairline + pixel sparkles
//   chakraStar / chakraBeam   S3 · the seven chakra stars (glow, diffraction spikes, white core) + logo column beam
//   filmPixelStars fx-stars · pixel-sprite star field, periodic twinkle/flash, keep-out rects
//   shootingStar fx-stars · gradient streak + pixel head + crumbs (fires once in a window)
//   drawMoon     fx-moon · realistic moon (re-exported from kit.js)
//   filmMusic / filmCues   the film score: soft detuned-saw pad Dmaj9 · Bm9 · Gmaj7 · A add9 (one per bar),
//                sub pulse at 96 bpm, gentle bells + glitter, NO hats
export * from './kit.js'
import { makeClock, LOOP_CHORDS } from './loopkit.js'
import { clamp, lerp, prog, ease, rng, el } from '../src/lib.js'
import { W, H, img } from '../src/scenes/common.js'
import { pixelStar, BONE, GOLD, VIOLET, ROSE, HOT, CHAKRAS } from './kit.js'

// ── clock ─────────────────────────────────────────────────────────────────────────────────────────
export const { LOOP, BPM, BEAT, BAR, ph, osc, cyc, kick, bar, chordIx } = makeClock(10, 96)
/** signed circular distance (seconds) from loop time `at` to t, in (−LOOP/2, LOOP/2] */
export const sd = (t, at = 0) => { const d = (((t - at) % LOOP) + LOOP) % LOOP; return d > LOOP / 2 ? d - LOOP : d }
/** periodic gaussian bump (1 at `at`, width w seconds) */
export const near = (t, at, w) => Math.exp(-((sd(t, at) / w) ** 2))
/** loop frame index (30 fps), repeats every loop */
export const loopFrame = (t) => ((Math.round(t * 30) % Math.round(LOOP * 30)) + Math.round(LOOP * 30)) % Math.round(LOOP * 30)
export const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k) }

// ── music (film score preset) ─────────────────────────────────────────────────────────────────────
export const FILM_CHORDS = LOOP_CHORDS   // Dmaj9 · Bm9 · Gmaj7 · A add9 — the film's progression
/** film-score music block for a loop: pad one chord per bar, soft sub pulse on every beat, no hats */
export const filmMusic = (o = {}) => ({ chords: FILM_CHORDS.map((c, i) => [i * BAR, (i + 1) * BAR, c]), bpm: BPM, padGain: 0.026, pulseGain: 0.17, hats: false, ...o })
/** gentle bells on each bar (top voice of the chord), optional glitter windows (must sit inside [0, LOOP)) */
export function filmCues({ bells = true, gain = 0.022, glitter = [], extra = [] } = {}) {
  const TOP = [[739.99, 1108.73], [554.37, 739.99], [587.33, 987.77], [659.25, 880]]
  const out = []
  if (bells) TOP.forEach(([a, b], i) => { out.push(['bell', i * BAR + 0.02, a, gain, 2.2, -0.25]); out.push(['bell', i * BAR + BEAT * 2 + 0.02, b, gain * 0.6, 1.8, 0.3]) })
  glitter.forEach(([a, b]) => out.push(['glitter', a, b]))
  return [...out, ...extra]
}

// ── tiny canvas helpers ───────────────────────────────────────────────────────────────────────────
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
export const rgbOf = hex
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

// ══ S1 nebula ═════════════════════════════════════════════════════════════════════════════════════
const BGW = Math.round(W * 1.2), BGH = Math.round(H * 1.2)
const BAND_A = H > W ? -1.05 : -0.42
const nebCache = new Map()
/** S1's nebula (vertical composition), `shift` moves the noise domain for a different cloudscape */
function buildNebula(shift = [0, 0], tint = 0) {
  const key = shift.join(',') + '|' + tint
  if (nebCache.has(key)) return nebCache.get(key)
  const NEB_RES = 2
  const w = Math.ceil(BGW / NEB_RES), h = Math.ceil(BGH / NEB_RES)
  const lo = canvas(w, h), lx = lo.getContext('2d')
  const id = lx.createImageData(w, h), px = id.data
  const top = hex('#0b0620'), bot = hex('#140a2e')
  const pal = [hex('#9a7be0'), hex('#b45cff'), hex('#e8628a'), hex('#f29a4a')]
  const palAt = (c) => { const x = clamp(c) * (pal.length - 1), i = Math.min(pal.length - 2, Math.floor(x)), f = x - i; return [0, 1, 2].map(k => pal[i][k] + (pal[i + 1][k] - pal[i][k]) * f) }
  for (let y = 0; y < h; y++) {
    const v = y / h
    for (let x = 0; x < w; x++) {
      const u = x / w
      const nx = u * 2.6 + shift[0], ny = v * 4.6 + shift[1]
      const wx = fbm(nx + 1.7, ny + 9.2, 11, 4), wy = fbm(nx + 8.3, ny + 2.8, 23, 4)
      const qx = nx + 2.4 * wx, qy = ny + 2.4 * wy
      const d = fbm(qx, qy, 37, 6)
      const arc = Math.exp(-Math.pow((u - (0.12 + 0.8 * v * v * 0.95)) / 0.3, 2))
      const lowR = Math.exp(-(Math.pow((u - 0.74) / 0.34, 2) + Math.pow((v - 0.84) / 0.2, 2)))
      const upL = Math.exp(-(Math.pow((u - 0.24) / 0.36, 2) + Math.pow((v - 0.15) / 0.18, 2)))
      const mask = clamp(0.08 + 0.85 * arc + 1.1 * lowR + 0.8 * upL, 0, 1.7)
      const fr = 1 - Math.abs(fbm(qx * 2.1 + 5.5, qy * 2.1 + 0.7, 89, 5) - 0.5) * 2
      const cloud = smooth(0.4, 0.82, d)
      let e = mask * (0.55 * cloud * cloud + 0.75 * Math.pow(fr, 7) * smooth(0.3, 0.7, d) + 0.06 * smooth(0.25, 0.6, d))
      e = 1 - Math.exp(-e * 1.8)
      const cn = fbm(qx * 0.7 + 4.1, qy * 0.7 + 1.3, 53, 3)
      const col = palAt(clamp(0.05 + 0.6 * u + 0.45 * v + (cn - 0.5) * 1.2 + tint) * 0.9)
      const dn = fbm(qx * 1.6 + 3.3, qy * 1.6 + 7.7, 71, 5)
      const dust = smooth(0.66, 0.95, 1 - Math.abs(dn - 0.5) * 2) * 0.95
      const k = 1 - dust, o = (y * w + x) * 4
      for (let c = 0; c < 3; c++) px[o + c] = clamp(((top[c] + (bot[c] - top[c]) * v) * (1 - dust * 0.35) + col[c] * e * 0.78 * k) / 255) * 255
      px[o + 3] = 255
    }
  }
  lx.putImageData(id, 0, 0)
  const neb = canvas(BGW, BGH), nx = neb.getContext('2d')
  nx.imageSmoothingQuality = 'high'
  nx.filter = 'blur(1.2px)'; nx.drawImage(lo, 0, 0, BGW, BGH); nx.filter = 'none'
  const bl = canvas(BGW / 4, BGH / 4), blx = bl.getContext('2d')
  blx.filter = 'blur(10px)'; blx.drawImage(neb, 0, 0, BGW / 4, BGH / 4)
  nx.globalCompositeOperation = 'screen'; nx.globalAlpha = 0.42; nx.drawImage(bl, 0, 0, BGW, BGH)
  nx.globalAlpha = 1
  const glow = (x, y, r, rgba) => { const g = nx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba); g.addColorStop(1, rgba.replace(/[\d.]+\)$/, '0)')); nx.fillStyle = g; nx.fillRect(x - r, y - r, 2 * r, 2 * r) }
  glow(BGW * 0.80, BGH * 0.84, 520, 'rgba(232,98,138,0.26)')
  glow(BGW * 0.86, BGH * 0.90, 260, 'rgba(242,154,74,0.2)')
  glow(BGW * 0.18, BGH * 0.14, 560, 'rgba(154,123,224,0.20)')
  glow(BGW * 0.30, BGH * 0.22, 300, 'rgba(180,92,255,0.12)')
  glow(BGW * 0.62, BGH * 0.12, 380, 'rgba(154,123,224,0.08)')
  const GL = Math.max(BGW, BGH)
  nx.save(); nx.translate(BGW * 0.5, BGH * 0.5); nx.rotate(BAND_A); nx.scale(1, 0.14)
  const gb = nx.createRadialGradient(0, 0, 0, 0, 0, GL * 0.62)
  gb.addColorStop(0, 'rgba(201,166,255,0.09)'); gb.addColorStop(0.6, 'rgba(154,123,224,0.04)'); gb.addColorStop(1, 'rgba(154,123,224,0)')
  nx.fillStyle = gb; nx.fillRect(-GL, -GL, GL * 2, GL * 2); nx.restore()
  nx.globalCompositeOperation = 'source-over'
  nebCache.set(key, neb)
  return neb
}
function buildStars(n, seed, { rMin, rMax, aMin, aMax, band = 0 }) {
  const c = canvas(BGW, BGH), x = c.getContext('2d'), r = rng(seed)
  const tints = ['255,247,236', '239,230,214', '214,222,255', '255,226,236', '255,236,205']
  for (let i = 0; i < n; i++) {
    let sx = r() * BGW, sy = r() * BGH
    if (band && r() < band) {
      const tt = r() * 2 - 1, off = (r() + r() + r() - 1.5) * 90, GL = Math.max(BGW, BGH)
      sx = BGW * 0.5 + tt * GL * 0.6 * Math.cos(BAND_A) - off * Math.sin(BAND_A)
      sy = BGH * 0.5 + tt * GL * 0.6 * Math.sin(BAND_A) + off * Math.cos(BAND_A)
    }
    const s = rMin + Math.pow(r(), 2.2) * (rMax - rMin), a = aMin + r() * (aMax - aMin)
    x.fillStyle = `rgba(${tints[Math.floor(r() * tints.length)]},${a})`
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
      const L = m * len, lg = x.createLinearGradient(m - dx * L, m - dy * L, m + dx * L, m + dy * L)
      lg.addColorStop(0, 'rgba(255,240,230,0)'); lg.addColorStop(0.5, `rgba(255,244,236,${len > 0.5 ? 0.7 : 0.3})`); lg.addColorStop(1, 'rgba(255,240,230,0)')
      x.strokeStyle = lg; x.lineWidth = len > 0.5 ? 1.6 : 1
      x.beginPath(); x.moveTo(m - dx * L, m - dy * L); x.lineTo(m + dx * L, m + dy * L); x.stroke()
    }
  }
  return c
}
/** soft dark ellipse so bone type holds over the clouds; {x, y, rx, ry, a} */
function pocketCanvas({ x = W / 2, y = H / 2, rx = 670, ry = 300, a = 0.55 }) {
  const c = canvas(W, H), g = c.getContext('2d')
  g.save(); g.translate(x, y); g.scale(rx / 1000, ry / 1000)
  const pg = g.createRadialGradient(0, 0, 0, 0, 0, 1000)
  pg.addColorStop(0, `rgba(11,6,32,${a})`); pg.addColorStop(0.7, `rgba(11,6,32,${a * 0.55})`); pg.addColorStop(1, 'rgba(11,6,32,0)')
  g.fillStyle = pg; g.fillRect(-1000, -1000, 2000, 2000); g.restore()
  return c
}
/**
 * filmNebula(parent, opts) → { root, update(t), cam(t) } — the S1 deep-space plate as a seamless loop.
 * opts: shift [dx,dy] noise-domain offset · tint colour bias · exposure (nebula brightness) · drift [px,py] radius of the
 *       closed camera circle · zoom amplitude · baseZoom · cycles (camera laps per loop) · bright (spiked star count) ·
 *       keep [[x,y,w,h]] no bright stars there · pockets [{x,y,rx,ry,a}] · vignette
 * cam(t) → { s, dx, dy } so foreground objects (moon) can ride the same camera with their own parallax.
 */
export function filmNebula(parent, { shift = [0, 0], tint = 0, exposure = 1, drift = [26, 18], zoom = 0.018, baseZoom = 1.06, cycles = 1, bright = 40, keep = [], pockets = [], vignette = true, seed = 404, starAlpha = 1 } = {}) {
  const bgC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, parent)
  bgC.width = W; bgC.height = H
  const bx = bgC.getContext('2d')
  const neb = buildNebula(shift, tint)
  const far = buildStars(9000, 101 + seed, { rMin: 0.45, rMax: 1.0, aMin: 0.3, aMax: 0.8, band: 0.45 })
  const mid = buildStars(1900, 202 + seed, { rMin: 0.7, rMax: 1.5, aMin: 0.5, aMax: 1 })
  const nearS = buildStars(180, 303 + seed, { rMin: 1.1, rMax: 2.2, aMin: 0.75, aMax: 1 })
  const spriteS = buildStarSprite(true), spriteG = buildStarSprite(false)
  const rb = rng(seed)
  const inKeep = (x, y) => keep.some(([kx, ky, kw, kh]) => x > kx && x < kx + kw && y > ky && y < ky + kh)
  const B = []
  for (let guard = 0; B.length < bright && guard < 4000; guard++) {
    const x = rb() * W, y = rb() * H
    if (inKeep(x, y)) continue
    B.push({ x, y, size: 26 + Math.pow(rb(), 2.5) * 120, spike: B.length < 9, n1: 1 + Math.floor(rb() * 4), o1: rb(), n2: 5 + Math.floor(rb() * 9), o2: rb(), depth: rb() })
  }
  let vig = null
  if (vignette) {
    vig = canvas(W, H); const vx = vig.getContext('2d')
    const vg = vx.createRadialGradient(W / 2, H * 0.48, W * 0.42, W / 2, H * 0.5, H * 0.72)
    vg.addColorStop(0, 'rgba(11,6,32,0)'); vg.addColorStop(0.65, 'rgba(11,6,32,0.35)'); vg.addColorStop(1, 'rgba(8,4,24,0.85)')
    vx.fillStyle = vg; vx.fillRect(0, 0, W, H)
  }
  const pk = pockets.map(pocketCanvas)
  const cam = (t) => {
    const a = 2 * Math.PI * cycles * ph(t)
    return { s: baseZoom + zoom * Math.sin(a + 0.6), dx: drift[0] * Math.cos(a), dy: drift[1] * Math.sin(a) }
  }
  const layer = (im, s, dx, dy) => { const w = BGW * s, h = BGH * s; bx.drawImage(im, W / 2 - w / 2 + dx, H / 2 - h / 2 + dy, w, h) }
  return {
    root: bgC, cam,
    update(t) {
      const { s, dx, dy } = cam(t)
      // film-gate exposure flicker, periodic (integer cycles per loop)
      const flick = 1 + 0.03 * (0.5 * osc(t, 37, 0.1) + 0.3 * osc(t, 53, 0.7) + 0.2 * osc(t, 71, 0.3))
      bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
      bx.fillStyle = '#0b0620'; bx.fillRect(0, 0, W, H)
      bx.globalAlpha = clamp(exposure * flick, 0, 1)
      layer(neb, s * 0.995, dx * 0.5, dy * 0.5)
      if (exposure > 1) { bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = exposure - 1; layer(neb, s * 0.995, dx * 0.5, dy * 0.5) }
      bx.globalCompositeOperation = 'lighter'
      bx.globalAlpha = 0.9 * starAlpha; layer(far, s, dx * 0.7, dy * 0.7)
      bx.globalAlpha = starAlpha
      layer(mid, s * 1.012, dx, dy)
      layer(nearS, s * 1.035, dx * 1.6, dy * 1.6)
      for (const b of B) {
        const ss = s * (1.02 + 0.03 * b.depth)
        const x = W / 2 + (b.x - W / 2) * ss + dx * (1 + b.depth * 0.6), y = H / 2 + (b.y - H / 2) * ss + dy * (1 + b.depth * 0.6)
        const tw2 = 0.55 + 0.45 * (0.5 + 0.5 * osc(t, b.n1, b.o1)) + 0.25 * Math.max(0, osc(t, b.n2, b.o2) - 0.6)
        const sz = b.size * (0.85 + 0.25 * tw2)
        bx.globalAlpha = starAlpha * clamp(tw2)
        bx.drawImage(b.spike ? spriteS : spriteG, x - sz / 2, y - sz / 2, sz, sz)
      }
      bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
      for (const p of pk) bx.drawImage(p, 0, 0)
      if (vig) bx.drawImage(vig, 0, 0)
    },
  }
}

// ══ S1 film grain ═════════════════════════════════════════════════════════════════════════════════
const GRAIN_N = 6, GRAIN_TILE = 512
let GRAIN = null
function buildGrain() {
  if (GRAIN) return GRAIN
  const noiseTile = (S, seed, mean, amp) => {
    const c = canvas(S, S), x = c.getContext('2d'), id = x.createImageData(S, S), p = id.data, r = rng(seed)
    for (let i = 0; i < p.length; i += 4) { const g = (r() + r() + r() + r() - 2) * 0.5; p[i] = p[i + 1] = p[i + 2] = clamp(mean + g * amp) * 255; p[i + 3] = 255 }
    x.putImageData(id, 0, 0); return c
  }
  const wrapDraw = (dst, src, filter, alpha = 1) => {
    const T = GRAIN_TILE, big = canvas(T * 3, T * 3), bx = big.getContext('2d')
    bx.imageSmoothingQuality = 'high'
    for (let i = 0; i < 9; i++) bx.drawImage(src, (i % 3) * T, Math.floor(i / 3) * T, T, T)
    const dx = dst.getContext('2d'); dx.filter = filter; dx.globalAlpha = alpha
    dx.drawImage(big, -T, -T); dx.filter = 'none'; dx.globalAlpha = 1
  }
  GRAIN = Array.from({ length: GRAIN_N }, (_, n) => {
    const out = canvas(GRAIN_TILE, GRAIN_TILE)
    wrapDraw(out, noiseTile(GRAIN_TILE / 2, 9001 + n * 131, 0.46, 1.3), 'blur(0.5px) contrast(1.5)')
    wrapDraw(out, noiseTile(GRAIN_TILE, 7001 + n * 97, 0.46, 1.0), 'blur(0.35px)', 0.4)
    return out
  })
  return GRAIN
}
/** filmGrain(parent, { opacity }) → { root, update(t) } — put it last; z-index lifts it over the #fx canvas */
export function filmGrain(parent, { opacity = 0.8, z = 1100 } = {}) {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', opacity, pointerEvents: 'none', zIndex: String(z) }, parent)
  c.width = W; c.height = H
  const g = c.getContext('2d')
  const pats = buildGrain().map(tl => g.createPattern(tl, 'repeat'))
  return {
    root: c,
    update(t) {
      const f = loopFrame(t), r = rng(f * 7919 + 17)
      const ox = Math.floor(r() * GRAIN_TILE), oy = Math.floor(r() * GRAIN_TILE)
      g.setTransform(1, 0, 0, 1, -ox, -oy); g.fillStyle = pats[f % GRAIN_N]; g.fillRect(ox, oy, W, H); g.setTransform(1, 0, 0, 1, 0, 0)
    },
  }
}

// ══ S7 aurora sky ═════════════════════════════════════════════════════════════════════════════════
/**
 * auroraSky(parent, opts) → { root, update(t) } — S7's night sky: aurora-mood space (blobs on closed paths), an
 * indigo core, the galaxy arc over the top, and the aurora curtain of light rays hanging from a wavy hem.
 * opts: hem (0..1 of H) · rays · scrim [w,h] dark ellipse at the centre for type · arcOpacity · curtain (0..1)
 */
export function auroraSky(parent, { hem = 0.68, rays = 140, scrim = [1060, 600], scrimY = H / 2, arcOpacity = 0.85, curtain = 1, seed = 7 } = {}) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', background: 'linear-gradient(180deg, #0d0626 0%, #24103f 100%)' }, parent)
  const BL = [[232, 98, 138, 0.55, 0.70, 980, 0.62], [180, 92, 255, 0.20, 0.35, 900, 0.58], [154, 123, 224, 0.85, 0.30, 800, 0.50], [242, 154, 74, 0.18, 0.98, 640, 0.30], [255, 143, 177, 0.78, 0.95, 560, 0.34]]
  const r0 = rng(seed * 31 + 7)
  const bs = BL.map(([cr, cg, cb, x, y, rad, a]) => ({ x, y, rad, off: r0(), e: el('div', { position: 'absolute', width: rad * 2 + 'px', height: rad * 2 + 'px', borderRadius: '50%', mixBlendMode: 'screen',
    background: `radial-gradient(closest-side, rgba(${cr},${cg},${cb},${a}), rgba(${cr},${cg},${cb},${a * 0.42}) 45%, rgba(${cr},${cg},${cb},0) 100%)` }, root) }))
  const starC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  starC.width = W; starC.height = H
  { const g = starC.getContext('2d'), r = rng(seed * 13 + 5); for (let i = 0; i < 190; i++) { const x = r() * W, y = r() * H, s = r() * 1.6 + 0.3; g.fillStyle = `rgba(255,247,236,${0.2 + r() * 0.6})`; g.beginPath(); g.arc(x, y, s, 0, 6.283); g.fill() } }
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(120% 95% at 50% 50%, rgba(11,6,32,0) 55%, rgba(11,6,32,0.6) 100%)' }, root)
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(70% 62% at 50% 44%, rgba(9,4,26,0.72) 0%, rgba(9,4,26,0.5) 55%, rgba(9,4,26,0.12) 100%)' }, root)
  // galaxy arc (prerendered, S7 recipe)
  const GA = el('canvas', { position: 'absolute', left: '-240px', top: '-240px', width: (W + 480) + 'px', height: (H + 480) + 'px', mixBlendMode: 'screen', transformOrigin: '50% 50%', opacity: arcOpacity }, root)
  GA.width = W + 480; GA.height = H + 480
  {
    const g = GA.getContext('2d'), r = rng(7707)
    const gx = (W + 480) * 0.62, gy = (H + 480) * 0.86, RX = 1050, RY = 1250, ROT = -0.22
    const at = (a, off) => { const x = Math.cos(a) * (RX + off), y = Math.sin(a) * (RY + off * 0.5); return [gx + x * Math.cos(ROT) - y * Math.sin(ROT), gy + x * Math.sin(ROT) + y * Math.cos(ROT)] }
    const A0 = Math.PI * 1.06, A1 = Math.PI * 1.94
    for (let k = 0; k < 340; k++) {
      const u = k / 339, a = lerp(A0, A1, u), fade = Math.sin(Math.PI * u)
      const [x, y] = at(a, (r() - 0.5) * 70)
      const col = u < 0.5 ? [lerp(242, 232, u * 2), lerp(170, 98, u * 2), lerp(120, 160, u * 2)] : [lerp(232, 170, u * 2 - 1), lerp(98, 120, u * 2 - 1), lerp(160, 255, u * 2 - 1)]
      const rad = 90 + r() * 70, gr = g.createRadialGradient(x, y, 0, x, y, rad)
      gr.addColorStop(0, `rgba(${col.map(Math.round)},${0.085 * fade})`); gr.addColorStop(1, `rgba(${col.map(Math.round)},0)`)
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, rad, 0, 6.29); g.fill()
    }
    for (let k = 0; k < 1400; k++) {
      const u = r(), a = lerp(A0, A1, u), fade = Math.sin(Math.PI * u), off = (r() + r() + r() - 1.5) * 120
      const [x, y] = at(a, off), s = r() < 0.06 ? 1.6 : 0.4 + r() * 0.8
      g.fillStyle = `rgba(255,244,230,${(0.18 + r() * 0.55) * fade * (1 - Math.abs(off) / 220)})`
      g.beginPath(); g.arc(x, y, s, 0, 6.29); g.fill()
    }
  }
  // aurora curtain (half-res, blurred, screen)
  const AU = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'screen', filter: 'blur(3px)' }, root)
  AU.width = W / 2; AU.height = H / 2
  const au = AU.getContext('2d')
  const ar = rng(7171), RAYS = Array.from({ length: rays }, (_, k) => ({ u: (k + ar()) / rays, h: 0.55 + ar() * 0.7, a: 0.35 + ar() * 0.65, ph: ar(), n: 1 + Math.floor(ar() * 3) }))
  const hemAt = (u, t) => AU.height * (hem + 0.07 * Math.sin(u * 5.2 + 2 * Math.PI * ph(t)) + 0.035 * Math.sin(u * 13 - 2 * Math.PI * 2 * ph(t)))
  function drawAurora(t) {
    au.clearRect(0, 0, AU.width, AU.height)
    const w = AU.width, hh = AU.height, k = curtain
    au.globalCompositeOperation = 'lighter'
    for (const r of RAYS) {
      const x = r.u * w, hm = hemAt(r.u, t)
      const env = Math.pow(Math.sin(Math.PI * clamp(r.u * 1.08 - 0.04, 0, 1)), 0.7)
      const fl = r.a * (0.55 + 0.45 * osc(t, r.n, r.ph)) * env * k
      const len = hh * 0.42 * r.h * (0.85 + 0.15 * osc(t, 1, r.ph))
      const warm = clamp(1 - r.u * 3.2, 0, 1)
      const c0 = warm > 0 ? `${Math.round(lerp(232, 242, warm))},${Math.round(lerp(98, 154, warm))},${Math.round(lerp(138, 74, warm))}` : '232,98,138'
      const g = au.createLinearGradient(0, hm, 0, hm - len)
      g.addColorStop(0, 'rgba(255,214,226,0)'); g.addColorStop(0.03, `rgba(255,190,214,${0.5 * fl})`)
      g.addColorStop(0.1, `rgba(${c0},${0.6 * fl})`); g.addColorStop(0.42, `rgba(190,96,240,${0.26 * fl})`); g.addColorStop(1, 'rgba(140,90,255,0)')
      au.fillStyle = g; au.fillRect(x - 2.2, hm - len, 4.4, len + 2)
    }
    au.beginPath()
    for (let i = 0; i <= 96; i++) { const u = i / 96; i ? au.lineTo(u * w, hemAt(u, t)) : au.moveTo(0, hemAt(0, t)) }
    const hg = au.createLinearGradient(0, 0, w, 0)
    hg.addColorStop(0, 'rgba(242,154,74,0)'); hg.addColorStop(0.18, `rgba(242,154,74,${0.4 * k})`); hg.addColorStop(0.5, `rgba(255,130,180,${0.5 * k})`)
    hg.addColorStop(0.85, `rgba(190,110,255,${0.4 * k})`); hg.addColorStop(1, 'rgba(190,110,255,0)')
    au.strokeStyle = hg; au.lineWidth = 3; au.shadowColor = `rgba(255,120,180,${0.8 * k})`; au.shadowBlur = 14
    au.stroke(); au.shadowBlur = 0; au.globalCompositeOperation = 'source-over'
  }
  // settled bloom from S7's entrance
  const BLOOM = [{ c: '232,98,138', x: 0.30, r: 760, a: 0.7, y1: 1.12 }, { c: '180,92,255', x: 0.70, r: 820, a: 0.7, y1: 1.10 }, { c: '242,154,74', x: 0.52, r: 560, a: 0.5, y1: 1.2 }]
    .map((b, i) => ({ ...b, i, e: el('div', { position: 'absolute', width: b.r * 2 + 'px', height: b.r * 2 + 'px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0.32,
      background: `radial-gradient(closest-side, rgba(${b.c},${b.a}), rgba(${b.c},${b.a * 0.4}) 48%, rgba(${b.c},0) 100%)` }, root) }))
  if (scrim) el('div', { position: 'absolute', left: (W / 2 - scrim[0] / 2) + 'px', top: (scrimY - scrim[1] / 2) + 'px', width: scrim[0] + 'px', height: scrim[1] + 'px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.55), rgba(11,6,32,0.38) 45%, rgba(11,6,32,0.12) 75%, rgba(11,6,32,0) 100%)' }, root)
  return {
    root,
    update(t) {
      const p = ph(t)
      bs.forEach(b => { const a = 2 * Math.PI * (p + b.off); b.e.style.transform = `translate(${b.x * W + Math.cos(a) * 70 - b.rad}px, ${b.y * H + Math.sin(a) * 45 - b.rad}px)` })
      starC.style.transform = `translate(${6 * Math.cos(2 * Math.PI * p)}px, ${6 * Math.sin(2 * Math.PI * p)}px)`
      GA.style.transform = `rotate(${1.4 * osc(t, 1)}deg) translateY(${8 * osc(t, 1, 0.25)}px)`
      drawAurora(t)
      BLOOM.forEach(b => {
        const y = b.y1 * H - b.r + osc(t, 1, b.i * 0.3) * 30, x = b.x * W - b.r + osc(t, 1, 0.25 + b.i * 0.2) * 70
        b.e.style.transform = `translate(${x}px, ${y}px)`
      })
    },
  }
}

// ══ S7 portraits + constellation ══════════════════════════════════════════════════════════════════
/** ringed aura portrait (S7): halo + photo disc with a bone ring. Returns { g, glow, set({x,y,d,s,op,glow}) } */
export function portraitStar(parent, src, { objectPosition = '50% 40%' } = {}) {
  const g = el('div', { position: 'absolute', left: 0, top: 0, width: '100px', height: '100px', marginLeft: '-50px', marginTop: '-50px', borderRadius: '50%', willChange: 'transform' }, parent)
  const glow = el('div', { position: 'absolute', inset: '-38%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,246,234,0.85), rgba(214,190,255,0.45) 45%, rgba(214,190,255,0) 100%)' }, g)
  const disc = el('div', { position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', background: '#140a2e', boxShadow: '0 10px 26px rgba(4,2,14,0.55), 0 0 0 1.5px rgba(239,230,214,0.95), 0 0 0 4px rgba(239,230,214,0.18)' }, g)
  img(disc, src, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition, transform: 'scale(1.28)', transformOrigin: '50% 42%' })
  return {
    g, glow,
    set({ x, y, d, s = 1, op = 1, glow: gl = 0.5 }) {
      g.style.opacity = String(op)
      g.style.transform = `translate(${x}px, ${y}px) scale(${s * d / 100})`
      glow.style.opacity = String(gl)
    },
  }
}
/** S7's pixel sparkle: a plus of square pixels (big adds the outer arms) */
export function pixSpark(ctx, x, y, u, a, col = '255,250,242', big = false) {
  if (a <= 0.003) return
  x = Math.round(x); y = Math.round(y)
  ctx.fillStyle = `rgba(${col},${a})`; ctx.fillRect(x - u / 2, y - u / 2, u, u)
  ctx.fillStyle = `rgba(${col},${a * 0.75})`
  ctx.fillRect(x - u / 2, y - u * 1.5, u, u); ctx.fillRect(x - u / 2, y + u / 2, u, u); ctx.fillRect(x - u * 1.5, y - u / 2, u, u); ctx.fillRect(x + u / 2, y - u / 2, u, u)
  if (big) {
    ctx.fillStyle = `rgba(${col},${a * 0.4})`
    ctx.fillRect(x - u / 2, y - u * 2.5, u, u); ctx.fillRect(x - u / 2, y + u * 1.5, u, u); ctx.fillRect(x - u * 2.5, y - u / 2, u, u); ctx.fillRect(x + u * 1.5, y - u / 2, u, u)
  }
}
/**
 * constellation hairline from A to B (S7): indigo underlay + bone hairline, drawn to fraction `p` from `from`
 * (0 = A→B grows from A; retracting uses `from` > 0 so the line leaves A first). ra/rb keep clear of portraits.
 * Returns the head point.
 */
export function hairline(ctx, A, B, from, to, { ra = 0, rb = 0, alpha = 1 } = {}) {
  const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L
  const span = Math.max(0, L - ra - rb)
  const x0 = A.x + ux * (ra + span * from), y0 = A.y + uy * (ra + span * from)
  const x1 = A.x + ux * (ra + span * to), y1 = A.y + uy * (ra + span * to)
  if (to - from > 0.001) {
    ctx.lineCap = 'round'
    ctx.strokeStyle = `rgba(8,4,24,${0.32 * alpha})`; ctx.lineWidth = 5
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
    ctx.strokeStyle = `rgba(255,248,236,${0.96 * alpha})`; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
  }
  return { x: x1, y: y1, end: { x: A.x + ux * (ra + span), y: A.y + uy * (ra + span) } }
}

// ══ S3 chakra stars + logo column ═════════════════════════════════════════════════════════════════
export const CHAKRA_RGB = CHAKRAS.map(hex)
/** one chakra star as in S3: coloured glow, diffraction spikes, white-hot core. s = size, spike = spike length px */
export function chakraStar(ctx, x, y, i, { s = 1, alpha = 1, spike = 30 } = {}) {
  const rgb = CHAKRA_RGB[i].join(',')
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const G = 46 * s, gg = ctx.createRadialGradient(x, y, 0, x, y, G)
  gg.addColorStop(0, `rgba(${rgb},${0.75 * alpha})`); gg.addColorStop(0.3, `rgba(${rgb},${0.28 * alpha})`); gg.addColorStop(1, `rgba(${rgb},0)`)
  ctx.fillStyle = gg; ctx.fillRect(x - G, y - G, G * 2, G * 2)
  ctx.strokeStyle = `rgba(255,250,240,${(0.55 * alpha).toFixed(3)})`; ctx.lineWidth = 1.4
  ctx.beginPath(); ctx.moveTo(x - spike, y); ctx.lineTo(x + spike, y); ctx.moveTo(x, y - spike * 0.7); ctx.lineTo(x, y + spike * 0.7); ctx.stroke()
  const cg = ctx.createRadialGradient(x, y, 0, x, y, 10 * s)
  cg.addColorStop(0, `rgba(255,255,255,${alpha})`); cg.addColorStop(0.45, `rgba(${rgb},${0.9 * alpha})`); cg.addColorStop(1, `rgba(${rgb},0)`)
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, 10 * s, 0, 6.2832); ctx.fill()
  ctx.restore()
}
/** the logo's column glow: a soft bone beam through x from y0 to y1 + hairlines between the given points */
export function chakraBeam(ctx, x, y0, y1, k, { width = 80, pts = [] } = {}) {
  if (k <= 0.003) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const bg = ctx.createLinearGradient(x - width, 0, x + width, 0)
  bg.addColorStop(0, 'rgba(255,240,214,0)'); bg.addColorStop(0.5, `rgba(255,244,226,${(0.32 * k).toFixed(3)})`); bg.addColorStop(1, 'rgba(255,240,214,0)')
  ctx.fillStyle = bg
  ctx.globalAlpha = 1
  // fade the beam's ends with a vertical mask: draw in slices
  const N = 24
  for (let j = 0; j < N; j++) {
    const a = j / N, b = (j + 1) / N, m = Math.sin(Math.PI * (a + b) / 2)
    ctx.globalAlpha = m
    ctx.fillRect(x - width, lerp(y0, y1, a), width * 2, (y1 - y0) / N + 1)
  }
  ctx.globalAlpha = 1
  for (let i = 0; i + 1 < pts.length; i++) {
    ctx.strokeStyle = `rgba(255,236,200,${(k * 0.3).toFixed(3)})`; ctx.lineWidth = 7
    ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[i + 1].x, pts[i + 1].y); ctx.stroke()
    ctx.strokeStyle = `rgba(255,248,236,${(k * 0.6).toFixed(3)})`; ctx.lineWidth = 1.6
    ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[i + 1].x, pts[i + 1].y); ctx.stroke()
  }
  ctx.restore()
}

// ══ pixel stars (fx-stars), periodic ══════════════════════════════════════════════════════════════
const PSF = new Map()
/**
 * filmPixelStars(ctx, t, opts) — the film's pixel-sprite field + soft dot stars, loop-periodic: each star sways on a
 * small closed path, twinkles a whole number of times per loop and flashes into the big sparkle once per loop.
 * opts: seed · sprites · dots · px [small, big] · pal · keep [[x,y,w,h]] (fade to 0 inside, `soft` px ramp) · alpha · sway
 */
export function filmPixelStars(ctx, t, { seed = 11, sprites = 26, dots = 80, px = [3, 4], pal = [BONE, BONE, GOLD, VIOLET, ROSE], centre = HOT, dot = '255,247,236', keep = [], soft = 90, alpha = 1, sway = 8 } = {}) {
  const key = seed + '|' + sprites + '|' + dots
  let P = PSF.get(key)
  if (!P) {
    const r = rng(seed * 7919)
    P = {
      S: Array.from({ length: sprites }, () => { const z = 0.35 + r() * 0.65; return { x: r() * W, y: r() * H, z, px: z > 0.88 ? px[1] + 1 : z > 0.65 ? px[1] : px[0], kind: [1, 2, 2, 3, 1, 0][Math.floor(r() * 6)], col: pal[Math.floor(r() * pal.length)], ph: r(), n: 2 + Math.floor(r() * 4), fo: r(), wob: r() } }),
      D: Array.from({ length: dots }, () => ({ x: r() * W, y: r() * H, z: 0.15 + r() * 0.6, rad: 0.6 + r() * 1.3, a: 0.25 + r() * 0.6, ph: r(), n: 1 + Math.floor(r() * 4) })),
    }
    PSF.set(key, P)
  }
  const kf = (x, y) => { let f = 1; for (const q of keep) { const dx = Math.max(q[0] - x, 0, x - (q[0] + q[2])), dy = Math.max(q[1] - y, 0, y - (q[1] + q[3])); f = Math.min(f, clamp(Math.hypot(dx, dy) / soft)) } return f }
  const f = loopFrame(t), a0 = 2 * Math.PI * ph(t)
  for (const d of P.D) {
    const x = d.x + Math.cos(a0) * sway * d.z, y = d.y + Math.sin(a0) * sway * 0.6 * d.z
    const k = kf(x, y); if (k <= 0) continue
    const a = alpha * k * d.a * (0.55 + 0.45 * osc(t, d.n, d.ph))
    if (a < 0.02) continue
    ctx.fillStyle = `rgba(${dot},${(a * 0.22).toFixed(3)})`; ctx.beginPath(); ctx.arc(x, y, d.rad * 2.6, 0, 6.2832); ctx.fill()
    ctx.fillStyle = `rgba(${dot},${a.toFixed(3)})`; ctx.beginPath(); ctx.arc(x, y, d.rad, 0, 6.2832); ctx.fill()
  }
  for (const s of P.S) {
    const x = s.x + Math.cos(a0 + s.wob * 6.28) * sway * s.z, y = s.y + Math.sin(a0 + s.wob * 6.28) * sway * 0.6 * s.z
    const k = kf(x, y); if (k <= 0) continue
    const tw = 0.5 + 0.5 * osc(t, s.n, s.ph)
    const flashing = cyc(t, 1, s.fo) < 0.05
    let kind = s.kind
    if (flashing) kind = ((f >> 1) & 1) ? 0 : 3
    else if (tw < 0.22) kind = 2
    const a = alpha * k * (flashing ? 1 : 0.45 + 0.55 * tw)
    if (a < 0.03) continue
    ctx.globalAlpha = a
    pixelStar(ctx, x, y, s.px, kind, s.col, centre)
  }
  ctx.globalAlpha = 1
}

// ══ shooting star (fx-stars) ══════════════════════════════════════════════════════════════════════
/** S = { t0, t1, x0, y0, x1, y1, len, px, rgb, col, seed } — fires inside [t0, t1] of each loop (t0 < t1 < LOOP) */
export function shootingStar(ctx, t, S) {
  const lt = ((t % LOOP) + LOOP) % LOOP
  const p = prog(lt, S.t0, S.t1)
  if (p <= 0 || p >= 1) return
  const e = ease.inOutQuad(p)
  const hx = lerp(S.x0, S.x1, e), hy = lerp(S.y0, S.y1, e)
  const dx = S.x1 - S.x0, dy = S.y1 - S.y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L
  const len = S.len * Math.sin(Math.PI * Math.min(1, p * 1.15))
  const env = Math.min(1, p / 0.12) * (1 - ease.inQuad(prog(p, 0.75, 1)))
  const tx = hx - ux * len, ty = hy - uy * len
  const g = ctx.createLinearGradient(tx, ty, hx, hy)
  g.addColorStop(0, `rgba(${S.rgb},0)`); g.addColorStop(1, `rgba(${S.rgb},${(0.9 * env).toFixed(3)})`)
  ctx.strokeStyle = g; ctx.lineCap = 'round'
  ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke()
  ctx.lineWidth = 7; ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.moveTo(hx - ux * len * 0.4, hy - uy * len * 0.4); ctx.lineTo(hx, hy); ctx.stroke()
  const r = rng(S.seed * 7717), f = loopFrame(t)
  for (let k = 0; k < 7; k++) {
    const q = r(), off = (r() - 0.5) * 14, pk = e - (0.04 + q * 0.18)
    if (pk <= 0) continue
    const cx = lerp(S.x0, S.x1, pk) - uy * off, cy = lerp(S.y0, S.y1, pk) + ux * off + (e - pk) * 60
    ctx.globalAlpha = env * (1 - (e - pk) / 0.22)
    if (ctx.globalAlpha <= 0) continue
    pixelStar(ctx, cx, cy, S.px - 1, 2, S.col, HOT)
  }
  ctx.globalAlpha = env
  pixelStar(ctx, hx, hy, S.px, (f >> 1) & 1 ? 0 : 1, S.col, HOT)
  ctx.globalAlpha = 1
}
