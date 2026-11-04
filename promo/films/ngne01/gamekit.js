// STAR TALK GAME NIGHT: the shared set, timeline and sound of the game show (promo/films/next30/b07.md, NEXT30-BUILD.md).
// Lives in ngne01's folder; every episode (ngne01–ngne24) imports it: import { makeGame } from '../../ngne01/gamekit.js'
//
// The format (35 s, story 0–30.6, then the shared end card):
//   0.00–3.00   hook: the 2-line hook caption is already up at frame 0; both contestants stand at their podiums,
//               one mid-action (cfg.A/B.intro). The GAME NIGHT marquee glows; THE STARS (host, gold, pixel mic) pop in and
//               welcome everyone in the dialogue box. Pisces sits front row in the audience with a tissue box.
//   3.00–25.20  three rounds of 7.4 s: FINISH THE TEXT · GREEN FLAG OR RED FLAG · WHAT WOULD YOU DO?
//               u 0.05 round caption · 0.25 the prompt card drops into the marquee · 0.9 the first buzz (BZZT, the
//               "SPEED: 0 PTS" sticker) · 1.15 first answer bubble · 2.5 second answer · 3.7 THE STARS' verdict ·
//               4.3 the kindness point (+1 KIND, ding, audience claps, the score ticks up).
//   24.6        drum roll.  25.2 FINALE: "Kindest heart: | *<sign>.*" (or both), confetti, the winner's spotlight, the
//               prize: a face-down card flies in and flips to a talk card (card first, face last). THE STARS' last line.
//   The one card cut is the middle candidate: the start of round 2.
//
//   makeGame(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.id
//     cfg.A, cfg.B: { sign, prop?: 'clipboard'|'soup'|'planner'|'tea'|'sandwich'|'tissue'|'wrench'|'pigeon',
//                     propUntil?: s, intro?: { mood, look, buzz: bool, squash } , finale?: { mood, look, clap: bool } }
//     cfg.hook: 'line one | line *two*'      cfg.welcome: THE STARS' first line (≤ 30 chars)
//     cfg.rounds × 3: { prompt, first: 'A'|'B', buzzAt?: u, a: ANS, b: ANS, point: 'A'|'B'|'both', host }
//        ANS = { text, mood?, look?, flag?: 'G'|'R'|'GR'|'RG', then?: { at: u, text, flag? } }
//     cfg.last (THE STARS, finale)   cfg.talk: 'card-talk-N.png'   cfg.fan: audience sign that cries (default pisces)
//     cfg.hostIn (default 0.35)      cfg.draw(x, t, S): extra drawing every frame (after the cast)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill, A as ASSETS } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#e8344e', GREEN = '#4fcf7e', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const BUG_COL = '#ffd23a'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

// ── the fixed timeline
export const DURATION = 35
export const STORY_END = DURATION - ENDCARD_LEN          // 30.6
const RL = 7.4, R0 = 3.0
export const T = {
  hostIn: 0.35, welcome: 0.25, welcomeClose: 2.95, h0Out: [2.8, 3.0],
  rounds: [0, 1, 2].map(i => [R0 + i * RL, R0 + (i + 1) * RL]),   // [3.0,10.4] [10.4,17.8] [17.8,25.2]
  U: { head: 0.05, card: 0.25, buzz: 0.9, ans1: 1.15, ans2: 2.5, host: 3.7, point: 4.3 },
  roll: [24.55, 25.2], fin: 25.2, finHead: 25.25, confetti: 25.35, prize: [25.7, 26.15], flip: [26.35, 26.75], last: 26.6,
  boxClose: 30.1, out: [30.1, 30.5], bugOut: [30.2, 30.5],
}
const CPS = 30
const ROUND_HEADS = ['*Finish* the text.', 'Green flag or *red?*', 'What would *you* do?']
const ROUND_LABELS = ['FINISH THE TEXT', 'GREEN FLAG OR RED FLAG?', 'WHAT WOULD YOU DO?']

// ── layout
const POD = { A: 250, B: 830, top: 1150, w: 300, h: 170 }
const CAST_Y = 1040, CAST_S = 250
const HOST = { x: 540, y: 1196, s: 150 }
const MARQ = { x0: 44, x1: 1036, y0: 360, y1: 662 }
const BUB_Y = 790
const FAN = { x: 290, y: 1776, s: 180 }

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
export function confetti(x, t, t0, cx, cy, { n = 30, life = 2.6, cols = [GOLD, PINK, SKYB, '#9fe6b0', BONE] } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > life) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + ((i / n) - 0.5) * 2.6, v = 560 + 280 * ((i * 7) % 5) / 4
    const px = cx + Math.cos(a) * v * tt * 0.9 + Math.sin(tt * 6 + i) * 14, py = cy + Math.sin(a) * v * tt + 640 * tt * tt
    const sz = 12 + (i % 3) * 4
    x.fillStyle = cols[i % cols.length]
    x.save(); x.translate(px, py); x.rotate(tt * (4 + i % 5) + i); x.fillRect(-sz / 2, -sz / 4, sz, sz / 2); x.restore()
  }
  x.restore()
}
export function label(x, text, cx, cy, { size = 28, col = BONE, align = 'center', alpha = 1, font = MONO, weight = 700, rot = 0 } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 4)
  x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
export function shadow(x, cx, cy, w, a = 0.35) { x.save(); x.globalAlpha = a; x.fillStyle = '#05030c'; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.09, 0, 0, Math.PI * 2); x.fill(); x.restore() }
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.24 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 26, top); x.lineTo(tx + 26, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.28 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** word-wrap for canvas text (x.font must be set) */
export function wrapLines(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let cur = ''
    for (const w of para.split(' ')) {
      const nx = cur ? cur + ' ' + w : w
      if (x.measureText(nx).width > maxW && cur) { out.push(cur); cur = w } else cur = nx
    }
    out.push(cur)
  }
  return out
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
/** one single tear (sprite cells), for a sign that "doesn't cry" */
export function oneTear(ctx, t, t0) {
  const p = ((t - t0) % 1.6) / 1.6
  if (t < t0) return
  const j = 21 + 9 * p * p
  ctx.fillStyle = INK; ctx.fillRect(24.85, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(25, j, 1, 1.4)
}

// ── props held at the contestant's side (canvas px; (hx, hy) = the hand point, k = scale 0…1)
export function drawProp(x, t, kind, hx, hy, k = 1, { rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(hx, hy); x.rotate(rot); x.scale(k, k)
  if (kind === 'clipboard') {
    box(x, -46, -62, 92, 124, '#b98a52', { b: 5 }); R(x, BONE, -38, -48, 76, 104)
    box(x, -20, -70, 40, 16, '#9aa0b8', { b: 4 })
    for (let i = 0; i < 5; i++) { R(x, i === 4 ? RED : '#6a6488', -30, -34 + i * 18, i === 4 ? 30 : 56, 5); R(x, GREEN, 24, -36 + i * 18, 8, 8) }
  } else if (kind === 'soup') {
    for (let i = 0; i < 3; i++) { const p = ((t * 0.7 + i / 3) % 1); x.save(); x.globalAlpha = 0.55 * (1 - p); R(x, '#f4ecff', -24 + i * 22 + 6 * Math.sin(t * 3 + i), -50 - p * 70, 10, 18); x.restore() }
    R(x, INK, -66, -30, 132, 10); R(x, '#f3a64a', -60, -26, 120, 8)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-66, -22); x.lineTo(66, -22); x.lineTo(46, 34); x.lineTo(-46, 34); x.closePath(); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-58, -20); x.lineTo(58, -20); x.lineTo(40, 28); x.lineTo(-40, 28); x.closePath(); x.fill()
    R(x, '#9fd8f6', -40, -8, 80, 8)
  } else if (kind === 'planner') {
    box(x, -58, -44, 116, 88, '#2fc79a', { b: 5, hi: '#57e0b4' }); R(x, INK, -3, -44, 6, 88)
    R(x, BONE, -50, -36, 44, 72); R(x, BONE, 6, -36, 44, 72)
    for (let i = 0; i < 4; i++) { R(x, '#6a6488', -44, -26 + i * 16, 32, 4); R(x, i === 1 ? RED : '#6a6488', 12, -26 + i * 16, 32, 4) }
  } else if (kind === 'tea') {
    for (let i = 0; i < 2; i++) { const p = ((t * 0.6 + i / 2) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#f4ecff', -10 + i * 18 + 5 * Math.sin(t * 3 + i), -40 - p * 50, 8, 16); x.restore() }
    box(x, -30, -26, 60, 52, BONE, { b: 5 }); R(x, '#c98a5a', -24, -20, 48, 10)
    R(x, INK, 30, -14, 18, 28); R(x, BONE, 30, -8, 10, 16)
  } else if (kind === 'sandwich') {
    const bite = t > 0.6 ? 1 : 0
    box(x, -60, -30, 120, 20, '#e8c27a', { b: 4 }); R(x, '#5fd38a', -62, -10, 124, 10); R(x, '#e8344e', -56, 0, 112, 8); box(x, -60, 10, 120, 20, '#e8c27a', { b: 4 })
    if (bite) { x.fillStyle = '#05040c'; x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(64, -8, 22, 0, Math.PI * 2); x.fill(); x.globalCompositeOperation = 'source-over' }
  } else if (kind === 'tissue') {
    box(x, -36, -16, 72, 40, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
    x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-12, -16); x.quadraticCurveTo(0 + 6 * Math.sin(t * 6), -60, 14, -16); x.closePath(); x.fill()
  } else if (kind === 'wrench') {
    x.rotate(0.5 + 0.25 * Math.sin(t * 9))
    R(x, INK, -8, -50, 16, 100); R(x, '#b8bed6', -4, -46, 8, 92)
    box(x, -22, -70, 44, 26, '#b8bed6', { b: 4 }); R(x, '#05040c', -8, -72, 16, 16)
  } else if (kind === 'flagG' || kind === 'flagR') {
    const col = kind === 'flagG' ? GREEN : RED, w = Math.sin(t * 8) * 6
    R(x, INK, -6, -110, 12, 150); R(x, '#d8b98a', -3, -108, 6, 146)
    x.fillStyle = INK; x.beginPath(); x.moveTo(0, -116); x.lineTo(96, -96 + w); x.lineTo(0, -48); x.closePath(); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(4, -108); x.lineTo(84, -94 + w); x.lineTo(4, -56); x.closePath(); x.fill()
  } else if (kind === 'watch') {
    R(x, INK, -30, -10, 60, 20); box(x, -20, -20, 40, 40, BONE, { b: 5 }); R(x, INK, -2, -14, 4, 16); R(x, INK, -2, -2, 12, 4)
  } else if (kind === 'sticker') {
    drawBits(x, ['...G...', '..GGG..', 'GGGWGGG', '.GGGGG.', '.GG.GG.', 'GG...GG'], { G: GOLD, W: '#fff6d0' }, 0, 0, 9)
  }
  x.restore()
}

// ── the show bug: "STAR TALK GAME NIGHT" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,210,58,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'STAR&nbsp;TALK<span style="color:rgba(255,255,255,0.65)">&nbsp;GAME&nbsp;NIGHT</span>')
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(out) } }
}

// ── the marquee: chasing bulbs around the prompt area
function drawMarquee(x, t, k, col = GOLD) {
  if (k <= 0.01) return
  const { x0, x1, y0, y1 } = MARQ, step = 44, phase = Math.floor(t * 7)
  x.save(); x.globalAlpha *= k
  R(x, 'rgba(16,9,38,0.72)', x0, y0, x1 - x0, y1 - y0)
  R(x, INK, x0 - 10, y0 - 10, x1 - x0 + 20, 10); R(x, INK, x0 - 10, y1, x1 - x0 + 20, 10); R(x, INK, x0 - 10, y0, 10, y1 - y0); R(x, INK, x1, y0, 10, y1 - y0)
  R(x, '#3a2d66', x0 - 4, y0 - 4, x1 - x0 + 8, 4); R(x, '#3a2d66', x0 - 4, y1, x1 - x0 + 8, 4)
  const pts = []
  for (let X = x0; X <= x1; X += step) { pts.push([X, y0 - 5]); }
  for (let Y = y0 + step; Y <= y1 - step / 2; Y += step) pts.push([x1 + 5, Y])
  for (let X = x1; X >= x0; X -= step) pts.push([X, y1 + 5])
  for (let Y = y1 - step; Y >= y0 + step / 2; Y -= step) pts.push([x0 - 5, Y])
  pts.forEach(([px, py], i) => {
    const lit = (i + phase) % 3 === 0
    R(x, INK, px - 9, py - 9, 18, 18)
    R(x, lit ? '#fff6d0' : '#8a6a2a', px - 6, py - 6, 12, 12)
    if (lit) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,214,120,0.18)'; x.beginPath(); x.arc(px, py, 20, 0, Math.PI * 2); x.fill(); x.restore() }
  })
  x.restore()
  void col
}

// ── the stage: floor boards, curtains at the sides, audience risers
function drawStage(x, t) {
  // side curtains
  for (const side of [0, 1]) {
    const X = side ? 1080 - 70 : 0
    R(x, '#5a1838', X, 300, 70, 1030)
    for (let i = 0; i < 4; i++) R(x, '#7a2450', X + 8 + i * 16, 300, 6, 1030)
    R(x, INK, side ? X : X + 64, 300, 6, 1030)
  }
  R(x, '#3e1430', 0, 290, 1080, 22); R(x, INK, 0, 308, 1080, 6)
  // floor
  R(x, INK, 0, 1316, 1080, 8)
  R(x, '#2b2050', 0, 1324, 1080, 96)
  for (let i = 0; i < 9; i++) R(x, '#352a60', i * 124 + ((i % 2) * 40), 1324, 4, 96)
  R(x, GOLD, 0, 1320, 1080, 4)
  // audience pit
  const g = x.createLinearGradient(0, 1700, 0, 1920); g.addColorStop(0, 'rgba(8,5,20,0)'); g.addColorStop(1, 'rgba(8,5,20,0.85)')
  x.fillStyle = g; x.fillRect(0, 1700, 1080, 220)
  void t
}

// ── the podium (canvas): sign band, glyph, name, score box, buzzer dome
function drawPodium(x, t, cx, sign, score, { buzz = -9, lit = 0, k = 1 } = {}) {
  const s = SIGNS.find(q => q.id === sign)
  const { top, w, h } = POD, X = cx - w / 2
  x.save()
  box(x, X, top, w, h, '#2e2358', { b: 7, hi: '#41347a' })
  R(x, s.color, X, top + 34, w, 46); R(x, 'rgba(255,255,255,0.18)', X, top + 34, w, 8)
  const nm = s.name.toUpperCase(), nf = nm.length > 9 ? 25 : nm.length > 7 ? 29 : 32
  x.font = `700 ${nf}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText(s.name.toUpperCase(), cx + 2, top + 59)
  x.fillStyle = BONE; x.fillText(s.name.toUpperCase(), cx, top + 57)
  // score box
  box(x, cx - 46, top + 96, 92, 64, '#0d0920', { b: 5 })
  x.font = `700 54px ${MONO}`; x.fillStyle = lit > 0 ? '#fff6d0' : GOLD; x.fillText(String(score), cx, top + 130)
  if (lit > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = lit; x.fillStyle = 'rgba(255,214,120,0.5)'; x.fillRect(cx - 46, top + 96, 92, 64); x.restore() }
  // glyph coins on the band corners
  x.font = `600 34px ${GLYPH_FONT}`; x.fillStyle = INK
  x.fillText(s.glyph + '︎', X + 26, top + 58); x.fillText(s.glyph + '︎', X + w - 26, top + 58)
  // buzzer dome (pressed for 0.18 s after a buzz)
  const pressed = t >= buzz && t < buzz + 0.18
  const bx = cx + (cx < 540 ? 92 : -92), by = top - 8
  R(x, INK, bx - 40, by - 4, 80, 16); R(x, '#5a5470', bx - 34, by, 68, 8)
  const dh = pressed ? 10 : 22
  x.fillStyle = INK; x.beginPath(); x.ellipse(bx, by - 2, 34, dh + 6, 0, Math.PI, 0); x.fill()
  x.fillStyle = t >= buzz && t < buzz + 0.6 ? '#ff6b7f' : RED; x.beginPath(); x.ellipse(bx, by - 2, 28, dh, 0, Math.PI, 0); x.fill()
  R(x, 'rgba(255,255,255,0.5)', bx - 14, by - dh + 4, 10, 5)
  if (t >= buzz && t < buzz + 0.5) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 1 - (t - buzz) / 0.5; x.fillStyle = 'rgba(255,80,100,0.35)'; x.beginPath(); x.arc(bx, by - 10, 80, 0, Math.PI * 2); x.fill(); x.restore() }
  x.restore()
  void k
  return { bx, by }
}

// a pixel mic for the host
function drawMic(x, cx, cy, cell, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -cell * 0.9, 0, cell * 1.8, cell * 7); R(x, '#5a5470', -cell * 0.5, cell * 0.4, cell, cell * 6.2)
  R(x, INK, -cell * 2.2, -cell * 3.6, cell * 4.4, cell * 4.2); R(x, '#cfd3e6', -cell * 1.7, -cell * 3.1, cell * 3.4, cell * 3.2)
  R(x, '#8a8fa8', -cell * 1.7, -cell * 1.6, cell * 3.4, cell * 0.6); R(x, '#ffffff', -cell * 1.2, -cell * 2.8, cell * 0.8, cell * 0.8)
  x.restore()
}

// ── answer bubble (canvas): bone, sign-coloured top bar, multi-line, tail toward the speaker
function drawAnswer(x, t, cx, t0, t1, text, col, side, { replaceAt = null, text2 = null } = {}) {
  const k = pop01(t, t0, 0.26, 2.4) * outK(t, [t1 - 0.18, t1])
  if (k <= 0.01 || t < t0) return
  const swap = replaceAt != null && t >= replaceAt
  const txt = swap ? text2 : text
  const punch = swap ? 1 + 0.08 * Math.exp(-(t - replaceAt) * 9) * Math.sin((t - replaceAt) * 30) : 1
  x.save()
  x.font = `800 36px ${INTER}`
  let lines = wrapLines(x, txt, 430)
  for (let mw = 420; mw > 200; mw -= 10) { const l2 = wrapLines(x, txt, mw); if (l2.length > lines.length) break; lines = l2 }   // balance the rows
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + 48, lh = 44, h = lines.length * lh + 34
  const bx = clamp(cx, w / 2 + 24, 1080 - w / 2 - 24)
  x.translate(bx, BUB_Y); x.scale(k * punch, k * punch)
  R(x, 'rgba(6,4,18,0.55)', -w / 2 + 10, -h / 2 + 12, w, h)
  R(x, INK, -w / 2 - 5, -h / 2, w + 10, h); R(x, INK, -w / 2, -h / 2 - 5, w, h + 10)
  R(x, BONE, -w / 2, -h / 2, w, h); R(x, col, -w / 2, -h / 2, w, 8)
  const tx = (cx - bx) + (side === 'A' ? -10 : 10)
  R(x, INK, tx - 14, h / 2 + 4, 14, 14); R(x, INK, tx - 7, h / 2 + 16, 8, 10); R(x, BONE, tx - 9, h / 2, 9, 10)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 22 + lh / 2 + i * lh))
  x.restore()
}

// ── the prompt card in the marquee
function drawPromptCard(x, t, i, text, t0, t1) {
  const k = easeOutBack(prog(t, t0, t0 + 0.4), 1.5), o = outK(t, [t1 - 0.22, t1])
  if (k <= 0.01 || o <= 0.01 || t < t0) return
  const cx = 540, cy = lerp(-200, 512, k) + (1 - o) * -60, rot = lerp(-0.2, [-0.015, 0.012, -0.01][i], k)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha = o
  const w = 900, h = 232
  R(x, 'rgba(6,4,18,0.5)', -w / 2 + 14, -h / 2 + 18, w, h)
  box(x, -w / 2, -h / 2, w, h, BONE, { b: 8 })
  // label chip
  const chipCol = [SKYB, GREEN, PINK][i]
  x.font = `700 26px ${MONO}`
  const lw = x.measureText(ROUND_LABELS[i]).width + 36
  box(x, -w / 2 + 26, -h / 2 + 20, lw, 40, chipCol, { b: 4 })
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(ROUND_LABELS[i], -w / 2 + 44, -h / 2 + 41)
  if (i === 1) { drawProp(x, t, 'flagG', w / 2 - 130, -h / 2 + 64, 0.38); drawProp(x, t, 'flagR', w / 2 - 70, -h / 2 + 64, 0.38) }
  if (i === 0) { box(x, w / 2 - 110, -h / 2 + 18, 70, 46, SKYB, { b: 4 }); for (let d = 0; d < 3; d++) R(x, INK, w / 2 - 96 + d * 18, -h / 2 + 37, 8, 8) }
  if (i === 2) { x.font = `800 60px ${INTER}`; x.fillStyle = PINK; x.textAlign = 'center'; x.fillText('?', w / 2 - 70, -h / 2 + 46) }
  // prompt text
  x.font = `800 52px ${INTER}`
  const lines = wrapLines(x, text, 830)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  const top = 36 - (lines.length - 1) * 30
  lines.forEach((l, j) => x.fillText(l, 0, top + j * 60))
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeGame(cfg) {
  const SA = signStar(cfg.A.sign), SB = signStar(cfg.B.sign)
  const nameOf = id => SIGNS.find(s => s.id === id).name
  const NA = nameOf(cfg.A.sign), NB = nameOf(cfg.B.sign)
  const FANS = cfg.fan || (cfg.A.sign === 'pisces' || cfg.B.sign === 'pisces' ? 'cancer' : 'pisces')
  const SPEAK = 'THE STARS'
  const hostIn = cfg.hostIn ?? T.hostIn
  const rounds = cfg.rounds.map((r, i) => {
    const [a, b] = T.rounds[i], U = T.U
    const buzz = a + (r.buzzAt ?? U.buzz)
    const ans1 = Math.max(a + U.ans1, buzz + 0.25)
    const firstAns = r.first === 'A' ? r.a : r.b, secondAns = r.first === 'A' ? r.b : r.a
    return { ...r, i, a, b, buzz, ans1, ans2: a + U.ans2, host: a + U.host, point: a + U.point, point_: r.point, ansA: r.a, ansB: r.b, firstAns, secondAns, hostText: r.host }
  })
  const finalA = rounds.filter(r => r.point_ === 'A' || r.point_ === 'both').length, finalB = rounds.filter(r => r.point_ === 'B' || r.point_ === 'both').length
  const WIN = finalA === finalB ? 'both' : finalA > finalB ? 'A' : 'B'
  const finHead = WIN === 'both' ? 'Kindest hearts: | *both of them.*' : `Kindest heart: | *${WIN === 'A' ? NA : NB}.*`

  // dialogue: welcome, three verdicts, the last line
  const L0 = [{ t: cfg.welcomeAt ?? T.welcome, speaker: SPEAK, text: cfg.welcome }]
  const LR = rounds.map(r => [{ t: r.host, speaker: SPEAK, text: r.hostText }])
  const LF = [{ t: T.last, speaker: SPEAK, text: cfg.last }]
  const ALL_LINES = [...L0, ...LR.flat(), ...LF]
  const HOST_HOPS = [hostIn + 0.32, ...talkHops(ALL_LINES, SPEAK, { cps: CPS }), T.fin + 0.1]

  // contestant hop times
  const hopsFor = side => {
    const h = []
    if (cfg[side].intro?.buzz) h.push(0.02, 0.5, 1.0)
    for (const r of rounds) {
      if (r.first === side) h.push(r.buzz - 0.05, r.ans1 + 0.02)
      else h.push(r.ans2 + 0.02)
      const ans = side === 'A' ? r.ansA : r.ansB
      if (ans.then) h.push(r.a + ans.then.at)
      if (r.point_ === side || r.point_ === 'both') h.push(r.point + 0.04, r.point + 0.5)
    }
    if (WIN === side || WIN === 'both') h.push(T.fin + 0.12, T.fin + 0.55, T.fin + 1.0, T.flip[1])
    return h.sort((p, q) => p - q)
  }
  const HOPS = { A: hopsFor('A'), B: hopsFor('B') }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 46px Inter", "800 32px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "600 34px 'EB Garamond'", "700 54px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const loadImg = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = ASSETS + src })
    const [backImg, talkImg] = await Promise.all([loadImg('card-back.png'), loadImg(cfg.talk || 'card-talk-1.png')])
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: 132, size: 84, accentSize: 116, at: -3, gap: 0, accentColor: cfg.accent || SB.color, fit: true })
    const HR = rounds.map((r, i) => popText(root, ROUND_HEADS[i], { top: 168, size: 86, accentSize: 118, at: r.a + T.U.head, gap: 0.07, accentColor: [SKYB, GREEN, PINK][i], fit: true }))
    const HF = popText(root, finHead, { top: 132, size: 84, accentSize: 120, at: T.finHead, gap: 0.08, late: 2, lateAt: T.finHead + 0.35, wobble: true, accentColor: GOLD, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const boxes = [
      dialogueBox(root, { lines: L0, y: 1412, open: L0[0].t - 0.2, close: cfg.welcomeClose ?? T.welcomeClose, cps: CPS }),
      ...rounds.map((r, i) => dialogueBox(root, { lines: LR[i], y: 1412, open: r.host - 0.2, close: r.b - 0.12, cps: CPS })),
      dialogueBox(root, { lines: LF, y: 1412, open: T.last - 0.2, close: T.boxClose, cps: CPS }),
    ]
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function contestant(t, side, ok) {
      const C = cfg[side], S = side === 'A' ? SA : SB, cx = POD[side]
      const r = rounds.find(q => t >= q.a && t < q.b)
      let mood = C.idle || 'happy', look = side === 'A' ? [1, 0] : [-1, 0], squash = 0
      if (t < R0) { mood = C.intro?.mood || mood; look = C.intro?.look || look; squash = C.intro?.squash || 0 }
      if (r) {
        const ans = side === 'A' ? r.ansA : r.ansB
        const mine = r.first === side ? r.ans1 : r.ans2
        look = [0, -0.8]                                    // reading the card
        if (r.first === side && t > r.buzz - 0.1 && t < mine + 0.6) { mood = 'wide'; look = [0, 0] }
        if (t > mine) { mood = ans.mood || 'happy'; look = ans.look || [0, 0] }
        if (ans.then && t > r.a + ans.then.at) { mood = ans.then.mood || 'wide'; look = ans.then.look || [0, 0] }
        if (t > r.host) look = [side === 'A' ? 1 : -1, 0.3]
        if (t > r.point) {
          const won = r.point_ === side || r.point_ === 'both'
          mood = won ? 'sparkle' : (ans.lose || 'neutral'); look = won ? [0, 0] : (ans.loseLook || [side === 'A' ? 1 : -1, 0])
        }
      }
      if (t >= T.fin) {
        const won = WIN === side || WIN === 'both'
        mood = won ? (t > T.flip[1] ? 'heart' : 'sparkle') : (C.finale?.mood || 'happy'); look = won ? [0, 0] : (C.finale?.look || [side === 'A' ? 1 : -1, 0])
      }
      const opts = { color: S.color, glyph: S.glyph, mood, look, hops: HOPS[side], pop: ok, seed: side === 'A' ? 3 : 9, glow: 1.1, squash }
      drawStarChar(x, cx, CAST_Y, CAST_S, t, opts)
      const F = starFrame(cx, CAST_Y, CAST_S, t, { pop: ok, hops: HOPS[side], seed: opts.seed, squash })
      // tears for a crying contestant (Pisces at the podium; anyone with cry: [[t0, k]…])
      const cryK = C.cry ? C.cry.reduce((k, [t0, kk]) => (t >= t0 ? kk : k), 0) : 0
      if (cryK) inSprite(x, F, () => tearsCells(x, t, cryK))
      if (C.oneTear != null) inSprite(x, F, () => oneTear(x, t, C.oneTear))
      // held prop
      const handX = cx + (side === 'A' ? -1 : 1) * CAST_S * 0.46, handY = F.cy + 40
      if (C.prop && t < (C.propUntil ?? STORY_END)) drawProp(x, t, C.prop, handX, handY, ok * (t > (C.propUntil ?? 99) - 0.2 ? outK(t, [(C.propUntil) - 0.2, C.propUntil]) : 1), { rot: (side === 'A' ? -0.12 : 0.12) })
      // round 2 flags
      if (r && r.i === 1) {
        const ans = side === 'A' ? r.ansA : r.ansB
        const mine = r.first === side ? r.ans1 : r.ans2
        let fl = ans.flag
        if (ans.then?.flag && t > r.a + ans.then.at) fl = ans.then.flag
        const fk = pop01(t, mine - 0.05, 0.3, 2.4) * outK(t, [r.b - 0.2, r.b])
        const fx = cx + (side === 'A' ? 1 : -1) * CAST_S * 0.52, fy = F.cy - 20
        if (fl && fk > 0.01) {
          if (fl === 'GR') { drawProp(x, t, 'flagG', fx - 26, fy, fk, { rot: -0.2 }); drawProp(x, t, 'flagR', fx + 26, fy, fk, { rot: 0.2 }) }
          else drawProp(x, t, fl[fl.length - 1] === 'G' ? 'flagG' : 'flagR', fx, fy, fk, { rot: side === 'A' ? -0.12 : 0.12 })
        }
      }
      return F
    }

    function host(t, ok) {
      const k = pop01(t, hostIn, 0.38, 2.1) * ok
      if (k <= 0.02) return
      let mood = 'happy', look
      for (const r of rounds) {
        if (t > r.a && t < r.host) { mood = 'neutral'; look = [r.first === 'A' ? -1 : 1, 0] }
        if (t > r.buzz && t < r.buzz + 0.5) mood = 'wide'
      }
      if (t > T.roll[0] && t < T.fin) { mood = 'squint'; look = [0, 0] }
      if (t >= T.fin) mood = 'sparkle'
      drawStarChar(x, HOST.x, HOST.y, HOST.s, t, { color: STAR.sky, mood, look, hops: HOST_HOPS, pop: k, seed: 2, glow: 1.05 })
      const F = starFrame(HOST.x, HOST.y, HOST.s, t, { pop: k, hops: HOST_HOPS, seed: 2 })
      drawMic(x, F.ox + F.S * 0.36, F.oy - F.base - F.S * 0.06, F.cell * 1.1, 0.35 + 0.05 * Math.sin(t * 2))
      // lectern
      box(x, HOST.x - 66, 1262, 132, 56, '#41347a', { b: 6, hi: '#5a4aa0' })
      x.save(); x.font = `600 30px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('★', HOST.x, 1292); x.restore()
    }

    function audience(t) {
      const crowd = [['leo', 92, 1868], ['gemini', 560, 1880], ['taurus', 700, 1860], ['aquarius', 840, 1876], ['scorpio', 985, 1866]]
      const clapTimes = [...rounds.map(r => r.point), T.fin + 0.1, T.fin + 0.6]
      const cheerHops = clapTimes.flatMap(c => [c + 0.05, c + 0.4])
      crowd.forEach(([sg, cx, cy], i) => {
        if (sg === cfg.A.sign || sg === cfg.B.sign) sg = ['cancer', 'libra', 'virgo', 'capricorn', 'sagittarius'][i]
        drawStarChar(x, cx, cy, 96, t, { color: signStar(sg).color, mood: 'happy', hops: cheerHops.map(h => h + i * 0.03), seed: 11 + i, glow: 0.5, alpha: 0.72, tips: false })
      })
      // the fan in the front row (Pisces, crying more and more), with a tissue box
      const S = signStar(FANS)
      const tears = t > R0 ? 3 : 2
      const opts = { color: S.color, mood: t > T.fin ? 'sparkle' : 'wide', look: [0.6, -1], seed: 6, glow: 0.8, hops: cheerHops, tips: false }
      drawStarChar(x, FAN.x, FAN.y, FAN.s, t, opts)
      const F = starFrame(FAN.x, FAN.y, FAN.s, t, { hops: cheerHops, seed: 6 })
      if (FANS === 'pisces') inSprite(x, F, () => tearsCells(x, t, tears))
      drawProp(x, t, 'tissue', FAN.x + 125, FAN.y + 44, 0.9)
    }

    function prize(t, cx, cy, side) {
      if (t < T.prize[0] || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const k = easeOutBack(prog(t, ...T.prize), 1.3)
      const img0 = backImg, img1 = talkImg
      const fp = prog(t, ...T.flip), sx = Math.abs(Math.cos(Math.PI * fp)), face = fp >= 0.5
      const img = face ? img1 : img0
      if (!img) return
      const w = 230 * ok, h = w * img.height / img.width
      const px = lerp(540, cx, k), py = lerp(-260, cy, k), rot = lerp(side === 'A' ? -0.6 : 0.6, side === 'A' ? -0.07 : 0.07, k)
      x.save(); x.translate(px, py + 6 * Math.sin(t * 3)); x.rotate(rot); x.scale(Math.max(0.02, sx), 1)
      R(x, 'rgba(6,4,18,0.45)', -w / 2 + 16, -h / 2 + 20, w, h)
      x.drawImage(img, -w / 2, -h / 2, w, h)
      x.restore()
      if (face) sparkles(x, t, px, py, T.flip[0] + 0.2, 10, 170, side === 'A' ? 1 : 2, [GOLD, BONE, PINK])
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const ok = popOut(t, T.out)
        // camera punch on each point
        const lastPt = [...rounds.map(r => r.point), T.fin].filter(p => p <= t).pop()
        const dP = lastPt != null ? t - lastPt : 9, shake = dP < 0.35 ? 10 * Math.exp(-dP * 10) * Math.sin(dP * 55) : 0
        x.save(); x.translate(0, shake)
        if (t < T.out[1]) {
          drawStage(x, t)
          // spotlights sweeping (finale: both on the winner)
          const sw = Math.sin(t * 0.9)
          let tA = POD.A, tB = POD.B
          if (t >= T.fin) { const wx = WIN === 'A' ? POD.A : WIN === 'B' ? POD.B : null; if (wx) { tA = wx; tB = wx } }
          spotlight(x, 160, 300, lerp(tA + 60 * sw, tA, t >= T.fin ? 1 : 0), 1318, 360, 0.8 * ok)
          spotlight(x, 920, 300, lerp(tB - 60 * sw, tB, t >= T.fin ? 1 : 0), 1318, 360, 0.8 * ok)
          drawMarquee(x, t, ok)
          // intro: the GAME NIGHT sign in the marquee
          if (t < R0) {
            const o = outK(t, [R0 - 0.25, R0])
            x.save(); x.globalAlpha = o
            x.font = `800 104px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
            x.fillStyle = INK; x.fillText('GAME NIGHT', 546, 478); x.fillStyle = GOLD; x.fillText('GAME NIGHT', 540, 472)
            x.font = `600 70px ${GLYPH_FONT}`; x.fillStyle = SA.color; x.fillText(SA.glyph + '︎', 380, 588)
            x.fillStyle = SB.color; x.fillText(SB.glyph + '︎', 700, 588)
            x.font = `italic 500 64px ${SERIF}`; x.fillStyle = BONE; x.fillText('vs', 540, 584)
            x.restore()
          }
          // the rounds: prompt card
          for (const r of rounds) drawPromptCard(x, t, r.i, r.prompt, r.a + T.U.card, r.b)
          // finale: final score in the marquee
          if (t >= T.fin - 0.02) {
            const k = pop01(t, T.fin + 0.05, 0.35, 2.2)
            x.save(); x.translate(540, 512); x.scale(k * ok, k * ok)
            x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('FINAL SCORE', 0, -84)
            x.font = `800 150px ${INTER}`; x.fillStyle = INK; x.fillText(`${finalA}–${finalB}`, 6, 30); x.fillStyle = GOLD; x.fillText(`${finalA}–${finalB}`, 0, 24)
            x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.75)'; x.fillText('SPEED: 0 PTS', 0, 118)
            x.restore()
          }
          // cast first, then the podium fronts over their feet
          const FA = contestant(t, 'A', ok), FB = contestant(t, 'B', ok)
          host(t, ok)
          const buzzA = rounds.filter(r => r.first === 'A').map(r => r.buzz).concat(cfg.A.intro?.buzz ? [0.0, 0.5, 1.0] : []).filter(b => b <= t).pop() ?? -9
          const buzzB = rounds.filter(r => r.first === 'B').map(r => r.buzz).concat(cfg.B.intro?.buzz ? [0.0, 0.5, 1.0] : []).filter(b => b <= t).pop() ?? -9
          const litA = Math.max(0, ...rounds.filter(r => r.point_ === 'A' || r.point_ === 'both').map(r => t >= r.point ? 1 - prog(t, r.point, r.point + 0.8) : 0))
          const litB = Math.max(0, ...rounds.filter(r => r.point_ === 'B' || r.point_ === 'both').map(r => t >= r.point ? 1 - prog(t, r.point, r.point + 0.8) : 0))
          const scA = rounds.filter(r => t >= r.point && (r.point_ === 'A' || r.point_ === 'both')).length
          const scB = rounds.filter(r => t >= r.point && (r.point_ === 'B' || r.point_ === 'both')).length
          drawPodium(x, t, POD.A, cfg.A.sign, scA, { buzz: buzzA, lit: litA })
          drawPodium(x, t, POD.B, cfg.B.sign, scB, { buzz: buzzB, lit: litB })
          if (cfg.draw) cfg.draw(x, t, { FA, FB, ok, rounds, POD, CAST_Y, CAST_S, WIN })
          // round FX: BZZT, the SPEED: 0 PTS sticker, the +1 KIND
          for (const r of rounds) {
            const cx = POD[r.first]
            if (t > r.buzz && t < r.buzz + 0.6) label(x, 'BZZT!', cx + (r.first === 'A' ? 92 : -92), POD.top - 70 - 60 * prog(t, r.buzz, r.buzz + 0.6), { size: 40, col: '#ff8f9f', font: INTER, weight: 800, alpha: 1 - prog(t, r.buzz + 0.3, r.buzz + 0.6), rot: r.first === 'A' ? -0.15 : 0.15 })
            const sk = pop01(t, r.buzz + 0.15, 0.3, 2.6) * outK(t, [r.b - 0.25, r.b])
            if (sk > 0.01 && t > r.buzz) {
              x.save(); x.translate(cx, 1352); x.rotate(r.first === 'A' ? -0.04 : 0.04); x.scale(sk, sk)
              x.font = `700 28px ${MONO}`; const w = x.measureText('SPEED: 0 PTS').width + 28
              box(x, -w / 2, -20, w, 40, '#ffd23a', { b: 4 }); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SPEED: 0 PTS', 0, 1)
              x.restore()
            }
            for (const side of ['A', 'B']) {
              if (!(r.point_ === side || r.point_ === 'both')) continue
              const pk = t - r.point
              if (pk < 0 || pk > 1.4) continue
              label(x, '+1 KIND', POD[side], POD.top - 20 - 120 * ease.outCubic(Math.min(1, pk / 0.9)), { size: 46, col: GOLD, font: INTER, weight: 800, alpha: 1 - prog(pk, 1.0, 1.4) })
              sparkles(x, t, POD[side], POD.top + 128, r.point, 8, 90, side === 'A' ? 1 : 2, [GOLD, BONE, PINK])
            }
          }
          // finale: confetti + prize card(s)
          if (t >= T.fin) {
            confetti(x, t, T.confetti, 540, 700)
            if (WIN === 'A' || WIN === 'both') prize(t, POD.A, 700, 'A')
            if (WIN === 'B' || WIN === 'both') prize(t, POD.B, 700, 'B')
            const pk = pop01(t, T.flip[1], 0.3, 2.4) * ok
            if (pk > 0.01) for (const side of WIN === 'both' ? ['A', 'B'] : [WIN]) label(x, 'PRIZE: A TALK CARD', POD[side], 890, { size: 26, col: BONE, alpha: clamp(pk) })
          }
          audience(t)
        }
        x.restore()
        // answers (top canvas, above the cast)
        tx.clearRect(0, 0, 1080, 1920)
        tx.save(); tx.translate(0, shake)
        for (const r of rounds) {
          const s1 = r.first, s2 = r.first === 'A' ? 'B' : 'A'
          const col = s => (s === 'A' ? SA : SB).color
          drawAnswer(tx, t, POD[s1], r.ans1, r.b, r.firstAns.text, col(s1), s1, r.firstAns.then ? { replaceAt: r.a + r.firstAns.then.at, text2: r.firstAns.then.text } : {})
          drawAnswer(tx, t, POD[s2], r.ans2, r.b, r.secondAns.text, col(s2), s2, r.secondAns.then ? { replaceAt: r.a + r.secondAns.then.at, text2: r.secondAns.then.text } : {})
        }
        tx.restore()
        H0.update(t, outK(t, T.h0Out))
        HR.forEach((h, i) => h.update(t, outK(t, [rounds[i].b - 0.2, rounds[i].b])))
        HF.update(t, outK(t, T.out))
        boxes.forEach(b => b.update(t))
        bug.update(t, outK(t, T.bugOut))
        // a white flash on the hard round cuts (not the card cut at round 2) and on the finale
        const fl = Math.max(0, ...[rounds[0].a, rounds[2].a, T.fin].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.5 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // card-cut candidates: the three round starts (cardfx plays the middle one, round 2)
  const CUTS = rounds.map((r, i) => (i === 1 ? { t: r3(r.a - 0.05), kind: 'flip' } : r3(r.a - 0.05)))
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const buzzSnd = (t0, pan) => [['chip', r3(t0), 98, 0.34, { gain: 0.05, wave: 'square', duty: 0.3, decay: 0.4, sustain: 0.9, pan, dly: 0 }], ['chip', r3(t0), 147, 0.34, { gain: 0.03, wave: 'square', duty: 0.5, decay: 0.4, sustain: 0.9, pan, dly: 0 }], ['tick', r3(t0), 0.06]]
  const ding = t0 => [['bell', r3(t0), 1760, 0.045, 1.0, 0], ['bell', r3(t0 + 0.09), 2349.32, 0.035, 1.1, 0], ['pop', r3(t0), 1318.51, 0.04, 0]]
  const claps = (t0, n = 7) => Array.from({ length: n }, (_, i) => ['clap', r3(t0 + 0.08 + i * 0.11 + (i % 3) * 0.02), { gain: 0.09, pan: ((i * 37) % 10) / 10 - 0.5 }])
  const introBuzz = side => cfg[side].intro?.buzz ? [0.0, 0.5, 1.0].flatMap(b => buzzSnd(b, side === 'A' ? -0.4 : 0.4)) : []
  const CUES = [
    ['pop', 0.02, 880, 0.03, 0], ...introBuzz('A'), ...introBuzz('B'),
    ['pop', r3(hostIn + 0.05), 987.77, 0.045, 0], ['pop', r3(hostIn + 0.12), 1318.51, 0.03, 0], ['glitter', r3(hostIn), r3(hostIn + 0.3)],
    ...rounds.flatMap(r => [
      ...(r.i !== 1 ? [['whoosh', r3(r.a - 0.08), 0.3, 0.035], ['tick', r3(r.a), 0.05]] : []),
      ...wordPops(r.a + T.U.head, 4, 0.07, r.i * 2),
      ['whoosh', r3(r.a + T.U.card), 0.4, 0.04], ['tick', r3(r.a + T.U.card + 0.4), 0.05],
      ...buzzSnd(r.buzz, r.first === 'A' ? -0.4 : 0.4),
      ['pop', r3(r.ans1), 880, 0.04, r.first === 'A' ? -0.3 : 0.3], ['pop', r3(r.ans1 + 0.06), 1174.66, 0.03, r.first === 'A' ? -0.3 : 0.3],
      ['pop', r3(r.ans2), 739.99, 0.04, r.first === 'A' ? 0.3 : -0.3], ['pop', r3(r.ans2 + 0.06), 987.77, 0.03, r.first === 'A' ? 0.3 : -0.3],
      ...(r.i === 1 ? [['whoosh', r3(r.ans1 - 0.05), 0.25, 0.03], ['whoosh', r3(r.ans2 - 0.05), 0.25, 0.03]] : []),
      ...[r.ansA, r.ansB].flatMap(an => an.then ? [['pop', r3(r.a + an.then.at), 1567.98, 0.045, 0], ['tick', r3(r.a + an.then.at), 0.05]] : []),
      ...ding(r.point), ...claps(r.point),
    ]),
    ...talkCues(ALL_LINES, { cps: CPS }),
    // drum roll → finale
    ...Array.from({ length: 13 }, (_, i) => ['tom', r3(T.roll[0] + i * 0.05), 150 + (i % 2) * 12, { gain: 0.07 + 0.012 * i, decay: 0.12 }]),
    ['crash', T.fin, { gain: 0.08, len: 2.4 }], ['boom', T.fin, 0.25], ...claps(T.fin + 0.05, 12), ['glitter', T.confetti, r3(T.confetti + 0.8)],
    ...wordPops(T.finHead, 2, 0.08, 3), ['pop', r3(T.finHead + 0.35), 1174.66, 0.045, 0], ['pop', r3(T.finHead + 0.45), 1567.98, 0.04, 0],
    ['whoosh', T.prize[0], 0.4, 0.04], ['whoosh', r3(T.flip[0]), 0.2, 0.03], ['pluck', T.flip[1], 1318.51, 0.045, 0.6, 0], ['glitter', T.flip[1], r3(T.flip[1] + 0.4)],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]

  // a readability check (node): every dialogue line holds ≥ 1.5 s after it finishes typing
  const CHECK = () => {
    const segs = [[L0, cfg.welcomeClose ?? T.welcomeClose], ...rounds.map((r, i) => [LR[i], r.b - 0.12]), [LF, T.boxClose]]
    return segs.map(([ls, close]) => { const tm = lineTimes(ls, { cps: CPS }); return { text: ls[0].text, len: ls[0].text.replace(/\*/g, '').length, hold: +(close - tm[0].done).toFixed(2) } })
  }
  return { DURATION, SCENES, CUES, T, CUTS, CHECK, WIN, finalA, finalB }
}
