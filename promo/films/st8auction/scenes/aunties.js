// aunties — the Auntie Council's reading glasses, copied from staunties/scenes/props.js (season 2) so S8 E17's aunties
// match. auntie(ctx, x, y, size, t, opts) = drawStarChar + glasses { frame, hi, down 0…1, fog 0…1, chain }. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { drawStarChar } from '../../startalk.js'

const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** the same hop curve startalk uses (copied so the glasses can follow the exact squash) */
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}

// glasses on the 36-cell sprite grid: two 9×9 lens rings around the eyes (eyes: cols 10–15 / 20–25, rows 15–22)
const LENS = [[8, 14], [19, 14]], LW = 9, LH = 9
function ringCells(x0, y0) {
  const out = []
  for (let j = 0; j < LH; j++) for (let i = 0; i < LW; i++) {
    const edge = i === 0 || j === 0 || i === LW - 1 || j === LH - 1
    const corner = (i === 0 || i === LW - 1) && (j === 0 || j === LH - 1)
    if (edge && !corner) out.push([x0 + i, y0 + j])
  }
  // round the corners inward
  for (const [i, j] of [[1, 1], [LW - 2, 1], [1, LH - 2], [LW - 2, LH - 2]]) out.push([x0 + i, y0 + j])
  return out
}

/** a star character wearing tiny pixel reading glasses (they squash, hop and bob with the sprite) */
export function auntie(ctx, x, y, size, t, o = {}) {
  const pop = o.pop ?? 1, seed = o.seed ?? 1, alpha = o.alpha ?? 1
  const hs = hopState(t, o.hops)
  const sq0 = (o.squash || 0) + hs.sq
  const r = drawStarChar(ctx, x, y - hs.lift * size * 0.09, size, t, { ...o, hops: null, squash: sq0 })
  const g = o.glasses
  if (!g || pop <= 0 || alpha <= 0) return r
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const sq = sq0 + 0.018 * Math.sin(t * 3.1 + seed * 1.7), sx = 1 + sq, sy = 1 - sq * 0.9
  const base = (FOOT_ROW - HALF) * cell
  const dy = Math.round((g.down || 0) * 5)
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(r.y + base)); ctx.scale(sx, sy)
  const px = (i, j, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect((i - HALF) * cell, (j - HALF) * cell - base, cell * w, cell * h) }
  const frame = g.frame || '#7a1f3d', hi = g.hi || '#ffd98a'
  for (const [lx, ly0] of LENS) {
    const ly = ly0 + dy
    // lens tint + fog
    ctx.fillStyle = rgba('#bfefff', 0.16 + 0.6 * clamp(g.fog || 0))
    ctx.fillRect((lx + 1 - HALF) * cell, (ly + 1 - HALF) * cell - base, (LW - 2) * cell, (LH - 2) * cell)
    if (g.fog > 0.05) {          // fog blobs, a little uneven
      ctx.fillStyle = rgba('#ffffff', 0.55 * clamp(g.fog))
      for (const [a, b] of [[2, 2], [3, 2], [5, 3], [2, 5], [6, 6], [4, 6], [3, 4]]) px(lx + a, ly + b, ctx.fillStyle)
    }
    for (const [i, j] of ringCells(lx, ly)) px(i, j, frame)
    // glint
    px(lx + 2, ly + 1, hi); px(lx + 1, ly + 2, hi)
    px(lx + LW - 3, ly + LH - 3, rgba('#ffffff', 0.85))
  }
  // bridge + temples
  px(17, 16 + dy, frame, 2, 1)
  px(6, 16 + dy, frame, 2, 1); px(28, 16 + dy, frame, 2, 1)
  // a beaded chain swinging under the chin (Cancer)
  if (g.chain) {
    const sw = Math.sin(t * 2.4) * 1.2
    for (let k = 0; k <= 12; k++) {
      const u = k / 12, ci = lerp(6, 29, u), cj = 17 + dy + Math.sin(u * Math.PI) * 9 + sw * Math.sin(u * Math.PI)
      if (k % 2 === 0) px(Math.round(ci), Math.round(cj), k % 4 === 0 ? hi : '#fff3dc')
    }
  }
  ctx.restore()
  return { ...r, cell, sx, sy, base, eyeY: r.y + base + ((19.2 - HALF) * cell - base) * sy, eyeDX: 4.6 * cell * sx }
}
