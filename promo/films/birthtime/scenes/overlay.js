// birthtime · OVERLAY (0–15): the LOOK A moon-phase badge top-left (glyph centre 92,86; label ≤ x 420, ≤ y 120).
// It reads the real moon of the typed night: 11 May 1998 was a full moon, so 12 May 1998 · 5 PM is a waning gibbous, ~98% lit.
// Timing (sound): in 0.45–0.8 · phase ticks 0.40 → 0.544 over 0.55–1.25 (as the date lands) · out 10.35–10.6
// (the lockup's moon row owns the end; one moon motif on screen at a time).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawMoonGlyph, phaseName, litOf } from '../../../src/scenes/fx-moon.js'

const GX = 92, GY = 86, GR = 20
export default async function build(stage) {
  const root = fill(stage, { background: 'transparent', pointerEvents: 'none' })
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: '640px', height: '400px' }, root)
  cv.width = 1280; cv.height = 800
  const ctx = cv.getContext('2d')
  return {
    start: 0, end: 10.7, root,
    update(t) {
      ctx.setTransform(2, 0, 0, 2, 0, 0); ctx.clearRect(0, 0, 640, 400)
      const al = ease.inOutQuad(prog(t, 0.45, 0.8)) * (1 - ease.inOutQuad(prog(t, 10.35, 10.6)))
      if (al <= 0.003) return
      const tk = ease.inOutCubic(prog(t, 0.55, 1.25))
      const p = lerp(0.40, 0.544, tk)
      const y = GY + (1 - ease.outCubic(prog(t, 0.45, 0.9))) * 8
      const pg = ctx.createRadialGradient(GX + 90, y, 10, GX + 90, y, 230)
      pg.addColorStop(0, `rgba(11,6,32,${0.38 * al})`); pg.addColorStop(1, 'rgba(11,6,32,0)')
      ctx.fillStyle = pg; ctx.fillRect(0, 0, 640, 400)
      drawMoonGlyph(ctx, GX, y, GR, p, { alpha: al, lw: 1.6, discAlpha: 0.12, glow: 0.9 })
      ctx.globalAlpha = al
      ctx.font = "400 17px 'Space Mono', monospace"
      try { ctx.letterSpacing = '3px' } catch {}
      ctx.shadowColor = 'rgba(11,6,32,0.8)'; ctx.shadowBlur = 10
      ctx.fillStyle = 'rgba(239,230,214,0.9)'
      ctx.fillText(phaseName(p), GX + GR + 18, y - 3)
      ctx.font = "400 14px 'Space Mono', monospace"
      ctx.fillStyle = 'rgba(239,230,214,0.55)'
      ctx.fillText(`${Math.round(litOf(p) * 100)}% LIT`, GX + GR + 18, y + 18)
      try { ctx.letterSpacing = '0px' } catch {}
      ctx.globalAlpha = 1; ctx.shadowBlur = 0
    },
  }
}
