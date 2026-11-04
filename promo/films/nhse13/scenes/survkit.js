// HOLIDAY SURVIVAL GUIDE kit for episodes 13–24 (promo/films/next30/b30.md). nhse14–24 import it from here, so the
// twelve films look like one show. Everything draws as a pure function of t; DOM and canvases are only made in build().
//
// The format (28 s = 25.6 s story + the shared 2.4 s short end card; no Align card transition):
//   0.0–5.4    SITUATION: the hook headline is already up at frame 0, a yellow SITUATION tape under it, the set (a framed
//              diorama) with the sign(s) mid-action, and a caption sticker naming the situation.
//   5.4–17.4   THE GUIDE: a cream survival-manual page slides up with three steps (4 s each). Each step pops its row,
//              plays its vignette above the page and gets a red tick at +3.0 s. Headline: cfg.guide.
//   17.4–25.6  THE STARS: they pop in bottom-left with one line in the dialogue box; the set comes back resolved
//              (cfg.set with S.end = true); headline cfg.endHead, then the last line at 21.4.
// Pisces cries in every film: the kit's Pisces peeks over the manual during the guide; each episode's set adds its own.
//
//   makeSurvival(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.no (episode number), cfg.hook, cfg.situation (sticker text), cfg.guide, cfg.endHead, cfg.line (THE STARS),
//     cfg.last, cfg.accent (headline accent colour), cfg.steps: [{ text, draw(x, t, S), cues: [[kind, u, ...]] }] × 3,
//     cfg.set(x, t, S) the situation / ending set (S.end false / true, S.u local time), cfg.guideBg(x, t, S) optional,
//     cfg.images: ['card-talk-1.png', …] → S.img[name], cfg.cues: extra absolute cues, cfg.pisSteps (default true).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_SHORT_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e8344e', MINT = '#9ff0e0'
export const PAPER = '#f4ecd8', PAPER_D = '#ddd0b2', SNOW = '#f4f8ff', TAPE = '#ffd84a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const STORY_END = 25.6
export const DURATION = +(STORY_END + ENDCARD_SHORT_LEN).toFixed(2)   // 28 (the 2.4 s short end card)
export const T = {
  sitEnd: 5.4, steps: [5.4, 9.4, 13.4], tick: 3.0, guideEnd: 17.4,
  manIn: [5.4, 5.78], manOut: [17.05, 17.4],
  hookOut: [5.05, 5.35], guideHead: 5.55, guideOut: [17.0, 17.3],
  starsIn: 17.5, boxOpen: 17.75, line: 18.0, endHead: 17.6, endOut: [21.0, 21.3],
  last: 21.4, lastLate: 21.85, out: [25.15, 25.5],
}
export const CPS = 30
export const STARS = 'THE STARS'

// ─────────────────────────────────────────────── little drawing helpers (canvas, pure)
const RR = Math.round
export const R = (x, c, X, Y, w, h) => { x.fillStyle = c; x.fillRect(RR(X), RR(Y), RR(w), RR(h)) }
/** an ink-outlined block with an optional top highlight */
export function box(x, X, Y, w, h, c, { b = 6, hi = null, ink = INK } = {}) {
  R(x, ink, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, c, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(4, h * 0.12))
}
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
/** little hearts floating up from (cx, cy) after t0 */
export function hearts(x, t, t0, cx, cy, { n = 5, life = 1.6, col = PINK, spread = 120 } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.14, p = prog(t, b, b + life)
    if (p <= 0 || p >= 1) continue
    drawBits(x, HEART, { H: col }, cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(p * 6 + i) * 14, cy - p * 220, 5 * (0.6 + 0.4 * Math.sin(Math.PI * p)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** soft floor shadow */
export function shadow(x, cx, cy, w) {
  if (w <= 0) return
  x.save(); x.fillStyle = 'rgba(6,4,18,0.35)'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore()
}
/** a speech bubble that pops at t0 and pops out at t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { size = 34, col = BONE, ink = INK, tail = 0, font = INTER, weight = 700, maxW = 620 } = {}) {
  const k = pop01(t, t0, 0.26, 2.4) * outK(t, [t1 - 0.2, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = wrapWords(x, text, maxW)
  const lw = Math.max(...lines.map(l => x.measureText(l).width)), lh = size * 1.18
  const w = lw + 44, h = lines.length * lh + 26
  R(x, ink, -w / 2 - 5, -h / 2, w + 10, h); R(x, ink, -w / 2, -h / 2 - 5, w, h + 10)
  R(x, col, -w / 2, -h / 2, w, h)
  const tx = tail * w * 0.4
  R(x, ink, tx - 14, h / 2 + 2, 16, 14); R(x, col, tx - 9, h / 2 - 2, 9, 11)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 13 + lh * (i + 0.5) + 1))
  x.restore()
}
export function wrapWords(x, text, maxW) {
  const out = []; let cur = ''
  for (const w of String(text).split(' ')) { const s = cur ? cur + ' ' + w : w; if (cur && x.measureText(s).width > maxW) { out.push(cur); cur = w } else cur = s }
  if (cur) out.push(cur)
  return out
}
/** a centred label */
export function label(x, text, cx, cy, { size = 36, col = BONE, font = INTER, weight = 800, rot = 0, alpha = 1, stroke = INK, align = 'center' } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  if (stroke) { x.lineWidth = Math.max(4, size * 0.16); x.lineJoin = 'round'; x.strokeStyle = stroke; x.strokeText(text, 0, 0) }
  x.fillStyle = col; x.fillText(text, 0, 0); x.restore()
}
/** gently falling pixel snow inside a rect */
export function snow(x, t, { X = 0, Y = 0, w = 1080, h = 1920, n = 40, alpha = 0.8, seed = 1, speed = 60 } = {}) {
  x.save(); x.globalAlpha *= alpha
  for (let i = 0; i < n; i++) {
    const a = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453, fx = a - Math.floor(a)
    const b = Math.sin(i * 39.346 + seed * 11.135) * 24634.6345, fy = b - Math.floor(b)
    const sz = 4 + (i % 3) * 3
    const py = Y + ((fy * h + t * speed * (0.6 + 0.2 * (i % 3))) % h)
    const px = X + ((fx * w + Math.sin(t * 0.9 + i) * 18) % w + w) % w
    R(x, SNOW, px, py, sz, sz)
  }
  x.restore()
}

// ── the diorama: every set is drawn inside one framed panel so all twelve episodes share a look
export const PANEL = { x: 60, y: 440, w: 960, h: 820 }
/** wall + floor inside the panel; returns the floor line. Call clipPanel around the set contents. */
export function room(x, { wall = '#2b2350', wall2 = null, floor = '#4a3b66', floorY = 1090, stripes = true, P = PANEL } = {}) {
  R(x, wall, P.x, P.y, P.w, floorY - P.y)
  if (stripes) for (let i = 0; i < 12; i++) R(x, wall2 || 'rgba(255,255,255,0.04)', P.x + i * 84, P.y, 38, floorY - P.y)
  R(x, INK, P.x, floorY - 6, P.w, 10)
  R(x, floor, P.x, floorY + 4, P.w, P.y + P.h - floorY - 4)
  for (let i = 0; i < 8; i++) R(x, 'rgba(255,255,255,0.05)', P.x, floorY + 30 + i * 26, P.w, 4)
  return floorY
}
export function clipPanel(x, fn, P = PANEL) { x.save(); x.beginPath(); x.rect(P.x, P.y, P.w, P.h); x.clip(); fn(); x.restore() }
export function panelFrame(x, t, { P = PANEL, col = GOLD, alpha = 1 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  R(x, INK, P.x - 14, P.y - 14, P.w + 28, 14); R(x, INK, P.x - 14, P.y + P.h, P.w + 28, 14)
  R(x, INK, P.x - 14, P.y, 14, P.h); R(x, INK, P.x + P.w, P.y, 14, P.h)
  R(x, col, P.x - 8, P.y - 8, P.w + 16, 4); R(x, col, P.x - 8, P.y + P.h + 4, P.w + 16, 4)
  R(x, col, P.x - 8, P.y - 8, 4, P.h + 16); R(x, col, P.x + P.w + 4, P.y - 8, 4, P.h + 16)
  // four little pixel snowflake studs in the corners
  for (const [cx, cy] of [[P.x - 6, P.y - 6], [P.x + P.w + 6, P.y - 6], [P.x - 6, P.y + P.h + 6], [P.x + P.w + 6, P.y + P.h + 6]]) drawBits(x, ['.S.', 'SSS', '.S.'], { S: MINT }, cx, cy, 6)
  x.restore()
  void t
}

// ── props
export function sofa(x, cx, cy, w, col = '#7a4a8a') {
  box(x, cx - w / 2, cy - 150, w, 90, col, { hi: 'rgba(255,255,255,0.15)' })
  box(x, cx - w / 2 - 40, cy - 110, 60, 110, col); box(x, cx + w / 2 - 20, cy - 110, 60, 110, col)
  box(x, cx - w / 2 + 20, cy - 70, w - 40, 60, col, { hi: 'rgba(255,255,255,0.18)' })
  R(x, INK, cx - w / 2 - 30, cy, 20, 26); R(x, INK, cx + w / 2 + 10, cy, 20, 26)
}
export function door(x, cx, floorY, { w = 230, h = 400, col = '#b8423a', wreath = true, open = 0, light = '#ffe2a0' } = {}) {
  box(x, cx - w / 2 - 16, floorY - h - 16, w + 32, h + 16, '#5a3a2a')
  R(x, light, cx - w / 2, floorY - h, w, h)
  const dw = w * (1 - 0.82 * open)
  box(x, cx - w / 2, floorY - h, dw, h, col, { b: 4, hi: 'rgba(255,255,255,0.12)' })
  if (open < 0.5) {
    R(x, 'rgba(0,0,0,0.18)', cx - w / 2 + 24, floorY - h + 30, dw - 48, h * 0.36); R(x, 'rgba(0,0,0,0.18)', cx - w / 2 + 24, floorY - h * 0.52, dw - 48, h * 0.4)
    R(x, GOLD, cx - w / 2 + dw - 40, floorY - h * 0.5, 16, 16)
    if (wreath) drawBits(x, ['..GGGG..', '.GGRGGG.', 'GGG..GGG', 'GR....RG', 'GG....GG', 'GGG..GGG', '.GGGRGG.', '..GGGG..'], { G: '#2f9a5a', R: RED }, cx - w / 2 + dw / 2, floorY - h + 90, 9)
  }
}
export function table(x, cx, floorY, w = 520, { col = '#8a5a3a', cloth = '#c8283c' } = {}) {
  const top = floorY - 150
  box(x, cx - w / 2, top, w, 30, col, { hi: 'rgba(255,255,255,0.18)' })
  if (cloth) { R(x, cloth, cx - w / 2 - 6, top - 6, w + 12, 18); for (let i = 0; i < w / 40; i++) R(x, '#fff1c8', cx - w / 2 + i * 40 + 8, top + 2, 16, 6) }
  R(x, INK, cx - w / 2 + 30, top + 30, 22, 120); R(x, INK, cx + w / 2 - 52, top + 30, 22, 120)
  return top
}
export function mug(x, cx, cy, col = '#e8344e', steam = 0, t = 0) {
  box(x, cx - 22, cy - 40, 44, 40, col, { b: 5, hi: 'rgba(255,255,255,0.25)' }); R(x, INK, cx + 22, cy - 32, 14, 6); R(x, INK, cx + 30, cy - 32, 6, 22); R(x, INK, cx + 22, cy - 16, 14, 6)
  R(x, '#6a3a22', cx - 18, cy - 38, 36, 6)
  if (steam > 0) for (let i = 0; i < 3; i++) { const p = ((t * 0.8 + i / 3) % 1); x.save(); x.globalAlpha = steam * 0.6 * Math.sin(Math.PI * p); R(x, BONE, cx - 12 + i * 10 + Math.sin(p * 6 + i) * 6, cy - 54 - p * 60, 6, 10); x.restore() }
}
export function windowPane(x, cx, cy, w, h, t, { night = true, snowing = true, frame = '#e8dcc4' } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, night ? '#141a3e' : '#9fd0f0', { b: 8 })
  if (night) { x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); for (let i = 0; i < 6; i++) drawPixelStar(x, cx - w / 2 + 30 + ((i * 97) % (w - 60)), cy - h / 2 + 30 + ((i * 53) % (h * 0.5)), 12, 1, BONE); if (snowing) snow(x, t, { X: cx - w / 2, Y: cy - h / 2, w, h, n: 14, speed: 40, seed: cx }); x.restore() }
  R(x, frame, cx - 4, cy - h / 2, 8, h); R(x, frame, cx - w / 2, cy - 4, w, 8)
  R(x, frame, cx - w / 2 - 14, cy + h / 2 + 4, w + 28, 14)
}
/** a wall calendar page; mark = { day, kind: 'heart' | 'circle' | 'x', k } */
export function calendar(x, cx, cy, s = 1, { title = 'DECEMBER', marks = [], first = 2, days = 31 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -170, -150, 340, 300, PAPER, { b: 6 })
  R(x, RED, -170, -150, 340, 56)
  x.font = `700 28px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -122)
  for (let d = 1; d <= days; d++) {
    const i = (d - 1 + first) % 7, j = Math.floor((d - 1 + first) / 7)
    const gx = -150 + i * 43 + 18, gy = -70 + j * 42 + 14
    x.font = `700 18px ${MONO}`; x.fillStyle = INK; x.fillText(String(d), gx, gy)
    for (const m of marks) if (m.day === d && (m.k ?? 1) > 0) {
      const k = m.k ?? 1
      if (m.kind === 'heart') drawBits(x, HEART, { H: RED }, gx, gy, 4.5 * k, { outline: null })
      else if (m.kind === 'x') { x.strokeStyle = RED; x.lineWidth = 4; x.beginPath(); x.moveTo(gx - 14 * k, gy - 14 * k); x.lineTo(gx + 14 * k, gy + 14 * k); x.moveTo(gx + 14 * k, gy - 14 * k); x.lineTo(gx - 14 * k, gy + 14 * k); x.stroke() }
      else { x.strokeStyle = RED; x.lineWidth = 4; x.beginPath(); x.arc(gx, gy, 19 * k, 0, Math.PI * 2 * Math.min(1, k)); x.stroke() }
    }
  }
  x.restore()
}
/** a pixel wall clock */
export function clockFace(x, cx, cy, r, hh, mm) {
  box(x, cx - r, cy - r, 2 * r, 2 * r, BONE, { b: 6 })
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, cx + Math.sin(a) * r * 0.8 - 3, cy - Math.cos(a) * r * 0.8 - 3, 6, 6) }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2, ma = mm / 60 * Math.PI * 2
  x.save(); x.lineCap = 'square'; x.strokeStyle = INK
  x.lineWidth = 8; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(ha) * r * 0.5, cy - Math.cos(ha) * r * 0.5); x.stroke()
  x.lineWidth = 5; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(ma) * r * 0.75, cy - Math.cos(ma) * r * 0.75); x.stroke()
  x.restore(); R(x, RED, cx - 5, cy - 5, 10, 10)
}
/** a pixel phone with a little chat: msgs [{ side: 'L'|'R', text, at, name }] */
export function phone(x, t, { cx, cy, w = 380, h = 620, title = '', msgs = [], rot = 0, pop = 1, accent = '#38c4ec', typing = null, size = 26 } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(pop, pop)
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 8 })
  R(x, '#120d26', -w / 2 + 16, -h / 2 + 50, w - 32, h - 90)
  R(x, INK, -40, -h / 2 + 20, 80, 10)
  x.font = `700 22px ${MONO}`; x.fillStyle = accent; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 74)
  x.save(); x.beginPath(); x.rect(-w / 2 + 16, -h / 2 + 96, w - 32, h - 136); x.clip()
  x.font = `600 ${size}px ${INTER}`
  const shown = msgs.filter(m => t >= m.at)
  const lay = shown.map(m => { const lines = wrapWords(x, m.text, w - 120); return { m, lines, hh: lines.length * size * 1.2 + 22 + (m.name ? 26 : 0) } })
  let y = h / 2 - 50 - (typing && t > typing[0] && t < typing[1] ? 60 : 0)
  for (let i = lay.length - 1; i >= 0; i--) {
    const { m, lines, hh } = lay[i]
    y -= hh + 12
    const k = pop01(t, m.at, 0.22, 2.2)
    const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 34
    const bx = m.side === 'R' ? w / 2 - 28 - bw : -w / 2 + 28
    x.save(); x.translate(bx + bw / 2, y + hh / 2); x.scale(k, k); x.translate(-(bx + bw / 2), -(y + hh / 2))
    let yy = y
    if (m.name) { x.font = `700 18px ${MONO}`; x.fillStyle = m.nameCol || accent; x.textAlign = 'left'; x.fillText(m.name, bx + 4, yy + 10); yy += 26; x.font = `600 ${size}px ${INTER}` }
    const bh = hh - (m.name ? 26 : 0)
    box(x, bx, yy, bw, bh, m.side === 'R' ? accent : BONE, { b: 4 })
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    lines.forEach((l, j) => x.fillText(l, bx + 17, yy + 11 + size * 1.2 * (j + 0.5)))
    x.restore()
  }
  if (typing && t > typing[0] && t < typing[1]) { box(x, -w / 2 + 28, h / 2 - 104, 110, 46, BONE, { b: 4 }); for (let i = 0; i < 3; i++) R(x, INK, -w / 2 + 52 + i * 24, h / 2 - 86 - 6 * Math.max(0, Math.sin(t * 9 - i)), 12, 12) }
  x.restore(); x.restore()
}

// ── characters
const SEEDS = { aries: 3, taurus: 9, gemini: 4, cancer: 7, leo: 5, virgo: 8, libra: 10, scorpio: 12, sagittarius: 13, capricorn: 14, aquarius: 11, pisces: 6 }
/** a sign star: o = { x, y, s, mood, look, hops, pop, alpha, squash, blush } */
export function star(x, t, sign, o) {
  const S = signStar(sign)
  return drawStarChar(x, o.x, o.y, o.s, t, { color: S.color, glyph: S.glyph, seed: SEEDS[sign] ?? 1, glow: 0.8, ...o })
}
// sprite frame (mirrors startalk.js drawStarChar) so tears and props sit on the sprite through hops and squash
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
function hopState(t, hops) {
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
export function starFrame(X, Y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = Y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(X), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(Math.round(px * 2) / 2, Math.round(py * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** Pisces, crying (tears 1–3); o = { x, y, s, tears, mood, look, hops, pop, alpha, tissue } */
export function pisces(x, t, o) {
  const opts = { mood: 'wide', look: [-1, 0], seed: 6, ...o }
  star(x, t, 'pisces', opts)
  const F = starFrame(o.x, o.y, o.s, t, { pop: o.pop ?? 1, hops: o.hops, seed: 6, squash: o.squash ?? 0 })
  if ((o.tears ?? 2) > 0 && (o.pop ?? 1) > 0.3 && (o.alpha ?? 1) > 0.3) inSprite(x, F, () => tearsCells(x, t, o.tears ?? 2))
  if (o.tissue) inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(29.5, 19.5, 7, 7); x.fillStyle = '#ffffff'; x.fillRect(30, 20, 6, 6); x.fillRect(31, 17.5, 3, 3) })
}
/** THE STARS (gold narrator star) */
export function theStars(x, t, o) { return drawStarChar(x, o.x, o.y, o.s, t, { color: STAR.sky, seed: 2, glow: 1.05, ...o }) }

// ─────────────────────────────────────────────── rich text on canvas (*accent* = Garamond italic, red)
function tok(text) {
  const out = []; let open = false
  for (const w of String(text).split(/\s+/)) {
    if (!w) continue
    const n = (w.match(/\*/g) || []).length
    out.push({ w: w.replace(/\*/g, ''), acc: open || n > 0 })
    if (n % 2) open = !open
  }
  return out
}
function richLayout(x, text, maxW, size) {
  const fN = `700 ${size}px ${INTER}`, fA = `italic 600 ${Math.round(size * 1.18)}px ${SERIF}`
  const lines = [[]]; let w = 0
  x.font = fN; const sp = x.measureText(' ').width
  for (const t of tok(text)) {
    x.font = t.acc ? fA : fN
    const ww = x.measureText(t.w).width
    if (w > 0 && w + sp + ww > maxW) { lines.push([]); w = 0 }
    lines[lines.length - 1].push({ ...t, x: w ? w + sp : 0, ww }); w += (w ? sp : 0) + ww
  }
  return { lines, fN, fA, width: Math.max(...lines.map(l => l.length ? l[l.length - 1].x + l[l.length - 1].ww : 0)) }
}
export function richText(x, text, X, Y, maxW, size, { col = INK, acc = RED, lh = 1.12, alpha = 1 } = {}) {
  const L = richLayout(x, text, maxW, size)
  x.save(); x.globalAlpha *= alpha; x.textBaseline = 'alphabetic'; x.textAlign = 'left'
  L.lines.forEach((line, j) => { for (const t of line) { x.font = t.acc ? L.fA : L.fN; x.fillStyle = t.acc ? acc : col; x.fillText(t.w, X + t.x, Y + j * size * lh) } })
  x.restore()
  return L.lines.length
}

// ─────────────────────────────────────────────── the survival manual page
const MAN = { x: 90, y: 1250, w: 900, h: 590, head: 74, row: 160 }
function checkbox(x, cx, cy, tickP, hi) {
  box(x, cx - 26, cy - 26, 52, 52, hi ? '#fff6c8' : '#ffffff', { b: 5 })
  if (tickP > 0) {
    // the red tick draws on in two strokes
    x.save(); x.strokeStyle = RED; x.lineWidth = 11; x.lineCap = 'square'; x.lineJoin = 'miter'
    const p1 = clamp(tickP / 0.35), p2 = clamp((tickP - 0.35) / 0.65)
    x.beginPath(); x.moveTo(cx - 20, cy - 2); x.lineTo(cx - 20 + 16 * p1, cy - 2 + 18 * p1)
    if (p2 > 0) x.lineTo(cx - 4 + 34 * p2, cy + 16 - 50 * p2)
    x.stroke(); x.restore()
  }
}
function manual(x, t, cfg, no) {
  if (t < T.manIn[0] || t > T.manOut[1]) return
  const inK = ease.outCubic(prog(t, ...T.manIn)), outP = ease.inCubic(prog(t, ...T.manOut))
  const dy = (1 - inK) * 760 + outP * 760
  x.save(); x.translate(0, dy); x.translate(MAN.x + MAN.w / 2, MAN.y + MAN.h / 2); x.rotate(-0.012 + outP * 0.08); x.translate(-(MAN.x + MAN.w / 2), -(MAN.y + MAN.h / 2))
  // drop shadow + paper with a folded corner
  R(x, 'rgba(6,4,18,0.45)', MAN.x + 18, MAN.y + 22, MAN.w, MAN.h)
  box(x, MAN.x, MAN.y, MAN.w, MAN.h, PAPER, { b: 7 })
  for (let i = 1; i < 4; i++) R(x, 'rgba(120,100,70,0.08)', MAN.x, MAN.y + MAN.head + i * MAN.row - 2, MAN.w, 3)
  R(x, '#2f8f86', MAN.x, MAN.y, MAN.w, MAN.head)
  x.font = `700 30px ${MONO}`; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'; x.textAlign = 'left'
  x.fillText('SURVIVAL GUIDE', MAN.x + 30, MAN.y + MAN.head / 2 + 2)
  x.textAlign = 'right'; x.fillText(`NO. ${no}`, MAN.x + MAN.w - 30, MAN.y + MAN.head / 2 + 2)
  // margin line
  R(x, 'rgba(232,52,78,0.35)', MAN.x + 112, MAN.y + MAN.head, 3, MAN.h - MAN.head)
  cfg.steps.forEach((s, i) => {
    const s0 = T.steps[i], k = pop01(t, s0 + 0.1, 0.3, 2)
    if (t < s0 + 0.1) return
    const cy = MAN.y + MAN.head + MAN.row * i + MAN.row / 2
    const cur = t < s0 + 4 && i === Math.max(0, T.steps.findLastIndex(v => t >= v))
    // the highlighter swipe behind the current row
    if (cur) { const hp = ease.outCubic(prog(t, s0 + 0.2, s0 + 0.6)); x.save(); x.globalAlpha = 0.55; R(x, '#fff07a', MAN.x + 124, cy - 56, (MAN.w - 150) * hp, 112); x.restore() }
    x.save(); x.globalAlpha = clamp(k); x.translate((1 - clamp(k)) * -60, 0)
    x.font = `800 26px ${MONO}`; x.fillStyle = '#2f8f86'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(i + 1), MAN.x + 34, cy)
    checkbox(x, MAN.x + 78, cy, prog(t, s0 + T.tick, s0 + T.tick + 0.3), cur)
    const n = richLayout(x, s.text, MAN.w - 170, 46).lines.length
    richText(x, s.text, MAN.x + 132, cy + 16 - (n - 1) * 26, MAN.w - 170, 46, { lh: 1.13 })
    x.restore()
  })
  x.restore()
}

// ─────────────────────────────────────────────── the show bug: a pixel thermos + HOLIDAY SURVIVAL GUIDE · NO. n
const THERMOS = ['.CCCC.', 'CCCCCC', '.WWWW.', 'MMMMMM', 'MRRRRM', 'MMMMMM', 'MRRRRM', 'MMMMMM', 'MMMMMM', '.MMMM.']
function buildBug(root, no) {
  const bx = el('div', { position: 'absolute', left: '56px', top: '56px', height: '48px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '36px', height: '56px', imageRendering: 'pixelated' }, bx)
  ic.width = 36; ic.height = 56
  drawBits(ic.getContext('2d'), THERMOS, { C: '#c9d2e0', W: BONE, M: '#3fb6a8', R: '#e8f6f2' }, 18, 28, 4.6)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: MINT, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, bx,
    `HOLIDAY&nbsp;SURVIVAL&nbsp;GUIDE<span style="color:rgba(255,255,255,0.6);letter-spacing:0.12em"> · NO.&nbsp;${no}</span>`)
  return { update(t, out = 1) { bx.style.display = out > 0.01 ? 'flex' : 'none'; bx.style.opacity = String(clamp(out)) } }
}

// ── the SITUATION tape + caption sticker (canvas, frame 0)
function situation(x, t, text) {
  const out = outK(t, T.hookOut)
  if (out <= 0) return
  x.save(); x.globalAlpha = out
  // the tape, already stuck on at frame 0
  x.save(); x.translate(540, 1372); x.rotate(-0.035)
  R(x, 'rgba(6,4,18,0.4)', -196, -30, 400, 72)
  R(x, TAPE, -200, -36, 400, 72)
  for (let i = 0; i < 10; i++) R(x, INK, -200 + i * 40, -36, 20, 8)
  for (let i = 0; i < 10; i++) R(x, INK, -180 + i * 40, 28, 20, 8)
  x.font = `800 42px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SITUATION:', 0, 2)
  x.restore()
  // the caption sticker
  x.font = `700 56px ${INTER}`
  const lines = wrapWords(x, text, 880), lh = 70
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 70, h = lines.length * lh + 40
  const cy = 1490 + h / 2
  box(x, 540 - w / 2, cy - h / 2, w, h, BONE, { b: 7 })
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 540, cy - h / 2 + 20 + lh * (i + 0.5) + 2))
  x.restore()
}

// ─────────────────────────────────────────────── the film
export function makeSurvival(cfg) {
  const no = cfg.no, ACC = cfg.accent ?? GOLD
  const LINES = [{ t: T.line, speaker: STARS, text: cfg.line }]
  const STAR_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, STARS, { cps: CPS }), T.last + 0.05]

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "700 40px Inter", "700 46px Inter", "700 56px Inter", "italic 600 54px 'EB Garamond'", "600 26px Inter", "800 28px Inter", "italic 600 47px 'EB Garamond'", "italic 500 150px 'EB Garamond'", "700 30px 'Space Mono'", "800 26px 'Space Mono'", "700 22px 'Space Mono'", "700 18px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const img = {}
    for (const n of cfg.images || []) img[n] = await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + n })
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: cfg.hookTop ?? 176, size: cfg.hookSize ?? 96, accentSize: (cfg.hookSize ?? 96) * 1.38, at: -1, gap: 0, accentColor: ACC, fit: true })
    const H1 = popText(root, cfg.guide, { top: 176, size: 88, accentSize: 122, at: T.guideHead, gap: 0.08, accentColor: ACC, fit: true })
    const H2 = popText(root, cfg.endHead, { top: 176, size: 92, accentSize: 128, at: T.endHead, gap: 0.08, accentColor: ACC, fit: true })
    const H3 = popText(root, cfg.last, { top: cfg.lastTop ?? 150, size: 100, accentSize: 144, at: T.last, gap: 0.08, late: 1, lateAt: T.lastLate, wobble: true, accentColor: ACC, fit: true })
    const HEADS = [[H0, T.hookOut], [H1, T.guideOut], [H2, T.endOut], [H3, T.out]]
    const dbox = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 230, open: T.boxOpen, close: T.out[0], cps: CPS })
    const bug = buildBug(root, no)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: 0.5 })
        snow(x, t, { n: 26, alpha: 0.35, seed: no })
        const guide = t >= T.sitEnd && t < T.guideEnd
        const S = { t, end: t >= T.guideEnd, u: t >= T.guideEnd ? t - T.guideEnd : t, img, no }
        // the set (situation, or the resolved ending) — or the guide's vignettes
        const setK = guide ? 0 : t < T.sitEnd ? 1 : pop01(t, T.guideEnd - 0.05, 0.35, 1.6) * outK(t, T.out)
        const vigK = !guide ? 0 : 1
        if (setK > 0) {
          x.save()
          if (t >= T.guideEnd) { x.translate(540, 850); x.scale(setK, setK); x.translate(-540, -850) }
          else if (t > T.sitEnd - 0.3) { const p = ease.inCubic(prog(t, T.sitEnd - 0.3, T.sitEnd)); x.translate(540, 850); x.scale(1 - 0.15 * p, 1 - 0.15 * p); x.translate(-540, -850); x.globalAlpha = 1 - p }
          clipPanel(x, () => cfg.set(x, t, S))
          panelFrame(x, t)
          if (cfg.setOver) cfg.setOver(x, t, S)
          x.restore()
        }
        if (vigK > 0) {
          const i = Math.max(0, T.steps.findLastIndex(v => t >= v)), s0 = T.steps[i]
          const S2 = { ...S, i, u: t - s0, t0: s0, t1: s0 + 4 }
          const ink = pop01(t, s0, 0.28, 1.7)
          x.save(); x.translate(540, 850); x.scale(ink, ink); x.translate(-540, -850)
          clipPanel(x, () => { if (cfg.guideBg) cfg.guideBg(x, t, S2); cfg.steps[i].draw(x, t, S2) })
          panelFrame(x, t, { col: MINT })
          if (cfg.steps[i].over) cfg.steps[i].over(x, t, S2)
          x.restore()
        }
        situation(x, t, cfg.situation)
        // Pisces peeks over the manual with a tissue (the running gag)
        if (guide && cfg.pisSteps !== false) {
          const pk = pop01(t, 6.2, 0.4, 2)
          const ok = 1 - ease.inCubic(prog(t, T.manOut[0] - 0.2, T.manOut[0]))
          const tears = t < T.steps[1] ? 1 : t < T.steps[2] ? 2 : 3
          pisces(x, t, { x: 880, y: lerp(1330, 1196, pk), s: 140, pop: ok, tears, tissue: true, look: [-1, -1], mood: t > T.steps[2] + T.tick ? 'happy' : 'wide' })
        }
        manual(x, t, cfg, no)
        // THE STARS
        if (t >= T.starsIn) {
          const k = pop01(t, T.starsIn, 0.38, 2.1) * outK(t, T.out)
          theStars(x, t, { x: 150, y: 1330, s: 150, pop: k, mood: t > T.last ? 'sparkle' : 'happy', hops: STAR_HOPS })
          sparkles(x, t, 150, 1320, T.starsIn + 0.05, 8, 110, 1)
        }
        if (cfg.over) cfg.over(x, t, S)
        // a quick white blink on the two big phase changes
        for (const c of [T.sitEnd, T.guideEnd]) { const cp = prog(t, c, c + 0.14); if (cp > 0 && cp < 1) { x.save(); x.globalAlpha = 0.24 * (1 - cp); R(x, '#fff8ee', 0, 0, 1080, 1920); x.restore() } }
        dbox.update(t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        bug.update(t, outK(t, [T.out[0] + 0.1, T.out[1] + 0.05]))
        drawGrain(gx, t)
      },
    }
  }

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wc = s => String(s).replace(/\|/g, ' ').trim().split(/\s+/).length
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = [
    // frame 0: the hook is already up — one bright hit, the tape slap
    ['pop', 0.02, 1174.66, 0.045, 0], ['tick', 0.05, 0.05], ['glitter', 0.02, 0.4],
    // the guide: whoosh in, headline, three rows, three ticks
    ['whoosh', r3(T.manIn[0] - 0.05), 0.4, 0.035], ...wordPops(T.guideHead, Math.min(6, wc(cfg.guide)), 0.08, 0),
    ...T.steps.flatMap((s0, i) => [
      ['whoosh', r3(s0 - 0.04), 0.22, 0.022], ['pop', r3(s0 + 0.12), NOTE[(i * 2) % 7], 0.04, -0.2],
      ['tick', r3(s0 + T.tick), 0.06], ['pop', r3(s0 + T.tick + 0.12), 1318.51, 0.035, 0.2], ['bell', r3(s0 + T.tick + 0.15), 1567.98, 0.022, 0.8, 0.2],
      ...((cfg.steps[i].cues || []).map(c => [c[0], r3(s0 + c[1]), ...c.slice(2)])),
    ]),
    ['whoosh', r3(T.manOut[0]), 0.35, 0.03],
    // THE STARS + the end
    ['pop', r3(T.starsIn + 0.05), 880, 0.04, -0.4], ['glitter', T.starsIn, r3(T.starsIn + 0.5)], ['pop', r3(T.boxOpen), 739.99, 0.035, 0],
    ...talkCues(LINES, { cps: CPS }),
    ...wordPops(T.endHead, Math.min(6, wc(cfg.endHead)), 0.08, 2),
    ...wordPops(T.last, Math.max(1, wc(cfg.last) - 1), 0.08, 1), ['pop', r3(T.lastLate), 1174.66, 0.05, 0], ['bell', r3(T.lastLate + 0.02), 1567.98, 0.026, 1.2, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ...endcardCues(STORY_END, { short: true }),
  ].sort((a, b) => a[1] - b[1])

  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, short: true }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br', fadeIn: 0 })]
  return { DURATION, SCENES, CUES, T }
}
