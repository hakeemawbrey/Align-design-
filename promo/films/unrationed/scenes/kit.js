// UNRATIONED · shared kit (LOOK A, film-1 style): one persistent space backdrop with mood cross-fades,
// one grain layer at 0.22 over everything, small helpers.
import { el, rng, prog, ease, clamp, lerp, C } from '../../../src/lib.js'
import { W, H, fill, spaceBackdrop } from '../../../src/scenes/common.js'

export const FI = (t) => Math.round(t * 30)
export const GRAIN = 0.22
export const T_FADE = 14.5, T_END = 15.0

// mood timeline: cold desaturated teal (the paywall) → amber (founding) → dark rose (lockup)
export const T_WARM = [4.22, 4.95], T_ROSE = [10.6, 11.25]

let TILES = null
function grainTiles() {
  if (TILES) return TILES
  TILES = Array.from({ length: 5 }, (_, k) => {
    const c = document.createElement('canvas'); c.width = c.height = 384
    const g = c.getContext('2d'), d = g.createImageData(384, 384), r = rng(4400 + k)
    for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() + r() + r() - 1.5) * 150; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255 }
    g.putImageData(d, 0, 0)
    return c.toDataURL()
  })
  return TILES
}

/** scene 0: the sky under everything (0–15) */
export async function backdrop(stage) {
  const root = fill(stage, { background: C.void })
  const cold = spaceBackdrop(root, 'teal', { seed: 3, grain: 0, stars: 140 })
  cold.root.style.filter = 'saturate(0.55) brightness(0.78)'
  const warm = spaceBackdrop(root, 'amber', { seed: 5, grain: 0, stars: 170 })
  const rose = spaceBackdrop(root, 'rose', { seed: 7, grain: 0, stars: 150 })
  const dim = fill(root, { background: 'radial-gradient(70% 70% at 50% 45%, rgba(11,6,32,0.45), rgba(11,6,32,0.85) 100%)', opacity: 0 })
  return {
    start: 0, end: T_END + 0.01, root,
    update(t) {
      const w = ease.inOutQuad(prog(t, ...T_WARM)), r = ease.inOutQuad(prog(t, ...T_ROSE))
      cold.root.style.display = w < 1 ? 'block' : 'none'
      warm.root.style.display = w > 0 && r < 1 ? 'block' : 'none'
      rose.root.style.display = r > 0 ? 'block' : 'none'
      warm.root.style.opacity = String(w)
      rose.root.style.opacity = String(r)
      if (w < 1) cold.update(t)
      if (w > 0 && r < 1) warm.update(t)
      if (r > 0) rose.update(t)
      dim.style.opacity = String(0.62 * ease.inOutQuad(prog(t, 10.7, 11.6)))
    },
  }
}

/** last scene: particles / moon badge canvas (drawn by the content scenes), one grain layer, the black plate */
export function overlay(drawers) {
  return async (stage) => {
    const root = fill(stage, { background: 'transparent', pointerEvents: 'none' })
    const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    cv.width = W; cv.height = H
    const ctx = cv.getContext('2d')
    const gr = el('div', { position: 'absolute', left: '-384px', top: '-384px', width: (W + 768) + 'px', height: (H + 768) + 'px', mixBlendMode: 'overlay', opacity: GRAIN }, root)
    const tiles = grainTiles()
    const black = fill(root, { background: '#000', opacity: 0 })
    return {
      start: 0, end: T_END + 0.01, root,
      update(t) {
        ctx.clearRect(0, 0, W, H)
        for (const d of drawers) d(ctx, t)
        const fi = FI(t), rr = rng(fi * 7 + 11)
        gr.style.backgroundImage = `url(${tiles[fi % tiles.length]})`
        gr.style.transform = `translate(${Math.floor(rr() * 384)}px, ${Math.floor(rr() * 384)}px)`
        black.style.opacity = String(t >= T_END - 0.04 ? 1 : ease.inOutQuad(prog(t, T_FADE, T_END - 0.04)))
      },
    }
  }
}

/** pixel star: a square core plus four arm pixels (u = pixel size) */
export function pixStar(ctx, x, y, u, color, a, arms = true) {
  if (a <= 0.004) return
  ctx.globalAlpha = clamp(a)
  ctx.fillStyle = color
  x = Math.round(x); y = Math.round(y)
  ctx.fillRect(x - u / 2, y - u / 2, u, u)
  if (arms) {
    ctx.globalAlpha = clamp(a * 0.6)
    ctx.fillRect(x - u / 2, y - u * 1.5, u, u); ctx.fillRect(x - u / 2, y + u / 2, u, u)
    ctx.fillRect(x - u * 1.5, y - u / 2, u, u); ctx.fillRect(x + u / 2, y - u / 2, u, u)
  }
  ctx.globalAlpha = 1
}

export const STAR_COLS = ['#efe6d6', '#efe6d6', '#efe6d6', '#c9a6ff', '#9a7be0', '#ff8fb1', '#f2c75c']

/** per-char typed line with an accent shimmer (accent → bone) */
export function typed(parent, text, style) {
  const box = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', textAlign: 'center', willChange: 'transform' }, parent)
  const line = el('div', { display: 'inline-block', whiteSpace: 'pre', color: C.bone, ...style }, box)
  const chars = [...text].map(ch => el('span', { opacity: 0 }, line, ch === ' ' ? ' ' : ch))
  return { box, line, chars }
}

export { lerp }
