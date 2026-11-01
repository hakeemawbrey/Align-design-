// MY ROMAN EMPIRE kit: the shared look of Star Talk Trends format 7 (promo/films/STARTALK-TRENDS.md §7).
// "What's your Roman Empire?" (the thing you think about every day): an epic marble-and-column parody framing a tiny
// moment. Every episode (trromecompliment, trromesandwich, trromehome, trrometypo, trromeeyes) carries an identical copy
// of this file in its own folder, so the five films look like one format without touching another folder.
//
//   makeEpisode(cfg) → { DURATION, SCENES, CUES, T, music }      a 20 s film: story 0–15.6, then the shared end card.
//
// The beats (identical timing in every episode):
//   0.0–3.7   HOOK      "What's your | *Roman Empire?*" + the sticker "(the thing you think about every day)". Marble
//                       columns rise, the hero star (gold laurel wreath) stands on a plinth, dreaming: thought puffs rise.
//   3.9–7.4   MONUMENT  On the music drop a marble monument of the tiny moment BOOMs up out of the floor, god rays, dust;
//                       its inscription carves on letter by letter. Pisces peeks from behind the right column, crying.
//   7.5–11.0  DAILY     "Every. *Single.* | Day." Three timestamp stickers stack up (rule of three, the third twisted).
//   11.2      card cut  (the only candidate: cardfx plays it)
//   11.3–13.4 TWIST     one dialogue line (the hero, THE STARS or the date star, who can step in from the right).
//   13.45–15.5 LAST     the last line slams in on the hit; gold sparkles; Pisces fountains.
//
// cfg = {
//   id, key, seed,
//   hero: { sign, tag? },                    tag = dialogue name tag (default '<glyph> <SIGN>')
//   date: { sign, tag?, at? } | null         a second star who steps in at the twist (the hero slides left to make room)
//   h1, h1Accent, h2?, h2Accent?, h3, h3Accent, last, lastAccent     headlines (`*word*` = the italic accent, `|` = break)
//   mon: { bits: [rows], cols: {ch: colour}, cell, inscription: [line1, line2], dy? }   the monument (marble bitmap)
//   stickers: [{ time, text }, ×3]           `*word*` in text = accent
//   line: { who: 'hero' | 'date' | 'stars', text }
//   moods?(phase, t, T) → { mood, look }      phase: 'hook' | 'mon' | 'daily' | 'twist' | 'last'
//   dateMoods?(t, T) → { mood, look }
//   heroProp?(x, F, t, T, ctx)               draw on the hero's sprite (sprite cells; see inSprite)
//   back?(x, t, T, ctx) / front?(x, t, T, ctx)   extra drawing behind / in front of the stars
//   monDraw?(x, t, T, ctx)                   extra drawing on the monument (after the bitmap)
//   cues?(T) → extra sound cues
// }
// Pure f(t); nothing touches `document` at module top level (the sound build imports this in node).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', ROSE = '#ff7a9a'
export const MARBLE = { M: '#f1ece3', m: '#d8cfc1', d: '#b7ab9a', v: '#a89d8e', G: GOLD, g: '#c9952f', W: '#fffdf7' }
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BEAT = n => 0.6 + n * (60 / 108)
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
const CPS = 30

// ── the shared timeline
export const TL = {
  black: [0, 0.3], bug: 0.35, rise: [0.05, 0.95], heroIn: 0.5,
  h0: 0.15, h0Land: BEAT(0) + 0.22, h0Out: [3.6, 3.8], sub: 1.45, subOut: [3.5, 3.72],
  puffs: [2.3, 2.6, 2.9], cloud: 3.15, cloudPop: 3.88,
  drop: BEAT(6), mon: [BEAT(6) - 0.05, BEAT(6) + 0.42], land: BEAT(6) + 0.42,
  h1: 3.95, h1Land: BEAT(7) + 0.02, h1Out: [7.25, 7.45], carve: [4.75, 5.95],
  pisPeek: [4.6, 5.0],
  h2: 7.5, h2Out: [10.85, 11.05], stk: [7.9, 9.0, 10.1], stkOut: [10.75, 11.0],
  cut: 11.2,
  h3: 11.32, h3Out: [13.2, 13.4], line: 11.6,
  last: 13.45, lastLand: BEAT(24) - 0.02,              // 13.93 (the hit)
  lastOut: [15.15, 15.45], out: [15.05, 15.45], bugOut: [15.2, 15.5],
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
    x.fillStyle = cols[ch] || '#f0f'; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK], life = 0.7) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  const p = ease.outCubic(tt / life)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

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

// ── the gold laurel wreath, worn round the upper point (sprite cells)
const LAUREL = [
  '..L..........L..',
  '.LLl........lLL.',
  'LLl..........lLL',
  '.Ll..........lL.',
  'LLl..........lLL',
  '.LLggggggggggLL.',
  '..LLGGGGGGGGLL..',
]
export function drawLaurel(ctx, F, { alpha = 1 } = {}) {
  inSprite(ctx, F, () => drawBits(ctx, LAUREL, { L: GOLD, l: '#ffe7a0', G: GOLD, g: '#c9952f' }, 18, 8.6, 1, { alpha, outline: INK }))
}

// ── the show bug: a pixel laurel + "MY ROMAN EMPIRE" (Inter 800, letter-spaced small caps, gold), top-left 56 px
const BUG_ICON = ['L.......L', 'LL.....LL', 'Ll.....lL', 'LL.....LL', '.LL...LL.', '..LLGLL..']
function buildBug(root, { at }) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '54px', height: '40px', imageRendering: 'pixelated' }, box)
  ic.width = 54; ic.height = 40
  drawBits(ic.getContext('2d'), BUG_ICON, { L: GOLD, l: '#ffe7a0', G: '#ff8fb1' }, 27, 20, 5)
  el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box, 'MY&nbsp;ROMAN&nbsp;EMPIRE')
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── stickers (DOM): a white caption sticker with an optional dark timestamp tab. `*word*` = italic accent.
const accentHTML = (s, col) => s.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 1.18em ${SERIF};color:${col}">$1</span>`)
function buildSticker(root, { time, text, top, cx = 540, rot = 0, size = 40, accent = '#d6336c', width = 900 }) {
  const wrap = el('div', { position: 'absolute', left: (cx - width / 2) + 'px', top: top + 'px', width: width + 'px', display: 'none', flexDirection: 'column', alignItems: 'center', transformOrigin: '50% 50%', pointerEvents: 'none' }, root)
  if (time) el('div', { font: `700 28px ${MONO}`, letterSpacing: '0.08em', color: GOLD, background: INK, padding: '4px 16px 2px', borderRadius: '10px', border: `3px solid ${GOLD}`, marginBottom: '-10px', zIndex: 1, boxShadow: '0 4px 0 rgba(6,4,18,0.6)', alignSelf: 'center', transform: 'translateX(-30%)' }, wrap, time)
  el('div', { font: `800 ${size}px ${INTER}`, color: INK, background: '#fffaf0', padding: '12px 26px 10px', borderRadius: '16px', boxShadow: '0 6px 0 rgba(6,4,18,0.55), 0 0 0 4px rgba(27,18,54,0.9)', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }, wrap, accentHTML(text, accent))
  return {
    update(t, at, out = 1) {
      const k = pop01(t, at, 0.34, 2.6) * out
      wrap.style.display = k <= 0.01 ? 'none' : 'flex'
      if (k <= 0.01) return
      wrap.style.opacity = String(clamp(k * 2))
      const r = rot + (1 - clamp(k)) * 8
      wrap.style.transform = `scale(${(0.5 + 0.5 * k).toFixed(4)}) rotate(${r.toFixed(2)}deg)`
    },
  }
}

// ── marble (pre-rendered at build)
function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }
function veins(x, w, h, seed, n = 5, col = 'rgba(150,138,122,0.35)', C = 6) {
  const Rn = rng(seed)
  x.fillStyle = col
  for (let k = 0; k < n; k++) {
    let px = Rn() * w, py = Rn() * h
    const dx = (Rn() - 0.5) * 2, dy = 0.6 + Rn()
    for (let s = 0; s < 40; s++) { x.fillRect(Math.round(px / C) * C, Math.round(py / C) * C, C, C); px += dx * C + (Rn() - 0.5) * C * 1.6; py += dy * C * 0.8 }
  }
}
/** one Ionic column: capital (volutes), fluted shaft, base. Lit from the centre of the temple (side = -1 left column). */
function makeColumn(w, h, side) {
  const c = mk(w, h), x = c.getContext('2d'), C = 10
  const capH = 90, baseH = 70, shW = w - 40, sx0 = 20
  // shaft
  R(x, INK, sx0 - 6, capH - 6, shW + 12, h - capH - baseH + 12)
  const flutes = 7, fw = shW / flutes
  for (let i = 0; i < flutes; i++) {
    const lit = side < 0 ? i / (flutes - 1) : 1 - i / (flutes - 1)
    R(x, lit > 0.66 ? MARBLE.W : lit > 0.33 ? MARBLE.M : MARBLE.m, sx0 + i * fw, capH, fw, h - capH - baseH)
    R(x, lit > 0.5 ? MARBLE.m : MARBLE.d, sx0 + i * fw + fw - C * 0.6, capH, C * 0.6, h - capH - baseH)
  }
  x.save(); x.beginPath(); x.rect(sx0, capH, shW, h - capH - baseH); x.clip(); veins(x, w, h, side < 0 ? 11 : 17, 3, 'rgba(150,138,122,0.28)', C / 2); x.restore()
  // capital: abacus + echinus + two volutes
  R(x, INK, 0, 0, w, 34); R(x, MARBLE.W, 6, 6, w - 12, 22); R(x, MARBLE.d, 6, 22, w - 12, 6)
  R(x, INK, 10, 30, w - 20, 40); R(x, MARBLE.M, 16, 34, w - 32, 30); R(x, GOLD, 16, 58, w - 32, 6)
  for (const vx of [18, w - 18]) {
    x.fillStyle = INK; x.beginPath(); x.arc(vx, 58, 26, 0, Math.PI * 2); x.fill()
    x.fillStyle = MARBLE.W; x.beginPath(); x.arc(vx, 58, 20, 0, Math.PI * 2); x.fill()
    x.fillStyle = MARBLE.d; x.beginPath(); x.arc(vx, 58, 12, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.arc(vx, 58, 6, 0, Math.PI * 2); x.fill()
  }
  R(x, INK, sx0 - 6, capH - 8, shW + 12, 8)
  // base: torus + plinth
  const by = h - baseH
  R(x, INK, sx0 - 14, by, shW + 28, 30); R(x, MARBLE.M, sx0 - 8, by + 6, shW + 16, 18); R(x, MARBLE.d, sx0 - 8, by + 20, shW + 16, 4)
  R(x, INK, 0, by + 30, w, baseH - 30); R(x, MARBLE.W, 6, by + 36, w - 12, baseH - 42); R(x, MARBLE.d, 6, h - 14, w - 12, 8)
  return c
}
/** the entablature beam across the columns: architrave, frieze with gold dentils, cornice */
function makeBeam(w, h) {
  const c = mk(w, h), x = c.getContext('2d')
  R(x, INK, 0, 0, w, h)
  R(x, MARBLE.W, 6, 6, w - 12, 18); R(x, MARBLE.d, 6, 22, w - 12, 4)
  R(x, MARBLE.M, 18, 30, w - 36, h - 60)
  for (let i = 30; i < w - 40; i += 36) R(x, i % 72 < 36 ? GOLD : MARBLE.m, i, 38, 18, 14)
  x.save(); x.beginPath(); x.rect(18, 56, w - 36, h - 86); x.clip(); veins(x, w, h, 5, 6, 'rgba(150,138,122,0.3)', 5); x.restore()
  R(x, MARBLE.m, 18, h - 34, w - 36, 6); R(x, MARBLE.W, 10, h - 26, w - 20, 14)
  return c
}
/** the temple floor: marble tiles receding to the back edge (y0 … 1920) */
function makeFloor(y0) {
  const H = 1920 - y0, c = mk(1080, H), x = c.getContext('2d')
  const rows = 16
  let y = 0
  for (let r = 0; r < rows; r++) {
    const f = r / 9, rh = lerp(26, 180, Math.pow(Math.min(1, f) + 0.06, 1.6)) * 0.95
    const nCols = 12, vp = 540
    for (let k = -2; k < nCols + 2; k++) {
      const xt0 = vp + (k - nCols / 2) * lerp(120, 300, f) * 0.9, xt1 = vp + (k + 1 - nCols / 2) * lerp(120, 300, f) * 0.9
      const xb0 = vp + (k - nCols / 2) * lerp(120, 300, f + 1 / 9) * 0.9, xb1 = vp + (k + 1 - nCols / 2) * lerp(120, 300, f + 1 / 9) * 0.9
      x.fillStyle = (k + r) % 2 ? '#cfc4b3' : '#a59a8c'
      x.beginPath(); x.moveTo(xt0, y); x.lineTo(xt1, y); x.lineTo(xb1, y + rh); x.lineTo(xb0, y + rh); x.closePath(); x.fill()
    }
    y += rh
    if (y > H) break
  }
  // night: darken toward the front, warm toward the back
  const g = x.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, 'rgba(255,214,150,0.18)'); g.addColorStop(0.35, 'rgba(20,12,44,0.25)'); g.addColorStop(1, 'rgba(8,5,22,0.78)')
  x.fillStyle = g; x.fillRect(0, 0, 1080, H)
  R(x, INK, 0, 0, 1080, 8); R(x, MARBLE.W, 0, 8, 1080, 6)
  return c
}
/** a pedestal (or plinth) block with a cornice */
function makePedestal(w, h, seed) {
  const c = mk(w + 40, h), x = c.getContext('2d'), o = 20
  R(x, INK, 0, 0, w + 40, 30); R(x, MARBLE.W, 6, 6, w + 28, 18)
  R(x, INK, o - 6, 30, w + 12, h - 64); R(x, MARBLE.M, o, 30, w, h - 64)
  R(x, MARBLE.W, o, 30, 10, h - 64); R(x, MARBLE.m, o + w - 14, 30, 14, h - 64)
  x.save(); x.beginPath(); x.rect(o, 30, w, h - 64); x.clip(); veins(x, w + 40, h, seed, 4, 'rgba(150,138,122,0.3)', 5); x.restore()
  R(x, INK, 0, h - 40, w + 40, 40); R(x, MARBLE.W, 6, h - 34, w + 28, 22); R(x, MARBLE.d, 6, h - 14, w + 28, 8)
  return c
}
/** carved Roman capitals: dark cut + light lip. Returns nothing; clipFrac (0…1) reveals left → right (the chisel). */
export function carved(x, text, cx, cy, { size = 34, maxW = 280, frac = 1, color = '#5b5246' } = {}) {
  x.save()
  x.font = `600 ${size}px ${SERIF}`
  x.letterSpacing = '0.08em'
  let w = x.measureText(text).width
  let s = 1
  if (w > maxW) { s = maxW / w; w = maxW }
  x.translate(cx, cy); x.scale(s, s)
  x.beginPath(); x.rect(-w / s / 2 - 10, -size, (w / s + 20) * frac, size * 2); x.clip()
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(255,255,255,0.9)'; x.fillText(text, 1.5, 2)
  x.fillStyle = color; x.fillText(text, 0, 0)
  x.restore()
  return w
}

// ── layout
export const POS = {
  hero: { x: 540, y: 1232, s: 252 }, heroL: { x: 330, y: 1232, s: 252 },
  date: { x: 780, y: 1250, s: 216 },
  mon: { cx: 540, pedTop: 868, pedH: 170, pedW: 330 },
  backY: 1030, beamY: 560, colTop: 620, colH: 820,
  pis: { x: 838, y: 905, s: 128 },
}

export function makeEpisode(cfg) {
  const T = { ...TL }
  const HERO = signStar(cfg.hero.sign), PIS = signStar('pisces')
  const DATE = cfg.date ? signStar(cfg.date.sign) : null
  const heroTag = cfg.hero.tag || `${HERO.glyph}︎ ${cfg.hero.sign.toUpperCase()}`
  const dateTag = cfg.date ? (cfg.date.tag || `${DATE.glyph}︎ ${cfg.date.sign.toUpperCase()}`) : null
  const who = cfg.line.who
  const speaker = who === 'hero' ? heroTag : who === 'date' ? dateTag : 'THE STARS'
  const lineCol = who === 'hero' ? (cfg.hero.lineColor || '#ffd27a') : who === 'date' ? (cfg.date.lineColor || '#9fe6b0') : GOLD
  const LINES = [{ t: T.line, speaker, color: lineCol, text: cfg.line.text }]
  const tm = lineTimes(LINES, { cps: CPS })[0]
  T.lineDone = tm.done
  T.boxOpen = r3(T.line - 0.2)
  T.boxClose = r3(Math.max(tm.done + 1.6, 14.3))
  if (T.boxClose > T.out[0]) throw new Error(`line too long: done ${tm.done}`)
  T.dateIn = cfg.date ? (cfg.date.at ?? T.cut + 0.05) : null
  const heroHops = [T.heroIn + 0.35, T.land + 0.05, ...T.stk.map(s => s + 0.05), T.lastLand + 0.02, T.lastLand + 0.5,
    ...(who === 'hero' ? talkHops(LINES, speaker, { cps: CPS }) : [])].sort((a, b) => a - b)
  const dateHops = cfg.date ? [T.dateIn + 0.3, ...(who === 'date' ? talkHops(LINES, speaker, { cps: CPS }) : []), T.lastLand + 0.1, T.lastLand + 0.6] : null
  const starsHops = who === 'stars' ? talkHops(LINES, speaker, { cps: CPS }) : null

  const phaseOf = t => t < T.mon[0] ? 'hook' : t < T.h2 ? 'mon' : t < T.cut ? 'daily' : t < T.last ? 'twist' : 'last'
  const defaultMood = (ph, t) => {
    if (ph === 'hook') return t < T.puffs[0] ? { mood: 'happy' } : { mood: 'sparkle', look: [0, -1] }
    if (ph === 'mon') return t < T.land + 0.3 ? { mood: 'wide', look: [0, -1] } : { mood: 'heart', look: [0, -1] }
    if (ph === 'daily') { const i = T.stk.filter(s => t >= s).length; return [{ mood: 'sparkle', look: [0, -1] }, { mood: 'sparkle', look: [1, 1] }, { mood: 'happy' }, { mood: 'wide', look: [0, 0] }][i] }
    if (ph === 'twist') return { mood: 'happy' }
    return { mood: 'heart' }
  }

  async function build(stage) {
    try {
      await Promise.all(["800 104px Inter", "800 40px Inter", "700 30px Inter", "italic 500 140px 'EB Garamond'", "italic 500 48px 'EB Garamond'", "600 34px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 28px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const COL_L = makeColumn(150, POS.colH, -1), COL_R = makeColumn(150, POS.colH, 1)
    const BEAM = makeBeam(1000, 92), FLOOR = makeFloor(POS.backY)
    const PED = makePedestal(POS.mon.pedW, POS.mon.pedH, 23), PLINTH = makePedestal(300, 96, 41), PLINTH_S = makePedestal(240, 86, 47)

    const H0 = popText(root, "What's your | *Roman Empire?*", { top: 172, size: 100, accentSize: 136, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: GOLD })
    const H1 = popText(root, cfg.h1, { top: 172, size: 100, accentSize: 132, at: T.h1, late: cfg.h1Late ?? 1, lateAt: T.h1Land, gap: 0.1, accentColor: cfg.h1Accent || GOLD, fit: true })
    const H2 = popText(root, cfg.h2 || 'Every. *Single.* | Day.', { top: 172, size: 104, accentSize: 140, at: T.h2, gap: 0.16, accentColor: cfg.h2Accent || PINK, fit: true })
    const H3 = popText(root, cfg.h3, { top: 172, size: 100, accentSize: 132, at: T.h3, gap: 0.1, accentColor: cfg.h3Accent || '#7fe0ff', fit: true })
    const H4 = popText(root, cfg.last, { top: 168, size: 108, accentSize: 150, at: T.last, late: cfg.lastLate ?? 1, lateAt: T.lastLand, wobble: true, accentColor: cfg.lastAccent || GOLD, fit: true })
    const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.lastOut]]
    const sub = buildSticker(root, { text: 'the thing you think about *every day*', top: 438, size: 36, rot: -2, accent: '#b8326a' })
    const STK = cfg.stickers.map((s, i) => buildSticker(root, { ...s, top: 1452 + i * 120, cx: 540 + [-40, 30, -10][i], rot: [-3, 2.5, -1.5][i], size: 40 }))
    const box = dialogueBox(root, { lines: LINES, y: 1470, open: T.boxOpen, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, { at: T.bug })
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    const ctx = { T, HERO, DATE, POS, hero: null, date: null }

    function heroPos(t) {
      if (!cfg.date) return POS.hero
      const m = ease.inOutCubic(prog(t, T.cut - 0.15, T.cut + 0.1))
      return { x: lerp(POS.hero.x, POS.heroL.x, m), y: POS.hero.y, s: POS.hero.s }
    }

    function temple(t) {
      const rise = ease.outCubic(prog(t, ...T.rise))
      const k = popOut(t, T.out)
      // warm torchlight from the monument
      const glowA = (0.35 + 0.45 * ease.outCubic(prog(t, T.land, T.land + 0.6))) * clamp(rise) * clamp(k)
      if (glowA > 0.01) { const g = x.createRadialGradient(540, 900, 0, 540, 900, 720); g.addColorStop(0, `rgba(255,200,130,${0.32 * glowA})`); g.addColorStop(1, 'rgba(255,200,130,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1300) }
      // the floor slides up
      const fy = POS.backY + (1 - rise) * 900
      x.drawImage(FLOOR, 0, fy)
      return { rise, k, fy }
    }
    function rays(t) {
      const a = clamp(prog(t, T.mon[0], T.land)) * outK(t, T.out)
      if (a <= 0.01) return
      x.save(); x.translate(POS.mon.cx, POS.mon.pedTop - 120); x.globalCompositeOperation = 'lighter'
      const n = 9
      for (let i = 0; i < n; i++) {
        const ang = -Math.PI / 2 + (i - (n - 1) / 2) * 0.24 + 0.05 * Math.sin(t * 0.9 + i)
        const L = 820, wA = 0.06
        const g = x.createLinearGradient(0, 0, Math.cos(ang) * L, Math.sin(ang) * L)
        const flick = 0.75 + 0.25 * Math.sin(t * 2.3 + i * 1.7)
        g.addColorStop(0, `rgba(255,220,150,${0.22 * a * flick})`); g.addColorStop(1, 'rgba(255,220,150,0)')
        x.fillStyle = g
        x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ang - wA) * L, Math.sin(ang - wA) * L); x.lineTo(Math.cos(ang + wA) * L, Math.sin(ang + wA) * L); x.closePath(); x.fill()
      }
      x.restore()
      // floating dust motes in the light
      x.save()
      for (let i = 0; i < 18; i++) {
        const ph = (t * 0.07 + i * 0.137) % 1, px = POS.mon.cx + Math.sin(i * 2.7 + t * 0.4) * 300, py = 1000 - ph * 600
        x.globalAlpha = a * 0.7 * Math.sin(Math.PI * ph)
        R(x, '#ffe9b8', px, py, 5, 5)
      }
      x.restore()
    }
    function monument(t) {
      if (t < T.mon[0]) return
      const p = ease.outCubic(prog(t, ...T.mon)), k = popOut(t, T.out)
      if (k <= 0) return
      const M = POS.mon
      const dy = (1 - p) * (M.pedH + 420)
      x.save(); x.beginPath(); x.rect(0, 0, 1080, POS.backY + 6); x.clip()
      x.translate(0, dy)
      x.save(); x.translate(M.cx, M.pedTop + M.pedH); x.scale(k, k); x.translate(-M.cx, -(M.pedTop + M.pedH))
      // the statue
      const mm = cfg.mon
      const bh = mm.bits.length * mm.cell
      const shine = prog(t, T.lastLand - 0.1, T.lastLand + 0.6)
      drawBits(x, mm.bits, { ...MARBLE, ...(mm.cols || {}) }, M.cx, M.pedTop - bh / 2 - 6 + (mm.dy || 0), mm.cell)
      if (cfg.monDraw) cfg.monDraw(x, t, T, ctx)
      // a gold glint sweeping across the statue on the hit
      if (shine > 0 && shine < 1) {
        x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = Math.sin(Math.PI * shine) * 0.6
        const gx0 = lerp(M.cx - 260, M.cx + 260, shine)
        const g = x.createLinearGradient(gx0 - 60, 0, gx0 + 60, 0); g.addColorStop(0, 'rgba(255,230,160,0)'); g.addColorStop(0.5, 'rgba(255,230,160,0.9)'); g.addColorStop(1, 'rgba(255,230,160,0)')
        x.fillStyle = g; x.fillRect(gx0 - 60, M.pedTop - bh - 40, 120, bh + M.pedH + 40)
        x.restore()
      }
      // the pedestal + its inscription (carved on letter by letter)
      x.drawImage(PED, M.cx - PED.width / 2, M.pedTop)
      const [l1, l2] = mm.inscription
      const cf = prog(t, ...T.carve)
      const f1 = clamp(cf * 1.7), f2 = clamp((cf - 0.55) / 0.45)
      carved(x, l1, M.cx, M.pedTop + 62, { size: mm.size1 || 32, maxW: M.pedW - 50, frac: f1 })
      if (l2) carved(x, l2, M.cx, M.pedTop + 104, { size: mm.size2 || 24, maxW: M.pedW - 60, frac: f2 })
      // chisel sparks while carving
      if (cf > 0 && cf < 1) {
        const line2 = cf > 0.55, ff = line2 ? f2 : f1
        const sx = M.cx - (M.pedW - 60) / 2 + ff * (M.pedW - 60), sy = M.pedTop + (line2 ? 104 : 62)
        for (let i = 0; i < 4; i++) { const ph = (t * 7 + i * 0.25) % 1; R(x, i % 2 ? GOLD : '#fff', sx + ph * 22 * (i - 1.5), sy - 18 - ph * 26 + ph * ph * 30, 5, 5) }
      }
      x.restore()
      x.restore()
      // dust puffs at the floor line on landing
      const dt = t - T.land
      if (dt > 0 && dt < 0.9) {
        x.save(); x.globalAlpha = (1 - dt / 0.9) * 0.85
        for (let i = 0; i < 12; i++) { const d = i % 2 ? 1 : -1, r = 18 + (i % 4) * 8 + dt * 40; const px = M.cx + d * (M.pedW / 2 + 10 + (i >> 1) * 22 + dt * 160), py = POS.backY - 10 - (i % 3) * 12 - dt * 30; x.fillStyle = i % 3 ? '#e9e0d0' : '#cfc4b3'; R(x, x.fillStyle, px - r / 2, py - r / 2, r, r) }
        x.restore()
      }
    }
    function columns(t, rise, k) {
      const off = (1 - rise) * 1100
      x.save(); x.globalAlpha = clamp(k)
      x.drawImage(COL_L, 60, POS.colTop + off)
      x.drawImage(COL_R, 1080 - 60 - 150, POS.colTop + off)
      const bk = ease.outBack(prog(t, T.rise[0] + 0.25, T.rise[1] + 0.2))
      x.drawImage(BEAM, 40, POS.beamY - (1 - bk) * 700)
      x.restore()
    }
    function pisces(t) {
      if (t < T.pisPeek[0] || t > T.out[1]) return
      const peek = ease.outBack(prog(t, ...T.pisPeek)), k = popOut(t, T.out)
      const P = POS.pis, px = lerp(P.x + 90, P.x, peek)
      const tears = t > T.lastLand ? 3 : t > T.h2 ? 2 : t > T.pisPeek[1] + 0.3 ? 1 : 0
      const opts = { color: PIS.color, mood: t > T.lastLand ? 'happy' : 'wide', look: [-1, 0], seed: 6, glow: 0.7, alpha: clamp(k), hops: [T.lastLand + 0.1, T.lastLand + 0.55] }
      drawStarChar(x, px, P.y, P.s, t, opts)
      const F = starFrame(px, P.y, P.s, t, opts)
      inSprite(x, F, () => tearsCells(x, t, tears))
    }
    function thoughts(t) {
      if (t < T.puffs[0] || t > T.cloudPop + 0.4) return
      const H = heroPos(t)
      const pts = [[H.x + 70, H.y - 170, 14], [H.x + 40, H.y - 240, 22], [H.x + 10, H.y - 320, 30]]
      T.puffs.forEach((p0, i) => {
        const kk = pop01(t, p0, 0.25, 2.4) * (1 - prog(t, T.cloudPop - 0.1, T.cloudPop))
        if (kk > 0.01) { const [px, py, r] = pts[i]; x.save(); x.translate(px, py); x.scale(kk, kk); R(x, INK, -r - 4, -r - 4, 2 * r + 8, 2 * r + 8); R(x, BONE, -r, -r, 2 * r, 2 * r); x.restore() }
      })
      // the cloud where the monument will rise, with a "?"
      const ck = pop01(t, T.cloud, 0.3, 2.2)
      const popP = prog(t, T.cloudPop - 0.05, T.cloudPop + 0.2)
      if (ck > 0.01 && popP < 1) {
        x.save(); x.translate(540, 760); x.scale(ck * (1 + 0.3 * popP), ck * (1 + 0.3 * popP)); x.globalAlpha = 1 - popP
        const blobs = [[-110, 10, 70], [0, -30, 90], [110, 10, 70], [-50, 40, 70], [60, 40, 70]]
        for (const [bx, by, r] of blobs) { x.fillStyle = INK; x.beginPath(); x.arc(bx, by, r + 7, 0, Math.PI * 2); x.fill() }
        for (const [bx, by, r] of blobs) { x.fillStyle = BONE; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
        x.fillStyle = INK; x.font = `800 110px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('?', 0, 6 + 6 * Math.sin(t * 6))
        x.restore()
      }
    }
    function stars(t) {
      const k = popOut(t, T.out)
      if (k <= 0) return
      const H = heroPos(t)
      const hk = pop01(t, T.heroIn, 0.4, 2.1) * k
      // plinths
      const pr = ease.outCubic(prog(t, T.rise[0] + 0.1, T.rise[1] + 0.1))
      x.save(); x.globalAlpha = clamp(k)
      x.drawImage(PLINTH, H.x - PLINTH.width / 2, 1340 + (1 - pr) * 700)
      if (cfg.date) {
        const dk = pop01(t, T.dateIn, 0.35, 2) * k
        if (dk > 0.01) x.drawImage(PLINTH_S, POS.date.x - PLINTH_S.width / 2, 1340 + (1 - clamp(dk)) * 500)
      }
      x.restore()
      if (cfg.back) cfg.back(x, t, T, ctx)
      // the hero
      const ph = phaseOf(t)
      const md = { ...defaultMood(ph, t), ...(cfg.moods ? cfg.moods(ph, t, T) || {} : {}) }
      const opts = { color: HERO.color, glyph: HERO.glyph, mood: md.mood, look: md.look, hops: heroHops, pop: hk, seed: 3, glow: 1.1, squash: md.squash || 0 }
      if (hk > 0.01) {
        drawStarChar(x, H.x, H.y, H.s, t, opts)
        const F = starFrame(H.x, H.y, H.s, t, opts)
        ctx.hero = { ...H, F, mood: md.mood }
        drawLaurel(x, F)
        if (cfg.heroProp) inSprite(x, F, () => cfg.heroProp(x, F, t, T, ctx))
      }
      // the date
      if (cfg.date && t >= T.dateIn) {
        const dk = pop01(t, T.dateIn, 0.38, 2.1) * k
        const dm = cfg.dateMoods ? cfg.dateMoods(t, T) : { mood: 'happy', look: [-1, 0] }
        const D = POS.date
        const o2 = { color: DATE.color, glyph: DATE.glyph, mood: dm.mood, look: dm.look, hops: dateHops, pop: dk, seed: 8, glow: 1.1 }
        if (dk > 0.01) { drawStarChar(x, D.x, D.y, D.s, t, o2); ctx.date = { ...D, F: starFrame(D.x, D.y, D.s, t, o2) } }
      }
      // THE STARS narrator (only when it speaks): a small gold star top-right of the box
      if (starsHops) {
        const nk = pop01(t, T.boxOpen, 0.35, 2.1) * outK(t, [T.boxClose, T.boxClose + 0.25])
        if (nk > 0.01) drawStarChar(x, 900, 1400, 130, t, { color: STAR.sky, mood: 'happy', hops: starsHops, pop: nk, seed: 2, glow: 1.0 })
      }
      if (cfg.front) cfg.front(x, t, T, ctx)
      // the last line's burst
      sparkles(x, t, H.x, H.y - 40, T.lastLand + 0.02, 12, 210, 1, [GOLD, BONE, '#ffe7a0'])
      sparkles(x, t, POS.mon.cx, POS.mon.pedTop - 60, T.land, 10, 240, 2, [GOLD, BONE])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        // camera: a slow epic push-in during the hook, a shake on the monument's landing
        const push = ease.inOutCubic(prog(t, 0, 3.8))
        drawSky(x, t, { ...SKY_H, zoom: lerp(1.7, SKY_H.zoom, push), dy: lerp(-40, 0, push), dim: 0.5 })
        const dtL = t - T.land, dtH = t - T.lastLand
        const shake = (dtL > 0 && dtL < 0.45 ? 18 * Math.exp(-dtL * 9) * Math.sin(dtL * 60) : 0) + (dtH > 0 && dtH < 0.35 ? 9 * Math.exp(-dtH * 10) * Math.sin(dtH * 60) : 0)
        x.save(); x.translate(0, shake)
        if (t < T.out[1] + 0.02) {
          const { rise, k } = temple(t)
          rays(t)
          monument(t)
          pisces(t)
          columns(t, rise, k)
          thoughts(t)
          stars(t)
        }
        x.restore()
        sub.update(t, T.sub, outK(t, T.subOut))
        STK.forEach((s, i) => s.update(t, T.stk[i], outK(t, T.stkOut)))
        box.update(t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        bug.update(t, outK(t, T.bugOut))
        black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
        drawGrain(gx, t)
      },
    }
  }

  // ── the one card-cut candidate (cardfx plays it): DAILY → TWIST
  const CUTS = [T.cut]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const chisel = Array.from({ length: 16 }, (_, i) => ['tick', r3(T.carve[0] + i * (T.carve[1] - T.carve[0]) / 16), 0.03 + (i % 3) * 0.008])
  const CUES = [
    ['whoosh', T.rise[0], 0.7, 0.05], ['tom', r3(T.rise[1] - 0.05), 70, { gain: 0.16, decay: 0.4 }], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
    ...wordPops(T.h0, 2, 0.08, 0), ['pop', T.h0Land, 1046.5, 0.045, 0], ['pop', r3(T.h0Land + 0.1), 1318.51, 0.035, 0],
    ['pop', T.heroIn + 0.05, 783.99, 0.035, 0], ['pop', T.sub, 1174.66, 0.03, 0.3], ['tick', r3(T.sub + 0.08), 0.03],
    ...T.puffs.map((p, i) => ['pop', p, NOTE[i + 2] * 2, 0.025, 0.2]), ['pluck', T.cloud, 659.25, 0.035, 0.5, 0.2],
    ['riser', r3(T.cloud - 0.3), r3(T.mon[0]), 0.035], ['pop', T.cloudPop, 1567.98, 0.04, 0],
    ['boom', T.land, 0.35], ['tom', T.land, 62, { gain: 0.32, decay: 0.45 }], ['bell', r3(T.land + 0.05), 1046.5, 0.03, 1.6, 0], ['glitter', T.land, r3(T.land + 0.6)],
    ...wordPops(T.h1, 2, 0.1, 1), ['pop', T.h1Land, 1174.66, 0.04, 0],
    ...chisel,
    ['pop', r3(T.pisPeek[0] + 0.15), 987.77, 0.025, 0.45], ['pluck', r3(T.pisPeek[1] + 0.35), 659.25, 0.025, 0.5, 0.45],
    ...wordPops(T.h2, 3, 0.16, 2, 0.03),
    ...T.stk.map((s, i) => ['pop', s, NOTE[(i * 2 + 1) % 7] * 1.5, 0.045, [-0.3, 0.3, 0][i]]), ...T.stk.map(s => ['tick', r3(s + 0.06), 0.035]),
    ['bell', r3(T.stk[2] + 0.04), 1567.98, 0.025, 0.8, 0],
    ...wordPops(T.h3, 3, 0.1, 3),
    ...talkCues(LINES, { cps: CPS }),
    ...wordPops(T.last, 2, 0.08, 0, 0.028), ['pop', T.lastLand, 1046.5, 0.05, 0], ['bell', r3(T.lastLand + 0.03), 2093, 0.03, 1.4, 0], ['glitter', T.lastLand, r3(T.lastLand + 0.6)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.date ? [['pop', r3(T.dateIn + 0.05), 880, 0.04, 0.4]] : []),
    ...(cfg.cues ? cfg.cues(T) : []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  const music = { style: 'cinematic', key: cfg.key, seed: cfg.seed, sections: { drop: T.drop, breakdown: [T.cut], lift: [T.last], outroAt: STORY_END }, hits: [T.lastLand] }
  return { DURATION, SCENES, CUES, T, music }
}
