// Film 3 shared sky: the same S1 nebula plate, stars and grain as film 2 (pre-rendered once by film 2's getSky),
// but on film 3's own camera. g2–g4 paint the sky with drawSky3(ctx, t, opts) so the cuts between them are seamless.
// Lead-owned: scene agents import from here; ask the lead before changing it.
import { clamp, lerp, prog, ease, noise1, C } from '../src/lib.js'
import { W, H } from '../src/scenes/common.js'
import { drawMoon } from '../src/scenes/fx-moon.js'
import { getSky, drawGrain, drawPixelStar, buildStarSprite, grainOpacity, GRAIN_OPACITY } from '../film2/scenes/f3-chart.js'
export { getSky, drawGrain, drawPixelStar, buildStarSprite, grainOpacity, GRAIN_OPACITY }

const BGW = 2304, BGH = 1296

/** one continuous camera for film 3, from the break (3.6) to the end (15): slow push-in + drift, never a dead hold */
export function skyCam3(t) {
  const u = clamp((t - 3.6) / 11.4)
  return { zoom: 1.0 + 0.07 * ease.inOutQuad(u), dx: lerp(30, -70, u), dy: lerp(-10, 30, u) }
}

/** the one moon: a waxing crescent home upper-right; it fills a little across the film (phase .10 → .22) */
export function moonPose3(t) {
  const { dx, dy, zoom } = skyCam3(t)
  return { x: 1716 + dx * 1.3, y: 122 + dy * 1.3, r: 52 * zoom, phase: lerp(0.10, 0.22, prog(t, 3.6, 15)) }
}

/** paint the sky (opaque). opts: pan [x,y] extra parallax, zoomK extra zoom multiplier, moon 0–1 (crescent alpha),
 *  dim 0–1 (nebula plate only; compensate grain with grainOpacity(dim)), sat 0–1 (0 = cold B&W, for the break) */
export function drawSky3(bx, t, { pan = [0, 0], zoomK = 1, moon = 1, dim = 1 } = {}) {
  const S = getSky()
  const cam = skyCam3(t), zoom = cam.zoom * zoomK
  const driftX = cam.dx + pan[0], driftY = cam.dy + pan[1]
  const layer = (im, s, ox, oy) => { const w = BGW * s, h = BGH * s; bx.drawImage(im, W / 2 - w / 2 + ox, H / 2 - h / 2 + oy, w, h) }
  const flick = 1 + (noise1(t * 14, 3) - 0.5) * 0.05
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  bx.fillStyle = C.void; bx.fillRect(0, 0, W, H)
  bx.globalAlpha = flick * clamp(dim)
  layer(S.neb, zoom, driftX * 0.5, driftY * 0.5)
  bx.globalCompositeOperation = 'lighter'
  bx.globalAlpha = 0.9; layer(S.far, zoom, driftX * 0.7, driftY * 0.7)
  bx.globalAlpha = 1
  layer(S.mid, zoom * 1.01, driftX, driftY)
  layer(S.near, zoom * 1.03, driftX * 1.6, driftY * 1.6)
  for (const b of S.bright) {
    const s = zoom * (1.02 + 0.03 * b.depth)
    const x = W / 2 + (b.x - W / 2) * s + driftX * (1 + b.depth * 0.6)
    const y = H / 2 + (b.y - H / 2) * s + driftY * (1 + b.depth * 0.6)
    const tw2 = 0.55 + 0.45 * noise1(t * b.sp, b.seed) + 0.25 * Math.max(0, noise1(t * b.sp * 3.1, b.seed + 9) - 0.6)
    const sz = b.size * (0.85 + 0.25 * tw2)
    bx.globalAlpha = clamp(tw2)
    bx.drawImage(b.spike ? S.spriteS : S.spriteG, x - sz / 2, y - sz / 2, sz, sz)
  }
  bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
  if (moon > 0) {
    const m = moonPose3(t)
    drawMoon(bx, m.x + pan[0] * 1.3, m.y + pan[1] * 1.3, m.r, m.phase, { alpha: moon, glow: 3, earthshine: 1, darkAlpha: 0.62 })
  }
  bx.drawImage(S.vig, 0, 0)
}

/** helper: a full-frame canvas element appended to parent */
export function layerCanvas(parent, style = {}) {
  const c = document.createElement('canvas'); c.width = W; c.height = H
  Object.assign(c.style, { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px', ...style })
  parent.appendChild(c); return c
}
