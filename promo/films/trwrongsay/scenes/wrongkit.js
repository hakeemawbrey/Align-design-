// WRONG ANSWERS ONLY: the shared look of the five Star Talk Trends films trwrongdate, trwronglove, trwrongsay,
// trwronglang and trwrongdeal (promo/films/STARTALK-TRENDS.md §17). Every episode carries an identical copy of this file
// in its own folder, so the five films look like one format without touching another film's folder.
//
// The format (20 s, story 0–15.6, then the shared end card):
//   0.00–2.30   hook: a bone question card pops in ("Q" badge, Inter 800 + one italic accent); a strip of tape slaps
//               "WRONG ANSWERS ONLY" across its corner; the three answering signs pop up underneath, hopping, "me! me!".
//               The card docks at the top and stays there as the headline. A fake 4-segment progress bar runs under the bug.
//   2.30–10.60  three wrong answers (rule of three, the third the most unhinged), each a jump cut with a sign sticker
//               (glyph badge + the answer in quotes) and a green "CERTIFIED WRONG" stamp. Answer 3 starts under the one
//               card cut (7.7).
//   10.60–15.5  the turn: the music tape-stops, the card drops back to the middle, someone sniffles "…the real one?";
//               the true answer types in the dialogue box, a gold RIGHT ANSWER stamp slams onto the card, and the bug's
//               "WRONG" is struck out and becomes "RIGHT". THE STARS and Pisces (fountaining) close it out.
// Pisces cries somewhere in the background of every answer (the running gag).
//
//   makeWrong(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.q: the question ('Describe the perfect | *first date.*'), cfg.accent / cfg.deep: accent colours
//     cfg.answers: [{ sign, text, draw(x, t, S), cues: [], pis: { x, y, s, noTissues } }] × 3
//        S = { u, t0, t1, i, hero(x, t, o), SIGN, pisces(x, t, P, tears, mood, look) }
//     cfg.hookBubbles: three short "me!" bubbles, cfg.speaker: 'THE STARS' | 'PISCES', cfg.ask: the turn bubble,
//     cfg.last: the true answer (the last line), cfg.finale(x, t, S): the middle of the closing frame, cfg.askY: the ask bubble's y.
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e'
export const WRONG = '#ff5a6e', MINT = '#4fd68a', PAPER = '#f4e8cc', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline (same in all five films)
export const DURATION = 20
export const STORY_END = DURATION - ENDCARD_LEN          // 15.6
export const T = {
  black: [0, 0.3], bug: 0.35, bar: 0.3,
  cardIn: 0.12, tape: 0.78, crowd: [1.0, 1.14, 1.28], crowdOut: [1.95, 2.25],
  dock: [1.95, 2.32],
  answers: [[2.3, 5.0], [5.0, 7.7], [7.7, 10.6]],
  cut: 7.7,
  stop: 10.6, undock: [10.62, 11.0], ask: 10.95, last: 11.75, right: 13.0, starsIn: 10.75, pisIn: 10.8,
  boxClose: 15.1, out: [15.1, 15.5], bugOut: [15.2, 15.5],
}
const CPS = 30
const STAMP_AT = 1.45                                   // the CERTIFIED WRONG stamp, seconds into each answer

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
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
/** hearts floating up from (cx, cy) from t0 */
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, rise = 200, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * rise
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** pixel confetti falling from a burst at t0 */
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, '#9fe6b0', BONE] } = {}) {
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
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, rot = 0 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
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
/** pixel label text on canvas (Space Mono by default), with an ink drop shadow */
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
/** a soft floor shadow */
export function shadow(x, cx, cy, w, a = 0.35) { if (w <= 0) return; x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
/** a little pixel table (top at y) */
export function table(x, cx, y, w, col = '#8a5a3c') {
  box(x, cx - w / 2, y, w, 22, col, { b: 6, hi: '#a8714c' })
  box(x, cx - w * 0.36, y + 28, 18, 150, '#6b4430', { b: 5 }); box(x, cx + w * 0.36 - 18, y + 28, 18, 150, '#6b4430', { b: 5 })
}
/** a candle with a flickering flame */
export function candle(x, t, cx, y, s = 1) {
  box(x, cx - 9 * s, y - 46 * s, 18 * s, 46 * s, BONE, { b: 4 })
  const f = 1 + 0.12 * Math.sin(t * 23) + 0.06 * Math.sin(t * 37)
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, y - 64 * s, 2, cx, y - 64 * s, 90 * s); g.addColorStop(0, 'rgba(255,214,140,0.35)'); g.addColorStop(1, 'rgba(255,214,140,0)')
  x.fillStyle = g; x.fillRect(cx - 90 * s, y - 154 * s, 180 * s, 180 * s); x.restore()
  drawBits(x, ['.F.', 'FYF', 'FYF', '.F.'], { F: '#ff9d3a', Y: '#fff1a8' }, cx, y - 62 * s, 6 * s, { sy: f })
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
/** pixel sunglasses over the eyes (sprite cells) */
export function shadesCells(ctx, up = 0) {
  const y = 16.6 - up * 7
  for (const ex of [13.4, 22.6]) { ctx.fillStyle = INK; ctx.fillRect(ex - 3.6, y - 0.6, 7.2, 5.2); ctx.fillStyle = '#2b2140'; ctx.fillRect(ex - 3, y, 6, 4); ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.fillRect(ex - 2.4, y + 0.6, 1.6, 0.8) }
  ctx.fillStyle = INK; ctx.fillRect(16.8, y + 0.4, 2.4, 1.2)
}
/** a little tissue box (Pisces' prop) */
export function tissues(x, cx, cy, s) {
  if (s <= 1) return
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ── the format bug: "WRONG ANSWERS ONLY" in Inter 800 small caps, letter-spaced, top-left 56 px.
//    At the right answer, "WRONG" is struck out and swaps to a gold "RIGHT".
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const icon = el('div', { width: '18px', height: '18px', background: WRONG, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,90,110,0.7)` }, b)
  const line = el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)', textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps', display: 'flex', alignItems: 'center' }, b)
  const word = el('span', { position: 'relative', display: 'inline-block', color: WRONG }, line, 'WRONG')
  const strike = el('span', { position: 'absolute', left: '-4px', top: '50%', height: '5px', width: '0', background: BONE, boxShadow: `0 0 0 2px ${INK}`, transform: 'translateY(-50%) rotate(-4deg)' }, word)
  el('span', {}, line, '&nbsp;ANSWERS&nbsp;ONLY')
  let swapped = false
  return {
    update(t, out = 1) {
      const k = pop01(t, at, 0.36, 2.2) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2) * out)
      const sw = t >= T.right + 0.32
      const bump = sw ? 1 + 0.12 * Math.sin(Math.PI * prog(t, T.right + 0.32, T.right + 0.6)) : 1
      b.style.transform = `scale(${((0.6 + 0.4 * k) * bump).toFixed(4)})`
      const sp = ease.outCubic(prog(t, T.right + 0.05, T.right + 0.25))
      strike.style.width = sw || sp <= 0 ? '0' : `calc(${(100 * sp).toFixed(1)}% + 8px)`
      if (sw !== swapped) { swapped = sw; word.firstChild.nodeValue = sw ? 'RIGHT' : 'WRONG'; word.style.color = sw ? GOLD : WRONG; icon.style.background = sw ? GOLD : WRONG }
    },
  }
}

const accentHTML = (text, size, col) => text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${size}px ${SERIF};color:${col};letter-spacing:0">$1</span>`).replace(/ \| /g, '<br>')

// ── the question card (DOM): bone index card, ruled lines, a "Q" badge, the question; a tape strip, a gold stamp
function buildCard(root, { q, deep, tapeCol }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '0', display: 'none', transformOrigin: '50% 50%', pointerEvents: 'none' }, root)
  const card = el('div', { position: 'relative', width: '880px', boxSizing: 'border-box', padding: '46px 48px 50px 40px', display: 'flex', alignItems: 'flex-start', gap: '28px',
    background: `repeating-linear-gradient(180deg, ${PAPER} 0 74px, rgba(120,150,210,0.38) 74px 77px)`, backgroundPosition: '0 34px',
    border: `7px solid ${INK}`, borderRadius: '12px', boxShadow: '12px 12px 0 rgba(6,4,18,0.72)' }, wrap)
  el('div', { position: 'absolute', left: '118px', top: '0', bottom: '0', width: '4px', background: 'rgba(232,98,138,0.5)' }, card)
  el('div', { flex: '0 0 auto', width: '84px', height: '84px', marginTop: '6px', borderRadius: '50%', background: PINK, border: `6px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 48px ${INTER}`, color: INK, position: 'relative' }, card, 'Q')
  el('div', { font: `800 66px ${INTER}`, lineHeight: '1.1', color: INK, letterSpacing: '-0.015em', position: 'relative' }, card, accentHTML(q, 84, deep))
  // the tape strip across the top-right corner
  const tape = el('div', { position: 'absolute', right: '-46px', top: '-38px', padding: '10px 26px 12px', background: tapeCol, border: `5px solid ${INK}`, transform: 'rotate(7deg)',
    font: `800 30px ${INTER}`, letterSpacing: '0.16em', color: INK, whiteSpace: 'nowrap', boxShadow: '6px 6px 0 rgba(6,4,18,0.5)', transformOrigin: '50% 50%' }, card, 'WRONG ANSWERS ONLY')
  // the gold RIGHT ANSWER stamp (bottom-right)
  const stamp = el('div', { position: 'absolute', right: '-24px', bottom: '-64px', padding: '12px 30px 16px', border: `9px solid ${GOLD}`, outline: `4px solid ${GOLD}`, outlineOffset: '7px', borderRadius: '8px',
    font: `800 58px ${INTER}`, letterSpacing: '0.04em', color: GOLD, whiteSpace: 'nowrap', background: 'rgba(27,18,54,0.88)', textShadow: '0 3px 0 rgba(6,4,18,0.8)', display: 'none', transformOrigin: '50% 50%' }, card,
    `RIGHT <span style="font:italic 500 70px ${SERIF};letter-spacing:0">answer</span>`)
  wrap.style.display = 'block'
  const H = card.offsetHeight || 260
  wrap.style.display = 'none'
  const POSE = {
    hook: { cy: 660, s: 1, rot: -2.2 },
    dock: { cy: 168 + H * 0.6 / 2, s: 0.6, rot: 0 },
    fin: { cy: 182 + H * 0.74 / 2, s: 0.74, rot: 1.6 },
  }
  const mix = (a, b, k) => ({ cy: lerp(a.cy, b.cy, k), s: lerp(a.s, b.s, k), rot: lerp(a.rot, b.rot, k) })
  return {
    H, POSE,
    bottom(t) { const p = this.pose(t); return p.cy + H * p.s / 2 },
    pose(t) {
      let p = POSE.hook
      if (t >= T.dock[0]) p = mix(POSE.hook, POSE.dock, ease.inOutCubic(prog(t, ...T.dock)))
      if (t >= T.undock[0]) p = mix(POSE.dock, POSE.fin, easeOutBack(prog(t, ...T.undock), 1.5))
      return p
    },
    update(t) {
      const on = t >= T.cardIn && t < T.out[1]
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      const p = this.pose(t)
      const k = easeOutBack(prog(t, T.cardIn, T.cardIn + 0.42), 2.2), o = popOut(t, T.out)
      const wob = t < T.dock[0] ? 1.4 * Math.sin(t * 2.6) : t > T.undock[1] ? 0.8 * Math.sin(t * 2.2) : 0
      const sh = t > T.right && t < T.right + 0.4 ? 10 * Math.exp(-(t - T.right) * 9) * Math.sin((t - T.right) * 55) : 0
      wrap.style.opacity = String(clamp(prog(t, T.cardIn, T.cardIn + 0.12)) * clamp(o))
      wrap.style.transform = `translate(540px, ${(p.cy + sh).toFixed(1)}px) translate(-50%, -50%) scale(${(p.s * lerp(0.3, 1, k) * Math.max(0.01, o)).toFixed(4)}) rotate(${(p.rot + wob + (1 - k) * -8).toFixed(2)}deg)`
      // the tape slaps on
      const tp = prog(t, T.tape - 0.08, T.tape + 0.06)
      tape.style.opacity = String(clamp(tp * 2))
      tape.style.transform = `rotate(7deg) scale(${lerp(1.6, 1, ease.outCubic(tp)).toFixed(3)})`
      // the gold stamp slams
      const sp = prog(t, T.right - 0.06, T.right + 0.05)
      stamp.style.display = sp > 0 ? 'block' : 'none'
      if (sp > 0) {
        const wv = t > T.right ? 0.05 * Math.exp(-(t - T.right) * 8) * Math.sin((t - T.right) * 40) : 0
        stamp.style.opacity = String(clamp(sp * 2))
        stamp.style.transform = `rotate(-7deg) scale(${(lerp(1.9, 1, ease.outCubic(sp)) * (1 + wv)).toFixed(4)})`
      }
    },
  }
}

// ── the answer sticker: a tilted bone sticker, glyph badge, the sign's name, the answer + a CERTIFIED WRONG stamp
function buildSticker(root, { SIGN, name, text, deep, at, stampAt, out, tilt }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1318px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { position: 'relative', display: 'flex', alignItems: 'center', gap: '24px', maxWidth: '930px', padding: '18px 38px 22px 22px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: '10px 10px 0 rgba(6,4,18,0.7)', transformOrigin: '50% 50%' }, wrap)
  el('div', { flex: '0 0 auto', width: '84px', height: '84px', borderRadius: '50%', background: SIGN.color, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `700 46px ${INTER}`, color: INK }, st, SIGN.glyph + '︎')
  const col = el('div', { display: 'flex', flexDirection: 'column', gap: '4px' }, st)
  el('div', { font: `700 26px ${MONO}`, letterSpacing: '0.14em', color: deep }, col, name.toUpperCase())
  el('div', { font: `800 50px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, col, accentHTML(text, 64, deep))
  const stamp = el('div', { position: 'absolute', right: '-30px', top: '-50px', padding: '6px 16px 8px', border: `6px solid ${MINT}`, borderRadius: '6px', background: 'rgba(14,40,28,0.9)',
    font: `800 26px ${INTER}`, letterSpacing: '0.14em', color: MINT, whiteSpace: 'nowrap', lineHeight: '1.05', textAlign: 'center', display: 'none', transformOrigin: '50% 50%' }, st, 'CERTIFIED<br>WRONG')
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
      const sp = prog(t, stampAt - 0.05, stampAt + 0.05)
      stamp.style.display = sp > 0 ? 'block' : 'none'
      if (sp > 0) { stamp.style.opacity = String(clamp(sp * 2)); stamp.style.transform = `rotate(9deg) scale(${lerp(2, 1, ease.outCubic(sp)).toFixed(3)})` }
    },
  }
}

// ── the fake progress bar: 4 segments (three answers + the right one) under the bug
const SEGS = [...T.answers, [T.stop, T.boxClose]]
function drawBar(x, t) {
  const k = pop01(t, T.bar, 0.3, 1.6) * outK(t, T.out)
  if (k <= 0.01) return
  const X0 = 56, X1 = 1024, GAP = 10, n = SEGS.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  x.save(); x.globalAlpha = clamp(k)
  SEGS.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = prog(t, a, b)
    if (f > 0) R(x, i === 3 ? GOLD : WRONG, sx, Y, w * f, Hh)
  })
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeWrong(cfg) {
  const PIS = signStar('pisces')
  const SPEAK = cfg.speaker || 'THE STARS'
  const PIS_SPEAKS = SPEAK === 'PISCES'
  const LINES = [{ t: T.last, speaker: PIS_SPEAKS ? `${PIS.glyph}︎ PISCES` : SPEAK, color: PIS_SPEAKS ? '#9fd8f6' : undefined, text: cfg.last }]
  const SIGNS = cfg.answers.map(a => signStar(a.sign))
  const NAMES = cfg.answers.map(a => a.name || (a.sign[0].toUpperCase() + a.sign.slice(1)))
  const talk = talkHops(LINES, LINES[0].speaker, { cps: CPS })
  const STARS_HOPS = [T.starsIn + 0.3, ...(PIS_SPEAKS ? [] : [T.ask + 0.05, ...talk]), T.right + 0.05, T.right + 0.6]
  const PIS_HOPS = [T.pisIn + 0.3, ...(PIS_SPEAKS ? [T.ask + 0.05, ...talk] : []), T.right + 0.08, T.right + 0.5, T.right + 1.4]
  const PIS_DEF = { x: 948, y: 1700, s: 120 }

  const mkStar = (SIGN, seed) => (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: SIGN.color, glyph: o.s >= 150 ? SIGN.glyph : null, seed, glow: 1.05, ...o })
  const heroes = SIGNS.map((S, i) => mkStar(S, 3 + i * 4))

  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }

  async function build(stage) {
    try {
      await Promise.all(["800 66px Inter", "800 50px Inter", "800 28px Inter", "700 30px Inter", "italic 500 84px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const card = buildCard(root, { q: cfg.q, deep: cfg.deep, tapeCol: cfg.tape || '#ffe27a' })
    const stickers = cfg.answers.map((a, i) => {
      const at = T.answers[i][0] + (i === 2 ? 0.5 : 0.32)
      return buildSticker(root, { SIGN: SIGNS[i], name: NAMES[i], text: a.text, deep: cfg.deep, at, stampAt: T.answers[i][0] + (a.stampAt ?? STAMP_AT + (i === 2 ? 0.25 : 0)), out: [T.answers[i][1] - 0.18, T.answers[i][1]], tilt: [-2, 1.7, -1.3][i] })
    })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.last - 0.22, close: T.boxClose, cps: CPS })
    const bug = buildBug(root, T.bug)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)
    const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

    // the hook: three eager answerers under the card
    const CROWD = [{ x: 250, y: 1210 }, { x: 540, y: 1250 }, { x: 830, y: 1210 }]
    const BUBS = cfg.hookBubbles || ['ooh!', 'me! me!', 'pick ME']
    function hook(t) {
      if (t > T.crowdOut[1]) return
      CROWD.forEach((P, i) => {
        const a = T.crowd[i]
        const k = pop01(t, a, 0.36, 2.3) * outK(t, [T.crowdOut[0] + i * 0.05, T.crowdOut[1]])
        if (k <= 0.01) return
        const hops = [a + 0.3, a + 0.62, a + 0.94, a + 1.26, a + 1.58].filter(h => h < T.crowdOut[0])
        shadow(x, P.x, P.y + 120, 170 * k)
        heroes[i](x, t, { x: P.x, y: P.y, s: 210, pop: k, mood: i === 2 ? 'sparkle' : 'happy', look: [0, -1], hops })
        bubble(x, t, P.x + [30, 0, -30][i], P.y - 190 - (i === 1 ? 20 : 0), a + 0.25, T.crowdOut[0] + 0.1, BUBS[i], { size: 34, tail: [-0.3, 0, 0.3][i], rot: [-0.06, 0.03, 0.07][i] })
      })
      const pk = pop01(t, 0.55, 0.3, 2) * outK(t, T.crowdOut)
      if (pk > 0.01) { tissues(x, PIS_DEF.x - 86, PIS_DEF.y + 30, 60 * pk); pisces(x, t, { ...PIS_DEF, pop: pk }, 1, 'wide', [-1, -1]) }
    }

    function finale(t) {
      if (t < T.stop || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const S = { ok, card, heroes, SIGNS, pisces }
      if (cfg.finale) cfg.finale(x, t, S)
      // THE STARS (left)
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) drawStarChar(x, 180, 1240, 165, t, { color: STAR.sky, mood: t > T.right + 0.1 ? 'happy' : 'neutral', look: [1, -0.5], hops: STARS_HOPS, pop: sk, seed: 2, glow: 1.05 })
      // Pisces (right): sniffling, then fountains of happy tears
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        tissues(x, 980, 1300, 64 * pk)
        pisces(x, t, { x: 880, y: 1236, s: 160, pop: pk, hops: PIS_HOPS }, t > T.right ? 3 : 2, t > T.right ? 'sparkle' : 'wide', [-1, -0.8])
      }
      // the turn: someone asks to break the rule
      const asker = PIS_SPEAKS ? { x: 760, tail: 0.45 } : { x: 330, tail: -0.45 }
      bubble(x, t, asker.x, cfg.askY ?? 940, T.ask, T.last + 0.2, cfg.ask || '…can I say the real one?', { size: 34, tail: asker.tail, col: '#fff1c8' })
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 2.5))
        const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.65, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
        drawSky(x, t, base)
        // the tape-stop dim for the turn
        const dS = t - T.right, shake = dS > 0 && dS < 0.45 ? 14 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        x.save(); x.translate(0, shake)
        hook(t)
        // the three answers: jump cuts with a zoom punch
        cfg.answers.forEach((an, i) => {
          const [a, b] = T.answers[i]
          if (t < a || t >= b) return
          const punch = i === 2 ? 1 : 1 + 0.07 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
          x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
          an.draw(x, t, { u: t - a, t0: a, t1: b, i, hero: heroes[i], SIGN: SIGNS[i], pisces })
          x.restore()
          // Pisces in the background, sniffling more each answer
          const P = { ...PIS_DEF, ...(an.pis || {}) }
          const pk = pop01(t, a + 0.25, 0.3, 2) * outK(t, [b - 0.15, b])
          if (pk > 0.01) {
            if (!P.noTissues) tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
            pisces(x, t, { ...P, pop: pk }, i === 2 ? 2 : 1, P.mood || (i === 2 ? 'wide' : 'sparkle'), P.look || [-1, -0.6])
          }
        })
        finale(t)
        x.restore()
        drawBar(x, t)
        tx.clearRect(0, 0, 1080, 1920)
        sparkles(tx, t, 720, card.bottom(t) - 10, T.right + 0.02, 14, 260, 1, [GOLD, BONE, '#fff1a8'])
        card.update(t)
        stickers.forEach(s => s.update(t))
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        // white flash on the hard cuts (not the card cut); a soft one on the stamp
        const fl = Math.max(0, ...[T.answers[0][0], T.answers[1][0]].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0), t >= T.right && t < T.right + 0.1 ? 0.5 * (1 - (t - T.right) / 0.1) : 0)
        flash.style.opacity = String(0.5 * fl)
        // the tape-stop: a brief dip to dark at the turn
        const dip = t >= T.stop && t < T.stop + 0.5 ? 0.45 * Math.sin(Math.PI * prog(t, T.stop, T.stop + 0.5)) : 0
        black.style.opacity = String(Math.max(1 - ease.inOutQuad(prog(t, ...T.black)), dip))
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: under the swap into the third (most unhinged) answer
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ['pop', r3(T.cardIn + 0.05), 987.77, 0.045, 0], ['pop', r3(T.cardIn + 0.13), 1318.51, 0.03, 0], ['whoosh', T.cardIn, 0.35, 0.03],
    ['pop', T.bug + 0.06, 880, 0.03, -0.4],
    ['tick', T.tape, 0.07], ['pop', T.tape, 1567.98, 0.04, 0.3], ['whoosh', r3(T.tape - 0.1), 0.2, 0.03],
    ...T.crowd.flatMap((a, i) => [['pop', r3(a + 0.03), NOTE[i * 2], 0.04, (i - 1) * 0.4], ['pop', r3(a + 0.28), NOTE[i * 2 + 1] * 2, 0.025, (i - 1) * 0.4]]),
    ['pop', 0.6, 1174.66, 0.02, 0.5],
    ['whoosh', T.dock[0], 0.35, 0.03],
    // answers: the jump cut, the sticker slap, the CERTIFIED WRONG stamp (a cheerful "correct!" ding), the answer's own cues
    ...cfg.answers.flatMap((an, i) => {
      const a = T.answers[i][0], st = a + (i === 2 ? 0.5 : 0.32), sa = a + (an.stampAt ?? STAMP_AT + (i === 2 ? 0.25 : 0))
      return [
        ...(i < 2 ? [['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05]] : []),
        ['pop', r3(st), 1174.66, 0.045, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(st + 0.02), 0.04],
        ['tick', r3(sa), 0.07], ['tom', r3(sa), 140, { gain: 0.12, decay: 0.12 }],
        ['chip', r3(sa + 0.04), 1318.51, 0.09, { wave: 'square', duty: 0.25, gain: 0.03, decay: 0.08, sustain: 0.5, dly: 0 }],
        ['chip', r3(sa + 0.13), 1760, 0.16, { wave: 'square', duty: 0.25, gain: 0.03, decay: 0.12, sustain: 0.5, dly: 0.1 }],
        ['pluck', r3(a + 0.3), 2349.32, 0.012, 0.3, 0.6],
        ...(an.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    // the turn: a chiptune tape-stop slide, the card drops back, the ask
    ['chip', T.stop, 880, 0.5, { wave: 'square', duty: 0.5, slide: -40, gain: 0.03, decay: 0.5, sustain: 0.8, rev: 0.05, dly: 0 }],
    ['whoosh', T.undock[0], 0.35, 0.035], ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
    ['pluck', T.ask, 1174.66, 0.03, 0.4, PIS_SPEAKS ? 0.4 : -0.4], ['pop', r3(T.ask + 0.02), 659.25, 0.03, 0],
    ...talkCues(LINES, { cps: CPS }),
    // the RIGHT ANSWER stamp
    ['whoosh', r3(T.right - 0.2), 0.25, 0.04], ['boom', T.right, 0.3], ['tom', T.right, 88, { gain: 0.3, decay: 0.3 }], ['tick', T.right, 0.08],
    ['bell', r3(T.right + 0.08), 1760, 0.035, 1.3, 0], ['glitter', r3(T.right + 0.05), r3(T.right + 0.6)],
    ['tick', r3(T.right + 0.08), 0.03], ['pop', r3(T.right + 0.33), 1567.98, 0.035, -0.6], ['pop', r3(T.right + 0.4), 2093, 0.025, -0.6],
    ...(cfg.finaleCues || []),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
