// stmission props: the little pixel drawings of Star Control (Star Talk "Wild Lessons", "Mission Control."). Every prop
// is a pure draw call; one art pixel = px screen px, so they sit next to the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)                     rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawHeadset(ctx, r, { mic, alpha })                  a headset on a star (r = drawStarChar's return)
//   drawHelmet(ctx, r)                                   the astronaut's fishbowl helmet around a star
//   drawShades(ctx, r)                                   Scorpio's sunglasses
//   drawBinder(ctx, x, y, px, rot)                       Virgo's red RULES binder; (x, y) = centre
//   drawPencil(ctx, x, y, px, rot)                       Capricorn's chewed pencil
//   drawBrush(ctx, x, y, px, rot)                        a paint brush with a pink tip
//   drawRocket(ctx, cx, base, { w, h, lines, heart, t }) the reply rocket; (cx, base) = the bottom of its body
//   drawFlame(ctx, x, y, w, h, t)                        a pixel exhaust flame hanging from (x, y)
//   drawGantry(ctx, x, top, ground)                      the red launch tower
//   drawRock(ctx, y, w)                                  the floating launch rock (its top at y)
//   drawDesk(ctx, y, W, t, labels)                       the long mission-control console desk (its top at y)
//   drawPill(ctx, x, y, text, col, k)                    a GO / NO-GO tag
//   drawBubble / drawTear / drawSweat / drawPixelHeart / drawTissue      the small stuff
// Pure functions of their arguments; nothing touches `document`.
const OUT = '#1a1030'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── on the stars
export function drawHeadset(ctx, r, { mic = true, alpha = 1, dx = 0, dy = 0, rot = 0 } = {}) {
  if (alpha <= 0) return
  const s = r.size, cx = r.x + dx, cy = r.y + s * 0.02 + dy, lw = Math.max(4, Math.round(s * 0.035))
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot)
  ctx.strokeStyle = OUT; ctx.lineWidth = lw + 4
  ctx.beginPath(); ctx.arc(0, 0, s * 0.3, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke()
  ctx.strokeStyle = '#4a4466'; ctx.lineWidth = lw
  ctx.beginPath(); ctx.arc(0, 0, s * 0.3, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke()
  const pw = s * 0.09, ph = s * 0.15
  for (const sd of [-1, 1]) {
    const px0 = sd * s * 0.29 - pw / 2
    R(ctx, px0 - 3, -ph / 2 - 3, pw + 6, ph + 6, OUT); R(ctx, px0, -ph / 2, pw, ph, '#2c2646'); R(ctx, px0 + 3, -ph / 2 + 3, pw * 0.35, ph - 6, '#6a628e')
  }
  if (mic) {
    ctx.strokeStyle = OUT; ctx.lineWidth = Math.max(3, lw * 0.6)
    ctx.beginPath(); ctx.moveTo(-s * 0.27, s * 0.06); ctx.quadraticCurveTo(-s * 0.22, s * 0.2, -s * 0.09, s * 0.19); ctx.stroke()
    R(ctx, -s * 0.11, s * 0.16, s * 0.05, s * 0.05, '#e8344e')
  }
  ctx.restore()
}
export function drawHelmet(ctx, r, alpha = 1) {
  const s = r.size, cx = r.x, cy = r.y + s * 0.03, rad = s * 0.6
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = 'rgba(170,225,255,0.10)'; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = 'rgba(26,16,48,0.85)'; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = 'rgba(220,240,255,0.85)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 10; ctx.lineCap = 'round'
  ctx.beginPath(); ctx.arc(cx, cy, rad * 0.8, Math.PI * 1.15, Math.PI * 1.38); ctx.stroke()
  // the collar ring
  R(ctx, cx - rad * 0.62, cy + rad * 0.78, rad * 1.24, s * 0.08, OUT); R(ctx, cx - rad * 0.58, cy + rad * 0.78 + 3, rad * 1.16, s * 0.08 - 6, '#c9c3d8')
  ctx.restore()
}
export function drawShades(ctx, r, { dy = 0, rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const s = r.size, ey = r.y + s * 0.045 + dy, w = s * 0.19, h = s * 0.11
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(r.x, ey); ctx.rotate(rot)
  for (const sd of [-1, 1]) {
    const x0 = sd * s * 0.13 - w / 2
    R(ctx, x0, -h / 2, w, h, '#0c0816'); R(ctx, x0 + w * 0.15, -h / 2 + h * 0.18, w * 0.3, h * 0.18, 'rgba(255,255,255,0.75)')
  }
  R(ctx, -s * 0.05, -h / 2 + 2, s * 0.1, Math.max(3, s * 0.02), '#0c0816')
  ctx.restore()
}
export function drawBinder(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const w = 22 * px, h = 28 * px
  R(ctx, -w / 2 - px, -h / 2 - px, w + 2 * px, h + 2 * px, OUT); R(ctx, -w / 2, -h / 2, w, h, '#d8344e'); R(ctx, -w / 2, -h / 2, 3 * px, h, '#a8243a')
  R(ctx, -w / 2 + 5 * px, -h / 2 + 4 * px, w - 8 * px, 9 * px, '#fffaf0')
  ctx.fillStyle = OUT; ctx.font = `700 ${Math.round(px * 3.6)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('THE', 1.5 * px, -h / 2 + 6.5 * px); ctx.fillText('RULES', 1.5 * px, -h / 2 + 10.5 * px)
  ctx.fillStyle = '#ffd0d8'; ctx.font = `700 ${Math.round(px * 2.6)}px ${MONO}`; ctx.fillText('vol. 3', 1.5 * px, h / 2 - 5 * px)
  ctx.restore()
}
export function drawPencil(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, ['OOOOOOOOOOOOOO..', 'OPYYYYYYYYYYYWKO', 'OPYYYYYYYYYYYWWK', 'OOOOOOOOOOOOOO..'], { O: OUT, P: '#ff8fb1', Y: '#ffd23f', W: '#f3d6a8', K: '#2a2340' }, -8 * px, -2 * px, px)
  ctx.restore()
}
export function drawBrush(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, ['OOOOOOOOOOOO....', 'OBBBBBBBBBSOOOO.', 'OBBBBBBBBBSPPPPO', 'OBBBBBBBBBSPPPPO', 'OBBBBBBBBBSOOOO.', 'OOOOOOOOOOOO....'], { O: OUT, B: '#8a5530', S: '#c9c3d8', P: '#ff4f7e' }, -8 * px, -3 * px, px)
  ctx.restore()
}

// ─────────────────────────────── the rocket
/** the reply rocket. lines = the reply painted on its side (each { text, alpha }); heart 0…1 (the painted ♥) */
export function drawRocket(ctx, cx, base, { w = 220, h = 470, lines = [], heart = 0, heartScale = 1, glow = 0 } = {}) {
  const P = 10, L = cx - w / 2, top = base - h
  if (glow > 0) {
    const g = ctx.createRadialGradient(cx, base - h / 2, 0, cx, base - h / 2, h * 0.8)
    g.addColorStop(0, `rgba(255,220,160,${0.25 * glow})`); g.addColorStop(1, 'rgba(255,220,160,0)'); ctx.fillStyle = g; ctx.fillRect(cx - h, base - h * 1.3, h * 2, h * 1.6)
  }
  // fins
  for (const sd of [-1, 1]) {
    for (let k = 0; k < 8; k++) {
      const fx = sd < 0 ? L - (k < 6 ? (k + 1) * 9 : 54) : L + w, fw = k < 6 ? (k + 1) * 9 : 54
      R(ctx, sd < 0 ? fx - P : fx, base - 150 + k * 18, fw + P, 18, OUT)
      R(ctx, sd < 0 ? fx : fx, base - 150 + k * 18 + 3, fw, 14, k % 2 ? '#c8243e' : '#e8344e')
    }
  }
  // nozzle
  R(ctx, cx - 64, base, 128, 46, OUT); R(ctx, cx - 54, base, 108, 36, '#5a5478'); R(ctx, cx - 54, base + 24, 108, 12, '#3b3456')
  // body
  R(ctx, L - P, top, w + 2 * P, h, OUT)
  R(ctx, L, top, w, h, '#efe6d6'); R(ctx, L + w - 34, top, 34, h, '#cfc3b0'); R(ctx, L + 14, top, 12, h, '#fffaf0')
  R(ctx, L, base - 60, w, 20, '#e8344e'); R(ctx, L, base - 40, w, 6, OUT)
  // nose cone (stepped)
  const steps = 9, nh = 150
  for (let k = 0; k < steps; k++) {
    const ww = w * (1 - k / steps) + 4, yy = top - (k + 1) * (nh / steps)
    R(ctx, cx - ww / 2 - P, yy, ww + 2 * P, nh / steps + 1, OUT)
    R(ctx, cx - ww / 2, yy, ww, nh / steps + 1, k > steps - 3 ? '#ff6f86' : '#e8344e')
  }
  R(ctx, cx - 4, top - nh - 34, 8, 34, OUT); R(ctx, cx - 10, top - nh - 44, 20, 14, '#ffd23f')
  // porthole
  const wy = top + 70
  R(ctx, cx - 36, wy - 30, 72, 60, OUT); R(ctx, cx - 30, wy - 36, 60, 72, OUT); R(ctx, cx - 26, wy - 24, 52, 48, '#5fb8ec'); R(ctx, cx - 18, wy - 18, 14, 14, '#dff4ff')
  // the painted reply
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  lines.forEach((ln, i) => {
    if (!ln || ln.alpha <= 0) return
    ctx.save(); ctx.globalAlpha *= ln.alpha
    ctx.fillStyle = '#1b1236'; ctx.font = `800 ${ln.size || 46}px ${INTER}`
    ctx.fillText(ln.text, cx - 8, top + 175 + i * 58)
    ctx.restore()
  })
  if (heart > 0) {
    ctx.save(); ctx.globalAlpha *= Math.min(1, heart); ctx.translate(cx - 8, top + 175 + lines.length * 58 + 16); ctx.scale(heartScale, heartScale)
    drawPixelHeart(ctx, 0, 0, 8); ctx.restore()
  }
}
export function drawFlame(ctx, x, y, w, h, t) {
  const rows = 12
  for (let k = 0; k < rows; k++) {
    const p = k / rows, jit = Math.sin(t * 47 + k * 2.1) * 0.12 + Math.sin(t * 31 + k) * 0.08
    const ww = w * (1 - p * 0.85) * (1 + jit), hh = h / rows + 1
    const col = p < 0.3 ? '#fff4c2' : p < 0.6 ? '#ffd23f' : p < 0.85 ? '#ff9a3a' : '#ff5a4e'
    R(ctx, x - ww / 2, y + k * (h / rows), ww, hh, col)
    if (p < 0.5) R(ctx, x - ww * 0.2, y + k * (h / rows), ww * 0.4, hh, '#ffffff')
  }
}
export function drawGantry(ctx, x, top, ground) {
  const w = 120
  R(ctx, x - w / 2 - 6, top, w + 12, ground - top, OUT)
  R(ctx, x - w / 2, top, 16, ground - top, '#c8324a'); R(ctx, x + w / 2 - 16, top, 16, ground - top, '#c8324a')
  ctx.strokeStyle = '#a8243a'; ctx.lineWidth = 10
  for (let y = top + 20; y < ground - 60; y += 90) { ctx.beginPath(); ctx.moveTo(x - w / 2 + 16, y); ctx.lineTo(x + w / 2 - 16, y + 90); ctx.moveTo(x + w / 2 - 16, y); ctx.lineTo(x - w / 2 + 16, y + 90); ctx.stroke() }
  for (let y = top; y < ground; y += 90) R(ctx, x - w / 2, y, w, 12, '#e8344e')
  // a little lamp on top
  R(ctx, x - 14, top - 26, 28, 26, OUT)
}
export function drawRock(ctx, y, w, H) {
  ctx.fillStyle = OUT
  ctx.beginPath(); ctx.moveTo(-40, y - 8); ctx.lineTo(w + 40, y - 8); ctx.lineTo(w + 40, H + 40); ctx.lineTo(-40, H + 40); ctx.fill()
  const g = ctx.createLinearGradient(0, y, 0, H); g.addColorStop(0, '#5a4a86'); g.addColorStop(0.25, '#3a2d62'); g.addColorStop(1, '#1a1236')
  ctx.fillStyle = g; ctx.fillRect(-40, y, w + 80, H - y + 40)
  R(ctx, -40, y, w + 80, 10, '#7a68a8')
  for (const [cx, cy, rr] of [[150, y + 120, 34], [420, y + 260, 52], [760, y + 150, 40], [960, y + 330, 30], [300, y + 450, 28], [640, y + 480, 44]]) {
    R(ctx, cx - rr, cy - rr * 0.4, rr * 2, rr * 0.8, '#2a1f4c'); R(ctx, cx - rr * 0.8, cy - rr * 0.4, rr * 1.6, rr * 0.2, '#16102e')
  }
  // the pad plate
  R(ctx, 420, y - 18, 360, 26, OUT); R(ctx, 428, y - 14, 344, 14, '#8a84a8')
  for (let k = 0; k < 8; k++) R(ctx, 432 + k * 44, y - 14, 22, 6, k % 2 ? '#ffd23f' : '#1a1030')
}

// ─────────────────────────────── the room
export function drawDesk(ctx, y, W, t, labels) {
  const H = 250
  R(ctx, -20, y - 6, W + 40, H + 30, OUT)
  R(ctx, -20, y, W + 40, 40, '#4a3a7e'); R(ctx, -20, y, W + 40, 6, '#7a68b8')
  const g = ctx.createLinearGradient(0, y + 40, 0, y + H); g.addColorStop(0, '#2b2052'); g.addColorStop(1, '#170f33')
  ctx.fillStyle = g; ctx.fillRect(-20, y + 40, W + 40, H)
  R(ctx, -20, y + 40, W + 40, 6, OUT)
  // buttons that blink on their own
  for (let i = 0; i < 26; i++) {
    const bx = 30 + i * 40, row = i % 3, on = (Math.floor(t * 3 + i * 1.7) % 5) === 0
    const col = ['#46cf82', '#ffd23f', '#ff4f5e', '#7fd0f0'][(i * 7) % 4]
    R(ctx, bx, y + 14 + (row === 1 ? 0 : 6), 18, 10, on ? col : '#2a2350')
  }
  labels.forEach(([lx, text]) => {
    const tw = text.length * 17 + 30
    R(ctx, lx - tw / 2, y + 66, tw, 40, OUT); R(ctx, lx - tw / 2 + 3, y + 69, tw - 6, 34, '#120a26')
    ctx.fillStyle = '#f2c75c'; ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, lx, y + 87)
    for (let k = 0; k < 4; k++) { const on = (Math.floor(t * 2 + k + lx) % 4) === 0; R(ctx, lx - 66 + k * 36, y + 140, 24, 24, OUT); R(ctx, lx - 63 + k * 36, y + 143, 18, 18, on ? '#7fd0f0' : '#3a2f66') }
  })
}
export function drawPill(ctx, x, y, text, col, k) {
  if (k <= 0.02) return
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k)
  ctx.font = `700 34px ${MONO}`; const w = ctx.measureText(text).width + 36, h = 56
  R(ctx, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8, OUT); R(ctx, -w / 2, -h / 2, w, h, col)
  ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 2)
  ctx.restore()
}

// ─────────────────────────────── the small stuff
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
export function drawTissue(ctx, x, y, px, t) {
  const f = Math.floor(t * 6) % 2
  bitmap(ctx, f ? ['..OOOO.', '.OWWWWO', 'OWWSWWO', 'OWWWWO.', '.OOOO..'] : ['.OOOO..', 'OWWWWO.', 'OWWSWWO', '.OWWWWO', '..OOOO.'], { O: '#5a5478', W: '#ffffff', S: '#dcd6ee' }, x - 3.5 * px, y - 2.5 * px, px)
}
