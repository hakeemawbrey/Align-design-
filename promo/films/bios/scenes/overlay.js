// bios · top fx layer: moon-phase badge (top-left), pixel sparkle stars, and the closing black plate.
// The black plate is drawn last on the fx canvas so it covers everything (DOM + fx): 14.82 → 14.95, last frame black.
import { prog, ease } from '../../../src/lib.js'
import { W, H, drawBadge, drawSparks } from './kit.js'

export default async function build() {
  return {
    start: 0, end: 15.01, root: null,
    update() {},
    fx(ctx, t) {
      const cold = 1 - ease.inOutQuad(prog(t, 3.45, 3.9))
      const k = (cold * 0.45 + (1 - cold)) * ease.inOutQuad(prog(t, 0, 0.25)) * (1 - ease.inOutQuad(prog(t, 14.45, 14.8)))
      drawSparks(ctx, t, k, 1 - cold)
      drawBadge(ctx, t)
      const b = prog(t, 14.82, 14.95)
      if (b > 0) { ctx.fillStyle = `rgba(0,0,0,${b})`; ctx.fillRect(0, 0, W, H) }
    },
  }
}
