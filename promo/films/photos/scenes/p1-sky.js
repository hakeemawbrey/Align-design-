// photos · P1 the sky (0–15). Film 1 "space moods": teal (the cold hook) → rose (the chart, 2.75–3.25) → the dark
// lockup ground (10.15–10.7). Stars drift, a few pixel sparkles twinkle. Grain is NOT here (one global layer in p5).
import { prog, ease, rng, el } from '../../../src/lib.js'
import { SPACE_MOODS, makeStars } from '../../../src/scenes/common.js'
import { W, H, pixelStar, STAR3, STAR5, FI } from './kit.js'

const MOODS = {
  ...SPACE_MOODS,
  // ref-9: near-void indigo with one soft violet bloom behind the mark
  night: ['#0b0620', '#0e0828', [[154, 123, 224, 0.5, 0.46, 760, 0.26], [180, 92, 255, 0.5, 0.52, 1050, 0.12], [232, 98, 138, 0.86, 0.9, 520, 0.06]]],
}

/** spaceBackdrop (common.js) without its own grain */
function backdrop(parent, mood, seed, stars = 160) {
  const [top, bottom, blobs] = MOODS[mood]
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }, parent)
  const r = rng(seed * 31 + 7)
  const bs = blobs.map(([cr, cg, cb, x, y, rad, a]) => ({
    x, y, rad, ph: r() * 6.28, sp: 0.25 + r() * 0.3,
    e: el('div', { position: 'absolute', width: rad * 2 + 'px', height: rad * 2 + 'px', borderRadius: '50%', mixBlendMode: 'screen',
      background: `radial-gradient(closest-side, rgba(${cr},${cg},${cb},${a}), rgba(${cr},${cg},${cb},${a * 0.42}) 45%, rgba(${cr},${cg},${cb},0) 100%)` }, root),
  }))
  const sc = makeStars(root, stars, seed * 13 + 5)
  el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(120% 95% at 50% 50%, rgba(11,6,32,0) 55%, rgba(11,6,32,0.6) 100%)' }, root)
  return {
    root,
    update(t) {
      bs.forEach(b => {
        const x = b.x * W + Math.sin(t * b.sp + b.ph) * 70 - b.rad
        const y = b.y * H + Math.cos(t * b.sp * 0.8 + b.ph) * 45 - b.rad
        b.e.style.transform = `translate(${x}px, ${y}px)`
      })
      sc.style.transform = `translate(${Math.sin(t * 0.15 + seed) * 12}px, ${t * -4 % 40}px)`
    },
  }
}

// pixel sparkles (kept out of the badge corner and the caption band)
const SPK = (() => {
  const r = rng(4417), out = []
  while (out.length < 16) {
    const x = 40 + r() * (W - 80), y = 30 + r() * (H - 60)
    if (x < 470 && y < 160) continue
    if (Math.abs(y - 900) < 80 && Math.abs(x - 960) < 460) continue
    if (x > 230 && x < 1560 && y > 120 && y < 880) continue   // card, panels, checklist
    out.push({ x, y, ph: r() * 6.28, sp: 1.2 + r() * 2, big: r() < 0.3, col: ['#efe6d6', '#c9a6ff', '#ff8fb1', '#efe6d6'][Math.floor(r() * 4)] })
  }
  return out
})()

export default async function build(stage) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', background: '#0b0620' }, stage)
  const teal = backdrop(root, 'teal', 3)
  const rose = backdrop(root, 'rose', 2)
  const night = backdrop(root, 'night', 7, 140)
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')
  return {
    start: 0, end: 15.01, root,
    update(t) {
      const r1 = ease.inOutQuad(prog(t, 2.75, 3.25)), r2 = ease.inOutQuad(prog(t, 10.15, 10.7))
      teal.root.style.display = r1 < 1 ? 'block' : 'none'
      rose.root.style.display = r1 > 0 && r2 < 1 ? 'block' : 'none'
      night.root.style.display = r2 > 0 ? 'block' : 'none'
      rose.root.style.opacity = String(r1)
      night.root.style.opacity = String(r2)
      teal.update(t); rose.update(t); night.update(t)
      ctx.clearRect(0, 0, W, H)
      const fi = FI(t), off = 1 - r2 * 0.6
      for (const s of SPK) {
        const tw = 0.5 + 0.5 * Math.sin(t * s.sp + s.ph)
        if (tw < 0.18) continue
        const st = Math.floor((fi >> 2) + s.ph * 3) % 5
        pixelStar(ctx, s.big && st < 2 ? STAR5 : STAR3, s.x, s.y, s.big ? 4 : 3, s.col, 0.35 + 0.55 * tw * off)
      }
    },
  }
}
