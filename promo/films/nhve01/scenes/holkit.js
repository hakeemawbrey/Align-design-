// holkit — holiday sets and props for THEN vs NOW: HOLIDAYS (nhve01–nhve24). Imported by every b18 episode from
// promo/films/nhve01/scenes/holkit.js. Everything draws on the SW×SH scene canvas (900×1060) in pixel blocks.
// Pure f(t); nothing touches `document` at module top level. No brands, no logos.
import { R, drawBits, INK, BONE, GOLD, PINK, HEART, MONO, SW, SH, starFrame, inSprite, ease, prog, clamp, lerp } from './thennow.js'

export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const RED = '#e0453a', GREEN = '#3fa05a', PINE = '#2f7a4a', PINE2 = '#4fbf6a', SNOW = '#f4f6ff', WOOD = '#9a5f38', CREAM = '#fff3e2'
export const LIGHTS = [GOLD, '#ff6a8a', '#7fd0ff', '#9fe6b0', '#ffb04a']

const hash = (i, k = 1) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s) }

/** a cosy interior: wall (with stripes), floor, a skirting board. now = cleaner, warmer palette */
export function room(x, t, { now = false, wall, wall2, floor, floor2, horizon = 640 } = {}) {
  const w1 = wall || (now ? '#5b4384' : '#7a3f3a'), w2 = wall2 || (now ? '#664c90' : '#86483f')
  R(x, w1, 0, 0, SW, horizon)
  for (let i = 0; i < 12; i++) R(x, w2, i * 80 + 20, 0, 22, horizon)
  R(x, floor || (now ? '#c99a6a' : '#a8784c'), 0, horizon, SW, SH - horizon)
  for (let j = 0; j < 8; j++) R(x, floor2 || (now ? '#b8885a' : '#93673f'), 0, horizon + 40 + j * 64, SW, 6)
  R(x, INK, 0, horizon - 8, SW, 10); R(x, now ? '#fff3e2' : '#e9d3b0', 0, horizon - 22, SW, 14)
}

/** a window with snow falling outside (night) */
export function snowWindow(x, t, l, tp, w, h, { night = true, frame = '#fff3e2', heavy = 1 } = {}) {
  R(x, INK, l - 12, tp - 12, w + 24, h + 24); R(x, frame, l - 6, tp - 6, w + 12, h + 12)
  R(x, night ? '#1d2a5c' : '#a9d6ff', l, tp, w, h)
  if (night) for (let i = 0; i < 6; i++) R(x, '#fff6c8', l + hash(i, 3) * w, tp + hash(i, 4) * h * 0.5, 4, 4)
  // snow ground
  R(x, SNOW, l, tp + h - 30, w, 30)
  x.save(); x.beginPath(); x.rect(l, tp, w, h); x.clip()
  const n = Math.round(22 * heavy)
  for (let i = 0; i < n; i++) {
    const sp = 60 + 60 * hash(i, 7), y = tp + ((t * sp + hash(i, 5) * h) % h), xx = l + ((hash(i, 6) * w + 14 * Math.sin(t * 1.3 + i)) % w)
    R(x, SNOW, xx, y, 6, 6)
  }
  x.restore()
  R(x, frame, l + w / 2 - 4, tp, 8, h); R(x, frame, l, tp + h / 2 - 4, w, 8)
  R(x, INK, l - 18, tp + h + 10, w + 36, 12); R(x, frame, l - 14, tp + h + 12, w + 28, 8)
}

/** a pixel pine tree; base at (cx, by), height h. lights twinkle; star on top (pass star: false to skip) */
export function tree(x, t, cx, by, h, { now = true, lights = true, star = true, ornaments = true, col = PINE, col2 = PINE2, topper } = {}) {
  const tiers = 4, tw = h * 0.62
  R(x, INK, cx - 22, by - 60, 44, 66); R(x, '#7a4a2a', cx - 16, by - 56, 32, 56)
  for (let k = 0; k < tiers; k++) {
    const y0 = by - 50 - (k + 1) * (h - 70) / tiers - 20, y1 = by - 50 - k * (h - 70) / tiers
    const half = tw / 2 * (1 - k * 0.2)
    for (let yy = y0; yy < y1; yy += 12) {
      const p = (yy - y0) / (y1 - y0), wd = 30 + half * p * 2
      R(x, INK, cx - wd / 2 - 6, yy - 6, wd + 12, 18)
    }
    for (let yy = y0; yy < y1; yy += 12) {
      const p = (yy - y0) / (y1 - y0), wd = 30 + half * p * 2
      R(x, (Math.floor(yy / 12) % 3) ? col : col2, cx - wd / 2, yy, wd, 12)
    }
  }
  if (ornaments) for (let i = 0; i < 9; i++) {
    const p = 0.15 + 0.8 * hash(i, 9), yy = by - 70 - (1 - p) * (h - 90), wd = (30 + tw * p * 0.85) / 2
    const ox = cx + (hash(i, 11) * 2 - 1) * wd * 0.8
    R(x, INK, ox - 9, yy - 9, 18, 18); R(x, [RED, GOLD, '#7fd0ff', PINK][i % 4], ox - 6, yy - 6, 12, 12)
  }
  if (lights) for (let i = 0; i < 16; i++) {
    const p = (i + 0.5) / 16, yy = by - 60 - (1 - p) * (h - 80), wd = (30 + tw * p) / 2
    const lx = cx + Math.sin(i * 2.4) * wd * 0.9
    const on = 0.55 + 0.45 * Math.sin(t * 4 + i * 1.9)
    x.save(); x.globalAlpha = on; R(x, LIGHTS[i % 5], lx - 4, yy - 4, 8, 8); x.restore()
  }
  if (star) {
    const ty = by - h - 10
    drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', 'Y...Y'], { Y: topper || GOLD }, cx, ty, 9)
  }
}

/** a wrapped gift; open: 0..1 lid lift */
export function gift(x, cx, by, w, h, { col = RED, rib = GOLD, rot = 0, open = 0, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, by); x.rotate(rot)
  R(x, INK, -w / 2 - 5, -h - 5, w + 10, h + 10); R(x, col, -w / 2, -h, w, h)
  R(x, rib, -6, -h, 12, h)
  const ly = -h - 18 - open * 70, lr = open * -0.5
  x.save(); x.translate(0, ly); x.rotate(lr)
  R(x, INK, -w / 2 - 11, -5, w + 22, 28); R(x, col, -w / 2 - 6, 0, w + 12, 18); R(x, rib, -6, 0, 12, 18)
  R(x, INK, -26, -26, 22, 24); R(x, INK, 4, -26, 22, 24); R(x, rib, -22, -22, 14, 16); R(x, rib, 8, -22, 14, 16)
  x.restore()
  x.restore()
}

/** a mug with steam */
export function mug(x, t, cx, by, { col = '#ff8fb1', steam = true, s = 1 } = {}) {
  x.save(); x.translate(cx, by); x.scale(s, s)
  R(x, INK, -26, -62, 52, 64); R(x, col, -20, -56, 40, 52); R(x, '#7a3b28', -20, -56, 40, 8)
  R(x, INK, 20, -46, 18, 30); R(x, col, 24, -40, 8, 18)
  if (steam) for (let i = 0; i < 3; i++) {
    const ph = (t * 0.8 + i / 3) % 1
    x.globalAlpha = Math.sin(Math.PI * ph) * 0.7
    R(x, '#ffffff', -10 + i * 10 + 6 * Math.sin(t * 3 + i), -70 - ph * 50, 6, 10)
  }
  x.restore()
}

/** a swag of string lights across the top of the scene */
export function stringLights(x, t, y0 = 30, amp = 24, { n = 15, from = 0, to = SW } = {}) {
  x.strokeStyle = INK; x.lineWidth = 3; x.beginPath()
  for (let i = 0; i <= 30; i++) { const lx = from + (to - from) * i / 30, ly = y0 + amp * Math.sin((i / 30) * Math.PI); i ? x.lineTo(lx, ly) : x.moveTo(lx, ly) }
  x.stroke()
  for (let i = 0; i < n; i++) {
    const f = (i + 0.5) / n, lx = from + (to - from) * f, ly = y0 + 4 + amp * Math.sin(f * Math.PI)
    x.save(); x.globalAlpha = 0.7 + 0.3 * Math.sin(t * 3 + i * 1.7); R(x, INK, lx - 9, ly - 2, 18, 22); R(x, LIGHTS[i % 5], lx - 6, ly, 12, 16); x.restore()
  }
}

/** snow falling over the whole scene (inside a panel) */
export function snowfall(x, t, { n = 40, seed = 1, speed = 1, size = 6, alpha = 0.9 } = {}) {
  x.save(); x.globalAlpha = alpha
  for (let i = 0; i < n; i++) {
    const sp = (50 + 70 * hash(i, seed)) * speed, y = ((t * sp + hash(i, seed + 1) * SH) % (SH + 20)) - 10
    const xx = (hash(i, seed + 2) * SW + 20 * Math.sin(t * 1.1 + i)) % SW
    R(x, SNOW, xx, y, size, size)
  }
  x.restore()
}

/** an old chunky phone (2016) or a slim one (2026), centred, with an optional screen text */
export function phone(x, cx, cy, { now = false, s = 1, text = '', textCol = INK, screen, rot = 0, glow = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const w = now ? 120 : 110, h = now ? 230 : 200
  if (glow) { x.shadowColor = `rgba(160,220,255,${glow})`; x.shadowBlur = 40 }
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.shadowBlur = 0
  R(x, now ? '#2a2633' : '#4a4652', -w / 2, -h / 2, w, h)
  const m = now ? 6 : 12
  R(x, screen || (now ? '#e9f6ff' : '#9fd8ff'), -w / 2 + m, -h / 2 + (now ? 10 : 24), w - 2 * m, h - (now ? 20 : 56))
  if (!now) R(x, '#2a2633', -10, h / 2 - 24, 20, 14)
  if (text) {
    x.fillStyle = textCol; x.textAlign = 'center'; x.textBaseline = 'middle'
    const rows = String(text).split('\n'), fs = now ? 20 : 18
    x.font = `800 ${fs}px ${INTER}`
    rows.forEach((r, i) => x.fillText(r, 0, (i - (rows.length - 1) / 2) * fs * 1.25))
  }
  x.restore()
}

/** a table with a cloth (top edge at cy) */
export function table(x, cx, cy, w, { now = true, cloth } = {}) {
  R(x, INK, cx - w / 2 - 6, cy - 6, w + 12, 40); R(x, cloth || (now ? '#fffaf0' : '#e0c49a'), cx - w / 2, cy, w, 28)
  R(x, now ? '#e8dccb' : '#c4a578', cx - w / 2, cy + 22, w, 6)
  R(x, INK, cx - 14, cy + 34, 28, 150); R(x, now ? '#b8a7d8' : '#8a6a4a', cx - 8, cy + 34, 16, 150)
}

/** a couch (seat top at by - 80) */
export function couch(x, cx, by, w, { col = '#7a5cc0' } = {}) {
  R(x, INK, cx - w / 2 - 6, by - 186, w + 12, 192)
  R(x, col, cx - w / 2, by - 180, w, 110)
  R(x, INK, cx - w / 2, by - 76, w, 6)
  R(x, col, cx - w / 2, by - 70, w, 60)
  R(x, INK, cx - w / 2 - 30, by - 130, 36, 136); R(x, INK, cx + w / 2 - 6, by - 130, 36, 136)
  R(x, col, cx - w / 2 - 24, by - 124, 24, 118); R(x, col, cx + w / 2, by - 124, 24, 118)
}

/** a fireplace (mantle top at by - h) with flames */
export function fireplace(x, t, cx, by, { w = 300, h = 260 } = {}) {
  R(x, INK, cx - w / 2 - 6, by - h - 6, w + 12, h + 6); R(x, '#b4553f', cx - w / 2, by - h, w, h)
  for (let j = 0; j < h; j += 26) for (let i = (j / 26) % 2 ? 0 : 30; i < w; i += 60) R(x, '#9a4433', cx - w / 2 + i, by - h + j, 4, 26)
  R(x, INK, cx - w / 2 - 26, by - h - 26, w + 52, 30); R(x, '#e9d3b0', cx - w / 2 - 20, by - h - 22, w + 40, 20)
  R(x, INK, cx - w / 2 + 50, by - h + 70, w - 100, h - 70); R(x, '#2a1410', cx - w / 2 + 56, by - h + 76, w - 112, h - 76)
  for (let i = 0; i < 5; i++) {
    const fh = 50 + 30 * Math.sin(t * 9 + i * 2) + 20 * hash(i, 2)
    R(x, '#ff8a3a', cx - 80 + i * 34, by - 10 - fh, 26, fh); R(x, '#ffd35a', cx - 74 + i * 34, by - 10 - fh * 0.6, 14, fh * 0.6)
  }
}

/** a paper sign / label with Inter text */
export function sign(x, cx, cy, text, { size = 30, col = CREAM, ink = INK, rot = 0, pad = 18, weight = 800, font = INTER, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const rows = String(text).split('\n')
  const w = Math.max(...rows.map(r => x.measureText(r).width)) + pad * 2, h = rows.length * size * 1.15 + pad * 1.2
  R(x, INK, -w / 2 - 5, -h / 2 - 5, w + 10, h + 10); R(x, col, -w / 2, -h / 2, w, h)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  rows.forEach((r, i) => x.fillText(r, 0, (i - (rows.length - 1) / 2) * size * 1.15 + size * 0.05))
  x.restore()
}

/** a big wall clock / digital clock face */
export function clockFace(x, cx, cy, text, { size = 64, col = '#ff4f6a', bg = '#140c2a', k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + size * 0.8, h = size * 1.4
  R(x, INK, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16); R(x, '#3a3546', -w / 2 - 3, -h / 2 - 3, w + 6, h + 6); R(x, bg, -w / 2, -h / 2, w, h)
  x.shadowColor = col; x.shadowBlur = 16; x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(text, 0, 4)
  x.restore()
}

/** a door (bottom at by) */
export function door(x, cx, by, { w = 200, h = 400, col = '#8a4a3a', wreath = true, open = 0 } = {}) {
  R(x, INK, cx - w / 2 - 10, by - h - 10, w + 20, h + 10)
  R(x, '#2a1a30', cx - w / 2, by - h, w, h)
  const dw = w * (1 - open)
  R(x, col, cx - w / 2, by - h, dw, h)
  if (dw > 40) {
    R(x, INK, cx - w / 2 + dw - 34, by - h / 2 - 6, 14, 14)
    for (const [yy, hh] of [[by - h + 30, 140], [by - h + 200, 160]]) { R(x, 'rgba(0,0,0,0.18)', cx - w / 2 + 24, yy, Math.max(0, dw - 48), hh) }
    if (wreath) {
      const wx = cx - w / 2 + dw / 2, wy = by - h + 110
      drawBits(x, ['..GGGG..', '.GGRGGG.', 'GG....GG', 'GR....GG', 'GG....RG', 'GG....GG', '.GGGRGG.', '..GGGG..'], { G: GREEN, R: RED }, wx, wy, 9)
    }
  }
}

/** a knit beanie with a pom-pom on a star's head (sprite frame F from starFrame) */
export function beanie(x, F, col = RED, band = CREAM) {
  inSprite(x, F, () => {
    const rows = [[2, 16, 20], [3, 15, 21], [4, 14, 22], [5, 13, 23], [6, 12, 24]]
    x.fillStyle = INK
    for (const [r, a, b] of rows) x.fillRect(a - 1, r - 1, b - a + 3, 3)
    x.fillRect(11, 6, 15, 4)
    x.fillStyle = col
    for (const [r, a, b] of rows) x.fillRect(a, r, b - a + 1, 1)
    x.fillStyle = band; x.fillRect(12, 7, 13, 2)
    x.fillStyle = INK; x.fillRect(16, -2, 5, 5); x.fillStyle = band; x.fillRect(17, -1, 3, 3)
  })
}

/** a scarf wrapped under a star's face (sprite frame F) */
export function scarf(x, F, col = '#ff6a8a', col2 = CREAM) {
  inSprite(x, F, () => {
    x.fillStyle = INK; x.fillRect(9, 26, 19, 5); x.fillRect(22, 26, 6, 10)
    x.fillStyle = col; x.fillRect(10, 27, 17, 3); x.fillRect(23, 27, 4, 8)
    x.fillStyle = col2; x.fillRect(13, 27, 2, 3); x.fillRect(19, 27, 2, 3); x.fillRect(23, 31, 4, 1)
  })
}

/** a party hat (sprite frame F), tilt in cells */
export function partyHat(x, F, col = '#7fd0ff', tilt = 0) {
  inSprite(x, F, () => {
    x.save(); x.translate(18, 6); x.rotate(tilt)
    x.fillStyle = INK; x.beginPath(); x.moveTo(0, -12); x.lineTo(7, 4); x.lineTo(-7, 4); x.closePath(); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(0, -10); x.lineTo(5.4, 3); x.lineTo(-5.4, 3); x.closePath(); x.fill()
    x.fillStyle = GOLD; x.fillRect(-3, -4, 6, 1.4); x.fillRect(-4.6, 0, 9.2, 1.4); x.fillRect(-1.5, -13.5, 3, 3)
    x.restore()
  })
}

/** a plate of cookies */
export function cookies(x, cx, cy, n = 5, { s = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -86, -6, 172, 24); R(x, '#f4f6ff', -80, -2, 160, 14)
  for (let i = 0; i < n; i++) {
    const ox = -60 + (i % 4) * 40, oy = -18 - Math.floor(i / 4) * 22
    R(x, INK, ox - 17, oy - 13, 34, 26); R(x, '#d9903f', ox - 13, oy - 9, 26, 18); R(x, '#7a3b28', ox - 6, oy - 4, 5, 5); R(x, '#7a3b28', ox + 3, oy + 1, 5, 5)
  }
  x.restore()
}

/** a holiday card (closed or open), centred */
export function card(x, cx, cy, { w = 160, h = 200, col = '#e05a6a', rot = 0, k = 1, open = 0, text = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (open > 0) { R(x, INK, -w - 5, -h / 2 - 5, 2 * w + 10, h + 10); R(x, CREAM, -w, -h / 2, 2 * w, h); R(x, '#e8dccb', -3, -h / 2, 6, h) }
  else {
    R(x, INK, -w / 2 - 5, -h / 2 - 5, w + 10, h + 10); R(x, col, -w / 2, -h / 2, w, h)
    drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', 'Y...Y'], { Y: GOLD }, 0, -10, Math.round(w / 16))
  }
  if (text) { x.fillStyle = INK; x.font = `800 ${Math.round(h / 8)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; String(text).split('\n').forEach((r, i, a) => x.fillText(r, open ? w / 2 : 0, (i - (a.length - 1) / 2) * h / 6.5)) }
  x.restore()
}

/** night sky with a big wishing star (for windows / rooftops) */
export function nightSky(x, t, { h = SH, col = '#1d2a5c', col2 = '#2a2a6a' } = {}) {
  R(x, col, 0, 0, SW, h)
  for (let j = 0; j < 6; j++) R(x, col2, 0, j * 90, SW, 40)
  for (let i = 0; i < 40; i++) { x.save(); x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + i)); R(x, '#fff6c8', hash(i, 21) * SW, hash(i, 22) * h * 0.8, 4, 4); x.restore() }
}

/** snowy ground from y down, with soft mounds */
export function snowGround(x, y, { col = SNOW, shade = '#d9def5' } = {}) {
  R(x, col, 0, y, SW, SH - y)
  for (let i = 0; i < 7; i++) R(x, shade, i * 140 + 20, y + 40 + (i % 3) * 60, 90, 8)
  R(x, INK, 0, y - 4, SW, 6)
}

/** a little rising "!" or "?" or "…" mark above a head */
export function mark(x, t, cx, cy, t0, ch = '!', { col = '#ff4f4f', life = 1.2, cell = 8 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const k = Math.min(1, tt * 6) * (1 - ease.inQuad(clamp((tt - life + 0.25) / 0.25)))
  const BM = { '!': ['R', 'R', 'R', '.', 'R'], '?': ['RRR', '..R', '.RR', '...', '.R.'], '…': ['R.R.R'] }[ch]
  drawBits(x, BM, { R: col }, cx, cy - 10 * Math.min(1, tt * 4), cell * k)
}

export { R, drawBits, INK, BONE, GOLD, PINK, HEART, SW, SH, ease, prog, clamp, lerp }
