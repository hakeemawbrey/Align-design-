import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, A, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// first dealt card (S6 opens on it) — fxDots samples its colours
const DOT_SRC = A + 'card-profile-1.png'
let dotImg = null

// ───────────────────────────────────────────── S5 · Reading your sky
// Your own sign card (Taurus, "YOUR CARD" stamp) floats in on the right after Sun lands.
const SIGN = { src: 'card-sign-stamped.png', iw: 904, ih: 1156, body: [116, 124, 724, 1042] }
export function sceneReading(stage) {
  const root = fill(stage, { background: C.paper })
  // hidden copy of the first deck card so the loader waits for it (fxDots samples it)
  dotImg = img(root, DOT_SRC, { left: 0, top: 0, width: '2px', height: '3px', opacity: 0 })
  const block = el('div', { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px' }, root)
  const title = el('div', { position: 'absolute', fontFamily: SERIF, fontStyle: 'italic', fontSize: '92px', fontWeight: 400, color: C.ink, whiteSpace: 'nowrap', letterSpacing: '-0.01em', lineHeight: 1 }, block)
  const tChars = [...'Reading your sky'].map((ch, i) => el('span', { opacity: 0, color: i === 0 ? C.violet : C.ink }, title, ch === ' ' ? ' ' : ch))
  const rail = el('div', { position: 'absolute', width: '3px', background: 'rgba(26,16,51,0.18)' }, block)
  const ITEMS = [
    { g: '☉', c: C.amber, label: 'Sun', sub: 'Taurus' },
    { g: '☽', c: C.violet, label: 'Moon', sub: 'Sagittarius' },
    { g: '↑', c: C.rub, label: 'Rising', sub: 'Libra' },
    { g: '♀', c: '#3fae84', label: 'Venus', sub: 'Aries' },
    { g: '', c: C.rub, label: 'Dealing', sub: 'your first deck' },
  ]
  const AT = [14.75, 15.15, 15.55, 15.95, 16.35]
  const ROW = 80, INDENT = 60
  const rows = ITEMS.map(it => {
    const r = el('div', { position: 'absolute', left: '0', display: 'flex', alignItems: 'center', gap: '20px', whiteSpace: 'nowrap', fontFamily: SANS }, block)
    const ic = el('div', { width: '48px', height: '48px', boxSizing: 'border-box', borderRadius: '11px', border: `3px solid ${it.c}`, color: it.c, display: it.g ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', fontSize: '30px', lineHeight: 1 }, r, it.g)
    const lab = el('div', { fontSize: '48px', fontWeight: 500, color: it.c, letterSpacing: '-0.01em' }, r, it.label)
    const sub = el('div', { fontSize: '42px', color: 'rgba(26,16,51,0.5)', letterSpacing: '-0.01em' }, r, '— ' + it.sub)
    return { r, ic, lab, sub, it }
  })
  const working = el('div', { position: 'absolute', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.22em', textTransform: 'uppercase', whiteSpace: 'nowrap' }, block, 'Shuffling your deck…')

  // sign card: crop the baked green glow — body + stamp only, clean dark backing shadow
  const SC = 600 / (SIGN.body[3] - SIGN.body[1])
  const cw = SIGN.iw * SC, chh = SIGN.ih * SC
  const card = el('div', { position: 'absolute', left: (1420 - cw / 2) + 'px', top: (H / 2 - chh / 2 - 6) + 'px', width: cw + 'px', height: chh + 'px', opacity: 0, willChange: 'transform' }, root)
  const [bl, bt, br, bb] = SIGN.body.map(v => v * SC)
  el('div', { position: 'absolute', left: bl + 'px', top: bt + 'px', width: (br - bl) + 'px', height: (bb - bt) + 'px', borderRadius: (34 * SC) + 'px', boxShadow: '0 34px 60px -14px rgba(26,16,51,0.5), 0 8px 18px rgba(26,16,51,0.25)' }, card)
  const layer = (clip) => img(card, A + SIGN.src, { left: 0, top: 0, width: cw + 'px', height: chh + 'px', clipPath: clip })
  layer(`inset(${bt}px ${cw - br}px ${chh - bb}px ${bl}px round ${34 * SC}px)`)
  layer(`polygon(${[[458, 99], [783, 65], [793, 143], [466, 179]].map(([x, y]) => `${x * SC}px ${y * SC}px`).join(',')})`)

  let titleW = 0, blockW = 0
  return {
    start: 14.05, end: 17.6, root,
    update(t) {
      if (!titleW) titleW = title.offsetWidth || 660
      if (!blockW) blockW = Math.max(titleW * 0.94, INDENT + Math.max(...rows.map(r => r.r.offsetWidth || 600)))
      tChars.forEach((s, i) => { s.style.opacity = String(ease.outQuad(prog(t, 14.25 + i * 0.018, 14.45 + i * 0.018))) })
      // title starts centred, then glides up/left: the list settles in the left half, the sign card fills the right
      const g = ease.spring(prog(t, 14.6, 15.2), 0.04)
      const listH = rows.reduce((h, row, i) => h + ROW * ease.spring(prog(t, AT[i], AT[i] + 0.4), 0.06), 0)
      const LX = 640 - blockW / 2 // block centred at x≈640
      const tx = lerp(W / 2 - titleW / 2, LX, g)
      const blockTop = lerp(H / 2 - 46, H / 2 - 60 - listH / 2 - 70, g)
      title.style.left = tx + 'px'; title.style.top = blockTop + 'px'
      title.style.transform = `scale(${lerp(1, 0.94, g)})`; title.style.transformOrigin = '0 0'
      let y = blockTop + 128
      rows.forEach((row, i) => {
        const p = ease.spring(prog(t, AT[i], AT[i] + 0.4), 0.06)
        row.r.style.left = (tx + INDENT) + 'px'
        row.r.style.top = y + 'px'
        row.r.style.opacity = String(clamp(p * 1.5))
        row.r.style.transform = `translateY(${(1 - p) * 22}px)`
        // active colour blends in on arrival and back to ink as the next row lands (or "Dealing" settles at 17.0)
        const off = i < AT.length - 1 ? AT[i + 1] : 17.0
        const act = prog(t, AT[i], AT[i] + 0.15) * (1 - prog(t, off, off + 0.15))
        row.lab.style.color = mix(C.ink, row.it.c, act)
        y += ROW * p
      })
      const eyeTop = y + 30
      rail.style.left = (tx + 20) + 'px'; rail.style.top = (blockTop + 122) + 'px'
      rail.style.height = Math.max(0, eyeTop - 16 - (blockTop + 122)) + 'px'
      rail.style.opacity = String(g)
      working.style.left = (tx) + 'px'; working.style.top = eyeTop + 'px'
      const sh = (t * 1.1) % 1
      working.style.background = `linear-gradient(90deg, rgba(26,16,51,0.3) ${sh * 140 - 40}%, rgba(26,16,51,0.85) ${sh * 140 - 20}%, rgba(26,16,51,0.3) ${sh * 140}%)`
      working.style.webkitBackgroundClip = 'text'; working.style.color = 'transparent'
      working.style.opacity = String(g)
      // late life: the whole block slowly breathes forward and lifts, then clears before the dots arrive
      const hold = ease.inOutQuad(prog(t, 16.3, 17.18))
      const bcx = LX + blockW / 2, bcy = H / 2
      block.style.transformOrigin = `${bcx}px ${bcy}px`
      block.style.transform = `translate(${hold * 40}px, ${-hold * 18}px) scale(${1 + 0.05 * hold})`
      block.style.opacity = String(1 - ease.inQuad(prog(t, 17.06, 17.18)))
      // "Dealing" row: soft pulse while the deck shuffles
      const pulse = prog(t, 16.6, 17.06)
      rows[4].lab.style.opacity = String(1 - 0.35 * pulse * (0.5 + 0.5 * Math.sin((t - 16.6) * 14)))

      // sign card: swings in from the right after Sun lands, floats, then slides away as the deck is dealt
      const ci = ease.outCubic(prog(t, 15.0, 15.5)), co = ease.inCubic(prog(t, 16.55, 16.9))
      card.style.display = ci > 0 && co < 1 ? 'block' : 'none'
      if (ci > 0 && co < 1) {
        const fl = Math.sin((t - 15) * 2.2)
        const yaw = lerp(38, -11, ci) + 3 * fl * ci + co * 26
        const rx = lerp(-8, 4, ci) + co * -6
        const x = (1 - ci) * 160 + co * 140, yy = (1 - ci) * 30 - 6 * fl - co * 20
        card.style.opacity = String(clamp(ci * 2.5) * (1 - co))
        card.style.transform = `translate(${x}px, ${yy}px) perspective(2000px) rotateY(${yaw}deg) rotateX(${rx}deg) rotateZ(${lerp(4, 2, ci)}deg) scale(${lerp(0.88, 1, ci) * (1 - 0.1 * co)})`
      }
    },
  }
}

// ── fxDots: contained dot-matrix patch over the first dealt card (S5 → S6).
// Geometry must match S6's first card: card-profile-1 body (PNG box 120,114–1374,2116), PATCH_H tall, centred at (W/2, H/2 − 10).
// Beats (frame = Math.round(t*30)): sparse random dots grow 17.12–17.5 in aura palette → tint to the card colours 17.32–17.56
// (S6's first card fades in underneath 17.42–17.6) → dots keep breathing and thin out → 2-frame square mosaic 17.72–17.78 → sharp card.
const BODY = [120, 114, 1374, 2116]
const PATCH_H = 700, PATCH_W = PATCH_H * (BODY[2] - BODY[0]) / (BODY[3] - BODY[1]), PATCH_CX = W / 2, PATCH_CY = H / 2 - 10
const CELL = 22
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
    const raw = [r / a, g / a, b / a]
    const lum = 0.299 * raw[0] + 0.587 * raw[1] + 0.114 * raw[2]
    // lift dark card base strongly so the patch reads as aura colour, never a black block
    const lift = raw.map(v => Math.round(Math.min(255, v * 1.3 + 46)))
    cells.push({ raw: raw.map(Math.round), lift, lum })
  }
  grid = { cols, rows, cells }
  return grid
}

export function fxDots(ctx, t, opts = {}) {
  // timing is owned here (args from main.js are ignored)
  const t0 = 17.12, t1 = 17.79
  if (t <= t0 || t >= t1) return
  const gd = sampleGrid()
  const cols = gd ? gd.cols : Math.round(PATCH_W / CELL), rows = gd ? gd.rows : Math.round(PATCH_H / CELL)
  const cw = PATCH_W / cols, ch = PATCH_H / rows
  const ox = PATCH_CX - PATCH_W / 2, oy = PATCH_CY - PATCH_H / 2
  // square mosaic: two frames (17.733, 17.767) between the dots and the sharp card
  if (t >= 17.715) {
    ctx.globalAlpha = t < 17.75 ? 0.94 : 0.62
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const cell = gd ? gd.cells[y * cols + x] : { raw: [60, 30, 80] }
      if (!cell) continue
      ctx.fillStyle = `rgb(${cell.raw[0]},${cell.raw[1]},${cell.raw[2]})`
      ctx.fillRect(Math.floor(ox + x * cw), Math.floor(oy + y * ch), Math.ceil(cw) + 1, Math.ceil(ch) + 1)
    }
    ctx.globalAlpha = 1
    return
  }
  const pg = (t - t0) / 0.36                       // growth (random order, sparse first)
  const ps = (t - 17.54) / 0.18                    // thinning as the card resolves underneath
  const tint = ease.inOutQuad(prog(t, 17.32, 17.56)) // palette → sampled card colour
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const cell = gd ? gd.cells[y * cols + x] : { lift: [200, 120, 170], lum: 120 }
    const r = rng(9 + x * 131 + y * 7)
    const jit = r()
    const pal = PIXEL_PALETTE[Math.floor(r() * PIXEL_PALETTE.length)]
    const ph = r() * 6.283
    if (!cell) continue
    const dx = (x + 0.5) / cols - 0.5, dy = (y + 0.5) / rows - 0.5
    const d = Math.hypot(dx * 0.8, dy) / 0.62 // 0 centre … ~1 corners
    const grow = clamp((pg * 1.5 - jit * 1.1 - d * 0.25) * 4)
    const thin = clamp((ps * 1.3 - jit) * 3)
    // very dark cells give way to the aura colours as the tint lands
    const dark = clamp((70 - cell.lum) / 40)
    const keep = 1 - dark * 0.9 * ease.inQuad(prog(t, 17.46, 17.68))
    const wob = 0.86 + 0.14 * Math.sin(t * 11 + ph)
    const rad = Math.min(cw, ch) * 0.47 * ease.outQuad(grow) * wob * keep * (1 - 0.6 * thin)
    if (rad < 0.4) continue
    const pr = parseInt(pal.slice(1, 3), 16), pgc = parseInt(pal.slice(3, 5), 16), pb = parseInt(pal.slice(5, 7), 16)
    const tc = tint * (1 - 0.7 * dark) // dark cells keep their aura-palette colour while they shrink away
    const cr = Math.round(lerp(pr, cell.lift[0], tc)), cg = Math.round(lerp(pgc, cell.lift[1], tc)), cb = Math.round(lerp(pb, cell.lift[2], tc))
    ctx.fillStyle = `rgb(${cr},${cg},${cb})`
    ctx.beginPath(); ctx.arc(ox + (x + 0.5) * cw, oy + (y + 0.5) * ch, rad, 0, Math.PI * 2); ctx.fill()
  }
}
