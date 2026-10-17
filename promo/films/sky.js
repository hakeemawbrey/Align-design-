// Shared sky for promo/films/*: film 2's S1 nebula plate, stars and grain (pre-rendered once), on a camera YOU pass in.
// drawSky(ctx, t, { zoom, dx, dy, dim, moon: { x, y, r, phase, alpha } }) paints an opaque sky; drawGrain(gx, t) a grain frame
// (put it on an overlay canvas, mix-blend-mode: overlay, opacity grainOpacity(dim) ≈ 0.5). Lead-owned: don't edit.
import { clamp, noise1, C } from '../src/lib.js'
import { W, H } from '../src/scenes/common.js'
import { drawMoon } from '../src/scenes/fx-moon.js'
import { getSky, drawGrain, drawPixelStar, buildStarSprite, grainOpacity, GRAIN_OPACITY } from '../film2/scenes/f3-chart.js'
export { getSky, drawGrain, drawPixelStar, buildStarSprite, grainOpacity, GRAIN_OPACITY, drawMoon }

const BGW = 2304, BGH = 1296

export function drawSky(bx, t, { zoom = 1, dx = 0, dy = 0, dim = 1, moon = null, stars = 1 } = {}) {
  const S = getSky()
  const layer = (im, s, ox, oy) => { const w = BGW * s, h = BGH * s; bx.drawImage(im, W / 2 - w / 2 + ox, H / 2 - h / 2 + oy, w, h) }
  const flick = 1 + (noise1(t * 14, 3) - 0.5) * 0.05
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
  bx.globalAlpha = flick * clamp(dim)
  layer(S.neb, zoom, dx * 0.5, dy * 0.5)
  bx.globalCompositeOperation = 'lighter'
  bx.globalAlpha = 0.9 * stars; layer(S.far, zoom, dx * 0.7, dy * 0.7)
  bx.globalAlpha = stars
  layer(S.mid, zoom * 1.01, dx, dy)
  layer(S.near, zoom * 1.03, dx * 1.6, dy * 1.6)
  for (const b of S.bright) {
    const s = zoom * (1.02 + 0.03 * b.depth)
    const x = W / 2 + (b.x - W / 2) * s + dx * (1 + b.depth * 0.6)
    const y = H / 2 + (b.y - H / 2) * s + dy * (1 + b.depth * 0.6)
    const tw2 = 0.55 + 0.45 * noise1(t * b.sp, b.seed) + 0.25 * Math.max(0, noise1(t * b.sp * 3.1, b.seed + 9) - 0.6)
    const sz = b.size * (0.85 + 0.25 * tw2)
    bx.globalAlpha = clamp(tw2) * stars
    bx.drawImage(b.spike ? S.spriteS : S.spriteG, x - sz / 2, y - sz / 2, sz, sz)
  }
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  if (moon && moon.alpha > 0) drawMoon(bx, moon.x, moon.y, moon.r, moon.phase, { alpha: moon.alpha, glow: 3, earthshine: 1, darkAlpha: 0.62 })
  bx.drawImage(S.vig, 0, 0)
}

export function layerCanvas(parent, style = {}) {
  const c = document.createElement('canvas'); c.width = W; c.height = H
  Object.assign(c.style, { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px', ...style })
  parent.appendChild(c); return c
}
