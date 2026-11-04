// THE THREAD: the shared look of the Star Talk sitcom "The Thread" (the twelve signs' group chat), episodes nthe01–nthe32.
// Rows: promo/films/next30/b05.md (eps 1–16). Every episode imports this file from here:
//   import { makeThread, … } from '../../nthe01/chatkit.js'
//
// The look (1080 × 1920, story 0 → DURATION − 4.4, then the shared end card):
//   • the bug "THE THREAD" top-left (Inter 800 small caps, letter-spaced, 56 px from the edges)
//   • a headline caption at the top (popText, one *italic* accent) that changes with each beat; the last one is the
//     episode's last line
//   • the chat window (y 420–1460): a header with the chat's name (it can be renamed), a PINNED banner (Leo), then the
//     messages, newest at the bottom, scrolling smoothly as each one pops in
//   • the stage strip under it (y 1470–1900): whoever is posting, big, holding a phone, with a name tag; Pisces on the
//     right with a tissue box, crying (happy tears count) in every film
//
//   makeThread(cfg) → { DURATION, STORY_END, SCENES, CUES, CUTS }
//     cfg.id          film id
//     cfg.duration    20 | 25 | 30 (includes the 4.4 s end card)
//     cfg.chat        the chat's name at t = 0;  cfg.renames: [[t, name], …]
//     cfg.pins        [[t, { from, text }], …]  the PINNED banner (t ≤ 0 = already pinned at frame 0)
//     cfg.heads       [{ at, text, size?, accent? }, …]  headline captions (at ≤ 0 = already in at frame 0)
//     cfg.last        { at, text }  the last line (a headline that holds to the end of the story)
//     cfg.msgs        [msg, …] (see MESSAGES)   cfg.typing: [{ from | label, a, b }, …]  the "is typing…" row
//     cfg.stage       [{ at, sign, mood?, look?, hops?: [t], prop?(x, t, P), two?: { sign, mood, look } }, …]
//     cfg.cry         [[t, level 1–3], …]  Pisces' tears on the stage;  cfg.pisMood: [[t, mood], …]
//     cfg.cut         the one card-cut candidate (cardfx plays it)
//     cfg.punch       [t, …] extra zoom punches on the chat (a message with big: true punches by itself)
//     cfg.extra(x, t, S)   optional canvas drawing on top of the stage (S = { sign, star, PANEL, … })
//     cfg.cues        extra sound cues (absolute times)
//
// MESSAGES (all take at; from = a sign id, e.g. 'sagittarius'):
//   { from, text, big?, react?: [[t, 'heart'|'tear'|'star'|'ha', n], …] }        a text bubble ('*word*' = accent colour)
//   { kind: 'voice', from, dur: '4:12', note?: '(sobbing, happily)' }              a voice note (tears drip off it)
//   { kind: 'agenda', from, title?: 'AGENDA', items: [text | { text, hi }], gap? } items pop one by one
//   { kind: 'triple', from, items: [{ to, text }] }                                 Gemini replying to three at once
//   { kind: 'poll', from, q, opts: [{ label, at?, votes: [[t, n], …] }] }          a poll; bars fill as votes land
//   { kind: 'image', from, h, draw(x, t, w, h, m) }                                 a little pixel picture (m = the msg)
//   { kind: 'system', text }   centred grey line ("♌ Leo pinned a message")
//   { kind: 'divider', text }  a time divider ("1:12 AM")
//   { kind: 'reply', from, re: { from, text }, text }                               a quoted reply
// Everything draws as a pure function of t; nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { drawStarChar, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', MINT = '#7dffb0', SKYB = '#8fd9ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#7fe0c0'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

export const SIGN = id => SIGNS.find(s => s.id === id)
export const SHORT = id => (id === 'sagittarius' ? 'Sag' : SIGN(id).name)
export const TAG = id => `${SIGN(id).glyph}︎ ${SHORT(id).toUpperCase()}`
const ORDER = SIGNS.map(s => s.id)

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 6, hi = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
}
/** a stepped-corner panel (pixel rounded rect) */
export function panel(x, X, Y, w, h, col, c = 8) {
  x.fillStyle = col; x.fillRect(X + c, Y, w - 2 * c, h); x.fillRect(X, Y + c, w, h - 2 * c)
  x.fillRect(X + c / 2, Y + c / 2, w - c, h - c)
}
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
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
export const TEAR = ['..T..', '.TTT.', 'TTWTT', 'TTTTT', '.TTT.']
export const PSTAR = ['..S..', '.SSS.', 'SSSSS', '.SSS.', '.S.S.']
/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
/** hearts floating up from (cx, cy) from t0 */
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** pixel confetti falling from a burst at t0 */
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.4, v = 520 + 260 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 620 * tt * tt
    const sz = 10 + (i % 3) * 3
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
/** a pixel speech bubble (canvas) */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 44, h = size + 32
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** canvas label text with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }

// ── star sprite frame (mirrors startalk.js drawStarChar) so props sit on the sprite through hops and squash
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
/** happy tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
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
/** a little pixel phone held at (cx, cy) */
export function handPhone(x, cx, cy, s = 1, rot = 0.12, lit = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -22, -40, 44, 80, '#2a2148', { b: 5 })
  R(x, lit > 0.5 ? '#9fd8f6' : '#3a3366', -16, -32, 32, 58)
  if (lit > 0.5) { R(x, '#ffffff', -12, -26, 18, 6); R(x, '#5b48a8', -12, -14, 24, 6); R(x, '#ffffff', -4, -2, 16, 6) }
  x.restore()
}
/** a tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── geometry
export const PANEL = { x: 56, y: 420, w: 968, h: 1040 }
const HEAD_H = 98, PIN_H = 70
const AV = 60, BX = PANEL.x + 112, BMAXW = PANEL.x + PANEL.w - 34 - BX
const FS = 38, LH = 48, PADX = 22, PADY = 14, NAME_H = 36, GAP = 16, REACT_H = 46
export const STAGE = { y: 1700, x: 300, s: 230, x2: 560, s2: 190, pisX: 918, pisY: 1735, pisS: 160 }

/** split '*accent*' text into runs → [{ s, acc }] */
function runs(text) {
  const out = []; let acc = false, cur = ''
  for (const ch of text) { if (ch === '*') { if (cur) out.push({ s: cur, acc }); cur = ''; acc = !acc; continue } cur += ch }
  if (cur) out.push({ s: cur, acc })
  return out
}
/** word-wrap runs to maxW → lines of runs */
function wrapRuns(x, text, maxW, font) {
  x.font = font
  const words = []
  for (const r of runs(text)) r.s.split(/(\s+)/).forEach(w => { if (w) words.push({ s: w, acc: r.acc }) })
  const lines = []; let cur = [], w = 0
  for (const wd of words) {
    const ww = x.measureText(wd.s).width
    if (/^\s+$/.test(wd.s)) { if (cur.length) { cur.push(wd); w += ww } continue }
    if (w + ww > maxW && cur.length) { while (cur.length && /^\s+$/.test(cur[cur.length - 1].s)) cur.pop(); lines.push(cur); cur = []; w = 0 }
    cur.push(wd); w += ww
  }
  if (cur.length) lines.push(cur)
  const widths = lines.map(l => l.reduce((a, r) => a + x.measureText(r.s).width, 0))
  return { lines, width: Math.max(0, ...widths) }
}
function drawRuns(x, line, X, Y, col, acc) {
  let cx = X
  for (const r of line) { x.fillStyle = r.acc ? acc : col; x.fillText(r.s, cx, Y); cx += x.measureText(r.s).width }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeThread(cfg) {
  const DURATION = cfg.duration
  const STORY_END = DURATION - ENDCARD_LEN
  const OUT = [STORY_END - 0.42, STORY_END - 0.04]
  const PIS = signStar('pisces')
  const msgs = cfg.msgs.map((m, i) => ({ kind: 'text', ...m, i }))
  const heads = [...(cfg.heads || []), { ...cfg.last, isLast: true }].sort((a, b) => a.at - b.at)
  heads.forEach((h, i) => { h.out = i < heads.length - 1 ? [heads[i + 1].at - 0.18, heads[i + 1].at - 0.02] : [OUT[0] + 0.1, OUT[1]] })
  const stage = (cfg.stage || []).slice().sort((a, b) => a.at - b.at)
  const cryAt = t => { let k = 1; for (const [a, v] of (cfg.cry || [])) if (t >= a) k = v; return k }
  const pisMoodAt = t => { let m = 'sparkle'; for (const [a, v] of (cfg.pisMood || [])) if (t >= a) m = v; return m }
  const pinAt = t => { let p = null, at = -9; for (const [a, v] of (cfg.pins || [])) if (t >= a) { p = v; at = a } return { p, at } }
  const nameAt = t => { let n = cfg.chat, at = -9; for (const [a, v] of (cfg.renames || [])) if (t >= a) { n = v; at = a } return { n, at } }
  const firstPin = (cfg.pins || []).length ? cfg.pins[0][0] : null
  const punches = [...(cfg.punch || []), ...msgs.filter(m => m.big).map(m => m.at)]
  // Pisces hops on each voice note and each cry change
  const PIS_HOPS = [-0.2, ...msgs.filter(m => m.kind === 'voice').map(m => m.at + 0.05), ...(cfg.cry || []).map(c => c[0] + 0.02)]

  async function build(stageEl) {
    try {
      await Promise.all(["800 112px Inter", "800 34px Inter", "600 38px Inter", "700 38px Inter", "800 28px Inter", "italic 500 120px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 24px 'Space Mono'", "700 22px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stageEl, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    // the chat window renders into its own canvas, then is composited with a punch
    const cc = document.createElement('canvas'); cc.width = PANEL.w; cc.height = PANEL.h
    const c = cc.getContext('2d')
    const HEADS = heads.map(h => ({ h, p: popText(root, h.text, { top: h.isLast ? 150 : 158, size: h.size || (h.isLast ? 84 : 76), accentSize: (h.size || (h.isLast ? 84 : 76)) * 1.32, at: h.at, gap: h.at <= 0 ? 0.0 : 0.08, accentColor: h.accent || (h.isLast ? GOLD : BUG_COL), fit: true, late: h.isLast ? 1 : 0, lateAt: h.isLast ? h.at + 0.55 : null, wobble: !!h.isLast }) }))
    const bug = buildBug(root)
    const top = layerCanvas(root), tx = top.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    // ── layout every message once (fonts are loaded)
    const FONT = `600 ${FS}px ${INTER}`, FONT_BIG = `700 44px ${INTER}`
    const lay = msgs.map((m, i) => {
      const prev = msgs[i - 1]
      const head = m.from && !['system', 'divider'].includes(m.kind) && (!prev || prev.from !== m.from || ['system', 'divider'].includes(prev.kind) || prev.at < m.at - 6)
      const L = { m, head, h: 0, bw: 0, bh: 0 }
      const inner = BMAXW - 2 * PADX
      if (m.kind === 'system' || m.kind === 'divider') { L.bh = 46; L.h = 46 + GAP; return L }
      if (m.kind === 'text') {
        const w = wrapRuns(c, m.text, inner, m.big ? FONT_BIG : FONT)
        L.w = w; L.lh = m.big ? 54 : LH
        L.bw = Math.min(BMAXW, w.width + 2 * PADX + 4); L.bh = w.lines.length * L.lh + 2 * PADY
      } else if (m.kind === 'reply') {
        const w = wrapRuns(c, m.text, inner, FONT)
        L.w = w; L.lh = LH
        c.font = `600 28px ${INTER}`
        const qw = Math.min(inner, c.measureText(m.re.text).width + 40)
        L.bw = Math.min(BMAXW, Math.max(w.width, qw, 260) + 2 * PADX + 4); L.bh = 76 + w.lines.length * LH + 2 * PADY
      } else if (m.kind === 'voice') { L.bw = 560; L.bh = 96 + (m.note ? 44 : 0) }
      else if (m.kind === 'agenda') {
        L.items = m.items.map(it => typeof it === 'string' ? { text: it } : it).map((it, k) => ({ ...it, w: wrapRuns(c, `${k + 1}. ${it.text}`, inner - 10, `600 34px ${INTER}`) }))
        L.bw = Math.min(BMAXW, Math.max(380, ...L.items.map(it => it.w.width + 2 * PADX + 14)))
        L.bh = 64 + L.items.reduce((a, it) => a + it.w.lines.length * 44 + 6, 0) + PADY
      } else if (m.kind === 'triple') {
        L.items = m.items.map(it => ({ ...it, w: wrapRuns(c, it.text, inner - 16, FONT) }))
        L.bw = Math.min(BMAXW, Math.max(420, ...L.items.map(it => it.w.width + 2 * PADX + 24)))
        L.bh = L.items.reduce((a, it) => a + 34 + it.w.lines.length * LH + 12, 0) + PADY
      } else if (m.kind === 'poll') {
        L.q = wrapRuns(c, m.q, inner, `700 36px ${INTER}`)
        L.bw = BMAXW - 40; L.bh = 30 + L.q.lines.length * 46 + m.opts.length * 70 + PADY
      } else if (m.kind === 'image') { L.bw = m.w || 520; L.bh = m.h || 300 }
      L.h = (L.head ? NAME_H : 0) + L.bh + (m.react ? REACT_H : 0) + GAP
      return L
    })

    // ── the chat window (drawn into cc at local coords)
    function drawChat(t) {
      c.clearRect(0, 0, PANEL.w, PANEL.h)
      // body
      c.fillStyle = INK; panel(c, 0, 0, PANEL.w, PANEL.h, INK, 14)
      panel(c, 6, 6, PANEL.w - 12, PANEL.h - 12, 'rgba(18,12,42,0.94)', 10)
      // area under the header (+ pin)
      const pin = pinAt(t)
      const pinK = firstPin === null ? 0 : ease.outCubic(prog(t, firstPin, firstPin + 0.3))
      const areaTop = HEAD_H + PIN_H * pinK, areaBot = PANEL.h - 14
      // messages
      const vis = lay.filter(L => t >= L.m.at)
      const tot = n => { let s = 0; for (let i = 0; i < n; i++) s += vis[i].h; return s }
      let H = tot(vis.length)
      if (vis.length) { const lm = vis[vis.length - 1].m, e = ease.outCubic(prog(t, lm.at, lm.at + 0.26)); H = lerp(tot(vis.length - 1), tot(vis.length), e) }
      const ty = (cfg.typing || []).find(q => t >= q.a && t < q.b)
      const tyK = ty ? ease.outCubic(prog(t, ty.a, ty.a + 0.15)) * (1 - ease.inCubic(prog(t, ty.b - 0.12, ty.b))) : 0
      H += 62 * tyK
      let y = Math.min(areaTop + 18, areaBot - 10 - H)
      c.save(); c.beginPath(); c.rect(6, areaTop, PANEL.w - 12, areaBot - areaTop); c.clip()
      for (const L of vis) {
        if (y + L.h > areaTop - 40 && y < areaBot + 10) drawMsg(L, t, y)
        y += L.h
      }
      if (tyK > 0.01) drawTyping(ty, t, y, tyK)
      c.restore()
      // header
      panel(c, 6, 6, PANEL.w - 12, HEAD_H - 6, '#221a4a', 10)
      R(c, 'rgba(255,255,255,0.06)', 20, HEAD_H - 4, PANEL.w - 40, 3)
      // the group avatar: twelve sign-coloured pixels in a ring
      for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2 - Math.PI / 2; R(c, SIGNS[k].color, 62 + Math.cos(a) * 26 - 5, 52 + Math.sin(a) * 26 - 5, 10, 10) }
      drawPixelStar(c, 62, 52, 22, 2, GOLD)
      const nm = nameAt(t), rk = nm.at > -9 ? prog(t, nm.at, nm.at + 0.3) : 1
      c.save(); c.textAlign = 'left'; c.textBaseline = 'middle'
      c.font = `800 34px ${INTER}`; c.fillStyle = BONE
      const sy = nm.at > -9 && rk < 1 ? (1 - ease.outBack(rk)) * -26 : 0
      c.globalAlpha = clamp(rk * 2); c.fillText(nm.n, 112, 40 + sy); c.globalAlpha = 1
      c.font = `700 22px ${MONO}`; c.fillStyle = LAV; c.fillText('12 members · 1 thread', 112, 76)
      c.restore()
      // the PINNED banner
      if (pinK > 0.01 && pin.p) {
        const Y = HEAD_H - (1 - pinK) * PIN_H
        R(c, '#2d2160', 6, Y, PANEL.w - 12, PIN_H - 4); R(c, GOLD, 6, Y, 8, PIN_H - 4)
        drawBits(c, ['.RRR.', 'RRRRR', '.RRR.', '..B..', '..B..', '..B..'], { R: RED, B: BONE }, 44, Y + 33, 5, { rot: 0.5 })
        const fk = pop01(t, pin.at, 0.3, 2.4)
        c.save(); c.translate(76, Y + PIN_H / 2 - 2); c.scale(1, clamp(fk))
        c.textAlign = 'left'; c.textBaseline = 'middle'
        c.font = `700 20px ${MONO}`; c.fillStyle = GOLD; c.fillText(`PINNED · ${TAG(pin.p.from)}`, 0, -14)
        c.font = `600 28px ${INTER}`; c.fillStyle = BONE
        let s = pin.p.text; while (c.measureText(s).width > PANEL.w - 110 && s.length > 4) s = s.slice(0, -2)
        if (s !== pin.p.text) s = s.trimEnd() + '…'
        c.fillText(s, 0, 16)
        c.restore()
      }
    }

    function nameRow(m, y) {
      const S = SIGN(m.from)
      c.save(); c.font = `700 24px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = S.color
      c.fillText(TAG(m.from), BX - PANEL.x, y + NAME_H / 2 - 2); c.restore()
    }

    function drawMsg(L, t, y) {
      const m = L.m
      const k = pop01(t, m.at, 0.24, 2.2)
      if (m.kind === 'system' || m.kind === 'divider') {
        c.save(); c.globalAlpha = clamp(k); c.font = `700 24px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'
        const w = c.measureText(m.text).width + 40
        if (m.kind === 'divider') { R(c, 'rgba(201,166,255,0.25)', 40, y + 23, PANEL.w - 80, 2); panel(c, PANEL.w / 2 - w / 2, y + 4, w, 38, '#2a2056', 6) }
        else panel(c, PANEL.w / 2 - w / 2, y + 4, w, 38, 'rgba(255,255,255,0.06)', 6)
        c.fillStyle = m.kind === 'divider' ? GOLD : LAV; c.fillText(m.text, PANEL.w / 2, y + 24)
        c.restore(); return
      }
      const S = SIGN(m.from)
      const bx = BX - PANEL.x
      let by = y
      if (L.head) {
        // avatar: the sender's star
        const ak = pop01(t, m.at, 0.3, 2.4)
        drawStarChar(c, 58, y + NAME_H + 26, AV, t, { color: S.color, mood: m.mood || (m.kind === 'voice' ? 'sparkle' : 'happy'), look: [1, 0], pop: ak, seed: ORDER.indexOf(m.from) + 1, glow: 0.6, tips: false, bob: 1.5 })
        if (m.from === 'pisces' && t > m.at) inSprite(c, starFrame(58, y + NAME_H + 26, AV, t, { pop: ak, seed: 12, bob: 1.5 }), () => tearsCells(c, t, 1))
        c.save(); c.globalAlpha = clamp(k); nameRow(m, y); c.restore()
        by += NAME_H
      }
      c.save(); c.translate(bx, by + L.bh); c.scale(k, k); c.translate(0, -L.bh)
      // bubble
      const big = !!m.big
      const bg = big ? '#3a2a6e' : '#2a2350'
      if (big) { c.save(); c.globalAlpha = 0.35 + 0.15 * Math.sin(t * 6); panel(c, -6, -6, L.bw + 12, L.bh + 12, S.color, 12); c.restore() }
      panel(c, 0, 0, L.bw, L.bh, bg, 10)
      R(c, S.color, 0, 10, 7, L.bh - 20)
      c.textAlign = 'left'; c.textBaseline = 'alphabetic'
      if (m.kind === 'text') {
        c.font = big ? FONT_BIG : FONT
        L.w.lines.forEach((ln, i) => drawRuns(c, ln, PADX, PADY + (i + 0.78) * L.lh, BONE, m.accent || GOLD))
      } else if (m.kind === 'reply') {
        R(c, 'rgba(255,255,255,0.07)', PADX, PADY, L.bw - 2 * PADX, 62); R(c, SIGN(m.re.from).color, PADX, PADY, 5, 62)
        c.font = `700 20px ${MONO}`; c.fillStyle = SIGN(m.re.from).color; c.fillText(`↳ ${TAG(m.re.from)}`, PADX + 16, PADY + 24)
        c.font = `600 26px ${INTER}`; c.fillStyle = 'rgba(239,230,214,0.75)'
        let s = m.re.text; while (c.measureText(s).width > L.bw - 2 * PADX - 30 && s.length > 4) s = s.slice(0, -2)
        c.fillText(s, PADX + 16, PADY + 52)
        c.font = FONT
        L.w.lines.forEach((ln, i) => drawRuns(c, ln, PADX, PADY + 76 + (i + 0.78) * LH, BONE, m.accent || GOLD))
      } else if (m.kind === 'voice') {
        // play button, waveform, duration
        drawBits(c, ['P...', 'PPP.', 'PPPP', 'PPP.', 'P...'], { P: BONE }, 46, 48, 7)
        const n = 26
        for (let i = 0; i < n; i++) {
          const hh = 10 + 46 * Math.abs(Math.sin(i * 1.7 + 0.5) * Math.sin(i * 0.43 + 1)) * (0.75 + 0.25 * Math.sin(t * 9 + i))
          R(c, i / n < prog(t, m.at + 0.2, m.at + 3.5) ? S.color : 'rgba(239,230,214,0.45)', 86 + i * 14, 48 - hh / 2, 8, hh)
        }
        c.font = `700 26px ${MONO}`; c.fillStyle = BONE; c.textAlign = 'right'; c.fillText(m.dur || '0:41', L.bw - 18, 58); c.textAlign = 'left'
        if (m.note) { c.font = `italic 500 34px ${SERIF}`; c.fillStyle = '#8fe3ff'; c.fillText(m.note, PADX + 8, 126) }
      } else if (m.kind === 'agenda') {
        c.font = `700 24px ${MONO}`; c.fillStyle = GOLD; c.fillText(m.title || 'AGENDA', PADX, 40)
        R(c, 'rgba(242,199,92,0.4)', PADX, 52, L.bw - 2 * PADX, 3)
        let yy = 64
        L.items.forEach((it, j) => {
          const at = m.at + 0.3 + j * (m.gap || 0.32)
          const ik = clamp(prog(t, at, at + 0.15))
          if (it.hi && t > at) { c.save(); c.globalAlpha = (0.25 + 0.2 * Math.sin(t * 7)) * ik; R(c, RED, PADX - 8, yy, L.bw - 2 * PADX + 16, it.w.lines.length * 44 + 4); c.restore() }
          c.save(); c.globalAlpha = ik; c.font = `600 34px ${INTER}`
          it.w.lines.forEach((ln, q) => drawRuns(c, ln, PADX + 6 + (1 - ik) * 20, yy + (q + 0.8) * 44, it.hi ? '#ffd0d6' : BONE, GOLD))
          c.restore()
          yy += it.w.lines.length * 44 + 6
        })
      } else if (m.kind === 'triple') {
        let yy = PADY
        L.items.forEach((it, j) => {
          const at = m.at + j * 0.14, ik = clamp(prog(t, at, at + 0.12))
          c.save(); c.globalAlpha = ik
          R(c, SIGN(it.to).color, PADX, yy + 4, 5, 26)
          c.font = `700 22px ${MONO}`; c.fillStyle = SIGN(it.to).color; c.fillText(`↳ re: ${TAG(it.to)}`, PADX + 14, yy + 26)
          c.font = FONT
          it.w.lines.forEach((ln, q) => drawRuns(c, ln, PADX + 14, yy + 34 + (q + 0.78) * LH, BONE, GOLD))
          c.restore()
          yy += 34 + it.w.lines.length * LH + 12
        })
      } else if (m.kind === 'poll') {
        c.font = `700 36px ${INTER}`
        L.q.lines.forEach((ln, i) => drawRuns(c, ln, PADX, 18 + (i + 0.8) * 46, BONE, GOLD))
        let yy = 30 + L.q.lines.length * 46
        const counts = m.opts.map(o => { let n = 0; for (const [a, v] of (o.votes || [])) if (t >= a) n = v; return n })
        const tot = Math.max(1, ...counts)
        m.opts.forEach((o, j) => {
          const oa = o.at ?? m.at, ok = clamp(prog(t, oa, oa + 0.2))
          if (ok <= 0) { yy += 70; return }
          c.save(); c.globalAlpha = ok
          const bw = L.bw - 2 * PADX
          R(c, 'rgba(255,255,255,0.08)', PADX, yy, bw, 56)
          const f = counts[j] / tot
          R(c, o.col || S.color, PADX, yy, bw * f * 0.999, 56)
          c.font = `${o.small ? 600 : 700} ${o.small ? 26 : 32}px ${INTER}`; c.fillStyle = BONE; c.fillText(o.label, PADX + 16, yy + 38)
          c.font = `700 26px ${MONO}`; c.textAlign = 'right'; c.fillText(String(counts[j]), PADX + bw - 14, yy + 37); c.textAlign = 'left'
          c.restore()
          yy += 70
        })
      } else if (m.kind === 'image') {
        c.save(); c.beginPath(); c.rect(12, 10, L.bw - 22, L.bh - 20); c.clip(); c.translate(12, 10)
        m.draw(c, t, L.bw - 22, L.bh - 20, m)
        c.restore()
      }
      c.restore()
      // reactions
      if (m.react) {
        const chips = {}
        for (const [a, ic, n] of m.react) if (t >= a) chips[ic] = { n, a }
        let rx = bx + 10
        const ry = by + L.bh + 6
        for (const ic of Object.keys(chips)) {
          const ch = chips[ic], rk = pop01(t, ch.a, 0.25, 2.6)
          c.save(); c.translate(rx + 50, ry + 18); c.scale(rk, rk)
          panel(c, -50, -18, 100, 36, '#3b3270', 8)
          if (ic === 'heart') drawBits(c, HEART, { H: '#ff5c8a' }, -22, 0, 3.4, { outline: null })
          else if (ic === 'tear') drawBits(c, TEAR, { T: '#8fe3ff', W: '#ffffff' }, -22, 0, 4, { outline: null })
          else if (ic === 'star') drawBits(c, PSTAR, { S: GOLD }, -22, 0, 4, { outline: null })
          else { c.font = `800 20px ${INTER}`; c.fillStyle = GOLD; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('HA', -22, 1) }
          c.font = `700 22px ${MONO}`; c.fillStyle = BONE; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(String(ch.n), 0, 1)
          c.restore()
          rx += 112
        }
      }
    }

    function drawTyping(ty, t, y, k) {
      c.save(); c.globalAlpha = clamp(k)
      const col = ty.from ? SIGN(ty.from).color : LAV
      const text = ty.label || `${SHORT(ty.from)} is typing`
      panel(c, BX - PANEL.x, y + 4, 120, 46, '#2a2350', 8)
      for (let i = 0; i < 3; i++) { const on = Math.floor((t - ty.a) * 7) % 3 === i; R(c, on ? BONE : '#8a83b8', BX - PANEL.x + 24 + i * 28, y + 20 + (on ? -4 : 0), 14, 14) }
      c.font = `italic 500 34px ${SERIF}`; c.fillStyle = col; c.textAlign = 'left'; c.textBaseline = 'middle'
      c.fillText(text + '…', BX - PANEL.x + 140, y + 28)
      c.restore()
    }

    // ── the stage strip
    function stageAt(t) { let e = null; for (const s of stage) if (t >= s.at) e = s; return e }
    function signEntry(t) {
      // when did the current sign first come on (for the pop-in)?
      let cur = null, since = -9
      for (const s of stage) { if (t < s.at) break; if (!cur || cur.sign !== s.sign) since = s.at; cur = s }
      return { e: cur, since }
    }
    function drawStage(t) {
      // floor glow
      const g = x.createLinearGradient(0, 1470, 0, 1920); g.addColorStop(0, 'rgba(40,28,90,0)'); g.addColorStop(1, 'rgba(40,28,90,0.55)')
      x.fillStyle = g; x.fillRect(0, 1470, 1080, 450)
      const { e, since } = signEntry(t)
      const ok = outK(t, OUT)
      if (e) {
        const S = SIGN(e.sign)
        const hops = [since + 0.02, ...stage.filter(s => s.sign === e.sign && s.at > since).map(s => s.at + 0.02), ...(e.hops || [])]
        const pk = (since <= 0 ? 1 : pop01(t, since, 0.34, 2.2)) * ok
        shadow(x, STAGE.x, STAGE.y + 118, 230 * pk)
        const o = { color: S.color, glyph: S.glyph, mood: e.mood || 'happy', look: e.look, hops, pop: pk, seed: ORDER.indexOf(e.sign) + 2, glow: 1.05 }
        drawStarChar(x, STAGE.x, STAGE.y, STAGE.s, t, o)
        const F = starFrame(STAGE.x, STAGE.y, STAGE.s, t, o)
        if (!e.noPhone) handPhone(x, STAGE.x + F.S * 0.42, F.cy + F.S * 0.05, 1.15 * pk, 0.15 + 0.05 * Math.sin(t * 3), 1)
        if (e.prop) e.prop(x, t, { x: STAGE.x, y: STAGE.y, s: STAGE.s, F, pk, sign: e.sign })
        if (e.tears) inSprite(x, F, () => tearsCells(x, t, e.tears))
        label(x, TAG(e.sign), STAGE.x, STAGE.y + 170, { size: 26, col: S.color, alpha: clamp(pk) })
        if (e.two) {
          const S2 = SIGN(e.two.sign), p2 = (since <= 0 ? 1 : pop01(t, Math.max(since, e.two.at ?? e.at), 0.34, 2.2)) * ok
          shadow(x, STAGE.x2, STAGE.y + 110, 190 * p2)
          drawStarChar(x, STAGE.x2, STAGE.y + 14, STAGE.s2, t, { color: S2.color, glyph: S2.glyph, mood: e.two.mood || 'happy', look: e.two.look, pop: p2, seed: ORDER.indexOf(e.two.sign) + 5, glow: 1, hops: e.two.hops })
          label(x, TAG(e.two.sign), STAGE.x2, STAGE.y + 170, { size: 26, col: S2.color, alpha: clamp(p2) })
        }
      }
      // Pisces, always, crying
      const pk = ok
      tissues(x, STAGE.pisX - 118, STAGE.pisY + 64, 70)
      const po = { color: PIS.color, glyph: PIS.glyph, mood: pisMoodAt(t), look: [-1, -0.6], seed: 6, glow: 0.85, pop: pk, hops: PIS_HOPS, tips: false }
      drawStarChar(x, STAGE.pisX, STAGE.pisY, STAGE.pisS, t, po)
      const F = starFrame(STAGE.pisX, STAGE.pisY, STAGE.pisS, t, po)
      inSprite(x, F, () => tearsCells(x, t, cryAt(t)))
      label(x, TAG('pisces'), STAGE.pisX, STAGE.pisY + 128, { size: 24, col: PIS.color, alpha: clamp(pk) })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const base = { ...SKY_H, zoom: SKY_H.zoom * (1 + 0.04 * Math.sin(t * 0.25)), dy: -10 * t / DURATION * 4 }
        drawSky(x, t, base)
        // the chat
        drawChat(t)
        const pu = Math.max(0, ...punches.map(p => (t >= p && t < p + 0.35) ? 1 - ease.outCubic((t - p) / 0.35) : 0))
        const ok = outK(t, OUT)
        const sc = (1 + 0.045 * pu) * lerp(0.92, 1, ok)
        x.save(); x.globalAlpha = clamp(ok)
        x.translate(PANEL.x + PANEL.w / 2, PANEL.y + PANEL.h / 2); x.scale(sc, sc)
        x.fillStyle = 'rgba(4,2,12,0.5)'; x.fillRect(-PANEL.w / 2 + 14, -PANEL.h / 2 + 18, PANEL.w, PANEL.h)
        x.drawImage(cc, -PANEL.w / 2, -PANEL.h / 2)
        x.restore()
        drawStage(t)
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.extra) cfg.extra(tx, t, { PANEL, STAGE, ok })
        // the last line's sparkle
        const LAST = heads[heads.length - 1]
        sparkles(tx, t, 540, 250, LAST.at + 0.6, 14, 420, 1, [GOLD, BONE, PINK])
        for (const { h, p } of HEADS) p.update(t, outK(t, h.out))
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END]))
        drawGrain(gx, t)
      },
    }
  }

  // ── the bug: "THE THREAD" in Inter 800 small caps, letter-spaced, top-left 56 px
  function buildBug(root) {
    const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
    el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(127,224,192,0.7)` }, b)
    el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'THE&nbsp;<span style="color:rgba(255,255,255,0.7)">THREAD</span>')
    return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
  }

  const CUTS = [{ t: cfg.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const pitch = id => NOTE[ORDER.indexOf(id) % 7] * (ORDER.indexOf(id) >= 7 ? 1.5 : 1)
  const pos = v => v >= 0
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.022) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const CUES = []
  for (const h of heads) if (h.at > 0) {
    const n = h.text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
    CUES.push(...wordPops(h.at, Math.min(n, 8), 0.08, 0), ['whoosh', r3(h.at - 0.05), 0.25, 0.02])
    if (h.isLast) CUES.push(['bell', r3(h.at + 0.6), 1760, 0.03, 1.1, 0], ['glitter', r3(h.at + 0.6), r3(h.at + 1.1)], ['pop', r3(h.at + 0.55), 1174.66, 0.045, 0])
  }
  for (const m of msgs) {
    if (!pos(m.at)) continue
    if (m.kind === 'system' || m.kind === 'divider') { CUES.push(['tick', m.at, 0.05], ['pop', r3(m.at + 0.02), 1318.51, 0.02, 0]); continue }
    const p = pitch(m.from), pan = -0.2 + 0.4 * ((ORDER.indexOf(m.from) * 5) % 12) / 11
    CUES.push(['pop', m.at, p, 0.045, pan], ['pop', r3(m.at + 0.05), p * 1.5, 0.025, pan])
    if (m.big) CUES.push(['bell', r3(m.at + 0.04), 1760, 0.028, 0.9, 0], ['whoosh', r3(m.at - 0.06), 0.25, 0.03])
    if (m.kind === 'voice') CUES.push(...[0.2, 0.42, 0.66, 0.9, 1.2].map((d, i) => ['pluck', r3(m.at + d), [659.25, 739.99, 587.33, 659.25, 554.37][i], 0.026, 0.5, (i % 2 ? 0.3 : -0.3)]))
    if (m.kind === 'agenda') m.items.forEach((_, j) => CUES.push(['tick', r3(m.at + 0.3 + j * (m.gap || 0.32)), 0.045]))
    if (m.kind === 'triple') m.items.forEach((_, j) => CUES.push(['pop', r3(m.at + j * 0.14), NOTE[(j * 2 + 1) % 7] * 1.5, 0.03, (j - 1) * 0.4]))
    if (m.kind === 'poll') m.opts.forEach(o => { if (o.at > m.at) CUES.push(['pop', o.at, 1567.98, 0.04, 0.2]); (o.votes || []).forEach(([a]) => { if (a > 0) CUES.push(['tick', a, 0.03]) }) })
    for (const [a] of (m.react || [])) if (a > 0) CUES.push(['pop', a, 1760, 0.018, 0.4])
  }
  for (const q of (cfg.typing || [])) for (let s = Math.max(0, q.a); s < q.b - 0.1; s += 0.3) CUES.push(['tick', r3(s), 0.012])
  for (const [a] of (cfg.pins || [])) if (a > 0) CUES.push(['pop', a, 1318.51, 0.04, -0.3], ['tick', r3(a + 0.04), 0.05])
  for (const [a] of (cfg.renames || [])) if (a > 0) CUES.push(['whoosh', r3(a - 0.04), 0.22, 0.025], ['pop', r3(a + 0.1), 1174.66, 0.03, 0])
  for (const p of (cfg.punch || [])) if (p > 0) CUES.push(['whoosh', r3(p - 0.06), 0.25, 0.03])
  let prev = null
  for (const s of stage) { if (s.at > 0 && (!prev || prev.sign !== s.sign)) CUES.push(['pop', r3(s.at), 523.25, 0.03, -0.4]); prev = s }
  for (const [a] of (cfg.cry || [])) if (a > 0) CUES.push(['pluck', r3(a), 1318.51, 0.02, 0.4, 0.5])
  CUES.push(['whoosh', r3(OUT[0]), 0.3, 0.025], ...(cfg.cues || []), ...cardCutCues(CUTS), ...endcardCues(STORY_END))

  return { DURATION, STORY_END, SCENES, CUES, CUTS }
}

/** a screenshot of a 1:1 text thread, for { kind: 'image', draw: shot([...]) }.
 *  lines: [{ side: 'R' | 'L', text, at }] (at = absolute pop time; omitted → m.at + 0.3 + 0.5·i); title: the header */
export function shot(lines, { title = 'my person', size = 30, col = '#4f8df0' } = {}) {
  return (x, t, w, h, m) => {
    R(x, '#120c2a', 0, 0, w, h)
    R(x, '#1f1747', 0, 0, w, 44)
    x.font = `700 22px ${MONO}`; x.fillStyle = LAV; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, w / 2, 23)
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    let y = 60
    lines.forEach((ln, i) => {
      const at = ln.at ?? m.at + 0.3 + 0.5 * i
      const k = pop01(t, at, 0.22, 2.2)
      x.font = `600 ${size}px ${INTER}`
      const ww = wrapRuns(x, ln.text, w * 0.78 - 32, `600 ${size}px ${INTER}`)
      const bw = ww.width + 32, bh = ww.lines.length * size * 1.25 + 20
      if (k > 0.01) {
        const bx = ln.side === 'R' ? w - 14 - bw : 14
        x.save(); x.translate(bx + (ln.side === 'R' ? bw : 0), y + bh); x.scale(k, k); x.translate(ln.side === 'R' ? -bw : 0, -bh)
        panel(x, 0, 0, bw, bh, ln.side === 'R' ? col : '#3b3466', 8)
        ww.lines.forEach((l, q) => drawRuns(x, l, 16, 10 + (q + 0.82) * size * 1.25, BONE, GOLD))
        x.restore()
      }
      y += bh + 12
    })
  }
}
