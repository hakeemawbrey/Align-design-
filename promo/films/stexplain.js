// stexplain — the shared kit of Star Talk season 13 "Star Talk Explains" (promo/films/STARTALK16.md), owned by the lead
// session. Every episode is a pixel classroom under the night sky: THE QUESTION (frame 0) → THE BOARD (chalk diagrams,
// each claim tagged ✓ / ✦ / ♥) → THE LIGHTBULB → THE SHORT VERSION, then the shared end card. This file draws the parts
// that must look the same in all 40 episodes. Cast, dialogue and timing stay in each episode (startalk.js dialogueBox).
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { loadExplainFonts, questionCard, drawClassroom, chalkboard, chalkText, chalkTextDone, chalkLine, chalkCircle,
//            factTag, lightbulb, drawPointer, gotIt, gotItTimes, questionCues, chalkCues, tagCues, bulbCues, gotItCues,
//            EX, TAGS } from '../../stexplain.js'
//
// await loadExplainFonts()   in build(), before any DOM type (Inter 800, EB Garamond italic 500, Space Mono 700).
//
// questionCard(root, { q, at = 0, out, accentColor = EX.chalkYellow, top = 176, size = 100, label = 'STAR TALK EXPLAINS' })
//   → { root, update(t), end }
//   THE QUESTION: a chalk-green pixel badge with a bouncing "?" and the label (Space Mono), and under it the question
//   (Inter 800 bone, '*word*' = the EB Garamond italic accent, ' | ' = line break, shrinks to fit 940 px).
//   FULLY on screen at t = at (frame 0 is the thumbnail), settling from a 1.06 scale over 0.3 s. out = [a, b] fades it.
//   Hold it ≥ 2.5 s. The badge is ~120 px tall from `top`; the question starts at top + 150; two lines end near top + 370.
//
// drawClassroom(ctx, t, { dim = 0, floorY = 1290 })   the set: a deep-violet wall with faint star wallpaper, a pixel
//   star-chart poster (top left) and a moon-phase banner (top right) above y ≈ 560, a wainscot, wooden floorboards.
//   Draw it first every frame (it paints the whole frame; no drawSky needed). dim 0…1 darkens it (e.g. under a card).
//
// chalkboard(ctx, t, { x = 540, y = 800, w = 860, h = 500, at = 0, out = null, title = null, k })  → { x0, y0, x1, y1, k }
//   A pixel chalkboard (wood frame, green-black slate with chalk smudges, a chalk tray with two chalks and an eraser),
//   centred on (x, y), popping in at `at` (0.35 s). title = a small chalk heading top-left, written on after the pop.
//   Returns the writable rect (inside a 30 px margin) and k (0…1 visibility). Draw your diagrams after it, inside it.
//
// chalkText(ctx, t, { text, x, y, at, size = 40, color = EX.chalk, accent = EX.chalkYellow, cps = 22, align = 'left',
//                     lineH = 1.25, alpha = 1 })   chalk lettering (Space Mono 700, a soft chalk glow, a 1-px jitter)
//   that writes on letter by letter from `at`. '*word*' = accent colour, '|' = line break.
// chalkTextDone(text, at, cps = 22) → the time the last letter lands (pure; use it for your schedule).
// chalkLine(ctx, t, { pts: [[x, y], …], at, dur = 0.6, color = EX.chalk, width = 6, dash = null, arrow = false, alpha })
//   a chalk polyline that draws on over dur (arrow = true adds an arrowhead at the end).
// chalkCircle(ctx, t, { x, y, r, at, dur = 0.7, color = EX.chalk, width = 6, from = −π/2, sweep = 2π, alpha })   an arc.
//
// factTag(ctx, t, { kind, at, out = null, x, y, align = 'left', scale = 1 })   THE TAGS, the season's accuracy device:
//   kind 'sky'   → ✓ REAL ASTRONOMY  (mint, a pixel check)     — facts about the sky only
//   kind 'astro' → ✦ IN ASTROLOGY    (lilac, a pixel sparkle)  — what astrologers say a thing means
//   kind 'tip'   → ♥ RELATIONSHIP TIP (pink, a pixel heart)    — relationship ideas and skills
//   A pill (~54 px tall) that pops in at `at` with a little stamp bounce. (x, y) = its left edge (align 'left'), centre
//   ('center') or right edge ('right'), vertical centre. TAGS[kind] = { label, color } if you need them elsewhere.
//
// lightbulb(ctx, t, { at, x, y, dur = 1.6, scale = 1 })   the student gets it: a pixel bulb pops (overshoot) at (x, y)
//   (its centre), lights with rays and a sparkle burst, wobbles, and pops out at at + dur.
// drawPointer(ctx, x, y, ang, { tap = 0, len = 230 })   the teacher's pointer stick. (x, y) = the hand end; ang in
//   radians (0 = pointing right, −0.5 = up-right). tap 0…1 pokes it forward (use a quick 0→1→0 when a beat lands).
//
// gotIt(root, { items, at, out, title = 'THE SHORT VERSION', top = 560, accentColor = EX.red })  → { root, update(t), end, times }
//   The recap card: a cream notebook page (red margin line, blue rules, a pixel paper clip) slapping in at `at`, the
//   title in Space Mono, then up to 3 items (Inter 700, ≤ 34 chars, one '*accent*' each) ticking in with pixel checks.
//   gotItTimes(at, items) → { items: [t…], end } (pure). Hold the card ≥ 2 s after end.
//
// Cues (pure, for CUES): questionCues(at, { key = 'C' }) · chalkCues(at, text, { cps = 22 }) · tagCues(at, kind) ·
//   bulbCues(at) · gotItCues(at, { items, key = 'C' }).
// EX = palette. Pure f(t) everywhere; nothing touches `document` at module top level (the sound build imports this).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el } from '../src/lib.js'
import { drawPixelStar } from './sky.js'
import { easeOutBack } from './wheel.js'

export const EX = {
  ink: '#1b1236', bone: '#efe6d6', gold: '#f2c75c', red: '#e8455e', paper: '#fbf3e2', rule: '#a9c4ec',
  slate: '#17302a', slateDark: '#0f221d', wood: '#a8693a', woodDark: '#6e4022', woodLite: '#d08a50',
  chalk: '#f4f1e8', chalkYellow: '#ffe27a', chalkPink: '#ffadc6', chalkBlue: '#9fdcff', chalkGreen: '#a8f0b8',
  wall: '#24133f', wallDark: '#170b2b', floor: '#4a2a3a', mint: '#7dffc4', lilac: '#c9a6ff', pink: '#ff8fb1',
}
export const TAGS = {
  sky: { label: 'REAL ASTRONOMY', color: EX.mint },
  astro: { label: 'IN ASTROLOGY', color: EX.lilac },
  tip: { label: 'RELATIONSHIP TIP', color: EX.pink },
}
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const SHADOW = '0 5px 0 rgba(27,18,54,0.9), 0 0 30px rgba(6,4,18,0.85)'
const FONTS = ['800 100px Inter', '700 44px Inter', "italic 500 140px 'EB Garamond'", "700 40px 'Space Mono'", "700 26px 'Space Mono'"]
export async function loadExplainFonts() { try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ } }

const r3 = v => +v.toFixed(3)
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
const outK = (t, out) => out ? 1 - ease.inQuad(prog(t, out[0], out[1])) : 1
const bmp = (x, rows, pal, x0, y0, s) => rows.forEach((row, j) => [...row].forEach((ch, i) => { const c = pal[ch]; if (c) R(x, c, x0 + i * s, y0 + j * s, s + 0.5, s + 0.5) }))

// ─────────────────────────────────────────────── words
function tokens(text) {
  const out = []; let open = false
  for (const tok of String(text || '').trim().split(/\s+/)) {
    if (!tok) continue
    if (tok === '|') { out.push({ br: true }); continue }
    const stars = (tok.match(/\*/g) || []).length
    out.push({ w: tok.replace(/\*/g, ''), accent: open || stars > 0 })
    if (stars % 2) open = !open
  }
  return out
}
function wordBox(parent, text, { size, accentSize, accentColor, color = EX.bone, weight = 800, lineHeight = 1.04, align = 'center' }, place) {
  const box = el('div', { position: 'absolute', textAlign: align, fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.015em', ...place }, parent)
  const ws = []
  for (const tk of tokens(text)) {
    if (tk.br) { el('br', {}, box); continue }
    const st = { display: 'inline-block', margin: '0 0.11em', transformOrigin: '50% 85%' }
    if (tk.accent) Object.assign(st, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: accentSize + 'px', color: accentColor, letterSpacing: '0', margin: '0 0.11em 0 0.3em' })
    ws.push({ accent: tk.accent, e: el('span', st, box, tk.w) })
  }
  return { box, ws }
}
function fitBox(box, ws, size, accentSize, maxW, floor = 0.6) {
  let widest = 0, cur = 0
  for (const n of box.childNodes) {
    if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
    cur += n.offsetWidth + 0.22 * (parseFloat(n.style.fontSize) || size)
  }
  widest = Math.max(widest, cur)
  if (!(widest > maxW)) return 1
  const k = Math.max(floor, (maxW - 8) / widest)
  box.style.fontSize = (size * k) + 'px'
  for (const w of ws) if (w.accent) w.e.style.fontSize = (accentSize * k) + 'px'
  return k
}

// ─────────────────────────────────────────────── 1 · THE QUESTION
const QMARK = ['.XXXX.', 'XX..XX', '....XX', '...XX.', '..XX..', '..XX..', '......', '..XX..']
function paintBadge(x, W, H, t, label) {
  x.clearRect(0, 0, W, H)
  x.font = `700 40px ${MONO}`
  try { x.letterSpacing = '5px' } catch (_) { /* older canvas */ }
  const tw = x.measureText(label).width
  const P = 8, w = Math.round((tw + 190) / P) * P, h = 112, x0 = Math.round((W - w) / 2), y0 = 20
  const step = (o, c) => { x.fillStyle = c; x.fillRect(x0 + o + 2 * P, y0 + o, w - 2 * o - 4 * P, h - 2 * o); x.fillRect(x0 + o, y0 + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); x.fillRect(x0 + o + P, y0 + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
  x.save(); x.shadowColor = rgba(EX.chalkYellow, 0.45); x.shadowBlur = 30; step(-P, EX.ink); x.restore()
  step(0, EX.woodLite); step(P * 0.5, EX.wood); step(P * 1.5, EX.slate)
  // chalk smudges
  for (let i = 0; i < 6; i++) R(x, 'rgba(244,241,232,0.06)', x0 + 40 + hash(i) * (w - 120), y0 + 22 + hash(i + 9) * 60, 40 + hash(i + 3) * 60, 10)
  // the "?" coin, bouncing
  const b = Math.abs(Math.sin(t * 4.2)) * 7
  const cx = x0 + 62, cy = y0 + h / 2 - b
  x.fillStyle = EX.ink; x.beginPath(); x.arc(cx, cy + 3, 38, 0, Math.PI * 2); x.fill()
  x.fillStyle = EX.chalkYellow; x.beginPath(); x.arc(cx, cy, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff3b8'; x.fillRect(cx - 22, cy - 22, 10, 6)
  bmp(x, QMARK, { X: EX.ink }, cx - 15, cy - 25, 5)
  // the label in chalk
  x.textAlign = 'left'; x.textBaseline = 'middle'
  x.save(); x.shadowColor = rgba(EX.chalk, 0.6); x.shadowBlur = 10; x.fillStyle = EX.chalk
  x.fillText(label, x0 + 118, y0 + h / 2 + 3); x.restore()
  try { x.letterSpacing = '0px' } catch (_) { /* older canvas */ }
  // a sparkle on the corner
  const tw2 = 0.5 + 0.5 * Math.sin(t * 5)
  x.globalAlpha = tw2; drawPixelStar(x, x0 + w - 14, y0 + 8, 18, 1, EX.chalkYellow); x.globalAlpha = 1
}
export function questionCard(root, { q, at = 0, out = null, accentColor = EX.chalkYellow, top = 176, size = 100, label = 'STAR TALK EXPLAINS' } = {}) {
  const wrap = el('div', { position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', pointerEvents: 'none', transformOrigin: `540px ${top + 200}px` }, root)
  const cv = el('canvas', { position: 'absolute', left: '0', top: (top - 20) + 'px', width: '1080px', height: '150px' }, wrap)
  cv.width = 1080; cv.height = 150
  const cx = cv.getContext('2d')
  const accentSize = Math.round(size * 1.3)
  const { box, ws } = wordBox(wrap, q, { size, accentSize, accentColor }, { left: '70px', width: '940px', top: (top + 150) + 'px' })
  fitBox(box, ws, size, accentSize, 940)
  return {
    root: wrap, end: at,
    update(t) {
      const k = outK(t, out)
      const on = t >= at - 1e-6 && k > 0
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      const p = clamp((t - at) / 0.3)
      const sc = lerp(1.06, 1, ease.outCubic(p)) * lerp(0.94, 1, k)
      wrap.style.opacity = String(k)
      wrap.style.transform = `translateY(${((1 - k) * -24).toFixed(1)}px) scale(${sc.toFixed(4)})`
      paintBadge(cx, 1080, 150, t, label)
      ws.forEach((w, i) => {
        const wob = w.accent ? Math.sin(t * 2.4 + i) * 2.2 : 0
        w.e.style.transform = `rotate(${wob.toFixed(2)}deg)`
        if (w.accent) w.e.style.textShadow = `0 4px 0 rgba(27,18,54,0.9), 0 0 ${(18 + 10 * Math.sin(t * 3)).toFixed(1)}px ${rgba(accentColor, 0.55)}`
      })
    },
  }
}

// ─────────────────────────────────────────────── 2 · THE SET
const POSTER = ['....X.......', '...X.X......', '..X...X..X..', '.X.....XX...', 'X.......X...', '.........X..', '..X.....X.X.', '...X...X....', '....XXX.....']
export function drawClassroom(x, t, { dim = 0, floorY = 1290 } = {}) {
  const g = x.createLinearGradient(0, 0, 0, floorY)
  g.addColorStop(0, EX.wallDark); g.addColorStop(0.6, EX.wall); g.addColorStop(1, '#2e1850')
  x.fillStyle = g; x.fillRect(0, 0, 1080, floorY)
  // star wallpaper (faint, twinkling)
  for (let j = 0; j < 14; j++) for (let i = 0; i < 9; i++) {
    const sx = 40 + i * 124 + (j % 2) * 62, sy = 40 + j * 88
    if (sy > floorY - 160) continue
    const tw = 0.5 + 0.5 * Math.sin(t * 1.6 + i * 1.3 + j * 0.7)
    x.globalAlpha = 0.06 + 0.06 * tw; drawPixelStar(x, sx, sy, 14, (i + j) % 4, EX.chalk)
  }
  x.globalAlpha = 1
  // a star-chart poster (left) and a moon-phase banner (right), both high on the wall
  R(x, EX.ink, 34, 600, 156, 196); R(x, '#13264a', 42, 608, 140, 180); R(x, '#1d3566', 42, 608, 140, 8)
  bmp(x, POSTER, { X: 'rgba(244,241,232,0.8)' }, 58, 640, 10)
  R(x, '#c9a6ff', 54, 760, 116, 6)
  const ph = [0, 0.25, 0.5, 0.75, 1]
  R(x, EX.ink, 890, 612, 160, 58); R(x, '#2a1a4a', 896, 618, 148, 46)
  ph.forEach((p, i) => {
    const cx = 914 + i * 28, cy = 641
    x.fillStyle = '#3a2c5a'; x.beginPath(); x.arc(cx, cy, 10, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#f2e6b8'; x.beginPath()
    if (p === 0.5) x.arc(cx, cy, 10, 0, Math.PI * 2)
    else if (p < 0.5) { x.arc(cx, cy, 10, -Math.PI / 2, Math.PI / 2); x.ellipse(cx, cy, 10 * (1 - p * 4 > 0 ? 1 - p * 4 : p * 4 - 1), 10, 0, Math.PI / 2, -Math.PI / 2, p < 0.25) }
    else { x.arc(cx, cy, 10, Math.PI / 2, -Math.PI / 2); x.ellipse(cx, cy, 10 * Math.abs(1 - (1 - p) * 4), 10, 0, -Math.PI / 2, Math.PI / 2, p > 0.75) }
    x.fill()
  })
  // wainscot + skirting
  R(x, '#1d0f33', 0, floorY - 150, 1080, 150)
  for (let i = 0; i < 9; i++) R(x, 'rgba(255,255,255,0.03)', 20 + i * 122, floorY - 132, 100, 112)
  R(x, EX.ink, 0, floorY - 156, 1080, 8); R(x, '#4a2f72', 0, floorY - 152, 1080, 4)
  // floorboards
  R(x, EX.ink, 0, floorY, 1080, 8)
  const fg = x.createLinearGradient(0, floorY, 0, 1920); fg.addColorStop(0, '#5a3446'); fg.addColorStop(1, '#2a1424')
  x.fillStyle = fg; x.fillRect(0, floorY + 8, 1080, 1920 - floorY)
  for (let j = 0; j < 8; j++) {
    const y = floorY + 8 + j * 80
    R(x, 'rgba(0,0,0,0.22)', 0, y, 1080, 3)
    for (let i = 0; i < 5; i++) R(x, 'rgba(0,0,0,0.18)', ((i * 260 + j * 130) % 1180) - 60, y, 3, 80)
  }
  // a warm lamp pool on the floor
  const lg = x.createRadialGradient(540, floorY + 10, 20, 540, floorY + 10, 600)
  lg.addColorStop(0, 'rgba(255,214,140,0.16)'); lg.addColorStop(1, 'rgba(255,214,140,0)')
  x.fillStyle = lg; x.fillRect(0, floorY - 300, 1080, 900)
  if (dim > 0) { x.fillStyle = `rgba(6,3,14,${clamp(dim) * 0.7})`; x.fillRect(0, 0, 1080, 1920) }
}

// ─────────────────────────────────────────────── the chalkboard + chalk
export function chalkboard(x, t, { x: cx = 540, y: cy = 800, w = 860, h = 500, at = 0, out = null, title = null, k: kIn } = {}) {
  const k = kIn ?? clamp(prog(t, at, at + 0.35)) * outK(t, out)
  const rect = { x0: cx - w / 2 + 30, y0: cy - h / 2 + 30, x1: cx + w / 2 - 30, y1: cy + h / 2 - 30, k }
  if (k <= 0) return rect
  const s = easeOutBack(clamp(prog(t, at, at + 0.35)), 1.7)
  x.save(); x.globalAlpha *= clamp(k * 1.4)
  x.translate(cx, cy); x.scale(lerp(0.85, 1, s), lerp(0.85, 1, s)); x.translate(-cx, -cy)
  const x0 = cx - w / 2, y0 = cy - h / 2
  x.save(); x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 12
  R(x, EX.ink, x0 - 22, y0 - 22, w + 44, h + 44); x.restore()
  R(x, EX.woodDark, x0 - 16, y0 - 16, w + 32, h + 32); R(x, EX.wood, x0 - 12, y0 - 12, w + 24, h + 24); R(x, EX.woodLite, x0 - 12, y0 - 12, w + 24, 5)
  R(x, EX.ink, x0 - 2, y0 - 2, w + 4, h + 4)
  const g = x.createLinearGradient(0, y0, 0, y0 + h); g.addColorStop(0, EX.slate); g.addColorStop(1, EX.slateDark)
  x.fillStyle = g; x.fillRect(x0, y0, w, h)
  // old eraser smudges
  for (let i = 0; i < 9; i++) {
    const sx = x0 + 30 + hash(i + 1) * (w - 200), sy = y0 + 30 + hash(i + 21) * (h - 80)
    R(x, 'rgba(244,241,232,0.035)', sx, sy, 90 + hash(i + 5) * 140, 16 + hash(i + 7) * 20)
  }
  // the tray, two chalks and an eraser
  R(x, EX.ink, x0 - 20, y0 + h + 10, w + 40, 20); R(x, EX.wood, x0 - 16, y0 + h + 12, w + 32, 14)
  R(x, EX.chalk, x0 + 60, y0 + h + 4, 34, 9); R(x, EX.chalkYellow, x0 + 110, y0 + h + 4, 26, 9)
  R(x, EX.ink, x0 + w - 150, y0 + h - 2, 92, 18); R(x, '#d9d2c2', x0 + w - 146, y0 + h + 2, 84, 6); R(x, '#4a5a8a', x0 + w - 146, y0 + h + 8, 84, 6)
  x.restore()
  if (title) chalkText(x, t, { text: title, x: rect.x0, y: rect.y0 + 14, at: at + 0.3, size: 30, color: EX.chalkYellow, cps: 34, alpha: k })
  return rect
}
function chalkChars(text) {
  const rows = [[]]; let acc = false
  for (const ch of String(text)) {
    if (ch === '*') { acc = !acc; continue }
    if (ch === '|') { rows.push([]); continue }
    rows[rows.length - 1].push({ ch, acc })
  }
  rows.forEach(r => { while (r.length && r[0].ch === ' ') r.shift(); while (r.length && r[r.length - 1].ch === ' ') r.pop() })
  return rows
}
export function chalkTextDone(text, at, cps = 22) {
  const n = chalkChars(text).reduce((a, r) => a + r.length, 0)
  return r3(at + n / cps)
}
export function chalkText(x, t, { text, x: px, y: py, at = 0, size = 40, color = EX.chalk, accent = EX.chalkYellow, cps = 22, align = 'left', lineH = 1.25, alpha = 1 } = {}) {
  if (t < at || alpha <= 0) return
  const rows = chalkChars(text)
  let shown = Math.floor((t - at) * cps)
  x.save(); x.globalAlpha *= alpha
  x.font = `700 ${size}px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
  const cw = x.measureText('M').width
  rows.forEach((row, j) => {
    const w = row.length * cw
    const ox = align === 'center' ? px - w / 2 : align === 'right' ? px - w : px
    const oy = py + j * size * lineH
    for (let i = 0; i < row.length; i++) {
      if (shown <= 0) break
      shown--
      const c = row[i]
      if (c.ch === ' ') continue
      const jx = (hash(i * 7 + j * 13) - 0.5) * 1.6, jy = (hash(i * 3 + j * 29) - 0.5) * 1.6
      const col = c.acc ? accent : color
      x.shadowColor = rgba(col, 0.55); x.shadowBlur = 8
      x.fillStyle = col; x.fillText(c.ch, ox + i * cw + jx, oy + jy)
    }
  })
  x.restore()
}
function strokeChalk(x, draw, color, width, alpha) {
  x.save(); x.globalAlpha *= alpha; x.lineCap = 'round'; x.lineJoin = 'round'
  x.strokeStyle = rgba(color, 0.35); x.lineWidth = width + 4; x.shadowColor = rgba(color, 0.5); x.shadowBlur = 10; draw(); x.stroke()
  x.shadowBlur = 0; x.strokeStyle = color; x.lineWidth = width; draw(); x.stroke()
  x.restore()
}
export function chalkLine(x, t, { pts, at = 0, dur = 0.6, color = EX.chalk, width = 6, dash = null, arrow = false, alpha = 1 } = {}) {
  if (!pts || pts.length < 2 || t < at || alpha <= 0) return
  const p = ease.inOutQuad(clamp((t - at) / dur))
  const L = []; let tot = 0
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d }
  let left = tot * p, end = pts[0], ang = 0
  const path = () => {
    x.beginPath(); x.moveTo(pts[0][0], pts[0][1]); let rem = left
    for (let i = 1; i < pts.length; i++) {
      const d = L[i - 1]
      if (rem >= d) { x.lineTo(pts[i][0], pts[i][1]); rem -= d; end = pts[i]; ang = Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]) }
      else { const f = rem / d; end = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; ang = Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]); x.lineTo(end[0], end[1]); break }
    }
  }
  x.save(); if (dash) x.setLineDash(dash)
  strokeChalk(x, path, color, width, alpha)
  x.restore()
  if (arrow && p > 0.98) {
    const a = 18 + width
    strokeChalk(x, () => { x.beginPath(); x.moveTo(end[0] - Math.cos(ang - 0.5) * a, end[1] - Math.sin(ang - 0.5) * a); x.lineTo(end[0], end[1]); x.lineTo(end[0] - Math.cos(ang + 0.5) * a, end[1] - Math.sin(ang + 0.5) * a) }, color, width, alpha)
  }
}
export function chalkCircle(x, t, { x: cx, y: cy, r, at = 0, dur = 0.7, color = EX.chalk, width = 6, from = -Math.PI / 2, sweep = Math.PI * 2, alpha = 1 } = {}) {
  if (t < at || alpha <= 0) return
  const p = ease.inOutQuad(clamp((t - at) / dur))
  if (p <= 0) return
  strokeChalk(x, () => { x.beginPath(); x.arc(cx, cy, r, from, from + sweep * p) }, color, width, alpha)
}

// ─────────────────────────────────────────────── 3 · THE TAGS
const ICON = {
  sky: ['.......X', '......XX', 'X....XX.', 'XX..XX..', '.XXXX...', '..XX....'],
  astro: ['...X...', '...X...', '..XXX..', 'XXXXXXX', '..XXX..', '...X...', '...X...'],
  tip: ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'],
}
export function factTag(x, t, { kind, at = 0, out = null, x: px, y: py, align = 'left', scale = 1 } = {}) {
  const T = TAGS[kind]
  if (!T || t < at) return
  const k = outK(t, out)
  if (k <= 0) return
  const p = clamp((t - at) / 0.28)
  const sc = easeOutBack(p, 2.6) * lerp(0.9, 1, k) * scale
  x.save(); x.globalAlpha *= clamp(p * 3) * k
  x.font = `700 26px ${MONO}`
  try { x.letterSpacing = '2px' } catch (_) { /* older canvas */ }
  const tw = x.measureText(T.label).width
  const w = Math.round(tw + 86), h = 54
  const ox = align === 'center' ? -w / 2 : align === 'right' ? -w : 0
  x.translate(px, py); x.scale(sc, sc); x.rotate(-0.03 + 0.05 * Math.exp(-(t - at) * 6) * Math.sin((t - at) * 30))
  const pill = (o, c) => { x.fillStyle = c; x.fillRect(ox + o + 8, -h / 2 + o, w - 2 * o - 16, h - 2 * o); x.fillRect(ox + o, -h / 2 + o + 8, w - 2 * o, h - 2 * o - 16); x.fillRect(ox + o + 4, -h / 2 + o + 4, w - 2 * o - 8, h - 2 * o - 8) }
  x.save(); x.shadowColor = rgba(T.color, 0.5); x.shadowBlur = 18; pill(-4, EX.ink); x.restore()
  pill(0, T.color); pill(4, '#160c2c')
  bmp(x, ICON[kind], { X: T.color }, ox + 18, -16, 4.6)
  x.fillStyle = T.color; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(T.label, ox + 62, 2)
  try { x.letterSpacing = '0px' } catch (_) { /* older canvas */ }
  x.restore()
}

// ─────────────────────────────────────────────── 4 · THE LIGHTBULB + the pointer
const BULB = ['...GGGG...', '..GYYYYG..', '.GYWWYYYG.', 'GYWYYYYYYG', 'GYWYYYYYYG', 'GYYYYYYYYG', '.GYYYYYYG.', '..GYYYYG..', '...GYYG...', '...SSSS...', '...DSSD...', '...SSSS...', '....DD....']
export function lightbulb(x, t, { at, x: px, y: py, dur = 1.6, scale = 1 } = {}) {
  const d = t - at
  if (d < 0 || d > dur + 0.25) return
  const pin = easeOutBack(clamp(d / 0.3), 2.8), pout = 1 - ease.inCubic(clamp((d - dur) / 0.25))
  const sc = pin * pout * scale
  if (sc <= 0.01) return
  const s = 9
  x.save(); x.translate(px, py + Math.sin(d * 9) * 4 * Math.exp(-d * 2)); x.scale(sc, sc); x.rotate(Math.sin(d * 12) * 0.12 * Math.exp(-d * 2.5))
  const lit = clamp((d - 0.15) / 0.12)
  if (lit > 0) {
    const g = x.createRadialGradient(0, -20, 6, 0, -20, 170); g.addColorStop(0, rgba('#fff3a0', 0.7 * lit)); g.addColorStop(1, 'rgba(255,243,160,0)')
    x.fillStyle = g; x.fillRect(-170, -190, 340, 340)
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2 + d * 0.6, r0 = 76 + 8 * Math.sin(d * 10 + i), r1 = r0 + 26
      x.save(); x.rotate(a); R(x, rgba(EX.chalkYellow, lit), r0, -24 - 3, r1 - r0, 7); x.restore()
    }
  }
  const pal = { G: EX.ink, Y: lit > 0.5 ? '#ffe27a' : '#8a7d5a', W: lit > 0.5 ? '#ffffff' : '#c9c0a0', S: '#b9bfcc', D: '#6b7390' }
  bmp(x, BULB.map(r => r), pal, -5 * s, -9 * s, s)
  x.restore()
  if (lit > 0) for (let i = 0; i < 8; i++) {
    const p = clamp((d - 0.15) / 0.7)
    if (p >= 1) continue
    const a = i / 8 * Math.PI * 2 + 0.3, r = 70 + 130 * ease.outCubic(p)
    x.globalAlpha = (1 - p) * pout
    drawPixelStar(x, px + Math.cos(a) * r * scale, py - 20 + Math.sin(a) * r * scale, 18, i % 4, i % 2 ? EX.chalkYellow : EX.bone)
    x.globalAlpha = 1
  }
}
export function drawPointer(x, px, py, ang, { tap = 0, len = 230 } = {}) {
  x.save(); x.translate(px, py); x.rotate(ang); x.translate(tap * 26, 0)
  R(x, EX.ink, -6, -8, len + 10, 16); R(x, EX.wood, -2, -5, len, 10); R(x, EX.woodLite, -2, -5, len, 3)
  R(x, EX.ink, len - 4, -10, 26, 20); R(x, EX.gold, len, -7, 18, 14); R(x, '#fff3b8', len + 2, -6, 6, 4)
  x.restore()
}

// ─────────────────────────────────────────────── 5 · THE SHORT VERSION
export function gotItTimes(at, items) {
  const its = items.map((_, i) => r3(at + 0.6 + i * 0.55))
  return { items: its, end: r3((its[its.length - 1] || at) + 0.35) }
}
const CHECK = ['.......XX', '......XX.', 'XX...XX..', '.XX.XX...', '..XXX....', '...X.....']
export function gotIt(root, { items, at, out = null, title = 'THE SHORT VERSION', top = 560, accentColor = EX.red } = {}) {
  const TM = gotItTimes(at, items)
  const W = 900, rowH = 112, H = 170 + items.length * rowH
  const wrap = el('div', { position: 'absolute', left: ((1080 - W) / 2) + 'px', top: top + 'px', width: W + 'px', height: H + 'px', transformOrigin: '50% 30%', display: 'none', pointerEvents: 'none' }, root)
  const cv = el('canvas', { position: 'absolute', left: '-30px', top: '-40px', width: (W + 60) + 'px', height: (H + 80) + 'px' }, wrap)
  cv.width = W + 60; cv.height = H + 80
  const x = cv.getContext('2d')
  // the page: shadow, paper, rules, margin, clip (painted once; checks are painted per frame below)
  const paint = (n) => {
    x.clearRect(0, 0, cv.width, cv.height)
    x.save(); x.translate(30, 40)
    x.save(); x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 30; x.shadowOffsetY = 14; R(x, EX.ink, -8, -8, W + 16, H + 16); x.restore()
    R(x, EX.paper, 0, 0, W, H); R(x, '#fffaf0', 0, 0, W, 10)
    for (let y = 120; y < H - 10; y += 56) R(x, rgba(EX.rule, 0.7), 0, y, W, 3)
    R(x, rgba(EX.red, 0.8), 92, 0, 4, H)
    // paper clip
    R(x, EX.ink, W - 120, -28, 46, 84); R(x, '#c4bce0', W - 114, -22, 34, 72); R(x, EX.paper, W - 106, -10, 18, 48); R(x, '#ffffff', W - 114, -22, 34, 6)
    for (let i = 0; i < items.length; i++) {
      const cy = 170 + i * rowH - 50
      R(x, EX.ink, 30, cy - 22, 44, 44); R(x, '#fffaf0', 34, cy - 18, 36, 36)
      if (i < n) bmp(x, CHECK, { X: '#1f9e5a' }, 31, cy - 18, 5)
    }
    x.restore()
  }
  el('div', { position: 'absolute', left: '124px', top: '40px', font: `700 34px ${MONO}`, letterSpacing: '4px', color: EX.red }, wrap, title)
  const rows = items.map((txt, i) => {
    const { box, ws } = wordBox(wrap, txt, { size: 50, accentSize: 64, accentColor, color: EX.ink, weight: 800, lineHeight: 1.05, align: 'left' }, { left: '118px', width: (W - 150) + 'px', top: (170 + i * rowH - 50 - 32) + 'px', textShadow: 'none' })
    box.style.textShadow = 'none'
    fitBox(box, ws, 50, 64, W - 160, 0.7)
    return { box, ws }
  })
  let painted = -1
  return {
    root: wrap, end: TM.end, times: TM,
    update(t) {
      const k = outK(t, out)
      const on = t >= at && k > 0
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      const p = clamp((t - at) / 0.32)
      const s = easeOutBack(p, 2)
      wrap.style.opacity = String(clamp(p * 3) * k)
      wrap.style.transform = `translateY(${lerp(140, 0, s).toFixed(1)}px) rotate(${lerp(-6, -1.2, s).toFixed(2)}deg) scale(${(lerp(0.9, 1, s) * lerp(0.94, 1, k)).toFixed(4)})`
      const n = TM.items.filter(v => t >= v).length
      if (n !== painted) { paint(n); painted = n }
      rows.forEach((r, i) => {
        const q = clamp((t - TM.items[i]) / 0.3)
        r.box.style.opacity = String(clamp(q * 2.5))
        r.box.style.transform = `translateX(${((1 - ease.outCubic(q)) * 30).toFixed(1)}px)`
      })
    },
  }
}

// ─────────────────────────────────────────────── sound
const PC = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }
const keyHz = (key, semis) => 523.25 * Math.pow(2, (((PC[String(key).replace(/m$/, '')] ?? 0) + semis) % 12) / 12)
const MAJ = [0, 2, 4, 7, 9, 12, 14]
export function questionCues(at = 0, { key = 'C' } = {}) {
  return [
    ['whoosh', r3(at), 0.4, 0.04],
    ['bell', r3(at + 0.02), keyHz(key, 7), 0.035, 1.4, -0.2],
    ['pop', r3(at + 0.1), keyHz(key, 0), 0.05, -0.2], ['pop', r3(at + 0.22), keyHz(key, 4), 0.05, 0.2], ['pop', r3(at + 0.34), keyHz(key, 7) * 2, 0.045, 0],
  ]
}
export function chalkCues(at, text, { cps = 22 } = {}) {
  const n = chalkChars(text).reduce((a, r) => a + r.length, 0)
  const out = []
  for (let i = 0; i < n; i += 3) out.push(['chip', r3(at + i / cps), 2600 + (i * 137) % 1400, 0.05, { wave: 'noise', gain: 0.012, decay: 0.04, sustain: 0, bus: 'drums', rev: 0.05, dly: 0, pan: ((i % 6) - 3) * 0.08 }])
  return out
}
export function tagCues(at, kind = 'sky') {
  const f = kind === 'sky' ? 1318.51 : kind === 'astro' ? 1567.98 : 1174.66
  return [['tick', r3(at), 0.05], ['pop', r3(at + 0.03), f, 0.045, 0.3], ['pop', r3(at + 0.11), f * 1.5, 0.03, 0.3]]
}
export function bulbCues(at) {
  return [['pop', r3(at), 880, 0.05, 0], ['bell', r3(at + 0.15), 2093, 0.04, 1.6, 0.1], ['glitter', r3(at + 0.15), r3(at + 0.9)]]
}
export function gotItCues(at, { items = [], key = 'C' } = {}) {
  const TM = gotItTimes(at, items)
  return [
    ['whoosh', r3(at), 0.35, 0.035], ['tick', r3(at + 0.3), 0.06],
    ...TM.items.map((v, i) => ['pluck', v, keyHz(key, MAJ[(i * 2) % MAJ.length]) , 0.045, 0.6, (i - 1) * 0.25]),
    ['bell', r3(TM.end), keyHz(key, 12), 0.03, 1.4, 0],
  ]
}
