// stintervention props: small pixel drawings on canvas (Star Talk season 2). Every prop is a pure draw call at a pixel
// size `px` (one art pixel = px screen px), crisp rectangles only, so they sit next to the pixel stars.
//   drawFoldingChair(ctx, x, seatY, size, { back })   a tan folding chair. size = the star size it fits (front view, the
//                                                      star sits on it) · back: true draws it from behind (the empty chair)
//   drawYouSign(ctx, x, y, px, t)                     the taped paper "YOU ♥" sign on the empty chair
//   drawWhistle(ctx, x, y, px, { blow })               a silver coach's whistle on a red cord stub
//   drawClipboard(ctx, x, y, px, { strike, rot })      Virgo's clipboard (strike 0…1 draws a red ✕ over the notes)
//   drawCrown(ctx, x, y, px)                            Leo's tiny crown (x, y = bottom centre)
//   drawGuitarCase(ctx, x, y, px, { wiggle })          a black guitar case standing on its end (x, y = bottom centre)
//   drawPopcorn(ctx, x, y, px, { tilt })               Pisces' snack: a striped popcorn box (x, y = bottom centre)
//   drawPixelHeart(ctx, x, y, px, col)                 a 7×6 pixel heart centred on (x, y)
//   drawTear(ctx, x, y, px)                            one pixel tear drop
//   drawPhotoFrame(ctx, x, y, w, h, k, { flash, label, circle })   one photo-booth frame: the same guy (same shades),
//                                                      haircut k = 0 spikes · 1 man-bun · 2 curtains · 3 mullet
//   drawBanner(ctx, x, y, t, { k })                     the hand-painted "WE LOVE YOU ♥" banner (k = 0…1 unroll)
//   pixelPanel(ctx, x, y, w, h, { px, fill, border, glow })   a stepped-corner pixel panel (the LESSON banner)
import { clamp } from '../../../src/lib.js'

const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const OUT = '#1a1030'

/** bitmap helper: rows of chars, pal maps char → colour; (x, y) = top-left */
export function bitmap(ctx, rows, pal, x, y, px) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(Math.round(x + i * px), Math.round(y + j * px), Math.ceil(px), Math.ceil(px)) } } })
}
const R = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h)) }

// ─────────────────────────────── folding chair
const SEAT = '#d39a5e', SEAT_HI = '#f0c088', SEAT_LO = '#8f5a32', METAL = '#8d84ab', METAL_HI = '#c4bce0', METAL_LO = '#4e4670'
/** front view (the star sits on it): call BEFORE the star for the backrest, then drawChairFront AFTER for the seat lip.
 *  Here everything is drawn in one go but the backrest is meant to sit behind the star: so draw the chair first. */
export function drawFoldingChair(ctx, x, seatY, size, { back = false, alpha = 1 } = {}) {
  const p = Math.max(2, Math.round(size / 26))
  ctx.save(); ctx.globalAlpha *= alpha
  if (!back) {
    const bw = 24 * p, bh = 5 * p, bx = x - bw / 2, by = seatY - size * 0.98
    // back posts
    for (const sx of [-1, 1]) { const px0 = x + sx * 11 * p - p; R(ctx, px0 - p * 0.5, by - p * 0.5, p * 2 + p, seatY - by + p, OUT); R(ctx, px0, by, p * 2, seatY - by, METAL); R(ctx, px0, by, p * 0.7, seatY - by, METAL_HI) }
    // backrest panel
    R(ctx, bx - p, by - p, bw + 2 * p, bh + 2 * p, OUT); R(ctx, bx, by, bw, bh, SEAT); R(ctx, bx, by, bw, p, SEAT_HI); R(ctx, bx, by + bh - p, bw, p, SEAT_LO)
    // legs (front pair splayed a touch) + a crossbar
    const legH = size * 0.5
    for (const sx of [-1, 1]) {
      for (let k = 0; k < legH / p; k++) { const lx = x + sx * (8 * p + (k / (legH / p)) * 2 * p) - p; R(ctx, lx - p * 0.5, seatY + k * p, p * 3, p, OUT); R(ctx, lx, seatY + k * p, p * 2, p, k % 6 === 0 ? METAL_HI : METAL) }
    }
    R(ctx, x - 8 * p, seatY + legH * 0.55, 16 * p, p, METAL_LO)
    // seat slab (top surface + front lip) — drawn by drawChairSeat after the star, so the star sits IN it
  } else {
    // from behind: tall backrest panel, posts to the floor, the seat peeking out either side, back legs
    const bw = 22 * p, bh = 9 * p, by = seatY - 15 * p, bx = x - bw / 2
    // seat (further away, so above the panel's bottom, peeking out the sides)
    R(ctx, x - 13 * p, seatY - p, 26 * p, 4 * p, OUT); R(ctx, x - 12 * p, seatY, 24 * p, 2 * p, SEAT); R(ctx, x - 12 * p, seatY, 24 * p, p * 0.8, SEAT_HI)
    // posts + legs
    for (const sx of [-1, 1]) {
      const px0 = x + sx * 10 * p - p
      R(ctx, px0 - p * 0.5, by, p * 3, seatY + 14 * p - by, OUT); R(ctx, px0, by, p * 2, seatY + 14 * p - by, METAL); R(ctx, px0, by, p * 0.7, seatY + 14 * p - by, METAL_HI)
    }
    R(ctx, x - 10 * p, seatY + 8 * p, 20 * p, p, METAL_LO)
    // the backrest panel
    R(ctx, bx - p, by - p, bw + 2 * p, bh + 2 * p, OUT); R(ctx, bx, by, bw, bh, SEAT); R(ctx, bx, by, bw, p, SEAT_HI); R(ctx, bx, by + bh - p, bw, p, SEAT_LO)
    R(ctx, bx + p, by + p, p, bh - 2 * p, SEAT_HI)
  }
  ctx.restore()
  return p
}
/** the seat slab in front of a sitting star (front view) */
export function drawChairSeat(ctx, x, seatY, size, { alpha = 1 } = {}) {
  const p = Math.max(2, Math.round(size / 26))
  ctx.save(); ctx.globalAlpha *= alpha
  const sw = 22 * p
  R(ctx, x - sw / 2 - p, seatY - p, sw + 2 * p, 4 * p, OUT)
  R(ctx, x - sw / 2, seatY, sw, p, SEAT_HI); R(ctx, x - sw / 2, seatY + p, sw, p, SEAT); R(ctx, x - sw / 2, seatY + 2 * p, sw, p, SEAT_LO)
  ctx.restore()
}

export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e') {
  bitmap(ctx, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], { X: col, W: '#ffd0dc' }, x - 3.5 * px, y - 3 * px, px)
}

/** the taped paper sign on the empty chair: "YOU" + a pixel heart */
export function drawYouSign(ctx, x, y, px, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.05 + 0.01 * Math.sin(t * 1.3))
  const w = 30 * px, h = 11 * px
  R(ctx, -w / 2 + px, -h / 2 + px, w, h, 'rgba(10,6,24,0.45)')
  R(ctx, -w / 2, -h / 2, w, h, '#fbf3e2'); R(ctx, -w / 2, h / 2 - px, w, px, '#ddd0b8')
  // tape
  R(ctx, -w / 2 - px, -h / 2 - px, 5 * px, 2 * px, 'rgba(255,240,170,0.8)'); R(ctx, w / 2 - 4 * px, -h / 2 - px, 5 * px, 2 * px, 'rgba(255,240,170,0.8)')
  ctx.fillStyle = '#2a1846'; ctx.font = `800 ${Math.round(8 * px)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('YOU', -3.5 * px, px * 0.6)
  drawPixelHeart(ctx, 10 * px, 0, px * 0.9)
  ctx.restore()
}

export function drawWhistle(ctx, x, y, px, { blow = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.25 - blow * 0.12)
  const S = '#d6dbe8', H = '#ffffff', D = '#6b7390', L = OUT
  bitmap(ctx, [
    '...LLLL........',
    '..LSSSSL.......',
    '.LSHHSSSLLLLLL.',
    '.LSHSSSSSSSSSSL',
    '.LSSSSDDSSSSSSL',
    '.LSSSSDDSSLLLL.',
    '..LSSSSSSL.....',
    '...LLLLLL......',
  ], { L, S, H, D }, -4 * px, -4 * px, px)
  // the cord stub
  R(ctx, -6 * px, -3 * px, 3 * px, px, '#e8455e'); R(ctx, -8 * px, -2 * px, 3 * px, px, '#e8455e'); R(ctx, -9 * px, -px, 2 * px, px, '#b02a44')
  // blow puffs
  if (blow > 0) {
    ctx.globalAlpha = clamp(blow)
    for (let k = 0; k < 3; k++) { const d = (1 - blow) * 6 + k * 3; R(ctx, (11 + d) * px, (-3 + k * 2.5 - 2) * px, 3 * px, px, '#fffbea') }
  }
  ctx.restore()
}

export function drawClipboard(ctx, x, y, px, { strike = 0, rot = 0.12, page = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const w = 16, h = 21, ox = -w / 2 * px, oy = -h / 2 * px
  R(ctx, ox - px, oy - px, (w + 2) * px, (h + 2) * px, OUT)
  R(ctx, ox, oy, w * px, h * px, '#a8693a'); R(ctx, ox, oy, w * px, px, '#d08a50')
  R(ctx, ox + 2 * px, oy + 2 * px, (w - 4) * px, (h - 3) * px, '#fbf3e2')
  // the notes (ink lines; the page flips at `page` > 0.5)
  const lines = page > 0.5 ? [9, 6, 10, 7, 8] : [10, 7, 9, 11, 6]
  lines.forEach((L, k) => R(ctx, ox + 3.5 * px, oy + (5 + k * 3) * px, L * px, px, '#5b4a7a'))
  R(ctx, ox + 3.5 * px, oy + 5 * px, 2 * px, px, '#ef5c94')
  // the clip
  R(ctx, ox + 4.5 * px, oy - 2 * px, 7 * px, 4 * px, OUT); R(ctx, ox + 5 * px, oy - 1.5 * px, 6 * px, 3 * px, '#c4bce0'); R(ctx, ox + 5 * px, oy - 1.5 * px, 6 * px, px, '#ffffff')
  // the red ✕
  if (strike > 0) {
    const k = clamp(strike), s = 0.75 + 0.25 * (1 - k) * 2
    ctx.save(); ctx.scale(s, s); ctx.fillStyle = '#ff3355'
    for (let i = -5; i <= 5; i++) { ctx.fillRect(Math.round(i * px * 1.1 - px), Math.round(i * px * 1.1 + px), Math.ceil(px * 2.2), Math.ceil(px * 2.2)); ctx.fillRect(Math.round(-i * px * 1.1 - px), Math.round(i * px * 1.1 + px), Math.ceil(px * 2.2), Math.ceil(px * 2.2)) }
    ctx.restore()
  }
  ctx.restore()
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

export function drawGuitarCase(ctx, x, y, px, { wiggle = 0, lid = 0 } = {}) {
  // row half-widths from the top (head → neck → upper bout → waist → lower bout)
  const HW = [3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 5, 5, 5, 4, 4, 5, 6, 6, 6, 6, 6, 6, 5, 4]
  const n = HW.length
  ctx.save(); ctx.translate(x, y); ctx.rotate(wiggle * 0.12)
  const top = -n * px
  HW.forEach((hw, j) => { R(ctx, (-hw - 1) * px, top + (j - (j === 0 ? 1 : 0)) * px, (2 * hw + 2) * px, px * (j === 0 ? 2 : 1), '#d9cdf0') })
  R(ctx, -7 * px, -px, 14 * px, px, OUT)
  HW.forEach((hw, j) => { R(ctx, -hw * px, top + j * px, 2 * hw * px, px, '#3d2f66'); R(ctx, -hw * px, top + j * px, px, px, '#8a76c4'); R(ctx, (hw - 1) * px, top + j * px, px, px, '#251a40') })
  // a sticker (gold star) + a latch + a handle
  bitmap(ctx, ['..Y..', '.YYY.', 'YYYYY', '.Y.Y.'], { Y: '#ffd23f' }, -1.5 * px, top + 20 * px, px)
  R(ctx, 2 * px, top + 15 * px, 2 * px, px, '#c4bce0')
  R(ctx, -6.5 * px, top + 22 * px, px, 3 * px, '#c4bce0')
  // the lid seam glows when it rattles (the riff leaks out)
  if (lid > 0) { ctx.globalAlpha = clamp(lid); R(ctx, -6 * px, top + 25.5 * px, 12 * px, px * 0.6, '#ffd98a') }
  ctx.restore()
}

export function drawPopcorn(ctx, x, y, px, { tilt = 0, spill = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(tilt)
  const W0 = 12, H0 = 14
  // box (trapezoid: wider at the top), red/white stripes
  for (let j = 0; j < H0; j++) {
    const hw = W0 / 2 - j * 0.14 * 0 - (H0 - j) * -0.12
    const ww = Math.round(hw)
    R(ctx, (-ww - 1) * px, (-H0 + j) * px, (2 * ww + 2) * px, px, OUT)
    for (let i = -ww; i < ww; i++) R(ctx, i * px, (-H0 + j) * px, px, px, Math.floor((i + 20) / 2) % 2 ? '#ff3d55' : '#fff6ea')
  }
  R(ctx, -7 * px, 0, 14 * px, px, OUT)
  // popcorn puffs on top
  const P = [[-6, -16], [-4, -17], [-2, -16], [0, -18], [2, -16], [4, -17], [6, -16], [-3, -19], [1, -20], [3, -19]]
  for (const [i, j] of P) { R(ctx, (i - 0.5) * px, j * px, 2.4 * px, 2.4 * px, OUT); R(ctx, i * px - px * 0.2, j * px + px * 0.3, 2 * px, 2 * px, '#fff3b0'); R(ctx, i * px, j * px + px * 0.3, px, px, '#ffffff') }
  ctx.restore()
}

/** popcorn spilling out on a drop: k 0…1 */
export function drawSpill(ctx, x, y, px, k, seed = 1) {
  if (k <= 0) return
  for (let i = 0; i < 12; i++) {
    const a = -Math.PI / 2 + ((i * 0.618 + seed * 0.3) % 1 - 0.5) * 2.4, v = 10 + (i * 37 % 9)
    const tt = k * 1.1
    const qx = x + Math.cos(a) * v * px * tt * 2.2, qy = y + Math.sin(a) * v * px * tt * 2.2 + 30 * px * tt * tt
    R(ctx, qx - px, qy - px, 2.4 * px, 2.4 * px, OUT); R(ctx, qx - px * 0.7, qy - px * 0.7, 2 * px, 2 * px, '#fff3b0')
  }
}

export function drawTear(ctx, x, y, px) {
  bitmap(ctx, ['.T.', 'TWT', 'TTT', '.T.'], { T: '#6fd3ff', W: '#e6f8ff' }, x - 1.5 * px, y - 2 * px, px)
}

// ─────────────────────────────── the photo strip
const PHOTO_BG = ['#ffb3c9', '#9fe8cf', '#cdb6ff', '#ffd98a']
const SIL = '#2a1846', SIL2 = '#3b2560'
/** one photo-booth frame (x, y = centre). The guy: same face, same shades. Only the hair changes. */
export function drawPhotoFrame(ctx, x, y, w, h, k, { flash = 0, label = '', circle = 0, rot = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  // white print border
  R(ctx, -w / 2 - 6, -h / 2 - 6 + 8, w + 12, h + 12, 'rgba(8,4,20,0.5)')
  R(ctx, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, '#fbf6ec')
  const iw = w - 16, ih = h - 54, ix = -iw / 2, iy = -h / 2 + 4
  R(ctx, ix, iy, iw, ih, PHOTO_BG[k % 4])
  ctx.save(); ctx.beginPath(); ctx.rect(ix, iy, iw, ih); ctx.clip()
  const px = Math.round(iw / 26), cx = 0, cy = iy + ih * 0.52
  // shoulders
  for (let j = 0; j < 8; j++) R(ctx, cx - (7 + j) * px, cy + (6 + j) * px, (14 + 2 * j) * px, px, SIL)
  // neck + head (a pixel circle)
  R(ctx, cx - 2 * px, cy + 3 * px, 4 * px, 4 * px, SIL)
  for (let j = -6; j <= 4; j++) { const hw = Math.round(Math.sqrt(Math.max(0, 30 - j * j * 0.9))); R(ctx, cx - hw * px, cy + (j - 1) * px, 2 * hw * px, px, SIL) }
  // hair
  const H = (i, j, ww, hh) => R(ctx, cx + i * px, cy + j * px, ww * px, hh * px, SIL2)
  if (k === 0) { for (let i = -4; i <= 3; i += 2) { H(i, -9 - (i % 4 === 0 ? 2 : 0), 2, 3 + (i % 4 === 0 ? 2 : 0)) } H(-5, -7, 10, 1) }            // spikes
  else if (k === 1) { H(-3, -11, 6, 4); H(-2, -12, 4, 1); H(-5, -8, 10, 2) }                                                              // man-bun
  else if (k === 2) { H(-6, -8, 12, 2); H(-7, -6, 3, 6); H(4, -6, 3, 6); H(-1, -7, 2, 2) }                                                // curtains
  else { H(-5, -8, 10, 2); H(-7, -2, 2, 9); H(5, -2, 2, 9); H(-6, 4, 12, 3) }                                                             // mullet
  // the SAME shades every time
  R(ctx, cx - 5 * px, cy - 3 * px, 4 * px, 2 * px, '#05030c'); R(ctx, cx + 1 * px, cy - 3 * px, 4 * px, 2 * px, '#05030c'); R(ctx, cx - 1 * px, cy - 3 * px, 2 * px, px, '#05030c')
  R(ctx, cx - 4 * px, cy - 3 * px, px, px, '#ffffff'); R(ctx, cx + 2 * px, cy - 3 * px, px, px, '#ffffff')
  ctx.restore()
  // flash
  if (flash > 0) R(ctx, ix, iy, iw, ih, `rgba(255,255,255,${clamp(flash)})`)
  // label
  ctx.fillStyle = '#3a2a58'; ctx.font = `700 ${Math.round(h * 0.11)}px 'Space Mono', ui-monospace, monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(label, 0, h / 2 - 22)
  // red marker circle around the shades
  if (circle > 0) {
    ctx.strokeStyle = '#ff2e4f'; ctx.lineWidth = 7; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.ellipse(cx, cy - 2 * px, 8.5 * px, 4.5 * px, -0.08, -1.9, -1.9 + Math.PI * 2.15 * clamp(circle)); ctx.stroke()
  }
  ctx.restore()
}

// ─────────────────────────────── the banner
const WORDS = [{ w: 'WE', c: '#ff7aa8' }, { w: 'LOVE', c: '#ffb347' }, { w: 'YOU', c: '#4fd8c0' }]
/** hand-painted cloth banner hung on two strings. (x, y) = centre. k = unroll 0…1 */
export function drawBanner(ctx, x, y, t, { k = 1, w = 800, h = 132 } = {}) {
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(0.012 * Math.sin(t * 1.1))
  // strings up out of frame
  ctx.strokeStyle = 'rgba(239,230,214,0.55)'; ctx.lineWidth = 3
  ctx.beginPath(); ctx.moveTo(-w / 2 + 20, -h / 2); ctx.lineTo(-w / 2 - 60, -h / 2 - 260); ctx.moveTo(w / 2 - 20, -h / 2); ctx.lineTo(w / 2 + 60, -h / 2 - 260); ctx.stroke()
  const hh = h * k
  // cloth: cream with a ragged bottom edge
  ctx.save(); ctx.beginPath()
  ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(w / 2, -h / 2)
  for (let i = 0; i <= 20; i++) { const xx = w / 2 - i * w / 20; ctx.lineTo(xx, -h / 2 + hh + (i % 2 ? 6 : -3) * k) }
  ctx.closePath()
  ctx.shadowColor = 'rgba(6,3,18,0.6)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10
  ctx.fillStyle = '#f6ead2'; ctx.fill(); ctx.restore()
  // a sewn hem along the top
  ctx.fillStyle = '#e2d2b2'; ctx.fillRect(-w / 2, -h / 2, w, 12)
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, hh + 8); ctx.clip()
  // painted letters (each a little crooked) + drips
  ctx.font = `800 82px ${INTER}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'
  let gx = -w / 2 + 62
  let n = 0
  for (const W0 of WORDS) {
    for (const ch of W0.w) {
      const cw = ctx.measureText(ch).width
      const r = Math.sin(n * 12.9898) * 0.09, dy = Math.sin(n * 7.3) * 5
      ctx.save(); ctx.translate(gx + cw / 2, 8 + dy); ctx.rotate(r)
      ctx.fillStyle = W0.c; ctx.fillText(ch, 0, 0)
      ctx.restore()
      if (n % 3 === 1) { ctx.fillStyle = W0.c; const dl = 10 + (n * 7) % 14; ctx.fillRect(gx + cw * 0.45, 8 + dy + 30, 6, dl); ctx.beginPath(); ctx.arc(gx + cw * 0.45 + 3, 8 + dy + 30 + dl, 5, 0, Math.PI * 2); ctx.fill() }
      gx += cw * 0.96; n++
    }
    gx += 28
  }
  drawPixelHeart(ctx, gx + 30, 6, 9, '#ff3d6e')
  ctx.restore()
  ctx.restore()
}

/** stepped-corner pixel panel with a gold border + glow (screen coords, top-left x, y) */
export function pixelPanel(ctx, x, y, w, h, { px = 6, fill = 'rgba(13,8,32,0.94)', border = '#f2c75c', glow = 1 } = {}) {
  const step = (o, col) => {
    ctx.fillStyle = col
    ctx.fillRect(x + o + 2 * px, y + o, w - 2 * o - 4 * px, h - 2 * o)
    ctx.fillRect(x + o, y + o + 2 * px, w - 2 * o, h - 2 * o - 4 * px)
    ctx.fillRect(x + o + px, y + o + px, w - 2 * o - 2 * px, h - 2 * o - 2 * px)
  }
  ctx.save()
  if (glow > 0) { ctx.shadowColor = `rgba(242,199,92,${0.6 * glow})`; ctx.shadowBlur = 40 * glow }
  step(0, border)
  ctx.restore()
  step(px, '#7a5a18')
  step(px * 2, fill)
  // highlights on the top-left run
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x + 2 * px, y, px * 4, px / 2 + 1); ctx.fillRect(x, y + 2 * px, px / 2 + 1, px * 3)
}
