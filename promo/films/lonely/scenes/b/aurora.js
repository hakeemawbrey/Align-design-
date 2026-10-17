// Warm aurora overlay for half b's Talk Deck beat (copied from film 2 f7: the S7 ray curtain on a low hem,
// plus two slow warm blooms). build(parent) → { root, update(t, k) } where k (0..1) is the arrival / opacity.
import { clamp, lerp, ease, rng, el } from '../../../../src/lib.js'
import { W, H, fill } from '../../../../src/scenes/common.js'

export function buildAurora(parent) {
  const root = fill(parent, { background: 'transparent', opacity: 0 })
  const AU = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'screen' }, root)
  AU.width = W; AU.height = H
  const au = AU.getContext('2d')
  const NR = 300, HEM = 0.76
  const ar = rng(7171), RAYS = Array.from({ length: NR }, (_, k) => ({ u: (k + ar()) / NR, h: 0.55 + ar() * 0.7, a: 0.35 + ar() * 0.65, ph: ar() * 6.28, sp: 0.6 + ar() * 1.4, w: 1.6 + ar() * 2.6 }))
  const hemY = (u, t, hh) => hh * (HEM + 0.02 * Math.sin(u * 5.2 + t * 0.45) + 0.009 * Math.sin(u * 13 - t * 0.8))
  function drawAurora(t, k) {
    au.clearRect(0, 0, W, H)
    au.globalCompositeOperation = 'lighter'
    RAYS.forEach(r => {
      const x = r.u * W, hem = hemY(r.u, t, H) + (1 - k) * 40
      const env = Math.pow(Math.sin(Math.PI * clamp(r.u * 1.08 - 0.04, 0, 1)), 0.7)
      const fl = r.a * (0.55 + 0.45 * Math.sin(t * r.sp + r.ph)) * env * k
      const len = H * 0.3 * r.h * (0.85 + 0.15 * Math.sin(t * 0.6 + r.ph)) * lerp(0.3, 1, ease.outCubic(k))
      const warm = clamp(1 - r.u * 2.2, 0, 1)
      const c0 = `${Math.round(lerp(232, 242, warm))},${Math.round(lerp(98, 154, warm))},${Math.round(lerp(138, 74, warm))}`
      const g = au.createLinearGradient(0, hem, 0, hem - len)
      g.addColorStop(0, 'rgba(255,214,226,0)')
      g.addColorStop(0.03, `rgba(255,190,214,${0.45 * fl})`)
      g.addColorStop(0.1, `rgba(${c0},${0.55 * fl})`)
      g.addColorStop(0.42, `rgba(190,96,240,${0.22 * fl})`)
      g.addColorStop(1, 'rgba(140,90,255,0)')
      au.fillStyle = g
      au.globalAlpha = 0.55; au.fillRect(x - r.w * 2, hem - len, r.w * 4, len + 2)
      au.globalAlpha = 1; au.fillRect(x - r.w / 2, hem - len, r.w, len + 2)
    })
    au.beginPath()
    for (let i = 0; i <= 96; i++) { const u = i / 96, y = hemY(u, t, H) + (1 - k) * 40; i ? au.lineTo(u * W, y) : au.moveTo(u * W, y) }
    const hg = au.createLinearGradient(0, 0, W, 0)
    hg.addColorStop(0, 'rgba(242,154,74,0)'); hg.addColorStop(0.18, `rgba(242,154,74,${0.4 * k})`); hg.addColorStop(0.5, `rgba(255,130,180,${0.5 * k})`)
    hg.addColorStop(0.85, `rgba(190,110,255,${0.4 * k})`); hg.addColorStop(1, 'rgba(190,110,255,0)')
    au.strokeStyle = hg; au.lineWidth = 4; au.shadowColor = `rgba(255,120,180,${0.8 * k})`; au.shadowBlur = 24
    au.stroke(); au.shadowBlur = 0
    au.globalCompositeOperation = 'source-over'
  }
  const BLOOM = [
    { c: '242,154,74', x: 0.26, y: 1.1, r: 760, a: 0.26 },
    { c: '232,98,138', x: 0.55, y: 1.12, r: 700, a: 0.22 },
    { c: '180,92,255', x: 0.8, y: 1.08, r: 820, a: 0.26 },
  ].map((b, i) => ({ ...b, i, e: el('div', { position: 'absolute', left: 0, top: 0, width: b.r * 2 + 'px', height: b.r * 2 + 'px', borderRadius: '50%', mixBlendMode: 'screen',
    background: `radial-gradient(closest-side, rgba(${b.c},${b.a}), rgba(${b.c},${b.a * 0.4}) 48%, rgba(${b.c},0) 100%)` }, root) }))

  return {
    root,
    update(t, k, arrive = k) {
      root.style.opacity = String(k)
      if (k <= 0.002) { root.style.display = 'none'; return }
      root.style.display = 'block'
      drawAurora(t, arrive)
      BLOOM.forEach(b => {
        b.e.style.transform = `translate(${b.x * W - b.r + Math.sin(t * 0.4 + b.i * 2) * 70}px, ${b.y * H - b.r + Math.cos(t * 0.5 + b.i) * 30}px)`
      })
    },
  }
}
