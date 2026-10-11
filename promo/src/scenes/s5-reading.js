import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, A, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// first dealt card (S6 opens on it) — fxDots samples its colours
const DOT_SRC = A + 'card-profile-1.png'
let dotImg = null

// ───────────────────────────────────────────── S5 · Reading your sky
export function sceneReading(stage) {
  const root = fill(stage, { background: C.paper })
  // hidden copy of the first deck card so the loader waits for it (fxDots samples it)
  dotImg = img(root, DOT_SRC, { left: 0, top: 0, width: '2px', height: '3px', opacity: 0 })
  const block = el('div', { position: 'absolute', left: '0', top: '0' }, root)
  const title = el('div', { position: 'absolute', fontFamily: SERIF, fontStyle: 'italic', fontSize: '72px', fontWeight: 400, color: C.ink, whiteSpace: 'nowrap', letterSpacing: '-0.01em', lineHeight: 1 }, block)
  const tChars = [...'Reading your sky'].map((ch, i) => el('span', { opacity: 0, color: i === 0 ? C.violet : C.ink }, title, ch === ' ' ? ' ' : ch))
  const rail = el('div', { position: 'absolute', width: '2px', background: 'rgba(26,16,51,0.18)' }, block)
  const ITEMS = [
    { g: '☉', c: C.amber, label: 'Sun', sub: 'Taurus' },
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
    const sub = el('div', { fontSize: '34px', color: 'rgba(26,16,51,0.5)' }, r, '— ' + it.sub)
    return { r, ic, lab, sub, it }
  })
  const working = el('div', { position: 'absolute', fontFamily: MONO, fontSize: '18px', letterSpacing: '0.24em', textTransform: 'uppercase', whiteSpace: 'nowrap' }, block, 'Shuffling your deck…')
  const BLOCK_W = 470 // approx width of the widest row ("Dealing — your first deck") incl. indent
  let titleW = 0
  return {
    start: 14.05, end: 17.6, root,
    update(t) {
      if (!titleW) titleW = title.offsetWidth || 520
      tChars.forEach((s, i) => { s.style.opacity = String(ease.outQuad(prog(t, 14.25 + i * 0.018, 14.45 + i * 0.018))) })
      // title starts centred, then glides up/left so the whole list sits centred in frame
      const g = ease.spring(prog(t, 14.6, 15.2), 0.04)
      const shown = AT.filter(a => t >= a).length
      const listH = rows.reduce((h, row, i) => h + 64 * ease.spring(prog(t, AT[i], AT[i] + 0.4), 0.06), 0)
      const tx = lerp(W / 2 - titleW / 2, W / 2 - BLOCK_W / 2, g)
      const blockTop = lerp(H / 2 - 40, H / 2 - 50 - listH / 2 - 50, g)
      title.style.left = tx + 'px'; title.style.top = blockTop + 'px'
      title.style.transform = `scale(${lerp(1, 0.94, g)})`; title.style.transformOrigin = '0 0'
      let y = blockTop + 104
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
      const eyeTop = y + 26
      rail.style.left = (tx + 14) + 'px'; rail.style.top = (blockTop + 98) + 'px'
      rail.style.height = Math.max(0, eyeTop - 12 - (blockTop + 98)) + 'px'
      rail.style.opacity = String(g)
      working.style.left = (tx) + 'px'; working.style.top = eyeTop + 'px'
      const sh = (t * 0.9) % 1
      working.style.background = `linear-gradient(90deg, rgba(26,16,51,0.32) ${sh * 140 - 40}%, rgba(26,16,51,0.8) ${sh * 140 - 20}%, rgba(26,16,51,0.32) ${sh * 140}%)`
      working.style.webkitBackgroundClip = 'text'; working.style.color = 'transparent'
      working.style.opacity = String(g)
      block.style.opacity = String(1 - prog(t, 17.3, 17.45))
    },
  }
}

// ── fxDots: contained dot-matrix patch over the first dealt card (S5 → S6).
// Geometry must match S6's first card: card-profile-1 body (PNG box 120,114–1374,2116), 580px tall, centred at (W/2, H/2 − 10).
const BODY = [120, 114, 1374, 2116]
const PATCH_H = 580, PATCH_W = Math.round(580 * (BODY[2] - BODY[0]) / (BODY[3] - BODY[1])), PATCH_CX = W / 2, PATCH_CY = H / 2 - 10
const CELL = 17
let grid = null
function sampleGrid() {
  if (grid) return grid
  const cols = Math.round(PATCH_W / CELL), rows = Math.round(PATCH_H / CELL)
  if (!dotImg || !dotImg.complete || !dotImg.naturalWidth) return null
  const k = 4
  const cv = document.createElement('canvas'); cv.width = cols * k; cv.height = rows * k
  const c2 = cv.getContext('2d'); c2.imageSmoothingQuality = 'high'
  c2.drawImage(dotImg, BODY[0], BODY[1], BODY[2] - BODY[0], BODY[3] - BODY[1], 0, 0, cv.width, cv.height)
  const d = c2.getImageData(0, 0, cv.width, cv.height).data
  const cells = []
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    let r = 0, g = 0, b = 0, a = 0
    for (let j = 0; j < k; j++) for (let i = 0; i < k; i++) {
      const o = ((y * k + j) * cv.width + x * k + i) * 4
      const al = d[o + 3] / 255
      r += d[o] * al; g += d[o + 1] * al; b += d[o + 2] * al; a += al
    }
    const n = k * k
    if (a / n < 0.55) { cells.push(null); continue }
    // lift the dark card base a touch so the patch reads as colour, not a black block
    const lift = v => Math.round(Math.min(255, (v / a) * 1.18 + 14))
    cells.push([lift(r), lift(g), lift(b)])
  }
  grid = { cols, rows, cells }
  return grid
}

export function fxDots(ctx, t, opts = {}) {
  // timing is owned here (args from main.js are ignored): grow 17.15–17.45, hold, drain 17.55–17.8
  const t0 = 17.15, t1 = 17.82
  if (t <= t0 || t >= t1) return
  const gd = sampleGrid()
  const cols = gd ? gd.cols : Math.round(PATCH_W / CELL), rows = gd ? gd.rows : Math.round(PATCH_H / CELL)
  const ox = PATCH_CX - (cols * CELL) / 2, oy = PATCH_CY - (rows * CELL) / 2
  const pg = (t - 17.15) / 0.3           // growth front 0..1+ (centre → edges)
  const ps = (t - 17.55) / 0.25          // drain front
  const tint = ease.inOutQuad(prog(t, 17.3, 17.5)) // palette → sampled card colour
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const cell = gd ? gd.cells[y * cols + x] : [200, 120, 170]
    const r = rng(9 + x * 131 + y * 7)
    const jit = r()
    const pal = PIXEL_PALETTE[Math.floor(r() * PIXEL_PALETTE.length)]
    if (!cell) continue
    const dx = (x + 0.5) / cols - 0.5, dy = (y + 0.5) / rows - 0.5
    const d = Math.hypot(dx * 0.8, dy) / 0.62 // 0 centre … ~1 corners
    const grow = clamp((pg * 1.4 - d * 0.9 - jit * 0.45) * 3.2)
    const shrink = clamp((ps * 1.5 - d * 0.75 - jit * 0.5) * 3)
    const rad = CELL * 0.47 * ease.outQuad(grow) * (1 - ease.inQuad(shrink))
    if (rad < 0.4) continue
    const pr = parseInt(pal.slice(1, 3), 16), pgc = parseInt(pal.slice(3, 5), 16), pb = parseInt(pal.slice(5, 7), 16)
    const cr = Math.round(lerp(pr, cell[0], tint)), cg = Math.round(lerp(pgc, cell[1], tint)), cb = Math.round(lerp(pb, cell[2], tint))
    ctx.fillStyle = `rgb(${cr},${cg},${cb})`
    ctx.beginPath(); ctx.arc(ox + (x + 0.5) * CELL, oy + (y + 0.5) * CELL, rad, 0, Math.PI * 2); ctx.fill()
  }
}
