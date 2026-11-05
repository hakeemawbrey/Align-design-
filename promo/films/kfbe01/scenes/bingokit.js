// FIRST DATE BINGO: the shared look of kfbe01–kfbe20 (promo/films/month2/m10.md). Lives in kfbe01; every other
// episode imports it from here (read-only for them). No end card, no card transition, no logo: DURATION is the story.
//
// The format:
//   · a first date plays in the scene band (y ≈ 440–1150), drawn by cfg.scene(x, t, S);
//   · a pixel bingo card (3×3 with a FREE centre for shorts, 4×4 for longs) sits below; each square gets slammed by a
//     dauber the moment it happens (cfg.squares[i].at); a full line (cfg.win) = the BINGO slam at cfg.bingoAt;
//   · ♓ Pisces is the show's bingo host in a corner booth with a ball cage, and cries (more with every stamp, a
//     fountain at BINGO). cfg.noHost: the host booth is empty / replaced (cfg.host = false) when Pisces is on the date;
//   · frame 0 is the thumbnail: the hook headline is already on screen and the dauber is mid-slam on the first square;
//   · cfg.ending 'cut' (hold the punchline, last frame = last story frame) or 'loop' (the last LOOP_LEN s ease back
//     into the exact frame-0 picture via the hook kit's loop helper, see kfbe01/scenes/index.js usage).
//
//   makeBingo(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.D (story length, s), cfg.n (3 | 4), cfg.squares [{ text: 'ARRIVED|WAY EARLY', at }] (n·n entries,
//       the free square { free: true }), cfg.win [indexes], cfg.bingoAt, cfg.ink (dauber colour)
//     cfg.heads [{ text, at, out: [a, b], top?, size?, accentSize?, accent?, wobble? }]  (heads[0] = the hook, at < 0)
//     cfg.scene(x, t, S), cfg.over(x, t, S) (drawn above the card, below the headlines), cfg.cues [[name, t, …]]
//     cfg.bubbles [{ t0, t1, x, y, text, size?, tail?, col?, down? }]  speech bubbles drawn above the scene
//     cfg.host { x, y, s } or false · cfg.cardY (top of the card) · cfg.chapters [{ t, text }] (long films)
//     cfg.fx(t) → { zoom, cx, cy, shake, freeze } camera, from the hook kit (whip zoom / record scratch / shake)
// Pure f(t). DOM and canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, loopBack, loopCues } from '../../hookkit.js'
export * as HK from '../../hookkit.js'
import {
  R, box, drawBits, sparkles, hearts, confetti, bubble, label, shadow, glow, table, candle, floor, couch, phoneProp, clockFace,
  starFrame, inSprite, tearsCells, tissues, snowfall, snowGround, notes, HEART,
} from '../../ndbe01/scenes/dealkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', GREEN = '#3fcf7a', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ff7aa8'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inK = (t, a, d = 0.25) => ease.outCubic(prog(t, a, a + d))
export const win01 = (t, a, b, f = 0.18) => Math.min(inK(t, a, f), outK(t, [b - f, b]))
export {
  clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar, el,
  R, box, drawBits, sparkles, hearts, confetti, bubble, label, shadow, glow, table, candle, floor, couch, phoneProp, clockFace,
  starFrame, inSprite, tearsCells, tissues, snowfall, snowGround, notes, HEART,
}

// ── characters
/** a sign star; o: { x, y, s, mood, look, hops, pop, alpha, tears (1–3), seed } */
export function star(x, t, sign, o = {}) {
  const S = sign === 'stars' ? { color: STAR.sky, glyph: null } : sign === 'grey' ? { color: '#a29cba', glyph: null } : signStar(sign)
  const opts = { color: S.color, glyph: o.s >= 150 && o.glyph !== false ? S.glyph : null, seed: o.seed ?? 3, glow: 1.05, ...o }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  return F
}

// ── settings (backgrounds for the scene band; all draw from y = 420 down to the floor line)
/** a cosy café / restaurant: back wall, window with the night sky, string lights, floor */
export function cafe(x, t, { wall = '#2a1d45', trim = '#3d2a5e', floorCol = '#33244a', floorY = 1150, lights = true, win = true, top = 430 } = {}) {
  R(x, wall, 0, top, 1080, floorY - top)
  for (let i = 0; i < 9; i++) R(x, 'rgba(255,255,255,0.025)', i * 130, top, 60, floorY - top)
  R(x, trim, 0, floorY - 120, 1080, 120); R(x, INK, 0, floorY - 126, 1080, 8)
  if (win) {
    box(x, 380, top + 70, 320, 220, '#141033', { b: 10 })
    R(x, '#3d2a5e', 535, top + 70, 10, 220); R(x, '#3d2a5e', 380, top + 175, 320, 10)
    for (let i = 0; i < 7; i++) drawPixelStar(x, 400 + ((i * 97) % 280), top + 90 + ((i * 53) % 180), 10 + (i % 3) * 4, 1, i % 2 ? BONE : GOLD)
  }
  if (lights) for (let i = 0; i < 14; i++) {
    const lx = 20 + i * 78, ly = top + 26 + 22 * Math.sin(i * 0.9 + 0.4) ** 2
    R(x, INK, lx, top + 10, 4, ly - top - 10)
    const on = 0.65 + 0.35 * Math.sin(t * 3 + i * 1.7)
    glow(x, lx + 2, ly + 8, 40, 0.18 * on)
    R(x, INK, lx - 7, ly, 18, 18); R(x, [GOLD, PINK, SKYB, '#9fe6b0'][i % 4], lx - 4, ly + 3, 12, 12)
  }
  floor(x, floorY, floorCol)
}
/** an outdoor night: lamp post, a bench option, grass or path */
export function park(x, t, { floorY = 1150, ground = '#2c4a3a', path = '#5a4a6a', lamp = 860, top = 430 } = {}) {
  for (let i = 0; i < 5; i++) { const hx = i * 260 - 40; R(x, '#1a1438', hx, floorY - 160 - (i % 2) * 60, 300, 200) }
  R(x, INK, 0, floorY - 6, 1080, 8); R(x, ground, 0, floorY, 1080, 1420 - floorY); R(x, path, 0, floorY + 40, 1080, 70)
  if (lamp != null) {
    R(x, INK, lamp - 10, top + 120, 20, floorY - top - 120); R(x, '#4a4070', lamp - 5, top + 120, 10, floorY - top - 120)
    box(x, lamp - 40, top + 80, 80, 50, '#fff1c8', { b: 6 }); glow(x, lamp, top + 105, 320, 0.22)
  }
}
/** a park bench, seat top at y */
export function bench(x, cx, y, w = 560, col = '#8a5a3c') {
  box(x, cx - w / 2, y - 120, w, 22, col, { b: 6, hi: '#a87452' }); box(x, cx - w / 2, y - 70, w, 22, col, { b: 6, hi: '#a87452' })
  box(x, cx - w / 2, y, w, 26, col, { b: 6, hi: '#a87452' })
  R(x, INK, cx - w / 2 + 30, y + 26, 18, 1150 - y - 26); R(x, INK, cx + w / 2 - 48, y + 26, 18, 1150 - y - 26)
}
/** a little plate of food at (cx, cy): kind 'pasta' | 'bread' | 'cake' | 'soup' | 'fries' */
export function dish(x, cx, cy, kind = 'pasta', s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -70, -6, 140, 14, BONE, { b: 5 })
  if (kind === 'pasta') { box(x, -44, -40, 88, 34, '#f0c25a', { b: 5, hi: '#ffd98a' }); R(x, RED, -20, -46, 16, 10); R(x, RED, 10, -42, 14, 8) }
  else if (kind === 'bread') { box(x, -50, -44, 100, 38, '#d8954a', { b: 5, hi: '#f0b46a' }); for (let i = 0; i < 3; i++) R(x, '#a86a30', -30 + i * 26, -36, 12, 6) }
  else if (kind === 'cake') { box(x, -36, -66, 72, 60, '#f4e0c0', { b: 5 }); R(x, PINK, -36, -46, 72, 12); R(x, RED, -8, -82, 16, 16) }
  else if (kind === 'soup') { box(x, -50, -36, 100, 30, '#e8a34a', { b: 5, hi: '#f4c06a' }); R(x, BONE, -40, -40, 80, 6) }
  else if (kind === 'fries') { box(x, -34, -50, 68, 44, RED, { b: 5 }); for (let i = 0; i < 5; i++) R(x, '#ffd23a', -28 + i * 13, -76 + (i % 2) * 8, 9, 30) }
  x.restore()
}

// ── the bingo card
export const CARD = { x: 60, w: 960, head: 64 }
function cardGeom(cfg) {
  const n = cfg.n || 3, top = cfg.cardY ?? (n === 3 ? 1196 : 1170)
  const ch = n === 3 ? 176 : 148, cw = (CARD.w - 24) / n
  return { n, top, ch, cw, x0: CARD.x + 12, y0: top + CARD.head, h: CARD.head + n * ch + 14 }
}
export function cellCenter(cfg, i) { const g = cardGeom(cfg); return { x: g.x0 + (i % g.n + 0.5) * g.cw, y: g.y0 + (Math.floor(i / g.n) + 0.5) * g.ch, w: g.cw, h: g.ch } }

/** wraps the cell text: '|' = forced break; returns lines */
function cellLines(x, text, maxW, size) {
  const out = []
  for (const part of text.split('|')) {
    let cur = ''
    for (const w of part.split(' ')) { const tr = cur ? cur + ' ' + w : w; if (x.measureText(tr).width > maxW && cur) { out.push(cur); cur = w } else cur = tr }
    if (cur) out.push(cur)
  }
  return out
}
/** a dauber blot (round pixel ink splat) */
function blot(x, cx, cy, r, col, k, seed) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= 0.62
  x.fillStyle = col
  const cell = Math.max(4, r / 9), rr = r * ease.outBack(Math.min(1, k * 1.3))
  for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) {
    const d = Math.hypot(i, j) * cell, wob = 1 + 0.08 * Math.sin(i * 1.7 + j * 2.3 + seed)
    if (d < rr * wob) x.fillRect(Math.round(cx + i * cell - cell / 2), Math.round(cy + j * cell - cell / 2), Math.ceil(cell), Math.ceil(cell))
  }
  // splatter specks
  for (let q = 0; q < 7; q++) {
    const a = seed * 1.3 + q * 0.9, d = rr * (1.15 + 0.25 * ((q * 7) % 3))
    x.fillRect(Math.round(cx + Math.cos(a) * d), Math.round(cy + Math.sin(a) * d), cell * (q % 2 ? 1 : 1.6), cell * (q % 2 ? 1 : 1.6))
  }
  x.restore()
}
/** the dauber bottle (falls, slams at t0, lifts) */
export function dauber(x, t, cx, cy, t0, col, { from = -0.16, lift = 0.36 } = {}) {
  if (t < t0 + from || t > t0 + lift + 0.05) return
  let dy, rot
  if (t < t0) { const p = ease.inCubic(prog(t, t0 + from, t0)); dy = lerp(-420, 0, p); rot = lerp(-0.5, -0.15, p) }
  else { const q = ease.inOutCubic(prog(t, t0 + 0.1, t0 + lift)); dy = lerp(0, -520, q); rot = lerp(-0.15, 0.3, q) }
  const sq = t >= t0 && t < t0 + 0.1 ? 0.14 * Math.sin(Math.PI * (t - t0) / 0.1) : 0
  x.save(); x.translate(cx + 30, cy + dy); x.rotate(rot); x.scale(1 + sq, 1 - sq)
  box(x, -30, -40, 60, 34, col, { b: 6 })                       // foam tip
  box(x, -46, -190, 92, 150, '#f4f0ff', { b: 7, hi: '#ffffff' })  // bottle
  R(x, col, -46, -140, 92, 46); R(x, 'rgba(255,255,255,0.35)', -36, -180, 14, 120)
  box(x, -34, -236, 68, 46, col, { b: 7 })                        // cap
  x.restore()
}

/** draws the whole card at time t */
export function drawCard(x, t, cfg, { alpha = 1, slide = 0 } = {}) {
  const g = cardGeom(cfg), ink = cfg.ink || RED
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(0, slide)
  // panel
  R(x, 'rgba(6,4,18,0.55)', CARD.x + 16, g.top + 20, CARD.w, g.h)
  box(x, CARD.x, g.top, CARD.w, g.h, '#fbf3e2', { b: 8 })
  R(x, cfg.cardHead || '#e85a8a', CARD.x, g.top, CARD.w, CARD.head - 6)
  R(x, INK, CARD.x, g.top + CARD.head - 6, CARD.w, 6)
  x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = '#fff'
  x.fillText(cfg.cardTitle || 'FIRST DATE CARD', CARD.x + 26, g.top + 30)
  x.textAlign = 'right'; x.font = `700 28px ${MONO}`; x.fillStyle = 'rgba(255,255,255,0.85)'
  x.fillText(cfg.cardTag || '', CARD.x + CARD.w - 26, g.top + 31)
  const winSet = new Set(cfg.win || []), bk = cfg.bingoAt != null ? prog(t, cfg.bingoAt, cfg.bingoAt + 0.3) : 0
  for (let i = 0; i < g.n * g.n; i++) {
    const sq = cfg.squares[i] || { text: '' }, c = cellCenter(cfg, i)
    const X = c.x - g.cw / 2, Y = c.y - g.ch / 2
    // grid lines
    R(x, '#e4d6bb', X + 4, Y + 4, g.cw - 8, g.ch - 8)
    R(x, '#fbf3e2', X + 8, Y + 8, g.cw - 16, g.ch - 16)
    const flashW = winSet.has(i) && bk > 0 ? 0.5 + 0.5 * Math.sin((t - cfg.bingoAt) * 18) : 0
    if (flashW > 0 && t < cfg.bingoAt + 1.4) { x.save(); x.globalAlpha *= 0.35 * flashW; R(x, GOLD, X + 8, Y + 8, g.cw - 16, g.ch - 16); x.restore() }
    const stamped = sq.free || (sq.at != null && t >= sq.at)
    if (sq.free) blot(x, c.x, c.y, g.ch * 0.36, '#f2b8cc', 1, i + 2)
    else if (sq.at != null) blot(x, c.x, c.y, g.ch * 0.38, sq.ink || ink, prog(t, sq.at, sq.at + 0.12), i + 2)
  }
  // the winning line
  if (bk > 0 && cfg.win && cfg.win.length) {
    const a = cellCenter(cfg, cfg.win[0]), b = cellCenter(cfg, cfg.win[cfg.win.length - 1])
    const p = ease.outCubic(bk), ex = lerp(a.x, b.x, p), ey = lerp(a.y, b.y, p)
    x.save(); x.lineCap = 'round'
    x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(ex, ey); x.stroke()
    x.globalAlpha *= 0.8; x.strokeStyle = GOLD; x.lineWidth = 20; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(ex, ey); x.stroke()
    x.restore()
  }
  for (let i = 0; i < g.n * g.n; i++) {
    const sq = cfg.squares[i] || { text: '' }, c = cellCenter(cfg, i)
    const stamped = sq.free || (sq.at != null && t >= sq.at)
    // the label (wrapped, auto-sized)
    let size = sq.size || (g.n === 3 ? 34 : 27)
    x.font = `800 ${size}px ${INTER}`
    let lines = cellLines(x, sq.free ? 'FREE' : sq.text, g.cw - 30, size)
    while ((lines.length * size * 1.08 > g.ch - 22 || lines.some(l => x.measureText(l).width > g.cw - 24)) && size > 16) { size -= 2; x.font = `800 ${size}px ${INTER}`; lines = cellLines(x, sq.free ? 'FREE' : sq.text, g.cw - 30, size) }
    x.textAlign = 'center'; x.textBaseline = 'middle'
    const lh = size * 1.08, y0 = c.y - (lines.length - 1) * lh / 2 + 2
    lines.forEach((l, j) => {
      if (stamped) { x.lineWidth = 7; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineJoin = 'round'; x.strokeText(l, c.x, y0 + j * lh) }
      x.fillStyle = INK; x.fillText(l, c.x, y0 + j * lh)
    })
  }
  x.restore()
}

// ── the host booth: ♓ Pisces with a ball cage and a dauber, crying (k: tears level)
export function hostBooth(x, t, { x: hx = 925, y: hy = 600, s = 120, tears = 1, mood = 'wide', look = [-1, 0.6], hops = [], pop = 1, alpha = 1 } = {}) {
  if (pop <= 0.01 || alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  const k = pop
  // the ball cage (spinning wire wheel with balls)
  const cx = hx - s * 0.95, cy = hy + s * 0.12, r = s * 0.42 * k
  x.save(); x.translate(cx, cy)
  R(x, INK, -6, r * 0.6, 12, r * 0.9); box(x, -r * 0.8, r * 1.5, r * 1.6, 10, '#8a5a3c', { b: 4 })
  x.strokeStyle = INK; x.lineWidth = 9; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke()
  const sp = t * 4
  for (let i = 0; i < 4; i++) { const a = sp + i * Math.PI / 4; R(x, GOLD, Math.cos(a) * -r, Math.sin(a) * -r, 3, 3); x.save(); x.rotate(a); R(x, 'rgba(242,199,92,0.7)', -r, -2, 2 * r, 4); x.restore() }
  for (let i = 0; i < 6; i++) { const a = sp * 0.7 + i * 1.05, rr = r * (0.3 + 0.12 * (i % 3)); R(x, INK, Math.cos(a) * rr - 8, Math.sin(a) * rr + r * 0.25 - 8, 16, 16); R(x, [RED, SKYB, GOLD, PINK, GREEN, LAV][i], Math.cos(a) * rr - 5, Math.sin(a) * rr + r * 0.25 - 5, 10, 10) }
  x.restore()
  // Pisces
  const F = star(x, t, 'pisces', { x: hx, y: hy, s: s * k, mood, look, hops, seed: 6, glow: 0.85, tears, tips: false })
  // big cartoon tear streams (readable at phone size)
  if (tears >= 2) for (const d of [-1, 1]) for (let q = 0; q < (tears >= 3 ? 6 : 3); q++) {
    const ph = ((t * (tears >= 3 ? 1.6 : 1.1) + q / 6 + (d > 0 ? 0.3 : 0)) % 1)
    const ex = F.ox + d * s * 0.2, ey = F.oy - F.base - s * 0.02
    const px = ex + d * (tears >= 3 ? 70 : 18) * ph, py = ey + (tears >= 3 ? -30 * ph + 150 * ph * ph : 90 * ph * ph)
    R(x, INK, px - 7, py - 7, 14, 18); R(x, '#8fe3ff', px - 4, py - 4, 8, 12); R(x, '#fff', px - 4, py - 4, 4, 4)
  }
  // the desk in front
  const dw = s * 1.15, dy = hy + s * 0.56
  box(x, hx - dw / 2, dy, dw, s * 0.42, '#e85a8a', { b: 6, hi: '#ff86ad' })
  x.font = `800 ${Math.round(s * 0.2)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'
  x.fillText('HOST', hx, dy + s * 0.22)
  x.restore()
  return F
}

// ── the series bug: "FIRST DATE BINGO" (Inter 800 small caps, letter-spaced, top-left)
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '22px', height: '22px', borderRadius: '50%', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,122,168,0.7)` }, b)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'FIRST&nbsp;DATE<span style="color:rgba(255,255,255,0.75)">&nbsp;BINGO</span>')
  return { update() {} }
}

// ── BINGO! slam (DOM)
function buildBingo(root, { text = 'BINGO!', col = GOLD, top = 560 } = {}) {
  const wrap = el('div', { position: 'absolute', left: 0, top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const s = el('div', { font: `900 210px ${INTER}`, letterSpacing: '-0.03em', color: col, WebkitTextStroke: `10px ${INK}`, paintOrder: 'stroke fill', textShadow: '12px 14px 0 rgba(6,4,18,0.75)', whiteSpace: 'nowrap', transform: 'rotate(-6deg)' }, wrap, text)
  return {
    update(t, at, end) {
      const on = at != null && t >= at && t < end
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at, at + 0.16), o = outK(t, [end - 0.2, end])
      const sc = lerp(2.2, 1, ease.outCubic(p)) * (1 + 0.05 * Math.exp(-(t - at) * 6) * Math.sin((t - at) * 30))
      s.style.opacity = String(clamp(p * 3) * o)
      s.style.transform = `rotate(${(-6 + 3 * Math.sin((t - at) * 3)).toFixed(2)}deg) scale(${(sc * lerp(0.6, 1, o)).toFixed(4)})`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeBingo(cfg) {
  const D = cfg.D, ink = cfg.ink || RED
  const stamps = cfg.squares.map((s, i) => ({ ...s, i })).filter(s => !s.free && s.at != null).sort((a, b) => a.at - b.at)
  const bingoEnd = cfg.bingoEnd ?? Math.min(D + 1, (cfg.bingoAt ?? D) + 1.5)
  const hostTears = t => cfg.hostTears ? cfg.hostTears(t) : (cfg.bingoAt != null && t >= cfg.bingoAt ? 3 : stamps.filter(s => t >= s.at).length >= 2 ? 2 : 1)
  const hostHops = [...stamps.map(s => s.at + 0.05), ...(cfg.bingoAt != null ? [cfg.bingoAt, cfg.bingoAt + 0.4, cfg.bingoAt + 0.8] : [])]

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "900 210px Inter", "800 34px Inter", "800 30px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const world = el('div', { position: 'absolute', inset: 0, transformOrigin: '540px 960px' }, root)
    const cv = layerCanvas(world), x = cv.getContext('2d')
    const headLayer = el('div', { position: 'absolute', inset: 0, pointerEvents: 'none' }, root)
    const heads = (cfg.heads || []).map(h => ({ h, P: popText(headLayer, h.text, { top: h.top ?? 150, size: h.size ?? 92, accentSize: h.accentSize ?? 128, at: h.at, gap: h.gap ?? 0.07, accentColor: h.accent || GOLD, wobble: h.wobble, fit: true, late: h.late || 0, lateAt: h.lateAt ?? null }) }))
    const top = layerCanvas(world), tx = top.getContext('2d')
    const bingo = buildBingo(world, cfg.bingoStyle || {})
    const extra = cfg.dom ? cfg.dom(world, root) : null
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function frame(tIn) {
      // the camera / time effects (hook kit): time may freeze (record scratch), the world may whip-zoom or shake
      const fx = cfg.fx ? cfg.fx(tIn) : {}
      const t = fx.t ?? tIn
      drawSky(x, t, SKY_H)
      const S = { t, u: t, star, hostTears: hostTears(t), fx }
      cfg.scene(x, t, S)
      for (const b of cfg.bubbles || []) bubble(x, t, b.x, b.y, b.t0, b.t1, b.text, { size: b.size || 34, tail: b.tail || 0, col: b.col || BONE, down: b.down ?? true })
      if (cfg.host !== false) {
        const H = cfg.host || {}
        hostBooth(x, t, { x: H.x ?? 940, y: H.y ?? 520, s: H.s ?? 150, tears: hostTears(t), mood: cfg.bingoAt != null && t > cfg.bingoAt ? 'sparkle' : 'wide', look: H.look || [-1, 0.6], hops: hostHops, alpha: H.alpha ? H.alpha(t) : 1 })
      }
      const cA = cfg.cardAlpha ? cfg.cardAlpha(t) : 1, cS = cfg.cardSlide ? cfg.cardSlide(t) : 0
      drawCard(x, t, cfg, { alpha: cA, slide: cS })
      if (cfg.over) cfg.over(x, t, S)
      tx.clearRect(0, 0, 1080, 1920)
      tx.save(); tx.translate(0, cS)
      for (const s of stamps) { const c = cellCenter(cfg, s.i); dauber(tx, t, c.x, c.y, s.at, s.ink || ink); sparkles(tx, t, c.x, c.y, s.at + 0.02, 8, 90, s.i, [s.ink || ink, BONE, GOLD]) }
      tx.restore()
      if (cfg.bingoAt != null) { confetti(tx, t, cfg.bingoAt, 540, 720, { n: 34 }); sparkles(tx, t, 540, 700, cfg.bingoAt + 0.02, 16, 420, 1, [GOLD, PINK, BONE]) }
      if (cfg.top) cfg.top(tx, t, S)
      for (const { h, P } of heads) P.update(t, h.out ? outK(t, h.out) : 1)
      bingo.update(t, cfg.bingoAt, bingoEnd)
      if (extra && extra.update) extra.update(t, S)
      // camera
      const z = fx.zoom ?? 1, sh = fx.shake ?? 0
      const sx = sh ? sh * Math.sin(tIn * 91) : 0, sy = sh ? sh * Math.cos(tIn * 77) : 0
      // the stamp micro-shake
      let ss = 0
      for (const s of stamps) { const d = tIn - s.at; if (d >= 0 && d < 0.3) ss = Math.max(ss, 9 * Math.exp(-d * 12)) }
      if (cfg.bingoAt != null) { const d = tIn - cfg.bingoAt; if (d >= 0 && d < 0.5) ss = Math.max(ss, 22 * Math.exp(-d * 7)) }
      const ssy = ss * Math.sin(tIn * 70)
      world.style.transform = `translate(${(sx).toFixed(2)}px, ${(sy + ssy).toFixed(2)}px) scale(${z.toFixed(4)})`
      world.style.transformOrigin = `${fx.cx ?? 540}px ${fx.cy ?? 960}px`
      const fl = Math.max(fx.flash ?? 0, cfg.bingoAt != null && tIn >= cfg.bingoAt && tIn < cfg.bingoAt + 0.12 ? 0.7 * (1 - (tIn - cfg.bingoAt) / 0.12) : 0)
      flash.style.opacity = String(0.4 * fl)
      flash.style.background = fx.flashCol || '#fff6ea'
      drawGrain(gx, t)
    }

    return { start: 0, end: D + 0.01, root, update: frame }
  }

  // the hook kit: slam-in hook title on frame 0, a whip zoom (cut films: frame 0 mid-zoom), an optional record scratch,
  // any extra effects [[factory, cuesFn, opts]], and the loop helper for loop endings
  const HOOK = cfg.hook ? { at: -1, top: 150, size: 100, shake: 10, ...cfg.hook } : null
  const WHIP = cfg.whip === false ? null : { at: cfg.ending === 'loop' ? 0.3 : -0.15, from: 1.3, len: 0.5, blur: 7, cy: 880, ...(cfg.whip || {}) }
  const RECS = cfg.rec ? [].concat(cfg.rec) : []
  const main = RECS.length ? frozen(build, RECS) : build
  const effects = cfg.effects || []
  const SCENES = [main, ...(cfg.layers || []), ...(WHIP ? [whipZoom(WHIP)] : []), ...(HOOK ? [slamTitle(HOOK)] : []), ...RECS.map(r => recordScratch(r)), ...effects.map(([f, , o]) => f(o))]
  if (cfg.ending === 'loop') SCENES.push(loopBack([main, ...(HOOK ? [slamTitle(HOOK)] : [])], { duration: D, len: cfg.loopLen || 0.4 }))
  const KITCUES = [...(WHIP ? whipZoomCues(WHIP) : []), ...(HOOK ? slamTitleCues(HOOK) : []), ...RECS.flatMap(r => recordScratchCues(r)), ...effects.flatMap(([, c, o]) => c ? c(o) : []), ...(cfg.ending === 'loop' ? loopCues({ duration: D, len: cfg.loopLen || 0.4 }) : [])]
  // guard: no line may complete before the planned BINGO
  { const n = cfg.n || 3, at = i => cfg.squares[i]?.free ? -1e9 : (cfg.squares[i]?.at ?? 1e9), lines = []
    for (let r = 0; r < n; r++) { lines.push([...Array(n)].map((_, c) => r * n + c)); lines.push([...Array(n)].map((_, c) => c * n + r)) }
    lines.push([...Array(n)].map((_, i) => i * n + i)); lines.push([...Array(n)].map((_, i) => i * n + n - 1 - i))
    for (const L of lines) { const done = Math.max(...L.map(at)); if (cfg.bingoAt != null && done < cfg.bingoAt - 0.3 && L.join() !== (cfg.win || []).join()) { if (typeof console !== 'undefined') console.warn(`[${cfg.id}] line ${L} completes at ${done} before BINGO ${cfg.bingoAt}`) } } }
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ...stamps.filter(s => s.at >= 0).flatMap((s, k) => [['whoosh', r3(Math.max(0, s.at - 0.14)), 0.2, 0.025], ['tom', r3(s.at), 110 + 8 * k, { gain: 0.26, decay: 0.18 }], ['tick', r3(s.at), 0.06], ['pop', r3(s.at + 0.02), NOTE[(k * 2) % 7], 0.04, 0]]),
    ...stamps.filter(s => s.at < 0 && s.at > -0.2).flatMap(s => [['tom', 0, 110, { gain: 0.22, decay: 0.15 }], ['pop', 0.01, NOTE[0], 0.035, 0]]),
    ...(cfg.bingoAt != null ? [['boom', r3(cfg.bingoAt), 0.32], ['tom', r3(cfg.bingoAt), 82, { gain: 0.32, decay: 0.3 }], ['bell', r3(cfg.bingoAt + 0.05), 1760, 0.035, 1.2, 0], ['bell', r3(cfg.bingoAt + 0.18), 2349.32, 0.025, 1.0, 0.2], ['glitter', r3(cfg.bingoAt + 0.02), r3(cfg.bingoAt + 0.7)]] : []),
    ...(cfg.heads || []).flatMap((h, i) => h.at >= 0 ? [['pop', r3(h.at), NOTE[(i * 3) % 7], 0.03, 0], ['pop', r3(h.at + 0.1), NOTE[(i * 3 + 2) % 7], 0.025, 0.2]] : []),
    ...(cfg.bubbles || []).map(b => ['pop', r3(Math.max(0, b.t0)), 880, 0.03, b.x < 540 ? -0.3 : 0.3]),
    ...(cfg.cues || []).map(c => [c[0], r3(c[1]), ...c.slice(2)]),
    ...KITCUES,
  ].filter(c => c[1] >= 0 && c[1] <= D)
  return { DURATION: D, SCENES, CUES }
}

/** the score block for cues.js (no end card: the outro lands on the last beat) */
export function bingoMusic({ style, key, seed, D, drop = 1.2, breakdown = [], lift = [], hits = [] }) {
  return { style, key, seed, sections: { drop, breakdown, lift, outroAt: Math.max(drop + 2, D - 1.0) }, hits }
}
