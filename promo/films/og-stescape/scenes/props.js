// stescape props: small pixel drawings on canvas (Star Talk "Wild Lessons" #15 "First Date Escape Room."). Every function is a
// pure function of its arguments; nothing touches `document` at module top level.
//   starFrame / inSprite / hopState   the transform drawStarChar uses (same maths as startalk.js), so props drawn in sprite
//                                     CELLS (the 36-cell grid) stay seated through hops and squash
//   tearsCells · sweatCell · headsetCells · blushCells   props in sprite cells
//   drawRoom                          the floating escape room (wallpaper, wainscot, planks, lamps, the "difficulty" sign)
//   drawTimer                         the LED countdown over the door
//   drawWindow                        the OBSERVATION window (contents via a callback, glass on top)
//   drawDoor                          the exit door: no keyhole, a brass plaque, swings open onto starlight
//   drawChest · drawPadlock · drawSafe · drawPanel   lock 1, lock 2 and the ANSWER panel (typed answer, ✕ / ✓)
//   drawBook · drawTissues · drawStamp · drawTile · drawHeart · dustPuff · confetti · makeTalkCard
import { clamp, lerp, ease, rng } from '../../../src/lib.js'

const TAU = Math.PI * 2
export const INK = '#1b1236'
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
export const LCD = '#9dffb8'
export const BUZZ = '#ff4a5e'
export const WARM = '#ffd98a'
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ─────────────────────────────────────────────── the star transform (mirrors startalk.js drawStarChar)
const G = 36, HALF = 18, SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
export function hopState(t, hops) {
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
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** happy tears from both eyes, k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a nervous sweat drop on the upper-left of the head (k 0…1 slides down) */
export function sweatCell(ctx, k) {
  if (k <= 0) return
  const y = 9 + 4 * clamp(k)
  ctx.fillStyle = INK; ctx.fillRect(6.6, y - 0.4, 2.8, 3.6)
  ctx.fillStyle = '#9fe9ff'; ctx.fillRect(7, y, 2, 2.8); ctx.fillRect(7.5, y - 0.6, 1, 0.8)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(7.2, y + 0.4, 0.6, 0.8)
}
/** the game master's headset: an ear cup on the left + a boom mic to the mouth */
export function headsetCells(ctx) {
  ctx.fillStyle = INK; ctx.fillRect(5.4, 14.4, 4.2, 6.2); ctx.fillRect(8.6, 20, 7.2, 1.6); ctx.fillRect(14.6, 21.6, 3, 2.4)
  ctx.fillStyle = '#3a3358'; ctx.fillRect(6, 15, 3, 5)
  ctx.fillStyle = '#6a6290'; ctx.fillRect(6.4, 15.4, 1.2, 2)
  ctx.fillStyle = '#4a4468'; ctx.fillRect(9, 20.4, 6.4, 0.8)
  ctx.fillStyle = '#ff5c78'; ctx.fillRect(15, 22, 2.2, 1.6)
}
/** big embarrassed blush bars + three heat lines */
export function blushCells(ctx, k = 1) {
  if (k <= 0) return
  ctx.save(); ctx.globalAlpha = clamp(k)
  ctx.fillStyle = '#ff5c8e'
  ctx.fillRect(6.5, 23.5, 5, 1.6); ctx.fillRect(24.5, 23.5, 5, 1.6)
  ctx.fillStyle = '#ff9db8'; ctx.fillRect(7, 23.8, 1, 1); ctx.fillRect(25, 23.8, 1, 1)
  ctx.restore()
}

// ─────────────────────────────────────────────── pixel helpers
const snap = v => Math.round(v / 2) * 2
/** an ink-outlined block */
export function block(ctx, x, y, w, h, fill, lw = 6, line = INK) {
  x = snap(x); y = snap(y); w = snap(w); h = snap(h)
  ctx.fillStyle = line; ctx.fillRect(x - lw, y - lw, w + 2 * lw, h + 2 * lw)
  ctx.fillStyle = fill; ctx.fillRect(x, y, w, h)
}
function label(ctx, text, x, y, { size = 22, color = BONE, align = 'center', font = MONO, weight = 700, spacing = 0 } = {}) {
  ctx.font = `${weight} ${size}px ${font}`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = color
  if (spacing) ctx.letterSpacing = spacing + 'px'
  ctx.fillText(text, x, y)
  if (spacing) ctx.letterSpacing = '0px'
}

// ─────────────────────────────────────────────── the room
export const ROOM = { x: 40, y: 420, w: 1000, h: 980, floorY: 1196 }
/** the escape room floating in the night sky. dim 0…1 darkens it (the quiet beat); light 0…1 = door light on the floor */
export function drawRoom(ctx, t, { dim = 0, alarm = 0 } = {}) {
  const { x, y, w, h, floorY } = ROOM
  // a soft glow around the box so it reads as lit, floating in the sky
  ctx.save()
  const g0 = ctx.createRadialGradient(540, 900, 200, 540, 900, 820); g0.addColorStop(0, 'rgba(255,190,120,0.16)'); g0.addColorStop(1, 'rgba(255,190,120,0)')
  ctx.fillStyle = g0; ctx.fillRect(0, 200, 1080, 1500)
  ctx.restore()
  block(ctx, x, y, w, h, '#2a1840', 10)
  // wallpaper: plum with diamond pattern
  ctx.fillStyle = '#3b2156'; ctx.fillRect(x, y, w, floorY - y)
  ctx.fillStyle = '#45285f'
  for (let j = 0; j < 14; j++) for (let i = 0; i < 18; i++) {
    const cx = x + 28 + i * 56 + (j % 2) * 28, cy = y + 30 + j * 56
    if (cy > floorY - 150) continue
    ctx.fillRect(cx - 4, cy - 10, 8, 20); ctx.fillRect(cx - 10, cy - 4, 20, 8)
  }
  // wainscot
  ctx.fillStyle = '#5a3424'; ctx.fillRect(x, floorY - 150, w, 150)
  ctx.fillStyle = '#6e4430'; for (let i = 0; i < 10; i++) ctx.fillRect(x + 18 + i * 100, floorY - 132, 72, 112)
  ctx.fillStyle = INK; ctx.fillRect(x, floorY - 156, w, 8)
  ctx.fillStyle = '#c8935a'; ctx.fillRect(x, floorY - 150, w, 4)
  // floor planks
  ctx.fillStyle = INK; ctx.fillRect(x, floorY - 4, w, 8)
  const rows = [['#7a4a2c', 40], ['#875434', 52], ['#93603c', 64], ['#9c6842', y + h - floorY - 160]]
  let fy = floorY + 4
  rows.forEach(([c, hh], r) => {
    ctx.fillStyle = c; ctx.fillRect(x, fy, w, hh)
    ctx.fillStyle = 'rgba(27,18,54,0.35)'
    for (let i = 0; i < 8; i++) ctx.fillRect(x + ((i * 137 + r * 61) % w), fy, 4, hh)
    ctx.fillRect(x, fy + hh - 3, w, 3)
    fy += hh
  })
  // two wall sconces
  for (const sx of [x + 60, x + w - 60]) {
    ctx.fillStyle = INK; ctx.fillRect(sx - 14, y + 520, 28, 36)
    ctx.fillStyle = '#c8935a'; ctx.fillRect(sx - 10, y + 524, 20, 28)
    ctx.fillStyle = WARM; ctx.fillRect(sx - 8, y + 500, 16, 22)
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(sx, y + 510, 0, sx, y + 510, 150); g.addColorStop(0, 'rgba(255,200,120,0.32)'); g.addColorStop(1, 'rgba(255,200,120,0)')
    ctx.fillStyle = g; ctx.fillRect(sx - 150, y + 360, 300, 300); ctx.restore()
  }
  // the room's dark vignette
  ctx.save()
  const v = ctx.createRadialGradient(540, 900, 260, 540, 900, 760); v.addColorStop(0, 'rgba(10,6,24,0)'); v.addColorStop(1, `rgba(10,6,24,${0.45 + 0.35 * dim})`)
  ctx.fillStyle = v; ctx.fillRect(x, y, w, h)
  if (dim > 0) { ctx.fillStyle = `rgba(10,6,28,${0.32 * dim})`; ctx.fillRect(x, y, w, h) }
  if (alarm > 0) { ctx.fillStyle = `rgba(255,50,80,${0.12 * alarm})`; ctx.fillRect(x, y, w, h) }
  ctx.restore()
}
/** the framed sign on the right wall: FIRST DATE ROOM · DIFFICULTY ♥♥♥♥♥ */
export function drawSign(ctx, cx, cy, t) {
  block(ctx, cx - 130, cy - 82, 260, 164, '#1f1430', 6)
  ctx.fillStyle = '#c8935a'; ctx.fillRect(snap(cx - 124), snap(cy - 76), 248, 4); ctx.fillRect(snap(cx - 124), snap(cy + 72), 248, 4)
  label(ctx, 'ROOM:', cx, cy - 50, { size: 20, color: 'rgba(239,230,214,0.7)', spacing: 3 })
  label(ctx, 'FIRST DATE', cx, cy - 16, { size: 34, color: GOLD })
  label(ctx, 'DIFFICULTY', cx, cy + 20, { size: 18, color: 'rgba(239,230,214,0.7)', spacing: 3 })
  for (let i = 0; i < 5; i++) drawHeart(ctx, cx - 92 + i * 46, cy + 50, 3.4, i === 4 && Math.floor(t * 3) % 2 ? '#ff9db8' : '#ff4f7e')
}

// ─────────────────────────────────────────────── the LED timer
export function drawTimer(ctx, cx, cy, secs, t, { on = 1, frozen = false, red = false } = {}) {
  block(ctx, cx - 170, cy - 58, 340, 116, '#0a0612', 8)
  label(ctx, frozen ? 'ESCAPED AT' : 'TIME LEFT', cx, cy - 36, { size: 18, color: 'rgba(239,230,214,0.6)', spacing: 4 })
  if (on <= 0) return
  const s = Math.max(0, Math.round(secs))
  const txt = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0')
  const col = frozen ? LCD : red ? BUZZ : '#ff8a5c'
  ctx.save(); ctx.globalAlpha = on
  ctx.font = `700 64px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = rgba(col, 0.14); ctx.fillText('88:88', cx, cy + 14)
  ctx.shadowColor = col; ctx.shadowBlur = 18; ctx.fillStyle = col
  if (!(frozen && Math.floor(t * 3) % 2 === 1)) ctx.fillText(txt, cx, cy + 14)
  ctx.restore()
}

// ─────────────────────────────────────────────── the observation window
export const WIN = { x: 76, y: 560, w: 300, h: 230 }
export function drawWindow(ctx, t, inner, { press = 0 } = {}) {
  const { x, y, w, h } = WIN
  label(ctx, 'OBSERVATION', x + w / 2, y - 26, { size: 18, color: 'rgba(239,230,214,0.75)', spacing: 4 })
  block(ctx, x, y, w, h, '#120c26', 10, '#1a1030')
  ctx.fillStyle = '#c8935a'; ctx.fillRect(x - 4, y - 4, w + 8, 4); ctx.fillRect(x - 4, y + h, w + 8, 4)
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  // a dim control room: a desk with a glowing monitor
  ctx.fillStyle = '#1c1538'; ctx.fillRect(x, y, w, h)
  ctx.fillStyle = '#2a2050'; ctx.fillRect(x, y + h - 46, w, 46)
  if (inner) inner(x + w / 2, y + h / 2)
  ctx.restore()
  // the glass: a blue tint + reflection streaks (+ fog where Pisces is pressed against it)
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip()
  ctx.fillStyle = 'rgba(140,200,255,0.10)'; ctx.fillRect(x, y, w, h)
  ctx.fillStyle = 'rgba(255,255,255,0.13)'
  ctx.beginPath(); ctx.moveTo(x + 30, y + h); ctx.lineTo(x + 90, y); ctx.lineTo(x + 120, y); ctx.lineTo(x + 60, y + h); ctx.fill()
  ctx.beginPath(); ctx.moveTo(x + 140, y + h); ctx.lineTo(x + 200, y); ctx.lineTo(x + 214, y); ctx.lineTo(x + 154, y + h); ctx.fill()
  if (press > 0) {
    const g = ctx.createRadialGradient(x + w * 0.68, y + h * 0.5, 0, x + w * 0.68, y + h * 0.5, 110)
    g.addColorStop(0, `rgba(230,240,255,${0.35 * press})`); g.addColorStop(1, 'rgba(230,240,255,0)')
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h)
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the exit door
export const DOOR = { cx: 540, top: 700, w: 270, h: 496 }
/** open 0…1: the slab swings toward the hinge (left) and the doorway fills with starlight. glow 0…1 lights the plaque */
export function drawDoor(ctx, t, { open = 0, glow = 0, sign = 'LOCKED', signK = 1 } = {}) {
  const { cx, top, w, h } = DOOR
  const x = cx - w / 2, bot = top + h
  // frame
  block(ctx, x - 26, top - 26, w + 52, h + 26, '#3a2418', 6)
  ctx.fillStyle = '#5a3424'; ctx.fillRect(snap(x - 18), snap(top - 18), w + 36, 10)
  // the doorway: starlight
  ctx.fillStyle = '#0c0820'; ctx.fillRect(x, top, w, h)
  if (open > 0) {
    ctx.save(); ctx.beginPath(); ctx.rect(x, top, w, h); ctx.clip()
    const g = ctx.createLinearGradient(0, top, 0, bot); g.addColorStop(0, '#2a2470'); g.addColorStop(0.6, '#7a5ab0'); g.addColorStop(1, '#ffd2a0')
    ctx.globalAlpha = clamp(open * 1.6); ctx.fillStyle = g; ctx.fillRect(x, top, w, h)
    const r = rng(17)
    for (let i = 0; i < 26; i++) { const sx = x + r() * w, sy = top + r() * h * 0.8, tw = 0.5 + 0.5 * Math.sin(t * 4 + i); ctx.fillStyle = `rgba(255,250,230,${0.4 + 0.6 * tw})`; const s = r() < 0.3 ? 6 : 4; ctx.fillRect(snap(sx), snap(sy), s, s) }
    ctx.restore()
  }
  // the slab (hinge on the left; it narrows as it swings in)
  const sw = w * (1 - 0.86 * ease.inOutCubic(clamp(open)))
  if (sw > 2) {
    block(ctx, x, top, sw, h, '#7a4a2c', 4)
    ctx.fillStyle = '#6a3e24'
    const pw = sw / 3
    for (let i = 0; i < 3; i++) ctx.fillRect(snap(x + i * pw + 4), top + 6, Math.max(2, snap(pw - 8)), h - 12)
    ctx.fillStyle = '#93603c'; ctx.fillRect(x, top + 90, sw, 14); ctx.fillRect(x, bot - 110, sw, 14)
    if (open < 0.25) {
      // the plaque: no keyhole, just a sentence
      const k = 1 - open * 4
      ctx.save(); ctx.globalAlpha = k
      const px = x + sw / 2
      if (glow > 0) {
        ctx.save(); ctx.globalCompositeOperation = 'lighter'
        const gg = ctx.createRadialGradient(px, top + 250, 0, px, top + 250, 180); gg.addColorStop(0, `rgba(255,210,120,${0.5 * glow})`); gg.addColorStop(1, 'rgba(255,210,120,0)')
        ctx.fillStyle = gg; ctx.fillRect(px - 180, top + 70, 360, 360); ctx.restore()
      }
      block(ctx, px - 100, top + 196, 200, 108, glow > 0.5 ? '#ffd77a' : '#d8a84c', 5)
      label(ctx, 'OPENS', px, top + 222, { size: 24, color: INK })
      label(ctx, 'WHEN YOU', px, top + 250, { size: 24, color: INK })
      label(ctx, 'DO.', px, top + 278, { size: 24, color: INK })
      // where a keyhole should be: nothing (a dashed outline)
      ctx.strokeStyle = 'rgba(27,18,54,0.55)'; ctx.lineWidth = 3; ctx.setLineDash([5, 5])
      ctx.beginPath(); ctx.arc(px, top + 350, 12, 0, TAU); ctx.stroke(); ctx.strokeRect(px - 6, top + 360, 12, 22); ctx.setLineDash([])
      ctx.restore()
    }
  }
  // light spilling onto the floor
  if (open > 0) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const k = clamp(open * 1.4)
    const g = ctx.createLinearGradient(0, bot, 0, bot + 220); g.addColorStop(0, `rgba(255,214,150,${0.55 * k})`); g.addColorStop(1, 'rgba(255,214,150,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, bot); ctx.lineTo(x + w, bot); ctx.lineTo(x + w + 260, bot + 220); ctx.lineTo(x - 260, bot + 220); ctx.closePath(); ctx.fill()
    const g2 = ctx.createRadialGradient(cx, top + h / 2, 0, cx, top + h / 2, 520); g2.addColorStop(0, `rgba(255,220,160,${0.3 * k})`); g2.addColorStop(1, 'rgba(255,220,160,0)')
    ctx.fillStyle = g2; ctx.fillRect(cx - 520, top - 300, 1040, 1100)
    ctx.restore()
  }
  // the sign over the door
  if (signK > 0) {
    ctx.save(); ctx.globalAlpha = signK
    const on = sign === 'LOCKED'
    block(ctx, cx - 100, top - 92, 200, 46, '#0a0612', 5)
    ctx.font = `700 28px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.shadowColor = on ? BUZZ : LCD; ctx.shadowBlur = 14; ctx.fillStyle = on ? BUZZ : LCD
    ctx.fillText(sign, cx, top - 68)
    ctx.restore()
  }
}

// ─────────────────────────────────────────────── locks
/** a pixel padlock centred on (cx, cy); s = body width. open 0…1 pops the shackle up and swings it */
export function drawPadlock(ctx, cx, cy, s, { open = 0, color = GOLD, rot = 0, alpha = 1, shake = 0 } = {}) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(cx + shake, cy); ctx.rotate(rot)
  const bw = s, bh = s * 0.8, th = Math.max(4, s * 0.16)
  // shackle (behind the body)
  const lift = s * 0.32 * ease.outBack(clamp(open))
  ctx.save(); ctx.translate(bw * 0.3, -bh / 2 - lift * 0.4); ctx.rotate(-0.5 * ease.outCubic(clamp(open))); ctx.translate(-bw * 0.3, 0)
  const sx = -bw * 0.32, sw = bw * 0.64, sh = s * 0.6
  ctx.fillStyle = INK; ctx.fillRect(sx - 4, -sh - 4 - lift * 0.6, sw + 8, th + 8); ctx.fillRect(sx - 4, -sh - lift * 0.6, th + 8, sh + lift * 0.6 + 4); ctx.fillRect(sx + sw - th - 4, -sh - lift * 0.6, th + 8, sh + 4)
  ctx.fillStyle = '#c9ccd8'; ctx.fillRect(sx, -sh - lift * 0.6, sw, th); ctx.fillRect(sx, -sh - lift * 0.6, th, sh + lift * 0.6); ctx.fillRect(sx + sw - th, -sh - lift * 0.6, th, sh)
  ctx.fillStyle = '#f4f4fa'; ctx.fillRect(sx + th * 0.25, -sh - lift * 0.6 + th * 0.25, th * 0.3, sh * 0.6)
  ctx.restore()
  // body
  ctx.fillStyle = INK; ctx.fillRect(-bw / 2 - 5, -bh / 2 - 5, bw + 10, bh + 10)
  ctx.fillStyle = color; ctx.fillRect(-bw / 2, -bh / 2, bw, bh)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(-bw / 2 + 4, -bh / 2 + 4, bw - 8, bh * 0.14)
  ctx.fillStyle = 'rgba(120,60,20,0.35)'; ctx.fillRect(-bw / 2, bh / 2 - bh * 0.16, bw, bh * 0.16)
  // keyhole
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -bh * 0.06, s * 0.09, 0, TAU); ctx.fill(); ctx.fillRect(-s * 0.04, -bh * 0.06, s * 0.08, bh * 0.28)
  ctx.restore()
}
/** lock 1: a wooden chest with a padlock. open 0…1 = padlock open; lid 0…1 = the lid flips up, gold glow inside */
export function drawChest(ctx, cx, by, w, h, t, { lock = 0, lid = 0, shake = 0, alpha = 1, lockSize = 96 } = {}) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(shake, 0)
  const x = cx - w / 2, top = by - h, lh = h * 0.36
  // glow from inside
  if (lid > 0.2) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const k = clamp((lid - 0.2) / 0.5)
    const g = ctx.createRadialGradient(cx, top, 0, cx, top, 360); g.addColorStop(0, `rgba(255,220,120,${0.7 * k})`); g.addColorStop(1, 'rgba(255,220,120,0)')
    ctx.fillStyle = g; ctx.fillRect(cx - 360, top - 360, 720, 600)
    // rays
    ctx.fillStyle = `rgba(255,230,160,${0.22 * k})`
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.32 + Math.sin(t * 1.5) * 0.04; ctx.beginPath(); ctx.moveTo(cx, top); ctx.lineTo(cx + Math.cos(a - 0.06) * 420, top + Math.sin(a - 0.06) * 420); ctx.lineTo(cx + Math.cos(a + 0.06) * 420, top + Math.sin(a + 0.06) * 420); ctx.fill() }
    ctx.restore()
  }
  // lid flipped back (behind)
  if (lid > 0.5) { const k = (lid - 0.5) * 2; block(ctx, x + 6, top - lh * 0.9 * k, w - 12, lh * 0.9 * k, '#6a3e24', 6) }
  // body
  block(ctx, x, top + lh, w, h - lh, '#93603c', 6)
  ctx.fillStyle = '#7a4a2c'; ctx.fillRect(snap(x), snap(top + lh + (h - lh) * 0.45), w, 8)
  ctx.fillStyle = '#c8935a'; ctx.fillRect(snap(x + 20), snap(top + lh), 18, h - lh); ctx.fillRect(snap(x + w - 38), snap(top + lh), 18, h - lh)
  if (lid > 0.4) { ctx.fillStyle = '#ffe9a0'; ctx.fillRect(snap(x + 8), snap(top + lh), w - 16, 10) }
  // lid (closing toward us as it opens: squash it)
  if (lid < 0.5) {
    const k = 1 - lid * 2
    block(ctx, x - 8, top + lh * (1 - k), w + 16, lh * k, '#a06c44', 6)
    ctx.fillStyle = '#c8935a'; ctx.fillRect(snap(x + 12), snap(top + lh * (1 - k)), 18, lh * k); ctx.fillRect(snap(x + w - 30), snap(top + lh * (1 - k)), 18, lh * k)
  }
  ctx.restore()
  // the padlock on the front (falls away once open)
  const fall = clamp((lock - 0.55) / 0.45)
  drawPadlock(ctx, cx + shake + fall * 60, top + lh + 26 + ease.inQuad(fall) * 140, lockSize, { open: clamp(lock / 0.5), rot: fall * 1.2, alpha: 1 - fall })
}
/** lock 2: a little steel safe with a dial. open 0…1 swings the door to the left */
export function drawSafe(ctx, cx, by, w, h, t, { open = 0, shake = 0, alpha = 1, dial = 0 } = {}) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(shake, 0)
  const x = cx - w / 2, top = by - h
  block(ctx, x, top, w, h, '#6a7290', 6)
  ctx.fillStyle = '#4a5070'; ctx.fillRect(snap(x), snap(by - 14), w, 14)
  // interior
  ctx.fillStyle = '#120c26'; ctx.fillRect(snap(x + 18), snap(top + 18), w - 36, h - 50)
  if (open > 0.1) {
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const k = clamp((open - 0.1) / 0.5)
    const g = ctx.createRadialGradient(cx, top + h / 2, 0, cx, top + h / 2, 300); g.addColorStop(0, `rgba(160,255,190,${0.55 * k})`); g.addColorStop(1, 'rgba(160,255,190,0)')
    ctx.fillStyle = g; ctx.fillRect(cx - 300, top - 200, 600, 600)
    ctx.restore()
  }
  // the door
  const dw = (w - 36) * (1 - 0.85 * ease.inOutCubic(clamp(open)))
  block(ctx, x + 18, top + 18, dw, h - 50, '#8a93b8', 4)
  if (open < 0.4) {
    const dx = x + 18 + dw / 2, dy = top + 18 + (h - 50) / 2
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(dx, dy, 44, 0, TAU); ctx.fill()
    ctx.fillStyle = '#d6dcef'; ctx.beginPath(); ctx.arc(dx, dy, 38, 0, TAU); ctx.fill()
    ctx.save(); ctx.translate(dx, dy); ctx.rotate(dial)
    ctx.fillStyle = INK; for (let i = 0; i < 12; i++) { ctx.save(); ctx.rotate(i * TAU / 12); ctx.fillRect(-2, -36, 4, i % 3 ? 7 : 12); ctx.restore() }
    ctx.fillStyle = '#4a5070'; ctx.beginPath(); ctx.arc(0, 0, 16, 0, TAU); ctx.fill(); ctx.fillStyle = BUZZ; ctx.fillRect(-3, -16, 6, 10)
    ctx.restore()
    ctx.fillStyle = INK; ctx.fillRect(snap(x + 18 + dw - 30), snap(dy - 40), 16, 80); ctx.fillStyle = '#c9ccd8'; ctx.fillRect(snap(x + 18 + dw - 26), snap(dy - 36), 8, 72)
  }
  ctx.restore()
}
/** the ANSWER panel: an LCD on a stand. text = what's typed, mark = 'x' | 'ok' | null, flash 0…1 */
export function drawPanel(ctx, cx, cy, w, h, t, { text = '', mark = null, flash = 0, caret = false, sub = 'ANSWER:', sc = 1, small = false } = {}) {
  if (sc <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc)
  const col = mark === 'x' ? BUZZ : LCD
  block(ctx, -w / 2, -h / 2, w, h, '#20263e', 8)
  const sx = -w / 2 + 16, sy = -h / 2 + 16, sw = w - 32, sh = h - 32
  ctx.fillStyle = mark === 'x' && flash > 0 ? `rgb(${60 + 80 * flash},16,30)` : mark === 'ok' && flash > 0 ? `rgb(16,${50 + 70 * flash},34)` : '#0a1a14'
  ctx.fillRect(snap(sx), snap(sy), sw, sh)
  ctx.fillStyle = 'rgba(157,255,184,0.06)'; for (let j = 0; j < sh; j += 6) ctx.fillRect(snap(sx), snap(sy + j), sw, 2)
  label(ctx, sub, sx + 16, sy + 22, { size: 20, color: rgba(LCD, 0.6), align: 'left', spacing: 3 })
  ctx.font = `700 ${small ? 34 : 42}px ${MONO}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  ctx.shadowColor = col; ctx.shadowBlur = 12; ctx.fillStyle = mark === 'x' ? '#ffd0d6' : LCD
  const shown = text + (caret && Math.floor(t * 3) % 2 === 0 ? '_' : '')
  ctx.fillText(shown, sx + 16, sy + sh / 2 + 14)
  ctx.shadowBlur = 0
  if (mark) {
    const mx = sx + sw - 44, my = sy + sh / 2 + 8
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(mx, my, 30, 0, TAU); ctx.fill()
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(mx, my, 25, 0, TAU); ctx.fill()
    ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineCap = 'square'; ctx.beginPath()
    if (mark === 'x') { ctx.moveTo(mx - 10, my - 10); ctx.lineTo(mx + 10, my + 10); ctx.moveTo(mx + 10, my - 10); ctx.lineTo(mx - 10, my + 10) }
    else { ctx.moveTo(mx - 12, my); ctx.lineTo(mx - 3, my + 9); ctx.lineTo(mx + 12, my - 9) }
    ctx.stroke(); ctx.lineCap = 'butt'
  }
  // stand
  ctx.fillStyle = INK; ctx.fillRect(-12, h / 2 + 8, 24, 30)
  ctx.restore()
}

// ─────────────────────────────────────────────── small props
/** a pixel open book (Gemini's "open book") */
export function drawBook(ctx, cx, cy, s, t, { k = 1, rot = 0 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k)
  const w = s, h = s * 0.62
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 14)
  ctx.fillStyle = '#c94a6a'; ctx.fillRect(-w / 2 - 2, -h / 2 + 2, w + 4, h + 4)
  ctx.fillStyle = '#fbf6ec'; ctx.fillRect(-w / 2, -h / 2, w / 2 - 3, h); ctx.fillRect(3, -h / 2, w / 2 - 3, h)
  ctx.fillStyle = 'rgba(27,18,54,0.4)'
  for (let i = 0; i < 4; i++) { ctx.fillRect(-w / 2 + 8, -h / 2 + 10 + i * h * 0.2, w / 2 - 20, 4); ctx.fillRect(12, -h / 2 + 10 + i * h * 0.2, w / 2 - 20 - (i === 3 ? 18 : 0), 4) }
  ctx.fillStyle = INK; ctx.fillRect(-3, -h / 2, 6, h)
  ctx.restore()
}
/** a tissue box with a tissue sticking out */
export function drawTissues(ctx, cx, cy, s, t, { k = 1, rot = 0 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(k, k)
  block(ctx, -s / 2, -s * 0.25, s, s * 0.5, '#7fc8ff', 4)
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-s * 0.3, -s * 0.18, s * 0.6, s * 0.1)
  const wv = Math.sin(t * 6) * 3
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-s * 0.2, -s * 0.2); ctx.lineTo(-s * 0.1 + wv, -s * 0.62); ctx.lineTo(s * 0.18 + wv, -s * 0.56); ctx.lineTo(s * 0.2, -s * 0.2); ctx.fill()
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(-s * 0.15, -s * 0.22); ctx.lineTo(-s * 0.08 + wv, -s * 0.56); ctx.lineTo(s * 0.14 + wv, -s * 0.5); ctx.lineTo(s * 0.15, -s * 0.22); ctx.fill()
  ctx.restore()
}
/** a rubber stamp impression: rotated outline box + text */
export function drawStamp(ctx, cx, cy, k, lines, { color = LCD, rot = -0.14, size = 64, w = 640 } = {}) {
  if (k <= 0) return
  const s = k * (1 + 0.5 * (1 - k))
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(s, s)
  const h = size * 1.15 * lines.length + 40
  ctx.fillStyle = 'rgba(10,6,24,0.75)'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.strokeStyle = color; ctx.lineWidth = 10; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 3; ctx.strokeRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28)
  lines.forEach((ln, i) => label(ctx, ln, 0, -h / 2 + 20 + size * 0.6 + i * size * 1.15, { size: i ? size * 0.5 : size, color, font: i ? MONO : INTER, weight: i ? 700 : 900 }))
  ctx.restore()
}
/** an answer tile held under the talk card: face-down "?" → flips (sx through 0) to the answer */
export function drawTile(ctx, cx, cy, w, h, flip, { who = '', text = '', color = GOLD } = {}) {
  const sx = Math.abs(Math.cos(Math.PI * clamp(flip)))
  const front = flip >= 0.5
  ctx.save(); ctx.translate(cx, cy); ctx.scale(Math.max(0.02, sx), 1)
  block(ctx, -w / 2, -h / 2, w, h, front ? '#fbf6ec' : '#2a1d52', 5, front ? INK : GOLD)
  if (front) {
    label(ctx, who, 0, -h / 2 + 22, { size: 18, color: 'rgba(27,18,54,0.6)', spacing: 2 })
    label(ctx, text, 0, 12, { size: 30, color: INK, font: INTER, weight: 800 })
  } else {
    label(ctx, '?', 0, 4, { size: 64, color: GOLD, font: INTER, weight: 800 })
    label(ctx, who, 0, -h / 2 + 22, { size: 18, color: rgba(GOLD, 0.7), spacing: 2 })
  }
  ctx.restore()
}
export function drawHeart(ctx, x, y, px, col = '#ff4f7e') {
  const rows = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
  ctx.fillStyle = INK
  rows.forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') ctx.fillRect(x + (i - 3.5) * px - px * 0.3, y + (j - 3) * px - px * 0.3, px * 1.6, px * 1.6) }))
  ctx.fillStyle = col
  rows.forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') ctx.fillRect(x + (i - 3.5) * px, y + (j - 3) * px, px + 0.5, px + 0.5) }))
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillRect(x - 2.5 * px, y - 2 * px, px, px)
}
export function dustPuff(ctx, x, y, k, { n = 7, spread = 110, seed = 3, col = '#d8cfe8', rise = 18 } = {}) {
  if (k <= 0 || k >= 1) return
  const r = rng(seed)
  ctx.save(); ctx.globalAlpha = (1 - k) * 0.8
  for (let i = 0; i < n; i++) {
    const a = -Math.PI * r(), d = spread * (0.4 + 0.6 * r()) * ease.outCubic(k), s = (10 + 14 * r()) * (1 - 0.5 * k)
    ctx.fillStyle = col; ctx.fillRect(Math.round(x + Math.cos(a) * d - s / 2), Math.round(y + Math.sin(a) * d * 0.4 - rise * k - s / 2), Math.round(s), Math.round(s))
  }
  ctx.restore()
}
export function confetti(ctx, t, t0, { n = 40, seed = 7, W = 1080, alpha = 1, y0 = -40 } = {}) {
  const dt0 = t - t0
  if (dt0 < 0 || dt0 > 4) return
  const r = rng(seed)
  const cols = [GOLD, PINK, LCD, '#7fe0ff', BONE, '#c9a6ff']
  ctx.save(); ctx.globalAlpha = alpha * clamp((4 - dt0) / 0.8)
  for (let i = 0; i < n; i++) {
    const d = r() * 0.4, x0 = r() * W, vy = 380 + r() * 300, sw = 20 + r() * 40, ph = r() * TAU
    const dt = dt0 - d
    if (dt < 0) continue
    const y = y0 + vy * dt, x = x0 + Math.sin(dt * 3 + ph) * sw
    ctx.save(); ctx.translate(x, y); ctx.rotate(dt * 5 + ph); ctx.scale(1, Math.cos(dt * 7 + ph))
    ctx.fillStyle = cols[i % cols.length]; ctx.fillRect(-7, -4, 14, 8); ctx.restore()
  }
  ctx.restore()
}

// ─────────────────────────────────────────────── the talk card
/** card-talk-6.png (732×1170) with our own question set in (call in build only) */
export function makeTalkCard(doc, img, lines, { label: lab = 'QUESTION' } = {}) {
  if (!img) return null
  const c = doc.createElement('canvas'); c.width = img.width; c.height = img.height
  const x = c.getContext('2d'); x.drawImage(img, 0, 0)
  const g = x.createLinearGradient(0, 822, 0, 990); g.addColorStop(0, 'rgb(17,9,45)'); g.addColorStop(1, 'rgb(15,8,40)')
  x.fillStyle = g; x.fillRect(114, 822, 504, 162)
  x.fillStyle = '#efe6d6'; x.font = "italic 500 58px 'EB Garamond', Georgia, serif"; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
  lines.forEach((s, i) => x.fillText(s, 366, 874 + i * 62))
  x.fillStyle = 'rgb(14,7,38)'; x.fillRect(340, 1036, 250, 23)
  x.font = "400 21px 'Space Mono', monospace"; x.letterSpacing = '4px'; x.textAlign = 'right'; x.fillStyle = 'rgb(166,144,105)'
  x.fillText(lab, 574, 1055)
  x.letterSpacing = '0px'
  return c
}
void lerp
