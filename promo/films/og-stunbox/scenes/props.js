// stunbox props: small pixel drawings on canvas (Star Talk "Wild Lessons", "Unboxing Your Match."). Every prop is a pure
// draw call; one art pixel = px screen px, crisp rectangles where they don't rotate, so they sit next to the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)                   rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawDesk(ctx, y, w)                                 the review desk + a velvet mat; y = the desk top
//   drawRingLight(ctx, cx, cy, r, t, { on, standTo })   the creator's ring light (pixel ring + glow + stand)
//   drawBoom(ctx, x0, y0, x1, y1, px, t)               a boom pole with a fluffy windscreen at (x1, y1) (the ASMR mic)
//   drawBox(ctx, cx, bottom, px, t, o)                  the product box: lilac, gold heart, "YOUR MATCH"; o = { lid (0…1
//                                                       lifted), film (0…1 peeled; null = no film), glow, label }
//   drawBeam(ctx, cx, top, w, h, k, t)                  the gold light that pours out of an opened box
//   drawPacket(ctx, x, y, px, rot)                      the silica-gel packet ("DO NOT EAT"); (x, y) = centre
//   drawBattery(ctx, x, y, px, k, t)                    a battery icon filling up (k = 0…1); (x, y) = left middle
//   drawClipboard(ctx, x, y, px, o)                     Virgo's review clipboard; o = { stars (0…5 lit), check }
//   drawBubble(ctx, x, y, w, h, { tail, tailX, px })    a pixel speech bubble; (x, y) = top-left
//   drawTear / drawSweat / drawPixelHeart               the small stuff
// Pure functions of their arguments; nothing touches `document`.
import { clamp, lerp } from '../../../src/lib.js'

const OUT = '#1a1030'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
export const RED = '#ff4f6a'

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── the desk
export function drawDesk(ctx, y, w = 1080, { alpha = 1, matX = 700, matW = 470 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  R(ctx, 0, y - 6, w, 6, '#6a4a8e')                    // the lit front lip
  R(ctx, 0, y, w, 34, '#3b2560')
  R(ctx, 0, y + 34, w, 8, '#2a1848')
  const g = ctx.createLinearGradient(0, y + 42, 0, y + 420)
  g.addColorStop(0, '#22123c'); g.addColorStop(1, '#0c0618')
  ctx.fillStyle = g; ctx.fillRect(0, y + 42, w, 420)
  // grain lines on the top
  for (let i = 0; i < 9; i++) R(ctx, (i * 173) % w, y + 10 + (i % 3) * 8, 90 + (i * 37) % 80, 3, 'rgba(120,88,170,0.35)')
  // the velvet mat (a perspective strip on the desk top)
  const m0 = matX - matW / 2
  ctx.fillStyle = '#1d5c62'; ctx.beginPath(); ctx.moveTo(m0 + 26, y - 30); ctx.lineTo(m0 + matW - 26, y - 30); ctx.lineTo(m0 + matW, y + 26); ctx.lineTo(m0, y + 26); ctx.closePath(); ctx.fill()
  ctx.fillStyle = '#2a7a80'; ctx.beginPath(); ctx.moveTo(m0 + 30, y - 26); ctx.lineTo(m0 + matW - 30, y - 26); ctx.lineTo(m0 + matW - 24, y - 18); ctx.lineTo(m0 + 24, y - 18); ctx.closePath(); ctx.fill()
  ctx.restore()
}

// ─────────────────────────────── the ring light
export function drawRingLight(ctx, cx, cy, r, t, { on = 1, standTo = 1260, alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  // stand
  R(ctx, cx - 6, cy + r, 12, standTo - cy - r, '#2b2142')
  R(ctx, cx - 6, cy + r, 4, standTo - cy - r, '#4a3d6a')
  R(ctx, cx - 18, cy + r - 6, 36, 18, '#3a2e58')
  // glow
  if (on > 0) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 2.1)
    g.addColorStop(0, `rgba(255,236,214,${0.16 * on})`); g.addColorStop(0.45, `rgba(255,200,230,${0.08 * on})`); g.addColorStop(1, 'rgba(255,200,230,0)')
    ctx.fillStyle = g; ctx.fillRect(cx - r * 2.2, cy - r * 2.2, r * 4.4, r * 4.4)
    ctx.restore()
  }
  // the ring: pixel blocks
  const px = 8, n = Math.round((Math.PI * 2 * r) / px)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    for (let d = -2; d <= 2; d++) {
      const rr = r + d * px * 0.9
      const X = cx + Math.cos(a) * rr, Y = cy + Math.sin(a) * rr
      const lit = d === -1 || d === 0 || d === 1
      ctx.fillStyle = Math.abs(d) === 2 ? '#3a2e58' : lit ? (on > 0.5 ? (d === 0 ? '#fffaf0' : '#ffe9d2') : '#8a7fa8') : '#3a2e58'
      ctx.fillRect(Math.round(X - px / 2), Math.round(Y - px / 2), px, px)
    }
  }
  ctx.restore()
}

// ─────────────────────────────── the boom mic with its fluffy windscreen
export function drawBoom(ctx, x0, y0, x1, y1, px, t, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.strokeStyle = '#1a1030'; ctx.lineWidth = px * 2.6; ctx.lineCap = 'butt'
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
  ctx.strokeStyle = '#4b4266'; ctx.lineWidth = px * 1.4
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
  // the fluffy "dead cat": an oval of grey fur, rotated along the pole
  const a = Math.atan2(y1 - y0, x1 - x0)
  ctx.translate(x1, y1); ctx.rotate(a)
  const L = 16, H = 7
  for (let j = -H; j <= H; j++) for (let i = -2; i <= L; i++) {
    const u = (i - L / 2 + 1) / (L / 2 + 1.5), v = j / (H + 0.5)
    const d = u * u + v * v
    if (d > 1) continue
    const edge = d > 0.7
    const tone = ((i * 7 + j * 13) % 5)
    ctx.fillStyle = edge ? (tone < 2 ? '#8d86a6' : '#a6a0bd') : tone === 0 ? '#c9c4da' : tone < 3 ? '#b4aec8' : '#9c96b4'
    ctx.fillRect(Math.round(i * px), Math.round(j * px), px, px)
  }
  // fur tufts that sway
  for (let k = 0; k < 14; k++) {
    const ang = (k / 14) * Math.PI * 2, sw = Math.sin(t * 3 + k * 1.3) * 0.5
    const ex = (L / 2 - 1) * px + Math.cos(ang) * (L / 2 + 1.6) * px, ey = Math.sin(ang) * (H + 1.2) * px
    ctx.fillStyle = k % 2 ? '#b4aec8' : '#9c96b4'
    ctx.fillRect(Math.round(ex + sw * px), Math.round(ey), px, px)
    ctx.fillRect(Math.round(ex + sw * px * 2 + Math.cos(ang) * px), Math.round(ey + Math.sin(ang) * px), px, px)
  }
  ctx.restore()
}

// ─────────────────────────────── the product box
const LIL = '#c7a4ff', LIL_HI = '#e2cfff', LIL_LO = '#9a76e0', LIL_DK = '#6d4bb8', GOLDB = '#ffcf5a', GOLDD = '#c88a1c'
/** cx = centre, bottom = the box's base on the desk. Box = 40 × 22 cells + a 42 × 7 lid. */
export function drawBox(ctx, cx, bottom, px, t, { lid = 0, lidRot = 0, film = null, alpha = 1, label = true, empty = false } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const BW = 40, BH = 22, L0 = cx - (BW / 2) * px, T0 = bottom - BH * px
  const X = c => L0 + c * px, Y = r => T0 + r * px
  // shadow
  ctx.fillStyle = 'rgba(6,3,16,0.45)'; ctx.fillRect(Math.round(X(-1)), Math.round(bottom - px), (BW + 2) * px, 2 * px)
  // body
  R(ctx, X(-1), Y(-1), (BW + 2) * px, (BH + 1) * px, OUT)
  R(ctx, X(0), Y(0), BW * px, BH * px, LIL)
  R(ctx, X(0), Y(0), BW * px, px, LIL_HI)
  R(ctx, X(0), Y(0), px, BH * px, LIL_HI)
  R(ctx, X(BW - 3), Y(0), 3 * px, BH * px, LIL_LO)
  R(ctx, X(0), Y(BH - 2), BW * px, 2 * px, LIL_DK)
  if (label && !empty) {
    // gold ribbon band + heart seal + wordmark
    R(ctx, X(0), Y(9), BW * px, 3 * px, GOLDB); R(ctx, X(0), Y(11), BW * px, px, GOLDD)
    bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: '#ff5f8f', W: '#ffd0dc' }, X(BW / 2 - 3.5), Y(7.5), px)
    ctx.fillStyle = '#3a1f78'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.font = `800 ${Math.round(px * 3.1)}px ${INTER}`
    ctx.fillText('YOUR MATCH', cx - px, Y(16))
    ctx.font = `700 ${Math.round(px * 1.55)}px ${MONO}`; ctx.fillStyle = '#5a3aa0'
    ctx.fillText('1 UNIT · HANDLE WITH CARE', cx - px, Y(18.8))
  }
  // the protective film: glossy, peeled from the left (film = 0 → fully on, 1 → gone)
  if (film !== null && film < 1) {
    const edge = X(lerp(-1, BW + 1, clamp(film)))
    const fx0 = Math.max(edge, X(-1)), fx1 = X(BW + 1)
    if (fx1 > fx0) {
      ctx.save(); ctx.beginPath(); ctx.rect(fx0, Y(-1), fx1 - fx0, (BH + 1) * px); ctx.clip()
      ctx.fillStyle = 'rgba(235,245,255,0.16)'; ctx.fillRect(fx0, Y(-1), fx1 - fx0, (BH + 1) * px)
      for (let k = 0; k < 3; k++) {
        const sx = X(6 + k * 13) + Math.sin(t * 0.8 + k) * px
        ctx.fillStyle = 'rgba(255,255,255,0.32)'
        ctx.beginPath(); ctx.moveTo(sx, Y(-1)); ctx.lineTo(sx + 3 * px, Y(-1)); ctx.lineTo(sx - 6 * px, Y(BH)); ctx.lineTo(sx - 9 * px, Y(BH)); ctx.closePath(); ctx.fill()
      }
      ctx.restore()
    }
    if (film > 0) {
      // the curl at the peel line + the peeled strip lifting off up and left
      const cy0 = Y(-1), ch = (BH + 1) * px
      R(ctx, edge - px, cy0, 2 * px, ch, 'rgba(255,255,255,0.75)')
      R(ctx, edge - 2 * px, cy0, px, ch, 'rgba(190,210,240,0.6)')
      const lift = Math.min(1, film * 3), sway = Math.sin(t * 5) * 0.06
      ctx.save(); ctx.translate(edge - px, cy0); ctx.rotate(-0.5 - lift * 0.5 + sway)
      const len = Math.min(18, film * 40) * px
      ctx.fillStyle = 'rgba(230,240,255,0.55)'; ctx.fillRect(-len, 0, len, ch * 0.9)
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillRect(-len, 0, len, px)
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fillRect(-len * 0.6, px * 3, px * 2, ch * 0.7)
      ctx.restore()
    }
  }
  // the lid (lifts up and tilts)
  const lidUp = lid * 30 * px
  if (lid < 1.6) {
    ctx.save()
    const LW = 42, LH = 7, lx = cx - (LW / 2) * px, ly = Y(-LH) - lidUp
    ctx.translate(cx, ly + LH * px / 2); ctx.rotate(lidRot); ctx.translate(-cx, -(ly + LH * px / 2))
    R(ctx, lx - px, ly - px, (LW + 2) * px, (LH + 2) * px, OUT)
    R(ctx, lx, ly, LW * px, LH * px, LIL_HI)
    R(ctx, lx, ly + (LH - 2) * px, LW * px, 2 * px, LIL_LO)
    R(ctx, lx + (LW - 3) * px, ly, 3 * px, LH * px, LIL)
    R(ctx, lx + 2 * px, ly + px, (LW - 8) * px, px, '#f3eaff')
    if (label) { R(ctx, lx, ly + 2 * px, LW * px, 2 * px, GOLDB); R(ctx, lx + (LW / 2 - 2) * px, ly + px, 4 * px, 4 * px, '#ff5f8f') }
    ctx.restore()
  }
  ctx.restore()
  return { top: T0 - 7 * px, left: L0, right: L0 + BW * px, bottom }
}

/** the gold light that pours up out of an opened box */
export function drawBeam(ctx, cx, top, w, h, k, t) {
  if (k <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(0, top, 0, top - h)
  g.addColorStop(0, `rgba(255,214,120,${0.55 * k})`); g.addColorStop(0.6, `rgba(255,190,140,${0.18 * k})`); g.addColorStop(1, 'rgba(255,190,140,0)')
  ctx.fillStyle = g
  ctx.beginPath(); ctx.moveTo(cx - w / 2, top); ctx.lineTo(cx + w / 2, top); ctx.lineTo(cx + w * 0.9, top - h); ctx.lineTo(cx - w * 0.9, top - h); ctx.closePath(); ctx.fill()
  for (let i = 0; i < 10; i++) {
    const ph = (t * 0.5 + i * 0.1) % 1, sx = cx + Math.sin(i * 2.7) * w * 0.4 * (1 + ph * 0.6), sy = top - ph * h * 0.8
    ctx.fillStyle = `rgba(255,240,200,${k * Math.sin(ph * Math.PI) * 0.9})`
    ctx.fillRect(Math.round(sx), Math.round(sy), 6, 6)
  }
  ctx.restore()
}

// ─────────────────────────────── the silica packet
export function drawPacket(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const w = 26 * px, h = 15 * px
  R(ctx, -w / 2 - px, -h / 2 - px, w + 2 * px, h + 2 * px, OUT)
  R(ctx, -w / 2, -h / 2, w, h, '#f4f1ea')
  R(ctx, -w / 2, -h / 2, w, px, '#ffffff')
  R(ctx, -w / 2, h / 2 - px, w, px, '#cfc8ba')
  // crimped edges
  for (let i = 0; i < 26; i += 2) { R(ctx, -w / 2 + i * px, -h / 2 + px, px, px, '#d9d2c4'); R(ctx, -w / 2 + i * px, h / 2 - 2 * px, px, px, '#d9d2c4') }
  ctx.fillStyle = '#2a2240'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = `700 ${Math.round(px * 3.2)}px ${MONO}`; ctx.fillText('SILICA GEL', 0, -px * 2.2)
  ctx.fillStyle = '#d0263f'; ctx.font = `800 ${Math.round(px * 3.4)}px ${INTER}`; ctx.fillText('DO NOT EAT', 0, px * 2.8)
  ctx.restore()
}

// ─────────────────────────────── a battery icon
export function drawBattery(ctx, x, y, px, k, t) {
  const w = 14 * px, h = 7 * px
  R(ctx, x, y - h / 2, w, h, '#efe6d6')
  R(ctx, x + px, y - h / 2 + px, w - 2 * px, h - 2 * px, '#1b1236')
  R(ctx, x + w, y - 1.5 * px, px * 1.5, 3 * px, '#efe6d6')
  const bars = Math.round(clamp(k) * 4)
  for (let i = 0; i < bars; i++) R(ctx, x + 2 * px + i * 2.6 * px, y - h / 2 + 2 * px, 2 * px, h - 4 * px, i < 4 ? '#7dffb0' : '#7dffb0')
  if (k >= 1 && Math.floor(t * 4) % 2 === 0) R(ctx, x + w + 3 * px, y - px, px, px * 2, '#7dffb0')
}

// ─────────────────────────────── Virgo's clipboard
export function drawClipboard(ctx, x, y, px, { stars = 0, rot = 0, check = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const w = 16 * px, h = 21 * px
  R(ctx, -w / 2 - px, -h / 2 - px, w + 2 * px, h + 2 * px, OUT)
  R(ctx, -w / 2, -h / 2, w, h, '#a8743a')
  R(ctx, -w / 2 + px, -h / 2 + 2 * px, w - 2 * px, h - 3 * px, '#fffaf0')
  R(ctx, -3 * px, -h / 2 - 2 * px, 6 * px, 3 * px, '#c9c4da'); R(ctx, -3 * px, -h / 2 - 2 * px, 6 * px, px, '#efeaff')
  for (let i = 0; i < 4; i++) R(ctx, -w / 2 + 3 * px, -h / 2 + (5 + i * 3) * px, (i % 2 ? 7 : 9) * px, px, '#b8b0c8')
  // five little rating stars along the bottom
  for (let i = 0; i < 5; i++) {
    const on = stars > i
    bitmap(ctx, ['..X..', '.XXX.', 'XXXXX', '.XXX.', '.X.X.'], { X: on ? '#f2c75c' : '#d8d0e4' }, -w / 2 + (1.6 + i * 2.6) * px, h / 2 - 5 * px, px * 0.5)
  }
  if (check > 0) {
    ctx.strokeStyle = '#2fbf71'; ctx.lineWidth = px * 1.4; ctx.lineCap = 'square'
    ctx.beginPath(); ctx.moveTo(w / 2 - 6 * px, -h / 2 + 6 * px); ctx.lineTo(w / 2 - 4.5 * px, -h / 2 + 7.6 * px); ctx.lineTo(w / 2 - 2 * px, -h / 2 + 4 * px)
    ctx.stroke()
  }
  ctx.restore()
}

// ─────────────────────────────── small stuff
export function drawBubble(ctx, x, y, w, h, { tail = 'down', tailX = 40, px = 5, fill = '#fffaf0', alpha = 1 } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha
  const step = (o, col) => {
    ctx.fillStyle = col
    ctx.fillRect(Math.round(x + 2 * px - o), Math.round(y - o), Math.round(w - 4 * px + 2 * o), Math.round(h + 2 * o))
    ctx.fillRect(Math.round(x - o), Math.round(y + 2 * px - o), Math.round(w + 2 * o), Math.round(h - 4 * px + 2 * o))
    ctx.fillRect(Math.round(x + px - o), Math.round(y + px - o), Math.round(w - 2 * px + 2 * o), Math.round(h - 2 * px + 2 * o))
  }
  step(px, OUT)
  const tx = x + tailX
  for (let k = 0; k < 4; k++) {
    const ty = tail === 'down' ? y + h + k * px : y - (k + 1) * px
    R(ctx, tx - (4 - k) * px * 0.5 - px, ty - (tail === 'down' ? px : 0), (4 - k) * px + 2 * px, px * 2, OUT)
  }
  for (let k = 0; k < 3; k++) {
    const ty = tail === 'down' ? y + h - px + k * px : y - k * px
    R(ctx, tx - (3 - k) * px * 0.5, ty, (3 - k) * px, px, fill)
  }
  step(0, fill)
  ctx.restore()
}
export function drawTear(ctx, x, y, px) {
  bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px)
}
export function drawSweat(ctx, x, y, px) {
  bitmap(ctx, ['..O..', '.OSO.', '.OSO.', 'OSWSO', 'OSSSO', '.OOO.'], { O: '#1f3a6e', S: '#7fd6ff', W: '#ffffff' }, x - 2.5 * px, y - 3 * px, px)
}
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}
