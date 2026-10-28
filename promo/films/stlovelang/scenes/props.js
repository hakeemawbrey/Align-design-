// stlovelang props: small pixel drawings on canvas (Star Talk season 3). Every prop is a pure draw call at a pixel size
// `px` (one art pixel = px screen px), crisp rectangles only, so they sit next to the pixel stars.
//   bitmap(ctx, rows, pal, x, y, px)                    rows of chars → pixels (x, y = top-left)
//   drawTable(ctx, x, y, t)                             the tiny date table: checkered cloth, a candle (x, y = tabletop centre)
//   drawPie(ctx, x, y, px, { bite, steam, t })          a lattice pie in a tin (x, y = bottom centre); bite 0…1 = a chomp
//   drawCrown(ctx, x, y, px, rot)                       Leo's tiny crown (x, y = bottom centre)
//   drawMitt(ctx, x, y, px, rot)                        Taurus' oven mitt (x, y = centre)
//   drawHeadphones(ctx, cx, cy, size, { col, alpha })   big pixel headphones on a star (cx, cy = the star's centre)
//   drawBooth(ctx, x, y, w, h, t, { on, screen, blink }) the summit interpreter booth (x, y = top-left)
//   drawGreatBanner(ctx, x0, x1, y, t, { k, bite })     Leo's painted "YOU'RE GREAT" banner on two sticks (k = unroll)
//   drawLaundry(ctx, x, y, px, n, fold)                 a basket + n folded shirts + one shirt mid-fold (x, y = bottom centre)
//   drawBench(ctx, x, y, px)                            a little two-seat bench (x, y = seat centre)
//   drawSpiceRack(ctx, x, y, px, t, { swap })           a wall shelf of labelled jars (x, y = top-left)
//   drawPixelHeart(ctx, x, y, px, col)                  a 7×6 heart (x, y = centre)
//   drawTear / drawSweat(ctx, x, y, px)                 one pixel drop
//   drawTalkCard(ctx, cx, cy, w, { rot, sx, glow, q }) the talk card (question in Garamond italic) · w = card width
//   drawAnswer(ctx, cx, cy, w, { rot, sx, who, lines, col }) an answer card: back when sx > 0 is passed as back: true
import { clamp } from '../../../src/lib.js'

const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const OUT = '#1a1030'
const GOLD = '#f2c75c', BONE = '#efe6d6'

export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── the date table
export function drawTable(ctx, x, y, t) {
  const p = 8, w = 46, top = y
  // legs (a single pedestal + a foot)
  R(ctx, x - 3 * p, top + 5 * p, 6 * p, 22 * p, OUT); R(ctx, x - 2 * p, top + 5 * p, 4 * p, 22 * p, '#5a3a2a'); R(ctx, x - 2 * p, top + 5 * p, p, 22 * p, '#8a5a3a')
  R(ctx, x - 11 * p, top + 26 * p, 22 * p, 3 * p, OUT); R(ctx, x - 10 * p, top + 26 * p, 20 * p, 2 * p, '#5a3a2a')
  // the cloth: a red/cream checker drape
  for (let j = 0; j < 7; j++) {
    const hw = w / 2 + (j > 1 ? 1 : 0)
    R(ctx, x - (hw + 1) * p, top + j * p, (2 * hw + 2) * p, p, OUT)
    for (let i = -hw; i < hw; i++) R(ctx, x + i * p, top + j * p, p, p, j === 0 ? '#ffe7e0' : ((Math.floor((i + 40) / 2) + Math.floor(j / 2)) % 2 ? '#e8455e' : '#fff3ea'))
  }
  // scalloped hem
  for (let i = -w / 2 - 1; i < w / 2 + 1; i += 2) R(ctx, x + i * p, top + 7 * p, p, p, '#c23048')
  // the candle in a little jar (left of centre, so the pie has room)
  const cx = x - 70, cy = top - 2 * p
  R(ctx, cx - 3 * p, cy - 3 * p, 6 * p, 5 * p, 'rgba(255,220,180,0.35)'); R(ctx, cx - 3 * p, cy + 2 * p, 6 * p, p, OUT)
  R(ctx, cx - p, cy - 7 * p, 2 * p, 6 * p, '#fff3ea'); R(ctx, cx - p, cy - 7 * p, p, 6 * p, '#ffffff')
  const fl = Math.sin(t * 13) * 0.5 + Math.sin(t * 7.3) * 0.5
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(cx, cy - 10 * p, 0, cx, cy - 10 * p, 120)
  g.addColorStop(0, `rgba(255,200,120,${0.32 + 0.06 * fl})`); g.addColorStop(1, 'rgba(255,200,120,0)')
  ctx.fillStyle = g; ctx.fillRect(cx - 120, cy - 10 * p - 120, 240, 240); ctx.restore()
  bitmap(ctx, ['.Y.', 'YOY', 'YOY', '.Y.'], { Y: '#ffd23f', O: '#ff8a3a' }, cx - 1.5 * p + (fl > 0.3 ? p * 0.5 : 0), cy - 11 * p, p)
}

// ─────────────────────────────── the pie
export function drawPie(ctx, x, y, px, { bite = 0, steam = 1, t = 0, alpha = 1 } = {}) {
  ctx.save(); ctx.globalAlpha *= alpha
  const rows = [
    '....LLLLLLLLLL....',
    '..LLCCHCCCHCCCLL..',
    '.LCHCCCHCCCHCCCCL.',
    'LCCCHCCRCHCCCHCCCL',
    'LCRCCCHCCCRCHCCRCL',
    'LTTTTTTTTTTTTTTTTL',
    '.LTDTDTDTDTDTDTDL.',
    '..LLLLLLLLLLLLLL..',
  ]
  // the bite: a round notch out of the right edge
  const b = Math.round(clamp(bite) * 6)
  const rr = rows.map((row, j) => row.split('').map((c, i) => (b > 0 && (i - 18) ** 2 + (j - 1.5) ** 2 * 1.6 < (b + 1) ** 2) ? '.' : c).join(''))
  bitmap(ctx, rr, { L: OUT, C: '#f0b45a', H: '#ffd98a', R: '#c2304a', T: '#c9cbd8', D: '#8d84ab' }, x - 9 * px, y - 8 * px, px)
  // steam
  if (steam > 0) {
    ctx.globalAlpha *= clamp(steam) * 0.8
    for (let k = 0; k < 3; k++) {
      const a = ((t * 0.7 + k / 3) % 1)
      const sx = x + (k - 1) * 5 * px + Math.sin(a * 6 + k) * px * 1.5, sy = y - 9 * px - a * 14 * px
      ctx.globalAlpha = alpha * clamp(steam) * 0.7 * Math.sin(a * Math.PI)
      R(ctx, sx, sy, px, 2 * px, '#fffbea'); R(ctx, sx + px, sy - 2 * px, px, 2 * px, '#fffbea')
    }
  }
  ctx.restore()
}

export function drawCrown(ctx, x, y, px, rot = -0.12) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, ['L...L...L', 'GL.LGL.LG', 'GGLGGGLGG', 'GGGGGGGGG', 'GRGGBGGRG', 'GGGGGGGGG', 'LLLLLLLLL'],
    { L: '#7a4a10', G: '#ffd23f', R: '#ff3d6e', B: '#38c4ec' }, -4.5 * px, -7 * px, px)
  R(ctx, -3.5 * px, -5 * px, px, px, '#fff6c0')
  ctx.restore()
}

export function drawMitt(ctx, x, y, px, rot = 0.3) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  bitmap(ctx, [
    '.LLL.....',
    'LPPPL.LL.',
    'LPWPLLPPL',
    'LPPPPPPPL',
    'LPWPPWPPL',
    'LPPPPPPPL',
    '.LPPPPPL.',
    '.LCCCCCL.',
    '.LLLLLLL.',
  ], { L: OUT, P: '#ff8fb1', W: '#ffd0dc', C: '#fff3ea' }, -4.5 * px, -4.5 * px, px)
  ctx.restore()
}

// ─────────────────────────────── headphones (sized to a star)
export function drawHeadphones(ctx, cx, cy, size, { col = '#38c4ec', alpha = 1, lift = 0, rot = 0 } = {}) {
  if (alpha <= 0) return
  const p = Math.max(3, Math.round(size / 30))
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy - lift); ctx.rotate(rot)
  // the band: a stepped arc over the top tip
  const rx = size * 0.38, ry = size * 0.52, oy = -size * 0.02
  for (let a = Math.PI * 1.08; a <= Math.PI * 1.92; a += 0.05) {
    const bx = Math.cos(a) * rx, by = oy + Math.sin(a) * ry
    R(ctx, bx - p * 1.5, by - p * 1.5, p * 3, p * 3, OUT)
  }
  for (let a = Math.PI * 1.08; a <= Math.PI * 1.92; a += 0.05) {
    const bx = Math.cos(a) * rx, by = oy + Math.sin(a) * ry
    R(ctx, bx - p, by - p, p * 2, p * 2, '#3b3360')
  }
  // ear cups
  for (const s of [-1, 1]) {
    const ex = s * rx, ey = oy - size * 0.02
    R(ctx, ex - 3 * p, ey - 4 * p, 6 * p, 8 * p, OUT)
    R(ctx, ex - 2 * p, ey - 3 * p, 4 * p, 6 * p, col)
    R(ctx, ex - 2 * p, ey - 3 * p, p, 6 * p, 'rgba(255,255,255,0.55)')
  }
  // the boom mic
  R(ctx, -rx - p, oy + p, p, size * 0.2, OUT)
  R(ctx, -rx - p, oy + size * 0.2, size * 0.18, p, OUT)
  R(ctx, -rx + size * 0.16 - p, oy + size * 0.2 - p, 3 * p, 3 * p, '#2a2248')
  ctx.restore()
}

// ─────────────────────────────── the interpreter booth
/** a summit-style glass booth: frame, glass with a sheen, an INTERPRETER plate, an ON AIR bulb, a desk with an LED strip */
export function drawBooth(ctx, x, y, w, h, t, { on = 1, screen = '', blink = false, alarm = 0, back = true, front = true } = {}) {
  const fr = '#2a2050', frHi = '#4a3c80'
  const deskH = 76, deskY = y + h - deskH
  if (back) {
    // the back wall + glass
    R(ctx, x - 6, y - 6, w + 12, h + 12, OUT)
    R(ctx, x, y, w, h, fr)
    const g = ctx.createLinearGradient(0, y, 0, deskY)
    g.addColorStop(0, '#1f3a5c'); g.addColorStop(1, '#13203e')
    R(ctx, x + 16, y + 16, w - 32, deskY - y - 16, '#13203e'); ctx.fillStyle = g; ctx.fillRect(x + 16, y + 16, w - 32, deskY - y - 16)
    // a soft wall glow
    if (alarm > 0) { ctx.fillStyle = `rgba(255,60,90,${0.25 * alarm})`; ctx.fillRect(x + 16, y + 16, w - 32, deskY - y - 16) }
  }
  if (front) {
    // glass sheen
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = 'rgba(160,220,255,0.10)'; ctx.fillRect(x + 16, y + 16, w - 32, deskY - y - 16)
    ctx.fillStyle = 'rgba(200,240,255,0.16)'
    ctx.beginPath(); ctx.moveTo(x + 40, y + 16); ctx.lineTo(x + 90, y + 16); ctx.lineTo(x + 30, deskY); ctx.lineTo(x + 16, deskY); ctx.lineTo(x + 16, y + 60); ctx.closePath(); ctx.fill()
    ctx.beginPath(); ctx.moveTo(x + 110, y + 16); ctx.lineTo(x + 126, y + 16); ctx.lineTo(x + 66, deskY); ctx.lineTo(x + 50, deskY); ctx.closePath(); ctx.fill()
    ctx.restore()
    // mullions
    R(ctx, x + w / 2 - 4, y + 16, 8, deskY - y - 16, 'rgba(42,32,80,0.55)')
    // the desk front with its LED strip
    R(ctx, x - 6, deskY - 6, w + 12, deskH + 12, OUT)
    R(ctx, x, deskY, w, deskH, fr); R(ctx, x, deskY, w, 6, frHi)
    R(ctx, x + 24, deskY + 18, w - 48, deskH - 34, '#07140c')
    if (screen) {
      const show = !blink || Math.floor(t * 3) % 2 === 0
      if (show) {
        ctx.save(); ctx.fillStyle = alarm > 0.5 ? '#ff6a7e' : '#7dffb0'; ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 12
        ctx.font = `700 28px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        if ('letterSpacing' in ctx) ctx.letterSpacing = '3px'
        ctx.fillText(screen, x + w / 2, deskY + 18 + (deskH - 34) / 2 + 1)
        if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
        ctx.restore()
      }
    }
    // the INTERPRETER plate on top
    const pw = 300, ph = 46, pxx = x + w / 2 - pw / 2, pyy = y - 34
    R(ctx, pxx - 4, pyy - 4, pw + 8, ph + 8, OUT); R(ctx, pxx, pyy, pw, ph, BONE); R(ctx, pxx, pyy + ph - 5, pw, 5, '#cfc3ad')
    ctx.fillStyle = '#2a1846'; ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    if ('letterSpacing' in ctx) ctx.letterSpacing = '5px'
    ctx.fillText('INTERPRETER', pxx + pw / 2 + 2, pyy + ph / 2)
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
    // ON AIR bulb (top-right corner)
    const bx = x + w - 34, by = y - 12
    R(ctx, bx - 22, by - 22, 44, 44, OUT)
    R(ctx, bx - 18, by - 18, 36, 36, on > 0 ? '#ff3355' : '#4a2a3a')
    if (on > 0) {
      R(ctx, bx - 14, by - 14, 10, 8, '#ffc0c8')
      ctx.save(); ctx.globalCompositeOperation = 'lighter'
      const gg = ctx.createRadialGradient(bx, by, 0, bx, by, 110)
      gg.addColorStop(0, `rgba(255,60,90,${0.55 * on})`); gg.addColorStop(1, 'rgba(255,60,90,0)')
      ctx.fillStyle = gg; ctx.fillRect(bx - 110, by - 110, 220, 220); ctx.restore()
    }
    ctx.fillStyle = on > 0 ? '#ff8a9a' : 'rgba(239,230,214,0.4)'; ctx.font = `700 18px ${MONO}`; ctx.textAlign = 'center'
    ctx.fillText(on > 0 ? 'ON AIR' : 'OFF', bx, by + 40)
  }
}

/** a desk mic on a goose-neck (x, y = base centre) */
export function drawDeskMic(ctx, x, y, px) {
  R(ctx, x - 5 * px, y - px, 10 * px, 2 * px, OUT); R(ctx, x - 4 * px, y - px, 8 * px, px, '#4e4670')
  for (let k = 0; k < 9; k++) R(ctx, x - px * 0.5 + Math.round(Math.sin(k * 0.35) * 2) * px * 0.5, y - (2 + k) * px, px, px, '#8d84ab')
  R(ctx, x - 2 * px, y - 14 * px, 4 * px, 4 * px, OUT); R(ctx, x - 1.5 * px, y - 13.5 * px, 3 * px, 3 * px, '#2a2248')
  R(ctx, x - 1 * px, y - 13 * px, px, px, '#6b7390')
}

// ─────────────────────────────── the YOU'RE GREAT banner
const BAN_WORDS = [{ w: "YOU'RE", c: '#ff7aa8' }, { w: 'GREAT', c: '#ffb347' }]
export function drawGreatBanner(ctx, x0, x1, y, t, { k = 1, bite = 0, h = 112 } = {}) {
  if (k <= 0) return
  const w = (x1 - x0) * k, cx = x1 - w   // unrolls leftward from the right stick (Leo's side)
  // sticks
  R(ctx, x1 - 3, y - h / 2 - 14, 10, h + 140, OUT); R(ctx, x1, y - h / 2 - 12, 5, h + 136, '#a8693a')
  R(ctx, cx - 7, y - h / 2 - 14, 10, h + 140, OUT); R(ctx, cx - 4, y - h / 2 - 12, 5, h + 136, '#a8693a')
  ctx.save()
  ctx.beginPath()
  // cloth, with a ragged bite out of the bottom-left corner (Taurus)
  const bR = 40 * clamp(bite)
  ctx.moveTo(cx, y - h / 2); ctx.lineTo(x1, y - h / 2); ctx.lineTo(x1, y + h / 2)
  for (let i = 0; i <= 14; i++) { const xx = x1 - i * w / 14; if (bR > 0 && xx < cx + bR) break; ctx.lineTo(xx, y + h / 2 + (i % 2 ? 5 : -2)) }
  if (bR > 0) { for (let i = 0; i <= 8; i++) { const a = i / 8 * Math.PI * 0.5, r = bR * (i % 2 ? 0.78 : 1); ctx.lineTo(cx + Math.cos(a) * r, y + h / 2 - Math.sin(a) * r) } }
  ctx.closePath()
  ctx.shadowColor = 'rgba(6,3,18,0.6)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 8
  ctx.fillStyle = '#f6ead2'; ctx.fill(); ctx.shadowColor = 'transparent'
  ctx.clip()
  ctx.fillStyle = '#e2d2b2'; ctx.fillRect(cx, y - h / 2, w, 10)
  // painted letters (laid out on the full banner, revealed by the unroll)
  ctx.font = `800 70px ${INTER}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
  const full = x1 - x0
  let tot = 0
  for (const W0 of BAN_WORDS) for (const ch of W0.w) tot += ctx.measureText(ch).width * 0.96
  tot += 30 + 60
  let gx = x1 - full / 2 - tot / 2, n = 0
  for (const W0 of BAN_WORDS) {
    for (const ch of W0.w) {
      const cw = ctx.measureText(ch).width
      ctx.save(); ctx.translate(gx + cw / 2, y + 6 + Math.sin(n * 7.3) * 4); ctx.rotate(Math.sin(n * 12.9898) * 0.08)
      ctx.fillStyle = W0.c; ctx.fillText(ch, 0, 0); ctx.restore()
      gx += cw * 0.96; n++
    }
    gx += 30
  }
  drawPixelHeart(ctx, gx + 26, y + 4, 7, '#ff3d6e')
  ctx.restore()
}

// ─────────────────────────────── laundry, a bench, a spice rack
const SHIRTS = ['#7fe0ff', '#ff8fb1', '#c9a6ff', '#ffd98a', '#7dffb0', '#ffb347']
function shirt(ctx, x, y, px, col, fold = 1) {
  // fold 0 = a flat T-shirt (arms out) → 1 = a neat folded square
  const f = clamp(fold)
  const arm = Math.round((1 - f) * 4), body = 10, hh = Math.round(7 - f * 3)
  R(ctx, x - (body / 2 + arm + 1) * px, y - (hh + 1) * px, (body + 2 * arm + 2) * px, (hh + 2) * px, OUT)
  R(ctx, x - (body / 2) * px, y - hh * px, body * px, hh * px, col)
  if (arm > 0) { R(ctx, x - (body / 2 + arm) * px, y - hh * px, arm * px, 3 * px, col); R(ctx, x + (body / 2) * px, y - hh * px, arm * px, 3 * px, col) }
  R(ctx, x - (body / 2) * px, y - hh * px, body * px, px, 'rgba(255,255,255,0.45)')
  if (f > 0.6) R(ctx, x - (body / 2) * px, y - Math.round(hh / 2) * px, body * px, Math.max(1, px / 3), 'rgba(26,16,48,0.35)')
}
export function drawLaundry(ctx, x, y, px, n = 3, fold = 0, t = 0) {
  // the basket (left)
  const bx = x - 15 * px
  R(ctx, bx - 8 * px, y - 9 * px, 16 * px, 9 * px, OUT); R(ctx, bx - 7 * px, y - 8 * px, 14 * px, 7 * px, '#d39a5e')
  for (let i = 0; i < 7; i++) R(ctx, bx - 7 * px + i * 2 * px, y - 8 * px, px, 7 * px, '#a8693a')
  bitmap(ctx, ['.AA.BB.CC.', 'AAABBBCCC.'], { A: '#ff8fb1', B: '#7fe0ff', C: '#ffd98a' }, bx - 5 * px, y - 11 * px, px)
  // the folded stack (right)
  for (let k = 0; k < n; k++) shirt(ctx, x + 13 * px, y - k * 5 * px, px, SHIRTS[k % SHIRTS.length], 1)
  // the one being folded (centre, a little bounce)
  shirt(ctx, x, y - 2 * px - Math.abs(Math.sin(t * 6)) * px, px, SHIRTS[n % SHIRTS.length], fold)
}
export function drawBench(ctx, x, y, px) {
  R(ctx, x - 30 * px, y - px, 60 * px, 5 * px, OUT); R(ctx, x - 29 * px, y, 58 * px, 3 * px, '#d39a5e'); R(ctx, x - 29 * px, y, 58 * px, px, '#f0c088')
  for (const s of [-1, 1]) { R(ctx, x + s * 24 * px - px, y + 4 * px, 3 * px, 12 * px, OUT); R(ctx, x + s * 24 * px, y + 4 * px, px, 12 * px, '#8f5a32') }
  // a cushion on the empty side (the right)
  R(ctx, x + 6 * px, y - 5 * px, 20 * px, 5 * px, OUT); R(ctx, x + 7 * px, y - 4 * px, 18 * px, 4 * px, '#c9a6ff'); R(ctx, x + 7 * px, y - 4 * px, 18 * px, px, '#e9dbff')
}
const JARS = [['#e8455e', 'PAP'], ['#ffb347', 'TUR'], ['#7dffb0', 'BAS'], ['#c9a6ff', 'CAR'], ['#d39a5e', 'CUM'], ['#fff3ea', 'SAL']]
export function drawSpiceRack(ctx, x, y, px, t, { swap = 0 } = {}) {
  // two shelves of three jars; swap 0…1 slides CUM (index 4) over CAR (index 3) and back down: alphabetising
  for (const row of [0, 1]) {
    const sy = y + row * 22 * px + 18 * px
    R(ctx, x - px, sy - px, 34 * px, 4 * px, OUT); R(ctx, x, sy, 32 * px, 2 * px, '#a8693a')
    for (let i = 0; i < 3; i++) {
      const idx = row * 3 + i
      let jx = x + 2 * px + i * 10.5 * px, jy = sy - 14 * px
      const s = clamp(swap)
      if (idx === 3) jx += Math.sin(s * Math.PI) * 0 + s * 10.5 * px
      if (idx === 4) { jx -= s * 10.5 * px; jy -= Math.sin(s * Math.PI) * 8 * px }
      const [c, lab] = JARS[idx]
      R(ctx, jx - px, jy - px, 9 * px, 15 * px, OUT); R(ctx, jx, jy + 2 * px, 7 * px, 11 * px, c); R(ctx, jx, jy, 7 * px, 2 * px, '#4e4670')
      R(ctx, jx + px, jy + 5 * px, 5 * px, 4 * px, '#fbf3e2')
      ctx.fillStyle = '#2a1846'; ctx.font = `700 ${Math.round(2.6 * px)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(lab, jx + 3.5 * px, jy + 7 * px)
    }
  }
}

export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}
export function drawTear(ctx, x, y, px) { bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px) }
export function drawSweat(ctx, x, y, px) { bitmap(ctx, ['.S.', '.S.', 'SWS', 'SSS', '.S.'], { S: '#9fe8ff', W: '#ffffff' }, x - 1.5 * px, y - 2.5 * px, px) }

// ─────────────────────────────── cards
function rrect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r) }
/** the talk card, face up: the question in Garamond italic (q = lines) */
export function drawTalkCard(ctx, cx, cy, w, { rot = 0, sx = 1, glow = 0, q = ['How do you', 'like to be', 'loved?'] } = {}) {
  const h = w * 1.42, s = w / 400
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(sx, 1)
  if (glow > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 1.1); g.addColorStop(0, `rgba(242,199,92,${0.4 * glow})`); g.addColorStop(1, 'rgba(242,199,92,0)'); ctx.fillStyle = g; ctx.fillRect(-w * 1.1, -w * 1.1, w * 2.2, w * 2.2); ctx.restore() }
  ctx.save(); ctx.shadowColor = 'rgba(6,3,18,0.6)'; ctx.shadowBlur = 30 * s; ctx.shadowOffsetY = 10 * s
  rrect(ctx, -w / 2, -h / 2, w, h, 26 * s)
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#fbf3e2'); g.addColorStop(1, '#efe0c6')
  ctx.fillStyle = g; ctx.fill(); ctx.restore()
  ctx.lineWidth = 6 * s; ctx.strokeStyle = GOLD; rrect(ctx, -w / 2, -h / 2, w, h, 26 * s); ctx.stroke()
  ctx.lineWidth = 2 * s; ctx.strokeStyle = 'rgba(160,120,40,0.5)'; rrect(ctx, -w / 2 + 16 * s, -h / 2 + 16 * s, w - 32 * s, h - 32 * s, 16 * s); ctx.stroke()
  ctx.fillStyle = '#8a5a1a'; ctx.font = `700 ${Math.round(22 * s)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${Math.round(6 * s)}px`
  ctx.fillText('TALK CARD', 3 * s, -h / 2 + 58 * s)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
  ctx.fillStyle = '#2a1846'; ctx.font = `italic 500 ${Math.round(66 * s)}px ${SERIF}`
  q.forEach((L, i) => ctx.fillText(L, 0, -h / 2 + (190 + i * 74) * s))
  drawPixelHeart(ctx, 0, h / 2 - 70 * s, 7 * s, '#e8455e')
  ctx.restore()
}
/** an answer card: back (seed-of-life on violet) or face (who + the answer) */
export function drawAnswer(ctx, cx, cy, w, { rot = 0, sx = 1, back = false, who = '', lines = [], col = GOLD, stamp = 0 } = {}) {
  const h = w * 1.42, s = w / 300
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(Math.max(0.001, sx), 1)
  ctx.save(); ctx.shadowColor = 'rgba(6,3,18,0.6)'; ctx.shadowBlur = 24 * s; ctx.shadowOffsetY = 8 * s
  rrect(ctx, -w / 2, -h / 2, w, h, 20 * s)
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2)
  if (back) { g.addColorStop(0, '#6a3fd0'); g.addColorStop(1, '#3a1d86') } else { g.addColorStop(0, '#2e1c62'); g.addColorStop(1, '#130a2e') }
  ctx.fillStyle = g; ctx.fill(); ctx.restore()
  ctx.lineWidth = 5 * s; ctx.strokeStyle = back ? 'rgba(255,240,200,0.9)' : GOLD; rrect(ctx, -w / 2, -h / 2, w, h, 20 * s); ctx.stroke()
  if (back) {
    ctx.strokeStyle = 'rgba(239,230,214,0.7)'; ctx.lineWidth = 2 * s
    const rr = w * 0.13
    ctx.beginPath(); ctx.arc(0, 0, rr, 0, Math.PI * 2); ctx.stroke()
    for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; ctx.beginPath(); ctx.arc(Math.cos(a) * rr, Math.sin(a) * rr, rr, 0, Math.PI * 2); ctx.stroke() }
    ctx.beginPath(); ctx.arc(0, 0, rr * 2, 0, Math.PI * 2); ctx.stroke()
  } else {
    ctx.lineWidth = 2 * s; ctx.strokeStyle = 'rgba(242,199,92,0.5)'; rrect(ctx, -w / 2 + 12 * s, -h / 2 + 12 * s, w - 24 * s, h - 24 * s, 12 * s); ctx.stroke()
    ctx.fillStyle = col; ctx.font = `700 ${Math.round(24 * s)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(who, 0, -h / 2 + 50 * s)
    ctx.fillStyle = BONE; ctx.font = `italic 500 ${Math.round(54 * s)}px ${SERIF}`
    lines.forEach((L, i) => ctx.fillText(L, 0, -h / 2 + (150 + i * 62) * s - (lines.length - 3) * 31 * s))
    if (stamp > 0) {
      const k = clamp(stamp)
      ctx.save(); ctx.translate(0, h / 2 - 66 * s); ctx.scale(k, k)
      ctx.fillStyle = '#ff4f7e'; ctx.beginPath(); ctx.arc(0, 0, 34 * s, 0, Math.PI * 2); ctx.fill()
      drawPixelHeart(ctx, 0, 2 * s, 5 * s, '#fff1e6')
      ctx.restore()
    }
  }
  ctx.restore()
}
