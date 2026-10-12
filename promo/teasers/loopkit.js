// Loop kit: seamless, beat-reactive visualizer loops. Everything must be periodic in LOOP seconds:
// frame(t = 0) === frame(t = LOOP). Visual "audio reactivity" comes from the same deterministic beat clock
// the sound engine plays, so the picture pulses exactly with the music.
export * from './kit.js'
import { clamp } from '../src/lib.js'

export const LOOP = 8                 // seconds per loop
export const BPM = 120                // 16 beats per loop, 4 bars
export const BEAT = 60 / BPM          // 0.5s
/** phase 0..1 through the loop */
export const ph = (t) => ((t % LOOP) + LOOP) % LOOP / LOOP
/** periodic helpers: n whole cycles per loop */
export const osc = (t, n = 1, off = 0) => Math.sin(2 * Math.PI * (n * ph(t) + off))
export const cyc = (t, n = 1, off = 0) => (n * ph(t) + off) % 1   // sawtooth 0..1, n per loop
/** kick envelope: 1 on each beat, decays */
export const kick = (t, decay = 7) => { const x = ((t % BEAT) + BEAT) % BEAT; return Math.exp(-x * decay) }
/** off-beat hat envelope */
export const hat = (t, decay = 18) => { const x = (((t - BEAT / 2) % BEAT) + BEAT) % BEAT; return Math.exp(-x * decay) }
/** bar-downbeat envelope (every 4 beats) */
export const bar = (t, decay = 2.5) => { const x = ((t % (BEAT * 4)) + BEAT * 4) % (BEAT * 4); return Math.exp(-x * decay) }
/** which chord (0..3) is playing — one per bar */
export const chordIx = (t) => Math.floor(ph(t) * 4) % 4
/**
 * pseudo-spectrum: n band levels 0..1 that react to kick (lows), hats (highs), chord swells (mids),
 * deterministic and loop-periodic. Use for radial bars, waveforms, etc.
 */
export function spectrum(t, n = 48) {
  const k = kick(t), h = hat(t), b = bar(t)
  const out = new Array(n)
  for (let i = 0; i < n; i++) {
    const f = i / (n - 1)
    const low = k * Math.exp(-f * 5) * 0.95
    const mid = (0.35 + 0.25 * osc(t, 4, f * 1.7)) * Math.exp(-((f - 0.4) ** 2) / 0.05) * (0.6 + 0.4 * b)
    const high = h * Math.exp(-((f - 0.85) ** 2) / 0.02) * 0.7
    const shimmer = 0.06 * (0.5 + 0.5 * Math.sin(2 * Math.PI * (ph(t) * 8 + i * 0.37)))
    out[i] = clamp(low + mid + high + shimmer, 0, 1)
  }
  return out
}
/**
 * makeClock(loop, bpm) → the same periodic helpers as above, for any loop length / tempo
 * (bpm must give a whole number of beats per loop). Used by filmkit.js (10s @ 96 bpm).
 */
export function makeClock(loop, bpm) {
  const beat = 60 / bpm, barLen = beat * 4, nBars = Math.round(loop / barLen)
  const wrap = (x, m) => ((x % m) + m) % m
  const ph = (t) => wrap(t, loop) / loop
  return {
    LOOP: loop, BPM: bpm, BEAT: beat, BAR: barLen,
    ph,
    osc: (t, n = 1, off = 0) => Math.sin(2 * Math.PI * (n * ph(t) + off)),
    cyc: (t, n = 1, off = 0) => wrap(n * ph(t) + off, 1),
    kick: (t, decay = 7) => Math.exp(-wrap(t, beat) * decay),
    hat: (t, decay = 18) => Math.exp(-wrap(t - beat / 2, beat) * decay),
    bar: (t, decay = 2.5) => Math.exp(-wrap(t, barLen) * decay),
    chordIx: (t) => Math.floor(ph(t) * nBars) % nBars,
  }
}
/** shared loop music: D-major dream pad (one chord per bar) + kick on every beat + off-beat hats */
export const LOOP_CHORDS = [
  [146.83, 220, 329.63, 369.99, 554.37],   // Dmaj9
  [123.47, 185, 293.66, 329.63, 440],      // Bm9
  [98, 196, 293.66, 369.99, 493.88],       // Gmaj7
  [110, 220, 277.18, 329.63, 493.88],      // A add9
]

// ── loop-safe backdrop (spaceBackdrop's drift isn't periodic; this one is) ─────────────
import { el, rng } from '../src/lib.js'
import { W, H, SPACE_MOODS, makeStars } from '../src/scenes/common.js'
import { pixelStar, BONE, GOLD, VIOLET, ROSE } from './kit.js'
let GRAIN = null
function grainTiles() {
  if (GRAIN) return GRAIN
  GRAIN = Array.from({ length: 6 }, (_, k) => {
    const c = document.createElement('canvas'); c.width = c.height = 384
    const g = c.getContext('2d'), d = g.createImageData(384, 384), r = rng(700 + k)
    for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 150; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255 }
    g.putImageData(d, 0, 0); return c.toDataURL()
  })
  return GRAIN
}
/** loopBackdrop(parent, mood, { seed, grain, stars }) → { root, update(t) } — nebula blobs orbit once per loop */
export function loopBackdrop(parent, mood = 'rose', { seed = 1, grain = 0.2, stars = 180 } = {}) {
  const [top, bottom, blobs] = SPACE_MOODS[mood]
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }, parent)
  const r = rng(seed * 53 + 11)
  const bs = blobs.map(([cr, cg, cb, x, y, rad, a]) => ({
    x, y, rad: rad * 1.25, off: r(), amp: 60 + r() * 90,
    e: el('div', { position: 'absolute', width: rad * 2.5 + 'px', height: rad * 2.5 + 'px', borderRadius: '50%', mixBlendMode: 'screen',
      background: `radial-gradient(closest-side, rgba(${cr},${cg},${cb},${a}), rgba(${cr},${cg},${cb},${a * 0.42}) 45%, rgba(${cr},${cg},${cb},0) 100%)` }, root),
  }))
  const sc = makeStars(root, stars, seed * 17 + 3)
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(120% 95% at 50% 50%, rgba(11,6,32,0) 55%, rgba(11,6,32,0.6) 100%)' }, root)
  const gr = el('div', { position: 'absolute', left: '-384px', top: '-384px', width: (W + 768) + 'px', height: (H + 768) + 'px', mixBlendMode: 'overlay', opacity: grain, pointerEvents: 'none' }, root)
  const tiles = grainTiles()
  return {
    root,
    update(t) {
      const p = ph(t)
      bs.forEach(b => {
        const a = 2 * Math.PI * (p + b.off)
        b.e.style.transform = `translate(${b.x * W + Math.cos(a) * b.amp - b.rad}px, ${b.y * H + Math.sin(a) * b.amp * 0.7 - b.rad}px)`
      })
      sc.style.opacity = String(0.85 + 0.15 * osc(t, 2))
      const fi = Math.round(t * 30) % Math.round(LOOP * 30), rr = rng(fi * 7 + seed)  // grain repeats with the loop
      gr.style.backgroundImage = `url(${tiles[fi % tiles.length]})`
      gr.style.transform = `translate(${Math.floor(rr() * 384)}px, ${Math.floor(rr() * 384)}px)`
    },
  }
}
/** loop-periodic pixel-star twinkle field (stars stay put, twinkle n times per loop) */
export function loopStars(ctx, t, { seed = 1, sprites = 26, dots = 90, alpha = 1, keepOut = [], pal = [BONE, BONE, GOLD, VIOLET, ROSE] } = {}) {
  const r = rng(seed * 104729)
  const inKeep = (x, y) => keepOut.some(([kx, ky, kw, kh]) => x > kx - 40 && x < kx + kw + 40 && y > ky - 40 && y < ky + kh + 40)
  for (let i = 0; i < dots; i++) {
    const x = r() * W, y = r() * H, s = 0.6 + r() * 1.8, n = 1 + Math.floor(r() * 3), off = r()
    if (inKeep(x, y)) continue
    ctx.globalAlpha = alpha * (0.35 + 0.55 * (0.5 + 0.5 * osc(t, n, off)))
    ctx.fillStyle = '#fff7ec'; ctx.beginPath(); ctx.arc(x, y, s, 0, 6.283); ctx.fill()
  }
  for (let i = 0; i < sprites; i++) {
    const x = r() * W, y = r() * H, px = 3 + Math.floor(r() * 2), col = pal[Math.floor(r() * pal.length)], n = 1 + Math.floor(r() * 4), off = r()
    if (inKeep(x, y)) continue
    const tw = 0.5 + 0.5 * osc(t, n, off)
    const kind = tw > 0.9 ? 0 : tw > 0.6 ? 1 : tw > 0.25 ? 2 : -1
    if (kind < 0) continue
    ctx.globalAlpha = alpha * (0.5 + 0.5 * tw)
    pixelStar(ctx, x, y, px, kind, col)
  }
  ctx.globalAlpha = 1
}
