// The Windows-98-ish dialog that types the line out. Drawn in 2D at full
// output resolution so the text stays crisp over the soft 3D render.

const FONT = '"ZPoppins", "Poppins", "Inter", sans-serif'

function wrap(ctx, text, maxW) {
  const words = text.split(' ')
  const lines = []
  let cur = ''
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w
    if (ctx.measureText(next).width > maxW && cur) {
      lines.push(cur)
      cur = w
    } else cur = next
  }
  if (cur) lines.push(cur)
  return lines
}

// Lays the dialog out once for the full text, so the box doesn't grow while
// it types (the reference's box is fixed too).
export function layoutPopup(ctx, W, H, text, { side = 0 } = {}) {
  const fs = Math.round(W * 0.036)
  ctx.font = `italic 600 ${fs}px ${FONT}`
  const maxInner = W * 0.6
  let lines = wrap(ctx, text, maxInner)
  // balance: try narrower widths while the line count holds
  for (let w = maxInner; w > W * 0.36; w -= W * 0.02) {
    const l = wrap(ctx, text, w)
    if (l.length > lines.length) break
    lines = l
  }
  const textW = Math.max(...lines.map((l) => ctx.measureText(l).width))
  const pad = fs * 0.75
  const titleH = Math.round(fs * 1.25)
  const lh = fs * 1.32
  const w = Math.max(textW + pad * 2, W * 0.42)
  const h = titleH + pad * 1.4 + lines.length * lh
  const cx = W * (0.5 + side * 0.06)
  return { fs, lines, pad, titleH, lh, w, h, x: Math.round(cx - w / 2), y: Math.round(H * 0.125) }
}

function bevel(ctx, x, y, w, h, light, dark, t) {
  ctx.fillStyle = light
  ctx.fillRect(x, y, w, t)
  ctx.fillRect(x, y, t, h)
  ctx.fillStyle = dark
  ctx.fillRect(x, y + h - t, w, t)
  ctx.fillRect(x + w - t, y, t, h)
}

function button(ctx, x, y, s, kind, u) {
  ctx.fillStyle = kind === 'x' ? '#e8262b' : '#ffffff'
  ctx.fillRect(x, y, s, s)
  bevel(ctx, x, y, s, s, kind === 'x' ? '#ff8a8a' : '#ffffff', kind === 'x' ? '#7a0a0a' : '#6a7a9a', Math.max(1, u * 0.12))
  ctx.strokeStyle = kind === 'x' ? '#ffffff' : '#1d4fd8'
  ctx.lineWidth = Math.max(2, s * 0.13)
  ctx.lineCap = 'square'
  if (kind === 'x') {
    const m = s * 0.3
    ctx.beginPath()
    ctx.moveTo(x + m, y + m)
    ctx.lineTo(x + s - m, y + s - m)
    ctx.moveTo(x + s - m, y + m)
    ctx.lineTo(x + m, y + s - m)
    ctx.stroke()
  } else {
    ctx.fillStyle = '#1d4fd8'
    ctx.font = `700 ${Math.round(s * 0.78)}px ${FONT}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('?', x + s / 2, y + s / 2 + s * 0.04)
    ctx.textAlign = 'left'
  }
}

// typed: how many characters show. appear: 0..1 pop-in.
export function drawPopup(ctx, L, title, text, typed, appear = 1) {
  if (appear <= 0) return
  const { x, y, w, h, titleH, pad, lh, fs } = L
  ctx.save()
  const s = 0.9 + 0.1 * Math.min(1, appear)
  ctx.globalAlpha = Math.min(1, appear * 1.5)
  ctx.translate(x + w / 2, y + h / 2)
  ctx.scale(s, s)
  ctx.translate(-(x + w / 2), -(y + h / 2))
  const u = fs * 0.12
  // drop shadow
  ctx.fillStyle = 'rgba(0,0,0,0.28)'
  ctx.fillRect(x + u * 3, y + u * 4, w, h)
  // frame
  ctx.fillStyle = '#d9dde6'
  ctx.fillRect(x, y, w, h)
  bevel(ctx, x, y, w, h, '#ffffff', '#5b6478', Math.max(2, u * 0.6))
  // title bar
  const tb = Math.max(3, u)
  const g = ctx.createLinearGradient(x, 0, x + w, 0)
  g.addColorStop(0, '#1747d6')
  g.addColorStop(1, '#5b94ff')
  ctx.fillStyle = g
  ctx.fillRect(x + tb, y + tb, w - tb * 2, titleH - tb)
  ctx.fillStyle = '#ffffff'
  ctx.font = `700 ${Math.round(titleH * 0.5)}px ${FONT}`
  ctx.textBaseline = 'middle'
  ctx.fillText(title, x + tb + pad * 0.5, y + tb + (titleH - tb) / 2 + 1)
  const bs = Math.round((titleH - tb) * 0.74)
  const by = y + tb + ((titleH - tb) - bs) / 2
  button(ctx, x + w - tb - bs - pad * 0.35, by, bs, 'x', u)
  button(ctx, x + w - tb - bs * 2 - pad * 0.55, by, bs, 'q', u)
  // body
  const bx = x + tb, byy = y + titleH, bw = w - tb * 2, bh = h - titleH - tb
  ctx.fillStyle = '#fbfbfd'
  ctx.fillRect(bx, byy, bw, bh)
  ctx.fillStyle = '#1b1b22'
  ctx.font = `italic 600 ${fs}px ${FONT}`
  ctx.textBaseline = 'alphabetic'
  let left = typed
  L.lines.forEach((line, i) => {
    if (left <= 0) return
    const part = line.slice(0, left)
    left -= line.length + 1
    ctx.fillText(part, bx + pad - tb, byy + pad * 0.7 + lh * i + fs * 0.98)
  })
  ctx.restore()
}
