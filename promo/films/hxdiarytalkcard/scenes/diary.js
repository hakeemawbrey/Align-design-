// diary — the BETA DIARIES kit, copied from sxdiary1 for the Houston diaries (this film keeps its own copy).
// Changes from sxdiary1: the diarist's sign is a parameter (drawDiarist), the room's pennant and the notebook cover take
// the diarist's glyph/colour, the show bug carries the show name only (no day counter) and the tape title is a word.
//
//   DIARY_FONTS                         font specs to load in build()
//   TAU, PIS, GOLD, BONE, INK, PINK, MINT, INTER, MONO, SERIF
//   drawRoom(x, t, { lamp })            the confessional bedroom: mauve wall, fairy lights, a window onto the real
//                                       sky (cut out: draw drawSky first), a ♉ pennant, a reading lamp, a beanbag, a rug
//   drawPiscesWindow(x, t, { cry, mood, look, pop })   ♓ Pisces outside the window, crying (the running gag)
//   drawDiarist(x, sign, cx, cy, size, t, opts, { notebook, outfit, pen })  the diarist + its little notebook
//   drawNotebook(x, cx, cy, s, t, { lines, rot, open })   a pixel spiral notebook; lines [{ text, at, strike?, color? }]
//   drawPhone(x, cx, cy, w, h, { rot, pop, glow }, screen)  a pixel phone; screen(x, sx, sy, sw, sh) draws clipped inside
//   showBug(x, t)                       "BETA DIARIES" (top-left, Inter 800 small caps; show name only)
//   tapeTitle(root, { text, at, out })  a masking-tape word title (DOM), fully on at `at`
//   heads(root, list)                   a list of popText headlines [{ text, at, out: [a, b], top, size, accentSize, accentColor, late }]
//   pix(x, X, Y, w, h, c), txt(x, s, X, Y, opts), rr(x, X, Y, w, h, r)   small canvas helpers
//   pop01(t, t0, d, s), popOut(t, [a, b])
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawTears } from '../../stmetfirst/props.js'

export const TAU = signStar('taurus'), PIS = signStar('pisces')
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', MINT = '#7dffb0', RED = '#ff3b4f'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const DIARY_FONTS = ["800 96px Inter", "800 28px Inter", "600 40px Inter", "italic 500 150px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 120px 'Space Mono'"]

export const pop01 = (t, t0, d = 0.32, s = 2) => t < t0 ? 0 : easeOutBack(prog(t, t0, t0 + d), s)
export const popOut = (t, [a, b]) => 1 - ease.inCubic(prog(t, a, b))
export const pix = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function rr(x, X, Y, w, h, r) {
  x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath()
}
export function txt(x, s, X, Y, { size = 30, color = BONE, align = 'center', font = MONO, weight = 700, alpha = 1, shadow = true, italic = false, spacing = 0, base = 'middle' } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = base
  if (spacing) x.letterSpacing = spacing + 'px'
  if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(s, X, Y + Math.max(2, size * 0.07)) }
  x.fillStyle = color; x.fillText(s, X, Y); x.restore()
}

// ─────────────────────────────────────────────── the confessional bedroom
const WALL = '#4a2f5c', WALL2 = '#42295a', WALL3 = '#56386a', TRIM = '#e8d9c0', FLOOR = '#6b4630', PLANK = '#5a3a28'
export const WIN = { x0: 648, y0: 470, x1: 948, y1: 800 }
export const FLOOR_Y = 1330
// The room out of focus (behind the phone). Drawn sharp to an offscreen canvas, then blurred as one image:
// a canvas filter on the hundreds of small room rects would blur each one on its own (~24 s a frame in the renderer).
let soft
export function drawRoomBlurred(x, t, filter = 'blur(10px) brightness(0.45)', ro = {}) {
  const c = x.canvas
  if (!soft || soft.width !== c.width || soft.height !== c.height) { soft = document.createElement('canvas'); soft.width = c.width; soft.height = c.height }
  const o = soft.getContext('2d')
  o.setTransform(1, 0, 0, 1, 0, 0); o.clearRect(0, 0, soft.width, soft.height)
  o.setTransform(x.getTransform()); drawRoom(o, t, ro)
  x.save(); x.setTransform(1, 0, 0, 1, 0, 0); x.filter = filter; x.drawImage(soft, 0, 0); x.restore()
}

export function drawRoom(x, t, { lamp = 1, glyph = '♉', color = '#3f9a52' } = {}) {
  const W = 1080, H = 1920
  x.save()
  x.beginPath(); x.rect(-200, -200, W + 400, FLOOR_Y + 200); x.rect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0)
  x.fillStyle = WALL; x.fill('evenodd')
  x.restore()
  // wallpaper: tiny pixel stars in a lattice
  for (let r = 0; r < 18; r++) for (let c = -1; c < 12; c++) {
    const X = c * 100 + (r % 2) * 50 + 20, Y = r * 76 + 20
    if (X > WIN.x0 - 40 && X < WIN.x1 + 20 && Y > WIN.y0 - 40 && Y < WIN.y1 + 20) continue
    if (Y > 1240) continue
    pix(x, X, Y, 8, 8, (r + c) % 3 ? WALL2 : WALL3); pix(x, X - 6, Y + 2, 20, 4, (r + c) % 3 ? WALL2 : WALL3)
  }
  // window frame + sill + curtains
  pix(x, WIN.x0 - 16, WIN.y0 - 16, WIN.x1 - WIN.x0 + 32, 16, TRIM); pix(x, WIN.x0 - 16, WIN.y1, WIN.x1 - WIN.x0 + 32, 22, TRIM)
  pix(x, WIN.x0 - 16, WIN.y0, 16, WIN.y1 - WIN.y0, TRIM); pix(x, WIN.x1, WIN.y0, 16, WIN.y1 - WIN.y0, TRIM)
  pix(x, (WIN.x0 + WIN.x1) / 2 - 5, WIN.y0, 10, WIN.y1 - WIN.y0, TRIM); pix(x, WIN.x0, (WIN.y0 + WIN.y1) / 2 - 5, WIN.x1 - WIN.x0, 10, TRIM)
  pix(x, WIN.x0 - 30, WIN.y1 + 22, WIN.x1 - WIN.x0 + 60, 12, '#c9b89c')
  for (const [cx, d] of [[WIN.x0 - 40, 1], [WIN.x1 + 6, -1]]) {
    for (let i = 0; i < 5; i++) pix(x, cx + i * 8, WIN.y0 - 30, 8, WIN.y1 - WIN.y0 + 90 + (i % 2) * 14, i % 2 ? '#d86a8a' : '#c45576')
    void d
  }
  // a little plant on the sill
  pix(x, WIN.x0 + 20, WIN.y1 - 40, 46, 40, '#c8693e'); pix(x, WIN.x0 + 24, WIN.y1 - 40, 38, 8, '#e08a5a')
  for (let i = 0; i < 5; i++) pix(x, WIN.x0 + 14 + i * 12, WIN.y1 - 70 - (i % 2) * 18, 12, 32 + (i % 2) * 18, i % 2 ? '#3f9a52' : '#2e7a40')
  // ♉ pennant on the left wall
  x.save(); x.translate(130, 640); x.rotate(-0.08)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-6, -6); x.lineTo(236, 56); x.lineTo(-6, 118); x.closePath(); x.fill()
  x.fillStyle = color; x.beginPath(); x.moveTo(0, 0); x.lineTo(220, 56); x.lineTo(0, 112); x.closePath(); x.fill()
  pix(x, -14, -14, 14, 140, '#a8744a')
  txt(x, glyph, 62, 58, { size: 64, color: BONE, font: SERIF, weight: 700 })
  x.restore()
  // fairy lights: a sagging string across the top
  x.save(); x.strokeStyle = '#2a1a36'; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i <= 40; i++) { const X = -20 + i * 28, Y = 330 + Math.sin(i / 40 * Math.PI) * 90 + Math.sin(i / 40 * Math.PI * 3) * 14; i ? x.lineTo(X, Y) : x.moveTo(X, Y) }
  x.stroke(); x.restore()
  for (let i = 1; i < 40; i += 2) {
    const X = -20 + i * 28, Y = 330 + Math.sin(i / 40 * Math.PI) * 90 + Math.sin(i / 40 * Math.PI * 3) * 14 + 10
    const on = 0.6 + 0.4 * Math.sin(t * 2.4 + i * 1.3)
    const c = ['#ffd27a', '#ff9ec0', '#9fe3ff', '#c9ff9f'][(i >> 1) % 4]
    x.save(); x.globalAlpha = 0.28 * on; x.fillStyle = c; x.beginPath(); x.arc(X + 6, Y + 8, 26, 0, Math.PI * 2); x.fill(); x.restore()
    pix(x, X, Y, 12, 16, c); pix(x, X + 2, Y - 4, 8, 4, '#2a1a36')
  }
  // the reading lamp (left) + warm pool
  if (lamp > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(150, 900, 20, 150, 900, 560); g.addColorStop(0, `rgba(255,190,110,${0.26 * lamp})`); g.addColorStop(1, 'rgba(255,190,110,0)')
    x.fillStyle = g; x.fillRect(-300, 300, 1100, 1300); x.restore()
  }
  pix(x, 140, 900, 14, 430, '#2a1a36'); pix(x, 90, 1318, 114, 16, '#2a1a36')
  x.fillStyle = '#f2b866'; x.beginPath(); x.moveTo(90, 900); x.lineTo(210, 900); x.lineTo(186, 820); x.lineTo(114, 820); x.closePath(); x.fill()
  pix(x, 90, 894, 120, 8, '#d8964a')
  // floor + rug
  pix(x, -200, FLOOR_Y, W + 400, H - FLOOR_Y + 200, FLOOR)
  for (let i = 0; i < 12; i++) pix(x, -200, FLOOR_Y + 40 + i * 70, W + 400, 6, PLANK)
  pix(x, -200, FLOOR_Y - 12, W + 400, 14, TRIM)
  x.save(); x.fillStyle = '#c45576'; x.beginPath(); x.ellipse(540, 1430, 420, 70, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e48aa4'; x.beginPath(); x.ellipse(540, 1430, 330, 50, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c45576'; x.beginPath(); x.ellipse(540, 1430, 230, 32, 0, 0, Math.PI * 2); x.fill(); x.restore()
  // the beanbag (sage), behind the diarist
  x.save()
  x.fillStyle = '#1e3a2a'; x.beginPath(); x.ellipse(540, 1250, 300, 170, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#5f9a6a'; x.beginPath(); x.ellipse(540, 1240, 286, 158, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#76b281'; x.beginPath(); x.ellipse(470, 1180, 150, 70, -0.3, 0, Math.PI * 2); x.fill()
  x.restore()
  // corner vignette
  const v = x.createRadialGradient(540, 900, 300, 540, 900, 1200); v.addColorStop(0, 'rgba(6,4,18,0)'); v.addColorStop(1, 'rgba(6,4,18,0.55)')
  x.fillStyle = v; x.fillRect(-200, -200, W + 400, H + 400)
}

/** ♓ Pisces peeking in from outside the window, crying (happy, sad or sentimental: always crying) */
export function drawPiscesWindow(x, t, { cry = 1, mood = 'sparkle', look = [-1, 0], pop = 1, size = 150, dx = 0, dy = 0, who = PIS } = {}) {
  if (pop <= 0) return
  const cx = (WIN.x0 + WIN.x1) / 2 + 30 + dx, cy = WIN.y1 - 70 + dy
  x.save(); x.beginPath(); x.rect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0); x.clip()
  const r = drawStarChar(x, cx, cy, size * pop, t, { color: who.color, glyph: null, mood, look, seed: 31, glow: 0.7 })
  if (cry > 0) { drawTears(x, r.x - size * 0.17, r.y - size * 0.05, size / 36, t, cry, -1, 1); drawTears(x, r.x + size * 0.17, r.y - size * 0.05, size / 36, t, cry, 1, 2) }
  x.restore()
  // the window glass sheen (over Pisces)
  x.save(); x.globalAlpha = 0.12; x.fillStyle = '#ffffff'
  x.beginPath(); x.moveTo(WIN.x0 + 30, WIN.y1); x.lineTo(WIN.x0 + 90, WIN.y0); x.lineTo(WIN.x0 + 120, WIN.y0); x.lineTo(WIN.x0 + 60, WIN.y1); x.closePath(); x.fill(); x.restore()
}

// ─────────────────────────────────────────────── the notebook
export function drawNotebook(x, cx, cy, s, t, { lines = [], rot = 0, open = 1, cover = '#3f9a52', title = 'DIARY', alpha = 1, glyph = '♉' } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const w = 230, h = 280
  if (open < 0.5) {
    pix(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, INK); pix(x, -w / 2, -h / 2, w, h, cover)
    pix(x, -w / 2, -h / 2, 26, h, 'rgba(0,0,0,0.25)')
    pix(x, -w / 2 + 50, -40, w - 90, 60, BONE); txt(x, title, 26, -10, { size: 26, color: INK, shadow: false })
    txt(x, glyph, 26, 70, { size: 54, color: BONE, font: SERIF, shadow: false })
  } else {
    pix(x, -w - 8, -h / 2 - 8, 2 * w + 16, h + 16, INK)
    pix(x, -w, -h / 2, w, h, '#f6efdc'); pix(x, 0, -h / 2, w, h, '#fbf5e6')
    for (let i = 0; i < 8; i++) { pix(x, -w + 14, -h / 2 + 50 + i * 30, w - 28, 2, '#bcd2ea'); pix(x, 14, -h / 2 + 50 + i * 30, w - 28, 2, '#bcd2ea') }
    pix(x, -w + 34, -h / 2, 2, h, '#f0a0a8')
    for (let i = 0; i < 9; i++) pix(x, -8, -h / 2 + 14 + i * 30, 16, 10, '#9a94a8')
    // the lines: hand-lettered (Space Mono), typed on
    let y = -h / 2 + 44
    for (const L of lines) {
      if (t < L.at) break
      const n = Math.floor((t - L.at) * 22)
      const shown = L.text.slice(0, n)
      const px0 = L.right ? 22 : -w + 44
      x.font = `700 ${L.size || 22}px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
      x.fillStyle = L.color || '#2a2a6a'; x.fillText(shown, px0, y)
      if (L.strike && t > L.strike) {
        const k = ease.outCubic(prog(t, L.strike, L.strike + 0.25)), tw = x.measureText(L.text).width
        pix(x, px0 - 4, y - 9, (tw + 8) * k, 5, '#e0344a')
      }
      if (L.check && t > L.check) txt(x, '✓', px0 + x.measureText(L.text).width + 22, y - 8, { size: 30, color: '#2f9a4a', font: INTER, weight: 800, shadow: false })
      y += L.gap || 30
    }
  }
  x.restore()
}

// ─────────────────────────────────────────────── the diarist
const OUTFITS = {
  bowtie: (x, r, s) => { const c = s / 36; const bx = r.x, by = r.y + s * 0.2; pix(x, bx - 6 * c, by - 3 * c, 5 * c, 6 * c, '#ff5c8e'); pix(x, bx + c, by - 3 * c, 5 * c, 6 * c, '#ff5c8e'); pix(x, bx - c, by - 1.5 * c, 2 * c, 3 * c, '#c2185b') },
  shades: (x, r, s) => { const c = s / 36, y = r.y - s * 0.07; pix(x, r.x - 10 * c, y - 2 * c, 20 * c, 1.3 * c, INK); pix(x, r.x - 10 * c, y - 2 * c, 8.5 * c, 5 * c, INK); pix(x, r.x + 1.5 * c, y - 2 * c, 8.5 * c, 5 * c, INK); pix(x, r.x - 9 * c, y - 1 * c, 2 * c, 1.2 * c, '#7a8aff'); pix(x, r.x + 2.5 * c, y - 1 * c, 2 * c, 1.2 * c, '#7a8aff') },
  scarf: (x, r, s) => { const c = s / 36, y = r.y + s * 0.2; for (let i = 0; i < 12; i++) pix(x, r.x - 9 * c + i * 1.5 * c, y - c, 1.5 * c, 3 * c, i % 2 ? '#2b2b6a' : '#5a4ac8'); pix(x, r.x + 5 * c, y + 2 * c, 3 * c, 9 * c, '#5a4ac8') },
  robe: (x, r, s) => { const c = s / 36, y0 = r.y + s * 0.16; for (let i = 0; i < 6; i++) for (const d of [-1, 1]) pix(x, r.x + d * (6 - i) * c - (d < 0 ? 2 * c : 0), y0 + i * c, 2 * c, c, '#f3e8cf'); pix(x, r.x - 7 * c, y0 + 6 * c, 14 * c, 1.5 * c, '#d8c8a4') },
  mask: (x, r, s) => { const c = s / 36, y = r.y - s * 0.07; for (const d of [-1, 1]) { x.fillStyle = '#7ccf5a'; x.beginPath(); x.arc(r.x + d * 5.5 * c, y, 3.6 * c, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9f7a8'; x.beginPath(); x.arc(r.x + d * 5.5 * c, y, 2.6 * c, 0, Math.PI * 2); x.fill(); pix(x, r.x + d * 5.5 * c - 0.5 * c, y - 0.5 * c, c, c, '#e8ffd8') } },
  towel: (x, r, s) => { const c = s / 36; pix(x, r.x - 6 * c, r.top + 1 * c, 12 * c, 6 * c, '#ff9ec0'); pix(x, r.x - 4 * c, r.top - 2 * c, 8 * c, 4 * c, '#ffc2d6') },
}
/** the diarist (sign star + glyph badge). sign = a signStar() result. extra.notebook: { lines, open, rot, dx, dy, s } or false. outfit: an OUTFITS key or array */
export function drawDiarist(x, sign, cx, cy, size, t, opts = {}, { notebook = { open: 0 }, outfit = null, pen = false } = {}) {
  const r = drawStarChar(x, cx, cy, size, t, { color: sign.color, glyph: sign.glyph, seed: 7, ...opts })
  const list = outfit ? (Array.isArray(outfit) ? outfit : [outfit]) : []
  for (const o of list) OUTFITS[o] && OUTFITS[o](x, r, size * (opts.pop ?? 1))
  if (notebook) {
    const nb = notebook
    const s = (nb.s ?? 0.62) * size / 380
    drawNotebook(x, cx + (nb.dx ?? size * 0.42), r.y + (nb.dy ?? size * 0.3), s, t, { lines: nb.lines || [], rot: nb.rot ?? -0.12, open: nb.open ?? 0, alpha: nb.alpha ?? 1, cover: nb.cover ?? sign.color, glyph: sign.glyph })
    if (pen) { x.save(); x.translate(cx + size * 0.62, r.y + size * 0.18 + Math.sin(t * 18) * 4); x.rotate(0.6); pix(x, -5, -50, 10, 70, '#ffd34d'); pix(x, -5, 20, 10, 10, '#f5c09a'); pix(x, -2, 30, 4, 6, INK); x.restore() }
  }
  return r
}

// ─────────────────────────────────────────────── the phone
export function drawPhone(x, cx, cy, w, h, { rot = 0, pop = 1, glow = 0.6, alpha = 1 } = {}, screen = null) {
  if (pop <= 0 || alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(pop, pop)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, w * 0.2, 0, 0, w * 1.1); g.addColorStop(0, `rgba(170,140,255,${0.25 * glow})`); g.addColorStop(1, 'rgba(170,140,255,0)'); x.fillStyle = g; x.fillRect(-w * 1.2, -h, w * 2.4, h * 2); x.restore() }
  x.fillStyle = INK; rr(x, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20, 52); x.fill()
  x.fillStyle = '#3a3456'; rr(x, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8, 48); x.fill()
  x.fillStyle = '#0a0718'; rr(x, -w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 38); x.fill()
  const sx = -w / 2 + 14, sy = -h / 2 + 14, sw = w - 28, sh = h - 28
  x.save(); rr(x, sx, sy, sw, sh, 34); x.clip()
  const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#1a0f3a'); g.addColorStop(0.6, '#130a2c'); g.addColorStop(1, '#0c0720')
  x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
  if (screen) screen(x, sx, sy, sw, sh)
  x.restore()
  pix(x, -50, -h / 2 + 22, 100, 22, INK)                     // the notch
  x.restore()
}

/** a face-down Align card (the real card-back art if given, else a pixel back), with a charge glow 0…1 */
export function drawCardBack(x, cx, cy, w, t, { img = null, charge = 0, rot = 0, pop = 1, alpha = 1 } = {}) {
  if (pop <= 0 || alpha <= 0) return
  const h = w * 1.5
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(pop, pop)
  if (charge > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, 0, w * 0.2, 0, 0, w * 1.2); g.addColorStop(0, `rgba(160,255,190,${0.55 * charge})`); g.addColorStop(1, 'rgba(160,255,190,0)')
    x.fillStyle = g; x.fillRect(-w * 1.3, -h, w * 2.6, h * 2); x.restore()
  }
  if (img) { const ih = w * img.height / img.width; x.drawImage(img, -w / 2, -ih / 2, w, ih) }
  else { x.fillStyle = '#3a2a8a'; rr(x, -w / 2, -h / 2, w, h, 18); x.fill(); x.strokeStyle = GOLD; x.lineWidth = 4; x.stroke() }
  if (charge > 0) {
    // the chakra column charging bottom → top
    const cols = ['#ff4d4d', '#ff9a2a', '#ffd34d', '#5fe07a', '#4fb8ff', '#6a6aff', '#c77dff']
    for (let i = 0; i < 7; i++) {
      const on = clamp(charge * 7 - i)
      if (on <= 0) continue
      const yy = h * 0.28 - i * h * 0.093
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha *= on
      x.fillStyle = cols[i]; x.beginPath(); x.arc(0, yy, w * 0.045 + 8 * on * (0.6 + 0.4 * Math.sin(t * 8 + i)), 0, Math.PI * 2); x.fill(); x.restore()
    }
  }
  x.restore()
}

// ─────────────────────────────────────────────── chrome
export function showBug(x, t, { alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha = alpha
  x.font = `800 28px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.letterSpacing = '5px'
  const label = 'BETA DIARIES', X = 96, Y = 122
  // a tiny notebook icon
  pix(x, X, Y - 16, 24, 32, INK); pix(x, X + 2, Y - 14, 20, 28, '#3f9a52'); pix(x, X + 2, Y - 14, 5, 28, '#2e7a40'); pix(x, X + 10, Y - 6, 10, 8, BONE)
  x.fillStyle = 'rgba(6,4,18,0.8)'; x.fillText(label, X + 40, Y + 3)
  x.fillStyle = MINT; x.fillText(label, X + 40, Y)
  x.restore()
}

/** a masking-tape title (DOM), a word (never a number). Fully on screen at `at` (frame 0 is the thumbnail), then a tiny shake; pops out at out */
export function tapeTitle(root, { text, at = 0, out = [2.4, 2.7], top = 236, size = 84 }) {
  const box = el('div', { position: 'absolute', left: '0px', width: '1080px', top: top + 'px', display: 'none', textAlign: 'center' }, root)
  const tape = el('div', { display: 'inline-block', padding: '10px 46px 6px', background: 'rgba(244,232,196,0.95)', color: INK, font: `700 ${size}px ${MONO}`, letterSpacing: '0.08em',
    transform: 'rotate(-3deg)', boxShadow: '0 8px 0 rgba(6,4,18,0.55)', clipPath: 'polygon(0% 6%, 3% 0%, 6% 8%, 10% 1%, 50% 3%, 90% 0%, 95% 7%, 100% 2%, 98% 50%, 100% 96%, 94% 100%, 88% 93%, 50% 98%, 8% 100%, 3% 94%, 0% 100%, 2% 50%)' }, box, text)
  void tape
  return {
    update(t) {
      if (t < at || t >= out[1]) { box.style.display = 'none'; return }
      box.style.display = 'block'
      const f = Math.floor((t - at) * 30)
      const sh = t >= at + 0.1 && t < at + 0.1 + 2 / 30 ? (f % 2 ? -8 : 8) : 0
      const o = 1 - ease.inQuad(prog(t, out[0], out[1]))
      box.style.opacity = String(o)
      box.style.transform = `translate(${sh}px, ${(1 - o) * -20}px)`
    },
  }
}

/** headlines: [{ text, at, out: [a, b], top = 360, size = 96, accentSize, accentColor, late = 1, wobble = true }] */
export function heads(root, list) {
  const H = list.map(h => ({ h, p: popText(root, h.text, { top: h.top ?? 360, size: h.size ?? 96, accentSize: h.accentSize ?? Math.round((h.size ?? 96) * 1.45), at: h.at, late: h.late ?? 1, lateAt: h.at + (h.lateDelay ?? 0.35), wobble: h.wobble ?? true, gap: 0.07, accentColor: h.accentColor ?? GOLD, lineHeight: 1.02, fit: true }) }))
  return { update(t) { for (const { h, p } of H) p.update(t, 1 - ease.inQuad(prog(t, h.out[0], h.out[1]))) } }
}
export const headWordCount = text => String(text).split(/\s+/).filter(w => w && w !== '|').length
/** pop cues for a heads() entry: a soft pop per word + the accent landing */
export function headCues(h, { gain = 0.024 } = {}) {
  const n = headWordCount(h.text), late = h.late ?? 1, out = []
  for (let i = 0; i < n - late; i++) out.push(['pop', +(h.at + i * 0.07).toFixed(3), 660 + i * 40, gain, (i % 2 ? 0.2 : -0.2)])
  const la = h.at + (h.lateDelay ?? 0.35)
  out.push(['pop', +la.toFixed(3), 1318.51, gain * 1.8, 0], ['pluck', +la.toFixed(3), 1174.66, gain * 1.6, 0.6, 0])
  return out
}
