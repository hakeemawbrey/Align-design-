// THE THREAD kit: the shared look of The Thread (the twelve signs' group chat), episodes nthe17–nthe32
// (promo/films/next30/b06.md). Every episode imports this file from here ('../../nthe17/scenes/threadkit.js').
// Everything draws as a pure function of t. DOM and canvases are only made inside build(); nothing touches `document`
// at module top level (the sound build imports the films' scenes/index.js in node).
//
//   threadFilm(EP) → { DURATION, SCENES, CUES }     one episode from data:
//     EP.duration           total length (includes the 4.4 s end card)
//     EP.heads              [{ text, at, out: [a, b], size?, accent?, late?, top? }]  big popText captions (top of frame);
//                           the hook is heads[0] (at < 0 so it is fully on screen at frame 0)
//     EP.items              the thread, in time order (see drawItem):
//                             { t, kind: 'msg', who, text, hl?, react? }      a bubble (hl = the advice: gold ring)
//                             { t, kind: 'voice', who, dur, sob?, play? }     a voice note (Pisces' crying ones)
//                             { t, kind: 'sys', text, who? }                  a centred system pill
//                             { t, kind: 'triple', who, parts: [[quote, reply], …] }   Gemini answers three at once
//                             { t, kind: 'agenda', who, title, rows, ticks? } Capricorn's agenda card
//                             { t, kind: 'poll', who, q, opts: [{ label, votes: [t…] }], closeAt? }
//                             { t, kind: 'photo', who, pic(x, X, Y, w, h, t), h?, caption? }
//                           react: { t, mark: 'heart'|'ha'|'tear'|'!!'|'?'|'pin'|'star', n? }  a little pill under the bubble
//     EP.typing             [{ who, a, b }]  "♍ Virgo is typing…" above the input bar
//     EP.pins               [{ t, who, text }]  the pinned bar under the header (latest wins)
//     EP.stage(x, t, K)     draws the little stage under the chat (K = kit helpers); default: the poster + Pisces
//     EP.cuts               card-cut candidates (cardfx keeps the middle one)
//     EP.cues               extra sound cues
//     EP.out                [a, b] when the chat + stage pop out (before the end card)
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', MINT = '#9fe6b0', SKYB = '#8fe3ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPHF = "'DejaVu Sans', 'EB Garamond', serif"
const TAU = Math.PI * 2

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const hexA = (h, a) => { const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }
const lighten = (h, k) => { const n = parseInt(h.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v + (255 - v) * k)); return `rgb(${c.join(',')})` }

// ── the cast (short keys for scripts)
const KEY = { sag: 'sagittarius', cap: 'capricorn', aqua: 'aquarius' }
export const CAST = {}
SIGNS.forEach((s, i) => { CAST[s.id] = { id: s.id, name: s.name, glyph: s.glyph, color: s.color, light: lighten(s.color, 0.45), seed: 3 + i * 7 } })
for (const [k, v] of Object.entries(KEY)) CAST[k] = CAST[v]
export const C = id => CAST[id]

// ── pixel helpers
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
/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}
// star sprite frame (mirrors startalk.js) so props sit on the sprite through hops and squash
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
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = SKYB; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
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
    ctx.fillStyle = SKYB; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}

// ── props (pixel bitmaps). drawProp(x, name, cx, cy, cell, opts)
export const PROPS = {
  phone: [['KKKKKKK', 'KSSSSSK', 'KSWSSSK', 'KSSSSSK', 'KSWWSSK', 'KSSSSSK', 'KSSSSSK', 'KKKWKKK'], { K: '#2a2350', S: '#8fd8f6', W: '#fffbe8' }],
  pin: [['..RRR..', '.RRRRR.', '.RWRRR.', '.RRRRR.', '..RRR..', '...S...', '...S...', '...S...'], { R: '#ff5c7a', W: '#ffd0da', S: '#c9cfdc' }],
  clip: [['...KK...', 'BBBKKBBB', 'BPPPPPPB', 'BPLLLLPB', 'BPPPPPPB', 'BPLLLPPB', 'BPPPPPPB', 'BPLLLLPB', 'BPPPPPPB', 'BBBBBBBB'], { K: '#c9cfdc', B: '#8a5a3a', P: '#fffaf0', L: '#7a86a8' }],
  ladle: [['......SS', '.....SS.', '....SS..', '...SS...', '..SS....', 'GGGG....', 'GGGG....', '.GG.....'], { S: '#c9cfdc', G: '#9aa3b5' }],
  pot: [['.SS........SS.', 'SSSSSSSSSSSSSS', '.PPPPPPPPPPPP.', '.PPPPPPPPPPPP.', '.PPPPPPPPPPPP.', '.PPPPPPPPPPPP.', '..PPPPPPPPPP..'], { S: '#c9cfdc', P: '#5a5f78' }],
  gift: [['...R.R...', '....R....', 'GGGGRGGGG', 'GGGGRGGGG', 'RRRRRRRRR', 'GGGGRGGGG', 'GGGGRGGGG', 'GGGGRGGGG'], { G: '#5fd38a', R: '#ff5c7a' }],
  bag: [['..BBBB..', '.B....B.', 'PPPPPPPP', 'PPPPPPPP', 'PPYYYYPP', 'PPPPPPPP', 'PPPPPPPP', 'PPPPPPPP'], { B: '#6a3a9a', P: '#a35cf0', Y: '#f2c75c' }],
  coat: [['..HH....HH..', '.CCCCCCCCCC.', 'CCCCCCCCCCCC', 'CCC.CCCC.CCC', 'CCC.CCCC.CCC', 'CCC.CCCC.CCC', '...CCCCCC...', '...CCCCCC...'], { H: '#c9cfdc', C: '#6b5a8a' }],
  lamp: [['..OOOO..', '.OOOOOO.', 'OOOOOOOO', 'OYOOOOYO', '..OOOO..', '...BB...', '...BB...', '.BBBBBB.'], { O: '#f39a3a', Y: '#ffe27a', B: '#8a5a3a' }],
  sock: [['.RRR.', '.WWW.', '.RRR.', '.WWW.', '.RRR.', 'RRRR.', 'RRRRR', '.RRRR'], { R: '#ff5c7a', W: '#fffaf0' }],
  mug: [['MMMMMM..', 'MMMMMMMM', 'MMMMMM.M', 'MMMMMM.M', 'MMMMMMMM', 'MMMMMM..', '.MMMM...'], { M: '#38c4ec' }],
  bread: [['..BBBBB..', '.BBBBBBB.', 'BBDBBDBBB', 'BBBBBBBBB', 'DDDDDDDDD'], { B: '#c9783a', D: '#5a3a2a' }],
  spoon: [['.SS.', 'SSSS', 'SSSS', '.SS.', '.S..', '.S..', '.S..', '.S..'], { S: '#c9cfdc' }],
  heart: [['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#ffd0da' }],
  tissue: [['..W..', '.WWW.', 'BBBBB', 'BPPPB', 'BPPPB', 'BBBBB'], { W: '#fffaf0', B: '#7c74f0', P: '#c9a6ff' }],
  snow: [['..W..', 'W.W.W', '.WWW.', 'WWWWW', '.WWW.', 'W.W.W', '..W..'], { W: '#fffaf0' }],
  blanket: [['PPPPPPPPPP', 'PLPLPLPLPL', 'PPPPPPPPPP', 'LPLPLPLPLP', 'PPPPPPPPPP'], { P: '#ff8fb1', L: '#ffd0da' }],
  card: [['GGGGGG', 'GVVVVG', 'GVSSVG', 'GVSSVG', 'GVVVVG', 'GVVVVG', 'GGGGGG'], { G: '#f2c75c', V: '#3a2a6a', S: '#f2c75c' }],
}
export function drawProp(x, name, cx, cy, cell, opts = {}) { const [bm, cols] = PROPS[name]; drawBits(x, bm, cols, cx, cy, cell, opts) }

const rr = (x, X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
/** text with an optional leading zodiac glyph (in a font that has it) */
function glyphText(x, glyph, text, X, Y, font, col, gcol = col) {
  let cx = X
  if (glyph) {
    const size = parseFloat(/(\d+)px/.exec(font)[1])
    x.font = `${Math.round(size * 1.05)}px ${GLYPHF}`; x.fillStyle = gcol
    x.fillText(glyph + '︎', cx, Y + size * 0.04); cx += x.measureText(glyph + '︎').width + size * 0.3
  }
  x.font = font; x.fillStyle = col; x.fillText(text, cx, Y)
  return cx + x.measureText(text).width
}
function wrap(x, text, font, maxW) {
  x.font = font
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

// ── the bug: a pixel chat-bubble + "THE THREAD"
const BUB_ICON = ['.GGGGGGGGG.', 'GGGGGGGGGGG', 'GGKGGKGGKGG', 'GGGGGGGGGGG', '.GGGGGGGGG.', '..GG.......', '.G.........']
function buildBug(root, at = -1) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '16px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '60px', height: '44px', imageRendering: 'pixelated' }, box)
  ic.width = 60; ic.height = 44
  drawBits(ic.getContext('2d'), BUB_ICON, { G: GOLD, K: INK }, 30, 22, 4.4)
  el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, box, 'THE&nbsp;THREAD')
  return {
    update(t, out = 1) {
      const k = (t < at + 0.36 ? pop01(t, at, 0.36, 2.2) : 1) * out
      box.style.display = k <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(k * 2) * out)
      box.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(4)})`
    },
  }
}

// ── the chat panel
export const PANEL = { x: 64, y: 420, w: 952, h: 1060, r: 44, head: 112, pinH: 62, foot: 84, typeH: 46 }
const B = { font: `600 40px ${INTER}`, lh: 50, padX: 26, padY: 16, x: 112, nameH: 36, gap: 18, maxW: 700 }
const RING = SIGNS.map(s => s.color)

function makeThread(x, EP) {
  const P = PANEL, items = EP.items, pins = EP.pins || [], typing = EP.typing || []
  const hasPin = pins.length > 0
  const bodyTop = P.y + P.head + (hasPin ? P.pinH : 0), bodyBot = P.y + P.h - P.foot - P.typeH
  // measure every item once
  const lay = items.map(it => {
    const k = it.kind
    if (k === 'msg') {
      const lines = wrap(x, it.text, B.font, B.maxW - 2 * B.padX)
      x.font = B.font
      const bw = Math.min(B.maxW, Math.max(...lines.map(l => x.measureText(l).width)) + 2 * B.padX)
      const bh = lines.length * B.lh + 2 * B.padY
      return { lines, bw, bh, h: B.nameH + bh + B.gap + (it.react ? 30 : 0) }
    }
    if (k === 'voice') return { bw: 470, bh: 96, h: B.nameH + 96 + B.gap + (it.react ? 30 : 0) }
    if (k === 'triple') {
      const rows = it.parts.map(([q, a]) => ({ q, a }))
      const bh = rows.length * 92 + 2 * B.padY
      return { rows, bw: B.maxW, bh, h: B.nameH + bh + B.gap + (it.react ? 30 : 0) }
    }
    if (k === 'agenda') { const bh = 84 + it.rows.length * 56 + 24; return { bw: B.maxW, bh, h: B.nameH + bh + B.gap + (it.react ? 30 : 0) } }
    if (k === 'poll') { const bh = 96 + it.opts.length * 70 + 20; return { bw: B.maxW, bh, h: B.nameH + bh + B.gap + (it.react ? 30 : 0) } }
    if (k === 'photo') { const bh = (it.h || 300) + (it.caption ? 58 : 0); return { bw: it.w || 560, bh, h: B.nameH + bh + B.gap + (it.react ? 30 : 0) } }
    if (k === 'sys') return { h: 60 }
    return { h: 40 }
  })
  const scrollE = d => easeOutBack(prog(d, 0, 0.32), 1.4)
  function bottomOf(i, t) {
    let off = 0
    for (let j = i + 1; j < items.length; j++) if (t >= items[j].t) off += lay[j].h * scrollE(t - items[j].t)
    return bodyBot - off
  }

  function header(t) {
    const hx = P.x, hy = P.y
    rr(x, hx, hy, P.w, P.head, [P.r, P.r, 0, 0]); x.fillStyle = 'rgba(255,255,255,0.05)'; x.fill()
    x.fillStyle = 'rgba(239,230,214,0.12)'; x.fillRect(hx + 24, hy + P.head - 2, P.w - 48, 2)
    x.textBaseline = 'alphabetic'; x.textAlign = 'left'
    x.font = `700 56px ${INTER}`; x.fillStyle = hexA(BONE, 0.85); x.fillText('‹', hx + 30, hy + 76)
    const ax = hx + 116, ay = hy + 56
    x.beginPath(); x.arc(ax, ay, 36, 0, TAU); x.fillStyle = '#1a1036'; x.fill()
    x.lineWidth = 3; x.strokeStyle = hexA(GOLD, 0.7); x.stroke()
    RING.forEach((c, i) => { const a = -Math.PI / 2 + i * TAU / 12 + t * 0.4; x.fillStyle = c; x.fillRect(Math.round(ax + Math.cos(a) * 26 - 3.5), Math.round(ay + Math.sin(a) * 26 - 3.5), 7, 7) })
    drawPixelStar(x, ax, ay, 20, 1, GOLD, '#fffbe8')
    x.font = `800 42px ${INTER}`; x.fillStyle = BONE; x.fillText(EP.title || 'the group chat', hx + 176, hy + 58)
    x.font = `700 22px ${MONO}`; x.fillStyle = hexA(BONE, 0.6); x.fillText(EP.subtitle || '12 stars · 1 chat', hx + 178, hy + 94)
  }

  function pinBar(t) {
    let cur = null
    for (const p of pins) if (t >= p.t) cur = p
    const y0 = P.y + P.head
    x.fillStyle = 'rgba(242,199,92,0.08)'; x.fillRect(P.x, y0, P.w, P.pinH)
    x.fillStyle = 'rgba(239,230,214,0.1)'; x.fillRect(P.x + 24, y0 + P.pinH - 2, P.w - 48, 2)
    if (!cur) { x.font = `700 22px ${MONO}`; x.fillStyle = hexA(BONE, 0.35); x.fillText('no pinned messages', P.x + 84, y0 + 40); drawProp(x, 'pin', P.x + 48, y0 + 31, 3.4, { alpha: 0.4 }); return }
    const k = pop01(t, cur.t, 0.3, 2.4)
    x.save(); x.globalAlpha *= clamp(k * 2)
    drawProp(x, 'pin', P.x + 48, y0 + 31, 3.4 * (0.6 + 0.4 * k), { rot: -0.3 + 0.3 * k })
    const c = C(cur.who)
    const end = glyphText(x, c.glyph, `${c.name.toUpperCase()}:`, P.x + 84, y0 + 41, `700 24px ${MONO}`, c.light)
    x.font = `700 28px ${INTER}`; x.fillStyle = BONE
    let s = cur.text; while (x.measureText(s).width > P.x + P.w - 40 - end - 14 && s.length > 4) s = s.slice(0, -2)
    if (s !== cur.text) s = s.trimEnd() + '…'
    x.fillText(s, end + 14, y0 + 41)
    x.restore()
    const fl = Math.max(0, 1 - Math.abs(t - cur.t - 0.12) / 0.3)
    if (fl > 0) { x.fillStyle = hexA('#fff3c8', 0.3 * fl); x.fillRect(P.x, y0, P.w, P.pinH) }
  }

  function footer(t) {
    // typing row
    const yt = P.y + P.h - P.foot - P.typeH + 30
    let who = null, k = 0
    for (const ty of typing) if (t >= ty.a && t < ty.b) { who = ty.who; k = pop01(t, ty.a, 0.25, 2) * outK(t, [ty.b - 0.12, ty.b]) }
    if (who) {
      const c = C(who)
      x.save(); x.globalAlpha *= clamp(k)
      const e = glyphText(x, c.glyph, `${c.name} is typing`, P.x + 34, yt, `700 24px ${MONO}`, hexA(BONE, 0.75), c.light)
      for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 9 - i * 0.9)); x.fillStyle = hexA(BONE, 0.5 + 0.5 * b); x.fillRect(e + 12 + i * 16, yt - 8 - b * 6, 8, 8) }
      x.restore()
    }
    // input bar
    const fy = P.y + P.h - P.foot
    rr(x, P.x, fy, P.w, P.foot, [0, 0, P.r, P.r]); x.fillStyle = 'rgba(255,255,255,0.04)'; x.fill()
    rr(x, P.x + 26, fy + 14, P.w - 130, P.foot - 28, 28); x.fillStyle = 'rgba(255,255,255,0.08)'; x.fill()
    x.font = `600 28px ${INTER}`; x.fillStyle = hexA(BONE, 0.35); x.fillText('message the chat', P.x + 56, fy + 52)
    x.beginPath(); x.arc(P.x + P.w - 56, fy + P.foot / 2, 24, 0, TAU); x.fillStyle = hexA(GOLD, 0.85); x.fill()
    x.fillStyle = INK; x.beginPath(); x.moveTo(P.x + P.w - 66, fy + P.foot / 2 - 12); x.lineTo(P.x + P.w - 44, fy + P.foot / 2); x.lineTo(P.x + P.w - 66, fy + P.foot / 2 + 12); x.closePath(); x.fill()
  }

  function avatarAt(who, cx, cy, size, t, pk = 1) {
    const c = C(who), mood = EP.avatar ? EP.avatar(who, t) : null
    x.save(); x.beginPath(); x.arc(cx, cy, size * 0.56, 0, TAU); x.fillStyle = hexA(c.color, 0.22); x.fill(); x.restore()
    drawStarChar(x, cx, cy + size * 0.06, size, t, { color: c.color, mood: (mood && mood.mood) || (who === 'pisces' ? 'wide' : 'neutral'), look: (mood && mood.look) || [0, 0], seed: c.seed + 50, bob: 0, glow: 0.35, tips: false, pop: pk })
    if (who === 'pisces') { const F = starFrame(cx, cy + size * 0.06, size, t, { pop: pk, bob: 0, seed: c.seed + 50 }); inSprite(x, F, () => tearsCells(x, t, 1)) }
  }

  function reactPill(it, X, Y, t) {
    const r = it.react; if (!r || t < r.t) return
    const k = pop01(t, r.t, 0.3, 2.6)
    const w = r.n ? 96 : 66, h = 44, cx = X + w / 2, cy = Y + h / 2
    x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
    rr(x, X, Y, w, h, 22); x.fillStyle = '#2a1f55'; x.fill(); x.lineWidth = 3; x.strokeStyle = '#05040c'; x.stroke()
    const mx = r.n ? X + 30 : cx, my = cy
    markAt(r.mark, mx, my, t)
    if (r.n) { x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(String(r.n), X + 54, my + 1); x.textBaseline = 'alphabetic' }
    x.restore()
  }
  function markAt(mark, mx, my, t) {
    if (mark === 'heart') drawProp(x, 'heart', mx, my, 3.4)
    else if (mark === 'pin') drawProp(x, 'pin', mx, my, 3)
    else if (mark === 'tear') drawBits(x, ['..W..', '.WBW.', 'WBBBW', 'WBBBW', '.WWW.'], { W: SKYB, B: '#c8f2ff' }, mx, my, 4.4)
    else if (mark === 'star') drawPixelStar(x, mx, my, 26, 1, GOLD, '#fffbe8')
    else { x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = mark === 'ha' ? GOLD : mark === '?' ? SKYB : PINK; x.fillText(mark === 'ha' ? 'HA' : mark, mx, my + 1); x.textBaseline = 'alphabetic'; x.textAlign = 'left' }
  }

  // bubble chrome: name + rounded card, popping from the avatar corner; returns the card's rect
  function chrome(it, L, yb, t, pop, fillCol = '#f4ede1') {
    const c = C(it.who), top = yb - L.h, bx = P.x + B.x, by = top + B.nameH
    const k = easeOutBack(pop, 2.2), a = clamp(pop * 3)
    x.save()
    x.translate(bx, by + L.bh); x.scale(lerp(0.55, 1, k), lerp(0.55, 1, k)); x.translate(-bx, -(by + L.bh))
    x.globalAlpha *= a
    x.textBaseline = 'alphabetic'; x.textAlign = 'left'
    glyphText(x, c.glyph, c.name, bx + 6, top + 27, `700 24px ${MONO}`, c.light)
    if (it.hl) {   // the advice: a gold glow ring
      x.save(); x.shadowColor = hexA(GOLD, 0.9); x.shadowBlur = 26 + 8 * Math.sin(t * 5)
      rr(x, bx - 6, by - 6, L.bw + 12, L.bh + 12, 32); x.fillStyle = GOLD; x.fill(); x.restore()
    }
    rr(x, bx, by, L.bw, L.bh, [28, 28, 28, 8]); x.fillStyle = fillCol; x.fill()
    x.fillStyle = hexA(c.color, 0.85); x.fillRect(bx, by + 18, 5, L.bh - 36)
    return { bx, by, c, k }
  }
  function endChrome(it, L, bx, by, t, pop) {
    reactPill(it, bx + L.bw - 30, by + L.bh - 12, t)
    x.restore()
    avatarAt(it.who, P.x + 60, by + L.bh - 30, 58, t, clamp(pop * 1.6))
  }

  function drawMsg(it, L, yb, t, pop) {
    const { bx, by } = chrome(it, L, yb, t, pop)
    x.font = B.font; x.fillStyle = INK
    L.lines.forEach((l, i) => x.fillText(l, bx + B.padX, by + B.padY + B.lh * (i + 1) - 12))
    endChrome(it, L, bx, by, t, pop)
  }
  function drawVoice(it, L, yb, t, pop) {
    const { bx, by, c } = chrome(it, L, yb, t, pop, '#2a2160')
    const play = it.play || [it.t + 0.3, it.t + 2.2], on = t > play[0] && t < play[1], pp = prog(t, play[0], play[1])
    // play button
    x.beginPath(); x.arc(bx + 54, by + L.bh / 2, 30, 0, TAU); x.fillStyle = c.light; x.fill()
    x.fillStyle = INK
    if (on) { x.fillRect(bx + 43, by + L.bh / 2 - 13, 8, 26); x.fillRect(bx + 57, by + L.bh / 2 - 13, 8, 26) }
    else { x.beginPath(); x.moveTo(bx + 46, by + L.bh / 2 - 15); x.lineTo(bx + 68, by + L.bh / 2); x.lineTo(bx + 46, by + L.bh / 2 + 15); x.closePath(); x.fill() }
    // waveform (a sob is spiky)
    const n = 24, wx = bx + 104, ww = 250
    for (let i = 0; i < n; i++) {
      const h0 = 10 + 30 * Math.abs(Math.sin(i * 1.7 + (it.sob ? i * i * 0.3 : 0))) * (it.sob ? (i % 5 === 2 ? 1.3 : 0.8) : 0.7)
      const live = on ? 1 + 0.35 * Math.sin(t * 22 + i) : 1
      const h = Math.min(56, h0 * live)
      x.fillStyle = i / n < pp ? c.light : hexA(BONE, 0.45)
      x.fillRect(wx + i * (ww / n), by + L.bh / 2 - h / 2, ww / n - 4, h)
    }
    x.font = `700 24px ${MONO}`; x.fillStyle = hexA(BONE, 0.85); x.fillText(it.dur || '0:04', bx + 372, by + L.bh / 2 + 8)
    if (it.sob) drawBits(x, ['..W..', '.WBW.', 'WBBBW', 'WBBBW', '.WWW.'], { W: SKYB, B: '#c8f2ff' }, bx + 448, by + L.bh / 2, 3.6)
    endChrome(it, L, bx, by, t, pop)
  }
  function drawTriple(it, L, yb, t, pop) {
    const { bx, by } = chrome(it, L, yb, t, pop)
    L.rows.forEach((r, i) => {
      const y0 = by + B.padY + i * 92
      x.fillStyle = 'rgba(27,18,54,0.1)'; rr(x, bx + 22, y0 + 2, L.bw - 44, 36, 10); x.fill()
      x.fillStyle = hexA('#7a86a8', 0.9); x.fillRect(bx + 22, y0 + 2, 5, 36)
      x.font = `600 22px ${MONO}`; x.fillStyle = '#5a5f78'
      let q = r.q; while (x.measureText(q).width > L.bw - 90 && q.length > 4) q = q.slice(0, -2)
      x.fillText(q === r.q ? q : q + '…', bx + 38, y0 + 28)
      x.font = B.font; x.fillStyle = INK; x.fillText(r.a, bx + B.padX, y0 + 82)
    })
    endChrome(it, L, bx, by, t, pop)
  }
  function drawAgenda(it, L, yb, t, pop) {
    const { bx, by, c } = chrome(it, L, yb, t, pop, '#fffaf0')
    x.fillStyle = hexA(c.color, 0.9); rr(x, bx + 22, by + 20, 180, 44, 10); x.fill()
    x.font = `800 26px ${MONO}`; x.fillStyle = '#05040c'; x.fillText(it.title || 'AGENDA', bx + 38, by + 51)
    it.rows.forEach((row, i) => {
      const y0 = by + 84 + i * 56, tk = it.ticks && it.ticks[i] !== undefined && t > it.ticks[i]
      x.strokeStyle = '#5a5f78'; x.lineWidth = 3; x.strokeRect(bx + 28, y0 + 8, 30, 30)
      if (tk) { const k2 = pop01(t, it.ticks[i], 0.25, 2.5); x.save(); x.translate(bx + 43, y0 + 23); x.scale(k2, k2); x.strokeStyle = '#2fc79a'; x.lineWidth = 6; x.beginPath(); x.moveTo(-10, 0); x.lineTo(-2, 9); x.lineTo(13, -11); x.stroke(); x.restore() }
      x.font = `600 34px ${INTER}`; x.fillStyle = INK; x.fillText(row, bx + 76, y0 + 35)
    })
    endChrome(it, L, bx, by, t, pop)
  }
  function drawPoll(it, L, yb, t, pop) {
    const { bx, by, c } = chrome(it, L, yb, t, pop, '#fffaf0')
    const closed = it.closeAt !== undefined && t > it.closeAt
    x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.fillText(it.q, bx + 26, by + 50)
    x.font = `700 20px ${MONO}`; x.fillStyle = closed ? '#c42a3f' : '#5a5f78'; x.fillText(closed ? 'POLL CLOSED' : 'POLL · TAP TO VOTE', bx + 26, by + 82)
    const counts = it.opts.map(o => o.votes.filter(v => t >= v).length), tot = Math.max(1, counts.reduce((a, b) => a + b, 0))
    const best = Math.max(...counts)
    it.opts.forEach((o, i) => {
      const y0 = by + 100 + i * 70, w = L.bw - 52
      rr(x, bx + 26, y0, w, 56, 14); x.fillStyle = 'rgba(27,18,54,0.08)'; x.fill()
      // bar eases toward its share
      let f = 0; for (const v of o.votes) if (t >= v) f += ease.outCubic(prog(t, v, v + 0.3))
      const share = f / tot
      if (share > 0.001) { rr(x, bx + 26, y0, Math.max(28, w * share), 56, 14); x.fillStyle = closed && counts[i] === best ? hexA(c.color, 0.85) : hexA(c.color, 0.4); x.fill() }
      x.font = `700 30px ${INTER}`; x.fillStyle = INK; x.fillText(o.label, bx + 46, y0 + 39)
      x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.fillText(String(counts[i]), bx + 26 + w - 20, y0 + 38); x.textAlign = 'left'
    })
    endChrome(it, L, bx, by, t, pop)
  }
  function drawPhoto(it, L, yb, t, pop) {
    const { bx, by } = chrome(it, L, yb, t, pop, '#2a2160')
    const ph = it.h || 300
    x.save(); rr(x, bx + 10, by + 10, L.bw - 20, ph - 20, 20); x.clip()
    it.pic(x, bx + 10, by + 10, L.bw - 20, ph - 20, t)
    x.restore()
    if (it.caption) { x.font = `600 32px ${INTER}`; x.fillStyle = BONE; x.fillText(it.caption, bx + 24, by + ph + 38) }
    endChrome(it, L, bx, by, t, pop)
  }
  function drawSys(it, L, yb, t, pop) {
    const c = it.who ? C(it.who) : null
    const y = yb - L.h + 8, cx = P.x + P.w / 2
    x.save(); x.globalAlpha *= clamp(pop * 3)
    x.font = `700 24px ${MONO}`
    const gw = c ? x.measureText(c.glyph + '︎').width + 12 : 0
    const tw = x.measureText(it.text).width + gw + 44
    const k = easeOutBack(pop, 2)
    x.translate(cx, y + 21); x.scale(k, k); x.translate(-cx, -(y + 21))
    rr(x, cx - tw / 2, y, tw, 42, 21); x.fillStyle = it.gold ? hexA(GOLD, 0.22) : 'rgba(255,255,255,0.09)'; x.fill()
    x.textBaseline = 'middle'; x.textAlign = 'left'
    glyphText(x, c ? c.glyph : null, it.text, cx - tw / 2 + 22, y + 22, `700 24px ${MONO}`, it.gold ? GOLD : hexA(BONE, 0.82), c ? c.light : BONE)
    x.textBaseline = 'alphabetic'
    x.restore()
  }
  const DRAW = { msg: drawMsg, voice: drawVoice, triple: drawTriple, agenda: drawAgenda, poll: drawPoll, photo: drawPhoto, sys: drawSys }

  return {
    bottomOf, lay,
    draw(t, { alpha = 1, dy = 0, s = 1 } = {}) {
      if (alpha <= 0.001) return
      x.save(); x.globalAlpha *= alpha
      x.translate(540, P.y + P.h / 2 + dy); x.scale(s, s); x.translate(-540, -(P.y + P.h / 2))
      // the phone-ish panel
      x.save(); x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 50; x.shadowOffsetY = 18
      rr(x, P.x, P.y, P.w, P.h, P.r); x.fillStyle = 'rgba(16,10,40,0.94)'; x.fill(); x.restore()
      rr(x, P.x, P.y, P.w, P.h, P.r); x.lineWidth = 4; x.strokeStyle = hexA(GOLD, 0.55); x.stroke()
      header(t)
      if (hasPin) pinBar(t)
      x.save(); x.beginPath(); x.rect(P.x, bodyTop, P.w, bodyBot - bodyTop + 8); x.clip()
      items.forEach((it, i) => {
        if (t < it.t) return
        const yb = bottomOf(i, t)
        if (yb < bodyTop - 20) return
        DRAW[it.kind](it, lay[i], yb, t, prog(t, it.t, it.t + 0.34))
      })
      x.restore()
      // soft fade at the top of the body
      const g = x.createLinearGradient(0, bodyTop, 0, bodyTop + 40); g.addColorStop(0, 'rgba(16,10,40,0.95)'); g.addColorStop(1, 'rgba(16,10,40,0)')
      x.fillStyle = g; x.fillRect(P.x + 4, bodyTop, P.w - 8, 40)
      footer(t)
      x.restore()
    },
  }
}

// ── the stage under the chat
export const STAGE_Y = 1700
/** a stage star: { who, x, y, s, mood, look, hops, tears, phone, pop, alpha } */
export function stageStar(x, t, o) {
  const c = o.who === 'stars' ? { color: '#f7cf68', seed: 2 } : C(o.who)
  const opts = { color: c.color, glyph: o.glyph === false ? null : c.glyph, mood: o.mood || 'neutral', look: o.look, seed: c.seed, glow: o.glow ?? 1, pop: o.pop ?? 1, alpha: o.alpha ?? 1, hops: o.hops, squash: o.squash || 0 }
  drawStarChar(x, o.x, o.y, o.s, t, opts)
  const F = starFrame(o.x, o.y, o.s, t, opts)
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  if (o.phone) {   // a glowing phone in the star's right hand
    const px = F.ox + F.S * (o.phone < 0 ? -0.42 : 0.42), py = F.oy - F.base - F.S * 0.02
    x.save(); x.globalAlpha *= (o.alpha ?? 1) * clamp(o.pop ?? 1)
    const gl = x.createRadialGradient(px, py, 0, px, py, F.S * 0.35); gl.addColorStop(0, 'rgba(143,216,246,0.35)'); gl.addColorStop(1, 'rgba(143,216,246,0)')
    x.fillStyle = gl; x.fillRect(px - F.S * 0.4, py - F.S * 0.4, F.S * 0.8, F.S * 0.8)
    drawProp(x, 'phone', px, py, F.cell * 1.2, { rot: (o.phone < 0 ? 0.25 : -0.25) + 0.05 * Math.sin(t * 6) })
    x.restore()
  }
  return F
}
/** the floor glow of the stage */
function stageFloor(x, t, k) {
  if (k <= 0) return
  const g = x.createRadialGradient(540, 1880, 0, 540, 1880, 620)
  g.addColorStop(0, `rgba(242,199,92,${0.16 * k})`); g.addColorStop(1, 'rgba(242,199,92,0)')
  x.fillStyle = g; x.fillRect(0, 1500, 1080, 420)
}

// ── the film
export function threadFilm(EP) {
  const DURATION = EP.duration, STORY_END = DURATION - ENDCARD_LEN
  const OUT = EP.out || [STORY_END - 0.5, STORY_END - 0.1]
  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "600 40px Inter", "700 30px Inter", "800 42px Inter", "italic 500 150px 'EB Garamond'", "700 24px 'Space Mono'", "700 22px 'Space Mono'", "800 26px 'Space Mono'", "40px 'DejaVu Sans'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const TH = makeThread(x, EP)
    const heads = EP.heads.map(h => [popText(root, h.text, { top: h.top ?? 150, size: h.size ?? 84, accentSize: h.accentSize ?? Math.round((h.size ?? 84) * 1.3), at: h.at, gap: h.gap ?? 0.07, late: h.late || 0, lateAt: h.lateAt ?? h.at + 0.3, wobble: !!h.late, accentColor: h.accent || GOLD, fit: true }), h.out])
    const bug = buildBug(root, -1)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const K = { x, stageStar, drawProp, drawBits, sparkles, pop01, outK, popOut, C, TH, hexA, GOLD, BONE, PINK, INK, MINT, SKYB, INTER, MONO, STAGE_Y, OUT, inSprite, tearsCells, starFrame }
    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const ok = popOut(t, OUT)
        // the stage first (the chat sits above it)
        if (ok > 0.01) {
          stageFloor(x, t, ok)
          x.save(); x.globalAlpha *= clamp(ok)
          if (EP.stage) EP.stage(x, t, K)
          x.restore()
          const sh = EP.shake ? EP.shake(t) : 0
          x.save(); x.translate(0, sh)
          TH.draw(t, { alpha: clamp(ok), s: lerp(0.9, 1, clamp(ok)) })
          x.restore()
          if (EP.over) { x.save(); x.globalAlpha *= clamp(ok); EP.over(x, t, K); x.restore() }
        }
        for (const [h, o] of heads) h.update(t, outK(t, o))
        bug.update(t, outK(t, [STORY_END - 0.3, STORY_END - 0.05]))
        drawGrain(gx, t)
      },
    }
  }
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(EP.cuts)]
  const CUES = [...threadCues(EP), ...cardCutCues(EP.cuts), ...endcardCues(STORY_END)].sort((a, b) => a[1] - b[1])
  return { DURATION, SCENES, CUES, STORY_END }
}

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const PITCH = {}; SIGNS.forEach((s, i) => { PITCH[s.id] = NOTE[(i * 3) % 7] })
for (const [k, v] of Object.entries(KEY)) PITCH[k] = PITCH[v]
export const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const nWords = s => s.replace(/[*|]/g, ' ').split(/\s+/).filter(Boolean).length
export function sob(t0, n = 3, gain = 0.03) {   // a little falling three-note sob
  return Array.from({ length: n }, (_, i) => ['pluck', +(t0 + i * 0.16).toFixed(3), [987.77, 880, 739.99, 659.25, 587.33][i % 5], gain, 0.35, 0.4])
}
export function threadCues(EP) {
  const out = []
  for (const h of EP.heads) {
    if (h.at >= 0) out.push(...wordPops(h.at, nWords(h.text) - (h.late || 0), h.gap ?? 0.07, 0, 0.024))
    if (h.late && (h.lateAt ?? h.at + 0.3) >= 0) out.push(['pop', h.lateAt ?? h.at + 0.3, 1174.66, 0.045, 0], ['pop', (h.lateAt ?? h.at + 0.3) + 0.1, 1567.98, 0.035, 0])
    if (h.out && h.out[0] < EP.duration - ENDCARD_LEN - 0.5) out.push(['whoosh', h.out[0], 0.3, 0.02])
  }
  EP.items.forEach((it, i) => {
    if (it.t < 0) return
    const p = it.who ? PITCH[it.who] : 880
    if (it.kind === 'sys') out.push(['tick', it.t, 0.04], ['pop', it.t + 0.03, 1318.51, 0.025, 0])
    else out.push(['pop', it.t, p, 0.045, -0.2], ['pop', it.t + 0.06, p * 1.5, 0.025, -0.2])
    if (i > 0) out.push(['whoosh', it.t, 0.22, 0.012])
    if (it.hl) out.push(['bell', it.t + 0.05, 1760, 0.03, 1.0, 0], ['glitter', it.t, it.t + 0.4])
    if (it.kind === 'voice') { const pl = it.play || [it.t + 0.3, it.t + 2.2]; out.push(['tick', pl[0], 0.03]); if (it.sob) for (let s = pl[0] + 0.1; s < pl[1] - 0.3; s += 0.62) out.push(...sob(s, 3, 0.022)) }
    if (it.kind === 'poll') it.opts.forEach(o => o.votes.forEach(v => { if (v >= 0) out.push(['tick', v, 0.03], ['pop', v, 1174.66, 0.018, 0.3]) }))
    if (it.kind === 'agenda' && it.ticks) it.ticks.forEach(v => out.push(['tick', v, 0.045], ['pop', v + 0.02, 1318.51, 0.03, 0.2]))
    if (it.react && it.react.t >= 0) out.push(['pop', it.react.t, it.react.mark === 'tear' ? 739.99 : 1567.98, 0.03, 0.35])
  })
  for (const p of EP.pins || []) if (p.t >= 0) out.push(['tick', p.t, 0.05], ['pluck', p.t + 0.02, 1318.51, 0.035, 0.4, -0.3])
  for (const ty of EP.typing || []) for (let s = ty.a; s < ty.b - 0.1; s += 0.14) out.push(['tick', +s.toFixed(3), 0.012])
  out.push(['whoosh', (EP.out || [EP.duration - ENDCARD_LEN - 0.5])[0], 0.35, 0.03])
  return [...out, ...(EP.cues || [])]
}
