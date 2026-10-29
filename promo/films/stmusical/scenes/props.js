// stmusical props: small pixel drawings on canvas (Star Talk "Wild Lessons" #6, "Leo: The Musical."). Every prop is a
// pure draw call; one art pixel = px screen px, crisp rectangles, so they sit next to the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)                 rows of chars → pixels; (x, y) = top-left; '.' = empty
//   drawCurtain(ctx, side, x0, x1, y0, y1, t, sway)  red velvet stage curtain with folds + a gold tie-back; side -1 = left
//   drawValance(ctx, y, t)                           the scalloped red pelmet with gold fringe across the top of the stage
//   drawStage(ctx, y0, y1, t, lit)                   wooden stage boards + a row of footlights along the front edge
//   drawMarquee(ctx, cx, cy, w, h, t, on, k)         the "LEO · THE MUSICAL" sign: chasing bulbs; on = 0…1 lit
//   drawSpot(ctx, x0, y0, x1, y1, r, col, a)         a soft light cone from (x0, y0) onto an ellipse at (x1, y1)
//   drawRiser(ctx, cx, top, w, bottom)               the little star-spangled platform Leo stands on (scissor legs)
//   drawBalcony(ctx, x, y, w, h)                     an opera box on the side wall; (x, y) = top-left of the rail
//   drawKeySign(ctx, cx, cy, s, t)                   the hanging "KEY CHANGE ↑" sign
//   drawTopHat / drawCane / drawHeadset / drawClipboard / drawCup / drawBaton / drawRose / drawNote
//   drawLegs(ctx, r, angL, angR)                     kick-line legs (stockings + tap shoes) on a star's two lower tips
//   drawBubble / drawTear / drawSweat / drawPixelHeart / drawCrown / drawTissue           the small stuff
// Pure functions of their arguments; nothing touches `document`.

const OUT = '#1a1030'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── the theatre
const VEL = ['#5a0d22', '#7e1430', '#a51f3c', '#c9314f', '#a51f3c', '#7e1430']
/** a curtain panel: vertical folds that sway a little; side = -1 (left panel) or 1 (right panel) */
export function drawCurtain(ctx, side, x0, x1, y0, y1, t, sway = 1) {
  const w = x1 - x0, F = 26
  const n = Math.max(2, Math.ceil(w / F))
  for (let i = 0; i < n; i++) {
    const fx = x0 + i * F
    // the folds bulge toward the stage at the bottom (a gentle sway)
    const wob = Math.sin(t * 1.3 + i * 0.9) * 3 * sway
    R(ctx, fx + wob * 0.3, y0, Math.min(F, x1 - fx) + 1, y1 - y0, VEL[i % VEL.length])
    R(ctx, fx + wob * 0.3 + 4, y0, 4, y1 - y0, 'rgba(255,190,200,0.10)')
  }
  // inner edge: a darker hem + a gold trim
  const ex = side < 0 ? x1 - 10 : x0
  R(ctx, ex, y0, 10, y1 - y0, '#3a0614')
  R(ctx, side < 0 ? x1 - 4 : x0, y0, 4, y1 - y0, '#e0a53a')
  // bottom hem
  R(ctx, x0, y1 - 14, w, 14, '#3a0614'); R(ctx, x0, y1 - 18, w, 4, '#e0a53a')
}
/** the pelmet: a band with scallops and a gold fringe */
export function drawValance(ctx, y, t, W = 1080) {
  R(ctx, 0, y - 90, W, 90, '#7e1430')
  R(ctx, 0, y - 90, W, 8, '#3a0614')
  R(ctx, 0, y - 24, W, 6, '#e0a53a')
  for (let sx = 0; sx < W; sx += 120) {
    for (let k = 0; k < 6; k++) R(ctx, sx + 12 + k * 6, y - 18 + k * 4, 96 - k * 12, 6, k % 2 ? '#a51f3c' : '#7e1430')
    // fringe
    for (let f = 0; f < 12; f++) { const fy = y + 6 + Math.round(Math.sin(t * 2 + f + sx) * 1.5); R(ctx, sx + 6 + f * 9, y + 2, 4, fy - y + 8 - (Math.abs(f - 5.5) * 1.6), '#f2c75c') }
  }
}
/** the stage boards (perspective-free: horizontal planks) and the footlights */
export function drawStage(ctx, y0, y1, t, lit = 1, W = 1080) {
  const P = ['#6b3a1c', '#7c4622', '#6b3a1c', '#5b3017']
  let k = 0
  for (let y = y0; y < y1; y += 26, k++) {
    R(ctx, 0, y, W, 26, P[k % P.length])
    R(ctx, 0, y, W, 3, 'rgba(255,210,150,0.12)')
    for (let s = (k * 170) % 260; s < W; s += 260) R(ctx, s, y, 3, 26, 'rgba(20,8,4,0.35)')
  }
  // the lip of the stage
  R(ctx, 0, y1, W, 14, '#2a120a'); R(ctx, 0, y1, W, 3, '#c98a4a')
  // footlights: little hooded bulbs
  for (let x = 40; x < W; x += 80) {
    R(ctx, x - 16, y1 - 10, 32, 12, '#1a0f0a')
    const glow = lit * (0.85 + 0.15 * Math.sin(t * 9 + x))
    if (glow > 0.02) {
      ctx.save(); ctx.globalAlpha = 0.35 * glow
      const g = ctx.createRadialGradient(x, y1 - 12, 2, x, y1 - 12, 60)
      g.addColorStop(0, '#fff2c0'); g.addColorStop(1, 'rgba(255,220,140,0)')
      ctx.fillStyle = g; ctx.fillRect(x - 60, y1 - 72, 120, 80)
      ctx.restore()
    }
    R(ctx, x - 9, y1 - 16, 18, 8, glow > 0.02 ? '#fff2c0' : '#5a4a3a')
  }
}
/** the marquee: a dark sign framed by bulbs that chase; text drawn with canvas fonts */
export function drawMarquee(ctx, cx, cy, w, h, t, on = 1) {
  const L = cx - w / 2, Tp = cy - h / 2
  R(ctx, L - 8, Tp - 8, w + 16, h + 16, OUT)
  R(ctx, L, Tp, w, h, '#2a1846')
  R(ctx, L + 18, Tp + 18, w - 36, h - 36, '#150c2c')
  // bulbs along the frame
  const step = 30, pts = []
  for (let x = L + 12; x <= L + w - 12; x += step) { pts.push([x, Tp + 9]); }
  for (let y = Tp + 9 + step; y <= Tp + h - 9; y += step) pts.push([L + w - 9, y])
  for (let x = L + w - 12 - step; x >= L + 12; x -= step) pts.push([x, Tp + h - 9])
  for (let y = Tp + h - 9 - step; y > Tp + 9; y -= step) pts.push([L + 9, y])
  const chase = Math.floor(t * 10)
  pts.forEach(([x, y], i) => {
    const lit = on > 0.02 && ((i + chase) % 3 !== 0)
    R(ctx, x - 5, y - 5, 10, 10, lit ? '#fff2c0' : '#5a4a3a')
    if (lit) R(ctx, x - 3, y - 3, 4, 4, '#ffffff')
  })
  // the words
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.globalAlpha *= 0.35 + 0.65 * on
  ctx.font = `800 ${Math.round(h * 0.4)}px ${INTER}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(h * 0.06)}px`
  ctx.shadowColor = '#ffb030'; ctx.shadowBlur = 24 * on
  ctx.fillStyle = '#ffd23f'; ctx.fillText('LEO', cx, cy - h * 0.1)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.shadowBlur = 0
  ctx.font = `italic 500 ${Math.round(h * 0.2)}px ${SERIF}`; ctx.fillStyle = '#efe6d6'
  ctx.fillText('The Musical', cx, cy + h * 0.24)
  ctx.restore()
}
/** a light cone (additive) + its pool on the floor */
export function drawSpot(ctx, x0, y0, x1, y1, r, col, a = 1) {
  if (a <= 0.01) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createLinearGradient(x0, y0, x1, y1)
  g.addColorStop(0, col.replace('A', (0.5 * a).toFixed(3))); g.addColorStop(1, col.replace('A', (0.16 * a).toFixed(3)))
  ctx.fillStyle = g
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L
  ctx.beginPath(); ctx.moveTo(x0 + nx * 10, y0 + ny * 10); ctx.lineTo(x1 + nx * r, y1 + ny * r); ctx.lineTo(x1 - nx * r, y1 - ny * r); ctx.lineTo(x0 - nx * 10, y0 - ny * 10); ctx.closePath(); ctx.fill()
  const p = ctx.createRadialGradient(x1, y1, 4, x1, y1, r * 1.1)
  p.addColorStop(0, col.replace('A', (0.45 * a).toFixed(3))); p.addColorStop(1, col.replace('A', '0'))
  ctx.fillStyle = p; ctx.beginPath(); ctx.ellipse(x1, y1, r * 1.1, r * 0.32, 0, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}
/** the riser: a platform with a gold star front on criss-cross scissor legs */
export function drawRiser(ctx, cx, top, w, bottom) {
  const L = cx - w / 2, ph = 46
  // scissor legs
  const legH = bottom - (top + ph)
  if (legH > 4) {
    ctx.save(); ctx.strokeStyle = '#8a8fa8'; ctx.lineWidth = 10; ctx.lineCap = 'square'
    const n = Math.max(1, Math.round(legH / 70))
    for (let i = 0; i < n; i++) {
      const ya = top + ph + (legH * i) / n, yb = top + ph + (legH * (i + 1)) / n
      for (const [a, b] of [[L + 30, cx + w / 2 - 30], [cx + w / 2 - 30, L + 30]]) { ctx.beginPath(); ctx.moveTo(a, ya); ctx.lineTo(b, yb); ctx.stroke() }
    }
    ctx.restore()
    R(ctx, L + 10, bottom - 14, w - 20, 14, '#3b3f55')
  }
  R(ctx, L - 6, top - 6, w + 12, ph + 12, OUT)
  R(ctx, L, top, w, ph, '#3a2a7a'); R(ctx, L, top, w, 8, '#6a56c8')
  for (let i = 0; i < 5; i++) { const sx = L + 24 + i * (w - 48) / 4; R(ctx, sx - 4, top + 18, 8, 16, '#ffd23f'); R(ctx, sx - 8, top + 22, 16, 8, '#ffd23f') }
}
/** an opera box on the side wall: a gold-trimmed rail and a drape */
export function drawBalcony(ctx, x, y, w, h) {
  R(ctx, x - 6, y - 6, w + 12, h + 12, OUT)
  R(ctx, x, y, w, h, '#5a0d22')
  R(ctx, x, y, w, 10, '#e0a53a'); R(ctx, x, y + h - 10, w, 10, '#b5740e')
  for (let bx = x + 16; bx < x + w - 10; bx += 26) R(ctx, bx, y + 20, 10, h - 40, '#c9314f')
  // a little gold cartouche
  R(ctx, x + w / 2 - 22, y + h / 2 - 14, 44, 28, '#e0a53a'); R(ctx, x + w / 2 - 16, y + h / 2 - 8, 32, 16, '#7e1430')
}
/** the hanging sign: two ropes from the flies, a board with "KEY CHANGE" and a big up arrow */
export function drawKeySign(ctx, cx, cy, s, t) {
  const w = 520 * s, h = 150 * s
  ctx.save()
  ctx.fillStyle = '#d9c9a0'; ctx.fillRect(cx - w * 0.38, cy - 900, 5, 900 - h / 2); ctx.fillRect(cx + w * 0.38 - 5, cy - 900, 5, 900 - h / 2)
  ctx.translate(cx, cy); ctx.rotate(0.03 * Math.sin(t * 3.1))
  R(ctx, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, OUT)
  R(ctx, -w / 2, -h / 2, w, h, '#ffd23f'); R(ctx, -w / 2, -h / 2, w, 8 * s, '#fff2a6'); R(ctx, -w / 2, h / 2 - 8 * s, w, 8 * s, '#b5740e')
  ctx.fillStyle = OUT; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = `800 ${Math.round(64 * s)}px ${INTER}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(3 * s)}px`
  ctx.fillText('KEY CHANGE', -36 * s, 4 * s)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  // the arrow
  const ax = w / 2 - 62 * s, ay = 0
  bitmap(ctx, ['...X...', '..XXX..', '.XXXXX.', 'XXXXXXX', '..XXX..', '..XXX..', '..XXX..'], { X: '#e8344e' }, ax - 3.5 * 12 * s, ay - 3.5 * 12 * s, 12 * s)
  ctx.restore()
}

// ─────────────────────────────── costume & props
/** a top hat; (x, y) = the bottom centre of the brim */
export function drawTopHat(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    '..KKKKKKK..',
    '..KGKKKKK..',
    '..KGKKKKK..',
    '..KKKKKKK..',
    '..RRRRRRR..',
    '..KKKKKKK..',
    'KKKKKKKKKKK',
  ], { K: '#2a1f4a', G: '#8a7ac8', R: '#e8344e' }, -5.5 * px, -7 * px, px)
  ctx.fillStyle = 'rgba(255,240,200,0.55)'; ctx.fillRect(Math.round(-5.5 * px), Math.round(-px), Math.ceil(11 * px), Math.max(1, Math.round(px * 0.35)))
  ctx.restore()
}
/** a cane, tilted; (x, y) = the hand end */
export function drawCane(ctx, x, y, px, rot = 0.25) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  R(ctx, -px / 2, 0, px, px * 16, '#1c1430'); R(ctx, -px / 2, 0, px / 2, px * 16, '#4a3e6e')
  R(ctx, -px / 2, px * 16, px, px * 2, '#f2f2f2')
  R(ctx, -px * 0.5, -px, px * 3, px, '#1c1430'); R(ctx, px * 1.5, -px * 0.2, px, px * 2, '#1c1430')
  ctx.restore()
}
/** a headset on a star: the band arcs over the top tip, an earcup on the left, a mic boom to the front */
export function drawHeadset(ctx, x, top, c) {
  const p = Math.max(3, Math.round(c * 0.8))
  ctx.save()
  ctx.strokeStyle = '#2a2440'; ctx.lineWidth = p * 1.4
  ctx.beginPath(); ctx.arc(x, top + c * 9, c * 8.6, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke()
  R(ctx, x - c * 10.2, top + c * 8, p * 2.4, p * 3.4, '#2a2440'); R(ctx, x - c * 10.2 + p * 0.5, top + c * 8 + p * 0.6, p * 1.2, p * 2.2, '#5a5078')
  ctx.strokeStyle = '#2a2440'; ctx.lineWidth = p * 0.8
  ctx.beginPath(); ctx.moveTo(x - c * 9.2, top + c * 11); ctx.quadraticCurveTo(x - c * 8, top + c * 18, x - c * 3.4, top + c * 19.4); ctx.stroke()
  R(ctx, x - c * 3.8, top + c * 18.6, p * 1.6, p * 1.4, '#e8344e')
  ctx.restore()
}
/** a clipboard; (x, y) = centre */
export function drawClipboard(ctx, x, y, px, rot = -0.12) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    'OOOOSSSOOOO',
    'OBBBSSSBBBO',
    'OBWWWWWWWBO',
    'OBWLLLLLWBO',
    'OBWWWWWWWBO',
    'OBWLLLLWWBO',
    'OBWWWWWWWBO',
    'OBWLLLLLWBO',
    'OBWWWWWWWBO',
    'OBWLLWWWWBO',
    'OBBBBBBBBBO',
    'OOOOOOOOOOO',
  ], { O: OUT, B: '#a8743e', W: '#fbf6ec', L: '#8a80a8', S: '#c0c4d8' }, -5.5 * px, -6 * px, px)
  ctx.restore()
}
/** a to-go coffee cup with a sleeve and steam; (x, y) = bottom centre */
export function drawCup(ctx, x, y, px, t) {
  bitmap(ctx, [
    'OOOOOOO',
    'OLLLLLO',
    '.OWWWO.',
    '.OSSSO.',
    '.OSSSO.',
    '.OWWWO.',
    '..OOO..',
  ], { O: OUT, L: '#ffffff', W: '#f4ece0', S: '#b5743e' }, x - 3.5 * px, y - 7 * px, px)
  ctx.save(); ctx.globalAlpha *= 0.7
  for (let k = 0; k < 2; k++) { const ph = (t * 0.9 + k * 0.5) % 1; R(ctx, x - px + k * px * 1.6 + Math.sin(ph * 6 + k) * px * 0.6, y - 8 * px - ph * 5 * px, px * 0.8, px * 1.4, `rgba(255,255,255,${(1 - ph) * 0.8})`) }
  ctx.restore()
}
/** a conductor's baton; (x, y) = the grip */
export function drawBaton(ctx, x, y, px, rot = -0.6) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  R(ctx, -px, -px, px * 2, px * 3, '#5a3a1c'); R(ctx, -px / 2, -px * 11, px, px * 10, '#fbf6ec')
  ctx.restore()
}
/** a red rose (thrown on stage); (x, y) = centre */
export function drawRose(ctx, x, y, px, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, ['.RR..', 'RrRR.', 'RRrR.', '.RR..', '..G..', '.GG..', '..G..', '..G..'], { R: '#e8344e', r: '#a51f3c', G: '#3aa86a' }, -2.5 * px, -2 * px, px)
  ctx.restore()
}
const NOTE1 = ['...XX', '...XX', '...X.', '...X.', '...X.', '.XXX.', 'XXXX.', '.XX..']
const NOTE2 = ['.XXXXXX', '.XXXXXX', '.X....X', '.X....X', '.X....X', 'XX...XX', 'XX..XXX', '...XX..']
/** a pixel music note (kind 1 = ♪, 2 = ♫); (x, y) = centre */
export function drawNote(ctx, x, y, px, kind = 1, col = '#ffd23f', rot = 0) {
  const rows = kind === 2 ? NOTE2 : NOTE1
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, rows, { X: OUT }, -rows[0].length / 2 * px + px * 0.5, -4 * px + px * 0.5, px)
  bitmap(ctx, rows, { X: col }, -rows[0].length / 2 * px, -4 * px, px)
  ctx.restore()
}
/** kick-line legs on a star: one stocking + tap shoe from each lower tip. ang = 0 hangs straight down, + kicks forward
 *  (the left leg swings left/up for negative angles, mirrored for the right). r = drawStarChar's return, c = r.size/36 */
export function drawLegs(ctx, r, angL = 0, angR = 0) {
  const c = r.size / 36
  const len = c * 13, wd = Math.max(6, c * 2.6)
  for (const [side, ang] of [[-1, angL], [1, angR]]) {
    const hx = r.x + side * c * 5.6, hy = r.y + c * 11.5
    ctx.save(); ctx.translate(hx, hy); ctx.rotate(-side * ang)
    ctx.fillStyle = OUT; ctx.fillRect(-wd / 2 - 3, -2, wd + 6, len + 4)
    ctx.fillStyle = '#f4e6ff'; ctx.fillRect(-wd / 2, 0, wd, len)
    ctx.fillStyle = 'rgba(120,90,180,0.45)'; for (let k = 0; k < len; k += c * 2) ctx.fillRect(-wd / 2, k, wd, Math.max(1, c * 0.5))
    ctx.fillStyle = OUT; ctx.fillRect(side < 0 ? -wd * 1.4 - 3 : -wd / 2 - 3, len - 3, wd * 1.9 + 6, wd * 0.9 + 6)
    ctx.fillStyle = '#e8344e'; ctx.fillRect(side < 0 ? -wd * 1.4 : -wd / 2, len, wd * 1.9, wd * 0.9)
    ctx.fillStyle = '#ffd0d8'; ctx.fillRect(side < 0 ? -wd * 1.2 : 0, len + 1, wd * 0.6, Math.max(2, wd * 0.25))
    ctx.restore()
  }
}

// ─────────────────────────────── the small stuff (Star Talk house style)
/** a pixel speech bubble; (x, y) = top-left */
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
export function drawCrown(ctx, x, y, px, rot = -0.12) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    'L...L...L',
    'GL.LGL.LG',
    'GGLGGGLGG',
    'GGGGGGGGG',
    'GRGGBGGRG',
    'GGGGGGGGG',
    'LLLLLLLLL',
  ], { L: '#7a4a10', G: '#ffd23f', R: '#ff3d6e', B: '#38c4ec' }, -4.5 * px, -7 * px, px)
  R(ctx, -3.5 * px, -5 * px, px, px, '#fff6c0')
  ctx.restore()
}
export function drawTissue(ctx, x, y, px, t) {
  const f = Math.floor(t * 6) % 2
  bitmap(ctx, f ? ['..OOOO.', '.OWWWWO', 'OWWSWWO', 'OWWWWO.', '.OOOO..'] : ['.OOOO..', 'OWWWWO.', 'OWWSWWO', '.OWWWWO', '..OOOO.'], { O: '#5a5478', W: '#ffffff', S: '#dcd6ee' }, x - 3.5 * px, y - 2.5 * px, px)
}
export { MONO, INTER, SERIF, OUT }
