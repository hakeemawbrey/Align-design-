// whop-remix · Houston + zodiac easter eggs: a tarot line-art sun, a turning zodiac wheel, a pixel-star Houston skyline,
// drifting zodiac glyphs, planets and shooting stars, and the corner "mission control" readout. All pure functions of t.
// No marks or logos: the skyline is a generic downtown silhouette drawn from rectangles.
import { clamp, lerp, prog, ease, rng, el } from '../../../src/lib.js'
import { W, H, VERT, MONO } from '../../../src/scenes/common.js'

export const ZODIAC = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((g) => g + '︎')
const GLYPH_FONT = '"DejaVu Sans", "Noto Sans Symbols", "Segoe UI Symbol", sans-serif'
const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }

// ─────────────────────────────────────────────── the sun (tarot line-art, like the talk deck's XIX The Sun)
/** prerendered: rays canvas (rotates) + disc canvas (still). R = disc radius in px */
function sunArt(R) {
  const S = Math.ceil(R * 4.4), m = S / 2
  const rays = cv(S, S), g = rays.getContext('2d')
  g.translate(m, m)
  g.lineCap = 'round'
  for (let k = 0; k < 32; k++) {
    const a = (k / 32) * Math.PI * 2, long = k % 2 === 0
    const r0 = R * 1.18, r1 = R * (long ? 2.05 : 1.62)
    g.save(); g.rotate(a)
    const gr = g.createLinearGradient(r0, 0, r1, 0)
    gr.addColorStop(0, 'rgba(255,222,150,0.9)'); gr.addColorStop(1, 'rgba(242,154,74,0)')
    g.strokeStyle = gr
    g.lineWidth = Math.max(1.5, R * (long ? 0.018 : 0.012))
    g.beginPath()
    if (long) { g.moveTo(r0, 0); g.lineTo(r1, 0) } else {
      // wavy ray (tarot style)
      for (let i = 0; i <= 24; i++) { const u = i / 24, x = lerp(r0, r1, u), y = Math.sin(u * Math.PI * 3) * R * 0.035 * (1 - u * 0.5); i ? g.lineTo(x, y) : g.moveTo(x, y) }
    }
    g.stroke(); g.restore()
  }
  // dotted outer orbit + fine ring
  g.fillStyle = 'rgba(255,230,180,0.55)'
  for (let k = 0; k < 96; k++) { const a = (k / 96) * Math.PI * 2; g.beginPath(); g.arc(Math.cos(a) * R * 2.18, Math.sin(a) * R * 2.18, Math.max(1, R * 0.006), 0, 6.29); g.fill() }
  const disc = cv(S, S), d = disc.getContext('2d')
  d.translate(m, m)
  const fill = d.createRadialGradient(-R * 0.25, -R * 0.3, R * 0.1, 0, 0, R)
  fill.addColorStop(0, 'rgba(255,236,180,1)'); fill.addColorStop(0.5, 'rgba(246,190,80,0.95)'); fill.addColorStop(1, 'rgba(236,112,96,0.9)')
  d.fillStyle = fill; d.beginPath(); d.arc(0, 0, R, 0, 6.29); d.fill()
  d.strokeStyle = 'rgba(255,236,190,0.9)'; d.lineWidth = Math.max(1.5, R * 0.012)
  d.beginPath(); d.arc(0, 0, R * 1.08, 0, 6.29); d.stroke()
  d.beginPath(); d.arc(0, 0, R * 0.82, 0, 6.29); d.strokeStyle = 'rgba(169,110,46,0.35)'; d.stroke()
  return { rays, disc, S }
}
/** a big soft sun that sits behind the nebula/cards: makeSun(parent, R) → { root, update(t, { x, y, a, rot }) } */
export function makeSun(parent, R) {
  const { rays, disc, S } = sunArt(R)
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: S + 'px', height: S + 'px', marginLeft: -S / 2 + 'px', marginTop: -S / 2 + 'px', pointerEvents: 'none', opacity: 0, mixBlendMode: 'screen' }, parent)
  el('div', { position: 'absolute', left: '-30%', top: '-30%', width: '160%', height: '160%', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(255,214,150,0.55), rgba(242,154,74,0.28) 22%, rgba(232,98,138,0.14) 46%, rgba(180,92,255,0) 72%)' }, root)
  const rc = el('canvas', { position: 'absolute', left: 0, top: 0, width: S + 'px', height: S + 'px' }, root); rc.width = rc.height = S; rc.getContext('2d').drawImage(rays, 0, 0)
  const dc = el('canvas', { position: 'absolute', left: 0, top: 0, width: S + 'px', height: S + 'px' }, root); dc.width = dc.height = S; dc.getContext('2d').drawImage(disc, 0, 0)
  return {
    root,
    update(t, { x, y, a = 1, rot = t * 3 }) {
      root.style.transform = `translate(${x}px, ${y}px)`
      root.style.opacity = String(a)
      rc.style.transform = `rotate(${rot}deg)`
      dc.style.opacity = String(0.82 + 0.06 * Math.sin(t * 1.3))
    },
  }
}

// ─────────────────────────────────────────────── zodiac wheel
/** a faint wheel: two rings, 12 houses, the 12 glyphs; rotate via update(t, { x, y, a, rot }) */
export function makeWheel(parent, R, color = '239,230,214') {
  const S = Math.ceil(R * 2.3), m = S / 2
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: S + 'px', height: S + 'px', marginLeft: -m + 'px', marginTop: -m + 'px', pointerEvents: 'none', opacity: 0 }, parent)
  c.width = c.height = S
  const g = c.getContext('2d')
  g.translate(m, m)
  g.strokeStyle = `rgba(${color},0.8)`; g.lineWidth = 1.4
  g.beginPath(); g.arc(0, 0, R, 0, 6.29); g.stroke()
  g.beginPath(); g.arc(0, 0, R * 0.8, 0, 6.29); g.stroke()
  g.lineWidth = 1
  g.beginPath(); g.arc(0, 0, R * 1.04, 0, 6.29); g.setLineDash([2, 7]); g.stroke(); g.setLineDash([])
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * Math.PI * 2
    g.beginPath(); g.moveTo(Math.cos(a) * R * 0.8, Math.sin(a) * R * 0.8); g.lineTo(Math.cos(a) * R, Math.sin(a) * R); g.stroke()
    for (let j = 1; j < 6; j++) { const b = a + (j / 6) * (Math.PI / 6); g.beginPath(); g.moveTo(Math.cos(b) * R * 0.97, Math.sin(b) * R * 0.97); g.lineTo(Math.cos(b) * R, Math.sin(b) * R); g.stroke() }
    const ga = a + Math.PI / 12
    g.save(); g.translate(Math.cos(ga) * R * 0.9, Math.sin(ga) * R * 0.9); g.rotate(ga + Math.PI / 2)
    g.fillStyle = `rgba(${color},0.95)`; g.font = `${Math.round(R * 0.11)}px ${GLYPH_FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle'
    g.fillText(ZODIAC[k], 0, 0); g.restore()
  }
  return { root: c, update(t, { x, y, a = 1, rot }) { c.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`; c.style.opacity = String(a) } }
}

// ─────────────────────────────────────────────── pixel-star Houston skyline (generic downtown silhouette)
function skylineShape(seed) {
  const r = rng(seed), out = []
  // a dense downtown cluster in the middle, lower blocks to the sides; a few stepped / pointed crowns
  let x = 0
  while (x < 1) {
    const d = Math.abs(x - 0.52), core = Math.exp(-d * d / 0.03)
    const w = 0.018 + r() * 0.03, h = 0.12 + core * (0.55 + r() * 0.45) + r() * 0.08
    const crown = core > 0.4 ? Math.floor(r() * 4) : 0  // 0 flat, 1 stepped, 2 pointed, 3 slanted
    out.push({ x, w, h, crown, win: r() })
    x += w + r() * 0.006
  }
  return out
}
/** canvas skyline along the bottom: y = baseline, h = tallest tower height; stars trace the roofs, windows twinkle */
export function makeSkyline(parent, { y = H, h = VERT ? 320 : 220, w = W, x0 = 0, seed = 713, px = VERT ? 5 : 4 } = {}) {
  const c = el('canvas', { position: 'absolute', left: x0 + 'px', top: (y - h) + 'px', width: w + 'px', height: h + 'px', pointerEvents: 'none', imageRendering: 'pixelated', opacity: 0 }, parent)
  const cw = Math.ceil(w / px), ch = Math.ceil(h / px)
  c.width = cw; c.height = ch
  const g = c.getContext('2d')
  const B = skylineShape(seed)
  // static silhouette into a buffer
  const sil = cv(cw, ch), s = sil.getContext('2d')
  const roof = []   // roof-line points for the stars
  const wins = []
  B.forEach((b) => {
    const bx = Math.round(b.x * cw), bw = Math.max(2, Math.round(b.w * cw)), bh = Math.round(b.h * ch * 0.86)
    const top = ch - bh
    const gr = s.createLinearGradient(0, top, 0, ch); gr.addColorStop(0, 'rgba(26,14,58,0.95)'); gr.addColorStop(1, 'rgba(11,6,32,1)')
    s.fillStyle = gr; s.fillRect(bx, top, bw, bh)
    if (b.crown === 1) { s.fillRect(bx + 1, top - 3, bw - 2, 3); s.fillRect(bx + 2, top - 5, Math.max(1, bw - 4), 2) }
    if (b.crown === 2) { for (let k = 0; k < Math.ceil(bw / 2); k++) s.fillRect(bx + k, top - k, bw - 2 * k, 1); roof.push([bx + bw / 2, top - Math.ceil(bw / 2) - 1]) }
    if (b.crown === 3) { for (let k = 0; k < bw; k++) s.fillRect(bx + k, top - Math.round(k * 0.5), 1, Math.round(k * 0.5) + 1) }
    for (let k = 0; k < bw; k += 2) roof.push([bx + k, top - (b.crown === 1 ? 6 : 1)])
    for (let yy = top + 3; yy < ch - 2; yy += 3) for (let xx = bx + 1; xx < bx + bw - 1; xx += 2) if (rng(xx * 131 + yy * 7 + seed)() < 0.16 + b.win * 0.12) wins.push([xx, yy, rng(xx * 17 + yy)()])
  })
  const ROOF = roof.filter((_, i) => rng(i * 37 + seed)() < 0.35)
  return {
    root: c,
    update(t, a = 1) {
      c.style.opacity = String(a)
      if (a <= 0.001) return
      g.clearRect(0, 0, cw, ch)
      g.drawImage(sil, 0, 0)
      const f = Math.floor(t * 8)
      for (const [x, y, ph] of wins) {
        const on = Math.sin(t * (0.6 + ph) + ph * 40) > -0.2
        if (!on) continue
        g.fillStyle = ph < 0.2 ? 'rgba(242,199,92,0.75)' : ph < 0.35 ? 'rgba(255,143,177,0.55)' : 'rgba(239,230,214,0.45)'
        g.fillRect(x, y, 1, 1)
      }
      // pixel stars along the roof line
      ROOF.forEach(([x, y], i) => {
        const tw = (f + i * 3) % 7
        g.fillStyle = i % 5 === 0 ? 'rgba(242,199,92,0.95)' : 'rgba(255,246,234,0.85)'
        g.fillRect(Math.round(x), Math.round(y), 1, 1)
        if (tw === 0) { g.fillRect(Math.round(x) - 1, Math.round(y), 3, 1); g.fillRect(Math.round(x), Math.round(y) - 1, 1, 3) }
      })
      // the tallest tower's beacon
      g.fillStyle = Math.floor(t * 1.2) % 2 ? 'rgba(255,45,58,0.9)' : 'rgba(255,45,58,0.25)'
      const tall = B.reduce((m, b) => (b.h > m.h ? b : m), B[0])
      g.fillRect(Math.round((tall.x + tall.w / 2) * cw), ch - Math.round(tall.h * ch * 0.86) - 4, 1, 2)
    },
  }
}

// ─────────────────────────────────────────────── star field easter eggs: zodiac glyphs, planets, shooting stars
/** makeEggs(parent, { seed, glyphs, planets, shoots: [t0...], keep: [[x,y,w,h]] }) → { root, update(t, a) } */
export function makeEggs(parent, { seed = 1, glyphs = 6, planets = 2, shoots = [], keep = [], size = VERT ? 46 : 40 } = {}) {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none' }, parent)
  c.width = W; c.height = H
  const g = c.getContext('2d')
  const r = rng(seed)
  const away = (x, y) => !keep.some(([kx, ky, kw, kh]) => x > kx && x < kx + kw && y > ky && y < ky + kh)
  const pick = () => { for (let i = 0; i < 40; i++) { const x = 60 + r() * (W - 120), y = 60 + r() * (H - 120); if (away(x, y)) return [x, y] } return null }
  const G = Array.from({ length: glyphs }, () => pick()).filter(Boolean).map(([x, y]) => { return { x, y, k: Math.floor(r() * 12), ph: r() * 6.28, sp: 0.4 + r() * 0.5, s: size * (0.7 + r() * 0.6), dx: (r() - 0.5) * 10, dy: -3 - r() * 6 } })
  const PL = [['255,200,140', 7, true], ['170,190,255', 5, false], ['255,150,170', 4, false]]
  const P = Array.from({ length: planets }, () => pick()).filter(Boolean).map(([x, y], i) => { return { x, y, col: PL[i % 3][0], rad: PL[i % 3][1] * (VERT ? 1.2 : 1), ring: PL[i % 3][2], ph: r() * 6.28 } })
  const S = shoots.map((t0) => { const x = W * (0.25 + r() * 0.6), y = H * (0.06 + r() * 0.25); return { t0, x, y, ang: Math.PI * (0.78 + r() * 0.1), len: (VERT ? 520 : 600) } })
  return {
    root: c,
    update(t, a = 1) {
      g.clearRect(0, 0, W, H)
      if (a <= 0.001) return
      g.textAlign = 'center'; g.textBaseline = 'middle'
      for (const q of G) {
        const al = a * (0.16 + 0.12 * Math.sin(t * q.sp + q.ph))
        g.font = `${Math.round(q.s)}px ${GLYPH_FONT}`
        g.shadowColor = 'rgba(242,199,92,0.6)'; g.shadowBlur = 12
        g.fillStyle = `rgba(242,226,190,${al.toFixed(3)})`
        g.fillText(ZODIAC[q.k], q.x + q.dx * t * 0.1, q.y + q.dy * t * 0.1)
      }
      g.shadowBlur = 0
      for (const p of P) {
        const gl = g.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.rad * 5)
        gl.addColorStop(0, `rgba(${p.col},${0.55 * a})`); gl.addColorStop(1, `rgba(${p.col},0)`)
        g.fillStyle = gl; g.beginPath(); g.arc(p.x, p.y, p.rad * 5, 0, 6.29); g.fill()
        g.fillStyle = `rgba(${p.col},${0.95 * a})`; g.beginPath(); g.arc(p.x, p.y, p.rad, 0, 6.29); g.fill()
        if (p.ring) { g.strokeStyle = `rgba(${p.col},${0.6 * a})`; g.lineWidth = 1.2; g.beginPath(); g.ellipse(p.x, p.y, p.rad * 2.3, p.rad * 0.7, -0.35, 0, 6.29); g.stroke() }
      }
      for (const s of S) {
        const p = prog(t, s.t0, s.t0 + 0.7)
        if (p <= 0 || p >= 1) continue
        const e = ease.outCubic(p), hx = s.x + Math.cos(s.ang) * s.len * e, hy = s.y + Math.sin(s.ang) * s.len * e
        const tail = s.len * 0.35 * Math.sin(Math.PI * p)
        const tx = hx - Math.cos(s.ang) * tail, ty = hy - Math.sin(s.ang) * tail
        const gr = g.createLinearGradient(tx, ty, hx, hy)
        gr.addColorStop(0, 'rgba(255,246,234,0)'); gr.addColorStop(1, `rgba(255,246,234,${0.9 * a * (1 - p * 0.6)})`)
        g.strokeStyle = gr; g.lineWidth = 2; g.beginPath(); g.moveTo(tx, ty); g.lineTo(hx, hy); g.stroke()
        g.fillStyle = `rgba(255,250,240,${a * (1 - p * 0.5)})`; g.fillRect(Math.round(hx) - 1, Math.round(hy) - 1, 3, 3)
      }
    },
  }
}

// ─────────────────────────────────────────────── corner readout (mission control): coordinates + the section's nickname
const NICK = [
  [3.5, 6.9, 'H-TOWN · 713'], [6.9, 10.4, 'SPACE CITY'], [10.4, 14.2, 'BAYOU CITY'],
  [14.2, 18.8, 'MISSION CONTROL'], [18.8, 22.4, 'INSIDE THE LOOP'], [22.4, 25.3, 'SPACE CITY'],
]
export function sceneHud(stage) {
  const root = el('div', { position: 'absolute', left: (VERT ? 48 : 56) + 'px', top: (VERT ? 54 : 46) + 'px', pointerEvents: 'none' }, stage)
  const st = { fontFamily: MONO, fontSize: (VERT ? 22 : 18) + 'px', letterSpacing: '0.24em', color: 'rgba(239,230,214,0.62)', whiteSpace: 'nowrap', textShadow: '0 0 10px rgba(8,4,24,0.9), 0 0 3px rgba(8,4,24,0.9)' }
  const row1 = el('div', { ...st, display: 'flex', alignItems: 'center', gap: '12px' }, root,
    `<span style="display:inline-block;width:${VERT ? 9 : 8}px;height:${VERT ? 9 : 8}px;border-radius:50%;background:#ff2d3a;box-shadow:0 0 8px #ff2d3a"></span><span>29.76° N · 95.37° W</span>`)
  const dot = row1.firstChild
  const nick = NICK.map(([, , txt]) => el('div', { ...st, position: 'absolute', left: (VERT ? 21 : 20) + 'px', top: (VERT ? 34 : 28) + 'px', color: 'rgba(242,199,92,0.8)', opacity: 0 }, root, txt))
  return {
    start: 3.5, end: 25.3, root,
    update(t) {
      root.style.zIndex = '900'
      root.style.opacity = String(ease.outQuad(prog(t, 3.6, 4.1)) * (1 - ease.inQuad(prog(t, 24.9, 25.25))))
      dot.style.opacity = String(Math.floor(t * 1.6) % 2 ? 1 : 0.3)
      NICK.forEach(([a, b], i) => {
        const p = Math.min(ease.outCubic(prog(t, a + 0.15, a + 0.55)), 1 - ease.inQuad(prog(t, b - 0.3, b)))
        nick[i].style.opacity = String(Math.max(0, p))
        nick[i].style.letterSpacing = lerp(0.5, 0.24, clamp(p)) + 'em'
      })
    },
  }
}
