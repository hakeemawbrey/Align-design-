import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ───────────────────────────────────────────── S5 · Reading your sky
export function sceneReading(stage) {
  const root = fill(stage, { background: C.paper })
  const block = el('div', { position: 'absolute', left: '0', top: '0' }, root)
  const title = el('div', { position: 'absolute', fontFamily: SANS, fontSize: '64px', fontWeight: 400, color: C.ink, whiteSpace: 'nowrap', letterSpacing: '-0.015em' }, block)
  const tChars = [...'Reading your sky'].map((ch, i) => el('span', { opacity: 0, color: i === 0 ? C.violet : C.ink }, title, ch === ' ' ? ' ' : ch))
  const rail = el('div', { position: 'absolute', width: '2px', background: 'rgba(26,16,51,0.18)' }, block)
  const ITEMS = [
    { g: '☉', c: '#d9a520', label: 'Sun', sub: 'Taurus' },
    { g: '☽', c: C.violet, label: 'Moon', sub: 'Sagittarius' },
    { g: '↑', c: C.rub, label: 'Rising', sub: 'Libra' },
    { g: '♀', c: '#3fae84', label: 'Venus', sub: 'Aries' },
    { g: '', c: C.rub, label: 'Dealing', sub: 'your first deck' },
  ]
  const AT = [14.75, 15.15, 15.55, 15.95, 16.35]
  const rows = ITEMS.map(it => {
    const r = el('div', { position: 'absolute', left: '0', display: 'flex', alignItems: 'center', gap: '18px', whiteSpace: 'nowrap', fontFamily: SANS }, block)
    const ic = el('div', { width: '38px', height: '38px', borderRadius: '9px', border: `2px solid ${it.c}`, color: it.c, display: it.g ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', fontSize: '24px', lineHeight: 1 }, r, it.g)
    const lab = el('div', { fontSize: '38px', color: it.c }, r, it.label)
    const sub = el('div', { fontSize: '34px', color: 'rgba(26,16,51,0.32)' }, r, '— ' + it.sub)
    return { r, ic, lab, sub, it }
  })
  const working = el('div', { position: 'absolute', fontFamily: SANS, fontSize: '30px', whiteSpace: 'nowrap' }, block, 'Working')
  return {
    start: 14.05, end: 17.6, root,
    update(t) {
      tChars.forEach((s, i) => { s.style.opacity = String(ease.outQuad(prog(t, 14.25 + i * 0.018, 14.45 + i * 0.018))) })
      // title starts centred, then glides to the upper left as rows arrive
      const g = ease.spring(prog(t, 14.6, 15.2), 0.04)
      const shown = AT.filter(a => t >= a).length
      const listH = rows.reduce((h, row, i) => h + 64 * ease.spring(prog(t, AT[i], AT[i] + 0.4), 0.06), 0)
      const tx = lerp(W / 2 - 250, 190, g)
      const blockTop = lerp(H / 2 - 40, H / 2 - 60 - listH / 2 - 40, g)
      title.style.left = tx + 'px'; title.style.top = blockTop + 'px'
      title.style.transform = `scale(${lerp(1, 0.85, g)})`; title.style.transformOrigin = '0 0'
      let y = blockTop + 96
      rows.forEach((row, i) => {
        const p = ease.spring(prog(t, AT[i], AT[i] + 0.4), 0.06)
        row.r.style.left = (tx + 44) + 'px'
        row.r.style.top = y + 'px'
        row.r.style.opacity = String(clamp(p * 1.5))
        row.r.style.transform = `translateY(${(1 - p) * 18}px)`
        const active = i === shown - 1 && t < 17.0
        row.lab.style.color = active ? row.it.c : C.ink
        y += 64 * p
      })
      rail.style.left = (tx + 14) + 'px'; rail.style.top = (blockTop + 92) + 'px'
      rail.style.height = Math.max(0, y - blockTop - 30) + 'px'
      rail.style.opacity = String(g)
      working.style.left = (tx) + 'px'; working.style.top = (y + 14) + 'px'
      const sh = (t * 0.9) % 1
      working.style.background = `linear-gradient(90deg, rgba(26,16,51,0.25) ${sh * 140 - 40}%, rgba(26,16,51,0.7) ${sh * 140 - 20}%, rgba(26,16,51,0.25) ${sh * 140}%)`
      working.style.webkitBackgroundClip = 'text'; working.style.color = 'transparent'
      working.style.opacity = String(g)
      block.style.opacity = String(1 - prog(t, 17.3, 17.45))
    },
  }
}

/** circles grid flooding the frame then draining (S5 → S6) */
export function fxDots(ctx, t, { start, dur, seed = 9 }) {
  const p = prog(t, start, start + dur)
  if (p <= 0 || p >= 1) return
  const size = 30
  const cols = Math.ceil(W / size), rows = Math.ceil(H / size)
  const cx0 = W * 0.6, cy0 = H * 0.4
  const maxD = Math.hypot(W, H) * 0.7
  for (let cy = 0; cy < rows; cy++) for (let cx = 0; cx < cols; cx++) {
    const x = cx * size + size / 2, y = cy * size + size / 2
    const r = rng(seed + cx * 131 + cy * 7)
    const d = Math.hypot(x - cx0, y - cy0) / maxD + r() * 0.25
    const grow = clamp((p * 1.9 - d) * 3)
    const shrink = clamp((p * 1.9 - 0.9 - d) * 3)
    const rad = (size * 0.46) * grow * (1 - shrink)
    if (rad < 0.5) continue
    ctx.fillStyle = PIXEL_PALETTE[Math.floor(r() * PIXEL_PALETTE.length)]
    ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill()
  }
}
