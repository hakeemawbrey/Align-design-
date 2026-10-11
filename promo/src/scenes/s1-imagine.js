import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ─────────────────────────────────────────────────────────────── S1 · Imagine
export function sceneImagine(stage) {
  const root = fill(stage, { background: C.void })
  const bg = img(root, IMG + 'juniper.jpg', {
    left: '50%', top: '50%', width: '1500px', height: '2000px', objectFit: 'cover',
    filter: 'blur(48px) saturate(1.35) brightness(1.08)', transformOrigin: '50% 50%',
  })
  const tint = fill(root, { background: 'linear-gradient(180deg, rgba(20,10,46,0.55) 0%, rgba(154,123,224,0.10) 45%, rgba(232,98,138,0.12) 100%)' })
  const bands = Array.from({ length: 7 }, () => el('div', { position: 'absolute', left: 0, width: W + 'px', height: '2px', background: 'rgba(255,247,236,0.35)', opacity: 0 }, root))
  const strips = Array.from({ length: 5 }, () => el('div', { position: 'absolute', left: 0, width: W + 'px', background: 'rgba(255,247,236,0.07)', opacity: 0, mixBlendMode: 'screen' }, root))
  const line = new TypeLine(root, 'Imagine if the stars swiped for you', {
    left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 300, fontSize: '50px', letterSpacing: '-0.01em',
  }, { perChar: 0.034, final: '#fff7ec', accent: [C.rub, C.amber, C.gold, C.plum] })
  const r = rng(7)
  const bandY = bands.map(() => r() * H)
  const stripY = strips.map(() => [r() * H, 30 + r() * 120])

  return {
    start: 0, end: 3.55, root,
    update(t) {
      const s = lerp(1.0, 1.12, ease.inOutQuad(prog(t, 0, 3.6)))
      bg.style.transform = `translate(-50%,-50%) translate(${lerp(-60, 40, prog(t, 0, 3.6))}px, ${lerp(30, -20, prog(t, 0, 3.6))}px) scale(${s})`
      bg.style.opacity = String(ease.outQuad(prog(t, 0, 0.5)))
      tint.style.opacity = String(lerp(1, 0.6, prog(t, 0, 3)))
      line.update(t - 0.45)
      const g = prog(t, 2.0, 3.3)
      bands.forEach((b, i) => {
        const on = g > 0 && noise1(t * 9 + i * 3, 3 + i) > 0.45
        b.style.top = (bandY[i] + Math.sin(t * 3 + i) * 40) + 'px'
        b.style.opacity = on ? String(0.25 + 0.5 * g) : '0'
      })
      strips.forEach((s2, i) => {
        s2.style.top = stripY[i][0] + 'px'; s2.style.height = stripY[i][1] + 'px'
        s2.style.opacity = g > 0 && noise1(t * 6 + i, 11 + i) > 0.5 ? String(g) : '0'
      })
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
        const rr = rng(seed * 131 + cx * 977 + cy * 31 + Math.floor(t * 20))
        ctx.fillStyle = PIXEL_PALETTE[Math.floor(rr() * PIXEL_PALETTE.length)]
      } else ctx.fillStyle = color
      ctx.fillRect(cx * size, cy * size, size + 0.5, size + 0.5)
    }
  }
  return false
}
