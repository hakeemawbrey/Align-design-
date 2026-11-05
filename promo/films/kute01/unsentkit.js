// THE UNSENT TEXT: the shared look of the Month 2 trial-reel series kute01–kute24 (promo/films/month2/m36.md).
// kute02–24 import this file read-only from ../../kute01/unsentkit.js.
//
// The format: one sign, one phone, one feeling. A draft is typed… deleted (letters fly off the screen)… typed…
// deleted, and THE STARS close on ONE line about what to do with the feeling. No end card, no card cut, no logo.
//   frame 0   the phone is already mid-delete (letters mid-flight), the hero mid-reaction, the hook line on screen.
//   ≤ 1 s     a pattern break (record-scratch freeze or whip zoom onto the draft, from ../hookkit.js when present).
//   drafts    typed at a human pace (keys light up), deleted in a backspace burst or a select-all wipe, or SENT.
//   last      THE STARS' line in the RPG box; the phone lifts out of its way. Then a hard cut or a seamless loop:
//             a loop crossfades the canvas into the film's own pre-roll so the last frame IS frame 0.
// Pisces reads over the hero's shoulder (top right, behind the phone) and cries more with every deleted draft.
//
//   makeUnsent(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id, cfg.sign ('aries'…), cfg.name, cfg.to (chat header name), cfg.status (header subline, e.g. 'online')
//     cfg.hook  'Hook line with *accent*'  (≤ 7 words; `|` = line break)
//     cfg.duration, cfg.ending 'cut' | 'loop'
//     cfg.drafts [{ text, at, cps = 15, del, delCps = 34, wipe = false, send }]  (times in s; at may be < 0 for frame 0)
//     cfg.msgs  [{ text, at, from: 'them' | 'me', typing: [t0, t1], stamp }]  chat history / replies
//     cfg.lines [{ t, text, speaker = 'THE STARS' }] (the last one is the last line), cfg.boxClose
//     cfg.moods [[t, mood, look?]] hero mood timeline (mood at the latest t ≤ now)
//     cfg.breaks [{ kind: 'scratch' | 'whip' | 'shake' | 'flash', at }]  pattern breaks
//     cfg.hero { x, y, s }, cfg.pis { x, y, s } | false, cfg.pisHero (Pisces is the hero: tears on the screen)
//     cfg.back(x, t, S) / cfg.front(x, t, S) / cfg.screen(x, t, S) film-specific drawing (behind / in front / on screen)
//     cfg.cues extra sound cues, cfg.lift [t0, t1] when the phone lifts for the box (default from lines)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR, lineTimes } from '../startalk.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, screenShake, shakeCues, loopK, loopCues } from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', BLUE = '#4f8cff', TEAR = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG = '#7fd0ff'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
}
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) { x.fillStyle = outline; for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', PINK, GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    drawBits(x, HEART, { H: cols[i % cols.length] }, cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, cy - p * 200, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4); x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }

// ── star sprite frame (mirrors startalk.js) so tears sit on the sprite through hops and squash
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
  const S = cell * G, bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops), sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell); fn(); ctx.restore()
}
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = TEAR; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = TEAR; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
/** a crying star (any sign): drawStarChar + tears. Returns the sprite frame. */
export function cryStar(x, t, color, o, tears) {
  const opts = { color, seed: 6, glow: 0.85, tips: false, ...o }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
  return F
}
/** a tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── the phone geometry (canvas px, before the camera)
export const PH = { x: 315, y: 430, w: 570, h: 1130 }
const SCR = { x: PH.x + 24, y: PH.y + 24, w: PH.w - 48, h: PH.h - 48 }
const HEAD_H = 118, KB_H = 318
const KB_Y = SCR.y + SCR.h - KB_H
const FIELD_BOTTOM = KB_Y - 18
const FONT_PX = 56, LINE_H = 68, FIELD_PAD = 22, FIELD_W = SCR.w - 40 - 2 * FIELD_PAD
export const KEYROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']

// ── the draft schedule (pure): how many chars are visible at t, and every deleted char's flight
function draftSchedule(d) {
  const cps = d.cps || 15, delCps = d.delCps || 34, n = d.text.length
  const typeEnd = d.at + n / cps
  // a human typing rhythm: tiny per-char jitter, word gaps a touch longer (deterministic)
  const tChar = []
  let acc = d.at
  for (let i = 0; i < n; i++) { const c = d.text[i]; tChar.push(acc); acc += (1 / cps) * (c === ' ' ? 1.35 : 0.8 + 0.4 * (((i * 37) % 11) / 10)) }
  const scaleK = (typeEnd - d.at) / Math.max(1e-6, acc - d.at)
  for (let i = 0; i < n; i++) tChar[i] = d.at + (tChar[i] - d.at) * scaleK
  const tDel = new Array(n).fill(Infinity)
  if (d.del != null) {
    if (d.wipe) for (let i = 0; i < n; i++) tDel[i] = d.del + 0.004 * (n - 1 - i)
    else for (let i = n - 1; i >= 0; i--) tDel[i] = d.del + (n - 1 - i) / delCps
  }
  const end = d.del != null ? Math.max(...tDel.filter(isFinite)) : d.send != null ? d.send : Infinity
  return { ...d, n, tChar, tDel, typeEnd, end, delEnd: d.del != null ? d.del + (d.wipe ? 0.01 * n : n / delCps) : null }
}

// layout (needs a ctx for measureText): greedy word wrap, per-char positions relative to the field's text origin
function layoutText(x, text, font, maxW, lineH) {
  x.save(); x.font = font
  const pos = [], words = text.split(/(\s+)/)
  let lx = 0, ly = 0, i = 0
  for (const w of words) {
    if (!w.length) continue
    const ww = x.measureText(w).width
    if (!/^\s+$/.test(w) && lx > 0 && lx + ww > maxW) { lx = 0; ly += lineH }
    for (const ch of w) {
      const cw = x.measureText(ch).width
      if (/\s/.test(ch) && lx === 0 && ly > 0) { pos.push({ x: lx, y: ly, w: 0, ch }); i++; continue }
      pos.push({ x: lx, y: ly, w: cw, ch }); lx += cw; i++
    }
  }
  x.restore()
  return { pos, lines: ly / lineH + 1 }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeUnsent(cfg) {
  const DURATION = cfg.duration
  const HERO = signStar(cfg.sign), PIS = signStar('pisces')
  const DRAFTS = cfg.drafts.map(draftSchedule)
  const MSGS = (cfg.msgs || []).map(m => ({ from: 'them', ...m }))
  // sent drafts become my bubbles
  DRAFTS.forEach(d => { if (d.send != null) MSGS.push({ from: 'me', text: d.text, at: d.send + 0.18, sent: true, until: d.until }) })
  MSGS.sort((a, b) => a.at - b.at)
  const LOOP_L = cfg.loopLen || 0.45
  const SEGS0 = cfg.segs || ((cfg.lines || []).length ? [{ lines: cfg.lines, close: null }] : [])
  const LINES = SEGS0.flatMap(g => g.lines).map(l => ({ speaker: 'THE STARS', ...l }))
  const CPS = cfg.cps || 30
  const LT = lineTimes(LINES, { cps: CPS })
  const lastDone = LT.length ? LT[LT.length - 1].done : DURATION
  const boxClose = cfg.boxClose ?? (cfg.ending === 'loop' ? DURATION - 0.5 : DURATION + 1)
  const LIFT = cfg.lift || (LINES.length ? [LINES[LINES.length - 1].t - 0.5, LINES[LINES.length - 1].t - 0.1] : null)
  const SEGS = SEGS0.map((g, i) => {
    const lines = g.lines.map(l => ({ speaker: 'THE STARS', ...l }))
    const close = g.close ?? boxClose, t0 = lines[0].t
    const last = i === SEGS0.length - 1
    const up = i === SEGS0.length - 1 && cfg.lift ? cfg.lift : [t0 - 0.5, t0 - 0.1]
    return { lines, close, up, down: last && cfg.ending !== 'loop' ? null : last ? [close - 0.1, DURATION - LOOP_L] : [close - 0.05, close + 0.35] }
  })
  const liftAt = t => Math.max(0, ...SEGS.map(g => ease.inOutCubic(prog(t, g.up[0], g.up[1])) * (g.down ? 1 - ease.inOutCubic(prog(t, g.down[0], g.down[1])) : 1)))
  const starsK = t => Math.max(0, ...SEGS.map(g => g.lines.some(l => l.speaker === 'THE STARS') ? pop01(t, g.lines[0].t - 0.35, 0.36, 2.1) * outK(t, [g.close - 0.2, g.close]) : 0))
  const head = t => ({ to: cfg.to, status: cfg.status, avatar: cfg.avatar, statusCol: cfg.statusCol, ...(cfg.header ? cfg.header(t) : {}) })
  const heroPos = { x: 175, y: 1250, s: 310, ...(cfg.hero || {}) }
  const pisPos = cfg.pis === false ? null : { x: 958, y: 655, s: 235, ...(cfg.pis || {}) }
  const STARS_HOPS = LINES.flatMap(l => [l.t - 0.3, ...talkHops([l], l.speaker, { cps: CPS })])
  const breaks = cfg.breaks || []
  const T = { lastDone, boxClose, LIFT }

  // deletes so far (for Pisces' sobbing level)
  const delTimes = DRAFTS.filter(d => d.del != null).map(d => d.del)
  const sobLevel = t => cfg.sob ? cfg.sob(t) : Math.min(3, 2 + delTimes.filter(v => v <= t && v > 0).length)

  // default mood track: wide on every delete, squint while typing, happy on a send and for the last line
  const MOODS = cfg.moods || [[-9, 'wide', [1, -0.6]], ...cfg.drafts.flatMap(d => [[d.at, 'squint', [1, -0.3]], ...(d.del != null ? [[d.del, 'wide', [0, 0]]] : []), ...(d.send != null ? [[d.send, 'sparkle', [0, 0]]] : [])]).filter(m => m[0] > -9).sort((a, b) => a[0] - b[0]),
    ...((cfg.lines || []).length ? [[cfg.lines[cfg.lines.length - 1].t + 0.6, 'happy', [1, 0.3]]] : [])]
  const moodAt = t => {
    let m = ['neutral', undefined]
    for (const [mt, mood, look] of MOODS) if (mt <= t) m = [mood, look]
    return m
  }
  const heroHops = (cfg.heroHops || []).concat(DRAFTS.flatMap(d => [d.del, d.send].filter(v => v != null).map(v => v + 0.02)))

  // ── camera from the pattern breaks: returns { zoom, cx, cy, shake, freezeAt, flash, tint }
  function camera(t) {
    let zoom = 1, cx = PH.x + PH.w / 2, cy = FIELD_BOTTOM - 60, dx = 0, dy = 0, freezeAt = null, flash = 0, scratch = 0
    for (const b of breaks) {
      if (b.kind !== 'flash') continue
      const d = t - b.at
      if (b.kind === 'whip') {
        if (d >= -0.16 && d < 0.9) {
          const pin = ease.inCubic(clamp((d + 0.16) / 0.16)), pout = ease.inOutCubic(clamp((d - 0.35) / 0.55))
          zoom *= 1 + (b.zoom || 0.55) * pin * (1 - pout)
          if (b.cy) cy = b.cy; if (b.cx) cx = b.cx
          if (d >= 0 && d < 0.1) flash = Math.max(flash, 0.5 * (1 - d / 0.1))
        }
      } else if (b.kind === 'scratch') {
        const F = b.hold || 0.42
        if (d >= 0 && d < F) { freezeAt = b.at; scratch = 1 - d / F; zoom *= 1.06 + 0.02 * Math.sin(d * 50) }
        if (d >= 0 && d < 0.08) flash = Math.max(flash, 0.6 * (1 - d / 0.08))
      } else if (b.kind === 'shake') {
        if (d >= 0 && d < 0.6) { const a = (b.amp || 22) * Math.exp(-d * 6); dx += a * Math.sin(d * 71); dy += a * 0.7 * Math.sin(d * 53 + 1) }
      } else if (b.kind === 'flash') {
        if (d >= 0 && d < 0.14) flash = Math.max(flash, (b.amt || 0.7) * (1 - d / 0.14))
      }
    }
    return { zoom, cx, cy, dx, dy, freezeAt, flash, scratch }
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "700 44px Inter", "600 30px Inter", "800 28px Inter", "italic 500 120px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const off = document.createElement('canvas'); off.width = 1080; off.height = 1920; const ox = off.getContext('2d')
    const FONT = `700 ${FONT_PX}px ${INTER}`
    const LAY = DRAFTS.map(d => layoutText(x, d.text, FONT, FIELD_W, LINE_H))
    const MLAY = MSGS.map(m => layoutText(x, m.text, `600 38px ${INTER}`, SCR.w * 0.7 - 44, 48))
    const boxes = SEGS.map(g => dialogueBox(root, { lines: g.lines, y: 1490, open: g.lines[0].t - 0.22, close: g.close, cps: CPS }))
    const bug = buildBug(root)
    const top = layerCanvas(root), tx = top.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flashEl = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const S = { HERO, PIS, PH, SCR, cfg, hero: (c, t, o) => drawStarChar(c, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o }) }

    // ── the phone
    function phoneBody(c, t) {
      box(c, PH.x, PH.y, PH.w, PH.h, '#2a2148', { b: 8 })
      R(c, '#3a2f60', PH.x + 6, PH.y + 6, PH.w - 12, 8)
      R(c, '#0f0b22', SCR.x, SCR.y, SCR.w, SCR.h)
      // header: avatar + name
      R(c, '#1a1434', SCR.x, SCR.y, SCR.w, HEAD_H)
      R(c, 'rgba(239,230,214,0.12)', SCR.x, SCR.y + HEAD_H - 3, SCR.w, 3)
      const hd = head(t)
      R(c, '#4a3d78', SCR.x + 28, SCR.y + 26, 66, 66); R(c, hd.avatar || LAV, SCR.x + 34, SCR.y + 32, 54, 54)
      c.save(); c.font = `800 30px ${INTER}`; c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText((hd.to || '?')[0].toUpperCase(), SCR.x + 61, SCR.y + 61); c.restore()
      c.save(); c.textBaseline = 'middle'; c.textAlign = 'left'
      c.font = `800 34px ${INTER}`; c.fillStyle = BONE; c.fillText(hd.to || '', SCR.x + 114, SCR.y + 46)
      c.font = `700 22px ${MONO}`; c.fillStyle = hd.statusCol || '#9fe6b0'; c.fillText(hd.status || 'online', SCR.x + 114, SCR.y + 82)
      c.restore()
      void t
    }
    function keyboard(c, t, active) {
      R(c, '#1d1838', SCR.x, KB_Y, SCR.w, KB_H)
      const kw = (SCR.w - 22) / 10, kh = 62
      KEYROWS.forEach((row, j) => {
        const off0 = j === 1 ? kw * 0.5 : j === 2 ? kw * 1.5 : 0
        ;[...row].forEach((ch, i) => {
          const X = SCR.x + 11 + off0 + i * kw, Y = KB_Y + 14 + j * (kh + 12)
          const on = active.key === ch
          R(c, on ? GOLD : '#3b3366', X + 3, Y + (on ? 3 : 0), kw - 6, kh)
          R(c, on ? '#fff1c8' : '#4c4380', X + 3, Y + (on ? 3 : 0), kw - 6, 6)
          c.save(); c.font = `700 26px ${MONO}`; c.fillStyle = on ? INK : BONE; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(ch, X + kw / 2, Y + kh / 2 + (on ? 5 : 2)); c.restore()
        })
      })
      // backspace + space + send
      const Y3 = KB_Y + 14 + 2 * (kh + 12), bx = SCR.x + 11 + kw * 8.5
      R(c, active.del ? RED : '#3b3366', bx + 3, Y3 + (active.del ? 3 : 0), kw * 1.5 - 6, kh)
      c.save(); c.font = `700 30px ${MONO}`; c.fillStyle = BONE; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('⌫', bx + kw * 0.75, Y3 + kh / 2 + 2); c.restore()
      const Y4 = KB_Y + 14 + 3 * (kh + 12)
      R(c, active.space ? GOLD : '#3b3366', SCR.x + 11 + kw * 2, Y4, kw * 5.4, kh - 6)
      R(c, active.send ? '#9fe6b0' : BLUE, SCR.x + 11 + kw * 7.7, Y4, kw * 2.2, kh - 6)
      c.save(); c.font = `800 24px ${INTER}`; c.fillStyle = active.send ? INK : BONE; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('SEND', SCR.x + 11 + kw * 8.8, Y4 + (kh - 6) / 2 + 1); c.restore()
      void t
    }
    // which draft is on screen at t, and its visible char count
    function draftState(t) {
      for (let k = DRAFTS.length - 1; k >= 0; k--) {
        const d = DRAFTS[k]
        if (t < d.tChar[0] - 0.25 && !(d.at < 0 && k === 0)) continue
        let vis = 0
        for (let i = 0; i < d.n; i++) if (d.tChar[i] <= t && d.tDel[i] > t) vis = i + 1
        if (d.del != null && t >= d.delEnd + 0.02) { if (k === DRAFTS.length - 1) return { k, d, vis: 0, gone: true }; continue }
        if (d.hide != null && t >= d.hide) { if (k === DRAFTS.length - 1) return { k, d, vis: 0, gone: true }; continue }
        if (d.send != null && t >= d.send) return { k, d, vis: 0, sentAt: d.send }
        return { k, d, vis }
      }
      return { k: -1, d: null, vis: 0 }
    }
    function activeKey(t) {
      for (const d of DRAFTS) {
        if (d.send != null && t >= d.send && t < d.send + 0.18) return { send: true }
        if (d.del != null && t >= d.del && t < d.delEnd + 0.06) return { del: true }
        for (let i = 0; i < d.n; i++) if (t >= d.tChar[i] && t < d.tChar[i] + 0.09 && t < d.tDel[i]) { const ch = d.text[i].toLowerCase(); return ch === ' ' ? { space: true } : { key: ch } }
      }
      return {}
    }
    function field(c, t) {
      const st = draftState(t)
      const L = st.k >= 0 ? LAY[st.k] : { pos: [], lines: 1 }
      const lines = Math.max(1, L.lines)
      const fh = lines * LINE_H + 2 * FIELD_PAD - 8
      const fx = SCR.x + 20, fy = FIELD_BOTTOM - fh, fw = SCR.w - 40
      box(c, fx, fy, fw, fh, '#262046', { b: 4 })
      const ox0 = fx + FIELD_PAD, oy0 = fy + FIELD_PAD + FONT_PX * 0.5 - 4
      c.save(); c.font = FONT; c.textBaseline = 'middle'; c.textAlign = 'left'
      if (st.vis === 0 && !st.d) { c.fillStyle = 'rgba(239,230,214,0.3)'; c.fillText('message', ox0, oy0) }
      for (let i = 0; i < st.vis; i++) {
        const p = L.pos[i]
        const age = t - st.d.tChar[i]
        const sc = age < 0.1 ? 1 + 0.35 * (1 - age / 0.1) : 1
        c.save(); c.translate(ox0 + p.x + p.w / 2, oy0 + p.y); c.scale(sc, sc)
        c.fillStyle = st.d.col || BONE; c.fillText(p.ch, -p.w / 2, 0); c.restore()
      }
      // cursor
      if (st.d && !st.sentAt) {
        const last = st.vis > 0 ? L.pos[st.vis - 1] : { x: 0, y: 0, w: 0 }
        const typing = st.vis > 0 && t - st.d.tChar[st.vis - 1] < 0.4
        if (typing || Math.floor(t * 2.4) % 2 === 0) R(c, BUG, ox0 + last.x + last.w + 3, oy0 + last.y - FONT_PX * 0.55, 5, FONT_PX * 1.05)
      } else if (Math.floor(t * 2.4) % 2 === 0) R(c, BUG, ox0, oy0 - FONT_PX * 0.55, 5, FONT_PX * 1.05)
      c.restore()
      // a DRAFT counter chip on the field's top-right
      const dn = cfg.draftNo ? cfg.draftNo(t, st) : cfg.draftBase != null && st.k >= 0 && (!LINES.length || t < LINES[0].t - 0.4) ? `DRAFT ${cfg.draftBase + st.k}` : null
      if (dn) {
        c.save(); c.font = `700 22px ${MONO}`; const w = c.measureText(dn).width + 26
        box(c, fx + fw - w - 6, fy - 44, w, 34, RED, { b: 4 }); c.fillStyle = BONE; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(dn, fx + fw - w / 2 - 6, fy - 26); c.restore()
      }
      return { fy, ox0, oy0, st }
    }
    // the flying deleted letters (drawn on top, outside the phone clip)
    function flyers(c, t) {
      DRAFTS.forEach((d, k) => {
        if (d.del == null) return
        const L = LAY[k], lines = Math.max(1, L.lines), fh = lines * LINE_H + 2 * FIELD_PAD - 8
        const ox0 = SCR.x + 20 + FIELD_PAD, oy0 = FIELD_BOTTOM - fh + FIELD_PAD + FONT_PX * 0.5 - 4
        c.save(); c.font = FONT; c.textBaseline = 'middle'; c.textAlign = 'center'
        for (let i = 0; i < d.n; i++) {
          const a = t - d.tDel[i]
          if (a < 0 || a > 1.1 || d.tChar[i] > d.tDel[i]) continue
          const p = L.pos[i]; if (/\s/.test(p.ch)) continue
          const h = ((i * 7919 + k * 104729) % 1000) / 1000, h2 = ((i * 3571 + k * 15485) % 1000) / 1000
          const vx = (h - 0.35) * 900, vy = -700 - 600 * h2
          const px = ox0 + p.x + p.w / 2 + vx * a, py = oy0 + p.y + vy * a + 1500 * a * a
          c.save(); c.globalAlpha = 1 - ease.inQuad(clamp(a / 1.1)); c.translate(px, py); c.rotate((h - 0.5) * 9 * a); const s = 1 + 0.9 * a; c.scale(s, s)
          c.fillStyle = INK; c.fillText(p.ch, 3, 4); c.fillStyle = h > 0.7 ? RED : h > 0.4 ? PINK : BONE; c.fillText(p.ch, 0, 0)
          c.restore()
        }
        c.restore()
      })
    }
    // chat bubbles stacked above the field (newest at the bottom)
    function chat(c, t, fieldTop) {
      const vis = MSGS.map((m, i) => ({ m, i })).filter(({ m }) => t >= (m.typing ? m.typing[0] : m.at) && !(m.until != null && t >= m.until))
      let y = fieldTop - 26
      c.save(); c.beginPath(); c.rect(SCR.x, SCR.y + HEAD_H, SCR.w, fieldTop - SCR.y - HEAD_H - 6); c.clip()
      for (let n = vis.length - 1; n >= 0; n--) {
        const { m, i } = vis[n]
        const typing = m.typing && t < m.at
        const L = MLAY[i], bw = typing ? 130 : Math.max(...L.pos.map(p => p.x + p.w), 40) + 44, bh = typing ? 64 : L.lines * 48 + 30
        const k = pop01(t, typing ? m.typing[0] : m.at, 0.3, 2.2)
        const me = m.from === 'me'
        const bx = me ? SCR.x + SCR.w - 22 - bw : SCR.x + 22
        y -= bh * Math.min(1, k)
        c.save(); c.translate(bx + (me ? bw : 0), y + bh); c.scale(k, k); c.translate(-(bx + (me ? bw : 0)), -(y + bh))
        box(c, bx, y, bw, bh, me ? BLUE : '#3a3264', { b: 4 })
        if (typing) { for (let q = 0; q < 3; q++) R(c, BONE, bx + 30 + q * 28, y + 26 - 6 * Math.max(0, Math.sin(t * 9 - q)), 14, 14) }
        else {
          c.font = `600 38px ${INTER}`; c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillStyle = BONE
          L.pos.forEach(p => c.fillText(p.ch, bx + 22 + p.x, y + 15 + 24 + p.y))
        }
        c.restore()
        if (m.stamp) label(c, m.stamp, me ? bx + bw : bx, y - 18, { size: 20, align: me ? 'right' : 'left', col: 'rgba(239,230,214,0.7)' })
        if (me && m.sent && n === vis.length - 1) label(c, t > m.at + 0.6 ? 'delivered' : 'sending…', bx + bw, y + bh + 16, { size: 18, align: 'right', col: 'rgba(239,230,214,0.7)' })
        y -= 34
      }
      c.restore()
    }

    // ── one full frame of the story onto ctx c at story time t
    function frame(c, t) {
      const cam = camera(t)
      const tv = cam.freezeAt != null ? cam.freezeAt : t
      const ss = ease.inOutCubic(prog(t, -0.6, 2.2))
      drawSky(c, tv, { ...SKY_H, zoom: lerp(1.75, SKY_H.zoom, ss), dim: (typeof cfg.dim === 'function' ? cfg.dim(tv) : cfg.dim ?? SKY_H.dim) })
      c.save()
      c.translate(cam.cx + cam.dx, cam.cy + cam.dy); c.scale(cam.zoom, cam.zoom); c.translate(-cam.cx, -cam.cy)
      // the phone lifts out of the box's way for the last line (and comes back for a loop)
      const lift = liftAt(tv)
      const sc = 1 - 0.13 * lift
      if (cfg.back) cfg.back(c, tv, S)
      // Pisces over the shoulder (behind the phone)
      if (pisPos && !cfg.pisHero) {
        const lean = Math.sin(tv * 1.6) * 6
        cryStar(c, tv, PIS.color, { x: pisPos.x + lean, y: pisPos.y - lift * 60, s: pisPos.s, mood: cfg.pisMood ? cfg.pisMood(tv) : sobLevel(tv) >= 2 ? 'sparkle' : 'wide', look: [-1, 0.6], hops: delTimes.map(v => v + 0.1), seed: 6 }, sobLevel(tv))
      }
      // the hero (behind the phone's left edge)
      const [mood, look] = moodAt(tv)
      if (!cfg.noHero) {
        shadow(c, heroPos.x, heroPos.y + heroPos.s * 0.45, heroPos.s * 0.8)
        const ho = { x: heroPos.x, y: heroPos.y - lift * 40, s: heroPos.s, mood, look: look || [1, -0.5], hops: heroHops }
        if (cfg.pisHero) cryStar(c, tv, HERO.color, { ...ho, glyph: HERO.glyph, seed: 3, glow: 1.1, tips: true }, cfg.heroTears ? cfg.heroTears(tv) : 2)
        else if (cfg.heroTears && cfg.heroTears(tv)) cryStar(c, tv, HERO.color, { ...ho, glyph: HERO.glyph, seed: 3, glow: 1.1, tips: true }, cfg.heroTears(tv))
        else S.hero(c, tv, ho)
        if (cfg.onHero) cfg.onHero(c, tv, S, ho)
      }
      c.save()
      c.translate(PH.x + PH.w / 2, PH.y); c.scale(sc, sc); c.translate(-(PH.x + PH.w / 2), -PH.y)
      const tilt = cfg.tilt ? cfg.tilt(tv) : 0
      if (tilt) { c.translate(PH.x + PH.w / 2, PH.y + PH.h / 2); c.rotate(tilt); c.translate(-(PH.x + PH.w / 2), -(PH.y + PH.h / 2)) }
      phoneBody(c, tv)
      keyboard(c, tv, activeKey(tv))
      const F = field(c, tv)
      chat(c, tv, F.fy - (cfg.draftNo || cfg.draftBase != null ? 50 : 0))
      if (cfg.screen) cfg.screen(c, tv, { ...S, F })
      if (cfg.pisHero) screenTears(c, tv)
      flyers(c, tv)
      c.restore()
      if (cfg.front) cfg.front(c, tv, { ...S, lift })
      // THE STARS pop in beside the box for the lines
      if (LINES.length) {
        const k = starsK(tv)
        if (k > 0.01) drawStarChar(c, 950, 1418, 140, tv, { color: STAR.sky, mood: tv > lastDone ? 'happy' : 'neutral', look: [-1, 0.4], hops: STARS_HOPS, pop: k, seed: 2, glow: 1.05 })
      }
      c.restore()
      return cam
    }
    // Pisces as the hero: tears land on the screen and smudge
    function screenTears(c, t) {
      for (let i = 0; i < 7; i++) {
        const ph = ((t * 0.45 + i * 0.37) % 1 + 1) % 1
        const px = SCR.x + 40 + ((i * 173) % (SCR.w - 80)), py = SCR.y + HEAD_H + 30 + ph * (SCR.h - HEAD_H - KB_H - 120)
        c.save(); c.globalAlpha = 0.55 * (1 - ph); c.fillStyle = TEAR
        c.fillRect(px, py - 26, 10, 26); c.fillRect(px - 4, py, 18, 16); c.fillStyle = '#ffffff'; c.fillRect(px - 2, py + 2, 5, 5)
        c.restore()
      }
    }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        const cam = frame(x, t)
        // loop: crossfade into the film's own pre-roll so the last frame IS frame 0
        // (hookkit loopK: reaches 1 on the last rendered frame, which then shows the frame-0 picture)
        let lk = 0
        if (cfg.ending === 'loop') {
          lk = loopK(t, DURATION, LOOP_L)
          if (lk > 0) { ox.clearRect(0, 0, 1080, 1920); frame(ox, t - DURATION + 1 / 30); x.save(); x.globalAlpha = lk; x.drawImage(off, 0, 0); x.restore() }
        }
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.top) cfg.top(tx, t, S)
        boxes.forEach(b => b.update(t))
        bug.update(t)
        flashEl.style.opacity = String(cam.flash * (1 - lk))
        drawGrain(gx, t)
      },
    }
  }

  // the hook line (hookkit slamTitle, landed at frame 0, stays up: it is the premise) + the pattern breaks
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop || 168, size: cfg.hookSize || 92, accentColor: cfg.accent || HERO.color, width: 960, out: cfg.hookOut || null }
  const RECS = breaks.filter(b => b.kind === 'scratch').map(b => ({ at: b.at, len: b.len || 0.9, caption: b.caption || 'yep. *again.*', sub: b.sub || null, top: b.top || 1440 }))
  const WHIPS = breaks.filter(b => b.kind === 'whip').map(b => ({ at: b.at, len: b.len || 0.45, from: b.from || 1.7, to: 1, cx: b.cx || 600, cy: b.cy || 1150 }))
  const SHAKES = breaks.filter(b => b.kind === 'shake').map(b => ({ at: b.at, len: b.len || 0.5, amp: b.amp || 28 }))
  const FX = cfg.effects || []
  const SCENES = [RECS.length ? frozen(build, RECS) : build, ...FX.map(f => f.fx(f.o)), slamTitle(HOOK),
    ...WHIPS.map(whipZoom), ...SHAKES.map(screenShake), ...RECS.map(recordScratch)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = []
  DRAFTS.forEach((d, k) => {
    // a soft key tick every other typed char
    for (let i = 0; i < d.n; i += 2) if (d.tChar[i] >= 0.02 && d.tChar[i] < DURATION - 0.1 && d.text[i] !== ' ') CUES.push(['tick', r3(d.tChar[i]), 0.022 + 0.008 * ((i * 7) % 3) / 2])
    if (d.del != null && d.del >= 0 && d.del < DURATION) {
      if (d.wipe) CUES.push(['whoosh', r3(d.del), 0.35, 0.04], ['tick', r3(d.del), 0.07])
      else { const n = Math.min(d.n, 12); for (let i = 0; i < n; i++) CUES.push(['tick', r3(d.del + i * (d.delEnd - d.del) / n), 0.03]) ; CUES.push(['whoosh', r3(d.del + 0.03), Math.max(0.2, d.delEnd - d.del), 0.03]) }
      CUES.push(['pop', r3(d.del + 0.02), NOTE[(k * 2) % 7] / 2, 0.03, 0.2])
    }
    if (d.send != null) CUES.push(['pop', r3(d.send), 1174.66, 0.05, 0.2], ['pop', r3(d.send + 0.08), 1567.98, 0.04, 0.2], ['whoosh', r3(d.send), 0.3, 0.03], ['glitter', r3(d.send + 0.05), r3(d.send + 0.5)])
  })
  MSGS.forEach(m => { if (!m.sent && m.at > 0 && m.at < DURATION) CUES.push(['pop', r3(m.at), 880, 0.04, -0.3], ['pluck', r3(m.at + 0.04), 1318.51, 0.03, -0.3, 0.3]) })
  CUES.push(...slamTitleCues(HOOK), ...RECS.flatMap(recordScratchCues), ...WHIPS.flatMap(whipZoomCues), ...SHAKES.flatMap(shakeCues))
  for (const f of FX) if (f.cues) CUES.push(...f.cues(f.o))
  for (const b of breaks) if (b.kind === 'flash') CUES.push(['pop', r3(b.at), 1567.98, 0.04, 0])
  if (cfg.ending === 'loop') CUES.push(...loopCues({ duration: DURATION, len: LOOP_L }))
  if (LINES.length) CUES.push(['pop', r3(LINES[0].t - 0.3), 739.99, 0.035, 0.4], ...talkCues(LINES, { cps: CPS }))
  CUES.push(...(cfg.cues || []))
  const CUES2 = CUES.filter(c => c[1] >= 0 && c[1] < DURATION + 0.5); CUES2.sort((a, b) => a[1] - b[1])
  return { DURATION, SCENES, CUES: CUES2, T, DRAFTS, LINES, HOOK }
}

// ── the series bug: THE UNSENT TEXT (Inter 800 small caps, letter-spaced, top-left 56 px), on from frame 0
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(127,208,255,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'THE&nbsp;UNSENT<span style="color:rgba(255,255,255,0.6)">&nbsp;TEXT</span>')
  return { update() {} }
}
