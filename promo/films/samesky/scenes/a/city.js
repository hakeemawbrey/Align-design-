// samesky half a: procedural Houston at night. Pure data at module load (rng), baked to layer canvases in bakeCity().
// Layer coords are "base screen px": where things sit at camera zoom 1, no pan, no tilt.
// camLayer(cam, f) maps base px → screen px for a layer of depth factor f (0 far … 1 near): dolly zoom + pan + crane.
import { rng, clamp, lerp } from '../../../../src/lib.js'

export const X0 = -620, X1 = 2540           // horizontal extent of every layer (covers the wide pull-back)
const R = 1.5                                // bake resolution (layer px per base px)

// ── layers far → near: depth factor, base line, vertical extent, silhouette colour, haze
export const LAYERS = [
  { id: 'far', f: 0.30, base: 812, y0: 600, y1: 900, body: [42, 32, 86], haze: [96, 74, 158], hazeA: 0.8, hazeH: 150 },
  { id: 'mid', f: 0.55, base: 850, y0: 380, y1: 940, body: [36, 27, 76], haze: [84, 62, 146], hazeA: 0.66, hazeH: 300 },
  { id: 'down', f: 0.75, base: 910, y0: 230, y1: 1000, body: [15, 10, 36], haze: [62, 46, 118], hazeA: 0.42, hazeH: 300 },
  { id: 'near', f: 0.92, base: 1010, y0: 690, y1: 1190, body: [11, 8, 30], haze: [52, 38, 100], hazeA: 0.36, hazeH: 200 },
  { id: 'fg', f: 1.08, base: 1120, y0: 900, y1: 1240, body: [5, 3, 14], haze: [40, 28, 80], hazeA: 0.0, hazeH: 1 },
]
export const FREEWAY_F = 0.97

const WARM = [255, 206, 146], WHITE = [236, 230, 255], COLD = [150, 176, 255], AMBER = [255, 176, 110]

// ── tower shapes → polygon (base px)
function shape(b) {
  const { cx, w, top, base, style } = b
  const L = cx - w / 2, Rr = cx + w / 2
  switch (style) {
    case 'step': { const h = w * 0.55, i = w * 0.16
      return [[L, base], [L, top + h], [L + i, top + h], [L + i, top], [Rr - i, top], [Rr - i, top + h], [Rr, top + h], [Rr, base]] }
    case 'gable': { // Bank of America Center: three stepped gabled tiers
      const pts = [[L, base]]
      const tiers = [[0, top + w * 0.95], [0.17, top + w * 0.5], [0.33, top + w * 0.12]]
      tiers.forEach(([inset, y], k) => {
        const l = L + w * inset
        if (k > 0) pts.push([l, tiers[k - 1][1]])
        pts.push([l, y + w * 0.06], [l + w * 0.045, y], [l + w * 0.09, y + w * 0.06])
      })
      const peakX = cx
      pts.push([peakX, top])
      for (let k = tiers.length - 1; k >= 0; k--) {
        const [inset, y] = tiers[k], r = Rr - w * inset
        pts.push([r - w * 0.09, y + w * 0.06], [r - w * 0.045, y], [r, y + w * 0.06])
        if (k > 0) pts.push([r, tiers[k - 1][1]])
      }
      pts.push([Rr, base]); return pts }
    case 'pyramid': { // Heritage Plaza: stepped Mayan top + a small mast
      const y1 = top + w * 0.62, pts = [[L, base], [L, y1]]
      const n = 4
      for (let k = 0; k < n; k++) { const inset = w * (0.08 + k * 0.085), y = y1 - (k + 1) * w * 0.11; pts.push([L + inset, pts[pts.length - 1][1]], [L + inset, y]) }
      const yT = pts[pts.length - 1][1]
      pts.push([cx - 2, yT], [cx - 2, top], [cx + 2, top], [cx + 2, yT])
      const right = []
      for (let k = n - 1; k >= 0; k--) { const inset = w * (0.08 + k * 0.085), y = y1 - (k + 1) * w * 0.11, yN = k === 0 ? y1 : y1 - k * w * 0.11; right.push([Rr - inset, y], [Rr - inset, yN]) }
      return [...pts, ...right, [Rr, y1], [Rr, base]] }
    case 'slantL': return [[L, base], [L, top + w * 0.9], [Rr, top], [Rr, base]]
    case 'slantR': return [[L, base], [L, top], [Rr, top + w * 0.9], [Rr, base]]
    case 'curve': { // Wells Fargo Plaza: rounded stepped crown
      const pts = [[L, base], [L, top + w * 0.5]]
      for (let i = 0; i <= 10; i++) { const a = Math.PI - (i / 10) * Math.PI / 2; pts.push([L + w * 0.5 + Math.cos(a) * w * 0.5, top + w * 0.5 - Math.sin(a) * w * 0.5]) }
      pts.push([Rr - w * 0.12, top], [Rr - w * 0.12, top + w * 0.18], [Rr, top + w * 0.18], [Rr, base]); return pts }
    case 'chamfer': return [[L, base], [L, top], [Rr - w * 0.34, top], [Rr, top + w * 0.34], [Rr, base]]
    case 'spire': { const y1 = top + w * 0.85; return [[L, base], [L, y1], [L + w * 0.18, y1 - w * 0.12], [cx, top], [Rr - w * 0.18, y1 - w * 0.12], [Rr, y1], [Rr, base]] }
    case 'needle': { const y1 = top + w * 1.6; return [[L, base], [L, y1], [cx - w * 0.2, top + w * 0.35], [cx, top], [cx + w * 0.2, top + w * 0.35], [Rr, y1], [Rr, base]] }
    case 'mast': return [[L, base], [L, top + 46], [cx - 1.2, top + 46], [cx - 1.2, top], [cx + 1.2, top], [cx + 1.2, top + 46], [Rr, top + 46], [Rr, base]]
    default: return [[L, base], [L, top], [Rr, top], [Rr, base]]
  }
}

// ── generation (pure)
function genLayer(li) {
  const L = LAYERS[li], r = rng(7100 + li * 131), out = []
  const add = (o) => { const b = { base: L.base + 40, ...o }; b.poly = shape(b); out.push(b); return b }
  if (L.id === 'far') {
    for (let x = X0; x < X1;) { const w = 18 + r() * 60; add({ cx: x + w / 2, w, top: L.base - 26 - Math.pow(r(), 1.6) * 120, style: r() < 0.12 ? 'step' : 'flat', cell: [3.2, 4.4], win: [1.6, 2.2], lit: 0.34 + r() * 0.2 }); x += w * (0.55 + r() * 0.6) }
    // a second, taller sprinkle (distant towers of the Medical Center / Galleria)
    for (let i = 0; i < 26; i++) { const w = 16 + r() * 30; add({ cx: X0 + r() * (X1 - X0), w, top: L.base - 120 - r() * 110, style: r() < 0.3 ? 'mast' : 'flat', cell: [3.4, 4.6], win: [1.7, 2.3], lit: 0.3 + r() * 0.2 }) }
  } else if (L.id === 'mid') {
    for (let x = X0; x < X1;) { const w = 34 + r() * 70; const tall = r() < 0.35
      add({ cx: x + w / 2, w, top: L.base - 90 - (tall ? 180 + r() * 170 : r() * 140), style: ['flat', 'flat', 'step', 'mast', 'chamfer'][Math.floor(r() * 5)], cell: [5, 6.4], win: [2.2, 3], lit: 0.12 + r() * 0.18 })
      x += w * (0.7 + r() * 0.9) }
    add({ cx: 1930, w: 58, top: 392, style: 'needle', cell: [5, 6.4], win: [2.4, 3.2], lit: 0.3, beacon: true })   // Williams Tower, far right
  } else if (L.id === 'down') {
    // filler first (behind), landmarks + the two hero towers on top
    for (let x = X0; x < X1;) { const w = 60 + r() * 90
      const inCluster = x > 560 && x < 1340
      add({ cx: x + w / 2, w, top: (inCluster ? 470 : 600) + r() * 180, style: ['flat', 'step', 'flat', 'mast'][Math.floor(r() * 4)], cell: [7, 8.6], win: [3.2, 4.4], lit: 0.1 + r() * 0.18 })
      x += w * (0.8 + r() * 0.8) }
    const LM = [
      { cx: 668, w: 84, top: 382, style: 'pyramid' },          // Heritage Plaza
      { cx: 752, w: 50, top: 452, style: 'slantL' },           // Pennzoil twins
      { cx: 808, w: 50, top: 452, style: 'slantR' },
      { cx: 905, w: 104, top: 318, style: 'curve' },           // Wells Fargo Plaza
      { cx: 1002, w: 96, top: 282, style: 'chamfer', beacon: true }, // JPMorgan Chase Tower
      { cx: 1098, w: 98, top: 362, style: 'gable' },           // Bank of America Center
      { cx: 1196, w: 80, top: 384, style: 'spire', beacon: true }, // TC Energy Center
      { cx: 1274, w: 70, top: 470, style: 'flat' },
    ]
    LM.forEach(o => add({ ...o, cell: [7, 8.6], win: [3.6, 4.8], lit: 0.3, office: true, crown: true }))
    add({ cx: 384, w: 128, top: 548, style: 'step', cell: [9, 10.5], win: [4.6, 5.6], lit: 0.07, hero: 'A' })
    add({ cx: 1556, w: 118, top: 512, style: 'flat', cell: [9, 10.5], win: [4.6, 5.6], lit: 0.07, hero: 'B', beacon: true })
  } else if (L.id === 'near') {
    for (let x = X0; x < X1;) { const w = 120 + r() * 170
      add({ cx: x + w / 2, w, top: L.base - 70 - r() * 190, style: r() < 0.25 ? 'step' : 'flat', cell: [17, 20], win: [9, 11], lit: 0.12 + r() * 0.16, people: true })
      x += w * (0.85 + r() * 0.5) }
  } else {
    // foreground: low roofs, trees, a couple of street lamps (pure silhouette)
    // one continuous line of tree canopy and low roofs
    const pts = [[X0, L.base + 200]]
    let roof = 0
    for (let x = X0; x <= X1; x += 6) {
      if (roof <= 0 && r() < 0.012) roof = 60 + r() * 140
      const tree = 46 + 26 * Math.sin(x * 0.031) * Math.sin(x * 0.0071 + 1) + 9 * Math.sin(x * 0.09) * Math.sin(x * 0.023 + 2)
      const y = roof > 0 ? L.base - 70 - 10 * (roof % 3) : L.base - tree
      roof -= 6
      pts.push([x, y])
    }
    pts.push([X1, L.base + 200])
    const b = { cx: (X0 + X1) / 2, w: X1 - X0, top: L.base - 90, base: L.base + 200, style: 'poly', cell: [0, 0], win: [0, 0], lit: 0 }
    b.poly = pts; out.push(b)
  }
  return out
}

/** windows of a building (pure): { x, y, w, h, col, a, person } */
function genWindows(b, li, r) {
  const res = []
  const [cw, ch] = b.cell, [ww, wh] = b.win
  if (!cw) return res
  const L = b.cx - b.w / 2
  const cols = Math.floor((b.w - cw * 0.6) / cw)
  const off = (b.w - cols * cw) / 2
  const yStart = (b.style === 'flat' || b.style === 'mast' ? b.top : b.top + b.w * (b.style === 'pyramid' ? 0.66 : 0.55)) + ch * 0.8
  const hide = LAYERS[li].base - (li === 3 ? 6 : 20)
  let floor = 0
  for (let y = yStart; y < hide; y += ch, floor++) {
    // floors: office towers light whole floors (cleaning crews), residences scatter
    const fr = r()
    const floorMode = b.office ? (fr < 0.07 ? 0.95 : fr < 0.65 ? 0.05 : 0.3) : (fr < 0.04 ? 0.6 : b.lit)
    for (let c = 0; c < cols; c++) {
      const x = L + off + c * cw + (cw - ww) / 2
      if (!insidePoly(b.poly, x + ww / 2, y)) continue
      const p = r()
      const lit = p < floorMode
      const k = r()
      const col = b.office ? (k < 0.55 ? WHITE : k < 0.9 ? WARM : AMBER) : (k < 0.62 ? WARM : k < 0.8 ? AMBER : k < 0.9 ? WHITE : COLD)
      res.push({ x, y, w: ww, h: wh, lit, col, a: 0.55 + r() * 0.45, person: b.people && lit && r() < 0.5 ? (r() < 0.5 ? -1 : 1) : 0 })
    }
  }
  return res
}

function insidePoly(poly, x, y) {
  let ins = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if (((yi > y) !== (yj > y)) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) ins = !ins
  }
  return ins
}

// ── the city (pure data)
export const CITY = (() => {
  const layers = LAYERS.map((L, li) => {
    const r = rng(9100 + li * 17)
    const blds = genLayer(li)
    blds.forEach(b => { b.wins = genWindows(b, li, r) })
    return { ...L, li, blds }
  })
  // hero windows (layer 'down'): one lit window on each hero tower
  const down = layers[2]
  const heroA = down.blds.find(b => b.hero === 'A'), heroB = down.blds.find(b => b.hero === 'B')
  const pickHero = (b, fx, fy) => {
    let best = null, bd = 1e9
    for (const w of b.wins) { const d = Math.hypot(w.x - fx, w.y - fy); if (d < bd) { bd = d; best = w } }
    best.lit = false; best.hero = true; return best
  }
  const HA = pickHero(heroA, 362, 656), HB = pickHero(heroB, 1580, 622)
  // windows that go dark one by one (10.4–12.1) and a few that keep a cold phone flicker
  const rr = rng(4242), dyn = []
  const pool = []
  layers.forEach((L, li) => { if (li >= 1 && li <= 3) L.blds.forEach(b => b.wins.forEach(w => { if (w.lit && !w.hero) pool.push([li, w]) })) })
  const N = 150
  const picked = new Set()
  while (dyn.length < N) {
    const [li, w] = pool[Math.floor(rr() * pool.length)]
    if (picked.has(w)) continue
    // keep them inside the visible frame at the 10–12 camera and below the moon
    if (w.x < 120 || w.x > 1800 || w.y < 330) continue
    picked.add(w); w.lit = false
    const k = dyn.length / N
    dyn.push({ li, w, off: 10.5 + 1.55 * Math.pow(k, 0.8) + rr() * 0.04, phone: rr() < 0.14 })
  }
  dyn.sort((a, b) => a.off - b.off)
  // living windows: a few TV/phone flickers through the whole half
  const flick = []
  while (flick.length < 22) {
    const [li, w] = pool[Math.floor(rr() * pool.length)]
    if (picked.has(w)) continue
    picked.add(w); w.lit = false
    flick.push({ li, w, seed: flick.length * 13 + 5, sp: 3 + rr() * 5 })
  }
  // aviation beacons
  const beacons = []
  layers.forEach((L, li) => L.blds.forEach(b => { if (b.beacon || (b.style === 'mast' && li >= 1)) beacons.push({ li, x: b.cx, y: b.top - (b.style === 'needle' ? 4 : 2), ph: (b.cx * 0.013) % 1 }) }))
  return { layers, HA, HB, dyn, flick, beacons }
})()

// ── camera: { Z, F:[x,y], pan, tilt } → per-layer affine (screen = base * s + o)
export function camLayer(cam, f) {
  const s = 1 + (cam.Z - 1) * f
  return { s, ox: cam.F[0] - cam.F[0] * s + cam.pan * f, oy: cam.F[1] - cam.F[1] * s + cam.tilt * (1 + 0.14 * f) }
}
export const toScreen = (cam, f, x, y) => { const T = camLayer(cam, f); return [x * T.s + T.ox, y * T.s + T.oy, T.s] }

// ── bake layer canvases (silhouettes, static windows, rim light, haze) — once
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
export function bakeCity() {
  if (CITY.baked) return CITY
  for (const L of CITY.layers) {
    const c = document.createElement('canvas')
    c.width = Math.ceil((X1 - X0) * R); c.height = Math.ceil((L.y1 - L.y0) * R)
    const g = c.getContext('2d')
    g.setTransform(R, 0, 0, R, -X0 * R, -L.y0 * R)
    const pr = rng(31 + L.li)
    for (const b of L.blds) {
      g.beginPath(); b.poly.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath()
      // body: a faint vertical gradient (a touch lighter up top, where the sky glow catches it)
      const bg = g.createLinearGradient(0, b.top, 0, L.base)
      bg.addColorStop(0, rgba(L.body.map(v => v * 1.18), 1)); bg.addColorStop(1, rgba(L.body, 1))
      g.fillStyle = bg; g.fill()
      g.save(); g.clip()
      // facade: subtle vertical mullion stripes on the downtown towers
      if (L.li === 2 && b.office) { g.fillStyle = 'rgba(160,140,230,0.035)'; for (let x = b.cx - b.w / 2; x < b.cx + b.w / 2; x += 3.5) g.fillRect(x, b.top, 1, L.base - b.top) }
      // moon-side rim (moon is up and to the right): a thin cool edge on the right face
      const rim = g.createLinearGradient(b.cx + b.w / 2 - 10, 0, b.cx + b.w / 2, 0)
      rim.addColorStop(0, 'rgba(190,180,255,0)'); rim.addColorStop(1, `rgba(196,186,255,${[0.06, 0.09, 0.13, 0.1, 0.05][L.li]})`)
      g.fillStyle = rim; g.fillRect(b.cx + b.w / 2 - 10, b.top - 50, 10, L.base - b.top + 60)
      for (const w of b.wins) {
        if (w.lit) {
          if (L.li >= 2) { g.shadowColor = rgba(w.col, 0.55 * w.a); g.shadowBlur = L.li === 2 ? 7 : 12 }
          g.fillStyle = rgba(w.col, w.a * [0.5, 0.62, 0.9, 0.95, 1][L.li])
          g.fillRect(w.x, w.y, w.w, w.h)
          g.shadowBlur = 0; g.shadowColor = 'rgba(0,0,0,0)'
          if (w.person) {  // one person in the window: a tiny head-and-shoulders silhouette
            const px = w.x + w.w * (0.5 + 0.18 * w.person), py = w.y + w.h
            g.fillStyle = 'rgba(14,9,30,0.82)'
            g.beginPath(); g.arc(px, py - w.h * 0.56, w.w * 0.13, 0, Math.PI * 2); g.fill()
            g.beginPath(); g.ellipse(px, py, w.w * 0.26, w.h * 0.34, 0, Math.PI, 0); g.fill()
          }
        } else if (L.li >= 1) {
          g.fillStyle = `rgba(150,140,220,${0.025 + pr() * 0.03})`; g.fillRect(w.x, w.y, w.w, w.h)
        }
      }
      // lit crowns (Houston floods its tower tops): a soft wash down from the top
      if (b.crown) {
        const cg = g.createLinearGradient(0, b.top, 0, b.top + b.w * 1.1)
        cg.addColorStop(0, 'rgba(206,188,255,0.26)'); cg.addColorStop(0.4, 'rgba(170,150,240,0.08)'); cg.addColorStop(1, 'rgba(170,150,240,0)')
        g.fillStyle = cg; g.fillRect(b.cx - b.w, b.top - 4, b.w * 2, b.w * 1.2)
      }
      g.restore()
    }
    // haze: the lower part of every building sinks into the layer's haze
    g.globalCompositeOperation = 'source-atop'
    const hz = g.createLinearGradient(0, L.base - L.hazeH, 0, L.base)
    hz.addColorStop(0, rgba(L.haze, 0)); hz.addColorStop(1, rgba(L.haze, L.hazeA))
    g.fillStyle = hz; g.fillRect(X0, L.base - L.hazeH, X1 - X0, L.y1 - (L.base - L.hazeH))
    g.globalCompositeOperation = 'source-over'
    L.canvas = c
  }
  CITY.baked = true
  return CITY
}

export function drawLayer(ctx, cam, L, alpha = 1) {
  const T = camLayer(cam, L.f)
  ctx.globalAlpha = alpha
  ctx.drawImage(L.canvas, X0 * T.s + T.ox, L.y0 * T.s + T.oy, (X1 - X0) * T.s, (L.y1 - L.y0) * T.s)
  ctx.globalAlpha = 1
}

// ── freeway (dynamic): an elevated deck with sodium lamps and long-exposure light trails
const FW_Y = (x) => 968 + 22 * Math.sin((x + 300) / 620) - 0.012 * (x - 960)
export function drawFreeway(ctx, cam, t) {
  const T = camLayer(cam, FREEWAY_F)
  const S = (x, y) => [x * T.s + T.ox, y * T.s + T.oy]
  ctx.save()
  // deck
  ctx.beginPath()
  for (let x = X0; x <= X1; x += 20) { const [sx, sy] = S(x, FW_Y(x) - 7); x === X0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy) }
  for (let x = X1; x >= X0; x -= 20) { const [sx, sy] = S(x, FW_Y(x) + 9); ctx.lineTo(sx, sy) }
  ctx.closePath(); ctx.fillStyle = '#0a0720'; ctx.fill()
  // piers
  ctx.fillStyle = '#0a0720'
  for (let x = X0 + 40; x < X1; x += 150) { const [sx, sy] = S(x, FW_Y(x)); ctx.fillRect(sx - 4 * T.s, sy, 8 * T.s, 140 * T.s) }
  // deck edge highlight
  ctx.beginPath()
  for (let x = X0; x <= X1; x += 20) { const [sx, sy] = S(x, FW_Y(x) - 7); x === X0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy) }
  ctx.strokeStyle = 'rgba(170,150,230,0.22)'; ctx.lineWidth = 1.2 * T.s; ctx.stroke()
  // trails: lanes of headlights (warm white, toward camera-left) and taillights (red, right)
  ctx.globalCompositeOperation = 'lighter'
  const lanes = [
    { dy: -3.2, dir: -1, col: [255, 232, 196], sp: 330, n: 16, seed: 1 },
    { dy: -0.6, dir: -1, col: [255, 222, 180], sp: 300, n: 12, seed: 2 },
    { dy: 2.4, dir: 1, col: [255, 60, 70], sp: 280, n: 14, seed: 3 },
    { dy: 5.0, dir: 1, col: [255, 84, 76], sp: 250, n: 11, seed: 4 },
  ]
  const span = X1 - X0
  for (const ln of lanes) {
    const r = rng(600 + ln.seed)
    for (let i = 0; i < ln.n; i++) {
      const o = r() * span, len = 70 + r() * 140, a = 0.35 + r() * 0.45, spd = ln.sp * (0.85 + r() * 0.3)
      let hx = ((o + ln.dir * t * spd) % span + span) % span + X0
      // a streak from (hx) back along the travel direction
      const steps = 8
      for (let s = 0; s < steps; s++) {
        const x0 = hx - ln.dir * len * s / steps, x1 = hx - ln.dir * len * (s + 1) / steps
        const [ax, ay] = S(x0, FW_Y(x0) + ln.dy), [bx, by] = S(x1, FW_Y(x1) + ln.dy)
        ctx.strokeStyle = rgba(ln.col, a * (1 - s / steps) * 0.8)
        ctx.lineWidth = (1.6 - s * 0.1) * T.s
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()
      }
      const [hx2, hy2] = S(hx, FW_Y(hx) + ln.dy)
      const gl = ctx.createRadialGradient(hx2, hy2, 0, hx2, hy2, 9 * T.s)
      gl.addColorStop(0, rgba(ln.col, a * 0.55)); gl.addColorStop(1, rgba(ln.col, 0))
      ctx.fillStyle = gl; ctx.fillRect(hx2 - 9 * T.s, hy2 - 9 * T.s, 18 * T.s, 18 * T.s)
    }
  }
  // sodium lamps along the deck
  for (let x = X0 + 10; x < X1; x += 96) {
    const [sx, sy] = S(x, FW_Y(x) - 20)
    const gl = ctx.createRadialGradient(sx, sy, 0, sx, sy, 16 * T.s)
    gl.addColorStop(0, 'rgba(255,190,120,0.55)'); gl.addColorStop(0.25, 'rgba(255,160,90,0.16)'); gl.addColorStop(1, 'rgba(255,150,80,0)')
    ctx.fillStyle = gl; ctx.fillRect(sx - 16 * T.s, sy - 16 * T.s, 32 * T.s, 32 * T.s)
  }
  ctx.restore()
}

/** a single window rect in screen space for layer li */
export function winRect(cam, li, w) {
  const T = camLayer(cam, CITY.layers[li].f)
  return { x: w.x * T.s + T.ox, y: w.y * T.s + T.oy, w: w.w * T.s, h: w.h * T.s, s: T.s }
}
export { rgba, WARM, COLD, WHITE, clamp, lerp }
