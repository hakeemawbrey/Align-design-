// birthtime · BG (0–15): LOOK A space moods. Rose (the hook) → teal/earth (the Taurus card) 5.0–6.2,
// dimmed toward void for the lockup 11.0–12.4. Both moods carry grain 0: the ONE grain layer is scenes/grain.js.
// Pixel-art twinkle stars live here too (one constant field for the whole film, no pops).
import { clamp, lerp, prog, ease, rng, el, C, PIXEL_PALETTE } from '../../../src/lib.js'
import { W, H, fill, spaceBackdrop } from '../../../src/scenes/common.js'

const SPR = [
  ['..X..', '..X..', 'XXCXX', '..X..', '..X..'],
  ['.....', '..X..', '.XCX.', '..X..', '.....'],
  ['X...X', '..X..', '.XCX.', '..X..', 'X...X'],
].map(rows => rows.flatMap((r, y) => [...r].map((ch, x) => ch === '.' ? null : [x, y, ch === 'C'])).filter(Boolean))

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const rose = spaceBackdrop(root, 'rose', { seed: 3, grain: 0, stars: 170 })
  const teal = spaceBackdrop(root, 'teal', { seed: 5, grain: 0, stars: 170 })
  // a low earth-green breath for Taurus under the teal mood
  const earth = fill(root, { background: 'radial-gradient(55% 60% at 66% 52%, rgba(95,220,120,0.16), rgba(95,220,120,0) 70%)', mixBlendMode: 'screen', opacity: 0 })
  const dim = fill(root, { background: 'radial-gradient(90% 80% at 50% 50%, rgba(11,6,32,0.55), rgba(11,6,32,0.85) 100%)', opacity: 0 })
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  cv.width = W; cv.height = H
  const g = cv.getContext('2d')
  const r = rng(6061)
  // keep the stars off the type columns / card where they would fight the copy
  const STARS = []
  while (STARS.length < 22) {
    const x = 40 + r() * (W - 80), y = 40 + r() * (H - 80)
    if (x < 440 && y < 150) continue          // moon badge keep-out
    if (Math.abs(y - 540) < 300 && x > 260 && x < 1660) continue
    STARS.push({ x, y, k: Math.floor(r() * 3), px: r() < 0.3 ? 3 : 2, c: r() < 0.55 ? '#efe6d6' : PIXEL_PALETTE[Math.floor(r() * PIXEL_PALETTE.length)], ph: r() * 6.28, sp: 0.8 + r() * 1.6, a: 0.35 + r() * 0.45 })
  }
  return {
    start: 0, end: 15.01, root,
    update(t) {
      rose.update(t); teal.update(t)
      const m = ease.inOutQuad(prog(t, 5.15, 6.3))
      teal.root.style.opacity = String(m)
      earth.style.opacity = String(m * (0.75 + 0.25 * Math.sin(t * 1.4)) * (1 - prog(t, 10.6, 11.6)))
      dim.style.opacity = String(ease.inOutQuad(prog(t, 10.8, 12.4)))
      g.clearRect(0, 0, W, H)
      for (const s of STARS) {
        const a = s.a * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph))
        if (a < 0.03) continue
        g.globalAlpha = a
        const x0 = Math.round(s.x - s.px * 2.5), y0 = Math.round(s.y - s.px * 2.5)
        for (const [x, y, c] of SPR[s.k]) { g.fillStyle = c ? '#fff8ec' : s.c; g.fillRect(x0 + x * s.px, y0 + y * s.px, s.px, s.px) }
      }
      g.globalAlpha = 1
    },
  }
}
