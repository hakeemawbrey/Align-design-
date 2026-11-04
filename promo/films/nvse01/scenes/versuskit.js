// SIGN VS SIGN (who handles it better?): the shared look of the 24 star_advice trial reels nvse01–nvse24
// (promo/films/next30/b46.md). Lives in nvse01; the other 23 episodes import it from here.
//
// The format (18 s, story 0–13.6, then the shared end card with the default CTA):
//   0.00–2.60   hook (frame 0 is the thumbnail): the question is already up ("Who handles | *X* better?"), the frame
//               is split down the middle with a pulsing VS badge, both signs mid-hop with name plates.
//   2.60–6.00   ROUND 1: jump cut to sign A on its own set: its name up top, a caption sticker, two speech bubbles, a
//               prop, and a beat on the switch (SW s into the round: mood change + an effect).
//   6.00        the one card cut (flip).
//   6.00–9.40   ROUND 2: sign B, same shape.
//   9.40–13.55  THE VERDICT: back to the split, the verdict slams in up top, crowns (winner, both, or a twist),
//               THE STARS say the last line in the dialogue box.
// Pisces sits in the corner with a tissue box and cries in every film; when Pisces plays, it cries on its own side.
//
//   makeVersus(cfg) → { DURATION, SCENES, CUES, T }
//     cfg.a, cfg.b       sign ids ('aries'…)
//     cfg.hook           the question, popText syntax ('Who handles | a *late date* better?')
//     cfg.hookDraw(x, t, S)   optional: extra drawing in the hook (S = { k, A, B, hero(side, o) })
//     cfg.rounds[2]      { caption, bubbles: [b1, b2], moods: [m0, m1], set, fx, draw(x, t, S), front(x, t, S),
//                          hero: { x, y, s } , pose(u) → partial hero opts, tears }    S = { u, t0, t1, hero, H, ... }
//     cfg.verdict        { who: 'a' | 'b' | 'both' | 'none', text (popText syntax), draw(x, t, S) optional extra }
//     cfg.last           THE STARS' last line (≤ 55 chars)
//     cfg.cues           extra sound cues (absolute times)
// Everything draws as a pure function of t; DOM / canvases are only made inside build().
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#e8344e', SKYB = '#7fd0ff', MINT = '#9fe6b0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const BUG_COL = '#ffb35c'
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, STAR, drawPixelStar }

const NAMES = { aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer', leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio', sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces' }
export const nameOf = id => NAMES[id]

// ── the fixed timeline (same in all 24 films)
export const DURATION = 18
export const STORY_END = DURATION - ENDCARD_LEN          // 13.6
export const SW = 1.75                                     // the switch beat inside a round
export const T = {
  h0: -1.3, h0Out: [2.4, 2.6], bugAt: -1,
  rounds: [[2.6, 6.0], [6.0, 9.4]],
  cut: 6.0,
  verdict: 9.4, vLabel: 9.5, vText: 9.62, vLand: 10.02, crown: 10.1,
  starsIn: 9.6, pisIn: 9.7, line: 9.9, boxOpen: 9.7, boxClose: 13.45,
  out: [13.3, 13.58], bugOut: [13.35, 13.58],
}
const CPS = 32

// ── drawing helpers
export const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
/** an ink-outlined block (pixel-chunky prop) */
export function box(x, X, Y, w, h, col, { b = 6, hi = null, lo = null } = {}) {
  R(x, INK, X - b, Y - b, w + 2 * b, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X, Y, w, Math.max(b, h * 0.14))
  if (lo) R(x, lo, X, Y + h - Math.max(b, h * 0.14), w, Math.max(b, h * 0.14))
}
/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy). Rows may differ in length (padded with '.'). */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  const w = Math.max(...bm.map(r => r.length)), h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const at = (i, j) => (j >= 0 && j < h && i >= 0 && i < bm[j].length) ? bm[j][i] : '.'
  const on = (i, j) => at(i, j) !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = at(i, j); if (ch === '.') continue
    x.fillStyle = cols[ch] || PAL[ch] || BONE; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
// the prop palette (letters used in PROPS)
export const PAL = { W: '#ffffff', B: BONE, G: GOLD, P: PINK, R: RED, O: '#f3903a', Y: '#ffe27a', N: '#8a5a36', L: '#d9a066', U: '#4f7cd8', C: SKYB, V: '#9a7be0', E: '#5fd38a', D: '#2a2148', S: '#8c86a8', M: '#b8b2cc', H: '#ff4f86', K: INK, T: '#3a8a6a' }
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** small pixel props, drawn with drawProp(x, name, cx, cy, cell, opts) */
export const PROPS = {
  heart: HEART,
  pastry: ['...LLLL...', '.LLNLLNLL.', 'LLNLLLLNLL', 'LNLLLLLLNL', '.LLLLLLLL.'],
  cookie: ['..LLLL..', '.LLNLLL.', 'LLLLLNLL', 'LNLLLLLL', 'LLLLNLLL', '.LLLLLN.', '..LLLL..'],
  tin: ['.RRRRRRRR.', 'RRRRRRRRRR', 'GGGGGGGGGG', 'RRRBBBBRRR', 'RRRBHHBRRR', 'RRRBBBBRRR', 'RRRRRRRRRR', '.RRRRRRRR.'],
  mug: ['.W..W....', '..W..W...', 'BBBBBBB..', 'BNNNNNBBB', 'BBBBBBB.B', 'BBBBBBB.B', 'BBBBBBBBB', 'BBBBBBB..', '.BBBBB...'],
  gift: ['...R.R...', '....R....', 'UUUURUUUU', 'UUUURUUUU', 'RRRRRRRRR', 'UUUURUUUU', 'UUUURUUUU', 'UUUURUUUU'],
  snowman: ['...DDD...', '...DDD...', '..DDDDD..', '...WWW...', '..WDWDW..', '..WWOOW..', '...WWW...', '.WWWWWWW.', 'WWWWDWWWW', 'WWWWWWWWW', 'WWWWDWWWW', '.WWWWWWW.'],
  pot: ['...SSSS...', '..SSSSSS..', 'MMMMMMMMMM', 'SMMMMMMMMS', 'MMMMMMMMMM', '.MMMMMMMM.', '.MMMMMMMM.', '..MMMMMM..'],
  mitten: ['.RR...', 'RRRR..', 'RRRRR.', 'RRRRRR', 'RRRRRR', '.RRRR.', '.WWWW.'],
  thermos: ['.SS.', 'RRRR', 'RRRR', 'RWWR', 'RRRR', 'RRRR', 'RRRR', 'SSSS'],
  flask: ['...WW...', '...WW...', '...BB...', '..BEEB..', '.BEEEEB.', 'BEEEEEEB', 'BEEEEEEB', '.BBBBBB.'],
  camera: ['..DD......', 'DDDDDDDDDD', 'DSSSDDSSSD', 'DSSDCCDSSD', 'DSDCWCCDSD', 'DSSDCCDSSD', 'DDDDDDDDDD'],
  suitcase: ['...DDDD...', '...D..D...', 'NNNNNNNNNN', 'NLLLLLLLLN', 'NLLLLLLLLN', 'NNNNNNNNNN', 'NLLLLLLLLN', 'NNNNNNNNNN'],
  sock: ['.PP...', '.WW...', '.PP...', '.PP...', '.PPPP.', '.PPPPP'],
  dog: ['........NN..', '.......NNNN.', '.......NDNNK', 'N......NNNN.', 'NNNNNNNNNN..', '.NNNNNNNNN..', '.N.N...N.N..', '.N.N...N.N..'],
  cat: ['.......M.M.', '.......MMM.', 'M......MDMD', 'M......MMMM', '.MMMMMMMMM.', '.MMMMMMMM..', '.M.M..M.M..'],
  catSweater: ['.......M.M.', '.......MMM.', 'M......MDMD', 'M......MMMM', '.MRRWRRWMM.', '.MRRRRRRM..', '.M.M..M.M..'],
  ball: ['.RR.', 'RRWR', 'RRRR', '.RR.'],
  bowl: ['..YYYYYY..', '.YYLYYLYY.', 'BBBBBBBBBB', '.BBBBBBBB.', '..BBBBBB..'],
  dip: ['..EEEEEE..', '.EEEEEEEE.', 'BBBBBBBBBB', '.BBBBBBBB.', '..BBBBBB..'],
  jar: ['.RRR.', 'BBBBB', 'BWWWB', 'BWWWB', 'BWWWB', 'BBBBB'],
  clock: ['..BBBB..', '.BWWWWB.', 'BWWDWWWB', 'BWWDWWWB', 'BWWDDDWB', 'BWWWWWWB', '.BWWWWB.', '..BBBB..'],
  flower: ['.P.P.', 'PPYPP', '.PPP.', '..E..', '.EE..', '..E..'],
  sweaterG: ['.MM..MM.', 'MMMMMMMM', 'MMMMMMMM', 'MSSSSSSM', 'MMMMMMMM', 'MMMMMMMM', '.MMMMMM.'],
  sweaterR: ['.RR..RR.', 'RRRRRRRR', 'RWRRRRWR', 'RRNNNNRR', 'RRNLLNRR', 'RRRNNRRR', '.RRRRRR.'],
  scarf: ['RRRRRRRR', 'RWRWRWRW', 'RRRRRRRR', '......RR', '......RW', '......RR'],
  wallet: ['NNNNNNNN', 'NLLLLLLN', 'NLLLLLLN', 'NNNNNNLN', 'NLLLLLLN', 'NNNNNNNN'],
  tissue: ['...WW...', '..WWWW..', 'CCCCCCCC', 'CCCCCCCC', 'CCCCCCCC', 'CCCCCCCC'],
  cloud: ['...SSSS...', '.SSSSSSSS.', 'SSSSSSSSSS', '.SSSSSSSS.', '..C..C..C.', '.C..C..C..'],
  crown: ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG'],
  ticket: ['GGGGGGGGGGGG', 'GBBBBBBBBBBG', 'GBDDDDDDDDBG', 'GBBBBBBBBBBG', 'GBDDDDBBBBBG', 'GGGGGGGGGGGG'],
  remote: ['.DD.', 'DRDD', 'DDDD', 'DSDS', 'DDDD', 'DSDS', 'DDDD'],
  pasta: ['..YYYYYY..', '.YRYYRYYY.', 'YYYYYRYYYY', 'BBBBBBBBBB', '.BBBBBBBB.', '..BBBBBB..'],
  star: ['....G....', '...GGG...', 'GGGGGGGGG', '.GGGGGGG.', '..GGGGG..', '.GG...GG.'],
  lamp: ['..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', '....N....', '....N....', '....N....', '..NNNNN..'],
}
export function drawProp(x, name, cx, cy, cell, opts = {}) { drawBits(x, PROPS[name], opts.cols || {}, cx, cy, cell, opts) }

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
export function confetti(x, t, t0, cx, cy, { n = 26, life = 2.2, cols = [GOLD, PINK, SKYB, MINT, BONE] } = {}) {
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
/** falling pixel snow (whole frame), strength a */
export function snowfall(x, t, a = 1, { n = 60, top = 0, bottom = 1920 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha = 0.85 * a
  for (let i = 0; i < n; i++) {
    const sp = 60 + (i * 37) % 70, sz = 6 + (i % 3) * 3
    const yy = top + ((i * 211 + t * sp) % (bottom - top))
    const xx = (i * 97) % 1080 + 18 * Math.sin(t * 1.3 + i)
    x.fillStyle = i % 4 ? BONE : '#ffffff'; x.fillRect(Math.round(xx), Math.round(yy), sz, sz)
  }
  x.restore()
}
/** a pixel speech bubble (canvas), popping at t0, fading by t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { col = BONE, ink = INK, size = 34, tail = 0, font = INTER, weight = 800, maxW = 1000 } = {}) {
  const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.font = `${weight} ${size}px ${font}`
  let w = x.measureText(text).width + 44
  const sc = Math.min(1, (maxW - 20) / w)
  const h = size + 32
  cx = clamp(cx, 40 + w * sc / 2, 1040 - w * sc / 2)
  x.translate(cx, cy); x.scale(k * sc, k * sc)
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
  g.addColorStop(0, `rgba(${col},${0.05 * a})`); g.addColorStop(1, `rgba(${col},${0.26 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(tx - 30, top); x.lineTo(tx + 30, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(${col},${0.3 * a})`; x.beginPath(); x.ellipse(bx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a paper card (checklist, letter, poster, plan): title + lines, centred on (cx, cy) */
export function paper(x, cx, cy, w, h, { title = null, lines = [], rot = 0, k = 1, col = BONE, ink = INK, accent = RED, size = 30, titleSize = 34, ticks = 0, align = 'left', font = INTER, strike = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 14, -h / 2 + 16, w, h)
  box(x, -w / 2, -h / 2, w, h, col, { b: 6 })
  let y = -h / 2 + 30
  x.textBaseline = 'top'
  if (title) { x.font = `800 ${titleSize}px ${INTER}`; x.fillStyle = accent; x.textAlign = 'center'; x.fillText(title, 0, y); y += titleSize + 18; R(x, accent, -w / 2 + 26, y - 10, w - 52, 4) }
  x.font = `700 ${size}px ${font}`; x.fillStyle = ink
  lines.forEach((ln, i) => {
    const lx = align === 'center' ? 0 : -w / 2 + (ticks ? 74 : 30)
    x.textAlign = align
    if (ticks) { box(x, -w / 2 + 28, y + 4, size - 8, size - 8, '#ffffff', { b: 3 }); if (i < ticks) { x.fillStyle = '#2f9a5a'; x.fillRect(-w / 2 + 32, y + 8, size - 16, size - 16) } x.fillStyle = ink }
    x.fillText(ln, lx, y)
    if (strike.includes(i)) { const mw = x.measureText(ln).width; R(x, accent, align === 'center' ? -mw / 2 : lx, y + size * 0.5, mw, 4) }
    y += size + 14
  })
  x.restore()
}
/** a pixel phone with a screen title and up to 3 message lines */
export function phone(x, cx, cy, s, { title = '', msgs = [], rot = 0, k = 1, screen = '#14102a', glow = 0, msgCol = BONE } = {}) {
  if (k <= 0.01) return
  const w = 200 * s, h = 360 * s
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 10, 0, 0, h); g.addColorStop(0, `rgba(160,220,255,${0.25 * glow})`); g.addColorStop(1, 'rgba(160,220,255,0)'); x.fillStyle = g; x.fillRect(-h, -h, 2 * h, 2 * h); x.restore() }
  box(x, -w / 2, -h / 2, w, h, '#2a2148', { b: 7 })
  R(x, screen, -w / 2 + 12, -h / 2 + 22, w - 24, h - 44)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (title) { x.font = `700 ${Math.round(20 * s)}px ${MONO}`; x.fillStyle = MINT; x.fillText(title, 0, -h / 2 + 50 * s) }
  msgs.forEach((m, i) => {
    const my = -h / 2 + (110 + i * 78) * s, mw = w - 44
    R(x, m.col || '#3b2f6b', -mw / 2, my - 28 * s, mw, 56 * s)
    x.font = `700 ${Math.round((m.size || 19) * s)}px ${INTER}`; x.fillStyle = msgCol; x.fillText(m.text, 0, my)
  })
  x.restore()
}
/** a glowing screen (tv / laptop) */
export function screenBox(x, cx, cy, w, h, { col = '#1d3b6a', glow = 1, text = null, size = 30 } = {}) {
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, 20, cx, cy, w)
  g.addColorStop(0, `rgba(120,170,255,${0.22 * glow})`); g.addColorStop(1, 'rgba(120,170,255,0)')
  x.fillStyle = g; x.fillRect(cx - w * 1.2, cy - w, w * 2.4, w * 2.2); x.restore()
  box(x, cx - w / 2, cy - h / 2, w, h, '#2a2148', { b: 8 })
  R(x, col, cx - w / 2 + 14, cy - h / 2 + 14, w - 28, h - 28)
  if (text) label(x, text, cx, cy, { size, col: BONE })
  R(x, INK, cx - 8, cy + h / 2 + 6, 16, 40); R(x, INK, cx - 70, cy + h / 2 + 40, 140, 12)
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
/** a tiny crown on top of a sprite frame */
export function crownOn(x, F, k = 1) {
  if (k <= 0.01) return
  inSprite(x, F, () => {
    x.save(); x.translate(18, 0); x.scale(k, k); x.translate(-18, 0)
    PROPS.crown.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = INK; x.fillRect(15.5 + i - 0.3, -3.4 + j - 0.3, 1.6, 1.6) }))
    PROPS.crown.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'R' ? RED : GOLD; x.fillRect(15.5 + i, -3.4 + j, 1, 1) }))
    x.restore()
  })
}
/** sweat drops flying off a sprite frame */
export function sweat(x, t, F, t0) {
  const tt = t - t0
  if (tt < 0) return
  for (let i = 0; i < 3; i++) {
    const p = ((tt * 1.6 + i / 3) % 1)
    const d = i % 2 ? 1 : -1
    const sx = F.ox + d * F.S * (0.32 + 0.18 * p), sy = F.cy - F.S * 0.32 - 40 * Math.sin(Math.PI * p) + 60 * p
    x.save(); x.globalAlpha = 1 - p
    R(x, INK, sx - 7, sy - 10, 14, 20); R(x, '#8fe3ff', sx - 4, sy - 7, 8, 14)
    x.restore()
  }
}
/** speed lines behind a moving thing */
export function speedLines(x, t, cx, cy, dir = 1, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha = 0.6 * a
  for (let i = 0; i < 6; i++) {
    const L = 60 + 40 * ((i * 3) % 4), off = ((t * 900 + i * 70) % 160)
    R(x, BONE, cx - dir * (120 + off), cy - 120 + i * 44, -dir * L, 7)
  }
  x.restore()
}
/** question marks orbiting a point */
export function questions(x, t, cx, cy, t0, { n = 5, Rr = 190, col = GOLD } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const a = (t - t0) * 2 + i * (Math.PI * 2 / n)
    const k = pop01(t, t0 + i * 0.08, 0.25, 2)
    label(x, '?', cx + Math.cos(a) * Rr, cy + Math.sin(a) * Rr * 0.6, { size: 64 * k, col, font: INTER, weight: 800 })
  }
}
/** a soft room set: wall tint, a window with stars, a floor line */
export function setRoom(x, t, tint = '#2a1f55', { window = true, floor = 1180, lampX = null } = {}) {
  x.save(); x.globalAlpha = 0.55; R(x, tint, 0, 330, 1080, floor - 330); x.restore()
  R(x, INK, 0, floor - 6, 1080, 12); R(x, '#3a2d66', 0, floor + 6, 1080, 420)
  for (let i = 0; i < 8; i++) R(x, 'rgba(255,255,255,0.05)', i * 140, floor + 6, 70, 420)
  if (window) { box(x, 690, 420, 260, 300, '#101a3c', { b: 10 }); R(x, INK, 815, 420, 10, 300); R(x, INK, 690, 565, 260, 10); for (let i = 0; i < 6; i++) drawPixelStar(x, 720 + (i * 53) % 210, 450 + (i * 71) % 240, 14, i % 2, BONE) }
  if (lampX != null) { R(x, INK, lampX - 6, floor - 330, 12, 330); drawProp(x, 'lamp', lampX, floor - 360, 9) }
}
/** a street set: buildings, a lamp post, snowy pavement */
export function setStreet(x, t, { snow = 0.6, floor = 1200 } = {}) {
  const B = [[0, 520, 230, '#241a48'], [240, 600, 200, '#2c2156'], [450, 480, 220, '#221846'], [680, 560, 180, '#2a1f52'], [870, 500, 210, '#251b4a']]
  for (const [bx, by, bw, c] of B) { R(x, c, bx, by, bw, floor - by); for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) R(x, (i + j) % 3 ? 'rgba(255,214,140,0.55)' : 'rgba(255,214,140,0.15)', bx + 24 + i * 62, by + 40 + j * 110, 34, 48) }
  R(x, INK, 0, floor - 6, 1080, 12); R(x, '#5f5a7c', 0, floor + 6, 1080, 400); R(x, '#e9e4f2', 0, floor + 6, 1080, 22)
  R(x, INK, 120, floor - 420, 14, 420); box(x, 96, floor - 460, 62, 44, '#ffe9a8', { b: 6 })
  spotlight(x, 127, floor - 420, 127, floor, 260, 0.7)
  snowfall(x, t, snow, { n: 40 })
}
/** a party set: string lights + bunting over a room */
export function setParty(x, t, tint = '#3a1f4a', { floor = 1180 } = {}) {
  setRoom(x, t, tint, { window: false, floor })
  for (let row = 0; row < 2; row++) {
    const y0 = 380 + row * 110
    for (let i = 0; i < 12; i++) {
      const px = 40 + i * 92, py = y0 + 34 * Math.sin((i / 11) * Math.PI)
      R(x, INK, px - 2, py - 20, 4, 20)
      const on = Math.sin(t * 4 + i * 1.7 + row) > -0.3
      R(x, INK, px - 11, py - 3, 22, 26); R(x, on ? [GOLD, PINK, SKYB, MINT][i % 4] : '#5a5470', px - 7, py + 1, 14, 18)
    }
  }
}
/** a kitchen set: counter, shelf, tiles */
export function setKitchen(x, t, { floor = 1180 } = {}) {
  setRoom(x, t, '#24304f', { window: true, floor })
  for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) R(x, 'rgba(255,255,255,0.04)', i * 92 + (j % 2) * 46, 760 + j * 60, 80, 50)
  box(x, 60, 1000, 960, 40, '#c9b48a', { b: 8 }); R(x, '#6b4a2f', 70, 1040, 940, floor - 1040)
  box(x, 120, 560, 380, 18, '#8a6440', { b: 6 })
}
/** a snow set: night sky snowfall + snowbank */
export function setSnow(x, t, { floor = 1180 } = {}) {
  snowfall(x, t, 1, { n: 70 })
  R(x, INK, 0, floor - 10, 1080, 12)
  x.fillStyle = '#e9e4f2'; x.beginPath(); x.moveTo(0, floor); for (let i = 0; i <= 12; i++) x.lineTo(i * 90, floor - 18 * Math.sin(i * 1.3)); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.closePath(); x.fill()
  R(x, '#cfc8e8', 0, floor + 60, 1080, 900)
}
/** a couch (for movie nights) */
export function couch(x, cx, cy, w = 620, col = '#8a4a6a') {
  box(x, cx - w / 2, cy - 120, w, 110, col, { b: 8, hi: 'rgba(255,255,255,0.15)' })
  box(x, cx - w / 2 - 40, cy - 60, 70, 150, col, { b: 8 }); box(x, cx + w / 2 - 30, cy - 60, 70, 150, col, { b: 8 })
  box(x, cx - w / 2, cy - 10, w, 90, col, { b: 8, lo: 'rgba(0,0,0,0.2)' })
}
/** a café table */
export function cafeTable(x, cx, cy, w = 460) {
  box(x, cx - w / 2, cy, w, 26, '#c9b48a', { b: 7 }); R(x, INK, cx - 10, cy + 30, 20, 190); R(x, INK, cx - 90, cy + 214, 180, 14)
}

// ── the format bug: "SIGN VS SIGN" in Inter 800 small caps, letter-spaced, top-left 56 px
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '16px', height: '16px', background: BUG_COL, transform: 'rotate(45deg)', boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,179,92,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.22em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'SIGN<span style="color:rgba(255,255,255,0.62)">&nbsp;VS&nbsp;</span>SIGN')
  return {
    update(t, out = 1) {
      b.style.display = out <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(out))
    },
  }
}

// ── the round title (DOM): "ROUND 1" + the sign's name in its colour
function buildRoundTitle(root, { n, id, at, out }) {
  const S = signStar(id)
  const wrap = el('div', { position: 'absolute', left: '0', top: '150px', width: '1080px', display: 'none', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }, root)
  el('div', { font: `700 30px ${MONO}`, letterSpacing: '0.3em', color: 'rgba(239,230,214,0.75)', textShadow: '0 2px 10px rgba(6,4,18,0.9)' }, wrap, `ROUND ${n}`)
  const nm = el('div', { font: `800 118px ${INTER}`, letterSpacing: '-0.01em', color: S.color, lineHeight: '1.05', whiteSpace: 'nowrap', textShadow: `0 6px 0 ${INK}, 0 10px 26px rgba(6,4,18,0.8)`, transformOrigin: '50% 50%' }, wrap, `${S.glyph}&#xFE0E; ${nameOf(id).toUpperCase()}`)
  wrap.style.display = 'flex'
  const fitK = Math.min(1, 960 / Math.max(1, nm.offsetWidth || 1))
  wrap.style.display = 'none'
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.4), o = outK(t, out)
      wrap.style.opacity = String(clamp(prog(t, at, at + 0.08) * 1.5) * o)
      nm.style.transform = `scale(${(lerp(0.5, 1, k) * fitK).toFixed(4)})`
    },
  }
}

// ── the caption sticker: a tilted bone sticker, the sign's glyph badge, Inter 800 + one *italic* accent
function buildSticker(root, { id, text, deep, at, out, tilt }) {
  const S = signStar(id)
  const wrap = el('div', { position: 'absolute', left: '0', top: '1330px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '22px', maxWidth: '960px', padding: '18px 34px 20px 22px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: `10px 10px 0 rgba(6,4,18,0.7)`, transformOrigin: '50% 50%' }, wrap)
  el('div', { flex: '0 0 auto', width: '78px', height: '78px', borderRadius: '50%', background: S.color, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `700 44px ${MONO}`, color: INK }, st, `${S.glyph}&#xFE0E;`)
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 64px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 50px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}

// ── the hook name plates (canvas)
function namePlate(x, cx, cy, id, k) {
  if (k <= 0.01) return
  const S = signStar(id), txt = `${S.glyph}︎ ${nameOf(id).toUpperCase()}`
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 40px ${INTER}`
  const w = Math.min(470, x.measureText(txt).width + 46)
  box(x, -w / 2, -32, w, 64, S.color, { b: 6 })
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  const sc = Math.min(1, (w - 30) / x.measureText(txt).width)
  x.save(); x.scale(sc, 1); x.fillText(txt, 0, 3); x.restore()
  x.restore()
}
// the VS badge
function vsBadge(x, t, cx, cy, k, t0 = -10) {
  if (k <= 0.01) return
  const pulse = 1 + 0.06 * Math.sin(t * 7)
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k * pulse, k * pulse)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 78, 0, Math.PI * 2); x.fill()
  x.font = `italic 800 92px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText('VS', 4, 8); x.fillStyle = '#ffffff'; x.fillText('VS', 0, 4)
  x.restore()
  sparkles(x, t, cx, cy, t0, 10, 150, 0.4, [GOLD, BONE, RED])
}
// split panels: two tinted halves and a zig-zag divider
function splitPanels(x, t, A, B, a = 1, top = 440) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  for (const [S, x0] of [[A, 0], [B, 540]]) {
    const g = x.createLinearGradient(0, 300, 0, 1560)
    g.addColorStop(0, hexA(S.color, 0)); g.addColorStop(0.5, hexA(S.color, 0.22)); g.addColorStop(1, hexA(S.color, 0.05))
    x.fillStyle = g; x.fillRect(x0, 300, 540, 1260)
  }
  // zig-zag divider
  x.fillStyle = INK
  for (let y = top; y < 1560; y += 40) { const o = ((y / 40) % 2 ? 14 : -14); x.fillRect(540 + o - 10, y, 20, 42) }
  x.fillStyle = BONE
  for (let y = top; y < 1560; y += 40) { const o = ((y / 40) % 2 ? 14 : -14); x.fillRect(540 + o - 4, y + 2, 8, 38) }
  x.restore()
}
export function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})` }
/** a little tissue box (Pisces' corner) */
export function tissues(x, cx, cy, s) {
  box(x, cx - s / 2, cy - s * 0.3, s, s * 0.6, '#9fd8f6', { b: 4, hi: '#c9ecfb' })
  R(x, INK, cx - s * 0.18 - 4, cy - s * 0.3 - 4, s * 0.36 + 8, 8)
  R(x, '#ffffff', cx - s * 0.12, cy - s * 0.3 - s * 0.32, s * 0.24, s * 0.34)
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeVersus(cfg) {
  const A = signStar(cfg.a), B = signStar(cfg.b), PIS = signStar('pisces')
  const SIDES = { a: { id: cfg.a, S: A, seed: 3 }, b: { id: cfg.b, S: B, seed: 7 } }
  const pisPlays = cfg.a === 'pisces' || cfg.b === 'pisces'
  const SPEAK = 'THE STARS'
  const LINES = [{ t: T.line, speaker: SPEAK, text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const HOOK_HOPS = { a: [-0.12, 0.85, 1.7], b: [-0.3, 1.05, 1.95] }
  const V_HOPS = { a: [T.verdict + 0.05, T.crown + 0.02, T.crown + 0.6, 12.4], b: [T.verdict + 0.12, T.crown + 0.1, T.crown + 0.75, 12.6] }
  const who = cfg.verdict.who

  const hero = (side, x, t, o = {}) => {
    const sd = SIDES[side]
    const F0 = { color: sd.S.color, glyph: o.s >= 150 ? sd.S.glyph : null, seed: sd.seed, glow: 1.1, ...o }
    drawStarChar(x, o.x, o.y, o.s, t, F0)
    const F = starFrame(o.x, o.y, o.s, t, F0)
    const tears = o.tears ?? (sd.id === 'pisces' ? 1 : 0)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  function pisces(x, t, P, tears, mood = 'sparkle', look = [-1, -0.5]) {
    const opts = { color: PIS.color, mood, look, seed: 6, glow: 0.8, pop: P.pop ?? 1, alpha: P.alpha ?? 1, hops: P.hops, tips: false }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    const F = starFrame(P.x, P.y, P.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 50px Inter", "800 40px Inter", "800 28px Inter", "italic 800 92px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 20px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const H0 = popText(root, cfg.hook, { top: 150, size: 86, accentSize: 112, at: T.h0, gap: 0.06, accentColor: cfg.accent || GOLD, fit: true })
    const titles = cfg.rounds.map((rd, i) => buildRoundTitle(root, { n: i + 1, id: i ? cfg.b : cfg.a, at: T.rounds[i][0] + 0.05, out: [T.rounds[i][1] - 0.16, T.rounds[i][1]] }))
    const stickers = cfg.rounds.map((rd, i) => buildSticker(root, { id: i ? cfg.b : cfg.a, text: rd.caption, deep: rd.deep || '#b2452a', at: T.rounds[i][0] + 0.3, out: [T.rounds[i][1] - 0.16, T.rounds[i][1]], tilt: [-1.8, 1.6][i] }))
    const vLabel = el('div', { position: 'absolute', left: '0', top: '138px', width: '1080px', textAlign: 'center', font: `700 32px ${MONO}`, letterSpacing: '0.34em', color: GOLD, textShadow: '0 2px 10px rgba(6,4,18,0.9)', display: 'none' }, root, 'THE VERDICT')
    const VT = popText(root, cfg.verdict.text, { top: 196, size: 84, accentSize: 106, at: T.vText, gap: 0.07, late: cfg.verdict.late ?? 2, lateAt: T.vLand, wobble: true, accentColor: cfg.verdict.accent || PINK, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    const box1 = dialogueBox(root, { lines: LINES, y: 1420, open: T.boxOpen, close: T.boxClose, cps: CPS })
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function hook(t) {
      if (t >= T.rounds[0][0]) return
      const o = outK(t, [2.45, 2.6])
      splitPanels(x, t, A, B, o)
      const S = { k: o, A, B, hero: (side, op) => hero(side, x, t, op) }
      if (cfg.hookBack) cfg.hookBack(x, t, S)
      shadow(x, 275, 1130, 230); shadow(x, 805, 1130, 230)
      hero('a', x, t, { x: 275, y: 940, s: 260, mood: cfg.hookMoods?.[0] || 'wide', look: [1, 0], hops: HOOK_HOPS.a })
      hero('b', x, t, { x: 805, y: 940, s: 260, mood: cfg.hookMoods?.[1] || 'happy', look: [-1, 0], hops: HOOK_HOPS.b })
      namePlate(x, 275, 1210, cfg.a, 1); namePlate(x, 805, 1210, cfg.b, 1)
      if (cfg.hookDraw) cfg.hookDraw(x, t, S)
      vsBadge(x, t, 540, 940, 1)
      if (!pisPlays) { tissues(x, 815, 1650, 76); pisces(x, t, { x: 935, y: 1610, s: 150 }, 1, 'wide', [-1, -1]) }
    }

    function round(t, i) {
      const [a, b] = T.rounds[i]
      if (t < a || t >= b) return
      const rd = cfg.rounds[i], side = i ? 'b' : 'a', sd = SIDES[side], u = t - a
      const punch = 1 + 0.07 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
      x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
      const set = rd.set || 'room'
      if (set === 'room') setRoom(x, t, rd.tint || '#2a1f55', rd.setOpts || {})
      else if (set === 'street') setStreet(x, t, rd.setOpts || {})
      else if (set === 'party') setParty(x, t, rd.tint, rd.setOpts || {})
      else if (set === 'kitchen') setKitchen(x, t, rd.setOpts || {})
      else if (set === 'snow') setSnow(x, t, rd.setOpts || {})
      const H = { x: 540, y: 960, s: 300, ...(rd.hero || {}) }
      const S = { u, t0: a, t1: b, side, H, sw: a + SW, hero: (op) => hero(side, x, t, op), other: (op) => hero(i ? 'a' : 'b', x, t, op), A, B, me: sd.S }
      if (rd.draw) rd.draw(x, t, S)
      const mood = u < SW ? (rd.moods?.[0] || 'neutral') : (rd.moods?.[1] || 'happy')
      const pose = rd.pose ? rd.pose(u, t) : {}
      if (rd.drawHero !== false) {
        shadow(x, (pose.x ?? H.x), H.y + H.s * 0.58, H.s * 0.8)
        S.F = hero(side, x, t, { x: H.x, y: H.y, s: H.s, mood, look: rd.look || [0, 0], hops: [a + 0.32, a + SW, a + SW + 0.45, ...(rd.hops || []).map(h => a + h)], tears: rd.tears, ...pose })
      }
      if (rd.front) rd.front(x, t, S)
      // effects on the switch
      const fxT = a + SW, F = S.F
      for (const fx of [].concat(rd.fx || [])) {
        if (fx === 'hearts') hearts(x, t, fxT, (pose.x ?? H.x), H.y - H.s * 0.5, { n: 6 })
        if (fx === 'confetti') confetti(x, t, fxT, (pose.x ?? H.x), H.y - H.s * 0.4)
        if (fx === 'sparkle') sparkles(x, t, (pose.x ?? H.x), H.y - 20, fxT, 10, H.s * 0.7, 1, [GOLD, BONE, sd.S.color])
        if (fx === 'sweat' && F) sweat(x, t, F, fxT)
        if (fx === 'sweat0' && F) sweat(x, t, F, a + 0.3)
        if (fx === 'questions') questions(x, t, (pose.x ?? H.x), H.y - 40, fxT)
      }
      // bubbles
      const [b1, b2] = rd.bubbles
      const bp = rd.bubblePos || [[330, 610, 0.4], [700, 720, -0.4]]
      bubble(x, t, bp[0][0], bp[0][1], a + 0.5, b - 0.02, b1, { size: 36, tail: bp[0][2] })
      bubble(x, t, bp[1][0], bp[1][1], a + SW + 0.05, b - 0.02, b2, { size: 36, tail: bp[1][2], col: rd.b2col || '#ffe9b0' })
      x.restore()
      // Pisces in the corner (or on its own side, crying)
      if (!pisPlays) {
        const pk = pop01(t, a + 0.25, 0.3, 2) * outK(t, [b - 0.15, b])
        if (pk > 0.01) { tissues(x, 815, 1660, 76 * Math.min(1, pk)); pisces(x, t, { x: 935, y: 1620, s: 150, pop: pk }, 2, i ? 'sparkle' : 'wide', [-1, -1]) }
      }
    }

    function verdict(t) {
      if (t < T.verdict || t > T.out[1]) return
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const sk = clamp(prog(t, T.verdict, T.verdict + 0.2))
      splitPanels(x, t, A, B, 0.75 * sk * ok, 480)
      const S = { ok, hero: (side, op) => hero(side, x, t, op), A, B }
      if (cfg.verdict.back) cfg.verdict.back(x, t, S)
      const crownK = (side) => (who === 'both' || who === side) ? pop01(t, T.crown, 0.3, 2.6) : 0
      const moodOf = (side) => t < T.crown ? 'wide' : (who === 'both' || who === side) ? 'sparkle' : 'happy'
      for (const [side, cx] of [['a', 280], ['b', 800]]) {
        const sd = SIDES[side]
        shadow(x, cx, 1090, 210 * ok)
        const F = hero(side, x, t, { x: cx, y: 920, s: 240, pop: ok * pop01(t, T.verdict, 0.32, 2), mood: moodOf(side), look: [side === 'a' ? 1 : -1, -0.3], hops: V_HOPS[side], tears: sd.id === 'pisces' ? (t > T.crown ? 3 : 2) : 0 })
        crownOn(x, F, crownK(side) * ok)
        if (who === 'both' || who === side) confetti(x, t, T.crown, cx, 760)
        sparkles(x, t, cx, 880, T.crown, 8, 170, side === 'a' ? 1 : 2, [GOLD, BONE, sd.S.color])
      }
      if (cfg.verdict.draw) cfg.verdict.draw(x, t, S)
      // THE STARS
      const stk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (stk > 0.01) drawStarChar(x, 160, 1250, 150, t, { color: STAR.sky, mood: t > T.line + 1.6 ? 'happy' : 'neutral', look: [1, -0.4], hops: STARS_HOPS, pop: stk, seed: 2, glow: 1.05 })
      if (!pisPlays) {
        const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
        if (pk > 0.01) { tissues(x, 830, 1280, 70 * Math.min(1, pk)); pisces(x, t, { x: 935, y: 1250, s: 140, pop: pk, hops: [T.pisIn + 0.3, T.crown + 0.05, T.crown + 0.6] }, t > T.crown ? 3 : 2, 'sparkle', [-1, -1]) }
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const dS = t - T.vLand, shake = dS > 0 && dS < 0.45 ? 16 * Math.exp(-dS * 9) * Math.sin(dS * 60) : 0
        x.save(); x.translate(0, shake)
        hook(t)
        round(t, 0); round(t, 1)
        verdict(t)
        x.restore()
        tx.clearRect(0, 0, 1080, 1920)
        sparkles(tx, t, 540, 330, T.vLand + 0.02, 14, 430, 1, [GOLD, BONE, PINK])
        H0.update(t, outK(t, T.h0Out))
        titles.forEach(s => s.update(t)); stickers.forEach(s => s.update(t))
        const vk = t >= T.vLabel && t < T.out[1]
        vLabel.style.display = vk ? 'block' : 'none'
        if (vk) { const k = pop01(t, T.vLabel, 0.3, 2.2); vLabel.style.opacity = String(clamp(k) * outK(t, T.out)); vLabel.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})` }
        VT.update(t, outK(t, T.out))
        box1.update(t)
        bug.update(t, outK(t, T.bugOut))
        const fl = Math.max(0, ...[T.rounds[0][0], T.verdict].map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.55 * fl)
        drawGrain(gx, t)
      },
    }
  }

  // one card-cut candidate: between the two rounds
  const CUTS = [{ t: T.cut, kind: 'flip' }]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    ['bell', 0.02, 1760, 0.03, 0.9, 0], ['pop', 0.05, 1174.66, 0.04, 0], ['tom', 0.0, 110, { gain: 0.18, decay: 0.2 }],
    ['pop', 0.85, 880, 0.03, -0.4], ['pop', 1.05, 987.77, 0.03, 0.4], ['pop', 1.7, 1174.66, 0.025, -0.4], ['pop', 1.95, 1318.51, 0.025, 0.4],
    ...cfg.rounds.flatMap((rd, i) => {
      const a = T.rounds[i][0], st = a + 0.3
      return [
        ...(i === 0 ? [['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05]] : []),
        ['pop', r3(a + 0.08), 739.99, 0.035, 0], ['pop', r3(a + 0.16), 987.77, 0.03, 0],
        ['pop', r3(st), 1174.66, 0.045, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(st + 0.02), 0.04],
        ['pop', r3(a + 0.52), NOTE[(i * 2) % 7], 0.04, -0.25], ['pop', r3(a + SW + 0.07), NOTE[(i * 2 + 3) % 7], 0.04, 0.25],
        ['pluck', r3(a + SW), 1318.51, 0.035, 0.4, 0], ['glitter', r3(a + SW), r3(a + SW + 0.35)],
        ...(rd.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    // the verdict
    ['whoosh', r3(T.verdict - 0.08), 0.3, 0.04], ['tick', T.verdict, 0.05], ['pop', T.vLabel, 880, 0.035, 0],
    ['boom', T.vLand, 0.3], ['tom', T.vLand, 88, { gain: 0.28, decay: 0.3 }], ['tick', T.vLand, 0.07],
    ['bell', r3(T.crown + 0.05), 1760, 0.03, 1.1, 0], ['glitter', T.crown, r3(T.crown + 0.5)],
    ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ...(pisPlays ? [] : [['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4]]),
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T, CUTS }
}
