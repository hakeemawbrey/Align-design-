import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ──────────────────────────────────────── S7 · gradient tagline + app card
export function sceneTagline(stage, assets) {
  const root = fill(stage, { background: C.paper })
  const blobs = [
    { c: '232,98,138', x: 0.55, y: 0.85, r: 900 },
    { c: '242,154,74', x: 0.2, y: 0.95, r: 800 },
    { c: '180,92,255', x: 0.8, y: 0.55, r: 760 },
    { c: '242,199,92', x: 0.35, y: 0.65, r: 600 },
    { c: '154,123,224', x: 0.12, y: 0.35, r: 700 },
  ].map(b => ({ ...b, e: el('div', { position: 'absolute', width: b.r * 2 + 'px', height: b.r * 2 + 'px', borderRadius: '50%', background: `radial-gradient(closest-side, rgba(${b.c},0.95), rgba(${b.c},0.45) 45%, rgba(${b.c},0) 100%)`, mixBlendMode: 'normal' }, root) }))
  const wash = fill(root, { background: 'linear-gradient(180deg, rgba(235,229,220,0.85) 0%, rgba(235,229,220,0.25) 40%, rgba(235,229,220,0) 70%)' })
  const tag = new TypeLine(root, 'Dating, dealt by the stars', {
    left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 300, fontSize: '46px', letterSpacing: '-0.01em',
  }, { perChar: 0.04, final: '#fffaf2', accent: ['#ffffff', '#fff1c9', '#ffd6e4'] })
  const ticks = new Ticks(root, C.ink, 9)
  // app screen landing in perspective
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '1800px' }, root)
  const shot = el('div', { position: 'absolute', left: '50%', top: '50%', width: '360px', height: '779px', borderRadius: '46px', overflow: 'hidden', boxShadow: '0 50px 120px rgba(60,20,80,0.45), 0 0 0 1px rgba(255,255,255,0.35)', background: C.canvas, opacity: 0 }, persp)
  const shotImg = img(shot, assets.screen || IMG + 'juniper.jpg', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  const handles = new Ticks(root, C.ink, 12)
  const dots = [C.gold, C.spark].map(c => el('div', { position: 'absolute', width: '16px', height: '16px', borderRadius: '50%', background: c, boxShadow: `0 0 18px ${c}` }, root))

  return {
    start: 22.4, end: 27.0, root,
    update(t) {
      blobs.forEach((b, i) => {
        const x = b.x * W + Math.sin(t * 0.7 + i * 1.7) * 120 - b.r
        const y = b.y * H + Math.cos(t * 0.55 + i) * 80 - b.r + lerp(500, 0, ease.outCubic(prog(t, 22.4, 23.2)))
        b.e.style.transform = `translate(${x}px, ${y}px)`
      })
      wash.style.opacity = String(lerp(1, 0.55, prog(t, 22.4, 24)))
      tag.update(t - 23.0, { out: 1.6 })
      const tw2 = 760 * ease.outCubic(prog(t, 22.95, 23.6)), th = 110 * ease.outCubic(prog(t, 22.95, 23.6))
      ticks.update(W / 2, H / 2, tw2, th, prog(t, 22.95, 23.05) * (1 - prog(t, 24.55, 24.7)))
      // screen lands
      const L = ease.spring(prog(t, 24.65, 25.6), 0.05)
      const rx = lerp(38, 6, L), ry = lerp(-34, -10, L), rz = lerp(-14, -3, L)
      const sc = lerp(0.55, 1, L)
      shot.style.opacity = String(clamp(prog(t, 24.65, 24.85)))
      shot.style.transform = `translate(-50%,-50%) translateY(${lerp(140, 0, L)}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`
      const hp = prog(t, 24.7, 24.8) * (1 - prog(t, 26.2, 26.4))
      handles.update(W / 2, H / 2 + lerp(140, 0, L), 380 * sc * Math.cos(ry * Math.PI / 180), 790 * sc * Math.cos(rx * Math.PI / 180), hp)
      dots.forEach((d, i) => {
        const a = t * 1.4 + i * Math.PI
        d.style.left = (W / 2 + Math.cos(a) * 300 - 8) + 'px'
        d.style.top = (H / 2 + Math.sin(a) * 300 * 0.9 - 8) + 'px'
        d.style.opacity = String(prog(t, 25.0, 25.3))
      })
    },
  }
}
