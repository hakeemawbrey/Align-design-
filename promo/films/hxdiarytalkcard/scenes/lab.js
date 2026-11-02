// lab — copied from sxmythsun (via hxnowalk) for hxdiarytalkcard: only drawBits and the palette are used here.
// and sxmythscorpio (each film keeps its own copy of this file). A pixel lab floating in the nebula: a faint cyan
// graph-paper wall, a steel lab bench with a hazard stripe, a shelf, bubbling flasks, a green-screen lab monitor on a
// stand, a glass bell jar for the "specimen", lab goggles pushed up on a star's forehead, a clipboard, Pisces' tears,
// the show bug (top-left) and the big red BUSTED stamp. Everything is pure f(t); nothing touches `document` at module
// top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#ff4057', MINT = '#7dffb0', CYAN = '#7fe0ff', LAV = '#c9a6ff'
export const STEEL = '#8d93b8', STEEL_D = '#4b4f78', STEEL_L = '#c9cde8', SCREEN = '#04150f', PHOS = '#6dffb4'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
export const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }
export const r3 = v => +v.toFixed(3)

/** a bitmap of cells (one char per cell, '.' = empty) with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  if (alpha <= 0.002 || cell <= 0.05) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= clamp(alpha); x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch] || '#ff00ff'; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ── where a drawStarChar's sprite cells land on screen this frame (mirrors startalk's hop / breathe / squash maths), so
//    props (goggles, electrodes) stay seated on the star
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
/** r = drawStarChar's return; opts = the same opts passed to it. → { pt(i, j), cell, sx, sy } in the 36-cell sprite grid */
export function starGeom(t, r, size, opts = {}) {
  const { pop = 1, squash = 0, hops = null, seed = 1 } = opts
  const s = size * pop, cell = s >= 100 ? Math.max(1, Math.round(s / 36)) : s / 36, S = cell * 36
  const sq = squash + hopState(t, hops).sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sx = 1 + sq, sy = 1 - sq * 0.9, base = 15.84 * cell
  return { cell, sx, sy, pt: (i, j) => ({ x: r.x + sx * (-S / 2 + i * cell), y: r.y + base + sy * (-S / 2 - base + j * cell) }) }
}

// ── goggles pushed up on the forehead (lab goggles: teal rubber rims, pale glass, a strap)
const GOG = ['..FFFF..FFFF..', 'SFcwccFFcwccFS', 'SFccccFFccccFS', '..FFFF..FFFF..']
const GOG_C = { F: '#38b6a6', c: '#bff6ff', w: '#ffffff', S: '#2a6c78' }
export function drawGoggles(x, g, t, { alpha = 1, row = 11.6, down = 0 } = {}) {
  const p = g.pt(18, lerp(row, 18.6, down))
  drawBits(x, GOG, GOG_C, Math.round(p.x), Math.round(p.y), g.cell * 1.02, { sx: g.sx, sy: g.sy, alpha })
  // a glint that slides across the left lens now and then
  const ph = (t * 0.4) % 1
  if (ph < 0.12 && alpha > 0.5) { x.save(); x.globalAlpha = Math.sin(Math.PI * ph / 0.12) * alpha; x.fillStyle = '#fff'; const q = g.pt(14.5, lerp(row, 18.6, down) - 0.6); x.fillRect(q.x, q.y, g.cell, g.cell); x.restore() }
}

// ── the wall: faint cyan graph paper over the (dimmed) nebula, stronger toward the bench
export function drawWall(x, t, { k = 1, top = 520, bottom = 1350 } = {}) {
  if (k <= 0) return
  x.save()
  const ga0 = x.globalAlpha
  const g = x.createLinearGradient(0, top - 200, 0, bottom)
  g.addColorStop(0, 'rgba(10,18,40,0)'); g.addColorStop(1, `rgba(10,22,46,${0.55 * k})`)
  x.fillStyle = g; x.fillRect(0, top - 200, 1080, bottom - top + 200)
  const STEP = 60
  for (let y = top - 180; y < bottom; y += STEP / 2) {
    const a = clamp((y - (top - 200)) / (bottom - top + 200)) * 0.16 * k * ((Math.round(y / (STEP / 2)) % 2) ? 0.45 : 1)
    x.fillStyle = rgba(CYAN, a); x.fillRect(0, Math.round(y), 1080, 2)
  }
  for (let xx = 0; xx <= 1080; xx += STEP / 2) {
    x.fillStyle = rgba(CYAN, 0.1 * k * ((xx / (STEP / 2)) % 2 ? 0.45 : 1))
    for (let y = top - 180; y < bottom; y += 6) { const a = clamp((y - (top - 200)) / (bottom - top + 200)); if (a > 0.05) { x.globalAlpha = ga0 * a; x.fillRect(xx, y, 2, 4) } }
  }
  x.restore()
}

// ── the bench: steel top, hazard stripe, dark front with rivets
export function drawBench(x, t, { y = 1336, k = 1 } = {}) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  x.fillStyle = '#121029'; x.fillRect(0, y + 16, 1080, 1920 - y)
  x.fillStyle = INK; x.fillRect(0, y - 4, 1080, 4)
  x.fillStyle = STEEL_L; x.fillRect(0, y, 1080, 8)
  x.fillStyle = STEEL; x.fillRect(0, y + 8, 1080, 8)
  // hazard band
  const HB = y + 22
  x.fillStyle = '#1a1530'; x.fillRect(0, HB, 1080, 28)
  for (let xx = -40; xx < 1100; xx += 40) {
    x.fillStyle = GOLD
    x.beginPath(); x.moveTo(xx, HB + 28); x.lineTo(xx + 20, HB + 28); x.lineTo(xx + 40, HB); x.lineTo(xx + 20, HB); x.closePath(); x.fill()
  }
  x.fillStyle = INK; x.fillRect(0, HB + 28, 1080, 4)
  for (let xx = 60; xx < 1080; xx += 160) { x.fillStyle = STEEL_D; x.fillRect(xx, HB + 52, 8, 8); x.fillStyle = STEEL; x.fillRect(xx, HB + 52, 4, 4) }
  x.restore()
}

// ── a shelf bracket
export function drawShelf(x, cx, y, w) {
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 4, y - 4, w + 8, 22)
  x.fillStyle = STEEL_L; x.fillRect(cx - w / 2, y, w, 6); x.fillStyle = STEEL; x.fillRect(cx - w / 2, y + 6, w, 8)
  for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(cx + s * (w / 2 - 34) - 4, y + 14, 16, 34); x.fillStyle = STEEL_D; x.fillRect(cx + s * (w / 2 - 34), y + 14, 8, 30) }
}

// ── a flask that bubbles: kind 'cone' (Erlenmeyer) or 'tube' (round-bottom); bubbles rise out of the neck
const FLASK = {
  cone: ['..GGG..', '..GLG..', '..GLG..', '.GLLLG.', '.GLLLG.', 'GLLLLLG', 'GLLLLLG', 'GGGGGGG'],
  tube: ['.GGG.', '.GLG.', '.GLG.', '.GLG.', 'GLLLG', 'GLLLG', 'GLLLG', '.GGG.'],
}
export function drawFlask(x, cx, baseY, cell, liquid, t, { kind = 'cone', seed = 1, alpha = 1, boil = 1 } = {}) {
  const bm = FLASK[kind].map((row, j) => j >= (kind === 'cone' ? 4 : 4) ? row.replace(/L/g, 'Q') : row)
  const h = bm.length * cell
  drawBits(x, bm, { G: '#d8f6ff', L: 'rgba(200,240,255,0.18)', Q: liquid }, cx, baseY - h / 2, cell, { alpha })
  // liquid shine
  x.save(); x.globalAlpha = 0.5 * alpha; x.fillStyle = '#ffffff'; x.fillRect(cx - cell * (kind === 'cone' ? 2 : 1), baseY - cell * 3, cell, cell); x.restore()
  // bubbles
  const r = rng(seed * 97 + 5)
  for (let i = 0; i < 5; i++) {
    const sp = 0.5 + r() * 0.5, off = r(), dx = (r() - 0.5) * cell * 2
    const ph = (t * sp * (0.6 + 0.8 * boil) + off) % 1
    const bx = cx + dx * (1 - ph) + Math.sin(ph * 9 + i) * cell * 0.6, by = baseY - h * 0.35 - ph * (h * 0.7 + cell * 6)
    const sz = Math.max(2, Math.round(cell * (0.5 + 0.5 * (1 - ph))))
    x.save(); x.globalAlpha = alpha * Math.sin(Math.PI * ph) * 0.9 * clamp(boil * 2)
    x.fillStyle = i % 2 ? liquid : '#eafcff'; x.fillRect(Math.round(bx), Math.round(by), sz, sz); x.restore()
  }
}

// ── the bell jar (the specimen jar): a glass dome on a steel base plate. lift = 0…1 raises it off (released!)
export function drawJar(x, cx, baseY, w, h, t, { alpha = 1, lift = 0, label = null, labelColor = GOLD, part = 'all' } = {}) {
  if (alpha <= 0) return
  const C = 8, n = Math.round(w / C), m = Math.round(h / C), dome = n / 2
  const dy = -ease.inOutCubic(lift) * 900, a = alpha * (1 - ease.inQuad(clamp(lift * 1.3)))
  const x0 = Math.round(cx - n * C / 2), y0 = Math.round(baseY - m * C + dy)
  const half = j => j < dome ? Math.sqrt(Math.max(0, 1 - ((dome - j - 0.5) / dome) ** 2)) * n / 2 : n / 2
  const inside = (i, j) => j >= 0 && j < m && Math.abs(i + 0.5 - n / 2) <= half(j)
  if (part !== 'front') {
    // the base plate (stays when the jar lifts)
    x.save(); x.globalAlpha *= alpha
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 30, baseY - 6, w + 60, 30)
    x.fillStyle = STEEL_L; x.fillRect(cx - w / 2 - 26, baseY - 2, w + 52, 8); x.fillStyle = STEEL; x.fillRect(cx - w / 2 - 26, baseY + 6, w + 52, 12)
    if (label) {
      x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const tw = x.measureText(label).width + 28
      x.fillStyle = INK; x.fillRect(cx - tw / 2 - 4, baseY + 24, tw + 8, 40); x.fillStyle = '#efe6d6'; x.fillRect(cx - tw / 2, baseY + 28, tw, 32)
      x.fillStyle = INK; x.fillText(label, cx, baseY + 45)
    }
    x.restore()
    if (part === 'back') return
  }
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a
  // glass tint
  x.fillStyle = 'rgba(160,230,255,0.07)'
  for (let j = 0; j < m; j++) { const hw = half(j); x.fillRect(Math.round(cx - hw * C), y0 + j * C, Math.round(hw * 2 * C), C) }
  // rim cells
  for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) {
    if (!inside(i, j)) continue
    if (inside(i - 1, j) && inside(i + 1, j) && inside(i, j - 1)) continue
    x.fillStyle = INK; x.fillRect(x0 + i * C - 2, y0 + j * C - 2, C + 4, C + 4)
  }
  for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) {
    if (!inside(i, j)) continue
    if (inside(i - 1, j) && inside(i + 1, j) && inside(i, j - 1)) continue
    x.fillStyle = i < n / 2 ? '#e4fbff' : '#9fd8ec'; x.fillRect(x0 + i * C, y0 + j * C, C, C)
  }
  // glints
  x.fillStyle = 'rgba(255,255,255,0.55)'
  const gi = Math.round(n * 0.2)
  for (let j = Math.round(dome * 0.7); j < m * 0.82; j++) if (inside(gi, j)) x.fillRect(x0 + gi * C, y0 + j * C, C, C)
  x.fillStyle = 'rgba(255,255,255,0.3)'
  for (let j = Math.round(dome * 0.9); j < m * 0.45; j++) if (inside(gi + 2, j)) x.fillRect(x0 + (gi + 2) * C, y0 + j * C, C, C)
  // the knob
  x.fillStyle = INK; x.fillRect(cx - 22, y0 - 26, 44, 30); x.fillStyle = STEEL_L; x.fillRect(cx - 18, y0 - 22, 36, 14); x.fillStyle = STEEL; x.fillRect(cx - 18, y0 - 8, 36, 8)
  x.restore()
}

// ── the lab monitor (green phosphor) on a stand. screen(x, sx, sy, sw, sh) draws the content (clipped).
export function drawMonitor(x, cx, cy, w, h, t, screen, { alpha = 1, standTo = 1336, on = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  const L = Math.round(cx - w / 2), T = Math.round(cy - h / 2)
  // stand
  if (standTo) { x.fillStyle = INK; x.fillRect(cx - 14, T + h, 28, standTo - T - h); x.fillStyle = STEEL_D; x.fillRect(cx - 10, T + h, 20, standTo - T - h); x.fillStyle = INK; x.fillRect(cx - 60, standTo - 18, 120, 18); x.fillStyle = STEEL; x.fillRect(cx - 56, standTo - 14, 112, 10) }
  // bezel (stepped corners)
  const P = 8
  const step = (o, col) => { x.fillStyle = col; x.fillRect(L + o + P, T + o, w - 2 * o - 2 * P, h - 2 * o); x.fillRect(L + o, T + o + P, w - 2 * o, h - 2 * o - 2 * P) }
  step(-6, INK); step(0, STEEL); step(6, STEEL_L); step(10, STEEL)
  const sx = L + 22, sy = T + 22, sw = w - 44, sh = h - 56
  x.fillStyle = INK; x.fillRect(sx - 4, sy - 4, sw + 8, sh + 8)
  x.fillStyle = SCREEN; x.fillRect(sx, sy, sw, sh)
  // a status lamp + vents under the screen
  x.fillStyle = on > 0.5 && Math.floor(t * 2) % 2 ? MINT : '#2a5a46'; x.fillRect(L + w - 44, T + h - 26, 12, 12)
  x.fillStyle = STEEL_D; for (let k = 0; k < 5; k++) x.fillRect(L + 26 + k * 18, T + h - 24, 10, 8)
  if (on > 0) {
    x.save(); x.beginPath(); x.rect(sx, sy, sw, sh); x.clip()
    x.globalAlpha *= on
    screen && screen(x, sx, sy, sw, sh)
    // scanlines + glass glare
    x.globalAlpha = 1
    x.fillStyle = 'rgba(0,0,0,0.22)'; for (let yy = sy; yy < sy + sh; yy += 6) x.fillRect(sx, yy, sw, 2)
    const gg = x.createLinearGradient(sx, sy, sx + sw, sy + sh); gg.addColorStop(0, 'rgba(255,255,255,0.08)'); gg.addColorStop(0.4, 'rgba(255,255,255,0)')
    x.fillStyle = gg; x.fillRect(sx, sy, sw, sh)
    x.restore()
  }
  x.restore()
}
/** phosphor text on a monitor */
export function phosText(x, text, px, py, size, { align = 'left', color = PHOS, alpha = 1, weight = 700 } = {}) {
  x.save(); x.globalAlpha *= alpha
  x.font = `${weight} ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'
  x.shadowColor = color; x.shadowBlur = 12; x.fillStyle = color; x.fillText(text, px, py)
  x.shadowBlur = 0; x.fillText(text, px, py)
  x.restore()
}

// ── the clipboard (+ a pencil that scribbles when `scribble` is on)
const CLIP = ['..KKK..', 'BBKSKBB', 'BWWWWWB', 'BWLLLWB', 'BWWWWWB', 'BWLLWWB', 'BWWWWWB', 'BWLLLWB', 'BWWWWWB', 'BBBBBBB']
export function drawClipboard(x, cx, cy, cell, t, { rot = -0.12, scribble = 0, alpha = 1 } = {}) {
  drawBits(x, CLIP, { K: STEEL_L, S: STEEL, B: '#b07a3c', W: '#f4ecdc', L: '#8a8fb8' }, cx, cy, cell, { rot, alpha })
  if (scribble > 0) {
    const a = t * 22
    const px = cx + Math.sin(a) * cell * 1.6 + cell * 0.8, py = cy + Math.cos(a * 0.5) * cell * 1.2 + cell
    drawBits(x, ['..P', '.Y.', 'Y..'], { P: PINK, Y: GOLD }, px + cell * 1.5, py - cell * 1.5, cell, { alpha: alpha * clamp(scribble * 3) })
  }
}

// ── a tear drop (Pisces' running gag)
const TEAR = ['.T.', 'TTT', 'TWT', '.T.']
export function drawTears(x, g, t, { rate = 1, t0 = 0, alpha = 1, seed = 1 } = {}) {
  if (alpha <= 0) return
  for (let k = 0; k < 6; k++) {
    const per = 0.62 / rate, ph = ((t - t0) / per + k / 6 + seed * 0.13) % 1
    if (t < t0 || ph < 0) continue
    const side = k % 2 ? 1 : -1
    const eye = g.pt(18 + side * 4.6 + side * ph * 3, 21.5)
    const ex = eye.x + side * ph * g.cell * 6, ey = eye.y + ph * ph * g.cell * 26
    drawBits(x, TEAR, { T: '#7fd0ff', W: '#e8f8ff' }, Math.round(ex), Math.round(ey), Math.max(3, g.cell * 1.5), { alpha: alpha * (1 - ph) * 1.2, outline: null })
  }
}

// ── a white pixel thought bubble with a little tail toward (tx, ty); returns its centre
export function drawBubble(x, cx, cy, w, h, a, { tail = 'down-left', fill = '#f4ecdc' } = {}) {
  if (a <= 0.01) return
  const P = 8
  x.save(); x.translate(cx, cy); x.scale(a, a)
  const L = -w / 2, T = -h / 2
  const rect = (o, col) => { x.fillStyle = col; x.fillRect(L - o + P, T - o, w + 2 * o - 2 * P, h + 2 * o); x.fillRect(L - o, T - o + P, w + 2 * o, h + 2 * o - 2 * P) }
  rect(5, INK); rect(0, fill)
  const sgn = tail === 'down-left' ? -1 : 1
  for (let k = 0; k < 3; k++) { const s = 18 - k * 5, bx = sgn * (w * 0.22 + k * 18), by = h / 2 + 14 + k * 20; x.fillStyle = INK; x.fillRect(bx - s / 2 - 4, by - s / 2 - 4, s + 8, s + 8); x.fillStyle = fill; x.fillRect(bx - s / 2, by - s / 2, s, s) }
  x.restore()
}

// ── tiny pixel interest icons (the two hundred faces of Gemini)
export const ICONS = {
  bird: { bm: ['..BBB...', '.BBWBB..', '.BBKBBYY', 'BBBBBB..', '.BBBBBB.', '..BBBBBB', '...Y.Y..'], c: { B: '#5fb6ff', W: '#ffffff', K: INK, Y: GOLD } },
  pot: { bm: ['.OOOOO.', '..ooo..', '.OOOOO.', 'OOoOOOO', 'OOOOOOO', '.OOOOO.', '..ooo..'], c: { O: '#e07a4a', o: '#a8502c' } },
  note: { bm: ['..YYYYY', '..Y...Y', '..Y...Y', '.YY..YY', 'YYY.YYY', 'YY..YY.'], c: { Y: GOLD } },
  book: { bm: ['PPPPPPP', 'PWWWWWP', 'PWLLLWP', 'PWWWWWP', 'PWLLWWP', 'PPPPPPP'], c: { P: '#c96bff', W: '#f4ecdc', L: '#8a8fb8' } },
  plant: { bm: ['.G...G.', 'GGG.GGG', '.GGGGG.', '...G...', '.OOOOO.', '.OOOOO.', '..OOO..'], c: { G: '#5ee08a', O: '#c9773e' } },
  camera: { bm: ['.KK....', 'SSSSSSS', 'SSWWSSS', 'SWCCWSS', 'SSWWSSS', 'SSSSSSS'], c: { K: INK, S: '#9aa0c8', W: '#ffffff', C: '#3a7cff' } },
  pad: { bm: ['.KKKKKKK.', 'KKWKKKRKK', 'KWWWKRKBK', 'KKWKKKGKK', 'KKK...KKK'], c: { K: '#5a5f8a', W: '#ffffff', R: '#ff5a6e', B: '#5fb6ff', G: '#5ee08a' } },
  bread: { bm: ['..YYY..', '.YOYOY.', 'YOYOYOY', 'YY...YY'], c: { Y: '#f2b45c', O: '#c9773e' } },
  frog: { bm: ['.WK.WK.', 'GGGGGGG', 'GGGGGGG', 'GRRRRRG', '.GGGGG.'], c: { W: '#ffffff', K: INK, G: '#5ee08a', R: '#2f9a5a' } },
  globe: { bm: ['..BBB..', '.BGGBB.', 'BGGGBBB', 'BBGBBGB', 'BBBBGGB', '.BBBGB.', '..BBB..'], c: { B: '#3a7cff', G: '#5ee08a' } },
  chess: { bm: ['..W..', '.WWW.', '..W..', '.WWW.', '.WWW.', 'WWWWW'], c: { W: '#f4ecdc' } },
  star: { bm: ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.'], c: { Y: GOLD } },
}
export const ICON_KEYS = Object.keys(ICONS)
export const drawIcon = (x, k, cx, cy, cell, o = {}) => drawBits(x, ICONS[k].bm, ICONS[k].c, cx, cy, cell, o)

// ── the show bug: a pixel flask + "STAR MYTH-BUSTERS" (Inter 800 small caps, letter-spaced), top-left, 56 px in
export function buildBug(root, { at = 0.3, out = [25.2, 25.5], ep = null }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', opacity: 0, pointerEvents: 'none' }, root)
  const cv = el('canvas', { width: '30px', height: '40px', imageRendering: 'pixelated' }, box)
  cv.width = 15; cv.height = 20
  const c = cv.getContext('2d')
  const BM = ['....KKKK.....', '....KWWK.....', '....KWWK.....', '....KWWK.....', '...KWWWWK....', '..KWWWWWWK...', '..KWMMMMWK...', '.KMMMMMMMMK..', '.KMMWMMMMMK..', 'KMMMMMMMMMMK.', 'KKKKKKKKKKKK.']
  BM.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; c.fillStyle = ch === 'K' ? INK : ch === 'W' ? '#dff7ff' : MINT; c.fillRect(i + 1, j + 6, 1, 1) }))
  c.fillStyle = MINT; c.fillRect(9, 2, 2, 2); c.fillRect(11, 0, 1, 1); c.fillStyle = '#dff7ff'; c.fillRect(7, 4, 1, 1)
  const tx = el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.16em', color: CYAN, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'all-small-caps' }, box)
  tx.innerHTML = `Star Myth-Busters${ep ? `<span style="color:rgba(255,255,255,0.6)"> · ${ep}</span>` : ''}`
  return {
    update(t) {
      const a = clamp((t - at) / 0.3) * outK(t, out)
      box.style.opacity = String(a)
      box.style.transform = `translateX(${((1 - ease.outCubic(clamp((t - at) / 0.35))) * -24).toFixed(1)}px)`
    },
  }
}

// ── the BUSTED stamp: a red rubber stamp (double border, worn ink) that slams down from big, shakes, and stays
export function buildStamp(root, { at, out, cx = 540, cy = 340, w = 700, h = 230, rot = -11, text = 'BUSTED', color = RED }) {
  const M = 30
  const wrap = el('div', { position: 'absolute', left: (cx - w / 2 - M) + 'px', top: (cy - h / 2 - M) + 'px', width: (w + 2 * M) + 'px', height: (h + 2 * M) + 'px', display: 'none', pointerEvents: 'none', transformOrigin: '50% 50%' }, root)
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: (w + 2 * M) + 'px', height: (h + 2 * M) + 'px' }, wrap)
  cv.width = w + 2 * M; cv.height = h + 2 * M
  const x = cv.getContext('2d')
  x.translate(M, M)
  x.fillStyle = color
  const B = 14, G2 = 10
  const frame = (o, th) => { x.fillRect(o, o, w - 2 * o, th); x.fillRect(o, h - o - th, w - 2 * o, th); x.fillRect(o, o, th, h - 2 * o); x.fillRect(w - o - th, o, th, h - 2 * o) }
  frame(0, B); frame(B + G2, 6)
  x.font = `900 ${Math.round(h * 0.62)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.save(); x.translate(w / 2, h / 2 + h * 0.04); const tw = x.measureText(text).width, k = Math.min(1, (w - 120) / tw); x.scale(k, 1); x.fillText(text, 0, 0); x.restore()
  // worn ink: knock out specks and a few scratches
  x.globalCompositeOperation = 'destination-out'
  const r = rng(77)
  for (let i = 0; i < 900; i++) { const s = 2 + Math.floor(r() * 4); x.fillRect(Math.floor(r() * w), Math.floor(r() * h), s, s) }
  for (let i = 0; i < 7; i++) { x.save(); x.translate(r() * w, r() * h); x.rotate(r() * 0.6 - 0.3); x.fillRect(0, 0, 60 + r() * 120, 3); x.restore() }
  x.globalCompositeOperation = 'source-over'
  return {
    update(t) {
      const show = t >= at - 0.12 && t < out[1]
      wrap.style.display = show ? 'block' : 'none'
      if (!show) return
      const p = prog(t, at - 0.12, at)                   // falling in
      const sc = t < at ? lerp(2.6, 1, ease.inCubic(p)) : 1 + 0.05 * Math.exp(-(t - at) * 9) * Math.cos((t - at) * 40)
      const shake = t >= at ? 10 * Math.exp(-(t - at) * 10) * Math.sin((t - at) * 70) : 0
      wrap.style.opacity = String(clamp(p * 1.5) * outK(t, out) * 0.94)
      wrap.style.transform = `translate(${shake.toFixed(1)}px, ${(shake * 0.4).toFixed(1)}px) rotate(${rot}deg) scale(${sc.toFixed(4)})`
    },
  }
}
/** screen shake (px) after a slam at t0 */
export const shakeAt = (t, t0, amp = 14) => t >= t0 && t < t0 + 0.5 ? amp * Math.exp(-(t - t0) * 9) * Math.sin((t - t0) * 64) : 0

/** a little impact dust burst (pixel puffs) at (cx, cy) */
export function dust(x, t, t0, cx, cy, { n = 10, R = 160, col = BONE } = {}) {
  const k = t - t0
  if (k < 0 || k > 0.6) return
  const p = ease.outCubic(k / 0.6)
  x.save(); x.globalAlpha = (1 - p) * 0.8
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + 0.3, rr = R * (0.4 + 0.6 * p) * (0.8 + 0.3 * ((i * 7) % 3) / 2)
    const s = Math.round(18 * (1 - p) + 6)
    x.fillStyle = col; x.fillRect(Math.round(cx + Math.cos(a) * rr - s / 2), Math.round(cy + Math.sin(a) * rr * 0.6 - s / 2), s, s)
  }
  x.restore()
}
