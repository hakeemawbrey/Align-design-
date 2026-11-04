// STAR TALK GAME NIGHT: the shared show of episodes 13–24 (ngne13–ngne24, promo/films/next30/b08.md). This file lives in
// the first film's folder; the other eleven import it from here, so the twelve films are one show.
//
// The show (36 s: story 0–31.6, then the shared end card):
//   0.00–3.40   hook: the hook headline is already up at frame 0; the two contestants are mid-hop at their podiums, the
//               studio screen shows the matchup ("♈ ARIES vs ♌ LEO · FIRE NIGHT"); THE STARS (host, pixel mic) say the
//               episode's intro line.
//   3.40 / 10.50 / 17.60   ROUND 1 "Finish the text" · ROUND 2 "Green flag or red flag?" · ROUND 3 "What would you do?"
//               u = time into the round: 0.3 the prompt lands on the screen · 1.1 a buzzer (BZZT) · 1.4 card A flips ·
//               2.7 card B flips · 3.5 THE STARS' verdict · 5.4 "+1 ★ KIND" stamps the kinder card(s) and fills the
//               podium tally · 6.9–7.1 out. The single card cut is at 17.6 (cardfx keeps the middle candidate).
//   24.70–31.50 the winner: the screen tallies count up, a drumroll, the spotlight + confetti on the kindest (or both on a
//               tie), the KINDEST trophy, THE STARS' last line (typed 26.4, held to 31.0).
//   Pisces cries in the front row every episode (tissue box; more tears each round; fountains at the winner). When
//   Pisces is a contestant it cries on the podium instead and the front row is just the crowd.
//   The winner is whoever answers most kindly, never whoever buzzes first.
//
//   makeGame(cfg) → { DURATION, SCENES, CUES, T, CUTS }
//     cfg.ep, cfg.a / cfg.b (sign ids, left / right podium), cfg.hook ('Two fire signs. | One *buzzer.*'), cfg.intro,
//     cfg.rounds[3]: { prompt, buzz: 'a'|'b', early?: bool, a: { text, flag?, mood? }, b: {…}, win: 'a'|'b'|'ab', line }
//        flag: 'green' | 'red' | ['red', 'green', …] (the flag the contestant raises; a list flips through in order)
//     cfg.final (the winner headline), cfg.last (THE STARS' last line), cfg.props(x, t, S) (the episode's own props:
//     frame-0 gag and any round gags), cfg.accent (headline accent colour).
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', GREEN = '#4fd07a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_GOLD = '#ffd23a'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

const NAMES = { aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces' }
const ELEMENT = { aries: 'FIRE', leo: 'FIRE', sagittarius: 'FIRE', taurus: 'EARTH', virgo: 'EARTH', capricorn: 'EARTH', gemini: 'AIR', libra: 'AIR', aquarius: 'AIR', cancer: 'WATER', scorpio: 'WATER', pisces: 'WATER' }
const EL_COL = { FIRE: '#ff8a3d', EARTH: '#7fcf6a', AIR: '#8fd3ff', WATER: '#6fa8ff' }
export const signName = id => NAMES[id]

// ── the fixed timeline (same in all twelve films)
export const DURATION = 36
export const STORY_END = DURATION - ENDCARD_LEN          // 31.6
export const ROUNDS = [[3.4, 10.5], [10.5, 17.6], [17.6, 24.7]]
export const U = { prompt: 0.3, buzz: 1.1, early: 0.12, cardA: 1.4, cardB: 2.7, line: 3.5, stamp: 5.4, out: 6.9 }
export const T = {
  h0Out: [3.2, 3.4], intro: 0.3, introClose: 3.3,
  rounds: ROUNDS, cut: 17.6,
  fin: 24.7, tally: 25.1, roll: [25.1, 25.9], win: 25.9, last: 26.4, boxClose: 31.0,
  out: [31.0, 31.5], bugOut: [31.15, 31.5],
}
const CPS = 30
const TITLES = ['Finish the text', 'Green flag or red flag?', 'What would you do?']
const SMALL = ['THEY TEXT:', 'GREEN FLAG OR RED FLAG?', 'WHAT WOULD YOU DO?']

// layout
const POD = { a: { x: 270 }, b: { x: 810 }, top: 1262, w: 300, h: 186 }
const STAR_Y = 1168, STAR_S = 200
const HOST = { x: 540, y: 1222, s: 150 }
const SCREEN = { x: 90, y: 418, w: 900, h: 300 }
const CARD = { a: { cx: 275 }, b: { cx: 805 }, cy: 902, w: 468, h: 268 }
const PIS_SEAT = { x: 960, y: 1500, s: 156 }

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
export function hearts(x, t, t0, cx, cy, { n = 5, cell = 6, spread = 120, life = 1.4, cols = ['#ff5c8a', '#ff8fb1', GOLD] } = {}) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.16, p = (t - b) / life
    if (p < 0 || p > 1) continue
    const hx = cx + Math.sin(i * 2.3) * spread * 0.5 + Math.sin(t * 3 + i) * 10, hy = cy - p * 200
    drawBits(x, HEART, { H: cols[i % cols.length] }, hx, hy, cell * (0.6 + 0.4 * Math.min(1, p * 4)), { alpha: 1 - ease.inQuad(p) })
  }
}
/** pixel confetti falling from a burst at t0 */
export function confetti(x, t, t0, cx, cy, { n = 30, life = 2.6, cols = [GOLD, PINK, '#7fd0ff', '#9fe6b0', BONE] } = {}) {
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
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 32, tail = 0, font = INTER, weight = 800 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const w = x.measureText(text).width + 40, h = size + 28
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  const tx = tail * (w / 2 - 40)
  x.fillStyle = INK; x.fillRect(tx - 14, h / 2 + 4, 14, 12); x.fillRect(tx - 7, h / 2 + 14, 8, 8)
  x.fillStyle = col; x.fillRect(tx - 9, h / 2, 9, 9)
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
/** pixel label text on canvas, with an ink drop shadow */
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
/** a warm spotlight cone from (tx, top) down to an ellipse at (bx, by) */
export function spotlight(x, tx, top, bx, by, w, a, col = '255,236,180') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, top, 0, by)
  g.addColorStop(0, `rgba(${col},${0.04 * a})`); g.addColorStop(1, `rgba(${col},${0.24 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.28 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** word-wrap for canvas text ('\n' forces a break) */
export function wrap(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let line = ''
    for (const w of para.split(' ')) {
      const tryL = line ? line + ' ' + w : w
      if (x.measureText(tryL).width > maxW && line) { out.push(line); line = w } else line = tryL
    }
    out.push(line)
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
/** a little tissue box */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}
/** a flag on a pole: (hx, hy) = the hand, the flag waves to the side `d` */
export function flag(x, t, hx, hy, col, d = 1, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(hx, hy); x.scale(k, k)
  R(x, INK, -6, -150, 12, 170); R(x, '#d8c9a8', -3, -147, 6, 164)
  const W = 110, H2 = 70
  for (let i = 0; i < 10; i++) {
    const fx = i * W / 10, wv = 6 * Math.sin(t * 9 - i * 0.7) * (i / 10)
    R(x, INK, d > 0 ? fx : -fx - W / 10, -150 + wv - 5, W / 10 + 1, H2 + 10)
  }
  for (let i = 0; i < 10; i++) {
    const fx = i * W / 10, wv = 6 * Math.sin(t * 9 - i * 0.7) * (i / 10)
    R(x, col, d > 0 ? fx : -fx - W / 10, -150 + wv, W / 10 + 1, H2)
    R(x, 'rgba(255,255,255,0.22)', d > 0 ? fx : -fx - W / 10, -150 + wv, W / 10 + 1, 10)
  }
  x.restore()
}
/** a pixel mic (for the host) */
function mic(x, cx, cy, s, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -5, 0, 10, 46); R(x, '#5a5470', -2, 2, 4, 42)
  drawBits(x, ['.MMM.', 'MGMGM', 'MMMMM', 'MGMGM', '.MMM.'], { M: '#b8b2cc', G: '#7d7699' }, 0, -10, 5)
  x.restore()
}


// ── small hand props for the hook (cfg.hookProps = { a: 'cookie', b: 'pen' }); held on the inner side of the sprite
const PROPS = {
  cookie: [['.CCCC.', 'CCDCCC', 'CCCCDC', 'CDCCCC', '.CCCC.'], { C: '#d9a066', D: '#5a3418' }],
  pen: [['......K', '.....YK', '....YY.', '...YY..', '..YY...', '.PY....', 'PP.....'], { K: INK, Y: GOLD, P: PINK }],
  planner: [['BBBBBBB', 'BWWWWWB', 'BWRWRWB', 'BWWWWWB', 'BWRWWWB', 'BBBBBBB'], { B: '#5a7fd8', W: BONE, R: RED }],
  laptop: [['.GGGGGGG.', '.GSSSSSG.', '.GSSSSSG.', '.GGGGGGG.', 'GGGGGGGGG'], { G: '#8c86a8', S: '#7fd0ff' }],
  bulb: [['.YYY.', 'YYWYY', 'YYYYY', '.YYY.', '.GGG.', '.GGG.'], { Y: '#fff1a8', W: '#ffffff', G: '#8c86a8' }],
  tissue: [['.WW.', 'WWWW', 'WWWW', '.WW.'], { W: '#ffffff' }],
  mirror: [['.MMM.', 'MSSSM', 'MSWSM', 'MSSSM', '.MMM.', '..M..', '..M..'], { M: GOLD, S: '#9fd8f6', W: '#ffffff' }],
  cards: [['AAA.BBB', 'AAA.BBB', 'AAA.BBB', 'AAA.BBB'], { A: BONE, B: LAV }],
  pizza: [['YYYYYYY', '.YRYYR.', '..YYY..', '...Y...'], { Y: '#ffcf5a', R: RED }],
}
export function drawProp(x, name, cx, cy, cell, rot = 0) { const p = PROPS[name]; if (p) drawBits(x, p[0], p[1], cx, cy, cell, { rot }) }

// ── the show bug: "STAR TALK GAME NIGHT · EP n" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root, ep) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: BUG_GOLD, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,210,58,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: BUG_GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    `STAR&nbsp;TALK&nbsp;GAME&nbsp;NIGHT<span style="color:rgba(255,255,255,0.6)">&nbsp;·&nbsp;EP&nbsp;${ep}</span>`)
  return { update(t, out = 1) { b.style.display = out <= 0.01 ? 'none' : 'flex'; b.style.opacity = String(clamp(out)) } }
}

// ── the round pips: hook + three rounds + the winner, under the bug
const SEGS = [[0, 3.4], ...ROUNDS, [24.7, 31.0]]
function drawPips(x, t) {
  const k = outK(t, T.out)
  if (k <= 0.01) return
  const X0 = 56, X1 = 1024, GAP = 10, n = SEGS.length, w = (X1 - X0 - GAP * (n - 1)) / n, Y = 120, Hh = 8
  x.save(); x.globalAlpha = clamp(k)
  SEGS.forEach(([a, b], i) => {
    const sx = X0 + i * (w + GAP)
    R(x, 'rgba(239,230,214,0.25)', sx, Y, w, Hh)
    const f = prog(t, a, b)
    if (f > 0) R(x, i === n - 1 ? BUG_GOLD : BONE, sx, Y, w * f, Hh)
  })
  x.restore()
}

// ── the stage: floor, footlights, marquee screen frame
function drawStage(x, t) {
  // floor
  const g = x.createLinearGradient(0, 1250, 0, 1920)
  g.addColorStop(0, '#1d1240'); g.addColorStop(1, '#0a0618')
  x.fillStyle = g; x.fillRect(0, 1250, 1080, 670)
  R(x, '#2e1f60', 0, 1250, 1080, 8)
  // floor boards
  for (let i = 0; i < 9; i++) R(x, 'rgba(255,255,255,0.04)', 0, 1290 + i * i * 9, 1080, 3)
  // stage lip + footlights
  R(x, INK, 0, 1452, 1080, 14); R(x, '#3a2a78', 0, 1456, 1080, 6)
  for (let i = 0; i < 14; i++) {
    const on = 0.6 + 0.4 * Math.sin(t * 4 + i * 1.3)
    x.save(); x.globalAlpha = on; R(x, i % 2 ? GOLD : BONE, 30 + i * 76, 1449, 18, 8); x.restore()
  }
}
function drawScreenFrame(x, t, k) {
  const { x: X, y: Y, w, h } = SCREEN
  x.save(); x.globalAlpha *= k
  box(x, X - 26, Y - 26, w + 52, h + 52, '#3a2a78', { b: 8, hi: '#4c3a94' })
  R(x, '#0c0820', X, Y, w, h)
  // scanlines
  for (let j = 0; j < h; j += 6) R(x, 'rgba(255,255,255,0.025)', X, Y + j, w, 2)
  // marquee bulbs around the frame
  const bulbs = []
  for (let i = 0; i <= 16; i++) { bulbs.push([X - 13 + i * (w + 26) / 16, Y - 13]); bulbs.push([X - 13 + i * (w + 26) / 16, Y + h + 13]) }
  for (let j = 1; j < 6; j++) { bulbs.push([X - 13, Y - 13 + j * (h + 26) / 6]); bulbs.push([X + w + 13, Y - 13 + j * (h + 26) / 6]) }
  bulbs.forEach(([bx, by], i) => {
    const on = ((Math.floor(t * 6) + i) % 3) !== 0
    R(x, INK, bx - 7, by - 7, 14, 14); R(x, on ? '#fff1a8' : '#8a6a2a', bx - 4, by - 4, 8, 8)
  })
  x.restore()
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeGame(cfg) {
  const SA = signStar(cfg.a), SB = signStar(cfg.b), PIS = signStar('pisces')
  const NA = NAMES[cfg.a], NB = NAMES[cfg.b]
  const EL = ELEMENT[cfg.a], ELC = EL_COL[EL]
  const pisContestant = cfg.a === 'pisces' ? 'a' : cfg.b === 'pisces' ? 'b' : null
  const SPEAK = 'THE STARS'
  const rounds = cfg.rounds.map((r, i) => ({ ...r, i, t0: ROUNDS[i][0], t1: ROUNDS[i][1] }))
  const at = (r, k) => r.t0 + (k === 'buzz' && r.early ? U.early : U[k])
  const won = side => rounds.filter(r => r.win.includes(side))
  const scoreA = won('a').length, scoreB = won('b').length
  const winner = scoreA > scoreB ? 'a' : scoreB > scoreA ? 'b' : 'ab'

  // THE STARS' lines: the intro, one verdict per round, the last line
  const LINES = [
    { t: T.intro, speaker: SPEAK, text: cfg.intro, box: [T.intro - 0.2, T.introClose] },
    ...rounds.map(r => ({ t: at(r, 'line'), speaker: SPEAK, text: r.line, box: [at(r, 'line') - 0.2, r.t0 + U.out] })),
    { t: T.last, speaker: SPEAK, text: cfg.last, box: [T.last - 0.22, T.boxClose] },
  ]
  const HOST_HOPS = [-0.2, ...talkHops(LINES, SPEAK, { cps: CPS }), T.win + 0.05]
  const times = lineTimes(LINES, { cps: CPS })
  times.forEach((tm, i) => { if (LINES[i].box[1] - tm.done < 1.5) console.warn(`[${cfg.id}] line ${i} holds only ${(LINES[i].box[1] - tm.done).toFixed(2)} s: ${LINES[i].text}`) })

  // contestant hops: frame-0 action, buzzes, card flips, stamps, the win
  const buzzT = side => rounds.filter(r => r.buzz === side).map(r => at(r, 'buzz'))
  const flipT = side => rounds.map(r => at(r, side === 'a' ? 'cardA' : 'cardB') + 0.05)
  const stampT = side => won(side).map(r => at(r, 'stamp') + 0.05)
  const winHops = side => (winner.includes(side) ? [T.win + 0.02, T.win + 0.5, T.win + 1.0, T.win + 2.4, T.win + 3.6] : [T.win + 0.3, T.win + 1.3])
  const HOPS = {
    a: [-0.12, 1.25, ...buzzT('a'), ...flipT('a'), ...stampT('a'), ...winHops('a')].sort((p, q) => p - q),
    b: [-0.3, 0.95, ...buzzT('b'), ...flipT('b'), ...stampT('b'), ...winHops('b')].sort((p, q) => p - q),
  }

  function contestant(x, t, side, o = {}) {
    const S = side === 'a' ? SA : SB, P = POD[side]
    const r = rounds.find(rr => t >= rr.t0 && t < rr.t1)
    let mood = o.mood || 'happy', look = o.look
    if (!o.mood) {
      if (t < 3.4) mood = cfg.hookMood?.[side] || 'happy'
      if (r) {
        const u = t - r.t0, mine = r[side], other = side === 'a' ? 'b' : 'a'
        const myFlip = side === 'a' ? U.cardA : U.cardB, otherFlip = side === 'a' ? U.cardB : U.cardA
        mood = 'neutral'; look = [side === 'a' ? 0.4 : -0.4, -1]                    // reading the screen
        if (u > myFlip) { mood = mine.mood || 'happy'; look = undefined }
        if (u > otherFlip && u < otherFlip + 0.9) { look = [side === 'a' ? 1 : -1, -0.2] }
        if (u > U.stamp) mood = r.win.includes(side) ? 'sparkle' : (u < U.stamp + 0.8 ? 'wide' : 'happy')
        void other
      }
      if (t >= T.fin) { mood = 'neutral'; look = [side === 'a' ? 0.5 : -0.5, -1] }
      if (t >= T.win) mood = winner.includes(side) ? 'sparkle' : 'happy'
    }
    const opts = { color: S.color, glyph: S.glyph, mood, look, hops: HOPS[side], seed: side === 'a' ? 3 : 8, glow: 1.1, pop: o.pop ?? 1 }
    drawStarChar(x, P.x, STAR_Y, STAR_S, t, opts)
    const F = starFrame(P.x, STAR_Y, STAR_S, t, opts)
    // Pisces on the podium cries all show long, more every round
    if (pisContestant === side) {
      const lvl = t < 3.4 ? 2 : t < ROUNDS[1][0] ? 2 : t < T.win ? (r && t - r.t0 > U.stamp ? 3 : 2) : 3
      inSprite(x, F, () => tearsCells(x, t, lvl))
    }
    return F
  }

  function podium(x, t, side) {
    const P = POD[side], S = side === 'a' ? SA : SB
    const X = P.x - POD.w / 2, Y = POD.top
    box(x, X, Y, POD.w, POD.h, '#2a1f55', { b: 7, hi: '#3a2d72' })
    R(x, S.color, X, Y + 30, POD.w, 10)
    // nameplate
    x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = BONE; x.fillText(`${S.glyph}︎ ${NAMES[side === 'a' ? cfg.a : cfg.b].toUpperCase()}`, P.x, Y + 76)
    // the kindness tally: three star slots, filled when that round's stamp lands
    rounds.forEach((r, i) => {
      const filled = r.win.includes(side) && t >= at(r, 'stamp') + 0.1
      const sx = P.x + (i - 1) * 70, sy = Y + 140
      drawBits(x, ['..S..', '..S..', 'SSSSS', '.SSS.', '.S.S.'], { S: filled ? GOLD : '#4a3f78' }, sx, sy, 9, { outline: filled ? INK : null })
      if (filled) sparkles(x, t, sx, sy, at(r, 'stamp') + 0.1, 6, 40, i, [GOLD, BONE])
    })
    // the buzzer on the inner corner
    const bx = side === 'a' ? X + POD.w - 46 : X + 46, by = Y - 6
    const lit = rounds.some(r => r.buzz === side && t >= at(r, 'buzz') && t < at(r, 'buzz') + 0.5) || (cfg.hookBuzz === side && t < 0.7)
    const press = rounds.some(r => r.buzz === side && t >= at(r, 'buzz') && t < at(r, 'buzz') + 0.12) || (cfg.hookBuzz === side && t < 0.12) ? 6 : 0
    R(x, INK, bx - 34, by - 8, 68, 16); R(x, '#5a5470', bx - 30, by - 5, 60, 10)
    drawBits(x, ['..RRRR..', '.RRRRRR.', 'RRRRRRRR'], { R: lit ? '#ff6b7f' : '#b0243a' }, bx, by - 20 + press, 7)
    if (lit) { x.save(); x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(bx, by - 20, 4, bx, by - 20, 90); gg.addColorStop(0, 'rgba(255,90,110,0.5)'); gg.addColorStop(1, 'rgba(255,90,110,0)'); x.fillStyle = gg; x.fillRect(bx - 90, by - 110, 180, 180); x.restore() }
  }

  function host(x, t) {
    const opts = { color: STAR.sky, mood: t >= T.win ? 'sparkle' : 'happy', look: undefined, hops: HOST_HOPS, seed: 2, glow: 1.05 }
    const r = rounds.find(rr => t >= rr.t0 && t < rr.t1)
    if (r) { const u = t - r.t0; if (u > U.cardA && u < U.line) { opts.mood = 'neutral'; opts.look = [u < U.cardB ? -1 : 1, 0] } }
    if (t >= T.fin && t < T.win) { opts.mood = 'wide'; opts.look = [0, -1] }
    drawStarChar(x, HOST.x, HOST.y, HOST.s, t, opts)
    const F = starFrame(HOST.x, HOST.y, HOST.s, t, opts)
    mic(x, F.ox + F.S * 0.42, F.oy - F.base - F.S * 0.05, 1.1, -0.35 + 0.05 * Math.sin(t * 3))
  }

  function audience(x, t) {
    // the crowd: dim silhouettes, bobbing
    const seats = [70, 190, 310, 430, 560, 680, 790]
    seats.forEach((sx, i) => {
      const bob = 6 * Math.sin(t * 2.3 + i * 1.7) + (t > T.win ? 14 * Math.abs(Math.sin(t * 8 + i)) : 0)
      drawStarChar(x, sx, 1530 - bob, 96, t, { color: '#3a2f6a', mood: t > T.win ? 'happy' : 'neutral', look: [0, -1], seed: 20 + i, glow: 0.2, alpha: 0.8, tips: false, blink: false })
    })
    if (pisContestant) {
      drawStarChar(x, 930, 1530 - 6 * Math.sin(t * 2.1), 96, t, { color: '#3a2f6a', mood: t > T.win ? 'happy' : 'neutral', look: [0, -1], seed: 31, glow: 0.2, alpha: 0.8, tips: false, blink: false })
      return
    }
    // Pisces in the front row: tissues, tears rising every round
    const r = rounds.find(rr => t >= rr.t0 && t < rr.t1)
    const lvl = t >= T.win ? 3 : r ? (r.i === 0 ? 2 : 2) + (t - r.t0 > U.stamp ? 1 : 0) : 2
    const P = PIS_SEAT
    tissues(x, P.x - 112, P.y + 34, 66)
    const opts = { color: PIS.color, mood: lvl >= 3 ? 'happy' : 'sparkle', look: [-0.6, -1], seed: 6, glow: 0.8, hops: [T.win + 0.1, T.win + 0.7, ...rounds.map(rr => at(rr, 'stamp') + 0.15)], tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    inSprite(x, F, () => tearsCells(x, t, Math.min(3, lvl)))
  }

  // ── the screen content
  function screen(x, t) {
    const { x: X, y: Y, w, h } = SCREEN
    const cx = X + w / 2
    x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
    const r = rounds.find(rr => t >= rr.t0 && t < rr.t1)
    // static flash on every change of picture
    const changes = [3.4, ...rounds.map(rr => rr.t0 + U.prompt), T.fin]
    const st = Math.max(0, ...changes.map(c => (t >= c - 0.12 && t < c + 0.08) ? 1 : 0))
    if (t < 3.4) {
      label(x, 'TONIGHT', cx, Y + 52, { size: 28, col: GOLD })
      x.font = `800 74px ${INTER}`
      const tA = `${SA.glyph}︎ ${NA.toUpperCase()}`, tB = `${SB.glyph}︎ ${NB.toUpperCase()}`
      const wa = x.measureText(tA).width, wb = x.measureText(tB).width, vs = 90
      const k = Math.min(1, (w - 60) / (wa + wb + vs))
      x.save(); x.translate(cx, Y + 150); x.scale(k, k)
      label(x, tA, -(vs / 2) - wa / 2, 0, { size: 74, col: SA.color, font: INTER, weight: 800 })
      label(x, 'vs', 0, 4, { size: 54, col: BONE, font: SERIF, weight: 500 })
      label(x, tB, vs / 2 + wb / 2, 0, { size: 74, col: SB.color, font: INTER, weight: 800 })
      x.restore()
      label(x, `★ ${EL} NIGHT ★`, cx, Y + 246, { size: 34, col: ELC })
    } else if (r && t >= r.t0 + U.prompt) {
      const u = t - r.t0
      label(x, `ROUND ${r.i + 1}`, X + 34, Y + 40, { size: 24, col: GOLD, align: 'left' })
      label(x, SMALL[r.i], X + w - 34, Y + 40, { size: 24, col: r.i === 1 ? '#9fe6b0' : LAV, align: 'right' })
      if (r.i === 0) {
        // the incoming text: a bubble, then "you reply…" with a blinking caret
        x.font = `700 40px ${INTER}`
        const lines = wrap(x, `“${r.prompt}”`, w - 180)
        const bw = Math.min(w - 120, Math.max(...lines.map(l => x.measureText(l).width)) + 60), bh = lines.length * 50 + 34
        const k = easeOutBack(prog(u, U.prompt, U.prompt + 0.3), 2)
        x.save(); x.translate(X + 60, Y + 78); x.scale(k, k)
        box(x, 0, 0, bw, bh, '#3b3166', { b: 5 })
        x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
        lines.forEach((l, i) => x.fillText(l, 30, 40 + i * 50))
        x.restore()
        const ry = Y + 78 + bh + 44
        if (ry < Y + h - 10) {
          const caret = Math.floor(t * 2.5) % 2 ? '_' : ' '
          label(x, `YOU REPLY…${u < U.cardA ? caret : ''}`, X + w - 60, ry, { size: 30, col: '#9fe6b0', align: 'right', alpha: clamp(prog(u, U.prompt + 0.3, U.prompt + 0.5)) })
        }
      } else {
        x.font = `800 46px ${INTER}`
        const lines = wrap(x, r.prompt, w - 110)
        const k = clamp(prog(u, U.prompt, U.prompt + 0.2))
        const top = Y + 92 + (h - 92 - lines.length * 56) / 2 + 20
        lines.forEach((l, i) => label(x, l, cx, top + i * 56, { size: 46, col: BONE, font: INTER, weight: 800, alpha: k }))
        if (r.i === 1) { flag(x, t, X + 40, Y + h - 10, GREEN, 1, 0.5 * k); flag(x, t, X + w - 40, Y + h - 10, RED, -1, 0.5 * k) }
      }
    } else if (t >= T.fin) {
      // the scoreboard: tallies count up, then the winner
      label(x, 'KINDNESS SCORE', cx, Y + 48, { size: 28, col: GOLD })
      const cnt = (n) => Math.min(n, Math.floor(prog(t, T.tally, T.tally + 0.75) * (n + 0.999)))
      const ca = cnt(scoreA), cb = cnt(scoreB)
      label(x, `${SA.glyph}︎ ${ca}`, cx - 210, Y + 160, { size: 110, col: SA.color, font: INTER, weight: 800 })
      label(x, '—', cx, Y + 160, { size: 70, col: BONE, font: INTER, weight: 800 })
      label(x, `${SB.glyph}︎ ${cb}`, cx + 210, Y + 160, { size: 110, col: SB.color, font: INTER, weight: 800 })
      const wk = pop01(t, T.win, 0.34, 2.4)
      if (wk > 0.01) {
        const txt = winner === 'ab' ? 'IT’S A TIE!' : `${(winner === 'a' ? NA : NB).toUpperCase()} WINS!`
        x.save(); x.translate(cx, Y + 258); x.scale(wk, wk); label(x, txt, 0, 0, { size: 44, col: GOLD, font: INTER, weight: 800 }); x.restore()
      }
    }
    if (st > 0) {
      for (let j = 0; j < h; j += 8) for (let i = 0; i < w; i += 24) {
        const v = ((i * 7 + j * 13 + Math.floor(t * 60) * 31) % 97) / 97
        R(x, `rgba(239,230,214,${0.5 * v})`, X + i, Y + j, 24, 8)
      }
    }
    x.restore()
  }

  // ── the answer cards: face down (the Align star back), then the flip
  function cardBack(x, w, h) {
    box(x, -w / 2, -h / 2, w, h, '#2a1a5e', { b: 7 })
    R(x, GOLD, -w / 2 + 12, -h / 2 + 12, w - 24, 4); R(x, GOLD, -w / 2 + 12, h / 2 - 16, w - 24, 4)
    R(x, GOLD, -w / 2 + 12, -h / 2 + 12, 4, h - 24); R(x, GOLD, w / 2 - 16, -h / 2 + 12, 4, h - 24)
    for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0) drawPixelStar(x, -w / 2 + 40 + i * (w - 80) / 8, -h / 2 + 50 + j * (h - 100) / 3, 14, 1, 'rgba(201,166,255,0.45)')
    drawPixelStar(x, 0, 0, 90, 2, GOLD)
  }
  function cardFace(x, t, w, h, side, r, u) {
    const S = side === 'a' ? SA : SB, ans = r[side]
    box(x, -w / 2, -h / 2, w, h, BONE, { b: 7 })
    R(x, S.color, -w / 2, -h / 2, w, 46)
    x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
    x.fillText(`${S.glyph}︎ ${NAMES[side === 'a' ? cfg.a : cfg.b].toUpperCase()}`, -w / 2 + 20, -h / 2 + 24)
    let top = -h / 2 + 62
    if (ans.flag) {
      const fl = Array.isArray(ans.flag) ? ans.flag : [ans.flag]
      const flipAt = (side === 'a' ? U.cardA : U.cardB) + 0.25
      const idx = Math.min(fl.length - 1, Math.max(0, Math.floor((u - flipAt) / 0.5)))
      const cur = fl[idx]
      const col = cur === 'green' ? GREEN : RED
      R(x, col, -w / 2 + 20, top + 2, 40, 30); R(x, INK, -w / 2 + 16, top - 2, 6, 52)
      x.font = `800 38px ${INTER}`; x.fillStyle = col === GREEN ? '#1e8a45' : '#c21f3a'
      // the earlier picks stay, struck through (Gemini's three flags, Cancer's change of heart)
      let fx = -w / 2 + 76
      for (let q = 0; q <= idx; q++) {
        const word = (fl[q] === 'green' ? 'GREEN' : 'RED') + (q < fl.length - 1 && q < idx ? '' : '.')
        x.fillStyle = fl[q] === 'green' ? '#1e8a45' : '#c21f3a'
        x.globalAlpha = q < idx ? 0.45 : 1
        x.fillText(word, fx, top + 18)
        const ww = x.measureText(word).width
        if (q < idx) R(x, INK, fx - 2, top + 16, ww + 4, 5)
        fx += ww + 16
        x.globalAlpha = 1
      }
      top += 50
    }
    let size = 36
    x.font = `700 ${size}px ${INTER}`
    let lines = wrap(x, ans.text, w - 50)
    const room = h / 2 - 18 - top
    while (lines.length * size * 1.18 > room && size > 26) { size -= 2; x.font = `700 ${size}px ${INTER}`; lines = wrap(x, ans.text, w - 50) }
    const lh = size * 1.18, y0 = top + (room - lines.length * lh) / 2 + lh / 2
    x.fillStyle = INK; x.textAlign = 'center'
    lines.forEach((l, i) => x.fillText(l, 0, y0 + i * lh))
  }
  function card(x, t, side, r) {
    const u = t - r.t0, f0 = side === 'a' ? U.cardA : U.cardB
    const inK = pop01(t, r.t0 + U.prompt + (side === 'a' ? 0.05 : 0.15), 0.3, 1.8) * outK(t, [r.t0 + U.out, r.t0 + U.out + 0.2])
    if (inK <= 0.01) return
    const fp = prog(u, f0, f0 + 0.32)
    const sxk = Math.abs(Math.cos(Math.PI * fp)), face = fp >= 0.5
    const isWin = r.win.includes(side), dim = u > U.stamp && !isWin ? 0.72 : 1
    const C = CARD[side]
    const lift = face ? 14 * Math.sin(Math.PI * clamp(prog(u, f0 + 0.16, f0 + 0.42))) : 0
    x.save(); x.translate(C.cx, CARD.cy - lift); x.rotate((side === 'a' ? -1 : 1) * 0.018); x.scale(inK * Math.max(0.02, sxk), inK)
    x.globalAlpha *= dim
    if (face) cardFace(x, t, CARD.w, CARD.h, side, r, u); else cardBack(x, CARD.w, CARD.h)
    x.restore()
    // the stamp: "+1 ★ KIND"
    if (isWin) {
      const sk = prog(u, U.stamp - 0.06, U.stamp + 0.04)
      if (sk > 0 && u < U.out + 0.2) {
        const sc = lerp(1.8, 1, ease.outCubic(sk)) * outK(t, [r.t0 + U.out, r.t0 + U.out + 0.2])
        x.save(); x.translate(C.cx + CARD.w / 2 - 104, CARD.cy - CARD.h / 2 + 4); x.rotate(0.16); x.scale(sc, sc); x.globalAlpha *= clamp(sk * 3)
        box(x, -92, -34, 184, 68, GOLD, { b: 6, hi: '#ffe69a' })
        x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('+1 ★ KIND', 0, 3)
        x.restore()
        sparkles(x, t, C.cx + CARD.w / 2 - 70, CARD.cy - CARD.h / 2, at(r, 'stamp'), 8, 90, 2, [GOLD, BONE, PINK])
      }
    }
  }

  // the flags the contestants raise in round 2
  function heldFlag(x, t, side, F, r) {
    if (r.i !== 1 || !r[side].flag) return
    const u = t - r.t0, f0 = side === 'a' ? U.cardA : U.cardB
    const k = pop01(t, r.t0 + f0 + 0.1, 0.3, 2.2) * outK(t, [r.t0 + U.out, r.t0 + U.out + 0.2])
    const fl = Array.isArray(r[side].flag) ? r[side].flag : [r[side].flag]
    const idx = Math.min(fl.length - 1, Math.max(0, Math.floor((u - f0 - 0.25) / 0.5)))
    const d = side === 'a' ? -1 : 1
    flag(x, t, F.ox + d * F.S * 0.48, F.oy - F.base - F.S * 0.02, fl[idx] === 'green' ? GREEN : RED, d, k)
  }

  function winnerBeat(x, t) {
    if (t < T.fin) return
    const ok = popOut(t, T.out)
    const sides = winner === 'ab' ? ['a', 'b'] : [winner]
    const sa = clamp(prog(t, T.win - 0.05, T.win + 0.15)) * ok
    for (const s of sides) spotlight(x, POD[s].x + (s === 'a' ? -60 : 60), 300, POD[s].x, 1262, 360, sa)
    // the trophy over each winner
    for (const s of sides) {
      const k = pop01(t, T.win + 0.15, 0.4, 2.3) * ok
      if (k <= 0.01) continue
      const tx = POD[s].x + (s === 'a' ? 128 : -128), ty = 960 - 10 * Math.sin(t * 4)
      x.save(); x.translate(tx, ty); x.scale(k, k); x.rotate(0.06 * Math.sin(t * 3))
      drawBits(x, ['GGGGGGGGG', 'GYGGGGGYG', 'GYGGGGGYG', '.GGGGGGG.', '..GGGGG..', '...GGG...', '....G....', '...GGG...', '..BBBBB..'], { G: GOLD, Y: '#fff1a8', B: '#8a5a2a' }, 0, 0, 14)
      label(x, 'KINDEST', 0, 92, { size: 30, col: GOLD })
      x.restore()
    }
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 46px Inter", "700 36px Inter", "800 28px Inter", "italic 500 150px 'EB Garamond'", "500 54px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const HEADS = [
      [popText(root, cfg.hook, { top: 166, size: 82, accentSize: 112, at: -2, gap: 0.01, accentColor: cfg.accent || GOLD, fit: true }), T.h0Out],
      ...rounds.map((r, i) => [popText(root, `Round ${i + 1}: | *${TITLES[i]}*`, { top: 166, size: 74, accentSize: 104, at: r.t0 + 0.02, gap: 0.08, accentColor: [GOLD, '#9fe6b0', LAV][i], fit: true }), [r.t1 - 0.2, r.t1]]),
      [popText(root, cfg.final, { top: 166, size: 80, accentSize: 112, at: T.fin + 0.05, late: 1, lateAt: T.win, wobble: true, accentColor: GOLD, fit: true }), [T.out[0] + 0.1, T.out[1]]],
    ]
    const boxes = LINES.map(L => dialogueBox(root, { lines: [L], y: 1648, height: 228, size: 48, open: L.box[0], close: L.box[1], cps: CPS }))
    const bug = buildBug(root, cfg.ep)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ss = ease.inOutCubic(prog(t, 0, 3))
        drawSky(x, t, { ...SKY_H, zoom: lerp(1.62, SKY_H.zoom, ss), dim: 0.5 })
        const dW = t - T.win, shake = dW > 0 && dW < 0.4 ? 12 * Math.exp(-dW * 9) * Math.sin(dW * 55) : 0
        x.save(); x.translate(0, shake)
        // sweeping hook spotlights, then a steady wash
        const hookS = 1 - clamp(prog(t, 3.0, 3.6))
        if (hookS > 0) { spotlight(x, 200 + 120 * Math.sin(t * 1.7), 140, 300 + 220 * Math.sin(t * 1.7), 1262, 340, hookS); spotlight(x, 880 - 120 * Math.sin(t * 1.5), 140, 780 - 220 * Math.sin(t * 1.5), 1262, 340, hookS) }
        drawStage(x, t)
        drawScreenFrame(x, t, 1)
        screen(x, t)
        winnerBeat(x, t)
        podium(x, t, 'a'); podium(x, t, 'b')
        const FA = contestant(x, t, 'a'), FB = contestant(x, t, 'b')
        host(x, t)
        const r = rounds.find(rr => t >= rr.t0 && t < rr.t1)
        if (r) { heldFlag(x, t, 'a', FA, r); heldFlag(x, t, 'b', FB, r) }
        // BZZT!
        for (const rr of [...rounds, ...(cfg.hookBuzz ? [{ buzz: cfg.hookBuzz, hook: true }] : [])]) {
          const bt = rr.hook ? -1 : at(rr, 'buzz'), k = (rr.hook ? 1 : pop01(t, bt, 0.2, 3)) * outK(t, rr.hook ? [0.7, 0.9] : [bt + 0.55, bt + 0.75])
          if (k > 0.01) { const P = POD[rr.buzz]; label(x, 'BZZT!', P.x + (rr.buzz === 'a' ? 110 : -110), 1080, { size: 46 * k, col: '#ff6b7f', font: INTER, weight: 800, rot: rr.buzz === 'a' ? -0.12 : 0.12 }) }
        }
        if (cfg.hookProps) for (const sd of ['a', 'b']) {
          const nm = cfg.hookProps[sd], F = sd === 'a' ? FA : FB
          const k = outK(t, [3.2, 3.45])
          if (nm && k > 0.01) drawProp(x, nm, F.ox + (sd === 'a' ? 1 : -1) * F.S * 0.5, F.oy - F.base - F.S * 0.05 + 4 * Math.sin(t * 6), 9 * k, (sd === 'a' ? 0.15 : -0.15))
        }
        if (cfg.props) cfg.props(x, t, { FA, FB, rounds, at, U, T, POD, winner })
        if (r) { card(x, t, 'a', r); card(x, t, 'b', r) }
        audience(x, t)
        // confetti for the winner(s)
        const sides = winner === 'ab' ? ['a', 'b'] : [winner]
        for (const s of sides) { confetti(x, t, T.win + 0.02, POD[s].x, 1000); confetti(x, t, T.win + 0.5, POD[s].x + 40, 900, { n: 20 }) }
        hearts(x, t, T.win + 0.4, PIS_SEAT.x, PIS_SEAT.y - 60, { n: 6 })
        x.restore()
        drawPips(x, t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        boxes.forEach(b => b.update(t))
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(0, ...ROUNDS.map(([a]) => (t >= a && t < a + 0.1) ? 1 - (t - a) / 0.1 : 0), (t >= T.win && t < T.win + 0.12) ? 1 - (t - T.win) / 0.12 : 0)
        flash.style.opacity = String(0.45 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // card-cut candidates (cardfx keeps the middle one: 17.6, into round 3)
  const CUTS = [ROUNDS[1][0], { t: T.cut, kind: 'flip' }, T.fin]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const applause = (t0, d, gain = 0.07) => Array.from({ length: Math.floor(d * 14) }, (_, i) => ['clap', r3(t0 + i / 14 + ((i * 37) % 11) / 160), { gain: gain * (0.6 + 0.4 * ((i * 13) % 7) / 6) * (1 - 0.6 * i / (d * 14)), pan: (((i * 29) % 9) - 4) / 6 }])
  const CUES = [
    // frame 0: the show is already on (a buzzer blip, crowd)
    ['pop', 0.05, 880, 0.03, -0.3], ...applause(0.0, 1.2, 0.05), ['glitter', 0.1, 0.5],
    ...rounds.flatMap(r => {
      const a = r.t0
      return [
        ['whoosh', r3(a - 0.1), 0.3, 0.035], ['tick', a, 0.05], ...wordPops(a + 0.02, 4, 0.08, r.i),
        ['tick', r3(a + U.prompt - 0.1), 0.03], ['glitter', r3(a + U.prompt - 0.1), r3(a + U.prompt + 0.08)], ['pop', r3(a + U.prompt + 0.05), 1318.51, 0.035, 0],
        // the buzzer
        ['chip', r3(at(r, 'buzz')), 147, 0.34, { gain: 0.05, wave: 'square', duty: 0.3 }], ['chip', r3(at(r, 'buzz')), 155, 0.34, { gain: 0.035, wave: 'square', duty: 0.5 }],
        // the two flips
        ['whoosh', r3(a + U.cardA - 0.04), 0.22, 0.03], ['tick', r3(a + U.cardA + 0.16), 0.05], ['pop', r3(a + U.cardA + 0.2), 987.77, 0.035, -0.3],
        ['whoosh', r3(a + U.cardB - 0.04), 0.22, 0.03], ['tick', r3(a + U.cardB + 0.16), 0.05], ['pop', r3(a + U.cardB + 0.2), 1174.66, 0.035, 0.3],
        // the stamp(s) + the ding
        ['tick', r3(a + U.stamp), 0.07], ['pop', r3(a + U.stamp), 1318.51, 0.045, 0], ['bell', r3(a + U.stamp + 0.06), 1760, 0.035, 1.0, 0], ['glitter', r3(a + U.stamp), r3(a + U.stamp + 0.35)],
        ...applause(a + U.stamp + 0.1, 0.9, 0.04),
      ]
    }),
    // the winner
    ['whoosh', T.fin - 0.1, 0.32, 0.035], ...wordPops(T.fin + 0.05, 4, 0.08, 2),
    ...Array.from({ length: Math.max(1, Math.max(scoreA, scoreB)) }, (_, i) => ['pop', r3(T.tally + 0.1 + i * 0.22), NOTE[(i * 2) % 7], 0.035, 0]),
    ['riser', T.roll[0], T.roll[1], 0.04], ...Array.from({ length: 12 }, (_, i) => ['tom', r3(T.roll[0] + i * 0.066), 150 + i * 6, { gain: 0.06 + 0.012 * i, decay: 0.12 }]),
    ['boom', T.win, 0.3], ['bell', r3(T.win + 0.04), 1760, 0.04, 1.4, 0], ['bell', r3(T.win + 0.1), 2349.32, 0.03, 1.4, 0], ['glitter', T.win, r3(T.win + 0.6)],
    ['pop', r3(T.win + 0.02), 1174.66, 0.05, 0], ['pop', r3(T.win + 0.12), 1567.98, 0.04, 0], ...applause(T.win + 0.05, 2.6, 0.08),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS, winner, scoreA, scoreB }
}
